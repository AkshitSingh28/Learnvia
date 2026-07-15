"use client";

import Link from "next/link";
import { PublicBrand } from "@/components/public/PublicBrand";
import { L } from "@/components/public/lightTheme";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { LocaleToggle } from "@/components/i18n/LocaleToggle";

/**
 * Shared nav for all public pages — 2026-07 light redesign. White sticky bar,
 * hairline bottom border, one blue CTA. (The old dark/theme-aware nav lives in
 * `_design_backup_2026-07-07_public-redesign/`.) `theme` prop kept for
 * back-compat with existing callers; the public site is light-only now.
 * Client component so it can host the EN/HI toggle + translated labels.
 */
export function PublicNav({ theme: _theme }: { theme?: "light" | "dark" } = {}) {
  void _theme;
  const { t } = useLocale();
  const links = [
    { label: t("nav.forStudents"), href: "/for-students" },
    { label: t("nav.forTrainers"), href: "/for-trainers" },
    { label: t("nav.about"), href: "/about" },
  ];
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: "rgba(255,255,255,.92)",
        backdropFilter: "blur(8px)",
        borderBottom: `1px solid ${L.line}`,
      }}
    >
      <style>{`
        .pubnav-link{color:${L.muted};text-decoration:none;transition:color .15s ease}
        .pubnav-link:hover{color:${L.text}}
        .pubnav-cta:hover{background:${L.blueHover}!important}
        @media(max-width:760px){.pubnav-links{display:none!important}}
        @media(max-width:480px){
          .pubnav-bar{height:60px!important;padding:0 16px!important}
          .pubnav-login{display:none!important}
          .pubnav-cta{font-size:13px!important;padding:8px 14px!important}
        }
      `}</style>
      <div
        className="pubnav-bar"
        style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 66, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}
      >
        <Link href="/" aria-label="Learnvia home" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <PublicBrand size={17} />
        </Link>
        <nav className="pubnav-links" style={{ display: "flex", gap: 26, fontSize: 14, fontWeight: 400 }}>
          {links.map((l) => (
            <Link key={l.href} className="pubnav-link" href={l.href}>{l.label}</Link>
          ))}
        </nav>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <LocaleToggle />
          <Link className="pubnav-login" href="/login" style={{ color: L.text, fontWeight: 500, fontSize: 14, textDecoration: "none" }}>
            {t("nav.login")}
          </Link>
          <Link
            className="pubnav-cta"
            href="/signup"
            style={{ color: "#fff", background: L.blue, padding: "9px 18px", borderRadius: L.radius, fontWeight: 600, fontSize: 14, textDecoration: "none", transition: "background .18s ease" }}
          >
            {t("nav.join")}
          </Link>
        </div>
      </div>
    </header>
  );
}
