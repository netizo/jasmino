import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/industries.css';

/* ══════════════════════════════════════════════════════════════════
   INDUSTRIES SECTION — Ported from sample/s4-industries-v2.html
   ══════════════════════════════════════════════════════════════════ */

/* SVG Icon Components with Animations */
const ChemicalIcon = () => (
    <svg className="ico-chem" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M9 3h6M10 3v5.5L5.5 17.5a2 2 0 001.7 3h9.6a2 2 0 001.7-3L14 8.5V3" strokeLinecap="round" strokeLinejoin="round" />
        <path className="liquid accent-f" d="M6.8 16h10.4L14 8.5H10L6.8 16z" fill="var(--green)" opacity="0.1" stroke="none" />
        <circle className="bubble1 accent-f" cx="10" cy="14" r="0.8" fill="var(--green)" opacity="0" />
        <circle className="bubble2 accent-f" cx="12.5" cy="13" r="0.6" fill="var(--green)" opacity="0" />
        <circle className="bubble3 accent-f" cx="11" cy="15" r="0.5" fill="var(--green)" opacity="0" />
    </svg>
);

const PetroIcon = () => (
    <svg className="ico-petro" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect className="tower" x="5" y="10" width="4.5" height="10" rx="0.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect className="tower2" x="14.5" y="6" width="4.5" height="14" rx="0.5" strokeLinecap="round" strokeLinejoin="round" />
        <path className="accent-s" d="M9.5 14h5" strokeLinecap="round" stroke="var(--green)" />
        <path d="M7.25 10V7.5" strokeLinecap="round" />
        <path d="M16.75 6V3.5" strokeLinecap="round" />
        <circle className="smoke1 accent-f" cx="16.75" cy="3" r="1" fill="var(--green)" opacity="0" stroke="none" />
        <circle className="smoke2 accent-f" cx="7.25" cy="7" r="0.8" fill="var(--green)" opacity="0" stroke="none" />
    </svg>
);

const PowerIcon = () => (
    <svg className="ico-power" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path className="bolt" d="M13 2L4.5 13h6L9 22l9.5-13h-6L13 2z" strokeLinecap="round" strokeLinejoin="round" />
        <path className="accent-f" d="M13 4L6.5 13h5L10 20l7.5-11h-5L13 4z" fill="var(--green)" opacity="0.08" stroke="none" />
    </svg>
);

const WaterIcon = () => (
    <svg className="ico-water" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path className="drop" d="M12 3c-3.5 4.5-7 8-7 11.5a7 7 0 0014 0c0-3.5-3.5-7-7-11.5z" strokeLinecap="round" strokeLinejoin="round" />
        <path className="accent-f" d="M12 7c-2.5 3.5-5 6-5 8.5a5 5 0 0010 0c0-2.5-2.5-5-5-8.5z" fill="var(--green)" opacity="0.07" stroke="none" />
        <path className="accent-s" d="M9 16.5a3.5 3.5 0 003.5 3.5" strokeLinecap="round" stroke="var(--green)" />
        <ellipse className="ripple1 accent-s" cx="12" cy="20.5" rx="3" ry="0.8" stroke="var(--green)" strokeWidth="0.8" fill="none" opacity="0" />
        <ellipse className="ripple2 accent-s" cx="12" cy="20.5" rx="3" ry="0.8" stroke="var(--green)" strokeWidth="0.8" fill="none" opacity="0" />
    </svg>
);

const FertIcon = () => (
    <svg className="ico-fert" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <g className="sprout">
            <path d="M12 21V11" strokeLinecap="round" />
            <path className="leaf-l accent-s" d="M12 14c-4-1.5-6-4-5.5-6.5C8 8 10.5 10 12 14z" stroke="var(--green)" strokeLinejoin="round" fill="var(--green)" fillOpacity="0.06" />
            <path className="leaf-r accent-s" d="M12 11c4-1.5 6-4 5.5-6.5C16 5 13.5 7 12 11z" stroke="var(--green)" strokeLinejoin="round" fill="var(--green)" fillOpacity="0.06" />
            <path d="M12 14c-2.5-1-3.5-3-3-4.5" strokeLinecap="round" opacity="0.3" />
        </g>
        <path d="M9 21h6" strokeLinecap="round" />
    </svg>
);

const MiningIcon = () => (
    <svg className="ico-mine" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path className="rock" d="M4 20l6-10 3 4 3-6 4 12H4z" strokeLinejoin="round" opacity="0.8" />
        <g className="pick">
            <path d="M4 4l4 4" strokeLinecap="round" strokeWidth="1.6" />
            <path className="accent-s" d="M3 7.5L6.5 4" strokeLinecap="round" stroke="var(--green)" strokeWidth="1.6" />
            <path className="accent-s" d="M3.5 5l2-0.5" strokeLinecap="round" stroke="var(--green)" />
        </g>
        <circle className="accent-f" cx="10" cy="17" r="0.7" fill="var(--green)" opacity="0.25" stroke="none" />
        <circle className="accent-f" cx="14" cy="16" r="0.5" fill="var(--green)" opacity="0.18" stroke="none" />
    </svg>
);

