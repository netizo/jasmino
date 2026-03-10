import { useState } from 'react';
import { Link } from 'react-router-dom';
import GsapReveal from '../components/GsapReveal';
import { useStagger } from '../hooks/useGsap';
import '../styles/contact-page.css';

const SUBJECTS = [
  'General Enquiry',
  'Engineering Design',
  'Equipment Manufacturing',
  'Corrosion Protection',
  'Rubber Products',
  'Careers',
];

const FACILITIES = [
  {
    flag: '🇮🇳',
    country: 'India',
    name: 'Jasmino Corporation',
    address: 'Plot 42, MIDC Industrial Area, Taloja, Navi Mumbai 410 208, India',
    phone: '+91 22 6789 0000',
    email: 'india@jasmino.com',
  },
  {
    flag: '🇩🇪',
    country: 'Germany',
    name: 'HAW Linings GmbH',
    address: 'Industriestraße 15, 45478 Mülheim an der Ruhr, Germany',
    phone: '+49 208 305 2100',
    email: 'germany@jasmino.com',
  },
  {
    flag: '🇩🇪',
    country: 'Germany',
    name: 'GBT (Marl)',
    address: 'Marl, Germany',
    phone: '+49 2365 123 456',
    email: 'gbt@jasmino.com',
  },
];

export default function ContactPage() {
  const facRef = useStagger('.cp-fac-card', { stagger: 0.1, y: 24 });

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="cp">
      {/* S0 — Hero */}
      <section className="cp-hero">
        <div className="cp-hero-grid" />
        <div className="cp-hero-inner">
          <nav className="cp-crumb">
            <Link to="/">Home</Link>
            <span className="cp-sep">/</span>
            <span className="cp-cur">Contact</span>
          </nav>
          <h1 className="cp-hero-h">
            Let&rsquo;s discuss your <em>project</em>
          </h1>
          <p className="cp-hero-desc">
            Share your requirements. Our engineering team will respond within 24 hours with a scope assessment.
          </p>
        </div>
      </section>

      {/* S1 — Form + Facilities */}
      <section className="cp-body">
        <div className="cp-body-inner">
          <GsapReveal className="cp-form-col">
            <h2 className="cp-form-h">Send us a message</h2>
            <form className="cp-form" onSubmit={handleSubmit} noValidate>
              <div className="cp-row">
                <label className="cp-field">
                  <span className="cp-label">Full Name *</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="cp-input"
                  />
                </label>
                <label className="cp-field">
                  <span className="cp-label">Email *</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@company.com"
                    className="cp-input"
                  />
                </label>
              </div>
              <div className="cp-row">
                <label className="cp-field">
                  <span className="cp-label">Company</span>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Company name"
                    className="cp-input"
                  />
                </label>
                <label className="cp-field">
                  <span className="cp-label">Phone</span>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 000 000 0000"
                    className="cp-input"
                  />
                </label>
              </div>
              <label className="cp-field">
                <span className="cp-label">Subject *</span>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="cp-input cp-select"
                >
                  <option value="">Select a subject…</option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label className="cp-field">
                <span className="cp-label">Message *</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us about your project requirements…"
                  rows={6}
                  className="cp-input cp-textarea"
                />
              </label>
              <button type="submit" className="btn btn-primary cp-submit">
                Send Message
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </GsapReveal>

          <div className="cp-fac-col">
            <h2 className="cp-fac-h">Our Facilities</h2>
            <div className="cp-fac-stack" ref={facRef}>
              {FACILITIES.map((f) => (
                <div key={f.country} className="cp-fac-card">
                  <div className="cp-fac-flag">{f.flag}</div>
                  <div className="cp-fac-name">{f.name}</div>
                  <div className="cp-fac-country">{f.country}</div>
                  <address className="cp-fac-addr">{f.address}</address>
                  <div className="cp-fac-meta">{f.phone}</div>
                  <div className="cp-fac-meta">{f.email}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* S2 — Map Placeholder */}
      <section className="cp-map">
        <div className="cp-map-placeholder">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>Interactive map — 3 global facilities</span>
        </div>
      </section>

      {/* S3 — CTA */}
      <section className="cp-cta">
        <GsapReveal>
          <div className="cp-cta-inner">
            <h2 className="cp-cta-h">Prefer to talk <em>directly?</em></h2>
            <p className="cp-cta-desc">Call our main office or email info@jasmino.com for immediate assistance.</p>
            <div className="cp-cta-btns">
              <a className="btn btn-primary" href="tel:+912267890000">
                Call Now
              </a>
              <a className="btn cp-btn-outline" href="mailto:info@jasmino.com">
                Email Us
              </a>
            </div>
          </div>
        </GsapReveal>
      </section>
    </div>
  );
}
