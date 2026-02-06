import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import '../styles/global-presence.css';

/* ══════════════════════════════════════════════════════════════════
   GLOBAL PRESENCE SECTION — Using Jasmino Dotted Globe
   Ported from user's standalone globe script
   ══════════════════════════════════════════════════════════════════ */

const GLOBE = {
    radius: 2.2,
    rows: 120,
    dotSize: 0.016,
    autoRotate: 0.15,
    mouseFactor: 0.3,
    damping: 0.04,
    colors: {
        land: 0x2a3a52,
        landLight: 0x4a607a,
        ocean: 0xd0d4da,
        presence: 0x04E586,
        ring: 0x04E586,
        atmo: 0x1B4B8F,
        atmoGlow: 0x04E586,
    },
};

const LOCATIONS = [
    { lat: 19.0, lng: 73.0, name: 'Jasmino HQ', type: 'hq' },
    { lat: 51.5, lng: 7.0, name: 'HAW Linings', type: 'facility' },
    { lat: 40.0, lng: 29.0, name: 'GBT', type: 'facility' },
    { lat: 25.3, lng: 55.3, type: 'service' },
    { lat: 25.3, lng: 51.5, type: 'service' },
    { lat: 26.2, lng: 50.6, type: 'service' },
    { lat: 23.6, lng: 58.5, type: 'service' },
    { lat: 24.7, lng: 46.7, type: 'service' },
    { lat: 29.4, lng: 48.0, type: 'service' },
    { lat: 1.35, lng: 103.8, type: 'service' },
    { lat: 3.14, lng: 101.7, type: 'service' },
    { lat: -6.2, lng: 106.8, type: 'service' },
    { lat: 13.8, lng: 100.5, type: 'service' },
    { lat: -33.9, lng: 18.4, type: 'service' },
    { lat: 30.0, lng: 31.2, type: 'service' },
    { lat: -25.7, lng: 28.2, type: 'service' },
    { lat: 52.5, lng: 13.4, type: 'service' },
    { lat: 48.9, lng: 2.35, type: 'service' },
    { lat: 41.0, lng: -73.9, type: 'service' },
    { lat: -23.5, lng: -46.6, type: 'service' },
    { lat: -33.4, lng: 151.2, type: 'service' },
];

/* ── Helpers ── */
function latLngToVec3(lat, lng, r) {
    const phi = (90 - lat) * Math.PI / 180;
    const theta = (lng + 180) * Math.PI / 180;
    return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
    );
}

function nearPresence(lat, lng) {
    for (const loc of LOCATIONS) {
        const d = Math.sqrt((lat - loc.lat) ** 2 + (lng - loc.lng) ** 2);
        if (d < 4) return loc;
    }
    return null;
}

function hash(x, y) {
    let h = x * 374761393 + y * 668265263;
    h = (h ^ (h >> 13)) * 1274126177;
    return (h ^ (h >> 16)) & 0x7fffffff;
}

function decodeTopojson(topo, objectName) {
    const obj = topo.objects[objectName];
    const arcs = topo.arcs;
    const tf = topo.transform;
    const polygons = [];

    function decodeArc(idx) {
        const rev = idx < 0;
        const arc = arcs[rev ? ~idx : idx];
        const coords = [];
        let x = 0, y = 0;
        for (const pt of arc) {
            x += pt[0]; y += pt[1];
            coords.push([
                x * tf.scale[0] + tf.translate[0],
                y * tf.scale[1] + tf.translate[1]
            ]);
        }
        return rev ? coords.reverse() : coords;
    }

    function decodeRing(arcIdxs) {
        let ring = [];
        for (const idx of arcIdxs) ring = ring.concat(decodeArc(idx));
        return ring;
    }

    function processGeometry(geom) {
        if (geom.type === 'Polygon') {
            geom.arcs.forEach(r => polygons.push(decodeRing(r)));
        } else if (geom.type === 'MultiPolygon') {
            geom.arcs.forEach(poly => poly.forEach(r => polygons.push(decodeRing(r))));
        } else if (geom.type === 'GeometryCollection') {
            geom.geometries.forEach(g => processGeometry(g));
        }
    }
    processGeometry(obj);
    return polygons;
}

function pointInPolygon(x, y, ring) {
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const xi = ring[i][0], yi = ring[i][1];
        const xj = ring[j][0], yj = ring[j][1];
        if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) {
            inside = !inside;
        }
    }
    return inside;
}

