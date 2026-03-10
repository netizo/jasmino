/**
 * BlueprintScene — from jasmino-s2-v4.html
 * Manages renderer, camera, lights, group, mouse tracking, IntersectionObserver, animation loop, resize
 */
import * as THREE from 'three';

export class BlueprintScene {
  constructor(el, setup) {
    this.el = el;
    this.mouse = { x: 0, y: 0 };
    this.tRot = { x: 0, y: 0 };
    this.visible = false;
    this.hovered = false;
    this.hoverIntensity = 0;
    this.time = 0;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(22, 1, 0.1, 100);
    this.camera.position.set(0, 0, 14);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    el.appendChild(this.renderer.domElement);

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.08));

    this.group = new THREE.Group();
    this.scene.add(this.group);
    this.update = setup(this.group, this.scene, this) || null;

    this.resize();
    this._bind();
    this._loop = this._loop.bind(this);
    this._loop();
  }

  resize() {
    const w = this.el.clientWidth;
    const h = this.el.clientHeight;
    if (!w || !h) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  _bind() {
    const card = this.el.closest('.div-card') || this.el;
    card.addEventListener('mouseenter', () => (this.hovered = true));
    card.addEventListener('mouseleave', () => {
      this.hovered = false;
      this.mouse.x = 0;
      this.mouse.y = 0;
    });
    card.addEventListener('mousemove', (e) => {
      const r = this.el.getBoundingClientRect();
      this.mouse.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      this.mouse.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    });
    const obs = new IntersectionObserver(
      (e) => e.forEach((x) => (this.visible = x.isIntersecting)),
      { threshold: 0.05 }
    );
    obs.observe(this.el);
    window.addEventListener('resize', () => this.resize());
  }

  destroy() {
    this._destroyed = true;
    this.visible = false;
    this.update = null;
    if (this._raf) cancelAnimationFrame(this._raf);
    if (this.renderer && this.renderer.domElement && this.el && this.el.contains(this.renderer.domElement)) {
      this.el.removeChild(this.renderer.domElement);
    }
    this.renderer?.dispose();
  }

  _loop() {
    if (this._destroyed) return;
    this._raf = requestAnimationFrame(this._loop);
    if (!this.visible) return;
    this.time += 0.016;
    const targetHover = this.hovered ? 1 : 0;
    this.hoverIntensity += (targetHover - this.hoverIntensity) * 0.04;
    this.tRot.y = this.mouse.x * 0.18;
    this.tRot.x = this.mouse.y * 0.1;
    this.group.rotation.y += (this.tRot.y - this.group.rotation.y) * 0.04;
    this.group.rotation.x += (this.tRot.x - this.group.rotation.x) * 0.04;
    if (this.update) this.update(this.time, this.hoverIntensity);
    this.renderer.render(this.scene, this.camera);
  }
}
