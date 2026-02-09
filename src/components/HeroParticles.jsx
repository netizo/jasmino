import { useEffect, useRef, useCallback } from 'react';

export default function HeroParticles({
  particleColor = 'rgba(4,229,134,',
  connectionColor = 'rgba(4,229,134,',
  mouseMode = 'attract',
  maxParticles = 120,
  className = ''
}) {
  const canvasRef = useRef(null);
  const visibleRef = useRef(true);
  const mouseRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef(null);
  const ptsRef = useRef([]);

  const init = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const parent = c.parentElement;
    const dpr = Math.min(devicePixelRatio, 2);
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    c.width = w * dpr;
    c.height = h * dpr;
    c.style.width = w + 'px';
    c.style.height = h + 'px';
    const x = c.getContext('2d');
    x.setTransform(dpr, 0, 0, dpr, 0, 0);

    const n = Math.min(Math.floor(w * h / 7000), maxParticles);
    const pts = [];
    for (let i = 0; i < n; i++) {
      pts.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.6 + 0.4,
        a: Math.random() * 0.2 + 0.05
      });
    }
    ptsRef.current = pts;
    return { x, w, h };
  }, [maxParticles]);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;

    // IntersectionObserver to pause off-screen
    const io = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    io.observe(c.parentElement);

    let ctx = init();
    if (!ctx) return;

    const onResize = () => { ctx = init(); };
    window.addEventListener('resize', onResize);

    const onMove = (e) => {
      const r = c.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = { x: -999, y: -999 }; };
    const parent = c.parentElement;
    parent.addEventListener('mousemove', onMove);
    parent.addEventListener('mouseleave', onLeave);

    function draw() {
      rafRef.current = requestAnimationFrame(draw);
      if (!visibleRef.current || !ctx) return;
      const { x, w, h } = ctx;
      const pts = ptsRef.current;
      const mouse = mouseRef.current;
      const t = performance.now() * 0.001;

      x.clearRect(0, 0, w, h);

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx + Math.sin(t * 0.4 + p.y * 0.008) * 0.12;
        p.y += p.vy + Math.cos(t * 0.3 + p.x * 0.008) * 0.12;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 0) {
          const f = 0.015 * (1 - dist / 180);
          if (mouseMode === 'attract') {
            p.vx += dx * f;
            p.vy += dy * f;
          } else {
            p.vx -= dx * f;
            p.vy -= dy * f;
          }
        }

        // Dampen velocity
        p.vx *= 0.99;
        p.vy *= 0.99;

        x.beginPath();
        x.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        x.fillStyle = particleColor + p.a + ')';
        x.fill();

        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const ddx = p.x - q.x;
          const ddy = p.y - q.y;
          const dd = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dd < 130) {
            x.beginPath();
            x.moveTo(p.x, p.y);
            x.lineTo(q.x, q.y);
            x.strokeStyle = connectionColor + (0.05 * (1 - dd / 130)) + ')';
            x.lineWidth = 0.5;
            x.stroke();
          }
        }
      }
    }
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      parent.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseleave', onLeave);
      io.disconnect();
    };
  }, [init, particleColor, connectionColor, mouseMode]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: 'absolute', inset: 0, zIndex: 1 }}
    />
  );
}
