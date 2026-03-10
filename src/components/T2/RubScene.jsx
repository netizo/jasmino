import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BlueprintScene } from './blueprintScene';
import {
  BP,
  bpEdges,
  bpGlowEdges,
  bpLine,
  setGroupColor,
  setGlowOpacity,
} from './blueprintHelpers';

export default function RubScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scene = new BlueprintScene(el, (group, scene3d, ctx) => {
      const sections = [];
      const glows = [];

      const nodeData = [
        { p: [-1.5, 0.0, 0.0], r: 0.26 },
        { p: [-0.7, 0.55, 0.25], r: 0.2 },
        { p: [0.0, -0.08, -0.15], r: 0.3 },
        { p: [0.75, 0.45, 0.35], r: 0.22 },
        { p: [1.4, -0.18, -0.08], r: 0.24 },
        { p: [2.0, 0.25, 0.15], r: 0.18 },
        { p: [-0.25, 1.2, 0.08], r: 0.18 },
        { p: [0.25, 1.75, -0.15], r: 0.16 },
        { p: [-0.45, -1.1, 0.25], r: 0.18 },
        { p: [0.55, -1.0, -0.08], r: 0.2 },
        { p: [1.2, -1.35, 0.15], r: 0.16 },
      ];
      const bonds = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [2, 6],
        [6, 7],
        [1, 8],
        [3, 9],
        [8, 9],
        [9, 10],
      ];

      const mainGrp = new THREE.Group();
      const mainGlow = [];
      const branchGrp = new THREE.Group();
      const branchGlow = [];
      const crossGrp = new THREE.Group();
      const crossGlow = [];
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
        if (i <= 5) {
          tG = mainGrp;
          tGl = mainGlow;
        } else if (i <= 7) {
          tG = branchGrp;
          tGl = branchGlow;
        } else {
          tG = crossGrp;
          tGl = crossGlow;
        }

        tG.add(edges);
        tG.add(glow);
        tGl.push(glow);
        nodeMeshes.push(edges);
      });

      bonds.forEach(([a, b]) => {
        const line = bpLine(
          new THREE.Vector3(...nodeData[a].p),
          new THREE.Vector3(...nodeData[b].p),
          BP.base,
          0.25
        );
        line.userData = { a, b };
        bondGrp.add(line);
      });

      group.add(mainGrp);
      group.add(branchGrp);
      group.add(crossGrp);
      group.add(bondGrp);
      sections.push(mainGrp);
      sections.push(branchGrp);
      sections.push(crossGrp);
      sections.push(bondGrp);
      glows.push(mainGlow);
      glows.push(branchGlow);
      glows.push(crossGlow);
      glows.push([]);

      const orbitals = [];
      for (let i = 0; i < 12; i++) {
        const dot = new THREE.Points(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0)]),
          new THREE.PointsMaterial({
            color: BP.accent,
            size: 0.035,
            transparent: true,
            opacity: 0.45,
            sizeAttenuation: true,
          })
        );
        dot.userData = {
          orbit: 0.3 + Math.random() * 0.25,
          speed: 0.4 + Math.random() * 0.5,
          phase: Math.random() * Math.PI * 2,
          tilt: (Math.random() - 0.5) * Math.PI * 0.5,
          center: Math.floor(Math.random() * nodeData.length),
        };
        group.add(dot);
        orbitals.push(dot);
      }

      for (let i = -4; i <= 4; i++) {
        group.add(
          bpLine(
            new THREE.Vector3(i * 0.5, -2, -2),
            new THREE.Vector3(i * 0.5, -2, 2),
            BP.grid,
            0.03
          )
        );
        group.add(
          bpLine(
            new THREE.Vector3(-2, -2, i * 0.5),
            new THREE.Vector3(2, -2, i * 0.5),
            BP.grid,
            0.03
          )
        );
      }

      group.rotation.set(0.12, 0.3, 0);
      group.position.y = -0.05;

      let activeSection = 0;
      let timer = 0;
      const CYCLE = 2.5;

      return (t, hover) => {
        timer += 0.016;
        if (timer > CYCLE) {
          timer = 0;
          activeSection = (activeSection + 1) % sections.length;
        }
        const progress = timer / CYCLE;

        nodeMeshes.forEach((m, i) => {
          const d = m.userData;
          m.position.x = d.basePos[0] + Math.sin(t * 0.4 + d.phase) * 0.06;
          m.position.y = d.basePos[1] + Math.cos(t * 0.5 + d.phase) * 0.08;
          m.position.z = d.basePos[2] + Math.sin(t * 0.35 + d.phase * 0.7) * 0.04;
        });
        [mainGrp, branchGrp, crossGrp].forEach((g) => {
          g.children.forEach((c) => {
            if (c.userData && c.userData.parent) c.position.copy(c.userData.parent.position);
          });
        });
        bondGrp.children.forEach((line) => {
          if (!line.userData || line.userData.a === undefined) return;
          const pa = nodeMeshes[line.userData.a].position;
          const pb = nodeMeshes[line.userData.b].position;
          const pos = line.geometry.attributes.position;
          pos.array[0] = pa.x;
          pos.array[1] = pa.y;
          pos.array[2] = pa.z;
          pos.array[3] = pb.x;
          pos.array[4] = pb.y;
          pos.array[5] = pb.z;
          pos.needsUpdate = true;
        });
        orbitals.forEach((o) => {
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
            else if (progress < 0.12) fade = 1.0 - ((progress - 0.06) / 0.06) * 0.2;
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
    });

    return () => scene.destroy();
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: 400 }} />;
}
