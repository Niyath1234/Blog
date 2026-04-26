"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle 3D parallax tilt on the whole page based on mouse
 * position. Gives the layered comic the "physical depth"
 * of a real printed page being held up.
 */
export default function PageTilt({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.transform = `rotateX(${(-cy * 1.3).toFixed(3)}deg) rotateY(${(
        cx * 1.6
      ).toFixed(3)}deg)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="parallax-page">
      <div ref={ref} className="page-tilt">
        {children}
      </div>
    </div>
  );
}