function isLandCheck(lng, lat, polys) {
    for (const ring of polys) {
        if (pointInPolygon(lng, lat, ring)) return true;
    }
    return false;
}

/* ── Globe Component ── */
const Globe = () => {
    const containerRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const initRef = useRef(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el || initRef.current) return;
        initRef.current = true;

        const w = el.clientWidth || 640;
        const h = el.clientHeight || 540;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(30, w / h, 0.1, 100);
        camera.position.set(0, 0.2, 9.5);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(w, h);
        renderer.setClearColor(0x000000, 0);
        el.appendChild(renderer.domElement);

        const globe = new THREE.Group();
        scene.add(globe);
        scene.add(new THREE.AmbientLight(0xffffff, 0.4));

        let animationId;
        let visible = true;
        let visObs;
        let ro;

        // Fetch land data & build
        (async () => {
            let landPolys = [];
            try {
                const resp = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/land-50m.json');
                const topo = await resp.json();
                landPolys = decodeTopojson(topo, 'land');
            } catch (e) {
                console.warn('Failed to load land data:', e);
            }

            setLoading(false);

            // Generate dots
            const { radius, rows, dotSize } = GLOBE;
            const landDarkPts = [], landLightPts = [], oceanPts = [], presPts = [];

            for (let lat = -85; lat <= 85; lat += 180 / rows) {
                const circ = Math.cos(lat * Math.PI / 180);
                const cols = Math.max(1, Math.floor(rows * 2.2 * circ));
                for (let j = 0; j < cols; j++) {
                    const lng = -180 + (360 / cols) * j;
                    const pos = latLngToVec3(lat, lng, radius);
                    const onLand = landPolys.length > 0 ? isLandCheck(lng, lat, landPolys) : false;
                    const pres = nearPresence(lat, lng);

                    if (onLand && pres) {
                        presPts.push(pos);
                    } else if (onLand) {
                        const h = hash(Math.round(lat * 10), Math.round(lng * 10));
                        if (h % 3 === 0) {
                            landLightPts.push(pos);
                        } else {
                            landDarkPts.push(pos);
                        }
                    } else {
                        oceanPts.push(pos);
                    }
                }
            }

            // Instanced dot meshes
            const dotGeo = new THREE.CircleGeometry(dotSize, 6);
            const dummy = new THREE.Object3D();
            const nrm = new THREE.Vector3();

            function makeInstanced(pts, color, opacity, scl) {
                if (!pts.length) return null;
                const mat = new THREE.MeshBasicMaterial({
                    color, side: THREE.DoubleSide, transparent: true, opacity
                });
                const mesh = new THREE.InstancedMesh(dotGeo, mat, pts.length);
                pts.forEach((pos, i) => {
                    dummy.position.copy(pos);
                    dummy.scale.setScalar(scl || 1);
                    nrm.copy(pos).normalize();
                    dummy.lookAt(nrm.clone().multiplyScalar(radius + 1).add(pos));
                    dummy.updateMatrix();
                    mesh.setMatrixAt(i, dummy.matrix);
                });
                mesh.instanceMatrix.needsUpdate = true;
                return mesh;
            }

            const oceanMesh = makeInstanced(oceanPts, GLOBE.colors.ocean, 0.22, 1);
            const landDarkMesh = makeInstanced(landDarkPts, GLOBE.colors.land, 0.85, 1);
            const landLightMesh = makeInstanced(landLightPts, GLOBE.colors.landLight, 0.55, 1);
            const presMesh = makeInstanced(presPts, GLOBE.colors.presence, 1.0, 1.8);

            if (oceanMesh) globe.add(oceanMesh);
            if (landDarkMesh) globe.add(landDarkMesh);
            if (landLightMesh) globe.add(landLightMesh);
            if (presMesh) globe.add(presMesh);

            // Presence markers (pulsing rings on HQ + facilities)
            const ringGeo = new THREE.RingGeometry(0.04, 0.065, 24);
            const pulseGeo = new THREE.RingGeometry(0.065, 0.11, 24);
            const markers = [];

            LOCATIONS.filter(l => l.type === 'hq' || l.type === 'facility').forEach(loc => {
                const pos = latLngToVec3(loc.lat, loc.lng, radius + 0.015);
                const n = pos.clone().normalize();
                const scl = loc.type === 'hq' ? 2.4 : 1.6;

                const ringMat = new THREE.MeshBasicMaterial({
                    color: GLOBE.colors.ring, side: THREE.DoubleSide, transparent: true, opacity: 0.9
                });
                const ring = new THREE.Mesh(ringGeo, ringMat);
                ring.position.copy(pos);
                ring.lookAt(n.clone().multiplyScalar(radius + 5).add(pos));
                ring.scale.setScalar(scl);
                globe.add(ring);

                const pulseMat = new THREE.MeshBasicMaterial({
                    color: GLOBE.colors.ring, side: THREE.DoubleSide, transparent: true, opacity: 0.4
                });
                const pulse = new THREE.Mesh(pulseGeo, pulseMat);
                pulse.position.copy(pos);
                pulse.lookAt(n.clone().multiplyScalar(radius + 5).add(pos));
                pulse.scale.setScalar(scl);
                globe.add(pulse);
                markers.push({ pulse, mat: pulseMat, baseScale: scl });
            });

            // Atmosphere (Fresnel rim shader)
            const atmoGeo = new THREE.SphereGeometry(radius * 1.06, 48, 48);
            const atmoMat = new THREE.ShaderMaterial({
                transparent: true, depthWrite: false, side: THREE.BackSide,
                uniforms: {
                    uColor: { value: new THREE.Color(GLOBE.colors.atmo) },
                    uGlow: { value: new THREE.Color(GLOBE.colors.atmoGlow) },
                },
                vertexShader: `
          varying vec3 vNormal;
          varying vec3 vWorldPos;
          void main(){
            vNormal = normalize(normalMatrix * normal);
            vWorldPos = (modelMatrix * vec4(position,1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `,
                fragmentShader: `
          uniform vec3 uColor;
          uniform vec3 uGlow;
          varying vec3 vNormal;
          varying vec3 vWorldPos;
          void main(){
            vec3 viewDir = normalize(cameraPosition - vWorldPos);
            float rim = 1.0 - max(0.0, dot(viewDir, vNormal));
            float glow = pow(rim, 2.5);
            vec3 col = mix(uColor, uGlow, glow * 0.3);
            gl_FragColor = vec4(col, glow * 0.08);
          }
        `,
            });
            globe.add(new THREE.Mesh(atmoGeo, atmoMat));

            // Orbit rings
            const orbit = new THREE.Mesh(
                new THREE.RingGeometry(radius * 1.25, radius * 1.25 + 0.004, 128),
                new THREE.MeshBasicMaterial({
                    color: 0x1B4B8F, side: THREE.DoubleSide, transparent: true, opacity: 0.06
                })
            );
            orbit.rotation.x = Math.PI / 2.2;
            globe.add(orbit);

            const orbit2 = new THREE.Mesh(
                new THREE.RingGeometry(radius * 1.12, radius * 1.12 + 0.003, 128),
                new THREE.MeshBasicMaterial({
                    color: 0x04E586, side: THREE.DoubleSide, transparent: true, opacity: 0.04
                })
            );
            orbit2.rotation.x = Math.PI / 1.8;
            orbit2.rotation.z = 0.3;
            globe.add(orbit2);

            // Graticule (subtle lat/lng grid)
            const gratMat = new THREE.LineBasicMaterial({ color: 0xB0B7C3, transparent: true, opacity: 0.05 });
            for (let lat = -60; lat <= 60; lat += 30) {
                const pts = [];
                for (let lng = -180; lng <= 180; lng += 3) pts.push(latLngToVec3(lat, lng, radius + 0.003));
                globe.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gratMat));
            }
            for (let lng = -180; lng < 180; lng += 30) {
                const pts = [];
                for (let lat = -85; lat <= 85; lat += 3) pts.push(latLngToVec3(lat, lng, radius + 0.003));
                globe.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gratMat));
            }

            // Initial rotation (shows India/Europe/Middle East)
            globe.rotation.y = -0.8;

            // Mouse interaction
            let mouseX = 0, mouseY = 0;
            let baseRotY = globe.rotation.y;

            const handleMouseMove = (e) => {
                const r = el.getBoundingClientRect();
                mouseX = ((e.clientX - r.left) / r.width - 0.5) * 2;
                mouseY = ((e.clientY - r.top) / r.height - 0.5) * 2;
            };
            const handleMouseLeave = () => { mouseX = 0; mouseY = 0; };
            const handleTouchMove = (e) => {
                const t = e.touches[0];
                const r = el.getBoundingClientRect();
                mouseX = ((t.clientX - r.left) / r.width - 0.5) * 2;
                mouseY = ((t.clientY - r.top) / r.height - 0.5) * 2;
            };
            const handleTouchEnd = () => { mouseX = 0; mouseY = 0; };

            el.addEventListener('mousemove', handleMouseMove);
            el.addEventListener('mouseleave', handleMouseLeave);
            el.addEventListener('touchmove', handleTouchMove, { passive: true });
            el.addEventListener('touchend', handleTouchEnd);

            // Visibility (pauses when off-screen)
            visObs = new IntersectionObserver(entries => {
                entries.forEach(e => { visible = e.isIntersecting; });
            }, { threshold: 0.05 });
            visObs.observe(el);

            // Resize
            ro = new ResizeObserver(() => {
                const nw = el.clientWidth, nh = el.clientHeight;
                if (!nw || !nh) return;
                camera.aspect = nw / nh;
                camera.updateProjectionMatrix();
                renderer.setSize(nw, nh);
            });
            ro.observe(el);

            // Animation loop
            let lastTime = performance.now();

            function animate() {
                animationId = requestAnimationFrame(animate);
                if (!visible) return;

                const now = performance.now();
                const dt = (now - lastTime) / 1000;
                lastTime = now;

                baseRotY += GLOBE.autoRotate * dt;

                const targetRotY = mouseX * GLOBE.mouseFactor;
                const targetRotX = mouseY * GLOBE.mouseFactor * 0.4;

                globe.rotation.y += (baseRotY + targetRotY - globe.rotation.y) * GLOBE.damping;
                globe.rotation.x += (targetRotX - globe.rotation.x) * GLOBE.damping;

                const t = now * 0.001;
                markers.forEach((m, i) => {
                    const s = m.baseScale * (1 + Math.sin(t * 2 + i) * 0.3);
                    m.pulse.scale.setScalar(s);
                    m.mat.opacity = 0.25 + Math.sin(t * 2 + i) * 0.2;
                });

                renderer.render(scene, camera);
            }
            animate();
        })();

        // Cleanup
        return () => {
            if (animationId) cancelAnimationFrame(animationId);
            if (visObs) visObs.disconnect();
            if (ro) ro.disconnect();
            if (renderer.domElement && el.contains(renderer.domElement)) {
                el.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <div className="globe-wrap">
            <div className="globe-canvas-wrap" ref={containerRef}>
                {loading && (
                    <div className="globe-loading">
                        <div className="globe-spinner"></div>
                        <span>Loading globe...</span>
                    </div>
                )}
            </div>
            <div className="globe-shadow"></div>
        </div>
    );
};

