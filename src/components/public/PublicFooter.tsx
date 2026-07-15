"use client";

import Link from "next/link";
import { PublicBrand } from "@/components/public/PublicBrand";
import { L } from "@/components/public/lightTheme";
import { useLocale } from "@/lib/i18n/LocaleProvider";

/**
 * Shared footer for all public pages — deep navy anchor band (life-global-style
 * closure). `theme` prop kept for back-compat with existing callers. Client
 * component so labels follow the EN/HI toggle.
 */
export function PublicFooter({ theme: _theme }: { theme?: "light" | "dark" } = {}) {
  void _theme;
  const { t } = useLocale();
  const link = { color: L.onNavyMuted, textDecoration: "none", fontSize: 14 } as const;
  const cols: { head: string; items: { label: string; href: string }[] }[] = [
    {
      head: t("footer.explore"),
      items: [
        { label: t("nav.forStudents"), href: "/for-students" },
        { label: t("nav.forTrainers"), href: "/for-trainers" },
        { label: t("nav.about"), href: "/about" },
      ],
    },
    {
      head: t("footer.getStarted"),
      items: [
        { label: t("nav.join"), href: "/signup" },
        { label: t("nav.login"), href: "/login" },
        { label: t("footer.joinInvite"), href: "/join" },
      ],
    },
    {
      head: t("footer.legal"),
      items: [
        { label: t("footer.privacy"), href: "/privacy" },
        { label: t("footer.terms"), href: "/terms" },
      ],
    },
  ];
  return (
    <footer style={{ background: L.navy }}>
      <style>{`
        .pubfoot-link:hover{color:${L.onNavy}!important}
        @media(max-width:640px){.pubfoot-grid{grid-template-columns:1fr!important;gap:28px!important}}
      `}</style>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px 28px" }}>
        <div className="pubfoot-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 24, alignItems: "start" }}>
          <div>
            <PublicBrand size={16} tone="navy" />
            <p style={{ color: L.onNavyMuted, fontSize: 14, lineHeight: 1.6, margin: "12px 0 0", maxWidth: 260 }}>
              {t("footer.tagline")}
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.head}>
              <div style={{ fontSize: 13, fontWeight: 700, color: L.onNavy, marginBottom: 12 }}>{c.head}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {c.items.map((i) => (
                  <Link key={i.href} className="pubfoot-link" href={i.href} style={link}>{i.label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${L.navyLine}`, marginTop: 32, paddingTop: 18, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span style={{ fontSize: 13, color: L.onNavyMuted }}>{t("footer.copyright")}</span>
          <span style={{ fontSize: 13, color: L.onNavyMuted }}>{t("footer.builtWith")}</span>
        </div>
      </div>
    </footer>
  );
}
