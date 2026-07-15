/**
 * Phase 3 "Opportunity Readiness & Applications" portal directory.
 * `recommendedFromScore` drives the score bands (50 / 70 / 85); `opportunityType` +
 * `modes` drive the filters. Each card also carries `bestFor`, `requiredDocs`,
 * `safetyNote` and portal-specific `guides` (Watch Guide links moved out of
 * Application Readiness per review). `category`/`minReadiness` kept as legacy aliases.
 */
import type { Portal } from "@/lib/types";

const JOB_DOCS = "Resume PDF, portfolio/proof-of-work link, professional email (LinkedIn if available).";
const GOVT_DOCS = "Resume, ID proof, eligibility details, portfolio link.";
const FREELANCE_DOCS = "Portfolio folder link + 2–3 sample works, professional email.";
const SAFE_GENERIC = "Never pay to apply. Check the company and role before applying — don't apply blindly.";
const SAFE_FREELANCE = "Never share bank/UPI details before a signed contract. Watch for advance-fee scams.";

export const portals: Portal[] = [
  // ── Recommended from 50 (starter portals) ──
  { id: "po-ncs", name: "NCS — National Career Service", url: "https://www.ncs.gov.in/job-seeker/Pages/default.aspx", opportunityType: "Jobs", modes: ["Local", "In-office", "Remote"], recommendedFromScore: 50, minReadiness: 50, category: "Government", bestFor: "Government jobs and fresher roles", requiredDocs: GOVT_DOCS, safetyNote: "Official portal — NCS charges no fee for registration, application or interviews.", note: "Official jobseeker portal; no fees for registration, application or interview processing.", guides: [{ label: "Watch Guide (playlist)", url: "https://www.youtube.com/playlist?list=PLcvU52EWb-qLOPlRr1qtyuLNpJgpPPNCy" }, { label: "Registration video", url: "https://www.youtube.com/watch?v=5Pieivocozk" }] },
  { id: "po-sid", name: "Skill India Digital Hub", url: "https://www.skillindiadigital.gov.in/", opportunityType: "Apprenticeship", modes: ["Online", "Local", "In-office"], recommendedFromScore: 50, minReadiness: 50, category: "Government", bestFor: "Skill courses, jobs and apprenticeships", requiredDocs: GOVT_DOCS, safetyNote: SAFE_GENERIC, note: "Lists courses, jobs and apprenticeships — kept under the apprenticeship/job pathway.", guides: [{ label: "Watch Guide (playlist)", url: "https://www.youtube.com/playlist?list=PLjxvOfcLVlCTPj9mP1mpDMn44er98VVh9" }, { label: "Registration guide", url: "https://support.nsdcindia.org/portal/en/kb/articles/candidate-registration-enrollment-process-on-skill-india-digital-portal-sid" }, { label: "myScheme (optional)", url: "https://www.myscheme.gov.in/find-scheme" }] },
  { id: "po-internshala", name: "Internshala", url: "https://internshala.com/internships/", opportunityType: "Internships", modes: ["Work from Home", "In-office", "Remote"], recommendedFromScore: 50, minReadiness: 50, category: "Internship", bestFor: "Internships and beginner roles", requiredDocs: "Resume, profile, portfolio link if available.", safetyNote: "Avoid any opportunity asking for money.", note: "Work-from-home, part-time, in-office internships and student-friendly roles.", guides: [{ label: "Watch Guide (channel)", url: "https://www.youtube.com/@InternshalaOfficial" }, { label: "Registration guide", url: "https://internshala.com/blog/how-to-register-on-internshala/" }] },
  { id: "po-aicte", name: "AICTE Internship Portal", url: "https://internship.aicte-india.org/", opportunityType: "Internships", modes: ["In-office", "Remote"], recommendedFromScore: 50, minReadiness: 50, category: "Internship", bestFor: "Govt-supported student internships", requiredDocs: GOVT_DOCS, safetyNote: "Free for students — never pay to register or apply.", note: "National Internship Portal — free for students to register and apply." },
  { id: "po-apna", name: "Apna", url: "https://apna.co/", opportunityType: "Jobs", modes: ["Local", "In-office"], recommendedFromScore: 50, minReadiness: 50, category: "Jobs", bestFor: "Local jobs: data entry, telecalling/BPO, office, sales", requiredDocs: JOB_DOCS, safetyNote: SAFE_GENERIC, note: "Beginner roles: data entry, telecalling/BPO, office assistant, customer service, sales, back office, local jobs." },
  { id: "po-firstnaukri", name: "Firstnaukri", url: "https://www.firstnaukri.com/", opportunityType: "Jobs", modes: ["In-office", "Remote"], recommendedFromScore: 50, minReadiness: 50, category: "Jobs", bestFor: "Fresher jobs and student roles", requiredDocs: JOB_DOCS, safetyNote: SAFE_GENERIC, note: "Useful for college students and recent graduates (fresher jobs / student roles)." },
  { id: "po-apprenticeship", name: "Apprenticeship India / NAPS", url: "https://www.apprenticeshipindia.gov.in/candidate-login/", opportunityType: "Apprenticeship", modes: ["Local", "In-office"], recommendedFromScore: 50, minReadiness: 50, category: "Apprenticeship", bestFor: "Earn-while-learn apprenticeships", requiredDocs: GOVT_DOCS, safetyNote: "Official govt portal — no fees. Verify the establishment.", note: "Candidate login/registration portal for apprenticeship (earn-while-learn) opportunities.", guides: [{ label: "Watch Guide", url: "https://www.youtube.com/watch?v=1Mof0EQFDXo" }, { label: "Candidate registration", url: "https://www.apprenticeshipindia.gov.in/candidate-registration" }, { label: "NSDC info", url: "https://nsdcindia.org/apprenticeship" }] },

  // ── Recommended from 70 (broader portals) ──
  { id: "po-linkedin", name: "LinkedIn Jobs", url: "https://www.linkedin.com/jobs/", opportunityType: "Jobs", modes: ["In-office", "Remote"], recommendedFromScore: 70, minReadiness: 70, category: "Jobs", bestFor: "Jobs and internships", requiredDocs: "Resume, LinkedIn profile, portfolio link if available.", safetyNote: "Check company and role before applying. Do not apply blindly.", note: "Find jobs/internships and apply via Easy Apply or external Apply.", guides: [{ label: "Watch Guide", url: "https://www.youtube.com/watch?v=dYsLfNSZHtA" }, { label: "Search guide", url: "https://www.linkedin.com/help/linkedin/answer/a511260" }, { label: "Apply guide", url: "https://www.linkedin.com/help/linkedin/answer/a512388" }] },
  { id: "po-naukri", name: "Naukri", url: "https://www.naukri.com/", opportunityType: "Jobs", modes: ["In-office", "Remote"], recommendedFromScore: 70, minReadiness: 70, category: "Jobs", bestFor: "Broad job search across roles", requiredDocs: JOB_DOCS, safetyNote: SAFE_GENERIC, note: "Broad job board across roles and experience levels." },
  { id: "po-workindia", name: "WorkIndia", url: "https://www.workindia.in/", opportunityType: "Jobs", modes: ["Local", "In-office"], recommendedFromScore: 70, minReadiness: 70, category: "Jobs", bestFor: "Local and urgent fresher jobs", requiredDocs: JOB_DOCS, safetyNote: "Use with mentor safety review. Avoid any role asking for money.", note: "Local fresher jobs; search/contact/apply without paying (keep with mentor safety review)." },
  { id: "po-indeed", name: "Indeed India", url: "https://in.indeed.com/", opportunityType: "Jobs", modes: ["In-office", "Remote"], recommendedFromScore: 70, minReadiness: 70, category: "Jobs", bestFor: "Broad jobs and internships", requiredDocs: JOB_DOCS, safetyNote: "Listings are broad — always run the safety checklist first.", note: "Many internship/job listings; broad, so use the safety checklist (mentor-reviewed)." },
  { id: "po-pmintern", name: "PM Internship Scheme", url: "https://pminternship.mca.gov.in/", opportunityType: "Internships", modes: ["In-office"], recommendedFromScore: 70, minReadiness: 70, category: "Government", bestFor: "Govt-supported internships for youth", requiredDocs: GOVT_DOCS, safetyNote: "Official govt scheme — no fees. Apply only via the official portal.", note: "Govt internship scheme: register, explore, apply and track applications." },
  { id: "po-foundit", name: "Foundit Zuno", url: "https://www.foundit.in/zuno/", opportunityType: "Internships", modes: ["In-office", "Remote"], recommendedFromScore: 70, minReadiness: 70, category: "Internship", bestFor: "Paid internships and fresher jobs", requiredDocs: JOB_DOCS, safetyNote: SAFE_GENERIC, note: "Positioned for paid internships and fresher jobs." },
  { id: "po-nats", name: "NATS 2.0", url: "https://nats.education.gov.in/student_login.php", opportunityType: "Apprenticeship", modes: ["Local", "In-office"], recommendedFromScore: 70, minReadiness: 70, category: "Apprenticeship", bestFor: "Graduate/diploma/vocational apprenticeships", requiredDocs: GOVT_DOCS, safetyNote: "Only for eligible graduate/diploma/vocational students. Official portal, no fees.", note: "Graduate/diploma/vocational apprenticeship — only for eligible students." },

  // ── Recommended from 85 (online freelance) ──
  { id: "po-fiverr", name: "Fiverr", url: "https://www.fiverr.com/start_selling", opportunityType: "Online Freelance", modes: ["Online", "Remote"], recommendedFromScore: 85, minReadiness: 85, category: "Freelance", bestFor: "Selling design/content/web services", requiredDocs: FREELANCE_DOCS, safetyNote: SAFE_FREELANCE, note: "After a portfolio: Canva/design, content, basic web, poster, social media services." },
  { id: "po-upwork", name: "Upwork", url: "https://www.upwork.com/freelance-jobs/", opportunityType: "Online Freelance", modes: ["Online", "Remote"], recommendedFromScore: 85, minReadiness: 85, category: "Freelance", bestFor: "Remote freelance projects (stronger students)", requiredDocs: FREELANCE_DOCS, safetyNote: SAFE_FREELANCE, note: "Create a profile and find remote freelance jobs — for stronger students." },
  { id: "po-truelancer", name: "Truelancer", url: "https://www.truelancer.com/freelance-jobs", opportunityType: "Online Freelance", modes: ["Online", "Remote"], recommendedFromScore: 85, minReadiness: 85, category: "Freelance", bestFor: "India-focused beginner freelance / WFH tasks", requiredDocs: FREELANCE_DOCS, safetyNote: SAFE_FREELANCE, note: "India-focused beginner freelance / work-from-home / typing / data / customer support tasks." },
];

/** The application checklist shown before applying (review section: application checklist). */
export const applicationChecklist: string[] = [
  "Resume PDF",
  "Portfolio folder link",
  "Professional email ID",
  "Skill pathway output",
  "Self-introduction script / video",
  "Certificates (if available)",
  "Online safety checklist completed",
];

/** The locked preview roadmap shown even below 50 (tiers unlock by score). */
export const roadmapTiers: { from: number; label: string; hint: string }[] = [
  { from: 50, label: "Starter opportunities", hint: "NCS, Skill India, Internshala, AICTE, Apna, Firstnaukri, Apprenticeship India" },
  { from: 70, label: "Broader job / internship / apprenticeship portals", hint: "LinkedIn, Naukri, WorkIndia, Indeed, PM Internship, Foundit Zuno, NATS 2.0" },
  { from: 85, label: "Freelance portals", hint: "Fiverr, Upwork, Truelancer" },
];
