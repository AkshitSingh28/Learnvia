import { AppShell } from "@/components/layout/AppShell";

/** Staff (mentor/NGO) area shell + guard. */
export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return <AppShell allow={["mentor", "ngo"]}>{children}</AppShell>;
}
