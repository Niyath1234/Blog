"use client";

import { useEffect, useRef, useState } from "react";

interface Onomato {
  id: number;
  word: string;
  x: number;
  y: number;
  rot: number;
  color: string;
  size: number;
}

const FAST_WORDS = ["ZOOOOM!", "WHOOSH!", "VROOM!", "ZAP!"];
const SLOW_WORDS = ["TICK...", "HMMM", "READING..."];
const MID_WORDS = ["FLIP!", "TURN!", "SWOOP!"];

const PALETTE = [
  "#ffd400",
  "#00e5ff",
  "#ff2d55",
  "#14f195",
  "#fffaf0",
];

let idCounter = 0;

/**
 * Sound-effect scroll: as the user scrolls, comic onomatopoeia
 * fly out from the side of the screen. The faster they scroll,
 * the louder the word.
 */
export default function ScrollFX() {
  const [items, setItems] = useState<Onomato[]>([]);
  const lastY = useRef(0);
  const lastT = useRef(0);
  const cooldown = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    lastT.current = performance.now();

    const onScroll = () => {
      const now = performance.now();
      const dy = window.scrollY - lastY.current;
      const dt = Math.max(1, now - lastT.current);
      const speed = Math.abs(dy / dt) * 1000; // px/sec

      if (now - cooldown.current < 700) {
        lastY.current = window.scrollY;
        lastT.current = now;
        return;
      }
      if (Math.abs(dy) < 70) {
        lastY.current = window.scrollY;
        lastT.current = now;
        return;
      }

      let pool = SLOW_WORDS;
      let size = 28;
      if (speed > 1800) {
        pool = FAST_WORDS;
        size = 64;
      } else if (speed > 700) {
        pool = MID_WORDS;
        size = 44;
      } else if (speed < 260) {
        lastY.current = window.scrollY;
        lastT.current = now;
        return;
      }

      // Reduce overall visual noise:
      // - low speed: rare
      // - medium speed: occasional
      // - high speed: frequent but not constant
      const spawnChance = speed > 1800 ? 0.55 : speed > 700 ? 0.32 : 0.18;
      if (Math.random() > spawnChance) {
        lastY.current = window.scrollY;
        lastT.current = now;
        return;
      }
      cooldown.current = now;

      const word = pool[Math.floor(Math.random() * pool.length)];
      const fromRight = Math.random() > 0.5;
      const item: Onomato = {
        id: ++idCounter,
        word,
        x: fromRight
          ? window.innerWidth - 220
          : 40 + Math.random() * 60,
        y: 120 + Math.random() * (window.innerHeight - 260),
        rot: -18 + Math.random() * 20,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        size,
      };
      setItems((s) => [...s.slice(-1), item]);
      window.setTimeout(() => {
        setItems((s) => s.filter((x) => x.id !== item.id));
      }, 1300);

      lastY.current = window.scrollY;
      lastT.current = now;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {items.map((it) => (
        <span
          key={it.id}
          className="onomato absolute font-display select-none"
          style={{
            left: `${it.x}px`,
            top: `${it.y}px`,
            color: it.color,
            fontSize: `${it.size}px`,
            transform: `rotate(${it.rot}deg)`,
            WebkitTextStroke: "3px #0a0a0a",
            textShadow: "5px 5px 0 #0a0a0a",
            letterSpacing: "0.05em",
          }}
        >
          {it.word}
        </span>
      ))}
    </div>
  );
}
