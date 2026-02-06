# Jasmino Corporation Website

## Overview
Corporate website for Jasmino Corporation, an industrial process equipment company. Built with React + Vite, featuring a sophisticated design system with engineering grid backgrounds, Three.js 3D scenes, and data-driven page templates.

## Architecture
- **Framework**: React 19 + Vite 7 + React Router DOM 7
- **3D**: Three.js (with SVG fallback for non-WebGL environments)
- **Fonts**: Fraunces (serif/display), Sora (sans/body), JetBrains Mono (mono/technical)
- **Server**: Vite dev server on port 5000

## Project Structure
```
src/
  main.jsx          - Entry point
  App.jsx           - Router with all 21 page routes
  styles/
    design-system.css - CSS variables, typography, colors, grid patterns
    components.css    - Reusable component styles (buttons, cards, pills, etc.)
    layout.css        - Navbar, mega menu, footer, sibling nav, sticky CTA
  components/
    Navbar.jsx        - Desktop mega menu + mobile hamburger
    Footer.jsx        - 4-column footer with sitemap links
    ScrollReveal.jsx  - IntersectionObserver scroll-triggered fade-up
    CountUp.jsx       - Animated number counter
    HeroScene.jsx     - Three.js pressure vessel (with SVG fallback)
  pages/
    Home.jsx          - Homepage with all 9 sections
    WhatWeDoOverview.jsx - T1 template: routing page for divisions
    DivisionLanding.jsx  - T2 template: division landing (x4 divisions)
    ServicePage.jsx      - T3 template: service detail (x12 services)
    InnerPage.jsx        - Shared inner pages (About, Industries, etc.)
  data/
    divisions.js      - Division data, industries, facilities, stats
    services.js       - All 12 service detail data with capabilities
```

## Key Templates
- **T1 (Overview)**: Routes users to the right division. `/what-we-do`
- **T2 (Division)**: Shows services within a division. `/what-we-do/:divisionSlug`
- **T3 (Service)**: Deep technical detail per service. `/what-we-do/:divisionSlug/:serviceSlug`

## Design System Highlights
- Engineering grid pattern (blueprint texture) in light and dark variants
- Section background alternation (dark ↔ cream ↔ white)
- Corner bracket decorations on cards
- Glass morphism for dark section cards
- Monospace data treatment (stats, labels, overlines)
- Green (#04E586) accent throughout for CTAs and highlights

## Responsive Design
- Breakpoints: 1024px (tablet) and 768px (mobile)
- Responsive utility classes: resp-grid-2, resp-grid-3, resp-grid-4, resp-hero, resp-cta
- All grids collapse gracefully: 4-col → 2-col → 1-col
- Mobile nav switches to hamburger at 1024px
- Footer: 4-col → 2-col (tablet) → 1-col (mobile)
- Inline paddings overridden via attribute selectors at breakpoints

## Recent Changes
- 2026-02-06: Added comprehensive responsive design with tablet and mobile breakpoints
- 2026-02-06: Initial build of all key templates (Home, T1, T2, T3, inner pages)
