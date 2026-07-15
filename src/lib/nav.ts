/** Sidebar navigation per authenticated area (icon + label). Icons are Tabler classes. */
import type { Role } from "@/lib/types";

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export const studentNav: NavItem[] = [
  { label: "Home", href: "/app", icon: "ti-home" },
  { label: "Learn", href: "/app/learn", icon: "ti-book" },
  { label: "Build", href: "/app/build", icon: "ti-bulb" },
  { label: "Opportunities", href: "/app/apply", icon: "ti-briefcase" },
  { label: "Portfolio", href: "/app/portfolio", icon: "ti-folder" },
  { label: "Progress", href: "/app/progress", icon: "ti-chart-line" },
  { label: "AI Coach", href: "/app/coach", icon: "ti-sparkles" },
];

export const studentSecondary: NavItem[] = [
  { label: "Practice", href: "/app/practice", icon: "ti-flask" },
  { label: "Notifications", href: "/app/notifications", icon: "ti-bell" },
  { label: "Profile", href: "/app/profile", icon: "ti-user" },
];

export const staffNav: NavItem[] = [
  { label: "Dashboard", href: "/staff", icon: "ti-layout-dashboard" },
  { label: "Students", href: "/staff/students", icon: "ti-users" },
  { label: "Cohorts", href: "/staff/cohorts", icon: "ti-school" },
  { label: "Reviews", href: "/staff/reviews", icon: "ti-checklist" },
  { label: "Portfolio", href: "/staff/portfolio", icon: "ti-folder-check" },
  { label: "Applications", href: "/staff/applications", icon: "ti-briefcase" },
  { label: "Reports", href: "/staff/reports", icon: "ti-chart-bar" },
];

export const trainerNav: NavItem[] = [
  { label: "Home", href: "/trainers", icon: "ti-home" },
  { label: "AI Modules", href: "/trainers/modules", icon: "ti-books" },
  { label: "Trainer Tools", href: "/trainers/tools", icon: "ti-tools" },
  { label: "Workshop", href: "/trainers/workshop", icon: "ti-presentation" },
];

export const adminNav: NavItem[] = [
  { label: "Console", href: "/admin", icon: "ti-layout-dashboard" },
  { label: "Modules", href: "/admin/modules", icon: "ti-book" },
  { label: "Tracks", href: "/admin/tracks", icon: "ti-route" },
  { label: "Portals", href: "/admin/portals", icon: "ti-briefcase" },
  { label: "Users", href: "/admin/users", icon: "ti-users" },
  { label: "Cohorts", href: "/admin/cohorts", icon: "ti-school" },
  { label: "NGOs", href: "/admin/ngos", icon: "ti-building-community" },
  { label: "Reports", href: "/admin/reports", icon: "ti-chart-bar" },
  { label: "Settings", href: "/admin/settings", icon: "ti-settings" },
];

export function navForRole(role: Role): NavItem[] {
  if (role === "admin") return adminNav;
  if (role === "mentor" || role === "ngo") return staffNav;
  if (role === "trainer") return trainerNav;
  return studentNav;
}

export function secondaryNavForRole(role: Role): NavItem[] {
  return role === "student" ? studentSecondary : [];
}
