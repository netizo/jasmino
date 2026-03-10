import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../hooks/useGsap';
import '../styles/usp-cards.css';

const USP_SLIDES = [
  {
    id: 'integration',
    coord: 'USP.01',
    coordBr: 'INTEGRATED MODEL',
    overline: 'Integrated Model',
    headline: 'One company.\nZero handoffs.',
    body: [
      'Most projects pass through 3–4 separate contractors — one for design, one for fabrication, one for lining, one for inspection. Every handoff introduces delays, miscommunication, and finger-pointing when something goes wrong on site.',
      'We eliminated the handoffs. Our engineering, manufacturing, corrosion protection, and quality teams work under one roof, one contract, one point of accountability.',
    ],
    evidenceLabel: 'What this means in practice',
    stats: [
      { num: '4', detail: 'Divisions — design, fabrication, corrosion protection, rubber' },
      { num: '1', detail: 'Contract. One point of contact. One chain of accountability.' },
      { num: '0', detail: 'Gaps between design intent and shop floor execution' },
    ],
    keyfactBold: 'Design decisions account for fabrication tolerances.',
    keyfactRest: 'Fabrication accounts for lining requirements from day one. Nothing falls between the cracks.',
  },
  {
    id: 'scale',
    coord: 'USP.02',
    coordBr: 'PROVEN AT SCALE',
    overline: 'Proven at Scale',
    headline: '50+ years.\nThree continents.',
    body: [
      'Founded in 1972 in Taloja, Maharashtra. Today, Jasmino operates 130,000+ m² of integrated manufacturing across India and Germany — including HAW Linings and GBT, acquired in 2024 to bring four decades of European lining expertise into the group.',
      'Pressure vessels up to 8 metres in diameter and 50 metres long — fabrication at shipyard scale, certified to ASME, API, PED, and TÜV standards.',
    ],
    evidenceLabel: 'Infrastructure at a glance',
    stats: [
      { num: '130K+', detail: 'm² combined shop floor across all facilities' },
      { num: '15+', detail: 'Countries served across chemical, power, and mining' },
      { num: '50m', detail: 'Maximum vessel length — comparable to aircraft fuselages' },
    ],
    keyfactBold: 'India HQ · HAW Germany · GBT Germany.',
    keyfactRest: 'Three facilities operating under one quality system, one management team, one standard of execution.',
  },
  {
    id: 'lifecycle',
    coord: 'USP.03',
    coordBr: 'BUILT TO LAST',
    overline: 'Built to Last',
    headline: 'We protect what\nwe build.',
    body: [
      "A pressure vessel is only as reliable as its corrosion barrier. Most fabricators hand off a bare steel shell and walk away. We don't. Every vessel we manufacture can be rubber-lined, plastic-lined, coated, and inspected before it leaves our facility.",
      "And when equipment needs re-lining or repair 10 years later, we're still there — with the original engineering data, on-site inspection teams, and proven formulations. Protection isn't a separate vendor. It's how we finish the job.",
    ],
    evidenceLabel: 'Protection capabilities',
    stats: [
      { num: '2,000+', detail: 'Proven rubber formulations developed over four decades' },
      { num: '40+', detail: 'Years of lining expertise — HAW and GBT heritage' },
      { num: '97%', detail: 'Client reorder rate — they come back because it works' },
    ],
    keyfactBold: 'Natural rubber to advanced fluoroelastomers.',
    keyfactRest: 'From ambient-temperature water tanks to 180°C concentrated acid service. Every compound matched to the exact chemical environment.',
  },
];

