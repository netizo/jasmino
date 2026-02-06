import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import '../styles/divisions.css';

/* ═══════════════════════════════════════════════════════════════════
   BLUEPRINT RENDERING ENGINE (Ported)
   ═══════════════════════════════════════════════════════════════════ */

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

function bpEdges(geo, color, opacity) {
    const edges = new THREE.EdgesGeometry(geo, 14);
    return new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
        color: color || BP.base, transparent: true,
        opacity: opacity !== undefined ? opacity : 0.5, depthWrite: false
    }));
}

function bpGlowEdges(geo, color) {
    const edges = new THREE.EdgesGeometry(geo, 14);
    return new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
        color: color || BP.accent, transparent: true, opacity: 0.0,
        blending: THREE.AdditiveBlending, depthWrite: false, linewidth: 1
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

function bpDimension(start, end, offset, color, opacity) {
    const grp = new THREE.Group();
    const dir = new THREE.Vector3().subVectors(end, start).normalize();
    const perp = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0, 0, 1)).normalize().multiplyScalar(offset);
    const a = new THREE.Vector3().addVectors(start, perp);
    const b = new THREE.Vector3().addVectors(end, perp);
    const c = color || BP.baseDim;
    const o = opacity || 0.2;
    // Main dimension line
    grp.add(bpLine(a, b, c, o));
    // Tick at start
    grp.add(bpLine(start, a, c, o * 0.7));
    // Tick at end
    grp.add(bpLine(end, b, c, o * 0.7));
    return grp;
}

function setGroupColor(group, color, opacity) {
    group.traverse(c => {
        if (c.material && c.material.isLineBasicMaterial) {
            c.material.color.set(color);
            if (opacity !== undefined) c.material.opacity = opacity;
        }
    });
}

function setGlowOpacity(glows, opacity) {
    glows.forEach(g => {
        if (g.material) g.material.opacity = opacity;
    });
}

// ── Reusable Component for Scenes ──
const BlueprintCanvas = ({ sceneId }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;
        let width = containerRef.current.clientWidth;
        let height = containerRef.current.clientHeight;

        // Fallback for containers that haven't been laid out yet
        if (width === 0) width = 300;
        if (height === 0) height = 400;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(22, width / height, 0.1, 100);
        camera.position.set(0, 0, 14);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);
        containerRef.current.appendChild(renderer.domElement);

        const group = new THREE.Group();
        scene.add(group);
        group.rotation.set(0.35, 0.5, 0);
        group.position.y = -0.2;

        // Interaction state
        let hovered = false;
        let hoverIntensity = 0;
        let time = 0;
        const mouse = { x: 0, y: 0 };
        const tRot = { x: 0, y: 0 };

        // Listeners
        const card = containerRef.current.closest('.div-card');
        const onEnter = () => { hovered = true; };
        const onLeave = () => { hovered = false; mouse.x = 0; mouse.y = 0; };
        const onMove = (e) => {
            const r = containerRef.current.getBoundingClientRect();
            mouse.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
            mouse.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
        };

        if (card) {
            card.addEventListener('mouseenter', onEnter);
            card.addEventListener('mouseleave', onLeave);
            card.addEventListener('mousemove', onMove);
        }

        // Setup Scene Content
        let updateFn = null;
        if (sceneId === 'eng') {
            updateFn = setupEngScene(group);
        } else if (sceneId === 'mfg') {
            updateFn = setupMfgScene(group);
        } else if (sceneId === 'cor') {
            updateFn = setupCorScene(group);
        } else if (sceneId === 'rub') {
            updateFn = setupRubScene(group);
        }

        // Animation Loop
        let frameId;
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            time += 0.016;

            // Interaction smoothing
            const targetHover = hovered ? 1 : 0;
            hoverIntensity += (targetHover - hoverIntensity) * 0.04;

            // Parallax
            tRot.y = mouse.x * 0.18;
            tRot.x = mouse.y * 0.1;
            group.rotation.y += (tRot.y - group.rotation.y) * 0.04;
            group.rotation.x += (tRot.x - group.rotation.x) * 0.04;

            if (updateFn) updateFn(time, hoverIntensity, hovered);

            renderer.render(scene, camera);
        };
        animate();

        // Access resize observer for responsiveness
        const resizeObserver = new ResizeObserver(() => {
            if (!containerRef.current) return;
            const w = containerRef.current.clientWidth;
            const h = containerRef.current.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        });
        resizeObserver.observe(containerRef.current);

        return () => {
            cancelAnimationFrame(frameId);
            resizeObserver.disconnect();
            if (card) {
                card.removeEventListener('mouseenter', onEnter);
                card.removeEventListener('mouseleave', onLeave);
                card.removeEventListener('mousemove', onMove);
            }
            if (renderer.domElement && containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [sceneId]);

    return <div className="three-wrap" ref={containerRef} />;
};


