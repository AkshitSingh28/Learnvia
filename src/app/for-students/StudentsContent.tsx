"use client";

import Link from "next/link";
import { inter, L, CARD_TONES, quoteSerif, btnPrimary, btnSecondary, publicCss } from "@/components/public/lightTheme";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Reveal } from "@/components/fx/Reveal";
import { CountUp } from "@/components/fx/CountUp";
import { modules, skillTracks, portals } from "@/lib/seed/data";
import { useLocale } from "@/lib/i18n/LocaleProvider";

/**
 * /for-students body — client component so the marketing copy follows the EN/HI
 * toggle. Metadata stays in the server `page.tsx` wrapper. Seed-driven text
 * (module titles/subtitles/badges, track titles/taglines/summaries, portal
 * names) is intentionally left English — out of scope for the surface i18n pass.
 */

const STEPS = [{ n: "1", key: "step1" }, { n: "2", key: "step2" }, { n: "3", key: "step3" }] as const;

const MODULE_ICONS: Record<number, string> = {
  1: "ti-robot", 2: "ti-pencil", 3: "ti-book-2", 4: "ti-file-text",
  5: "ti-palette", 6: "ti-tools", 7: "ti-copy", 8: "ti-shield-check",
};

/** Real course thumbnails, keyed by module order. Others fall back to the tinted icon block. */
const MODULE_THUMBS: Record<number, string> = {
  1: "/photos/course-ai-basics.png",
  2: "/photos/course-prompt-writing.png",
  3: "/photos/course-ai-study.png",
  4: "/photos/course-content-creation.png",
  5: "/photos/course-ai-design.png",
  6: "/photos/course-tools-lab.png",
  7: "/photos/course-many-outputs.png",
  8: "/photos/course-safe-ai.png",
};

const TRACK_ICONS: Record<string, string> = {
  t1: "ti-briefcase", t2: "ti-palette", t3: "ti-pencil", t4: "ti-headset", t5: "ti-code",
};

const PROOF = [
  { icon: "ti-certificate", key: "p1" },
  { icon: "ti-award", key: "p2" },
  { icon: "ti-folder", key: "p3" },
  { icon: "ti-list-check", key: "p4" },
] as const;

