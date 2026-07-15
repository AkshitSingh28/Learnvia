"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/fx/useReducedMotion";

/**
 * The journey spine: a vertical track that DRAWS itself as the user scrolls
 * through its parent section (scroll-linked scaleY on the gradient fill).
 * Mount it inside a position:relative container — it measures that parent on
 * every scroll tick. Renders fully drawn under prefers-reduced-motion.
 */
export function SpineProgress({ track, fill }: { track: string; fill: string }) {
  const reduced = useReducedMotion();
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) {
      if (fillRef.current) fillRef.current.style.transform = "scaleY(1)";
      return;
    }
    const el = fillRef.current;
    const parent = el?.parentElement?.parentElement; // fill → spine wrapper → section
    if (!el || !parent) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = parent.getBoundingClientRect();
      // progress: 0 when the section top reaches 75% of the viewport,
      // 1 when its bottom passes 60% — the line finishes just before you do.
      const start = window.innerHeight * 0.75;
      const p = Math.min(Math.max((start - r.top) / (r.height - window.innerHeight * 0.15), 0), 1);
      el.style.transform = `scaleY(${p.toFixed(4)})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: "50%",
        width: 2,
        marginLeft: -1,
        background: track,
        borderRadius: 999,
      }}
    >
      <div
        ref={fillRef}
        style={{
          position: "absolute",
          inset: 0,
          background: fill,
          borderRadius: 999,
          transform: "scaleY(0)",
          transformOrigin: "top",
          willChange: "transform",
        }}
      />
    </div>
  );
}
