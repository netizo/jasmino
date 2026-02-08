import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { divisions } from '../data/divisions';
import { services } from '../data/services';
import { t2Data } from '../data/t2Data';
import ScrollReveal from '../components/ScrollReveal';
import '../styles/divisions.css';
import '../styles/DivisionT2.css';

// T2 Components
import T2SubNav from '../components/T2/SubNav';
import T2Hero from '../components/T2/Hero';
import T2Advantage from '../components/T2/Advantage';
import T2Gallery from '../components/T2/Gallery';
import T2ServiceGrid from '../components/T2/ServiceGrid';
import T2Capabilities from '../components/T2/Capabilities';
import T2Flow from '../components/T2/Flow';
import T2CTA from '../components/T2/CTA';
import GrainEffect from '../components/GrainEffect';

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
        <button onClick={() => navigate('/what-we-do')} style={{
          padding: '10px 20px', fontSize: '16px', cursor: 'pointer',
          backgroundColor: 'var(--green)', border: 'none', borderRadius: '4px'
        }}>Back to What We Do</button>
      </div>
    );
  }

  // If we have T2 data, render the high-fidelity version
  if (t2) {
    return (
      <div className="division-landing-t2">
        <GrainEffect />
        <T2SubNav />
        <T2Hero data={t2} />
        <T2Advantage data={t2} />
        <T2Gallery data={t2} />
        <T2ServiceGrid data={t2} />
        <T2Capabilities data={t2} />
        <T2Flow data={t2} />
        <T2CTA data={t2} />
      </div>
    );
  }

  const divServices = services[divisionSlug] || {};
  const serviceEntries = Object.entries(divServices);

  // Fallback to basic version
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
              <div style={{ display: 'flex', gap: 32 }}>
                {division.stats.map(s => (
                  <div key={s.label}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 600, color: 'var(--green)' }}>{s.num}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                width: 280, height: 280, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 100, fontWeight: 700, color: 'rgba(4,229,134,0.08)', userSelect: 'none' }}>{division.num}</div>
                <div style={{ position: 'absolute', width: 240, height: 240, borderRadius: '50%', border: '1px dashed rgba(255,255,255,0.05)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="white-section section-pad">
        <div className="container">
          <ScrollReveal>
            <div style={{ marginBottom: 40 }}>
              <span className="overline overline-with-line">Services</span>
              <h2 style={{ marginTop: 12 }}>Our {division.shortName.toLowerCase()} capabilities</h2>
            </div>
          </ScrollReveal>
          <div className="resp-grid-2" style={{ display: 'grid', gridTemplateColumns: serviceEntries.length > 2 ? 'repeat(2, 1fr)' : '1fr 1fr', gap: 24 }}>
            {serviceEntries.map(([slug, svc], i) => (
              <ScrollReveal key={slug} delay={i * 100}>
                <Link to={`/what-we-do/${divisionSlug}/${slug}`} style={{ textDecoration: 'none' }}>
                  <div className="card corner-brackets" style={{ height: '100%' }}>
                    <div style={{ height: 6, background: `linear-gradient(90deg, var(--dark), var(--navy))`, borderRadius: '3px 3px 0 0', marginBottom: 20, marginTop: -32, marginLeft: -32, marginRight: -32 }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--green)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {division.num}.{String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 style={{ fontSize: 22, marginTop: 8, marginBottom: 8, color: 'var(--gray-900)' }}>{svc.name}</h3>
                    <p style={{ fontSize: 14, color: 'var(--gray-500)', lineHeight: 1.7, marginBottom: 16 }}>{svc.tagline}</p>
                    <span className="btn-ghost" style={{ fontSize: 12 }}>View Details</span>
                  </div>
                </Link>
              </ScrollReveal>
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
