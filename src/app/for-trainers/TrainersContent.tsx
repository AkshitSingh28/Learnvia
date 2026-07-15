"use client";

import Link from "next/link";
import { inter, L, CARD_TONES, btnPrimary, btnSecondary, publicCss } from "@/components/public/lightTheme";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Reveal } from "@/components/fx/Reveal";
import { CountUp } from "@/components/fx/CountUp";
import { trainerModules, trainerTools } from "@/lib/seed/trainers";
import { useLocale } from "@/lib/i18n/LocaleProvider";

/**
 * /for-trainers body — client component so the marketing copy follows the EN/HI
 * toggle. Metadata stays in the server `page.tsx` wrapper. Seed-driven text
 * (trainer module titles/subtitles, tool titles/subtitles) is intentionally
 * left English — out of scope for the surface i18n pass.
 */

const VALUE = [{ icon: "ti-clock", key: "value1" }, { icon: "ti-map-pin", key: "value2" }, { icon: "ti-device-mobile", key: "value3" }] as const;

const STEPS = [{ n: "1", key: "move1" }, { n: "2", key: "move2" }, { n: "3", key: "move3" }] as const;

/** Real course thumbnails, keyed by trainer module order. Others fall back to the tinted icon block. */
const TRAINER_MODULE_THUMBS: Record<number, string> = {
  1: "/photos/course-trainer-lesson-architect-v2.png",
  2: "/photos/course-trainer-assessment-engine-v2.png",
  3: "/photos/course-trainer-concept-crusher-v2.png",
};

