import { useRef } from 'react';
import HeroBackground from './HeroBackground';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../hooks/useGsap';

export default function T2Hero({ data }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const el = (s) => containerRef.current.querySelector(s);
    const targets = ['.crumb', '.hbadge', '.htitle', '.hdesc', '.hero-scroll-indicator'].map(el).filter(Boolean);
    gsap.set(targets, { opacity: 0, y: 24 });
    gsap.to(targets, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.12, delay: 0.15 });
  }, { scope: containerRef, dependencies: [] });

  const bgStyle = {
    background: data.heroGradient || 'linear-gradient(168deg, #070f1e 0%, #0c2240 35%, #143760 70%, #091520 100%)',
  };

  return (
    <section className="hero" style={bgStyle} ref={containerRef}>
      <HeroBackground />
      <div className="hero-grid" />
      <div className="hero-bgnum">{data.num}</div>

      <div className="hero-inner hero-inner--split">
        <div className="hero-left">
          <nav className="crumb">
            <a href="/">Home</a><span className="sep">/</span>
            <a href="/what-we-do">What We Do</a><span className="sep">/</span>
            <span className="cur">{data.hero.title} {data.hero.titleEm}</span>
          </nav>

          <div className="hbadge">
            <div className="hbadge-dot" />
            Division {data.num} — {data.serviceCount || data.services.items.length} Specialist Services
          </div>

          <h1 className="htitle" style={{ fontSize: 'clamp(42px, 5vw, 48px)' }}>
            {data.hero.title}<br />
            <em>{data.hero.titleEm}</em>
          </h1>

          <p className="hdesc">{data.hero.desc}</p>
        </div>

        <div
          className="hero-right hero-scene-col hero-visual-gradient"
          aria-hidden="true"
          style={{ background: data.heroGradient || bgStyle.background }}
        />
      </div>

      <div className="hero-scroll-indicator">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
