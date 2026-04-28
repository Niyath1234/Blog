"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const QUIPS = [
  "This post is 40% hallucinations. I checked it for you.",
  "The kernel called. It wants its sandbox back.",
  "I tried to schedule a thought. The OS taxed me 3 tokens.",
  "Heads up: you're about to read the word 'tensor'. Brace yourself.",
  "Reminder: 'Headless' is a feature, not a bug.",
  "I am 78% Rust and 22% existential dread.",
  "If you scroll fast enough, the kernel can't catch you.",
  "P.S. I segfaulted on the last paragraph. You're welcome.",
  "Don't trust the agent. I'm only saying that because I AM the agent.",
];

/**
 * A tiny floating Rust-gear robot that drops snarky comments
 * about the post you're reading. Pure visual personality.
 */
export default function Sidekick() {
  const [quip, setQuip] = useState(0);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const id = window.setInterval(() => {
      setQuip((q) => (q + 1) % QUIPS.length);
    }, 7800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-30 flex items-end gap-2 pointer-events-none">
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            key={quip}
            initial={{ opacity: 0, y: 10, scale: 0.8, rotate: -3 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: -1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: "spring", stiffness: 320, damping: 20 }}
            className="bubble max-w-[260px] px-4 py-3 text-sm leading-snug pointer-events-auto"
          >
            <span className="font-display tracking-wider text-[#ff2d55] block text-xs mb-0.5">
              SIDEKICK SAYS:
            </span>
            {QUIPS[quip]}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        aria-label="Toggle sidekick"
        onClick={() => setOpen((o) => !o)}
        className="relative w-16 h-16 rounded-full ink-border-thick bg-[#ffd400] shadow-comic hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform pointer-events-auto"
      >
        {/* Tiny "rusty gear with eyes" face */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="relative w-10 h-10">
            {/* Gear teeth — 8 little stubs */}
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="absolute left-1/2 top-1/2 w-1.5 h-3 bg-black rounded-sm"
                style={{
                  transform: `translate(-50%, -50%) rotate(${
                    i * 45
                  }deg) translateY(-22px)`,
                }}
              />
            ))}
            {/* Body */}
            <div className="absolute inset-1 rounded-full bg-[#c2410c] border-[3px] border-black" />
            {/* Eyes */}
            <div className="absolute left-2 top-3 w-2 h-2 rounded-full bg-white border-[1.5px] border-black" />
            <div className="absolute right-2 top-3 w-2 h-2 rounded-full bg-white border-[1.5px] border-black" />
            <div className="absolute left-2.5 top-3.5 w-1 h-1 rounded-full bg-black" />
            <div className="absolute right-2.5 top-3.5 w-1 h-1 rounded-full bg-black" />
            {/* Smirk */}
            <div className="absolute left-1/2 bottom-2 w-3 h-1 -translate-x-1/2 bg-black rounded-full" />
          </div>
        </div>
      </button>
    </div>
  );
}