export function TrainersContent() {
  const { t } = useLocale();
  return (
    <div className={`${inter.className} pl-root`} style={{ background: L.bg, color: L.text, minHeight: "100vh" }}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.7.0/dist/tabler-icons.min.css" />
      <style>{`
        ${publicCss}
        .ft-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .ft-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
        .ft-hero{display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:center}
        @media(max-width:900px){.ft-grid4{grid-template-columns:1fr 1fr}.ft-hero{grid-template-columns:1fr}}
        @media(max-width:720px){.ft-grid3{grid-template-columns:1fr}}
      `}</style>

      <PublicNav />

      {/* ── Hero — tinted band ── */}
      <div style={{ background: L.heroWash }}>
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 24px 48px" }}>
        <div className="ft-hero">
          <div>
            <span style={{ display: "inline-block", fontSize: 13, fontWeight: 600, color: L.blue, background: "#fff", border: `1px solid ${L.blueMid}`, padding: "6px 16px", borderRadius: 999 }}>
              {t("ft.badge")}
            </span>
            <h1 style={{ fontSize: "clamp(32px,4.5vw,46px)", lineHeight: 1.12, fontWeight: 500, letterSpacing: "-0.02em", margin: "20px 0 0" }}>
              {t("ft.h1")}
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: L.muted, maxWidth: 480, margin: "16px 0 0" }}>
              {t("ft.sub")}
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
              <Link href="/signup" className="pl-btn-p" style={btnPrimary}>{t("nav.join")}</Link>
              <Link href="#toolkit" className="pl-btn-s" style={btnSecondary}>{t("ft.seeToolkit")}</Link>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/photos/for-trainers-hero.png"
            alt="A trainer leading a classroom session, empowering learners and strengthening communities."
            style={{ width: "100%", height: "auto", borderRadius: L.radiusCard, display: "block" }}
          />
        </div>
      </section>
      </div>

      {/* ── Value props — grey band ── */}
      <section style={{ background: L.wash, borderBottom: `1px solid ${L.line}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px 52px" }}>
        <div className="ft-grid3">
          {VALUE.map((v, i) => (
            <Reveal key={v.key} delay={i * 100}>
              <div style={{ borderTop: `2px solid ${L.blue}`, paddingTop: 18, height: "100%" }}>
                <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 10, background: L.tint, color: L.blue, fontSize: 20 }}>
                  <i className={`ti ${v.icon}`} aria-hidden="true" />
                </span>
                <h3 style={{ fontSize: 16, fontWeight: 500, margin: "12px 0 5px" }}>{t(`ft.${v.key}.title`)}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: L.muted, margin: 0 }}>{t(`ft.${v.key}.desc`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      {/* ── The 3 instant tools ── */}
      <section id="toolkit" style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 24px 8px" }}>
        <Reveal>
          <h2 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>{t("ft.tools.title")}</h2>
          <p style={{ color: L.muted, fontSize: 15, margin: "8px 0 0", maxWidth: 560 }}>
            {t("ft.tools.sub")}
          </p>
        </Reveal>
        <div className="ft-grid3" style={{ marginTop: 22 }}>
          {trainerTools.map((tool, i) => (
            <Reveal key={tool.id} delay={i * 100}>
              <div className="pl-card" style={{ border: `1px solid ${L.line}`, borderRadius: L.radiusCard, padding: "20px 20px 18px", background: L.bg, height: "100%", display: "flex", flexDirection: "column" }}>
                <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 10, background: L.tint, color: L.blue, fontSize: 20 }}>
                  <i className={`ti ${tool.icon}`} aria-hidden="true" />
                </span>
                <h3 style={{ fontSize: 16, fontWeight: 500, margin: "14px 0 2px" }}>{tool.title}</h3>
                <div style={{ fontSize: 13, color: L.blue, marginBottom: 8 }}>{tool.subtitle}</div>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: L.muted, margin: 0, flex: 1 }}>{tool.whatItDoes}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── The 8 teaching modules ── */}
      <section style={{ background: L.wash, borderTop: `1px solid ${L.line}`, borderBottom: `1px solid ${L.line}`, marginTop: 56 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "52px 24px 56px" }}>
          <Reveal>
            <h2 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>
              {t("ft.modules.titleA")}<CountUp value="24" />{t("ft.modules.titleB")}
            </h2>
            <p style={{ color: L.muted, fontSize: 15, margin: "8px 0 0", maxWidth: 620 }}>
              {t("ft.modules.sub")}
            </p>
          </Reveal>
          <div className="ft-grid4" style={{ marginTop: 22 }}>
            {trainerModules.map((m, i) => (
              <Reveal key={m.id} delay={(i % 4) * 80}>
                <div className="pl-card" style={{ border: `1px solid ${L.line}`, borderRadius: L.radiusCard, overflow: "hidden", background: L.bg, height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ height: 96, background: CARD_TONES[i % CARD_TONES.length].bg, display: "flex", alignItems: "center", justifyContent: "center", color: CARD_TONES[i % CARD_TONES.length].fg }}>
                    {TRAINER_MODULE_THUMBS[m.order] ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={TRAINER_MODULE_THUMBS[m.order]} alt={m.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <i className={`ti ${m.icon}`} aria-hidden="true" style={{ fontSize: 26 }} />
                    )}
                  </div>
                  <div style={{ padding: "14px 16px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: 12, color: L.faint }}>{t("common.module")} {m.order}</span>
                    <h3 style={{ fontSize: 15, fontWeight: 500, margin: "6px 0 4px" }}>{m.title}</h3>
                    <p style={{ fontSize: 13, lineHeight: 1.5, color: L.muted, margin: 0, flex: 1 }}>{m.subtitle}</p>
                    <div style={{ marginTop: 12, fontSize: 12, color: L.blueDeep, background: L.tint, alignSelf: "flex-start", padding: "3px 10px", borderRadius: 999 }}>
                      <i className="ti ti-award" aria-hidden="true" style={{ verticalAlign: "-2px" }} /> {m.templates.length} {t("ft.prompts")}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3-move framework ── */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "52px 24px 8px" }}>
        <Reveal>
          <h2 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>{t("ft.framework.title")}</h2>
          <p style={{ color: L.muted, fontSize: 15, margin: "8px 0 0", maxWidth: 560 }}>
            {t("ft.framework.sub")}
          </p>
        </Reveal>
        <div className="ft-grid3" style={{ marginTop: 22 }}>
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div style={{ border: `1px solid ${L.line}`, borderRadius: L.radiusCard, padding: "18px 20px", background: L.bg, height: "100%" }}>
                <div style={{ fontSize: 13, color: L.blue, fontWeight: 500 }}>{t("ft.move")} {s.n}</div>
                <h3 style={{ fontSize: 16, fontWeight: 500, margin: "8px 0 5px" }}>{t(`ft.${s.key}.title`)}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: L.muted, margin: 0 }}>{t(`ft.${s.key}.desc`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Workshop kit band — grey band ── */}
      <section style={{ background: L.wash, borderTop: `1px solid ${L.line}`, borderBottom: `1px solid ${L.line}`, marginTop: 48 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px 52px" }}>
        <Reveal>
          <div className="pl-card" style={{ border: `1px solid ${L.line}`, borderRadius: L.radiusCard, padding: "26px 26px", background: L.bg, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <span style={{ display: "grid", placeItems: "center", width: 52, height: 52, borderRadius: 12, background: L.tint, color: L.blue, fontSize: 26, flexShrink: 0 }}>
              <i className="ti ti-presentation" aria-hidden="true" />
            </span>
            <div style={{ flex: 1, minWidth: 220 }}>
              <h2 style={{ fontSize: 18, fontWeight: 500, margin: 0 }}>{t("ft.workshop.title")}</h2>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: L.muted, margin: "6px 0 0", maxWidth: 560 }}>
                {t("ft.workshop.desc")}
              </p>
            </div>
            <Link href="/signup" className="pl-btn-s" style={btnSecondary}>{t("ft.workshop.cta")}</Link>
          </div>
        </Reveal>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px 64px" }}>
        <Reveal>
          <div style={{ background: L.navy, borderRadius: L.radiusCard, padding: "44px 28px", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 500, color: "#fff", margin: 0 }}>
              {t("ft.cta.title")}
            </h2>
            <p style={{ color: L.onNavyMuted, fontSize: 15, margin: "10px auto 0" }}>
              {t("ft.cta.sub")}
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
