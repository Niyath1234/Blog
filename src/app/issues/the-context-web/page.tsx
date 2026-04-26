import type { Metadata } from "next";
import Link from "next/link";
import ComingSoon from "@/components/essay/ComingSoon";

export const metadata: Metadata = {
  title: "The Context Web · Multiverse of Intelligence #004",
  description:
    "Knowledge graphs and high-dimensional data. Tensors woven into a spider web; every node a meaning, every edge a memory.",
};

export default function Page() {
  return (
    <>
      <IssueNav />
      <main className="min-h-screen pb-10">
        <ComingSoon
          seriesId="graphs"
          teases={[
            "The collapse of relational schema into latent graphs: how vector indices became the new tables.",
            "Why retrieval is a graph problem dressed as a similarity problem.",
            "GraphRAG, hybrid search, LlamaIndex' graph stores: what survives the hype and what doesn't.",
            "High-dimensional geometry is weird: the curse of dimensionality, the blessing of concentration, and why both are useful.",
            "An agent's memory fabric as a giant living knowledge graph, with the kernel as gardener.",
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
          <span className="text-[#14f195]">#004</span>
          <span className="hidden md:inline opacity-60">·</span>
          <span className="hidden md:inline">THE CONTEXT WEB</span>
        </div>
      </div>
    </nav>
  );
}
