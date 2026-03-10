# Image Inventory — Jasmino Website

This document lists all places where images are used in the Jasmino website, with context about what each image represents.

---

## 1. Local Assets

### `src/assets/logo.png` & `src/assets/logo-white.png`
- **Location:** `src/components/Navbar.jsx` (lines 4–5, 223–224)
- **Context:** Site logo used in the navigation bar. Two variants: dark logo for light backgrounds, white logo for dark/transparent backgrounds.
- **Note:** The repository contains `logo.svg` and `logo-white.svg` in assets; Navbar imports `.png` versions. Ensure PNG files exist or update imports to use SVG.

---

## 2. Divisions Section (Homepage)

### `src/components/Divisions.jsx`
- **Location:** Line 79 — `backgroundImage` on `.div-visual-photo`
- **Source:** `DIVISION_PHOTOS` object (lines 6–11)
- **Images:**
  | Division ID | URL | Context |
  |-------------|-----|---------|
  | `eng` | `photo-1581093458791` | Engineering Design — 3D design/engineering |
  | `mfg` | `photo-1504917595217` | Manufacturing — fabrication hall |
  | `cor` | `photo-1590959651373` | Corrosion Protection — rubber lining |
  | `rub` | `photo-1532187863486` | Rubber Products — R&D lab |

---

## 3. What We Do Page

### `src/pages/WhatWeDoPage.jsx`
- **Location:** Lines 77–84 (`galleryCards`), line 356 (`<img src={card.img}>`)
- **Images:** 6 gallery cards for the integrated model stages:
  | Tag | URL | Context |
  |-----|-----|---------|
  | ENG | `photo-1581093458791` | 3D Plant Model — SP3D |
  | MFG | `photo-1504917595217` | Pressure Vessel Fabrication |
  | COR | `photo-1590959651373` | Rubber Lining Application |
  | RUB | `photo-1532187863486` | Compound Development Lab |
  | QA | `photo-1565793298595` | Final Inspection & Delivery |
  | ALL | `photo-1513828583688` | Delivered — FGD Absorber |

---

## 4. Case Studies

### `src/components/CaseStudies.jsx` (Homepage featured section)
- **Location:** Line 32 — `backgroundImage` on `.case-study-photo`
- **Source:** `src/data/caseStudies.js` — `study.image` for each case study

### `src/pages/CaseStudiesPage.jsx`
- **Location:** Line 108 — `backgroundImage` on `.csp-card-photo`
- **Source:** `src/data/caseStudies.js` — `cs.image`

### `src/pages/CaseStudyDetail.jsx`
- **Location:** Line 173 — `<img src={g.img}>` for gallery items
- **Source:** `src/data/caseStudies.js` — `detail.heroImage` and `detail.gallery[].img`

### Case study images in `src/data/caseStudies.js`:
| Case Study | Card Image | Hero Image | Gallery Images |
|-------------|------------|------------|----------------|
| FGD Absorber (fgd-absorber) | `photo-1581093458791` | same | 3 images: absorber fabrication, lining, completed tower |
| Phosphoric Acid (phosphoric-acid) | `photo-1504328345606` | same | 3 images: reactor, EPDM lining, completed battery |
| Desalination (desalination) | `photo-1559827260` | same | 3 images: FRP vessels, dosing skid, installation |
| Chlor-Alkali (chlor-alkali) | `photo-1565793298595` | same | 3 images: brine vessels, PVDF lining, battery |
| Mining Leach (mining-leach) | `photo-1541888946428` | same | 3 images: leach vessel, dual-compound lining, piping |
| Petrochemical Column (petrochemical-column) | `photo-1504917595217` | same | 3 images: column turnaround, duplex tray, HAW lining |

---

## 5. Infrastructure Page

### `src/pages/InfrastructurePage.jsx`
- **Hero fallback (line 98):** `backgroundImage` — `data.hero.fallback_image` from `src/data/infrastructureData.js`
  - Fabrication hall image (`photo-1504917595217`) — used when video is not available

