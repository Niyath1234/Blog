import dynamic from "next/dynamic";
import Link from "next/link";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";

const ScrollFX = dynamic(() => import("@/components/ui/ScrollFX"));
const Sidekick = dynamic(() => import("@/components/ui/Sidekick"));

export default function Home() {
  return (
    <>
      <ScrollFX />
      <Sidekick />
      <main className="min-h-screen">
        <Hero />
        <Manifesto />
        <FeaturedIssue />
        <Footer />
      </main>
    </>
  );
}

function FeaturedIssue() {
  return (
    <section className="px-5 sm:px-8 pb-24 max-w-[1400px] mx-auto">
      <div className="relative panel halftone-yellow p-8 sm:p-12 overflow-hidden">
        <div className="absolute -top-4 -left-4 sticker bg-[#ff2d55] text-white">
          NOW READING
        </div>
        <div className="absolute -top-4 -right-4 sticker">FEATURED</div>

        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-8">
            <div className="font-mono text-xs uppercase tracking-[0.3em] opacity-70">
              Issue #001 · Ghost in the Kernel
            </div>
            <h2 className="font-display tracking-wide leading-[0.92] text-[clamp(2.4rem,6vw,5rem)] mt-1">
              THE <span className="bg-black text-[#ffd400] px-2">GHOST</span> IN
              <br />
              THE <span className="hl-r">KERNEL.</span>
            </h2>
            <p className="mt-4 max-w-2xl font-serif text-lg leading-snug">
              Thirty minutes on the agent-native operating system: why
              sandboxes became a tax, why memory is becoming a knowledge
              fabric, and why the next Windows moment arrives without
              a window.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3 lg:items-end">
            <Link
              href="/issues/ghost-in-the-kernel"
              className="inline-flex items-center justify-center w-full lg:w-auto gap-2 px-6 py-4 ink-border-thick bg-black text-[#ffd400] font-display tracking-widest text-2xl shadow-comic hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-comic-lg transition-transform"
            >
              READ THE ISSUE →
            </Link>
            <div className="font-mono text-xs uppercase tracking-[0.3em] opacity-70">
              30 min · deep notes · 1 ghost
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t-[5px] border-black bg-[#0a0a0a] text-[#fffaf0]">
      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="flex flex-wrap gap-6 items-center justify-between">
          <div>
            <div className="font-display text-3xl tracking-widest text-[#ffd400]">
              THE MULTIVERSE OF INTELLIGENCE
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] opacity-70 mt-1">
              a graphic-novel research log · printed on the cloud
            </div>
          </div>
          <nav className="flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-[0.25em]">
            <Link
              href="/issues/ghost-in-the-kernel"
              className="px-2 py-1 border-2 border-[#ffd400] hover:bg-[#ffd400] hover:text-black transition-colors"
            >
              #001 KERNEL
            </Link>
            <Link
              href="/issues/the-memory-leak"
              className="px-2 py-1 border-2 border-[#ff2d55] hover:bg-[#ff2d55] transition-colors"
            >
              #003 MEMORY
            </Link>
            <Link
              href="/issues/silicon-sight"
              className="px-2 py-1 border-2 border-[#00e5ff] hover:bg-[#00e5ff] hover:text-black transition-colors"
            >
              #004 SIGHT
            </Link>
            <Link
              href="/issues/escaping-flatland"
              className="px-2 py-1 border-2 border-[#14f195] hover:bg-[#14f195] hover:text-black transition-colors"
            >
              #002 FLATLAND
            </Link>
          </nav>
          <div className="font-mono text-xs uppercase tracking-[0.3em] opacity-70">
            © 2026 · written in Rust · illustrated in CSS
          </div>
        </div>
        <p className="mt-8 pt-6 border-t-2 border-[#2a2a2a] text-center font-serif text-base text-[#c4baa8]">
          <span className="font-display tracking-[0.2em] text-[#ffd400] not-italic">
            NIYATH
          </span>
          <span className="mx-2 text-[#5c5346]">·</span>
          just a curious guy
        </p>
      </div>
    </footer>
  );
}
