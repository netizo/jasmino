import { useRef, useEffect } from 'react';
import { useScrollReveal } from '../../hooks/useGsap';

export default function T2Gallery({ data }) {
  const sectionRef = useScrollReveal('.rv', { y: 28 });
  const trackRef = useRef(null);

  /* ── Endless autoplay: duplicate items, seamless loop ── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf;
    let paused = false;
    let pauseTimer;
    const SPEED = 0.6; // px per frame

    // Half the scrollWidth is the original set of items
    const getHalf = () => track.scrollWidth / 2;

    const step = () => {
      if (!paused) {
        track.scrollLeft += SPEED;
        // When we've scrolled past the first (original) set, jump back seamlessly
        if (track.scrollLeft >= getHalf()) {
          track.scrollLeft -= getHalf();
        }
      }
      raf = requestAnimationFrame(step);
    };

    const pauseFor = (ms) => {
      paused = true;
      clearTimeout(pauseTimer);
      pauseTimer = setTimeout(() => { paused = false; }, ms);
    };

    // Pause on user interaction
    const onDown = () => pauseFor(4000);
    const onWheel = () => pauseFor(3000);
    track.addEventListener('mousedown', onDown);
    track.addEventListener('touchstart', onDown, { passive: true });
    track.addEventListener('wheel', onWheel, { passive: true });

    // Only autoplay when visible
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          paused = false;
          raf = requestAnimationFrame(step);
        } else {
          paused = true;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.2 }
    );
    io.observe(track);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(pauseTimer);
      track.removeEventListener('mousedown', onDown);
      track.removeEventListener('touchstart', onDown);
      track.removeEventListener('wheel', onWheel);
      io.disconnect();
    };
  }, []);

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
        {/* Render items twice for seamless infinite loop */}
        {[...data.gallery.items, ...data.gallery.items].map((item, i) => (
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
