"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Eye, Gear, Head, Web } from "./Shapes";
import type { SeriesId } from "@/data/series";

const COLORS: Record<SeriesId, string> = {
  kernel: "#ffd400",
  memory: "#c2410c",
  vision: "#00e5ff",
  graphs: "#14f195",
};

interface CoreProps {
  active: SeriesId;
  glitch: boolean;
}

function Stage({ active, glitch }: CoreProps) {
  const root = useRef<THREE.Group>(null);
  const [glitchOffset, setGlitchOffset] = useState(0);

  useFrame((state, dt) => {
    if (!root.current) return;
    // gentle floating bob
    root.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
    // mouse tilt parallax
    const { x, y } = state.pointer;
    root.current.rotation.x = THREE.MathUtils.damp(
      root.current.rotation.x,
      -y * 0.25,
      4,
      dt
    );
    root.current.rotation.y = THREE.MathUtils.damp(
      root.current.rotation.y,
      x * 0.45,
      4,
      dt
    );
  });

  useEffect(() => {
    if (!glitch) return;
    let raf = 0;
    const start = performance.now();
    const tick = () => {
      const t = performance.now() - start;
      if (t > 380) {
        setGlitchOffset(0);
        return;
      }
      setGlitchOffset((Math.random() - 0.5) * 0.18);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [glitch]);

  return (
    <group ref={root} position={[glitchOffset, 0, 0]}>
      <Head visible={active === "kernel"} color={COLORS.kernel} />
      <Gear visible={active === "memory"} color={COLORS.memory} />
      <Eye visible={active === "vision"} color={COLORS.vision} />
      <Web visible={active === "graphs"} color={COLORS.graphs} />
    </group>
  );
}

export default function MorphingCore({ active }: { active: SeriesId }) {
  const [glitch, setGlitch] = useState(false);
  const prev = useRef<SeriesId>(active);

  useEffect(() => {
    if (prev.current !== active) {
      setGlitch(true);
      const id = window.setTimeout(() => setGlitch(false), 400);
      prev.current = active;
      return () => window.clearTimeout(id);
    }
  }, [active]);

  return (
    <div className="relative w-full h-full">
      {/* RGB-split overlay during glitch */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-200"
        style={{
          opacity: glitch ? 1 : 0,
          mixBlendMode: "screen",
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,45,85,0.18) 0%, transparent 55%), radial-gradient(circle at 52% 48%, rgba(0,229,255,0.18) 0%, transparent 55%)",
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 34 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} />
        <directionalLight position={[-3, -2, -2]} intensity={0.4} />
        <Suspense fallback={null}>
          <Stage active={active} glitch={glitch} />
        </Suspense>
      </Canvas>
    </div>
  );
}
