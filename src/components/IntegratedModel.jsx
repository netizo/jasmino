import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../hooks/useGsap';
import '../styles/integrated-model.css';

const SECTION_BG_IMAGE = '/images/onecompany.png';

/* ══════════════════════════════════════════════════════════════════
   PIPELINE STEP ICONS (24x24 stroke-based SVGs)
   ══════════════════════════════════════════════════════════════════ */
const STEP_ICONS = {
  '01': ( // Compass — Design
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" />
    </svg>
  ),
  '02': ( // Wrench — Fabricate
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  '03': ( // Shield — Protect
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  '04': ( // Magnifier — Inspect
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  '05': ( // Truck — Deliver
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16,8 20,8 23,11 23,16 16,16" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
};

const PipelineStep = ({ num, name, sub }) => (
  <div className="pipeline-step">
    <div className="step-node">
      <div className="step-ring-outer"></div>
      <div className="step-ring"></div>
      <div className="step-inner">{STEP_ICONS[num]}</div>
      <div className="step-indicator"></div>
    </div>
    <div className="step-name">{name}</div>
    <div className="step-sub">{sub}</div>
  </div>
);


/* ══════════════════════════════════════════════════════════════════
   COMPARISON CARD — full content with bullet points
   ══════════════════════════════════════════════════════════════════ */
const ComparisonCard = ({ type, tag, heading, desc, points, statNum, statLabel }) => (
  <div className={`comp-card ${type}`}>
    <div className="comp-tag"><span className="tag-dot"></span>{tag}</div>
    <h3 className="comp-heading">{heading}</h3>
    <p className="comp-desc">{desc}</p>
    {points && points.length > 0 && (
      <ul className="comp-points">
        {points.map((text, i) => (
          <li key={i} className="comp-point">
            <span className="point-icon">{type === 'problem' ? '✕' : '✓'}</span>
            <span>{text}</span>
          </li>
        ))}
      </ul>
    )}
    <div className="comp-stat">
      <span className="comp-stat-num">{statNum}</span>
      <span className="comp-stat-label">{statLabel}</span>
    </div>
  </div>
);


/* ══════════════════════════════════════════════════════════════════
   INTEGRATED MODEL SECTION — Dark theme with video + spotlight
   ══════════════════════════════════════════════════════════════════ */
const IntegratedModel = React.memo(() => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleMove = (e) => {
      const r = section.getBoundingClientRect();
      section.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      section.style.setProperty('--my', (e.clientY - r.top) + 'px');
    };
    section.addEventListener('mousemove', handleMove, { passive: true });
    return () => section.removeEventListener('mousemove', handleMove);
  }, []);

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(sectionRef.current.querySelectorAll('.s3-header, .pipeline-wrap, .comparison-wrap'), { opacity: 1 });
      return;
    }

    const header = sectionRef.current.querySelector('.s3-header');
    const pipeline = sectionRef.current.querySelector('.pipeline-wrap');
    const comparison = sectionRef.current.querySelector('.comparison-wrap');

    [header, pipeline, comparison].filter(Boolean).forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
          delay: i * 0.1,
        }
      );
    });

    // Stagger pipeline steps
    const steps = sectionRef.current.querySelectorAll('.pipeline-step');
    if (steps.length) {
      gsap.fromTo(steps,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.08,
          scrollTrigger: { trigger: pipeline, start: 'top 80%', once: true },
          delay: 0.3,
        }
      );
    }
  }, { scope: sectionRef, dependencies: [] });

  const steps = [
    { num: '01', name: 'Design', sub: 'Engineering' },
    { num: '02', name: 'Fabricate', sub: 'Manufacturing' },
    { num: '03', name: 'Protect', sub: 'Linings' },
    { num: '04', name: 'Inspect', sub: 'Quality' },
    { num: '05', name: 'Deliver', sub: 'Logistics' },
  ];

  return (
    <section className="s3" ref={sectionRef}>
      <div
        className="s3-shader"
        style={{ backgroundImage: `url(${SECTION_BG_IMAGE})` }}
      >
        <div className="s3-video-overlay" />
      </div>
      <div className="s3-spotlight" />
      <div className="s3-content">
        {/* Header — no overline, headline stands alone */}
        <div className="s3-header">
          <h2 className="s3-title">One company. Zero <em>handoffs.</em></h2>
          <p className="s3-subtitle">
            Most projects require 3–4 vendors — designer, fabricator, lining applicator, inspector. Each handoff introduces delays, finger-pointing, and rework. We eliminated the handoffs.
          </p>
        </div>

        {/* Pipeline */}
        <div className="pipeline-wrap">
          <div className="pipeline">
            <div className="pipeline-beam">
              <div className="pipeline-beam-track"></div>
              <div className="pipeline-beam-energy"></div>
              <div className="pipeline-beam-energy-2"></div>
            </div>
            {steps.map(step => (
              <PipelineStep key={step.num} {...step} />
            ))}
          </div>
        </div>

        {/* Comparison — simplified one-sentence cards */}
        <div className="comparison-wrap">
          <div className="comparison">
            <div className="comp-vs">VS</div>
            <ComparisonCard
              type="problem"
              tag="The Industry Problem"
              heading="Multiple vendors, multiple contracts"
              desc="3–4 separate companies. 3–4 contracts. 3–4 schedules. When something goes wrong, everyone points to someone else."
              points={[
                'Design decisions made without manufacturing context',
                'Fabrication specs that ignore lining requirements',
                'Quality gaps between contractor handoffs',
              ]}
              statNum="3–4×"
              statLabel="points of failure"
            />
            <ComparisonCard
              type="solution"
              tag="The Jasmino Model"
              heading="One company, one accountability"
              desc="One company. One contract. One point of accountability. The engineer who designed it walks the shop floor where it's built."
              points={[
                'Design accounts for manufacturing tolerances from day one',
                'Fabrication built with lining requirements already embedded',
                'Seamless quality control from concept through delivery',
              ]}
              statNum="1"
              statLabel="single point of accountability"
            />
          </div>
        </div>
      </div>
    </section>
  );
});

IntegratedModel.displayName = 'IntegratedModel';
export default IntegratedModel;
