import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { PublicBrand } from "@/components/public/PublicBrand";
import { inter, L } from "@/components/public/lightTheme";

/**
 * Shared LIGHT wrapper for auth pages — 2026-07 redesign. Soft wash canvas,
 * centered white card with a hairline border, one blue primary. No tilt, no
 * spotlight, no gradients (the old dark shell is in `_design_backup_…`).
 */
export function AuthShell({ title, subtitle, children, footer, max = 400 }: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  max?: number;
}) {
  return (
    <div
      className={inter.className}
      style={{ minHeight: "100vh", background: L.wash, color: L.text, display: "grid", placeItems: "center", padding: "40px 20px" }}
    >
      <style>{`
        .pl-auth input{transition:border-color .18s ease, box-shadow .18s ease}
        .pl-auth input::placeholder{color:${L.faint}}
        .pl-auth input:focus{border-color:${L.blue}!important;box-shadow:0 0 0 3px ${L.tint};outline:none}
        .pl-auth button{transition:filter .18s ease, background .18s ease, border-color .18s ease}
        .pl-auth button:not(:disabled):hover{filter:brightness(.96)}
        .pl-auth button:disabled{opacity:.7;cursor:default}
        @media(prefers-reduced-motion:reduce){.pl-auth *{transition-duration:.01ms!important}}
      `}</style>

      <div className="pl-auth" style={{ width: "100%", maxWidth: max }}>
        <Link href="/" style={{ display: "flex", justifyContent: "center", textDecoration: "none", marginBottom: 22 }}>
          <PublicBrand size={19} />
        </Link>
        <div style={{ background: L.bg, border: `1px solid ${L.line}`, borderRadius: L.radiusCard, padding: 28 }}>
          <h1 style={{ fontSize: 21, fontWeight: 700, margin: 0, color: L.text, letterSpacing: "-0.01em" }}>{title}</h1>
          {subtitle && <p style={{ marginTop: 6, fontSize: 14, color: L.muted }}>{subtitle}</p>}
          <div style={{ marginTop: 20 }}>{children}</div>
        </div>
        {footer && <div style={{ textAlign: "center", marginTop: 18, fontSize: 14, color: L.muted }}>{footer}</div>}
      </div>
    </div>
  );
}

export const authField: CSSProperties = {
  width: "100%", borderRadius: L.radius, border: `1px solid ${L.line}`, background: L.bg,
  padding: "11px 13px", fontSize: 15, fontFamily: "inherit", color: L.text, outline: "none",
};

export const authPrimary: CSSProperties = {
  width: "100%", color: "#fff", background: L.blue, padding: "12px 18px", borderRadius: L.radius,
  fontWeight: 600, fontSize: 15, textDecoration: "none", textAlign: "center", border: "none", cursor: "pointer", fontFamily: "inherit",
  display: "inline-block",
};

export const authOutline: CSSProperties = {
  width: "100%", color: L.blue, background: L.bg, border: `1px solid ${L.blueMid}`, padding: "11px 18px",
  borderRadius: L.radius, fontWeight: 600, fontSize: 15, textDecoration: "none", textAlign: "center", cursor: "pointer", fontFamily: "inherit",
  display: "inline-block",
};
