import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { divisions } from '../../data/divisions';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../../hooks/useGsap';

export default function T2ServiceGrid({ data }) {
  const { divisionSlug } = useParams();
  const division = divisions.find((d) => d.slug === divisionSlug);
  const serviceSlugMap = {};
  if (division) {
    division.services.forEach((s) => { serviceSlugMap[s.name] = s.slug; });
  }
  const sectionRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    // Header text
    const rvEls = sectionRef.current.querySelectorAll('.rv');
    if (rvEls.length) {
      gsap.fromTo(rvEls, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.08, scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true } });
    }
    // Service cards
    const cards = sectionRef.current.querySelectorAll('.scard');
    if (cards.length) {
      gsap.fromTo(cards, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12, scrollTrigger: { trigger: sectionRef.current.querySelector('.sgrid'), start: 'top 82%', once: true } });
    }
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section className={`svcs ${['corrosion-protection', 'engineering-design'].includes(divisionSlug) ? 'svcs--two-col' : ''}`} ref={sectionRef}>
      <div className="svcs-in">
        <div className="overline rv">Our Services</div>
        <h2 className="sec-h rv">
          {data.services.title} <em>{data.services.titleEm}</em>
        </h2>
        <p className="sec-desc rv">{data.services.desc}</p>

        <div className="sgrid">
          {data.services.items.map((item, i) => (
            <article key={i} className="scard" style={{ '--i': i }}>
              <div className="scard-photo">
                {item.img && (
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                  />
                )}
                <span className="scard-ix">{item.num}</span>
              </div>

              <div className="scard-body">
                <h3 className="scard-title">{item.title}</h3>
                <p className="scard-desc">{item.desc}</p>

                <Link
                  className="scard-link"
                  to={serviceSlugMap[item.title] ? `/what-we-do/${divisionSlug}/${serviceSlugMap[item.title]}` : '#'}
                >
                  Explore →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
