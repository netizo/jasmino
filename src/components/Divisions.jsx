import React from 'react';
import { Link } from 'react-router-dom';
import { divisions } from '../data/divisions';
import { useStagger } from '../hooks/useGsap';
import '../styles/divisions.css';

const DIVISION_PHOTOS = {
  mfg: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=300&q=75&fit=crop',
  cor: 'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=400&h=300&q=75&fit=crop',
  rub: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&q=75&fit=crop',
};

// Map local IDs to divisions.js slugs
const SLUG_MAP = {
  eng: 'engineering-design',
  mfg: 'equipment-manufacturing',
  cor: 'corrosion-protection',
  rub: 'rubber-products',
};

const CARDS = [
  { id: 'eng', num: '01', title: 'Engineering Design', to: '/what-we-do/engineering-design' },
  { id: 'mfg', num: '02', title: 'Manufacturing', to: '/what-we-do/equipment-manufacturing' },
  { id: 'cor', num: '03', title: 'Corrosion Protection', to: '/what-we-do/corrosion-protection' },
  { id: 'rub', num: '04', title: 'Rubber Products', to: '/what-we-do/rubber-products' },
];

// Get full division data by local id
function getDivData(id) {
  return divisions.find(d => d.slug === SLUG_MAP[id]);
}

const Divisions = React.memo(() => {
  const cardsRef = useStagger('.div-card', { stagger: 0.12, y: 40 });

  return (
    <section className="eng-grid">
      <div className="s2">
        <div className="s2-header">
          <h2 className="s2-title">Four divisions, one<br /><em>integrated</em> model</h2>
          <p className="s2-subtitle">Every project benefits from design intelligence, manufacturing scale, and corrosion protection expertise working as one team.</p>
        </div>
        <div className="div-cards-v2" ref={cardsRef}>
          {CARDS.map((card) => {
            const data = getDivData(card.id);
            const isEng = card.id === 'eng';

            return (
              <div key={card.id} className={`div-card div-card-${card.id}`}>
                {/* Photo/visual panel */}
                {isEng ? (
                  <div
                    className="div-visual-photo"
                    style={{ background: 'linear-gradient(135deg, var(--navy), var(--dark, #0c1a2e))' }}
                  >
                    <div className="div-visual-photo-overlay" />
                    <div className="div-visual-photo-caption">
                      <span className="div-caption-dot" />
                      <span>{card.num} — {card.title}</span>
                    </div>
                  </div>
                ) : (
                  <div className="div-visual-photo" style={{ backgroundImage: `url(${DIVISION_PHOTOS[card.id]})` }}>
                    <div className="div-visual-photo-overlay" />
                    <div className="div-visual-photo-caption">
                      <span className="div-caption-dot" />
                      <span>{card.num} — {card.title}</span>
                    </div>
                  </div>
                )}

                {/* Content panel */}
                <div className="div-content">
                  <div className="div-number">{card.num}</div>
                  <h3 className="div-title">{card.title}</h3>

                  {/* Stat callout */}
                  {data?.stats?.[0] && (
                    <div className="div-stat-inline">
                      <span className="num">{data.stats[0].num}</span>
                      <span className="label">{data.stats[0].label}</span>
                    </div>
                  )}

                  <p className="div-desc">{data?.description || card.title}</p>

                  {/* Service pills */}
                  {data?.services && (
                    <div className="div-pills">
                      {data.services.map(s => (
                        <Link
                          key={s.slug}
                          to={`/what-we-do/${data.slug}/${s.slug}`}
                          className="div-pill"
                        >
                          <span>{s.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}

                  <Link to={card.to} className="div-link">Explore capabilities →</Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

Divisions.displayName = 'Divisions';
export default Divisions;
