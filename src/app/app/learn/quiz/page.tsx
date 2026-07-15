"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStudent } from "@/lib/data/DataProvider";
import { Card, Btn, ProgressBar } from "@/components/ui";

function QuizInner() {
  const router = useRouter();
  const moduleId = useSearchParams().get("module");
  const { modules, loading } = useStudent();
  const m = modules.find((x) => x.id === moduleId) ?? modules[0];
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);

  if (loading || !m) return <div className="text-muted">Loading…</div>;
  if (m.quiz.length === 0) return <div className="text-muted">This module has no quiz yet.</div>;

  const q = m.quiz[i];
  const last = i === m.quiz.length - 1;

  function next() {
    if (picked === null) return;
    const got = picked === q.answerIndex ? correct + 1 : correct;
    setCorrect(got);
    if (last) {
      const score = Math.round((got / m.quiz.length) * 100);
      router.replace(`/app/learn/quiz/result/?module=${m.id}&score=${score}`);
    } else {
      setI(i + 1);
      setPicked(null);
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-4 text-sm text-muted">Assessment · {m.title}</div>
      <ProgressBar value={((i + 1) / m.quiz.length) * 100} />
      <Card className="mt-5">
        <div className="text-xs text-muted">Question {i + 1} of {m.quiz.length}</div>
        <h2 className="mt-2 text-lg font-bold">{q.prompt}</h2>
        <div className="mt-5 space-y-2">
          {q.options.map((opt, idx) => (
            <button
              key={opt}
              onClick={() => setPicked(idx)}
              className="flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm"
              style={{ borderColor: picked === idx ? "var(--accent)" : "var(--border)", background: picked === idx ? "rgba(75,87,246,0.08)" : "transparent" }}
            >
              <span className="h-4 w-4 rounded-full border" style={{ borderColor: picked === idx ? "var(--accent)" : "var(--border)", background: picked === idx ? "var(--accent)" : "transparent" }} />
              {opt}
            </button>
          ))}
        </div>
        <div className="mt-6"><Btn onClick={next} disabled={picked === null} className="w-full">{last ? "Finish" : "Next"}</Btn></div>
      </Card>
    </div>
  );
}

export default function QuizPage() {
  return <Suspense fallback={<div className="text-muted">Loading…</div>}><QuizInner /></Suspense>;
}
