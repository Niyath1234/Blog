import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import EscapingFlatland from "@/components/essay/EscapingFlatland";

const Sidekick = dynamic(() => import("@/components/ui/Sidekick"));
const ScrollFX = dynamic(() => import("@/components/ui/ScrollFX"));

export const metadata: Metadata = {
  title: "Escaping Flatland · Multiverse of Intelligence #002",
  description:
    "The mathematics of a hyperbolic context manifold: complex lifts, Poincare geometry, Mobius message passing, and manifold contrastive optimization.",
};

export default function Page() {
  return (
    <>
      <ScrollFX />
      <Sidekick />
      <IssueNav />
      <main className="min-h-screen pb-10">
        <EscapingFlatland />
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
          <span className="text-[#14f195]">#002</span>
          <span className="hidden md:inline opacity-60">·</span>
          <span className="hidden md:inline">ESCAPING FLATLAND</span>
        </div>
      </div>
    </nav>
  );
}
