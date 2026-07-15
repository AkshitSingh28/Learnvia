"use client";

import Link from "next/link";
import { useStudent } from "@/lib/data/DataProvider";
import { Card, PageHeader, Btn, Pill, EmptyState, IconTile, type WellTone } from "@/components/ui";
import type { PortfolioItem } from "@/lib/types";

const TYPE_META: Record<PortfolioItem["type"], { icon: string; tone: WellTone }> = {
  Resume: { icon: "ti-file-cv", tone: "blue" },
  Certificate: { icon: "ti-certificate", tone: "green" },
  "AI Output": { icon: "ti-sparkles", tone: "violet" },
  Assignment: { icon: "ti-clipboard-check", tone: "orange" },
  Link: { icon: "ti-link", tone: "indigo" },
  Project: { icon: "ti-folder", tone: "orange" },
};

/** My Portfolio — central proof-of-work collection. */
export default function PortfolioPage() {
  const { portfolio } = useStudent();
  return (
    <div>
      <PageHeader title="My Portfolio" subtitle="Your resume, certificates, outputs, assignments and links in one place." action={<Btn href="/app/portfolio/item/?id=new">+ Add item</Btn>} />
      {portfolio.length === 0 && <EmptyState title="Your portfolio is empty" hint="Add your resume, certificates, AI outputs and project links to build proof of work." />}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {portfolio.map((it) => {
          const meta = TYPE_META[it.type] ?? { icon: "ti-file", tone: "indigo" as WellTone };
          return (
            <Link key={it.id} href={`/app/portfolio/item/?id=${it.id}`}>
              <Card lift className="h-full">
                <div className="flex items-start justify-between">
                  <IconTile icon={meta.icon} tone={meta.tone} size="lg" />
                  {it.verified && <Pill tone="green">✓ Verified</Pill>}
                </div>
                <div className="mt-3 text-xs text-muted">{it.type}</div>
                <div className="mt-0.5 font-bold">{it.title}</div>
                {it.detail && <div className="mt-1 text-sm text-muted">{it.detail}</div>}
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
