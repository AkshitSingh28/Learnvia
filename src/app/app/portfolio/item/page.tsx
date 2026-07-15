"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useStudent } from "@/lib/data/DataProvider";
import { Card, Btn } from "@/components/ui";
import type { PortfolioItem } from "@/lib/types";

const TYPES: PortfolioItem["type"][] = ["Resume", "Certificate", "AI Output", "Assignment", "Link", "Project"];

function ItemInner() {
  const router = useRouter();
  const id = useSearchParams().get("id");
  const { portfolio, addPortfolioItem } = useStudent();
  const existing = portfolio.find((x) => x.id === id);
  const isNew = !existing;

  const [type, setType] = useState<PortfolioItem["type"]>(existing?.type ?? "Resume");
  const [title, setTitle] = useState(existing?.title ?? "");
  const [link, setLink] = useState(existing?.link ?? "");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    if (isNew) await addPortfolioItem({ type, title, link: link || undefined });
    router.replace("/app/portfolio");
  }

  return (
    <div className="max-w-lg">
      <Link href="/app/portfolio" className="text-sm text-muted">← Portfolio</Link>
      <h1 className="mt-2 text-2xl font-extrabold mb-6">{isNew ? "Add portfolio item" : existing.title}</h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-3">
          <select value={type} onChange={(e) => setType(e.target.value as PortfolioItem["type"])} className="w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm" style={{ borderColor: "var(--border)" }}>
            {TYPES.map((t) => <option key={t} className="bg-black">{t}</option>)}
          </select>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Title" className="w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm" style={{ borderColor: "var(--border)" }} />
          <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link (GitHub / Canva / Drive)" className="w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm" style={{ borderColor: "var(--border)" }} />
          <button type="button" className="w-full rounded-lg border border-dashed px-3 py-4 text-xs text-muted" style={{ borderColor: "var(--border)" }}>Upload file (optional)</button>
          <Btn type="submit" className="w-full" disabled={busy}>{busy ? "Saving…" : isNew ? "Add to portfolio" : "Save"}</Btn>
        </form>
      </Card>
    </div>
  );
}

export default function PortfolioItemPage() {
  return <Suspense fallback={<div className="text-muted">Loading…</div>}><ItemInner /></Suspense>;
}
