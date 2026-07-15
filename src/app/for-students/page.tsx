import { StudentsContent } from "./StudentsContent";

export const metadata = {
  title: "For students · Learnvia",
  description:
    "Start from zero: 8 beginner AI modules, 5 skill tracks with real project outputs, and 20+ real opportunity portals — free for students.",
};

/**
 * /for-students — the deep student story of the 2026-07 public redesign.
 * Thin server wrapper: keeps the static metadata while the visible body lives
 * in the client `StudentsContent` so it can follow the EN/HI language toggle.
 */
export default function ForStudentsPage() {
  return <StudentsContent />;
}
