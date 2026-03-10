# GSAP ScrollTrigger Animations — Jasmino Website

Complete reference for all GSAP-powered scroll animations across the site.

---

## Dependencies & Setup

| Package | Version | Purpose |
|---------|---------|---------|
| `gsap` | ^3.x | Core animation engine |
| `@gsap/react` | ^2.x | `useGSAP()` hook for auto-cleanup on unmount |

**Bundle:** GSAP is isolated in a `vendor-gsap` Vite chunk (~71 KB / ~28 KB gzip), loaded separately from the main bundle.

**Vite config** (`vite.config.js`):
```js
manualChunks: {
  'vendor-gsap': ['gsap', '@gsap/react'],
}
```

---

## Hook API Reference

All hooks live in `src/hooks/useGsap.js`. Every hook:
- Returns a `ref` to attach to the container element
- Checks `prefers-reduced-motion` — if enabled, elements are shown immediately (no animation)
- Uses `useGSAP()` from `@gsap/react` for automatic ScrollTrigger cleanup on unmount
- Fires once per element (no re-triggering on scroll back up)

### `useScrollReveal(selector, options)`

Batch fade-up entrance. Elements matching `selector` inside the container are revealed in batches as they enter the viewport.

| Param | Default | Description |
|-------|---------|-------------|
| `selector` | `'.gsap-reveal'` | CSS selector for elements to animate |
| `options.y` | `32` | Starting Y offset (px) |
| `options.duration` | `0.7` | Animation duration (seconds) |
| `options.ease` | `'power2.out'` | GSAP easing |
| `options.stagger` | `0.08` | Delay between batch items (seconds) |
| `options.start` | `'top 85%'` | ScrollTrigger start position |

**Usage:**
```jsx
import { useScrollReveal } from '../hooks/useGsap';

function MyComponent() {
  const ref = useScrollReveal('.item', { y: 28, stagger: 0.12 });
  return (
    <div ref={ref}>
      <div className="item">A</div>
      <div className="item">B</div>
    </div>
  );
}
```

### `useStagger(selector, options)`

Staggered group entrance — all matching children animate in sequence when the container enters the viewport.

| Param | Default | Description |
|-------|---------|-------------|
| `selector` | `'.gsap-stagger'` | CSS selector for children |
| `options.y` | `32` | Starting Y offset |
| `options.duration` | `0.7` | Duration per item |
| `options.ease` | `'power2.out'` | Easing |
| `options.stagger` | `0.1` | Delay between items |
| `options.start` | `'top 80%'` | ScrollTrigger start |

**Usage:**
```jsx
const gridRef = useStagger('.card', { stagger: 0.12, y: 40 });
return <div ref={gridRef}>{cards.map(c => <div className="card" key={c.id} />)}</div>;
```

### `useParallax(options)`

Scroll-linked vertical parallax. The element moves at a different speed than the scroll.

| Param | Default | Description |
|-------|---------|-------------|
| `options.speed` | `-40` | Parallax offset in px (negative = slower than scroll) |
| `options.start` | `'top bottom'` | When parallax begins |
| `options.end` | `'bottom top'` | When parallax ends |
| `options.scrub` | `true` | Ties animation to scroll position |

**Usage:**
```jsx
const parallaxRef = useParallax({ speed: -50 });
return <img ref={parallaxRef} src="photo.jpg" />;
```

### `useImageReveal(options)`

Clip-path mask reveal — an image is progressively unmasked from one direction.

| Param | Default | Description |
|-------|---------|-------------|
| `options.direction` | `'left'` | Reveal direction: `'left'`, `'right'`, or `'bottom'` |
| `options.duration` | `1.2` | Reveal duration |
| `options.ease` | `'power3.inOut'` | Easing |
| `options.start` | `'top 75%'` | ScrollTrigger start |

**Usage:**
```jsx
const imgRef = useImageReveal({ direction: 'left' });
return <div ref={imgRef}><img src="..." /></div>;
```

### `useTextReveal(options)`

Line-by-line text entrance — each direct child of the container animates in sequence.

| Param | Default | Description |
|-------|---------|-------------|
| `options.y` | `24` | Starting Y offset |
| `options.duration` | `0.6` | Duration per line |
| `options.ease` | `'power2.out'` | Easing |
| `options.stagger` | `0.12` | Delay between lines |
| `options.start` | `'top 85%'` | ScrollTrigger start |

---

## GsapReveal Component

`src/components/GsapReveal.jsx` — Drop-in wrapper for scroll-triggered fade-up. Use where hooks aren't practical (e.g., inside static page configs).

