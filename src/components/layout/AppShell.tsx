"use client";

/**
 * Authenticated area shell — dark sidebar + polished top header (Nexora-inspired),
 * light content canvas, Plus Jakarta Sans. The top bar holds search + notifications +
 * the account menu; the sidebar holds brand + nav + the student readiness widget.
 * Also acts as the route guard. Collapses to a slide-over drawer on mobile.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth, homeForRole } from "@/lib/auth/AuthProvider";
import { useStudent } from "@/lib/data/DataProvider";
import { navForRole, secondaryNavForRole, type NavItem } from "@/lib/nav";
import { jakarta, BRAND, DARK } from "@/lib/brand";
import type { Role } from "@/lib/types";
import { GrowviaBrand } from "@/components/brand/GrowviaBrand";
import { Avatar } from "@/components/ui";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { LocaleToggle } from "@/components/i18n/LocaleToggle";

const HOMES = ["/app", "/staff", "/admin"];

// Dev-only preview bypass — renders the shell with a mock user when
// NEXT_PUBLIC_PREVIEW_DASHBOARD=1 in development. PRODUCTION-INERT: the
// NODE_ENV check makes PREVIEW always false in `next build`, so a stray env
// flag can never expose the dashboard in production. Role is configurable via
// NEXT_PUBLIC_PREVIEW_ROLE (student | mentor | ngo | admin; default student).
const PREVIEW = process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_PREVIEW_DASHBOARD === "1";
const PREVIEW_ROLE = (process.env.NEXT_PUBLIC_PREVIEW_ROLE as Role) || "student";
const PREVIEW_USER = { uid: "preview", role: PREVIEW_ROLE, displayName: "Preview User", email: "preview@growvia.app" };

function norm(p: string) { return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p; }

export function AppShell({ allow, children }: { allow: Role[]; children: React.ReactNode }) {
  const auth = useAuth();
  const { t } = useLocale();
  const { loading, signOut } = auth;
  const user = PREVIEW ? (auth.user ?? PREVIEW_USER) : auth.user;
  const { readiness } = useStudent();
  const router = useRouter();
  const pathname = norm(usePathname());
  const [open, setOpen] = useState(false);
  const [acctOpen, setAcctOpen] = useState(false);
  const acctRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (PREVIEW) return;
    if (loading) return;
    if (!user) router.replace("/login");
    else if (!allow.includes(user.role)) router.replace(homeForRole(user.role));
  }, [user, loading, allow, router]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (acctRef.current && !acctRef.current.contains(e.target as Node)) setAcctOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  if (!PREVIEW && (loading || !user || !allow.includes(user.role))) {
    return <div className={jakarta.className} style={{ minHeight: "100vh", display: "grid", placeItems: "center", color: BRAND.muted }}>Loading…</div>;
  }
  if (!user) {
    return <div className={jakarta.className} style={{ minHeight: "100vh", display: "grid", placeItems: "center", color: BRAND.muted }}>Loading…</div>;
  }

  const nav = navForRole(user.role);
  const secondary = secondaryNavForRole(user.role);
  const home = homeForRole(user.role);
  const isStudent = user.role === "student";

  const isActive = (href: string) => HOMES.includes(href) ? pathname === href : pathname.startsWith(href);

  const profileHref = isStudent ? "/app/profile" : home;
  const settingsHref = isStudent ? "/app/profile/settings" : user.role === "admin" ? "/admin/settings" : undefined;

  const renderNav = (item: NavItem, onClick?: () => void) => {
    const active = isActive(item.href);
    return (
      <Link key={item.href} href={item.href} onClick={onClick}
        style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 12px", borderRadius: 10, fontSize: 14.5, fontWeight: 500, textDecoration: "none",
          color: active ? DARK.text : DARK.muted, background: active ? DARK.tint : "transparent" }}>
        <i className={`ti ${item.icon}`} style={{ fontSize: 19, color: active ? DARK.soft : DARK.faint }} aria-hidden="true" />
        {t(`nav.${item.label}`)}
      </Link>
    );
  };

  const renderSidebar = (onNav?: () => void) => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "18px 14px", gap: 6 }}>
      <Link href={home} onClick={onNav} style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 8px 16px", textDecoration: "none", color: DARK.text }}>
        <GrowviaBrand tone="dark" wordmarkHeight={30} parts={user.role === "trainer" ? ["Learn", "via"] : undefined} />
      </Link>

      <nav style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {nav.map((n) => renderNav(n, onNav))}
      </nav>

      {isStudent && (
        <div style={{ margin: "14px 2px", padding: 14, borderRadius: 14, background: DARK.surface2, border: `1px solid ${DARK.line}` }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: DARK.muted }}>{t("app.readiness")}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 2 }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: DARK.soft }}>{readiness.score}</span><span style={{ fontSize: 12, color: DARK.muted }}>/100</span>
          </div>
          <div style={{ height: 6, borderRadius: 99, background: DARK.ring, marginTop: 8 }}><div style={{ height: 6, width: `${readiness.score}%`, borderRadius: 99, background: DARK.grad }} /></div>
          <Link href="/app/apply" onClick={onNav} style={{ display: "inline-block", marginTop: 8, fontSize: 12, color: DARK.blue, fontWeight: 600, textDecoration: "none" }}>{t("app.improve")}</Link>
        </div>
      )}

      {secondary.length > 0 && (
        <nav style={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 4 }}>
          {secondary.map((n) => renderNav(n, onNav))}
        </nav>
      )}

      <div style={{ flex: 1 }} />

      <div style={{ borderTop: `1px solid ${DARK.line}`, paddingTop: 12, display: "flex", alignItems: "center", gap: 10 }}>
        <Avatar name={user.displayName} size={30} />
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: DARK.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.displayName}</div>
          <div style={{ fontSize: 11, color: DARK.muted, textTransform: "capitalize" }}>{user.role}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`${jakarta.variable} gv-dash`} style={{ minHeight: "100vh", background: "var(--background)", color: "var(--foreground)", display: "flex" }}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.7.0/dist/tabler-icons.min.css" />

      {/* Desktop sidebar */}
      <aside className="ds-sidebar" style={{ width: 248, flexShrink: 0, background: DARK.bg, color: DARK.text, borderRight: `1px solid ${DARK.line}`, position: "sticky", top: 0, height: "100vh" }}>
        {renderSidebar()}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(13,17,23,.4)" }}>
          <aside onClick={(e) => e.stopPropagation()} style={{ width: 268, height: "100%", background: DARK.bg, color: DARK.text, borderRight: `1px solid ${DARK.line}` }}>{renderSidebar(() => setOpen(false))}</aside>
        </div>
      )}

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        {/* Top header */}
        <header style={{ height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "0 20px",
          background: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)", borderBottom: `1px solid var(--border)`, position: "sticky", top: 0, zIndex: 30 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0, flex: 1 }}>
            <button className="ds-menubtn" onClick={() => setOpen(true)} aria-label="Menu" style={{ display: "none", background: "none", border: "none", fontSize: 22, color: "var(--foreground)", cursor: "pointer" }}><i className="ti ti-menu-2" aria-hidden="true" /></button>
            <div className="ds-search" style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", maxWidth: 420, height: 40, padding: "0 12px", borderRadius: 10, background: "var(--elevated)", border: `1px solid var(--border)` }}>
              <i className="ti ti-search" style={{ fontSize: 17, color: "var(--faint)" }} aria-hidden="true" />
              <input placeholder={t("app.search")} style={{ border: "none", background: "transparent", outline: "none", flex: 1, fontSize: 14, fontFamily: "inherit", color: "var(--foreground)" }} />
              <kbd style={{ fontSize: 11, color: "var(--faint)", background: "var(--card)", border: `1px solid var(--border)`, borderRadius: 4, padding: "1px 6px" }}>⌘K</kbd>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <LocaleToggle variant="dark" />
            {isStudent && (
              <Link href="/app/coach" aria-label="Ask Coach" className="ds-coachbtn" style={{ display: "inline-flex", alignItems: "center", gap: 7, height: 40, padding: "0 14px", borderRadius: 10, background: "var(--accent-2)", color: "#fff", fontSize: 13.5, fontWeight: 600, textDecoration: "none" }}>
                <i className="ti ti-sparkles" style={{ fontSize: 17 }} aria-hidden="true" />
                <span className="ds-coachlabel">{t("app.askCoach")}</span>
              </Link>
            )}
            {isStudent && (
              <Link href="/app/notifications" aria-label="Notifications" style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 10, color: "var(--muted)" }}>
                <i className="ti ti-bell" style={{ fontSize: 20 }} aria-hidden="true" />
              </Link>
            )}
            <div ref={acctRef} style={{ position: "relative" }}>
              <button onClick={() => setAcctOpen((v) => !v)} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: "4px 6px", borderRadius: 10 }}>
                <Avatar name={user.displayName} size={32} />
                <span className="ds-acctname" style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)", maxWidth: 140, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.displayName}</span>
                <i className="ti ti-chevron-down" style={{ fontSize: 16, color: "var(--faint)" }} aria-hidden="true" />
              </button>
              {acctOpen && (
                <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", width: 220, background: "var(--card)", border: `1px solid var(--border)`, borderRadius: 14, boxShadow: "var(--shadow-lift)", padding: 8, zIndex: 50 }}>
                  <div style={{ padding: "8px 10px", borderBottom: `1px solid var(--border)`, marginBottom: 6 }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{user.displayName}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.email}</div>
                  </div>
                  <Link href={profileHref} onClick={() => setAcctOpen(false)} className="ds-menuitem"><i className="ti ti-user" aria-hidden="true" /> {t("app.profile")}</Link>
                  {settingsHref && <Link href={settingsHref} onClick={() => setAcctOpen(false)} className="ds-menuitem"><i className="ti ti-settings" aria-hidden="true" /> {t("app.settings")}</Link>}
                  <button onClick={() => { setAcctOpen(false); signOut().then(() => router.replace("/login")); }} className="ds-menuitem" style={{ width: "100%", background: "none", border: "none", cursor: "pointer", color: "var(--well-red-fg)" }}><i className="ti ti-logout" aria-hidden="true" /> {t("app.signOut")}</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main style={{ flex: 1 }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "28px 28px 56px" }}>{children}</div>
        </main>
      </div>

      <style>{`
        .ds-menuitem{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:9px;font-size:13.5px;font-weight:500;color:var(--foreground);text-decoration:none;text-align:left}
        .ds-menuitem:hover{background:var(--background)}
        .ds-menuitem i{font-size:17px;color:var(--faint)}
        .ds-coachbtn:hover{opacity:.92}
        @media(max-width:1023px){.ds-sidebar{display:none!important}.ds-menubtn{display:block!important}.ds-search{max-width:none!important}.ds-acctname{display:none!important}.ds-coachlabel{display:none!important}}
      `}</style>
    </div>
  );
}
