/**
 * Blueprint rendering helpers — from jasmino-s2-v4.html
 * Shared by EngScene, MfgScene, CorScene, RubScene
 */
import * as THREE from 'three';

export const BP = {
  base: 0x2a4a6e,
  baseBright: 0x3a6a9e,
  baseDim: 0x18304a,
  baseGhost: 0x142840,
  accent: 0x1DB954,
  accentDim: 0x037a48,
  accentGlow: 0x1DB954,
  grid: 0x1a3458,
};

export function bpEdges(geo, color, opacity) {
  const edges = new THREE.EdgesGeometry(geo, 14);
  return new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
    color: color || BP.base,
    transparent: true,
    opacity: opacity !== undefined ? opacity : 0.5,
    depthWrite: false,
  }));
}

export function bpWire(geo, color, opacity) {
  return new THREE.LineSegments(new THREE.WireframeGeometry(geo), new THREE.LineBasicMaterial({
    color: color || BP.base,
    transparent: true,
    opacity: opacity !== undefined ? opacity : 0.2,
    depthWrite: false,
  }));
}

export function bpLine(a, b, color, opacity) {
  return new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([a, b]),
    new THREE.LineBasicMaterial({ color: color || BP.base, transparent: true, opacity: opacity || 0.35 })
  );
}

export function bpRing(radius, segments, color, opacity) {
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

export function bpGlowEdges(geo, color) {
  const edges = new THREE.EdgesGeometry(geo, 14);
  return new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
    color: color || BP.accent,
    transparent: true,
    opacity: 0.0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    linewidth: 1,
  }));
}

export function bpDimension(start, end, offset, color, opacity) {
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

export function setGroupColor(group, color, opacity) {
  group.traverse((c) => {
    if (c.material && c.material.isLineBasicMaterial) {
      c.material.color.set(color);
      if (opacity !== undefined) c.material.opacity = opacity;
    }
  });
}

export function setGlowOpacity(glows, opacity) {
  glows.forEach((g) => {
    if (g.material) g.material.opacity = opacity;
  });
}
