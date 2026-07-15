"use client";

import Link from "next/link";
import { inter, L, CARD_TONES, quoteSerif, btnPrimary, btnSecondary, publicCss } from "@/components/public/lightTheme";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Reveal } from "@/components/fx/Reveal";
import { CountUp } from "@/components/fx/CountUp";
import { Typewriter } from "@/components/fx/Typewriter";
import { modules } from "@/lib/seed/data";
import { trainerModules } from "@/lib/seed/trainers";
import { useLocale } from "@/lib/i18n/LocaleProvider";

/**
 * Learnvia home. Public marketing page only; authenticated app styling is kept
 * isolated in the dashboard shell and brand modules. Client component so the
 * static marketing copy follows the EN/HI toggle (module cards stay English —
 * they read from seed data, which is out of scope for the surface i18n pass).
 */

// value + label-key pairs (labels translated at render).
const STATS: [string, string][] = [
  ["8", "home.stats.modules"],
  ["5", "home.stats.tracks"],
  ["20+", "home.stats.portals"],
  ["100%", "home.stats.free"],
];

const PORTALS = ["Internshala", "NCS", "Skill India", "AICTE", "PM Internship", "LinkedIn", "Naukri", "Apna"];

const PATHS = [
  { icon: "ti-school", key: "student", href: "/for-students" },
  { icon: "ti-chalkboard", key: "trainer", href: "/for-trainers" },
] as const;

const COURSE_ICONS: Record<number, string> = { 1: "ti-robot", 2: "ti-pencil", 4: "ti-palette" };

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

/** Trainer course thumbnails, keyed by trainer module order. Others fall back to the tinted icon. */
const TRAINER_MODULE_THUMBS: Record<number, string> = {
  1: "/photos/course-trainer-lesson-architect-v2.png",
  2: "/photos/course-trainer-assessment-engine-v2.png",
  3: "/photos/course-trainer-concept-crusher-v2.png",
};

const TRAINER_PREVIEW = [
  { icon: "ti-urgent", key: "t1" },
  { icon: "ti-books", key: "t2" },
  { icon: "ti-presentation", key: "t3" },
] as const;

