"use client";

import { useEffect, useState } from "react";

export default function ReadProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const v = max > 0 ? (h.scrollTop / max) * 100 : 0;
      setPct(Math.min(100, Math.max(0, v)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="read-bar" aria-hidden>
      <span style={{ width: `${pct}%` }} />
    </div>
  );
}
