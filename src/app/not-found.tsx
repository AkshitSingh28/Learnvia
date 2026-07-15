import Link from "next/link";
import { inter, L, btnPrimary } from "@/components/public/lightTheme";
import { PublicBrand } from "@/components/public/PublicBrand";

/** 404 — 2026-07 light redesign: matches the public white/blue system. */
export default function NotFound() {
  return (
    <div className={inter.className} style={{ minHeight: "100vh", background: L.wash, color: L.text, display: "grid", placeItems: "center", padding: "40px 24px", textAlign: "center" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <PublicBrand size={18} />
        </div>
        <h1 style={{ fontSize: 44, fontWeight: 700, margin: "28px 0 0", letterSpacing: "-0.02em" }}>404</h1>
        <p style={{ marginTop: 8, color: L.muted, fontSize: 16 }}>This page doesn&apos;t exist.</p>
        <div style={{ marginTop: 24 }}>
          <Link href="/" style={btnPrimary}>Back home</Link>
        </div>
      </div>
    </div>
  );
}
