# Jasmino Image Generation Pipeline — Claude Code Agent Instructions

## Overview

You are generating **199 images** for the Jasmino Corporation website redesign using the **Google Gemini API** (image generation). Each image has a detailed prompt, target dimensions, and a staging file path defined in `jasmino-image-manifest.json`.

Your job: iterate through the manifest, call the Gemini API for each entry, save the resulting image to the staging folder, and update the manifest with generation status. **Do not place images in the final repo paths** — all output goes to `staging/` for human review.

---

## Prerequisites

Before starting, verify the following are available:

```bash
# 1. Python 3.10+ with google-genai SDK
pip install google-genai Pillow

# 2. Gemini API key set as environment variable
echo $GEMINI_API_KEY   # must be set

# 3. Manifest file exists
ls jasmino-image-manifest.json

# 4. Create staging directory structure
mkdir -p staging/{homepage,t2_division,t3_service,industries,infrastructure,case_study,news,video}
```

---

## Model Selection

Use one of these models depending on availability and budget:

| Model | ID | Best for | Cost |
|-------|-----|----------|------|
| **Nano Banana 2** (recommended) | `gemini-3.1-flash-image-preview` | High-volume, fast, good quality | ~$0.039/image |
| **Nano Banana** | `gemini-2.5-flash-image` | Budget option, lower latency | ~$0.039/image |
| **Nano Banana Pro** | `gemini-3-pro-image-preview` | Highest quality, complex prompts | Higher cost |

Default to `gemini-3.1-flash-image-preview` unless the user specifies otherwise.

---

## Generation Script

Use this Python script as the core generator. Run it from the project root (where `jasmino-image-manifest.json` lives):

```python
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


def generate_image(client, prompt, width, height):
    """Call Gemini API to generate an image from a text prompt."""
    
    # Add aspect ratio hint to the prompt for Gemini
    aspect_hint = f"Generate this image at {width}x{height} pixel resolution, landscape orientation."
    if height > width:
        aspect_hint = f"Generate this image at {width}x{height} pixel resolution, portrait orientation."
    
    full_prompt = f"{prompt}\n\n{aspect_hint}"
    
    response = client.models.generate_content(
        model=MODEL,
        contents=[full_prompt],
    )
    
    # Extract image from response
    for part in response.parts:
        if part.inline_data is not None:
            # Convert to PIL Image
            image_data = base64.b64decode(part.inline_data.data)
            image = Image.open(io.BytesIO(image_data))
            return image
    
    return None


def process_entry(client, entry, dry_run=False):
    """Generate image for a single manifest entry."""
    entry_id = entry["id"]
    output_path = entry["output_path"]
    width = entry["width"]
    height = entry["height"]
    prompt = entry["prompt"]
    
    print(f"\n{'='*60}")
    print(f"  ID: {entry_id}")
    print(f"  Category: {entry['category']}")
    print(f"  Dimensions: {width}x{height}")
    print(f"  Output: {output_path}")
    print(f"  Prompt: {prompt[:100]}...")
    
    if dry_run:
        print(f"  [DRY RUN] Would generate image")
        return True
    
    # Create output directory
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            print(f"  Attempt {attempt}/{MAX_RETRIES}...")
            
            image = generate_image(client, prompt, width, height)
            
            if image is None:
                print(f"  ⚠ No image returned by API")
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
            print(f"  ✓ Saved: {output_path} ({file_size // 1024}KB, {image.size[0]}x{image.size[1]})")
            
            entry["status"] = "generated"
            entry["attempts"] = attempt
            entry["generated_at"] = datetime.now().isoformat()
            entry["file_size_kb"] = file_size // 1024
            entry["notes"] = ""
            
            time.sleep(DELAY_BETWEEN_CALLS)
            return True
            
        except Exception as e:
            print(f"  ✗ Error: {e}")
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
    
    global MODEL
    MODEL = args.model
    
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
    print(f"Model: {MODEL}")
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
        
        result = process_entry(client, entry, dry_run=args.dry_run)
        
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
```

---

## Step-by-Step Agent Workflow

Follow these steps in order. After each major step, report progress to the user.

### Step 1: Setup

```bash
# Install dependencies
pip install google-genai Pillow

# Verify API key
echo "API key set: $([ -n "$GEMINI_API_KEY" ] && echo 'yes' || echo 'NO — set it first')"

# Create staging directories
mkdir -p staging/{homepage,t2_division,t3_service,industries,infrastructure,case_study,news,video}

# Verify manifest
python3 -c "
import json
with open('jasmino-image-manifest.json') as f:
    m = json.load(f)
print(f'Manifest loaded: {len(m[\"entries\"])} entries')
cats = {}
for e in m['entries']:
    cats[e['category']] = cats.get(e['category'], 0) + 1
for k,v in sorted(cats.items()):
    print(f'  {k}: {v}')
"
```