| Prop | Default | Description |
|------|---------|-------------|
| `y` | `32` | Starting Y offset |
| `duration` | `0.7` | Animation duration (seconds) |
| `delay` | `0` | Delay before animation starts (seconds) |
| `ease` | `'power2.out'` | Easing |
| `start` | `'top 85%'` | ScrollTrigger start |
| `className` | `''` | Additional CSS classes |
| `as` | `'div'` | HTML tag to render |

**Note:** `delay` is in **seconds** (not milliseconds like the old `ScrollReveal` component).

```jsx
<GsapReveal delay={0.2}>
  <h2>This fades up on scroll</h2>
</GsapReveal>
```

---

## Route Change Handling

`ScrollToTop` in `App.jsx` calls `ScrollTrigger.refresh()` via dynamic import on every route change. This ensures ScrollTrigger recalculates trigger positions for the new page content.

```jsx
useEffect(() => {
  window.scrollTo(0, 0);
  requestAnimationFrame(() => {
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.refresh();
    });
  });
}, [pathname]);
```

---

## Accessibility

All GSAP animations respect `prefers-reduced-motion: reduce`:

- **Hooks:** Check `window.matchMedia('(prefers-reduced-motion: reduce)')` and call `gsap.set()` to show elements immediately if enabled
- **GsapReveal:** Same check — sets final state without animation
- **CSS fallback** (`design-system.css`):
  ```css
  @media (prefers-reduced-motion: reduce) {
    .rv, .rv-s, .gsap-reveal, .gsap-stagger {
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
      animation: none !important;
    }
  }
  ```

---

## Page-by-Page Animation Catalog

### Homepage (`Home.jsx`)

| Section | Component | Hook / Method | Config |
|---------|-----------|---------------|--------|
| Hero | `HeroVariantA/B/C` | `gsap.timeline()` via `useGSAP` | Sequential: badge, headline, subtext, CTAs, phase indicator, scroll hint — 0.15s gaps |
| Trust Band | `TrustBand.jsx` | `gsap.from()` via `useGSAP` | Stats: stagger 0.13s; Certs: stagger 0.06s |
| Divisions | `Divisions.jsx` | `useStagger('.div-card')` | stagger: 0.12, y: 40 |
| Industries | `Industries.jsx` | `gsap.from()` via `useGSAP` | `.ind-card-bento` stagger: 0.07 |
| Case Studies | `CaseStudies.jsx` | `useStagger('.case-study-card')` | stagger: 0.12, y: 32 |
| News | `Home.jsx` | `useStagger('.news-card')` | stagger: 0.1 |
| CTA | `Home.jsx` | `useStagger('.cta-inner > *')` | stagger: 0.1 |

### About Page (`AboutPage.jsx`)

| Section | Hook / Method | Config |
|---------|---------------|--------|
| Hero | `gsap.timeline()` via `useGSAP` | `.hero-badge`, `.hero-h1`, `.hero-sub`, `.hero-metrics`, `.hero-stamp` |
| Manifesto image | `useImageReveal` | direction: 'left' |
| Photo break | `useParallax` | speed: -50 |
| Editorial quote | `GsapReveal` | duration: 0.9 |
| Values rows | `GsapReveal` | default |
| Stats | `useStagger('.stat-block')` | stagger: 0.12 |
| Certifications | `useStagger('.cert-item')` | stagger: 0.08 |
| Heritage | `useStagger('.heritage-card')` | stagger: 0.1 |
| CTA | `GsapReveal` | default |

### What We Do Page (`WhatWeDoPage.jsx`)

| Section | Hook / Method | Config |
|---------|---------------|--------|
| Hero | `gsap.timeline()` via `useGSAP` | breadcrumb, badge, title, desc, actions, stats |
| Projects | `useStagger('.proj-card')` | stagger: 0.15, y: 32 |
| Capability matrix | `useStagger('tbody tr')` | stagger: 0.04, y: 16 |
| Remaining sections | `GsapReveal` | delay conversion (ms → seconds) |

### Division Pages (T2 Components)

