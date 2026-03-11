import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../hooks/useGsap';
import GsapReveal from '../components/GsapReveal';
import '../styles/group-page.css';

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */
const ENTITIES = [
  {
    id: 'jasmino',
    flag: '🇮🇳',
    logo: 'JASMINO',
    name: 'Jasmino Corporation',
    location: 'Taloja, India',
    gradient: 'linear-gradient(155deg, #0a1628 0%, #122a4d 40%, #1a3d6d 100%)',
    bigNum: '01',
    overline: 'Parent Company · Est. 1984',
    description: 'The group\'s headquarters and engineering nerve centre. Home to all four divisions — Engineering Design, Equipment Manufacturing, Corrosion Protection, and Rubber Products. The largest and most comprehensive integrated facility in the industrial process equipment sector.',
    stats: [
      { num: '80,000+', label: 'm² facility' },
      { num: '4', label: 'Divisions' },
      { num: '9.5M', label: 'kg/yr rubber' },
    ],
    pills: ['Engineering Design', 'Equipment Manufacturing', 'Corrosion Protection', 'Rubber Products'],
    linkText: 'Explore our facilities',
    linkHref: '/infrastructure',
    convStat: '80,000 m²',
    convStatLabel: 'Engineering · Manufacturing · Rubber',
  },
  {
    id: 'haw',
    flag: '🇩🇪',
    logo: 'HAW',
    name: 'HAW Linings',
    location: 'Bockenem, Germany',
    gradient: 'linear-gradient(155deg, #0b1a30 0%, #15305a 40%, #1b4080 100%)',
    bigNum: '02',
    overline: 'Acquired 2024',
    description: 'Europe\'s premier rubber and plastic lining specialist. Operating from the world\'s largest dedicated rubber lining facility in Bockenem, Germany — with over five decades of protecting chemical process equipment in the most aggressive service environments on earth.',
    stats: [
      { num: '120,000', label: 'm² shop floor' },
      { num: '50+', label: 'years expertise' },
    ],
    pills: ['Rubber Linings', 'Plastic Linings', 'Autoclave Curing', 'On-site Services'],
    linkText: 'Explore HAW capabilities',
    linkHref: '/what-we-do/corrosion-protection',
    convStat: '120,000 m²',
    convStatLabel: "World's largest rubber lining facility",
  },
  {
    id: 'gbt',
    flag: '🇩🇪',
    logo: 'GBT',
    name: 'GBT Bücolit',
    location: 'Marl, Germany',
    gradient: 'linear-gradient(155deg, #060d18 0%, #0c1c35 40%, #112850 100%)',
    bigNum: '03',
    overline: 'Acquired 2024',
    description: 'Corrosion protection specialist serving the European chemical corridor and beyond. Based in Marl — the heart of Germany\'s chemical industry — GBT delivers coatings, resin systems, and on-site lining services across Europe, the Middle East, and CIS markets.',
    stats: [
      { num: 'Marl', label: 'Chemical hub' },
      { num: '15+', label: 'countries served' },
    ],
    pills: ['Coatings', 'Resin Systems', 'Lining Services', 'Inspection & Repair'],
    linkText: 'Explore GBT capabilities',
    linkHref: '/what-we-do/corrosion-protection',
    convStat: '15+',
    convStatLabel: 'Countries across Europe & CIS',
  },
];

const TIMELINE_CARDS = [
  { year: '1984', title: 'Jasmino Founded', desc: 'A rubber products company is born in Taloja, Maharashtra — beginning the journey from elastomers to integrated engineering.' },
  { year: '1968', title: 'HAW Linings Established', desc: 'In Bockenem, Germany, HAW begins rubber lining operations — pioneering corrosion protection techniques that would become European industry standards.' },
  { year: '2000', title: 'Jasmino Polymertech Era', desc: 'Jasmino expands beyond rubber into full engineering and manufacturing. The Taloja facility grows to 80,000 m² with equipment fabrication capabilities.' },
  { year: '2018', title: 'Strategic Partnership Begins', desc: 'Jasmino and HAW/GBT begin collaborating on global projects — Indian manufacturing paired with German lining expertise. The integration thesis is tested.' },
  { year: '2024', title: 'Acquisition Completed', desc: 'Jasmino acquires HAW Linings and GBT Bücolit. Three companies, two continents, one unified industrial group. The integrated model becomes permanent.' },
];

