import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import GsapReveal from '../components/GsapReveal';
import HeroVariantA from '../components/HeroVariantA';
import Divisions from '../components/Divisions';
import Industries from '../components/Industries';
import CaseStudies from '../components/CaseStudies';
import USPCards from '../components/USPCards';
import { useStagger } from '../hooks/useGsap';

const HeroVariantB = lazy(() => import('../components/HeroVariantB'));
const HeroVariantC = lazy(() => import('../components/HeroVariantC'));
const IntegratedModel = lazy(() => import('../components/IntegratedModel'));
const GlobalPresence = lazy(() => import('../components/GlobalPresence'));

const HERO_VARIANTS = {
  A: HeroVariantA,
  B: HeroVariantB,
  C: HeroVariantC,
};

// Toggle: 'A' = text-only news, 'B' = recent deliveries
const NEWS_VARIANT = 'A';

const NEWS_TEXT = [
  { date: 'Jan 2026', title: 'Jasmino completes 200-tonne reactor for petrochemical plant', excerpt: 'Largest single-piece vessel delivered from our India facility, featuring ASME VIII Div 2 design with Hastelloy C-276 cladding.' },
  { date: 'Dec 2025', title: 'HAW Linings expands European service footprint', excerpt: 'New partnerships in Scandinavia and Eastern Europe bring our rubber lining expertise to 8 additional countries.' },
  { date: 'Nov 2025', title: 'New rubber compound passes 10,000-hour immersion test', excerpt: 'Our R&D lab develops chlorobutyl formulation achieving breakthrough resistance to hot concentrated sulfuric acid at 98\u00B0C.' },
];

const RECENT_DELIVERIES = [
  { badge: 'Power', title: '600MW FGD Absorber System', location: 'Southeast Asia', stat: '600 MW', statLabel: 'Capacity' },
  { badge: 'Fertilizer', title: 'Phosphoric Acid Reactor Battery', location: 'North Africa', stat: '6', statLabel: 'Reactors' },
  { badge: 'Water', title: 'Desalination Pre-Treatment', location: 'Middle East', stat: '50K', statLabel: 'm³/day' },
];

export default function Home({ variant = 'A' }) {
  const HeroComponent = HERO_VARIANTS[variant] || HeroVariantA;
  const newsRef = useStagger('.news-card', { stagger: 0.1, y: 28 });
  const ctaRef = useStagger('.cta-inner > *', { stagger: 0.1, y: 24 });

  return (
    <main>
      <Suspense fallback={null}>
        <HeroComponent />
      </Suspense>

      <USPCards />

      <Divisions />

      <Suspense fallback={<div style={{ minHeight: 400 }} />}>
        <IntegratedModel />
      </Suspense>

      <Industries />

      <CaseStudies />

      <Suspense fallback={<div style={{ minHeight: 500 }} />}>
        <GlobalPresence />
      </Suspense>

      {/* News Section — toggle NEWS_VARIANT to compare */}
      <section className="cream-section eng-grid section-pad">
        <div className="container" ref={newsRef}>
          {NEWS_VARIANT === 'A' ? (
            /* Option A: Text-only news (no image placeholders) */
            <>
              <GsapReveal>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
                  <div>
                    <h2>What's <span className="italic-accent">happening</span></h2>
                  </div>
                  <Link to="/news" className="btn-ghost">All News</Link>
                </div>
              </GsapReveal>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                {NEWS_TEXT.map((article, i) => (
                  <div key={i} className="news-card" style={{ padding: 0 }}>
                    <div className="news-card-body" style={{ padding: '24px 0' }}>
                      <div style={{
                        display: 'inline-block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        color: 'var(--green)',
                        background: 'var(--green-dim)',
                        padding: '4px 10px',
                        borderRadius: 4,
                        marginBottom: 12,
                      }}>
                        {article.date}
                      </div>
                      <h4 style={{ fontSize: 16, lineHeight: 1.4, marginBottom: 8 }}>{article.title}</h4>
                      <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--n500)' }}>{article.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Option B: Recent Deliveries */
            <>
              <GsapReveal>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
                  <div>
                    <h2>Recent <span className="italic-accent">deliveries</span></h2>
                  </div>
                  <Link to="/case-studies" className="btn-ghost">All Projects</Link>
                </div>
              </GsapReveal>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                {RECENT_DELIVERIES.map((d, i) => (
                  <div key={i} className="news-card" style={{ padding: '28px 24px', background: 'var(--white)', border: '1px solid var(--n150)', borderRadius: 'var(--r-xl)' }}>
                    <div style={{
                      display: 'inline-block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--blue)',
                      background: 'rgba(30,74,125,0.06)',
                      padding: '4px 10px',
                      borderRadius: 4,
                      marginBottom: 14,
                    }}>
                      {d.badge}
                    </div>
                    <h4 style={{ fontSize: 16, lineHeight: 1.3, marginBottom: 4 }}>{d.title}</h4>
                    <p style={{ fontSize: 13, color: 'var(--n400)', marginBottom: 16, fontFamily: 'var(--font-mono)', letterSpacing: '0.02em' }}>{d.location}</p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 700, color: 'var(--blue)' }}>{d.stat}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--n400)' }}>{d.statLabel}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section — enhanced */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--blue), #1A3F73)',
          padding: '192px 56px',
        }}
        ref={ctaRef}
      >
        <div className="container cta-inner" style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{ color: 'var(--white)', fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: 1.1, marginBottom: 16 }}>
            Ready to discuss your <span style={{ fontStyle: 'italic' }}>project?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 12, fontSize: 16 }}>
            Whether it's a new build, a corrosion problem, or a plant expansion — let's talk.
          </p>

          {/* Social proof stat */}
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8, marginBottom: 40 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 32, fontWeight: 700, color: 'var(--green)' }}>97%</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em' }}>reorder rate</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24 }}>
            <Link to="/contact" className="btn btn-primary">
              Get in Touch
            </Link>
            <a
              href="/contact"
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: 14,
                textDecoration: 'underline',
                textUnderlineOffset: 3,
                fontFamily: 'var(--font-sans)',
              }}
            >
              Download Brochure
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
