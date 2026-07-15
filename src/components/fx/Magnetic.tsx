"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/fx/useReducedMotion";

/**
 * Wrapper that gently pulls its child toward the pointer when hovered nearby —
 * the classic "magnetic button" feel. Clicks pass straight through to the child,
 * so it composes over the existing auth buttons without touching their handlers.
 */
export function Magnetic({
  children,
  strength = 0.35,
  block = true,
}: {
  children: ReactNode;
  strength?: number;
  block?: boolean;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  function onMove(e: React.PointerEvent<HTMLSpanElement>) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  }

  function reset() {
    const el = ref.current;
    if (el) el.style.transform = "translate(0,0)";
  }

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{
        display: block ? "block" : "inline-block",
        transition: "transform .25s cubic-bezier(.2,.7,.2,1)",
        willChange: "transform",
      }}
    >
      {children}
    </span>
  );
}
