import { useEffect, useRef, useCallback, useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import CountUp from '../components/CountUp';
import HeroParticles from '../components/HeroParticles';
import '../styles/about-page.css';

const GlobalPresence = lazy(() => import('../components/GlobalPresence'));

/* ─── Timeline data ─── */
const timelineCards = [
  { ghost: '84', year: '1984', title: 'Founded in Ahmedabad', desc: 'Jasmino established as an engineering-led equipment manufacturer. One workshop. One vision: integrate design and fabrication.', img: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&h=200&fit=crop' },
  { ghost: '96', year: '1996', title: 'Corrosion Division Added', desc: 'Rubber lining capability established \u2014 closing the design \u2192 build \u2192 protect loop. The integrated model is born.', img: 'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=400&h=200&fit=crop' },
  { ghost: '04', year: '2004', title: 'Major Expansion', desc: 'Shop floor grows to 80,000+ m\u00B2. ASME U, U2, and R stamp certifications secured. International projects begin.', img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=200&fit=crop' },
  { ghost: '08', year: '2008', title: 'HAW Acquisition', desc: 'Acquired German lining specialist HAW GmbH \u2014 gaining 40+ years of European corrosion protection expertise and market access.', img: 'https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=400&h=200&fit=crop' },
  { ghost: '15', year: '2015', title: 'GBT Turkey Established', desc: 'Launched GBT in Turkey \u2014 extending lining and coating services into Central Asian and Middle Eastern markets.', img: 'https://images.unsplash.com/photo-1590846083693-f23fdede3a7e?w=400&h=200&fit=crop' },
  { ghost: '25', year: 'Today', title: 'Global Integrated Enterprise', desc: 'Three continents. 15+ countries. 130,000+ m\u00B2 combined capacity. Four divisions. One standard. Zero handoffs.', img: 'https://images.unsplash.com/photo-1581093806997-124204d9fa9d?w=400&h=200&fit=crop' },
];

const values = [
  { num: '01', tag: 'Principle 01', title: 'Design for fabrication.', desc: "Every engineering decision is made with manufacturing constraints in mind. The drawing isn't done until the shop floor says it's buildable.", img: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=900&h=600&fit=crop' },
  { num: '02', tag: 'Principle 02', title: 'Protect from day one.', desc: "Corrosion protection isn't an afterthought. Lining requirements inform steel selection, weld prep, and surface finish from the first specification.", img: 'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=900&h=600&fit=crop' },
  { num: '03', tag: 'Principle 03', title: 'Own the outcome.', desc: "One company, one contract, one point of accountability. When something goes wrong, there's no one else to blame \u2014 and that's exactly how we want it.", img: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=900&h=600&fit=crop' },
];

const certs = [
  { name: 'ASME', desc: 'U, U2, R Stamps' },
  { name: 'API', desc: '620 / 650 Tanks' },
  { name: 'PED', desc: 'EU Pressure Dir.' },
  { name: 'ISO', desc: '9001 \u00B7 14001 \u00B7 45001' },
  { name: 'T\u00DCV', desc: 'Certified Inspection' },
  { name: 'BV', desc: 'Bureau Veritas' },
];

export default function AboutPage() {
  const imgRevealRef = useRef(null);
  const timelineScrollRef = useRef(null);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0 });
  const [activeTimelineIdx, setActiveTimelineIdx] = useState(0);

  /* ─── Image reveal observer ─── */
  useEffect(() => {
    const irEl = imgRevealRef.current;
    if (irEl) {
      const irObs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { irEl.classList.add('revealed'); irObs.unobserve(irEl); } },
        { threshold: 0.3 }
      );
      irObs.observe(irEl);
      return () => irObs.disconnect();
    }
  }, []);

  /* ─── Timeline drag-to-scroll ─── */
  const onTlMouseDown = useCallback((e) => {
    const el = timelineScrollRef.current;
    if (!el) return;
    dragState.current = { isDown: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft };
    el.classList.add('dragging');
  }, []);

  const onTlMouseUp = useCallback(() => {
    dragState.current.isDown = false;
    timelineScrollRef.current?.classList.remove('dragging');
  }, []);

  const onTlMouseMove = useCallback((e) => {
    if (!dragState.current.isDown) return;
    e.preventDefault();
    const el = timelineScrollRef.current;
    const x = e.pageX - el.offsetLeft;
    el.scrollLeft = dragState.current.scrollLeft - (x - dragState.current.startX) * 1.5;
  }, []);

  const updateTimelineDots = useCallback(() => {
    const el = timelineScrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('.timeline-card');
    if (!cards.length) return;
    const cardW = cards[0].offsetWidth + 24;
    const idx = Math.round(el.scrollLeft / cardW);
    setActiveTimelineIdx(Math.max(0, Math.min(idx, cards.length - 1)));
  }, []);

  useEffect(() => {
    const el = timelineScrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateTimelineDots, { passive: true });
    return () => el.removeEventListener('scroll', updateTimelineDots);
  }, [updateTimelineDots]);

  const scrollTimeline = useCallback((dir) => {
    const el = timelineScrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('.timeline-card');
    if (!cards.length) return;
    const cardW = cards[0].offsetWidth + 24;
    el.scrollBy({ left: dir * cardW, behavior: 'smooth' });
  }, []);

  return (
    <div className="about-page">
      {/* ═══ HERO ═══ */}
      <section className="hero">
        <HeroParticles
          particleColor="rgba(4,229,134,"
          connectionColor="rgba(4,229,134,"
          mouseMode="attract"
          maxParticles={120}
        />
        <div className="hero-photo" />
        <div className="hero-grid eng-grid-dark" />
        <div className="hero-content">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            Established 1984
          </div>
          <h1 className="hero-h1">
            <span className="hl"><span className="hl-inner">Four decades of</span></span>
            <span className="hl"><span className="hl-inner"><em>engineering</em></span></span>
            <span className="hl"><span className="hl-inner"><span className="thin">what endures.</span></span></span>
          </h1>
          <p className="hero-sub">
            Jasmino Corporation began with a single conviction: the company that designs the equipment should also build it &mdash; and protect it. That principle became a global enterprise.
          </p>
          <div className="hero-metrics">
            <div className="hero-metric"><span className="hero-metric-num">1984</span><span className="hero-metric-label">Founded</span></div>
            <div className="hero-metric"><span className="hero-metric-num">15+</span><span className="hero-metric-label">Countries</span></div>
            <div className="hero-metric"><span className="hero-metric-num">130K</span><span className="hero-metric-label">m&sup2; Capacity</span></div>
          </div>
        </div>
        <div className="hero-stamp">
          <svg width="192" height="192" viewBox="0 0 192 192" fill="none">
            <circle cx="96" cy="96" r="90" stroke="rgba(4,229,134,0.06)" strokeWidth="1" strokeDasharray="4 6" />
          </svg>
          <span className="hero-stamp-num">40+</span>
          <span className="hero-stamp-label">Years of<br/>Excellence</span>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ═══ MANIFESTO ═══ */}
      <section className="manifesto eng-grid">
        <div className="manifesto-inner">
          <ScrollReveal>
            <div className="overline">Our Story</div>
            <h2>We didn&rsquo;t set out to build a <em>conglomerate.</em><br/>We set out to solve a problem.</h2>
            <p className="manifesto-p">
              In 1984, the industrial equipment supply chain was fragmented. Design firms handed off drawings they&rsquo;d never build. Fabricators welded steel they didn&rsquo;t engineer. Lining contractors coated surfaces they didn&rsquo;t understand. <strong>Every handoff was a failure point.</strong>
            </p>
            <p className="manifesto-p">
              Jasmino was founded on the idea that one company &mdash; with deep expertise in engineering, fabrication, and corrosion protection &mdash; could do it better. Not by being bigger, but by being <strong>more integrated.</strong>
            </p>
            <div className="manifesto-q">
              &ldquo;The person who designs the equipment should stand next to the person who builds it &mdash; and the person who protects it.&rdquo;
            </div>
          </ScrollReveal>
          <ScrollReveal delay={240}>
            <div className="img-reveal" ref={imgRevealRef}>
              <img src="https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=800&h=1000&fit=crop&crop=center" alt="Engineering workshop" loading="lazy" />
              <div className="img-reveal-frame" />
              <div className="img-reveal-caption">
                <span className="caption-dot" />
                Jasmino engineering workshop &middot; Ahmedabad, India
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ PHOTO BREAK ═══ */}
      <div className="photo-break">
        <img
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1800&h=900&fit=crop&crop=center"
          alt="Manufacturing floor"
          loading="lazy"
        />
        <div className="photo-break-caption">
          <span className="caption-dot" />
          <span>Fabrication floor &middot; 130,000+ m&sup2; combined capacity</span>
          <div className="photo-break-line" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.15)' }}>Jasmino Corporation</span>
        </div>
      </div>

      {/* ═══ EDITORIAL QUOTE ═══ */}
      <ScrollReveal>
        <section className="editorial-quote eng-grid">
          <div className="eq-ghost">&ldquo;</div>
          <div className="eq-inner">
            <span className="eq-mark">&ldquo;</span>
            <p className="eq-text">
              Integration isn&rsquo;t a marketing claim. It&rsquo;s how we eliminated the gaps where projects fail. When the designer stands next to the fabricator, decisions are better. When the lining contractor is in the same building, nothing gets lost in translation.
            </p>
            <div className="eq-attr">&mdash; Founding principle, Jasmino Corporation</div>
          </div>
        </section>
      </ScrollReveal>

      {/* ═══ TIMELINE ═══ */}
      <section className="timeline-section eng-grid">
        <div className="timeline-header-bar">
          <ScrollReveal>
            <div className="timeline-header">
              <div className="overline overline-center">Four Decades</div>
              <h2>A history built on <em>integration</em></h2>
            </div>
          </ScrollReveal>
          <div className="timeline-controls">
            <span className="timeline-counter">{activeTimelineIdx + 1} / {timelineCards.length}</span>
            <button className="timeline-btn" onClick={() => scrollTimeline(-1)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <button className="timeline-btn" onClick={() => scrollTimeline(1)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        <div
          className="timeline-scroll"
          ref={timelineScrollRef}
          onMouseDown={onTlMouseDown}
          onMouseUp={onTlMouseUp}
          onMouseLeave={onTlMouseUp}
          onMouseMove={onTlMouseMove}
        >
          {timelineCards.map((card) => (
            <div className="timeline-card" key={card.year}>
              <div className="tl-ghost">{card.ghost}</div>
              <img className="tl-img" src={card.img} alt={card.title} loading="lazy" />
              <div className="tl-year">{card.year}</div>
              <div className="tl-title">{card.title}</div>
              <div className="tl-desc">{card.desc}</div>
            </div>
          ))}
        </div>

        <div className="timeline-dots">
          {timelineCards.map((card, i) => (
            <div
              key={card.year}
              className={`timeline-dot-indicator${activeTimelineIdx === i ? ' active' : ''}`}
              onClick={() => {
                const el = timelineScrollRef.current;
                if (!el) return;
                const cards = el.querySelectorAll('.timeline-card');
                if (!cards.length) return;
                const cardW = cards[0].offsetWidth + 24;
                el.scrollTo({ left: i * cardW, behavior: 'smooth' });
              }}
            />
          ))}
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section className="values eng-grid">
        <div className="values-inner">
          <ScrollReveal>
            <div className="values-header">
              <div className="overline">What Drives Us</div>
              <h2>Three principles, one <em>standard</em></h2>
              <p>These aren&rsquo;t framed on a wall. They&rsquo;re built into every engineering decision, every weld, and every lining application.</p>
            </div>
          </ScrollReveal>
        </div>
        {values.map((v) => (
          <ScrollReveal key={v.num}>
            <div className="value-row">
              <div className="value-row-img">
                <img src={v.img} alt={v.title} loading="lazy" />
                <div className="value-row-num">{v.num}</div>
              </div>
              <div className="value-row-text">
                <div className="value-row-tag">{v.tag}</div>
                <h3 className="value-row-title">{v.title}</h3>
                <p className="value-row-desc">{v.desc}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </section>

      {/* ═══ GLOBE ═══ */}
      <Suspense fallback={null}>
        <GlobalPresence />
      </Suspense>

      {/* ═══ STATS ═══ */}
      <section className="stats">
        <div className="stats-inner">
          <ScrollReveal>
            <div style={{ textAlign: 'center' }}>
              <div className="stat-num"><CountUp target="40+" /></div>
              <div className="stat-label">Years of Operation</div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div style={{ textAlign: 'center' }}>
              <div className="stat-num"><CountUp target="15+" /></div>
              <div className="stat-label">Countries Served</div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <div style={{ textAlign: 'center' }}>
              <div className="stat-num"><CountUp target="130K+" /></div>
              <div className="stat-label">m&sup2; Total Capacity</div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={240}>
            <div style={{ textAlign: 'center' }}>
              <div className="stat-num"><CountUp target="97%" /></div>
              <div className="stat-label">Reorder Rate</div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ CERTIFICATIONS ═══ */}
      <section className="certs eng-grid">
        <div className="certs-inner">
          <ScrollReveal>
            <div className="certs-header">
              <div className="overline overline-center">Standards & Heritage</div>
              <h2>Certified to the standards that <em>matter</em></h2>
            </div>
          </ScrollReveal>
          <div className="cert-grid">
            {certs.map((c, i) => (
              <ScrollReveal key={c.name} delay={i * 80}>
                <div className="cert-box">
                  <div className="cert-box-name">{c.name}</div>
                  <div className="cert-box-desc">{c.desc}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="heritage-grid">
            <ScrollReveal>
              <div className="heritage-card">
                <div className="heritage-logo">HAW</div>
                <div>
                  <div className="heritage-name">HAW Linings GmbH</div>
                  <div className="heritage-desc">German corrosion protection specialist, est. 1968. 40+ years of European rubber and plastic lining expertise.</div>
                  <div className="heritage-tag">Germany &middot; Est. 1968</div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div className="heritage-card">
                <div className="heritage-logo">GBT</div>
                <div>
                  <div className="heritage-name">GBT Corrosion Protection</div>
                  <div className="heritage-desc">Turkish operations hub extending Jasmino&rsquo;s services into Central Asia, Middle East, and CIS markets.</div>
                  <div className="heritage-tag">Turkey &middot; Est. 2015</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <ScrollReveal>
        <section className="cta">
          <div className="cta-inner">
            <div className="cta-grid eng-grid-dark" />
            <div className="cta-content">
              <div>
                <h2>Ready to see how integration <em>works?</em></h2>
                <p>Share your requirements. We&rsquo;ll show you how one company &mdash; and zero handoffs &mdash; eliminates the gaps where projects fail.</p>
              </div>
              <div className="cta-actions">
                <Link to="/contact" className="btn btn-primary">
                  Get in Touch
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
                <Link to="/what-we-do" className="btn btn-secondary">What We Do</Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <div style={{ height: 80, background: 'var(--surface)' }} />
    </div>
  );
}
