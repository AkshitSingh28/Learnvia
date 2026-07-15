"use client";

/** Reusable admin list table (CMS + management pages share this). */
import Link from "next/link";
import type { ReactNode } from "react";
import { Card, PageHeader, Btn } from "@/components/ui";

export interface CrudRow {
  id: string;
  cells: ReactNode[];
  editHref?: string;
}

export function CrudList({
  title,
  subtitle,
  columns,
  rows,
  newHref,
  newLabel = "+ New",
}: {
  title: string;
  subtitle?: string;
  columns: string[];
  rows: CrudRow[];
  newHref?: string;
  newLabel?: string;
}) {
  return (
    <div>
      <PageHeader title={title} subtitle={subtitle} action={newHref ? <Btn href={newHref}>{newLabel}</Btn> : undefined} />
      <Card className="p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-muted border-b" style={{ borderColor: "var(--border)" }}>
              {columns.map((c) => <th key={c} className="px-5 py-3 font-medium">{c}</th>)}
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                {r.cells.map((cell, i) => <td key={i} className="px-5 py-3">{cell}</td>)}
                <td className="px-5 py-3 text-right">
                  {r.editHref && <Link href={r.editHref} className="text-[var(--accent)]">Edit</Link>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
