import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BlueprintScene } from './blueprintScene';
import {
  BP,
  bpEdges,
  bpGlowEdges,
  bpLine,
  bpRing,
  bpDimension,
  setGroupColor,
  setGlowOpacity,
} from './blueprintHelpers';

export default function MfgScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scene = new BlueprintScene(el, (group, scene3d, ctx) => {
      const sections = [];
      const glows = [];

      // ── Section 0: Main shell ──
      const shellGrp = new THREE.Group();
      const shellGlow = [];
      const sGeo = new THREE.CylinderGeometry(0.8, 0.8, 2.8, 36, 1, true);
      const s = bpEdges(sGeo, BP.base, 0.45);
      s.rotation.z = Math.PI / 2;
      shellGrp.add(s);
      const sg = bpGlowEdges(sGeo);
      sg.rotation.z = Math.PI / 2;
      shellGrp.add(sg);
      shellGlow.push(sg);
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        const r = 0.8;
        shellGrp.add(
          bpLine(
            new THREE.Vector3(-1.4, Math.sin(a) * r, Math.cos(a) * r),
            new THREE.Vector3(1.4, Math.sin(a) * r, Math.cos(a) * r),
            BP.baseGhost,
            0.07
          )
        );
      }
      group.add(shellGrp);
      sections.push(shellGrp);
      glows.push(shellGlow);

      // ── Section 1: Heads ──
      const headGrp = new THREE.Group();
      const headGlow = [];
      const hGeo = new THREE.SphereGeometry(0.8, 28, 16, 0, Math.PI * 2, 0, Math.PI / 2.5);
      const lH = bpEdges(hGeo, BP.base, 0.45);
      lH.rotation.z = -Math.PI / 2;
      lH.position.x = -1.4;
      headGrp.add(lH);
      const lHg = bpGlowEdges(hGeo);
      lHg.rotation.z = -Math.PI / 2;
      lHg.position.x = -1.4;
      headGrp.add(lHg);
      headGlow.push(lHg);
      const rH = bpEdges(hGeo, BP.base, 0.45);
      rH.rotation.z = Math.PI / 2;
      rH.position.x = 1.4;
      headGrp.add(rH);
      const rHg = bpGlowEdges(hGeo);
      rHg.rotation.z = Math.PI / 2;
      rHg.position.x = 1.4;
      headGrp.add(rHg);
      headGlow.push(rHg);
      group.add(headGrp);
      sections.push(headGrp);
      glows.push(headGlow);

      // ── Section 2: Welds + internals ──
      const weldGrp = new THREE.Group();
      [-0.8, -0.4, 0, 0.4, 0.8].forEach((x) => {
        const wr = bpRing(0.81, 44, BP.base, 0.4);
        wr.rotation.z = Math.PI / 2;
        wr.position.x = x;
        weldGrp.add(wr);
        const wr2 = bpRing(0.84, 44, BP.baseDim, 0.12);
        wr2.rotation.z = Math.PI / 2;
        wr2.position.x = x;
        weldGrp.add(wr2);
      });
      for (let i = -3; i <= 3; i++) {
        const b = bpEdges(new THREE.CircleGeometry(0.72, 28), BP.baseGhost, 0.06);
        b.rotation.y = Math.PI / 2;
        b.position.x = i * 0.36;
        weldGrp.add(b);
      }
      group.add(weldGrp);
      sections.push(weldGrp);
      glows.push([]);

      // ── Section 3: Nozzles ──
      const nozGrp = new THREE.Group();
      const nozGlow = [];
      [
        [-0.3, 0.14],
        [0.5, 0.09],
        [-0.9, 0.08],
      ].forEach(([x, r]) => {
        const nGeo = new THREE.CylinderGeometry(r, r, 0.5, 14);
        nozGrp.add(bpEdges(nGeo, BP.base, 0.45).translateX(x).translateY(1.05));
        const ng = bpGlowEdges(nGeo);
        ng.position.set(x, 1.05, 0);
        nozGrp.add(ng);
        nozGlow.push(ng);
        const fGeo = new THREE.CylinderGeometry(r + 0.05, r + 0.05, 0.04, 14);
        nozGrp.add(bpEdges(fGeo, BP.base, 0.45).translateX(x).translateY(1.3));
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2;
          nozGrp.add(
            bpEdges(new THREE.CylinderGeometry(0.01, 0.01, 0.05, 6), BP.baseDim, 0.25)
              .translateX(x + Math.cos(a) * (r + 0.025))
              .translateY(1.3)
              .translateZ(Math.sin(a) * (r + 0.025))
          );
        }
        const rpGeo = new THREE.TorusGeometry(r + 0.01, 0.015, 6, 16);
        nozGrp.add(bpEdges(rpGeo, BP.baseDim, 0.15).translateX(x).translateY(0.82));
      });
      group.add(nozGrp);
      sections.push(nozGrp);
      glows.push(nozGlow);

      // ── Section 4: Saddles ──
      const saddleGrp = new THREE.Group();
      [-0.9, 0.9].forEach((x) => {
        const base = bpEdges(new THREE.BoxGeometry(0.9, 0.04, 0.5), BP.base, 0.35);
        base.position.set(x, -0.84, 0);
        saddleGrp.add(base);
        const arcPts = [];
        for (let i = 0; i <= 24; i++) {
          const a = -Math.PI / 2 + (i / 24) * Math.PI;
          arcPts.push(new THREE.Vector3(x, Math.sin(a) * 0.8, Math.cos(a) * 0.42));
        }
        saddleGrp.add(
          new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(arcPts),
            new THREE.LineBasicMaterial({ color: BP.base, transparent: true, opacity: 0.3 })
          )
        );
        saddleGrp.add(
          bpLine(new THREE.Vector3(x - 0.38, -0.84, 0), new THREE.Vector3(x - 0.38, 0, 0), BP.baseDim, 0.15)
        );
        saddleGrp.add(
          bpLine(new THREE.Vector3(x + 0.38, -0.84, 0), new THREE.Vector3(x + 0.38, 0, 0), BP.baseDim, 0.15)
        );
        saddleGrp.add(
          bpLine(new THREE.Vector3(x - 0.38, -0.84, 0), new THREE.Vector3(x, -0.4, 0), BP.baseGhost, 0.1)
        );
        saddleGrp.add(
          bpLine(new THREE.Vector3(x + 0.38, -0.84, 0), new THREE.Vector3(x, -0.4, 0), BP.baseGhost, 0.1)
        );
      });
      group.add(saddleGrp);
      sections.push(saddleGrp);
      glows.push([]);

      group.add(
        bpDimension(new THREE.Vector3(-1.4, -0.9, 0.5), new THREE.Vector3(1.4, -0.9, 0.5), 0.25, BP.baseDim, 0.1)
      );

      for (let i = -4; i <= 4; i++) {
        group.add(
          bpLine(
            new THREE.Vector3(i * 0.45, -0.88, -1.5),
            new THREE.Vector3(i * 0.45, -0.88, 1.5),
            BP.grid,
            0.035
          )
        );
      }

      group.rotation.set(0.22, 0.4, 0);
      group.position.y = -0.1;

      let activeSection = 0;
      let timer = 0;
      const CYCLE = 2.4;

      return (t, hover) => {
        timer += 0.016;
        if (timer > CYCLE) {
          timer = 0;
          activeSection = (activeSection + 1) % sections.length;
        }
        const progress = timer / CYCLE;
        sections.forEach((sec, i) => {
          if (i === activeSection) {
            let fade;
            if (progress < 0.06) fade = Math.pow(progress / 0.06, 0.5);
            else if (progress < 0.12) fade = 1.0 - ((progress - 0.06) / 0.06) * 0.2;
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
    });

    return () => scene.destroy();
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: 400 }} />;
}
