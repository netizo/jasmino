import { useEffect, useRef } from 'react';

export default function GrainEffect() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const c = canvasRef.current;
        if (!c) return;

        const x = c.getContext('2d');

        function resize() {
            c.width = window.innerWidth;
            c.height = window.innerHeight;
        }

        resize();
        window.addEventListener('resize', resize);

        let frame = 0;
        let animationId;

        function draw() {
            if (++frame % 3 !== 0) {
                animationId = requestAnimationFrame(draw);
                return;
            }

            const w = c.width;
            const h = c.height;

            if (w === 0 || h === 0) return;

            const id = x.createImageData(w, h);
            const px = id.data;

            for (let i = 0; i < px.length; i += 16) {
                const v = Math.random() * 255;
                // Optimization: unroll loop slightly for perf
                for (let j = 0; j < 16 && i + j < px.length; j += 4) {
                    px[i + j] = v;     // R
                    px[i + j + 1] = v; // G
                    px[i + j + 2] = v; // B
                    px[i + j + 3] = 20; // Alpha
                }
            }

            x.putImageData(id, 0, 0);
            animationId = requestAnimationFrame(draw);
        }

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="grain">
            <canvas ref={canvasRef} />
        </div>
    );
}
