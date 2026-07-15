import { AppShell } from "@/components/layout/AppShell";

/** Trainer area shell + guard (AI-for-Trainers vertical). */
export default function TrainersLayout({ children }: { children: React.ReactNode }) {
  return <AppShell allow={["trainer"]}>{children}</AppShell>;
}
