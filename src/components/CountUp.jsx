import { useEffect, useRef, useState } from 'react';

export default function CountUp({ target, duration = 2000 }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef();
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          animateCount();
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function animateCount() {
    const numMatch = target.match(/[\d,.]+/);
    if (!numMatch) {
      setDisplay(target);
      return;
    }

    const numStr = numMatch[0].replace(/,/g, '');
    const numVal = parseFloat(numStr);
    const prefix = target.substring(0, target.indexOf(numMatch[0]));
    const suffix = target.substring(target.indexOf(numMatch[0]) + numMatch[0].length);
    const hasDecimal = numStr.includes('.');
    const decimalPlaces = hasDecimal ? numStr.split('.')[1].length : 0;
    const hasComma = numMatch[0].includes(',');

    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numVal * eased;

      let formatted;
      if (hasDecimal) {
        formatted = current.toFixed(decimalPlaces);
      } else {
        formatted = Math.floor(current).toString();
      }

      if (hasComma) {
        formatted = Number(formatted).toLocaleString();
      }

      setDisplay(prefix + formatted + suffix);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplay(target);
      }
    }

    requestAnimationFrame(update);
  }

  return <span ref={ref}>{display}</span>;
}