| Component | Hook / Method | Config |
|-----------|---------------|--------|
| `T2/Hero.jsx` | `gsap.timeline()` via `useGSAP` | `.crumb`, `.hbadge`, `.htitle`, `.hdesc`, `.hero-scroll-indicator` — stagger 0.12 |
| `T2/Overview.jsx` | `useScrollReveal('.rv')` | y: 28, stagger: 0.12 |
| `T2/ServiceGrid.jsx` | `useGSAP()` | `.rv` headers + `.scard` cards, separate ScrollTriggers |
| `T2/StatsStrip.jsx` | `useStagger('.t2-stat')` | stagger: 0.1, y: 24 |
| `T2/Gallery.jsx` | `useScrollReveal('.rv')` | y: 28 |
| `T2/CTA.jsx` | `useScrollReveal('.rv')` | y: 28 |

### Service Pages (`ServicePage.jsx`)

| Section | Hook / Method | Config |
|---------|---------------|--------|
| Evidence strip bg | `useParallax` | speed: -50 |
| Case study bg | `useParallax` | speed: -30 |
| Process timeline | `useStagger('.t3-timeline-step')` | stagger: 0.1, y: 24 |
| All other sections | `GsapReveal` | delay conversion (ms → seconds) |

### Infrastructure Page (`InfrastructurePage.jsx`)

| Section | Hook / Method | Config |
|---------|---------------|--------|
| Hero | `gsap.timeline()` via `useGSAP` | `.hero-bc`, `.hero-badge`, `.hero-title`, `.hero-desc`, `.hero-stats` — stagger 0.12 |
| Overview | `GsapReveal` | default |
| Map | `GsapReveal` | delay: 0.2 |
| Facility headers | `GsapReveal` | default |
| Facility galleries | `GsapReveal` | delay: 0.1 |
| Facility spec cards | `GsapReveal` | delay: 0.2 |
| Facility equipment | `GsapReveal` | delay: 0.3 |
| Quality section | `GsapReveal` | default + delay: 0.3 |
| CTA | `GsapReveal` | default |

### Case Studies Page (`CaseStudiesPage.jsx`)

| Section | Hook / Method | Config |
|---------|---------------|--------|
| Stats strip | `ScrollTrigger.create()` via `useGSAP` | Triggers `setStatsVis(true)` for CountUp |
| Card grid | `gsap.fromTo()` in `useEffect` | Re-triggers on filter change: stagger 0.09, y: 24 |
| CTA | `GsapReveal` | default |

### Case Study Detail (`CaseStudyDetail.jsx`)

| Section | Hook / Method | Config |
|---------|---------------|--------|
| Challenge & Solution | `GsapReveal` | default + delay: 0.15 |
| Approach steps | `useStagger('.csd-step')` | stagger: 0.1, y: 24 |
| Results | `ScrollTrigger.create()` via `useGSAP` | Triggers `setResultsVis(true)` for CountUp |
| CTA | `GsapReveal` | default |

### News Page (`NewsPage.jsx`)

| Section | Hook / Method | Config |
|---------|---------------|--------|
| Card grid | `gsap.fromTo()` in `useEffect` | Re-triggers on page/tab change: stagger 0.07, y: 24 |

### Contact Page (`ContactPage.jsx`)

| Section | Hook / Method | Config |
|---------|---------------|--------|
| Form | `GsapReveal` | default |
| Facility cards | `useStagger('.cp-fac-card')` | stagger: 0.1, y: 24 |
| CTA | `GsapReveal` | default |

### Other Pages

| Page | Hook / Method | Config |
|------|---------------|--------|
| `DivisionLanding.jsx` | `GsapReveal` | delay conversion (ms → seconds) |
| `InnerPage.jsx` | `GsapReveal` | delay conversion (ms → seconds) |
| `WhatWeDoOverview.jsx` | `GsapReveal` | delay conversion (ms → seconds) |

---

## Animation Defaults

All animations are intentionally subtle — short travel distance, gentle easing:

| Property | Value | Notes |
|----------|-------|-------|
| Y offset | 32 px | Elements slide up 32px as they fade in |
| Duration | 0.7 s | Per-element animation time |
| Ease | `power2.out` | Smooth deceleration (GSAP built-in) |
| Stagger | 0.08–0.12 s | Delay between sequential items |
| Parallax speed | -40 to -60 | Pixels of offset across scroll range |
| Clip-path reveal | 1.2 s, `power3.inOut` | Smooth mask transition |
| ScrollTrigger start | `top 80–85%` | Triggers when element is ~15–20% visible |

---

## Performance Notes

