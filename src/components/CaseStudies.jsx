import React from 'react';
import { Link } from 'react-router-dom';
import { caseStudies } from '../data/caseStudies';
import { useStagger } from '../hooks/useGsap';
import '../styles/case-studies.css';

// Show only the first 3 case studies on the homepage
const FEATURED = caseStudies.slice(0, 3);

export default function CaseStudies() {
  const gridRef = useStagger('.case-study-card', { stagger: 0.12, y: 32 });

  return (
    <section className="case-studies cream-section eng-grid section-pad">
      <div className="container" ref={gridRef}>
        <div className="case-studies-head">
          <div className="case-studies-head-l">
            <div className="case-studies-over">Featured Projects</div>
            <h2 className="case-studies-h2">Proven at <em>scale</em></h2>
          </div>
          <Link className="case-studies-link" to="/case-studies">
            View All Case Studies →
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="case-studies-grid case-studies-grid-3">
          {FEATURED.map((study, i) => (
            <Link
              key={study.id}
              to={`/case-studies/${study.id}`}
              className={`case-study-card${i === 0 ? ' featured' : ''}`}
            >
              <div
                className="case-study-photo"
                style={{
                  backgroundImage: study.image
                    ? `url(${study.image})`
                    : 'linear-gradient(135deg, #0C1B2E 0%, #1E4A7D 50%, #2E8B57 150%)',
                }}
              >
                <div className="case-study-photo-overlay" />
                <span className="case-study-badge">{study.badge}</span>
              </div>
              <div className="case-study-body">
                <h3 className="case-study-title">{study.title}, {study.location}</h3>
                <p className="case-study-desc">{study.description}</p>
                {/* One hero stat per card */}
                {study.stats?.[0] && (
                  <div className="case-study-stats">
                    <div className="case-study-stat">
                      <span className="case-study-stat-num">{study.stats[0].num}</span>
                      <span className="case-study-stat-label">{study.stats[0].label}</span>
                    </div>
                  </div>
                )}
                <span className="case-study-link">Read Case Study →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
