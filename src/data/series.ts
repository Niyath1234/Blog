export type SeriesId = "kernel" | "memory" | "vision" | "graphs";

export interface Series {
  id: SeriesId;
  title: string;
  subtitle: string;
  /** Short pitch shown on the panel */
  blurb: string;
  /** Color tokens */
  accent: "yellow" | "cyan" | "red" | "green";
  /** The 3D shape associated with this series */
  shape: "head" | "gear" | "eye" | "web";
  /** Issue counter */
  issue: string;
  /** SFX onomatopoeia tag */
  sfx: string;
}

export const SERIES: Series[] = [
  {
    id: "kernel",
    title: "Ghost in the Kernel",
    subtitle: "Agent-Native OS & Future Hardware",
    blurb:
      "We deleted the user space. The kernel now schedules INFERENCES, not processes. The clock cycle is measured in tokens.",
    accent: "yellow",
    shape: "head",
    issue: "#001",
    sfx: "BOOT!",
  },
  {
    id: "memory",
    title: "The Memory Leak",
    subtitle: "Rust • Compilers • Systems",
    blurb:
      "Where ownership rules are religion and the borrow checker is judge, jury and segfault.",
    accent: "red",
    shape: "gear",
    issue: "#002",
    sfx: "RUSTY!",
  },
  {
    id: "vision",
    title: "Silicon Sight",
    subtitle: "Computer Vision & Image Processing",
    blurb:
      "A 3D eye with bounding boxes for eyelashes. We taught a sphere to see, and now it judges your code.",
    accent: "cyan",
    shape: "eye",
    issue: "#003",
    sfx: "ZOOM!",
  },
  {
    id: "graphs",
    title: "The Context Web",
    subtitle: "Knowledge Graphs & High-Dim Data",
    blurb:
      "Tensors woven into a spider web. Every node is a meaning, every edge a memory.",
    accent: "green",
    shape: "web",
    issue: "#004",
    sfx: "WEAVE!",
  },
];
