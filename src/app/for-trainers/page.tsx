import { TrainersContent } from "./TrainersContent";

export const metadata = {
  title: "For trainers · Learnvia",
  description:
    "Copy-paste AI recipes and instant tools for Indian classrooms: 8 teaching modules, 24 prompts, the Plan-B Panic Button, and a 60-minute workshop kit. Free for trainers.",
};

/**
 * /for-trainers — the deep trainer story of the 2026-07 public redesign.
 * Thin server wrapper: keeps the static metadata while the visible body lives
 * in the client `TrainersContent` so it can follow the EN/HI language toggle.
 */
export default function ForTrainersPage() {
  return <TrainersContent />;
}
