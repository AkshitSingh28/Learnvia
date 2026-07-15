/**
 * Page templates — the recurring dashboard layouts, formalized so every page is consistent.
 * Built on the light-brand UI kit (src/components/ui.tsx). Demo-data driven.
 */
import Link from "next/link";
import type { ReactNode } from "react";
import { Card } from "@/components/ui";

/** Row of stat tiles (dashboard homes, reports). */
export function StatGrid({ items, cols = 4 }: { items: { value: ReactNode; label: string }[]; cols?: 3 | 4 }) {
  const c = cols === 3 ? "md:grid-cols-3" : "md:grid-cols-4";
  return (
    <div className={`grid grid-cols-2 ${c} gap-4`}>
      {items.map((s) => (
        <Card key={s.label}>
          <div className="text-2xl font-extrabold">{s.value}</div>
          <div className="text-sm text-muted mt-1">{s.label}</div>
        </Card>
      ))}
    </div>
  );
}

/** Responsive card grid for list/index pages. */
export function Grid({ cols = 3, children }: { cols?: 2 | 3 | 4; children: ReactNode }) {
  const c = cols === 2 ? "md:grid-cols-2" : cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";
  return <div className={`grid gap-5 ${c}`}>{children}</div>;
}

/** Detail-page header with a back link. */
export function DetailHeader({ backHref, backLabel, title, subtitle, action }: {
  backHref: string; backLabel: string; title: string; subtitle?: string; action?: ReactNode;
}) {
  return (
    <div className="mb-7">
      <Link href={backHref} className="text-sm text-muted">← {backLabel}</Link>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{title}</h1>
          {subtitle && <p className="mt-1.5 text-muted">{subtitle}</p>}
        </div>
        {action}
      </div>
    </div>
  );
}

/** Two-column detail layout: main content + optional right rail. */
export function DetailLayout({ main, rail }: { main: ReactNode; rail?: ReactNode }) {
  if (!rail) return <>{main}</>;
  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-6 items-start">
      <div>{main}</div>
      <div className="space-y-5">{rail}</div>
    </div>
  );
}

/** Generic data table for tabular list pages. */
export interface TableRow { id: string; cells: ReactNode[]; href?: string; hrefLabel?: string }
export function DataTable({ columns, rows }: { columns: string[]; rows: TableRow[] }) {
  return (
    <Card className="p-0 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wider text-muted border-b" style={{ borderColor: "var(--border)" }}>
            {columns.map((c) => <th key={c} className="px-5 py-3 font-medium">{c}</th>)}
            {rows.some((r) => r.href) && <th className="px-5 py-3" />}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
              {r.cells.map((cell, i) => <td key={i} className="px-5 py-3">{cell}</td>)}
              {r.href && <td className="px-5 py-3 text-right"><Link href={r.href} className="text-[var(--accent)] font-medium">{r.hrefLabel ?? "Open"}</Link></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
