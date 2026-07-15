"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/fx/useReducedMotion";

/**
 * Thin gradient bar fixed to the top of the viewport that fills with overall
 * scroll progress — a quiet "you're moving through a story" cue. Writes a
 * transform through one rAF tick per scroll burst; renders nothing at all
 * under prefers-reduced-motion.
 */
export function ScrollProgress({ gradient }: { gradient: string }) {
  const reduced = useReducedMotion();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const el = barRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      el.style.transform = `scaleX(${p})`;
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

  if (reduced) return null;
  return (
    <div aria-hidden style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 60, pointerEvents: "none" }}>
      <div
        ref={barRef}
        style={{ height: "100%", width: "100%", background: gradient, transform: "scaleX(0)", transformOrigin: "left", willChange: "transform" }}
      />
    </div>
  );
}
