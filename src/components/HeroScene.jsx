import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene({ phase }) {
    const mountRef = useRef(null);
    const phaseRef = useRef(phase);

    // Update ref when prop changes so the animation loop can access the latest value
    useEffect(() => {
        phaseRef.current = phase;
    }, [phase]);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        // ═══════════════════════════════════════════
        // RENDERER SETUP
        // ═══════════════════════════════════════════
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        renderer.shadowMap.enabled = false;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;

        // Initial size set
        const w = container.clientWidth;
        const h = container.clientHeight;
        renderer.setSize(w, h);
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0xf9fafb, 0.04);

        const camera = new THREE.PerspectiveCamera(32, w / h, 0.1, 100);
        camera.position.set(0, 0.6, 11);
        camera.lookAt(0, 0, 0);

        // ═══════════════════════════════════════════
        // ENVIRONMENT MAP
        // ═══════════════════════════════════════════
        const cubeRT = new THREE.WebGLCubeRenderTarget(128);
        const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRT);
        const envScene = new THREE.Scene();

        const envGeo = new THREE.SphereGeometry(50, 32, 32);
        const envMat = new THREE.ShaderMaterial({
            side: THREE.BackSide,
            uniforms: {
                topColor: { value: new THREE.Color(0xf0f4fa) },
                midColor: { value: new THREE.Color(0xdce2ea) },
                bottomColor: { value: new THREE.Color(0xb8bec8) }
            },
            vertexShader: `
        varying vec3 vWorldPos;
        void main() {
            vec4 worldPos = modelMatrix * vec4(position, 1.0);
            vWorldPos = worldPos.xyz;
            gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
            fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 midColor;
        uniform vec3 bottomColor;
        varying vec3 vWorldPos;
        void main() {
            float y = normalize(vWorldPos).y;
            vec3 col = y > 0.0 ? mix(midColor, topColor, pow(y, 0.6)) : mix(midColor, bottomColor, pow(-y, 0.8) * 0.6);
            gl_FragColor = vec4(col, 1.0);
        }
      `
        });
        envScene.add(new THREE.Mesh(envGeo, envMat));

        function addSoftbox(scn, pos, width, height, intensity, color) {
            const g = new THREE.PlaneGeometry(width, height);
            const m = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
            const mesh = new THREE.Mesh(g, m);
            mesh.position.set(pos.x, pos.y, pos.z);
            mesh.lookAt(0, 0, 0);
            scn.add(mesh);
            const pl = new THREE.PointLight(color, intensity, 60);
            pl.position.set(pos.x, pos.y, pos.z);
            scn.add(pl);
        }

        addSoftbox(envScene, { x: 10, y: 14, z: 8 }, 12, 8, 500, 0xfff8f0);
        addSoftbox(envScene, { x: -12, y: 10, z: -4 }, 10, 6, 300, 0xd8e4ff);
        addSoftbox(envScene, { x: -3, y: 5, z: -15 }, 14, 6, 250, 0xf5f0ff);
        addSoftbox(envScene, { x: 0, y: -8, z: 8 }, 16, 10, 120, 0xffe8d8);
        addSoftbox(envScene, { x: 6, y: 2, z: 12 }, 4, 3, 180, 0xffffff);

        cubeCamera.update(renderer, envScene);

        // ═══════════════════════════════════════════
        // LIGHTING
        // ═══════════════════════════════════════════
        const keyLight = new THREE.DirectionalLight(0xfff5e8, 1.2);
        keyLight.position.set(5, 8, 5);
        scene.add(keyLight);

        const fillLight = new THREE.DirectionalLight(0xc8d8f0, 0.55);
        fillLight.position.set(-4, 3, -3);
        scene.add(fillLight);

        const rimLight = new THREE.DirectionalLight(0xffffff, 0.7);
        rimLight.position.set(-1, -2, -5);
        scene.add(rimLight);

        const greenAccent = new THREE.PointLight(0x04E586, 0, 10);
        greenAccent.position.set(2, 1, 3);
        scene.add(greenAccent);

        const greenAccent2 = new THREE.PointLight(0x04E586, 0, 10);
        greenAccent2.position.set(-2, -0.5, 2);
        scene.add(greenAccent2);

        const ambient = new THREE.HemisphereLight(0xdde4f0, 0xe0d8d0, 0.35);
        scene.add(ambient);

        // ═══════════════════════════════════════════
        // SHADERS
        // ═══════════════════════════════════════════
        const wireframeShader = {
            uniforms: {
                uTime: { value: 0 },
                uOpacity: { value: 1.0 },
                uColor: { value: new THREE.Color(0x1B4B8F) },
                uGlowColor: { value: new THREE.Color(0x5a9eff) },
                uScanLine: { value: 0.0 }
            },
            vertexShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        varying vec3 vViewDir;
        void main() {
            vPosition = position;
            vNormal = normalize(normalMatrix * normal);
            vec4 wp = modelMatrix * vec4(position, 1.0);
            vWorldPos = wp.xyz;
            vViewDir = normalize(cameraPosition - wp.xyz);
            gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
            fragmentShader: `
        uniform float uTime;
        uniform float uOpacity;
        uniform vec3 uColor;
        uniform vec3 uGlowColor;
        uniform float uScanLine;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        varying vec3 vViewDir;
        void main() {
            vec3 V = normalize(vViewDir);
            vec3 N = normalize(vNormal);

            float fresnel = 1.0 - abs(dot(V, N));
            fresnel = pow(fresnel, 2.0) * 1.2;

            float scanWidth = 0.6;
            float scan = exp(-(vWorldPos.y - uScanLine) * (vWorldPos.y - uScanLine) / (scanWidth * scanWidth * 0.08));
            float pulse2 = exp(-(vWorldPos.y - uScanLine * 0.7 + 0.5) * (vWorldPos.y - uScanLine * 0.7 + 0.5) / 0.12) * 0.4;
            float flow = sin(vWorldPos.y * 8.0 + uTime * 2.0) * 0.5 + 0.5;
            flow *= 0.15;

            vec3 col = mix(uColor, uGlowColor, fresnel * 0.5 + scan * 0.7 + pulse2 * 0.5 + flow);
            col += uGlowColor * scan * 0.4;
            col += vec3(0.6, 0.85, 1.0) * pulse2;

            float alpha = (0.5 + fresnel * 0.5 + scan * 0.6 + pulse2 * 0.3 + flow * 0.2) * uOpacity;
            gl_FragColor = vec4(col, alpha);
        }
      `
        };

        const metalShader = {
            uniforms: {
                uOpacity: { value: 0.0 },
                uEnvMap: { value: cubeRT.texture },
                uColor: { value: new THREE.Color(0xd4dae0) },
                uTime: { value: 0 }
            },
            vertexShader: `
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        varying vec3 vReflect;
        varying vec3 vLocalPos;
        varying vec3 vViewDir;
        varying vec3 vTangent;
        void main() {
            vLocalPos = position;
            vNormal = normalize(normalMatrix * normal);
            vec4 wp = modelMatrix * vec4(position, 1.0);
            vWorldPos = wp.xyz;
            vViewDir = normalize(cameraPosition - wp.xyz);
            vec3 worldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
            vReflect = reflect(-vViewDir, worldNormal);
            vec3 up = abs(normal.y) > 0.99 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
            vTangent = normalize(cross(normal, up));
            vTangent = normalize((modelMatrix * vec4(vTangent, 0.0)).xyz);
            gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
            fragmentShader: `
        uniform float uOpacity;
        uniform samplerCube uEnvMap;
        uniform vec3 uColor;
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        varying vec3 vReflect;
        varying vec3 vLocalPos;
        varying vec3 vViewDir;
        varying vec3 vTangent;

        float D_GGX(float NdotH, float roughness) {
            float a2 = roughness * roughness;
            float denom = NdotH * NdotH * (a2 - 1.0) + 1.0;
            return a2 / (3.14159 * denom * denom + 0.0001);
        }

        vec3 F_Schlick(float VdotH, vec3 F0) {
            return F0 + (1.0 - F0) * pow(1.0 - VdotH, 5.0);
        }

        float G_SmithGGX(float NdotV, float NdotL, float roughness) {
            float k = (roughness + 1.0);
            k = k * k / 8.0;
            float ggx1 = NdotV / (NdotV * (1.0 - k) + k);
            float ggx2 = NdotL / (NdotL * (1.0 - k) + k);
            return ggx1 * ggx2;
        }

        float wardAniso(vec3 L, vec3 V, vec3 N, vec3 T, float ax, float ay) {
            vec3 H = normalize(L + V);
            vec3 B = cross(N, T);
            float NdotH = max(dot(N, H), 0.0);
            float TdotH = dot(T, H);
            float BdotH = dot(B, H);
            float exponent = -((TdotH * TdotH) / (ax * ax) + (BdotH * BdotH) / (ay * ay)) / (NdotH * NdotH + 0.001);
            return exp(exponent) / (4.0 * 3.14159 * ax * ay + 0.001);
        }

        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float noise2D(vec2 p) {
            vec2 i = floor(p); vec2 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            float a = hash(i); float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0)); float d = hash(i + vec2(1.0, 1.0));
            return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
        }

        void main() {
            vec3 N = normalize(vNormal);
            vec3 V = normalize(vViewDir);
            vec3 T = normalize(vTangent);
            vec3 F0 = vec3(0.56, 0.57, 0.58);
            
            vec3 L1pos = vec3(5.0, 8.0, 5.0);
            vec3 L2pos = vec3(-4.0, 3.0, -3.0);
            vec3 L3pos = vec3(-1.0, -2.0, -5.0);
            
            vec3 totalDiffuse = vec3(0.0);
            vec3 totalSpecular = vec3(0.0);

            // Light 1 (Key)
            {
                vec3 L = normalize(L1pos - vWorldPos);
                vec3 H = normalize(L + V);
                float NdotL = max(dot(N, L), 0.0);
                float NdotH = max(dot(N, H), 0.0);
                float NdotV = max(dot(N, V), 0.001);
                float VdotH = max(dot(V, H), 0.0);
                float D = D_GGX(NdotH, 0.35);
                vec3 F = F_Schlick(VdotH, F0);
                float G = G_SmithGGX(NdotV, NdotL, 0.35);
                vec3 spec = (D * F * G) / (4.0 * NdotV * NdotL + 0.001);
                float aniso = wardAniso(L, V, N, T, 0.15, 0.55) * 0.35;
                vec3 lightCol = vec3(1.0, 0.96, 0.90) * 1.3;
                totalDiffuse += lightCol * NdotL * (1.0 - F) * 0.04;
                totalSpecular += lightCol * (spec + aniso) * NdotL;
            }
            // Light 2 (Fill)
            {
                vec3 L = normalize(L2pos - vWorldPos);
                vec3 H = normalize(L + V);
                float NdotL = max(dot(N, L), 0.0);
                float NdotH = max(dot(N, H), 0.0);
                float NdotV = max(dot(N, V), 0.001);
                float VdotH = max(dot(V, H), 0.0);
                float D = D_GGX(NdotH, 0.38);
                vec3 F = F_Schlick(VdotH, F0);
                float G = G_SmithGGX(NdotV, NdotL, 0.38);
                vec3 spec = (D * F * G) / (4.0 * NdotV * NdotL + 0.001);
                float aniso = wardAniso(L, V, N, T, 0.15, 0.55) * 0.2;
                vec3 lightCol = vec3(0.82, 0.88, 1.0) * 0.6;
                totalDiffuse += lightCol * NdotL * (1.0 - F) * 0.04;
                totalSpecular += lightCol * (spec + aniso) * NdotL;
            }
            // Light 3 (Rim)
            {
                vec3 L = normalize(L3pos - vWorldPos);
                vec3 H = normalize(L + V);
                float NdotL = max(dot(N, L), 0.0);
                float NdotH = max(dot(N, H), 0.0);
                float NdotV = max(dot(N, V), 0.001);
                float VdotH = max(dot(V, H), 0.0);
                float D = D_GGX(NdotH, 0.32);
                vec3 F = F_Schlick(VdotH, F0);
                float G = G_SmithGGX(NdotV, NdotL, 0.32);
                vec3 spec = (D * F * G) / (4.0 * NdotV * NdotL + 0.001);
                vec3 lightCol = vec3(0.9, 0.92, 0.95) * 0.75;
                totalSpecular += lightCol * spec * NdotL;
            }

            vec3 base = uColor * 0.42 + totalDiffuse;
            
            // Texture/Brush noise
            float brushAngle = atan(vLocalPos.z, vLocalPos.x);
            float brushCoord = brushAngle * 10.0 + vLocalPos.y * 80.0;
            float brush1 = sin(brushCoord * 8.0) * 0.012;
            float brush2 = sin(brushCoord * 22.0 + 1.3) * 0.006;
            float brush3 = noise2D(vec2(brushCoord * 2.0, vLocalPos.y * 60.0)) * 0.018 - 0.009;
            base += (brush1 + brush2 + brush3);

            vec3 envCol = textureCube(uEnvMap, vReflect).rgb;
            vec3 envAvg = (envCol + textureCube(uEnvMap, vReflect + vec3(0.08)).rgb + textureCube(uEnvMap, vReflect - vec3(0.08)).rgb) / 3.0;
            float NdotV = max(dot(N, V), 0.0);
            vec3 fresnelReflect = F_Schlick(NdotV, F0);
            base = mix(base, envAvg * 1.15, fresnelReflect * 0.65);
            base += totalSpecular;

            float ao = smoothstep(0.0, 0.15, abs(vLocalPos.y));
            ao *= smoothstep(-1.2, -0.8, vLocalPos.y) * 0.3 + 0.7;
            base *= mix(0.75, 1.0, ao);
            
            base += vec3(0.012, 0.008, 0.002) * max(dot(N, vec3(0.0, 1.0, 0.0)), 0.0);
            base += vec3(-0.005, 0.0, 0.01) * max(dot(N, vec3(0.0, -1.0, 0.0)), 0.0);
            
            float grain = noise2D(vLocalPos.xz * 400.0) * 0.02 - 0.01;
            base += grain;

            gl_FragColor = vec4(base, uOpacity);
        }
      `
        };

        const coatingShader = {
            uniforms: {
                uOpacity: { value: 0.0 },
                uTime: { value: 0 },
                uColor: { value: new THREE.Color(0x04E586) },
                uGlowIntensity: { value: 0.0 },
                uCoatingProgress: { value: 0.0 },
                uEnvMap: { value: cubeRT.texture }
            },
            vertexShader: `
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        varying vec3 vPosition;
        varying vec3 vReflect;
        varying vec3 vViewDir;
        varying vec2 vUv;
        void main() {
            vPosition = position;
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            vec4 wp = modelMatrix * vec4(position, 1.0);
            vWorldPos = wp.xyz;
            vViewDir = normalize(cameraPosition - wp.xyz);
            vec3 worldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
            vReflect = reflect(-vViewDir, worldNormal);
            gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
            fragmentShader: `
        uniform float uOpacity;
        uniform float uTime;
        uniform vec3 uColor;
        uniform float uGlowIntensity;
        uniform float uCoatingProgress;
        uniform samplerCube uEnvMap;
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        varying vec3 vPosition;
        varying vec3 vReflect;
        varying vec3 vViewDir;
        varying vec2 vUv;

        float D_GGX(float NdotH, float roughness) {
            float a2 = roughness * roughness;
            float denom = NdotH * NdotH * (a2 - 1.0) + 1.0;
            return a2 / (3.14159 * denom * denom + 0.0001);
        }
        vec3 F_Schlick(float VdotH, vec3 F0) { return F0 + (1.0 - F0) * pow(1.0 - VdotH, 5.0); }
        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float noise2D(vec2 p) {
            vec2 i = floor(p); vec2 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                       mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
        }
        vec4 hexGrid(vec2 p) {
            vec2 q = vec2(p.x * 2.0 / sqrt(3.0), p.y + p.x / sqrt(3.0));
            vec2 pi = floor(q); vec2 pf = fract(q);
            float v = mod(pi.x + pi.y, 3.0);
            float ca = step(1.0, v); float cb = step(2.0, v);
            vec2 ma = step(pf.xy, pf.yx);
            float e = dot(ma, 1.0 - pf.yx + ca * (pf.x + pf.y - 1.0) + cb * (pf.yx - 2.0 * pf.xy));
            p = vec2(dot(ma, pf.yx + ca * (1.0 - pf.x - pf.y) + cb * (2.0 * pf.xy - pf.yx)));
            float d = 1.0 - smoothstep(0.0, 0.06, abs(e - 0.5));
            vec2 id = pi + vec2(ca, cb);
            return vec4(d, id, e);
        }

        void main() {
            vec3 N = normalize(vNormal);
            vec3 V = normalize(vViewDir);

            float wipePos = vWorldPos.y + 2.0;
            float coatMask = smoothstep(uCoatingProgress - 0.5, uCoatingProgress, wipePos);
            float edgeDist = abs(wipePos - uCoatingProgress);
            float edgeLine = exp(-edgeDist * edgeDist * 60.0) * step(wipePos, uCoatingProgress + 0.15);

            vec3 F0 = vec3(0.04);
            vec3 deepGreen = uColor * 0.35;
            vec3 midGreen = uColor * 0.65;
            vec3 brightGreen = uColor * 1.05;

            vec3 totalDiffuse = vec3(0.0);
            vec3 totalSpecular = vec3(0.0);
            float rubberRoughness = 0.42;

            // Simple PBR Loop for 3 lights
            vec3 lights[3];
            lights[0] = vec3(5.0, 8.0, 5.0);
            lights[1] = vec3(-4.0, 3.0, -3.0);
            lights[2] = vec3(-1.0, -2.0, -5.0);
            vec3 cols[3];
            cols[0] = vec3(1.0, 0.97, 0.92) * 1.2;
            cols[1] = vec3(0.85, 0.90, 1.0) * 0.5;
            cols[2] = vec3(0.88, 0.92, 0.95) * 0.6;

            for(int i=0; i<3; i++) {
                vec3 L = normalize(lights[i] - vWorldPos);
                vec3 H = normalize(L + V);
                float NdotL = max(dot(N, L), 0.0);
                float NdotH = max(dot(N, H), 0.0);
                float NdotV = max(dot(N, V), 0.001);
                float VdotH = max(dot(V, H), 0.0);
                float D = D_GGX(NdotH, rubberRoughness);
                vec3 F = F_Schlick(VdotH, F0);
                vec3 kD = (1.0 - F);
                vec3 spec = D * F / (4.0 * NdotV * NdotL + 0.001);
                if(i < 2) totalDiffuse += kD * cols[i] * NdotL;
                totalSpecular += cols[i] * spec * NdotL;
            }

            vec3 base = mix(deepGreen, brightGreen, 0.35 + totalDiffuse.r * 0.65);
            base *= (0.55 + totalDiffuse * 0.8);

            vec3 envCol = textureCube(uEnvMap, vReflect).rgb;
            float NdotV = max(dot(N, V), 0.0);
            vec3 fresnelReflect = F_Schlick(NdotV, F0);
            vec3 tintedEnv = envCol * mix(vec3(1.0), uColor * 0.4 + vec3(0.6), 0.35);
            base = mix(base, tintedEnv * 1.1, fresnelReflect * 0.55);
            base += totalSpecular * 0.7;

            vec3 L1 = normalize(lights[0] - vWorldPos);
            float sss = pow(max(dot(V, -L1), 0.0), 6.0) * 0.15;
            base += uColor * sss * 1.5;

            float fresnelRim = pow(1.0 - NdotV, 4.0);
            base += uColor * fresnelRim * (0.35 + uGlowIntensity * 0.4);
            
            vec3 edgeColor = uColor * 2.5 + vec3(0.2, 0.8, 0.4);
            base += edgeColor * edgeLine * 0.7;

            // Shield Pattern
            float angle = atan(vPosition.z, vPosition.x);
            vec2 hexUV = vec2(angle * 3.0, vPosition.y * 5.5);
            vec4 hex = hexGrid(hexUV);
            float hexEdge = hex.x;
            
            float hexId = hash(hex.yz);
            float hexWave = sin(vPosition.y * 3.0 - uTime * 1.8 + hexId * 6.28) * 0.5 + 0.5;
            float hexPulse = smoothstep(0.3, 0.7, hexWave);
            
            float hexLineGlow = hexEdge * uGlowIntensity * 0.25;
            base += uColor * hexLineGlow * (0.5 + hexPulse * 0.5);
            
            float cellShimmer = hexPulse * uGlowIntensity * 0.06;
            base += uColor * cellShimmer * (1.0 - hexEdge);

            float flowLine1 = sin(angle * 12.0 + vPosition.y * 20.0 - uTime * 3.0);
            flowLine1 = pow(max(flowLine1, 0.0), 12.0);
            float flowLine2 = sin(angle * 8.0 - vPosition.y * 15.0 + uTime * 2.2);
            flowLine2 = pow(max(flowLine2, 0.0), 14.0);
            float energyLines = (flowLine1 + flowLine2) * uGlowIntensity;
            vec3 energyColor = uColor * 1.8 + vec3(0.1, 0.5, 0.3);
            base += energyColor * energyLines * 0.15;

            float auraPulse = sin(uTime * 2.0) * 0.3 + 0.7;
            float auraStrength = fresnelRim * uGlowIntensity;
            vec3 auraColor = mix(uColor, vec3(0.3, 1.0, 0.7), 0.3);
            base += auraColor * auraStrength * auraPulse * 0.3;

            float texScale = 120.0;
            float microTex = noise2D(vPosition.xy * texScale) * noise2D(vPosition.yz * texScale);
            base += microTex * 0.025 - 0.0125;
            
            float ao = smoothstep(0.0, 0.12, abs(vPosition.y));
            base *= mix(0.8, 1.0, ao);
            
            float pulse = sin(uTime * 1.5) * 0.5 + 0.5;
            base += uColor * uGlowIntensity * pulse * 0.04;

            float alpha = uOpacity * coatMask;
            gl_FragColor = vec4(base, alpha);
        }
      `
        };

        // ═══════════════════════════════════════════
        // GEOMETRY
        // ═══════════════════════════════════════════
        const mainGroup = new THREE.Group();

        function createVesselGeometry() {
            const parts = [];
            const body = new THREE.CylinderGeometry(0.85, 0.85, 2.8, 36, 8);
            parts.push({ geo: body, pos: [0, 0, 0], rot: [Math.PI / 2, 0, 0] });

            const headGeo = new THREE.SphereGeometry(0.85, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
            parts.push({ geo: headGeo, pos: [0, 0, 1.4], rot: [-Math.PI / 2, 0, 0] });
            parts.push({ geo: headGeo, pos: [0, 0, -1.4], rot: [Math.PI / 2, 0, 0] });

            const weldGeo = new THREE.TorusGeometry(0.86, 0.012, 12, 64);
            const weldPositions = [-0.93, -0.47, 0, 0.47, 0.93];
            weldPositions.forEach(z => parts.push({ geo: weldGeo, pos: [0, 0, z], rot: [Math.PI / 2, 0, 0] }));

            parts.push({ geo: new THREE.TorusGeometry(0.86, 0.015, 8, 48), pos: [0, 0, 1.4], rot: [Math.PI / 2, 0, 0] });
            parts.push({ geo: new THREE.TorusGeometry(0.86, 0.015, 8, 48), pos: [0, 0, -1.4], rot: [Math.PI / 2, 0, 0] });

            const nozzleNeck = new THREE.CylinderGeometry(0.14, 0.14, 0.55, 24);
            parts.push({ geo: nozzleNeck, pos: [0, 1.12, 0], rot: [0, 0, 0] });
            parts.push({ geo: new THREE.CylinderGeometry(0.3, 0.3, 0.04, 24), pos: [0, 0.87, 0], rot: [0, 0, 0] });
            parts.push({ geo: new THREE.CylinderGeometry(0.26, 0.26, 0.05, 24), pos: [0, 1.42, 0], rot: [0, 0, 0] });
            parts.push({ geo: new THREE.CylinderGeometry(0.24, 0.24, 0.03, 24), pos: [0, 1.46, 0], rot: [0, 0, 0] });

            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                const bx = Math.cos(angle) * 0.21;
                const bz = Math.sin(angle) * 0.21;
                parts.push({ geo: new THREE.CylinderGeometry(0.018, 0.018, 0.08, 8), pos: [bx, 1.42, bz], rot: [0, 0, 0] });
            }

            parts.push({ geo: new THREE.CylinderGeometry(0.12, 0.12, 0.5, 20), pos: [1.12, 0.15, 0.4], rot: [0, 0, -Math.PI / 2] });
            parts.push({ geo: new THREE.CylinderGeometry(0.24, 0.24, 0.04, 20), pos: [0.88, 0.15, 0.4], rot: [0, 0, -Math.PI / 2] });

            parts.push({ geo: new THREE.CylinderGeometry(0.1, 0.1, 0.45, 16), pos: [0, -1.07, -0.5], rot: [0, 0, 0] });

            const saddleBodyGeo = new THREE.TorusGeometry(0.90, 0.045, 12, 48, Math.PI);
            parts.push({ geo: saddleBodyGeo, pos: [0, -0.85, 0.85], rot: [0, Math.PI, 0] });
            parts.push({ geo: saddleBodyGeo, pos: [0, -0.85, -0.85], rot: [0, Math.PI, 0] });

            const basePlateGeo = new THREE.BoxGeometry(0.08, 0.3, 1.0);
            parts.push({ geo: basePlateGeo, pos: [-0.88, -1.0, 0.85], rot: [0, 0, 0] });
            parts.push({ geo: basePlateGeo, pos: [0.88, -1.0, 0.85], rot: [0, 0, 0] });
            parts.push({ geo: basePlateGeo, pos: [-0.88, -1.0, -0.85], rot: [0, 0, 0] });
            parts.push({ geo: basePlateGeo, pos: [0.88, -1.0, -0.85], rot: [0, 0, 0] });

            const footGeo = new THREE.BoxGeometry(2.2, 0.04, 0.5);
            parts.push({ geo: footGeo, pos: [0, -1.16, 0.85], rot: [0, 0, 0] });
            parts.push({ geo: footGeo, pos: [0, -1.16, -0.85], rot: [0, 0, 0] });

            return parts;
        }

        const vesselParts = createVesselGeometry();

        function buildLayer(shaderDef) {
            const mat = new THREE.ShaderMaterial({
                uniforms: THREE.UniformsUtils.clone(shaderDef.uniforms),
                vertexShader: shaderDef.vertexShader,
                fragmentShader: shaderDef.fragmentShader,
                transparent: true,
                depthWrite: false,
                side: THREE.DoubleSide
            });
            const layerGroup = new THREE.Group();
            vesselParts.forEach(part => {
                const mesh = new THREE.Mesh(part.geo, mat);
                mesh.position.set(...part.pos);
                mesh.rotation.set(...part.rot);
                layerGroup.add(mesh);
            });
            return { group: layerGroup, material: mat };
        }

        const wireLayer = buildLayer(wireframeShader);
        wireLayer.group.children.forEach(m => { m.material.wireframe = true; });

        const solidLayer = buildLayer(metalShader);
        const coatLayer = buildLayer(coatingShader);
        coatLayer.group.scale.set(1.04, 1.04, 1.04);

        mainGroup.add(wireLayer.group);
        mainGroup.add(solidLayer.group);
        mainGroup.add(coatLayer.group);

        mainGroup.rotation.x = -0.12;
        mainGroup.rotation.y = 0.45;
        scene.add(mainGroup);

        // ═══════════════════════════════════════════
        // PARTICLES
        // ═══════════════════════════════════════════
        const PARTICLE_COUNT = 80;
        const tParticleGeo = new THREE.BufferGeometry();
        const tPositions = new Float32Array(PARTICLE_COUNT * 3);
        const tVelocities = new Float32Array(PARTICLE_COUNT * 3);
        const tLifetimes = new Float32Array(PARTICLE_COUNT);
        const tSizes = new Float32Array(PARTICLE_COUNT);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            tPositions[i * 3] = 0;
            tLifetimes[i] = -1;
            tSizes[i] = 0.02 + Math.random() * 0.03;
        }
        tParticleGeo.setAttribute('position', new THREE.BufferAttribute(tPositions, 3));
        tParticleGeo.setAttribute('size', new THREE.BufferAttribute(tSizes, 1));

        const tParticleMat = new THREE.ShaderMaterial({
            uniforms: {
                uColor: { value: new THREE.Color(0x1B4B8F) },
                uTime: { value: 0 }
            },
            vertexShader: `
            attribute float size;
            varying float vAlpha;
            void main() {
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
                vAlpha = 1.0;
            }
        `,
            fragmentShader: `
            uniform vec3 uColor;
            varying float vAlpha;
            void main() {
                float d = length(gl_PointCoord - vec2(0.5));
                if (d > 0.5) discard;
                float alpha = smoothstep(0.5, 0.1, d) * vAlpha;
                gl_FragColor = vec4(uColor, alpha * 0.6);
            }
        `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });
        const transitionParticles = new THREE.Points(tParticleGeo, tParticleMat);
        scene.add(transitionParticles);

        let particleIndex = 0;
        function emitParticles(count, color) {
            tParticleMat.uniforms.uColor.value.copy(color);
            for (let i = 0; i < count; i++) {
                const idx = (particleIndex + i) % PARTICLE_COUNT;
                const theta = Math.random() * Math.PI * 2;
                const y = (Math.random() - 0.5) * 3;
                const r = 0.85 + Math.random() * 0.2;
                tPositions[idx * 3] = Math.cos(theta) * r;
                tPositions[idx * 3 + 1] = y;
                tPositions[idx * 3 + 2] = Math.sin(theta) * r;
                tVelocities[idx * 3] = (Math.random() - 0.5) * 0.03;
                tVelocities[idx * 3 + 1] = 0.01 + Math.random() * 0.02;
                tVelocities[idx * 3 + 2] = (Math.random() - 0.5) * 0.03;
                tLifetimes[idx] = 1.0;
            }
            particleIndex = (particleIndex + count) % PARTICLE_COUNT;
        }

        const apGeo = new THREE.BufferGeometry();
        const apPositions = new Float32Array(40 * 3);
        const apSpeeds = [];
        for (let i = 0; i < 40; i++) {
            apPositions[i * 3] = (Math.random() - 0.5) * 10;
            apPositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
            apPositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
            apSpeeds.push({ y: 0.001 + Math.random() * 0.003, x: (Math.random() - 0.5) * 0.001 });
        }
        apGeo.setAttribute('position', new THREE.BufferAttribute(apPositions, 3));
        const apMat = new THREE.PointsMaterial({ color: 0x1B4B8F, size: 0.025, transparent: true, opacity: 0.15, blending: THREE.NormalBlending });
        const ambientPts = new THREE.Points(apGeo, apMat);
        scene.add(ambientPts);

        // ═══════════════════════════════════════════
        // ANIMATION STATE
        // ═══════════════════════════════════════════
        let smoothMouseX = 0, smoothMouseY = 0;
        const clock = new THREE.Clock();
        let currentPhaseInternal = 0;

        // Helpers
        function lerp(a, b, t) { return a + (b - a) * t; }
        function damp(a, b, lambda, dt) { return lerp(a, b, 1 - Math.exp(-lambda * dt)); }

        // Mouse tracking
        let mouseX = 0, mouseY = 0;
        const onMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        };
        container.addEventListener('mousemove', onMouseMove);

        // Watch for phase changes to trigger particles
        let lastPhaseVal = phase;

        // Visibility-based pausing — stop rendering when off-screen
        let visible = true;
        const visObs = new IntersectionObserver((entries) => {
            entries.forEach(e => { visible = e.isIntersecting; });
        }, { threshold: 0.01 });
        visObs.observe(container);

        // Animation Loop
        let animId;
        const animate = () => {
            animId = requestAnimationFrame(animate);
            if (!visible) { clock.getDelta(); return; }
            const dt = Math.min(clock.getDelta(), 0.05);
            const elapsed = clock.getElapsedTime();

            // Check for phase prop change
            if (phaseRef.current !== lastPhaseVal) {
                const colors = [new THREE.Color(0x1B4B8F), new THREE.Color(0xc0c8d0), new THREE.Color(0x04E586)];
                emitParticles(40, colors[phaseRef.current]);
                lastPhaseVal = phaseRef.current;
            }

            const targetPhase = phaseRef.current;

            // Update Materials
            const wU = wireLayer.material.uniforms;
            const sU = solidLayer.material.uniforms;
            const cU = coatLayer.material.uniforms;

            wU.uTime.value = elapsed;
            sU.uTime.value = elapsed;
            cU.uTime.value = elapsed;

            const dampSpeed = 3.0;

            if (targetPhase === 0) { // DESIGN
                wU.uOpacity.value = damp(wU.uOpacity.value, 1.0, dampSpeed, dt);
                wU.uScanLine.value = damp(wU.uScanLine.value, Math.sin(elapsed * 0.8) * 2 + 1, 2, dt);
                sU.uOpacity.value = damp(sU.uOpacity.value, 0.0, dampSpeed, dt);
                cU.uOpacity.value = damp(cU.uOpacity.value, 0.0, dampSpeed * 1.5, dt);
                cU.uCoatingProgress.value = damp(cU.uCoatingProgress.value, 0.0, dampSpeed, dt);
                cU.uGlowIntensity.value = damp(cU.uGlowIntensity.value, 0.0, dampSpeed, dt);
                greenAccent.intensity = damp(greenAccent.intensity, 0, dampSpeed, dt);
                greenAccent2.intensity = damp(greenAccent2.intensity, 0, dampSpeed, dt);
                apMat.color.lerp(new THREE.Color(0x1B4B8F), dt * 2);
                apMat.opacity = damp(apMat.opacity, 0.15, dampSpeed, dt);
                keyLight.color.lerp(new THREE.Color(0xfff5e8), dt * 3);
                fillLight.color.lerp(new THREE.Color(0xc8d8f0), dt * 3);
            } else if (targetPhase === 1) { // BUILD
                wU.uOpacity.value = damp(wU.uOpacity.value, 0.06, dampSpeed, dt);
                sU.uOpacity.value = damp(sU.uOpacity.value, 1.0, dampSpeed * 0.8, dt);
                cU.uOpacity.value = damp(cU.uOpacity.value, 0.0, dampSpeed, dt);
                cU.uCoatingProgress.value = damp(cU.uCoatingProgress.value, 0.0, dampSpeed, dt);
                cU.uGlowIntensity.value = damp(cU.uGlowIntensity.value, 0.0, dampSpeed, dt);
                greenAccent.intensity = damp(greenAccent.intensity, 0, dampSpeed, dt);
                greenAccent2.intensity = damp(greenAccent2.intensity, 0, dampSpeed, dt);
                apMat.color.lerp(new THREE.Color(0xb0b8c0), dt * 2);
                apMat.opacity = damp(apMat.opacity, 0.15, dampSpeed, dt);
                keyLight.color.lerp(new THREE.Color(0xfff5e8), dt * 3);
                fillLight.color.lerp(new THREE.Color(0xc8d8f0), dt * 3);
            } else { // PROTECT
                wU.uOpacity.value = damp(wU.uOpacity.value, 0.0, dampSpeed * 2, dt);
                sU.uOpacity.value = damp(sU.uOpacity.value, 0.35, dampSpeed, dt);
                cU.uOpacity.value = damp(cU.uOpacity.value, 1.0, dampSpeed * 0.6, dt);
                cU.uCoatingProgress.value = damp(cU.uCoatingProgress.value, 5.5, dampSpeed * 0.4, dt);
                cU.uGlowIntensity.value = damp(cU.uGlowIntensity.value, 1.0, dampSpeed * 0.5, dt);
                greenAccent.intensity = damp(greenAccent.intensity, 5.0, dampSpeed * 0.5, dt);
                greenAccent2.intensity = damp(greenAccent2.intensity, 3.0, dampSpeed * 0.5, dt);
                apMat.color.lerp(new THREE.Color(0x04E586), dt * 3);
                apMat.opacity = damp(apMat.opacity, 0.3, dampSpeed, dt);
                keyLight.color.lerp(new THREE.Color(0xf0ffe8), dt * 2);
                fillLight.color.lerp(new THREE.Color(0xd0f0e0), dt * 2);
            }

            // Mouse Parallax
            smoothMouseX = damp(smoothMouseX, mouseX, 2.5, dt);
            smoothMouseY = damp(smoothMouseY, mouseY, 2.5, dt);
            const baseRotY = 0.45 + smoothMouseX * 0.2;
            const baseRotX = -0.12 + smoothMouseY * 0.1;
            mainGroup.rotation.y += (baseRotY - mainGroup.rotation.y) * dt * 3;
            mainGroup.rotation.x += (baseRotX - mainGroup.rotation.x) * dt * 3;
            mainGroup.rotation.y += 0.0005;
            mainGroup.position.y = Math.sin(elapsed * 0.5) * 0.03;

            // Particles
            const tpArr = tParticleGeo.attributes.position.array;
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                if (tLifetimes[i] > 0) {
                    tpArr[i * 3] += tVelocities[i * 3];
                    tpArr[i * 3 + 1] += tVelocities[i * 3 + 1];
                    tpArr[i * 3 + 2] += tVelocities[i * 3 + 2];
                    tVelocities[i * 3] *= 0.97;
                    tVelocities[i * 3 + 1] *= 0.97;
                    tVelocities[i * 3 + 2] *= 0.97;
                    tLifetimes[i] -= dt * 0.8;
                    if (tLifetimes[i] <= 0) {
                        tpArr[i * 3] = 0;
                        tpArr[i * 3 + 1] = -10;
                        tpArr[i * 3 + 2] = 0;
                    }
                }
            }
            tParticleGeo.attributes.position.needsUpdate = true;

            const apArr = apGeo.attributes.position.array;
            for (let i = 0; i < 40; i++) {
                apArr[i * 3] += apSpeeds[i].x;
                apArr[i * 3 + 1] += apSpeeds[i].y;
                if (apArr[i * 3 + 1] > 4) apArr[i * 3 + 1] = -4;
            }
            apGeo.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
        };
        animate();

        const onResize = () => {
            const w2 = container.clientWidth;
            const h2 = container.clientHeight;
            if (w2 && h2) {
                camera.aspect = w2 / h2;
                camera.updateProjectionMatrix();
                renderer.setSize(w2, h2);
            }
        };
        window.addEventListener('resize', onResize);

        return () => {
            cancelAnimationFrame(animId);
            visObs.disconnect();
            container.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []); // Run once on mount

    return <div ref={mountRef} style={{ width: '100%', height: '100%', minHeight: 600 }} />;
}
