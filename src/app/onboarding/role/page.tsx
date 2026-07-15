"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthProvider";
import type { Role } from "@/lib/types";
import { AuthShell } from "@/components/public/AuthShell";
import { DARK } from "@/lib/brand";

const OPTIONS: { role: Role; title: string; desc: string }[] = [
  { role: "student", title: "I'm a student", desc: "Learn AI & digital skills, build a portfolio, reach opportunities." },
  { role: "trainer", title: "I'm a trainer / educator", desc: "AI teaching tools & copy-paste prompts to save prep time in your classes." },
  { role: "mentor", title: "I'm a mentor", desc: "Guide and review students, verify portfolios." },
  { role: "ngo", title: "I represent an NGO", desc: "Manage cohorts and track impact." },
];

export default function OnboardingRolePage() {
  const { updateUserProfile } = useAuth();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function choose(role: Role) {
    setBusy(true);
    await updateUserProfile({ role });
    router.replace("/onboarding/profile");
  }

  return (
    <AuthShell title="How will you use Learnvia?" subtitle="You can change this later." max={460}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {OPTIONS.map((o) => (
          <button key={o.role} onClick={() => choose(o.role)} disabled={busy}
            style={{ textAlign: "left", background: DARK.surface2, border: `1px solid ${DARK.line2}`, borderRadius: 12, padding: 16, cursor: busy ? "wait" : "pointer", fontFamily: "inherit" }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: DARK.text }}>{o.title}</div>
            <div style={{ marginTop: 4, fontSize: 13, color: DARK.muted }}>{o.desc}</div>
          </button>
        ))}
      </div>
    </AuthShell>
  );
}
