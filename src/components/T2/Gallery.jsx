import { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useGsap';

export default function T2Gallery({ data }) {
  const sectionRef = useScrollReveal('.rv', { y: 28 });
  const trackRef = useRef(null);

  return (
    <section className="t2-gallery" ref={sectionRef}>
      <div className="t2-gallery-header rv">
        <div className="overline">{data.gallery.overlayTag || 'Gallery'}</div>
        <h2 className="sec-h">
          <span
            dangerouslySetInnerHTML={{
              __html: (data.gallery.overlayTitle ?? '').replace(
                /(scale|rubber|lives|corrosion|precision)/gi,
                '<em>$1</em>'
              ),
            }}
          />
        </h2>
      </div>

      <div className="t2-gallery-track" ref={trackRef}>
        {data.gallery.items.map((item, i) => (
          <div key={i} className="t2-gallery-slide">
            <img src={item.img} alt={item.title} loading="lazy" />
            <div className="t2-gallery-caption">
              <span className="t2-gallery-tag">{item.tag}</span>
              <span className="t2-gallery-title">{item.title}</span>
              <span className="t2-gallery-sub">{item.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
