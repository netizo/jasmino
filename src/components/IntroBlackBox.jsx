import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../hooks/useGsap';

const SLIDES = [
  {
    title: 'Design, build, protect.',
    body: 'One partner from drawing to lining. No gaps, no handoffs, no surprises on site.',
  },
  {
    title: 'Integration is a discipline.',
    body: 'Engineering sits next to fabrication and corrosion specialists, so decisions stay connected.',
  },
  {
    title: 'Outcomes, not interfaces.',
    body: 'Our job is to own the result in the field — not just deliver equipment at the gate.',
  },
];

export default function IntroBlackBox() {
  const sectionRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const cardRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current || !pinWrapperRef.current || !cardRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const slides = cardRef.current.querySelectorAll('.ibb-slide');

    // Initial: card below viewport, first slide visible
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

    // Entry: card comes in from bottom and settles at center (first ~12% of scroll)
    tl.to(cardRef.current, { y: 0, autoAlpha: 1, duration: 0.12, ease: 'power2.out' }, 0);

    // Slides transition across the remaining scroll
    const step = 0.88 / SLIDES.length; // Use 88% of timeline for slides
    SLIDES.forEach((_, index) => {
      if (index === 0) return;
      const prev = slides[index - 1];
      const next = slides[index];
      const startAt = 0.12 + step * index;

      tl.to(prev, { autoAlpha: 0, y: -16, duration: 0.2 }, startAt - step / 2)
        .fromTo(next, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.25 }, startAt - step / 3);
    });
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section className="ibb-section" ref={sectionRef}>
      <div className="ibb-bg" aria-hidden="true" />
      <div className="ibb-pin-wrapper" ref={pinWrapperRef}>
        <div className="ibb-card" ref={cardRef}>
          <div className="ibb-rails" aria-hidden="true">
            <span className="ibb-rail ibb-rail-left" />
            <span className="ibb-rail ibb-rail-right" />
          </div>
          <div className="ibb-inner">
            {SLIDES.map((slide) => (
              <article key={slide.title} className="ibb-slide">
                <div className="ibb-overline">Integrated Model</div>
                <h3 className="ibb-title">{slide.title}</h3>
                <p className="ibb-body">{slide.body}</p>
                <div className="ibb-dots" aria-hidden="true">
                  {SLIDES.map((s) => (
                    <span
                      key={s.title}
                      className={`ibb-dot${s.title === slide.title ? ' ibb-dot-active' : ''}`}
                    />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
