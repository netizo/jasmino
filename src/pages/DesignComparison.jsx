import React, { useEffect } from 'react';
import '../styles/DesignComparison.css';

const GFONTS_URL = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,500;0,600;0,700&family=Source+Serif+4:ital,wght@0,400;0,500;0,600;0,700&family=Space+Mono:wght@400;700&display=swap';

const BODY_PARAGRAPH =
  'Our equipment operates in some of the most corrosive, high-temperature, and high-pressure environments in industry. We serve these sectors with a complete vertical solution — from engineering design through manufacturing, corrosion protection, and rubber products.';

const OPTIONS = [
  {
    id: 'A',
    label: 'A (Legacy)',
    serif: "'Lora', serif",
    sans: "'IBM Plex Sans', sans-serif",
    mono: "'IBM Plex Mono', monospace",
    accent: '#2E8B57',
  },
  {
    id: 'B',
    label: 'B',
    serif: "'Lora', serif",
    sans: "'IBM Plex Sans', sans-serif",
    mono: "'IBM Plex Mono', monospace",
    accent: '#2E8B57',
  },
  {
    id: 'C',
    label: 'C',
    serif: "'Source Serif 4', serif",
    sans: "'Inter', sans-serif",
    mono: "'Space Mono', monospace",
    accent: '#27AE60',
  },
  {
    id: 'D',
    label: 'D (v4)',
    serif: "'Lora', serif",
    sans: "'IBM Plex Sans', sans-serif",
    mono: "'IBM Plex Mono', monospace",
    accent: '#2E8B57',
  },
];

function QuadrantBlock({ option, isDark }) {
  const bg = isDark ? '#0C1B2E' : '#FAFBFC';
  const textColor = isDark ? 'rgba(255,255,255,0.9)' : '#1F2937';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : '#4B5563';

  return (
    <div
      className="dc-block"
      style={{
        background: bg,
        color: textColor,
      }}
    >
      <h2
        className="dc-hero"
        style={{
          fontFamily: option.serif,
          color: isDark ? option.accent : '#0C1220',
        }}
      >
        We design it. We build it. We <span style={{ fontStyle: 'italic', color: option.accent }}>protect</span> it.
      </h2>
      <p
        className="dc-body"
        style={{
          fontFamily: option.sans,
          color: mutedColor,
        }}
      >
        {BODY_PARAGRAPH}
      </p>
      <div
        className="dc-stats"
        style={{
          fontFamily: option.mono,
          color: isDark ? option.accent : option.accent,
        }}
      >
        40+ years · 15+ countries · 130K+ m² · 97% reorder
      </div>
      <div className="dc-pills">
        {['Rubber Linings', 'Steel Equipment', 'Process & Plant Design'].map((p) => (
          <span
            key={p}
            className="dc-pill"
            style={{
              fontFamily: option.sans,
              borderColor: option.accent,
              color: option.accent,
            }}
          >
            {p}
          </span>
        ))}
      </div>
      <div
        className="dc-trust"
        style={{
          fontFamily: option.mono,
          color: mutedColor,
        }}
      >
        ASME · API · PED · ISO · TÜV
      </div>
    </div>
  );
}

function Quadrant({ option }) {
  return (
    <div className="dc-quadrant">
      <div
        className="dc-quadrant-label"
        style={{ fontFamily: option.mono }}
      >
        {option.label}
      </div>
      <div className="dc-blocks">
        <QuadrantBlock option={option} isDark={false} />
        <QuadrantBlock option={option} isDark={true} />
      </div>
    </div>
  );
}

export default function DesignComparison() {
  useEffect(() => {
    if (!document.querySelector(`link[href="${GFONTS_URL}"]`)) {
      const preconnect1 = document.createElement('link');
      preconnect1.rel = 'preconnect';
      preconnect1.href = 'https://fonts.googleapis.com';
      const preconnect2 = document.createElement('link');
      preconnect2.rel = 'preconnect';
      preconnect2.href = 'https://fonts.gstatic.com';
      preconnect2.crossOrigin = 'anonymous';
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = GFONTS_URL;
      document.head.append(preconnect1, preconnect2, link);
    }
  }, []);

  return (
    <main className="design-comparison">
      <div className="dc-header">
        <h1 className="dc-header-title">Design Comparison</h1>
        <p className="dc-header-desc">Internal-only · Client review · Delete after decision</p>
      </div>
      <div className="dc-grid">
        {OPTIONS.map((opt) => (
          <Quadrant key={opt.id} option={opt} />
        ))}
      </div>
    </main>
  );
}
