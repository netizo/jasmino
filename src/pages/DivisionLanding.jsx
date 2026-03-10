import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { divisions } from '../data/divisions';
import { services } from '../data/services';
import { t2Data } from '../data/t2Data';
import GsapReveal from '../components/GsapReveal';
import '../styles/divisions.css';
import '../styles/DivisionT2.css';

import T2SubNav from '../components/T2/SubNav';
import T2Hero from '../components/T2/Hero';
import T2Overview from '../components/T2/Overview';
import T2ServiceGrid from '../components/T2/ServiceGrid';
import T2StatsStrip from '../components/T2/StatsStrip';
import T2Gallery from '../components/T2/Gallery';
import T2CTA from '../components/T2/CTA';

export default function DivisionLanding() {
  const { divisionSlug } = useParams();
  const navigate = useNavigate();

  const division = divisions.find(d => d.slug === divisionSlug);
  const t2 = t2Data[divisionSlug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [divisionSlug]);

  if (!division) {
    return (
      <div style={{ paddingTop: 120, textAlign: 'center' }}>
        <h2>Division not found</h2>
        <button onClick={() => navigate('/what-we-do')} aria-label="Back to What We Do" style={{
          padding: '10px 20px', fontSize: '16px', cursor: 'pointer',
          backgroundColor: 'var(--green)', border: 'none', borderRadius: '4px'
        }}>Back to What We Do</button>
      </div>
    );
  }

  if (t2) {
    return (
      <div className="division-landing-t2">
        <T2SubNav />
        {/* S0 — Hero */}
        <T2Hero data={t2} divisionSlug={divisionSlug} />
        {/* S1 — Overview */}
        <T2Overview data={t2} />
        {/* S2 — Services Grid */}
        <T2ServiceGrid data={t2} />
        {/* S3 — Stats Strip */}
        <T2StatsStrip data={t2} />
        {/* S4 — Gallery */}
        <T2Gallery data={t2} />
        {/* S5 — CTA */}
        <T2CTA data={t2} />
      </div>
    );
  }

  const divServices = services[divisionSlug] || {};
  const serviceEntries = Object.entries(divServices);

  return (
    <main style={{ paddingTop: 72 }}>
      <section className="dark-section eng-grid-dark section-pad" style={{ paddingTop: 48 }}>
        <div className="container">
          <div className="breadcrumb" style={{ marginBottom: 24 }}>
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <Link to="/what-we-do">What We Do</Link>
            <span className="sep">/</span>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>{division.name}</span>
          </div>
          <div className="resp-hero" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <span className="overline overline-with-line">Division {division.num}</span>
              <h1 style={{ marginTop: 16, marginBottom: 16 }}>{division.name}</h1>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 24 }}>
                {division.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="white-section section-pad">
        <div className="container">
          <GsapReveal>
            <div style={{ marginBottom: 40 }}>
              <span className="overline overline-with-line">Services</span>
              <h2 style={{ marginTop: 12 }}>Our {division.shortName.toLowerCase()} capabilities</h2>
            </div>
          </GsapReveal>
          <div className="resp-grid-2" style={{ display: 'grid', gridTemplateColumns: serviceEntries.length > 2 ? 'repeat(2, 1fr)' : '1fr 1fr', gap: 24 }}>
            {serviceEntries.map(([slug, svc], i) => (
              <GsapReveal key={slug} delay={i * 0.1}>
                <Link to={`/what-we-do/${divisionSlug}/${slug}`} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ height: '100%' }}>
                    <h3 style={{ fontSize: 22, marginTop: 8, marginBottom: 8, color: 'var(--n800)' }}>{svc.name}</h3>
                    <p style={{ fontSize: 14, color: 'var(--n500)', lineHeight: 1.7, marginBottom: 16 }}>{svc.tagline}</p>
                    <span className="btn-ghost" style={{ fontSize: 12 }}>View Details</span>
                  </div>
                </Link>
              </GsapReveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg, var(--blue), #1A3F73)', padding: '64px 56px' }}>
        <div className="container resp-cta" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center' }}>
          <div>
            <h2 style={{ color: 'var(--white)' }}>Need {division.shortName.toLowerCase()} <span style={{ fontStyle: 'italic' }}>expertise?</span></h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: 12, fontSize: 15 }}>
              Talk to our {division.shortName.toLowerCase()} team about your project requirements.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link to="/contact" className="btn btn-primary">Discuss a Project</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
