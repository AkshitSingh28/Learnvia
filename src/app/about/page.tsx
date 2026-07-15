import Link from "next/link";
import { inter, L, CARD_TONES, btnPrimary, publicCss } from "@/components/public/lightTheme";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Reveal } from "@/components/fx/Reveal";

export const metadata = { title: "About · Learnvia" };

/** /about — 2026-07 light redesign: white editorial page, one blue accent. */

const PILLARS: [string, string, string][] = [
  ["ti-book-2", "Learn foundations", "Essential AI and digital skills, step by step — built for absolute beginners."],
  ["ti-hammer", "Build and create", "Practical tracks, real projects, and a portfolio your mentors verify."],
  ["ti-rocket", "Apply and grow", "Reach real opportunities through 20+ portals when you're ready."],
];

const AUDIENCES: [string, string, string, string][] = [
  ["ti-school", "For students", "A guided journey from first lesson to first application — free, with badges, certificates, and a tracker.", "/for-students"],
  ["ti-chalkboard", "For trainers", "Copy-paste AI recipes and instant classroom tools, built for Indian classrooms.", "/for-trainers"],
];

export default function AboutPage() {
  return (
    <div className={`${inter.className} pl-root`} style={{ background: L.bg, color: L.text, minHeight: "100vh" }}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.7.0/dist/tabler-icons.min.css" />
      <style>{`
        ${publicCss}
        .about-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .about-grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        @media(max-width:760px){.about-grid3,.about-grid2{grid-template-columns:1fr}}
      `}</style>
      <PublicNav />

      <div style={{ background: L.heroWash, borderBottom: `1px solid ${L.line}` }}>
      <section style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px 48px", textAlign: "center" }}>
        <span style={{ display: "inline-block", fontSize: 13, fontWeight: 600, color: L.blue, background: "#fff", border: `1px solid ${L.blueMid}`, padding: "6px 16px", borderRadius: 999 }}>
          Built with NGOs · Free to use
        </span>
        <h1 style={{ fontSize: "clamp(30px,4.5vw,44px)", fontWeight: 500, letterSpacing: "-0.02em", margin: "20px 0 0" }}>
          About Learnvia
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: L.muted, margin: "16px auto 0", maxWidth: 600 }}>
          Learnvia helps students build real skills, create proof of work, and access meaningful
          opportunities to shape their future — guided by mentors and NGOs. And it gives the
          trainers who teach them ready-to-use AI tools for the classroom.
        </p>
      </section>
      </div>

      <section style={{ background: L.wash, borderBottom: `1px solid ${L.line}` }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "48px 24px 52px" }}>
        <div className="about-grid3">
          {PILLARS.map(([icon, t, d], i) => (
            <Reveal key={t} delay={i * 100}>
              <div className="pl-card" style={{ background: L.bg, border: `1px solid ${L.line}`, borderRadius: L.radiusCard, padding: "22px 22px 20px", height: "100%" }}>
                <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 10, background: CARD_TONES[i % CARD_TONES.length].bg, color: CARD_TONES[i % CARD_TONES.length].fg, fontSize: 20 }}>
                  <i className={`ti ${icon}`} aria-hidden="true" />
                </span>
                <h2 style={{ fontWeight: 500, fontSize: 16, margin: "14px 0 6px" }}>{t}</h2>
                <p style={{ color: L.muted, margin: 0, fontSize: 14, lineHeight: 1.6 }}>{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      <section style={{ maxWidth: 1140, margin: "0 auto", padding: "44px 24px 8px" }}>
        <div className="about-grid2">
          {AUDIENCES.map(([icon, t, d, href], i) => (
            <Reveal key={t} delay={i * 100}>
              <div className="pl-card" style={{ background: L.tint, border: `1px solid ${L.line}`, borderRadius: L.radiusCard, padding: "22px 22px 20px", height: "100%", display: "flex", flexDirection: "column" }}>
                <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 10, background: "#fff", color: L.blue, fontSize: 20 }}>
                  <i className={`ti ${icon}`} aria-hidden="true" />
                </span>
                <h2 style={{ fontWeight: 500, fontSize: 16, margin: "14px 0 6px" }}>{t}</h2>
                <p style={{ color: L.muted, margin: "0 0 14px", fontSize: 14, lineHeight: 1.6, flex: 1 }}>{d}</p>
                <Link href={href} className="pl-link" style={{ fontSize: 14 }}>
                  Learn more <i className="ti ti-arrow-right" aria-hidden="true" style={{ verticalAlign: "-2px" }} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ textAlign: "center", padding: "48px 24px 72px" }}>
        <Reveal>
          <Link href="/signup" className="pl-btn-p" style={btnPrimary}>Join for free</Link>
        </Reveal>
      </section>

      <PublicFooter />
    </div>
  );
}
