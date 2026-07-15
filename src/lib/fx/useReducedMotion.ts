"use client";

import { useEffect, useState } from "react";

/**
 * True when the user has asked the OS to minimise motion.
 * All Growvia UI animations bail out when this is set, so the static
 * SEO site stays calm + accessible (WCAG 2.3.3).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}
