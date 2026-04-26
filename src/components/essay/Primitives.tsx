"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

/* ---------- Marginalia ---------- */
export function Margin({
  children,
  side = "right",
}: {
  children: ReactNode;
  side?: "left" | "right";
}) {
  return (
    <aside
      className={`margin-note ${side === "left" ? "left" : ""}`}
      role="note"
    >
      {children}
    </aside>
  );
}

/* ---------- Footnote ref + body ----------
   Usage:
     <FnRef id="1" />          inline pill in body
     <FnBody id="1">…</FnBody> inside the <FnList> at bottom
*/
export function FnRef({ id }: { id: string | number }) {
  return (
    <a
      href={`#fn-${id}`}
      id={`fnref-${id}`}
      className="fn-ref"
      aria-label={`See footnote ${id}`}
    >
      {id}
    </a>
  );
}

export function FnList({ children }: { children: ReactNode }) {
  return (
    <section className="mt-16 pt-6 border-t-[5px] border-black">
      <h3 className="font-display text-3xl tracking-widest mb-3">
        FOOTNOTES
      </h3>
      <ol className="space-y-3 text-[0.98rem] leading-snug font-serif">
        {children}
      </ol>
    </section>
  );
}

export function FnBody({
  id,
  children,
}: {
  id: string | number;
  children: ReactNode;
}) {
  return (
    <li id={`fn-${id}`} className="pl-1">
      <span className="font-display text-[#ff2d55] mr-1">{id}.</span>
      {children}
      <a
        href={`#fnref-${id}`}
        className="fn-back"
        aria-label={`Back to footnote ${id} reference`}
      >
        ↵
      </a>
    </li>
  );
}

/* ---------- Epigraph ---------- */
export function Epigraph({
  children,
  source,
}: {
  children: ReactNode;
  source: string;
}) {
  return (
    <div className="epigraph-block">
      <p className="m-0">{children}</p>
      <cite>{source}</cite>
    </div>
  );
}

/* ---------- Admonition ---------- */
export function Admonition({
  title,
  variant = "note",
  children,
}: {
  title: string;
  variant?: "note" | "warning" | "code";
  children: ReactNode;
}) {
  return (
    <div className={`admonition ${variant}`}>
      <div className="admonition-title">{title}</div>
      <div className="font-serif text-[1.02rem] leading-snug">
        {children}
      </div>
    </div>
  );
}

/* ---------- Drop-cap paragraph ---------- */
export function DropCap({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`dropcap ${className}`}>{children}</p>;
}

/* ---------- Pull quote (visual break) ---------- */
export function PullQuote({
  children,
  attribution,
}: {
  children: ReactNode;
  attribution?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, rotate: -1 }}
      whileInView={{ opacity: 1, scale: 1, rotate: -0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="my-12 mx-auto max-w-[780px] panel halftone-yellow p-6 sm:p-8 text-center"
    >
      <div className="font-display text-3xl sm:text-4xl leading-[1.05] tracking-wide">
        “{children}”
      </div>
      {attribution ? (
        <div className="mt-3 font-mono text-xs uppercase tracking-[0.3em] opacity-80">
          {attribution}
        </div>
      ) : null}
    </motion.div>
  );
}

/* ---------- "Issue" header with metadata strip (Gwern-style) ---------- */
export function IssueHeader({
  issueNo,
  series,
  title,
  subtitle,
  status,
  confidence,
  importance,
  readMinutes,
  date,
  modified,
}: {
  issueNo: string;
  series: string;
  title: string;
  subtitle: string;
  status: string;
  confidence: string;
  importance: number;
  readMinutes: number;
  date: string;
  modified?: string;
}) {
  return (
    <header className="relative pt-8 pb-6 mb-6 border-b-[5px] border-black">
      <div className="meta-strip flex flex-wrap gap-x-5 gap-y-2 mb-4">
        <span><b>{issueNo}</b></span>
        <span>SERIES: <b>{series}</b></span>
        <span>STATUS: <b>{status}</b></span>
        <span>CONFIDENCE: <b>{confidence}</b></span>
        <span>IMPORTANCE: <b>{importance}/10</b></span>
        <span>READ: <b>{readMinutes} MIN</b></span>
        <span>CREATED: <b>{date}</b></span>
        {modified ? <span>MODIFIED: <b>{modified}</b></span> : null}
      </div>
      <h1 className="font-display leading-[0.92] tracking-wide text-[clamp(2.6rem,7vw,5.6rem)]">
        {title}
      </h1>
      <p className="mt-3 font-serif italic text-xl text-[#3d362a] max-w-3xl">
        {subtitle}
      </p>
    </header>
  );
}

/* ---------- Section divider with comic stamp ---------- */
export function SectionStamp({
  number,
  label,
  accent = "yellow",
}: {
  number: string;
  label: string;
  accent?: "yellow" | "cyan" | "red" | "green";
}) {
  const bg = {
    yellow: "halftone-yellow",
    cyan: "halftone-cyan",
    red: "halftone-red",
    green: "bg-[#14f195]",
  }[accent];
  return (
    <div className="my-10 flex items-center gap-4">
      <div
        className={`ink-border-thick px-3 py-1.5 ${bg} font-display text-xl tracking-widest shadow-comic-sm rotate-[-1deg]`}
      >
        SECTION {number}
      </div>
      <div className="font-mono text-xs uppercase tracking-[0.3em] opacity-60">
        {label}
      </div>
      <div className="flex-1 h-[5px] bg-black ml-2" />
    </div>
  );
}

/* ---------- Figure with caption + numbered ref ---------- */
export function Figure({
  no,
  caption,
  children,
  accent = "yellow",
}: {
  no: number;
  caption: ReactNode;
  children: ReactNode;
  accent?: "yellow" | "cyan" | "red" | "green";
}) {
  const bg = {
    yellow: "halftone-yellow",
    cyan: "halftone-cyan",
    red: "halftone-red",
    green: "bg-[#14f195]",
  }[accent];
  return (
    <figure className="my-10 panel p-0 overflow-hidden">
      <div className={`${bg} p-5 sm:p-6 border-b-[5px] border-black`}>
        {children}
      </div>
      <figcaption className="px-5 py-3 font-mono text-[12px] uppercase tracking-[0.18em] flex gap-3 items-start">
        <span className="font-display text-[#ff2d55] tracking-widest text-base leading-none mt-[2px]">
          FIG {no}.
        </span>
        <span className="opacity-80 normal-case font-serif text-[14px] tracking-normal leading-snug">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}

/* ---------- Inline jargon with hover-to-explain (re-exported) ---------- */
export { Term } from "@/components/ui/Term";