### Step 2: Generate by Category (recommended order)

Process in small batches by category so the user can QA as you go. **Do not generate all 192 images at once** — work category by category.

```bash
# Start with T2 (32 images) — these are the most visible on the site
python generate_images.py --category t2_division

# Then homepage (4 images)
python generate_images.py --category homepage

# Then T3 service pages (96 images) — largest batch
python generate_images.py --category t3_service

# Industries (8 images)
python generate_images.py --category industries

# Infrastructure (13 images)
python generate_images.py --category infrastructure

# Case studies (30 images)
python generate_images.py --category case_study

# News (9 images)
python generate_images.py --category news
```

### Step 3: QA Check

After each category batch, generate a QA report:

```bash
python3 -c "
import json
with open('jasmino-image-manifest.json') as f:
    m = json.load(f)

print('STATUS REPORT')
print('='*50)
statuses = {}
for e in m['entries']:
    s = e['status']
    statuses[s] = statuses.get(s, 0) + 1
for k,v in sorted(statuses.items()):
    print(f'  {k}: {v}')

failed = [e for e in m['entries'] if e['status'] == 'failed']
if failed:
    print(f'\nFAILED ENTRIES ({len(failed)}):')
    for e in failed:
        print(f'  {e[\"id\"]}: {e[\"notes\"]}')
"
```

### Step 4: Retry Failures

```bash
python generate_images.py --retry-failed
```

### Step 5: Generate QA Gallery (optional)

Create an HTML contact sheet for visual review:

```python
#!/usr/bin/env python3
"""generate_qa_gallery.py — Creates an HTML gallery of all generated images."""
import json
from pathlib import Path

with open("jasmino-image-manifest.json") as f:
    manifest = json.load(f)

html = """<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<title>Jasmino Image QA Gallery</title>
<style>
body{font-family:system-ui;background:#111;color:#eee;padding:24px}
h1{font-size:24px;margin-bottom:8px}
h2{font-size:18px;color:#04E586;margin-top:40px;border-bottom:1px solid #333;padding-bottom:8px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;margin-top:16px}
.card{background:#1a1a1a;border-radius:8px;overflow:hidden;border:1px solid #333}
.card img{width:100%;aspect-ratio:3/2;object-fit:cover;display:block}
.card-info{padding:12px}
.card-id{font-family:monospace;font-size:11px;color:#04E586}
.card-caption{font-size:13px;margin-top:4px}
.card-dims{font-family:monospace;font-size:10px;color:#666;margin-top:4px}
.card.failed{border-color:#B44D3E}
.card.pending{opacity:0.4}
.status-bar{display:flex;gap:16px;margin:16px 0;font-family:monospace;font-size:13px}
.status-bar span{padding:4px 12px;border-radius:4px}
.s-gen{background:#0a2a1a;color:#04E586}
.s-fail{background:#2a0a0a;color:#B44D3E}
.s-pend{background:#1a1a1a;color:#666}
</style></head><body>
<h1>Jasmino — Image QA Gallery</h1>
"""

# Status summary
statuses = {}
for e in manifest["entries"]:
    s = e["status"]
    statuses[s] = statuses.get(s, 0) + 1

html += '<div class="status-bar">'
for s, c in sorted(statuses.items()):
    cls = "s-gen" if s == "generated" else "s-fail" if s == "failed" else "s-pend"
    html += f'<span class="{cls}">{s}: {c}</span>'
html += '</div>'

# Group by category
categories = {}
for e in manifest["entries"]:
    cat = e["category"]
    if cat not in categories:
        categories[cat] = []
    categories[cat].append(e)

cat_order = ["homepage", "t2_division", "t3_service", "industries", 
             "infrastructure", "case_study", "news", "video"]

for cat in cat_order:
    if cat not in categories:
        continue
    entries = categories[cat]
    html += f'<h2>{cat.replace("_", " ").title()} ({len(entries)})</h2>'
    html += '<div class="grid">'
    
    for e in entries:
        status_cls = e["status"]
        img_tag = ""
        if e["status"] == "generated" and Path(e["output_path"]).exists():
            img_tag = f'<img src="{e["output_path"]}" alt="{e["caption"]}" loading="lazy">'
        else:
            img_tag = f'<div style="width:100%;aspect-ratio:3/2;background:#222;display:flex;align-items:center;justify-content:center;color:#444;font-size:12px">{e["status"]}</div>'
        
        html += f'''<div class="card {status_cls}">
            {img_tag}
            <div class="card-info">
                <div class="card-id">{e["id"]}</div>
                <div class="card-caption">{e["caption"]}</div>
                <div class="card-dims">{e["width"]}×{e["height"]} · {e.get("file_size_kb", "—")}KB</div>
            </div>
        </div>'''
    
    html += '</div>'

html += '</body></html>'

with open("staging/qa-gallery.html", "w") as f:
    f.write(html)
print("QA gallery written: staging/qa-gallery.html")
```

