import { inter, L } from "@/components/public/lightTheme";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";

export const metadata = { title: "Terms of Service · Learnvia" };

/** /terms — 2026-07 light redesign: white long-form document layout. */
export default function TermsPage() {
  return (
    <div className={inter.className} style={{ background: L.bg, color: L.text, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <PublicNav />
      <article style={{ maxWidth: 680, margin: "0 auto", padding: "56px 24px 80px", flex: 1, width: "100%" }}>
        <h1 style={{ fontSize: "clamp(28px,4vw,38px)", fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>Terms of service</h1>
        <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 16, fontSize: 16, lineHeight: 1.7, color: L.muted }}>
          <p>Learnvia is free for students. Use it to learn, build a portfolio, and apply to real opportunities responsibly.</p>
          <p>You agree to use AI tools safely and ethically, to submit your own work, and to follow each external portal&apos;s own rules when applying.</p>
          <p>Applications happen on external portals; Learnvia tracks them but is not responsible for third-party portals or employers.</p>
          <p style={{ fontSize: 13, color: L.faint }}>This is placeholder copy for the MVP and will be replaced with reviewed terms before launch.</p>
        </div>
      </article>
      <PublicFooter />
    </div>
  );
}