/* ── Facility Card ── */
const FacilityCard = ({ flag, name, country, area, detail }) => (
    <div className="fac-card">
        <div className="fac-card-top">
            <div className="fac-flag">{flag}</div>
            <div>
                <div className="fac-name">{name}</div>
                <div className="fac-country">{country}</div>
            </div>
        </div>
        <div className="fac-stat">
            <span className="fac-stat-num">{area}</span>
            <span className="fac-stat-unit">m²</span>
        </div>
        <div className="fac-bar"></div>
        <div className="fac-detail">{detail}</div>
    </div>
);

/* ── Main Component ── */
const GlobalPresence = () => {
    const facilities = [
        { flag: '🇮🇳', name: 'Jasmino HQ', country: 'India', area: '80,000', detail: 'Engineering, Manufacturing, Rubber Products' },
        { flag: '🇩🇪', name: 'HAW Linings', country: 'Germany', area: '30,000', detail: 'Rubber & Plastic Linings' },
        { flag: '🇹🇷', name: 'GBT', country: 'Turkey', area: '20,000', detail: 'Linings & Coatings' },
    ];

    return (
        <section className="s6">
            <div className="s6-grid"></div>
            <div className="s6-inner">
                {/* Header */}
                <div className="s6-header">
                    <div className="s6-over">Global Presence</div>
                    <h2 className="s6-h2">Three continents, one<br /><em>standard</em></h2>
                    <p className="s6-body">
                        Jasmino operates from facilities in India, Germany, and Turkey — deploying 150+ technicians across 15+ countries.
                    </p>
                </div>

                {/* Globe */}
                <Globe />

                {/* Facility Cards */}
                <div className="fac-row">
                    {facilities.map(f => (
                        <FacilityCard key={f.name} {...f} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GlobalPresence;
