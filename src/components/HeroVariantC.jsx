import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from '../hooks/useGsap';

const PHASES = ['Design', 'Build', 'Protect'];

// Replace with final hero imagery — industrial/manufacturing theme
const SLIDES = [
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1280&q=70',
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1280&q=70',
  'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1280&q=70',
];

const SLIDE_INTERVAL_MS = 6000;
const CROSSFADE_DURATION_MS = 1500;

export default function HeroVariantC() {
  const [phase, setPhase] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const heroRef = useRef(null);
  const autoPlayTimer = useRef(null);

  useGSAP(() => {
    if (!heroRef.current) return;
    const el = (s) => heroRef.current.querySelector(s);
    const targets = ['.hero-badge', '.hero-headline', '.hero-subtext', '.hero-ctas', '.phase-indicator', '.scroll-hint'].map(el).filter(Boolean);
    gsap.set(targets, { opacity: 0, y: 20 });
    gsap.to(targets, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.08 });
  }, { scope: heroRef, dependencies: [] });

  // Auto-advance phase indicator
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setPhase((p) => (p + 1) % 3);
    }, 3500);
    return () => clearInterval(interval);
  }, [autoPlay]);

  // Slider: 6s interval
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const handlePhaseClick = (index) => {
    setPhase(index);
    setAutoPlay(false);
    if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);
    autoPlayTimer.current = setTimeout(() => setAutoPlay(true), 10000);
  };

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const frame = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / SLIDE_INTERVAL_MS, 1);
      setProgress(p);
      if (p < 1) requestAnimationFrame(frame);
    };
    const id = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(id);
  }, [slideIndex]);

  const goToSlide = (index) => {
    setSlideIndex(index);
  };

  return (
    <>
      <section
        ref={heroRef}
        className="hero-wrap hero-variant-c"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          minHeight: 700,
          overflow: 'hidden',
          backgroundColor: 'var(--navy)',
        }}
      >
        {/* Image slider */}
        <div
          className="hero-variant-c-slider"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
          }}
        >
          {SLIDES.map((src, i) => (
            <div
              key={i}
              className={`hero-variant-c-slide${i === slideIndex ? ' active' : ''}`}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'saturate(0.4) brightness(0.6) contrast(1.1)',
                transition: `opacity ${CROSSFADE_DURATION_MS}ms ease-in-out`,
                opacity: i === slideIndex ? 1 : 0,
              }}
            />
          ))}
        </div>

        {/* Dark gradient overlay (matches infrastructure hero) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse at center, transparent 50%, rgba(11, 29, 52, 0.5) 100%),
              linear-gradient(180deg, rgba(11, 29, 52, 0.15) 0%, rgba(11, 29, 52, 0.08) 20%, rgba(11, 29, 52, 0.35) 50%, rgba(11, 29, 52, 0.85) 82%, var(--navy) 100%)
            `,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        <div className="container" style={{ height: '100%', maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div
            className="hero-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              height: '100%',
              width: '100%',
            }}
          >
            <div
              className="hero-content"
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '0 0 0 24px',
              }}
            >
              <div
                className="hero-badge"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 24,
                  width: 'fit-content',
                  alignSelf: 'flex-start',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--green)',
                  }}
                >
                  Engineering Excellence Since 1984
                </span>
              </div>

              <h1
                className="hero-headline"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  fontSize: 'clamp(48px, 5.5vw, 72px)',
                  lineHeight: 1.05,
                  color: 'var(--white)',
                  marginBottom: 32,
                }}
              >
                {PHASES.map((p, i) => (
                  <span key={p} style={{ marginRight: 12 }}>
                    <span
                      style={{
                        display: 'inline-block',
                        transition: 'color 0.6s, opacity 0.6s',
                        color: phase === i ? (i === 2 ? 'var(--green)' : 'var(--blue-bright)') : 'inherit',
                        opacity: phase === i ? 1 : 0.2,
                      }}
                    >
                      {p}
                    </span>
                    <span
                      style={{
                        display: 'inline-block',
                        transition: 'all 0.6s',
                        color: phase === i ? (i === 2 ? 'var(--green)' : 'var(--blue-bright)') : 'inherit',
                        opacity: phase === i ? 1 : 0.2,
                      }}
                    >
                      .
                    </span>
                  </span>
                ))}
              </h1>

              <p
                className="hero-subtext"
                style={{
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.7)',
                  maxWidth: 480,
                  marginBottom: 40,
                }}
              >
                For over 40 years, Jasmino has done what no other company does — engineer, manufacture, and protect industrial process equipment under one roof.
              </p>

              <div
                className="hero-ctas"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                }}
              >
                <Link
                  to="/what-we-do"
                  className="btn btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '14px 32px',
                    textDecoration: 'none',
                  }}
                >
                  See How We Work
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
                <Link to="/industries" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
                  View Industries →
                </Link>
              </div>

              <div
                className="phase-indicator"
                style={{
                  position: 'absolute',
                  bottom: 48,
                  left: 24,
                  display: 'flex',
                  gap: 40,
                }}
              >
                {PHASES.map((p, i) => (
                  <div
                    key={p}
                    className="phase-step"
                    role="button"
                    tabIndex={0}
                    aria-label={`Select ${p} phase`}
                    onClick={() => handlePhaseClick(i)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handlePhaseClick(i);
                      }
                    }}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      cursor: 'pointer',
                      opacity: phase === i ? 1 : 0.4,
                      transition: 'opacity 0.4s',
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: phase === i ? (i === 2 ? 'var(--green)' : 'var(--blue-bright)') : 'rgba(255,255,255,0.4)',
                        transform: phase === i ? 'scale(1.3)' : 'scale(1)',
                        transition: 'all 0.4s',
                      }}
                    />
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                        color: phase === i ? (i === 2 ? 'var(--green)' : 'var(--blue-bright)') : 'rgba(255,255,255,0.6)',
                        transition: 'color 0.4s',
                      }}
                    >
                      {p}
                    </span>
                    {phase === i && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: -6,
                          left: 0,
                          height: 2,
                          width: '100%',
                          background: i === 2 ? 'var(--green)' : 'var(--blue-bright)',
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: 'relative' }} />
          </div>
        </div>

        {/* Slider progress bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'rgba(255,255,255,0.1)',
            zIndex: 10,
            display: 'flex',
          }}
        >
          {SLIDES.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: '100%',
                background: 'rgba(255,255,255,0.15)',
                marginRight: i < SLIDES.length - 1 ? 2 : 0,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: i < slideIndex ? '100%' : i === slideIndex ? `${progress * 100}%` : '0%',
                  background: 'var(--green)',
                  transition: i === slideIndex ? 'none' : 'width 0.3s ease',
                }}
              />
            </div>
          ))}
        </div>

        {/* Dot navigation */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 12,
            zIndex: 10,
          }}
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                border: 'none',
                background: i === slideIndex ? 'var(--green)' : 'rgba(255,255,255,0.3)',
                cursor: 'pointer',
                padding: 0,
                transition: 'background 0.3s, transform 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = i === slideIndex ? 'var(--green)' : 'rgba(255,255,255,0.5)';
                e.currentTarget.style.transform = 'scale(1.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = i === slideIndex ? 'var(--green)' : 'rgba(255,255,255,0.3)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div
          className="scroll-hint"
          style={{
            position: 'absolute',
            bottom: 48,
            right: 48,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: 1,
              height: 40,
              background: 'rgba(255,255,255,0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '50%',
                background: 'var(--green)',
                animation: 'heroScrollPulse 2s ease infinite',
              }}
            />
          </div>
        </div>

        <style>{`
          @keyframes heroScrollPulse { 0% { top: -50%; } 100% { top: 150%; } }
          @media (max-width: 1024px) {
            .hero-variant-c .hero-grid { grid-template-columns: 1fr !important; }
            .hero-variant-c .hero-content { padding: 120px 24px 0 !important; justify-content: flex-start !important; }
            .hero-variant-c .phase-indicator { left: 24px !important; }
          }
          @media (max-width: 640px) {
            .hero-variant-c .hero-content { padding: 100px 20px 0 !important; }
            .hero-variant-c .phase-indicator { left: 20px !important; bottom: 24px !important; gap: 24px !important; }
            .hero-variant-c .scroll-hint { display: none !important; }
          }
        `}</style>
      </section>
    </>
  );
}
