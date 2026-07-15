import { AppShell } from "@/components/layout/AppShell";

/** Student area shell + guard. */
export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return <AppShell allow={["student"]}>{children}</AppShell>;
}
