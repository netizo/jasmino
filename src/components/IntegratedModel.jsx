import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../hooks/useGsap';
import '../styles/integrated-model.css';

const SECTION_BG_IMAGE = '/images/onecompany.png';

/* ══════════════════════════════════════════════════════════════════
   ANIMATED PIPELINE STEP ICONS (32x32 SVGs with CSS keyframe animations)
   ══════════════════════════════════════════════════════════════════ */
const STEP_ICONS = {
  '01': ( // Compass — Design (rotating needle + orbiting dot)
    <svg className="step-icon step-icon--compass" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
      <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" className="compass-ticks" />
      <g className="compass-needle">
        <polygon points="16,4 14,16 16,17 18,16" fill="rgba(46,139,87,0.85)" />
        <polygon points="16,28 14,16 16,15 18,16" fill="currentColor" opacity="0.35" />
      </g>
      <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.5" />
      <circle className="compass-orbit" cx="16" cy="2" r="1.5" fill="var(--green, #2e8b57)" opacity="0.7" />
    </svg>
  ),
  '02': ( // Fabricate — Gear + spark
    <svg className="step-icon step-icon--fabricate" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <g className="gear-main">
        <path d="M16 8 L17.5 8 L18 6.5 L20 6 L21 7.5 L22.5 7 L22.5 5.5 L24.5 5.5 L24.5 7 L26 7.5 L27 6 L28.5 7 L27.5 8.5 L29 10 L29 12 L27.5 12.5 L28 14 L29.5 14.5 L29.5 16.5 L28 16.5 L27.5 18 L29 19.5 L28 21 L26.5 20 L25 21.5 L25 23 L23 23 L22.5 21.5 L21 21 L20 22.5 L18 22 L18.5 20.5 L17 19.5 L15.5 20.5 L14 19.5 L15 18 L13.5 16.5 L12 17 L11 15.5 L12.5 14.5 L12 13 L10.5 12.5 L11 10.5 L12.5 11 L13.5 9.5 L12.5 8 L14 7 L15 8.5 Z" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.4" />
      </g>
      <g className="gear-inner">
        <circle cx="20" cy="14" r="5.5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2.5" />
        <circle cx="20" cy="14" r="2" fill="currentColor" opacity="0.3" />
      </g>
      <g className="fabricate-hammer">
        <rect x="5" y="18" width="3" height="9" rx="1" fill="currentColor" opacity="0.5" />
        <rect x="3" y="16" width="7" height="3" rx="1" fill="currentColor" opacity="0.7" />
      </g>
      <g className="sparks">
        <line x1="10" y1="17" x2="12" y2="15" stroke="var(--green, #2e8b57)" strokeWidth="1.2" strokeLinecap="round" className="spark spark-1" />
        <line x1="11" y1="19" x2="14" y2="18" stroke="var(--green, #2e8b57)" strokeWidth="1" strokeLinecap="round" className="spark spark-2" />
        <line x1="9" y1="15" x2="10" y2="12" stroke="var(--green, #2e8b57)" strokeWidth="0.8" strokeLinecap="round" className="spark spark-3" />
        <circle cx="13" cy="16" r="1" fill="var(--green, #2e8b57)" className="spark spark-4" />
      </g>
    </svg>
  ),
  '03': ( // Shield — Protect (pulsing shield + scanning line)
    <svg className="step-icon step-icon--protect" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path className="shield-outer" d="M16 3 L26 7 L26 15 C26 22 16 29 16 29 C16 29 6 22 6 15 L6 7 Z" stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
      <path className="shield-body" d="M16 5 L24 8.5 L24 15 C24 20.5 16 27 16 27 C16 27 8 20.5 8 15 L8 8.5 Z" stroke="currentColor" strokeWidth="1.2" fill="rgba(46,139,87,0.08)" />
      <path className="shield-check" d="M11 15.5 L14 19 L21 12" stroke="var(--green, #2e8b57)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line className="shield-scan" x1="6" y1="16" x2="26" y2="16" stroke="var(--green, #2e8b57)" strokeWidth="0.6" opacity="0.5" />
      <circle className="shield-pulse" cx="16" cy="16" r="8" stroke="var(--green, #2e8b57)" strokeWidth="0.6" fill="none" />
    </svg>
  ),
  '04': ( // Magnifier — Inspect (scanning movement + lens flare)
    <svg className="step-icon step-icon--inspect" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <g className="mag-body">
        <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
        <circle cx="14" cy="14" r="7" stroke="currentColor" strokeWidth="1.4" />
        <line x1="21" y1="21" x2="28" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="mag-crosshair">
        <line x1="14" y1="8" x2="14" y2="11" stroke="var(--green, #2e8b57)" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="14" y1="17" x2="14" y2="20" stroke="var(--green, #2e8b57)" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="8" y1="14" x2="11" y2="14" stroke="var(--green, #2e8b57)" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="17" y1="14" x2="20" y2="14" stroke="var(--green, #2e8b57)" strokeWidth="0.8" strokeLinecap="round" />
      </g>
      <circle className="mag-dot" cx="14" cy="14" r="1.5" fill="var(--green, #2e8b57)" opacity="0.6" />
      <circle className="mag-flare" cx="11" cy="11" r="2" fill="white" opacity="0.15" />
      <circle className="mag-sweep" cx="14" cy="14" r="5" stroke="var(--green, #2e8b57)" strokeWidth="0.5" strokeDasharray="1.5 8" fill="none" />
    </svg>
  ),
  '05': ( // Truck — Deliver (rolling wheels + motion lines)
    <svg className="step-icon step-icon--deliver" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <g className="truck-body">
        <rect x="2" y="10" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M20 14 L25 14 L28 18 L28 22 L20 22 Z" stroke="currentColor" strokeWidth="1.2" />
        <line x1="20" y1="10" x2="20" y2="22" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      </g>
      <g className="wheel wheel-rear">
        <circle cx="8" cy="23" r="3" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="8" cy="23" r="1" fill="currentColor" opacity="0.4" />
        <line x1="8" y1="20.5" x2="8" y2="22" stroke="currentColor" strokeWidth="0.6" className="wheel-spoke" />
        <line x1="10.5" y1="23" x2="9" y2="23" stroke="currentColor" strokeWidth="0.6" className="wheel-spoke" />
        <line x1="8" y1="25.5" x2="8" y2="24" stroke="currentColor" strokeWidth="0.6" className="wheel-spoke" />
        <line x1="5.5" y1="23" x2="7" y2="23" stroke="currentColor" strokeWidth="0.6" className="wheel-spoke" />
      </g>
      <g className="wheel wheel-front">
        <circle cx="24" cy="23" r="3" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="24" cy="23" r="1" fill="currentColor" opacity="0.4" />
        <line x1="24" y1="20.5" x2="24" y2="22" stroke="currentColor" strokeWidth="0.6" className="wheel-spoke" />
        <line x1="26.5" y1="23" x2="25" y2="23" stroke="currentColor" strokeWidth="0.6" className="wheel-spoke" />
        <line x1="24" y1="25.5" x2="24" y2="24" stroke="currentColor" strokeWidth="0.6" className="wheel-spoke" />
        <line x1="21.5" y1="23" x2="23" y2="23" stroke="currentColor" strokeWidth="0.6" className="wheel-spoke" />
      </g>
      <g className="motion-lines">
        <line x1="0" y1="13" x2="4" y2="13" stroke="var(--green, #2e8b57)" strokeWidth="0.8" strokeLinecap="round" className="motion-1" />
        <line x1="-1" y1="16" x2="3" y2="16" stroke="var(--green, #2e8b57)" strokeWidth="0.8" strokeLinecap="round" className="motion-2" />
        <line x1="0" y1="19" x2="4" y2="19" stroke="var(--green, #2e8b57)" strokeWidth="0.8" strokeLinecap="round" className="motion-3" />
      </g>
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
