"use client";

import { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useStudent } from "@/lib/data/DataProvider";
import { Card, Btn, Pill } from "@/components/ui";

function ResultInner() {
  const params = useSearchParams();
  const { modules, submitQuiz, loading } = useStudent();
  const moduleId = params.get("module");
  const score = Number(params.get("score") ?? 0);
  const recorded = useRef(false);

  // Persist the attempt once (completes module + earns badge + unlocks next on a pass).
  useEffect(() => {
    if (loading || recorded.current || !moduleId) return;
    recorded.current = true;
    void submitQuiz(moduleId, score);
  }, [loading, moduleId, score, submitQuiz]);

  if (loading) return <div className="text-muted">Loading…</div>;

  const m = modules.find((x) => x.id === moduleId) ?? modules[0];
  const correct = Math.round((score / 100) * m.quiz.length);
  const passed = score >= m.passScore;
  const nextModule = modules.find((x) => x.order === m.order + 1);

  return (
    <div className="max-w-md mx-auto">
      <Card className="text-center py-10">
        <div className="text-4xl">{passed ? "✅" : "🔁"}</div>
        <h1 className="mt-3 text-xl font-bold">Assessment {passed ? "Completed!" : "Try Again"}</h1>
        <div className="mt-1 text-sm text-muted">{m.title}</div>
        <div className="mt-6 text-4xl font-extrabold" style={{ color: "var(--accent)" }}>{correct}/{m.quiz.length}</div>
        <div className="mt-1 text-sm text-muted">{score}%</div>
        <div className="mt-4"><Pill tone={passed ? "green" : "amber"}>{passed ? "Pass" : `Need ${m.passScore}%`}</Pill></div>

        {passed && nextModule && (
          <div className="mt-7 rounded-xl border p-4 text-left" style={{ borderColor: "var(--border)" }}>
            <div className="text-sm font-semibold">🎉 Next Unlocked!</div>
            <div className="mt-1 text-xs text-muted">You&apos;ve unlocked Module {nextModule.order}: {nextModule.title}</div>
            <div className="mt-3"><Btn href={`/app/learn/module/?id=${nextModule.id}`} className="w-full">Go to next module</Btn></div>
          </div>
        )}
        <div className="mt-4"><Btn href={`/app/learn/module/?id=${m.id}`} variant="outline" className="w-full">{passed ? "View module" : "Take assessment again"}</Btn></div>
      </Card>
    </div>
  );
}

export default function ResultPage() {
  return <Suspense fallback={<div className="text-muted">Loading…</div>}><ResultInner /></Suspense>;
}
