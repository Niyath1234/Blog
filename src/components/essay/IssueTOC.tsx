"use client";

import { useEffect, useState } from "react";

export interface TocEntry {
  id: string;
  label: string;
  depth?: 1 | 2;
}

export default function IssueTOC({ entries }: { entries: TocEntry[] }) {
  const [active, setActive] = useState(entries[0]?.id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => {
        const visible = es
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop
          )[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    entries.forEach((e) => {
      const el = document.getElementById(e.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [entries]);

  return (
    <nav
      aria-label="Table of contents"
      className="hidden xl:block fixed top-28 left-5 w-[210px] z-40"
    >
      <div className="panel p-3 text-[11px] font-mono uppercase tracking-widest">
        <div className="font-display text-base tracking-widest mb-2 text-[#ff2d55]">
          ISSUE MAP
        </div>
        <ul className="space-y-1">
          {entries.map((e) => {
            const isActive = e.id === active;
            return (
              <li
                key={e.id}
                className={e.depth === 2 ? "pl-3" : ""}
              >
                <a
                  href={`#${e.id}`}
                  className={`block py-1 px-2 border-2 transition-colors ${
                    isActive
                      ? "bg-[#ffd400] border-black"
                      : "border-transparent hover:bg-[#ffd40055] hover:border-black/30"
                  }`}
                >
                  {e.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
