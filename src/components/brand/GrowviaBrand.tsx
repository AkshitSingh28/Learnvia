import { BRAND, DARK } from "@/lib/brand";

type GrowviaBrandProps = {
  tone?: "light" | "dark";
  /** Font size (px) of the wordmark. Named for backwards-compat with callers. */
  wordmarkHeight?: number;
  /** @deprecated the icon mark was removed — kept so existing callers don't break. */
  markSize?: number;
  gap?: number;
  priority?: boolean;
  /** Wordmark halves [plain, accented]. Default GrowHub; trainer shell passes ["Learn","via"]. */
  parts?: [string, string];
};

/**
 * Growvia wordmark — brand name only, no icon mark. Rendered as live text so it
 * stays razor-sharp at any size: "Grow" in the ink/paper tone + "via" in FLAT
 * brand blue (gradient dropped 2026-07-07 to match the public site's brand).
 */
export function GrowviaBrand({ tone = "light", wordmarkHeight = 30, parts = ["Grow", "Hub"] }: GrowviaBrandProps) {
  const growColor = tone === "dark" ? DARK.text : BRAND.ink;
  const viaColor = tone === "dark" ? DARK.soft : BRAND.blue;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        fontWeight: 800,
        fontSize: wordmarkHeight,
        letterSpacing: "-0.03em",
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ color: growColor }}>{parts[0]}</span>
      <span style={{ color: viaColor }}>{parts[1]}</span>
    </span>
  );
}
