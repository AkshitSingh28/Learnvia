"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "@/lib/fx/useReducedMotion";

/**
 * Infinite horizontal marquee: content is duplicated once and the pair slides
 * -50% on a linear loop, so the seam is invisible. Pauses on hover. Under
 * prefers-reduced-motion it degrades to a static, wrapped row (no duplicate).
 */
export function Marquee({
  children,
  duration = 28,
  fadeColor,
}: {
  children: ReactNode;
  /** seconds per loop */ duration?: number;
  /** canvas color for the edge fade masks */ fadeColor?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 28, justifyContent: "center", alignItems: "center" }}>
        {children}
      </div>
    );
  }

  const fade = fadeColor
    ? { WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)", maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }
    : undefined;

  return (
    <div className="fx-marquee" style={{ overflow: "hidden", ...fade }}>
      <style>{`
        .fx-marquee-track{display:flex;width:max-content;gap:44px;padding-right:44px;animation:fx-marquee ${duration}s linear infinite}
        .fx-marquee:hover .fx-marquee-track{animation-play-state:paused}
        @keyframes fx-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
      `}</style>
      <div className="fx-marquee-track">
        <div style={{ display: "flex", gap: 44, alignItems: "center" }}>{children}</div>
        <div style={{ display: "flex", gap: 44, alignItems: "center" }} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
