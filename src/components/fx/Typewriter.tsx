"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "@/lib/fx/useReducedMotion";

/**
 * Types `text` out one character at a time with a blinking caret, the first
 * time it scrolls into view (IntersectionObserver, fires once). `startDelay`
 * lets it wait for a preceding animation (e.g. a headline reveal) to finish.
 *
 * The full string is always rendered underneath with `visibility:hidden`, so
 * the box reserves its final size and the line never reflows as it types. The
 * animating layers are aria-hidden and the real text is exposed via aria-label,
 * so screen readers get the sentence once, clean. Falls back to the full string
 * immediately under prefers-reduced-motion (caret hidden).
 */
export function Typewriter({
  text,
  speed = 32,
  startDelay = 0,
  style,
}: {
  text: string;
  /** Milliseconds per character. */
  speed?: number;
  /** Milliseconds to wait after entering view before typing begins. */
  startDelay?: number;
  style?: CSSProperties;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(reduced ? text.length : 0);
  const [done, setDone] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setCount(text.length);
      setDone(true);
      return;
    }
    setCount(0);
    setDone(false);
    const el = ref.current;
    if (!el) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    let interval: ReturnType<typeof setInterval> | undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        timers.push(
          setTimeout(() => {
            interval = setInterval(() => {
              setCount((c) => {
                if (c >= text.length) {
                  if (interval) clearInterval(interval);
                  setDone(true);
                  return c;
                }
                return c + 1;
              });
            }, speed);
          }, startDelay),
        );
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
      if (interval) clearInterval(interval);
    };
  }, [reduced, text, speed, startDelay]);

  return (
    <span ref={ref} aria-label={text} role="text" style={{ position: "relative", display: "inline-block", ...style }}>
      {/* Reserves the final box so nothing reflows while typing. */}
      <span aria-hidden style={{ visibility: "hidden" }}>{text}</span>
      <span aria-hidden style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0 }}>
        {text.slice(0, count)}
        {!reduced && !done && (
          <span
            aria-hidden
            style={{
              // empty inline span; its right border draws a caret at line height
              borderRight: "0.08em solid currentColor",
              marginLeft: "0.04em",
              animation: "tw-blink 1s step-end infinite",
            }}
          />
        )}
      </span>
      <style>{`@keyframes tw-blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </span>
  );
}
