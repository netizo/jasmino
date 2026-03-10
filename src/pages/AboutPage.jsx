import { useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import GsapReveal from '../components/GsapReveal';
import CertLogo from '../components/CertLogo';
import CountUp from '../components/CountUp';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, useStagger, useParallax, useImageReveal } from '../hooks/useGsap';
import '../styles/about-page.css';

const GlobalPresence = lazy(() => import('../components/GlobalPresence'));

/* ─── Timeline data ─── */
const timelineCards = [
  { year: '1972', title: 'Founded in Ahmedabad', desc: 'Jasmino established as an engineering-led equipment manufacturer. One workshop. One vision: integrate design and fabrication.', img: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1600&h=900&q=60&fit=crop' },
  { year: '1996', title: 'Corrosion Division Added', desc: 'Rubber lining capability established \u2014 closing the design \u2192 build \u2192 protect loop. The integrated model is born.', img: 'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=1600&h=900&q=60&fit=crop' },
  { year: '2004', title: 'Major Expansion', desc: 'Shop floor grows to 80,000+ m\u00B2. ASME U, U2, and R stamp certifications secured. International projects begin.', img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600&h=900&q=60&fit=crop' },
  { year: '2008', title: 'HAW Acquisition', desc: 'Acquired German lining specialist HAW GmbH \u2014 gaining 40+ years of European corrosion protection expertise and market access.', img: 'https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=1600&h=900&q=60&fit=crop' },
  { year: '2015', title: 'GBT Marl, Germany', desc: 'GBT established in Marl, Germany \u2014 extending lining and coating services into European and adjacent markets.', img: 'https://images.unsplash.com/photo-1590846083693-f23fdede3a7e?w=1600&h=900&q=60&fit=crop' },
  { year: 'Today', title: 'Global Integrated Enterprise', desc: 'Two countries. 15+ countries served. 130,000+ m\u00B2 combined capacity. Four divisions. One standard. Zero handoffs.', img: 'https://images.unsplash.com/photo-1581093806997-124204d9fa9d?w=1600&h=900&q=60&fit=crop' },
];

const values = [
  { num: '01', tag: 'Principle 01', title: 'Design for fabrication.', desc: "Every engineering decision is made with manufacturing constraints in mind. The drawing isn't done until the shop floor says it's buildable.", img: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=600&h=400&q=75&fit=crop' },
  { num: '02', tag: 'Principle 02', title: 'Protect from day one.', desc: "Corrosion protection isn't an afterthought. Lining requirements inform steel selection, weld prep, and surface finish from the first specification.", img: 'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=600&h=400&q=75&fit=crop' },
  { num: '03', tag: 'Principle 03', title: 'Own the outcome.', desc: "One company, one contract, one point of accountability. When something goes wrong, there's no one else to blame \u2014 and that's exactly how we want it.", img: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=600&h=400&q=75&fit=crop' },
];

const certs = [
  { name: 'ASME', desc: 'U, U2, R Stamps', logoKey: 'ASME' },
  { name: 'API', desc: '620 / 650 Tanks', logoKey: 'API' },
  { name: 'PED', desc: 'EU Pressure Dir.', logoKey: 'PED' },
  { name: 'ISO', desc: '9001 \u00B7 14001 \u00B7 45001', logoKey: 'ISO' },
  { name: 'T\u00DCV', desc: 'Certified Inspection', logoKey: 'TÜV' },
  { name: 'BV', desc: 'Bureau Veritas', logoKey: 'BV' },
];

export default function AboutPage() {
  const imgRevealRef = useImageReveal({ direction: 'left' });
  const photoParallaxRef = useParallax({ speed: -50 });
  const statsRef = useStagger('.stat-block', { stagger: 0.1, y: 24 });
  const certGridRef = useStagger('.cert-box', { stagger: 0.08, y: 20 });
  const heritageRef = useStagger('.heritage-card', { stagger: 0.1, y: 24 });
  const heroRef = useRef(null);
  const storyPinRef = useRef(null);

  useGSAP(() => {
    if (!heroRef.current) return;
    const el = (s) => heroRef.current.querySelector(s);
    const targets = ['.hero-badge', '.hero-h1', '.hero-sub', '.hero-metrics', '.hero-stamp'].map(el).filter(Boolean);
    gsap.fromTo(targets,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1 }
    );
  }, { scope: heroRef, dependencies: [] });

  // Subtle hero scale on scroll
  useGSAP(() => {
    if (!heroRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.to(heroRef.current, {
      scale: 0.97,
      transformOrigin: 'center top',
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: heroRef, dependencies: [] });

  /* ─── Pinned scroll story ─── */
  useGSAP(() => {
    const pin = storyPinRef.current;
    if (!pin || window.innerWidth < 768) return;

    const count = timelineCards.length;
    const images = pin.querySelectorAll('.ss-bg-img');
    const slides = pin.querySelectorAll('.ss-slide');
    const progressFill = pin.querySelector('.ss-progress-fill');
    const yearMarkers = pin.querySelectorAll('.ss-year-marker');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: () => `+=${count * 100}%`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
      },
    });

    const textSel = '.ss-slide-overline, .ss-slide-year, .ss-slide-title .ss-word, .ss-slide-desc';

    /* Set initial state: first slide visible, rest hidden */
    slides.forEach((slide, i) => {
      const els = slide.querySelectorAll(textSel);
      gsap.set(slide, { autoAlpha: i === 0 ? 1 : 0 });
      gsap.set(els, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 30 });
    });
    if (progressFill) gsap.set(progressFill, { scaleY: 1 / count });
    yearMarkers.forEach((m, mi) => {
      gsap.set(m, { color: mi === 0 ? 'rgba(46,139,87,1)' : 'rgba(255,255,255,0.25)', fontWeight: mi === 0 ? 700 : 500 });
    });

    /* Build scrub timeline — each "step" is one unit on the timeline */
    for (let i = 1; i < count; i++) {
      const prevSlide = slides[i - 1];
      const nextSlide = slides[i];
      const prevEls = prevSlide.querySelectorAll(textSel);
      const nextEls = nextSlide.querySelectorAll(textSel);

      tl.to(prevEls, { opacity: 0, y: -20, duration: 0.3, stagger: 0.02 }, i - 0.5)
        .to(prevSlide, { autoAlpha: 0, duration: 0.2 }, i - 0.15);

      tl.to(images[i - 1], { opacity: 0, scale: 1.08, duration: 0.5 }, i - 0.5)
        .fromTo(images[i], { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.5 }, i - 0.5);

      tl.to(nextSlide, { autoAlpha: 1, duration: 0.1 }, i - 0.2)
        .fromTo(nextEls,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.04 },
          i - 0.1
        );

      if (progressFill) {
        tl.to(progressFill, { scaleY: (i + 1) / count, duration: 0.4 }, i - 0.3);
      }

      yearMarkers.forEach((m, mi) => {
        tl.to(m, {
          color: mi <= i ? 'rgba(46,139,87,1)' : 'rgba(255,255,255,0.25)',
          fontWeight: mi === i ? 700 : 500,
          duration: 0.2,
        }, i - 0.3);
      });
    }

  }, { scope: storyPinRef, dependencies: [] });

  return (
    <div className="about-page">
      {/* ═══ HERO ═══ */}
      <section className="hero" ref={heroRef}>
        <img
          className="hero-photo"
          src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=30&fit=crop"
          alt=""
          width="600"
          height="400"
          decoding="async"
        />
        <div className="hero-content">
          <div className="hero-badge">
            Established 1972
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
            <div className="hero-metric"><span className="hero-metric-num">1972</span><span className="hero-metric-label">Founded</span></div>
            <div className="hero-metric"><span className="hero-metric-num">15+</span><span className="hero-metric-label">Countries</span></div>
            <div className="hero-metric"><span className="hero-metric-num">130K</span><span className="hero-metric-label">m&sup2; Capacity</span></div>
          </div>
        </div>
        <div className="hero-stamp">
          <svg width="192" height="192" viewBox="0 0 192 192" fill="none">
            <circle cx="96" cy="96" r="90" stroke="rgba(46,139,87,0.06)" strokeWidth="1" strokeDasharray="4 6" />
          </svg>
          <span className="hero-stamp-num">40+</span>
          <span className="hero-stamp-label">Years of<br/>Excellence</span>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
        </div>
      </section>

      {/* ═══ MANIFESTO ═══ */}
      <section className="manifesto eng-grid">
        <div className="manifesto-inner">
          <GsapReveal>
            <div className="overline">Our Story</div>
            <h2>We didn&rsquo;t set out to build a <em>conglomerate.</em><br/>We set out to solve a problem.</h2>
            <p className="manifesto-p">
              In 1972, the industrial equipment supply chain was fragmented. Design firms handed off drawings they&rsquo;d never build. Fabricators welded steel they didn&rsquo;t engineer. Lining contractors coated surfaces they didn&rsquo;t understand. <strong>Every handoff was a failure point.</strong>
            </p>
            <p className="manifesto-p">
              Jasmino was founded on the idea that one company &mdash; with deep expertise in engineering, fabrication, and corrosion protection &mdash; could do it better. Not by being bigger, but by being <strong>more integrated.</strong>
            </p>
            <div className="manifesto-q">
              &ldquo;The person who designs the equipment should stand next to the person who builds it &mdash; and the person who protects it.&rdquo;
            </div>
          </GsapReveal>
          <GsapReveal delay={0.2}>
            <div className="img-reveal" ref={imgRevealRef}>
              <img src="https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=500&h=625&q=75&fit=crop&crop=center" alt="Engineering workshop" loading="lazy" />
              <div className="img-reveal-frame" />
              <div className="img-reveal-caption">
                <span className="caption-dot" />
                Jasmino engineering workshop &middot; Ahmedabad, India
              </div>
            </div>
          </GsapReveal>
        </div>
      </section>

      {/* ═══ PHOTO BREAK ═══ */}
      <div className="photo-break">
        <img
          ref={photoParallaxRef}
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&h=600&q=60&fit=crop&crop=center"
          alt="Manufacturing floor"
          loading="lazy"
          style={{ willChange: 'transform' }}
        />
        <div className="photo-break-caption">
          <span className="caption-dot" />
          <span>Fabrication floor &middot; 130,000+ m&sup2; combined capacity</span>
          <div className="photo-break-line" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>Jasmino Corporation</span>
        </div>
      </div>

      {/* ═══ EDITORIAL QUOTE ═══ */}
      <GsapReveal duration={0.9}>
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
      </GsapReveal>

      {/* ═══ PINNED SCROLL STORY ═══ */}
      <section className="scroll-story-pin" ref={storyPinRef}>
        {/* Full-bleed background images */}
        <div className="ss-bg-layer" aria-hidden="true">
          {timelineCards.map((card, i) => (
            <img
              key={card.year}
              className="ss-bg-img"
              src={card.img}
              alt=""
              loading={i === 0 ? 'eager' : 'lazy'}
              style={{ opacity: i === 0 ? 1 : 0 }}
            />
          ))}
          <div className="ss-bg-gradient" />
        </div>

        {/* Year progress rail (left) */}
        <div className="ss-progress-rail" aria-hidden="true">
          <div className="ss-progress-track">
            <div className="ss-progress-fill" />
          </div>
          <div className="ss-year-markers">
            {timelineCards.map((card) => (
              <span key={card.year} className="ss-year-marker">{card.year}</span>
            ))}
          </div>
        </div>

        {/* Content slides — all absolutely positioned in same container */}
        <div className="ss-slides">
          {timelineCards.map((card, i) => (
            <div key={card.year} className="ss-slide">
              <span className="ss-slide-overline">Four Decades</span>
              <div className="ss-slide-year">{card.year}</div>
              <h3 className="ss-slide-title">
                {card.title.split(' ').map((word, idx) => (
                  <span key={idx} className="ss-word">
                    {word}&nbsp;
                  </span>
                ))}
              </h3>
              <p className="ss-slide-desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section className="values eng-grid">
        <div className="values-inner">
          <GsapReveal>
            <div className="values-header">
              <div className="overline">What Drives Us</div>
              <h2>Three principles, one <em>standard</em></h2>
              <p>These aren&rsquo;t framed on a wall. They&rsquo;re built into every engineering decision, every weld, and every lining application.</p>
            </div>
          </GsapReveal>
        </div>
        {values.map((v) => (
          <GsapReveal key={v.num}>
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
          </GsapReveal>
        ))}
      </section>

      {/* ═══ GLOBE ═══ */}
      <Suspense fallback={null}>
        <GlobalPresence />
      </Suspense>

      {/* ═══ STATS ═══ */}
      <section className="stats">
        <div className="stats-inner" ref={statsRef}>
          <div className="stat-block" style={{ textAlign: 'center' }}>
            <div className="stat-num"><CountUp target="40+" /></div>
            <div className="stat-label">Years of Operation</div>
          </div>
          <div className="stat-block" style={{ textAlign: 'center' }}>
            <div className="stat-num"><CountUp target="15+" /></div>
            <div className="stat-label">Countries Served</div>
          </div>
          <div className="stat-block" style={{ textAlign: 'center' }}>
            <div className="stat-num"><CountUp target="130K+" /></div>
            <div className="stat-label">m&sup2; Total Capacity</div>
          </div>
          <div className="stat-block" style={{ textAlign: 'center' }}>
            <div className="stat-num"><CountUp target="97%" /></div>
            <div className="stat-label">Reorder Rate</div>
          </div>
        </div>
      </section>

      {/* ═══ CERTIFICATIONS ═══ */}
      <section className="certs eng-grid">
        <div className="certs-inner">
          <GsapReveal>
            <div className="certs-header">
              <div className="overline overline-center">Standards & Heritage</div>
              <h2>Certified to the standards that <em>matter</em></h2>
            </div>
          </GsapReveal>
          <div className="cert-grid" ref={certGridRef}>
            {certs.map((c) => (
              <div key={c.name} className="cert-box">
                {c.logoKey && <CertLogo certKey={c.logoKey} alt={c.name} width={56} height={32} />}
              </div>
            ))}
          </div>
          <div className="heritage-grid" ref={heritageRef}>
            <div className="heritage-card">
              <div className="heritage-logo">HAW</div>
              <div>
                <div className="heritage-name">HAW Linings GmbH</div>
                <div className="heritage-desc">German corrosion protection specialist, est. 1968. 40+ years of European rubber and plastic lining expertise.</div>
                <div className="heritage-tag">Germany &middot; Est. 1968</div>
              </div>
            </div>
            <div className="heritage-card">
              <div className="heritage-logo">GBT</div>
              <div>
                <div className="heritage-name">GBT Corrosion Protection</div>
                <div className="heritage-desc">German operations hub in Marl extending Jasmino&rsquo;s services into European and adjacent markets.</div>
                <div className="heritage-tag">GBT Marl, Germany &middot; Est. 2015</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <GsapReveal>
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
      </GsapReveal>

      <div style={{ height: 80, background: 'var(--surface)' }} />
    </div>
  );
}
