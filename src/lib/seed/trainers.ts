/**
 * Growvia "AI for Trainers" vertical — content for the login-gated `trainer` role.
 * A teacher-enablement hub: 10 copy-paste prompt-template modules + 3 fill-in-the-blank tool
 * builders + a 60-minute live-workshop run sheet. No LLM runs on-site — trainers copy prompts
 * into their own ChatGPT/Gemini (matches the static-export, client-only constraint and the
 * student Prompt Lab). Each module carries two video placeholders (an intro "hook" and an
 * action-demo screen recording) plus optional how-to notes for external tools.
 */
import type { WellTone } from "@/components/ui";

/** One copy-paste prompt template inside a trainer module. */
export interface TrainerTemplate {
  /** Short name, e.g. "The Unit Planner". */
  name: string;
  /** The exact prompt the trainer copies (square-bracket [placeholders] are theirs to fill). */
  prompt: string;
}

/** A short how-to for an external tool referenced by a module (Quizizz, Diffit, NotebookLM, …). */
export interface TrainerExtraTool {
  name: string;
  instructions: string;
}

export interface TrainerModule {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  icon: string; // Tabler glyph
  tone: WellTone;
  /** Intro "hook" video — what the short explainer video covers. */
  videoConcept: string;
  /** Action-demo video — what the screen-recording walkthrough shows. */
  actionDemoConcept: string;
  /** YouTube link for the module's teaching video. Optional — not every module has one yet. */
  videoUrl?: string;
  templates: TrainerTemplate[];
  /** Optional "Extra Tool Instructions" — how to use the external tools this module recommends. */
  extraTools?: TrainerExtraTool[];
}

/** A single input on a tool builder. Empty inputs fall back to the bracketed placeholder. */
export interface TrainerToolField {
  id: string; // token key used in `template` as {{id}}
  label: string;
  placeholder: string;
  type: "text" | "textarea" | "select";
  options?: string[]; // for type: "select"
}

export interface TrainerTool {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  tone: WellTone;
  whatItDoes: string;
  fields: TrainerToolField[];
  /** Prompt scaffold with {{fieldId}} tokens; the page substitutes field values. */
  template: string;
}

// ─────────────────────────── The 3 interactive tools ───────────────────────────

export const trainerTools: TrainerTool[] = [
  {
    id: "context-localizer",
    title: "The Context Localizer",
    subtitle: "The Indianizer Tool",
    icon: "ti-map-pin",
    tone: "indigo",
    whatItDoes:
      "Converts Western or overly corporate AI examples into relatable, grassroots Indian scenarios your students actually recognise.",
    fields: [
      {
        id: "scenario",
        label: "Paste the boring / Western scenario",
        placeholder: "e.g. A customer at a corporate coffee chain disputes a bill…",
        type: "textarea",
      },
    ],
    template:
      "Rewrite this scenario to be easily understood by youth from low-income urban Indian backgrounds entering their first jobs. Use local contexts like a Kirana store, mobile repair shop, or local market.\n\nScenario:\n{{scenario}}",
  },
  {
    id: "panic-button",
    title: 'The "Plan-B" Panic Button',
    subtitle: "Instant zero-prep activity",
    icon: "ti-urgent",
    tone: "orange",
    whatItDoes:
      "Generates an instant, zero-prep activity when a classroom situation suddenly changes (low attendance, sleepy students, no projector).",
    fields: [
      { id: "topic", label: "Your current topic", placeholder: "e.g. Resume writing", type: "text" },
      {
        id: "problem",
        label: "Your current problem",
        placeholder: "Pick what went wrong",
        type: "select",
        options: [
          "Only a few students showed up",
          "Students are sleepy / low energy",
          "No internet or projector today",
          "We finished the material early",
          "Students are distracted / on phones",
        ],
      },
    ],
    template:
      "Generate a fast, 5-minute physical game or discussion question about {{topic}} that works for this constraint: {{problem}}.",
  },
  {
    id: "roleplay-generator",
    title: "The Instant Roleplay Generator",
    subtitle: "Two-person acting script",
    icon: "ti-masks-theater",
    tone: "violet",
    whatItDoes:
      "Creates a formatted, two-person script for students to act out real-world job-readiness scenarios.",
    fields: [
      {
        id: "skill",
        label: "The skill to practise",
        placeholder: "e.g. Dealing with a rude customer",
        type: "text",
      },
    ],
    template:
      "Write a short, simple, two-person roleplay script about {{skill}}. Print it side-by-side with stage directions so two students can read it aloud in class.",
  },
];

// ─────────────────────────── The 10 core AI modules ───────────────────────────

