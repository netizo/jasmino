import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { caseStudies } from '../data/caseStudies';
import CountUp from '../components/CountUp';
import GsapReveal from '../components/GsapReveal';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../hooks/useGsap';
import '../styles/case-studies-page.css';

const INDUSTRIES = ['All', ...Array.from(new Set(caseStudies.map((cs) => cs.industry)))];

const HERO_STATS = [
  { num: '40+', label: 'Years Experience' },
  { num: '15+', label: 'Countries Served' },
  { num: '97%', label: 'Reorder Rate' },
  { num: '6', label: 'Featured Projects' },
];

export default function CaseStudiesPage() {
  const [filter, setFilter] = useState('All');
  const gridRef = useRef(null);
  const statsRef = useRef(null);
  const [statsVis, setStatsVis] = useState(false);

  const filtered = useMemo(
    () => (filter === 'All' ? caseStudies : caseStudies.filter((cs) => cs.industry === filter)),
    [filter]
  );

  /* ── GSAP card stagger on filter change ── */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll('.csp-card');
    if (!cards.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(cards,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.09 }
    );
  }, [filter]);

  /* ── GSAP stats visibility trigger ── */
  useGSAP(() => {
    const el = statsRef.current;
    if (!el) return;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => setStatsVis(true),
    });
  }, { scope: statsRef, dependencies: [] });

  return (
    <div className="csp">
      {/* Hero */}
      <section className="csp-hero">
        <div className="csp-hero-grid" />
        <div className="csp-hero-inner">
          <nav className="csp-crumb">
            <Link to="/">Home</Link>
            <span className="csp-sep">/</span>
            <span className="csp-cur">Case Studies</span>
          </nav>
          <h1 className="csp-hero-h">
            Proven at <em>scale</em>
          </h1>
          <p className="csp-hero-desc">
            Real projects, real results. See how our integrated design-build-protect model delivers for power, fertilizer, water treatment, and chemical industries worldwide.
          </p>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="csp-stats" ref={statsRef}>
        <div className="csp-stats-inner">
          {HERO_STATS.map((s, i) => (
            <div key={i} className={`csp-stat${statsVis ? ' vis' : ''}`} style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="csp-stat-num">
                {statsVis ? <CountUp target={s.num} /> : '0'}
              </span>
              <span className="csp-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="csp-body">
        <div className="csp-body-inner">
          <div className="csp-head">
            <div className="csp-head-left">
              <div className="csp-overline">Featured Projects</div>
              <h2 className="csp-sec-h">Our work across <em>industries</em></h2>
            </div>
            <div className="csp-tabs" role="tablist" aria-label="Filter by industry">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind}
                  role="tab"
                  aria-selected={filter === ind}
                  className={`csp-tab${filter === ind ? ' csp-tab--active' : ''}`}
                  onClick={() => setFilter(ind)}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          <div className="csp-grid" ref={gridRef}>
            {filtered.map((cs) => (
              <Link key={cs.id} to={`/case-studies/${cs.id}`} className="csp-card">
                <div className="csp-card-photo" style={{ backgroundImage: `url(${cs.image})` }}>
                  <div className="csp-card-overlay" />
                  <span className="csp-card-badge">{cs.badge}</span>
                </div>
                <div className="csp-card-body">
                  <h3 className="csp-card-title">{cs.title}</h3>
                  <div className="csp-card-loc">{cs.location}</div>
                  <p className="csp-card-desc">{cs.description}</p>
                  <div className="csp-card-stats">
                    {cs.stats.slice(0, 3).map((s) => (
                      <div key={s.label} className="csp-card-stat">
                        <span className="csp-card-stat-num">{s.num}</span>
                        <span className="csp-card-stat-lbl">{s.label}</span>
                      </div>
                    ))}
                  </div>
                  <span className="csp-card-link">Read Case Study &rarr;</span>
                </div>
              </Link>
            ))}
            {filtered.length === 0 && (
              <p className="csp-empty">No case studies in this category.</p>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="csp-cta">
        <GsapReveal>
          <div className="csp-cta-inner">
            <h2 className="csp-cta-h">Have a similar <em>challenge?</em></h2>
            <p className="csp-cta-desc">Let our team assess your requirements. We respond within 24 hours.</p>
            <div className="csp-cta-btns">
              <Link className="btn btn-primary" to="/contact">Start a Conversation</Link>
              <Link className="btn csp-btn-outline" to="/what-we-do">Explore Our Capabilities</Link>
            </div>
          </div>
        </GsapReveal>
      </section>
    </div>
  );
}