---

## Video Entries

The manifest contains 7 video entries (VID-02 through VID-08). The Gemini image API **cannot generate video**. These video prompts are provided as creative direction for:

- **Kling 3.0** (the established video generation tool for this project), or
- **Google Veo** via Gemini API if available

Skip video entries during image generation (the script already filters them out).

---

## File Structure After Generation

```
staging/
├── qa-gallery.html              ← Visual QA review page
├── homepage/
│   ├── hp-01.webp               ← Hero video keyframe
│   ├── hp-02.webp               ← USP section background
│   ├── hp-03.webp               ← Integrated model background
│   └── hp-04.webp               ← CTA background
├── t2_division/
│   ├── ed-g1.webp               ← Engineering Design gallery 1
│   ├── ed-g2.webp ... ed-g5.webp
│   ├── ed-s1.webp ... ed-s4.webp
│   ├── em-g1.webp ... em-g5.webp
│   ├── em-s1.webp, em-s2.webp
│   ├── cp-g1.webp ... cp-g5.webp
│   ├── cp-s1.webp ... cp-s4.webp
│   ├── rp-g1.webp ... rp-g5.webp
│   └── rp-s1.webp, rp-s2.webp
├── t3_service/
│   ├── rl-01.webp ... rl-08.webp     ← Rubber Linings
│   ├── ppd-01.webp ... ppd-08.webp   ← Process & Plant Design
│   ├── eqd-01.webp ... eqd-08.webp   ← Equipment Design
│   ├── pd-01.webp ... pd-08.webp     ← Piping Design
│   ├── wt-01.webp ... wt-08.webp     ← Water Treatment
│   ├── se-01.webp ... se-08.webp     ← Steel Equipment
│   ├── frp-01.webp ... frp-08.webp   ← Plastic & FRP
│   ├── pl-01.webp ... pl-08.webp     ← Plastic Linings
│   ├── cr-01.webp ... cr-08.webp     ← Coatings & Resin
│   ├── ir-01.webp ... ir-08.webp     ← Inspection & Repair
│   ├── cc-01.webp ... cc-08.webp     ← Custom Compounds
│   └── ep-01.webp ... ep-08.webp     ← Engineered Products
├── industries/
│   └── ind-01.webp ... ind-08.webp
├── infrastructure/
│   ├── infra-01.webp                  ← Hero fallback
│   ├── infra-in-01.webp ... infra-in-04.webp
│   ├── infra-haw-01.webp ... infra-haw-04.webp
│   └── infra-gbt-01.webp ... infra-gbt-04.webp
├── case_study/
│   ├── cs-fgd-01.webp ... cs-fgd-05.webp
│   ├── cs-par-01.webp ... cs-par-05.webp
│   ├── cs-des-01.webp ... cs-des-05.webp
│   ├── cs-cab-01.webp ... cs-cab-05.webp
│   ├── cs-clv-01.webp ... cs-clv-05.webp
│   └── cs-dcr-01.webp ... cs-dcr-05.webp
└── news/
    └── news-01.webp ... news-09.webp
```

---

## Cost Estimate

| Category | Count | Cost @ $0.039/image |
|----------|-------|---------------------|
| Homepage | 4 | $0.16 |
| T2 Division | 32 | $1.25 |
| T3 Service | 96 | $3.74 |
| Industries | 8 | $0.31 |
| Infrastructure | 13 | $0.51 |
| Case Studies | 30 | $1.17 |
| News | 9 | $0.35 |
| **Total** | **192** | **~$7.50** |

With retries (assume 20% retry rate): **~$9.00 total**.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `403 Forbidden` | Check API key is valid and has Gemini API access enabled |
| `429 Rate Limit` | Increase `DELAY_BETWEEN_CALLS` to 4-5 seconds |
| `No image in response` | The prompt may have triggered safety filters — simplify the prompt and retry |
| Images too "AI polished" | The prompts already include anti-AI-slop directives; if still too clean, add "imperfect, grain, real photography" to the prompt |
| Wrong dimensions | The script resizes to target dimensions after generation; Gemini may not honor exact pixel sizes natively |
| `ResponseValidationError` | Model may be returning thought signatures — ensure you're using the latest `google-genai` SDK |

---

## Notes for the Agent

1. **Work category by category.** Don't batch all 192 at once. Generate T2 first, let the user review, then proceed.
2. **Save manifest after every image.** The script does this automatically — it's a checkpoint in case of interruption.
3. **Report failures clearly.** After each batch, list any failed entries with their error messages.
4. **Don't modify prompts.** The prompts are carefully crafted. If an image fails, retry as-is before suggesting prompt changes.
5. **Skip video entries.** The manifest includes 7 video entries — these are for Kling/Veo, not the image API.
6. **Generate the QA gallery** after the first batch (T2) so the user can review the style immediately before committing to all 192.