export default function USPCards() {
  const sectionRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const cardRef = useRef(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useGSAP(() => {
    if (!sectionRef.current || !pinWrapperRef.current || !cardRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const slides = cardRef.current.querySelectorAll('.usp-slide');

    gsap.set(cardRef.current, { y: 120, autoAlpha: 0.6 });
    gsap.set(slides, { autoAlpha: 0, y: 20 });
    if (slides[0]) gsap.set(slides[0], { autoAlpha: 1, y: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        pin: pinWrapperRef.current,
        pinSpacing: true,
      },
    });

    tl.to(cardRef.current, { y: 0, autoAlpha: 1, duration: 0.12, ease: 'power2.out' }, 0);

    const step = 0.88 / USP_SLIDES.length;
    USP_SLIDES.forEach((_, index) => {
      if (index === 0) return;
      const prev = slides[index - 1];
      const next = slides[index];
      const startAt = 0.12 + step * index;

      tl.to(prev, { autoAlpha: 0, y: -16, duration: 0.2 }, startAt - step / 2)
        .fromTo(next, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.25 }, startAt - step / 3);
    });

    tl.eventCallback('onUpdate', () => {
      const p = tl.progress();
      const stepSize = 0.88 / USP_SLIDES.length;
      let idx = 0;
      for (let i = 1; i <= USP_SLIDES.length; i++) {
        if (p >= 0.12 + stepSize * i) idx = i;
      }
      setActiveSlideIndex(Math.min(idx, USP_SLIDES.length - 1));
    });
  }, { scope: sectionRef, dependencies: [] });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      const ev = card.querySelector('.usp-evidence');
      if (ev) ev.style.transform = `translate(${x * 3}px, ${y * 2}px)`;
    };

    const handleMouseLeave = () => {
      const ev = card.querySelector('.usp-evidence');
      if (ev) ev.style.transform = 'translate(0, 0)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="usp-section usp-scroll-mode" ref={sectionRef}>
      <div className="usp-bg" aria-hidden="true" />
      <div className="usp-inner">
        <div className="usp-pin-wrapper" ref={pinWrapperRef}>
          <div className="usp-header">
            <div className="usp-overline">Why Jasmino</div>
            <h2 className="usp-title">
              The integrated <em>advantage</em>
            </h2>
            <p className="usp-subtitle">
              Three principles that separate us from every other equipment supplier in the industry.
            </p>
          </div>
          <div className="usp-card-wrap">
            <div className="usp-card" ref={cardRef}>
            {/* Sizer: in-flow content for card height, hidden (RULE 1) */}
            <div className="usp-card-sizer" aria-hidden="true">
              <div className="usp-card-content">
                <div className="usp-card-left">
                  <div className="usp-card-overline">
                    <span className="usp-card-overline-dot" />
                    {USP_SLIDES[activeSlideIndex]?.overline}
                  </div>
                  <h3 className="usp-card-headline">
                    {USP_SLIDES[activeSlideIndex]?.headline.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < USP_SLIDES[activeSlideIndex].headline.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </h3>
                  {USP_SLIDES[activeSlideIndex]?.body.map((para, i) => (
                    <p key={i} className="usp-card-body">{para}</p>
                  ))}
                  <div className="usp-card-dots" aria-hidden="true" />
                </div>
                <div className="usp-card-right">
                  <div className="usp-evidence">
                    <div className="usp-evidence-label">{USP_SLIDES[activeSlideIndex]?.evidenceLabel}</div>
                    <div className="usp-evidence-stats">
                      {USP_SLIDES[activeSlideIndex]?.stats.map((stat, i) => (
                        <div key={i}>
                          <div className="usp-stat-row">
                            <span className="usp-stat-num">{stat.num}</span>
                            <span className="usp-stat-detail">{stat.detail}</span>
                          </div>
                          {i < USP_SLIDES[activeSlideIndex].stats.length - 1 && <div className="usp-evidence-divider" />}
                        </div>
                      ))}
                    </div>
                    <div className="usp-keyfact">
                      <strong>{USP_SLIDES[activeSlideIndex]?.keyfactBold}</strong>
                      {USP_SLIDES[activeSlideIndex]?.keyfactRest}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="usp-card-frame-tl" aria-hidden="true" />
            <div className="usp-card-frame-br" aria-hidden="true" />
            <div className="usp-card-accent-right" aria-hidden="true" />

            {USP_SLIDES.map((slide, slideIndex) => (
              <article key={slide.id} className="usp-slide" data-card={slide.id}>
                <span className="usp-card-coord tl">{slide.coord}</span>
                <span className="usp-card-coord br">{slide.coordBr}</span>

                <div className="usp-card-content">
                  <div className="usp-card-left">
                    <div className="usp-card-overline">
                      <span className="usp-card-overline-dot" />
                      {slide.overline}
                    </div>
                    <h3 className="usp-card-headline">
                      {slide.headline.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < slide.headline.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </h3>
                    {slide.body.map((para, i) => (
                      <p key={i} className="usp-card-body">
                        {para}
                      </p>
                    ))}
                    <div className="usp-card-dots" aria-hidden="true">
                      {USP_SLIDES.map((_, i) => (
                        <div
                          key={i}
                          className={`usp-card-dot${slideIndex === i ? ' active' : ''}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="usp-card-right">
                    <div className="usp-evidence">
                      <div className="usp-evidence-label">{slide.evidenceLabel}</div>
                      <div className="usp-evidence-stats">
                        {slide.stats.map((stat, i) => (
                          <div key={i}>
                            <div className="usp-stat-row">
                              <span className="usp-stat-num">{stat.num}</span>
                              <span className="usp-stat-detail">{stat.detail}</span>
                            </div>
                            {i < slide.stats.length - 1 && <div className="usp-evidence-divider" />}
                          </div>
                        ))}
                      </div>
                      <div className="usp-keyfact">
                        <strong>{slide.keyfactBold}</strong>
                        {slide.keyfactRest}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
