"use client";

import { useState } from "react";
import { Card, PageHeader, Btn, SectionTitle, Pill } from "@/components/ui";
import { seedContent } from "@/lib/db/content";
import { useContent } from "@/lib/data/DataProvider";

export default function AdminSettingsPage() {
  const { seeded, reload } = useContent();
  const [status, setStatus] = useState<"idle" | "seeding" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSeed() {
    setStatus("seeding");
    setError("");
    try {
      await seedContent();
      await reload();
      setStatus("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Seeding failed");
      setStatus("error");
    }
  }

  return (
    <div className="max-w-2xl">
      <PageHeader title="Settings" subtitle="Global platform configuration." />
      <Card className="mb-5">
        <SectionTitle>Platform</SectionTitle>
        <div className="space-y-3">
          <input defaultValue="GrowHub" className="w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm" style={{ borderColor: "var(--border)" }} />
          <label className="flex items-center justify-between text-sm py-1"><span>Allow self-signup</span><input type="checkbox" defaultChecked /></label>
          <label className="flex items-center justify-between text-sm py-1"><span>Readiness gate for portals</span><span className="text-muted">50 / 100</span></label>
        </div>
      </Card>
      <Card>
        <div className="flex items-center justify-between">
          <SectionTitle>Content database</SectionTitle>
          {seeded ? <Pill tone="green">Seeded</Pill> : <Pill tone="amber">Not seeded</Pill>}
        </div>
        <p className="text-sm text-muted">
          Write the catalog (modules, tracks, portals, projects, badges) into Firestore so students read live
          content and the CMS can edit it. Safe to re-run — it upserts by id.
        </p>
        <div className="mt-3 flex items-center gap-3">
          <Btn variant="outline" onClick={handleSeed} disabled={status === "seeding"}>
            {status === "seeding" ? "Seeding…" : seeded ? "Re-seed content" : "Seed content database"}
          </Btn>
          {status === "done" && <span className="text-sm text-emerald-600">✓ Content written to Firestore</span>}
          {status === "error" && <span className="text-sm text-red-600">{error}</span>}
        </div>
      </Card>
    </div>
  );
}
