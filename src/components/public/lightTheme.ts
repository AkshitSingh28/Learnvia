import { Inter } from "next/font/google";

/**
 * Growvia public LIGHT theme for public/no-auth pages only.
 *
 * Deliberately isolated from `lib/brand.ts`, whose dark/dashboard palette still
 * powers the logged-in student, trainer, staff, and admin shells.
 *
 * Type: Inter is the closest available web-font match for the supplied
 * reference screenshot's clean product sans. Serif reserved for pull-quotes.
 */
const publicSans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-public",
  display: "swap",
});

/** Export kept under the historical name so page imports stay stable. */
export const inter = publicSans;

export const L = {
  // surfaces
  bg: "#FFFFFF",
  wash: "#F6F9FC",
  heroWash: "#EAF2FF",
  tint: "#EAF2FF",
  // approved public blue, sampled from the supplied swatch
  blue: "#024AD8",
  blueHover: "#003DB4",
  blueMid: "#8DB4FF",
  blueDeep: "#012F8A",
  navy: "#031E4A",
  navyLine: "rgba(255,255,255,.14)",
  onNavy: "#FFFFFF",
  onNavyMuted: "#B6CEFF",
  // warm accent, used sparingly for trainer highlights
  warm: "#D85A30",
  warmTint: "#FAECE7",
  warmDeep: "#712B13",
  // supporting card tints
  tealTint: "#E1F5EE",
  teal: "#0F6E56",
  amberTint: "#FAEEDA",
  amber: "#854F0B",
  // text
  text: "#1A1F26",
  muted: "#5B6572",
  faint: "#8A93A0",
  // lines
  line: "#E4E8ED",
  // semantic forms
  danger: "#A32D2D",
  // shape
  radius: 8,
  radiusCard: 12,
} as const;

/** Rotating tint/ink pairs for card headers and icon wells. */
export const CARD_TONES = [
  { bg: L.tint, fg: L.blue },
  { bg: L.tealTint, fg: L.teal },
  { bg: L.amberTint, fg: L.amber },
  { bg: "#EEEAFB", fg: "#5B45C9" },
] as const;

/** Serif stack for testimonial pull-quotes only. */
export const quoteSerif = "Georgia, 'Times New Roman', serif";

/** Primary button: solid approved blue, white text. */
export const btnPrimary = {
  display: "inline-block",
  color: "#fff",
  background: L.blue,
  padding: "12px 26px",
  borderRadius: L.radius,
  fontWeight: 600,
  fontSize: 15,
  textDecoration: "none",
  border: "none",
  cursor: "pointer",
  fontFamily: "inherit",
  textAlign: "center" as const,
  transition: "background .18s ease",
} as const;

/** Secondary button: white, blue hairline border, blue text. */
export const btnSecondary = {
  display: "inline-block",
  color: L.blue,
  background: "#fff",
  padding: "11px 24px",
  borderRadius: L.radius,
  fontWeight: 600,
  fontSize: 15,
  textDecoration: "none",
  border: `1px solid ${L.blueMid}`,
  cursor: "pointer",
  fontFamily: "inherit",
  textAlign: "center" as const,
  transition: "border-color .18s ease, background .18s ease",
} as const;

/** Shared scoped CSS: button hovers and card hover-lift. Rendered once per page. */
export const publicCss = `
  .pl-root{font-weight:400}
  .pl-root h1{font-weight:700!important;letter-spacing:-0.02em}
  .pl-root h2{font-weight:700!important;letter-spacing:-0.01em}
  .pl-root h3{font-weight:600!important}
  .pl-root a{-webkit-tap-highlight-color:transparent}
  .pl-btn-p:hover{background:${L.blueHover}!important}
  .pl-btn-s:hover{border-color:${L.blue}!important;background:${L.tint}!important}
  .pl-card{transition:transform .18s ease, border-color .18s ease}
  .pl-card:hover{transform:translateY(-3px);border-color:${L.blueMid}}
  .pl-link{color:${L.blue};text-decoration:none;font-weight:500}
  .pl-link:hover{color:${L.blueHover}}
  @media(prefers-reduced-motion:reduce){
    .pl-root *{transition-duration:.01ms!important;animation:none!important}
    .pl-card:hover{transform:none}
  }
`;
