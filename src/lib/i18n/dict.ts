/**
 * SURFACE-LEVEL bilingual dictionary (English / Hindi).
 *
 * Scope is deliberately shallow: shared chrome (public nav + footer, dashboard
 * shell) and the marketing landing page's static copy. Learning content that
 * lives in seed data / Firestore (module titles, quizzes, tracks, portals) and
 * AI output are NOT translated here — those stay English by design. Missing keys
 * fall back to English, so partial coverage never renders blank.
 *
 * Keys use dotted namespaces. Dashboard nav items are keyed by their English
 * label (see nav.ts) so `t("nav.Home")` etc. resolves without touching nav.ts.
 */
export type Locale = "en" | "hi";

type Dict = Record<string, string>;

export const en: Dict = {
  // ── public nav ──
  "nav.forStudents": "For students",
  "nav.forTrainers": "For trainers",
  "nav.about": "About",
  "nav.login": "Log in",
  "nav.join": "Join for free",

  // ── public footer ──
  "footer.explore": "Explore",
  "footer.getStarted": "Get started",
  "footer.legal": "Legal",
  "footer.joinInvite": "Join with an invite",
  "footer.privacy": "Privacy",
  "footer.terms": "Terms",
  "footer.tagline": "Real skills, real proof, real opportunities — free for students and trainers, built with NGOs.",
  "footer.copyright": "© 2026 Learnvia",
  "footer.builtWith": "Learnvia · Built with NGOs",

  // ── landing: hero ──
  "home.hero.learn": "Learn.",
  "home.hero.grow": "Grow.",
  "home.hero.thrive": "Thrive.",
  "home.hero.sub": "Practical skills. Real opportunities. A better future, together.",
  "home.hero.cta": "Start your journey",

  // ── landing: two journeys ──
  "home.journeys.title": "Two journeys, one platform",
  "home.journeys.sub": "Whether you're learning your first AI skill or teaching a classroom, Learnvia is built for you.",
  "home.path.student.title": "I'm a student",
  "home.path.student.desc": "Start from zero, build real skills, and leave with proof you can show.",
  "home.path.student.p1": "8 beginner AI modules with badges",
  "home.path.student.p2": "5 skill tracks with real project outputs",
  "home.path.student.p3": "Apply through 20+ real portals",
  "home.path.trainer.title": "I'm a trainer",
  "home.path.trainer.desc": "Copy-paste AI recipes and instant tools built for Indian classrooms.",
  "home.path.trainer.p1": "8 teaching modules with 24 copy-paste prompts",
  "home.path.trainer.p2": "Plan-B Panic Button for zero-prep activities",
  "home.path.trainer.p3": "60-minute ready-made workshop kit",
  "home.learnMore": "Learn more",

  // ── landing: courses ──
  "home.courses.title": "Explore our courses",
  "home.courses.all": "All 8 modules",

  // ── landing: trainer courses ──
  "home.trainerCourses.title": "Explore your courses for trainers",
  "home.trainerCourses.all": "See the trainer toolkit",

  // ── landing: trainers band ──
  "home.trainers.title": "For trainers: teach with AI, prep in half the time",
  "home.trainers.cta": "See the toolkit",
  "home.trainers.t1.title": "Plan-B Panic Button",
  "home.trainers.t1.desc": "Class going sideways? Generate a zero-prep 5-minute activity instantly.",
  "home.trainers.t2.title": "24 copy-paste prompts",
  "home.trainers.t2.desc": "Recipes for ChatGPT or Gemini, no setup, works on your phone in class.",
  "home.trainers.t3.title": "60-min workshop kit",
  "home.trainers.t3.desc": "A ready-made live-lab run sheet with QR handoff for your next session.",

  // ── landing: stats ──
  "home.stats.modules": "AI modules",
  "home.stats.tracks": "Skill tracks",
  "home.stats.portals": "Opportunity portals",
  "home.stats.free": "Free",

  // ── landing: testimonial ──
  "home.story.title": "Real people. Real results.",
  "home.story.quote": "“I built my first project and applied to three real internships in a month. Learnvia gave me the proof I never had.”",
  "home.story.person": "Anjali Sharma - Class 11 student, Jaipur",

  // ── landing: portals + final CTA ──
  "home.portals.label": "Students apply through real portals",
  "home.trainerPortals.label": "Trainers connect students to real portals",
  "home.cta.title": "Start your journey today",
  "home.cta.sub": "Free for students and trainers. Build skills that lead to real work.",

  // ── shared ──
  "common.module": "Module",

  // ── /for-students ──
  "fs.badge": "For students · 100% free",
  "fs.h1": "Start from zero. Leave with proof.",
  "fs.sub": "Learn beginner AI and digital skills, build a portfolio your mentors verify, and apply to real internships, jobs, and freelance work — one guided journey.",
  "fs.seeModules": "See the modules",
  "fs.step": "Step",
  "fs.step1.title": "Learn from zero",
  "fs.step1.desc": "8 beginner AI and digital modules with videos, worksheets, and quizzes — built for students who have never touched this before.",
  "fs.step2.title": "Build the proof",
  "fs.step2.desc": "Pick a skill track and finish real projects. Everything lands in your portfolio, backed by certificates and badges.",
  "fs.step3.title": "Apply for real",
  "fs.step3.desc": "Unlock 20+ real opportunity portals as your readiness grows, and manage every application from one tracker.",
  "fs.modules.title": "The 8 AI modules",
  "fs.modules.sub": "Beginner-friendly, about 25 minutes each, with videos, flashcards, a prompt lab, and a quiz. Every module earns a badge.",
  "fs.tracks.title": "Then pick your skill track",
  "fs.tracks.sub": "After a compulsory digital foundation, choose one of 5 tracks built on official free courses — Skill India, Google, TCS iON, IndiaAI. Each track ends in a real portfolio.",
  "fs.proof.title": "What you leave with",
  "fs.proof.p1.title": "Certificates",
  "fs.proof.p1.desc": "Earn a certificate for every module and track you complete.",
  "fs.proof.p2.title": "Badges",
  "fs.proof.p2.desc": "Collect badges like Prompt Pro and Smart Learner as you go.",
  "fs.proof.p3.title": "Verified portfolio",
  "fs.proof.p3.desc": "Every project lands in a portfolio your mentors can verify.",
  "fs.proof.p4.title": "Application tracker",
  "fs.proof.p4.desc": "Track every application — applied, in review, shortlisted.",
  "fs.portals.titleSuffix": " real portals, unlocked as you're ready",
  "fs.portals.sub": "Your readiness score grows with your skills and portfolio. Portals unlock in stages, so you apply where you can genuinely compete — with a safety checklist for every one.",
  "fs.gate1.label": "Start here",
  "fs.gate1.hint": "From readiness 50",
  "fs.gate2.label": "As you grow",
  "fs.gate2.hint": "From readiness 70",
  "fs.gate3.label": "With a portfolio",
  "fs.gate3.hint": "From readiness 85",
  "fs.quote": "“I built my first project and applied to three real internships in a month. Learnvia gave me the proof I never had.”",
  "fs.quotePerson": "Riya Sharma — student",
  "fs.cta.title": "Your journey starts free",
  "fs.cta.sub": "8 modules · 5 tracks · 20+ portals · free for students",

  // ── /for-trainers ──
  "ft.badge": "For trainers · Learnvia · Free",
  "ft.h1": "Teach with AI. Prep in half the time.",
  "ft.sub": "Copy-paste AI recipes and instant tools built for Indian classrooms — lesson plans, quizzes, roleplays, and rescue activities, ready for ChatGPT or Gemini.",
  "ft.seeToolkit": "See the toolkit",
  "ft.value1.title": "Half the prep time",
  "ft.value1.desc": "Every recipe is copy-paste ready — no setup, no accounts to configure.",
  "ft.value2.title": "Indian & Hinglish",
  "ft.value2.desc": "Prompts localize examples to your students' context and language.",
  "ft.value3.title": "Works on your phone",
  "ft.value3.desc": "Copy a prompt into ChatGPT or Gemini during class, right from your phone.",
  "ft.tools.title": "Three instant tools",
  "ft.tools.sub": "Fill-in-the-blank builders that assemble a ready prompt for you — including a rescue button for when class goes sideways.",
  "ft.modules.titleA": "8 teaching modules · ",
  "ft.modules.titleB": " copy-paste prompts",
  "ft.modules.sub": "Each module is a set of proven prompt recipes with square-bracket blanks you fill in — from planning a full course to handling a difficult classroom conversation.",
  "ft.prompts": "prompts",
  "ft.framework.title": "The 3-move framework",
  "ft.framework.sub": "Every recipe follows the same simple rhythm, so you get better with each use.",
  "ft.move": "Move",
  "ft.move1.title": "Set the scene",
  "ft.move1.desc": "Give the AI context about your class and topic.",
  "ft.move2.title": "Ask for options",
  "ft.move2.desc": "Get multiple activities, plans, or quiz drafts to pick from.",
  "ft.move3.title": "Push it further",
  "ft.move3.desc": "Refine the style — simpler, shorter, more local — until it fits.",
  "ft.workshop.title": "Running a live session?",
  "ft.workshop.desc": "The ready-made 60-minute workshop kit gives you a run sheet, timed labs for the first two modules, and a QR handoff so trainers leave with the toolkit on their phones.",
  "ft.workshop.cta": "Get the kit — free",
  "ft.cta.title": "Tonight's prep, done by dinner",
  "ft.cta.sub": "8 modules · 24 prompts · 3 instant tools · free for trainers",

  // ── dashboard shell ──
  "app.search": "Search…",
  "app.readiness": "Readiness",
  "app.improve": "Improve →",
  "app.askCoach": "Ask Coach",
  "app.profile": "Profile",
  "app.settings": "Settings",
  "app.signOut": "Sign out",

  // ── dashboard nav labels (keyed by English label in nav.ts) ──
  "nav.Home": "Home",
  "nav.Learn": "Learn",
  "nav.Build": "Build",
  "nav.Opportunities": "Opportunities",
  "nav.Portfolio": "Portfolio",
  "nav.Progress": "Progress",
  "nav.AI Coach": "AI Coach",
  "nav.Practice": "Practice",
  "nav.Notifications": "Notifications",
  "nav.Profile": "Profile",
  "nav.Dashboard": "Dashboard",
  "nav.Students": "Students",
  "nav.Cohorts": "Cohorts",
  "nav.Reviews": "Reviews",
  "nav.Applications": "Applications",
  "nav.Reports": "Reports",
  "nav.AI Modules": "AI Modules",
  "nav.Trainer Tools": "Trainer Tools",
  "nav.Workshop": "Workshop",
  "nav.Console": "Console",
  "nav.Modules": "Modules",
  "nav.Tracks": "Tracks",
  "nav.Portals": "Portals",
  "nav.Users": "Users",
  "nav.NGOs": "NGOs",
  "nav.Settings": "Settings",
};

