import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { infrastructureData as data } from '../data/infrastructureData';
import ScrollReveal from '../components/ScrollReveal';
import CountUp from '../components/CountUp';
import HeroParticles from '../components/HeroParticles';
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

/* ── SVG map paths (continents) ── */
const mapPaths = [
  'M120 180 C130 160,180 140,220 150 C240 155,260 170,270 190 C275 200,265 220,250 230 C235 240,200 250,180 245 C160 240,130 220,120 200 Z',
  'M370 120 C380 110,410 105,430 115 C445 125,450 140,445 155 C440 165,420 175,400 170 C385 165,370 150,365 140 Z',
  'M390 180 C400 175,430 180,440 200 C448 220,445 260,435 280 C425 300,405 310,390 300 C375 290,365 260,370 240 C372 220,380 195,390 180 Z',
  'M450 100 C480 90,530 95,570 110 C600 120,630 140,640 165 C645 180,635 200,615 210 C600 218,575 215,555 205 C540 195,520 180,505 175 C490 170,465 160,455 145 C448 135,445 115,450 100 Z',
  'M530 180 C540 175,560 180,565 195 C568 210,560 235,550 248 C540 258,530 255,525 240 C520 225,522 200,530 180 Z',
  'M220 260 C230 250,260 255,270 275 C278 295,275 330,265 350 C255 365,235 370,225 355 C215 340,210 310,215 290 C218 275,220 265,220 260 Z',
  'M600 310 C615 305,640 310,650 325 C655 335,650 350,635 355 C620 358,600 350,595 340 C590 330,593 315,600 310 Z',
];

const mapConnections = [
  'M545 210 Q490 160 430 135',
  'M430 135 Q435 142 445 155',
  'M545 210 Q500 175 445 155',
];

export default function InfrastructurePage() {
  const [activeNav, setActiveNav] = useState(data.facilityNav[0].id);
  const [tooltip, setTooltip] = useState(null);
  const fnavRef = useRef(null);
  const mapFrameRef = useRef(null);

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
    // Convert SVG coords to pixel coords within the frame
    const scaleX = svgRect.width / 800;
    const scaleY = svgRect.height / 500;
    const pixelX = (svgRect.left - fr.left) + pin.cx * scaleX;
    const pixelY = (svgRect.top - fr.top) + pin.cy * scaleY;
    setTooltip({ name: pin.name, meta: pin.meta, x: pixelX, y: pixelY - 52 });
  }, []);

  const handlePinLeave = useCallback(() => setTooltip(null), []);

  return (
    <main className="infra-page">
      {/* ════ HERO ════ */}
      <section className="infra-hero">
        {/* Video placeholder — replace <div> with <video> later */}
        <div className="hero-video">
          <div
            className="hero-video-fallback"
            style={{ backgroundImage: `url('${data.hero.fallback_image}')` }}
          />
        </div>
        <div className="hero-overlay" />
        <div className="hero-grid-ov eng-grid-dark" />
        <div className="hero-grain" />
        <div className="hero-canvas">
          <HeroParticles maxParticles={90} />
        </div>
        <div className="hero-flare" />

        <div className="hero-content">
          <ScrollReveal delay={100}>
            <div className="hero-bc">
              <Link to="/">Home</Link>
              <span className="sep">&rsaquo;</span>
              <span style={{ color: 'rgba(255,255,255,.45)' }}>Infrastructure</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="hero-badge">
              <div className="hero-badge-dot" />
              {data.hero.badge}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <h1
              className="hero-title"
              dangerouslySetInnerHTML={{ __html: data.hero.title_html }}
            />
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <p className="hero-desc">{data.hero.description}</p>
          </ScrollReveal>

          <ScrollReveal delay={500}>
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
          </ScrollReveal>
        </div>

        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line" />
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
            <ScrollReveal>
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
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="map-frame" ref={mapFrameRef}>
                <div className="map-corner map-corner--tl" />
                <div className="map-corner map-corner--tr" />
                <div className="map-corner map-corner--bl" />
                <div className="map-corner map-corner--br" />

                <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {mapPaths.map((d, i) => (
                    <path key={i} d={d} fill="#E8EBF0" stroke="#D5D9E0" strokeWidth="0.5" />
                  ))}
                  <defs>
                    <linearGradient id="connGrad">
                      <stop offset="0%" stopColor="#1B4B8F" />
                      <stop offset="100%" stopColor="#04E586" />
                    </linearGradient>
                    <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#04E586" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#04E586" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {mapConnections.map((d, i) => (
                    <path key={i} d={d} stroke="url(#connGrad)" strokeWidth="1" strokeDasharray="5 4" fill="none" opacity="0.35" />
                  ))}

                  {data.overview.mapPins.map(pin => (
                    <g
                      key={pin.id}
                      className="map-pin"
                      onMouseEnter={(e) => handlePinEnter(pin, e)}
                      onMouseLeave={handlePinLeave}
                    >
                      <circle cx={pin.cx} cy={pin.cy} r="24" fill="url(#pinGlow)" />
                      <circle cx={pin.cx} cy={pin.cy} r={pin.pulseR} fill="rgba(4,229,134,0.06)" stroke="rgba(4,229,134,0.2)" strokeWidth="0.5">
                        <animate attributeName="r" values={`${pin.pulseR};${pin.pulseR + 4};${pin.pulseR}`} dur={pin.pulseDur} repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1;0.3;1" dur={pin.pulseDur} repeatCount="indefinite" />
                      </circle>
                      <circle cx={pin.cx} cy={pin.cy} r={pin.pulseR === 14 ? 6 : 5} fill="#04E586" opacity="0.9" />
                      <circle cx={pin.cx} cy={pin.cy} r={pin.pulseR === 14 ? 2.5 : 2} fill="#fff" />
                      <text x={pin.labelX} y={pin.labelY} fontFamily="'JetBrains Mono',monospace" fontSize="7.5" fontWeight="500" fill="#8892A2" textAnchor="middle" letterSpacing="0.08em">{pin.labelText}</text>
                    </g>
                  ))}
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
            </ScrollReveal>
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
            <ScrollReveal>
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
            </ScrollReveal>

            {/* Gallery */}
            <ScrollReveal delay={100}>
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
            </ScrollReveal>

            {/* Spec cards */}
            <ScrollReveal delay={200}>
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
            </ScrollReveal>

            {/* Equipment */}
            <ScrollReveal delay={300}>
              <div className="equip-title">Key Equipment &amp; Capabilities</div>
              <div className="equip-grid">
                {fac.equipment.map((eq, i) => (
                  <div className="equip-item" key={i}>
                    <div className="eq-dot" />
                    <span>{eq}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      ))}

      {/* ════ QUALITY ════ */}
      <section className="quality eng-grid-dark">
        <div className="inner">
          <div className="quality-grid">
            <ScrollReveal>
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
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="cert-label">Certifications</div>
              <div className="cert-grid">
                {data.quality.certifications.map((cert, i) => (
                  <div className="cert-card" key={i}>
                    <div className="cert-logo">{cert.logo}</div>
                    <div className="cert-name">{cert.name}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════ CTA ════ */}
      <section className="infra-cta">
        <div className="inner">
          <ScrollReveal>
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
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
