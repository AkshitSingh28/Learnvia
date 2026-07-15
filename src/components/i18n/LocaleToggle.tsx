"use client";

/**
 * EN/HI language toggle. Two variants:
 *  - "light" (default) for the white public chrome
 *  - "dark" for the dark dashboard sidebar/header
 * Purely presentational; the active language is read from LocaleProvider.
 */
import { useLocale } from "@/lib/i18n/LocaleProvider";
import type { Locale } from "@/lib/i18n/dict";

export function LocaleToggle({ variant = "light" }: { variant?: "light" | "dark" }) {
  const { locale, setLocale } = useLocale();
  const dark = variant === "dark";

  const track = dark ? "rgba(255,255,255,.08)" : "#EEF2F7";
  const border = dark ? "rgba(255,255,255,.14)" : "#E4E8ED";
  const activeBg = dark ? "rgba(255,255,255,.16)" : "#FFFFFF";
  const activeFg = dark ? "#FFFFFF" : "#1A1F26";
  const idleFg = dark ? "rgba(255,255,255,.55)" : "#8A93A0";

  const opts: { code: Locale; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "hi", label: "हिं" },
  ];

  return (
    <div
      role="group"
      aria-label="Language"
      style={{ display: "inline-flex", alignItems: "center", gap: 2, padding: 2, borderRadius: 999, background: track, border: `1px solid ${border}` }}
    >
      {opts.map((o) => {
        const active = locale === o.code;
        return (
          <button
            key={o.code}
            type="button"
            onClick={() => setLocale(o.code)}
            aria-pressed={active}
            style={{
              cursor: "pointer",
              border: "none",
              borderRadius: 999,
              padding: "4px 10px",
              fontSize: 12.5,
              fontWeight: 600,
              fontFamily: "inherit",
              lineHeight: 1.2,
              background: active ? activeBg : "transparent",
              color: active ? activeFg : idleFg,
              boxShadow: active && !dark ? "0 1px 2px rgba(15,23,42,.08)" : "none",
              transition: "background .15s ease, color .15s ease",
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
