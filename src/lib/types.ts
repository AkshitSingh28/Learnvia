/**
 * Growvia shared domain types.
 * Web-only product. These mirror the Firestore collections described in the plan;
 * the demo data layer (`src/lib/seed`) returns objects of these shapes so every page
 * renders before real Firestore content exists.
 */

export type Role = "student" | "mentor" | "ngo" | "admin" | "trainer";

export type PhaseId = 1 | 2 | 3;

export interface UserProfile {
  uid: string;
  role: Role;
  displayName: string;
  email: string;
  photoURL?: string;
  education?: string;
  goals?: string;
  ngoId?: string;
  cohortId?: string;
  cohortIds?: string[];
  mentorId?: string;
  createdAt?: string;
}

/** A single lesson card inside a Phase 1 module. */
export interface Lesson {
  id: string;
  title: string;
  body: string;
  examples?: string[];
  done?: boolean;
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
}

export interface Module {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  level: "Beginner" | "Intermediate";
  estMinutes: number;
  lessons: Lesson[];
  videoUrl?: string;
  videoLengthLabel?: string;
  flashcards: Flashcard[];
  promptLab: string[];
  pptUrl?: string;
  pdfUrl?: string;
  flashcardsDocUrl?: string; // downloadable flashcards document (Drive PDF), distinct from the interactive `flashcards`
  quiz: QuizQuestion[];
  passScore: number;
  task: string;
  badge: string;
  reflection: string;
  progress: number; // 0-100 (demo per-user)
  locked: boolean;
}

/**
 * One row inside a track's curriculum table (a resource + what it covers + the output).
 * Mirrors the Phase-2 master-data tables (Foundation track + skill tracks).
 */
export interface TrackModule {
  order: number;
  title: string;
  /** Final clickable learning resource. */
  link?: string;
  /** Human-readable label for the link (e.g. course/video title). */
  linkLabel?: string;
  /** Type / language (e.g. "YouTube playlist / Hindi"). */
  type?: string;
  /** Time / videos / duration. */
  duration?: string;
  /** Optional practice tool/resource column (design + marketing tracks). */
  practiceTool?: string;
  /** Clickable "Start Practice" resource(s) — the hands-on tool the student opens. */
  practiceLinks?: { label: string; url: string }[];
  /** Extra clickable learning resources beyond the primary lesson (e.g. "Additional learning", "Alternative video", official docs). */
  learnLinks?: { label: string; url: string }[];
  /** Override for the primary lesson button label (default "Watch lesson"). e.g. "Open Practice Briefs", "Check Free Tool Rules". */
  watchLabel?: string;
  /** Marks a module as optional support / advanced — shown with a badge and excluded from the required-completion count so it never blocks submission. */
  support?: boolean;
  /** Badge text for a support/optional module (default "Optional Support"). */
  supportLabel?: string;
  /** Extra guidance note shown under `covers` (e.g. free-tool usage warning). */
  note?: string;
  /** What this module covers. */
  covers: string;
  /** Job objective(s) this maps to (skill tracks). */
  jobObjective?: string;
  /** Concrete artifact the student produces. */
  output: string;
}

export interface Track {
  id: string;
  kind: "digitalFoundation" | "skillTrack";
  title: string;
  summary: string;
  externalLink: string;
  learn: string[];
  practiceTask: string;
  requiredOutput: string;
  progress: number;
  locked: boolean;
  /** Full curriculum table (Foundation = 17 rows; skill tracks = their module lists). */
  modules?: TrackModule[];
  /** Final portfolio checklist a student must assemble to complete the track. */
  portfolioChecklist?: string[];
  /** Explanatory note under the checklist (e.g. what the "final simulation project" means). */
  portfolioNote?: string;
  /** Short tagline used on the chooser result screen. */
  tagline?: string;
  /** Emoji/glyph for cards. */
  glyph?: string;
}

/** One option in the "Help me choose" track-chooser quiz. */
export interface ChooserOption {
  label: string;
  /** Track id this option points toward (if any). */
  trackId?: string;
  /** Optional note shown as guidance (device constraints, etc). */
  note?: string;
}

export interface ChooserQuestion {
  id: string;
  question: string;
  options: ChooserOption[];
}

/**
 * A Module-5 "Application Readiness" sub-module (5.1–5.14). These are readiness-prep
 * steps only — no real applying happens until Phase 3.
 */
