/**
 * Growvia shared UI kit. Presentational, theme-aware (dark + restrained purple via the
 * CSS variables in globals.css). Reused across every page so screens stay thin.
 */
import Link from "next/link";
import type { ReactNode } from "react";

export function cn(...parts: (string | false | undefined | null)[]): string {
  return parts.filter(Boolean).join(" ");
}

export function Card({ children, className, lift, soft = true }: { children: ReactNode; className?: string; lift?: boolean; soft?: boolean }) {
  return (
    <div
      className={cn("rounded-2xl border p-5", lift && "gv-lift cursor-pointer", className)}
      style={{ background: "var(--card)", borderColor: "var(--border)", borderRadius: "var(--radius-card)", boxShadow: soft ? "var(--shadow-soft)" : undefined }}
    >
      {children}
    </div>
  );
}

export type WellTone = "indigo" | "violet" | "blue" | "green" | "orange" | "red";

/** Tinted icon well — a Tabler glyph inside a soft colored tile. */
export function IconTile({ icon, tone = "indigo", size = "md" }: { icon: string; tone?: WellTone; size?: "sm" | "md" | "lg" }) {
  return (
    <span className={cn("gv-well", size === "sm" && "gv-well-sm", size === "lg" && "gv-well-lg", `well-${tone}`)}>
      <i className={`ti ${icon}`} aria-hidden="true" />
    </span>
  );
}

/** A titled content panel with an optional "view all" link on the right. */
export function WidgetPanel({ title, action, children, className }: { title?: ReactNode; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <Card className={className}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && <h2 className="text-base font-bold">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </Card>
  );
}

/** A stat tile: big number + label + a colored underline bar. */
export function StatBox({ value, label, tone = "indigo", icon }: { value: ReactNode; label: string; tone?: WellTone; icon?: string }) {
  return (
    <Card soft={false} className="!p-4">
      <div className="flex items-center gap-2 text-sm text-muted">
        {icon && <IconTile icon={icon} tone={tone} size="sm" />}
        {label}
      </div>
      <div className="mt-2 text-2xl font-extrabold" style={{ color: "var(--foreground)" }}>{value}</div>
      <div className="mt-3 h-1 rounded-full" style={{ background: `var(--well-${tone}-fg)` }} />
    </Card>
  );
}

/** Quick-action card: icon well + title/subtitle + reveal arrow. */
export function QuickActionCard({ icon, tone = "indigo", title, subtitle, href, badge }: { icon: string; tone?: WellTone; title: string; subtitle?: string; href: string; badge?: string }) {
  return (
    <Link href={href} className="relative block">
      <Card lift className="gv-hoverrow flex items-center gap-3 !p-4">
        {badge && <span className="absolute -top-2 -right-2 rounded-full border px-2 py-0.5 text-[10px] font-bold" style={{ background: "var(--card)", borderColor: "var(--accent)", color: "var(--accent)" }}>{badge}</span>}
        <IconTile icon={icon} tone={tone} />
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold truncate">{title}</div>
          {subtitle && <div className="text-xs text-muted truncate">{subtitle}</div>}
        </div>
        <i className="ti ti-chevron-right gv-arrow text-muted" aria-hidden="true" />
      </Card>
    </Link>
  );
}

/** A tappable list row: icon + text + arrow, with hover slide. */
export function ActionRow({ icon, tone = "indigo", title, subtitle, href, onClick, right }: { icon: string; tone?: WellTone; title: string; subtitle?: string; href?: string; onClick?: () => void; right?: ReactNode }) {
  const inner = (
    <div className="gv-hoverrow flex items-center gap-3 rounded-xl px-2.5 py-2.5 -mx-2.5 transition-colors hover:bg-[var(--background)]">
      <IconTile icon={icon} tone={tone} />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold truncate">{title}</div>
        {subtitle && <div className="text-xs text-muted truncate">{subtitle}</div>}
      </div>
      {right ?? <i className="ti ti-chevron-right gv-arrow text-muted" aria-hidden="true" />}
    </div>
  );
  if (href) return <Link href={href}>{inner}</Link>;
  return <button type="button" onClick={onClick} className="w-full text-left">{inner}</button>;
}

type BtnProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
};

export function Btn({ children, href, onClick, variant = "primary", type = "button", className, disabled }: BtnProps) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50";
  const styles =
    variant === "primary"
      ? { background: "var(--accent-2)", color: "#fff" }
      : variant === "outline"
        ? { borderColor: "var(--border)" }
        : {};
  const cls = cn(base, variant === "outline" && "border", variant === "ghost" && "text-muted hover:text-foreground", className);
  if (href) return <Link href={href} className={cls} style={styles}>{children}</Link>;
  return <button type={type} onClick={onClick} disabled={disabled} className={cls} style={styles}>{children}</button>;
}

export function Pill({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "accent" | "green" | "amber" | "red" }) {
  const map: Record<string, string> = {
    neutral: "text-muted",
    accent: "text-[var(--accent)]",
    green: "text-emerald-400",
    amber: "text-amber-400",
    red: "text-rose-400",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium", map[tone])} style={{ borderColor: "var(--border)" }}>
      {children}
    </span>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-full rounded-full" style={{ background: "var(--track)" }}>
      <div className="h-1.5 rounded-full" style={{ width: `${Math.min(100, value)}%`, background: "var(--accent)" }} />
    </div>
  );
}

export function ProgressRing({ value, size = 92 }: { value: number; size?: number }) {
  const r = (size - 10) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (Math.min(100, value) / 100) * c;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--track)" strokeWidth={8} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--accent)" strokeWidth={8} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} />
    </svg>
  );
}

export function Stat({ value, label }: { value: ReactNode; label: string }) {
  return (
    <div>
      <div className="text-2xl font-extrabold">{value}</div>
      <div className="text-sm text-muted mt-1">{label}</div>
    </div>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1.5 text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-lg font-bold mb-4">{children}</h2>;
}

/** Section heading with an optional right-aligned link (e.g. "View all →"). */
export function SectionHeader({ title, href, linkLabel = "View all →", action }: { title: ReactNode; href?: string; linkLabel?: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-bold">{title}</h2>
      {action ?? (href && <Link href={href} className="text-sm font-medium text-[var(--accent)]">{linkLabel}</Link>)}
    </div>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <Card className="text-center py-12">
      <div className="text-base font-semibold">{title}</div>
      {hint && <div className="mt-1 text-sm text-muted">{hint}</div>}
    </Card>
  );
}

export function LockedState({ title, hint, action }: { title: string; hint?: string; action?: ReactNode }) {
  return (
    <Card className="text-center py-12">
      <div className="text-2xl">🔒</div>
      <div className="mt-3 text-base font-semibold">{title}</div>
      {hint && <div className="mt-1 text-sm text-muted max-w-md mx-auto">{hint}</div>}
      {action && <div className="mt-5">{action}</div>}
    </Card>
  );
}

export function Avatar({ name, size = 36 }: { name?: string | null; size?: number }) {
  const initials =
    (name ?? "").trim().split(/\s+/).filter(Boolean).map((p) => p[0]).slice(0, 2).join("").toUpperCase() || "?";
  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-bold text-white shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.38, background: "var(--accent-2)" }}
    >
      {initials}
    </span>
  );
}
