import { AppShell } from "@/components/layout/AppShell";

/** Admin area shell + guard. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AppShell allow={["admin"]}>{children}</AppShell>;
}
