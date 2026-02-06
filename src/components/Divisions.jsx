import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import '../styles/divisions.css';

/* ══════════════════════════════════════════════════════════════════
   BLUEPRINT RENDERING ENGINE — Ported from jasmino-blueprint-scenes.js
   ══════════════════════════════════════════════════════════════════ */

const BP = {
    base: 0x2a4a6e,
    baseBright: 0x3a6a9e,
    baseDim: 0x18304a,
    baseGhost: 0x142840,
    accent: 0x04E586,
    accentDim: 0x037a48,
    accentGlow: 0x04E586,
    grid: 0x1a3458,
};

/* ── Wireframe Helpers ── */
function bpEdges(geo, color, opacity) {
    const edges = new THREE.EdgesGeometry(geo, 14);
    return new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
        color: color || BP.base, transparent: true,
        opacity: opacity !== undefined ? opacity : 0.5, depthWrite: false,
    }));
}

function bpWire(geo, color, opacity) {
    return new THREE.LineSegments(new THREE.WireframeGeometry(geo), new THREE.LineBasicMaterial({
        color: color || BP.base, transparent: true,
        opacity: opacity !== undefined ? opacity : 0.2, depthWrite: false,
    }));
}

function bpLine(a, b, color, opacity) {
    return new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([a, b]),
        new THREE.LineBasicMaterial({ color: color || BP.base, transparent: true, opacity: opacity || 0.35 })
    );
}

function bpRing(radius, segments, color, opacity) {
    const pts = [];
    for (let i = 0; i <= segments; i++) {
        const a = (i / segments) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    return new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: color || BP.base, transparent: true, opacity: opacity || 0.35 })
    );
}

function bpGlowEdges(geo, color) {
    const edges = new THREE.EdgesGeometry(geo, 14);
    return new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
        color: color || BP.accent, transparent: true, opacity: 0.0,
        blending: THREE.AdditiveBlending, depthWrite: false,
    }));
}

function bpDimension(start, end, offset, color, opacity) {
    const grp = new THREE.Group();
    const dir = new THREE.Vector3().subVectors(end, start).normalize();
    const perp = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0, 0, 1)).normalize().multiplyScalar(offset);
    const a = new THREE.Vector3().addVectors(start, perp);
    const b = new THREE.Vector3().addVectors(end, perp);
    const c = color || BP.baseDim;
    const o = opacity || 0.2;
    grp.add(bpLine(a, b, c, o));
    grp.add(bpLine(start, a, c, o * 0.7));
    grp.add(bpLine(end, b, c, o * 0.7));
    return grp;
}

function setGroupColor(group, color, opacity) {
    group.traverse(ch => {
        if (ch.material && ch.material.isLineBasicMaterial) {
            ch.material.color.set(color);
            if (opacity !== undefined) ch.material.opacity = opacity;
        }
    });
}

function setGlowOpacity(glowArr, opacity) {
    glowArr.forEach(g => { if (g.material) g.material.opacity = opacity; });
}

function highlightFade(progress) {
    if (progress < 0.06) return Math.pow(progress / 0.06, 0.5);
    if (progress < 0.12) return 1.0 - (progress - 0.06) / 0.06 * 0.2;
    if (progress > 0.88) return (1 - progress) / 0.12;
    return 0.8;
}

/* ── Blueprint Canvas Component ── */
const BlueprintCanvas = ({ sceneId }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const el = containerRef.current;
        let width = el.clientWidth || 300;
        let height = el.clientHeight || 400;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(22, width / height, 0.1, 100);
        camera.position.set(0, 0, 14);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);
        el.appendChild(renderer.domElement);

        scene.add(new THREE.AmbientLight(0xffffff, 0.08));

        const group = new THREE.Group();
        scene.add(group);

        // Context object to pass hovered state to scenes
        const ctx = { hovered: false, hoverIntensity: 0 };
        let time = 0;
        const mouse = { x: 0, y: 0 };
        const tRot = { x: 0, y: 0 };

        const card = el.closest('.div-card');
        const onEnter = () => { ctx.hovered = true; };
        const onLeave = () => { ctx.hovered = false; mouse.x = 0; mouse.y = 0; };
        const onMove = (e) => {
            const r = el.getBoundingClientRect();
            mouse.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
            mouse.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
        };

        if (card) {
            card.addEventListener('mouseenter', onEnter);
            card.addEventListener('mouseleave', onLeave);
            card.addEventListener('mousemove', onMove);
        }

        // Setup scene
        let updateFn = null;
        if (sceneId === 'eng') updateFn = setupEngScene(group, scene, ctx);
        else if (sceneId === 'mfg') updateFn = setupMfgScene(group, scene, ctx);
        else if (sceneId === 'cor') updateFn = setupCorScene(group, scene, ctx);
        else if (sceneId === 'rub') updateFn = setupRubScene(group, scene, ctx);

        let frameId;
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            time += 0.016;
            const targetHover = ctx.hovered ? 1 : 0;
            ctx.hoverIntensity += (targetHover - ctx.hoverIntensity) * 0.04;
            tRot.y = mouse.x * 0.18;
            tRot.x = mouse.y * 0.1;
            group.rotation.y += (tRot.y - group.rotation.y) * 0.04;
            group.rotation.x += (tRot.x - group.rotation.x) * 0.04;
            if (updateFn) updateFn(time, ctx.hoverIntensity);
            renderer.render(scene, camera);
        };
        animate();

        const resizeObserver = new ResizeObserver(() => {
            if (!el) return;
            const w = el.clientWidth || 300;
            const h = el.clientHeight || 400;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        });
        resizeObserver.observe(el);

        return () => {
            cancelAnimationFrame(frameId);
            resizeObserver.disconnect();
            if (card) {
                card.removeEventListener('mouseenter', onEnter);
                card.removeEventListener('mouseleave', onLeave);
                card.removeEventListener('mousemove', onMove);
            }
            if (renderer.domElement && el) el.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, [sceneId]);

    return <div className="three-wrap" ref={containerRef} />;
};