const PharmaIcon = () => (
    <svg className="ico-pharma" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect className="capsule" x="4" y="9" width="16" height="10" rx="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 9v10" strokeLinecap="round" opacity="0.15" />
        <line className="cross-h accent-s" x1="9.5" y1="14" x2="14.5" y2="14" strokeLinecap="round" stroke="var(--green)" />
        <line className="cross-v accent-s" x1="12" y1="11.5" x2="12" y2="16.5" strokeLinecap="round" stroke="var(--green)" />
        <path d="M8.5 9V6.5a1 1 0 011-1h5a1 1 0 011 1V9" strokeLinecap="round" opacity="0.45" />
    </svg>
);

const FoodIcon = () => (
    <svg className="ico-food" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <g className="cup">
            <path d="M6 8h12l-1.5 10a2 2 0 01-2 1.8h-5A2 2 0 017.5 18L6 8z" strokeLinecap="round" strokeLinejoin="round" />
            <path className="accent-s" d="M7 11h10" strokeLinecap="round" stroke="var(--green)" />
        </g>
        <path d="M12 19.8V21" strokeLinecap="round" opacity="0.5" />
        <path d="M9 21h6" strokeLinecap="round" opacity="0.5" />
        <path className="steam1 accent-s" d="M9 6c0-1.5 1-2.5 0-3.5" strokeLinecap="round" stroke="var(--green)" opacity="0" strokeWidth="1.2" />
        <path className="steam2 accent-s" d="M12 5.5c0-1.5 1-2.5 0-3.5" strokeLinecap="round" stroke="var(--green)" opacity="0" strokeWidth="1.2" />
        <path className="steam3 accent-s" d="M15 6c0-1.5 1-2.5 0-3.5" strokeLinecap="round" stroke="var(--green)" opacity="0" strokeWidth="1.2" />
    </svg>
);

const ArrowIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

/* Industry Card Component */
const IndustryCard = ({ icon: Icon, name, desc, delay }) => (
    <Link
        to="/industries"
        className="ind-card"
        style={{ transitionDelay: `${delay}ms` }}
    >
        <div className="ind-ico">
            <Icon />
        </div>
        <div className="ind-name">{name}</div>
        <div className="ind-desc">{desc}</div>
        <div className="ind-arr">
            <ArrowIcon />
        </div>
    </Link>
);

/* Main Industries Section */
const Industries = React.memo(() => {
    const sectionRef = useRef(null);
    const spotRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        // Mouse spotlight (rAF-throttled)
        const section = sectionRef.current;
        const spot = spotRef.current;
        if (section && spot) {
            let raf = false;
            const handleMove = (e) => {
                if (raf) return;
                raf = true;
                requestAnimationFrame(() => {
                    const r = section.getBoundingClientRect();
                    spot.style.setProperty('--mx', (e.clientX - r.left) + 'px');
                    spot.style.setProperty('--my', (e.clientY - r.top) + 'px');
                    raf = false;
                });
            };
            section.addEventListener('mousemove', handleMove, { passive: true });
            return () => section.removeEventListener('mousemove', handleMove);
        }
    }, []);

    useEffect(() => {
        // Card grid stagger reveal
        const grid = gridRef.current;
        if (!grid) return;

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    const cards = grid.querySelectorAll('.ind-card');
                    cards.forEach((c, i) => {
                        setTimeout(() => c.classList.add('vis'), i * 70);
                    });
                    obs.unobserve(grid);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

        obs.observe(grid);
        return () => obs.disconnect();
    }, []);

    const industries = [
        { icon: ChemicalIcon, name: 'Chemical', desc: 'Reactors, tanks, piping' },
        { icon: PetroIcon, name: 'Petrochemical', desc: 'Refining & processing' },
        { icon: PowerIcon, name: 'Power', desc: 'Boilers, FGD, cooling' },
        { icon: WaterIcon, name: 'Water Treatment', desc: 'Filtration & purification' },
        { icon: FertIcon, name: 'Fertilizer', desc: 'Acid plants, storage' },
        { icon: MiningIcon, name: 'Mining', desc: 'Leaching, flotation' },
        { icon: PharmaIcon, name: 'Pharmaceutical', desc: 'Clean rooms, vessels' },
        { icon: FoodIcon, name: 'Food & Beverage', desc: 'Sanitary processing' },
    ];

    return (
        <section className="s4 eng-grid" ref={sectionRef}>
            <div className="s4-spot" ref={spotRef}></div>
            <div className="s4-inner">
                <div className="s4-head">
                    <div className="s4-head-l">
                        <div className="s4-over">Industries</div>
                        <h2 className="s4-h2">Built for the <em>harshest</em> environments</h2>
                    </div>
                    <Link className="s4-link" to="/industries">
                        View All Industries
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                <div className="ind-grid" ref={gridRef}>
                    {industries.map((ind, i) => (
                        <IndustryCard key={ind.name} {...ind} delay={i * 70} />
                    ))}
                </div>
            </div>
        </section>
    );
});

Industries.displayName = 'Industries';
export default Industries;
