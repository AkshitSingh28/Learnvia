"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/fx/useReducedMotion";

/**
 * Counts from 0 → the number inside `value` when it first scrolls into view,
 * preserving any non-numeric prefix/suffix (e.g. "20+", "100%"). Falls back to
 * the final value immediately under prefers-reduced-motion.
 */
export function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  // memoized — a fresh match array every render would re-run the effect and
  // restart the animation on every setN, freezing the count near 0
  const match = useMemo(() => value.match(/^(\D*)(\d+)(.*)$/), [value]);
  const prefix = match?.[1] ?? "";
  const target = match ? parseInt(match[2], 10) : 0;
  const suffix = match?.[3] ?? "";
  const [n, setN] = useState(match && !reduced ? 0 : target);

  useEffect(() => {
    if (reduced || !match) {
      setN(target);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (t: number) => {
          const p = Math.min((t - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
          setN(Math.round(eased * target));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced, target, duration, match]);

  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}
