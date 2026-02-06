import { Link } from 'react-router-dom';
import { divisions, industries, certifications, facilities, companyStats } from '../data/divisions';
import ScrollReveal from '../components/ScrollReveal';
import CountUp from '../components/CountUp';
import HeroScene from '../components/HeroScene';

export default function Home() {
  return (
    <main>
      <section className="dark-section eng-grid-dark" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div className="resp-hero" style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', padding: '120px 56px 40px', maxWidth: 1400, margin: '0 auto', width: '100%', gap: 40 }}>
          <div>
            <div className="hero-badge">
              <span className="hero-dot" />
              <span className="mono" style={{ fontSize: 11, letterSpacing: '0.06em' }}>Engineering Excellence Since 1984</span>
            </div>
            <h1 style={{ marginTop: 24, marginBottom: 20 }}>
              We <span className="italic-accent">design</span> it.<br />
              We build it.<br />
              We <span className="italic-accent">protect</span> it.
            </h1>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', maxWidth: 480, lineHeight: 1.7, marginBottom: 32 }}>
              The only company that designs, manufactures, and protects industrial process equipment under one roof.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/what-we-do" className="btn btn-primary">What We Do</Link>
              <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
            </div>
          </div>
          <div style={{ height: '100%', minHeight: 500 }}>
            <HeroScene />
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span className="mono" style={{ fontSize: 9, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Scroll</span>
        </div>
      </section>

      <section className="white-section" style={{ padding: '20px 56px', borderBottom: '1px solid var(--g150)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            {certifications.map(cert => (
              <span key={cert} className="trust-badge">{cert}</span>
            ))}
          </div>
          <div style={{ width: 1, height: 28, background: 'var(--g200)', margin: '0 8px' }} />
          <div style={{ display: 'flex', gap: 24 }}>
            {[{ n: '40+', l: 'Years' }, { n: '15+', l: 'Countries' }, { n: '97%', l: 'Reorder' }].map(s => (
              <div key={s.l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 600, color: 'var(--blue)' }}>{s.n}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--g400)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cream-section eng-grid section-pad">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <span className="overline overline-with-line" style={{ justifyContent: 'center' }}>What We Do</span>
              <h2 style={{ marginTop: 12 }}>Four divisions, one <span className="italic-accent">integrated</span> model</h2>
            </div>
          </ScrollReveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {divisions.map((div, i) => (
              <ScrollReveal key={div.id} delay={i * 80}>
                <div className={`division-card ${i % 2 !== 0 ? 'reverse' : ''} corner-brackets`}>
                  <div className="division-card-visual">
                    <div className="bg-number">{div.num}</div>
                    <DivisionSVG division={div.id} />
                  </div>
                  <div className="division-card-content">
                    <span className="division-num">Division {div.num}</span>
                    <h3>{div.name}</h3>
                    <p>{div.description}</p>
                    <div className="stat-inline">
                      {div.stats.map(s => (
                        <div className="stat-inline-item" key={s.label}>
                          <span className="num">{s.num}</span>
                          <span className="label">{s.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pills-wrap">
                      {div.services.map(svc => (
                        <Link key={svc.slug} to={`/what-we-do/${div.slug}/${svc.slug}`} className="pill">{svc.name}</Link>
                      ))}
                    </div>
                    <Link to={`/what-we-do/${div.slug}`} className="btn-ghost" style={{ fontSize: 13, marginTop: 8 }}>
                      Explore {div.shortName}
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-section eng-grid-dark section-pad">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span className="overline overline-with-line" style={{ justifyContent: 'center' }}>Our Difference</span>
              <h2 style={{ marginTop: 12 }}>One company. Zero <span className="italic-accent">handoffs.</span></h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 600, margin: '16px auto 0', fontSize: 15 }}>
                Most projects require 3–4 vendors — designer, fabricator, lining applicator, inspector. Each handoff introduces delays, finger-pointing, and rework. We eliminated the handoffs.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="process-flow-wrap">
              {[
                { num: '01', name: 'Design', label: 'Engineering' },
                { num: '02', name: 'Fabricate', label: 'Manufacturing' },
                { num: '03', name: 'Protect', label: 'Linings' },
                { num: '04', name: 'Inspect', label: 'Quality' },
                { num: '05', name: 'Deliver', label: 'Logistics' }
              ].map((step, i, arr) => (
                <div key={step.num} style={{ display: 'contents' }}>
                  <div className="process-step">
                    <div className="step-circle"><span className="step-num">{step.num}</span></div>
                    <span className="step-name">{step.name}</span>
                    <span className="step-label">{step.label}</span>
                  </div>
                  {i < arr.length - 1 && <div className="process-connector" />}
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={400}>
            <div className="resp-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 48 }}>
              <div className="glass-card">
                <span className="overline" style={{ color: 'var(--g400)' }}>The Industry Problem</span>
                <h4 style={{ color: 'var(--white)', marginTop: 12, marginBottom: 12 }}>Multiple vendors, multiple contracts</h4>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                  3–4 separate companies. 3–4 contracts. 3–4 schedules. When something goes wrong, everyone points to someone else. Quality gaps live in the handoffs between vendors.
                </p>
              </div>
              <div className="glass-card" style={{ borderColor: 'var(--green-line)' }}>
                <span className="overline">The Jasmino Model</span>
                <h4 style={{ color: 'var(--white)', marginTop: 12, marginBottom: 12 }}>One company, one accountability</h4>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                  One company. One contract. One point of accountability. The engineer who designed it walks the shop floor where it's built. The lining team knows the vessel specs before the steel is cut.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="white-section section-pad">
        <div className="container">
          <ScrollReveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <span className="overline overline-with-line">Industries</span>
                <h2 style={{ marginTop: 12 }}>Built for the <span className="italic-accent">harshest</span> environments</h2>
              </div>
              <Link to="/industries" className="btn-ghost">View All Industries</Link>
            </div>
          </ScrollReveal>
          <div className="resp-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {industries.map((ind, i) => (
              <ScrollReveal key={ind.name} delay={i * 60}>
                <Link to="/industries" className="industry-card" style={{ textDecoration: 'none', display: 'block' }}>
                  <div className="icon">{ind.icon}</div>
                  <h4>{ind.name}</h4>
                  <p>{ind.subtitle}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-section" style={{ padding: '48px 56px' }}>
        <div className="container">
          <div className="resp-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center' }}>
            {companyStats.map(s => (
              <div key={s.label}>
                <div className="stat-number"><CountUp target={s.num} /></div>
                <div className="stat-label" style={{ marginTop: 8 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="navy-section eng-grid-dark section-pad">
        <div className="container">
          <div className="resp-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
            <ScrollReveal>
              <div className="globe-placeholder">
                <div className="globe-visual">
                  <GlobeSVG />
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div>
                <span className="overline overline-with-line">Global Presence</span>
                <h2 style={{ marginTop: 12, marginBottom: 12 }}>Three continents, one <span className="italic-accent">standard</span></h2>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 32, lineHeight: 1.7 }}>
                  Jasmino operates from facilities in India, Germany, and Turkey — deploying 150+ technicians across 15+ countries.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {facilities.map(f => (
                    <div className="facility-card" key={f.name}>
                      <span className="flag">{f.flag}</span>
                      <div className="info">
                        <h4>{f.name}</h4>
                        <div className="subtitle">{f.area} · {f.country}</div>
                        <p>{f.capabilities}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="cream-section eng-grid section-pad">
        <div className="container">
          <ScrollReveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <span className="overline overline-with-line">News</span>
                <h2 style={{ marginTop: 12 }}>What's <span className="italic-accent">happening</span></h2>
              </div>
              <Link to="/news" className="btn-ghost">All News</Link>
            </div>
          </ScrollReveal>
          <div className="resp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { date: 'Jan 2026', title: 'Jasmino completes 200-tonne reactor for petrochemical plant', excerpt: 'Largest single-piece vessel delivered from our India facility, featuring ASME VIII Div 2 design with Hastelloy C-276 cladding.' },
              { date: 'Dec 2025', title: 'HAW Linings expands European service footprint', excerpt: 'New partnerships in Scandinavia and Eastern Europe bring our rubber lining expertise to 8 additional countries.' },
              { date: 'Nov 2025', title: 'New rubber compound passes 10,000-hour immersion test', excerpt: 'Our R&D lab develops chlorobutyl formulation achieving breakthrough resistance to hot concentrated sulfuric acid at 98\u00B0C.' }
            ].map((article, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="news-card">
                  <div className="news-card-img" />
                  <div className="news-card-body">
                    <div className="date">{article.date}</div>
                    <h4>{article.title}</h4>
                    <p>{article.excerpt}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg, var(--blue), #1A3F73)', padding: '64px 56px' }}>
        <div className="container resp-cta" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center' }}>
          <div>
            <h2 style={{ color: 'var(--white)' }}>Ready to discuss your <span style={{ fontStyle: 'italic' }}>project?</span></h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: 12, fontSize: 15 }}>
              Whether it's a new build, a corrosion problem, or a plant expansion — let's talk.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link to="/contact" className="btn btn-primary">Get in Touch</Link>
            <a href="#" className="btn btn-secondary" style={{ color: 'var(--white)', borderColor: 'rgba(255,255,255,0.2)' }}>Download Brochure</a>
          </div>
        </div>
      </section>
    </main>
  );
}

function DivisionSVG({ division }) {
  const svgStyle = {
    width: '60%',
    height: 'auto',
    opacity: 0.7,
  };

  if (division === 'engineering-design') {
    return (
      <svg viewBox="0 0 200 200" style={svgStyle} fill="none">
        <rect x="60" y="40" width="80" height="120" rx="4" stroke="rgba(4,229,134,0.3)" strokeWidth="1.5" strokeDasharray="4 3" />
        <circle cx="100" cy="80" r="25" stroke="rgba(4,229,134,0.25)" strokeWidth="1" />
        <line x1="100" y1="55" x2="100" y2="40" stroke="rgba(4,229,134,0.35)" strokeWidth="1.5" />
        <line x1="60" y1="100" x2="40" y2="100" stroke="rgba(4,229,134,0.35)" strokeWidth="1.5" />
        <line x1="140" y1="100" x2="160" y2="100" stroke="rgba(4,229,134,0.35)" strokeWidth="1.5" />
        <rect x="20" y="90" width="20" height="20" rx="2" stroke="rgba(4,229,134,0.2)" strokeWidth="1" />
        <rect x="160" y="90" width="20" height="20" rx="2" stroke="rgba(4,229,134,0.2)" strokeWidth="1" />
        <path d="M75 130 L100 160 L125 130" stroke="rgba(4,229,134,0.25)" strokeWidth="1" fill="none" />
        <circle cx="100" cy="80" r="3" fill="rgba(4,229,134,0.4)" />
      </svg>
    );
  }
  if (division === 'equipment-manufacturing') {
    return (
      <svg viewBox="0 0 200 200" style={svgStyle} fill="none">
        <ellipse cx="100" cy="50" rx="50" ry="15" stroke="rgba(4,229,134,0.3)" strokeWidth="1.5" />
        <line x1="50" y1="50" x2="50" y2="150" stroke="rgba(4,229,134,0.3)" strokeWidth="1.5" />
        <line x1="150" y1="50" x2="150" y2="150" stroke="rgba(4,229,134,0.3)" strokeWidth="1.5" />
        <ellipse cx="100" cy="150" rx="50" ry="15" stroke="rgba(4,229,134,0.3)" strokeWidth="1.5" />
        <line x1="100" y1="35" x2="100" y2="20" stroke="rgba(4,229,134,0.4)" strokeWidth="2" />
        <circle cx="100" cy="18" r="6" stroke="rgba(4,229,134,0.3)" strokeWidth="1" />
        <line x1="50" y1="100" x2="30" y2="100" stroke="rgba(4,229,134,0.35)" strokeWidth="1.5" />
        <line x1="150" y1="120" x2="170" y2="120" stroke="rgba(4,229,134,0.35)" strokeWidth="1.5" />
        <line x1="70" y1="165" x2="70" y2="185" stroke="rgba(4,229,134,0.2)" strokeWidth="1.5" />
        <line x1="130" y1="165" x2="130" y2="185" stroke="rgba(4,229,134,0.2)" strokeWidth="1.5" />
        <line x1="60" y1="185" x2="80" y2="185" stroke="rgba(4,229,134,0.2)" strokeWidth="1" />
        <line x1="120" y1="185" x2="140" y2="185" stroke="rgba(4,229,134,0.2)" strokeWidth="1" />
      </svg>
    );
  }
  if (division === 'corrosion-protection') {
    return (
      <svg viewBox="0 0 200 200" style={svgStyle} fill="none">
        <rect x="40" y="40" width="120" height="120" rx="4" stroke="rgba(4,229,134,0.15)" strokeWidth="1" />
        <rect x="48" y="48" width="104" height="104" rx="3" stroke="rgba(4,229,134,0.25)" strokeWidth="1.5" strokeDasharray="4 2" />
        <rect x="56" y="56" width="88" height="88" rx="2" stroke="rgba(4,229,134,0.35)" strokeWidth="1.5" />
        <rect x="64" y="64" width="72" height="72" rx="2" fill="rgba(4,229,134,0.06)" stroke="rgba(4,229,134,0.4)" strokeWidth="2" />
        <text x="100" y="96" textAnchor="middle" fill="rgba(4,229,134,0.5)" fontSize="8" fontFamily="monospace">STEEL</text>
        <text x="100" y="108" textAnchor="middle" fill="rgba(4,229,134,0.4)" fontSize="7" fontFamily="monospace">PRIMER</text>
        <text x="100" y="120" textAnchor="middle" fill="rgba(4,229,134,0.3)" fontSize="7" fontFamily="monospace">ADHESIVE</text>
        <text x="100" y="132" textAnchor="middle" fill="rgba(4,229,134,0.5)" fontSize="8" fontFamily="monospace">LINING</text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 200" style={svgStyle} fill="none">
      <circle cx="100" cy="100" r="20" stroke="rgba(4,229,134,0.4)" strokeWidth="2" />
      <circle cx="60" cy="60" r="12" stroke="rgba(4,229,134,0.3)" strokeWidth="1.5" />
      <circle cx="140" cy="60" r="12" stroke="rgba(4,229,134,0.3)" strokeWidth="1.5" />
      <circle cx="60" cy="140" r="12" stroke="rgba(4,229,134,0.3)" strokeWidth="1.5" />
      <circle cx="140" cy="140" r="12" stroke="rgba(4,229,134,0.3)" strokeWidth="1.5" />
      <line x1="72" y1="72" x2="88" y2="88" stroke="rgba(4,229,134,0.25)" strokeWidth="1" />
      <line x1="128" y1="72" x2="112" y2="88" stroke="rgba(4,229,134,0.25)" strokeWidth="1" />
      <line x1="72" y1="128" x2="88" y2="112" stroke="rgba(4,229,134,0.25)" strokeWidth="1" />
      <line x1="128" y1="128" x2="112" y2="112" stroke="rgba(4,229,134,0.25)" strokeWidth="1" />
      <circle cx="100" cy="100" r="5" fill="rgba(4,229,134,0.3)" />
      <circle cx="60" cy="60" r="4" fill="rgba(4,229,134,0.2)" />
      <circle cx="140" cy="60" r="4" fill="rgba(4,229,134,0.2)" />
      <circle cx="60" cy="140" r="4" fill="rgba(4,229,134,0.2)" />
      <circle cx="140" cy="140" r="4" fill="rgba(4,229,134,0.2)" />
      <circle cx="100" cy="100" r="50" stroke="rgba(4,229,134,0.1)" strokeWidth="0.5" strokeDasharray="3 3" />
    </svg>
  );
}

function GlobeSVG() {
  return (
    <svg viewBox="0 0 300 300" style={{ width: '100%', maxWidth: 360, margin: '0 auto', display: 'block' }} fill="none">
      <circle cx="150" cy="150" r="120" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <ellipse cx="150" cy="150" rx="120" ry="40" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      <ellipse cx="150" cy="150" rx="120" ry="80" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      <ellipse cx="150" cy="150" rx="40" ry="120" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <ellipse cx="150" cy="150" rx="80" ry="120" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <line x1="30" y1="150" x2="270" y2="150" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
      <line x1="150" y1="30" x2="150" y2="270" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
      <circle cx="120" cy="110" r="4" fill="rgba(4,229,134,0.8)">
        <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="120" cy="110" r="8" stroke="rgba(4,229,134,0.3)" strokeWidth="1" fill="none">
        <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="175" cy="95" r="4" fill="rgba(4,229,134,0.8)">
        <animate attributeName="r" values="4;6;4" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="175" cy="95" r="8" stroke="rgba(4,229,134,0.3)" strokeWidth="1" fill="none">
        <animate attributeName="r" values="8;14;8" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="155" cy="130" r="4" fill="rgba(4,229,134,0.8)">
        <animate attributeName="r" values="4;6;4" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="155" cy="130" r="8" stroke="rgba(4,229,134,0.3)" strokeWidth="1" fill="none">
        <animate attributeName="r" values="8;14;8" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
      </circle>
      <text x="120" y="125" fill="rgba(4,229,134,0.5)" fontSize="7" fontFamily="monospace">INDIA</text>
      <text x="172" y="87" fill="rgba(4,229,134,0.5)" fontSize="7" fontFamily="monospace">GERMANY</text>
      <text x="158" y="145" fill="rgba(4,229,134,0.5)" fontSize="7" fontFamily="monospace">TURKEY</text>
    </svg>
  );
}