export const hi: Dict = {
  // ── public nav ──
  "nav.forStudents": "छात्रों के लिए",
  "nav.forTrainers": "प्रशिक्षकों के लिए",
  "nav.about": "हमारे बारे में",
  "nav.login": "लॉग इन करें",
  "nav.join": "मुफ़्त में जुड़ें",

  // ── public footer ──
  "footer.explore": "एक्सप्लोर करें",
  "footer.getStarted": "शुरू करें",
  "footer.legal": "कानूनी",
  "footer.joinInvite": "इनवाइट से जुड़ें",
  "footer.privacy": "गोपनीयता",
  "footer.terms": "शर्तें",
  "footer.tagline": "असली कौशल, असली प्रमाण, असली अवसर — छात्रों और प्रशिक्षकों के लिए मुफ़्त, NGO के साथ मिलकर बनाया गया।",
  "footer.copyright": "© 2026 Learnvia",
  "footer.builtWith": "Learnvia · NGO के साथ निर्मित",

  // ── landing: hero ──
  "home.hero.learn": "सीखें।",
  "home.hero.grow": "बढ़ें।",
  "home.hero.thrive": "आगे बढ़ें।",
  "home.hero.sub": "व्यावहारिक कौशल। असली अवसर। एक बेहतर भविष्य, साथ मिलकर।",
  "home.hero.cta": "अपनी यात्रा शुरू करें",

  // ── landing: two journeys ──
  "home.journeys.title": "दो रास्ते, एक मंच",
  "home.journeys.sub": "चाहे आप अपना पहला AI कौशल सीख रहे हों या कक्षा को पढ़ा रहे हों, Learnvia आपके लिए बना है।",
  "home.path.student.title": "मैं एक छात्र हूँ",
  "home.path.student.desc": "शून्य से शुरू करें, असली कौशल बनाएं, और दिखाने लायक प्रमाण के साथ आगे बढ़ें।",
  "home.path.student.p1": "बैज के साथ 8 शुरुआती AI मॉड्यूल",
  "home.path.student.p2": "असली प्रोजेक्ट परिणामों के साथ 5 स्किल ट्रैक",
  "home.path.student.p3": "20+ असली पोर्टल के ज़रिए आवेदन करें",
  "home.path.trainer.title": "मैं एक प्रशिक्षक हूँ",
  "home.path.trainer.desc": "भारतीय कक्षाओं के लिए बने कॉपी-पेस्ट AI नुस्खे और तुरंत उपयोगी टूल।",
  "home.path.trainer.p1": "24 कॉपी-पेस्ट प्रॉम्प्ट के साथ 8 शिक्षण मॉड्यूल",
  "home.path.trainer.p2": "बिना तैयारी की गतिविधियों के लिए प्लान-बी पैनिक बटन",
  "home.path.trainer.p3": "60 मिनट की तैयार वर्कशॉप किट",
  "home.learnMore": "और जानें",

  // ── landing: courses ──
  "home.courses.title": "हमारे कोर्स देखें",
  "home.courses.all": "सभी 8 मॉड्यूल",

  // ── landing: trainer courses ──
  "home.trainerCourses.title": "प्रशिक्षकों के लिए अपने कोर्स देखें",
  "home.trainerCourses.all": "प्रशिक्षक टूलकिट देखें",

  // ── landing: trainers band ──
  "home.trainers.title": "प्रशिक्षकों के लिए: AI के साथ पढ़ाएं, आधे समय में तैयारी करें",
  "home.trainers.cta": "टूलकिट देखें",
  "home.trainers.t1.title": "प्लान-बी पैनिक बटन",
  "home.trainers.t1.desc": "कक्षा बिगड़ रही है? तुरंत बिना तैयारी की 5 मिनट की गतिविधि बनाएं।",
  "home.trainers.t2.title": "24 कॉपी-पेस्ट प्रॉम्प्ट",
  "home.trainers.t2.desc": "ChatGPT या Gemini के लिए नुस्खे, बिना सेटअप, कक्षा में आपके फ़ोन पर चलते हैं।",
  "home.trainers.t3.title": "60 मिनट वर्कशॉप किट",
  "home.trainers.t3.desc": "आपके अगले सत्र के लिए QR हैंडऑफ़ के साथ तैयार लाइव-लैब रन शीट।",

  // ── landing: stats ──
  "home.stats.modules": "AI मॉड्यूल",
  "home.stats.tracks": "स्किल ट्रैक",
  "home.stats.portals": "अवसर पोर्टल",
  "home.stats.free": "मुफ़्त",

  // ── landing: testimonial ──
  "home.story.title": "असली लोग। असली नतीजे।",
  "home.story.quote": "“मैंने एक महीने में अपना पहला प्रोजेक्ट बनाया और तीन असली इंटर्नशिप के लिए आवेदन किया। Learnvia ने मुझे वह प्रमाण दिया जो मेरे पास कभी नहीं था।”",
  "home.story.person": "अंजलि शर्मा - कक्षा 11 की छात्रा, जयपुर",

  // ── landing: portals + final CTA ──
  "home.portals.label": "छात्र असली पोर्टल के ज़रिए आवेदन करते हैं",
  "home.trainerPortals.label": "प्रशिक्षक छात्रों को असली पोर्टल से जोड़ते हैं",
  "home.cta.title": "आज ही अपनी यात्रा शुरू करें",
  "home.cta.sub": "छात्रों और प्रशिक्षकों के लिए मुफ़्त। ऐसे कौशल बनाएं जो असली काम तक ले जाएं।",

  // ── shared ──
  "common.module": "मॉड्यूल",

  // ── /for-students ──
  "fs.badge": "छात्रों के लिए · 100% मुफ़्त",
  "fs.h1": "शून्य से शुरू करें। प्रमाण के साथ आगे बढ़ें।",
  "fs.sub": "शुरुआती AI और डिजिटल कौशल सीखें, ऐसा पोर्टफोलियो बनाएं जिसे आपके मेंटर सत्यापित करें, और असली इंटर्नशिप, नौकरियों व फ्रीलांस काम के लिए आवेदन करें — एक निर्देशित यात्रा।",
  "fs.seeModules": "मॉड्यूल देखें",
  "fs.step": "चरण",
  "fs.step1.title": "शून्य से सीखें",
  "fs.step1.desc": "वीडियो, वर्कशीट और क्विज़ के साथ 8 शुरुआती AI और डिजिटल मॉड्यूल — उन छात्रों के लिए जिन्होंने पहले कभी यह नहीं किया।",
  "fs.step2.title": "प्रमाण बनाएं",
  "fs.step2.desc": "एक स्किल ट्रैक चुनें और असली प्रोजेक्ट पूरे करें। सब कुछ आपके पोर्टफोलियो में आता है, प्रमाणपत्र और बैज के साथ।",
  "fs.step3.title": "सच में आवेदन करें",
  "fs.step3.desc": "जैसे-जैसे आपकी तैयारी बढ़े, 20+ असली अवसर पोर्टल अनलॉक करें, और हर आवेदन को एक ट्रैकर से प्रबंधित करें।",
  "fs.modules.title": "8 AI मॉड्यूल",
  "fs.modules.sub": "शुरुआती-अनुकूल, हर एक लगभग 25 मिनट का, वीडियो, फ्लैशकार्ड, प्रॉम्प्ट लैब और क्विज़ के साथ। हर मॉड्यूल एक बैज दिलाता है।",
  "fs.tracks.title": "फिर अपना स्किल ट्रैक चुनें",
  "fs.tracks.sub": "अनिवार्य डिजिटल फाउंडेशन के बाद, आधिकारिक मुफ़्त कोर्स पर बने 5 ट्रैक में से एक चुनें — Skill India, Google, TCS iON, IndiaAI। हर ट्रैक एक असली पोर्टफोलियो में समाप्त होता है।",
  "fs.proof.title": "आप क्या लेकर जाते हैं",
  "fs.proof.p1.title": "प्रमाणपत्र",
  "fs.proof.p1.desc": "हर पूरे किए गए मॉड्यूल और ट्रैक के लिए प्रमाणपत्र पाएं।",
  "fs.proof.p2.title": "बैज",
  "fs.proof.p2.desc": "आगे बढ़ते हुए Prompt Pro और Smart Learner जैसे बैज इकट्ठा करें।",
  "fs.proof.p3.title": "सत्यापित पोर्टफोलियो",
  "fs.proof.p3.desc": "हर प्रोजेक्ट एक ऐसे पोर्टफोलियो में आता है जिसे आपके मेंटर सत्यापित कर सकते हैं।",
  "fs.proof.p4.title": "आवेदन ट्रैकर",
  "fs.proof.p4.desc": "हर आवेदन ट्रैक करें — आवेदित, समीक्षा में, शॉर्टलिस्ट।",
  "fs.portals.titleSuffix": " असली पोर्टल, आपकी तैयारी के अनुसार अनलॉक",
  "fs.portals.sub": "आपका तैयारी स्कोर आपके कौशल और पोर्टफोलियो के साथ बढ़ता है। पोर्टल चरणों में अनलॉक होते हैं, ताकि आप वहीं आवेदन करें जहाँ आप सच में मुकाबला कर सकें — हर एक के लिए सुरक्षा चेकलिस्ट के साथ।",
  "fs.gate1.label": "यहाँ से शुरू करें",
  "fs.gate1.hint": "तैयारी 50 से",
  "fs.gate2.label": "जैसे-जैसे बढ़ें",
  "fs.gate2.hint": "तैयारी 70 से",
  "fs.gate3.label": "पोर्टफोलियो के साथ",
  "fs.gate3.hint": "तैयारी 85 से",
  "fs.quote": "“मैंने एक महीने में अपना पहला प्रोजेक्ट बनाया और तीन असली इंटर्नशिप के लिए आवेदन किया। Learnvia ने मुझे वह प्रमाण दिया जो मेरे पास कभी नहीं था।”",
  "fs.quotePerson": "रिया शर्मा — छात्रा",
  "fs.cta.title": "आपकी यात्रा मुफ़्त शुरू होती है",
  "fs.cta.sub": "8 मॉड्यूल · 5 ट्रैक · 20+ पोर्टल · छात्रों के लिए मुफ़्त",

  // ── /for-trainers ──
  "ft.badge": "प्रशिक्षकों के लिए · Learnvia · मुफ़्त",
  "ft.h1": "AI के साथ पढ़ाएं। आधे समय में तैयारी करें।",
  "ft.sub": "भारतीय कक्षाओं के लिए बने कॉपी-पेस्ट AI नुस्खे और तुरंत उपयोगी टूल — पाठ योजना, क्विज़, रोलप्ले और रेस्क्यू गतिविधियाँ, ChatGPT या Gemini के लिए तैयार।",
  "ft.seeToolkit": "टूलकिट देखें",
  "ft.value1.title": "आधा तैयारी समय",
  "ft.value1.desc": "हर नुस्खा कॉपी-पेस्ट के लिए तैयार है — कोई सेटअप नहीं, कोई अकाउंट कॉन्फ़िगर नहीं करना।",
  "ft.value2.title": "भारतीय और हिंग्लिश",
  "ft.value2.desc": "प्रॉम्प्ट उदाहरणों को आपके छात्रों के संदर्भ और भाषा के अनुसार ढालते हैं।",
  "ft.value3.title": "आपके फ़ोन पर चलते हैं",
  "ft.value3.desc": "कक्षा के दौरान अपने फ़ोन से ही एक प्रॉम्प्ट ChatGPT या Gemini में कॉपी करें।",
  "ft.tools.title": "तीन तुरंत टूल",
  "ft.tools.sub": "फिल-इन-द-ब्लैंक बिल्डर जो आपके लिए एक तैयार प्रॉम्प्ट जोड़ते हैं — कक्षा बिगड़ने पर एक रेस्क्यू बटन सहित।",
  "ft.modules.titleA": "8 शिक्षण मॉड्यूल · ",
  "ft.modules.titleB": " कॉपी-पेस्ट प्रॉम्प्ट",
  "ft.modules.sub": "हर मॉड्यूल आज़माए हुए प्रॉम्प्ट नुस्खों का एक सेट है जिसमें आप वर्गाकार-कोष्ठक के रिक्त स्थान भरते हैं — पूरा कोर्स योजना बनाने से लेकर मुश्किल कक्षा-संवाद संभालने तक।",
  "ft.prompts": "प्रॉम्प्ट",
  "ft.framework.title": "3-मूव फ्रेमवर्क",
  "ft.framework.sub": "हर नुस्खा एक ही सरल लय का पालन करता है, इसलिए हर उपयोग के साथ आप बेहतर होते हैं।",
  "ft.move": "मूव",
  "ft.move1.title": "माहौल तैयार करें",
  "ft.move1.desc": "AI को अपनी कक्षा और विषय के बारे में संदर्भ दें।",
  "ft.move2.title": "विकल्प माँगें",
  "ft.move2.desc": "चुनने के लिए कई गतिविधियाँ, योजनाएँ या क्विज़ ड्राफ्ट पाएं।",
  "ft.move3.title": "इसे और आगे बढ़ाएं",
  "ft.move3.desc": "शैली को निखारें — सरल, छोटा, अधिक स्थानीय — जब तक यह सही न बैठे।",
  "ft.workshop.title": "लाइव सत्र चला रहे हैं?",
  "ft.workshop.desc": "तैयार 60 मिनट की वर्कशॉप किट आपको एक रन शीट, पहले दो मॉड्यूल के लिए समयबद्ध लैब, और एक QR हैंडऑफ़ देती है ताकि प्रशिक्षक टूलकिट अपने फ़ोन पर लेकर जाएं।",
  "ft.workshop.cta": "किट पाएं — मुफ़्त",
  "ft.cta.title": "आज की तैयारी, रात के खाने तक पूरी",
  "ft.cta.sub": "8 मॉड्यूल · 24 प्रॉम्प्ट · 3 तुरंत टूल · प्रशिक्षकों के लिए मुफ़्त",

  // ── dashboard shell ──
  "app.search": "खोजें…",
  "app.readiness": "तैयारी",
  "app.improve": "सुधारें →",
  "app.askCoach": "कोच से पूछें",
  "app.profile": "प्रोफ़ाइल",
  "app.settings": "सेटिंग्स",
  "app.signOut": "साइन आउट",

  // ── dashboard nav labels ──
  "nav.Home": "होम",
  "nav.Learn": "सीखें",
  "nav.Build": "बनाएं",
  "nav.Opportunities": "अवसर",
  "nav.Portfolio": "पोर्टफोलियो",
  "nav.Progress": "प्रगति",
  "nav.AI Coach": "AI कोच",
  "nav.Practice": "अभ्यास",
  "nav.Notifications": "सूचनाएं",
  "nav.Profile": "प्रोफ़ाइल",
  "nav.Dashboard": "डैशबोर्ड",
  "nav.Students": "छात्र",
  "nav.Cohorts": "समूह",
  "nav.Reviews": "समीक्षाएं",
  "nav.Applications": "आवेदन",
  "nav.Reports": "रिपोर्ट",
  "nav.AI Modules": "AI मॉड्यूल",
  "nav.Trainer Tools": "प्रशिक्षक टूल",
  "nav.Workshop": "वर्कशॉप",
  "nav.Console": "कंसोल",
  "nav.Modules": "मॉड्यूल",
  "nav.Tracks": "ट्रैक",
  "nav.Portals": "पोर्टल",
  "nav.Users": "उपयोगकर्ता",
  "nav.NGOs": "NGO",
  "nav.Settings": "सेटिंग्स",
};

export const DICT: Record<Locale, Dict> = { en, hi };
