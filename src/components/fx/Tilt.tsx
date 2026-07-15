"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/fx/useReducedMotion";

/**
 * Subtle pointer-tracking 3D tilt (max ±5°) with a soft lift, springing back
 * on leave. Fine-pointer devices only — touch and prefers-reduced-motion get
 * the plain children with no transform at all.
 */
export function Tilt({ children, max = 5, style }: { children: ReactNode; max?: number; style?: CSSProperties }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    if (!raf.current)
      raf.current = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-4px)`;
        raf.current = 0;
      });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    if (raf.current) {
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    }
    el.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ transition: "transform .45s cubic-bezier(.2,.7,.2,1)", willChange: "transform", ...style }}
    >
      {children}
    </div>
  );
}
