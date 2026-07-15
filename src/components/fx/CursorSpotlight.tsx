"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/fx/useReducedMotion";

/**
 * Full-bleed cursor-reactive backdrop for the auth pages:
 *  - a soft radial "spotlight" that follows the pointer
 *  - three blurred brand orbs that drift with subtle parallax (opposite the pointer)
 *
 * Pointer math runs through a single rAF tick and only mutates transforms /
 * CSS vars (no layout), so it stays cheap. Disabled under prefers-reduced-motion
 * (the orbs still render, just static).
 */
export function CursorSpotlight() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    const orbs = orbsRef.current;
    if (!root) return;

    let raf = 0;
    let tx = 0.5, ty = 0.5, cx = 0.5, cy = 0.5; // target & current (0..1)

    const onMove = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth;
      ty = e.clientY / window.innerHeight;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      root.style.setProperty("--mx", `${cx * 100}%`);
      root.style.setProperty("--my", `${cy * 100}%`);
      if (orbs) {
        const dx = (cx - 0.5) * 2; // -1..1
        const dy = (cy - 0.5) * 2;
        orbs.style.transform = `translate3d(${dx * -26}px, ${dy * -26}px, 0)`;
      }
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
        // spotlight that tracks the cursor (vars default to centre)
        background:
          "radial-gradient(420px circle at var(--mx,50%) var(--my,40%), rgba(91,102,248,.16), transparent 60%)",
      }}
    >
      <div ref={orbsRef} style={{ position: "absolute", inset: "-10%", willChange: "transform" }}>
        <span className="fx-orb" style={{ top: "8%", left: "12%", width: 340, height: 340, background: "#5C66F8", animationDelay: "0s" }} />
        <span className="fx-orb" style={{ top: "55%", left: "70%", width: 300, height: 300, background: "#A3B1FF", animationDelay: "-6s" }} />
        <span className="fx-orb" style={{ top: "70%", left: "18%", width: 220, height: 220, background: "#4B57F6", animationDelay: "-12s" }} />
      </div>
    </div>
  );
}
