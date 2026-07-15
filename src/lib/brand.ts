import { Sora, Plus_Jakarta_Sans } from "next/font/google";

/** Growvia's marketing type face — Sora. Sharper geometric terminals and tighter
    spacing read more "engineered"/crisp on dark. Exposed as BOTH `poppins` (legacy
    name — drives the `--font-poppins` CSS var) and `sora`, used across the public
    marketing/auth surface. Full weight range so it can carry headings AND body. */
const growvia = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const poppins = growvia;
export const sora = growvia;

/** Dashboard type face — Plus Jakarta Sans. Rounder, friendlier and highly legible;
    drives the polished authenticated shell (app/staff/admin) via `--font-jakarta`.
    The public marketing/auth pages stay on Sora. */
export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

/* 2026-07-07 same-company pass: indigo→violet retuned to the Growvia blue
   family so the dashboard reads as one brand with the public site. */
export const BRAND = {
  ink: "#0D1117",
  muted: "#5A5D69",
  blue: "#1B74D0",
  violet: "#3E93EC",
  grad: "linear-gradient(100deg,#1B74D0,#3E93EC)",
  tint: "#E4F1FE",
  soft: "#7FC2F2",
  mist: "#EBEBF1",
  line: "#EEF0F4",
  cardSh: "0 10px 30px rgba(13,17,23,.06)",
} as const;

/** Dark MARKETING theme — public pages only. Isolated from the app's light
    system (globals.css / light BRAND), which the logged-in dashboard depends on.
    Color discipline: ONE canvas, ONE elevated surface, ONE hairline. The
    indigo→violet gradient is reserved for primary CTAs, the tagline, and the
    readiness ring — nothing else — so dark stays expensive, not busy. */
/** Dashboard-only dark set (sidebar + onboarding) — retuned 2026-07-07 from
    indigo-violet night to the Growvia deep-navy family, matching the public
    site's navy footer/CTA bands. Public pages no longer import this. */
export const DARK = {
  // surfaces — deep brand navy
  bg: "#0A1A30",          // sidebar — blackish blue (darkened from #042C53 so the sidebar reads near-black with a blue cast)
  bg2: "#063458",         // wash variant
  surface: "#0A3A66",     // the single elevated card tone
  surface2: "#0E4573",    // nested rows / inset inside a card
  // lines & text — crisper for a sharper read
  line: "rgba(255,255,255,.12)",
  line2: "rgba(255,255,255,.18)",
  text: "#F1F5FA",        // primary text
  muted: "#9DC3E8",       // secondary text (matches public onNavyMuted)
  faint: "#6E97BE",       // tertiary / labels
  // accents — blue-led roles
  primary: "#3E93EC",     // primary action on dark (brightened)
  blue: "#5FA9E8",        // secondary / informational (links)
  soft: "#7FC2F2",        // tertiary / soft highlight (decorative)
  success: "#22D3AF",     // positive / success (checks, readiness good)
  violet: "#3E93EC",      // back-compat alias → primary
  grad: "linear-gradient(100deg,#1B74D0,#3E93EC)",
  gradText: "linear-gradient(100deg,#7FB8EA,#B5D4F4)", // brighter for text on dark
  tint: "rgba(55,138,221,.16)",  // chip / icon-well fill (primary tint)
  ring: "rgba(255,255,255,.09)", // progress/ring track on dark
  cardSh: "0 24px 60px rgba(2,20,40,.5)",
  glow: "radial-gradient(500px circle at 85% 8%, rgba(55,138,221,.10), transparent 60%)",
} as const;
