import { Link } from 'react-router-dom';
import { divisions, industries, facilities, certifications, companyStats } from '../data/divisions';
import ScrollReveal from '../components/ScrollReveal';

const pages = {
  'our-story': {
    title: 'Our Story',
    overline: 'About',
    sections: () => (
      <>
        <section className="dark-section eng-grid-dark section-pad" style={{ paddingTop: 120 }}>
          <div className="container" style={{ maxWidth: 900 }}>
            <div className="breadcrumb" style={{ marginBottom: 24 }}>
              <Link to="/">Home</Link><span className="sep">/</span><span style={{ color: 'rgba(255,255,255,0.6)' }}>About</span><span className="sep">/</span><span style={{ color: 'rgba(255,255,255,0.6)' }}>Our Story</span>
            </div>
            <span className="overline overline-with-line">About</span>
            <h1 style={{ marginTop: 16, marginBottom: 20 }}>Four decades of <span className="italic-accent">engineering excellence</span></h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.8 }}>
              Since 1984, Jasmino Corporation has grown from a single engineering office in India to a vertically integrated industrial process equipment company spanning three continents.
            </p>
          </div>
        </section>
        <section className="cream-section eng-grid section-pad">
          <div className="container" style={{ maxWidth: 900 }}>
            <ScrollReveal>
              <h2 style={{ marginBottom: 32 }}>Timeline</h2>
            </ScrollReveal>
            <div style={{ position: 'relative', paddingLeft: 40 }}>
              <div style={{ position: 'absolute', left: 12, top: 0, bottom: 0, width: 2, background: 'linear-gradient(180deg, var(--green), var(--blue))' }} />
              {[
                { year: '1984', event: 'Jasmino Corporation founded in India. Initial focus on engineering design and consulting for the chemical industry.' },
                { year: '1990s', event: 'Expanded into equipment manufacturing with ASME certification. Built first 80,000 m² fabrication facility.' },
                { year: '2000s', event: 'Added corrosion protection division with rubber lining capabilities. Began serving international markets.' },
                { year: '2010s', event: 'Acquired HAW Linings (Germany) and GBT (Turkey). Established rubber products division with custom compounding lab.' },
                { year: '2020s', event: 'Fully integrated four-division model operational. 150+ field technicians across 15+ countries. 97% reorder rate achieved.' }
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div style={{ marginBottom: 40, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: -34, top: 4, width: 12, height: 12, borderRadius: '50%', background: 'var(--green)', border: '3px solid var(--g50)' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, color: 'var(--green)', display: 'block', marginBottom: 4 }}>{item.year}</span>
                    <p style={{ fontSize: 14, color: 'var(--g600)', lineHeight: 1.7 }}>{item.event}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
        <section className="white-section section-pad">
          <div className="container" style={{ maxWidth: 900 }}>
            <ScrollReveal>
              <h2 style={{ marginBottom: 32 }}>Our Values</h2>
            </ScrollReveal>
            <div className="resp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {[
                { title: 'Engineering Integrity', desc: 'We design to codes and standards because our equipment operates in environments where failure is not an option.' },
                { title: 'Vertical Integration', desc: 'Every division feeds into the next. This isn\u2019t a holding company structure \u2014 it\u2019s a single, connected workflow.' },
                { title: 'Global, Local Execution', desc: 'Three continents of capability deployed wherever the project demands. Same standards, same quality system.' }
              ].map((v, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="card corner-brackets" style={{ height: '100%' }}>
                    <h4 style={{ marginBottom: 12, color: 'var(--g800)' }}>{v.title}</h4>
                    <p style={{ fontSize: 13, color: 'var(--g500)', lineHeight: 1.7 }}>{v.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </>
    )
  },
  'jasmino-group': {
    title: 'Jasmino Group',
    overline: 'About',
    sections: () => (
      <>
        <section className="dark-section eng-grid-dark section-pad" style={{ paddingTop: 120 }}>
          <div className="container" style={{ maxWidth: 900 }}>
            <div className="breadcrumb" style={{ marginBottom: 24 }}>
              <Link to="/">Home</Link><span className="sep">/</span><span style={{ color: 'rgba(255,255,255,0.6)' }}>About</span><span className="sep">/</span><span style={{ color: 'rgba(255,255,255,0.6)' }}>Jasmino Group</span>
            </div>
            <span className="overline overline-with-line">About</span>
            <h1 style={{ marginTop: 16, marginBottom: 20 }}>Three continents, one <span className="italic-accent">standard</span></h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.8 }}>
              Jasmino operates through three entities — Jasmino India, HAW Linings (Germany), and GBT (Turkey) — delivering consistent quality across 130,000+ m² of combined capability.
            </p>
          </div>
        </section>
        <section className="cream-section eng-grid section-pad">
          <div className="container" style={{ maxWidth: 600, textAlign: 'center', padding: '80px 24px' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--g100)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1px solid var(--g150)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--g400)' }}>...</span>
            </div>
            <h2 style={{ fontSize: 24, marginBottom: 8, color: 'var(--g800)' }}>Under Construction</h2>
            <p style={{ fontSize: 14, color: 'var(--g500)', lineHeight: 1.7 }}>This page is coming soon. We're working on something great.</p>
          </div>
        </section>
      </>
    )
  },
  'industries': {
    title: 'Industries',
    overline: 'Sectors',
    sections: () => (
      <>
        <section className="dark-section eng-grid-dark section-pad" style={{ paddingTop: 120 }}>
          <div className="container" style={{ maxWidth: 900 }}>
            <div className="breadcrumb" style={{ marginBottom: 24 }}>
              <Link to="/">Home</Link><span className="sep">/</span><span style={{ color: 'rgba(255,255,255,0.6)' }}>Industries</span>
            </div>
            <span className="overline overline-with-line">Industries</span>
            <h1 style={{ marginTop: 16, marginBottom: 20 }}>Built for the <span className="italic-accent">harshest</span> environments</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.8 }}>
              Our equipment operates in some of the most corrosive, high-temperature, and high-pressure environments in industry. We serve these sectors with a complete vertical solution.
            </p>
          </div>
        </section>
        <section className="cream-section eng-grid section-pad">
          <div className="container" style={{ maxWidth: 600, textAlign: 'center', padding: '80px 24px' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--g100)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1px solid var(--g150)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--g400)' }}>...</span>
            </div>
            <h2 style={{ fontSize: 24, marginBottom: 8, color: 'var(--g800)' }}>Under Construction</h2>
            <p style={{ fontSize: 14, color: 'var(--g500)', lineHeight: 1.7 }}>This page is coming soon. We're working on something great.</p>
          </div>
        </section>
      </>
    )
  },
  'news': {
    title: 'News',
    overline: 'Updates',
    sections: () => (
      <>
        <section className="dark-section eng-grid-dark section-pad" style={{ paddingTop: 120 }}>
          <div className="container" style={{ maxWidth: 900 }}>
            <div className="breadcrumb" style={{ marginBottom: 24 }}>
              <Link to="/">Home</Link><span className="sep">/</span><span style={{ color: 'rgba(255,255,255,0.6)' }}>News</span>
            </div>
            <span className="overline overline-with-line">News</span>
            <h1 style={{ marginTop: 16, marginBottom: 20 }}>What's <span className="italic-accent">happening</span></h1>
          </div>
        </section>
        <section className="cream-section eng-grid section-pad">
          <div className="container">
            <div className="resp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {[
                { date: 'Jan 2026', title: 'Jasmino completes 200-tonne reactor for petrochemical plant', excerpt: 'Largest single-piece vessel delivered from our India facility, featuring ASME VIII Div 2 design with Hastelloy C-276 cladding.' },
                { date: 'Dec 2025', title: 'HAW Linings expands European service footprint', excerpt: 'New partnerships in Scandinavia and Eastern Europe bring our rubber lining expertise to 8 additional countries.' },
                { date: 'Nov 2025', title: 'New rubber compound passes 10,000-hour immersion test', excerpt: 'Our R&D lab develops chlorobutyl formulation achieving breakthrough resistance to hot concentrated sulfuric acid.' },
                { date: 'Oct 2025', title: 'GBT Turkey awarded ISO 14001 certification', excerpt: 'Environmental management system now covers all three Jasmino facilities worldwide.' },
                { date: 'Sep 2025', title: 'Engineering team completes 3D modelling of 500,000 TPA fertilizer complex', excerpt: 'Full plant model delivered with zero clash items post-review — a new benchmark for our design team.' },
                { date: 'Aug 2025', title: 'Jasmino at ACHEMA 2025', excerpt: 'Our team presented the integrated vertical model at ACHEMA, generating strong interest from European EPCs.' }
              ].map((article, i) => (
                <ScrollReveal key={i} delay={i * 60}>
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
      </>
    )
  },
  'contact': {
    title: 'Contact',
    overline: 'Get in Touch',
    sections: () => (
      <>
        <section className="dark-section eng-grid-dark section-pad" style={{ paddingTop: 120 }}>
          <div className="container" style={{ maxWidth: 900 }}>
            <div className="breadcrumb" style={{ marginBottom: 24 }}>
              <Link to="/">Home</Link><span className="sep">/</span><span style={{ color: 'rgba(255,255,255,0.6)' }}>Contact</span>
            </div>
            <span className="overline overline-with-line">Contact</span>
            <h1 style={{ marginTop: 16, marginBottom: 20 }}>Ready to discuss your <span className="italic-accent">project?</span></h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.8 }}>
              Whether it's a new build, a corrosion problem, or a plant expansion — our team is ready to help.
            </p>
          </div>
        </section>
        <section className="cream-section eng-grid section-pad">
          <div className="container" style={{ maxWidth: 1000 }}>
            <div className="resp-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
              <ScrollReveal>
                <div>
                  <h2 style={{ marginBottom: 24 }}>Send us a message</h2>
                  <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <input type="text" placeholder="Full Name" style={inputStyle} />
                      <input type="email" placeholder="Email Address" style={inputStyle} />
                    </div>
                    <input type="text" placeholder="Company" style={inputStyle} />
                    <select style={inputStyle}>
                      <option value="">Select Service Area</option>
                      {divisions.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                    <textarea placeholder="Tell us about your project" rows={5} style={{ ...inputStyle, resize: 'vertical' }} />
                    <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Send Message</button>
                  </form>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div>
                  <h2 style={{ marginBottom: 24 }}>Contact details</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <div>
                      <h4 style={{ marginBottom: 4, color: 'var(--g800)' }}>Email</h4>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--blue)' }}>info@jasmino.com</p>
                    </div>
                    <div>
                      <h4 style={{ marginBottom: 4, color: 'var(--g800)' }}>Phone</h4>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--blue)' }}>+91 22 6789 0000</p>
                    </div>
                    <div style={{ borderTop: '1px solid var(--g150)', paddingTop: 24 }}>
                      <h4 style={{ marginBottom: 16, color: 'var(--g800)' }}>Global Offices</h4>
                      {facilities.map(f => (
                        <div key={f.name} style={{ marginBottom: 16 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                            <span>{f.flag}</span>
                            <span style={{ fontWeight: 600, fontSize: 14 }}>{f.name}</span>
                          </div>
                          <p style={{ fontSize: 12, color: 'var(--g500)', fontFamily: 'var(--font-mono)' }}>{f.area} · {f.country}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </>
    )
  }
};

const inputStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: 14,
  padding: '12px 16px',
  border: '1px solid var(--g200)',
  borderRadius: 'var(--r)',
  background: 'var(--white)',
  color: 'var(--g900)',
  outline: 'none',
  transition: 'border-color 0.2s',
  width: '100%'
};

export default function InnerPage({ page }) {
  const config = pages[page];
  if (!config) return <div style={{ paddingTop: 120, textAlign: 'center' }}><h2>Page not found</h2></div>;
  return <main>{config.sections()}</main>;
}
