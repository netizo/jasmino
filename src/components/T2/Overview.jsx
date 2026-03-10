import { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useGsap';

export default function T2Overview({ data }) {
  const sectionRef = useScrollReveal('.rv', { y: 28, stagger: 0.12 });

  if (!data.overview) return null;

  return (
    <section className="t2-overview" ref={sectionRef}>
      <div className="t2-overview-grid-bg" />
      <div className="t2-overview-in">
        <div className="t2-overview-body rv">
          <div className="overline">Overview</div>
          <h2 className="sec-h">
            {data.hero.title} <em>{data.hero.titleEm}</em>
          </h2>
          {data.overview.body.map((p, i) => (
            <p key={i} className="t2-overview-p">{p}</p>
          ))}
        </div>

        <div className="t2-overview-facts rv">
          <div className="t2-facts-card">
            <div className="t2-facts-header">Quick Facts</div>
            <div className="t2-facts-list">
              {data.overview.quickFacts.map((fact, i) => (
                <div key={i} className="t2-fact-row">
                  <span className="t2-fact-label">{fact.label}</span>
                  <span className="t2-fact-value">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