export const trainerModules: TrainerModule[] = [
  {
    id: "lesson-architect",
    order: 1,
    title: "The Lesson Architect",
    subtitle: "Standards, Units & Lesson Plans",
    icon: "ti-ruler-2",
    tone: "indigo",
    videoConcept:
      "How AI turns a syllabus outcome into a fully-structured unit and day-by-day lesson plans in minutes, instead of hours of manual planning.",
    actionDemoConcept:
      "Screen recording: paste a curriculum standard into ChatGPT/Gemini and watch it build an aligned unit map, then drill into a single 40-minute lesson.",
    videoUrl: "https://youtu.be/6r9gg5wZz5k",
    templates: [
      {
        name: "The Standards Aligner",
        prompt:
          "Role: Act as a veteran educator and curriculum auditor specializing in [Insert Subject, e.g. High School Science / Vocational Training].\n\nContext: I am a teacher working with [Insert Student Demographic, e.g. 8th-grade students in a mid-tier private school / low-income youth in an NGO]. I have drafted a lesson plan, but I need to ensure it is robust, practical, and meets required educational benchmarks.\n\nAction: Analyze the following lesson plan: [Paste Lesson Plan]. Cross-check it against [Insert Educational Standard or Goal, e.g. ICSE Class 10 Board requirements / Basic Retail Employability Skills]. Identify where the lesson is too theoretical, uses overly complex jargon for my specific students, or misses required benchmarks.\n\nFormat: Provide a bulleted list with three clear headings: 'Identified Gaps', 'Jargon Warnings (Words to Avoid)', and '3 Interactive Solutions to Fix the Gaps'.",
      },
      {
        name: "The Unit Planner",
        prompt:
          "Role: Act as an expert curriculum designer specializing in engaging, student-centered education.\n\nContext: I am teaching a unit on [Insert Topic] to [Insert Student Demographic, e.g. 6th graders in a Mumbai international school / 18-year-old first-generation learners]. They often struggle to stay engaged with heavy textbook theory. My available resources are [Insert Resources, e.g. Smartboards and iPads / only a whiteboard and chart paper].\n\nAction: Create a highly practical, engaging 3-day unit plan. The concepts must be simplified and rely on relatable cultural analogies (like Bollywood movies, popular cartoons, cricket, or local everyday scenarios) rather than dry, generic examples.\n\nFormat: Present the plan as a structured table. For each day, include: Day Number, 5-Minute Hook, Core Concept (explained simply), Cultural/Local Analogy, and a Group Activity that fits my resources.",
      },
    ],
  },
  {
    id: "assessment-engine",
    order: 2,
    title: "The Assessment Engine",
    subtitle: "Quizzes, Rubrics & Feedback",
    icon: "ti-checklist",
    tone: "green",
    videoConcept:
      "How AI instantly builds quizzes, rubrics and worksheets — and even tutors a struggling student — so you spend time teaching, not typing.",
    actionDemoConcept:
      "Screen recording: generate a 10-question quiz with an answer key from a chapter, then create a matching grading rubric and a print-ready offline worksheet.",
    videoUrl: "https://youtu.be/KkvEMzBiKKg",
    templates: [
      {
        name: "The Answer Cluster Strategy",
        prompt:
          "Role: Act as an expert evaluator and teaching assistant for [Insert Subject/Grade Level].\n\nContext: I am grading [Insert Number] short-answer responses from my students who are [Insert Student Demographic, e.g. first-generation learners in a vocational program / 10th graders in a fast-paced private school]. I want to provide personalized but highly efficient feedback.\n\nAction: Here are the raw student answers: [Paste Answers, or upload photos, PDFs, scans]. Group these responses into 3 to 4 distinct clusters based on common misconceptions, logical gaps, or error patterns. For each cluster, provide a brief summary of why they made that specific mistake.\n\nFormat: Create a table with columns: 'Cluster Name', 'Core Misconception', 'Student Names in this Cluster', and 'One encouraging, simple feedback template to copy-paste for this group'.",
      },
      {
        name: "The Socratic Tutor",
        prompt:
          "Role: Act as a patient, encouraging Socratic tutor specializing in [Insert Subject, e.g. Middle School Math / Basic Accounting].\n\nContext: A student from [Insert Demographic, e.g. a low-resource NGO background / an urban international school] has asked me how to solve this problem: [Insert Problem]. They get easily discouraged if they don't understand it right away.\n\nAction: Do NOT give the final answer or solve the problem for them. Instead, break down their current understanding and provide a guiding question. Use a highly relatable, everyday cultural analogy (like a famous Bollywood movie plot, sharing a pizza, cricket scores, or a local market transaction) to help the concept 'click' for them naturally.\n\nFormat: Provide three options for me to reply to the student with: 1) A gentle guiding question, 2) A relatable local analogy, and 3) A step-by-step breakdown of the first step only.",
      },
      {
        name: "Automated Rubric Creation",
        prompt:
          "Role: Act as an experienced academic coordinator and assessment designer for [Insert Subject/Grade Level].\n\nContext: My students, who are [Insert Student Demographic, e.g. rural students with basic English / advanced high schoolers], have to complete an assignment where they must [Describe Assignment, e.g. present a 2-minute speech on a social issue / write a science report].\n\nAction: Create a simple, fair, and encouraging 4-point grading rubric. Ensure the criteria do not unfairly penalize them for [Insert Constraint, e.g. lack of expensive chart paper / minor grammatical errors], but instead focus heavily on [Insert Focus Area, e.g. effort and conceptual clarity / creativity and presentation skills].\n\nFormat: A clear, printable table with 4 levels of achievement (e.g. Needs Help, Getting There, Good, Excellent) across 3-4 grading criteria. Keep the language simple enough that students can read and understand it themselves before starting.",
      },
      {
        name: "The Gamified Quiz Generator",
        prompt:
          "Role: Act as an expert quizmaster and curriculum designer.\n\nContext: I am creating a gamified quiz for [Insert Student Demographic, e.g. 6th graders in a rural NGO / 10th graders in Mumbai]. The topic is [Insert Topic]. I need to feed a highly accurate, simple reading passage into an AI quiz maker so it can generate the game.\n\nAction: Write a 300-word engaging summary of this topic. Include 5 key facts, use one relatable Indian analogy, and avoid heavy jargon. Do not write the quiz questions yourself; just give me the perfect summary text that I can paste into the Quizizz AI generator.\n\nFormat: A simple, 3-paragraph text block titled 'Reading Passage for Quizizz'.",
      },
      {
        name: "The Zero-Tech Worksheet Generator",
        prompt:
          "Role: Act as a resource-constrained educator and assessment expert.\n\nContext: I am teaching [Insert Topic] to [Insert Student Demographic, e.g. 8th graders in a village school / evening batch vocational students]. My students do not have access to laptops, smartphones, or the internet in class. I need a physical assessment I can print on a single sheet of paper.\n\nAction: Create a highly structured, 1-page offline worksheet. It must include: a brief 2-sentence summary of the topic at the top, 3 'Fill in the blanks' questions, 2 'Match the following' pairs using relatable everyday examples, and 1 short-answer question asking them to apply the concept to a real-life situation.\n\nFormat: A clean, printable text format with clear headings and blank lines (______) for students to write answers. Include a separate 'Answer Key' section at the very bottom for the teacher.",
      },
    ],
    extraTools: [
      {
        name: "Using Quizizz AI",
        instructions:
          "Copy the reading passage the AI generated. Go to Quizizz AI (quizizz.com) and click 'Create'. Choose 'Generate from Text' and paste the passage. Select how many questions you want — Quizizz instantly generates a playable, self-grading game you can display on a screen or send to students via a link.",
      },
      {
        name: "Printing Offline Worksheets",
        instructions:
          "Copy the generated worksheet (excluding the Answer Key at the bottom). Paste it into Microsoft Word or Google Docs, adjust the font size if needed, and print it directly for your classroom. No internet or student devices required.",
      },
    ],
  },
  {
    id: "concept-crusher",
    order: 3,
    title: "The Concept Crusher & Visual Classroom",
    subtitle: "Explain, Visualize & Narrate",
    icon: "ti-bulb",
    tone: "violet",
    videoConcept:
      "How AI turns a hard concept into a short video script, a clear infographic, or an audio guide students can replay on their phones.",
    actionDemoConcept:
      "Screen recording: write a 60-second explainer script, generate a labelled infographic prompt, and upload notes to NotebookLM to create an audio overview.",
    videoUrl: "https://youtu.be/l2-kfSZ56vM",
    templates: [
      {
        name: "The AI Video Script Writer",
        prompt:
          "Role: Act as a viral educational content creator and video director specializing in high-engagement short-form content.\n\nContext: I want to create a 60-second educational YouTube Short / Instagram Reel using an AI video generator (like InVideo, Runway, or Google Veo). The topic is [Insert Topic, e.g. The Water Cycle / Basic Financial Literacy]. My target audience is [Insert Student Demographic, e.g. easily distracted 8th graders / young adults entering their first jobs]. They respond well to [Insert Cultural Reference, e.g. gaming analogies, Bollywood drama, or fast-paced sports examples].\n\nAction: Write a fast-paced, 60-second script with a massive 'hook' in the first 3 seconds to stop them from scrolling. For every line of spoken dialogue, provide a highly specific visual prompt that I can feed into the AI video generator so it creates the exact right image or animation.\n\nFormat: A two-column table. Column 1: 'Audio (Spoken Script in conversational English/Hinglish)'. Column 2: 'Visual Prompt (Exact description for the AI Video Generator)'.",
      },
      {
        name: "The Direct Infographic Generator",
        prompt:
          "Role: Act as an expert visual designer and infographic creator.\n\nContext: I need a ready-to-use infographic image about [Insert Topic, e.g. The Rules of Grammar / Solar System] for my students who are [Insert Student Demographic, e.g. 6th graders in a rural school / youth in a vocational program]. They need highly visual content with very little text.\n\nAction: Generate a vertical infographic image directly. Use a clean, colorful, and engaging layout. Include exact, short text elements: a bold main title, 3 to 4 key facts (maximum 5 words each), and culturally relatable Indian illustrations like [Insert Specific Visuals, e.g. a local street market, a banyan tree, or a cricket match] next to each fact.\n\nFormat: A directly generated, downloadable image. Ensure all text in the image is spelled correctly in simple English.",
      },
      {
        name: "The NotebookLM Audio Guide",
        prompt:
          "Role: Act as a charismatic podcast producer and educational scriptwriter.\n\nContext: I have a set of dry, factual lecture notes on [Insert Topic]. I want to use an AI audio tool (like NotebookLM or ElevenLabs) to turn these notes into a conversational, 5-minute educational podcast for [Insert Student Demographic, e.g. college students commuting on the train / 9th graders who prefer auditory learning].\n\nAction: Take the following raw notes: [Paste Notes]. Summarize and rewrite them into a lively, 2-person podcast script (Host A and Host B). Ensure the hosts use relatable cultural examples (like comparing the nervous system to a city's traffic-light network or a WhatsApp group chat) to explain the core concepts.\n\nFormat: A formatted dialogue script with clear character names (Host A and Host B), indicating when they should sound excited, confused, or make a lighthearted joke.",
      },
    ],
    extraTools: [
      {
        name: "Video Generators",
        instructions:
          "Copy the script the AI generated. Go to an AI video generator like InVideo AI (invideo.io), Google Veo, or Seedance. Paste the script into the prompt box and click 'Generate Video'. Use the visual prompts from each row to fine-tune scenes if needed.",
      },
      {
        name: "Infographics",
        instructions:
          "Don't use standard ChatGPT for this — open a visual AI tool like Microsoft Copilot (copilot.microsoft.com), ChatGPT Plus, or Ideogram.ai. Paste the prompt and wait for the image. If a word is misspelled, just reply 'Fix the spelling of [Word]' and let it regenerate, then download the final image.",
      },
      {
        name: "NotebookLM",
        instructions:
          "Go to Google NotebookLM (notebooklm.google.com). Create a new notebook and paste your lecture notes or upload your textbook PDF. Click 'Audio Overview' to generate a lifelike 2-person podcast. Note: it currently produces the best audio in English.",
      },
    ],
  },
  {
    id: "inclusive-educator",
    order: 4,
    title: "The Inclusive Educator",
    subtitle: "Differentiated & Multilingual",
    icon: "ti-accessible",
    tone: "blue",
    videoConcept:
      "How AI adapts the same lesson for every learner — simplifying reading level, bridging languages, and scaffolding tough tasks so no one is left behind.",
    actionDemoConcept:
      "Screen recording: take one paragraph and instantly produce an easier reading-level version, a bilingual version, and a scaffolded step-by-step breakdown.",
    videoUrl: "https://youtu.be/ZFRxjJV5jok",
    templates: [
      {
        name: "The Reading Level Adapter",
        prompt:
          "Role: Act as an inclusive educator and reading specialist.\n\nContext: I am teaching [Insert Topic] to [Insert Student Demographic, e.g. 6th graders in a rural NGO / students learning English as a second language]. The standard textbook article is way too complex and uses heavy jargon, causing them to lose interest.\n\nAction: Rewrite the following article: [Paste Text]. Adapt it to a much simpler, 5th-grade reading level. Do not lose the core facts or dates. Replace complex vocabulary with simple everyday words. Where possible, add a culturally relatable reference (like popular cartoons, cricket, or local festivals) to explain the hardest concept.\n\nFormat: A short, engaging article divided into 3 small paragraphs. Bold the most important keywords. Include 3 simple 'True/False' check-for-understanding questions at the bottom.",
      },
      {
        name: "The Bilingual Bridge",
        prompt:
          "Role: Act as a multilingual translator and cultural bridge for educators.\n\nContext: I am introducing a new chapter on [Insert Topic] to [Insert Student Demographic, e.g. 8th graders in a Mumbai municipal school / first-generation learners]. They understand concepts well in their mother tongue but struggle with the English scientific/technical jargon.\n\nAction: Take the following list of complex terms: [Paste List of Words]. Translate each term into simple, conversational Hindi (or Hinglish). Do not use pure academic Hindi unless it is commonly used. Provide a phonetic pronunciation guide for the English word so they can say it confidently, and a 1-sentence everyday analogy for each word.\n\nFormat: Create a 4-column table: 'English Term', 'Phonetic Pronunciation', 'Simple Hindi Meaning', and 'Everyday Analogy'.",
      },
      {
        name: "The Scaffolding Tool",
        prompt:
          "Role: Act as an expert in special education and executive functioning.\n\nContext: I have assigned a major project to [Insert Student Demographic, e.g. easily overwhelmed 9th graders / students with ADHD]. The assignment is: [Paste Assignment Description]. Looking at this big task, my students feel overwhelmed and don't know where to start.\n\nAction: Break this massive assignment down into microscopic, highly actionable, daily steps. Make each step feel like a tiny, achievable 'win'.\n\nFormat: A checklist titled 'Your Daily Mission'. Use encouraging language and estimate how many minutes each tiny step should take (e.g. 'Step 1: 5 Minutes').",
      },
    ],
    extraTools: [
      {
        name: "Diffit",
        instructions:
          "Go to Diffit (web.diffit.me). Paste any English article, PDF, or YouTube link into the search bar. Select the exact grade reading level you want (e.g. 4th Grade) and click 'Generate Resources'. Diffit instantly rewrites the text to that level and auto-generates vocabulary lists and multiple-choice questions to download.",
      },
      {
        name: "Microsoft Immersive Reader",
        instructions:
          "For students with dyslexia or visual impairments, use Microsoft Immersive Reader (built into Word, the Edge browser, and OneNote). Open your text, click the 'View' tab, then 'Immersive Reader'. It spaces out words, reads text aloud in a natural voice, and can translate words into Hindi or regional languages when a student clicks them.",
      },
    ],
  },
  {
    id: "admin-assistant",
    order: 5,
    title: "The Admin Assistant",
    subtitle: "Newsletters, Reports & Email",
    icon: "ti-mail",
    tone: "orange",
    videoConcept:
      "How AI clears your paperwork — parent newsletters, progress reports and professional emails — in minutes so you get your evenings back.",
    actionDemoConcept:
      "Screen recording: turn a few bullet points into a warm multilingual parent newsletter, auto-draft progress-report comments, and polish a formal outreach email.",
    videoUrl: "https://youtu.be/nFa6T4Qtlx4",
    templates: [
      {
        name: "The Multilingual Parent Newsletter",
        prompt:
          "Role: Act as a warm, empathetic educator and school communications expert.\n\nContext: I need to send a monthly update to the parents of my class. My students are [Insert Student Demographic, e.g. 6th graders in a rural NGO / 10th graders in Mumbai]. Many parents have limited formal education and do not speak fluent English. We recently learned about [Insert Topics Learned, e.g. the Solar System and basic fractions].\n\nAction: Write a friendly, 3-paragraph monthly newsletter updating the parents. Celebrate the students' hard work. Avoid all heavy academic jargon; explain what they learned in the simplest terms.\n\nFormat: Provide two versions — one in simple, accessible English, and one in conversational, everyday Hindi (avoiding overly formal 'Shuddh Hindi' so it sounds natural on WhatsApp).",
      },
      {
        name: "Automated Progress Reports",
        prompt:
          "Role: Act as a professional academic coordinator and encouraging mentor.\n\nContext: I am writing official report-card comments for a student who is part of [Insert Student Demographic, e.g. a vocational training batch / a fast-paced 8th-grade classroom]. Here are my rough, messy notes about their performance this term: [Paste Notes].\n\nAction: Translate these rough notes into a professional, polished, and encouraging paragraph. Highlight their strengths and hard work first. Frame any weaknesses gently as 'areas for growth' or 'goals for next term' rather than outright failures.\n\nFormat: A 4-5 sentence paragraph, ready to be copied directly into an official school report card.",
      },
      {
        name: "The Professional Outreach Email",
        prompt:
          "Role: Act as a persuasive, professional school administrator.\n\nContext: I need to write an email to [Insert Recipient, e.g. the school principal / a local business owner / an NGO director] regarding my students, who are [Insert Student Demographic, e.g. underprivileged youth seeking internships / 9th graders planning a science fair]. I need to ask them for [Insert Request, e.g. permission for a field trip / a small donation of used laptops / a 10-minute meeting].\n\nAction: Write a formal, polite, and persuasive email making this request. Keep it highly respectful of their time. Briefly explain why this will profoundly benefit the students.\n\nFormat: Provide a catchy, clear email subject line, followed by a concise 3-paragraph email body.",
      },
    ],
    extraTools: [
      {
        name: "Google Workspace AI (Help me write)",
        instructions:
          "If your school uses Gmail or Google Docs, look for the 'Help me write' (magic-wand) button when you compose a new email or open a blank doc. Click it and type a short instruction (e.g. 'Write an email to parents about the upcoming Diwali holidays'). The AI drafts it right inside your document. Use 'Refine' to make the tone more formal, shorten, or expand it before sending.",
      },
    ],
  },
  {
    id: "gamification-guru",
    order: 6,
    title: "The Gamification Guru",
    subtitle: "Turning Lessons Into Games",
    icon: "ti-device-gamepad-2",
    tone: "red",
    videoConcept:
      "How AI builds escape rooms, trivia boards and live game-master activities so revision feels like play, not a test.",
    actionDemoConcept:
      "Screen recording: generate a 3-room text escape room, a Jeopardy board with an answer key, and run a live AI 'Game Master' round with the class.",
    videoUrl: "https://youtu.be/zpE-h5KxrwU",
    templates: [
      {
        name: "The Text-Based Escape Room",
        prompt:
          "Role: Act as an expert gamification designer and puzzle master.\n\nContext: I am teaching [Insert Topic, e.g. the Human Digestive System / India's Freedom Struggle] to [Insert Student Demographic, e.g. easily distracted 7th graders in Mumbai / 9th graders in a rural school]. I want to review the topic with a fun activity, but I have no budget for physical props.\n\nAction: Create a short, 3-room text-based 'Escape Room'. Use a relatable local Indian setting (e.g. locked inside a haunted haveli or a mysterious train compartment). Give me the vividly described scenario for Room 1 and a puzzle based on [Insert Topic] that students must solve to unlock Room 2.\n\nFormat: A structured outline with headings: 'Backstory', 'Room 1 Scenario', 'The Puzzle', 'A Hint (if they get stuck)', and 'The Teacher's Answer Key'. Do not give me Rooms 2 and 3 until I tell you they solved Room 1.",
      },
      {
        name: "The Jeopardy Board Generator",
        prompt:
          "Role: Act as an energetic TV game-show host and curriculum specialist.\n\nContext: I am conducting a review game for [Insert Student Demographic, e.g. competitive high schoolers / a vocational evening batch]. The subject we are reviewing is [Insert Topic]. I need a highly engaging trivia game to test their knowledge.\n\nAction: Create a Jeopardy-style trivia board. Create 4 fun, catchy category names related to the topic. For each category, provide 3 tiered questions of increasing difficulty (100 points easy, 200 medium, 300 hard). Ensure the questions require a mix of memory and critical thinking.\n\nFormat: A clean, easy-to-read table with categories as columns and the 100/200/300-point questions in the rows beneath. Below the table, provide a separate 'Teacher's Master Answer Key'.",
      },
      {
        name: "The AI Game Master",
        prompt:
          "Role: Act as a creative interactive storyteller and AI Game Master.\n\nContext: I want to turn today's lesson on [Insert Topic, e.g. the French Revolution / Environmental Science] into a live, interactive story for my class of [Insert Student Demographic, e.g. restless 8th graders].\n\nAction: Start an interactive text-adventure game. Set the scene vividly, place the students in the shoes of a character living through this topic, and present them with a difficult situation. Give them 3 distinct choices of what to do next (Option A, B, or C).\n\nFormat: Provide 'Scene 1' and the 3 options. CRITICAL: Stop writing after presenting the 3 options. Wait for me to reply with the students' choice before you generate the consequences and 'Scene 2'.",
      },
    ],
    extraTools: [
      {
        name: "Blooket",
        instructions:
          "Generate your 10-15 quiz/trivia questions using ChatGPT. Go to Blooket.com (free for teachers) and create an account. Click 'Create a Set' and copy-paste your AI-generated questions and answers. When ready, hit 'Host' — Blooket turns plain multiple-choice questions into fast-paced arcade games (Gold Quest, Cafe, Tower Defense). Project the game on screen; students answer on their phones.",
      },
      {
        name: "ChatGPT Voice Mode",
        instructions:
          "To make the AI Game Master truly magical, open the ChatGPT app on your phone and tap the Voice Mode icon (headphones). Read the prompt out loud. The AI speaks the story to the whole class — let students shout Option A, B, or C, and you simply speak their choice back to the phone.",
      },
    ],
  },
  {
    id: "data-detective",
    order: 7,
    title: "The Data Detective",
    subtitle: "Spot Trends & Fix Gaps",
    icon: "ti-chart-dots",
    tone: "indigo",
    videoConcept:
      "How AI reads your marks and attendance sheets to flag at-risk students early and even audit your own test questions for flaws.",
    actionDemoConcept:
      "Screen recording: upload a marks/attendance spreadsheet, ask which students need attention and why, and get a plain-English summary with next steps.",
    videoUrl: "https://youtu.be/CI_mS_Arp6c",
    templates: [
      {
        name: "The Early Warning Spotter",
        prompt:
          "Role: Act as a data-driven academic counselor and learning-analytics expert.\n\nContext: I have a spreadsheet of anonymous quiz scores from the last 4 weeks for [Insert Student Demographic, e.g. 8th graders in a rural NGO / 11th-grade science students in Mumbai]. I don't have time to manually analyze every trend line.\n\nAction: Analyze the following data: [Paste Data of marks/results]. Identify which 3 to 5 students are showing a consistent downward trend or erratic performance drops. Don't just list the numbers; suggest a brief, empathetic 5-minute intervention strategy I can use to approach them tomorrow without making them feel defensive or scolded.\n\nFormat: A clear summary table titled 'At-Risk Students' with their performance trend, followed by a section titled 'Intervention Plan' with 3 suggested conversation starters.",
      },
      {
        name: "The Attendance Analyzer",
        prompt:
          "Role: Act as an empathetic school administrator and behavioral data analyst.\n\nContext: I am reviewing a month of attendance data for [Insert Student Demographic, e.g. a vocational evening batch for working youth / 9th graders in a municipal school]. Chronic absenteeism is a major hurdle to their learning.\n\nAction: Analyze the following attendance data: [Paste Data]. Identify any hidden or recurring patterns (e.g. dropping attendance on specific days of the week, after exams, or around specific local festivals). Then suggest 3 practical, community-based outreach strategies to engage these students or their parents without sounding like a threat.\n\nFormat: A short analytical summary of the patterns discovered, followed by a bulleted list of 3 specific, low-cost outreach actions.",
      },
      {
        name: "The Question Flaw Finder",
        prompt:
          "Role: Act as an expert psychometrician and curriculum evaluator.\n\nContext: I just graded a test for [Insert Student Demographic, e.g. 10th graders preparing for board exams / 6th-grade ESL learners]. Here are the percentages of students who got each question wrong: [Paste Data].\n\nAction: Based on the high failure rates on specific questions, identify which two or three questions likely confused students due to poor wording, tricky phrasing, or cultural disconnects (rather than just a lack of student knowledge). Explain why these questions might have failed and how I should re-teach that concept tomorrow.\n\nFormat: Identify the flawed questions clearly, provide a 2-sentence explanation of the likely confusion for each, and give a 1-sentence 'reteach strategy' using a simpler example.",
      },
    ],
    extraTools: [
      {
        name: "ChatGPT/Gemini Data Analysis (File Upload)",
        instructions:
          "You don't need to type or copy-paste rows of scores. Open ChatGPT or Gemini and look for the '+' or paperclip (Attachment) icon. Click it to upload your Excel (.xlsx) or CSV file of scores or attendance. CRITICAL PRIVACY STEP: never upload real student names or phone numbers — delete the 'Name' column or replace names with 'Student 1, Student 2' first. Then paste the Early Warning Spotter or Attendance Analyzer prompt along with the file and generate.",
      },
    ],
  },
  {
    id: "teacher-coach",
    order: 8,
    title: "The Teacher Coach",
    subtitle: "Improve Your Own Craft",
    icon: "ti-user-star",
    tone: "green",
    videoConcept:
      "How AI acts as your private coach — analysing your talk-time, sharpening your questioning, and turning your lessons into bite-sized micro-learning.",
    actionDemoConcept:
      "Screen recording: paste a lesson transcript, ask the AI how much you talked vs the students, and get concrete tips to raise student participation.",
    videoUrl: "https://youtu.be/jYPPGK4sXQM",
    templates: [
      {
        name: "The Talk-Time Analyzer",
        prompt:
          "Role: Act as a highly observant educational coach and classroom-communication analyst.\n\nContext: I am evaluating my teaching style with [Insert Student Demographic, e.g. easily distracted 7th graders in a public school / adults in an evening vocational batch]. I want to make sure I am not just lecturing at them, but actually letting them speak and think.\n\nAction: Here is the auto-generated transcript of my recent lecture: [Paste Transcript]. Calculate my 'Teacher Talk Time' versus 'Student Talk Time' as a percentage. Highlight specific sections where I spoke uninterrupted for too long and missed an opportunity to let students participate.\n\nFormat: A clear 'Performance Summary' table with the percentages, followed by 3 actionable, empathetic tips on how to pause and invite more student voices tomorrow.",
      },
      {
        name: "The Questioning Technique Coach",
        prompt:
          "Role: Act as an expert pedagogy coach specializing in critical thinking and student engagement.\n\nContext: I taught a lesson to [Insert Student Demographic, e.g. 9th graders in a rural NGO / 10th graders in Mumbai]. I tend to ask too many closed questions, which shuts down classroom discussion.\n\nAction: Review the following transcript of my lesson: [Paste Transcript]. Identify all the 'Closed' (Yes/No) questions I asked. Explain briefly why they shut down thinking. Then rewrite each into a powerful 'Open-ended' question that forces students to think, using a relatable cultural analogy (a famous Bollywood plot, a local cricket match, or a neighborhood festival) to make it more engaging.\n\nFormat: A 'Before & After' table with columns: 'What I Asked (Yes/No)', 'Why It Failed', and 'The Better Open-Ended Question (with analogy)'.",
      },
      {
        name: "The Micro-Learning Generator",
        prompt:
          "Role: Act as a master teacher-trainer and professional-development mentor.\n\nContext: I teach [Insert Student Demographic, e.g. 6th graders in a low-resource school / teenagers preparing for college]. I want to improve my teaching skills, specifically regarding [Insert Pedagogical Concept, e.g. Culturally Responsive Pedagogy / Flipped Classroom / Differentiated Instruction]. I only have 15 minutes right now.\n\nAction: Teach me the absolute core basics of this concept. Don't give me heavy academic theory — teach me using 3 quick, highly interactive, real-world classroom scenarios where I have to guess the right approach.\n\nFormat: A bite-sized, 3-step interactive lesson just for me. Give me Scenario 1 and wait for my reply before giving the answer and moving to Scenario 2.",
      },
    ],
    extraTools: [
      {
        name: "Live Transcription (Otter.ai / Zoom / MS Teams)",
        instructions:
          "To get your lecture transcript: if you teach online, turn on 'Captions/Transcripts' in Zoom or Google Meet before you start and download the text file after class. If you teach in a physical classroom, download the free Otter.ai app, put your phone on your desk, and hit 'Record' — it types out everything you say. After class, copy the text and paste it with the Talk-Time Analyzer or Questioning Technique prompt above.",
      },
    ],
  },
  {
    id: "career-life-skills-coach",
    order: 9,
    title: "The Career & Life Skills Coach",
    subtitle: "Interviews, Resumes & Readiness",
    icon: "ti-briefcase",
    tone: "blue",
    videoConcept:
      "How AI runs realistic mock interviews and formats student resumes so learners walk into real opportunities with confidence.",
    actionDemoConcept:
      "Screen recording: let a student practise a mock interview with the AI answering back, then turn their rough details into a clean one-page resume.",
    videoUrl: "https://youtu.be/6dNxjTrszJ8",
    templates: [
      {
        name: "The Mock Interviewer",
        prompt:
          "Role: Act as a strict but constructive HR manager and professional interviewer.\n\nContext: I am a student from [Insert Student Demographic, e.g. a low-income urban background / a local high school] and I am preparing for a [Insert Job/Interview type, e.g. retail associate role / admission interview with a senior counselor]. I need to practice speaking confidently.\n\nAction: Conduct a mock interview with me. Ask me one standard interview question at a time. Wait for my answer before moving on. After I answer, briefly correct my spoken English or suggest a stronger way to phrase it, then ask the next question.\n\nFormat: A live, back-and-forth conversational interaction. Do not generate the whole interview at once.",
      },
      {
        name: "Resume & CV Formatting",
        prompt:
          "Role: Act as an expert career counselor and professional resume writer.\n\nContext: My student, who is [Insert Student Demographic, e.g. a first-generation learner / a high schooler applying for a summer internship], needs a professional resume. They only have messy, rough notes about their past experiences and school projects.\n\nAction: Take the following rough notes: [Paste Notes]. Transform them into powerful, action-oriented resume bullet points. Use strong action verbs (Managed, Created, Led). Highlight transferable skills (teamwork, punctuality, problem-solving) even if they don't have formal work experience.\n\nFormat: A clean, bulleted list categorized by 'Experience' and 'Skills', ready to be copied into a resume template.",
      },
    ],
    extraTools: [
      {
        name: "ChatGPT Voice Mode",
        instructions:
          "To make the Mock Interviewer effective, don't type your answers. Open the ChatGPT app on your phone, tap the Voice Mode icon (headphones), and read the prompt out loud. The AI replies like a real interviewer — have your student speak directly into the phone to answer and get live, spoken feedback.",
      },
    ],
  },
  {
    id: "emotional-intelligence-aid",
    order: 10,
    title: "The Emotional Intelligence Aid",
    subtitle: "Sensitive Topics & Wellbeing",
    icon: "ti-heart-handshake",
    tone: "red",
    videoConcept:
      "How AI helps you prepare for hard conversations, de-escalate tense moments, and lead calm mindfulness resets — building a safer classroom.",
    actionDemoConcept:
      "Screen recording: pressure-test a sensitive lesson before teaching it, generate calm de-escalation scripts, and create a 2-minute focus/mindfulness activity.",
    videoUrl: "https://youtu.be/zG5i8mk4ZQo",
    templates: [
      {
        name: "The Pre-Session Sensitivity Check",
        prompt:
          "Role: Act as a culturally aware educational counselor and sensitivity reader.\n\nContext: I am preparing to teach a lesson on [Insert Sensitive Topic, e.g. workplace rights, gender equality, or mental health] to [Insert Student Demographic, e.g. 10th graders in Mumbai / a mixed-gender youth group in a rural NGO].\n\nAction: I want to keep my classroom a safe, respectful space. What are the biggest cultural sensitivities, hidden biases, or potential triggers I should be aware of before introducing this topic to these specific students? Suggest 2 ground rules I should establish at the start of class.\n\nFormat: A bulleted safety checklist categorized by 'Cultural Sensitivities' and 'Suggested Ground Rules'.",
      },
      {
        name: "De-escalation Scripts",
        prompt:
          "Role: Act as an expert in behavioral psychology and conflict resolution for educators.\n\nContext: I am teaching [Insert Student Demographic, e.g. restless Class 10 ICSE students / young adults in a vocational program]. In the middle of the lesson, a student suddenly says: '[Insert Disruptive Quote, e.g. This is a waste of time, or an inappropriate comment]'.\n\nAction: I need to keep control of the classroom without yelling, shaming, or completely shutting the student down. Give me 3 distinct verbal strategies to de-escalate in the moment, acknowledge their energy, and redirect the class smoothly.\n\nFormat: 3 short, exact scripts I can say out loud (e.g. The Empathetic Pivot, The Boundary Setter, and The Curious Question).",
      },
      {
        name: "The Mindfulness & Focus Aid",
        prompt:
          "Role: Act as a mindfulness coach and student-wellbeing expert.\n\nContext: My students, who are [Insert Student Demographic, e.g. Class 10 students highly stressed about board exams / easily distracted younger kids], are feeling highly anxious, overwhelmed, and unfocused.\n\nAction: Generate a 2-minute guided breathing and motivational script. Use grounding techniques (like focusing only on the effort they can control, rather than the final grade) to calm their nerves before a major test or a difficult lesson.\n\nFormat: A spoken script with bracketed [Pause for 3 seconds] stage directions so I can read it to the class at the perfect, calming pace.",
      },
    ],
    extraTools: [
      {
        name: "Live De-escalation Practice (ChatGPT Voice Mode)",
        instructions:
          "After reading the De-escalation Scripts above, practise them in real time. Open the ChatGPT app on your phone and tap the Voice Mode icon. Tell the AI: 'Act as a disruptive student in my classroom. Give me a difficult attitude and let me practise de-escalating you. Stop after your first disruption and wait for me to respond.' Practise using your calm, authoritative teacher voice to talk the AI down.",
      },
    ],
  },
];

