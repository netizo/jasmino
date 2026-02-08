import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { industries, certifications, facilities, companyStats } from '../data/divisions';
import ScrollReveal from '../components/ScrollReveal';
import CountUp from '../components/CountUp';
import Hero from '../components/Hero';
import TrustBand from '../components/TrustBand';
import Industries from '../components/Industries';

const Divisions = lazy(() => import('../components/Divisions'));
const IntegratedModel = lazy(() => import('../components/IntegratedModel'));
const GlobalPresence = lazy(() => import('../components/GlobalPresence'));

export default function Home() {
  return (
    <main>
      <Hero />

      <TrustBand />

      <Suspense fallback={<div style={{ minHeight: 600 }} />}>
        <Divisions />
      </Suspense>

      <Suspense fallback={<div style={{ minHeight: 400 }} />}>
        <IntegratedModel />
      </Suspense>

      <Industries />

      <Suspense fallback={<div style={{ minHeight: 500 }} />}>
        <GlobalPresence />
      </Suspense>

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