export default function Home() {
  const { t } = useLocale();
  const featured = modules.filter((m) => [1, 2, 5].includes(m.order));
  const trainerFeatured = trainerModules.filter((m) => [1, 2, 3].includes(m.order));
  return (
    <div className={`${inter.className} pl-root`} style={{ background: L.bg, color: L.text, minHeight: "100vh" }}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.7.0/dist/tabler-icons.min.css" />
      <style>{`
        ${publicCss}
        .home-grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .home-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .home-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
        .home-story{display:grid;grid-template-columns:180px 1fr;gap:26px;align-items:center}
        .home-banner-link{display:block;text-decoration:none;background:${L.bg}}
        .home-banner{display:block;width:100%;height:auto}
        .hero{background:linear-gradient(180deg,${L.heroWash} 0%,${L.bg} 72%)}
        .hero-inner{max-width:1180px;margin:0 auto;padding:88px 24px 96px;text-align:center}
        .hero-title{margin:0;font-weight:800;line-height:1.02;letter-spacing:-0.035em;font-size:clamp(48px,9vw,104px)}
        .hero-title .w{display:block}
        .hero-sub{margin:26px auto 0;max-width:560px;font-weight:500;line-height:1.4;color:${L.navy};font-size:clamp(18px,2.4vw,24px)}
        .hero-cta{margin-top:34px;padding:15px 34px;font-size:16px}
        @media(max-width:860px){.home-grid3{grid-template-columns:1fr}.home-grid4{grid-template-columns:1fr 1fr}}
        @media(max-width:720px){.home-grid2{grid-template-columns:1fr}.home-story{grid-template-columns:1fr}.hero-inner{padding:64px 20px 72px}}
      `}</style>

      <PublicNav />

      <section className="hero" style={{ borderBottom: `1px solid ${L.line}` }}>
        <div className="hero-inner">
          <h1 className="hero-title">
            <Reveal delay={0}><span className="w" style={{ color: L.navy }}>{t("home.hero.learn")}</span></Reveal>
            <Reveal delay={160}><span className="w" style={{ color: "#2E9E5B" }}>{t("home.hero.grow")}</span></Reveal>
            <Reveal delay={320}><span className="w" style={{ color: "#5B45C9" }}>{t("home.hero.thrive")}</span></Reveal>
          </h1>
          <p className="hero-sub">
            <Typewriter
              text={t("home.hero.sub")}
              speed={30}
              startDelay={1050}
            />
          </p>
          {/* Only this button navigates — the rest of the hero is not clickable. */}
          <Reveal delay={1600}>
            <Link href="/login" className="hero-cta pl-btn-p" style={{ ...btnPrimary, padding: "15px 34px", fontSize: 16, marginTop: 34 }} aria-label="Start your Learnvia journey">
              {t("home.hero.cta")}
            </Link>
          </Reveal>
        </div>
      </section>

      <section style={{ background: L.wash, borderBottom: `1px solid ${L.line}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 24px 60px" }}>
          <Reveal>
            <h2 style={{ fontSize: "clamp(24px,3vw,32px)", fontWeight: 500, letterSpacing: "-0.01em", textAlign: "center", margin: 0 }}>
              {t("home.journeys.title")}
            </h2>
            <p style={{ color: L.muted, textAlign: "center", marginTop: 10, fontSize: 16, maxWidth: 520, marginInline: "auto" }}>
              {t("home.journeys.sub")}
            </p>
          </Reveal>
          <div className="home-grid2" style={{ marginTop: 28 }}>
            {PATHS.map((p, i) => (
              <Reveal key={p.href} delay={i * 120}>
                <div className="pl-card" style={{ background: L.bg, border: `1px solid ${L.line}`, borderRadius: L.radiusCard, padding: "26px 26px 24px", height: "100%", display: "flex", flexDirection: "column" }}>
                  <span style={{ display: "grid", placeItems: "center", width: 44, height: 44, borderRadius: 10, background: L.tint, color: L.blue, fontSize: 22 }}>
                    <i className={`ti ${p.icon}`} aria-hidden="true" />
                  </span>
                  <h3 style={{ fontSize: 19, fontWeight: 500, margin: "16px 0 6px" }}>{t(`home.path.${p.key}.title`)}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: L.muted, margin: 0 }}>{t(`home.path.${p.key}.desc`)}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 20px", display: "flex", flexDirection: "column", gap: 9, flex: 1 }}>
                    {["p1", "p2", "p3"].map((pk) => (
                      <li key={pk} style={{ display: "flex", gap: 9, alignItems: "flex-start", fontSize: 14, color: L.text }}>
                        <i className="ti ti-check" aria-hidden="true" style={{ color: L.blue, marginTop: 2 }} /> {t(`home.path.${p.key}.${pk}`)}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                    <Link href="/signup" className="pl-btn-p" style={{ ...btnPrimary, padding: "10px 20px", fontSize: 14 }}>{t("nav.join")}</Link>
                    <Link href={p.href} className="pl-link" style={{ fontSize: 14 }}>
                      {t("home.learnMore")} <i className="ti ti-arrow-right" aria-hidden="true" style={{ verticalAlign: "-2px" }} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 24px 8px" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <h2 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>{t("home.courses.title")}</h2>
            <Link href="/for-students" className="pl-link" style={{ fontSize: 14 }}>
              {t("home.courses.all")} <i className="ti ti-arrow-right" aria-hidden="true" style={{ verticalAlign: "-2px" }} />
            </Link>
          </div>
        </Reveal>
        <div className="home-grid3" style={{ marginTop: 20 }}>
          {featured.map((m, i) => (
            <Reveal key={m.id} delay={i * 100}>
              <div className="pl-card" style={{ border: `1px solid ${L.line}`, borderRadius: L.radiusCard, overflow: "hidden", background: L.bg, height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ height: 104, background: CARD_TONES[i % CARD_TONES.length].bg, display: "flex", alignItems: "center", justifyContent: "center", color: CARD_TONES[i % CARD_TONES.length].fg }}>
                  {MODULE_THUMBS[m.order] ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={MODULE_THUMBS[m.order]} alt={m.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <i className={`ti ${COURSE_ICONS[m.order] ?? "ti-book-2"}`} aria-hidden="true" style={{ fontSize: 30 }} />
                  )}
                </div>
                <div style={{ padding: "16px 18px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: 12, color: L.faint }}>Module {m.order} | {m.estMinutes} min | Beginner</div>
                  <h3 style={{ fontSize: 16, fontWeight: 500, margin: "6px 0 6px" }}>{m.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: L.muted, margin: 0, flex: 1 }}>{m.subtitle}</p>
                  <div style={{ marginTop: 12, fontSize: 13, color: L.blueDeep, background: L.tint, alignSelf: "flex-start", padding: "4px 12px", borderRadius: 999 }}>
                    <i className="ti ti-award" aria-hidden="true" style={{ verticalAlign: "-2px" }} /> {m.badge}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/*
        Explore your courses for trainers — mirrors the student courses section
        above, in the same light style. Trainer modules carry no thumbnails yet,
        so cards fall back to the module's own tinted icon. When images land, add
        a TRAINER_MODULE_THUMBS map (keyed by m.order) like MODULE_THUMBS above.
      */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 24px 8px" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <h2 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>{t("home.trainerCourses.title")}</h2>
            <Link href="/for-trainers" className="pl-link" style={{ fontSize: 14 }}>
              {t("home.trainerCourses.all")} <i className="ti ti-arrow-right" aria-hidden="true" style={{ verticalAlign: "-2px" }} />
            </Link>
          </div>
        </Reveal>
        <div className="home-grid3" style={{ marginTop: 20 }}>
          {trainerFeatured.map((m, i) => (
            <Reveal key={m.id} delay={i * 100}>
              <div className="pl-card" style={{ border: `1px solid ${L.line}`, borderRadius: L.radiusCard, overflow: "hidden", background: L.bg, height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ height: 104, background: CARD_TONES[i % CARD_TONES.length].bg, display: "flex", alignItems: "center", justifyContent: "center", color: CARD_TONES[i % CARD_TONES.length].fg }}>
                  {TRAINER_MODULE_THUMBS[m.order] ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={TRAINER_MODULE_THUMBS[m.order]} alt={m.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <i className={`ti ${m.icon}`} aria-hidden="true" style={{ fontSize: 30 }} />
                  )}
                </div>
                <div style={{ padding: "16px 18px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: 12, color: L.faint }}>Module {m.order}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 500, margin: "6px 0 6px" }}>{m.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: L.muted, margin: 0, flex: 1 }}>{m.subtitle}</p>
                  <div style={{ marginTop: 12, fontSize: 13, color: L.blueDeep, background: L.tint, alignSelf: "flex-start", padding: "4px 12px", borderRadius: 999 }}>
                    <i className="ti ti-award" aria-hidden="true" style={{ verticalAlign: "-2px" }} /> {m.templates.length} copy-paste prompts
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ background: L.wash, borderTop: `1px solid ${L.line}`, borderBottom: `1px solid ${L.line}`, marginTop: 56 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "52px 24px 60px" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <h2 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>{t("home.trainers.title")}</h2>
              <Link href="/for-trainers" className="pl-link" style={{ fontSize: 14 }}>
                {t("home.trainers.cta")} <i className="ti ti-arrow-right" aria-hidden="true" style={{ verticalAlign: "-2px" }} />
              </Link>
            </div>
          </Reveal>
          <div className="home-grid3" style={{ marginTop: 20 }}>
            {TRAINER_PREVIEW.map((tp, i) => (
              <Reveal key={tp.key} delay={i * 100}>
                <div className="pl-card" style={{ border: `1px solid ${L.line}`, borderRadius: L.radiusCard, padding: "20px 20px 18px", background: L.bg, height: "100%" }}>
                  <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 10, background: L.tint, color: L.blue, fontSize: 20 }}>
                    <i className={`ti ${tp.icon}`} aria-hidden="true" />
                  </span>
                  <h3 style={{ fontSize: 16, fontWeight: 500, margin: "14px 0 5px" }}>{t(`home.trainers.${tp.key}.title`)}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: L.muted, margin: 0 }}>{t(`home.trainers.${tp.key}.desc`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 24px 0" }}>
        <Reveal>
          <div className="home-grid4" style={{ background: L.blue, borderRadius: L.radiusCard, padding: "42px 24px", textAlign: "center" }}>
            {STATS.map(([n, labelKey]) => (
              <div key={labelKey}>
                <div style={{ fontSize: 36, fontWeight: 800, color: "#fff" }}><CountUp value={n} /></div>
                <div style={{ fontSize: 14, color: L.blueMid, marginTop: 4 }}>{t(labelKey)}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section style={{ background: L.wash, borderTop: `1px solid ${L.line}`, borderBottom: `1px solid ${L.line}`, marginTop: 56 }}>
        <div style={{ maxWidth: 980, margin: "0 auto", padding: "52px 24px 56px" }}>
          <Reveal>
            <h2 style={{ fontSize: 22, fontWeight: 500, margin: "0 0 22px" }}>{t("home.story.title")}</h2>
            <div className="home-story">
              <div
                role="img"
                aria-label="Anjali Sharma, a Class 11 student from Jaipur"
                style={{ height: 180, borderRadius: L.radiusCard, backgroundImage: "url(/photos/testimonial-anjali.png)", backgroundRepeat: "no-repeat", backgroundSize: "224%", backgroundPosition: "9% 13%" }}
              />
              <div>
                <p style={{ fontFamily: quoteSerif, fontSize: 20, lineHeight: 1.55, margin: 0, color: L.text }}>
                  {t("home.story.quote")}
                </p>
                <div style={{ fontSize: 14, color: L.muted, marginTop: 12 }}>{t("home.story.person")}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "44px 24px 8px" }}>
        <Reveal>
          <div style={{ fontSize: 13, color: L.faint, marginBottom: 12 }}>{t("home.portals.label")}</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {PORTALS.map((p) => (
              <span key={p} style={{ fontSize: 13, fontWeight: 500, color: L.muted, border: `1px solid ${L.line}`, background: L.bg, padding: "7px 14px", borderRadius: 999 }}>{p}</span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Trainer skill bar — design-reference layout: centered uppercase label + a
          row of big bold brand logos (light-theme take on the uploaded strip). */}
      <section style={{ background: L.wash, borderTop: `1px solid ${L.line}`, borderBottom: `1px solid ${L.line}`, marginTop: 40 }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "48px 24px 52px", textAlign: "center" }}>
          <Reveal>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: L.faint }}>
              {t("home.trainerPortals.label")}
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "20px 44px", marginTop: 26 }}>
              {PORTALS.map((p) => (
                <span key={p} style={{ fontSize: "clamp(18px,2.4vw,26px)", fontWeight: 800, letterSpacing: "-0.01em", color: L.muted, whiteSpace: "nowrap" }}>{p}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 24px 64px" }}>
        <Reveal>
          <div style={{ background: L.navy, borderRadius: L.radiusCard, padding: "48px 28px", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(24px,3vw,32px)", fontWeight: 500, letterSpacing: "-0.01em", color: "#fff", margin: 0 }}>
              {t("home.cta.title")}
            </h2>
            <p style={{ color: L.onNavyMuted, fontSize: 16, margin: "12px auto 0", maxWidth: 440 }}>
              {t("home.cta.sub")}
            </p>
            <div style={{ marginTop: 24 }}>
              <Link href="/signup" style={{ ...btnSecondary, border: "none", background: "#fff", color: L.blue }}>{t("nav.join")}</Link>
            </div>
          </div>
        </Reveal>
      </section>

      <PublicFooter />
    </div>
  );
}