/* ══════════════════════════════════════════════════════════════════
   SCENE 1: ENGINEERING — Plant assembly
   ══════════════════════════════════════════════════════════════════ */
function setupEngScene(group, scene, ctx) {
    const sections = [], glows = [];

    // Section 0: Vertical pressure vessel
    const vesselGrp = new THREE.Group();
    const vesselGlow = [];
    const vGeo = new THREE.CylinderGeometry(0.5, 0.5, 2.2, 28, 1, true);
    vesselGrp.add(bpEdges(vGeo, BP.base, 0.5));
    const vg = bpGlowEdges(vGeo); vesselGrp.add(vg); vesselGlow.push(vg);

    const headGeo = new THREE.SphereGeometry(0.5, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    const topH = bpEdges(headGeo, BP.base, 0.5); topH.position.y = 1.1; vesselGrp.add(topH);
    const topHg = bpGlowEdges(headGeo); topHg.position.y = 1.1; vesselGrp.add(topHg); vesselGlow.push(topHg);
    const botH = bpEdges(headGeo, BP.base, 0.5); botH.position.y = -1.1; botH.rotation.x = Math.PI; vesselGrp.add(botH);
    const botHg = bpGlowEdges(headGeo); botHg.position.y = -1.1; botHg.rotation.x = Math.PI; vesselGrp.add(botHg); vesselGlow.push(botHg);

    [-0.7, -0.35, 0, 0.35, 0.7].forEach(y => {
        const r = bpRing(0.505, 36, BP.baseDim, 0.18); r.rotation.x = Math.PI / 2; r.position.y = y; vesselGrp.add(r);
    });

    vesselGrp.add(bpEdges(new THREE.CylinderGeometry(0.1, 0.1, 0.55, 14), BP.base, 0.5).translateY(1.65));
    vesselGrp.add(bpEdges(new THREE.CylinderGeometry(0.19, 0.19, 0.05, 14), BP.base, 0.5).translateY(1.92));
    for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        const bolt = bpEdges(new THREE.CylinderGeometry(0.012, 0.012, 0.06, 6), BP.baseDim, 0.3);
        bolt.position.set(Math.cos(a) * 0.155, 1.92, Math.sin(a) * 0.155); vesselGrp.add(bolt);
    }
    vesselGrp.add(bpEdges(new THREE.TorusGeometry(0.13, 0.02, 8, 20), BP.baseDim, 0.2).translateY(1.38));

    const sn = bpEdges(new THREE.CylinderGeometry(0.08, 0.08, 0.5, 12), BP.base, 0.5);
    sn.rotation.z = Math.PI / 2; sn.position.set(0.74, 0.2, 0); vesselGrp.add(sn);
    const sf = bpEdges(new THREE.CylinderGeometry(0.14, 0.14, 0.04, 12), BP.base, 0.5);
    sf.rotation.z = Math.PI / 2; sf.position.set(0.99, 0.2, 0); vesselGrp.add(sf);
    const sp = bpEdges(new THREE.TorusGeometry(0.1, 0.015, 8, 16), BP.baseDim, 0.18);
    sp.rotation.z = Math.PI / 2; sp.position.set(0.5, 0.2, 0); vesselGrp.add(sp);

    vesselGrp.add(bpEdges(new THREE.CylinderGeometry(0.07, 0.07, 0.35, 10), BP.baseDim, 0.35).translateY(-1.52));
    const mw = bpEdges(new THREE.CylinderGeometry(0.2, 0.2, 0.12, 16), BP.baseDim, 0.3);
    mw.rotation.x = Math.PI / 2; mw.position.set(0, 0.5, 0.51); vesselGrp.add(mw);

    [-0.5, 0, 0.5].forEach(y => {
        const tray = bpEdges(new THREE.CircleGeometry(0.46, 20), BP.baseGhost, 0.08);
        tray.rotation.x = -Math.PI / 2; tray.position.y = y; vesselGrp.add(tray);
    });

    group.add(vesselGrp); sections.push(vesselGrp); glows.push(vesselGlow);

    // Section 1: Heat exchanger
    const hxGrp = new THREE.Group();
    const hxGlow = [];
    const hxGeo = new THREE.CylinderGeometry(0.3, 0.3, 1.5, 22, 1, true);
    const hxShell = bpEdges(hxGeo, BP.base, 0.45); hxShell.rotation.z = Math.PI / 2; hxGrp.add(hxShell);
    const hxg = bpGlowEdges(hxGeo); hxg.rotation.z = Math.PI / 2; hxGrp.add(hxg); hxGlow.push(hxg);

    [-0.75, 0.75].forEach(x => {
        const ts = bpEdges(new THREE.CylinderGeometry(0.3, 0.3, 0.04, 22), BP.base, 0.45);
        ts.rotation.z = Math.PI / 2; ts.position.x = x; hxGrp.add(ts);
    });
    const chGeo = new THREE.SphereGeometry(0.3, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2);
    const ch = bpEdges(chGeo, BP.base, 0.35); ch.rotation.z = Math.PI / 2; ch.position.x = -0.78; hxGrp.add(ch);

    for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI * 2; const r = 0.14;
        hxGrp.add(bpLine(new THREE.Vector3(-0.72, Math.sin(a) * r, Math.cos(a) * r),
            new THREE.Vector3(0.72, Math.sin(a) * r, Math.cos(a) * r), BP.baseGhost, 0.1));
    }
    [-0.3, 0, 0.3].forEach(x => {
        const b = bpEdges(new THREE.CircleGeometry(0.27, 16), BP.baseGhost, 0.06);
        b.rotation.y = Math.PI / 2; b.position.x = x; hxGrp.add(b);
    });
    [-0.4, 0.4].forEach(x => {
        hxGrp.add(bpLine(new THREE.Vector3(x, -0.3, 0), new THREE.Vector3(x, -0.7, 0), BP.baseDim, 0.2));
        hxGrp.add(bpEdges(new THREE.BoxGeometry(0.25, 0.03, 0.15), BP.baseDim, 0.2).translateX(x).translateY(-0.72));
    });

    hxGrp.position.set(1.9, -0.4, -0.5);
    group.add(hxGrp); sections.push(hxGrp); glows.push(hxGlow);

    // Section 2: Piping + pump
    const pipeGrp = new THREE.Group();
    const pipeGlow = [];
    const pSegs = [
        [new THREE.Vector3(0.99, 0.2, 0), new THREE.Vector3(1.5, 0.2, 0)],
        [new THREE.Vector3(1.5, 0.2, 0), new THREE.Vector3(1.5, 0.2, -0.5)],
        [new THREE.Vector3(1.5, 0.2, -0.5), new THREE.Vector3(1.5, -0.4, -0.5)],
        [new THREE.Vector3(1.5, -0.4, -0.5), new THREE.Vector3(1.15, -0.4, -0.5)],
        [new THREE.Vector3(0, 1.92, 0), new THREE.Vector3(0, 2.25, 0)],
        [new THREE.Vector3(0, 2.25, 0), new THREE.Vector3(-1.1, 2.25, 0)],
        [new THREE.Vector3(-1.1, 2.25, 0), new THREE.Vector3(-1.1, 0.0, 0)],
    ];
    pSegs.forEach(([a, b]) => pipeGrp.add(bpLine(a, b, BP.base, 0.4)));

    [[1.5, 0.2, 0], [-1.1, 2.25, 0], [0, 2.25, 0]].forEach(([x, y, z]) => {
        pipeGrp.add(bpEdges(new THREE.SphereGeometry(0.035, 8, 6), BP.base, 0.3).translateX(x).translateY(y).translateZ(z));
    });
    pipeGrp.add(bpEdges(new THREE.CylinderGeometry(0.06, 0.06, 0.15, 10), BP.base, 0.4).translateX(-1.1).translateY(1.2));
    pipeGrp.add(bpEdges(new THREE.BoxGeometry(0.18, 0.02, 0.02), BP.base, 0.35).translateX(-1.1).translateY(1.28));

    const pumpGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.22, 14);
    pipeGrp.add(bpEdges(pumpGeo, BP.base, 0.45).translateX(-1.1).translateY(-0.15));
    const pg = bpGlowEdges(pumpGeo); pg.position.set(-1.1, -0.15, 0); pipeGrp.add(pg); pipeGlow.push(pg);
    pipeGrp.add(bpEdges(new THREE.BoxGeometry(0.45, 0.06, 0.35), BP.base, 0.4).translateX(-1.1).translateY(-0.3));
    pipeGrp.add(bpEdges(new THREE.CylinderGeometry(0.1, 0.1, 0.25, 10), BP.baseDim, 0.25)
        .translateX(-1.1).translateY(-0.15).rotateX(Math.PI / 2).translateY(-0.25));

    group.add(pipeGrp); sections.push(pipeGrp); glows.push(pipeGlow);

    // Section 3: Structural frame
    const rackGrp = new THREE.Group();
    [-1.5, 1.5].forEach(x => {
        [-0.4, 0.4].forEach(z => {
            rackGrp.add(bpLine(new THREE.Vector3(x, -1.5, z), new THREE.Vector3(x, 2.5, z), BP.baseDim, 0.18));
        });
    });
    [-0.3, 0.8, 1.6, 2.5].forEach(y => {
        rackGrp.add(bpLine(new THREE.Vector3(-1.5, y, -0.4), new THREE.Vector3(1.5, y, -0.4), BP.baseGhost, 0.12));
        rackGrp.add(bpLine(new THREE.Vector3(-1.5, y, 0.4), new THREE.Vector3(1.5, y, 0.4), BP.baseGhost, 0.12));
    });
    rackGrp.add(bpLine(new THREE.Vector3(-1.5, -0.3, -0.4), new THREE.Vector3(-1.5, 0.8, 0.4), BP.baseGhost, 0.08));
    rackGrp.add(bpLine(new THREE.Vector3(1.5, -0.3, 0.4), new THREE.Vector3(1.5, 0.8, -0.4), BP.baseGhost, 0.08));

    group.add(rackGrp); sections.push(rackGrp); glows.push([]);

    // Dimensions + floor
    group.add(bpDimension(new THREE.Vector3(-0.5, -1.6, 0.5), new THREE.Vector3(0.5, -1.6, 0.5), 0.25, BP.baseDim, 0.12));
    group.add(bpDimension(new THREE.Vector3(-0.55, -1.1, 0.5), new THREE.Vector3(-0.55, 1.1, 0.5), 0.3, BP.baseDim, 0.1));

    for (let i = -5; i <= 5; i++) {
        group.add(bpLine(new THREE.Vector3(i * 0.45, -1.5, -2.2), new THREE.Vector3(i * 0.45, -1.5, 2.2), BP.grid, 0.04));
        group.add(bpLine(new THREE.Vector3(-2.2, -1.5, i * 0.45), new THREE.Vector3(2.2, -1.5, i * 0.45), BP.grid, 0.04));
    }

    group.rotation.set(0.35, 0.5, 0);
    group.position.y = -0.2;

    let activeSection = 0, timer = 0;
    const CYCLE = 2.8;

    return (t, hover) => {
        timer += 0.016;
        if (timer > CYCLE) { timer = 0; activeSection = (activeSection + 1) % sections.length; }
        const fade = highlightFade(timer / CYCLE);
        sections.forEach((sec, i) => {
            if (i === activeSection) {
                setGroupColor(sec, BP.accent, fade * 0.65 + 0.12 + hover * 0.08);
                if (glows[i]) setGlowOpacity(glows[i], fade * 0.25);
            } else {
                setGroupColor(sec, BP.base, 0.2 + hover * 0.12);
                if (glows[i]) setGlowOpacity(glows[i], 0);
            }
        });
        group.rotation.y += 0.0003;
    };
}


