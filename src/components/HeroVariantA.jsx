import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from '../hooks/useGsap';

const PHASES = ['Design', 'Build', 'Protect'];

// Place video at public/videos/jasmino-hero.mp4 (served as /videos/jasmino-hero.mp4)
const HERO_VIDEO_SRC = '/videos/jasmino-hero.mp4';
// Fallback image when video is missing or fails to load
const HERO_FALLBACK_IMG = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1280&h=720&q=75&fit=crop';

export default function HeroVariantA() {
  const [phase, setPhase] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);
  const heroRef = useRef(null);
  const autoPlayTimer = useRef(null);

  useGSAP(() => {
    if (!heroRef.current) return;
    const el = (s) => heroRef.current.querySelector(s);
    const targets = ['.hero-badge', '.hero-headline', '.hero-subtext', '.hero-ctas', '.phase-indicator', '.scroll-hint'].map(el).filter(Boolean);
    // CSS handles initial hidden state; GSAP animates in
    gsap.to(targets, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.08 });
  }, { scope: heroRef, dependencies: [] });

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const handleError = () => setVideoError(true);
    const handleCanPlay = () => setVideoError(false);
    v.addEventListener('error', handleError);
    v.addEventListener('canplay', handleCanPlay);
    return () => {
      v.removeEventListener('error', handleError);
      v.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

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
        className="hero-wrap hero-variant-a"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          minHeight: 700,
          overflow: 'hidden',
          backgroundColor: 'var(--navy)',
        }}
      >
        {/* Video background (fallback to image if video missing/fails) */}
        {!videoError ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
            }}
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${HERO_FALLBACK_IMG})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 0,
            }}
          />
        )}

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

        {/* Centered content */}
        <div
          className="hero-content"
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            textAlign: 'center',
            padding: '0 24px',
          }}
        >
          {/* Badge — v4: no pulsing dot, IBM Plex Sans */}
          <div
            className="hero-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 24,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: '0.02em',
                color: 'rgba(255,255,255,0.65)',
              }}
            >
              Engineering Excellence Since 1984
            </span>
          </div>

          {/* Headline */}
          <h1
            className="hero-headline"
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 400,
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
                    opacity: phase === i ? 1 : 0.85,
                    fontWeight: 900,
                  }}
                >
                  {p}
                </span>
                <span
                  style={{
                    display: 'inline-block',
                    transition: 'color 0.6s, opacity 0.6s',
                    color: phase === i ? (i === 2 ? 'var(--green)' : 'var(--blue-bright)') : 'inherit',
                    opacity: phase === i ? 1 : 0.85,
                  }}
                >
                  .
                </span>
              </span>
            ))}
          </h1>

          {/* Subtext */}
          <p
            className="hero-subtext"
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.7)',
              maxWidth: 520,
              marginBottom: 40,
            }}
          >
            For over 40 years, Jasmino has done what no other company does — engineer, manufacture, and protect industrial process equipment under one roof.
          </p>

          {/* CTAs */}
          <div
            className="hero-ctas"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 24,
              marginBottom: 48,
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

          {/* Phase indicator — inline below CTAs */}
          <div
            className="phase-indicator"
            style={{
              display: 'flex',
              justifyContent: 'center',
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
                  className="phase-dot"
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

        {/* Certification strip */}
        <div
          className="hero-cert-strip"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            padding: '28px 24px',
            background: 'rgba(12,27,46,0.25)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(255,255,255,0.04)',
            color: 'rgba(12, 18, 32, 0.2)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginRight: 4,
            }}
          >
            Certified to
          </span>
          {['ASME', 'API', 'PED', 'ISO 9001', 'TÜV', 'Bureau Veritas'].map((c) => (
            <span
              key={c}
              style={{
                display: 'flex',
                alignItems: 'center',
                color: 'rgba(255,255,255,0.6)',
                padding: '10px 16px',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 6,
              }}
            >
              <img
                src={{ ASME: '/logos/certs/asme.svg', API: '/logos/certs/api.svg', PED: '/logos/certs/ped.svg', 'ISO 9001': '/logos/certs/iso9001.svg', 'TÜV': '/logos/certs/tuv.svg', 'Bureau Veritas': '/logos/certs/bureau-veritas.svg' }[c]}
                alt={c}
                width={64}
                height={40}
                style={{ objectFit: 'contain', opacity: 0.9 }}
                loading="lazy"
              />
            </span>
          ))}
        </div>

        {/* Scroll hint — v4: no pulsing animation */}
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
              fontFamily: 'var(--font-sans)',
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
            }}
          />
        </div>

        <style>{`
          @media (max-width: 640px) {
            .hero-variant-a .phase-indicator { gap: 24px !important; }
            .hero-variant-a .scroll-hint { display: none !important; }
          }
        `}</style>
      </section>
    </>
  );
}
