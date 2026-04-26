"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useToonGradient } from "./ToonOutline";

/** Build a chunky "gear" silhouette via ExtrudeGeometry. */
function useGearGeometry() {
  return useMemo(() => {
    const teeth = 12;
    const outerR = 1.0;
    const innerR = 0.78;
    const shape = new THREE.Shape();
    for (let i = 0; i < teeth * 2; i++) {
      const a = (i / (teeth * 2)) * Math.PI * 2;
      const r = i % 2 === 0 ? outerR : innerR;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();

    const hole = new THREE.Path();
    hole.absarc(0, 0, 0.3, 0, Math.PI * 2, false);
    shape.holes.push(hole);

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.4,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    });
    geo.translate(0, 0, -0.2);
    geo.computeVertexNormals();
    return geo;
  }, []);
}

interface ShapeProps {
  visible: boolean;
  color: string;
}

/**
 * Each shape shares the same pattern: a group that scales 0->1
 * when active, with cel-shaded toon material + black outline hull.
 */
function ShapeShell({
  visible,
  children,
  spin = 0.3,
  wobble = false,
}: React.PropsWithChildren<{
  visible: boolean;
  spin?: number;
  wobble?: boolean;
}>) {
  const ref = useRef<THREE.Group>(null);
  const target = visible ? 1 : 0;

  useFrame((state, dt) => {
    if (!ref.current) return;
    const g = ref.current;
    const s = THREE.MathUtils.damp(g.scale.x, target, 8, dt);
    g.scale.set(s, s, s);

    if (visible) {
      g.rotation.y += dt * spin;
      if (wobble) {
        g.rotation.x = Math.sin(state.clock.elapsedTime * 1.6) * 0.18;
      }
    }
    g.visible = s > 0.01;
  });

  return (
    <group ref={ref} scale={0}>
      {children}
    </group>
  );
}

/* ============================================================
   GEAR — "The Memory Leak" / Rust
   ============================================================ */
export function Gear({ visible, color }: ShapeProps) {
  const geo = useGearGeometry();
  const grad = useToonGradient(4);
  return (
    <ShapeShell visible={visible} spin={0.6}>
      {/* Outline */}
      <mesh scale={1.05} geometry={geo}>
        <meshBasicMaterial color="#0a0a0a" side={THREE.BackSide} />
      </mesh>
      <mesh geometry={geo}>
        <meshToonMaterial color={color} gradientMap={grad} />
      </mesh>
      {/* Center bolt */}
      <mesh position={[0, 0, 0.25]}>
        <cylinderGeometry args={[0.18, 0.18, 0.55, 6]} />
        <meshToonMaterial color="#0a0a0a" gradientMap={grad} />
      </mesh>
      {/* Spark — tiny floating cubes */}
      {[0, 1, 2, 3].map((i) => (
        <Spark key={i} index={i} />
      ))}
    </ShapeShell>
  );
}

function Spark({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + index * 1.3;
    const r = 1.25 + Math.sin(t * 2) * 0.15;
    const a = t * 0.8 + index * (Math.PI / 2);
    ref.current.position.set(Math.cos(a) * r, Math.sin(a) * r, 0.4);
    ref.current.rotation.set(t, t * 0.7, 0);
    const s = 0.05 + Math.abs(Math.sin(t * 6)) * 0.04;
    ref.current.scale.set(s, s, s);
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#ffd400" />
    </mesh>
  );
}

/* ============================================================
   EYE — "Silicon Sight" / Computer Vision
   ============================================================ */
export function Eye({ visible, color }: ShapeProps) {
  const grad = useToonGradient(4);
  return (
    <ShapeShell visible={visible} spin={0.0} wobble>
      {/* Sclera (white) — outline */}
      <mesh scale={1.06}>
        <sphereGeometry args={[0.95, 48, 48]} />
        <meshBasicMaterial color="#0a0a0a" side={THREE.BackSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.95, 48, 48]} />
        <meshToonMaterial color="#fffaf0" gradientMap={grad} />
      </mesh>
      {/* Iris */}
      <mesh position={[0, 0, 0.78]}>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshToonMaterial color={color} gradientMap={grad} />
      </mesh>
      {/* Pupil */}
      <mesh position={[0, 0, 0.95]}>
        <sphereGeometry args={[0.2, 24, 24]} />
        <meshBasicMaterial color="#0a0a0a" />
      </mesh>
      {/* Specular highlight */}
      <mesh position={[0.18, 0.22, 1.05]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Floating bounding-box keypoints */}
      {[0, 1, 2, 3, 4].map((i) => (
        <Keypoint key={i} index={i} />
      ))}
    </ShapeShell>
  );
}

function Keypoint({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.4 + index * 1.7;
    const r = 1.35;
    const a = t;
    const b = Math.sin(t * 0.7 + index) * 0.6;
    ref.current.position.set(Math.cos(a) * r, b, Math.sin(a) * r);
    ref.current.rotation.y = -a;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.16, 0.16, 0.16]} />
      <meshBasicMaterial color="#ff2d55" wireframe />
    </mesh>
  );
}