/* ══════════════════════════════════════════════════════════════════
   SCENE 2: MANUFACTURING — Horizontal pressure vessel
   ══════════════════════════════════════════════════════════════════ */
function setupMfgScene(group, scene, ctx) {
    const sections = [], glows = [];

    // Section 0: Main shell
    const shellGrp = new THREE.Group();
    const shellGlow = [];
    const sGeo = new THREE.CylinderGeometry(0.8, 0.8, 2.8, 36, 1, true);
    const sh = bpEdges(sGeo, BP.base, 0.45); sh.rotation.z = Math.PI / 2; shellGrp.add(sh);
    const shg = bpGlowEdges(sGeo); shg.rotation.z = Math.PI / 2; shellGrp.add(shg); shellGlow.push(shg);
    for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2; const r = 0.8;
        shellGrp.add(bpLine(new THREE.Vector3(-1.4, Math.sin(a) * r, Math.cos(a) * r),
            new THREE.Vector3(1.4, Math.sin(a) * r, Math.cos(a) * r), BP.baseGhost, 0.07));
    }
    group.add(shellGrp); sections.push(shellGrp); glows.push(shellGlow);

    // Section 1: Heads
    const headGrp = new THREE.Group();
    const headGlow = [];
    const hGeo = new THREE.SphereGeometry(0.8, 28, 16, 0, Math.PI * 2, 0, Math.PI / 2.5);
    const lH = bpEdges(hGeo, BP.base, 0.45); lH.rotation.z = -Math.PI / 2; lH.position.x = -1.4; headGrp.add(lH);
    const lHg = bpGlowEdges(hGeo); lHg.rotation.z = -Math.PI / 2; lHg.position.x = -1.4; headGrp.add(lHg); headGlow.push(lHg);
    const rH = bpEdges(hGeo, BP.base, 0.45); rH.rotation.z = Math.PI / 2; rH.position.x = 1.4; headGrp.add(rH);
    const rHg = bpGlowEdges(hGeo); rHg.rotation.z = Math.PI / 2; rHg.position.x = 1.4; headGrp.add(rHg); headGlow.push(rHg);
    group.add(headGrp); sections.push(headGrp); glows.push(headGlow);

    // Section 2: Welds + baffles
    const weldGrp = new THREE.Group();
    [-0.8, -0.4, 0, 0.4, 0.8].forEach(x => {
        const wr = bpRing(0.81, 44, BP.base, 0.4); wr.rotation.z = Math.PI / 2; wr.position.x = x; weldGrp.add(wr);
        const wr2 = bpRing(0.84, 44, BP.baseDim, 0.12); wr2.rotation.z = Math.PI / 2; wr2.position.x = x; weldGrp.add(wr2);
    });
    for (let i = -3; i <= 3; i++) {
        const b = bpEdges(new THREE.CircleGeometry(0.72, 28), BP.baseGhost, 0.06);
        b.rotation.y = Math.PI / 2; b.position.x = i * 0.36; weldGrp.add(b);
    }
    group.add(weldGrp); sections.push(weldGrp); glows.push([]);

    // Section 3: Nozzles
    const nozGrp = new THREE.Group();
    const nozGlow = [];
    [[-0.3, 0.14], [0.5, 0.09], [-0.9, 0.08]].forEach(([x, r]) => {
        const nGeo = new THREE.CylinderGeometry(r, r, 0.5, 14);
        nozGrp.add(bpEdges(nGeo, BP.base, 0.45).translateX(x).translateY(1.05));
        const ng = bpGlowEdges(nGeo); ng.position.set(x, 1.05, 0); nozGrp.add(ng); nozGlow.push(ng);
        const fGeo = new THREE.CylinderGeometry(r + 0.05, r + 0.05, 0.04, 14);
        nozGrp.add(bpEdges(fGeo, BP.base, 0.45).translateX(x).translateY(1.3));
        for (let i = 0; i < 6; i++) {
            const a = (i / 6) * Math.PI * 2;
            nozGrp.add(bpEdges(new THREE.CylinderGeometry(0.01, 0.01, 0.05, 6), BP.baseDim, 0.25)
                .translateX(x + Math.cos(a) * (r + 0.025)).translateY(1.3).translateZ(Math.sin(a) * (r + 0.025)));
        }
        nozGrp.add(bpEdges(new THREE.TorusGeometry(r + 0.01, 0.015, 6, 16), BP.baseDim, 0.15).translateX(x).translateY(0.82));
    });
    group.add(nozGrp); sections.push(nozGrp); glows.push(nozGlow);

    // Section 4: Saddles
    const saddleGrp = new THREE.Group();
    [-0.9, 0.9].forEach(x => {
        saddleGrp.add(bpEdges(new THREE.BoxGeometry(0.9, 0.04, 0.5), BP.base, 0.35).translateX(x).translateY(-0.84));
        const arcPts = [];
        for (let i = 0; i <= 24; i++) {
            const a = -Math.PI / 2 + (i / 24) * Math.PI;
            arcPts.push(new THREE.Vector3(x, Math.sin(a) * 0.8, Math.cos(a) * 0.42));
        }
        saddleGrp.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(arcPts),
            new THREE.LineBasicMaterial({ color: BP.base, transparent: true, opacity: 0.3 })));
        saddleGrp.add(bpLine(new THREE.Vector3(x - 0.38, -0.84, 0), new THREE.Vector3(x - 0.38, 0, 0), BP.baseDim, 0.15));
        saddleGrp.add(bpLine(new THREE.Vector3(x + 0.38, -0.84, 0), new THREE.Vector3(x + 0.38, 0, 0), BP.baseDim, 0.15));
        saddleGrp.add(bpLine(new THREE.Vector3(x - 0.38, -0.84, 0), new THREE.Vector3(x, -0.4, 0), BP.baseGhost, 0.1));
        saddleGrp.add(bpLine(new THREE.Vector3(x + 0.38, -0.84, 0), new THREE.Vector3(x, -0.4, 0), BP.baseGhost, 0.1));
    });
    group.add(saddleGrp); sections.push(saddleGrp); glows.push([]);

    group.add(bpDimension(new THREE.Vector3(-1.4, -0.9, 0.5), new THREE.Vector3(1.4, -0.9, 0.5), 0.25, BP.baseDim, 0.1));
    for (let i = -4; i <= 4; i++) {
        group.add(bpLine(new THREE.Vector3(i * 0.45, -0.88, -1.5), new THREE.Vector3(i * 0.45, -0.88, 1.5), BP.grid, 0.035));
    }

    group.rotation.set(0.22, 0.4, 0);
    group.position.y = -0.1;

    let activeSection = 0, timer = 0;
    const CYCLE = 2.4;

    return (t, hover) => {
        timer += 0.016;
        if (timer > CYCLE) { timer = 0; activeSection = (activeSection + 1) % sections.length; }
        const fade = highlightFade(timer / CYCLE);
        sections.forEach((sec, i) => {
            if (i === activeSection) {
                setGroupColor(sec, BP.accent, fade * 0.6 + 0.12 + hover * 0.08);
                if (glows[i]) setGlowOpacity(glows[i], fade * 0.2);
            } else {
                setGroupColor(sec, BP.base, 0.18 + hover * 0.1);
                if (glows[i]) setGlowOpacity(glows[i], 0);
            }
        });
        group.rotation.y += 0.0003;
    };
}


