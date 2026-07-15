"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/fx/useReducedMotion";

/**
 * Scroll-linked drift: translates its children by `speed` × the element's
 * distance from the viewport center, so layers move at slightly different
 * rates and the page gains depth. Positive speed lags the scroll, negative
 * leads it. Inert under prefers-reduced-motion.
 */
export function Parallax({
  children,
  speed = 0.08,
  style,
}: {
  children: ReactNode;
  speed?: number;
  style?: CSSProperties;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const mid = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateY(${(mid * speed).toFixed(1)}px)`;
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
  }, [reduced, speed]);

  return (
    <div ref={ref} style={{ willChange: "transform", ...style }}>
      {children}
    </div>
  );
}
