import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Utility: detect reduced-motion preference ── */
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Default animation config ── */
const DEFAULTS = {
  y: 32,
  duration: 0.7,
  ease: 'power2.out',
  stagger: 0.08,
};

/**
 * useScrollReveal
 * Batch fade-up entrance on scroll. Drop-in replacement for ScrollReveal.jsx.
 *
 * @param {string} selector  CSS selector for elements to animate (default '.gsap-reveal')
 * @param {object} options   { y, duration, ease, stagger, start }
 * @returns {React.RefObject} attach to the container element
 */
export function useScrollReveal(selector = '.gsap-reveal', options = {}) {
  const containerRef = useRef(null);
  const {
    y = DEFAULTS.y,
    duration = DEFAULTS.duration,
    ease = DEFAULTS.ease,
    stagger = DEFAULTS.stagger,
    start = 'top 85%',
  } = options;

  useGSAP(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(selector);
    if (!elements.length) return;

    if (prefersReducedMotion()) {
      gsap.set(elements, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(elements, { opacity: 0, y });

    ScrollTrigger.batch(elements, {
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration,
          ease,
          stagger,
          overwrite: true,
        });
      },
      start,
      once: true,
    });
  }, { scope: containerRef, dependencies: [] });

  return containerRef;
}

/**
 * useStagger
 * Staggered group entrance on scroll — great for card grids, stat blocks, badges.
 *
 * @param {string} selector  CSS selector for children to stagger
 * @param {object} options   { y, duration, ease, stagger, start }
 * @returns {React.RefObject}
 */
export function useStagger(selector = '.gsap-stagger', options = {}) {
  const containerRef = useRef(null);
  const {
    y = DEFAULTS.y,
    duration = DEFAULTS.duration,
    ease = DEFAULTS.ease,
    stagger = 0.1,
    start = 'top 80%',
  } = options;

  useGSAP(() => {
    if (!containerRef.current) return;

    const els = containerRef.current.querySelectorAll(selector);
    if (!els.length) return;

    if (prefersReducedMotion()) {
      gsap.set(els, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(els,
      { opacity: 0, y },
      { opacity: 1, y: 0, duration, ease, stagger,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          once: true,
        },
      }
    );
  }, { scope: containerRef, dependencies: [] });

  return containerRef;
}

/**
 * useParallax
 * Subtle vertical parallax for images, photo breaks, backgrounds.
 *
 * @param {object} options  { speed, start, end, scrub }
 * @returns {React.RefObject} attach to the element to parallax
 */
export function useParallax(options = {}) {
  const ref = useRef(null);
  const {
    speed = -40,
    start = 'top bottom',
    end = 'bottom top',
    scrub = true,
  } = options;

  useGSAP(() => {
    if (!ref.current || prefersReducedMotion()) return;

    gsap.to(ref.current, {
      y: speed,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start,
        end,
        scrub,
      },
    });
  }, { scope: ref, dependencies: [] });

  return ref;
}

/**
 * useImageReveal
 * Clip-path mask reveal on scroll — for images and visual panels.
 *
 * @param {object} options  { direction, duration, ease, start }
 * @returns {React.RefObject}
 */
export function useImageReveal(options = {}) {
  const ref = useRef(null);
  const {
    direction = 'left',
    duration = 1.2,
    ease = 'power3.inOut',
    start = 'top 75%',
  } = options;

  useGSAP(() => {
    if (!ref.current) return;

    if (prefersReducedMotion()) {
      gsap.set(ref.current, { clipPath: 'inset(0 0 0 0)' });
      return;
    }

    const clipFrom = {
      left: 'inset(0 100% 0 0)',
      right: 'inset(0 0 0 100%)',
      bottom: 'inset(100% 0 0 0)',
    }[direction];

    gsap.fromTo(
      ref.current,
      { clipPath: clipFrom },
      {
        clipPath: 'inset(0 0 0 0)',
        duration,
        ease,
        scrollTrigger: {
          trigger: ref.current,
          start,
          once: true,
        },
      }
    );
  }, { scope: ref, dependencies: [] });

  return ref;
}

/**
 * useTextReveal
 * Line-by-line text entrance for hero headlines and section titles.
 *
 * @param {object} options  { y, duration, ease, stagger, start }
 * @returns {React.RefObject}
 */
export function useTextReveal(options = {}) {
  const ref = useRef(null);
  const {
    y = 24,
    duration = 0.6,
    ease = 'power2.out',
    stagger = 0.12,
    start = 'top 85%',
  } = options;

  useGSAP(() => {
    if (!ref.current) return;

    const children = ref.current.children;
    if (!children.length) return;

    if (prefersReducedMotion()) {
      gsap.set(children, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(children,
      { opacity: 0, y },
      { opacity: 1, y: 0, duration, ease, stagger,
        scrollTrigger: {
          trigger: ref.current,
          start,
          once: true,
        },
      }
    );
  }, { scope: ref, dependencies: [] });

  return ref;
}

/* Re-export gsap & ScrollTrigger for direct use in timelines */
export { gsap, ScrollTrigger };
