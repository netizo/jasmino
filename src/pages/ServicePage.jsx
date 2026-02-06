import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { divisions } from '../data/divisions';
import { getServiceBySlug, getSiblingServices } from '../data/services';
import ScrollReveal from '../components/ScrollReveal';

export default function ServicePage() {
  const { divisionSlug, serviceSlug } = useParams();
  const service = getServiceBySlug(divisionSlug, serviceSlug);
  const division = divisions.find(d => d.slug === divisionSlug);
  const siblings = getSiblingServices(divisionSlug);
  const [activeTab, setActiveTab] = useState('scope');
  const [stickyVisible, setStickyVisible] = useState(false);
  const headerRef = useRef();

  useEffect(() => {
    const onScroll = () => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        setStickyVisible(rect.bottom < 0);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setActiveTab('scope');
    window.scrollTo(0, 0);
  }, [serviceSlug, divisionSlug]);

  if (!service || !division) {
    return (
      <main style={{ paddingTop: 72 }}>
        <section className="section-pad" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>
            <h2>Service not found</h2>
            <Link to="/what-we-do" className="btn btn-primary" style={{ marginTop: 24 }}>Back to What We Do</Link>
          </div>
        </section>
      </main>
    );
  }

  const integrationServices = (service.integrations || []).map(slug => {
    for (const div of divisions) {
      const svc = div.services.find(s => s.slug === slug);
      if (svc) return { ...svc, divisionSlug: div.slug, divisionName: div.shortName };
    }
    return null;
  }).filter(Boolean);

  const tabContent = {
    scope: service.capabilities.scope,
    tools: service.capabilities.tools,
    deliverables: service.capabilities.deliverables
  };

  return (
    <main style={{ paddingTop: 72, paddingBottom: stickyVisible ? 60 : 0 }}>
      <div style={{ padding: '0 56px', paddingTop: 16 }}>
        <div className="container">
          <div className="sibling-nav" style={{ marginBottom: 0 }}>
            {siblings.map(s => (
              <Link key={s.slug} to={`/what-we-do/${divisionSlug}/${s.slug}`} className={s.slug === serviceSlug ? 'active' : ''}>
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <section className="white-section section-pad" style={{ paddingTop: 32, paddingBottom: 40 }} ref={headerRef}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="breadcrumb" style={{ marginBottom: 16 }}>
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <Link to="/what-we-do">What We Do</Link>
            <span className="sep">/</span>
            <Link to={`/what-we-do/${divisionSlug}`}>{division.shortName}</Link>
            <span className="sep">/</span>
            <span>{service.name}</span>
          </div>
          <span className="overline" style={{ marginBottom: 8, display: 'block' }}>Division {division.num} · {division.name}</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--g900)', marginBottom: 8 }}>{service.name}</h1>
          <p style={{ fontSize: 16, color: 'var(--g500)', maxWidth: 700 }}>{service.tagline}</p>
        </div>
      </section>

      <section className="cream-section eng-grid section-pad" style={{ paddingTop: 48 }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <ScrollReveal>
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 28, marginBottom: 16 }}>Overview</h2>
              <p style={{ fontSize: 15, color: 'var(--g600)', lineHeight: 1.8 }}>{service.intro}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="white-section section-pad">
        <div className="container" style={{ maxWidth: 900 }}>
          <ScrollReveal>
            <h2 style={{ fontSize: 28, marginBottom: 24 }}>Capabilities</h2>
            <div className="tabs">
              <button className={`tab ${activeTab === 'scope' ? 'active' : ''}`} onClick={() => setActiveTab('scope')}>Scope of Work</button>
              <button className={`tab ${activeTab === 'tools' ? 'active' : ''}`} onClick={() => setActiveTab('tools')}>Software & Tools</button>
              <button className={`tab ${activeTab === 'deliverables' ? 'active' : ''}`} onClick={() => setActiveTab('deliverables')}>Deliverables</button>
            </div>
            <ul style={{ paddingLeft: 20, color: 'var(--g700)', lineHeight: 2, fontSize: 14 }}>
              {tabContent[activeTab].map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {service.hasSpecs && service.specs && (
        <section className="cream-section eng-grid section-pad">
          <div className="container" style={{ maxWidth: 900 }}>
            <ScrollReveal>
              <h2 style={{ fontSize: 28, marginBottom: 24 }}>Technical Specifications</h2>
              <div style={{ overflowX: 'auto' }}>
                <table className="specs-table">
                  <thead>
                    <tr>
                      <th>Parameter</th>
                      <th>Value</th>
                      <th>Code / Standard</th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.specs.map((spec, i) => (
                      <tr key={i}>
                        <td>{spec.parameter}</td>
                        <td className="mono-val" style={{ fontWeight: 600, color: 'var(--blue)' }}>{spec.value}</td>
                        <td className="mono-val">{spec.code}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {service.hasMaterials && service.materials && (
        <section className={`${service.hasSpecs ? 'white-section' : 'cream-section eng-grid'} section-pad`}>
          <div className="container" style={{ maxWidth: 900 }}>
            <ScrollReveal>
              <h2 style={{ fontSize: 28, marginBottom: 24 }}>Materials</h2>
              <div style={{ overflowX: 'auto' }}>
                <table className="specs-table">
                  <thead>
                    <tr>
                      <th>Material Type</th>
                      <th>Temperature Range</th>
                      <th>Chemical Resistance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.materials.map((mat, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 500 }}>{mat.type}</td>
                        <td className="mono-val">{mat.tempRange}</td>
                        <td>{mat.resistance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {integrationServices.length > 0 && (
        <section className="dark-section section-pad" style={{ padding: '32px 56px' }}>
          <div className="container" style={{ maxWidth: 900 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--g400)', letterSpacing: '0.06em' }}>
                This service connects to →
              </span>
              {integrationServices.map(is => (
                <Link
                  key={is.slug}
                  to={`/what-we-do/${is.divisionSlug}/${is.slug}`}
                  className="pill"
                  style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.1)' }}
                >
                  {is.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ background: 'linear-gradient(135deg, var(--blue), #1A3F73)', padding: '64px 56px' }}>
        <div className="container resp-cta" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center' }}>
          <div>
            <h2 style={{ color: 'var(--white)', fontSize: 28 }}>Need {service.name.toLowerCase()} <span style={{ fontStyle: 'italic' }}>expertise?</span></h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: 8, fontSize: 14 }}>
              Our team is ready to discuss your specific requirements.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link to="/contact" className="btn btn-primary">Request Quote</Link>
            <a href="#" className="btn btn-secondary" style={{ color: 'var(--white)', borderColor: 'rgba(255,255,255,0.2)' }}>Download Spec Sheet</a>
          </div>
        </div>
      </section>

      <div className={`sticky-cta-bar ${stickyVisible ? 'visible' : ''}`}>
        <span className="service-name">{service.name}</span>
        <div className="cta-actions">
          <span className="contact-info">+91 22 6789 0000 · info@jasmino.com</span>
          <Link to="/contact" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '11px' }}>Request Quote</Link>
        </div>
      </div>
    </main>
  );
}
