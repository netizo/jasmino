import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { divisions } from '../data/divisions';
import { getServiceBySlug, getSiblingServices } from '../data/services';
import t3Content from '../data/t3Content.json';
import GsapReveal from '../components/GsapReveal';
import MatIcon from '../components/MatIcon';
import { useParallax, useStagger } from '../hooks/useGsap';
import '../styles/service-t3.css';

function getT3Data(serviceSlug) {
  return t3Content.pages.find(p => p.id === serviceSlug) || null;
}

const ratingMap = {
  rating_a: { cls: 'rating-a', label: 'Excellent' },
  rating_b: { cls: 'rating-b', label: 'Good' },
  rating_c: { cls: 'rating-c', label: 'Limited' },
  rating_x: { cls: 'rating-x', label: '\u2014' }
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

/* Per-service animated SVG icons for integration links */
const SERVICE_ICONS = {
  'process-plant-design': ( // Flow diagram
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect className="svc-draw" x="3" y="3" width="7" height="7" rx="1" />
      <rect className="svc-draw" x="14" y="14" width="7" height="7" rx="1" />
      <path className="svc-draw" d="M10 6.5h4.5v11" />
    </svg>
  ),
  'equipment-design': ( // Technical drawing / compass
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle className="svc-draw" cx="12" cy="12" r="9" />
      <polygon className="svc-draw" points="16,8 14,14 8,16 10,10" />
    </svg>
  ),
  'piping-design': ( // Pipe with elbow
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path className="svc-draw" d="M4 8h8a4 4 0 014 4v8" />
      <path className="svc-draw" d="M4 12h6a4 4 0 014 4v4" />
    </svg>
  ),
  'water-treatment': ( // Water drop
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path className="svc-draw" d="M12 3c-4 7-7 10-7 14a7 7 0 0014 0c0-4-3-7-7-14z" />
      <path className="svc-draw" d="M9 18a3 3 0 006 0" />
    </svg>
  ),
  'steel-equipment': ( // Pressure vessel
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse className="svc-draw" cx="12" cy="5" rx="6" ry="2" />
      <path className="svc-draw" d="M6 5v14c0 1.1 2.69 2 6 2s6-.9 6-2V5" />
      <path className="svc-draw" d="M8 12h8" />
    </svg>
  ),
  'plastic-frp-equipment': ( // Layered material
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path className="svc-draw" d="M4 8h16M4 12h16M4 16h16" />
      <path className="svc-draw" d="M6 8v8M18 8v8" />
    </svg>
  ),
  'rubber-linings': ( // Shield with layer
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path className="svc-draw" d="M12 3l8 4v6c0 5-3.5 9.7-8 11-4.5-1.3-8-6-8-11V7z" />
      <path className="svc-draw" d="M12 8v8M9 12h6" />
    </svg>
  ),
  'plastic-linings': ( // Coating layer
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect className="svc-draw" x="4" y="6" width="16" height="12" rx="2" />
      <path className="svc-draw" d="M4 12h16" />
      <path className="svc-draw" d="M8 9h8" />
    </svg>
  ),
  'coatings-resin-systems': ( // Paint brush
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path className="svc-draw" d="M6 16l4-4 8-8 4 4-8 8-4 4z" />
      <path className="svc-draw" d="M14 6l4 4" />
    </svg>
  ),
  'inspection-repair': ( // Magnifier with check
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle className="svc-draw" cx="11" cy="11" r="7" />
      <path className="svc-draw" d="M16 16l5 5" />
      <path className="svc-draw" d="M8 11l2 2 4-4" />
    </svg>
  ),
  'custom-compounds': ( // Beaker / flask
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path className="svc-draw" d="M9 3v6l-5 8a2 2 0 001.7 3h12.6a2 2 0 001.7-3l-5-8V3" />
      <path className="svc-draw" d="M9 3h6" />
      <path className="svc-draw" d="M7 15h10" />
    </svg>
  ),
  'engineered-products': ( // Gear
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle className="svc-draw" cx="12" cy="12" r="3" />
      <path className="svc-draw" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.6.77 1.05 1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
};

function ServiceIcon({ slug }) {
  const icon = SERVICE_ICONS[slug];
  if (!icon) {
    // Fallback: arrow-right
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path className="svc-draw" d="M5 12h14M13 5l7 7-7 7" />
      </svg>
    );
  }
  return icon;
}

export default function ServicePage() {
  const { divisionSlug, serviceSlug } = useParams();
  const service = getServiceBySlug(divisionSlug, serviceSlug);
  const division = divisions.find(d => d.slug === divisionSlug);
  const siblings = getSiblingServices(divisionSlug);
  const t3 = getT3Data(serviceSlug);

  const [stickyVisible, setStickyVisible] = useState(false);
  const galleryRef = useRef(null);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0 });
  const [isDragging, setIsDragging] = useState(false);
  /* evidenceRef and caseBgRef replaced by GSAP useParallax hooks below */

  // Reset on route change
  useEffect(() => {
    setStickyVisible(false);
    window.scrollTo(0, 0);
  }, [serviceSlug, divisionSlug]);

  // Sticky bar scroll listener
  useEffect(() => {
    const onScroll = () => {
      setStickyVisible(window.scrollY > 800);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // GSAP parallax (replaces manual scroll listener)
  const evidenceParallaxRef = useParallax({ speed: -50 });
  const caseBgParallaxRef = useParallax({ speed: -30 });
  const timelineRef = useRef(null);

  // Gallery drag-to-scroll
  const handleMouseDown = useCallback((e) => {
    const el = galleryRef.current;
    if (!el) return;
    dragState.current = { isDown: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft };
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!dragState.current.isDown) return;
    e.preventDefault();
    const el = galleryRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    el.scrollLeft = dragState.current.scrollLeft - (x - dragState.current.startX) * 1.5;
  }, []);

  const handleMouseUp = useCallback(() => {
    dragState.current.isDown = false;
    setIsDragging(false);
  }, []);

  // Gallery autoplay — continuous scroll when in viewport, pauses on interaction
  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;
    let paused = false;
    let visible = false;
    let resumeTimer;
    const speed = 0.8;

    const pause = () => {
      paused = true;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => { paused = false; }, 3000);
    };

    el.addEventListener('mousedown', pause);
    el.addEventListener('touchstart', pause, { passive: true });
    el.addEventListener('wheel', pause, { passive: true });

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.1 });
    io.observe(el);

    let raf;
    const tick = () => {
      if (!paused && visible) {
        const max = el.scrollWidth - el.clientWidth;
        if (max > 0 && el.scrollLeft < max - 1) {
          el.scrollLeft += speed;
        } else if (max > 0) {
          el.scrollLeft = 0;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resumeTimer);
      io.disconnect();
      el.removeEventListener('mousedown', pause);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('wheel', pause);
    };
  }, [t3]);

  if (!service || !division) {
    return (
      <main style={{ paddingTop: 72 }}>
        <section className="section-pad" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>
            <h2>Service not found</h2>
            <Link to="/what-we-do" className="btn btn-primary" style={{ marginTop: 24 }}>Back to What We Do</Link>
          </div>
        </section>
      </main>
    );
  }

  if (!t3) {
    return (
      <main style={{ paddingTop: 72 }}>
        <section className="section-pad" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>
            <h2>{service.name}</h2>
            <p style={{ color: 'var(--n500)', marginTop: 8 }}>Page content is being prepared.</p>
            <Link to={`/what-we-do/${divisionSlug}`} className="btn btn-primary" style={{ marginTop: 24 }}>Back to {division.shortName}</Link>
          </div>
        </section>
      </main>
    );
  }

  const { hero, intro, evidence_strip, materials_section, gallery, process_timeline, specs_table, case_study, cta, sticky_bar } = t3;

  // Build integration links from service data
  const integrationServices = (service.integrations || []).map(slug => {
    for (const div of divisions) {
      const svc = div.services.find(s => s.slug === slug);
      if (svc) return { ...svc, divisionSlug: div.slug };
    }
    return null;
  }).filter(Boolean);

  return (
    <main className="t3-page" style={{ paddingBottom: stickyVisible ? 60 : 0 }}>

      {/* ---- HERO ---- */}
      <section className="hero">
        {hero.hero_video_url ? (
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            src={hero.hero_video_url}
          />
        ) : (
          <div className="hero-photo" style={{ backgroundImage: `url(${hero.hero_photo_url})` }} />
        )}
        <div className="hero-grid-overlay eng-grid-dark" />
        <div className="hero-corner tl" />
        <div className="hero-corner tr" />
        <div className="hero-num">{hero.hero_num}</div>

        <div className="hero-content">
          <GsapReveal delay={0.1}>
            <nav className="hero-breadcrumb">
              <Link to="/what-we-do">What We Do</Link>
              <span className="sep">&rsaquo;</span>
              <Link to={`/what-we-do/${divisionSlug}`}>{division.shortName}</Link>
              <span className="sep">&rsaquo;</span>
              <span className="cur">{service.name}</span>
            </nav>
          </GsapReveal>

          <GsapReveal delay={0.2}>
            <div className="hero-badge">
              {hero.badge_text}
            </div>
          </GsapReveal>

          <GsapReveal delay={0.3}>
            <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: hero.title_html }} />
          </GsapReveal>

          <GsapReveal delay={0.4}>
            <p className="hero-lead">{hero.lead}</p>
          </GsapReveal>

          <GsapReveal delay={0.5}>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-green">
                Discuss Project <ArrowIcon />
              </Link>
              <a className="btn btn-outline" href="#">Capability Sheet</a>
            </div>
          </GsapReveal>
        </div>

        <div className="hero-stat-strip">
          {hero.stats.map((stat, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="hero-stat-div" />}
              <div className="hero-stat">
                <div className="hero-stat-num">{stat.num}</div>
                <div className="hero-stat-label">{stat.label}</div>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="hero-scroll">
          <div className="hero-scroll-text">Scroll</div>
        </div>
      </section>

      {/* ---- SIBLING NAV ---- */}
      <nav className="sibling-nav">
        <div className="sibling-nav-inner">
          <div className="sib-division">{division.name}</div>
          {siblings.map(s => (
            <Link
              key={s.slug}
              to={`/what-we-do/${divisionSlug}/${s.slug}`}
              className={`sib-link ${s.slug === serviceSlug ? 'active' : ''}`}
            >
              {s.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* ---- INTRO ---- */}
      <section className="intro eng-grid">
        <div className="t3-contain">
          <div className="intro-inner">
            <div className="intro-text">
              <GsapReveal>
                <div className="t3-overline">{intro.overline}</div>
              </GsapReveal>
              <GsapReveal delay={0.1}>
                <h2 dangerouslySetInnerHTML={{ __html: intro.title_html }} />
              </GsapReveal>
              {intro.paragraphs.map((p, i) => (
                <GsapReveal key={i} delay={0.2 + i * 0.1}>
                  <p dangerouslySetInnerHTML={{ __html: p }} />
                </GsapReveal>
              ))}
              {intro.pull_quote && (
                <GsapReveal delay={0.4}>
                  <div className="pull-quote">
                    <p>{intro.pull_quote.text}</p>
                    <cite>{intro.pull_quote.cite}</cite>
                  </div>
                </GsapReveal>
              )}
            </div>

            <GsapReveal delay={0.3}>
              <aside className="meta-panel">
                {intro.meta_panel.map((section, i) => (
                  <div key={i}>
                    {i > 0 && <div className="meta-divider" />}
                    <div className="meta-section">
                      <div className="meta-label">{section.label}</div>
                      <div className="meta-tags">
                        {section.tags.map((tag, j) => (
                          <span key={j} className="meta-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="meta-divider" />
                <div className="meta-cta">
                  <Link to="/contact" className="btn btn-blue">
                    Discuss This Service <ArrowIcon />
                  </Link>
                  <span className="meta-phone">+91 22 2740 2533</span>
                </div>
              </aside>
            </GsapReveal>
          </div>
        </div>
      </section>

      {/* ---- EVIDENCE STRIP ---- */}
      {evidence_strip && (
        <div className="evidence-strip" ref={evidenceParallaxRef}>
          <img src={evidence_strip.image_url} alt={evidence_strip.tag} loading="lazy" />

          <div className="evidence-strip-content">
            <div className="evidence-strip-tag">{evidence_strip.tag}</div>
            <div className="evidence-strip-title" dangerouslySetInnerHTML={{ __html: evidence_strip.title_html }} />
          </div>
          <div className="evidence-strip-caption">
            <span className="edot" />
            {evidence_strip.caption}
          </div>
        </div>
      )}

      {/* ---- MATERIALS / CAPABILITIES CARDS ---- */}
      {materials_section && (
        <section className="materials eng-grid">
          <div className="t3-contain">
            <div className="materials-header">
              <GsapReveal>
                <div className="t3-overline">{materials_section.overline}</div>
              </GsapReveal>
              <GsapReveal delay={0.1}>
                <h2 className="sec-title" dangerouslySetInnerHTML={{ __html: materials_section.title_html }} />
              </GsapReveal>
              <GsapReveal delay={0.2}>
                <p className="sec-desc">{materials_section.description}</p>
              </GsapReveal>
            </div>
            <div className="materials-grid">
              {materials_section.cards.map((card, i) => (
                <GsapReveal key={i} delay={i * 0.1}>
                  <div className="mat-card">
                    <div className="mat-card-header">
                      <div className="mat-card-symbol"><MatIcon symbol={card.symbol} /></div>
                      <div className="mat-card-header-text">
                        <h3>{card.title}</h3>
                        <div className="subtitle">{card.subtitle}</div>
                      </div>
                    </div>
                    <div className="mat-card-body">
                      <p>{card.description}</p>
                      <div className="mat-card-chems">
                        {card.tags.map((tag, j) => (
                          <span key={j} className="mat-card-chem">{tag}</span>
                        ))}
                      </div>
                      <div className="mat-card-specs">
                        {card.specs.map((spec, j) => (
                          <div key={j} className="mat-spec">
                            <div className="mat-spec-label">{spec.label}</div>
                            <div className="mat-spec-value">{spec.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mat-card-accent" />
                  </div>
                </GsapReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---- GALLERY ---- */}
      {gallery && (
        <section className="gallery">
          <div className="gallery-header">
            <div>
              <div className="t3-overline" style={{ color: 'var(--green)' }}>{gallery.overline || 'Evidence'}</div>
              <div className="gallery-title" dangerouslySetInnerHTML={{ __html: gallery.title_html }} />
            </div>
            <div className="gallery-counter">01 &mdash; {String(gallery.slides.length).padStart(2, '0')}</div>
          </div>
          <div
            className={`gallery-scroll ${isDragging ? 'dragging' : ''}`}
            ref={galleryRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {gallery.slides.map((slide, i) => (
              <div key={i} className="gallery-slide">
                <img src={slide.image_url} alt={slide.text} loading="lazy" />

                <div className="gallery-slide-caption">
                  <div className="gallery-slide-tag">{slide.tag}</div>
                  <div className="gallery-slide-text">{slide.text}</div>
                  <div className="gallery-slide-sub">{slide.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---- PROCESS TIMELINE ---- */}
      {process_timeline && (
        <section className="process">
          <div className="eng-grid-dark" style={{ position: 'absolute', inset: 0 }} />
          <div className="process-inner t3-contain">
            <div className="process-header">
              <div>
                <GsapReveal>
                  <div className="t3-overline" style={{ color: 'var(--green)' }}>{process_timeline.overline}</div>
                </GsapReveal>
                <GsapReveal delay={0.1}>
                  <h2 className="sec-title" style={{ color: '#fff' }} dangerouslySetInnerHTML={{ __html: process_timeline.title_html }} />
                </GsapReveal>
                <GsapReveal delay={0.2}>
                  <p className="sec-desc" style={{ color: 'rgba(255,255,255,0.4)' }}>{process_timeline.description}</p>
                </GsapReveal>
              </div>
              <GsapReveal delay={0.3}>
                <div className="process-header-right">
                  <div className="process-stat-big">{process_timeline.stat_big}</div>
                  <div className="process-stat-label">{process_timeline.stat_label}</div>
                </div>
              </GsapReveal>
            </div>
            <div className="timeline" ref={timelineRef}>
              <div className="timeline-track" />
              {process_timeline.steps.map((step, i) => (
                <GsapReveal key={i}>
                  <div className="tl-step">
                    <div className="tl-dot" />
                    <div className="tl-num">{step.num}</div>
                    <div className="tl-title">{step.title}</div>
                    <div className="tl-desc">{step.description}</div>
                    {step.specs && step.specs.length > 0 && (
                      <div className="tl-specs">
                        {step.specs.map((spec, j) => (
                          <span key={j} className="tl-spec">{spec}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </GsapReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---- SPECS / RESISTANCE TABLE ---- */}
      {specs_table && (
        <section className="resistance eng-grid">
          <div className="t3-contain">
            <div className="resistance-header">
              <GsapReveal>
                <div className="t3-overline">{specs_table.overline}</div>
              </GsapReveal>
              <GsapReveal delay={0.1}>
                <h2 className="sec-title" dangerouslySetInnerHTML={{ __html: specs_table.title_html }} />
              </GsapReveal>
              <GsapReveal delay={0.2}>
                <p className="sec-desc">{specs_table.description}</p>
              </GsapReveal>
            </div>
            <GsapReveal delay={0.3}>
              <div className="res-table-wrap" style={{ overflowX: 'auto' }}>
                <table className="res-table">
                  <thead>
                    <tr>
                      {specs_table.columns.map((col, i) => (
                        <th key={i}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {specs_table.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j}>
                            {j === 0 ? cell : (
                              <span className={`rating ${ratingMap[cell]?.cls || ''}`}>
                                {specs_table.rating_labels?.[cell] || ratingMap[cell]?.label || cell}
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GsapReveal>
            <GsapReveal delay={0.4}>
              <div className="res-legend">
                <div className="res-legend-item legend-a">{specs_table.rating_labels?.rating_a || 'Excellent'}</div>
                <div className="res-legend-item legend-b">{specs_table.rating_labels?.rating_b || 'Good'}</div>
                <div className="res-legend-item legend-c">{specs_table.rating_labels?.rating_c || 'Limited'}</div>
                <div className="res-legend-item legend-x">{specs_table.rating_labels?.rating_x || 'N/A'}</div>
              </div>
            </GsapReveal>
          </div>
        </section>
      )}

      {/* ---- INTEGRATION BAND ---- */}
      {integrationServices.length > 0 && (
        <section className="integration" style={{ padding: '0 0 100px' }}>
          <div className="t3-contain">
            <GsapReveal>
              <div className="integration-band">
                <div className="eng-grid-dark" style={{ position: 'absolute', inset: 0 }} />
                <div className="integration-inner">
                  <div className="integration-left">
                    <span className="integration-label">This service connects to</span>
                    <span className="integration-arrow">&rarr;</span>
                  </div>
                  <div className="integration-links">
                    {integrationServices.map(is => (
                      <Link
                        key={is.slug}
                        to={`/what-we-do/${is.divisionSlug}/${is.slug}`}
                        className="integration-link"
                      >
                        <ServiceIcon slug={is.slug} />
                        {is.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </GsapReveal>
          </div>
        </section>
      )}

      {/* ---- CASE STUDY ---- */}
      {case_study && (
        <section className="case-study">
          <div
            className="case-study-bg"
            ref={caseBgParallaxRef}
            style={{ backgroundImage: `url(${case_study.bg_image_url})` }}
          />

          <div className="case-study-grid eng-grid-dark" />
          <div className="case-study-content">
            <div>
              <div className="case-study-tag">{case_study.tag}</div>
              <GsapReveal>
                <h2 className="case-study-title" dangerouslySetInnerHTML={{ __html: case_study.title_html }} />
              </GsapReveal>
              <GsapReveal delay={0.1}>
                <p className="case-study-desc">{case_study.description}</p>
              </GsapReveal>
            </div>
            <div className="case-study-stats">
              {case_study.stats.map((stat, i) => (
                <GsapReveal key={i} delay={0.2 + i * 0.1}>
                  <div className="case-stat">
                    <div className="case-stat-num">
                      {stat.num}
                      {stat.unit && <span className="case-stat-unit">{stat.unit}</span>}
                    </div>
                    <div className="case-stat-label">{stat.label}</div>
                  </div>
                </GsapReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---- CTA BAND ---- */}
      {cta && (
        <section className="cta">
          <div className="t3-contain">
            <GsapReveal>
              <div className="cta-band">
                <div className="cta-text">
                  <h2 dangerouslySetInnerHTML={{ __html: cta.title_html }} />
                  <p>{cta.description}</p>
                </div>
                <div className="cta-actions">
                  <Link to="/contact" className="btn btn-green">
                    Discuss Your Project <ArrowIcon />
                  </Link>
                  <a className="btn btn-outline" href="#">Download Brochure</a>
                </div>
              </div>
            </GsapReveal>
          </div>
        </section>
      )}

      {/* ---- STICKY BAR ---- */}
      {sticky_bar && (
        <div className={`sticky-bar ${stickyVisible ? 'visible' : ''}`}>
          <div className="sticky-bar-inner">
            <div className="sticky-bar-left">
              <div className="sticky-bar-name">{sticky_bar.name}</div>
              <div className="sticky-bar-sep" />
              <div className="sticky-bar-contact">{sticky_bar.contact}</div>
            </div>
            <div className="sticky-bar-right">
              <a className="btn btn-dark" href="#">Capability Sheet</a>
              <Link to="/contact" className="btn btn-green">
                Discuss Service <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
