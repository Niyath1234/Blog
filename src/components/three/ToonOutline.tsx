"use client";

import { useMemo } from "react";
import * as THREE from "three";

/**
 * 4-tone gradient map used by MeshToonMaterial to give us
 * the stepped "cel-shaded" look. Without a gradient map the
 * toon material just uses 2 stops, which doesn't read as comic.
 */
export function useToonGradient(steps = 4) {
  return useMemo(() => {
    const data = new Uint8Array(steps);
    for (let i = 0; i < steps; i++) {
      data[i] = Math.round((i / (steps - 1)) * 255);
    }
    const tex = new THREE.DataTexture(data, steps, 1, THREE.RedFormat);
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    tex.generateMipmaps = false;
    tex.needsUpdate = true;
    return tex;
  }, [steps]);
}

interface ToonProps {
  color: string;
  outline?: number;
  emissive?: string;
}

/**
 * Comic-Core material: a MeshToonMaterial wrapped with an
 * inverted-hull black "outline" pass for that ink-line look.
 *
 * Use as <ToonShell color="#FFD400"> <geometry/> </ToonShell>.
 */
export function ToonShell({
  color,
  outline = 0.06,
  emissive = "#000000",
  children,
}: React.PropsWithChildren<ToonProps>) {
  const gradient = useToonGradient(4);

  return (
    <group>
      {/* Outline: inverted-hull, drawn back-side, scaled out */}
      <mesh scale={1 + outline}>
        {children}
        <meshBasicMaterial color="#0a0a0a" side={THREE.BackSide} />
      </mesh>

      {/* The actual cel-shaded surface */}
      <mesh>
        {children}
        <meshToonMaterial
          color={color}
          gradientMap={gradient}
          emissive={emissive}
        />
      </mesh>
    </group>
  );
}
