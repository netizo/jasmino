# JASMINO CORPORATION — WEBSITE SOURCE OF TRUTH

> Single reference document for the complete Jasmino website rebuild.
> Covers: sitemap, information architecture, design system, visual direction, UX strategy, templates, section specifications, component inventory, build status, and production guidelines.
>
> Last updated: 6 February 2026

---

## TABLE OF CONTENTS

1. [Company Context](#1-company-context)
2. [Sitemap & Information Architecture](#2-sitemap--information-architecture)
3. [Design System](#3-design-system)
4. [Visual Direction & Aesthetic Rules](#4-visual-direction--aesthetic-rules)
5. [UX Strategy & Principles](#5-ux-strategy--principles)
6. [Navigation System](#6-navigation-system)
7. [Home Page — Section Specifications](#7-home-page--section-specifications)
8. ["What We Do" Templates — T1, T2, T3](#8-what-we-do-templates--t1-t2-t3)
9. [Component Inventory & Patterns](#9-component-inventory--patterns)
10. [Three.js & Interactive Elements](#10-threejs--interactive-elements)
11. [Photography & Imagery Rules](#11-photography--imagery-rules)
12. [Content Guidelines](#12-content-guidelines)
13. [Build Status & Deliverables](#13-build-status--deliverables)
14. [Technical Stack & Constraints](#14-technical-stack--constraints)

---

## 1. COMPANY CONTEXT

### What Jasmino Does
Jasmino Corporation is an industrial process equipment company. Their differentiator is **vertical integration** — they are the only company that designs, manufactures, and protects industrial process equipment under one roof. This eliminates the 3–4 vendor handoff problem that plagues the industry.

### The Four Divisions

| # | Division | Sub-Services | Focus |
|---|----------|-------------|-------|
| 01 | **Engineering Design** | Process & Plant Design, Equipment Design, Piping Design, Water Treatment | Consulting/design work, no physical product |
| 02 | **Equipment Manufacturing** | Steel Equipment, Plastic & FRP Equipment | Physical fabrication, specs/capacity matter |
| 03 | **Corrosion Protection** | Rubber Linings, Plastic Linings, Coatings & Resin Systems, Inspection & Repair | Mix of on-site and shop floor. Crown jewel division with HAW/GBT heritage |
| 04 | **Rubber Products** | Custom Compounds, Engineered Products | R&D and formulation-heavy, lab/chemistry angle |

### Key Company Facts

| Fact | Value |
|------|-------|
| Years of operation | 40+ (since ~1984) |
| Countries served | 15+ |
| Combined shop floor | 130,000+ m² |
| Reorder rate | 97% |
| Proven rubber formulations | 2,000+ |
| Rubber annual capacity | 9.5M kg/year |
| Welding procedures | 150+ |
| On-site technicians | 150+ deployed globally |

### Facilities

| Location | Entity | Area | Capabilities |
|----------|--------|------|-------------|
| India | Jasmino HQ | 80,000 m² | Engineering, Manufacturing, Rubber Products |
| Germany | HAW Linings | 30,000 m² | Rubber & Plastic Linings |
| Turkey | GBT | 20,000 m² | Linings & Coatings |

### Certifications & Standards
ASME (Section VIII Div 1 & 2), API (650/620), PED, ISO 9001:2015, ISO 14001:2015, TÜV, Bureau Veritas (BV), IS 2825, ASME B31.3, PD 5500

### Brand Story (One Sentence)
*"The only company that designs, manufactures, and protects industrial process equipment under one roof."*

---

## 2. SITEMAP & INFORMATION ARCHITECTURE

### Confirmed 21-Page Sitemap

```
HOME

ABOUT (2 pages)
├── Our Story (timeline, leadership, acquisition narrative)
└── Jasmino Group (HAW, GBT, global map)

WHAT WE DO (17 pages, 3 templates)
├── Overview (integrated model) .................. T1
├── Engineering Design ........................... T2
│   ├── Process & Plant Design ................... T3
│   ├── Equipment Design ......................... T3
│   ├── Piping Design ............................ T3
│   └── Water Treatment .......................... T3
├── Equipment Manufacturing ...................... T2
│   ├── Steel Equipment .......................... T3
│   └── Plastic & FRP Equipment .................. T3
├── Corrosion Protection ......................... T2
│   ├── Rubber Linings ........................... T3
│   ├── Plastic Linings .......................... T3
│   ├── Coatings & Resin Systems ................. T3
│   └── Inspection & Repair ...................... T3
└── Rubber Products .............................. T2
    ├── Custom Compounds ......................... T3
    └── Engineered Products ...................... T3

INDUSTRIES (1 page, sectioned by industry)

INFRASTRUCTURE (1 page, India/HAW/GBT as sections)

NEWS (1 page)

CONTACT (1 page)
```

### Architecture Rationale
- "What We Do" stays deep (17 pages) because each service earns its own page for **SEO** and **proposal linking** (engineers paste direct service page URLs into vendor evaluations).
- Industries consolidated into one strong sectioned page instead of 7 thin ones.
- Infrastructure consolidated into one page with facility sections.
- About trimmed from 4 pages to 2.
- Original 32-page plan was trimmed to 21.

### Progressive Depth Model
```
T1 (Overview) → "What does Jasmino do?" → Routes to division
T2 (Division) → "What services exist in this area?" → Routes to service
T3 (Service)  → "Can they handle MY specific need?" → Routes to contact
```
Each level adds detail. No level repeats what the previous level said.

---

## 3. DESIGN SYSTEM

### Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| **Serif / Display** | Fraunces | 300–700, italic | Headlines, titles, editorial moments. `font-style: italic` for emphasis words. |
| **Sans / Body** | Sora | 300–700 | Body text, UI elements, navigation, buttons |
| **Mono / Technical** | JetBrains Mono | 300–600 | Labels, stats, overlines, code references, data, captions, pill tags |

### Type Scale

| Element | Font | Size | Weight | Line Height | Letter Spacing |
|---------|------|------|--------|-------------|---------------|
| H1 (Hero) | Fraunces | 52–56px | 500 | 1.04–1.06 | -0.02em |
| H2 (Section) | Fraunces | 34–48px | 400–500 | 1.1–1.12 | -0.01 to -0.025em |
| H3 (Card Title) | Fraunces | 28–32px | 400 | 1.12 | -0.015em |
| H4 (Subsection) | Sora | 14–17px | 600–700 | 1.3–1.35 | — |
| Body | Sora | 14.5–16px | 400 | 1.7 | — |
| Body Small | Sora | 13px | 400 | 1.65 | — |
| Overline | JetBrains Mono | 10.5–11px | 500 | — | 0.14–0.16em, uppercase |
| Stat Number | JetBrains Mono | 22–36px | 600 | 1 | — |
| Pill / Tag | JetBrains Mono | 10–11px | 400–500 | — | 0.04–0.08em |
| Caption | JetBrains Mono | 9px | 400 | — | 0.06em, uppercase |

### Color Palette

#### Primary
| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| Navy | `#0B1D34` | `--navy` | Darkest backgrounds, navbar, footer |
| Dark | `#0D2847` | `--dark` | Dark section backgrounds, hero |
| Blue | `#1B4B8F` | `--blue` | Primary brand blue, links, buttons |
| Blue Bright | `#3B7BDB` | `--blue-bright` | Hover states, highlights |
| Green | `#04E586` | `--green` | Accent, CTAs, active states, overlines |

#### Neutrals
| Name | Hex | Variable | Usage |
|------|-----|----------|-------|
| g50 | `#FAFBFC` | `--g50` | Cream section backgrounds |
| g100 | `#F0F2F5` | `--g100` | Card backgrounds on cream, subtle fills |
| g150 | `#E4E7EC` | `--g150` | Borders, dividers |
| g200 | `#D5D9E0` | `--g200` | Hover borders |
| g300 | `#B0B7C3` | `--g300` | Placeholder text, wireframe borders |
| g400 | `#8892A2` | `--g400` | Secondary text, captions |
| g500 | `#6B7280` | `--g500` | Body text |
| g600 | `#4B5563` | `--g600` | Emphasized body text, pill text |
| g700 | `#374151` | `--g700` | Subheadings |
| g800 | `#1F2937` | `--g800` | Strong text |
| g900 | `#0C1220` | `--g900` | Page text, near-black |
| Surface | `#F4F5F7` | `--surface` | Page background |
| White | `#FFFFFF` | `--white` | Card backgrounds, light sections |

#### Semantic
| Name | Value | Usage |
|------|-------|-------|
| Green Dim | `rgba(4,229,134,0.08)` | Green tinted backgrounds |
| Green Glow | `rgba(4,229,134,0.25)` | Glow effects, hover halos |
| Green Line | `rgba(4,229,134,0.35)` | Connecting lines, flow indicators |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--r` | 12px | Buttons, pills, small cards |
| `--r-lg` | 18px | Standard cards |
| `--r-xl` | 24px | Section blocks, large containers |
| `--r-2xl` | 32px | Division showcase cards |

### Spacing System
- Section padding: `56px` horizontal, `48–80px` vertical
- Card padding: `24–48px`
- Card gap: `20–28px`
- Grid gaps: `16–24px`

### Easing
```css
--ease: cubic-bezier(0.16, 1, 0.3, 1);     /* Primary — snappy overshoot */
--ease-out: cubic-bezier(0, 0, 0.2, 1);     /* Subtle ease-out */
```

### Engineering Grid Pattern (Signature Texture)

A dual-layer CSS grid pattern that appears throughout the site, creating a blueprint/drafting paper feel. This is the most distinctive visual element of the design system.

```css
/* Light variant (cream/white sections) */
.eng-grid {
  background-image:
    linear-gradient(rgba(27,75,143,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(27,75,143,0.04) 1px, transparent 1px),
    linear-gradient(rgba(27,75,143,0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(27,75,143,0.07) 1px, transparent 1px);
  background-size: 20px 20px, 20px 20px, 100px 100px, 100px 100px;
}

/* Dark variant (navy/dark sections) */
.eng-grid-dark {
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 20px 20px, 20px 20px, 100px 100px, 100px 100px;
}
```
- Minor grid: 20px intervals, very subtle
- Major grid: 100px intervals, slightly stronger
- Creates the signature "designed BY an engineering company" feel

### Section Background Alternation Pattern
Sections alternate between light and dark to create visual rhythm and prevent fatigue:
```
Hero (dark) → Trust Strip (white) → Divisions (cream + eng-grid) → 
Integrated Model (dark) → Industries (white) → Proof Points (dark) → 
Global Reach (navy) → News (cream) → CTA (blue gradient) → Footer (navy)
```

---

## 4. VISUAL DIRECTION & AESTHETIC RULES

### Core Aesthetic: "Technical Precision as Visual Identity"
The site should look like it was designed **BY** an engineering company, not **FOR** one.

### What Makes It Distinctive (DO)
1. **Engineering grid backgrounds** — Blueprint-paper texture in both light and dark variants. Runs through most sections. This is the #1 visual signature.
2. **Custom SVG schematics** — Isometric/technical drawings of vessels, piping, lining layers, compound flows per division. Green-on-dark palette. These feel proprietary to Jasmino.
3. **Three.js 3D scenes** — Interactive 3D for key visual moments (hero vessel, division cards, globe). Not decorative — each scene visualizes the actual work (plant assembly, pressure vessel, lining layers, molecular compounds).
4. **Typography as visual weight** — Large serif headlines (Fraunces italic), oversized monospace numbers, faded background numerals (e.g., "01" at 120px behind division cards).
5. **Monospace everywhere for data** — Stats, labels, overlines, pill tags all in JetBrains Mono. Signals precision.
6. **Photos as evidence, not decoration** — Desaturated, captioned, contained in frames. They read as documentation, not marketing. Overlay mono labels like "Fabrication · Shop Floor".
7. **Fresnel rim-glow shaders** on 3D objects — Gives them a holographic, CAD-viewport feel.
8. **Particle systems** — Subtle floating dust/flow particles in 3D scenes. Additive blending, very low opacity.
9. **Corner bracket decorations** on cards — Subtle L-shaped brackets that turn green on hover.
10. **Glass morphism accents** — `backdrop-filter: blur(12px)` on dark section cards. Transparent borders.

### What to Avoid (DON'T)
1. **No stock photo hero backgrounds** — This is what makes every industrial site look the same.
2. **No generic AI aesthetics** — No purple gradients, no Inter/Roboto, no cookie-cutter card grids.
3. **No decorative photos** — Every image must show actual work or serve as evidence.
4. **No full-bleed imagery** — Photos are contained in frames with captions, not splashed behind content.
5. **No hero carousels or sliders** — The Three.js vessel IS the hero visual.
6. **No emoji icons in production** — Wireframe uses emoji placeholders; production uses custom SVG line icons.
7. **No gratuitous animation** — Precision easing, staggered reveals, engineer-designed motion. Not bouncy marketing effects.

### Photography Treatment Rules
- **Saturation:** `filter: saturate(0.15) brightness(0.65) contrast(1.15)` (near-monochrome)
- **On hover:** `filter: saturate(0.3) brightness(0.7) contrast(1.1)` (slightly warmer)
- **Context:** Always captioned with mono label overlay (e.g., "Engineering · 3D Plant Modelling")
- **Format:** Thin strip at bottom of visual panels (64px height), or contained in frames
- **Purpose:** Evidence of real work, not atmospheric decoration

---

## 5. UX STRATEGY & PRINCIPLES

### Target Users

| Persona | Description | What They Need |
|---------|-------------|---------------|
| **Primary** | Plant engineer / project manager at petrochemical, chemical, power, or fertilizer company | Specific problem (new equipment, corrosion failure, plant expansion). Evaluating vendors. Time-poor, skeptical, technically literate. |
| **Secondary** | Procurement head | Justify vendor selection. Wants credentials, certifications, proof of scale. Compares 3–5 vendors. |
| **Tertiary** | EPC consultant | Needs technical depth fast — specs, materials, codes compliance. |

### Core UX Principles
1. **Scanability over storytelling** — Users scan, not read. Every section needs key info extractable in 2–3 seconds.
2. **Credibility before creativity** — Trust signals (certs, stats, logos, standards) matter more than animation. Place proof early.
3. **Navigation clarity** — An engineer looking for "rubber lining specs" shouldn't figure out the IA. Wayfinding must be instant.
4. **Technical depth on demand** — Surface key facts first, let users drill deeper. Progressive disclosure, not walls of text.
5. **Clear next action** — Every page makes the CTA obvious: get a quote, download brochure, call someone.
6. **Mobile reality** — 40–60% of discovery happens on mobile (engineer on-site). Everything must degrade gracefully.

### Cross-Site UX Rules
- **Trust strip** — Certifications/standards appear on every page (full on home, compact bar on inner pages)
- **Contact accessibility** — Phone + email visible without scrolling to footer
- **Sibling navigation** — Every page makes lateral movement easy (other divisions, other services)
- **Consistent CTA language** — "Discuss a project" / "Get a quote" — same verbs across all pages
- **Copy-friendly specs** — Table data is plain text, scannable, printable. Engineers paste into evaluation reports.

---

## 6. NAVIGATION SYSTEM

### Desktop Navbar
- Dark background (`var(--navy)`), flush with hero
- **Logo:** "Jasmino" text wordmark (Fraunces serif, left-aligned)
- **About:** Simple dropdown → Our Story, Jasmino Group
- **What We Do:** Mega menu with 4-column grid showing all 12 services organized by division
- **Industries, Infrastructure, News:** Flat links
- **Contact Us:** Green CTA button (right side, always visible)
- Z-index: 100 (above all content)

### Mega Menu Structure (What We Do)
```
┌─────────────────────────────────────────────────────────────────┐
│ ENGINEERING DESIGN  │ MANUFACTURING      │ CORROSION         │ RUBBER PRODUCTS   │
│ Process & Plant     │ Steel Equipment    │ Rubber Linings    │ Custom Compounds  │
│ Equipment Design    │ Plastic & FRP      │ Plastic Linings   │ Engineered Prods  │
│ Piping Design       │                    │ Coatings & Resin  │                   │
│ Water Treatment     │                    │ Inspection/Repair │                   │
│                     │                    │                   │                   │
│ [View Division →]   │ [View Division →]  │ [View Division →] │ [View Division →] │
└─────────────────────────────────────────────────────────────────┘
```

### Mobile Navigation
- Hamburger toggle
- Vertical slide-down menu
- Dropdowns flatten into expandable sections
- Contact CTA always visible

---

## 7. HOME PAGE — SECTION SPECIFICATIONS

### Section Flow Summary

| Section | Background | Min Height | Purpose |
|---------|-----------|------------|---------|
| S1 — Hero + Trust Strip | Dark gradient + eng-grid-dark / White | 100vh + auto | Orient + credibility |
| S2 — What We Do (Divisions) | Cream + eng-grid | 80vh | Route to divisions |
| S3 — Integrated Model | Dark + eng-grid-dark | 60vh | Differentiate (brand story) |
| S4 — Industries | White | 60vh | Relevance ("we serve YOUR sector") |
| S5 — Proof Points | Dark | auto (compact) | Trust via animated stats |
| S6 — Global Reach | Navy + eng-grid-dark | 60vh | Scale (globe + facilities) |
| S7 — News | Cream | 60vh | Activity signal |
| S8 — CTA | Blue gradient | auto | Convert |
| S9 — Footer | Navy | auto | Navigate (full sitemap) |

### S1 — HERO + TRUST STRIP

**Layout:** Full viewport height. Two-column grid: left = content, right = Three.js vessel.

**Left side:**
- Badge: Pulsing green dot + "Engineering Excellence Since 1984" (mono, pill shape)
- Headline: "We *design* it. We build it. We *protect* it." (Fraunces, green italic on "design" and "protect")
- Subtext: "The only company that designs, manufactures, and protects industrial process equipment under one roof."
- Two CTAs: "What We Do" (green primary) + "Contact Us" (secondary outline)

**Right side:**
- Three.js interactive pressure vessel
- Cycles through 3 phases: Design (wireframe) → Build (metal) → Protect (green coating)
- Phase indicator pills below vessel sync with animation (Design | Build | Protect)

**Trust Strip** (glued directly below hero, no gap):
- Certification badges: ASME, API, PED, ISO, TÜV, BV
- Vertical divider
- Mini stats: 40+ Years | 15+ Countries | 97% Reorder
- White background, compact single row

**Scroll indicator:** Centered at bottom of hero, pulsing line + "Scroll" label

### S2 — WHAT WE DO (DIVISION SHOWCASE)

**ALREADY BUILT: `jasmino-s2-v2.html`**

**Layout:** 4 stacked full-width cards, alternating image/content sides (even cards flip via `direction: rtl`).

**Each card has:**
- **Visual panel** (left/right alternating): Dark gradient background, Three.js 3D scene per division, photo strip at bottom (64px, desaturated), faded background number (01–04, 120px)
- **Content panel**: Division number (mono), title (Fraunces), description, stat inline block, service pills (clickable, blue fill on hover), "Explore →" link

**Three.js scenes per division:**
1. Engineering: Isometric plant assembly (vessel + heat exchanger + piping + pump + rack frame + flow particles)
2. Manufacturing: Horizontal pressure vessel with pulsing weld seams, saddle supports, internal baffles (ghosted), spark particles
3. Corrosion Protection: Exploded cutaway cylinder showing 4 lining layers (steel → primer → adhesive → rubber lining). Layers explode on hover.
4. Rubber Products: Molecular compound visualization (nodes + bonds + orbital particles). Nodes float/breathe.

**Animations:** Scroll-triggered entrance (`opacity: 0; transform: translateY(40px)` → visible). Cards staggered by 80ms each. Auto-rotation on all 3D scenes. Mouse parallax on hover.

### S3 — INTEGRATED MODEL

**Background:** Dark (`--dark`) with eng-grid-dark

**Header:** "One company. Zero *handoffs.*" (Fraunces italic on "handoffs")
**Subtext:** Explains 3–4 vendor problem.

**Process flow:** 5 interactive steps in a horizontal flow:
```
01 Design → 02 Fabricate → 03 Protect → 04 Inspect → 05 Deliver
```
- Each step: Circle icon with number, step name, sub-label
- Connected by gradient green lines with arrow endpoints
- Steps are clickable — reveal detail cards with description + service tags
- Hover: Icon scales up, green background tint

**Problem / Solution cards:** Side-by-side glass morphism cards
- Left: "The Industry Problem" — 3–4 vendors, handoffs, delays
- Right: "The Jasmino Model" — one company, one contract, one accountability (green border accent)

### S4 — INDUSTRIES

**Background:** White
**Header:** "Built for the *harshest* environments" + "View All Industries" ghost link

**Layout:** 4×2 grid of industry cards (8 industries):
Chemical, Petrochemical, Power, Water Treatment, Fertilizer, Mining, Pharmaceutical, Food & Beverage

**Each card:** Icon (custom SVG in production, emoji placeholder in wireframe), name, subtitle (e.g., "Reactors, tanks, piping"). Hover: translateY(-3px), shadow, blue border.

### S5 — PROOF POINTS

**Background:** Dark, compact strip (no min-height)
**Layout:** 4-column grid, centered
**Content:** 40+ Years | 15+ Countries | 130K+ m² Shop Floor | 97% Reorder Rate
**Treatment:** Scroll-triggered counter animation. JetBrains Mono numbers at 36px. Green color.

### S6 — GLOBAL REACH

**Background:** Navy + eng-grid-dark
**Layout:** Two-column split: left = Three.js interactive globe, right = content + facility cards

**Globe:** (ALREADY BUILT: `jasmino-globe.jsx`)
- Dotted sphere using InstancedMesh, 200 latitude rows, ~55K dots
- Country border lines, graticule grid
- Auto-rotates at 0.2 rad/s (~31s full rotation)
- Jasmino presence locations glow differently (green pulsing dots)
- Mouse-responsive with smooth damping
- Light mode with dark navy land dots, light gray ocean

**Facility cards:**
- 🇮🇳 India — Jasmino HQ (80,000 m² · Engineering, Manufacturing, Rubber)
- 🇩🇪 Germany — HAW Linings (30,000 m² · Rubber & Plastic Linings)
- 🇹🇷 Turkey — GBT (20,000 m² · Linings & Coatings)

### S7 — NEWS

**Background:** Cream
**Header:** "What's *happening*" + "All News" ghost link
**Layout:** 3-column grid of news cards
**Each card:** Image placeholder, date (mono), title (Fraunces), excerpt

### S8 — CTA

**Background:** Blue gradient (`linear-gradient(135deg, var(--blue), #1A3F73)`)
**Layout:** Split — headline + subtext left, buttons right
**Headline:** "Ready to discuss your *project?*"
**Buttons:** "Get in Touch" (green primary) + "Download Brochure" (white outline)
**Production:** Three.js concentric wave animation as background shader

### S9 — FOOTER

**Background:** Navy
**Layout:** 4-column grid: Company blurb | What We Do links | Company links | Contact info
**Bottom bar:** © 2026 Jasmino Corporation | Privacy, Terms, Sitemap links

---

## 8. "WHAT WE DO" TEMPLATES — T1, T2, T3

### Template 1 — What We Do Overview (1 page)

**Job:** Answer "what does Jasmino do?" and help visitor self-select into the right division. This is a ROUTING page.

**UX Flow:** Entry → Orient → Route → Prove → Act

| Section | Purpose | Content |
|---------|---------|---------|
| Hero + Inline Navigation | Orient + route immediately | Brand statement left, 4 clickable division cards right (icon, name, service count). Route in <3 seconds. |
| Interactive Integrated Model | Explain differentiator | Clickable node diagram. Hover/click each stage → shows services + connection to next stage. Animated gradient line fills on load. |
| Division Deep Cards | Route with confidence | 4 full-width alternating cards. Image/schematic + content. Sub-service links visible inline as pills. |
| Trust Strip | Build trust | Compact: cert badges + stats in one horizontal band |
| Cross-Cutting Capabilities | Differentiate | 3 glass cards: Global On-Site Service, HAW+GBT Integration, Quality Infrastructure |
| CTA | Convert | "Ready to discuss your project?" + buttons |

### Template 2 — Division Landing (4 pages)

**Job:** Introduce one division, establish credibility, route to individual service pages.

| Section | Purpose | Content |
|---------|---------|---------|
| Sibling Division Nav | Lateral navigation | Horizontal nav at top: Engineering / Manufacturing / Corrosion / Rubber. Highlights current. |
| Division Hero | Scope statement | Division name, description, division-specific stats (not company-wide), breadcrumb |
| Service Relationship Map | Show connections | Node graph showing how sub-services connect. Animated connection lines. |
| Sub-Service Cards | Route to leaf pages | Cards with photo strip (desaturated), 3 bullet points each, division-specific stat |
| Division Proof Point | Evidence | ONE strong proof section with project photo + data callouts. Not five generic differentiators. |
| CTA | Convert | Contextual to division |

### Template 3 — Individual Service Page (12 pages)

**Job:** Prove capability for a specific service. Help engineer decide "can they handle MY need?"

| Section | Purpose | Content |
|---------|---------|---------|
| Sibling Service Nav | Lateral navigation | Horizontal nav of sibling services within the division. Always visible. |
| Compact Header | Instant context | Service name + 1 sentence + breadcrumb. No hero image. Get to content immediately. |
| Introduction | Context | Full-width prose intro (max 820px). Captioned photo frame. Process flow schematic (SVG). |
| Tabbed Capabilities | Depth without scroll | 3 tabs: "Scope of Work" / "Software & Tools" / "Deliverables". Engineer clicks what's relevant. |
| Specs Table (conditional) | Technical data | Only on manufacturing + corrosion pages. Copy-friendly plain text, row hover highlights. |
| Materials Table (conditional) | Material expertise | Only on corrosion + rubber pages. Material types, temperature ranges, chemical resistance. |
| Integration Thread | Cross-sell | Functional link bar: "This service connects to → [other divisions]". Not a marketing box. |
| Sticky CTA Bar | Persistent conversion | Always visible after first scroll. Service name + phone + "Request Quote" + "Download Spec Sheet". |

### T3 Block Usage Matrix

| Page | Intro | Capabilities | Specs Table | Materials | Integration | Sticky CTA |
|------|-------|-------------|-------------|-----------|-------------|-----------|
| Process & Plant | ✓ | ✓ | — | — | ✓ | ✓ |
| Equipment Design | ✓ | ✓ | — | — | ✓ | ✓ |
| Piping Design | ✓ | ✓ | — | — | ✓ | ✓ |
| Water Treatment | ✓ | ✓ | — | — | ✓ | ✓ |
| Steel Equipment | ✓ | ✓ | ✓ | — | ✓ | ✓ |
| Plastic & FRP | ✓ | ✓ | ✓ | — | ✓ | ✓ |
| Rubber Linings | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Plastic Linings | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Coatings & Resin | ✓ | ✓ | — | ✓ | ✓ | ✓ |
| Inspection & Repair | ✓ | ✓ | — | — | ✓ | ✓ |
| Custom Compounds | ✓ | ✓ | — | ✓ | ✓ | ✓ |
| Engineered Products | ✓ | ✓ | — | — | ✓ | ✓ |

---

## 9. COMPONENT INVENTORY & PATTERNS

### Buttons
| Variant | Background | Text | Border | Usage |
|---------|-----------|------|--------|-------|
| Primary | `--green` | `--dark` | none | Main CTAs |
| Secondary | transparent | `--blue` (light) / white (dark) | 1.5px `--g200` / `rgba(255,255,255,0.15)` | Secondary actions |
| Ghost | none | `--blue` (light) / `--green` (dark) | none | "View All" type links with arrow |

All buttons: 13px Sora 600, 13px 26px padding, `--r` radius, `--ease` transition.

### Cards
- **Division Card** (S2): Two-column grid, `--r-2xl` radius, 1px `--g150` border. Hover: shadow escalation + border color shift.
- **Industry Card** (S4): Centered icon + name + subtitle. Hover: translateY(-3px), shadow, blue border.
- **News Card** (S7): Image + date + title + excerpt. Hover: translateY(-3px), shadow.
- **Glass Card** (dark sections): `rgba(255,255,255,0.04)` background, `rgba(255,255,255,0.06)` border, `backdrop-filter: blur(12px)`.
- **Facility Card** (S6): Horizontal layout, flag + name + details. Subtle border, hover brightness.

### Pills / Tags
- Mono font, 10–11px, 5–7px 12–16px padding, 16–20px radius
- Light: `--g100` bg, `--g600` text, `--g150` border
- Hover: `--blue` bg, white text, blue border (full fill animation via `::before` scaleX)

### Trust Badges
- 64×36px, `--g100` bg on light, `--r` small radius
- Mono font, 9px, 600 weight

### Stat Counters
- Number: JetBrains Mono 600, 36px, `--green` color
- Label: JetBrains Mono 400, 11px, `--g400`

### Overline Label
- JetBrains Mono 500, 10.5px, `--green`, 0.14em letter-spacing, uppercase
- Often preceded/followed by short decorative lines: `::before / ::after { width: 16–24px; height: 1px; background: --green; opacity: 0.4 }`

### Section Tag (Wireframe Annotation)
- Tiny label in top-left corner of each section block: "S1", "S2", etc.
- JetBrains Mono 9px, green, opacity 0.5
- Only visible in wireframe tab; stripped from production

---

## 10. THREE.JS & INTERACTIVE ELEMENTS

### Three.js Setup (Standard for All Scenes)

```javascript
// Renderer
renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

// Camera
camera = new THREE.PerspectiveCamera(30, w/h, 0.1, 100);
camera.position.set(0, 0.5, 7);

// Studio Lighting
scene.add(new THREE.AmbientLight(0x334466, 0.4));
// Key light
const key = new THREE.DirectionalLight(0xddeeff, 0.9);
key.position.set(4, 6, 5);
// Fill light
const fill = new THREE.DirectionalLight(0x5577aa, 0.35);
fill.position.set(-4, 2, 3);
// Green rim light
const rim = new THREE.DirectionalLight(0x04E586, 0.25);
rim.position.set(-2, 3, -5);
// Blue bottom light
const bottom = new THREE.PointLight(0x1B4B8F, 0.3, 12);
bottom.position.set(0, -3, 2);
```

### Custom Shaders

**Fresnel Rim-Glow** — Used on vessel shells, heat exchangers, molecular auras. Creates holographic CAD-viewport feel.
- Parameters: baseColor, rimColor, baseOpacity, rimPower
- Very low base opacity (0.01–0.03), rim adds 0.6 alpha

**Metal Material** — `MeshPhongMaterial` with specular `0xaabbcc`, shininess mapped from roughness.

**Glow Material** — `MeshPhongMaterial` with matching color and emissive.

### Interaction Pattern
- **Mouse parallax:** Card-level mousemove → maps to group rotation (x: ±0.15, y: ±0.35). Smooth lerp at 0.03.
- **Visibility:** IntersectionObserver pauses rendering when scene not in viewport.
- **Auto-rotation:** Continuous slow rotation (0.0007–0.001 rad/frame).
- **Hover response:** `hovered` flag triggers explode animations (corrosion layers), enhanced glow, etc.

### Already Built Three.js Components

| Component | File | Status | Notes |
|-----------|------|--------|-------|
| S1 Hero Pressure Vessel | — | Built (referenced in wireframe) | 3-phase cycle: Design/Build/Protect |
| S2 Engineering Scene | `jasmino-s2-v2.html` | ✅ Built | Plant assembly + flow particles |
| S2 Manufacturing Scene | `jasmino-s2-v2.html` | ✅ Built | Pressure vessel + weld glow + sparks |
| S2 Corrosion Scene | `jasmino-s2-v2.html` | ✅ Built | Exploded lining layers on hover |
| S2 Rubber Scene | `jasmino-s2-v2.html` | ✅ Built | Molecular compound + orbital particles |
| S6 Interactive Globe | `jasmino-globe.jsx` | ✅ Built | Dotted globe, presence markers, light mode |
| S8 CTA Shader Wave | — | Built (referenced) | Concentric wave animation background |

---

## 11. PHOTOGRAPHY & IMAGERY RULES

### Photo Treatment
- **Filter (default):** `saturate(0.15) brightness(0.65) contrast(1.15)` — near-monochrome
- **Filter (hover):** `saturate(0.3) brightness(0.7) contrast(1.1)` — slightly warmer
- **Container:** Always in defined frames (never full-bleed behind content)
- **Caption:** Mono label overlay at bottom (9px, uppercase, `rgba(255,255,255,0.4)`)
- **Caption format:** `[Category] · [Specific context]` (e.g., "Engineering · 3D Plant Modelling")

### Photo Strip (S2 Division Cards)
- 64px height, full width of visual panel
- Bottom-positioned with gradient overlay: `linear-gradient(to top, rgba(0,0,0,0.75), transparent)`
- Caption dot separator between terms

### Photo Sizing Rules
- Division card visuals: Full panel (min-height 480px desktop, 300px mobile)
- T2 proof section: Stacked above data callouts
- T3 intro: Inline captioned frame between text and schematic
- T2 service cards: Thin strip at top of card

### SVG Schematics
- Each division has a custom SVG schematic (process flow, vessel cross-section, lining layers, compound flow)
- Green-on-dark palette: `rgba(4,229,134,0.15)` to `rgba(4,229,134,0.3)` strokes
- Dashed lines for outlines, solid for key elements
- These pair WITH photos (schematic = identity, photo = evidence)

---

## 12. CONTENT GUIDELINES

### Voice & Tone
- **Confident but not boastful** — State capabilities as facts, not marketing claims
- **Technical precision** — Use correct industry terminology. Audiences are engineers.
- **Concise** — No marketing fluff. If it doesn't add information, cut it.
- **Active voice** — "We design" not "Equipment is designed by our team"

### Headline Patterns
- **Hero:** Action-oriented. "We *design* it. We build it. We *protect* it."
- **Section:** Benefit-first with italic Fraunces accent. "Four divisions, one *integrated* model"
- **Card:** Short, descriptive. "Engineering Design" / "Equipment Manufacturing"
- **Italic treatment:** Use Fraunces italic for the ONE key word that carries meaning. Never more than one italic word per headline.

### CTA Language
| Context | Primary CTA | Secondary CTA |
|---------|------------|---------------|
| Home hero | "What We Do" | "Contact Us" |
| Section CTA | "Get in Touch" | "Download Brochure" |
| Service page | "Request Quote" | "Download Spec Sheet" |
| Division page | "Explore [Division]" | — |

### Stat Formatting
- Use monospace for all numbers
- Include unit/context inline: "130,000+ m² combined shop floor"
- For pills: number + label separated visually (number bold/large, label mono/small)

---

## 13. BUILD STATUS & DELIVERABLES

### Completed Artifacts

| Deliverable | Description | Status |
|-------------|-------------|--------|
| 21-page sitemap | Complete information architecture | ✅ Locked |
| UX strategy document | User personas, principles, progressive depth model | ✅ Locked |
| Home page wireframe | Clean wireframe + UX notes tab, full navigation | ✅ Built (`jasmino-wireframe-clean.html`) |
| S2 Division Showcase (production) | 4 Three.js 3D scenes + full CSS | ✅ Built (`jasmino-s2-v2.html`) |
| Interactive Globe | Three.js dotted globe, presence markers, light mode | ✅ Built (`jasmino-globe.jsx`) |
| T1/T2/T3 wireframes | "What We Do" template wireframes (v5 with visuals) | ✅ Built (`jasmino-wireframes-v5.html`) |

### Still To Build

| Deliverable | Description | Priority |
|-------------|-------------|----------|
| S1 Hero (production) | Three.js pressure vessel with 3-phase animation | High |
| S3 Integrated Model (production) | Interactive node diagram with animated connections | High |
| S8 CTA shader (production) | Concentric wave shader background | Medium |
| Home page assembly | Combine all sections into single production page | High |
| T1 Overview (production) | Full production build of What We Do overview | High |
| T2 Division Landing (production) | Template build × 4 divisions | High |
| T3 Service Page (production) | Template build × 12 services | High |
| About pages (2) | Our Story + Jasmino Group | Medium |
| Industries page | Single page with 8 industry sections | Medium |
| Infrastructure page | Facilities with globe integration | Medium |
| News page | Article listing | Low |
| Contact page | Form + map + details | Medium |
| Navigation (production) | Mega menu, mobile hamburger, scroll behavior | High |

### Build Order (Recommended)
1. Home page — assemble all sections into one production page
2. Navigation — production nav with mega menu
3. T1 Overview — "What We Do" landing
4. T2 Division Landing — one template, populate for 4 divisions
5. T3 Service Page — one template, populate for 12 services
6. About, Industries, Infrastructure, Contact
7. News

---

## 14. TECHNICAL STACK & CONSTRAINTS

### Current Build Approach
- **HTML/CSS/JS** — Single-file components during prototyping
- **Three.js r128** — Via CDN (`cdnjs.cloudflare.com`)
- **Google Fonts** — Fraunces, Sora, JetBrains Mono
- **No framework yet** — Prototypes are static HTML. Production framework TBD.

### Performance Constraints
- **Three.js pixel ratio:** Capped at `Math.min(devicePixelRatio, 2)`
- **Visibility gating:** All 3D scenes pause rendering when not in viewport (IntersectionObserver)
- **Particle counts:** 40–60 per scene (low enough for mobile)
- **Image loading:** `loading="lazy"` on all below-fold images

### Responsive Breakpoints
| Breakpoint | Behavior |
|-----------|----------|
| > 1024px | Full desktop layout |
| 768–1024px | Reduced padding, smaller type scale |
| < 768px | Single column. Cards stack. 3D scenes reduce min-height to 300px. Division cards go single-column (no RTL flip). Mobile nav. |

### CSS Architecture
- CSS custom properties for all tokens
- Section backgrounds via `.sec.dk`, `.sec.navy`, `.sec.lt`, `.sec.cream` utility classes
- Engineering grid via `.eng-grid` / `.eng-grid-dark` overlay classes
- Card variants via `.card`, `.card-glass`
- Grid utilities: `.g2`, `.g3`, `.g4`

---

## APPENDIX: QUICK REFERENCE CARD

```
BRAND COLORS:    Navy #0B1D34 | Blue #1B4B8F | Green #04E586
FONTS:           Fraunces (display) | Sora (body) | JetBrains Mono (data)
AESTHETIC:       Engineering precision. Blueprint grids. SVG schematics. 3D scenes.
PHOTO RULE:      Evidence, not decoration. Desaturated. Captioned. Contained.
UX RULE:         Scanability > storytelling. Credibility > creativity.
BRAND LINE:      "The only company that designs, manufactures, and protects
                  industrial process equipment under one roof."
PAGE COUNT:      21 pages (17 under What We Do, 3 templates)
TEMPLATES:       T1 Overview | T2 Division Landing | T3 Service Page
SIGNATURE MOVE:  Engineering grid backgrounds + Fraunces italic accents +
                  JetBrains Mono data + Three.js interactive 3D
```