// ── Specific Scene Setups ──

function setupEngScene(group) {
    const sections = [];
    const glows = [];

    // 1. Vessel
    const vesselGrp = new THREE.Group();
    const vesselGlow = [];

    // Shell
    const vGeo = new THREE.CylinderGeometry(0.5, 0.5, 2.2, 28, 1, true);
    vesselGrp.add(bpEdges(vGeo, BP.base, 0.5));
    const vg = bpGlowEdges(vGeo); vesselGrp.add(vg); vesselGlow.push(vg);

    // Heads
    const headGeo = new THREE.SphereGeometry(0.5, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    const topH = bpEdges(headGeo, BP.base, 0.5); topH.position.y = 1.1; vesselGrp.add(topH);
    const topHg = bpGlowEdges(headGeo); topHg.position.y = 1.1; vesselGrp.add(topHg); vesselGlow.push(topHg);
    const botH = bpEdges(headGeo, BP.base, 0.5); botH.position.y = -1.1; botH.rotation.x = Math.PI; vesselGrp.add(botH);
    const botHg = bpGlowEdges(headGeo); botHg.position.y = -1.1; botHg.rotation.x = Math.PI; vesselGrp.add(botHg); vesselGlow.push(botHg);

    // Rings
    [-0.7, -0.35, 0, 0.35, 0.7].forEach(y => {
        const r = bpRing(0.505, 36, BP.baseDim, 0.18); r.rotation.x = Math.PI / 2; r.position.y = y; vesselGrp.add(r);
    });

    group.add(vesselGrp); sections.push(vesselGrp); glows.push(vesselGlow);

    // 2. Heat Exchanger
    const hxGrp = new THREE.Group();
    const hxGlow = [];
    const hxGeo = new THREE.CylinderGeometry(0.3, 0.3, 1.5, 22, 1, true);
    const hxShell = bpEdges(hxGeo, BP.base, 0.45); hxShell.rotation.z = Math.PI / 2; hxGrp.add(hxShell);
    const hxg = bpGlowEdges(hxGeo); hxg.rotation.z = Math.PI / 2; hxGrp.add(hxg); hxGlow.push(hxg);
    hxGrp.position.set(1.9, -0.4, -0.5);

    group.add(hxGrp); sections.push(hxGrp); glows.push(hxGlow);

    // 3. Piping
    const pipeGrp = new THREE.Group();
    const pipeGlow = [];
    // ... Simplified piping due to length ...
    const pSegs = [
        [new THREE.Vector3(0.99, 0.2, 0), new THREE.Vector3(1.5, 0.2, 0)],
        [new THREE.Vector3(1.5, 0.2, 0), new THREE.Vector3(1.5, -0.4, -0.5)],
        [new THREE.Vector3(0, 1.92, 0), new THREE.Vector3(-1.1, 2.25, 0)],
        [new THREE.Vector3(-1.1, 2.25, 0), new THREE.Vector3(-1.1, 0.0, 0)],
    ];
    pSegs.forEach(([a, b]) => pipeGrp.add(bpLine(a, b, BP.base, 0.4)));

    group.add(pipeGrp); sections.push(pipeGrp); glows.push(pipeGlow);

    // Grid Floor
    for (let i = -5; i <= 5; i++) {
        group.add(bpLine(new THREE.Vector3(i * 0.45, -1.5, -2.2), new THREE.Vector3(i * 0.45, -1.5, 2.2), BP.grid, 0.04));
        group.add(bpLine(new THREE.Vector3(-2.2, -1.5, i * 0.45), new THREE.Vector3(2.2, -1.5, i * 0.45), BP.grid, 0.04));
    }

    let activeSection = 0;
    let timer = 0;
    const CYCLE = 2.8;

    return (t, hover, isHovered) => {
        timer += 0.016;
        if (timer > CYCLE) { timer = 0; activeSection = (activeSection + 1) % sections.length; }
        const progress = timer / CYCLE;

        sections.forEach((sec, i) => {
            if (i === activeSection) {
                const baseOp = 0.12 + hover * 0.08;
                setGroupColor(sec, BP.accent, baseOp + (progress < 0.1 ? 0.4 : 0)); // Flash
                if (glows[i]) setGlowOpacity(glows[i], (baseOp + (progress < 0.1 ? 0.3 : 0)));
            } else {
                setGroupColor(sec, BP.base, 0.2 + hover * 0.12);
                if (glows[i]) setGlowOpacity(glows[i], 0);
            }
        });
    };
}

function setupMfgScene(group) {
    const sections = [];
    const glows = [];

    // Section 0: Main shell
    const shellGrp = new THREE.Group();
    const shellGlow = [];
    const sGeo = new THREE.CylinderGeometry(0.8, 0.8, 2.8, 36, 1, true);
    const s = bpEdges(sGeo, BP.base, 0.45); s.rotation.z = Math.PI / 2; shellGrp.add(s);
    const sg = bpGlowEdges(sGeo); sg.rotation.z = Math.PI / 2; shellGrp.add(sg); shellGlow.push(sg);
    // Longitudinal lines
    for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2; const r = 0.8;
        shellGrp.add(bpLine(
            new THREE.Vector3(-1.4, Math.sin(a) * r, Math.cos(a) * r),
            new THREE.Vector3(1.4, Math.sin(a) * r, Math.cos(a) * r),
            BP.baseGhost, 0.07
        ));
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

    // Section 2: Welds + internals
    const weldGrp = new THREE.Group();
    [-0.8, -0.4, 0, 0.4, 0.8].forEach(x => {
        const wr = bpRing(0.81, 44, BP.base, 0.4); wr.rotation.z = Math.PI / 2; wr.position.x = x; weldGrp.add(wr);
    });
    // Baffles
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
    });
    group.add(nozGrp); sections.push(nozGrp); glows.push(nozGlow);

    // Section 4: Saddles
    const saddleGrp = new THREE.Group();
    [-0.9, 0.9].forEach(x => {
        const base = bpEdges(new THREE.BoxGeometry(0.9, 0.04, 0.5), BP.base, 0.35);
        base.position.set(x, -0.84, 0); saddleGrp.add(base);
        const arcPts = [];
        for (let i = 0; i <= 24; i++) {
            const a = -Math.PI / 2 + (i / 24) * Math.PI;
            arcPts.push(new THREE.Vector3(x, Math.sin(a) * 0.8, Math.cos(a) * 0.42));
        }
        saddleGrp.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(arcPts),
            new THREE.LineBasicMaterial({ color: BP.base, transparent: true, opacity: 0.3 })));
    });
    group.add(saddleGrp); sections.push(saddleGrp); glows.push([]);

    // Floor grid
    for (let i = -4; i <= 4; i++) {
        group.add(bpLine(new THREE.Vector3(i * 0.45, -0.88, -1.5), new THREE.Vector3(i * 0.45, -0.88, 1.5), BP.grid, 0.035));
    }

    group.rotation.set(0.22, 0.4, 0);
    group.position.y = -0.1;

    let activeSection = 0, timer = 0;
    const CYCLE = 2.4;

    return (t, hover, isHovered) => {
        timer += 0.016;
        if (timer > CYCLE) { timer = 0; activeSection = (activeSection + 1) % sections.length; }
        const progress = timer / CYCLE;
        sections.forEach((sec, i) => {
            if (i === activeSection) {
                let fade;
                if (progress < 0.06) fade = Math.pow(progress / 0.06, 0.5);
                else if (progress < 0.12) fade = 1.0 - (progress - 0.06) / 0.06 * 0.2;
                else if (progress > 0.88) fade = (1 - progress) / 0.12;
                else fade = 0.8;
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


function setupCorScene(group) {
    // Coating/Lining Scene
    const sections = [];
    const glows = [];
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
        if (i >= 2) grp.add(bpWires(cGeo, BP.baseGhost, 0.05));

        // Top/bottom arcs
        [1, -1].forEach(dir => {
            const pts = [];
            for (let j = 0; j <= 44; j++) {
                const a = startAngle + (j / 44) * arc;
                pts.push(new THREE.Vector3(Math.cos(a) * l.r, dir * (h - i * 0.08) / 2, Math.sin(a) * l.r));
            }
            grp.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),
                new THREE.LineBasicMaterial({ color: BP.base, transparent: true, opacity: 0.25 })));
        });
        // Thickness annotation
        const annoY = (i - 1.5) * 0.45;
        grp.add(bpLine(new THREE.Vector3(l.r + 0.1, annoY, 0), new THREE.Vector3(l.r + 0.6, annoY, 0), BP.baseDim, 0.15));
        // Tick
        grp.add(bpLine(new THREE.Vector3(l.r + 0.6, annoY - 0.04, 0), new THREE.Vector3(l.r + 0.6, annoY + 0.04, 0), BP.baseDim, 0.15));
        // Dot at annotation end
        const dot = bpEdges(new THREE.SphereGeometry(0.02, 6, 6), BP.baseDim, 0.2);
        dot.position.set(l.r + 0.6, annoY, 0); grp.add(dot);

        group.add(grp); sections.push(grp); layerGrps.push(grp); glows.push(gw);
    });

    // Floor grid
    for (let i = -3; i <= 3; i++) {
        group.add(bpLine(new THREE.Vector3(i * 0.5, -1.5, -1.5), new THREE.Vector3(i * 0.5, -1.5, 1.5), BP.grid, 0.04));
        group.add(bpLine(new THREE.Vector3(-1.5, -1.5, i * 0.5), new THREE.Vector3(1.5, -1.5, i * 0.5), BP.grid, 0.04));
    }

    group.rotation.set(0.18, -0.3, 0);
    group.position.y = -0.05;

    let activeSection = 0, timer = 0, exploded = 0;
    const CYCLE = 2.8;

    return (t, hover, isHovered) => {
        timer += 0.016;
        if (timer > CYCLE) { timer = 0; activeSection = (activeSection + 1) % sections.length; }
        const progress = timer / CYCLE;

        const targetExplode = isHovered ? 1 : 0;
        exploded += (targetExplode - exploded) * 0.025;
        layerGrps.forEach((grp, i) => { grp.position.y = layerTargetY[i] * exploded * 0.6; });

        sections.forEach((sec, i) => {
            if (i === activeSection) {
                let fade;
                if (progress < 0.06) fade = Math.pow(progress / 0.06, 0.5);
                else if (progress < 0.12) fade = 1.0 - (progress - 0.06) / 0.06 * 0.2;
                else if (progress > 0.88) fade = (1 - progress) / 0.12;
                else fade = 0.8;
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

// Add helper for Wireframe if missing
function bpWires(geo, color, opacity) {
    return new THREE.LineSegments(new THREE.WireframeGeometry(geo), new THREE.LineBasicMaterial({
        color: color || BP.base, transparent: true,
        opacity: opacity !== undefined ? opacity : 0.2, depthWrite: false
    }));
}


function setupRubScene(group) {
    const sections = [];
    const glows = [];

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

    // Orbital dots
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
            center: Math.floor(Math.random() * nodeData.length)
        };
        group.add(dot); orbitals.push(dot);
    }

    // Floor grid
    for (let i = -4; i <= 4; i++) {
        group.add(bpLine(new THREE.Vector3(i * 0.5, -2, -2), new THREE.Vector3(i * 0.5, -2, 2), BP.grid, 0.03));
        group.add(bpLine(new THREE.Vector3(-2, -2, i * 0.5), new THREE.Vector3(2, -2, i * 0.5), BP.grid, 0.03));
    }

    group.rotation.set(0.12, 0.3, 0);
    group.position.y = -0.05;

    let activeSection = 0, timer = 0;
    const CYCLE = 2.5;

    return (t, hover, isHovered) => {
        timer += 0.016;
        if (timer > CYCLE) { timer = 0; activeSection = (activeSection + 1) % sections.length; }
        const progress = timer / CYCLE;

        // Float nodes
        nodeMeshes.forEach((m) => {
            const d = m.userData;
            m.position.x = d.basePos[0] + Math.sin(t * 0.4 + d.phase) * 0.06;
            m.position.y = d.basePos[1] + Math.cos(t * 0.5 + d.phase) * 0.08;
            m.position.z = d.basePos[2] + Math.sin(t * 0.35 + d.phase * 0.7) * 0.04;
        });
        // Update glow positions
        [mainGrp, branchGrp, crossGrp].forEach(g => {
            g.children.forEach(c => { if (c.userData && c.userData.parent) c.position.copy(c.userData.parent.position); });
        });
        // Update bonds
        bondGrp.children.forEach(line => {
            if (!line.userData || line.userData.a === undefined) return;
            const pa = nodeMeshes[line.userData.a].position;
            const pb = nodeMeshes[line.userData.b].position;
            const pos = line.geometry.attributes.position;
            pos.array[0] = pa.x; pos.array[1] = pa.y; pos.array[2] = pa.z;
            pos.array[3] = pb.x; pos.array[4] = pb.y; pos.array[5] = pb.z;
            pos.needsUpdate = true;
        });
        // Orbitals
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
                let fade;
                if (progress < 0.06) fade = Math.pow(progress / 0.06, 0.5);
                else if (progress < 0.12) fade = 1.0 - (progress - 0.06) / 0.06 * 0.2;
                else if (progress > 0.88) fade = (1 - progress) / 0.12;
                else fade = 0.8;
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

                    {/* ═══ 01 ENGINEERING ═══ */}
                    <div className="div-card">
                        <div className="div-visual eng">
                            <div className="bp-noise"></div>
                            <div className="bp-frame"></div>
                            <div className="bp-scanline"></div>
                            <div className="div-visual-num">01</div>
                            <div className="bp-status"><div className="bp-status-dot"></div>Active</div>
                            <div className="bp-corner tl"><svg width="14" height="14"><path d="M0 14V0h14" fill="none" stroke="rgba(59,123,219,0.18)" strokeWidth="1" /></svg></div>
                            <div className="bp-corner tr"><svg width="14" height="14"><path d="M14 14V0H0" fill="none" stroke="rgba(59,123,219,0.18)" strokeWidth="1" /></svg></div>
                            <div className="bp-corner bl"><svg width="14" height="14"><path d="M0 0v14h14" fill="none" stroke="rgba(59,123,219,0.18)" strokeWidth="1" /></svg></div>
                            <div className="bp-corner br"><svg width="14" height="14"><path d="M14 0v14H0" fill="none" stroke="rgba(59,123,219,0.18)" strokeWidth="1" /></svg></div>
                            <div className="bp-crosshair"><svg viewBox="0 0 24 24" fill="none"><line x1="12" y1="0" x2="12" y2="24" stroke="rgba(59,123,219,0.3)" strokeWidth="0.5" /><line x1="0" y1="12" x2="24" y2="12" stroke="rgba(59,123,219,0.3)" strokeWidth="0.5" /><circle cx="12" cy="12" r="4" stroke="rgba(59,123,219,0.15)" strokeWidth="0.5" fill="none" /></svg></div>
                            <div className="bp-label"><div className="bp-dot"></div>Engineering · 3D Plant Modelling</div>
                            <BlueprintCanvas sceneId="eng" />
                        </div>
                        <div className="div-content">
                            <div className="div-content-num">Division 01</div>
                            <h3 className="div-content-title">Engineering Design</h3>
                            <p className="div-content-desc">From concept to production-ready 3D models. Process, equipment, and piping design under one engineering team — with fabrication constraints built into every decision.</p>
                            <div className="div-stat-inline"><span className="num">SP3D</span><span className="label">+ ANSYS + CAESAR II</span></div>
                            <div className="div-pills">
                                <Link className="div-pill" to="#"><span>Process & Plant</span></Link>
                                <Link className="div-pill" to="#"><span>Equipment Design</span></Link>
                                <Link className="div-pill" to="#"><span>Piping Design</span></Link>
                                <Link className="div-pill" to="#"><span>Water Treatment</span></Link>
                            </div>
                            <Link className="div-explore" to="#">Explore Engineering <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
                        </div>
                    </div>

                    {/* ═══ 02 MANUFACTURING ═══ */}
                    <div className="div-card">
                        <div className="div-visual mfg">
                            <div className="bp-noise"></div>
                            <div className="bp-frame"></div>
                            <div className="bp-scanline"></div>
                            <div className="div-visual-num">02</div>
                            <div className="bp-status"><div className="bp-status-dot"></div>Active</div>
                            <div className="bp-corner tl"><svg width="14" height="14"><path d="M0 14V0h14" fill="none" stroke="rgba(59,123,219,0.18)" strokeWidth="1" /></svg></div>
                            <div className="bp-corner tr"><svg width="14" height="14"><path d="M14 14V0H0" fill="none" stroke="rgba(59,123,219,0.18)" strokeWidth="1" /></svg></div>
                            <div className="bp-corner bl"><svg width="14" height="14"><path d="M0 0v14h14" fill="none" stroke="rgba(59,123,219,0.18)" strokeWidth="1" /></svg></div>
                            <div className="bp-corner br"><svg width="14" height="14"><path d="M14 0v14H0" fill="none" stroke="rgba(59,123,219,0.18)" strokeWidth="1" /></svg></div>
                            <div className="bp-crosshair"><svg viewBox="0 0 24 24" fill="none"><line x1="12" y1="0" x2="12" y2="24" stroke="rgba(59,123,219,0.3)" strokeWidth="0.5" /><line x1="0" y1="12" x2="24" y2="12" stroke="rgba(59,123,219,0.3)" strokeWidth="0.5" /><circle cx="12" cy="12" r="4" stroke="rgba(59,123,219,0.15)" strokeWidth="0.5" fill="none" /></svg></div>
                            <div className="bp-label"><div className="bp-dot"></div>Fabrication · Pressure Vessel Manufacturing</div>
                            <BlueprintCanvas sceneId="mfg" />
                        </div>
                        <div className="div-content">
                            <div className="div-content-num">Division 02</div>
                            <h3 className="div-content-title">Equipment Manufacturing</h3>
                            <p className="div-content-desc">Steel, plastic, and FRP equipment fabricated to ASME, API, and PED standards. One of the largest integrated shop floors in the sector.</p>
                            <div className="div-stat-inline"><span className="num">130,000+</span><span className="label">m² combined shop floor</span></div>
                            <div className="div-pills">
                                <Link className="div-pill" to="#"><span>Steel Equipment</span></Link>
                                <Link className="div-pill" to="#"><span>Plastic & FRP</span></Link>
                            </div>
                            <Link className="div-explore" to="#">Explore Manufacturing <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
                        </div>
                    </div>

                    {/* ═══ 03 CORROSION PROTECTION ═══ */}
                    <div className="div-card">
                        <div className="div-visual cor">
                            <div className="bp-noise"></div>
                            <div className="bp-frame"></div>
                            <div className="bp-scanline"></div>
                            <div className="div-visual-num">03</div>
                            <div className="bp-status"><div className="bp-status-dot"></div>Active</div>
                            <div className="bp-corner tl"><svg width="14" height="14"><path d="M0 14V0h14" fill="none" stroke="rgba(59,123,219,0.18)" strokeWidth="1" /></svg></div>
                            <div className="bp-corner tr"><svg width="14" height="14"><path d="M14 14V0H0" fill="none" stroke="rgba(59,123,219,0.18)" strokeWidth="1" /></svg></div>
                            <div className="bp-corner bl"><svg width="14" height="14"><path d="M0 0v14h14" fill="none" stroke="rgba(59,123,219,0.18)" strokeWidth="1" /></svg></div>
                            <div className="bp-corner br"><svg width="14" height="14"><path d="M14 0v14H0" fill="none" stroke="rgba(59,123,219,0.18)" strokeWidth="1" /></svg></div>
                            <div className="bp-crosshair"><svg viewBox="0 0 24 24" fill="none"><line x1="12" y1="0" x2="12" y2="24" stroke="rgba(59,123,219,0.3)" strokeWidth="0.5" /><line x1="0" y1="12" x2="24" y2="12" stroke="rgba(59,123,219,0.3)" strokeWidth="0.5" /><circle cx="12" cy="12" r="4" stroke="rgba(59,123,219,0.15)" strokeWidth="0.5" fill="none" /></svg></div>
                            <div className="bp-label"><div className="bp-dot"></div>Protection · Rubber Lining Application</div>
                            <BlueprintCanvas sceneId="cor" />
                        </div>
                        <div className="div-content">
                            <div className="div-content-num">Division 03</div>
                            <h3 className="div-content-title">Corrosion Protection</h3>
                            <p className="div-content-desc">Rubber linings, plastic linings, coatings, and inspection services. HAW and GBT heritage — 40+ years protecting critical assets in the harshest chemical environments.</p>
                            <div className="div-stat-inline"><span className="num">40+</span><span className="label">years of lining expertise</span></div>
                            <div className="div-pills">
                                <Link className="div-pill" to="#"><span>Rubber Linings</span></Link>
                                <Link className="div-pill" to="#"><span>Plastic Linings</span></Link>
                                <Link className="div-pill" to="#"><span>Coatings & Resin</span></Link>
                                <Link className="div-pill" to="#"><span>Inspection & Repair</span></Link>
                            </div>
                            <Link className="div-explore" to="#">Explore Protection <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
                        </div>
                    </div>

                    {/* ═══ 04 RUBBER PRODUCTS ═══ */}
                    <div className="div-card">
                        <div className="div-visual rub">
                            <div className="bp-noise"></div>
                            <div className="bp-frame"></div>
                            <div className="bp-scanline"></div>
                            <div className="div-visual-num">04</div>
                            <div className="bp-status"><div className="bp-status-dot"></div>Active</div>
                            <div className="bp-corner tl"><svg width="14" height="14"><path d="M0 14V0h14" fill="none" stroke="rgba(59,123,219,0.18)" strokeWidth="1" /></svg></div>
                            <div className="bp-corner tr"><svg width="14" height="14"><path d="M14 14V0H0" fill="none" stroke="rgba(59,123,219,0.18)" strokeWidth="1" /></svg></div>
                            <div className="bp-corner bl"><svg width="14" height="14"><path d="M0 0v14h14" fill="none" stroke="rgba(59,123,219,0.18)" strokeWidth="1" /></svg></div>
                            <div className="bp-corner br"><svg width="14" height="14"><path d="M14 0v14H0" fill="none" stroke="rgba(59,123,219,0.18)" strokeWidth="1" /></svg></div>
                            <div className="bp-crosshair"><svg viewBox="0 0 24 24" fill="none"><line x1="12" y1="0" x2="12" y2="24" stroke="rgba(59,123,219,0.3)" strokeWidth="0.5" /><line x1="0" y1="12" x2="24" y2="12" stroke="rgba(59,123,219,0.3)" strokeWidth="0.5" /><circle cx="12" cy="12" r="4" stroke="rgba(59,123,219,0.15)" strokeWidth="0.5" fill="none" /></svg></div>
                            <div className="bp-label"><div className="bp-dot"></div>R&D · Compound Development Lab</div>
                            <BlueprintCanvas sceneId="rub" />
                        </div>
                        <div className="div-content">
                            <div className="div-content-num">Division 04</div>
                            <h3 className="div-content-title">Rubber Products</h3>
                            <p className="div-content-desc">Custom compounds and engineered rubber products. Four decades of formulation expertise — from natural rubber to advanced fluoroelastomers.</p>
                            <div className="div-stat-inline"><span className="num">2,000+</span><span class="label">proven formulations</span></div>
                            <div className="div-pills">
                                <Link className="div-pill" to="#"><span>Custom Compounds</span></Link>
                                <Link className="div-pill" to="#"><span>Engineered Products</span></Link>
                            </div>
                            <Link className="div-explore" to="#">Explore Rubber <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Divisions;
