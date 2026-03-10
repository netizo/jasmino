import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BlueprintScene } from './blueprintScene';
import {
  BP,
  bpEdges,
  bpGlowEdges,
  bpLine,
  bpWire,
  setGroupColor,
  setGlowOpacity,
} from './blueprintHelpers';

export default function CorScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scene = new BlueprintScene(el, (group, scene3d, ctx) => {
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
        const cg = bpGlowEdges(cGeo);
        grp.add(cg);
        gw.push(cg);
        if (i >= 2) grp.add(bpWire(cGeo, BP.baseGhost, 0.05));

        [1, -1].forEach((dir) => {
          const pts = [];
          for (let j = 0; j <= 44; j++) {
            const a = startAngle + (j / 44) * arc;
            pts.push(
              new THREE.Vector3(
                Math.cos(a) * l.r,
                dir * (h - i * 0.08) / 2,
                Math.sin(a) * l.r
              )
            );
          }
          grp.add(
            new THREE.Line(
              new THREE.BufferGeometry().setFromPoints(pts),
              new THREE.LineBasicMaterial({ color: BP.base, transparent: true, opacity: 0.25 })
            )
          );
        });
        const annoY = (i - 1.5) * 0.45;
        grp.add(
          bpLine(
            new THREE.Vector3(l.r + 0.1, annoY, 0),
            new THREE.Vector3(l.r + 0.6, annoY, 0),
            BP.baseDim,
            0.15
          )
        );
        grp.add(
          bpLine(
            new THREE.Vector3(l.r + 0.6, annoY - 0.04, 0),
            new THREE.Vector3(l.r + 0.6, annoY + 0.04, 0),
            BP.baseDim,
            0.15
          )
        );
        const dot = bpEdges(new THREE.SphereGeometry(0.02, 6, 6), BP.baseDim, 0.2);
        dot.position.set(l.r + 0.6, annoY, 0);
        grp.add(dot);

        group.add(grp);
        sections.push(grp);
        layerGrps.push(grp);
        glows.push(gw);
      });

      for (let i = -3; i <= 3; i++) {
        group.add(
          bpLine(
            new THREE.Vector3(i * 0.5, -1.5, -1.5),
            new THREE.Vector3(i * 0.5, -1.5, 1.5),
            BP.grid,
            0.04
          )
        );
        group.add(
          bpLine(
            new THREE.Vector3(-1.5, -1.5, i * 0.5),
            new THREE.Vector3(1.5, -1.5, i * 0.5),
            BP.grid,
            0.04
          )
        );
      }

      group.rotation.set(0.18, -0.3, 0);
      group.position.y = -0.05;

      let activeSection = 0;
      let timer = 0;
      let exploded = 0;
      const CYCLE = 2.8;

      return (t, hover) => {
        timer += 0.016;
        if (timer > CYCLE) {
          timer = 0;
          activeSection = (activeSection + 1) % sections.length;
        }
        const progress = timer / CYCLE;

        const targetExplode = ctx.hovered ? 1 : 0;
        exploded += (targetExplode - exploded) * 0.025;
        layerGrps.forEach((grp, i) => {
          grp.position.y = layerTargetY[i] * exploded * 0.6;
        });

        sections.forEach((sec, i) => {
          if (i === activeSection) {
            let fade;
            if (progress < 0.06) fade = Math.pow(progress / 0.06, 0.5);
            else if (progress < 0.12) fade = 1.0 - ((progress - 0.06) / 0.06) * 0.2;
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
    });

    return () => scene.destroy();
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: 400 }} />;
}
