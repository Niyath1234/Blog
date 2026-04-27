"use client";

import { motion } from "framer-motion";

const PRINCIPLES = [
  {
    n: "01",
    title: "Hard Ideas, Comic Press.",
    body:
      "Every issue is a deep technical argument run through a graphic-novel layout: drop caps, marginalia, footnotes, and the occasional onomatopoeia. Density without dryness.",
    accent: "yellow" as const,
  },
  {
    n: "02",
    title: "3D as the Cover.",
    body:
      "Each series has a hand-drawn-feeling 3D artifact: a head, a gear, an eye, a web. Toon-shaded, halftone-tinted, hot-glued together with cel outlines and a touch of glitch.",
    accent: "cyan" as const,
  },
  {
    n: "03",
    title: "Show The Sources.",
    body:
      "The blog posts are paired with footnotes, citations, and a 'further reading' shelf. If a claim sounds wild, the link is there to argue with.",
    accent: "red" as const,
  },
  {
    n: "04",
    title: "Built for the Agent Era.",
    body:
      "Topics are picked because something in the AI stack is actively being rebuilt: kernels, memory, vision, knowledge graphs. We document the molten parts.",
    accent: "green" as const,
  },
];

const ACCENT_BG: Record<string, string> = {
  yellow: "halftone-yellow",
  cyan: "halftone-cyan",
  red: "halftone-red",
  green: "bg-[#14f195]",
};

export default function Manifesto() {
  return (
    <section className="px-5 sm:px-8 pb-20 max-w-[1400px] mx-auto">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.3em] opacity-70">
            why this exists
          </div>
          <h2 className="font-display text-4xl sm:text-5xl tracking-wide leading-[0.95]">
            THE <span className="hl-y">HOUSE STYLE.</span>
          </h2>
        </div>
        <div className="max-w-md font-serif text-base text-[#3d362a] leading-snug">
          A research blog you can <em>read like a comic</em>, but with
          technical depth, citations, and real argument density. Dense
          pages, generous margins, no spoon-feeding.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {PRINCIPLES.map((p, i) => (
          <motion.div
            key={p.n}
            initial={{ opacity: 0, y: 24, rotate: i % 2 ? 1.2 : -1.2 }}
            whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 0.6 : -0.6 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 18,
              delay: i * 0.06,
            }}
            className={`panel ${ACCENT_BG[p.accent]} p-5 sm:p-6 relative`}
          >
            <div className="font-display text-5xl tracking-wider opacity-80 mb-1">
              {p.n}
            </div>
            <h3 className="font-display text-2xl tracking-wide leading-tight">
              {p.title}
            </h3>
            <p className="mt-3 font-serif text-base leading-snug">
              {p.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
