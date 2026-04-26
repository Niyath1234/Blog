"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface TermProps {
  /** The technical term shown inline (jargon) */
  word: string;
  /** A 1-sentence "dumbed down" explanation */
  bubble: string;
  /** Color tint for the term */
  color?: "yellow" | "cyan" | "red" | "green";
}

const TINT: Record<NonNullable<TermProps["color"]>, string> = {
  yellow: "bg-[#ffd400]",
  cyan: "bg-[#00e5ff]",
  red: "bg-[#ff2d55] text-white",
  green: "bg-[#14f195]",
};

/**
 * Hover an inline jargon term and a comic speech bubble
 * pops up with a layperson explanation. "POW!" the reader
 * gets it.
 */
export function Term({ word, bubble, color = "yellow" }: TermProps) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className="relative inline-block align-baseline"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
    >
      <span
        className={`px-1.5 py-0.5 cursor-help font-semibold rounded-[2px] border-2 border-black ${TINT[color]} shadow-[2px_2px_0_0_#0a0a0a] hover:shadow-[3px_3px_0_0_#0a0a0a] transition-shadow`}
      >
        {word}
      </span>
      <AnimatePresence>
        {open ? (
          <motion.span
            initial={{ opacity: 0, y: -6, scale: 0.7, rotate: -3 }}
            animate={{ opacity: 1, y: -10, scale: 1, rotate: -2 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="bubble absolute left-0 bottom-full mb-3 w-72 z-30 px-4 py-3 text-sm font-sans text-black"
            style={{ pointerEvents: "none" }}
          >
            <span className="font-display block text-base mb-1 tracking-wide">
              POW!
            </span>
            <span className="leading-snug">{bubble}</span>
          </motion.span>
        ) : null}
      </AnimatePresence>
    </span>
  );
}