export function StudentsContent() {
  const { t } = useLocale();
  const gate50 = portals.filter((p) => p.minReadiness <= 50);
  const gate70 = portals.filter((p) => p.minReadiness === 70);
  const gate85 = portals.filter((p) => p.minReadiness >= 85);
  const gates: { key: string; items: string[] }[] = [
    { key: "gate1", items: gate50.map((p) => p.name) },
    { key: "gate2", items: gate70.map((p) => p.name) },
    { key: "gate3", items: gate85.map((p) => p.name) },
  ];

  return (
    <div className={`${inter.className} pl-root`} style={{ background: L.bg, color: L.text, minHeight: "100vh" }}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.7.0/dist/tabler-icons.min.css" />
      <style>{`
        ${publicCss}
        .fs-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .fs-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
        .fs-hero{display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:center}
        @media(max-width:900px){.fs-grid4{grid-template-columns:1fr 1fr}.fs-hero{grid-template-columns:1fr}}
        @media(max-width:720px){.fs-grid3{grid-template-columns:1fr}}
      `}</style>

      <PublicNav />

      {/* ── Hero — tinted band ── */}
      <div style={{ background: L.heroWash }}>
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 24px 48px" }}>
        <div className="fs-hero">
          <div>
            <span style={{ display: "inline-block", fontSize: 13, fontWeight: 600, color: L.blue, background: "#fff", border: `1px solid ${L.blueMid}`, padding: "6px 16px", borderRadius: 999 }}>
              {t("fs.badge")}
            </span>
            <h1 style={{ fontSize: "clamp(32px,4.5vw,46px)", lineHeight: 1.12, fontWeight: 500, letterSpacing: "-0.02em", margin: "20px 0 0" }}>
              {t("fs.h1")}
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: L.muted, maxWidth: 480, margin: "16px 0 0" }}>
              {t("fs.sub")}
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
              <Link href="/signup" className="pl-btn-p" style={btnPrimary}>{t("nav.join")}</Link>
              <Link href="#modules" className="pl-btn-s" style={btnSecondary}>{t("fs.seeModules")}</Link>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/photos/for-students-hero.png"
            alt="A student learning at her own pace on her phone, building skills that take her further."
            style={{ width: "100%", height: "auto", borderRadius: L.radiusCard, display: "block" }}
          />
        </div>
      </section>
      </div>

      {/* ── The journey in 3 steps — grey band ── */}
      <section style={{ background: L.wash, borderBottom: `1px solid ${L.line}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px 52px" }}>
        <div className="fs-grid3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div style={{ borderTop: `2px solid ${L.blue}`, paddingTop: 18, height: "100%" }}>
                <div style={{ fontSize: 13, color: L.blue, fontWeight: 500 }}>{t("fs.step")} {s.n}</div>
                <h3 style={{ fontSize: 17, fontWeight: 500, margin: "8px 0 6px" }}>{t(`fs.${s.key}.title`)}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: L.muted, margin: 0 }}>{t(`fs.${s.key}.desc`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      {/* ── All 8 modules ── */}
      <section id="modules" style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 24px 8px" }}>
        <Reveal>
          <h2 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>{t("fs.modules.title")}</h2>
          <p style={{ color: L.muted, fontSize: 15, margin: "8px 0 0", maxWidth: 560 }}>
            {t("fs.modules.sub")}
          </p>
        </Reveal>
        <div className="fs-grid4" style={{ marginTop: 22 }}>
          {modules.map((m, i) => (
            <Reveal key={m.id} delay={(i % 4) * 80}>
              <div className="pl-card" style={{ border: `1px solid ${L.line}`, borderRadius: L.radiusCard, overflow: "hidden", background: L.bg, height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ height: 96, background: CARD_TONES[i % CARD_TONES.length].bg, display: "flex", alignItems: "center", justifyContent: "center", color: CARD_TONES[i % CARD_TONES.length].fg }}>
                  {MODULE_THUMBS[m.order] ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={MODULE_THUMBS[m.order]} alt={m.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <i className={`ti ${MODULE_ICONS[m.order] ?? "ti-book-2"}`} aria-hidden="true" style={{ fontSize: 26 }} />
                  )}
                </div>
                <div style={{ padding: "14px 16px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: 12, color: L.faint }}>{t("common.module")} {m.order}</span>
                  <h3 style={{ fontSize: 15, fontWeight: 500, margin: "6px 0 4px" }}>{m.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.5, color: L.muted, margin: 0, flex: 1 }}>{m.subtitle}</p>
                  <div style={{ marginTop: 12, fontSize: 12, color: L.blueDeep, background: L.tint, alignSelf: "flex-start", padding: "3px 10px", borderRadius: 999 }}>
                    <i className="ti ti-award" aria-hidden="true" style={{ verticalAlign: "-2px" }} /> {m.badge}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 5 skill tracks ── */}
      <section style={{ background: L.wash, borderTop: `1px solid ${L.line}`, borderBottom: `1px solid ${L.line}`, marginTop: 56 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "52px 24px 56px" }}>
          <Reveal>
            <h2 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>{t("fs.tracks.title")}</h2>
            <p style={{ color: L.muted, fontSize: 15, margin: "8px 0 0", maxWidth: 620 }}>
              {t("fs.tracks.sub")}
            </p>
          </Reveal>
          <div className="fs-grid3" style={{ marginTop: 22 }}>
            {skillTracks.map((tr, i) => (
              <Reveal key={tr.id} delay={(i % 3) * 90}>
                <div className="pl-card" style={{ border: `1px solid ${L.line}`, borderRadius: L.radiusCard, padding: "20px 20px 18px", background: L.bg, height: "100%", display: "flex", flexDirection: "column" }}>
                  <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 10, background: L.tint, color: L.blue, fontSize: 20 }}>
                    <i className={`ti ${TRACK_ICONS[tr.id] ?? "ti-route"}`} aria-hidden="true" />
                  </span>
                  <h3 style={{ fontSize: 16, fontWeight: 500, margin: "14px 0 4px" }}>{tr.title}</h3>
                  <div style={{ fontSize: 13, color: L.blue, marginBottom: 8 }}>{tr.tagline}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: L.muted, margin: 0, flex: 1 }}>{tr.summary}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proof you leave with ── */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "52px 24px 8px" }}>
        <Reveal>
          <h2 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>{t("fs.proof.title")}</h2>
        </Reveal>
        <div className="fs-grid4" style={{ marginTop: 20 }}>
          {PROOF.map((p, i) => (
            <Reveal key={p.key} delay={i * 80}>
              <div style={{ height: "100%" }}>
                <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 10, background: L.tint, color: L.blue, fontSize: 20 }}>
                  <i className={`ti ${p.icon}`} aria-hidden="true" />
                </span>
                <h3 style={{ fontSize: 15, fontWeight: 500, margin: "12px 0 4px" }}>{t(`fs.proof.${p.key}.title`)}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.55, color: L.muted, margin: 0 }}>{t(`fs.proof.${p.key}.desc`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Portals, readiness-gated — grey band ── */}
      <section style={{ background: L.wash, borderTop: `1px solid ${L.line}`, borderBottom: `1px solid ${L.line}`, marginTop: 52 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "52px 24px 56px" }}>
        <Reveal>
          <h2 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>
            <CountUp value="20+" />{t("fs.portals.titleSuffix")}
          </h2>
          <p style={{ color: L.muted, fontSize: 15, margin: "8px 0 0", maxWidth: 620 }}>
            {t("fs.portals.sub")}
          </p>
        </Reveal>
        <div className="fs-grid3" style={{ marginTop: 22 }}>
          {gates.map((g, i) => (
            <Reveal key={g.key} delay={i * 100}>
              <div style={{ border: `1px solid ${L.line}`, borderRadius: L.radiusCard, padding: "18px 18px 16px", background: L.bg, height: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <h3 style={{ fontSize: 15, fontWeight: 500, margin: 0 }}>{t(`fs.${g.key}.label`)}</h3>
                  <span style={{ fontSize: 12, color: L.blue }}>{t(`fs.${g.key}.hint`)}</span>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
                  {g.items.map((n) => (
                    <span key={n} style={{ fontSize: 12.5, fontWeight: 500, color: L.muted, border: `1px solid ${L.line}`, padding: "5px 11px", borderRadius: 999 }}>{n}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      {/* ── Story + CTA ── */}
      <section style={{ maxWidth: 880, margin: "0 auto", padding: "52px 24px 8px", textAlign: "center" }}>
        <Reveal>
          <p style={{ fontFamily: quoteSerif, fontSize: 20, lineHeight: 1.55, margin: "0 auto", maxWidth: 560, color: L.text }}>
            {t("fs.quote")}
          </p>
          <div style={{ fontSize: 14, color: L.muted, marginTop: 12 }}>{t("fs.quotePerson")}</div>
        </Reveal>
      </section>

      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px 64px" }}>
        <Reveal>
          <div style={{ background: L.navy, borderRadius: L.radiusCard, padding: "44px 28px", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 500, color: "#fff", margin: 0 }}>
              {t("fs.cta.title")}
            </h2>
            <p style={{ color: L.onNavyMuted, fontSize: 15, margin: "10px auto 0" }}>
              {t("fs.cta.sub")}
            </p>
            <div style={{ marginTop: 22 }}>
              <Link href="/signup" style={{ ...btnSecondary, border: "none", background: "#fff", color: L.blue }}>{t("nav.join")}</Link>
            </div>
          </div>
        </Reveal>
      </section>

      <PublicFooter />
    </div>
  );
}
