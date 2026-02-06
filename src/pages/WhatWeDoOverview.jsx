import { Link } from 'react-router-dom';
import { divisions, certifications, companyStats } from '../data/divisions';
import ScrollReveal from '../components/ScrollReveal';

export default function WhatWeDoOverview() {
  return (
    <main style={{ paddingTop: 72 }}>
      <section className="dark-section eng-grid-dark section-pad" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container resp-hero" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <span className="overline overline-with-line">What We Do</span>
            <h1 style={{ marginTop: 16, marginBottom: 16 }}>
              Design. Build. <span className="italic-accent">Protect.</span>
            </h1>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', maxWidth: 480, lineHeight: 1.7 }}>
              The only company that designs, manufactures, and protects industrial process equipment under one roof. Four divisions working as one integrated system.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {divisions.map((div) => (
              <Link key={div.id} to={`/what-we-do/${div.slug}`} className="glass-card" style={{ padding: 24, textDecoration: 'none', transition: 'all 0.3s var(--ease)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 600, color: 'var(--green)', display: 'block', marginBottom: 8 }}>{div.num}</span>
                <h4 style={{ color: 'var(--white)', fontSize: 14, marginBottom: 4 }}>{div.shortName}</h4>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}>{div.services.length} services</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="white-section section-pad" style={{ padding: '24px 56px', borderBottom: '1px solid var(--g150)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
          {certifications.map(cert => (
            <span key={cert} className="trust-badge">{cert}</span>
          ))}
          <div style={{ width: 1, height: 24, background: 'var(--g200)', margin: '0 4px' }} />
          {companyStats.map(s => (
            <div key={s.label} style={{ textAlign: 'center', padding: '0 8px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600, color: 'var(--blue)' }}>{s.num}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--g400)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="dark-section eng-grid-dark section-pad">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span className="overline overline-with-line" style={{ justifyContent: 'center' }}>Integrated Model</span>
              <h2 style={{ marginTop: 12 }}>How it all <span className="italic-accent">connects</span></h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 600, margin: '16px auto 0', fontSize: 14 }}>
                Each division feeds into the next. Your project flows through design, fabrication, protection, and inspection — all under one roof, one team, one quality system.
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
        </div>
      </section>

      <section className="cream-section eng-grid section-pad">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {divisions.map((div, i) => (
              <ScrollReveal key={div.id} delay={i * 80}>
                <div className={`division-card ${i % 2 !== 0 ? 'reverse' : ''} corner-brackets`}>
                  <div className="division-card-visual">
                    <div className="bg-number">{div.num}</div>
                    <div style={{ padding: 40, textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 48, fontWeight: 700, color: 'rgba(4,229,134,0.15)' }}>{div.num}</div>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 24, color: 'var(--white)', marginTop: 12 }}>{div.name}</div>
                    </div>
                  </div>
                  <div className="division-card-content">
                    <span className="division-num">Division {div.num}</span>
                    <h3>{div.name}</h3>
                    <p>{div.description}</p>
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

      <section className="dark-section section-pad">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <span className="overline overline-with-line" style={{ justifyContent: 'center' }}>Cross-Cutting</span>
              <h2 style={{ marginTop: 12 }}>What sets us <span className="italic-accent">apart</span></h2>
            </div>
          </ScrollReveal>
          <div className="resp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { title: 'Global On-Site Service', desc: '150+ trained technicians deployed across 15+ countries for field application, inspection, and emergency repair.' },
              { title: 'HAW + GBT Integration', desc: 'European lining expertise from HAW (Germany) and GBT (Turkey) integrated into every corrosion protection project.' },
              { title: 'Quality Infrastructure', desc: 'ASME, API, PED, ISO certified facilities with in-house NDE, PWHT, and testing capabilities.' }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="glass-card">
                  <h4 style={{ color: 'var(--white)', marginBottom: 12 }}>{item.title}</h4>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{item.desc}</p>
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
          </div>
        </div>
      </section>
    </main>
  );
}
