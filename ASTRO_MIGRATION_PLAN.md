# Astro Migration Plan

## Why Migrate

The site is a corporate marketing website with mostly static content. The current React SPA ships ~368KB JS for every page, even those with zero interactivity. Astro ships zero JS by default and only hydrates interactive components as islands.

## Current Architecture

- **Framework:** React 19 + Vite 7 + React Router DOM 7
- **3D:** Three.js (hero scene, divisions blueprints, globe)
- **Styling:** Custom CSS with design system variables (no Tailwind)
- **Fonts:** Fraunces, Sora, JetBrains Mono (Google Fonts)
- **Data:** JS objects in `src/data/` (divisions, services, t2Data)

## Target Architecture

- **Framework:** Astro with React integration (`@astrojs/react`)
- **3D:** Same Three.js components, loaded as `client:visible` islands
- **Styling:** Same CSS files, imported in Astro layouts
- **Fonts:** Handled via Astro's built-in font optimization
- **Data:** Astro content collections or kept as JS imports

## Migration Steps

### Phase 1 — Scaffold & Layout

1. Init Astro project, install `@astrojs/react` integration
2. Copy over `src/styles/` (design-system.css, components.css, layout.css, etc.)
3. Copy over `src/assets/` (logos, images)
4. Create `src/layouts/Base.astro` — replaces App.jsx (Navbar + Footer wrapper)
5. Convert `Navbar.jsx` and `Footer.jsx` — keep as React islands (`client:load`) since Navbar has dropdown/mobile menu state

### Phase 2 — Static Pages (Zero JS)

Convert these to `.astro` files — they need no client JS:

- `src/pages/index.astro` (Home — static parts only, 3D added in Phase 3)
- `src/pages/what-we-do/index.astro` (WhatWeDoOverview)
- `src/pages/what-we-do/[divisionSlug]/index.astro` (DivisionLanding)
- `src/pages/what-we-do/[divisionSlug]/[serviceSlug].astro` (ServicePage)
- `src/pages/about/our-story.astro`
- `src/pages/about/jasmino-group.astro`
- `src/pages/industries.astro`
- `src/pages/infrastructure.astro`
- `src/pages/news.astro`
- `src/pages/contact.astro`

Data files (`divisions.js`, `services.js`, `t2Data.js`) can be imported directly in `.astro` frontmatter.

### Phase 3 — Interactive Islands

Convert these React components to hydrated islands:

| Component | Directive | Reason |
|-----------|-----------|--------|
| `Navbar` | `client:load` | Needs interactivity immediately (dropdowns, mobile menu) |
| `HeroScene` (Three.js) | `client:visible` | Only hydrate when hero is in viewport |
| `Divisions` (Three.js blueprints) | `client:visible` | Below fold, hydrate on scroll |
| `IntegratedModel` (GLSL shader) | `client:visible` | Below fold |
| `GlobalPresence` (Three.js globe) | `client:visible` | Below fold |
| `CountUp` | `client:visible` | Animate numbers when visible |
| `ScrollReveal` | Replace with CSS | Use Astro's built-in or CSS `@starting-style` / `IntersectionObserver` inline script |
| `GrainEffect` | `client:idle` | Decorative, can wait |

### Phase 4 — T2 Division Pages

The T2 components (`T2/Hero`, `T2/Advantage`, `T2/Gallery`, etc.) are mostly static HTML with scroll animations:

- Convert to `.astro` components (pure HTML + CSS)
- `T2/HeroBackground` (canvas particles) → `client:visible` island
- Scroll reveal animations → inline `<script>` with IntersectionObserver (no React needed)
- `CountUp` stats → `client:visible` island

### Phase 5 — View Transitions

Replace React Router SPA navigation with Astro View Transitions:

```astro
---
import { ViewTransitions } from 'astro:transitions';
---
<head>
  <ViewTransitions />
</head>
```

This gives smooth cross-page transitions without SPA JS overhead.

### Phase 6 — Optimization

- Enable Astro image optimization for any future images
- Consider Astro font optimization (`@astrojs/font` or manual preloading)
- Remove `react-router-dom` dependency entirely
- Verify Three.js tree-shaking (import only needed modules)

## Expected Results

| Metric | React SPA | Astro |
|--------|-----------|-------|
| Service page JS | ~368KB | ~0KB |
| Division page JS | ~874KB (React + Three.js) | ~506KB (Three.js island only) |
| Home page JS | ~874KB | ~506KB (Three.js islands only) |
| First contentful paint | Blocked on JS parse | Instant (static HTML) |
| SEO | Client-rendered | Static HTML |
| Lighthouse perf | ~60-70 | ~95+ (static pages) |

## Dependencies

```
astro
@astrojs/react
react
react-dom
three
```

## Files That Stay As-Is

- `src/components/HeroScene.jsx` (React island)
- `src/components/Divisions.jsx` (React island)
- `src/components/IntegratedModel.jsx` (React island)
- `src/components/GlobalPresence.jsx` (React island)
- `src/components/GrainEffect.jsx` (React island)
- `src/components/CountUp.jsx` (React island)
- `src/components/T2/HeroBackground.jsx` (React island)
- `src/data/*.js` (imported in frontmatter)
- `src/styles/*.css` (imported in layouts)

## Estimated Effort

~3-5 days for a full migration, depending on testing thoroughness.
