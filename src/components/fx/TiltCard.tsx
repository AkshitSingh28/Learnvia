"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/fx/useReducedMotion";

/**
 * Wraps the auth card so it tilts toward the pointer (perspective rotateX/Y)
 * with a moving sheen highlight. Snaps back smoothly on leave. Transform-only,
 * so it's GPU-cheap; no-op under prefers-reduced-motion.
 */
export function TiltCard({
  children,
  max = 7,
  style,
  className,
}: {
  children: ReactNode;
  max?: number;
  style?: CSSProperties;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height;
    const ry = (px - 0.5) * max * 2;
    const rx = -(py - 0.5) * max * 2;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    el.style.setProperty("--sx", `${px * 100}%`);
    el.style.setProperty("--sy", `${py * 100}%`);
  }

  function reset() {
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  }

  return (
    <div
      ref={ref}
      className={className}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{
        position: "relative",
        transition: "transform .35s cubic-bezier(.2,.7,.2,1)",
        transformStyle: "preserve-3d",
        willChange: "transform",
        ...style,
      }}
    >
      {children}
      {!reduced && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            background:
              "radial-gradient(220px circle at var(--sx,50%) var(--sy,0%), rgba(255,255,255,.55), transparent 55%)",
            mixBlendMode: "soft-light",
          }}
        />
      )}
    </div>
  );
}