// ─────────────────────────── 60-minute live workshop ───────────────────────────

export interface WorkshopSlot {
  time: string;
  focus: string;
  minutes: string;
}

export interface WorkshopPart {
  title: string;
  window: string;
  scenario?: string;
  script?: string;
  actions?: string[];
}

export const workshopSchedule: WorkshopSlot[] = [
  { time: "0–10 min", focus: "Warm-up & Framing: Real problems meet the 3-Move Framework.", minutes: "10 min" },
  { time: "10–22 min", focus: "Module 1 Lab: Syllabus Design & The Plan-B Panic Button.", minutes: "12 min" },
  { time: "22–32 min", focus: "Module 2 Lab: Writing Outreach to Placement Authorities.", minutes: "10 min" },
  { time: "32–47 min", focus: "Module 5 Lab: Sensitive Topics & Instant Roleplay Scripts.", minutes: "15 min" },
  { time: "47–53 min", focus: "The Handoff: Launching the portal & the Trainer's Pledge.", minutes: "6 min" },
  { time: "53–60 min", focus: "Interactive Q&A: Testing custom trainer challenges live.", minutes: "7 min" },
];

export const workshopParts: WorkshopPart[] = [
  {
    title: "Part 1 · Warm-Up & Framing",
    window: "0–10 min",
    script:
      '"Welcome, everyone! Think of one moment last week where you wished you had a smarter sounding board — a tough student situation, a lesson plan late at night, or an email you were dreading. What was it?" (Take 2 responses, write them on the board.) "A search engine gives you links, but AI thinks with you. We use the 3-Move Framework: set the scene with context, ask for multiple options, and push it further to refine the style. We built a dedicated AI-for-Trainers portal so you can copy-paste these exact recipes on your phones during class."',
  },
  {
    title: "Part 2 · Module 1 Lab — Syllabus & Crisis Management",
    window: "10–22 min",
    scenario:
      "You need to design a 4-session job-readiness module for youth who have never held a formal job, but attendance is inconsistent.",
    actions: [
      "Project your screen. Open Module 1: The Master Planner.",
      "Drop the template prompt live into Gemini/ChatGPT to generate a 4-session outline.",
      'Simulate a crisis: "Only 4 students showed up." Use the Plan-B Panic Button to generate a zero-prep 5-minute game instantly.',
    ],
  },
  {
    title: "Part 3 · Module 2 Lab — Getting Through to Authorities",
    window: "22–32 min",
    scenario:
      "You need a college placement officer to refer students to your program, but they haven't replied to your last two emails.",
    actions: [
      "Open Module 2: The Communication Wizard. Copy the follow-up template.",
      "Show the output: a warm, professional follow-up under 120 words with a low-commitment 10-minute ask.",
      '"You can copy this straight into your email app."',
    ],
  },
  {
    title: "Part 4 · Module 5 Lab — Managing Sensitive Topics",
    window: "32–47 min",
    scenario:
      "Preparing youth for their first jobs by covering sensitive topics like workplace harassment rights or gender consent.",
    actions: [
      '"AI doesn\'t replace your empathy — it builds your confidence before you walk into the room."',
      'Open the Instant Roleplay Generator. Input: "Handling a rude coworker." Project the script side-by-side.',
      "Call up two trainers to read the script aloud for 60 seconds.",
    ],
    script:
      '"A structured script immediately removes the classroom awkwardness and gets students talking safely without having to share personal experiences."',
  },
  {
    title: "Part 5 · The Portal Handoff & Action Pledge",
    window: "47–53 min",
    actions: [
      "Bring up the QR code linking directly to the trainer portal.",
      '"Every prompt, email format, and game generator we used is free on the portal. Take out your phones, scan, and bookmark it right now."',
      "Ask everyone to open one template they pledge to use in class this coming week.",
    ],
  },
  {
    title: "Part 6 · Interactive Q&A",
    window: "53–60 min",
    script:
      '"Ask me any \'how do I do X with AI\' question." If a trainer asks a challenging question, don\'t lecture — open a tool builder live on the projector, type it in together, and say: "Let\'s find out what works together."',
  },
];