/* ══════════════════════════════════════════════════════════════════
   SCENE 3: CORROSION — Cutaway lining layers
   ══════════════════════════════════════════════════════════════════ */
function setupCorScene(group, scene, ctx) {
    const sections = [], glows = [];
    const arc = Math.PI * 1.4;
    const startAngle = -Math.PI * 0.15;
    const h = 2.2;

    const layers = [
        { r: 0.95, label: 'Steel' },
        { r: 0.86, label: 'Primer' },
        { r: 0.78, label: 'Adhesive' },
        { r: 0.68, label: 'Lining' },
    ];
    const layerGrps = [];
    const layerTargetY = [0.5, 0.17, -0.17, -0.5];

    layers.forEach((l, i) => {
        const grp = new THREE.Group();
        const gw = [];

        const cGeo = new THREE.CylinderGeometry(l.r, l.r, h - i * 0.08, 36, 1, true, startAngle, arc);
        grp.add(bpEdges(cGeo, BP.base, 0.4));
        const cg = bpGlowEdges(cGeo); grp.add(cg); gw.push(cg);
        if (i >= 2) grp.add(bpWire(cGeo, BP.baseGhost, 0.05));

        [1, -1].forEach(dir => {
            const pts = [];
            for (let j = 0; j <= 44; j++) {
                const a = startAngle + (j / 44) * arc;
                pts.push(new THREE.Vector3(Math.cos(a) * l.r, dir * (h - i * 0.08) / 2, Math.sin(a) * l.r));
            }
            grp.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),
                new THREE.LineBasicMaterial({ color: BP.base, transparent: true, opacity: 0.25 })));
        });

        const annoY = (i - 1.5) * 0.45;
        grp.add(bpLine(new THREE.Vector3(l.r + 0.1, annoY, 0), new THREE.Vector3(l.r + 0.6, annoY, 0), BP.baseDim, 0.15));
        grp.add(bpLine(new THREE.Vector3(l.r + 0.6, annoY - 0.04, 0), new THREE.Vector3(l.r + 0.6, annoY + 0.04, 0), BP.baseDim, 0.15));
        grp.add(bpEdges(new THREE.SphereGeometry(0.02, 6, 6), BP.baseDim, 0.2).translateX(l.r + 0.6).translateY(annoY));

        group.add(grp); sections.push(grp); layerGrps.push(grp); glows.push(gw);
    });

    for (let i = -3; i <= 3; i++) {
        group.add(bpLine(new THREE.Vector3(i * 0.5, -1.5, -1.5), new THREE.Vector3(i * 0.5, -1.5, 1.5), BP.grid, 0.04));
        group.add(bpLine(new THREE.Vector3(-1.5, -1.5, i * 0.5), new THREE.Vector3(1.5, -1.5, i * 0.5), BP.grid, 0.04));
    }

    group.rotation.set(0.18, -0.3, 0);
    group.position.y = -0.05;

    let activeSection = 0, timer = 0, exploded = 0;
    const CYCLE = 2.8;

    return (t, hover) => {
        timer += 0.016;
        if (timer > CYCLE) { timer = 0; activeSection = (activeSection + 1) % sections.length; }
        const fade = highlightFade(timer / CYCLE);

        const targetExplode = ctx.hovered ? 1 : 0;
        exploded += (targetExplode - exploded) * 0.025;
        layerGrps.forEach((grp, i) => { grp.position.y = layerTargetY[i] * exploded * 0.6; });

        sections.forEach((sec, i) => {
            if (i === activeSection) {
                setGroupColor(sec, BP.accent, fade * 0.6 + 0.1 + hover * 0.08);
                if (glows[i]) setGlowOpacity(glows[i], fade * 0.18);
            } else {
                setGroupColor(sec, BP.base, 0.18 + hover * 0.1);
                if (glows[i]) setGlowOpacity(glows[i], 0);
            }
        });
        group.rotation.y += 0.0004;
    };
}


