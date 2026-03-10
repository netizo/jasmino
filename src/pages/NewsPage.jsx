import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { newsArticles } from '../data/news';
import { gsap } from '../hooks/useGsap';
import '../styles/news-page.css';

const CATEGORIES = ['All', 'Projects', 'Certifications', 'Events'];
const PER_PAGE = 6;

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function NewsCard({ article }) {
  return (
    <article className="np-card">
      <div className="np-card-photo">
        <img src={article.img} alt={article.title} loading="lazy" />
        <span className="np-card-cat">{article.category}</span>
      </div>
      <div className="np-card-body">
        <time className="np-card-date" dateTime={article.date}>
          {formatDate(article.date)}
        </time>
        <h3 className="np-card-title">{article.title}</h3>
        <p className="np-card-excerpt">{article.excerpt}</p>
        <span className="np-card-link">Read More &rarr;</span>
      </div>
    </article>
  );
}

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [page, setPage] = useState(1);
  const gridRef = useRef(null);

  const filtered = useMemo(
    () =>
      activeTab === 'All'
        ? newsArticles
        : newsArticles.filter((a) => a.category === activeTab),
    [activeTab]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  /* ── GSAP card stagger on page/tab change ── */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll('.np-card');
    if (!cards.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(cards,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.07 }
    );
  }, [page, activeTab]);

  return (
    <div className="np">
      {/* Hero */}
      <section className="np-hero">
        <div className="np-hero-grid" />
        <div className="np-hero-inner">
          <nav className="np-crumb">
            <Link to="/">Home</Link>
            <span className="np-sep">/</span>
            <span className="np-cur">News</span>
          </nav>
          <h1 className="np-hero-h">
            Latest <em>news</em> &amp; updates
          </h1>
          <p className="np-hero-desc">
            Project deliveries, certifications, and events from across the Jasmino Group.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="np-body">
        <div className="np-body-inner">
          {/* Filter Tabs */}
          <div className="np-tabs" role="tablist" aria-label="Filter news by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeTab === cat}
                className={`np-tab${activeTab === cat ? ' np-tab--active' : ''}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Card Grid */}
          <div className="np-grid" ref={gridRef}>
            {paged.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
            {paged.length === 0 && (
              <p className="np-empty">No articles found in this category.</p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="np-pagination" aria-label="Pagination">
              <button
                className="np-page-btn"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                aria-label="Previous page"
              >
                &larr; Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  className={`np-page-num${n === page ? ' np-page-num--active' : ''}`}
                  onClick={() => setPage(n)}
                  aria-label={`Page ${n}`}
                  aria-current={n === page ? 'page' : undefined}
                >
                  {n}
                </button>
              ))}
              <button
                className="np-page-btn"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                aria-label="Next page"
              >
                Next &rarr;
              </button>
            </nav>
          )}
        </div>
      </section>
    </div>
  );
}
