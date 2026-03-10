import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../hooks/useGsap';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function GsapReveal({
  children,
  y = 32,
  duration = 0.7,
  delay = 0,
  ease = 'power2.out',
  start = 'top 85%',
  className = '',
  as: Tag = 'div',
}) {
  const ref = useRef(null);

  useGSAP(() => {
    if (!ref.current) return;

    if (prefersReducedMotion()) {
      gsap.set(ref.current, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      ref.current,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: ref.current,
          start,
          once: true,
        },
      }
    );
  }, { scope: ref, dependencies: [] });

  return (
    <Tag ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </Tag>
  );
}