const SYNERGIES = [
  { icon: 'D→P', title: 'Design-to-Protection Pipeline', desc: 'Equipment is engineered in India with lining specifications from HAW/GBT built into every fabrication decision from day one. No post-fabrication surprises. No costly rework.', gridClass: 'gp-syn-c1', featured: true },
  { icon: '🌍', title: 'Global On-Site Service', desc: '150+ technicians deployed from India and Germany. The nearest qualified crew is never more than a flight away.', gridClass: 'gp-syn-c2' },
  { icon: '🔬', title: 'Shared R&D', desc: '2,000+ rubber formulations combined with European application expertise and German chemical process knowledge.', gridClass: 'gp-syn-c3' },
  { icon: '📋', title: 'Unified QMS', desc: 'ISO 9001, ISO 14001, ASME, PED — all facilities under one quality framework.', gridClass: 'gp-syn-c4' },
  { icon: '🏭', title: 'Route Optimization', desc: 'Fabricate in India, line in Germany, install in the Middle East. Work goes where it makes sense.', gridClass: 'gp-syn-c5' },
  { icon: '📄', title: 'Single Contract', desc: 'One PO. One PM. One accountability chain — regardless of which facility executes.', gridClass: 'gp-syn-c6' },
];

const MOSAIC_LABELS = {
  jasmino: ['Fabrication hall', 'Engineering office', 'Rubber mixing', 'Aerial facility'],
  haw: ['Lining workshop', 'Autoclave curing', 'Quality inspection', 'Bockenem facility'],
  gbt: ['Coating application', 'Resin systems lab', 'On-site crew', 'Marl facility'],
};

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* ═══════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function JasminoGroupPage() {
  const location = useLocation();

  // Refs
  const heroRef = useRef(null);
  const convRef = useRef(null);
  const convStickyRef = useRef(null);
  const convColsRef = useRef(null);
  const convMergedRef = useRef(null);
  const entityRef = useRef(null);
  const entityStickyRef = useRef(null);
  const acqRef = useRef(null);
  const acqTrackRef = useRef(null);
  const acqFillRef = useRef(null);

  const [activeEntity, setActiveEntity] = useState(0);
  const [heroVideoError, setHeroVideoError] = useState(false);

  /* ── S1: Hero entrance ── */
  useGSAP(() => {
    if (!heroRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      heroRef.current.querySelectorAll('.gp-hero-line span, .gp-hero-body, .gp-hero-badge, .gp-scroll-cue')
        .forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
      return;
    }

    const lines = heroRef.current.querySelectorAll('.gp-hero-line span');
    lines.forEach((line, i) => {
      gsap.to(line, {
        opacity: 1, y: 0, duration: 0.8,
        ease: 'power4.out', delay: 0.2 + i * 0.15,
      });
    });

    gsap.to(heroRef.current.querySelector('.gp-hero-body'), {
      opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.7,
    });

    const badges = heroRef.current.querySelectorAll('.gp-hero-badge');
    badges.forEach((badge, i) => {
      gsap.to(badge, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.8 + i * 0.15,
      });
    });

    gsap.to(heroRef.current.querySelector('.gp-scroll-cue'), {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 1.3,
    });
  }, { scope: heroRef, dependencies: [] });

  /* ── S2: Convergence (short — ~2 scroll lengths) ── */
  useGSAP(() => {
    if (!convRef.current || !convStickyRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return;

    const raf = requestAnimationFrame(() => {
      const cols = convColsRef.current;
      const merged = convMergedRef.current;
      const colEls = cols.querySelectorAll('.gp-conv-col');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: convRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 0.8,
          pin: convStickyRef.current,
          pinSpacing: true,
        },
      });

      // Phase 1 (0→0.5): converge columns together
      tl.to(cols, { gap: 0, duration: 0.5, ease: 'none' }, 0);

      // Phase 2 (0.45→0.7): fade columns, reveal merged
      tl.to(colEls, { autoAlpha: 0, scale: 0.92, duration: 0.2, ease: 'power2.inOut' }, 0.45);
      tl.to(merged, { autoAlpha: 1, scale: 1, duration: 0.25, ease: 'power2.out' }, 0.55);

      // Phase 3 (0.7→1.0): hold merged
    });

    return () => cancelAnimationFrame(raf);
  }, { scope: convRef, dependencies: [] });

  /* ── S3: Entity Deep Dives — proper crossfade ── */
  useGSAP(() => {
    if (!entityRef.current || !entityStickyRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const raf = requestAnimationFrame(() => {
      const slides = entityStickyRef.current.querySelectorAll('.gp-entity-slide');
      const count = slides.length;

      // Set initial states: first visible, rest hidden
      gsap.set(slides[0], { autoAlpha: 1, zIndex: 2 });
      for (let i = 1; i < count; i++) {
        gsap.set(slides[i], { autoAlpha: 0, zIndex: 1 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: entityRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 1,
          pin: entityStickyRef.current,
          pinSpacing: true,
        },
      });

      // Each transition: crossfade with overlap so there's never a white gap
      const step = 1 / count;
      for (let i = 1; i < count; i++) {
        const transStart = step * i - step * 0.5;  // start transition halfway through current slide's time
        const dur = step * 0.5;

        // Bring next slide in from beneath
        tl.to(slides[i], { autoAlpha: 1, zIndex: 2, duration: dur, ease: 'power2.inOut' }, transStart);
        // Fade current slide out
        tl.to(slides[i - 1], { autoAlpha: 0, zIndex: 1, duration: dur, ease: 'power2.inOut' }, transStart + dur * 0.1);
      }

      tl.eventCallback('onUpdate', () => {
        const p = tl.progress();
        let idx = Math.floor(p * count);
        if (idx >= count) idx = count - 1;
        setActiveEntity(idx);
      });
    });

    return () => cancelAnimationFrame(raf);
  }, { scope: entityRef, dependencies: [] });

  /* ── S4: Acquisition horizontal scroll ── */
  useGSAP(() => {
    if (!acqRef.current || !acqTrackRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const raf = requestAnimationFrame(() => {
      const track = acqTrackRef.current;
      const fill = acqFillRef.current;
      const dots = acqRef.current.querySelectorAll('.gp-acq-timeline-dot');
      const stickyEl = acqRef.current.querySelector('.gp-acq-sticky');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: acqRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 1,
          pin: stickyEl,
          pinSpacing: true,
        },
      });

      // Animate track horizontally
      tl.to(track, {
        x: () => {
          const trackW = track.scrollWidth;
          const wrapW = track.parentElement.offsetWidth;
          return -(trackW - wrapW + 56);
        },
        ease: 'none',
        duration: 1,
      });

      // Animate timeline fill bar in sync
      tl.to(fill, { width: '100%', ease: 'none', duration: 1 }, 0);

      // Animate dots as cards pass
      dots.forEach((dot, i) => {
        const threshold = i / Math.max(dots.length - 1, 1);
        tl.to(dot, {
          backgroundColor: 'var(--green)',
          borderColor: 'var(--green)',
          duration: 0.05,
          ease: 'none',
        }, threshold);
      });
    });

    return () => cancelAnimationFrame(raf);
  }, { scope: acqRef, dependencies: [] });

  /* ═══════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════ */
  const isGroupPage = location.pathname === '/about/jasmino-group';

  return (
    <div className="gp">
      {/* ── S1: Hero ── */}
      <section className="gp-hero" ref={heroRef}>
        {/* About Sibling Nav — inside hero so navbar sees dark bg */}
        <nav className="gp-about-nav">
          <Link to="/about/our-story" className={!isGroupPage ? 'active' : ''}>Our Story</Link>
          <Link to="/about/jasmino-group" className={isGroupPage ? 'active' : ''}>The Jasmino Group</Link>
        </nav>
        <div className="gp-hero-video" aria-hidden="true">
          {!heroVideoError && (
            <video
              className="gp-hero-video-bg"
              autoPlay
              muted
              loop
              playsInline
              onError={() => setHeroVideoError(true)}
            >
              <source src="/videos/jasmino-group.mp4" type="video/mp4" />
            </video>
          )}
          <div className="gp-hero-video-fallback" />
        </div>
        <div className="gp-hero-overlay" />
        <div className="gp-hero-inner">
          <nav className="gp-crumb">
            <Link to="/">Home</Link>
            <span className="gp-sep">/</span>
            <Link to="/about/our-story">About</Link>
            <span className="gp-sep">/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>The Jasmino Group</span>
          </nav>
          <div className="gp-hero-title">
            <span className="gp-hero-line"><span>Three companies.</span></span>
            <span className="gp-hero-line"><span>One <em>integrated</em></span></span>
            <span className="gp-hero-line"><span>group.</span></span>
          </div>
          <p className="gp-hero-body">
            In 2024, Jasmino Corporation acquired HAW Linings and GBT Bücolit — uniting decades of European corrosion protection expertise with Indian engineering and manufacturing scale.
          </p>
          <div className="gp-hero-badges">
            <div className="gp-hero-badge"><div className="n">3</div><div className="l">Entities</div></div>
            <div className="gp-hero-badge"><div className="n">200K+</div><div className="l">m² Combined</div></div>
            <div className="gp-hero-badge"><div className="n">40+</div><div className="l">Years Heritage</div></div>
          </div>
        </div>


        <div className="gp-scroll-cue">
          <div className="gp-scroll-cue-line" />
          <div className="gp-scroll-cue-text">Scroll to explore</div>
        </div>
      </section>

      {/* ── S2: Convergence ── */}
      <section className="gp-convergence" ref={convRef}>
        <div className="gp-conv-sticky" ref={convStickyRef}>
          <div className="gp-conv-cols" ref={convColsRef}>
            {ENTITIES.map((e) => (
              <div className="gp-conv-col" key={e.id}>
                <div className="gp-conv-col-flag">{e.flag}</div>
                <div className="gp-conv-col-logo">{e.logo}</div>
                <div className="gp-conv-col-name" dangerouslySetInnerHTML={{ __html: e.name.replace(' ', '<br/>') }} />
                <div className="gp-conv-col-loc">{e.location}</div>
                <div className="gp-conv-col-stat">{e.convStat}</div>
                <div className="gp-conv-col-stat-l">{e.convStatLabel}</div>
              </div>
            ))}
          </div>
          <div className="gp-conv-merged" ref={convMergedRef}>
            <div className="gp-conv-merged-line" />
            <div className="gp-conv-merged-title">The Jasmino <em>Group</em></div>
            <div className="gp-conv-merged-sub">
              Three entities, one quality system, one point of accountability. Design in India. Protect in Germany. Deliver everywhere.
            </div>
          </div>
        </div>
      </section>

      {/* ── S3: Entity Deep Dives ── */}
      <section className="gp-entity-scroll" ref={entityRef}>
        <div className="gp-entity-sticky" ref={entityStickyRef}>
          <div className="gp-entity-nav">
            {ENTITIES.map((_, i) => (
              <button
                key={i}
                className={`gp-entity-nav-dot${activeEntity === i ? ' active' : ''}`}
              />
            ))}
          </div>

          {ENTITIES.map((entity, idx) => (
            <div
              key={entity.id}
              className="gp-entity-slide"
              data-slide={idx}
            >
              <div className="gp-entity-visual" style={{ background: entity.gradient }}>
                <div className="gp-entity-visual-bg">
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, position: 'relative', zIndex: 2 }}>
                    <div className="gp-entity-logo">{entity.logo}</div>
                    <div className="gp-entity-mosaic">
                      {MOSAIC_LABELS[entity.id].map((label) => (
                        <div key={label} className="gp-entity-mosaic-item">{label}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="gp-entity-bignum">{entity.bigNum}</div>
              </div>
              <div className="gp-entity-content">
                <div className="flag">{entity.flag}</div>
                <div className="overline">{entity.overline}</div>
                <h3>{entity.name}</h3>
                <p className="desc">{entity.description}</p>
                <div className="gp-entity-stats-row">
                  {entity.stats.map((s) => (
                    <div key={s.label} className="gp-entity-stat-box">
                      <div className="n">{s.num}</div>
                      <div className="l">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="gp-entity-pills">
                  {entity.pills.map((pill) => (
                    <span key={pill} className="gp-entity-pill">{pill}</span>
                  ))}
                </div>
                <Link className="gp-entity-link" to={entity.linkHref}>
                  {entity.linkText} <ArrowIcon />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── S4: Acquisition Timeline ── */}
      <section className="gp-acq" ref={acqRef}>
        <div className="gp-acq-sticky">
          <div className="gp-acq-header">
            <div className="overline">The Path to Integration</div>
            <h2>From partnership<br />to <em>ownership</em></h2>
          </div>
          <div className="gp-acq-track-wrap">
            <div className="gp-acq-track" ref={acqTrackRef}>
              {TIMELINE_CARDS.map((card) => (
                <div key={card.year + card.title} className="gp-acq-card">
                  <div className="gp-acq-ghost-year">{card.year}</div>
                  <div className="gp-acq-year-tag">{card.year}</div>
                  <h4>{card.title}</h4>
                  <p>{card.desc}</p>
                  <div className="gp-acq-photo-placeholder">[ Photo ]</div>
                </div>
              ))}
            </div>
          </div>
          <div className="gp-acq-timeline-bar">
            <div className="gp-acq-timeline-fill" ref={acqFillRef} />
          </div>
          <div className="gp-acq-timeline-dots">
            {TIMELINE_CARDS.map((card) => (
              <div key={card.year} className="gp-acq-timeline-dot" />
            ))}
          </div>
        </div>
      </section>

      {/* ── S5: Synergies ── */}
      <section className="gp-synergies">
        <div className="gp-synergies-inner">
          <GsapReveal>
            <div className="gp-synergies-header">
              <div className="overline">Group Synergies</div>
              <h2>What integration <em>unlocks</em></h2>
            </div>
          </GsapReveal>
          <div className="gp-syn-grid">
            {SYNERGIES.map((syn, i) => (
              <GsapReveal key={syn.title} delay={i * 0.08} className={syn.gridClass}>
                <div className={`gp-syn-card${syn.featured ? ' featured' : ''}`}>
                  <div className="gp-syn-icon">{syn.icon}</div>
                  <h4>{syn.title}</h4>
                  <p>{syn.desc}</p>
                </div>
              </GsapReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="gp-cta">
        <GsapReveal>
          <div className="gp-cta-inner">
            <div>
              <h2>Ready to work with<br />the full <em>group?</em></h2>
              <p className="body">
                Whether your project needs engineering from India, lining from Germany, or both — one conversation starts it all.
              </p>
            </div>
            <div className="gp-cta-actions">
              <Link className="gp-btn gp-btn-pri" to="/contact">
                Get in Touch <ArrowIcon />
              </Link>
            </div>
          </div>
        </GsapReveal>
      </section>
    </div>
  );
}
