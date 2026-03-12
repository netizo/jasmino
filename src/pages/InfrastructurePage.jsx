import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { infrastructureData as data } from '../data/infrastructureData';
import GsapReveal from '../components/GsapReveal';
import CertLogo from '../components/CertLogo';
import { hasCertLogo } from '../data/certLogos';
import CountUp from '../components/CountUp';
import { useGSAP } from '@gsap/react';
import { gsap, useStagger } from '../hooks/useGsap';
import '../styles/infrastructure-page.css';

/* ── SVG icon helper ── */
const specIcons = {
  fabrication: <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20M6 16V8a2 2 0 012-2h8a2 2 0 012 2v8" /></svg>,
  engineering: <svg viewBox="0 0 24 24" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>,
  rubber: <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
  clock: <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M12 6v6l4 2" /></svg>,
  grid: <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
  check: <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  location: <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  document: <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
  team: <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>,
};

import { CONTINENT_PATHS, MAP_PINS, MAP_CONNECTIONS, FLOW_PARTICLES } from '../data/worldMapPaths';

export default function InfrastructurePage() {
  const [activeNav, setActiveNav] = useState(data.facilityNav[0].id);
  const [tooltip, setTooltip] = useState(null);
  const [heroVideoError, setHeroVideoError] = useState(false);
  const fnavRef = useRef(null);
  const mapFrameRef = useRef(null);
  const heroRef = useRef(null);

  /* ── GSAP hero entrance timeline ── */
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = (s) => heroRef.current?.querySelector(s);
    const targets = ['.hero-bc', '.hero-badge', '.hero-title', '.hero-desc', '.hero-stats']
      .map(el).filter(Boolean);
    gsap.set(targets, { opacity: 0, y: 24 });
    gsap.to(targets, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.12, delay: 0.15 });
  }, { scope: heroRef, dependencies: [] });

  /* ── GSAP map entrance animation ── */
  useGSAP(() => {
    const frame = mapFrameRef.current;
    if (!frame || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const continents = frame.querySelectorAll('.map-continent');
    const connLines = frame.querySelectorAll('.map-conn-line');
    const connTrails = frame.querySelectorAll('.map-conn-trail');
    const pins = frame.querySelectorAll('.map-pin');
    const particles = frame.querySelectorAll('.map-particle-g');

    // Initial states
    gsap.set(continents, { opacity: 0 });
    gsap.set(connTrails, { opacity: 0 });
    gsap.set(particles, { opacity: 0 });
    gsap.set(pins, { opacity: 0, scale: 0, transformOrigin: 'center center' });

    // Measure and set stroke-dasharray for line draw
    connLines.forEach(line => {
      const len = line.getTotalLength();
      line.style.strokeDasharray = len;
      line.style.strokeDashoffset = len;
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: frame,
        start: 'top 80%',
        end: 'bottom 30%',
        toggleActions: 'play none none none',
      },
    });

    // 1. Continents fade in
    tl.to(continents, {
      opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power2.out',
    }, 0);

    // 2. Connection trails appear
    tl.to(connTrails, {
      opacity: 1, duration: 0.4, ease: 'power2.out',
    }, 0.3);

    // 3. Connection lines draw
    tl.to(connLines, {
      strokeDashoffset: 0, duration: 1.2, stagger: 0.15, ease: 'power2.inOut',
    }, 0.5);

    // 4. Pins pop in
    tl.to(pins, {
      opacity: 1, scale: 1, duration: 0.5, stagger: 0.12,
      ease: 'back.out(2.5)',
    }, 1.0);

    // 5. Particles fade in
    tl.to(particles, {
      opacity: 1, duration: 0.6, ease: 'power2.out',
    }, 1.4);
  }, { scope: mapFrameRef, dependencies: [] });

  /* ── IntersectionObserver: track active facility ── */
  useEffect(() => {
    const ids = data.facilities.map(f => f.id);
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveNav(entry.target.id);
        });
      },
      { threshold: 0.12, rootMargin: '-80px 0px -50% 0px' }
    );

    sections.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Scroll to facility on nav click ── */
  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navHeight = fnavRef.current ? fnavRef.current.offsetHeight : 56;
    const top = el.getBoundingClientRect().top + window.scrollY - 72 - navHeight - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  /* ── Map tooltip handlers ── */
  const handlePinEnter = useCallback((pin, e) => {
    if (!mapFrameRef.current) return;
    const fr = mapFrameRef.current.getBoundingClientRect();
    const svg = mapFrameRef.current.querySelector('svg');
    if (!svg) return;
    const svgRect = svg.getBoundingClientRect();
    // Convert SVG coords (672×315 space scaled to 800×400) to pixel coords
    const scaledCx = pin.cx * 1.19048;
    const scaledCy = pin.cy * 1.26984;
    const scaleX = svgRect.width / 800;
    const scaleY = svgRect.height / 400;
    const pixelX = (svgRect.left - fr.left) + scaledCx * scaleX;
    const pixelY = (svgRect.top - fr.top) + scaledCy * scaleY;
    setTooltip({ name: pin.name, meta: pin.meta, x: pixelX, y: pixelY - 52 });
  }, []);

  const handlePinLeave = useCallback(() => setTooltip(null), []);

  return (
    <main className="infra-page">
      {/* ════ HERO ════ */}
      <section className="infra-hero">
        <div className="hero-video">
          {!heroVideoError && (
            <video
              className="hero-video-bg"
              autoPlay
              muted
              loop
              playsInline
              onError={() => setHeroVideoError(true)}
            >
              <source src="/videos/infra.mp4" type="video/mp4" />
            </video>
          )}
          <div
            className="hero-video-fallback"
            style={{ backgroundImage: `url('${data.hero.fallback_image}')` }}
          />
        </div>
        <div className="hero-overlay" />
        <div className="hero-grid-ov eng-grid-dark" />
        <div className="hero-flare" />

        <div className="hero-content" ref={heroRef}>
          <div className="hero-bc">
            <Link to="/">Home</Link>
            <span className="sep">&rsaquo;</span>
            <span style={{ color: 'rgba(255,255,255,.45)' }}>Infrastructure</span>
          </div>

          <div className="hero-badge">
            {data.hero.badge}
          </div>

          <h1
            className="hero-title"
            dangerouslySetInnerHTML={{ __html: data.hero.title_html }}
          />

          <p className="hero-desc">{data.hero.description}</p>

          <div className="hero-stats">
            {data.hero.stats.map((s, i) => (
              <div className="hero-stat" key={i}>
                <div className="hero-stat-num">
                  <CountUp target={s.value} />
                </div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-scroll">
          <span>Scroll</span>
        </div>
      </section>

      {/* ════ STICKY FACILITY NAV ════ */}
      <nav className="fnav" ref={fnavRef}>
        <div className="fnav-in">
          <div className="fnav-label">Facilities</div>
          <div className="fnav-items">
            {data.facilityNav.map(item => (
              <button
                key={item.id}
                className={`fnav-item${activeNav === item.id ? ' active' : ''}`}
                onClick={() => scrollToSection(item.id)}
              >
                <span className="fnav-flag">{item.flag}</span> {item.label}
              </button>
            ))}
          </div>
          <div className="fnav-right">
            <a className="fnav-dl" href="#">
              Download Brochure{' '}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* ════ OVERVIEW ════ */}
      <section className="overview eng-grid">
        <div className="inner">
          <div className="overview-grid">
            <GsapReveal>
              <div className="overline">{data.overview.overline}</div>
              <h2
                className="sec-title"
                dangerouslySetInnerHTML={{ __html: data.overview.title_html }}
              />
              <p className="sec-desc">{data.overview.description}</p>
              <div className="ov-stats">
                {data.overview.stats.map((s, i) => (
                  <div key={i}>
                    <div className="ov-stat-num">
                      {s.noCount ? s.value : <CountUp target={s.value} />}
                    </div>
                    <div className="ov-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </GsapReveal>

            <div className="map-frame" ref={mapFrameRef}>
                <div className="map-corner map-corner--tl" />
                <div className="map-corner map-corner--tr" />
                <div className="map-corner map-corner--bl" />
                <div className="map-corner map-corner--br" />

                <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="connGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2E8B57" />
                      <stop offset="50%" stopColor="#2A6AAF" />
                      <stop offset="100%" stopColor="#2E8B57" />
                    </linearGradient>
                    <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#2E8B57" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#2E8B57" stopOpacity="0" />
                    </radialGradient>
                    <filter id="particleGlow" x="-100%" y="-100%" width="300%" height="300%">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <g transform="scale(1.19048, 1.26984)">
                    {/* Continents */}
                    {CONTINENT_PATHS.map((d, i) => (
                      <path key={i} d={d} className="map-continent" fill="#E8EBF0" stroke="#D5D9E0" strokeWidth="0.4" />
                    ))}

                    {/* Connection trail (wide, soft) */}
                    {MAP_CONNECTIONS.map((d, i) => (
                      <path key={`trail-${i}`} d={d} stroke="rgba(42,106,175,0.1)" strokeWidth="5" fill="none" strokeLinecap="round" className="map-conn-trail" />
                    ))}

                    {/* Connection paths — drawn on scroll */}
                    {MAP_CONNECTIONS.map((d, i) => (
                      <path key={`conn-${i}`} d={d} className="map-conn-line" stroke="url(#connGrad)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    ))}

                    {/* Hidden paths for flow particles */}
                    {FLOW_PARTICLES.map((fp, i) => (
                      <path key={`fp-${i}`} id={`flowPath${i}`} d={fp.path} fill="none" stroke="none" />
                    ))}

                    {/* Flow particles */}
                    {FLOW_PARTICLES.map((fp, i) => (
                      <g key={`particle-${i}`} filter="url(#particleGlow)" className="map-particle-g">
                        <circle r="2.5" fill={fp.color} opacity="0.9">
                          <animateMotion dur={fp.dur} begin={fp.delay} repeatCount="indefinite">
                            <mpath href={`#flowPath${i}`} />
                          </animateMotion>
                        </circle>
                        <circle r="5" fill={fp.color} opacity="0.15">
                          <animateMotion dur={fp.dur} begin={fp.delay} repeatCount="indefinite">
                            <mpath href={`#flowPath${i}`} />
                          </animateMotion>
                        </circle>
                      </g>
                    ))}

                    {/* Location pins */}
                    {MAP_PINS.filter(pin => pin.pulseR > 0).map(pin => (
                      <g
                        key={pin.id}
                        className="map-pin"
                        onMouseEnter={(e) => handlePinEnter(pin, e)}
                        onMouseLeave={handlePinLeave}
                      >
                        <circle cx={pin.cx} cy={pin.cy} r="22" fill="url(#pinGlow)" className="map-pin-glow" />
                        <circle cx={pin.cx} cy={pin.cy} r={pin.pulseR} fill="rgba(46,139,87,0.04)" stroke="rgba(46,139,87,0.25)" strokeWidth="0.5" className="map-pin-pulse">
                          <animate attributeName="r" values={`${pin.pulseR};${pin.pulseR + 5};${pin.pulseR}`} dur={pin.pulseDur} repeatCount="indefinite" />
                          <animate attributeName="opacity" values="1;0.2;1" dur={pin.pulseDur} repeatCount="indefinite" />
                        </circle>
                        <circle cx={pin.cx} cy={pin.cy} r={pin.pulseR === 14 ? 6 : 4.5} fill="#2E8B57" opacity="0.9" className="map-pin-dot" />
                        <circle cx={pin.cx} cy={pin.cy} r={pin.pulseR === 14 ? 2.5 : 1.8} fill="#fff" className="map-pin-center" />
                        {pin.labelText && (
                          <text x={pin.labelX} y={pin.labelY} className="map-pin-label" fontFamily="var(--font-mono)" fontSize="6.5" fontWeight="600" fill="#5A6678" textAnchor="middle" letterSpacing="0.1em">{pin.labelText}</text>
                        )}
                      </g>
                    ))}
                  </g>
                </svg>

                {/* Tooltip */}
                <div
                  className={`map-tooltip${tooltip ? ' show' : ''}`}
                  style={tooltip ? { left: tooltip.x, top: tooltip.y, transform: 'translateX(-50%)' } : {}}
                >
                  <div className="map-tooltip-name">{tooltip?.name}</div>
                  <div className="map-tooltip-meta">{tooltip?.meta}</div>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* ════ FACILITY SECTIONS ════ */}
      {data.facilities.map(fac => (
        <section
          key={fac.id}
          id={fac.id}
          className={`fac-sec${fac.alt ? ' alt' : ''}`}
        >
          <div className="fac-ghost-num">{fac.num}</div>
          <div className="inner">
            {/* Header */}
            <GsapReveal>
              <div className="fac-hdr">
                <div>
                  <div className="fac-flag-bar">
                    <span className="fac-flag">{fac.flag}</span>
                    <span className="fac-country">{fac.country}</span>
                  </div>
                  <h2 className="fac-name">
                    {fac.name} <em>{fac.nameAccent}</em>
                  </h2>
                  <p className="fac-desc">{fac.description}</p>
                </div>
                <div className="fac-badge">
                  <span className="bnum">{fac.capacity.num}</span>
                  {fac.capacity.label}
                </div>
              </div>
            </GsapReveal>

            {/* Gallery */}
            <GsapReveal delay={0.1}>
              <div className="fac-gal">
                {fac.gallery.map((img, i) => (
                  <div key={i} className={`fac-gal-item${img.span2 ? ' span-2' : ''}`}>
                    <img src={img.src} alt={img.alt} loading="lazy" />
                    <div className="gal-ov" />
                    <div className="gal-cap">
                      <span>{img.caption}</span>
                      <div className="gal-dot" />
                      <span>{img.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GsapReveal>

            {/* Spec cards */}
            <GsapReveal delay={0.2}>
              <div className="fac-specs">
                {fac.specs.map((spec, i) => (
                  <div className="spec-card" key={i}>
                    <div className="spec-icon">
                      {specIcons[spec.icon]}
                    </div>
                    <div className="spec-title">{spec.title}</div>
                    <div className="spec-desc">{spec.description}</div>
                    <div className="spec-stat">
                      <span className="n">
                        {spec.stat.noCount ? spec.stat.value : <CountUp target={spec.stat.value} />}
                      </span>
                      <span className="l">{spec.stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GsapReveal>

            {/* Equipment */}
            <GsapReveal delay={0.3}>
              <div className="equip-title">Key Equipment &amp; Capabilities</div>
              <div className="equip-grid">
                {fac.equipment.map((eq, i) => (
                  <div className="equip-item" key={i}>
                    <div className="eq-dot" />
                    <span>{eq}</span>
                  </div>
                ))}
              </div>
            </GsapReveal>
          </div>
        </section>
      ))}

      {/* ════ QUALITY ════ */}
      <section className="quality eng-grid-dark">
        <div className="inner">
          <div className="quality-grid">
            <GsapReveal>
              <div className="overline" style={{ color: 'var(--green)' }}>
                {data.quality.overline}
              </div>
              <h2
                className="quality-title"
                dangerouslySetInnerHTML={{ __html: data.quality.title_html }}
              />
              <p className="quality-desc">{data.quality.description}</p>
              <div className="quality-pillars">
                {data.quality.pillars.map((p, i) => (
                  <div className="q-pillar" key={i}>
                    <div className="q-num">{p.num}</div>
                    <div>
                      <div className="q-title">{p.title}</div>
                      <div className="q-desc">{p.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </GsapReveal>

            <GsapReveal delay={0.3}>
              <div className="cert-label">Certifications</div>
              <div className="cert-grid">
                {data.quality.certifications.map((cert, i) => (
                  <div className="cert-card" key={i}>
                    <div className="cert-logo">
                      {hasCertLogo(cert.logo) ? (
                        <CertLogo certKey={cert.logo} alt={cert.name} width={56} height={32} />
                      ) : (
                        <span className="cert-fallback">{cert.logo}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </GsapReveal>
          </div>
        </div>
      </section>

      {/* ════ CTA ════ */}
      <section className="infra-cta">
        <div className="inner">
          <GsapReveal>
            <div className="cta-split">
              <div>
                <h2
                  className="cta-title"
                  dangerouslySetInnerHTML={{ __html: data.cta.title_html }}
                />
                <p className="cta-desc">{data.cta.description}</p>
              </div>
              <div className="cta-btns">
                <Link className="infra-btn pri" to="/contact">
                  Schedule a Visit{' '}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <a className="infra-btn sec-btn" href="#">Download Brochure</a>
              </div>
            </div>
          </GsapReveal>
        </div>
      </section>
    </main>
  );
}
