"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthProvider";
import { Card, PageHeader, Btn, Avatar } from "@/components/ui";

export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <div className="max-w-2xl">
      <PageHeader title="Profile" action={<Btn href="/app/profile/settings" variant="outline">Settings</Btn>} />
      <Card>
        <div className="flex items-center gap-4">
          <Avatar name={user?.displayName ?? "Student"} size={64} />
          <div>
            <div className="text-lg font-bold">{user?.displayName}</div>
            <div className="text-sm text-muted">{user?.email}</div>
            <div className="mt-1 text-xs text-muted capitalize">Role: {user?.role}</div>
          </div>
        </div>
      </Card>

      <div className="grid sm:grid-cols-3 gap-4 mt-5">
        <Link href="/app/certificates"><Card className="text-center hover:border-[var(--accent)] transition-colors"><div className="text-2xl">📜</div><div className="mt-2 text-sm font-semibold">Certificates</div></Card></Link>
        <Link href="/app/badges"><Card className="text-center hover:border-[var(--accent)] transition-colors"><div className="text-2xl">🏅</div><div className="mt-2 text-sm font-semibold">Badges</div></Card></Link>
        <Link href="/app/submissions"><Card className="text-center hover:border-[var(--accent)] transition-colors"><div className="text-2xl">📥</div><div className="mt-2 text-sm font-semibold">Submissions</div></Card></Link>
      </div>
    </div>
  );
}
