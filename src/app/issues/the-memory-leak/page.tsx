import type { Metadata } from "next";
import Link from "next/link";
import ComingSoon from "@/components/essay/ComingSoon";

export const metadata: Metadata = {
  title: "The Memory Leak · Multiverse of Intelligence #003",
  description:
    "Rust, compilers, systems. Where ownership rules are religion and the borrow checker is judge, jury and segfault.",
};

export default function Page() {
  return (
    <>
      <IssueNav />
      <main className="min-h-screen pb-10">
        <ComingSoon
          seriesId="memory"
          teases={[
            "How Rust's ownership semantics map almost perfectly onto agent-runtime memory.",
            "Why GC pauses are existential for an inference kernel, and the real-time argument for a borrow-checked agent runtime.",
            "A field tour of the half-dozen Rust LLM-runtime stacks (vLLM-rs, llama.rs, Mistral.rs, candle, burn, tch-rs).",
            "Compiler-as-agent: how MLIR + Rust traits could give us a kernel that compiles its own optimizations on the fly.",
            "Hardware co-design: AMD's MI400 ISA, Apple's Neural Engine reversed, Cerebras's wafer-scale memory model.",
          ]}
        />
      </main>
    </>
  );
}

function IssueNav() {
  return (
    <nav className="sticky top-0 z-40 border-b-[5px] border-black bg-[#0a0a0a] text-[#fffaf0]">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 h-12 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-display tracking-[0.18em] text-base sm:text-lg text-[#ffd400] hover:text-white transition-colors"
        >
          ← THE MULTIVERSE OF INTELLIGENCE
        </Link>
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]">
          <span className="text-[#ff2d55]">#003</span>
          <span className="hidden md:inline opacity-60">·</span>
          <span className="hidden md:inline">THE MEMORY LEAK</span>
        </div>
      </div>
    </nav>
  );
}