/* ============================================================
   WEB — "The Context Web" / Knowledge Graphs
   ============================================================ */
export function Web({ visible, color }: ShapeProps) {
  const grad = useToonGradient(4);
  const radials = 8;
  const rings = 3;
  return (
    <ShapeShell visible={visible} spin={0.4}>
      {/* Radial spokes */}
      {Array.from({ length: radials }).map((_, i) => {
        const a = (i / radials) * Math.PI * 2;
        return (
          <group key={`r-${i}`} rotation={[0, 0, a]}>
            <mesh position={[0.6, 0, 0]} scale={1.05}>
              <boxGeometry args={[1.4, 0.08, 0.08]} />
              <meshBasicMaterial color="#0a0a0a" side={THREE.BackSide} />
            </mesh>
            <mesh position={[0.6, 0, 0]}>
              <boxGeometry args={[1.4, 0.06, 0.06]} />
              <meshToonMaterial color="#0a0a0a" gradientMap={grad} />
            </mesh>
          </group>
        );
      })}
      {/* Concentric rings */}
      {Array.from({ length: rings }).map((_, i) => {
        const r = 0.45 + i * 0.34;
        return (
          <group key={`ring-${i}`}>
            <mesh scale={1.06}>
              <torusGeometry args={[r, 0.05, 8, 64]} />
              <meshBasicMaterial color="#0a0a0a" side={THREE.BackSide} />
            </mesh>
            <mesh>
              <torusGeometry args={[r, 0.045, 8, 64]} />
              <meshToonMaterial color={color} gradientMap={grad} />
            </mesh>
          </group>
        );
      })}
      {/* Central node */}
      <mesh scale={1.1}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshBasicMaterial color="#0a0a0a" side={THREE.BackSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshToonMaterial color="#ffd400" gradientMap={grad} />
      </mesh>
      {/* Tensor nodes at intersections */}
      {Array.from({ length: radials * rings }).map((_, idx) => {
        const ringIdx = Math.floor(idx / radials);
        const radIdx = idx % radials;
        const a = (radIdx / radials) * Math.PI * 2;
        const r = 0.45 + ringIdx * 0.34;
        return (
          <mesh
            key={`node-${idx}`}
            position={[Math.cos(a) * r, Math.sin(a) * r, 0]}
          >
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshToonMaterial color="#0a0a0a" gradientMap={grad} />
          </mesh>
        );
      })}
    </ShapeShell>
  );
}

/* ============================================================
   HEAD — "Ghost in the Kernel" / Agent OS
   ============================================================ */
export function Head({ visible, color }: ShapeProps) {
  const grad = useToonGradient(4);
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
  });

  return (
    <ShapeShell visible={visible} spin={0.4}>
      <group ref={ref}>
        {/* Headless cap (no top half) */}
        <mesh scale={1.05}>
          <sphereGeometry
            args={[0.95, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.62]}
          />
          <meshBasicMaterial color="#0a0a0a" side={THREE.BackSide} />
        </mesh>
        <mesh>
          <sphereGeometry
            args={[0.95, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.62]}
          />
          <meshToonMaterial color={color} gradientMap={grad} />
        </mesh>
        {/* Open top — exposed "kernel" */}
        <mesh position={[0, 0.18, 0]} scale={1.04}>
          <torusGeometry args={[0.92, 0.04, 8, 48]} />
          <meshBasicMaterial color="#0a0a0a" />
        </mesh>
        {/* Inner core (the "ghost") */}
        <mesh position={[0, 0.1, 0]}>
          <icosahedronGeometry args={[0.45, 1]} />
          <meshToonMaterial
            color="#00e5ff"
            gradientMap={grad}
            emissive="#00e5ff"
            emissiveIntensity={0.45}
          />
        </mesh>
        {/* Eyes (visor strip) */}
        <mesh position={[0, -0.05, 0.78]}>
          <boxGeometry args={[0.7, 0.16, 0.05]} />
          <meshBasicMaterial color="#0a0a0a" />
        </mesh>
        <mesh position={[-0.18, -0.05, 0.81]}>
          <boxGeometry args={[0.18, 0.06, 0.02]} />
          <meshBasicMaterial color="#ffd400" />
        </mesh>
        <mesh position={[0.18, -0.05, 0.81]}>
          <boxGeometry args={[0.18, 0.06, 0.02]} />
          <meshBasicMaterial color="#ffd400" />
        </mesh>
        {/* Antenna */}
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.6, 6]} />
          <meshBasicMaterial color="#0a0a0a" />
        </mesh>
        <mesh position={[0, 0.88, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#ff2d55" />
        </mesh>
      </group>
    </ShapeShell>
  );
}
