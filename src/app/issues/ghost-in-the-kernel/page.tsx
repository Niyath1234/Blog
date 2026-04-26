import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import GhostInTheKernel from "@/components/essay/GhostInTheKernel";

const Sidekick = dynamic(() => import("@/components/ui/Sidekick"));
const ScrollFX = dynamic(() => import("@/components/ui/ScrollFX"));

export const metadata: Metadata = {
  title: "Ghost in the Kernel · Multiverse of Intelligence #001",
  description:
    "On the agent-native operating system: the death of user space, KV-cache as memory, MCP and A2A, and the three open frontiers (semantic firewall, cognitive GC, economic scheduler).",
};

export default function Page() {
  return (
    <>
      <ScrollFX />
      <Sidekick />
      <IssueNav />
      <main className="min-h-screen pb-10">
        <GhostInTheKernel />
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
          <span className="hidden sm:inline opacity-60">ISSUE</span>
          <span className="text-[#00e5ff]">#001</span>
          <span className="hidden md:inline opacity-60">·</span>
          <span className="hidden md:inline">GHOST IN THE KERNEL</span>
        </div>
      </div>
    </nav>
  );
}
