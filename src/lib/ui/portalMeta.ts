/** Shared icon + tone mapping for Phase-3 opportunity portals (Apply pages). */
import type { OpportunityType } from "@/lib/types";
import type { WellTone } from "@/components/ui";

export const OPP_META: Record<OpportunityType, { icon: string; tone: WellTone }> = {
  Jobs: { icon: "ti-briefcase", tone: "blue" },
  Internships: { icon: "ti-school", tone: "violet" },
  Apprenticeship: { icon: "ti-tools", tone: "green" },
  "Online Freelance": { icon: "ti-world", tone: "orange" },
};

export function oppMeta(type: OpportunityType) {
  return OPP_META[type] ?? { icon: "ti-briefcase", tone: "indigo" as WellTone };
}