/* ══════════════════════════════════════════════════════════════════
   SCENE 4: RUBBER — Molecular compound
   ══════════════════════════════════════════════════════════════════ */
function setupRubScene(group, scene, ctx) {
    const sections = [], glows = [];

    const nodeData = [
        { p: [-1.5, 0.0, 0.0], r: 0.26 },
        { p: [-0.7, 0.55, 0.25], r: 0.20 },
        { p: [0.0, -0.08, -0.15], r: 0.30 },
        { p: [0.75, 0.45, 0.35], r: 0.22 },
        { p: [1.4, -0.18, -0.08], r: 0.24 },
        { p: [2.0, 0.25, 0.15], r: 0.18 },
        { p: [-0.25, 1.2, 0.08], r: 0.18 },
        { p: [0.25, 1.75, -0.15], r: 0.16 },
        { p: [-0.45, -1.1, 0.25], r: 0.18 },
        { p: [0.55, -1.0, -0.08], r: 0.20 },
        { p: [1.2, -1.35, 0.15], r: 0.16 },
    ];
    const bonds = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [2, 6], [6, 7], [1, 8], [3, 9], [8, 9], [9, 10]];

    const mainGrp = new THREE.Group(), mainGlow = [];
    const branchGrp = new THREE.Group(), branchGlow = [];
    const crossGrp = new THREE.Group(), crossGlow = [];
    const bondGrp = new THREE.Group();

    const nodeMeshes = [];
    nodeData.forEach((n, i) => {
        const geo = new THREE.IcosahedronGeometry(n.r, 1);
        const edges = bpEdges(geo, BP.base, 0.4);
        edges.position.set(...n.p);
        edges.userData = { basePos: [...n.p], phase: i * 0.9, r: n.r };

        const glow = bpGlowEdges(geo);
        glow.position.set(...n.p);
        glow.userData = { parent: edges };

        let tG, tGl;
        if (i <= 5) { tG = mainGrp; tGl = mainGlow; }
        else if (i <= 7) { tG = branchGrp; tGl = branchGlow; }
        else { tG = crossGrp; tGl = crossGlow; }

        tG.add(edges); tG.add(glow); tGl.push(glow);
        nodeMeshes.push(edges);
    });

    bonds.forEach(([a, b]) => {
        const line = bpLine(new THREE.Vector3(...nodeData[a].p), new THREE.Vector3(...nodeData[b].p), BP.base, 0.25);
        line.userData = { a, b };
        bondGrp.add(line);
    });

    group.add(mainGrp); group.add(branchGrp); group.add(crossGrp); group.add(bondGrp);
    sections.push(mainGrp); sections.push(branchGrp); sections.push(crossGrp); sections.push(bondGrp);
    glows.push(mainGlow); glows.push(branchGlow); glows.push(crossGlow); glows.push([]);

    const orbitals = [];
    for (let i = 0; i < 12; i++) {
        const dot = new THREE.Points(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0)]),
            new THREE.PointsMaterial({ color: BP.accent, size: 0.035, transparent: true, opacity: 0.45, sizeAttenuation: true })
        );
        dot.userData = {
            orbit: 0.3 + Math.random() * 0.25,
            speed: 0.4 + Math.random() * 0.5,
            phase: Math.random() * Math.PI * 2,
            tilt: (Math.random() - 0.5) * Math.PI * 0.5,
            center: Math.floor(Math.random() * nodeData.length),
        };
        group.add(dot); orbitals.push(dot);
    }

    for (let i = -4; i <= 4; i++) {
        group.add(bpLine(new THREE.Vector3(i * 0.5, -2, -2), new THREE.Vector3(i * 0.5, -2, 2), BP.grid, 0.03));
        group.add(bpLine(new THREE.Vector3(-2, -2, i * 0.5), new THREE.Vector3(2, -2, i * 0.5), BP.grid, 0.03));
    }

    group.rotation.set(0.12, 0.3, 0);
    group.position.y = -0.05;

    let activeSection = 0, timer = 0;
    const CYCLE = 2.5;

    return (t, hover) => {
        timer += 0.016;
        if (timer > CYCLE) { timer = 0; activeSection = (activeSection + 1) % sections.length; }
        const fade = highlightFade(timer / CYCLE);

        nodeMeshes.forEach((m) => {
            const d = m.userData;
            m.position.x = d.basePos[0] + Math.sin(t * 0.4 + d.phase) * 0.06;
            m.position.y = d.basePos[1] + Math.cos(t * 0.5 + d.phase) * 0.08;
            m.position.z = d.basePos[2] + Math.sin(t * 0.35 + d.phase * 0.7) * 0.04;
        });

        [mainGrp, branchGrp, crossGrp].forEach(g => {
            g.children.forEach(c => { if (c.userData && c.userData.parent) c.position.copy(c.userData.parent.position); });
        });

        bondGrp.children.forEach(line => {
            if (!line.userData || line.userData.a === undefined) return;
            const pa = nodeMeshes[line.userData.a].position;
            const pb = nodeMeshes[line.userData.b].position;
            const pos = line.geometry.attributes.position;
            pos.array[0] = pa.x; pos.array[1] = pa.y; pos.array[2] = pa.z;
            pos.array[3] = pb.x; pos.array[4] = pb.y; pos.array[5] = pb.z;
            pos.needsUpdate = true;
        });

        orbitals.forEach(o => {
            const d = o.userData;
            const center = nodeMeshes[d.center].position;
            const angle = t * d.speed + d.phase;
            const pos = o.geometry.attributes.position;
            pos.array[0] = center.x + Math.cos(angle) * d.orbit * Math.cos(d.tilt);
            pos.array[1] = center.y + Math.sin(angle) * d.orbit;
            pos.array[2] = center.z + Math.cos(angle) * d.orbit * Math.sin(d.tilt);
            pos.needsUpdate = true;
        });

        sections.forEach((sec, i) => {
            if (i === activeSection) {
                setGroupColor(sec, BP.accent, fade * 0.6 + 0.12 + hover * 0.08);
                if (glows[i]) setGlowOpacity(glows[i], fade * 0.18);
            } else {
                setGroupColor(sec, BP.base, 0.18 + hover * 0.1);
                if (glows[i]) setGlowOpacity(glows[i], 0);
            }
        });
        group.rotation.y += 0.0004;
    };
}


