import React, { useEffect, useRef, useState } from 'react';
import '../styles/trust-band.css';

/* ══════════════════════════════════════════════════════════════════
   TRUST BAND — Ported from sample/trust-band-v2.html
   Features: Layered backgrounds, animated counters, certifications
   ══════════════════════════════════════════════════════════════════ */

/* Counter animation with easeOutExpo */
function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

const AnimatedCounter = ({ target, duration = 2000, suffix, unit, isVisible, delay }) => {
    const [count, setCount] = useState(0);
    const startRef = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!isVisible || hasAnimated.current) return;

        const timeout = setTimeout(() => {
            hasAnimated.current = true;
            startRef.current = performance.now();

            const tick = (now) => {
                const elapsed = now - startRef.current;
                const progress = Math.min(elapsed / duration, 1);
                setCount(Math.round(target * easeOutExpo(progress)));
                if (progress < 1) {
                    requestAnimationFrame(tick);
                }
            };
            requestAnimationFrame(tick);
        }, delay);

        return () => clearTimeout(timeout);
    }, [isVisible, target, duration, delay]);

    return (
        <div className="stat-num-row">
            <span className="stat-count">{count}</span>
            {suffix && <span className="stat-suffix">{suffix}</span>}
            {unit && <span className="stat-unit">{unit}</span>}
        </div>
    );
};

const TrustStat = ({ target, suffix, unit, label, desc, delay, duration, isVisible }) => (
    <div
        className={`trust-stat ${isVisible ? 'vis' : ''}`}
        style={{ transitionDelay: `${delay}ms` }}
    >
        <AnimatedCounter
            target={target}
            suffix={suffix}
            unit={unit}
            duration={duration}
            isVisible={isVisible}
            delay={delay + 250}
        />
        <div className="stat-bar"></div>
        <div className="stat-label">{label}</div>
        <div className="stat-desc">{desc}</div>
    </div>
);

const CertBadge = ({ name, wide }) => (
    <div className={`cert ${wide ? 'wide' : ''}`}>{name}</div>
);

const TrustBand = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            });
        }, { threshold: 0.15 });

        obs.observe(section);
        return () => obs.disconnect();
    }, [isVisible]);

    const stats = [
        { target: 40, suffix: '+', label: 'Years of Engineering', desc: 'Operational since 1984', delay: 0, duration: 2000 },
        { target: 15, suffix: '+', label: 'Countries Served', desc: 'Three continents', delay: 130, duration: 1600 },
        { target: 97, suffix: '%', label: 'Reorder Rate', desc: 'Client retention', delay: 260, duration: 2200 },
        { target: 130, suffix: 'K', unit: 'm²', label: 'Shop Floor', desc: 'Combined manufacturing', delay: 390, duration: 2400 },
    ];

    const certs = [
        { name: 'ASME' },
        { name: 'API' },
        { name: 'PED' },
        { name: 'ISO 9001', wide: true },
        { name: 'TÜV' },
        { name: 'Bureau Veritas', wide: true },
    ];

    return (
        <>
            <section className="trust" ref={sectionRef}>
                {/* Layer 1: Background image */}
                <div className="trust-bg"></div>
                {/* Layer 2: Color overlay */}
                <div className="trust-overlay"></div>
                {/* Layer 3: Grid texture */}
                <div className="trust-grid"></div>
                {/* Layer 4: Ambient glow */}
                <div className="trust-glow"></div>

                <div className="trust-inner">
                    {/* Stats Row */}
                    <div className="trust-stats">
                        {stats.map(stat => (
                            <TrustStat key={stat.label} {...stat} isVisible={isVisible} />
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="trust-divider"></div>

                    {/* Certifications */}
                    <div className={`trust-certs-wrap ${isVisible ? 'vis' : ''}`}>
                        <div className="cert-header">
                            <span className="cert-header-text">Certified to International Standards</span>
                        </div>
                        <div className="cert-row">
                            {certs.map(cert => (
                                <CertBadge key={cert.name} {...cert} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Gradient transition to light */}
            <div className="trust-fade"></div>
        </>
    );
};

export default TrustBand;
