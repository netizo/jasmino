import { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import HeroParticles from '../components/HeroParticles';
import '../styles/what-we-do-page.css';

/* ─── Integration model data ─── */
const modelTabs = [
  {
    num: 'Stage 01', title: 'Design', sub: 'Engineering Division',
    paneOverline: 'Stage 01 \u2014 Design',
    paneTitle: 'Engineering designs with fabrication and lining constraints baked in from day one',
    paneDesc: "Our design engineers know the manufacturing tolerances, the lining thicknesses, the nozzle orientations that make autoclave access possible. These aren\u2019t afterthoughts \u2014 they\u2019re inputs to the first sketch.",
    pills: [
      { label: 'Process & Plant Design', to: '/what-we-do/engineering-design/process-plant-design' },
      { label: 'Equipment Design', to: '/what-we-do/engineering-design/equipment-design' },
      { label: 'Piping Design', to: '/what-we-do/engineering-design/piping-design' },
      { label: 'Water Treatment', to: '/what-we-do/engineering-design/water-treatment' },
    ],
    handoffLabel: 'Feeds into next stage',
    handoff: '<strong>3D model + fabrication drawings</strong> transfer directly to the shop floor. Manufacturing works from the same data \u2014 no re-drafting, no interpretation gaps.',
  },
  {
    num: 'Stage 02', title: 'Fabricate', sub: 'Manufacturing Division',
    paneOverline: 'Stage 02 \u2014 Fabricate',
    paneTitle: 'Fabrication works from original design data \u2014 no re-interpretation',
    paneDesc: "The shop floor receives the same 3D model that engineering created. Weld seam placement is coordinated with the lining team \u2014 positioned where rubber overlap is strongest, not where it\u2019s convenient for welding.",
    pills: [
      { label: 'Steel Equipment', to: '/what-we-do/equipment-manufacturing/steel-equipment' },
      { label: 'Plastic & FRP', to: '/what-we-do/equipment-manufacturing/plastic-frp-equipment' },
    ],
    handoffLabel: 'Feeds into next stage',
    handoff: '<strong>Fabricated vessel with coordinated weld seams</strong> moves directly to the lining bay. Surface prep specs are pre-agreed \u2014 no rework, no surprises.',
  },
  {
    num: 'Stage 03', title: 'Protect', sub: 'Corrosion Division',
    paneOverline: 'Stage 03 \u2014 Protect',
    paneTitle: 'Corrosion protection applied by a team that reviewed the engineering from Week 1',
    paneDesc: "Our lining team doesn\u2019t receive a vessel cold. They\u2019ve been involved since design review \u2014 specifying surface prep requirements, lining thicknesses, and nozzle access clearances before fabrication begins.",
    pills: [
      { label: 'Rubber Linings', to: '/what-we-do/corrosion-protection/rubber-linings' },
      { label: 'Plastic Linings', to: '/what-we-do/corrosion-protection/plastic-linings' },
      { label: 'Coatings & Resin', to: '/what-we-do/corrosion-protection/coatings-resin' },
      { label: 'Inspection & Repair', to: '/what-we-do/corrosion-protection/inspection-repair' },
    ],
    handoffLabel: 'Feeds into next stage',
    handoff: '<strong>Lined vessel with spark-tested surfaces</strong> proceeds to final QA. The compound used was developed in-house by the Rubber division specifically for this process environment.',
  },
  {
    num: 'Stage 04', title: 'Compound', sub: 'Rubber Division',
    paneOverline: 'Stage 04 \u2014 Compound',
    paneTitle: 'Rubber compounds formulated for the exact process conditions',
    paneDesc: "While fabrication runs, our rubber division develops or selects the compound \u2014 matched to the chemical environment, temperature range, and abrasion profile. Lab testing runs in parallel, not sequentially.",
    pills: [
      { label: 'Custom Compounds', to: '/what-we-do/rubber-products/custom-compounds' },
      { label: 'Engineered Products', to: '/what-we-do/rubber-products/engineered-products' },
    ],
    handoffLabel: 'Feeds into next stage',
    handoff: '<strong>Tested compound sheets</strong> delivered to the lining bay with full traceability \u2014 batch records, immersion test results, and cure parameters all documented.',
  },
  {
    num: 'Stage 05', title: 'Deliver', sub: 'Quality + Logistics',
    paneOverline: 'Stage 05 \u2014 Deliver',
    paneTitle: 'Final inspection by the same team that designed, built, and lined the vessel',
    paneDesc: "No third-party gaps. The QA team has access to every data point from every stage \u2014 design calculations, material certificates, weld maps, lining spark test records \u2014 in one documentation package.",
    pills: [
      { label: 'QA Documentation', to: '/contact' },
      { label: 'Global Logistics', to: '/contact' },
    ],
    handoffLabel: 'Result',
    handoff: '<strong>One documentation set. One point of accountability.</strong> The client receives a complete package from a single company \u2014 not a patchwork of vendor certificates.',
  },
];

/* ─── Gallery data ─── */
const galleryCards = [
  { img: 'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1400&h=900&fit=crop', tag: 'ENG', tagBg: 'rgba(27,75,143,0.8)', title: '3D Plant Model \u2014 SP3D', sub: 'Chemical Complex \u00B7 Process Engineering' },
  { img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1400&h=900&fit=crop', tag: 'MFG', tagBg: 'rgba(20,50,90,0.8)', title: 'Pressure Vessel Fabrication', sub: 'ASME U-Stamp \u00B7 130,000 m\u00B2 Shop Floor' },
  { img: 'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=1400&h=900&fit=crop', tag: 'COR', tagBg: 'rgba(26,63,115,0.8)', title: 'Rubber Lining Application', sub: 'CSM Lining \u00B7 Autoclave Vulcanisation' },
  { img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1400&h=900&fit=crop', tag: 'RUB', tagBg: 'rgba(15,39,68,0.8)', title: 'Compound Development Lab', sub: '2,000+ Proven Formulations' },
  { img: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1400&h=900&fit=crop', tag: 'QA', tagBg: 'rgba(4,229,134,0.7)', title: 'Final Inspection & Delivery', sub: 'Single Documentation Set \u00B7 One Accountability' },
  { img: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1400&h=900&fit=crop', tag: 'ALL', tagBg: 'rgba(27,75,143,0.8)', title: 'Delivered \u2014 FGD Absorber', sub: '4 Divisions \u00B7 1 Project \u00B7 0 Handoffs' },
];

/* ─── Capability matrix data ─── */
const matrixRows = [
  { cap: 'Process Design (P&IDs, PFDs)', eng: true, mfg: false, cor: false, rub: false },
  { cap: '3D Plant Modelling (SP3D)', eng: true, mfg: false, cor: false, rub: false },
  { cap: 'Pressure Vessel Fabrication', eng: true, mfg: true, cor: false, rub: false },
  { cap: 'FRP / Plastic Equipment', eng: true, mfg: true, cor: false, rub: false },
  { cap: 'Rubber Lining Application', eng: false, mfg: false, cor: true, rub: true },
  { cap: 'Plastic Lining (PVC, PP, PVDF)', eng: false, mfg: false, cor: true, rub: false },
  { cap: 'Custom Compound Development', eng: false, mfg: false, cor: false, rub: true },
  { cap: 'In-Service Inspection & Repair', eng: false, mfg: false, cor: true, rub: false },
  { cap: 'Stress Analysis (CAESAR II, FEA)', eng: true, mfg: false, cor: false, rub: false },
  { cap: 'Water Treatment Systems', eng: true, mfg: true, cor: true, rub: false },
];

const CheckSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>
);

const CornerMark = ({ d, className }) => (
  <div className={`corner-mark ${className}`}>
    <svg viewBox="0 0 24 24" fill="none"><path d={d} stroke="rgba(27,75,143,0.12)" strokeWidth="1"/></svg>
  </div>
);

export default function WhatWeDoPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const galleryRef = useRef(null);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0 });

  /* ─── Gallery drag-to-scroll ─── */
  const onMouseDown = useCallback((e) => {
    const el = galleryRef.current;
    if (!el) return;
    dragState.current = { isDown: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft };
    el.classList.add('dragging');
  }, []);

  const onMouseUp = useCallback(() => {
    dragState.current.isDown = false;
    galleryRef.current?.classList.remove('dragging');
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!dragState.current.isDown) return;
    e.preventDefault();
    const el = galleryRef.current;
    const x = e.pageX - el.offsetLeft;
    el.scrollLeft = dragState.current.scrollLeft - (x - dragState.current.startX) * 1.5;
  }, []);

  /* ─── Gallery scroll tracking ─── */
  const updateGalleryDots = useCallback(() => {
    const el = galleryRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('.gallery-card');
    if (!cards.length) return;
    const cardW = cards[0].offsetWidth + 16;
    const idx = Math.round(el.scrollLeft / cardW);
    setActiveGalleryIdx(Math.max(0, Math.min(idx, cards.length - 1)));
  }, []);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateGalleryDots, { passive: true });
    return () => el.removeEventListener('scroll', updateGalleryDots);
  }, [updateGalleryDots]);

  const scrollGallery = useCallback((dir) => {
    const el = galleryRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('.gallery-card');
    if (!cards.length) return;
    const cardW = cards[0].offsetWidth + 16;
    el.scrollBy({ left: dir * cardW, behavior: 'smooth' });
  }, []);

  const scrollToGalleryIdx = useCallback((i) => {
    const el = galleryRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('.gallery-card');
    if (!cards.length) return;
    const cardW = cards[0].offsetWidth + 16;
    el.scrollTo({ left: i * cardW, behavior: 'smooth' });
  }, []);

  return (
    <div className="wwd-page">
      {/* ═══ HERO ═══ */}
      <section className="hero">
        <HeroParticles
          particleColor="rgba(27,75,143,"
          connectionColor="rgba(27,75,143,"
          mouseMode="repel"
          maxParticles={100}
        />
        <div className="hero-grid eng-grid" />
        <CornerMark d="M2 8V2h6" className="cm-tl" />
        <CornerMark d="M22 8V2h-6" className="cm-tr" />
        <CornerMark d="M2 16v6h6" className="cm-bl" />
        <CornerMark d="M22 16v6h-6" className="cm-br" />

        <div className="hero-content">
          <div className="hero-inner">
            <ScrollReveal>
              <div className="hero-breadcrumb">
                <Link to="/">Home</Link>
                <span className="sep">/</span>
                <span className="cur">What We Do</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <div className="hero-badge">
                <div className="hero-badge-dot" />
                4 Divisions &middot; 12 Services &middot; 1 Company
              </div>
            </ScrollReveal>

            <ScrollReveal delay={160}>
              <h1 className="hero-title">
                The only company that<br/><em>designs, builds, &amp; protects</em><br/>under one roof.
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={240}>
              <p className="hero-desc">
                Most projects need 3&ndash;4 vendors. Each handoff introduces delays, miscommunication, and finger-pointing. We eliminated the handoffs &mdash; and built four divisions that share data, tooling, and accountability.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={320}>
              <div className="hero-actions">
                <a className="btn btn-green" href="#integration">
                  See How It Works
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                </a>
                <Link className="btn btn-outline-lt" to="/contact">Contact Engineering</Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={320}>
              <div className="hero-stats">
                <div><div className="hero-stat-num">4</div><div className="hero-stat-label">Divisions</div></div>
                <div><div className="hero-stat-num">12</div><div className="hero-stat-label">Services</div></div>
                <div><div className="hero-stat-num">1</div><div className="hero-stat-label">Contract</div></div>
                <div><div className="hero-stat-num">0</div><div className="hero-stat-label">Handoffs</div></div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ═══ INTEGRATION MODEL ═══ */}
      <section className="integration" id="integration">
        <div className="integration-grid eng-grid" />
        <div className="integration-inner contain">
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <ScrollReveal>
              <div className="overline overline-center">How It Works</div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 className="sec-title" style={{ color: 'var(--g900)', maxWidth: 540, margin: '0 auto 14px' }}>
                Click each stage to see how <em>capabilities</em> connect
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <p className="sec-desc" style={{ margin: '0 auto' }}>
                Every stage feeds data, constraints, and context to the next. No re-interpretation. No translation loss.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={240}>
            <div className="model">
              <div className="model-nav">
                {modelTabs.map((tab, i) => (
                  <div
                    key={i}
                    className={`model-tab${activeTab === i ? ' active' : ''}`}
                    onClick={() => setActiveTab(i)}
                  >
                    <div className="model-tab-num">{tab.num}</div>
                    <div className="model-tab-title">{tab.title}</div>
                    <div className="model-tab-sub">{tab.sub}</div>
                  </div>
                ))}
              </div>
              <div className="model-panel">
                {modelTabs.map((tab, i) => (
                  <div key={i} className={`model-pane${activeTab === i ? ' active' : ''}`}>
                    <div className="overline" style={{ marginBottom: 8 }}>{tab.paneOverline}</div>
                    <h3 className="model-pane-title">{tab.paneTitle}</h3>
                    <p className="model-pane-desc">{tab.paneDesc}</p>
                    <div className="model-pane-pills">
                      {tab.pills.map((pill) => (
                        <Link key={pill.label} className="model-pane-pill" to={pill.to}>
                          <span>{pill.label}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="model-pane-handoff">
                      <div className="model-pane-handoff-label">{tab.handoffLabel}</div>
                      <div className="model-pane-handoff-text" dangerouslySetInnerHTML={{ __html: tab.handoff }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ GALLERY + PROJECTS ═══ */}
      <section className="evidence eng-grid">
        <div className="evidence-header contain">
          <div className="evidence-header-row">
            <div>
              <ScrollReveal><div className="overline">Proof, Not Promises</div></ScrollReveal>
              <ScrollReveal delay={80}><h2 className="sec-title">See what <em>integration</em> looks like</h2></ScrollReveal>
              <ScrollReveal delay={160}>
                <p className="sec-desc" style={{ marginTop: 8 }}>
                  Real projects, real photos. Every image shows a different division&rsquo;s contribution to the same delivery chain.
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={240}>
              <div className="gallery-controls">
                <span className="gallery-counter">{activeGalleryIdx + 1} / {galleryCards.length}</span>
                <button className="gallery-btn" onClick={() => scrollGallery(-1)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                </button>
                <button className="gallery-btn" onClick={() => scrollGallery(1)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div
          className="gallery-scroll"
          ref={galleryRef}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onMouseMove={onMouseMove}
        >
          {galleryCards.map((card, i) => (
            <div className="gallery-card" key={i}>
              <img src={card.img} alt={card.title} loading="lazy" />

              <div className="gallery-card-tag" style={{ background: card.tagBg, color: card.tag === 'QA' ? 'var(--dark)' : '#fff' }}>
                {card.tag}
              </div>
              <div className="gallery-card-caption">
                <div className="gallery-card-title">{card.title}</div>
                <div className="gallery-card-sub">{card.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-progress" style={{ marginTop: 24 }}>
          {galleryCards.map((_, i) => (
            <div
              key={i}
              className={`gallery-dot${activeGalleryIdx === i ? ' active' : ''}`}
              onClick={() => scrollToGalleryIdx(i)}
            />
          ))}
        </div>

        {/* Project cards */}
        <div className="projects contain">
          <ScrollReveal>
            <div className="projects-label">Featured Projects &mdash; Multiple Divisions Involved</div>
          </ScrollReveal>
          <div className="projects-grid">
            <ScrollReveal delay={80}>
              <div className="proj-card">
                <div className="proj-header">
                  <div>
                    <div className="proj-title">600MW FGD Absorber</div>
                    <div className="proj-location">Coal-Fired Power Plant &middot; Southeast Asia</div>
                  </div>
                  <div className="proj-divisions">
                    <div className="proj-div" style={{ background: 'var(--blue)' }} title="Engineering">E</div>
                    <div className="proj-div" style={{ background: '#14325A' }} title="Manufacturing">M</div>
                    <div className="proj-div" style={{ background: '#1A3F73' }} title="Corrosion">C</div>
                    <div className="proj-div" style={{ background: '#0F2744' }} title="Rubber">R</div>
                  </div>
                </div>
                <p className="proj-desc">
                  Complete design-to-delivery. Engineering designed with lining allowances. Fabrication coordinated weld seams with lining team. CSM compound developed in parallel. 2,400 m&sup2; lined with zero defects.
                </p>
                <div className="proj-stats">
                  <div className="proj-stat"><div className="proj-stat-num">16m</div><div className="proj-stat-label">Diameter</div></div>
                  <div className="proj-stat"><div className="proj-stat-num">2,400</div><div className="proj-stat-label">m&sup2; Lined</div></div>
                  <div className="proj-stat"><div className="proj-stat-num">24</div><div className="proj-stat-label">Weeks</div></div>
                  <div className="proj-stat"><div className="proj-stat-num">0</div><div className="proj-stat-label">Defects</div></div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <div className="proj-card">
                <div className="proj-header">
                  <div>
                    <div className="proj-title">Chlor-Alkali Brine System</div>
                    <div className="proj-location">Chemical Plant &middot; Middle East</div>
                  </div>
                  <div className="proj-divisions">
                    <div className="proj-div" style={{ background: 'var(--blue)' }} title="Engineering">E</div>
                    <div className="proj-div" style={{ background: '#14325A' }} title="Manufacturing">M</div>
                    <div className="proj-div" style={{ background: '#1A3F73' }} title="Corrosion">C</div>
                  </div>
                </div>
                <p className="proj-desc">
                  Complete brine treatment package. Process design, FRP vessels, and PVDF-lined steel tanks. Engineering specified plastic lining from day one &mdash; no post-fabrication surprises.
                </p>
                <div className="proj-stats">
                  <div className="proj-stat"><div className="proj-stat-num">12</div><div className="proj-stat-label">Vessels</div></div>
                  <div className="proj-stat"><div className="proj-stat-num">3</div><div className="proj-stat-label">Materials</div></div>
                  <div className="proj-stat"><div className="proj-stat-num">18</div><div className="proj-stat-label">Weeks</div></div>
                  <div className="proj-stat"><div className="proj-stat-num">97%</div><div className="proj-stat-label">On-Time</div></div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ CAPABILITY MATRIX ═══ */}
      <section className="matrix">
        <div className="matrix-grid eng-grid" />
        <div className="matrix-inner contain">
          <div className="matrix-header">
            <div>
              <ScrollReveal><div className="overline">Capabilities</div></ScrollReveal>
              <ScrollReveal delay={80}>
                <h2 className="sec-title" style={{ color: 'var(--g900)' }}>What each division <em>delivers</em></h2>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={160}>
              <p className="sec-desc" style={{ textAlign: 'right' }}>
                Click any row to jump to the service page for full specifications.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={240}>
            <div style={{ overflowX: 'auto' }}>
              <table className="matrix-table">
                <thead>
                  <tr>
                    <th>Capability</th>
                    <th>Engineering</th>
                    <th>Manufacturing</th>
                    <th>Corrosion</th>
                    <th>Rubber</th>
                  </tr>
                </thead>
                <tbody>
                  {matrixRows.map((row) => (
                    <tr key={row.cap}>
                      <td>{row.cap}</td>
                      {['eng', 'mfg', 'cor', 'rub'].map((key) => (
                        <td key={key}>
                          {row[key]
                            ? <span className="cap-yes"><CheckSvg /></span>
                            : <span className="cap-no">&mdash;</span>
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ CERTIFICATIONS STRIP ═══ */}
      <section className="certs-strip">
        <ScrollReveal>
          <div className="certs-strip-inner contain">
            <div className="certs-left">
              <div>
                <div className="certs-title">International standards. <em>Every</em> facility.</div>
                <div className="certs-list">
                  ASME U/U2/S/R stamps &middot; ISO 9001/14001/45001 &middot; PED/CE marking &middot; API &middot; T&Uuml;V &middot; Bureau Veritas &middot; Lloyd&rsquo;s &middot; DNV
                </div>
              </div>
            </div>
            <Link className="certs-link" to="/about/our-story">
              View All Certifications
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="cta-section">
        <div className="cta-grid eng-grid-dark" />
        <div className="cta-inner contain">
          <div>
            <ScrollReveal>
              <h2 className="cta-title">Ready to discuss your <em>project?</em></h2>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <p className="cta-desc">Share your requirements. We&rsquo;ll show you how integration eliminates gaps.</p>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={160}>
            <div className="cta-actions">
              <Link className="btn btn-green" to="/contact">
                Get in Touch
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link className="btn btn-outline" to="/about/our-story">Download Brochure</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
