import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/group-page.css';

const SUBSIDIARIES = [
  {
    name: 'HAW Linings GmbH',
    location: 'Mülheim an der Ruhr, Germany',
    flag: '🇩🇪',
    specialization: 'Rubber lining application, on-site services, and quality inspection for European and Middle-Eastern markets.',
    stats: [
      { num: '35+', label: 'Years Active' },
      { num: '8,000', label: 'm² Facility' },
      { num: '120+', label: 'Employees' },
    ],
    url: '#',
  },
  {
    name: 'GBT Rubber Technology',
    location: 'Gebze, Kocaeli, Turkey',
    flag: '🇹🇷',
    specialization: 'Rubber sheet manufacturing, compound development, and autoclave curing for the global supply chain.',
    stats: [
      { num: '20+', label: 'Years Active' },
      { num: '12,000', label: 'm² Facility' },
      { num: '85+', label: 'Employees' },
    ],
    url: '#',
  },
  {
    name: 'New Matter Materials',
    location: 'Pune, India',
    flag: '🇮🇳',
    specialization: 'Advanced polymer composites, FRP fabrication, and next-generation corrosion-resistant material R&D.',
    stats: [
      { num: '10+', label: 'Years Active' },
      { num: '6,000', label: 'm² Facility' },
      { num: '60+', label: 'Employees' },
    ],
    url: '#',
  },
];

export default function JasminoGroupPage() {
  const cardsRef = useRef(null);

  useEffect(() => {
    const container = cardsRef.current;
    if (!container) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const cards = container.querySelectorAll('.gp-sub-card');
            cards.forEach((c, i) => setTimeout(() => c.classList.add('vis'), i * 120));
            obs.unobserve(container);
          }
        });
      },
      { threshold: 0.08 }
    );
    obs.observe(container);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="gp">
      {/* Hero */}
      <section className="gp-hero">
        <div className="gp-hero-grid" />
        <div className="gp-hero-inner">
          <nav className="gp-crumb">
            <Link to="/">Home</Link>
            <span className="gp-sep">/</span>
            <Link to="/about/our-story">About</Link>
            <span className="gp-sep">/</span>
            <span className="gp-cur">Jasmino Group</span>
          </nav>
          <h1 className="gp-hero-h">
            The <em>Jasmino</em> Group
          </h1>
          <p className="gp-hero-desc">
            A vertically integrated family of companies spanning three continents — designing, manufacturing, and protecting industrial process equipment worldwide.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="gp-overview">
        <div className="gp-overview-inner">
          <p className="gp-overview-lead">
            Jasmino Corporation is the parent company of a global group that combines deep engineering expertise with localised manufacturing capabilities. Through our subsidiaries in Germany, Turkey, and India, we offer a seamless, single-source solution — from initial process design through fabrication, corrosion protection, and field commissioning.
          </p>
          <p className="gp-overview-body">
            Each subsidiary operates autonomously with its own management and certifications, while sharing the group's unified quality standards (ISO 9001, ISO 14001, ISO 45001, ASME, PED). This structure enables us to serve clients locally with the backing of a global organisation.
          </p>
        </div>
      </section>

      {/* Org Chart Visual */}
      <section className="gp-org">
        <div className="gp-org-inner">
          <div className="gp-org-chart">
            <div className="gp-org-parent">
              <div className="gp-org-dot" />
              <span className="gp-org-lbl">Jasmino Corporation</span>
              <span className="gp-org-sub">India · Parent Company</span>
            </div>
            <div className="gp-org-line" />
            <div className="gp-org-branches">
              {SUBSIDIARIES.map((s) => (
                <div key={s.name} className="gp-org-branch">
                  <div className="gp-org-vline" />
                  <div className="gp-org-node">
                    <span className="gp-org-flag">{s.flag}</span>
                    <span className="gp-org-node-name">{s.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subsidiary Cards */}
      <section className="gp-subs">
        <div className="gp-subs-inner" ref={cardsRef}>
          {SUBSIDIARIES.map((s) => (
            <article key={s.name} className="gp-sub-card">
              <div className="gp-sub-logo-placeholder">
                <span className="gp-sub-flag-big">{s.flag}</span>
              </div>
              <h3 className="gp-sub-name">{s.name}</h3>
              <div className="gp-sub-loc">{s.location}</div>
              <p className="gp-sub-spec">{s.specialization}</p>
              <div className="gp-sub-stats">
                {s.stats.map((st) => (
                  <div key={st.label} className="gp-sub-stat">
                    <span className="gp-sub-stat-num">{st.num}</span>
                    <span className="gp-sub-stat-lbl">{st.label}</span>
                  </div>
                ))}
              </div>
              <a
                className="gp-sub-link"
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website →
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
