import { L } from "@/components/public/lightTheme";

/**
 * Public-site wordmark for the 2026-07 light redesign: a flat blue rounded
 * square + "Growvia" at medium weight. No gradients — deliberately distinct
 * from the dashboard's `GrowviaBrand` (which stays untouched for AppShell).
 */
export function PublicBrand({ size = 17, tone = "light" }: { size?: number; tone?: "light" | "navy" }) {
  const mark = Math.round(size * 1.25);
  const onNavy = tone === "navy";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 9, whiteSpace: "nowrap" }}>
      <span
        aria-hidden
        style={{
          width: mark,
          height: mark,
          borderRadius: Math.max(5, Math.round(mark * 0.28)),
          background: onNavy ? "#FFFFFF" : L.blue,
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      <span style={{ fontWeight: 700, fontSize: size, letterSpacing: "-0.01em", lineHeight: 1, color: onNavy ? L.onNavy : L.text }}>
        Learnvia
      </span>
    </span>
  );
}
