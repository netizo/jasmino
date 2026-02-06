import { useEffect, useRef, useState } from 'react';

const PHASES = ['Design', 'Build', 'Protect'];

function WebGLSupported() {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch (e) {
    return false;
  }
}

function FallbackVessel({ phase }) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <svg viewBox="0 0 240 320" style={{ width: '60%', maxWidth: 240, height: 'auto' }} fill="none">
        <ellipse cx="120" cy="60" rx="55" ry="18"
          stroke={phase === 0 ? '#3B7BDB' : phase === 2 ? '#04E586' : '#8899aa'}
          strokeWidth={phase === 0 ? '1' : '2'} strokeDasharray={phase === 0 ? '4 3' : 'none'} fill="none" />
        <line x1="65" y1="60" x2="65" y2="240"
          stroke={phase === 0 ? '#3B7BDB' : phase === 2 ? '#04E586' : '#8899aa'}
          strokeWidth={phase === 0 ? '1' : '2'} strokeDasharray={phase === 0 ? '4 3' : 'none'} />
        <line x1="175" y1="60" x2="175" y2="240"
          stroke={phase === 0 ? '#3B7BDB' : phase === 2 ? '#04E586' : '#8899aa'}
          strokeWidth={phase === 0 ? '1' : '2'} strokeDasharray={phase === 0 ? '4 3' : 'none'} />
        <ellipse cx="120" cy="240" rx="55" ry="18"
          stroke={phase === 0 ? '#3B7BDB' : phase === 2 ? '#04E586' : '#8899aa'}
          strokeWidth={phase === 0 ? '1' : '2'} strokeDasharray={phase === 0 ? '4 3' : 'none'} fill="none" />
        <line x1="120" y1="42" x2="120" y2="25"
          stroke={phase === 0 ? '#3B7BDB' : phase === 2 ? '#04E586' : '#8899aa'}
          strokeWidth="2" />
        <ellipse cx="120" cy="22" rx="8" ry="3"
          stroke={phase === 0 ? '#3B7BDB' : phase === 2 ? '#04E586' : '#8899aa'}
          strokeWidth="1.5" fill="none" />
        <line x1="175" y1="120" x2="195" y2="120"
          stroke={phase === 0 ? '#3B7BDB' : phase === 2 ? '#04E586' : '#8899aa'}
          strokeWidth="2" />
        <ellipse cx="198" cy="120" rx="3" ry="6"
          stroke={phase === 0 ? '#3B7BDB' : phase === 2 ? '#04E586' : '#8899aa'}
          strokeWidth="1.5" fill="none" transform="rotate(90 198 120)" />
        <line x1="65" y1="180" x2="45" y2="180"
          stroke={phase === 0 ? '#3B7BDB' : phase === 2 ? '#04E586' : '#8899aa'}
          strokeWidth="2" />
        <line x1="90" y1="258" x2="90" y2="285"
          stroke={phase === 0 ? '#3B7BDB' : phase === 2 ? '#04E586' : '#8899aa'}
          strokeWidth="1.5" />
        <line x1="150" y1="258" x2="150" y2="285"
          stroke={phase === 0 ? '#3B7BDB' : phase === 2 ? '#04E586' : '#8899aa'}
          strokeWidth="1.5" />
        <line x1="78" y1="285" x2="102" y2="285"
          stroke={phase === 0 ? '#3B7BDB' : phase === 2 ? '#04E586' : '#8899aa'}
          strokeWidth="1" />
        <line x1="138" y1="285" x2="162" y2="285"
          stroke={phase === 0 ? '#3B7BDB' : phase === 2 ? '#04E586' : '#8899aa'}
          strokeWidth="1" />
        {phase === 2 && (
          <>
            <ellipse cx="120" cy="60" rx="48" ry="15" stroke="rgba(4,229,134,0.2)" strokeWidth="4" fill="none" />
            <line x1="72" y1="60" x2="72" y2="240" stroke="rgba(4,229,134,0.15)" strokeWidth="4" />
            <line x1="168" y1="60" x2="168" y2="240" stroke="rgba(4,229,134,0.15)" strokeWidth="4" />
            <ellipse cx="120" cy="240" rx="48" ry="15" stroke="rgba(4,229,134,0.2)" strokeWidth="4" fill="none" />
          </>
        )}
        {[0,1,2,3,4,5].map(i => (
          <circle key={i} cx={80 + Math.random() * 80} cy={40 + Math.random() * 260} r="2" fill="rgba(4,229,134,0.3)">
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  );
}

export default function HeroScene() {
  const mountRef = useRef();
  const [phase, setPhase] = useState(0);
  const phaseRef = useRef(0);
  const sceneRef = useRef({});
  const [useWebGL, setUseWebGL] = useState(false);

  useEffect(() => {
    setUseWebGL(WebGLSupported());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      phaseRef.current = (phaseRef.current + 1) % 3;
      setPhase(phaseRef.current);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!useWebGL) return;
    const container = mountRef.current;
    if (!container) return;

    let THREE;
    import('three').then(mod => {
      THREE = mod;
      initScene();
    }).catch(() => setUseWebGL(false));

    function initScene() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, w / h, 0.1, 100);
      camera.position.set(0, 0.5, 7);

      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch (e) {
        setUseWebGL(false);
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0x334466, 0.4));
      const key = new THREE.DirectionalLight(0xddeeff, 0.9);
      key.position.set(4, 6, 5);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0x5577aa, 0.35);
      fill.position.set(-4, 2, 3);
      scene.add(fill);
      const rim = new THREE.DirectionalLight(0x04E586, 0.25);
      rim.position.set(-2, 3, -5);
      scene.add(rim);

      const group = new THREE.Group();
      scene.add(group);

      const wireframeMat = new THREE.MeshBasicMaterial({ color: 0x3B7BDB, wireframe: true, transparent: true, opacity: 0.6 });
      const metalMat = new THREE.MeshPhongMaterial({ color: 0x8899aa, specular: 0xaabbcc, shininess: 60 });
      const greenMat = new THREE.MeshPhongMaterial({ color: 0x04E586, emissive: 0x04E586, emissiveIntensity: 0.15, transparent: true, opacity: 0.85 });

      const shellGeo = new THREE.CylinderGeometry(0.8, 0.8, 2.4, 32, 1, true);
      const topGeo = new THREE.SphereGeometry(0.8, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
      const botGeo = new THREE.SphereGeometry(0.8, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);

      const shell = new THREE.Mesh(shellGeo, wireframeMat);
      const top = new THREE.Mesh(topGeo, wireframeMat);
      top.position.y = 1.2;
      const bot = new THREE.Mesh(botGeo, wireframeMat);
      bot.position.y = -1.2;

      const nozzleGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.4, 16);
      const nozzle1 = new THREE.Mesh(nozzleGeo, wireframeMat);
      nozzle1.position.set(0, 1.5, 0);
      const nozzle2 = new THREE.Mesh(nozzleGeo, wireframeMat);
      nozzle2.rotation.z = Math.PI / 2;
      nozzle2.position.set(1, 0.3, 0);

      const legGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.6, 8);
      const leg1 = new THREE.Mesh(legGeo, wireframeMat);
      leg1.position.set(0.5, -1.8, 0.3);
      const leg2 = new THREE.Mesh(legGeo, wireframeMat);
      leg2.position.set(-0.5, -1.8, 0.3);

      const parts = [shell, top, bot, nozzle1, nozzle2, leg1, leg2];
      parts.forEach(p => group.add(p));

      const particles = [];
      const pGeo = new THREE.SphereGeometry(0.015, 6, 6);
      for (let i = 0; i < 20; i++) {
        const pMat = new THREE.MeshBasicMaterial({ color: 0x04E586, transparent: true, opacity: 0.3 });
        const p = new THREE.Mesh(pGeo, pMat);
        p.position.set((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 2);
        p.userData.offset = Math.random() * Math.PI * 2;
        group.add(p);
        particles.push(p);
      }

      group.rotation.x = 0.15;
      sceneRef.current = { parts, particles, wireframeMat, metalMat, greenMat };

      let mouse = { x: 0, y: 0 };
      const onMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouse.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      };
      container.addEventListener('mousemove', onMouseMove);

      let animId;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        group.rotation.y += 0.001;
        group.rotation.x += (0.15 + mouse.y * -0.1 - group.rotation.x) * 0.03;
        const t = Date.now() * 0.001;
        particles.forEach(p => {
          p.position.y += Math.sin(t + p.userData.offset) * 0.002;
          p.material.opacity = 0.15 + Math.sin(t * 2 + p.userData.offset) * 0.15;
        });
        renderer.render(scene, camera);
      };
      animate();

      const onResize = () => {
        const w2 = container.clientWidth;
        const h2 = container.clientHeight;
        if (w2 > 0 && h2 > 0) {
          camera.aspect = w2 / h2;
          camera.updateProjectionMatrix();
          renderer.setSize(w2, h2);
        }
      };
      window.addEventListener('resize', onResize);

      return () => {
        cancelAnimationFrame(animId);
        container.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    }
  }, [useWebGL]);

  useEffect(() => {
    const s = sceneRef.current;
    if (!s.parts) return;
    const mats = [s.wireframeMat, s.metalMat, s.greenMat];
    s.parts.forEach(p => { p.material = mats[phase]; });
  }, [phase]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {useWebGL ? (
        <div ref={mountRef} style={{ width: '100%', height: '100%', minHeight: 400 }} />
      ) : (
        <FallbackVessel phase={phase} />
      )}
      <div style={{
        position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 4, zIndex: 2
      }}>
        {PHASES.map((p, i) => (
          <button key={p} onClick={() => { phaseRef.current = i; setPhase(i); }}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500,
              padding: '5px 14px', borderRadius: 16,
              border: `1px solid ${i === phase ? 'var(--green)' : 'rgba(255,255,255,0.12)'}`,
              background: i === phase ? 'var(--green-dim)' : 'rgba(255,255,255,0.04)',
              color: i === phase ? 'var(--green)' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer', transition: 'all 0.3s',
              letterSpacing: '0.06em', textTransform: 'uppercase'
            }}>
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
