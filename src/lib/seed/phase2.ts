/**
 * Phase 2 master-data content (from "Aarohan master data phase 2 and 3").
 * Foundation track (17 modules), the four skill tracks + Beginner Web/Tech,
 * the "Help me choose" chooser, Module 5 (Application Readiness) and
 * Module 6 (web rubric). Links are the real resource URLs from the source doc.
 */
import type {
  Track,
  TrackModule,
  ChooserQuestion,
  ReadinessSubModule,
  WebRubricItem,
  WebSubmissionItem,
  PassingBand,
} from "@/lib/types";

// ─────────────────────────── Foundation track (compulsory) ───────────────────────────

export const foundationModules: TrackModule[] = [
  { order: 1, title: "Digital Basics", linkLabel: "Microsoft Digital Literacy — Skill India Digital", link: "https://www.skillindiadigital.gov.in/courses/detail/870bb14b-f8b7-4227-bd9e-fdc8748949e6", type: "Official course / Hindi", duration: "10 hours", covers: "Basic digital literacy, devices, software, internet, collaboration, using and creating information.", output: "Digital basics checklist" },
  { order: 2, title: "Digital Basics support", support: true, linkLabel: "NDLM Digital Literacy Hindi playlist", link: "https://www.youtube.com/playlist?list=PL7WYUFDtCahA_Rx3kEzKytHyxFUN1w4yt", type: "YouTube playlist / Hindi", duration: "Playlist", covers: "Digital devices, operating system, internet, email, digital services. Extra support for weak beginners.", output: "Extra support for weak beginners" },
  { order: 3, title: "Gmail + Email", linkLabel: "Gmail for Beginners — Google Applied Digital Skills", link: "https://edu.exceedlms.com/student/path/1606056-gmail-for-beginners", type: "Official Google course / English", duration: "45 minutes", covers: "Gmail inbox, composing email, replying to email, attachment basics.", output: "Professional email sample with attachment" },
  { order: 4, title: "Gmail Hindi support", support: true, linkLabel: "Gmail Course in Hindi playlist", link: "https://www.youtube.com/playlist?list=PLXwTOG3-tRwi9jpyn7HOEc2JL7ncTgI5e", type: "YouTube playlist / Hindi", duration: "Playlist", covers: "Gmail account use, sending email, Gmail tips. Hindi support for email practice.", output: "Hindi support for email practice" },
  { order: 5, title: "Google Drive", linkLabel: "Google Workspace: Drive — Applied Digital Skills", link: "https://edu.exceedlms.com/student/path/1606878-google-workspace-drive", type: "Official Google course / English", duration: "45 minutes", covers: "Upload, download, folders, file sharing, sharing permissions, searching files.", output: "Google Drive portfolio folder" },
  { order: 6, title: "Google Drive Hindi support", support: true, linkLabel: "Learn Google Drive — Full Course Hindi/Urdu", link: "https://www.youtube.com/playlist?list=PL1dx_7g6scPLBloS6QEDjFcA7MaN0BCdi", type: "YouTube playlist / Hindi/Urdu", duration: "Playlist", covers: "Drive basics, folders, upload, sharing, download.", output: "Portfolio folder practice" },
  { order: 7, title: "Google Docs basics", linkLabel: "Google Workspace: Docs — Part 1", link: "https://edu.exceedlms.com/student/path/1606823-google-workspace-docs-part-1", type: "Official Google course / English", duration: "45 minutes", covers: "Document setup, formatting, headings, lists, sharing-ready document.", output: "One formatted document" },
  { order: 8, title: "Resume in Google Docs", linkLabel: "Create a Resume in Google Docs", link: "https://edu.exceedlms.com/student/path/1606967-create-a-resume-in-google-docs", type: "Official Google course / English", duration: "45 minutes", covers: "Resume template, formatting, skills, active verbs, final resume editing.", output: "Resume PDF" },
  { order: 9, title: "Google Docs Hindi support", support: true, linkLabel: "Google Docs Tutorial in Hindi", link: "https://www.youtube.com/playlist?list=PLv2OjsNTF1W_3TJfUMVMqxy2A1VrCYcfV", type: "YouTube playlist / Hindi", duration: "Playlist", covers: "Google Docs tools, options and commands.", output: "Hindi support for Docs practice" },
  { order: 10, title: "Google Sheets basics", linkLabel: "Google Workspace: Sheets — Part 1", link: "https://edu.exceedlms.com/student/path/1606820-google-workspace-sheets-part-1", type: "Official Google course / English", duration: "45 minutes", covers: "Spreadsheet formatting, data organization, sorting, validation.", output: "Basic student/work tracker" },
  { order: 11, title: "Google Sheets Hindi support", support: true, linkLabel: "Google Sheet Tutorial in Hindi", link: "https://www.youtube.com/playlist?list=PLg60jFfvSlpQ4MNk2QQoKwvp9nXGNIMyr", type: "YouTube playlist / Hindi", duration: "6 videos", covers: "Google Sheets basics to useful formulas.", output: "Tracker sheet practice" },
  { order: 12, title: "Online Research", linkLabel: "Research and Develop a Topic — Applied Digital Skills", link: "https://edu.exceedlms.com/student/path/1607219-research-and-develop-a-topic", type: "Official Google course / English", duration: "Course page", covers: "Search strategies, research notes, credible sources, bias checking.", output: "Research sheet with source links" },
  { order: 13, title: "Communication + Employability", linkLabel: "TCS iON Career Edge — Young Professional", link: "https://www.tcsion.com/courses/career-edge-young-professional/", type: "Official TCS course / English", duration: "15-day self-paced course", covers: "Communication, workplace skills, professional behaviour, career preparedness.", output: "Self-introduction + workplace notes" },
  { order: 14, title: "Resume + Interview support", linkLabel: "TCS iON Career Edge — Interview & Job Readiness", link: "https://www.tcsion.com/courses/career-edge-interview-and-job-readiness/", type: "Official TCS course / English", duration: "15-day self-paced course", covers: "Resume creation, interview preparation, business etiquette, online profile.", output: "Resume improvement + interview practice" },
  { order: 15, title: "AI Basics + Safe AI Use", linkLabel: "YUVA AI for All — IndiaAI & TCS iON", link: "https://www.tcsion.com/courses/yuva-ai/", type: "Official course / IndiaAI + TCS iON", duration: "6 modules / self-paced", covers: "AI basics, AI applications, prompting, ethics, future of AI.", output: "AI-use checklist + 5 useful prompts" },
  { order: 16, title: "Online Safety", linkLabel: "I4C Cyber Awareness Videos — Ministry of Home Affairs", link: "https://i4c.mha.gov.in/cyber-awareness-videos.aspx", type: "Official Govt video page / multilingual", duration: "Video gallery", covers: "Job scams, fake links, digital arrest scams, online fraud, cyber hygiene.", output: "Online safety checklist" },
  { order: 17, title: "Cyber Safety support", support: true, linkLabel: "NCERT Cyber Safety & Security", link: "https://ciet.ncert.gov.in/cyber-safety-security", type: "Official NCERT resource / Hindi + English", duration: "Resource page", covers: "Student cyber safety, cyber hygiene, digital footprint, safe online learning.", output: "Cyber safety notes" },
];

