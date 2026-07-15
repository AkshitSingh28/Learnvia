"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/fx/useReducedMotion";

/**
 * Staggered hero headline: each word rises out of its own clipping box, one
 * after another, the first time the component mounts. Lines marked `grad`
 * take the caller's gradient-text class per word (background-clip survives
 * the per-word spans). Fully static under prefers-reduced-motion.
 */
export function HeadlineReveal({
  lines,
  gradClass,
  stagger = 70,
}: {
  lines: { text: string; grad?: boolean }[];
  gradClass?: string;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  const [on, setOn] = useState(false);

  useEffect(() => {
    // double-rAF so the initial (hidden) frame paints before transitioning in
    let r2 = 0;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setOn(true));
    });
    return () => {
      cancelAnimationFrame(r1);
      if (r2) cancelAnimationFrame(r2);
    };
  }, []);

  const shown = reduced || on;
  let w = 0;

  return (
    <>
      {lines.map((l, li) => (
        <span key={li} style={{ display: "block" }}>
          {l.text.split(" ").map((word, wi, arr) => {
            const d = w++ * stagger;
            return (
              <span key={wi} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
                <span
                  className={l.grad ? gradClass : undefined}
                  style={{
                    display: "inline-block",
                    transform: shown ? "none" : "translateY(112%)",
                    transition: reduced ? undefined : `transform .7s cubic-bezier(.2,.7,.2,1) ${d}ms`,
                    willChange: "transform",
                  }}
                >
                  {word}
                  {wi < arr.length - 1 ? " " : ""}
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </>
  );
}
