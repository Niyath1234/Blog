"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

type Accent = "yellow" | "cyan" | "red" | "green" | "paper";

const ACCENT_BG: Record<Accent, string> = {
  yellow: "halftone-yellow",
  cyan: "halftone-cyan",
  red: "halftone-red",
  green: "bg-[#14f195]",
  paper: "panel-cream",
};

interface PanelProps extends Omit<HTMLMotionProps<"div">, "children"> {
  accent?: Accent;
  tilt?: number;
  children: ReactNode;
  className?: string;
  /** Sticker text in upper-left corner, e.g. "ISSUE #001" */
  tag?: string;
  /** Sound effect floating in corner, e.g. "BOOM!" */
  sfx?: string;
  /** Gutter / no inner padding */
  bare?: boolean;
}

/**
 * The atomic comic-book panel: thick black border, hard offset
 * shadow, optional halftone background, optional sticker tag
 * and onomatopoeia SFX.
 */
export function Panel({
  accent = "paper",
  tilt = 0,
  tag,
  sfx,
  bare,
  className = "",
  children,
  ...rest
}: PanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: tilt - 2, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 18,
        mass: 0.6,
      }}
      className={`panel relative ${ACCENT_BG[accent]} ${
        bare ? "" : "p-5 sm:p-6"
      } ${className}`}
      {...rest}
    >
      {tag ? (
        <div className="absolute -top-3 -left-3 sticker z-10">{tag}</div>
      ) : null}
      {sfx ? (
        <div className="absolute -top-4 -right-4 sticker bg-[#ff2d55] text-white z-10">
          {sfx}
        </div>
      ) : null}
      {children}
    </motion.div>
  );
}
