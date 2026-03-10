import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useGsap';

export default function T2CTA({ data }) {
  const sectionRef = useScrollReveal('.rv', { y: 28 });

  return (
    <section className="cta" ref={sectionRef}>
      <div className="cta-in rv">
        <div>
          <h2 className="cta-h">
            {data.cta.title} <em>{data.cta.titleEm}</em>
          </h2>
          <p className="cta-desc">{data.cta.desc}</p>
        </div>
        <div className="cta-btns">
          <Link className="btn btn-p" to="/contact">
            Start a Conversation
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link className="btn btn-s" to="/contact">
            Download Brochure
          </Link>
        </div>
      </div>
    </section>
  );
}