export interface ReadinessSubModule {
  id: string; // "5.1"
  title: string;
  resourceType: string;
  links: { label: string; url: string }[];
  learns: string;
  practice: string;
  output: string;
  /** The "Phase 3 boundary" note — clarifies this is prep, not applying. */
  boundary: string;
  inApp?: boolean; // created inside the app, no external link
  /** Optional/recommended (e.g. LinkedIn) — should not block beginners. */
  optional?: boolean;
}

/** Module-6 (Beginner Web/Tech) grading rubric row. */
export interface WebRubricItem {
  criteria: string;
  marks: number;
}

/** Module-6 portfolio submission checklist row. */
export interface WebSubmissionItem {
  item: string;
  required: string;
  check: string;
}

/** A pass band for the Module-6 portfolio score. */
export interface PassingBand {
  level: string;
  range: string;
}

export interface Project {
  id: string;
  title: string;
  brief: string;
  checklist: string[];
  trackId?: string;
}

export type OpportunityType = "Jobs" | "Internships" | "Apprenticeship" | "Online Freelance";
export type PortalMode = "Local" | "In-office" | "Work from Home" | "Remote" | "Online";

export interface Portal {
  id: string;
  name: string;
  url: string;
  category: "Internship" | "Apprenticeship" | "Freelance" | "Jobs" | "Government";
  /** Legacy alias for `recommendedFromScore`; kept so the admin CMS keeps working. */
  minReadiness: number;
  /** Score at which this portal starts being "Recommended for You" (50 / 70 / 85). */
  recommendedFromScore: number;
  /** Phase-3 filter: what kind of opportunity this portal offers. */
  opportunityType: OpportunityType;
  /** Phase-3 filter: work modes this portal covers. */
  modes: PortalMode[];
  /** Short reason this portal is kept in the directory. */
  note?: string;
  /** Who this portal is best for (shown on the Phase-3 card). */
  bestFor?: string;
  /** Documents/outputs the student needs ready before applying here. */
  requiredDocs?: string;
  /** A safety caution shown on the card. */
  safetyNote?: string;
  /** Portal-specific "Watch Guide" links (moved out of Application Readiness). */
  guides?: { label: string; url: string }[];
  flagged?: boolean;
}

export type ApplicationStatus =
  | "Applied"
  | "In Review"
  | "Shortlisted"
  | "Rejected"
  | "Selected";

export interface Application {
  id: string;
  studentId: string;
  portalName: string;
  role: string;
  status: ApplicationStatus;
  appliedAgo: string;
  proofUrl?: string;
}

export interface PortfolioItem {
  id: string;
  type: "Resume" | "Certificate" | "AI Output" | "Assignment" | "Link" | "Project";
  title: string;
  detail?: string;
  link?: string;
  verified?: boolean;
}

export interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  cohortId?: string;
  refType: "module" | "track" | "project" | "application";
  refTitle: string;
  link?: string;
  status: "Pending" | "Approved" | "Needs work";
  submittedAgo: string;
  createdAt?: string;
  feedback?: string;
  reviewedBy?: string;
}

export interface ReadinessBreakdown {
  phase1: number;
  phase2: number;
  assignments: number;
  portfolio: number;
  application: number;
}

export interface Readiness {
  score: number;
  breakdown: ReadinessBreakdown;
}

export interface Badge {
  id: string;
  title: string;
  earned: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  issuedBy: string;
  issuedAt: string;
}

export interface NotificationItem {
  id: string;
  userId?: string;
  title: string;
  body: string;
  ago: string;
  href?: string;
  read: boolean;
  createdAt?: string;
}

export interface Cohort {
  id: string;
  name: string;
  ngo: string;
  ngoId?: string;
  mentorId?: string;
  students: number;
  avgProgress: number;
  inviteCode: string;
}

export interface Ngo {
  id: string;
  name: string;
  contact: string;
  mentors: number;
  students: number;
}

export interface Invite {
  id: string; // the code itself
  code: string;
  cohortId: string;
  cohortName?: string;
  role: Role;
  active: boolean;
  uses: number;
}

export interface PlatformStats {
  totalStudents: number;
  totalSubmissions: number;
  pendingReviews: number;
  avgReadiness: number;
  perCohort?: Record<string, { students: number; avgProgress: number }>;
}

export interface StudentSummary {
  id: string;
  name: string;
  cohort: string;
  readiness: number;
  phase1: number;
  pendingReviews: number;
}
