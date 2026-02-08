import { useEffect, useRef } from 'react';
import CountUp from '../CountUp';
import HeroBackground from './HeroBackground';

export default function T2Hero({ data }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('vis');
                }
            });
        }, { threshold: 0.1 });

        // Observe elements that need reveal animation if we add 'rv' class here 
        // or rely on CSS animations triggered by load/viewport. The HTML uses 'rv' classes.
        // We will add 'rv' classes to elements.
        if (containerRef.current) {
            // We can observe here if needed, or just let CSS handle it if we toggle a class on parent?
            // The design uses IntersectionObserver to add .vis to .rv elements
            const rvs = containerRef.current.querySelectorAll('.rv, .rv-s');
            rvs.forEach(el => observer.observe(el));
        }

        return () => observer.disconnect();
    }, [data]);

    // Helper for hero gradient based on division? 
    // The HTML has inline style for background gradient. 
    // We might want to dynamicize this or just use a default specific to the design.
    // Engineering Design HTML uses: linear-gradient(168deg, #060e1a 0%, #0B1D34 35%, #112e55 70%, #0a1828 100%)
    // Corrosion Protection HTML uses: linear-gradient(168deg, #070f1e 0%, #0c2240 35%, #143760 70%, #091520 100%)
    // We can interpret `data.color` or just use a default dark blue theme for now to keep it premium.

    const bgStyle = {
        background: data.heroGradient || 'linear-gradient(168deg, #070f1e 0%, #0c2240 35%, #143760 70%, #091520 100%)'
    };

    return (
        <section className="hero" style={bgStyle} ref={containerRef}>
            <HeroBackground />
            <div className="hero-grid"></div>
            <div className="hero-fade"></div>
            <div className="hero-bgnum">{data.num}</div>

            <div className="hero-inner">
                <div className="hero-left">
                    <nav className="crumb">
                        <a href="/">Home</a><span className="sep">/</span>
                        <a href="/what-we-do">What We Do</a><span className="sep">/</span>
                        <span className="cur">{data.hero.title} {data.hero.titleEm}</span>
                    </nav>

                    <div className="hbadge">
                        <div className="hbadge-dot"></div>
                        Division {data.num} — {data.serviceCount || data.services.items.length} Specialist Services
                    </div>

                    <h1 className="htitle">
                        {data.hero.title}<br />
                        <em>{data.hero.titleEm}</em>
                    </h1>

                    <p className="hdesc">
                        {data.hero.desc}
                    </p>

                    <div className="hstats">
                        {data.hero.stats.map((stat, i) => (
                            <div key={i} className="hstat">
                                <div className="hstat-num">
                                    <CountUp end={stat.num} suffix={stat.suffix || ''} />
                                </div>
                                <div className="hstat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="hero-right">
                    <div className="hero-vis">
                        <div className="hero-vis-ring"></div>
                        <div className="hero-vis-ring2"></div>
                        <div className="hero-schematic">
                            <div dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 500 500" fill="none">${data.hero.schematic}</svg>` }} style={{ width: '100%', height: '100%' }} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
