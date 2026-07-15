"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useStudent } from "@/lib/data/DataProvider";
import { loadThread, saveThread, type ThreadMessage } from "@/lib/db/aiThreads";
import { PageHeader } from "@/components/ui";
import { ChatSurface, type ChatMessage } from "@/components/ai/ChatSurface";

/** Max value of each readiness component (mirrors derive.ts WEIGHTS) — used to find the weakest area. */
const MAX = { phase1: 20, phase2: 25, assignments: 20, portfolio: 20, application: 15 };
const LABEL: Record<keyof typeof MAX, string> = {
  phase1: "AI Foundation (Phase 1)",
  phase2: "your skill pathway (Phase 2)",
  assignments: "quizzes & assignments",
  portfolio: "your portfolio",
  application: "application readiness",
};

/** The lowest-scoring readiness component, as a fraction of its max. */
function weakestArea(breakdown: Record<keyof typeof MAX, number>): keyof typeof MAX {
  return (Object.keys(MAX) as (keyof typeof MAX)[]).reduce((worst, k) =>
    breakdown[k] / MAX[k] < breakdown[worst] / MAX[worst] ? k : worst,
  );
}

export default function CoachPage() {
  const { user } = useAuth();
  const { readiness, modules, tracks, chosenTrackId, portfolio, applications, submissions, loading } = useStudent();

  const [thread, setThread] = useState<ChatMessage[] | null>(null);
  const savingRef = useRef(false);

  // Load the persisted conversation once (resolves to [] in preview / logged-out where there's no uid).
  useEffect(() => {
    let active = true;
    const load = user ? loadThread(user.uid) : Promise.resolve<ChatMessage[]>([]);
    load.then((msgs) => { if (active) setThread(msgs); }).catch(() => { if (active) setThread([]); });
    return () => { active = false; };
  }, [user]);

  const persist = useCallback((messages: ChatMessage[]) => {
    if (!user || savingRef.current) return;
    const clean: ThreadMessage[] = messages.filter((m) => !m.error).map((m) => ({ role: m.role, text: m.text }));
    savingRef.current = true;
    saveThread(user.uid, clean).finally(() => { savingRef.current = false; });
  }, [user]);

  if (loading || thread === null) {
    return (
      <div>
        <PageHeader title="GrowHub Coach" subtitle="Your personal guide through the pathway." />
        <div className="text-sm text-muted">Loading your coach…</div>
      </div>
    );
  }

  const weak = weakestArea(readiness.breakdown);
  const chosen = tracks.find((t) => t.id === chosenTrackId);
  const nextModule = modules.find((m) => !m.locked && m.progress < 100) ?? modules.find((m) => m.locked);
  const pendingReviews = submissions.filter((s) => s.status === "Pending").length;
  const name = user?.displayName?.split(/\s+/)[0] || "there";

  const systemInstruction =
    "You are GrowHub Coach, a warm, practical mentor inside GrowHub — a beginner-friendly AI-upskilling platform for students in India. " +
    "The journey has three phases: AI Foundation (Phase 1) → a chosen skill pathway (Phase 2) → applying to real opportunities (Phase 3), tracked by a readiness score out of 100. " +
    "Your job is to coach THIS student to their next concrete step. Be encouraging, specific, and brief (a few short sentences or a tight list). " +
    "Guardrails: never do graded work for them — don't write their assignments, quiz answers, or portfolio pieces outright; instead coach them to produce it themselves. " +
    "Keep them on the GrowHub pathway; you are not a generic search engine. If asked something off-topic or to shortcut the learning, gently redirect to their next step. " +
    "Here is the student's live state — use it to personalise, don't recite it verbatim:\n" +
    `- Name: ${name}\n` +
    `- Readiness: ${readiness.score}/100 (AI Foundation ${readiness.breakdown.phase1}/20, skill pathway ${readiness.breakdown.phase2}/25, assignments ${readiness.breakdown.assignments}/20, portfolio ${readiness.breakdown.portfolio}/20, application readiness ${readiness.breakdown.application}/15)\n` +
    `- Weakest area right now: ${LABEL[weak]}\n` +
    `- Chosen skill track: ${chosen ? chosen.title : "not chosen yet"}\n` +
    `- Suggested next module: ${nextModule ? nextModule.title : "all modules complete"}\n` +
    `- Portfolio items: ${portfolio.length}; Applications tracked: ${applications.length}; Submissions under review: ${pendingReviews}`;

  const starters = [
    "What should I focus on next?",
    `How do I improve ${LABEL[weak]}?`,
    chosen ? `Give me a 20-minute plan for ${chosen.title} today.` : "Help me choose a skill track.",
    nextModule ? `Explain "${nextModule.title}" in simple words.` : "How do I get ready to apply?",
  ];

  const greeting = `You're at ${readiness.score}/100, ${name}.`;
  const subGreeting = `Your weakest area right now is ${LABEL[weak]}. Ask me what to do next — or tap a starter.`;

  return (
    <div>
      <PageHeader title="GrowHub Coach" subtitle="A personal guide that knows where you are on the pathway." />
      <ChatSurface
        systemInstruction={systemInstruction}
        greeting={greeting}
        subGreeting={subGreeting}
        starters={starters}
        placeholder="Ask your coach anything about your next step…"
        initialMessages={thread}
        onMessagesChange={persist}
      />
    </div>
  );
}
