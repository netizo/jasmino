import { useEffect, useRef } from 'react';

export default function HeroBackground() {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const c = canvasRef.current;
        if (!c) return;

        const x = c.getContext('2d');
        let w, h;
        let pts = [];
        const mouse = { x: -999, y: -999 };

        function resize() {
            if (!c || !c.parentElement) return;
            w = c.width = c.parentElement.clientWidth;
            h = c.height = c.parentElement.clientHeight;

            pts = [];
            const count = window.innerWidth < 768 ? 40 : 90; // Reduce count on mobile

            for (let i = 0; i < count; i++) {
                pts.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.35,
                    vy: (Math.random() - 0.5) * 0.35,
                    r: Math.random() * 1.8 + 0.4,
                    a: Math.random() * 0.25 + 0.08
                });
            }
        }

        resize();
        window.addEventListener('resize', resize);

        const handleMouseMove = (e) => {
            const r = c.getBoundingClientRect();
            mouse.x = e.clientX - r.left;
            mouse.y = e.clientY - r.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -999;
            mouse.y = -999;
        };

        // Attach listeners to the hero section (parent of this background) if possible, 
        // or just the window/document if simpler, but here we attach to container or window.
        // The original code attached to .hero. 
        // We'll attach to the canvas parent in a `useEffect` if we can access it, or just use the canvas itself for mouse interaction if it covers the area.
        // However, the canvas might be behind content (z-index 0). 
        // Let's attach to window but check bounds, or assume the parent passes mouse events?
        // Actually, let's just listen on the window and calculate relative to canvas, or listen on the container ref.

        // Better: listen on local parent element if possible.
        const parent = c.parentElement?.parentElement; // .hero-bg -> .hero
        if (parent) {
            parent.addEventListener('mousemove', handleMouseMove);
            parent.addEventListener('mouseleave', handleMouseLeave);
        }


        let animationId;

        function draw() {
            x.clearRect(0, 0, w, h);

            for (let i = 0; i < pts.length; i++) {
                const p = pts[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;

                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 180) {
                    const f = 0.012 * (1 - dist / 180);
                    p.vx += dx * f;
                    p.vy += dy * f;
                }

                x.beginPath();
                x.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                x.fillStyle = 'rgba(4,229,134,' + p.a + ')';
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
                        x.strokeStyle = 'rgba(4,229,134,' + (0.055 * (1 - dd / 130)) + ')';
                        x.lineWidth = 0.5;
                        x.stroke();
                    }
                }
            }

            animationId = requestAnimationFrame(draw);
        }

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            if (parent) {
                parent.removeEventListener('mousemove', handleMouseMove);
                parent.removeEventListener('mouseleave', handleMouseLeave);
            }
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="hero-bg">
            <canvas ref={canvasRef} id="heroCanvas" />
        </div>
    );
}
