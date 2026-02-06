import { useState, useEffect, useRef } from 'react';
import HeroScene from './HeroScene';
import CountUp from './CountUp';

const PHASES = ['Design', 'Build', 'Protect'];

export default function Hero() {
    const [phase, setPhase] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);
    const autoPlayTimer = useRef(null);

    // Auto-advance logic
    useEffect(() => {
        if (!autoPlay) return;
        const interval = setInterval(() => {
            setPhase(p => (p + 1) % 3);
        }, 3500); // 3.5s per phase
        return () => clearInterval(interval);
    }, [autoPlay]);

    const handlePhaseClick = (index) => {
        setPhase(index);
        setAutoPlay(false);
        // Resume autoplay after 10s of inactivity
        if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);
        autoPlayTimer.current = setTimeout(() => setAutoPlay(true), 10000);
    };

    return (
        <>
            <section className="hero-wrap eng-grid" style={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                minHeight: 700,
                overflow: 'hidden',
                backgroundColor: 'var(--white)'
            }}>
                {/* Background Gradients - Subtle Overlay on top of grid */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: `
            radial-gradient(ellipse at 20% 50%, rgba(27,75,143,0.03) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 30%, rgba(4,229,134,0.02) 0%, transparent 50%)
          `,
                    pointerEvents: 'none', zIndex: 1
                }} />

                {/* Animated Grid Lines */}
                <div className="grid-lines-anim" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
                    <div className="h-line" style={{ top: '30%' }}></div>
                    <div className="h-line" style={{ top: '70%', animationDelay: '2s' }}></div>
                    <div className="v-line" style={{ left: '20%', animationDelay: '1s' }}></div>
                    <div className="v-line" style={{ left: '80%', animationDelay: '3s' }}></div>
                </div>
                <style>{`
            .h-line {
                position: absolute; left: 0; width: 100%; height: 1px;
                background: linear-gradient(90deg, transparent, rgba(4,229,134,0.2), transparent);
                opacity: 0;
                animation: scanH 8s linear infinite;
            }
            .v-line {
                position: absolute; top: 0; height: 100%; width: 1px;
                background: linear-gradient(180deg, transparent, rgba(4,229,134,0.2), transparent);
                opacity: 0;
                animation: scanV 8s linear infinite;
            }
            @keyframes scanH {
                0% { transform: translateY(0) scaleX(0.2); opacity: 0; }
                10% { opacity: 1; transform: translateY(0) scaleX(1); }
                90% { opacity: 1; transform: translateY(0) scaleX(1); }
                100% { transform: translateY(100px) scaleX(0.2); opacity: 0; } /* Simplified motion, can be improved */
            } 
            /* Better Scan Animation */
            @keyframes scanH {
                0% { top: 0%; opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { top: 100%; opacity: 0; }
            }
            @keyframes scanV {
                0% { left: 0%; opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { left: 100%; opacity: 0; }
            }
        `}</style>

                <div className="container" style={{ height: '100%', maxWidth: 1400, margin: '0 auto', position: 'relative' }}>
                    <div className="hero-grid" style={{
                        display: 'grid', gridTemplateColumns: '1fr 1fr',
                        height: '100%', width: '100%'
                    }}>
                        {/* CONTENT LEFT */}
                        <div className="hero-content" style={{
                            position: 'relative', zIndex: 2,
                            display: 'flex', flexDirection: 'column', justifyContent: 'center',
                            padding: '0 0 0 24px' /* Adjusted for container padding */
                        }}>
                            <div style={{
                                fontSize: 12, fontWeight: 600, letterSpacing: 3,
                                textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 32,
                                opacity: 0, animation: 'fadeUp 0.8s ease 0.3s forwards'
                            }}>
                                Integrated Engineering & Corrosion Protection
                            </div>

                            <h1 className="hero-headline" style={{
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 700,
                                fontSize: 'clamp(48px, 5.5vw, 72px)',
                                lineHeight: 1.05,
                                color: 'var(--gray-900)',
                                marginBottom: 32,
                                opacity: 0, animation: 'fadeUp 0.8s ease 0.5s forwards'
                            }}>
                                {PHASES.map((p, i) => (
                                    <span key={p} style={{ marginRight: 12 }}>
                                        <span className={`word ${phase === i ? (i === 2 ? 'protect-active' : 'active') : 'dimmed'}`}
                                            style={{
                                                display: 'inline-block', transition: 'color 0.6s, opacity 0.6s',
                                                color: phase === i ? (i === 2 ? '#04E586' : '#1B4B8F') : 'inherit',
                                                opacity: phase === i ? 1 : 0.2
                                            }}>
                                            {p}
                                        </span>
                                        <span className={`dot ${phase === i ? (i === 2 ? 'protect-active' : 'active') : 'dimmed'}`}
                                            style={{
                                                display: 'inline-block', transition: 'all 0.6s',
                                                color: phase === i ? (i === 2 ? '#04E586' : '#1B4B8F') : 'inherit',
                                                opacity: phase === i ? 1 : 0.2
                                            }}>
                                            .
                                        </span>
                                    </span>
                                ))}
                            </h1>

                            <p style={{
                                fontSize: 17, lineHeight: 1.7, color: 'var(--gray-600)',
                                maxWidth: 480, marginBottom: 40,
                                opacity: 0, animation: 'fadeUp 0.8s ease 0.7s forwards'
                            }}>
                                For 40 years, Jasmino has done what no other company does — engineer, manufacture, and protect industrial process equipment under one roof.
                            </p>

                            <div style={{
                                display: 'flex', alignItems: 'center', gap: 24,
                                opacity: 0, animation: 'fadeUp 0.8s ease 0.9s forwards'
                            }}>
                                <a href="/what-we-do" className="hero-btn" style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 10,
                                    fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600,
                                    color: '#fff', background: '#1B4B8F',
                                    padding: '14px 32px', borderRadius: 4, textDecoration: 'none',
                                    transition: 'all 0.2s'
                                }}>
                                    See How We Work
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M3 8h10M9 4l4 4-4 4" />
                                    </svg>
                                </a>
                                <a href="/industries" className="hero-btn-secondary" style={{
                                    fontSize: 14, fontWeight: 500, color: 'var(--gray-600)',
                                    textDecoration: 'none', transition: 'color 0.2s'
                                }}>
                                    View Industries →
                                </a>
                            </div>

                            {/* PHASE INDICATOR */}
                            <div className="phase-indicator" style={{
                                position: 'absolute', bottom: 48, left: 24, zIndex: 10,
                                display: 'flex', gap: 40,
                                opacity: 0, animation: 'fadeUp 0.8s ease 1.1s forwards'
                            }}>
                                {PHASES.map((p, i) => (
                                    <div key={p} className="phase-step" onClick={() => handlePhaseClick(i)} style={{
                                        position: 'relative', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
                                        opacity: phase === i ? 1 : 0.4, transition: 'opacity 0.4s'
                                    }}>
                                        <div className="phase-dot" style={{
                                            width: 8, height: 8, borderRadius: '50%',
                                            background: phase === i ? (i === 2 ? '#04E586' : '#1B4B8F') : '#9CA3AF',
                                            transform: phase === i ? 'scale(1.3)' : 'scale(1)',
                                            transition: 'all 0.4s'
                                        }} />
                                        <div className="phase-label" style={{
                                            fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase',
                                            color: phase === i ? (i === 2 ? '#04E586' : '#1B4B8F') : 'var(--gray-600)',
                                            transition: 'color 0.4s'
                                        }}>
                                            {p}
                                        </div>
                                        {/* Progress Bar */}
                                        {phase === i && (
                                            <div style={{
                                                position: 'absolute', bottom: -6, left: 0,
                                                height: 2, width: '100%',
                                                background: i === 2 ? '#04E586' : '#1B4B8F'
                                            }} />
                                        )}
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* CANVAS RIGHT */}
                        <div className="hero-canvas-wrap" style={{
                            position: 'relative', zIndex: 2,
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <HeroScene phase={phase} />
                        </div>
                    </div>
                </div>

                {/* SCROLL HINT */}
                <div className="scroll-hint" style={{
                    position: 'absolute', bottom: 48, right: 48, zIndex: 10,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                    opacity: 0, animation: 'fadeUp 0.8s ease 1.3s forwards'
                }}>
                    <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gray-400)' }}>
                        Scroll
                    </span>
                    <div style={{
                        width: 1, height: 40, background: 'var(--gray-200)', position: 'relative', overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '50%',
                            background: 'var(--blue)', animation: 'scrollPulse 2s ease infinite'
                        }} />
                    </div>
                </div>


                {/* INLINE STYLES FOR ANIMATION (Scope to this component) */}
                <style>{`
            @keyframes fadeUp { to { opacity:1; transform:translateY(0); } }
            @keyframes scrollPulse { 0%{top:-50%} 100%{top:150%} }
            @media (max-width:1024px) {
                .hero-grid { grid-template-columns:1fr !important; grid-template-rows:1fr 1fr !important; }
                .hero-content { padding:120px 24px 0 !important; justify-content:flex-start !important; }
                .hero-canvas-wrap { order:-1 !important; pointer-events:none; }
                .phase-indicator { left:24px !important; }
            }
            @media (max-width:640px) {
                .hero-content { padding:100px 20px 0 !important; }
                .phase-indicator { left:20px !important; bottom:24px !important; gap:24px !important; }
                .scroll-hint { display:none !important; }
            }
            .hero-btn:hover { background: var(--dark-blue) !important; transform: translateY(-1px); }
            .hero-btn svg { transition: transform 0.2s; }
            .hero-btn:hover svg { transform: translateX(3px); }
            .hero-btn-secondary:hover { color: var(--blue) !important; }
        `}</style>
            </section>

            {/* STATS BAR */}
            <div className="stats-bar" style={{
                borderTop: '1px solid var(--gray-200)', background: 'var(--white)'
            }}>
                <div className="container" style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
                    {[
                        { n: '40+', l: 'Years of Engineering' },
                        { n: '15', l: 'Countries' },
                        { n: '97%', l: 'Reorder Rate' },
                        { n: '3rd', l: 'Largest Globally' }
                    ].map((s, i) => (
                        <div key={s.l} className="stat" style={{
                            padding: '40px 48px',
                            borderRight: i < 3 ? '1px solid var(--gray-200)' : 'none',
                            textAlign: 'center'
                        }}>
                            <div className="stat-number" style={{
                                fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 36,
                                color: 'var(--blue)', lineHeight: 1, marginBottom: 6
                            }}>
                                {s.n}
                            </div>
                            <div className="stat-label" style={{
                                fontSize: 13, color: 'var(--gray-400)', fontWeight: 500, letterSpacing: 0.3
                            }}>
                                {s.l}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Responsive Styles for Stats */}
                <style>{`
            @media (max-width: 640px) {
                .stats-bar .container { grid-template-columns: repeat(2,1fr) !important; }
                .stat { padding: 24px !important; border-bottom: 1px solid var(--gray-200); }
                .stat:nth-last-child(-n+2) { border-bottom: none; }
                .stat:nth-child(2) { border-right: none !important; }
            }
          `}</style>
            </div>
        </>
    );
}
