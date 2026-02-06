import { useParams, Link } from 'react-router-dom';
import { divisions } from '../data/divisions';
import { services } from '../data/services';
import ScrollReveal from '../components/ScrollReveal';

export default function DivisionLanding() {
  const { divisionSlug } = useParams();
  const division = divisions.find(d => d.slug === divisionSlug);

  if (!division) {
    return (
      <main style={{ paddingTop: 72 }}>
        <section className="section-pad" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>
            <h2>Division not found</h2>
            <Link to="/what-we-do" className="btn btn-primary" style={{ marginTop: 24 }}>Back to What We Do</Link>
          </div>
        </section>
      </main>
    );
  }

  const divServices = services[divisionSlug] || {};
  const serviceEntries = Object.entries(divServices);

  return (
    <main style={{ paddingTop: 72 }}>
      <div style={{ padding: '0 56px', paddingTop: 16 }}>
        <div className="container">
          <div className="sibling-nav">
            {divisions.map(d => (
              <Link key={d.id} to={`/what-we-do/${d.slug}`} className={d.slug === divisionSlug ? 'active' : ''}>
                {d.shortName}
              </Link>
            ))}
          </div>
        </div>
      </div>

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
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 32 }}>
                {division.description}
              </p>
              <div style={{ display: 'flex', gap: 32 }}>
                {division.stats.map(s => (
                  <div key={s.label}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 600, color: 'var(--green)' }}>{s.num}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g400)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                width: 280,
                height: 280,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 100,
                  fontWeight: 700,
                  color: 'rgba(4,229,134,0.08)',
                  userSelect: 'none'
                }}>{division.num}</div>
                <div style={{
                  position: 'absolute',
                  width: 240,
                  height: 240,
                  borderRadius: '50%',
                  border: '1px dashed rgba(255,255,255,0.05)'
                }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cream-section eng-grid section-pad">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <span className="overline overline-with-line" style={{ justifyContent: 'center' }}>Service Relationship</span>
              <h2 style={{ marginTop: 12 }}>How our services <span className="italic-accent">connect</span></h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="process-flow-wrap" style={{ marginBottom: 56 }}>
              {serviceEntries.map(([slug, svc], i) => (
                <div key={slug} style={{ display: 'contents' }}>
                  <Link to={`/what-we-do/${divisionSlug}/${slug}`} className="process-step" style={{ textDecoration: 'none' }}>
                    <div className="step-circle" style={{ borderColor: 'var(--g200)', background: 'var(--white)' }}>
                      <span className="step-num" style={{ fontSize: 14 }}>{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <span className="step-name" style={{ color: 'var(--g800)', fontSize: 12, textAlign: 'center' }}>{svc.name}</span>
                  </Link>
                  {i < serviceEntries.length - 1 && (
                    <div className="process-connector" style={{ marginTop: -30, background: 'linear-gradient(90deg, var(--g200), var(--blue))' }}>
                      <span style={{ position: 'absolute', right: -4, top: -3, width: 0, height: 0, borderLeft: '6px solid var(--blue)', borderTop: '4px solid transparent', borderBottom: '4px solid transparent' }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>
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
                    <h3 style={{ fontSize: 22, marginTop: 8, marginBottom: 8, color: 'var(--g900)' }}>{svc.name}</h3>
                    <p style={{ fontSize: 14, color: 'var(--g500)', lineHeight: 1.7, marginBottom: 16 }}>{svc.tagline}</p>
                    <ul style={{ fontSize: 13, color: 'var(--g600)', lineHeight: 1.8, paddingLeft: 16, marginBottom: 16 }}>
                      {svc.capabilities.scope.slice(0, 3).map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                    <span className="btn-ghost" style={{ fontSize: 12 }}>View Details</span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-section eng-grid-dark section-pad">
        <div className="container">
          <ScrollReveal>
            <div className="resp-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
              <div>
                <span className="overline overline-with-line">Proof Point</span>
                <h2 style={{ marginTop: 12, marginBottom: 16 }}>{division.proof.stat}</h2>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                  {division.proof.detail}
                </p>
              </div>
              <div className="glass-card" style={{ textAlign: 'center', padding: 48 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 56, fontWeight: 700, color: 'var(--green)', lineHeight: 1, marginBottom: 12 }}>
                  {division.proof.stat.split(' ')[0]}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {division.proof.stat.split(' ').slice(1).join(' ')}
                </div>
              </div>
            </div>
          </ScrollReveal>
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
