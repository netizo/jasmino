import { Link } from 'react-router-dom';
import { industries, certifications, facilities, companyStats } from '../data/divisions';
import ScrollReveal from '../components/ScrollReveal';
import CountUp from '../components/CountUp';
import Hero from '../components/Hero';
import Divisions from '../components/Divisions';

export default function Home() {
  return (
    <main>
      <Hero />

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

      <Divisions />

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
