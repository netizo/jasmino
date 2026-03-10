import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { caseStudies, getCaseStudyById } from '../data/caseStudies';
import CountUp from '../components/CountUp';
import GsapReveal from '../components/GsapReveal';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, useStagger } from '../hooks/useGsap';
import '../styles/case-studies-page.css';

export default function CaseStudyDetail() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const cs = getCaseStudyById(caseId);

  const resultsRef = useRef(null);
  const [resultsVis, setResultsVis] = useState(false);
  const galleryRef = useRef(null);
  const approachRef = useStagger('.csd-step', { stagger: 0.1, y: 24 });

  /* ── GSAP results visibility trigger ── */
  useGSAP(() => {
    const el = resultsRef.current;
    if (!el) return;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => setResultsVis(true),
    });
  }, { scope: resultsRef, dependencies: [caseId] });

  useEffect(() => {
    setResultsVis(false);
  }, [caseId]);

  if (!cs) {
    return (
      <div className="csd-404">
        <h2>Case study not found</h2>
        <Link to="/case-studies" className="btn btn-primary">Back to Case Studies</Link>
      </div>
    );
  }

  const d = cs.detail;
  const currentIdx = caseStudies.findIndex((c) => c.id === caseId);
  const prevCs = caseStudies[(currentIdx - 1 + caseStudies.length) % caseStudies.length];
  const nextCs = caseStudies[(currentIdx + 1) % caseStudies.length];

  return (
    <div className="csd">
      {/* Hero */}
      <section className="csd-hero">
        <div
          className="csd-hero-bg"
          style={{ backgroundImage: `url(${d.heroImage})` }}
        />
        <div className="csd-hero-overlay" />
        <div className="csd-hero-grid" />
        <div className="csd-hero-inner">
          <nav className="csd-crumb">
            <Link to="/">Home</Link>
            <span className="csd-sep">/</span>
            <Link to="/case-studies">Case Studies</Link>
            <span className="csd-sep">/</span>
            <span className="csd-cur">{cs.title}</span>
          </nav>
          <span className="csd-badge">{cs.badge}</span>
          <h1 className="csd-hero-h">{cs.title}</h1>
          <p className="csd-hero-loc">{cs.location}</p>
          <div className="csd-hero-meta">
            <div className="csd-meta-item">
              <span className="csd-meta-label">Client</span>
              <span className="csd-meta-val">{d.client}</span>
            </div>
            <div className="csd-meta-item">
              <span className="csd-meta-label">Year</span>
              <span className="csd-meta-val">{d.year}</span>
            </div>
            <div className="csd-meta-item">
              <span className="csd-meta-label">Industry</span>
              <span className="csd-meta-val">{cs.industry}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Divisions Involved */}
      <section className="csd-divisions">
        <div className="csd-divisions-inner">
          <span className="csd-divisions-label">Divisions Involved</span>
          <div className="csd-divisions-list">
            {d.divisions.map((div) => (
              <span key={div} className="csd-div-tag">{div}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="csd-narrative">
        <div className="csd-narrative-inner">
          <GsapReveal>
            <div className="csd-block">
              <div className="csd-block-label">The Challenge</div>
              <p className="csd-block-text">{d.challenge}</p>
            </div>
          </GsapReveal>
          <GsapReveal delay={0.15}>
            <div className="csd-block">
              <div className="csd-block-label">Our Solution</div>
              <p className="csd-block-text">{d.solution}</p>
            </div>
          </GsapReveal>
        </div>
      </section>

      {/* Approach */}
      <section className="csd-approach">
        <div className="csd-approach-inner">
          <div className="csd-approach-header">
            <div className="csd-overline">Methodology</div>
            <h2 className="csd-sec-h">Our <em>approach</em></h2>
          </div>
          <div className="csd-approach-grid" ref={approachRef}>
            {d.approach.map((step, i) => (
              <div key={i} className="csd-step">
                <div className="csd-step-num">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="csd-step-heading">{step.heading}</h3>
                <p className="csd-step-text">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="csd-results" ref={resultsRef}>
        <div className="csd-results-grid-bg" />
        <div className="csd-results-inner">
          <div className="csd-overline csd-overline-light">Outcomes</div>
          <h2 className="csd-results-h">Project <em>results</em></h2>
          <div className="csd-results-row">
            {d.results.map((r, i) => (
              <div
                key={i}
                className={`csd-result${resultsVis ? ' vis' : ''}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="csd-result-num">
                  {resultsVis ? <CountUp target={r.num} /> : '0'}
                </span>
                <span className="csd-result-label">{r.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {d.testimonial && (
        <section className="csd-testimonial">
          <div className="csd-testimonial-inner">
            <svg className="csd-quote-icon" viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.689 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.206 0-2.347-.549-2.917-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.689 21 13.166 21 15c0 1.933-1.567 3.5-3.5 3.5-1.206 0-2.347-.549-2.917-1.179z" />
            </svg>
            <blockquote className="csd-quote">{d.testimonial.quote}</blockquote>
            <div className="csd-quote-author">{d.testimonial.author}</div>
            <div className="csd-quote-company">{d.testimonial.company}</div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {d.gallery && d.gallery.length > 0 && (
        <section className="csd-gallery">
          <div className="csd-gallery-inner">
            <div className="csd-overline">Project Gallery</div>
            <div className="csd-gallery-track" ref={galleryRef}>
              {d.gallery.map((g, i) => (
                <figure key={i} className="csd-gallery-slide">
                  <img src={g.img} alt={g.caption} loading="lazy" />
                  <figcaption className="csd-gallery-caption">{g.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prev / Next Nav */}
      <section className="csd-nav">
        <Link to={`/case-studies/${prevCs.id}`} className="csd-nav-link csd-nav-prev">
          <span className="csd-nav-dir">&larr; Previous</span>
          <span className="csd-nav-title">{prevCs.title}</span>
        </Link>
        <Link to={`/case-studies/${nextCs.id}`} className="csd-nav-link csd-nav-next">
          <span className="csd-nav-dir">Next &rarr;</span>
          <span className="csd-nav-title">{nextCs.title}</span>
        </Link>
      </section>

      {/* CTA */}
      <section className="csd-cta">
        <GsapReveal>
          <div className="csd-cta-inner">
            <h2 className="csd-cta-h">Have a similar <em>challenge?</em></h2>
            <p className="csd-cta-desc">Let our engineering team assess your requirements.</p>
            <div className="csd-cta-btns">
              <Link className="btn btn-primary" to="/contact">Start a Conversation</Link>
              <Link className="btn csd-btn-outline" to="/case-studies">View All Projects</Link>
            </div>
          </div>
        </GsapReveal>
      </section>
    </div>
  );
}