/* ══════════════════════════════════════════════════════════════════
   DIVISIONS COMPONENT — Main Export
   ══════════════════════════════════════════════════════════════════ */
const Divisions = () => {
    return (
        <section className="eng-grid">
            <div className="s2">
                <div className="s2-header">
                    <div className="s2-overline">Our Capabilities</div>
                    <h2 className="s2-title">Four divisions, one<br /><em>integrated</em> model</h2>
                    <p className="s2-subtitle">Every project benefits from design intelligence, manufacturing scale, and corrosion protection expertise working as one team.</p>
                </div>
                <div className="div-cards">
                    {/* Engineering */}
                    <div className="div-card">
                        <div className="div-visual eng">
                            <div className="bp-noise"></div>
                            <div className="bp-frame">
                                <span></span><span></span><span></span><span></span>
                            </div>
                            <BlueprintCanvas sceneId="eng" />
                        </div>
                        <div className="div-content">
                            <div className="div-number">01</div>
                            <h3 className="div-title">Engineering Design</h3>
                            <p className="div-desc">Pressure equipment, process plant, and structural design using ASME, PD 5500, EN 13445, and Australian Standards.</p>
                            <Link to="/engineering" className="div-link">Explore capabilities →</Link>
                        </div>
                    </div>

                    {/* Manufacturing */}
                    <div className="div-card">
                        <div className="div-visual mfg">
                            <div className="bp-noise"></div>
                            <div className="bp-frame">
                                <span></span><span></span><span></span><span></span>
                            </div>
                            <BlueprintCanvas sceneId="mfg" />
                        </div>
                        <div className="div-content">
                            <div className="div-number">02</div>
                            <h3 className="div-title">Manufacturing</h3>
                            <p className="div-desc">Fabrication of pressure vessels, storage tanks, piping, and structural steel with full code compliance.</p>
                            <Link to="/manufacturing" className="div-link">Explore capabilities →</Link>
                        </div>
                    </div>

                    {/* Corrosion Protection */}
                    <div className="div-card">
                        <div className="div-visual cor">
                            <div className="bp-noise"></div>
                            <div className="bp-frame">
                                <span></span><span></span><span></span><span></span>
                            </div>
                            <BlueprintCanvas sceneId="cor" />
                        </div>
                        <div className="div-content">
                            <div className="div-number">03</div>
                            <h3 className="div-title">Corrosion Protection</h3>
                            <p className="div-desc">Advanced rubber linings, coatings, and surface preparation for chemical resistance and extended asset life.</p>
                            <Link to="/corrosion-protection" className="div-link">Explore capabilities →</Link>
                        </div>
                    </div>

                    {/* Rubber Products */}
                    <div className="div-card">
                        <div className="div-visual rub">
                            <div className="bp-noise"></div>
                            <div className="bp-frame">
                                <span></span><span></span><span></span><span></span>
                            </div>
                            <BlueprintCanvas sceneId="rub" />
                        </div>
                        <div className="div-content">
                            <div className="div-number">04</div>
                            <h3 className="div-title">Rubber Products</h3>
                            <p className="div-desc">Custom-compounded rubber parts, sheeting, expansion joints, and wear-resistant components.</p>
                            <Link to="/rubber-products" className="div-link">Explore capabilities →</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Divisions;
