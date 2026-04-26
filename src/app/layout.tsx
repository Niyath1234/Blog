import type { Metadata } from "next";
import {
  Bangers,
  Inter,
  JetBrains_Mono,
  Crimson_Pro,
} from "next/font/google";
import "./globals.css";

const bangers = Bangers({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const serif = Crimson_Pro({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Multiverse of Intelligence · Issue #001",
  description:
    "A graphic-novel-style research blog. Issue #001: Ghost in the Kernel, the agent-native OS.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bangers.variable} ${inter.variable} ${mono.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-hidden">{children}</body>
    </html>
  );
}
