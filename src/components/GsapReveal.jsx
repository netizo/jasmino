import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../hooks/useGsap';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* v4: Blur reveal — opacity 0, blur(8px) → 1, blur(0) */
export default function GsapReveal({
  children,
  y = 32,
  duration = 0.8,
  delay = 0,
  ease = [0.25, 0.1, 0.25, 1],
  start = 'top 85%',
  className = '',
  as: Tag = 'div',
  useBlur = true,
}) {
  const ref = useRef(null);

  useGSAP(() => {
    if (!ref.current) return;

    if (prefersReducedMotion()) {
      gsap.set(ref.current, { opacity: 1, y: 0, filter: 'blur(0)' });
      return;
    }

    const from = useBlur ? { opacity: 0, y, filter: 'blur(8px)' } : { opacity: 0, y };
    const to = {
      opacity: 1,
      y: 0,
      ...(useBlur && { filter: 'blur(0px)' }),
      duration,
      delay,
      ease,
      scrollTrigger: { trigger: ref.current, start, once: true },
    };

    gsap.fromTo(ref.current, from, to);
  }, { scope: ref, dependencies: [] });

  return (
    <Tag ref={ref} className={`gsap-reveal ${className}`.trim()} style={{ opacity: 0 }}>
      {children}
    </Tag>
  );
}