const foundationChecklist = [
  "Professional email sample",
  "Foundation portfolio folder link (Google Drive folder created and shared correctly)",
  "One formatted Google Docs document",
  "Resume PDF",
  "Basic Google Sheets tracker",
  "Research sheet with source links",
  "Self-introduction script or short video",
  "AI-use checklist",
  "Online safety checklist",
];

// ─────────────────────────── Skill track modules ───────────────────────────

const track1Modules: TrackModule[] = [
  { order: 1, title: "Typing Accuracy", linkLabel: "Typing.com — Free Typing Lessons", link: "https://www.typing.com/student/lessons", type: "Interactive practice / English", duration: "Self-paced", covers: "Typing speed, accuracy, keyboard confidence.", jobObjective: "Data entry, admin assistant", output: "Typing speed + accuracy screenshot" },
  { order: 2, title: "Alphanumeric Data Entry", linkLabel: "Typing.com — Alphanumeric Data Entry", link: "https://www.typing.com/student/lesson/353/alphanumeric-data-entry", type: "Interactive practice / English", duration: "27 screens", covers: "Names, numbers, IDs, codes and mixed text-number entry.", jobObjective: "Data entry, MIS support", output: "Alphanumeric practice screenshot" },
  { order: 3, title: "Excel for Office Data Work", linkLabel: "MS Excel Full Course (Hindi)", link: "https://www.youtube.com/playlist?list=PLXwTOG3-tRwgy4lJ9j_CPwpJmr2uCaGH1", type: "YouTube playlist / Hindi", duration: "Playlist", covers: "Excel basics, formulas, formatting, data entry and office-use spreadsheet skills.", jobObjective: "Data entry, MIS assistant, office assistant", output: "Excel data table + formatted worksheet" },
  { order: 4, title: "Excel Data Cleaning", linkLabel: "Top 10 Ways to Clean Data in Excel", link: "https://www.youtube.com/watch?v=6ia0h_pWW1A", type: "YouTube video / Hindi-Hinglish", duration: "Single video", covers: "Cleaning messy Excel data, removing errors, duplicates and improving data quality.", jobObjective: "Data entry, MIS assistant", output: "Cleaned data sheet" },
  { order: 5, title: "MIS Report + Dashboard Basics", linkLabel: "MIS Report in Excel Hindi — Deepak EduWorld", link: "https://www.youtube.com/watch?v=ESEKNZ6onBE", type: "YouTube video / Hindi", duration: "Single video", covers: "Creating an MIS report in Excel; charts and summary views.", jobObjective: "MIS assistant, reporting assistant", output: "Simple MIS report/dashboard" },
  { order: 6, title: "Google Forms for Data Collection", linkLabel: "Google Forms Complete Tutorial in Hindi", link: "https://www.youtube.com/watch?v=53_Bq7mmRvE", type: "YouTube video / Hindi", duration: "Single video", covers: "Creating Google Forms, collecting responses and using form data.", jobObjective: "NGO data assistant, research assistant", output: "Survey form + response sheet" },
  { order: 7, title: "Online Research — Search Skills", linkLabel: "Google Advanced Search Tutorial in Hindi", link: "https://www.youtube.com/watch?v=xkS1yHu9hz8", type: "YouTube video / Hindi", duration: "Single video", covers: "Better Google searching, advanced search methods and finding useful information.", jobObjective: "Research assistant, admin assistant", output: "Research sheet with useful links" },
  { order: 8, title: "Online Research — Source Checking", linkLabel: "Crash Course: Navigating Digital Information", link: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtN07XYqqWSKpPrtNDiCHTzU", type: "YouTube playlist / English + captions", duration: "10 main videos", covers: "Fact-checking, lateral reading, credible sources and misinformation checking.", jobObjective: "Research assistant, content support", output: "Verified research database" },
  { order: 9, title: "Professional Email for Admin Work", linkLabel: "How To Write Professional Email? (Hindi/English)", link: "https://www.youtube.com/watch?v=rGrH-IGHS9w", type: "YouTube video / Hindi + English", duration: "Single video", covers: "Professional email writing, structure, tone, subject line and workplace email confidence.", jobObjective: "Admin assistant, virtual assistant", output: "3 admin email templates" },
  { order: 10, title: "Task Tracker for Work Management", linkLabel: "How to Create a Task Tracker in Excel (Hindi)", link: "https://www.youtube.com/watch?v=lAY-A5maEZk", type: "YouTube video / Hindi", duration: "Single video", covers: "Creating a daily task tracker in Excel for work follow-up and accountability.", jobObjective: "Virtual assistant, admin assistant", output: "Weekly task tracker" },
  { order: 11, title: "Basic CRM / Contact Follow-up Tracker", linkLabel: "CRM Kya Hota Hai? Free CRM in Excel (Hindi)", link: "https://www.youtube.com/watch?v=78nNpZCkGsA", type: "YouTube video / Hindi", duration: "Single video", covers: "Basic customer data, lead organization and follow-up tracking in Excel.", jobObjective: "Admin assistant, sales support, research assistant", output: "Contact/lead follow-up tracker" },
  { order: 12, title: "Short Report Writing", linkLabel: "Report Writing in Business Communication (Hindi)", link: "https://www.youtube.com/watch?v=eX5RQEmXO_U", type: "YouTube video / Hindi", duration: "Single video", covers: "Meaning, features and structure of report writing for business communication.", jobObjective: "NGO documentation, admin reporting", output: "One-page activity/work report" },
  { order: 13, title: "Data Privacy for Admin Work", linkLabel: "Security Awareness: Data Handling", link: "https://www.youtube.com/watch?v=hsNRrEnB_aM", type: "YouTube video / English", duration: "Single video", covers: "Handling data safely, protecting information and avoiding careless data sharing.", jobObjective: "Data entry, NGO data assistant", output: "Data handling checklist" },
  { order: 14, title: "AI for Admin Productivity", linkLabel: "Microsoft Copilot Tutorial for Beginners (Hindi)", link: "https://www.youtube.com/watch?v=XBEX7Pqc8_0", type: "YouTube video / Hindi", duration: "Single video", covers: "Using free Copilot for drafting, summarising, searching and productivity support.", jobObjective: "Virtual assistant, admin assistant", output: "AI-assisted admin report with disclosure" },
  // Module 15 "Final Portfolio Assembly" removed per review — it duplicates the final
  // portfolio section (see portfolioChecklist + the Submit Track Portfolio box).
];

// Track 2 rebuilt per review: matched learning resource + CLICKABLE practice links.
const track2Modules: TrackModule[] = [
  { order: 1, title: "Design Foundations", linkLabel: "Graphic Design Basics — Canva Design School", link: "https://www.canva.com/design-school/courses/graphic-design-basics-from-the-experts", type: "Official course / English", duration: "Course page", covers: "Typography, color, alignment, visual hierarchy, spacing and layout basics.", jobObjective: "Visual design intern, poster designer", output: "Before/after poster improvement", practiceLinks: [{ label: "Canva Poster Maker", url: "https://www.canva.com/create/posters/" }] },
  { order: 2, title: "Canva Basics + Core Creative Pack", linkLabel: "Canva Tutorial Beginners to Advance (Hindi)", link: "https://www.youtube.com/watch?v=loQ5X5-67so", type: "YouTube video / Hindi", duration: "Single long video", covers: "Canva interface, tools, poster, flyer and Instagram post design.", jobObjective: "Visual design assistant, Canva designer", output: "1 poster + 1 flyer + 1 social post", practiceLinks: [{ label: "Poster Maker", url: "https://www.canva.com/create/posters/" }, { label: "Flyer Maker", url: "https://www.canva.com/create/flyers/" }, { label: "Instagram Post Maker", url: "https://www.canva.com/create/instagram-posts/" }] },
  { order: 3, title: "Carousel Design", linkLabel: "Instagram Carousel Tutorial with Canva (Hindi)", link: "https://www.youtube.com/watch?v=87fyCyhCxGc", type: "YouTube video / Hindi", duration: "Single video", covers: "Seamless carousel structure, slide-to-slide continuity and consistent design.", jobObjective: "Social media designer, NGO campaign assistant", output: "5-slide carousel", practiceLinks: [{ label: "Canva Carousel Templates", url: "https://www.canva.com/instagram-posts/templates/carousel/" }] },
  { order: 4, title: "YouTube Thumbnail Design", linkLabel: "Canva se YouTube Thumbnail Kaise Banaye (Hindi)", link: "https://www.canva.com/hi_in/banaye/youtube-thumbnails/", type: "Official Canva Hindi guide", duration: "Guide page", covers: "YouTube thumbnail purpose, bold text, image focus, templates and export.", jobObjective: "Thumbnail designer, creator support", output: "1 YouTube thumbnail", practiceLinks: [{ label: "Canva YouTube Thumbnail Maker", url: "https://www.canva.com/create/youtube-thumbnails/" }] },
  { order: 5, title: "Banner / Cover Design", linkLabel: "How to Make a YouTube Banner for Free — Canva", link: "https://www.youtube.com/watch?v=3tdt4QovI_M", type: "YouTube video / English", duration: "Single video", covers: "Creating and resizing channel banners and covers across platforms.", jobObjective: "Banner designer, creator support", output: "1 YouTube/channel banner", practiceLinks: [{ label: "Canva YouTube Banner Maker", url: "https://www.canva.com/create/youtube-banners/" }] },
  { order: 6, title: "Logo Concept Basics", linkLabel: "How to Make Logo in Canva (Hindi)", link: "https://www.youtube.com/watch?v=kEDcQcui4kI", type: "YouTube video / Hindi", duration: "Single video", covers: "Simple logo concept, font choice, icon use and beginner logo making.", jobObjective: "Beginner brand assistant", output: "1 simple logo concept", practiceLinks: [{ label: "Canva Logo Maker", url: "https://www.canva.com/create/logos/" }] },
  { order: 7, title: "Brand Consistency / Mini Brand Kit", linkLabel: "How to Set Up a Brand Kit in Canva", link: "https://www.youtube.com/watch?v=V5uWPkMLcaw", type: "YouTube video / English", duration: "Single video", covers: "Logo placement, colors, fonts and consistent brand style across designs.", jobObjective: "Brand assistant, social creative assistant", output: "Mini brand kit: logo, colors, fonts, usage rules", practiceLinks: [{ label: "Canva Brand Kit", url: "https://www.canva.com/brand/" }, { label: "Brand Kit Guide", url: "https://www.canva.com/learn/how-to-build-a-brand-kit/" }] },
  { order: 8, title: "Adobe Express Alternative Tool", linkLabel: "Adobe Express Beginner Tutorial in Hindi", link: "https://www.youtube.com/watch?v=waBrgLblYFA", type: "YouTube video / Hindi", duration: "Single video", covers: "Adobe Express basics so students are not dependent only on Canva.", jobObjective: "Tool-flexible design assistant", output: "Same poster recreated in Adobe Express", practiceLinks: [{ label: "Adobe Express Create", url: "https://www.adobe.com/express/create" }] },
  { order: 9, title: "Photo Editing + Background Cleanup", linkLabel: "Photopea Tutorial for Beginners in 13 Minutes", link: "https://www.youtube.com/watch?v=a3aPaTNV5g4", type: "YouTube video / English", duration: "Single video", covers: "Basic photo editing, crop, resize, layers and quick cleanup.", jobObjective: "Thumbnail/banner/poster assistant", output: "Clean product/person image for design", practiceLinks: [{ label: "Photopea Free Online Editor", url: "https://www.photopea.com/" }] },
  { order: 10, title: "Campaign Creative Pack", linkLabel: "How to Make a Social Media Campaign Ad in Canva", link: "https://www.youtube.com/watch?v=3tdt4QovI_M", type: "YouTube video / English", duration: "Single video", covers: "Creating reusable social media campaign creatives and resizing for platforms.", jobObjective: "Campaign creative assistant", output: "7-day campaign creative pack", practiceLinks: [{ label: "Canva Social Media Creator", url: "https://www.canva.com/create/social-media-graphics/" }] },
  { order: 11, title: "Basic UI Visual Design", support: true, supportLabel: "Optional / Advanced", linkLabel: "Figma Design for Beginners 2025 — Official Playlist", link: "https://www.youtube.com/playlist?list=PLXDU_eVOJTx5IuSrbtanZHnDuPB3Hx0hq", type: "Official Figma playlist / English", duration: "Playlist", covers: "Frames, text, shapes, auto layout, components and prototyping.", note: "Optional/advanced — great if you want UI work, but not required to complete the track or submit your portfolio.", jobObjective: "Beginner UI visual support", output: "2 basic mobile UI screens (optional)", practiceLinks: [{ label: "Figma Starter (Free)", url: "https://www.figma.com/pricing/" }] },
  { order: 12, title: "AI for Design Support", linkLabel: "Canva Magic Design Tutorial", link: "https://www.youtube.com/watch?v=x7-XSJHcaVI", type: "YouTube video / Hindi-English", duration: "Single video", covers: "AI-assisted design ideas, creative variations and productivity support.", jobObjective: "AI-assisted design assistant", output: "AI-assisted design concept with disclosure", practiceLinks: [{ label: "Canva Magic Design", url: "https://www.canva.com/magic-design/" }, { label: "Canva AI Tools", url: "https://www.canva.com/ai-image-generator/" }] },
  { order: 13, title: "Client Brief Practice Lab", linkLabel: "Practice with real-style design briefs", link: "https://goodbrief.io/", watchLabel: "Open Practice Briefs", type: "Practice activity / English", duration: "Practice resource", covers: "This is a practice activity, not a video lesson — generate real-style client briefs and design to them for your portfolio.", jobObjective: "Portfolio and client-brief readiness", output: "2 practice brief projects", practiceLinks: [{ label: "GoodBrief", url: "https://goodbrief.io/" }, { label: "FakeClients", url: "https://fakeclients.com/graphicdesign" }], },
  // Primary "Open Practice Briefs" button points at GoodBrief; the two generators appear as practice buttons.
  { order: 14, title: "Portfolio Presentation & Final Submission", linkLabel: "How to Make a Graphic Design Portfolio Using Canva", link: "https://www.youtube.com/watch?v=Bl3BiL5-4NQ", type: "YouTube video / English", duration: "Single video", covers: "Building and presenting a simple design portfolio for opportunities.", jobObjective: "Internship/freelance readiness", output: "Final portfolio PDF/link", practiceLinks: [{ label: "Canva Portfolio Website Maker", url: "https://www.canva.com/create/websites/portfolio/" }] },
  { order: 15, title: "Free Design Tools & Safe Free Usage", linkLabel: "Canva Licensing / Adobe Express / Figma / Photopea", link: "https://www.canva.com/policies/content-license-agreement/", watchLabel: "Check Free Tool Rules", type: "Reading / checking", duration: "Reading/check page", covers: "Free vs paid tools, watermark risk, Pro assets, licensing, and when not to buy.", note: "Use free tools first. Avoid Canva crown/pro elements, paid templates, watermark assets and unnecessary subscriptions. Upgrade only after client work, internship need or earning.", jobObjective: "Cost-safe work readiness", output: "Tool choice sheet + avoid-paid-assets checklist", practiceLinks: [{ label: "Canva Pricing", url: "https://www.canva.com/pricing/" }, { label: "Adobe Express", url: "https://www.adobe.com/express/pricing" }, { label: "Figma Pricing", url: "https://www.figma.com/pricing/" }, { label: "Photopea", url: "https://www.photopea.com/" }] },
];

// Track 3 per review: clickable practice matched to each lesson; Module 14 removed
// (kept only as the final campaign portfolio project). M3/M11/M12 practice adjusted so
// no student needs a real business page / their own site data.
const track3Modules: TrackModule[] = [
  { order: 1, title: "Digital Marketing Overview", linkLabel: "Digital Marketing with AI — WsCube Tech", link: "https://www.youtube.com/watch?v=kunkYTKFNtI", type: "YouTube video / Hindi-English", duration: "~4 hours", covers: "Digital marketing basics, SEO, social media, AI in marketing, beginner workflow.", jobObjective: "Digital marketing intern", output: "Digital marketing glossary + notes", practiceLinks: [{ label: "Google Docs", url: "https://docs.google.com/document/u/0/create" }] },
  { order: 2, title: "Social Media Marketing Basics", linkLabel: "HP LIFE — Social Media Marketing", link: "https://www.life-global.org/course/25-social-media-marketing", type: "Free course / English", duration: "~1 hour", covers: "Social platforms, promoting products/services, and creating a targeted Facebook ad.", jobObjective: "Social media intern", output: "Social media platform comparison sheet", practiceLinks: [{ label: "Google Sheets", url: "https://sheets.google.com/create" }] },
  { order: 3, title: "Meta Business Suite / Scheduling", linkLabel: "Ultimate Meta Business Suite Tutorial", link: "https://www.youtube.com/watch?v=nbExu4fX4zY", type: "YouTube video / English", duration: "Single video + practice", covers: "Managing Facebook/Instagram content and scheduling. No business page needed — plan the 7-day schedule in Google Sheets.", jobObjective: "Social media assistant", output: "7-day scheduled-post plan", practiceLinks: [{ label: "Meta Business Suite", url: "https://business.facebook.com/latest/home" }, { label: "Google Sheets", url: "https://sheets.google.com/create" }] },
  { order: 4, title: "Caption Writing + Copywriting", linkLabel: "Copywriting Full Course in Hindi", link: "https://www.youtube.com/watch?v=pd-Jq3iOzx8", type: "YouTube video / Hindi", duration: "Single video + practice", covers: "Hooks, headlines, captions, persuasive writing, ad-style copy.", jobObjective: "Caption writer, social media intern", output: "20 captions + 5 hooks", practiceLinks: [{ label: "Google Docs", url: "https://docs.google.com/document/u/0/create" }] },
  { order: 5, title: "Content Writing Basics", linkLabel: "Content Writing Complete Course — WsCube Tech", link: "https://www.youtube.com/watch?v=J2h0Xb0WNwQ", type: "YouTube video / Hindi", duration: "Single video + practice", covers: "Content writing process, article structure, beginner web content writing.", jobObjective: "Content writing intern", output: "700-word article draft", practiceLinks: [{ label: "Google Docs", url: "https://docs.google.com/document/u/0/create" }] },
  { order: 6, title: "Content Calendar Planning", linkLabel: "How to Make a Social Media Content Calendar (Hindi)", link: "https://www.youtube.com/watch?v=Jec6m9MbnlU", type: "YouTube video / Hindi", duration: "Single video + practice", covers: "Planning post dates, content type, platform, status and posting schedule.", jobObjective: "Social media assistant", output: "14-day content calendar", practiceLinks: [{ label: "Google Sheets", url: "https://sheets.google.com/create" }, { label: "Google Calendar", url: "https://calendar.google.com/" }] },
  { order: 7, title: "Trend Research for Content Ideas", linkLabel: "Google Trends Official Tutorials", link: "https://www.youtube.com/playlist?list=PLKoqnv2vTMUO8MUpCbVIiBaDZYrpNF8f-", type: "Official YouTube playlist / English", duration: "Use basic videos only", covers: "Finding trends, comparing topics, using search interest for content strategy.", jobObjective: "Content assistant", output: "Trend research sheet", practiceLinks: [{ label: "Google Trends", url: "https://trends.google.com/trends/" }] },
  { order: 8, title: "Keyword Research Basics", linkLabel: "Google Keyword Planner Tutorial 2025 (Hindi)", link: "https://www.youtube.com/watch?v=tnX6i3tAu08", type: "YouTube video / Hindi", duration: "Single video + practice", covers: "Keyword ideas, search intent, content topics and SEO keyword planning (no paid ads needed).", jobObjective: "SEO trainee, content assistant", output: "Keyword research sheet", practiceLinks: [{ label: "Google Keyword Planner", url: "https://ads.google.com/home/tools/keyword-planner/" }, { label: "Google Trends", url: "https://trends.google.com/trends/" }] },
  { order: 9, title: "On-Page SEO Basics", linkLabel: "Complete On-Page SEO for Beginners (Hindi)", link: "https://www.youtube.com/watch?v=AQ5-L345SGI", type: "YouTube video / Hindi", duration: "~1h 52m", covers: "SEO title, headings, meta description, URL, internal linking and basic on-page SEO.", jobObjective: "SEO trainee", output: "SEO title + meta description set", practiceLinks: [{ label: "Google Docs", url: "https://docs.google.com/document/u/0/create" }, { label: "Google SEO Starter Guide", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" }] },
  { order: 10, title: "SEO Content Writing", linkLabel: "SEO Content Writing Full Course (Hindi)", link: "https://www.youtube.com/watch?v=k6QQlRc12YQ", type: "YouTube video / Hindi", duration: "Single video + practice", covers: "Writing content using keyword, title, headings, intent and readability.", jobObjective: "SEO content assistant", output: "700-word SEO article", practiceLinks: [{ label: "Google Docs", url: "https://docs.google.com/document/u/0/create" }] },
  { order: 11, title: "Local Business Marketing", linkLabel: "Google Business Profile Full Course (Hindi)", link: "https://www.youtube.com/watch?v=MPvSFYqaQnI", type: "YouTube video / Hindi", duration: "Single full-course video", covers: "Review a real/sample local business and prepare an improvement checklist — do NOT create a fake listing.", jobObjective: "Local business marketing assistant", output: "Local business profile improvement checklist", practiceLinks: [{ label: "Google Business Profile", url: "https://www.google.com/business/" }, { label: "Google Docs", url: "https://docs.google.com/document/u/0/create" }] },
  { order: 12, title: "Basic Analytics / Reporting", linkLabel: "Complete Google Analytics 4 Tutorial (Hindi)", link: "https://www.youtube.com/watch?v=DAaY-2SmD9A", type: "YouTube video / Hindi", duration: "Use beginner/reporting parts", covers: "Basic GA4 reports using the public Demo Account, so every student can practise without their own site.", jobObjective: "Analytics/reporting assistant", output: "Simple analytics report", practiceLinks: [{ label: "Google Analytics Demo Account", url: "https://support.google.com/analytics/answer/6367342" }] },
  { order: 13, title: "AI for Content Productivity", linkLabel: "Microsoft Copilot Tutorial for Beginners (Hindi)", link: "https://www.youtube.com/watch?v=XBEX7Pqc8_0", type: "YouTube video / Hindi", duration: "Single video + practice", covers: "Idea generation, caption variation, rewriting, summarising and content improvement with disclosure.", jobObjective: "Content assistant, marketing assistant", output: "AI-assisted content pack with disclosure", practiceLinks: [{ label: "Microsoft Copilot", url: "https://copilot.microsoft.com/" }, { label: "Google Docs", url: "https://docs.google.com/document/u/0/create" }] },
  // Module 14 "Final Campaign Simulation" removed per review — it's the final assessment,
  // kept only as the final campaign project in the portfolio checklist below.
];

const track4Modules: TrackModule[] = [
  { order: 1, title: "Customer Support Basics", linkLabel: "HP LIFE — Customer Experience for Business Success", link: "https://www.life-global.org/course/390-customer-experience-%28cx%29-for-business-success", type: "Free course / English", duration: "1 hour", practiceTool: "Customer journey worksheet", covers: "Customer needs, service quality, listening, customer experience.", jobObjective: "Customer support trainee", output: "Customer service checklist" },
  { order: 2, title: "Customer Service Role Understanding", linkLabel: "Understanding the Customer Services — Skill India Digital", link: "https://www.skillindiadigital.gov.in/courses/detail/a1fabb4a-d467-46d5-a556-ffe5c8b7fac7", type: "Official course / English", duration: "1–2 hours", practiceTool: "Notes in app", covers: "Customer needs, expectations, customer types and simple customer communication techniques.", jobObjective: "Customer care assistant", output: "Customer-support role notes" },
  { order: 3, title: "Voice Call Handling", linkLabel: "Customer Care Executive — Domestic Voice (Skill India)", link: "https://www.skillindiadigital.gov.in/courses/detail/97abc865-14d4-4387-8471-ec506d4fc41c", type: "Official course / English", duration: "1–2 hours", practiceTool: "Mock call practice", covers: "Telephone call handling, responding to inquiries, resolving common issues using a computerized system.", jobObjective: "Voice support trainee, telecaller", output: "2 call scripts + 1 mock call recording" },
  { order: 4, title: "Chat + Email Support", linkLabel: "Customer Care Executive — Domestic Non-Voice (Skill India)", link: "https://www.skillindiadigital.gov.in/courses/detail/2646bcb9-942c-4b3e-bc69-4514164255d0", type: "Official course / English", duration: "1–2 hours", practiceTool: "Chat/email practice", covers: "Non-voice customer support, chat/email query handling, problem-solving and service best practices.", jobObjective: "Chat support assistant, email support assistant", output: "5 chat replies + 3 email replies" },
  { order: 5, title: "Complaint Handling + Empathy", linkLabel: "5 Tips: How to Deal With an Angry Customer (Hindi)", link: "https://www.youtube.com/watch?v=nIpdcqMshQ8", type: "YouTube video / Hindi", duration: "30–45 minutes", practiceTool: "Complaint role-play", covers: "Calm response, empathy, apology, solution and follow-up.", jobObjective: "Customer support trainee", output: "3 complaint response scripts" },
  { order: 6, title: "Basic CRM + Follow-up Tracking", linkLabel: "HP LIFE — Customer Relationship Management", link: "https://www.life-global.org/course/35-customer-relationship-management", type: "Free course / English", duration: "1 hour", practiceTool: "Google Sheets follow-up tracker", covers: "Customer details, customer status, next action, follow-up date and relationship tracking.", jobObjective: "Sales support, customer follow-up assistant", output: "Follow-up tracker + 2 follow-up scripts" },
  { order: 7, title: "Ticket / Helpdesk Workflow", linkLabel: "Freshdesk Ticketing System Tutorial for Beginners", link: "https://www.youtube.com/watch?v=cVi5AT1LmMI", type: "YouTube video / English", duration: "45–60 minutes", practiceTool: "Google Sheets ticket log", covers: "Ticket ID, issue, priority, status, assigned person, next action and resolution note.", jobObjective: "Helpdesk assistant beginner", output: "Ticket log with 5 sample cases" },
  { order: 8, title: "Customer Data Handling + Privacy", linkLabel: "Employee Security Awareness Training Course", link: "https://www.youtube.com/playlist?list=PL8aNZrkOMXGNo-GpLDFvq-6ArwLAgTdvr", type: "YouTube playlist / English", duration: "Use basic videos only", practiceTool: "Customer data safety checklist", covers: "Safe handling of names, phone numbers, emails, screenshots, complaints, payment/order details, phishing and password safety.", jobObjective: "Customer support, chat support, telecaller", output: "Customer data-handling checklist" },
  { order: 9, title: "Role-Specific Interview Practice", linkLabel: "Customer Service Executive Interview Questions (Hindi)", link: "https://www.youtube.com/watch?v=0s7U832tt6E", type: "YouTube video / Hindi", duration: "45–60 minutes", covers: "Customer-support-specific interview questions and answers.", jobObjective: "Customer support applicant", output: "Mock interview recording" },
  // Module 10 "Final Customer Support Simulation" removed per review — it is the final
  // project, not a new lesson. Kept only in the portfolio checklist (see portfolioNote).
];

const track5Modules: TrackModule[] = [
  { order: 1, title: "Front-end Web Development Foundation", linkLabel: "HTML/CSS/JS beginner playlist (Hindi)", link: "https://www.youtube.com/playlist?list=PLu0W_9lII9agiCUZYRsvtGTXdxkzPyItg", type: "YouTube playlist / Hindi", duration: "Selected lessons", covers: "HTML, CSS, basic JavaScript, and how websites work. Create a simple Student Profile / About Me webpage.", jobObjective: "Beginner web developer", output: "Basic webpage screenshot or file", learnLinks: [{ label: "Additional learning: Skill India Digital web course", url: "https://www.skillindiadigital.gov.in/courses" }], practiceLinks: [{ label: "CodePen", url: "https://codepen.io/pen/" }, { label: "VS Code for the Web", url: "https://vscode.dev/" }] },
  { order: 2, title: "Build One Complete Website Project", linkLabel: "Responsive website project (Hindi)", link: "https://www.youtube.com/watch?v=8KVrdL0VcAk", type: "YouTube video / Hindi", duration: "Project practice", covers: "Apply HTML, CSS, and basic JavaScript into one real project (profile / NGO / small business / portfolio page).", jobObjective: "Junior web developer", output: "Complete website project screenshot/file", learnLinks: [{ label: "Alternative Learning Video", url: "https://www.youtube.com/watch?v=GeykycZ4Ixs" }], practiceLinks: [{ label: "CodePen", url: "https://codepen.io/pen/" }, { label: "VS Code for the Web", url: "https://vscode.dev/" }] },
  { order: 3, title: "GitHub Upload, README & Live Link", linkLabel: "Upload a project to GitHub + GitHub Pages", link: "https://www.youtube.com/watch?v=ussgXhJ-cp0", type: "YouTube video + GitHub docs", duration: "Single session", covers: "Create a GitHub repository, upload project files, add/edit README, and publish a live website link.", jobObjective: "Open-source / web contributor", output: "GitHub repository link + README + live website link", learnLinks: [{ label: "GitHub Docs: Upload Project", url: "https://docs.github.com/en/get-started/using-git/adding-locally-hosted-code-to-github" }, { label: "GitHub Pages Guide", url: "https://www.youtube.com/watch?v=py3jo9C02cA" }] },
  // Module 4 "Final Tech Portfolio Submission" removed per review — it is the submission
  // step, not a lesson. Handled in the Submit Track Portfolio section (track shows 0/3).
];

// ─────────────────────────── Tracks (foundation + 5 skill tracks) ───────────────────────────

export const foundationTrack: Track = {
  id: "df",
  kind: "digitalFoundation",
  title: "Digital Foundation",
  summary: "Compulsory basics everyone completes first: digital literacy, email, Drive, Docs, Sheets, resume, research, communication, AI basics and cyber safety.",
  externalLink: "https://learndigital.withgoogle.com/",
  learn: ["Digital literacy & devices", "Gmail, Drive, Docs, Sheets", "Resume & online research", "Communication & employability", "AI basics + online safety"],
  practiceTask: "Work through all 17 foundation modules and collect each module's output.",
  requiredOutput: "Foundation portfolio: email sample, Drive folder, formatted doc, resume PDF, tracker, research sheet, self-introduction, AI-use checklist, safety checklist.",
  progress: 0,
  locked: false,
  glyph: "🧱",
  tagline: "Your compulsory launchpad.",
  modules: foundationModules,
  portfolioChecklist: foundationChecklist,
};

export const skillTracks: Track[] = [
  {
    id: "t1", kind: "skillTrack", title: "Digital Work Assistant",
    summary: "Office productivity and digital admin: typing, Excel, MIS, forms, research, email, trackers and AI for admin work.",
    externalLink: "https://www.typing.com/student/lessons",
    learn: ["Typing & data entry", "Excel + data cleaning + MIS", "Forms, research & email", "Task/CRM trackers", "AI for admin productivity"],
    practiceTask: "Complete the 14 Digital Work modules and produce each output.",
    requiredOutput: "Digital Work Assistant portfolio (tracker, MIS report, email templates, cleaned data, AI-assisted report).",
    progress: 0, locked: false, glyph: "🗂️", tagline: "For local jobs & office work.",
    modules: track1Modules,
    portfolioChecklist: ["Typing speed/accuracy screenshot", "Alphanumeric data entry practice screenshot", "Excel data table + formatted worksheet", "Cleaned Excel / Google Sheets data file", "MIS report / dashboard", "Google Form + response sheet", "Research sheet with useful links", "Verified research database", "3 professional email templates", "Weekly task tracker", "Contact / lead follow-up tracker", "One-page activity / work report", "Data handling checklist", "AI-assisted admin report with disclosure", "Final work simulation project"],
    portfolioNote: "Final work simulation project: create one combined admin work folder for a sample NGO, event or small business. It should include a Google Form, response sheet, cleaned data, MIS summary, task tracker, contact follow-up tracker, email templates and a one-page report. This stays in the final portfolio section only — no separate course needed.",
  },
  {
    id: "t2", kind: "skillTrack", title: "Visual Design + Social Media Creative Assistant",
    summary: "Create posters, social posts, carousels, thumbnails, banners, a logo, a mini brand kit and a design portfolio.",
    externalLink: "https://www.canva.com/design-school/",
    learn: ["Design foundations", "Canva + Adobe Express", "Posters, posts, carousels, thumbnails", "Logo + brand kit", "AI design + portfolio"],
    practiceTask: "Complete the 15 design modules and build the creative portfolio.",
    requiredOutput: "Design portfolio: posters, posts, carousel, thumbnail, banner, logo, brand kit, campaign pack, UI screens.",
    progress: 0, locked: false, glyph: "🎨", tagline: "For creative, mobile-friendly work.",
    modules: track2Modules,
    portfolioChecklist: ["Before/after poster improvement", "1 poster", "1 flyer", "3 social media posts", "1 carousel", "1 YouTube thumbnail", "1 banner / cover design", "1 simple logo concept", "1 mini brand kit", "Same poster recreated in Adobe Express", "Clean product/person image for design", "1 seven-day campaign creative pack", "Optional: 2 basic mobile UI screens", "1 AI-assisted design project with disclosure", "2 client brief practice projects", "Tool choice sheet + avoid-paid-assets checklist", "Final portfolio PDF or Canva portfolio link"],
    portfolioNote: "The mobile UI screens (Figma) are optional/advanced — leaving them out will not block your portfolio if you are targeting poster/social-media design work.",
  },
  {
    id: "t3", kind: "skillTrack", title: "Content + Digital Marketing Assistant",
    summary: "Write and market content: copywriting, content writing, SEO, calendars, keywords, local marketing, analytics and AI content.",
    externalLink: "https://www.life-global.org/course/25-social-media-marketing",
    learn: ["Digital marketing basics", "Copywriting & content writing", "SEO + keywords", "Content calendar & analytics", "AI for content"],
    practiceTask: "Complete the 13 content & marketing modules, then assemble the final campaign project.",
    requiredOutput: "Marketing portfolio: articles, captions, calendar, keyword & SEO sheets, campaign plan + report.",
    progress: 0, locked: false, glyph: "✍️", tagline: "For writing & marketing work.",
    modules: track3Modules,
    portfolioChecklist: ["Digital marketing glossary + notes", "Social media platform comparison sheet", "7-day scheduled-post plan", "20 captions + 5 hooks", "700-word article", "14-day content calendar", "Trend research sheet", "Keyword research sheet", "SEO title + meta description set", "700-word SEO article", "Local business improvement checklist", "Simple analytics report", "AI-assisted content pack with disclosure", "Final 14-day campaign plan + report"],
    portfolioNote: "Final 14-day campaign plan + report: combine your captions, content calendar, trend research, keyword research, SEO article, local business checklist, analytics report and AI-assisted content into one simple campaign plan. This is the final portfolio project — not a separate course.",
  },
  {
    id: "t4", kind: "skillTrack", title: "Customer Support Assistant",
    summary: "Support workflows: voice, chat/email, complaint handling, CRM follow-up, ticketing, data privacy and interview practice.",
    externalLink: "https://www.life-global.org/course/390-customer-experience-%28cx%29-for-business-success",
    learn: ["Customer experience basics", "Voice + chat/email support", "Complaint handling & empathy", "CRM + ticketing workflow", "Data privacy + interview practice"],
    practiceTask: "Complete the 9 support modules, then assemble the final support simulation in your portfolio.",
    requiredOutput: "Support portfolio: scripts, chat/email replies, follow-up tracker, ticket log, data-handling checklist, mock interview.",
    progress: 0, locked: false, glyph: "🎧", tagline: "For talking to & helping people.",
    modules: track4Modules,
    portfolioChecklist: ["Customer service checklist", "Customer-support role notes", "2 call scripts", "1 mock call recording", "5 chat replies", "3 email replies", "3 complaint response scripts", "Follow-up tracker", "2 follow-up scripts", "Ticket log with 5 sample cases", "Customer data-handling checklist", "Mock interview recording", "Final customer support simulation"],
    portfolioNote: "Final customer support simulation: create one complete sample support case from query to closure — the customer issue, first response, call/chat/email reply, complaint handling, follow-up tracker entry, ticket log entry and a final resolution note. This lives in the final portfolio only.",
  },
  {
    id: "t5", kind: "skillTrack", title: "Beginner Web / Tech / Open Source",
    summary: "Build a real website with HTML/CSS/JS, upload it to GitHub with a README, and publish a live link via GitHub Pages.",
    externalLink: "https://www.youtube.com/playlist?list=PLu0W_9lII9agiCUZYRsvtGTXdxkzPyItg",
    learn: ["HTML, CSS, basic JavaScript", "One complete website project", "GitHub upload + README", "GitHub Pages live link"],
    practiceTask: "Build one website, upload to GitHub, publish with GitHub Pages, then submit the final tech portfolio.",
    requiredOutput: "Beginner Web Project Portfolio: live link + GitHub repo + README + screenshot + short reflection.",
    progress: 0, locked: false, glyph: "💻", tagline: "For web, tech & open-source roles.",
    modules: track5Modules,
    portfolioChecklist: ["Basic webpage (About Me / Student Profile)", "Complete website project", "Basic styling", "Basic JavaScript or interaction (preferred, not compulsory)", "GitHub repository link", "README file", "Live website link (or screenshot + repo)", "Screenshot of final project", "Short reflection (3–4 lines)", "Project Links Document (GitHub repo link, live link, student name, short reflection)"],
    portfolioNote: "For this track, GitHub repo link, live website link and a screenshot are the most important proof. Add one simple Project Links Document inside your Drive folder containing your GitHub repo link, live website link, your name and a short reflection. Basic JavaScript is preferred but not compulsory — weak beginners are not blocked.",
  },
];

export const tracks: Track[] = [foundationTrack, ...skillTracks];

// ─────────────────────────── "Help me choose" chooser ───────────────────────────

export const chooserQuestions: ChooserQuestion[] = [
  {
    id: "q1",
    question: "What do you like doing most?",
    options: [
      { label: "Organising data, forms, emails, reports", trackId: "t1" },
      { label: "Making posters, designs, social media creatives", trackId: "t2" },
      { label: "Writing captions, posts, blogs, marketing ideas", trackId: "t3" },
      { label: "Talking to people, solving problems, replying to customers", trackId: "t4" },
      { label: "Making websites or learning coding", trackId: "t5" },
    ],
  },
  {
    id: "q2",
    question: "What device do you have?",
    options: [
      { label: "Mobile only", note: "Avoid starting with Web/Tech.", trackId: "t4" },
      { label: "Mobile + laptop/computer", note: "All tracks are open to you.", trackId: "t1" },
      { label: "Shared computer sometimes", note: "Start with a non-heavy track.", trackId: "t1" },
      { label: "No regular computer", note: "Avoid starting with Web/Tech first.", trackId: "t2" },
    ],
  },
  {
    id: "q3",
    question: "What is your current confidence?",
    options: [
      { label: "I am a complete beginner", trackId: "t1" },
      { label: "I like creative work", trackId: "t2" },
      { label: "I am comfortable using computer tools", trackId: "t1" },
      { label: "I want to learn technical skills", trackId: "t5" },
    ],
  },
  {
    id: "q4",
    question: "What do you want first?",
    options: [
      { label: "A local job or office work", trackId: "t1" },
      { label: "Internship or portfolio work", trackId: "t2" },
      { label: "Online freelance later", trackId: "t3" },
      { label: "NGO or community project work", trackId: "t4" },
    ],
  },
];

// ─────────────────────────── Module 5 — Application Readiness ───────────────────────────

// Application Readiness — trimmed to the 7 prep items per review. Portal-specific
// guides (LinkedIn Jobs, Internshala, NCS, myScheme, Skill India, Apprenticeship) moved
// to Phase-3 portal cards. The final-submission card became a single "Submit Readiness
// Portfolio" box. LinkedIn profile setup is optional so it never blocks beginners.
export const module5: ReadinessSubModule[] = [
  { id: "checklist", title: "Application Readiness Checklist", resourceType: "In-app GrowHub checklist", inApp: true, links: [], learns: "What must be ready before applying: professional email, phone number, resume PDF, portfolio link, safety checklist, application tracker and a shortlisted-opportunity sheet. LinkedIn and certificates are optional.", practice: "Tick what is ready and what is still missing in the checklist below.", output: "Ready-to-Apply checklist completed.", boundary: "Prepares you — no applying here." },
  { id: "resume", title: "Resume Preparation", resourceType: "Video/practical lesson", links: [{ label: "Learn to Create Resume", url: "https://edu.exceedlms.com/student/path/1606967" }], learns: "Create a simple fresher resume with education, skills, training, projects and contact details.", practice: "Create one-page resume in Google Docs/Word.", output: "Resume PDF uploaded.", boundary: "Resume will be used in Phase 3." },
  { id: "portfolio", title: "Portfolio / Proof-of-Work", resourceType: "Video/practical lesson", links: [{ label: "Learn to Build Portfolio", url: "https://edu.exceedlms.com/student/path/1606900" }], learns: "Show your resume, portfolio outputs, project work, screenshots, reports and skill-track work. Certificates can be added if available.", practice: "Create a Google Sites portfolio or Drive proof-of-work folder.", output: "Portfolio/proof-of-work link uploaded.", boundary: "Portfolio will be shared in Phase 3." },
  { id: "linkedin", optional: true, title: "LinkedIn Profile Setup", resourceType: "Video + official guide", links: [{ label: "Video", url: "https://www.youtube.com/watch?v=pQFuGIlZOC4" }, { label: "Official guide", url: "https://www.linkedin.com/help/linkedin/answer/a554351" }], learns: "Create a beginner-friendly LinkedIn profile: photo, headline, About, education, skills, projects, portfolio link.", practice: "Create/update LinkedIn profile and add skills + portfolio link.", output: "LinkedIn profile link or screenshot uploaded.", boundary: "Recommended, not required — don't let it block you." },
  { id: "safety", title: "Safe Application & Scam Check", resourceType: "Video/practical lesson", links: [{ label: "Avoid online scams", url: "https://applieddigitalskills.withgoogle.com/c/middle-and-high-school/en/avoid-online-scams/overview.html" }], learns: "Fake job signs: payment demand, WhatsApp-only hiring, unsafe links, fake forms, unrealistic salary.", practice: "Check 5 sample opportunities and mark safe/doubtful/unsafe.", output: "Job safety checklist submitted.", boundary: "Safety will be used before applying in Phase 3." },
  { id: "jobsearch", title: "Job Search & Shortlisting", resourceType: "Video/practical lesson", links: [{ label: "Search for a job", url: "https://applieddigitalskills.withgoogle.com/c/middle-and-high-school/en/search-for-a-part-time-or-summer-job/overview.html" }], learns: "Search using role, skill, location, remote/part-time, eligibility, stipend, deadline and company details.", practice: "Shortlist 5–10 suitable opportunities without applying.", output: "Shortlisted opportunity sheet uploaded.", boundary: "Shortlist now. Apply later in Phase 3." },
  { id: "tracker", title: "Application Email, Cover Note & Tracker", resourceType: "Video + written guide + tracker template", links: [{ label: "Email video", url: "https://www.youtube.com/watch?v=EzaNbx8sN4g" }, { label: "Indeed guide", url: "https://in.indeed.com/career-advice/resumes-cover-letters/job-application-email" }, { label: "Tracker template", url: "https://www.beamjobs.com/career-blog/job-application-tracker-google-sheets" }], learns: "Application email, short cover note, follow-up message and tracker use.", practice: "Write 1 internship message, 1 job application email, 1 follow-up message, and fill 5 sample tracker entries.", output: "Application messages + tracker sheet link.", boundary: "Tracker will be used for real applications in Phase 3." },
];

/** Contents the student bundles into the single "Submit Readiness Portfolio" Drive folder. */
export const readinessPortfolioChecklist: string[] = [
  "Resume PDF",
  "Portfolio / proof-of-work link",
  "Safety checklist",
  "Shortlisted opportunity sheet",
  "Application email / cover note / follow-up message",
  "Application tracker sheet",
  "LinkedIn / profile link or screenshot (if available)",
  "Certificates (if available)",
];

/**
 * The interactive "what's ready vs missing" checklist opened from the first Application
 * Readiness card. `optional` items never block progress (LinkedIn, certificates).
 */
export const readinessCheckItems: { id: string; label: string; optional?: boolean }[] = [
  { id: "email", label: "Professional email ready" },
  { id: "phone", label: "Phone number ready" },
  { id: "resume", label: "Resume PDF ready" },
  { id: "portfolio", label: "Portfolio link ready" },
  { id: "safety", label: "Safety checklist done" },
  { id: "tracker", label: "Application tracker ready" },
  { id: "shortlist", label: "Shortlisted opportunity sheet ready" },
  { id: "linkedin", label: "LinkedIn profile (if available)", optional: true },
  { id: "certs", label: "Certificates (if available)", optional: true },
];

// ─────────────────────────── Module 6 — Web portfolio rubric ───────────────────────────

export const webSubmissionChecklist: WebSubmissionItem[] = [
  { item: "Basic webpage", required: "Yes", check: "Student created a simple About Me / Student Profile page." },
  { item: "Complete website project", required: "Yes", check: "Page has clear sections, text, images/visuals, links and decent layout." },
  { item: "Basic styling", required: "Yes", check: "Uses colors, spacing, headings and readable design." },
  { item: "Basic JavaScript or interaction", required: "Preferred (not compulsory for weak beginners)", check: "Button, alert, show/hide section, form message, counter or simple interaction." },
  { item: "GitHub repository link", required: "Yes", check: "Project files are uploaded." },
  { item: "README file", required: "Yes", check: "README explains project name, purpose, tools used and live link." },
  { item: "Live website link", required: "Yes, if GitHub Pages works", check: "Website opens publicly. If publishing fails, screenshot + repo link can be accepted." },
  { item: "Screenshot of final project", required: "Yes", check: "Screenshot clearly shows the project." },
  { item: "Short reflection", required: "Yes", check: "3–4 lines: what they built, what they learned, where this can be useful." },
];

export const webRubric: WebRubricItem[] = [
  { criteria: "Basic webpage created", marks: 20 },
  { criteria: "Complete website project created", marks: 25 },
  { criteria: "Design/readability", marks: 15 },
  { criteria: "GitHub repository uploaded", marks: 15 },
  { criteria: "README added", marks: 10 },
  { criteria: "Live link or screenshot submitted", marks: 10 },
  { criteria: "Short reflection", marks: 5 },
];

export const webPassingBands: PassingBand[] = [
  { level: "Needs support", range: "Below 50" },
  { level: "Pass", range: "50–69" },
  { level: "Good", range: "70–84" },
  { level: "Strong portfolio-ready", range: "85–100" },
];
