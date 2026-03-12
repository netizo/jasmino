#!/usr/bin/env python3
"""
generate_images.py — Jasmino website image generation via Gemini API.

Reads jasmino-image-manifest.json, generates images for all 'pending' entries,
saves to staging folders, and updates the manifest with results.

Usage:
    python generate_images.py                    # Generate all pending
    python generate_images.py --category t2      # Only T2 division images
    python generate_images.py --id ED-G1         # Single image by ID
    python generate_images.py --retry-failed     # Retry all failed entries
    python generate_images.py --dry-run          # Preview without generating
"""

import json
import os
import sys
import time
import base64
import argparse
from pathlib import Path
from datetime import datetime

from google import genai
from PIL import Image
import io


# --- CONFIG ---
MODEL = "gemini-3.1-flash-image-preview"
MANIFEST_FILE = "jasmino-image-manifest.json"
MAX_RETRIES = 3
DELAY_BETWEEN_CALLS = 2.0  # seconds — respect rate limits
OUTPUT_FORMAT = "webp"
WEBP_QUALITY = 85


def load_manifest():
    with open(MANIFEST_FILE, "r") as f:
        return json.load(f)


def save_manifest(manifest):
    with open(MANIFEST_FILE, "w") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)


def generate_image(client, prompt, width, height, model=None):
    """Call Gemini API to generate an image from a text prompt."""
    model = model or MODEL

    # Add aspect ratio hint to the prompt for Gemini
    aspect_hint = f"Generate this image at {width}x{height} pixel resolution, landscape orientation."
    if height > width:
        aspect_hint = f"Generate this image at {width}x{height} pixel resolution, portrait orientation."

    full_prompt = f"{prompt}\n\n{aspect_hint}"

    response = client.models.generate_content(
        model=model,
        contents=[full_prompt],
    )

    # Extract image from response
    for part in response.parts:
        if part.inline_data is not None:
            # inline_data.data is already raw bytes in google-genai SDK
            image = Image.open(io.BytesIO(part.inline_data.data))
            return image

    return None


def process_entry(client, entry, dry_run=False, model=None):
    """Generate image for a single manifest entry."""
    entry_id = entry["id"]
    output_path = entry["output_path"]
    width = entry["width"]
    height = entry["height"]
    prompt = entry["prompt"]

    print(f"\n{'='*60}", flush=True)
    print(f"  ID: {entry_id}", flush=True)
    print(f"  Category: {entry['category']}", flush=True)
    print(f"  Dimensions: {width}x{height}", flush=True)
    print(f"  Output: {output_path}", flush=True)
    print(f"  Prompt: {prompt[:100]}...", flush=True)

    if dry_run:
        print(f"  [DRY RUN] Would generate image")
        return True

    # Create output directory
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)

    for attempt in range(1, MAX_RETRIES + 1):
        try:
            print(f"  Attempt {attempt}/{MAX_RETRIES}...")

            image = generate_image(client, prompt, width, height, model=model)

            if image is None:
                print(f"  WARNING: No image returned by API")
                entry["attempts"] = attempt
                entry["status"] = "failed"
                entry["notes"] = "No image in API response"
                time.sleep(DELAY_BETWEEN_CALLS)
                continue

            # Resize to target dimensions if needed
            if image.size != (width, height):
                image = image.resize((width, height), Image.LANCZOS)

            # Save as WebP
            if output_path.endswith(".webp"):
                image.save(output_path, "WEBP", quality=WEBP_QUALITY)
            elif output_path.endswith(".png"):
                image.save(output_path, "PNG")
            else:
                image.save(output_path, "WEBP", quality=WEBP_QUALITY)

            file_size = os.path.getsize(output_path)
            print(f"  SAVED: {output_path} ({file_size // 1024}KB, {image.size[0]}x{image.size[1]})")

            entry["status"] = "generated"
            entry["attempts"] = attempt
            entry["generated_at"] = datetime.now().isoformat()
            entry["file_size_kb"] = file_size // 1024
            entry["notes"] = ""

            time.sleep(DELAY_BETWEEN_CALLS)
            return True

        except Exception as e:
            print(f"  ERROR: {e}")
            entry["attempts"] = attempt
            entry["status"] = "failed"
            entry["notes"] = str(e)[:200]

            # Back off on errors
            wait = DELAY_BETWEEN_CALLS * (attempt + 1)
            print(f"  Waiting {wait}s before retry...")
            time.sleep(wait)

    return False


def main():
    parser = argparse.ArgumentParser(description="Generate Jasmino website images via Gemini API")
    parser.add_argument("--category", help="Only process entries matching this category substring")
    parser.add_argument("--id", help="Only process a single entry by ID")
    parser.add_argument("--retry-failed", action="store_true", help="Retry all failed entries")
    parser.add_argument("--dry-run", action="store_true", help="Preview without generating")
    parser.add_argument("--model", default=MODEL, help=f"Gemini model to use (default: {MODEL})")
    parser.add_argument("--start-from", help="Start from this entry ID (skip earlier entries)")
    args = parser.parse_args()

    model_to_use = args.model

    # Initialize Gemini client
    if not args.dry_run:
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            print("ERROR: Set GEMINI_API_KEY environment variable")
            sys.exit(1)
        client = genai.Client(api_key=api_key)
    else:
        client = None

    # Load manifest
    manifest = load_manifest()
    entries = manifest["entries"]

    # Filter entries
    if args.id:
        entries = [e for e in entries if e["id"] == args.id]
    elif args.category:
        entries = [e for e in entries if args.category.lower() in e["category"].lower()]
    elif args.retry_failed:
        entries = [e for e in entries if e["status"] == "failed"]
    else:
        entries = [e for e in entries if e["status"] == "pending"]

    # Start-from support
    if args.start_from:
        skip = True
        filtered = []
        for e in entries:
            if e["id"] == args.start_from:
                skip = False
            if not skip:
                filtered.append(e)
        entries = filtered

    # Skip video entries (can't generate video with image API)
    entries = [e for e in entries if e["category"] != "video"]

    print(f"Jasmino Image Generation Pipeline")
    print(f"Model: {model_to_use}")
    print(f"Entries to process: {len(entries)}")
    print(f"Dry run: {args.dry_run}")

    if not entries:
        print("No entries to process.")
        return

    # Process
    success = 0
    failed = 0

    for i, entry in enumerate(entries):
        print(f"\n[{i+1}/{len(entries)}]", end="")

        result = process_entry(client, entry, dry_run=args.dry_run, model=model_to_use)

        if result:
            success += 1
        else:
            failed += 1

        # Save manifest after each entry (checkpoint)
        if not args.dry_run:
            save_manifest(manifest)

    # Final summary
    print(f"\n{'='*60}")
    print(f"COMPLETE")
    print(f"  Success: {success}")
    print(f"  Failed:  {failed}")
    print(f"  Total:   {success + failed}")

    if failed > 0:
        print(f"\nTo retry failed entries: python generate_images.py --retry-failed")

    # Save final manifest
    if not args.dry_run:
        save_manifest(manifest)


if __name__ == "__main__":
    main()
