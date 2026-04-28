import type { Metadata } from "next";
import Link from "next/link";
import ComingSoon from "@/components/essay/ComingSoon";

export const metadata: Metadata = {
  title: "Silicon Sight · Multiverse of Intelligence #004",
  description:
    "Computer vision and image processing. We taught a sphere to see, and now it judges your code.",
};

export default function Page() {
  return (
    <>
      <IssueNav />
      <main className="min-h-screen pb-10">
        <ComingSoon
          seriesId="vision"
          teases={[
            "Why end-to-end ViTs are eating CNN-era pipelines, and what they break in the process.",
            "Bounding boxes are dead, segmentations are dying, the future is open-vocabulary scene understanding.",
            "DINOv3, SAM-3, EVA-02: the self-supervised line that makes labels feel like a 2019 affectation.",
            "When your model has to look at a screen as well as the pixels: GUI-aware vision and the rise of agent-vision benchmarks.",
            "What an OS-level perception primitive looks like: 'recall every image of my child wearing a yellow hat' as a single syscall.",
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
          <span className="text-[#00e5ff]">#004</span>
          <span className="hidden md:inline opacity-60">·</span>
          <span className="hidden md:inline">SILICON SIGHT</span>
        </div>
      </div>
    </nav>
  );
}
