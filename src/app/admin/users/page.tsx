"use client";

import { useAdmin } from "@/lib/data/DataProvider";
import { CrudList } from "@/components/admin/CrudList";
import { Pill } from "@/components/ui";

export default function AdminUsersPage() {
  const { users, cohorts, loading } = useAdmin();
  const cohortName = (id?: string) => cohorts.find((c) => c.id === id)?.name ?? "—";

  return (
    <CrudList
      title="Users" subtitle={loading ? "Loading…" : `${users.length} registered users.`}
      columns={["Name", "Role", "Cohort"]}
      rows={users.map((u) => ({
        id: u.uid,
        editHref: `/admin/user/?id=${u.uid}`,
        cells: [
          <span key="n" className="font-medium">{u.displayName}</span>,
          <Pill key="r" tone={u.role === "admin" ? "accent" : "neutral"}>{u.role}</Pill>,
          cohortName(u.cohortId),
        ],
      }))}
    />
  );
}
