"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthProvider";
import { listNotifications, markNotificationRead } from "@/lib/db/notifications";
import { Card, PageHeader, EmptyState, IconTile } from "@/components/ui";
import type { NotificationItem } from "@/lib/types";

function ago(iso?: string): string {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3.6e6);
  if (h < 1) return "just now";
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

export default function NotificationsPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    listNotifications(user.uid)
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [user]);

  function onOpen(n: NotificationItem) {
    if (!n.read) {
      markNotificationRead(n.id).catch(() => {});
      setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
    }
  }

  if (loading) return <div className="text-muted">Loading…</div>;

  return (
    <div>
      <PageHeader title="Notifications" />
      {items.length === 0 ? (
        <EmptyState title="No notifications yet" hint="Updates about your submissions and progress will show up here." />
      ) : (
        <Card>
          <div className="space-y-1">
            {items.map((n) => {
              const inner = (
                <div className="gv-hoverrow flex items-start gap-3 rounded-xl px-2.5 py-2.5 -mx-2.5 transition-colors hover:bg-[var(--background)]">
                  <IconTile icon={n.read ? "ti-check" : "ti-bell"} tone={n.read ? "green" : "blue"} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{n.title}</span>
                      {!n.read && <span className="h-2 w-2 rounded-full shrink-0" style={{ background: "var(--accent)" }} />}
                    </div>
                    <div className="text-sm text-muted">{n.body}</div>
                  </div>
                  <span className="text-xs text-muted shrink-0">{ago(n.createdAt)}</span>
                </div>
              );
              return (
                <div key={n.id} onClick={() => onOpen(n)} className="cursor-pointer">
                  {n.href ? <Link href={n.href}>{inner}</Link> : inner}
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
