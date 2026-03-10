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

export default function EngScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scene = new BlueprintScene(el, (group, scene3d, ctx) => {
      const sections = [];
      const glows = [];

      // ── Section 0: Vertical pressure vessel (highly detailed) ──
      const vesselGrp = new THREE.Group();
      const vesselGlow = [];

      const vGeo = new THREE.CylinderGeometry(0.5, 0.5, 2.2, 28, 1, true);
      vesselGrp.add(bpEdges(vGeo, BP.base, 0.5));
      const vg = bpGlowEdges(vGeo);
      vesselGrp.add(vg);
      vesselGlow.push(vg);

      const headGeo = new THREE.SphereGeometry(0.5, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2);
      const topH = bpEdges(headGeo, BP.base, 0.5);
      topH.position.y = 1.1;
      vesselGrp.add(topH);
      const topHg = bpGlowEdges(headGeo);
      topHg.position.y = 1.1;
      vesselGrp.add(topHg);
      vesselGlow.push(topHg);
      const botH = bpEdges(headGeo, BP.base, 0.5);
      botH.position.y = -1.1;
      botH.rotation.x = Math.PI;
      vesselGrp.add(botH);
      const botHg = bpGlowEdges(headGeo);
      botHg.position.y = -1.1;
      botHg.rotation.x = Math.PI;
      vesselGrp.add(botHg);
      vesselGlow.push(botHg);

      [-0.7, -0.35, 0, 0.35, 0.7].forEach((y) => {
        const r = bpRing(0.505, 36, BP.baseDim, 0.18);
        r.rotation.x = Math.PI / 2;
        r.position.y = y;
        vesselGrp.add(r);
      });

      const nGeo1 = new THREE.CylinderGeometry(0.1, 0.1, 0.55, 14);
      vesselGrp.add(bpEdges(nGeo1, BP.base, 0.5).translateY(1.65));
      const fGeo1 = new THREE.CylinderGeometry(0.19, 0.19, 0.05, 14);
      vesselGrp.add(bpEdges(fGeo1, BP.base, 0.5).translateY(1.92));
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        const bGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.06, 6);
        const bolt = bpEdges(bGeo, BP.baseDim, 0.3);
        bolt.position.set(Math.cos(a) * 0.155, 1.92, Math.sin(a) * 0.155);
        vesselGrp.add(bolt);
      }
      const padGeo = new THREE.TorusGeometry(0.13, 0.02, 8, 20);
      const pad = bpEdges(padGeo, BP.baseDim, 0.2);
      pad.position.y = 1.38;
      vesselGrp.add(pad);

      const snGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.5, 12);
      const sn = bpEdges(snGeo, BP.base, 0.5);
      sn.rotation.z = Math.PI / 2;
      sn.position.set(0.74, 0.2, 0);
      vesselGrp.add(sn);
      const sfGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.04, 12);
      const sf = bpEdges(sfGeo, BP.base, 0.5);
      sf.rotation.z = Math.PI / 2;
      sf.position.set(0.99, 0.2, 0);
      vesselGrp.add(sf);
      const sp = bpEdges(new THREE.TorusGeometry(0.1, 0.015, 8, 16), BP.baseDim, 0.18);
      sp.rotation.z = Math.PI / 2;
      sp.position.set(0.5, 0.2, 0);
      vesselGrp.add(sp);

      const boGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.35, 10);
      vesselGrp.add(bpEdges(boGeo, BP.baseDim, 0.35).translateY(-1.52));

      const mwGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.12, 16);
      const mw = bpEdges(mwGeo, BP.baseDim, 0.3);
      mw.rotation.x = Math.PI / 2;
      mw.position.set(0, 0.5, 0.51);
      vesselGrp.add(mw);

      [-0.5, 0, 0.5].forEach((y) => {
        const tray = bpEdges(new THREE.CircleGeometry(0.46, 20), BP.baseGhost, 0.08);
        tray.rotation.x = -Math.PI / 2;
        tray.position.y = y;
        vesselGrp.add(tray);
      });

      group.add(vesselGrp);
      sections.push(vesselGrp);
      glows.push(vesselGlow);

      // ── Section 1: Heat exchanger ──
      const hxGrp = new THREE.Group();
      const hxGlow = [];
      const hxGeo = new THREE.CylinderGeometry(0.3, 0.3, 1.5, 22, 1, true);
      const hxShell = bpEdges(hxGeo, BP.base, 0.45);
      hxShell.rotation.z = Math.PI / 2;
      hxGrp.add(hxShell);
      const hxg = bpGlowEdges(hxGeo);
      hxg.rotation.z = Math.PI / 2;
      hxGrp.add(hxg);
      hxGlow.push(hxg);

      [-0.75, 0.75].forEach((x) => {
        const ts = bpEdges(new THREE.CylinderGeometry(0.3, 0.3, 0.04, 22), BP.base, 0.45);
        ts.rotation.z = Math.PI / 2;
        ts.position.x = x;
        hxGrp.add(ts);
      });
      const chGeo = new THREE.SphereGeometry(0.3, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2);
      const ch = bpEdges(chGeo, BP.base, 0.35);
      ch.rotation.z = Math.PI / 2;
      ch.position.x = -0.78;
      hxGrp.add(ch);

      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI * 2;
        const r = 0.14;
        hxGrp.add(
          bpLine(
            new THREE.Vector3(-0.72, Math.sin(a) * r, Math.cos(a) * r),
            new THREE.Vector3(0.72, Math.sin(a) * r, Math.cos(a) * r),
            BP.baseGhost,
            0.1
          )
        );
      }
      [-0.3, 0, 0.3].forEach((x) => {
        const b = bpEdges(new THREE.CircleGeometry(0.27, 16), BP.baseGhost, 0.06);
        b.rotation.y = Math.PI / 2;
        b.position.x = x;
        hxGrp.add(b);
      });
      [-0.4, 0.4].forEach((x) => {
        hxGrp.add(bpLine(new THREE.Vector3(x, -0.3, 0), new THREE.Vector3(x, -0.7, 0), BP.baseDim, 0.2));
        hxGrp.add(
          bpEdges(new THREE.BoxGeometry(0.25, 0.03, 0.15), BP.baseDim, 0.2).translateX(x).translateY(-0.72)
        );
      });

      hxGrp.position.set(1.9, -0.4, -0.5);
      group.add(hxGrp);
      sections.push(hxGrp);
      glows.push(hxGlow);

      // ── Section 2: Piping + pump ──
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
        const elbow = bpEdges(new THREE.SphereGeometry(0.035, 8, 6), BP.base, 0.3);
        elbow.position.set(x, y, z);
        pipeGrp.add(elbow);
      });
      const valve = bpEdges(new THREE.CylinderGeometry(0.06, 0.06, 0.15, 10), BP.base, 0.4);
      valve.position.set(-1.1, 1.2, 0);
      pipeGrp.add(valve);
      const vHandle = bpEdges(new THREE.BoxGeometry(0.18, 0.02, 0.02), BP.base, 0.35);
      vHandle.position.set(-1.1, 1.28, 0);
      pipeGrp.add(vHandle);

      const pumpGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.22, 14);
      pipeGrp.add(bpEdges(pumpGeo, BP.base, 0.45).translateX(-1.1).translateY(-0.15));
      const pg = bpGlowEdges(pumpGeo);
      pg.position.set(-1.1, -0.15, 0);
      pipeGrp.add(pg);
      pipeGlow.push(pg);
      pipeGrp.add(
        bpEdges(new THREE.BoxGeometry(0.45, 0.06, 0.35), BP.base, 0.4).translateX(-1.1).translateY(-0.3)
      );
      pipeGrp.add(
        bpEdges(new THREE.CylinderGeometry(0.1, 0.1, 0.25, 10), BP.baseDim, 0.25)
          .translateX(-1.1)
          .translateY(-0.15)
          .rotateX(Math.PI / 2)
          .translateY(-0.25)
      );

      group.add(pipeGrp);
      sections.push(pipeGrp);
      glows.push(pipeGlow);

      // ── Section 3: Structural frame ──
      const rackGrp = new THREE.Group();
      [-1.5, 1.5].forEach((x) => {
        [-0.4, 0.4].forEach((z) => {
          rackGrp.add(
            bpLine(new THREE.Vector3(x, -1.5, z), new THREE.Vector3(x, 2.5, z), BP.baseDim, 0.18)
          );
        });
      });
      [-0.3, 0.8, 1.6, 2.5].forEach((y) => {
        rackGrp.add(
          bpLine(new THREE.Vector3(-1.5, y, -0.4), new THREE.Vector3(1.5, y, -0.4), BP.baseGhost, 0.12)
        );
        rackGrp.add(
          bpLine(new THREE.Vector3(-1.5, y, 0.4), new THREE.Vector3(1.5, y, 0.4), BP.baseGhost, 0.12)
        );
      });
      rackGrp.add(
        bpLine(new THREE.Vector3(-1.5, -0.3, -0.4), new THREE.Vector3(-1.5, 0.8, 0.4), BP.baseGhost, 0.08)
      );
      rackGrp.add(
        bpLine(new THREE.Vector3(1.5, -0.3, 0.4), new THREE.Vector3(1.5, 0.8, -0.4), BP.baseGhost, 0.08)
      );

      group.add(rackGrp);
      sections.push(rackGrp);
      glows.push([]);

      group.add(
        bpDimension(new THREE.Vector3(-0.5, -1.6, 0.5), new THREE.Vector3(0.5, -1.6, 0.5), 0.25, BP.baseDim, 0.12)
      );
      group.add(
        bpDimension(new THREE.Vector3(-0.55, -1.1, 0.5), new THREE.Vector3(-0.55, 1.1, 0.5), 0.3, BP.baseDim, 0.1)
      );

      for (let i = -5; i <= 5; i++) {
        group.add(
          bpLine(
            new THREE.Vector3(i * 0.45, -1.5, -2.2),
            new THREE.Vector3(i * 0.45, -1.5, 2.2),
            BP.grid,
            0.04
          )
        );
        group.add(
          bpLine(
            new THREE.Vector3(-2.2, -1.5, i * 0.45),
            new THREE.Vector3(2.2, -1.5, i * 0.45),
            BP.grid,
            0.04
          )
        );
      }

      group.rotation.set(0.35, 0.5, 0);
      group.position.y = -0.2;

      let activeSection = 0;
      let timer = 0;
      const CYCLE = 2.8;

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
            const baseOp = 0.12 + hover * 0.08;
            setGroupColor(sec, BP.accent, fade * 0.65 + baseOp);
            if (glows[i]) setGlowOpacity(glows[i], fade * 0.25);
          } else {
            const dimOp = 0.2 + hover * 0.12;
            setGroupColor(sec, BP.base, dimOp);
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
