import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import '../styles/integrated-model.css';

/* ══════════════════════════════════════════════════════════════════
   SHADER BACKGROUND — Volumetric atmospheric noise
   ══════════════════════════════════════════════════════════════════ */
const ShaderBackground = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

        const handleMouseMove = (e) => {
            mouse.tx = e.clientX / window.innerWidth;
            mouse.ty = 1.0 - e.clientY / window.innerHeight;
        };
        document.addEventListener('mousemove', handleMouseMove);

        const geo = new THREE.PlaneGeometry(2, 2);
        const mat = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            },
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        precision highp float;
        
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        varying vec2 vUv;

        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                             -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                                        + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                                   dot(x12.zw, x12.zw)), 0.0);
          m = m * m;
          m = m * m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
          vec3 g;
          g.x = a0.x * x0.x + h.x * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        float fbm(vec2 p) {
          float f = 0.0;
          float w = 0.5;
          float s = 2.0;
          for (int i = 0; i < 6; i++) {
            f += w * snoise(p);
            p *= s;
            w *= 0.5;
            s *= 1.02;
          }
          return f;
        }

        float warpedFbm(vec2 p, float t) {
          vec2 q = vec2(
            fbm(p + vec2(1.7, 9.2) + 0.08 * t),
            fbm(p + vec2(8.3, 2.8) + 0.06 * t)
          );
          vec2 r = vec2(
            fbm(p + 4.0 * q + vec2(1.0, 6.0) + 0.05 * t),
            fbm(p + 4.0 * q + vec2(5.0, 3.0) + 0.04 * t)
          );
          return fbm(p + 3.5 * r);
        }

        void main() {
          vec2 uv = vUv;
          float aspect = uResolution.x / uResolution.y;
          vec2 p = vec2(uv.x * aspect, uv.y);

          float t = uTime * 0.15;

          float n1 = warpedFbm(p * 0.8 + vec2(t * 0.3, 0.0), t);
          float n2 = fbm(p * 1.6 + vec2(-t * 0.2, t * 0.15) + n1 * 0.5);
          float n3 = snoise(p * 3.5 + vec2(t * 0.4, -t * 0.3)) * 0.5 + 0.5;

          vec2 mouseP = vec2(uMouse.x * aspect, uMouse.y);
          float mouseDist = distance(p, mouseP);
          float mouseInfluence = 1.0 - smoothstep(0.0, 0.9, mouseDist);
          mouseInfluence *= mouseInfluence;
          float mouseCore = 1.0 - smoothstep(0.0, 0.35, mouseDist);
          mouseCore *= mouseCore * mouseCore;

          vec3 colBase = vec3(0.016, 0.04, 0.08);
          vec3 colMid = vec3(0.04, 0.11, 0.22);
          vec3 colBlue = vec3(0.106, 0.294, 0.561);
          vec3 colGreen = vec3(0.016, 0.9, 0.525);

          float atmosphere = smoothstep(-0.3, 0.7, n1) * 0.8;
          vec3 col = mix(colBase, colMid, atmosphere);

          float blueWisp = smoothstep(0.1, 0.55, n2) * smoothstep(0.8, 0.4, n2);
          col += colBlue * blueWisp * 0.18;

          float greenCaustic = smoothstep(0.45, 0.55, n1 * n2) * n3;
          col += colGreen * greenCaustic * 0.04;

          vec3 mouseAmbient = mix(colBlue, colGreen, 0.25) * 0.15;
          col += mouseAmbient * mouseInfluence;
          col += colGreen * mouseCore * 0.025;
          col += vec3(0.01, 0.02, 0.03) * mouseInfluence * atmosphere;

          float topGlow = smoothstep(0.6, 1.0, uv.y) * 0.03;
          col += colGreen * topGlow * (0.5 + 0.5 * sin(uv.x * 3.0 + t * 2.0));

          float vig = 1.0 - smoothstep(0.4, 1.4, distance(uv, vec2(0.5)) * 1.5);
          col *= vig;

          float scanline = 0.98 + 0.02 * sin(uv.y * uResolution.y * 0.5);
          col *= scanline;

          col = col * col * (3.0 - 2.0 * col);
          col.r += 0.005;

          gl_FragColor = vec4(col, 1.0);
        }
      `,
        });

        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);

        const resize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            if (!w || !h) return;
            renderer.setSize(w, h);
            mat.uniforms.uResolution.value.set(w * Math.min(window.devicePixelRatio, 2), h * Math.min(window.devicePixelRatio, 2));
        };
        resize();
        window.addEventListener('resize', resize);

        let time = 0;
        let visible = false;
        let frameId;

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => visible = e.isIntersecting);
        }, { threshold: 0.01 });
        obs.observe(container);

        const animate = () => {
            frameId = requestAnimationFrame(animate);
            if (!visible) return;

            time += 0.016;
            mat.uniforms.uTime.value = time;

            mouse.x += (mouse.tx - mouse.x) * 0.03;
            mouse.y += (mouse.ty - mouse.y) * 0.03;
            mat.uniforms.uMouse.value.set(mouse.x, mouse.y);

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', resize);
            document.removeEventListener('mousemove', handleMouseMove);
            obs.disconnect();
            if (renderer.domElement && container) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return <div className="s3-shader" ref={containerRef} />;
};


/* ══════════════════════════════════════════════════════════════════
   PIPELINE STEP COMPONENT
   ══════════════════════════════════════════════════════════════════ */
const PipelineStep = ({ num, name, sub }) => (
    <div className="pipeline-step">
        <div className="step-node">
            <div className="step-ring-outer"></div>
            <div className="step-ring"></div>
            <div className="step-inner"><span className="step-num">{num}</span></div>
            <div className="step-indicator"></div>
        </div>
        <div className="step-name">{name}</div>
        <div className="step-sub">{sub}</div>
    </div>
);


/* ══════════════════════════════════════════════════════════════════
   COMPARISON CARD COMPONENT
   ══════════════════════════════════════════════════════════════════ */
const ComparisonCard = ({ type, tag, heading, desc, points, statNum, statLabel }) => (
    <div className={`comp-card ${type}`}>
        <div className="comp-tag"><span className="tag-dot"></span>{tag}</div>
        <h3 className="comp-heading">{heading}</h3>
        <p className="comp-desc">{desc}</p>
        <ul className="comp-points">
            {points.map((pt, i) => (
                <li key={i} className="comp-point">
                    <span className="point-icon">{type === 'problem' ? '✕' : '✓'}</span>
                    <span>{pt}</span>
                </li>
            ))}
        </ul>
        <div className="comp-stat">
            <span className="comp-stat-num">{statNum}</span>
            <span className="comp-stat-label">{statLabel}</span>
        </div>
    </div>
);


/* ══════════════════════════════════════════════════════════════════
   INTEGRATED MODEL SECTION
   ══════════════════════════════════════════════════════════════════ */
const IntegratedModel = () => {
    const sectionRef = useRef(null);
    const spotlightRef = useRef(null);
    const headerRef = useRef(null);
    const pipelineRef = useRef(null);
    const comparisonRef = useRef(null);

    useEffect(() => {
        // Spotlight mouse tracking
        const section = sectionRef.current;
        const spotlight = spotlightRef.current;
        if (section && spotlight) {
            const handleMove = (e) => {
                const rect = section.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                spotlight.style.setProperty('--mx', x + 'px');
                spotlight.style.setProperty('--my', y + 'px');
            };
            section.addEventListener('mousemove', handleMove);
            return () => section.removeEventListener('mousemove', handleMove);
        }
    }, []);

    useEffect(() => {
        // Scroll reveal
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('vis');
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

        [headerRef, pipelineRef, comparisonRef].forEach(ref => {
            if (ref.current) obs.observe(ref.current);
        });

        return () => obs.disconnect();
    }, []);

    const steps = [
        { num: '01', name: 'Design', sub: 'Engineering' },
        { num: '02', name: 'Fabricate', sub: 'Manufacturing' },
        { num: '03', name: 'Protect', sub: 'Linings' },
        { num: '04', name: 'Inspect', sub: 'Quality' },
        { num: '05', name: 'Deliver', sub: 'Logistics' },
    ];

    return (
        <section className="s3" ref={sectionRef}>
            <ShaderBackground />
            <div className="s3-spotlight" ref={spotlightRef}></div>

            <div className="s3-content">
                {/* Header */}
                <div className="s3-header" ref={headerRef}>
                    <div className="s3-overline">Our Difference</div>
                    <h2 className="s3-title">One company. Zero <em>handoffs.</em></h2>
                    <p className="s3-subtitle">
                        Most projects require 3–4 vendors — designer, fabricator, lining applicator, inspector. Each handoff introduces delays, finger-pointing, and rework. We eliminated the handoffs.
                    </p>
                </div>

                {/* Pipeline */}
                <div className="pipeline-wrap" ref={pipelineRef}>
                    <div className="pipeline">
                        <div className="pipeline-beam">
                            <div className="pipeline-beam-track"></div>
                            <div className="pipeline-beam-energy"></div>
                            <div className="pipeline-beam-energy-2"></div>
                        </div>
                        {steps.map(step => (
                            <PipelineStep key={step.num} {...step} />
                        ))}
                    </div>
                </div>

                {/* Comparison */}
                <div className="comparison-wrap" ref={comparisonRef}>
                    <div className="comparison">
                        <div className="comp-vs">VS</div>
                        <ComparisonCard
                            type="problem"
                            tag="The Industry Problem"
                            heading="Multiple vendors, multiple contracts"
                            desc="3–4 separate companies. 3–4 contracts. 3–4 schedules. When something goes wrong, everyone points to someone else."
                            points={[
                                "Design decisions made without manufacturing context",
                                "Fabrication specs that ignore lining requirements",
                                "Quality gaps between contractor handoffs"
                            ]}
                            statNum="3–4×"
                            statLabel="points of failure"
                        />
                        <ComparisonCard
                            type="solution"
                            tag="The Jasmino Model"
                            heading="One company, one accountability"
                            desc="One company. One contract. One point of accountability. The engineer who designed it walks the shop floor where it's built."
                            points={[
                                "Design accounts for manufacturing tolerances from day one",
                                "Fabrication built with lining requirements already embedded",
                                "Seamless quality control from concept through delivery"
                            ]}
                            statNum="1"
                            statLabel="single point of accountability"
                        />
                    </div>
                </div>
            </div>

            <div className="s3-bottom"></div>
        </section>
    );
};

export default IntegratedModel;
