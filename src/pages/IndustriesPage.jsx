import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/industries-page.css';

const INDUSTRIES = [
  {
    name: 'Chemical',
    slug: 'chemical',
    span: 2,
    description: 'Reactors, storage tanks, heat exchangers, and complete piping systems engineered for aggressive chemical environments — HCl, H₂SO₄, NaOH, and organic solvents.',
    tags: ['Reactors', 'Agitators', 'Piping Systems', 'Storage Tanks'],
    photo: '/images/ind-01.webp',
  },
  {
    name: 'Petrochemical',
    slug: 'petrochemical',
    span: 1,
    description: 'High-pressure vessels and columns for refining, cracking, and polymer production under extreme temperature and pressure conditions.',
    tags: ['Pressure Vessels', 'Columns', 'Exchangers'],
    photo: '/images/ind-07.webp',
  },
  {
    name: 'Power Generation',
    slug: 'power',
    span: 1,
    description: 'FGD absorbers, boiler components, cooling water systems, and wet electrostatic precipitators for thermal and nuclear power plants.',
    tags: ['FGD', 'Boilers', 'Cooling Towers', 'WESP'],
    photo: '/images/ind-03.webp',
  },
  {
    name: 'Water Treatment',
    slug: 'water-treatment',
    span: 1,
    description: 'Complete ETP/STP packages, filtration vessels, clarifiers, and aeration systems — from process design through commissioning.',
    tags: ['Filtration', 'ETP/STP', 'Clarifiers', 'RO Systems'],
    photo: '/images/ind-06.webp',
  },
  {
    name: 'Fertilizer',
    slug: 'fertilizer',
    span: 1,
    description: 'Acid-resistant storage farms, phosphoric acid reactors, ammonium sulphate crystallizers, and granulation equipment with long-term corrosion protection.',
    tags: ['Acid Plants', 'Storage Farms', 'Crystallizers'],
    photo: '/images/ind-04.webp',
  },
  {
    name: 'Mining & Metals',
    slug: 'mining',
    span: 2,
    description: 'Leaching vessels, flotation cells, electro-winning tanks, and rubber-lined slurry piping engineered to withstand extreme abrasion and chemical attack.',
    tags: ['Leaching', 'Flotation', 'Electro-winning', 'Slurry Pipes'],
    photo: '/images/ind-05.webp',
  },
  {
    name: 'Pulp & Paper',
    slug: 'pulp-paper',
    span: 1,
    description: 'Digesters, bleach towers, and chemical recovery equipment with corrosion-resistant linings for the harshest pulping environments.',
    tags: ['Digesters', 'Bleach Towers', 'Recovery'],
    photo: '/images/ind-08.webp',
  },
  {
    name: 'Pharmaceuticals',
    slug: 'pharma',
    span: 1,
    description: 'Glass-lined and PTFE-lined reaction vessels, solvent recovery systems, and high-purity piping for API manufacturing and formulation.',
    tags: ['Reaction Vessels', 'Solvent Recovery', 'HP Piping'],
    photo: '/images/ind-02.webp',
  },
];

function IndustryCard({ name, description, tags, photo, span }) {
  return (
    <article className={`ip-card${span === 2 ? ' ip-card-span2' : ''}`}>
      <div className="ip-card-bg" style={{ backgroundImage: `url(${photo})` }} />
      <div className="ip-card-overlay" />
      <div className="ip-card-content">
        <div className="ip-card-name">{name}</div>
        <p className="ip-card-desc">{description}</p>
        <div className="ip-card-tags">
          {tags.map((t) => (
            <span key={t} className="ip-tag">{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function IndustriesPage() {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const cards = grid.querySelectorAll('.ip-card');
            cards.forEach((c, i) => setTimeout(() => c.classList.add('vis'), i * 80));
            obs.unobserve(grid);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(grid);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="ip">
      {/* Hero */}
      <section className="ip-hero">
        <div className="ip-hero-grid" />
        <div className="ip-hero-inner">
          <nav className="ip-crumb">
            <Link to="/">Home</Link>
            <span className="ip-sep">/</span>
            <span className="ip-cur">Industries</span>
          </nav>
          <h1 className="ip-hero-h">
            Built for the <em>harshest</em> environments
          </h1>
          <p className="ip-hero-desc">
            From chemical processing to power generation — our integrated design-build-protect approach serves the industries where equipment failure is not an option.
          </p>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="ip-grid-section">
        <div className="ip-grid-inner">
          <div className="ip-grid" ref={gridRef}>
            {INDUSTRIES.map((ind) => (
              <IndustryCard key={ind.slug} {...ind} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