- **Facility galleries (line 298):** `<img src={img.src}>` — per-facility gallery from `src/data/infrastructureData.js`

### Facility gallery images in `src/data/infrastructureData.js`:

**India (HQ):**
- Main Fabrication Hall (span-2)
- Engineering / 3D Design Office
- Welding / SAW Station
- QA/QC / Metallurgy Lab

**Germany (HAW):**
- Rubber Lining Bay (span-2)
- R&D Lab / Compound Testing
- Surface Prep / Blast Cleaning
- Curing / Autoclave Bay

**Turkey (GBT):**
- Application Bay (span-2)
- Workshop / Pipe Lining
- Field Service / On-Site Lining
- QC / Holiday Testing

---

## 6. About Page

### `src/pages/AboutPage.jsx`
- **Timeline cards (lines 12–18):** `timelineCards[].img` — 6 images for company history milestones (1984–Today)
- **Values section (lines 21–24):** `values[].img` — 3 images for company principles

---

## 7. News Page

### `src/pages/NewsPage.jsx`
- **Location:** Line 21 — `<img src={article.img}>`
- **Source:** `src/data/news.js` — each article has an `img` URL (9 articles)

---

## 8. T2 / Service Pages (Division sub-pages)

### `src/data/t2Data.js`
- **Service grids:** Each division (Engineering, Manufacturing, Corrosion, Rubber) has:
  - Hero/carousel images
  - Service grid items with `img` property (5 items per division)
- **Gallery components:** Used by `src/components/T2/Gallery.jsx` (line 37) — `<img src={item.img}>`
- **ServiceGrid:** `src/components/T2/ServiceGrid.jsx` (lines 38–40) — `item.img` when present

---

## 9. Sample / Static HTML Files (Reference Only)

These are sample/prototype HTML files, not part of the main React app:

- **`sample/t2 pages/corrosion-protection.html`** — Unsplash gallery (Rubber Lining, Surface Prep, Spark Testing)
- **`sample/t2 pages/equipment-manufacturing.html`** — Unsplash gallery (Fabrication Hall, Welding Bay, NDT Inspection)
- **`sample/t3/t3-rubber-linigs.html`** — Hero image + 5 gallery slides (lining, spark testing, vessel interior, surface prep, autoclave)
- **`sample/what-we-do.html`** — 6 capability images (Engineering, Fabrication, Lining, R&D Lab, Inspection, Delivered)
- **`sample/jasmino-infrastructure-v2.html`** — Main fabrication hall, Engineering office

---

## 10. CSS Background Images (Decorative)

These use CSS gradients or inline SVG patterns, not photo assets:

- **`src/styles/design-system.css`** — Grid/gradient patterns
- **`src/styles/contact-page.css`** — Hero grid overlay
- **`src/styles/what-we-do-page.css`** — Section backgrounds
- **`src/styles/case-studies-page.css`** — Hero and section overlays
- **`src/styles/trust-band.css`** — Gradient overlays
- **`src/styles/integrated-model.css`** — Inline SVG noise texture (data URI)
- **`src/styles/infrastructure-page.css`** — Hero grid
- **`src/styles/about-page.css`** — Section backgrounds
- **`src/styles/global-presence.css`** — Map section
- **`src/styles/industries-page.css`** — Hero
- **`src/styles/group-page.css`** — Hero
- **`src/styles/layout.css`** — General layout patterns

---

## Image Source Summary

| Source | Count | Notes |
|--------|-------|------|
| Local assets | 2 | `logo.png`, `logo-white.png` (or SVG equivalents) |
| Unsplash (external) | 50+ | All division, case study, gallery, news, and T2 images |
| CSS gradients/SVG | N/A | Decorative only, no photo files |

All external images use Unsplash URLs with query params for sizing (e.g. `?w=600&h=400&q=75&fit=crop`).
