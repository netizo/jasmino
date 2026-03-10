import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from '../hooks/useGsap';

const PHASES = ['Design', 'Build', 'Protect'];

// Unsplash industrial/manufacturing imagery — replace with final asset
const HERO_BG_IMAGE = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1280&q=70';

export default function HeroVariantB() {
  const [phase, setPhase] = useState(0);
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

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setPhase((p) => (p + 1) % 3);
    }, 3500);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const handlePhaseClick = (index) => {
    setPhase(index);
    setAutoPlay(false);
    if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);
    autoPlayTimer.current = setTimeout(() => setAutoPlay(true), 10000);
  };

  return (
    <>
      <section
        ref={heroRef}
        className="hero-wrap hero-variant-b"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          minHeight: 700,
          overflow: 'hidden',
          backgroundColor: 'var(--navy)',
        }}
      >
        {/* Parallax background with Ken Burns zoom */}
        <div
          className="hero-variant-b-bg"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${HERO_BG_IMAGE})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
            filter: 'saturate(0.4) brightness(0.6) contrast(1.1)',
            zIndex: 0,
          }}
        />

        {/* Dark gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(12,27,46,0.85) 0%, rgba(12,27,46,0.5) 50%, rgba(12,27,46,0.7) 100%)',
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
                  Engineering Excellence Since 1972
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
                For over 50 years, Jasmino has done what no other company does — engineer, manufacture, and protect industrial process equipment under one roof.
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
          .hero-variant-b-bg {
            animation: heroKenBurns 15s ease-in-out infinite;
          }
          @keyframes heroKenBurns {
            0% { transform: scale(1); }
            100% { transform: scale(1.05); }
          }
          @keyframes heroScrollPulse { 0% { top: -50%; } 100% { top: 150%; } }
          @media (max-width: 1024px) {
            .hero-variant-b .hero-grid { grid-template-columns: 1fr !important; }
            .hero-variant-b .hero-content { padding: 120px 24px 0 !important; justify-content: flex-start !important; }
            .hero-variant-b .phase-indicator { left: 24px !important; }
            .hero-variant-b-bg { background-attachment: scroll !important; }
          }
          @media (max-width: 640px) {
            .hero-variant-b .hero-content { padding: 100px 20px 0 !important; }
            .hero-variant-b .phase-indicator { left: 20px !important; bottom: 24px !important; gap: 24px !important; }
            .hero-variant-b .scroll-hint { display: none !important; }
          }
        `}</style>
      </section>
    </>
  );
}
