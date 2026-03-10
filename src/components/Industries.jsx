import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/industries.css';

const INDUSTRIES = [
  {
    name: 'Chemical',
    subtitle: 'Reactors, tanks, piping',
    photo: 'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=400&h=300&q=75&fit=crop',
  },
  {
    name: 'Petrochemical',
    subtitle: 'Refining & processing',
    photo: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=300&q=75&fit=crop',
  },
  {
    name: 'Power Generation',
    subtitle: 'Boilers, FGD, cooling',
    photo: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&q=75&fit=crop',
  },
  {
    name: 'Water Treatment',
    subtitle: 'Filtration & purification',
    photo: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&q=75&fit=crop',
  },
  {
    name: 'Fertilizer',
    subtitle: 'Acid plants, storage',
    photo: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&q=75&fit=crop',
  },
  {
    name: 'Mining & Metals',
    subtitle: 'Leaching, flotation',
    photo: 'https://images.unsplash.com/photo-1541888946428-d63bb8f8377a?w=400&h=300&q=75&fit=crop',
  },
  {
    name: 'Pulp & Paper',
    subtitle: 'Digesters, bleach towers',
    gradient: 'linear-gradient(135deg, #0B1D34 0%, #1B4B8F 100%)',
  },
  {
    name: 'Food & Beverage',
    subtitle: 'Processing equipment',
    photo: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=400&h=300&q=75&fit=crop',
  },
  {
    name: 'Pharmaceuticals',
    subtitle: 'Reaction vessels, HP piping',
    photo: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=300&q=75&fit=crop',
  },
];

const ICONS = {
  Chemical: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6M10 3v6.5L6 18a1 1 0 001 1h10a1 1 0 001-1l-4-8.5V3" />
      <path d="M8.5 14h7" />
    </svg>
  ),
  Petrochemical: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="10" width="4" height="11" rx="0.5" />
      <rect x="10" y="6" width="4" height="15" rx="0.5" />
      <rect x="16" y="3" width="4" height="18" rx="0.5" />
      <path d="M6 10V7a2 2 0 012-2h0" /><path d="M12 6V4a2 2 0 012-2h0" />
    </svg>
  ),
  'Power Generation': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  'Water Treatment': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C12 2 5 10 5 14a7 7 0 0014 0C19 10 12 2 12 2z" />
      <path d="M8 16a4 4 0 008 0" />
    </svg>
  ),
  Fertilizer: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12" /><path d="M12 12C12 8 8 6 4 6c0 4 2 8 8 6" /><path d="M12 12c0-4 4-6 8-6 0 4-2 8-8 6" />
      <path d="M12 8V2" />
    </svg>
  ),
  'Mining & Metals': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2l-3 5h6l-3 5h6l-8 10 2-7H8l2-6H4l6-7h4z" />
    </svg>
  ),
  'Pulp & Paper': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="13" y2="17" />
    </svg>
  ),
  'Food & Beverage': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  Pharmaceuticals: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19.5 4.5l-15 15" /><circle cx="12" cy="12" r="9" />
      <path d="M4.5 19.5C7 17 10 14 12 12" />
    </svg>
  ),
};

const BentoCard = ({ name, subtitle, photo, gradient }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate('/industries');
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); }
  };

  return (
    <div
      className="bento-card"
      role="link"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {photo ? (
        <>
          <div className="bento-bg" style={{ backgroundImage: `url(${photo})` }} />
          <div className="bento-overlay" />
        </>
      ) : (
        <div className="bento-gradient-bg" style={{ background: gradient }} />
      )}
      <div className="bento-card-grid" />
      <div className="bento-arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>
      <div className="bento-content">
        <div className="bento-icon">{ICONS[name]}</div>
        <div className="bento-name">{name}</div>
        <div className="bento-sub">{subtitle}</div>
      </div>
    </div>
  );
};

const Industries = React.memo(() => {
  const sectionRef = useRef(null);
  const spotRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
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
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll('.bento-card');
    if (!cards.length) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    cards.forEach((c, i) => {
      c.style.transitionDelay = `${i * 60}ms`;
      obs.observe(c);
    });

    return () => obs.disconnect();
  }, []);

  return (
    <section className="s4 eng-grid" ref={sectionRef}>
      <div className="s4-spot" ref={spotRef} />
      <div className="s4-inner">
        <div className="s4-head">
          <div className="s4-head-l">
            <div className="s4-over">Industries</div>
            <h2 className="s4-h2">Built for the <em>harshest</em> environments</h2>
          </div>
          <Link className="s4-link" to="/industries">
            View All Industries →
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="bento" ref={gridRef}>
          {INDUSTRIES.map((ind) => (
            <BentoCard key={ind.name} {...ind} />
          ))}
        </div>
      </div>
    </section>
  );
});

Industries.displayName = 'Industries';
export default Industries;
