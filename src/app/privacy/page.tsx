import { inter, L } from "@/components/public/lightTheme";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";

export const metadata = { title: "Privacy Policy · Learnvia" };

/** /privacy — 2026-07 light redesign: white long-form document layout. */
export default function PrivacyPage() {
  return (
    <div className={inter.className} style={{ background: L.bg, color: L.text, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <PublicNav />
      <article style={{ maxWidth: 680, margin: "0 auto", padding: "56px 24px 80px", flex: 1, width: "100%" }}>
        <h1 style={{ fontSize: "clamp(28px,4vw,38px)", fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>Privacy policy</h1>
        <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 16, fontSize: 16, lineHeight: 1.7, color: L.muted }}>
          <p>Learnvia collects only what we need to run your learning experience: your name, email, learning progress, submissions, and portfolio items you choose to add.</p>
          <p>Your data is stored securely in Firebase. We do not sell your data. Mentors and NGOs you join can see your progress to support you.</p>
          <p>You can request deletion of your account and data at any time. For questions, contact your NGO or the Learnvia team.</p>
          <p style={{ fontSize: 13, color: L.faint }}>This is placeholder copy for the MVP and will be replaced with a reviewed policy before launch.</p>
        </div>
      </article>
      <PublicFooter />
    </div>
  );
}
