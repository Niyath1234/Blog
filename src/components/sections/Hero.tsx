"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { SERIES, type SeriesId } from "@/data/series";

const MorphingCore = dynamic(
  () => import("@/components/three/MorphingCore"),
  { ssr: false, loading: () => null }
);

const ACCENT_BG: Record<string, string> = {
  yellow: "halftone-yellow",
  cyan: "halftone-cyan",
  red: "halftone-red",
  green: "bg-[#14f195]",
};

const SLUG: Record<SeriesId, string> = {
  kernel: "/issues/ghost-in-the-kernel",
  memory: "/issues/the-memory-leak",
  vision: "/issues/silicon-sight",
  graphs: "/issues/the-context-web",
};

export default function Hero() {
  const [active, setActive] = useState<SeriesId>("kernel");
  const series = SERIES.find((s) => s.id === active)!;

  return (
    <section className="relative w-full">
      {/* Top "ISSUE TAPE" marquee */}
      <div className="relative overflow-hidden border-y-[5px] border-black bg-[#0a0a0a] text-[#ffd400]">
        <div className="tape flex whitespace-nowrap py-2 font-display text-2xl tracking-[0.25em]">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="px-6 inline-flex items-center gap-6">
              <span>★ THE MULTIVERSE OF INTELLIGENCE</span>
              <span className="text-[#00e5ff]">· ISSUE #001 IS LIVE ·</span>
              <span>GHOST IN THE KERNEL</span>
              <span className="text-[#ff2d55]">★</span>
              <span>RATED &quot;O&quot; FOR OPUS</span>
              <span className="text-[#00e5ff]">●</span>
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5 sm:gap-6 px-5 sm:px-8 pt-10 pb-12 max-w-[1400px] mx-auto">
        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -1.4 }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
          className="panel col-span-12 lg:col-span-7 p-6 sm:p-8 relative"
        >
          <div className="absolute -top-4 -left-3 sticker">
            VOL. 01 / NO. 001
          </div>
          <div className="font-mono text-xs uppercase tracking-[0.3em] opacity-70 mb-2">
            a graphic-novel research log on the agent era
          </div>
          <h1 className="font-display leading-[0.92] tracking-wide text-[clamp(2.6rem,7vw,6rem)]">
            THE <span className="bg-[#ffd400] px-2 ink-border">MULTIVERSE</span>
            <br />
            OF{" "}
            <span
              className="glitch px-2 bg-[#0a0a0a] text-[#ffd400]"
              data-text="INTELLIGENCE."
            >
              INTELLIGENCE.
            </span>
          </h1>
          <p className="mt-5 text-lg sm:text-xl max-w-2xl leading-relaxed font-serif">
            Four series. One universe. Each issue takes a hard idea
            from AI research and runs it through a comic press: ink-shaded
            3D, bento panels, footnotes, and the occasional
            <em> POW! </em>
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={SLUG[active]}
              className="inline-flex items-center gap-2 px-5 py-3 ink-border-thick bg-[#ffd400] font-display tracking-widest text-xl shadow-comic hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-comic-lg transition-transform"
            >
              READ {series.issue} →
            </Link>
            <a
              href="#series"
              className="inline-flex items-center gap-2 px-5 py-3 ink-border-thick bg-white font-display tracking-widest text-xl shadow-comic-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-comic transition-transform"
            >
              BROWSE THE SERIES
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs">
            <span className="px-2 py-1 bg-black text-[#ffd400] border-2 border-black">
              RUST
            </span>
            <span className="px-2 py-1 bg-black text-[#00e5ff] border-2 border-black">
              WASM
            </span>
            <span className="px-2 py-1 bg-black text-[#ff2d55] border-2 border-black">
              MCP
            </span>
            <span className="px-2 py-1 bg-black text-[#14f195] border-2 border-black">
              KV-CACHE
            </span>
            <span className="px-2 py-1 bg-black text-white border-2 border-black">
              A2A
            </span>
          </div>
        </motion.div>

        {/* 3D Morphing Core panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 1.5 }}
          transition={{ type: "spring", stiffness: 240, damping: 20, delay: 0.1 }}
          className={`panel col-span-12 lg:col-span-5 ${ACCENT_BG[series.accent]} p-0 relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px] overflow-hidden`}
        >
          <div className="absolute -top-4 -right-3 sticker bg-[#00e5ff]">
            LIVE / 3D
          </div>

          {/* The 3D scene */}
          <div className="absolute inset-0">
            <MorphingCore active={active} />
          </div>

          {/* Caption ribbon */}
          <div className="absolute left-3 bottom-3 right-3 flex items-end justify-between gap-3 z-10">
            <div className="bubble px-3 py-2 max-w-[70%]">
              <div className="font-display text-base tracking-wider">
                {series.sfx}
              </div>
              <div className="text-xs text-black/80">
                {series.title} &middot; {series.subtitle}
              </div>
            </div>
            <div className="font-display text-xl bg-black text-white px-3 py-1 border-[3px] border-black shadow-comic-sm">
              {series.issue}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ============================================================
          SERIES GRID · each card is a link to its issue
          ============================================================ */}
      <div
        id="series"
        className="px-5 sm:px-8 pb-16 max-w-[1400px] mx-auto"
      >
        <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] opacity-70">
              the four series
            </div>
            <h2 className="font-display text-4xl sm:text-5xl tracking-wide leading-[0.95]">
              PICK YOUR <span className="hl-y">ISSUE.</span>
            </h2>
          </div>
          <div className="font-mono text-xs uppercase tracking-[0.3em] opacity-60">
            hover the cards · the artifact morphs
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SERIES.map((s, i) => {
            const isActive = s.id === active;
            const live = s.id === "kernel";
            return (
              <motion.div
                key={s.id}
                onMouseEnter={() => setActive(s.id)}
                onFocus={() => setActive(s.id)}
                initial={{ opacity: 0, y: 20, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: i % 2 ? 1 : -1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                  delay: 0.05 + i * 0.06,
                }}
                whileHover={{ y: -4, rotate: 0, scale: 1.01 }}
                className={`panel relative ${ACCENT_BG[s.accent]} p-5 sm:p-6 ${
                  isActive ? "ring-4 ring-black/20" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-80">
                      {s.subtitle}
                    </div>
                    <h3 className="font-display text-3xl sm:text-4xl tracking-wide leading-[0.95] mt-1">
                      {s.title}
                    </h3>
                  </div>
                  <div className="font-mono text-[11px] bg-black text-white px-1.5 py-0.5 whitespace-nowrap">
                    {s.issue}
                  </div>
                </div>
                <p className="mt-3 text-base font-serif leading-snug">
                  {s.blurb}
                </p>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span
                    className={`font-display text-sm tracking-widest px-2 py-1 border-2 border-black ${
                      live
                        ? "bg-[#ff2d55] text-white"
                        : "bg-white text-black opacity-70"
                    }`}
                  >
                    {live ? "● LIVE" : "○ DRAFTING"}
                  </span>
                  <Link
                    href={SLUG[s.id]}
                    className="inline-flex items-center gap-2 px-3 py-2 ink-border bg-white font-display tracking-widest text-base shadow-comic-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-comic transition-transform"
                  >
                    {live ? "READ ISSUE" : "PEEK"} →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
