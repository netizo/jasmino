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
    photo: 'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=400&h=300&q=75&fit=crop',
  },
  {
    name: 'Petrochemical',
    slug: 'petrochemical',
    span: 1,
    description: 'High-pressure vessels and columns for refining, cracking, and polymer production under extreme temperature and pressure conditions.',
    tags: ['Pressure Vessels', 'Columns', 'Exchangers'],
    photo: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=300&q=75&fit=crop',
  },
  {
    name: 'Power Generation',
    slug: 'power',
    span: 1,
    description: 'FGD absorbers, boiler components, cooling water systems, and wet electrostatic precipitators for thermal and nuclear power plants.',
    tags: ['FGD', 'Boilers', 'Cooling Towers', 'WESP'],
    photo: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&q=75&fit=crop',
  },
  {
    name: 'Water Treatment',
    slug: 'water-treatment',
    span: 1,
    description: 'Complete ETP/STP packages, filtration vessels, clarifiers, and aeration systems — from process design through commissioning.',
    tags: ['Filtration', 'ETP/STP', 'Clarifiers', 'RO Systems'],
    photo: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&q=75&fit=crop',
  },
  {
    name: 'Fertilizer',
    slug: 'fertilizer',
    span: 1,
    description: 'Acid-resistant storage farms, phosphoric acid reactors, ammonium sulphate crystallizers, and granulation equipment with long-term corrosion protection.',
    tags: ['Acid Plants', 'Storage Farms', 'Crystallizers'],
    photo: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&q=75&fit=crop',
  },
  {
    name: 'Mining & Metals',
    slug: 'mining',
    span: 2,
    description: 'Leaching vessels, flotation cells, electro-winning tanks, and rubber-lined slurry piping engineered to withstand extreme abrasion and chemical attack.',
    tags: ['Leaching', 'Flotation', 'Electro-winning', 'Slurry Pipes'],
    photo: 'https://images.unsplash.com/photo-1541888946428-d63bb8f8377a?w=400&h=300&q=75&fit=crop',
  },
  {
    name: 'Pulp & Paper',
    slug: 'pulp-paper',
    span: 1,
    description: 'Digesters, bleach towers, and chemical recovery equipment with corrosion-resistant linings for the harshest pulping environments.',
    tags: ['Digesters', 'Bleach Towers', 'Recovery'],
    photo: 'https://images.unsplash.com/photo-1590074072786-a66914d668f1?w=400&h=300&q=75&fit=crop',
  },
  {
    name: 'Pharmaceuticals',
    slug: 'pharma',
    span: 1,
    description: 'Glass-lined and PTFE-lined reaction vessels, solvent recovery systems, and high-purity piping for API manufacturing and formulation.',
    tags: ['Reaction Vessels', 'Solvent Recovery', 'HP Piping'],
    photo: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=300&q=75&fit=crop',
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
