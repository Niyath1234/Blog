"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { type SeriesId, SERIES } from "@/data/series";

interface Props {
  seriesId: SeriesId;
  /** Tease for what this issue will cover */
  teases: string[];
}

const ACCENT_BG: Record<string, string> = {
  yellow: "halftone-yellow",
  cyan: "halftone-cyan",
  red: "halftone-red",
  green: "bg-[#14f195]",
};

export default function ComingSoon({ seriesId, teases }: Props) {
  const s = SERIES.find((x) => x.id === seriesId)!;
  return (
    <article className="relative w-full max-w-[860px] mx-auto px-5 sm:px-8 pt-12 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -1.4 }}
        animate={{ opacity: 1, y: 0, rotate: -1 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className={`panel ${ACCENT_BG[s.accent]} p-8 sm:p-12 relative`}
      >
        <div className="absolute -top-4 -left-4 sticker">
          ISSUE {s.issue}
        </div>
        <div className="absolute -top-4 -right-4 sticker bg-[#ff2d55] text-white">
          DRAFTING
        </div>
        <div className="font-mono text-xs uppercase tracking-[0.3em] opacity-70 mb-2">
          {s.subtitle}
        </div>
        <h1 className="font-display tracking-wide leading-[0.92] text-[clamp(2.6rem,7vw,5rem)]">
          {s.title}
        </h1>
        <p className="mt-4 max-w-2xl font-serif text-xl italic">
          {s.blurb}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.1 }}
        className="panel mt-8 p-6 sm:p-8"
      >
        <div className="font-display text-2xl tracking-widest text-[#ff2d55] mb-3">
          WHAT&rsquo;S BREWING
        </div>
        <ul className="space-y-3 prose-comic text-base">
          {teases.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/issues/ghost-in-the-kernel"
            className="inline-flex items-center gap-2 px-4 py-2 ink-border-thick bg-[#ffd400] font-display tracking-widest text-lg shadow-comic-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-comic transition-transform"
          >
            READ ISSUE #001 →
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 ink-border-thick bg-white font-display tracking-widest text-lg shadow-comic-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-comic transition-transform"
          >
            ← BACK TO MULTIVERSE
          </Link>
        </div>
      </motion.div>
    </article>
  );
}
