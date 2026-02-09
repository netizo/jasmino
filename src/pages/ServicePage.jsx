import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { divisions } from '../data/divisions';
import { getServiceBySlug, getSiblingServices } from '../data/services';
import t3Content from '../data/t3Content.json';
import { rubberLiningsData } from '../data/t3RubberLinings';
import ScrollReveal from '../components/ScrollReveal';
import '../styles/service-t3.css';

function getT3Data(serviceSlug) {
  if (serviceSlug === 'rubber-linings') return rubberLiningsData;
  const page = t3Content.pages.find(p => p.id === serviceSlug);
  return page || null;
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

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 12h16" />
    </svg>
  );
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
  const evidenceRef = useRef(null);
  const caseBgRef = useRef(null);

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

  // Parallax for evidence strip and case study
  useEffect(() => {
    const onScroll = () => {
      const evi = evidenceRef.current;
      if (evi) {
        const r = evi.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          const p = (window.innerHeight - r.top) / (window.innerHeight + r.height);
          const img = evi.querySelector('img');
          if (img) img.style.transform = `translateY(${(p - 0.5) * -60}px)`;
        }
      }
      const cs = caseBgRef.current;
      if (cs) {
        const r = cs.parentElement.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          const p = (window.innerHeight - r.top) / (window.innerHeight + r.height);
          cs.style.transform = `translateY(${(p - 0.5) * -40}px) scale(1.1)`;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [serviceSlug]);

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
            <p style={{ color: 'var(--g500)', marginTop: 8 }}>Page content is being prepared.</p>
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
        <div className="hero-photo" style={{ backgroundImage: `url(${hero.hero_photo_url})` }} />
        <div className="hero-grid-overlay eng-grid-dark" />
        <div className="hero-corner tl" />
        <div className="hero-corner tr" />
        <div className="hero-num">{hero.hero_num}</div>

        <div className="hero-content">
          <ScrollReveal delay={100}>
            <nav className="hero-breadcrumb">
              <Link to="/what-we-do">What We Do</Link>
              <span className="sep">&rsaquo;</span>
              <Link to={`/what-we-do/${divisionSlug}`}>{division.shortName}</Link>
              <span className="sep">&rsaquo;</span>
              <span className="cur">{service.name}</span>
            </nav>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="hero-badge">
              <div className="hero-badge-dot" />
              {hero.badge_text}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: hero.title_html }} />
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <p className="hero-lead">{hero.lead}</p>
          </ScrollReveal>

          <ScrollReveal delay={500}>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-green">
                Discuss Project <ArrowIcon />
              </Link>
              <a className="btn btn-outline" href="#">Capability Sheet</a>
            </div>
          </ScrollReveal>
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
          <div className="hero-scroll-line" />
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
              <ScrollReveal>
                <div className="t3-overline">{intro.overline}</div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 dangerouslySetInnerHTML={{ __html: intro.title_html }} />
              </ScrollReveal>
              {intro.paragraphs.map((p, i) => (
                <ScrollReveal key={i} delay={200 + i * 100}>
                  <p dangerouslySetInnerHTML={{ __html: p }} />
                </ScrollReveal>
              ))}
              {intro.pull_quote && (
                <ScrollReveal delay={400}>
                  <div className="pull-quote">
                    <p>{intro.pull_quote.text}</p>
                    <cite>{intro.pull_quote.cite}</cite>
                  </div>
                </ScrollReveal>
              )}
            </div>

            <ScrollReveal delay={300}>
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
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ---- EVIDENCE STRIP ---- */}
      {evidence_strip && (
        <div className="evidence-strip" ref={evidenceRef}>
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
              <ScrollReveal>
                <div className="t3-overline">{materials_section.overline}</div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="sec-title" dangerouslySetInnerHTML={{ __html: materials_section.title_html }} />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="sec-desc">{materials_section.description}</p>
              </ScrollReveal>
            </div>
            <div className="materials-grid">
              {materials_section.cards.map((card, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="mat-card">
                    <div className="mat-card-header">
                      <div className="mat-card-symbol">{card.symbol}</div>
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
                </ScrollReveal>
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
              <div className="t3-overline" style={{ color: 'var(--green)' }}>Evidence</div>
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
          <div className="gallery-scroll-hint">
            <span>Drag to explore</span>
            <div className="gallery-scroll-hint-arrow" />
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
                <ScrollReveal>
                  <div className="t3-overline" style={{ color: 'var(--green)' }}>{process_timeline.overline}</div>
                </ScrollReveal>
                <ScrollReveal delay={100}>
                  <h2 className="sec-title" style={{ color: '#fff' }} dangerouslySetInnerHTML={{ __html: process_timeline.title_html }} />
                </ScrollReveal>
                <ScrollReveal delay={200}>
                  <p className="sec-desc" style={{ color: 'rgba(255,255,255,0.4)' }}>{process_timeline.description}</p>
                </ScrollReveal>
              </div>
              <ScrollReveal delay={300}>
                <div className="process-header-right">
                  <div className="process-stat-big">{process_timeline.stat_big}</div>
                  <div className="process-stat-label">{process_timeline.stat_label}</div>
                </div>
              </ScrollReveal>
            </div>
            <div className="timeline">
              <div className="timeline-track" />
              {process_timeline.steps.map((step, i) => (
                <ScrollReveal key={i} delay={i * 100}>
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
                </ScrollReveal>
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
              <ScrollReveal>
                <div className="t3-overline">{specs_table.overline}</div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="sec-title" dangerouslySetInnerHTML={{ __html: specs_table.title_html }} />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="sec-desc">{specs_table.description}</p>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={300}>
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
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <div className="res-legend">
                <div className="res-legend-item legend-a">{specs_table.rating_labels?.rating_a || 'Excellent'}</div>
                <div className="res-legend-item legend-b">{specs_table.rating_labels?.rating_b || 'Good'}</div>
                <div className="res-legend-item legend-c">{specs_table.rating_labels?.rating_c || 'Limited'}</div>
                <div className="res-legend-item legend-x">{specs_table.rating_labels?.rating_x || 'N/A'}</div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ---- INTEGRATION BAND ---- */}
      {integrationServices.length > 0 && (
        <section className="integration" style={{ padding: '0 0 100px' }}>
          <div className="t3-contain">
            <ScrollReveal>
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
                        <LinkIcon />
                        {is.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ---- CASE STUDY ---- */}
      {case_study && (
        <section className="case-study">
          <div
            className="case-study-bg"
            ref={caseBgRef}
            style={{ backgroundImage: `url(${case_study.bg_image_url})` }}
          />

          <div className="case-study-grid eng-grid-dark" />
          <div className="case-study-content">
            <div>
              <div className="case-study-tag">{case_study.tag}</div>
              <ScrollReveal>
                <h2 className="case-study-title" dangerouslySetInnerHTML={{ __html: case_study.title_html }} />
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="case-study-desc">{case_study.description}</p>
              </ScrollReveal>
            </div>
            <div className="case-study-stats">
              {case_study.stats.map((stat, i) => (
                <ScrollReveal key={i} delay={200 + i * 100}>
                  <div className="case-stat">
                    <div className="case-stat-num">
                      {stat.num}
                      {stat.unit && <span className="case-stat-unit">{stat.unit}</span>}
                    </div>
                    <div className="case-stat-label">{stat.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---- CTA BAND ---- */}
      {cta && (
        <section className="cta">
          <div className="t3-contain">
            <ScrollReveal>
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
            </ScrollReveal>
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