- **Always use `gsap.fromTo()` or `gsap.set()` + `gsap.to()`** — never `gsap.from()`. The `from()` method reads the element's computed CSS as the "to" state. If CSS has `opacity: 0` on the element (from old reveal patterns), `gsap.from({opacity: 0})` would animate 0→0 and the element stays invisible forever. `fromTo()` explicitly sets both start and end states, avoiding this conflict.
- **Remove CSS `opacity: 0` from animated elements** — old reveal patterns (`.rv`, `.scard`, `.ind-card-bento`, `.trust-stat`) set `opacity: 0` in CSS for IntersectionObserver-based reveals. These conflict with GSAP and were removed. GSAP handles initial hidden state via inline styles.
- **Bundle isolation:** GSAP loads in its own chunk, not blocking initial render
- **ScrollTrigger.batch():** `useScrollReveal` uses batch mode — one IntersectionObserver for all matched elements, far more efficient than per-element observers
- **Auto-cleanup:** `useGSAP()` from `@gsap/react` kills all ScrollTriggers and tweens when the component unmounts — no memory leaks
- **Route transitions:** `ScrollTrigger.refresh()` runs on every route change via `requestAnimationFrame` to recalculate positions
- **No layout shift:** All animations start from `opacity: 0` — no CLS impact. `will-change: transform, opacity` on `.gsap-reveal` and `.gsap-stagger` classes enables GPU compositing

---

## Migration Summary

### What was replaced

| Old Pattern | New Pattern |
|-------------|-------------|
| `ScrollReveal.jsx` (IntersectionObserver + CSS `.fade-up` / `.visible` classes) | `GsapReveal.jsx` component or GSAP hooks |
| Inline `IntersectionObserver` in T2 components (`.rv` / `.vis` toggling) | `useScrollReveal`, `useStagger`, or `useGSAP` timelines |
| Manual `scroll` event listeners for parallax (ServicePage) | `useParallax` hook |
| CSS `@keyframes heroFadeUp` animations (Hero variants) | `gsap.timeline()` via `useGSAP` |
| `setTimeout` stagger loops (CaseStudiesPage, NewsPage) | `gsap.fromTo()` with stagger |

### Files changed

**New files:**
- `src/hooks/useGsap.js` — 5 reusable hooks + re-exports
- `src/components/GsapReveal.jsx` — Drop-in wrapper component

**Deleted files:**
- `src/components/ScrollReveal.jsx` — Replaced by GsapReveal + hooks

**Modified files (23):**
- `vite.config.js` — Added vendor-gsap chunk
- `src/styles/design-system.css` — Added `.gsap-reveal`/`.gsap-stagger` classes, updated reduced-motion query, removed `.fade-up` rules
- `src/App.jsx` — Added `ScrollTrigger.refresh()` to ScrollToTop
- `src/components/HeroVariantA.jsx` — GSAP timeline replacing CSS keyframes
- `src/components/HeroVariantB.jsx` — Same
- `src/components/HeroVariantC.jsx` — Same
- `src/components/TrustBand.jsx` — GSAP replacing IntersectionObserver
- `src/components/Divisions.jsx` — useStagger replacing ScrollReveal
- `src/components/Industries.jsx` — GSAP replacing IntersectionObserver
- `src/components/CaseStudies.jsx` — Added useStagger
- `src/components/T2/Hero.jsx` — GSAP timeline
- `src/components/T2/Overview.jsx` — useScrollReveal
- `src/components/T2/ServiceGrid.jsx` — useGSAP with ScrollTrigger
- `src/components/T2/StatsStrip.jsx` — useStagger
- `src/components/T2/Gallery.jsx` — useScrollReveal
- `src/components/T2/CTA.jsx` — useScrollReveal
- `src/pages/Home.jsx` — GsapReveal + useStagger
- `src/pages/AboutPage.jsx` — GsapReveal + useImageReveal + useParallax + useStagger + timeline
- `src/pages/WhatWeDoPage.jsx` — GsapReveal + useStagger + timeline
- `src/pages/ServicePage.jsx` — GsapReveal + useParallax + useStagger
- `src/pages/InfrastructurePage.jsx` — GsapReveal + GSAP timeline
- `src/pages/CaseStudiesPage.jsx` — GSAP replacing IntersectionObserver + setTimeout
- `src/pages/CaseStudyDetail.jsx` — GsapReveal + useStagger + ScrollTrigger
- `src/pages/NewsPage.jsx` — GSAP replacing setTimeout
- `src/pages/ContactPage.jsx` — GsapReveal + useStagger
- `src/pages/DivisionLanding.jsx` — GsapReveal replacing ScrollReveal
- `src/pages/InnerPage.jsx` — GsapReveal replacing ScrollReveal
- `src/pages/WhatWeDoOverview.jsx` — GsapReveal replacing ScrollReveal
