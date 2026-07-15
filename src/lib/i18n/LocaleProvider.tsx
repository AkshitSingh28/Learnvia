"use client";

/**
 * SURFACE i18n context (EN/HI). Client-only — the site is a static export, so
 * language is switched entirely on the client: the choice lives in localStorage
 * (mirrored nowhere else) and the toggle flips this context.
 *
 * Hydration-safe: first render is always English (matching the statically
 * prerendered HTML); the stored preference is applied in an effect after mount.
 * A brief English flash for returning Hindi users is the accepted trade-off of
 * the static-export approach.
 */
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { DICT, type Locale } from "./dict";

const STORAGE_KEY = "growvia.locale";

interface LocaleCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
  /** Translate a key; falls back to English, then to the key itself. */
  t: (key: string) => string;
}

const Ctx = createContext<LocaleCtx | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "hi" || saved === "en") setLocaleState(saved);
    } catch {
      /* localStorage unavailable — stay on English */
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l;
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => setLocale(locale === "en" ? "hi" : "en"), [locale, setLocale]);

  const t = useCallback(
    (key: string) => DICT[locale][key] ?? DICT.en[key] ?? key,
    [locale],
  );

  return <Ctx.Provider value={{ locale, setLocale, toggle, t }}>{children}</Ctx.Provider>;
}

/**
 * Read the locale context. Returns an English-only no-op fallback if used
 * outside the provider, so a stray consumer never crashes the render.
 */
export function useLocale(): LocaleCtx {
  const ctx = useContext(Ctx);
  if (ctx) return ctx;
  return {
    locale: "en",
    setLocale: () => {},
    toggle: () => {},
    t: (key: string) => DICT.en[key] ?? key,
  };
}
