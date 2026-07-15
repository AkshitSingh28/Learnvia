/**
 * Demo seed data. Powers every page so the website is fully viewable before any
 * real Firestore content exists. When live data lands, repositories can replace
 * these getters while pages stay unchanged.
 */
import type {
  Application,
  Badge,
  Certificate,
  Cohort,
  Module,
  Ngo,
  NotificationItem,
  PortfolioItem,
  Project,
  Readiness,
  StudentSummary,
  Submission,
} from "@/lib/types";
// Phase-2 tracks (foundation + 5 skill tracks) and Phase-3 portals now live in
// dedicated content modules; re-exported here so existing imports keep working.
export { tracks } from "@/lib/seed/phase2";
export { portals, applicationChecklist, roadmapTiers } from "@/lib/seed/phase3";
export {
  foundationTrack,
  skillTracks,
  chooserQuestions,
  module5,
  readinessPortfolioChecklist,
  readinessCheckItems,
  webRubric,
  webSubmissionChecklist,
  webPassingBands,
} from "@/lib/seed/phase2";

/**
 * Real Phase-1 content. Each module carries its own lessons, flashcards, prompt-lab, and quiz.
 * NOTE: `videoUrl` points at a curated explainer placeholder — replace with the team's unlisted
 * uploads (the planned YouTube/Vimeo-unlisted approach) without any code change.
 */
type ModuleContent = Pick<Module, "title" | "subtitle" | "lessons" | "flashcards" | "promptLab" | "quiz" | "task" | "badge" | "reflection" | "videoLengthLabel" | "videoUrl">;

const PHASE1: ModuleContent[] = [
  {
    title: "AI Basics for Students",
    subtitle: "Understand how AI is part of daily life and how to use it for learning, safety, and growth.",
    videoUrl: "https://www.youtube.com/embed/bH80ZULZWqg",
    videoLengthLabel: "4:12",
    lessons: [
      { id: "l1", title: "What is AI, really?", body: "AI is software that learns patterns from data to make predictions or generate things — it isn't magic and it isn't always right.", examples: ["YouTube recommendations", "Google Maps ETA", "Voice assistants"] },
      { id: "l2", title: "AI you already use", body: "You interact with AI dozens of times a day without noticing — in search, maps, photos, and autocorrect.", examples: ["Gmail Smart Reply", "Google Photos search", "Spam filters"] },
      { id: "l3", title: "What AI is good (and bad) at", body: "Great at summarising, drafting, and brainstorming. Weak at facts, fresh news, and anything needing real-world judgement.", examples: ["Good: rewrite my email", "Risky: give me today's news", "Bad: medical advice"] },
      { id: "l4", title: "Using AI for growth", body: "Treat AI as a study partner and first-draft helper — not an answer machine you copy from." },
    ],
    flashcards: [
      { front: "What does AI stand for?", back: "Artificial Intelligence — software that learns patterns from data." },
      { front: "Name one thing AI is unreliable at.", back: "Stating facts — it can sound confident but be wrong (a 'hallucination')." },
      { front: "Is AI always right?", back: "No. Always verify important answers from a trusted source." },
    ],
    promptLab: ['"Explain how AI recommends videos, in simple words for a beginner."', '"List 5 ways a student can use AI ethically for studying."'],
    quiz: [
      { id: "q1", prompt: "Which is an example of AI in daily life?", options: ["A calculator", "Google Maps route prediction", "A ceiling fan", "A printed book"], answerIndex: 1 },
      { id: "q2", prompt: "AI is LEAST reliable for…", options: ["Brainstorming ideas", "Rewriting a paragraph", "Giving today's breaking news", "Summarising your notes"], answerIndex: 2 },
      { id: "q3", prompt: "When AI gives a confident-sounding fact, you should…", options: ["Trust it completely", "Verify it from a reliable source", "Ignore it", "Share it immediately"], answerIndex: 1 },
      { id: "q4", prompt: "What does 'AI' stand for?", options: ["Automatic Internet", "Artificial Intelligence", "Advanced Input", "Applied Information"], answerIndex: 1 },
      { id: "q5", prompt: "AI mainly learns from…", options: ["Magic", "Patterns in data", "The weather", "Printed books only"], answerIndex: 1 },
      { id: "q6", prompt: "A good way for a student to use AI is to…", options: ["Copy answers in an exam", "Get help understanding a topic", "Cheat in tests", "Avoid studying"], answerIndex: 1 },
      { id: "q7", prompt: "An 'AI hallucination' means…", options: ["The AI is tired", "The AI made up something false but confident", "A screen error", "A computer virus"], answerIndex: 1 },
      { id: "q8", prompt: "Which task is AI well suited for?", options: ["Drafting a first version of an email", "Giving live cricket scores", "Replacing your teacher", "Doing nothing"], answerIndex: 0 },
      { id: "q9", prompt: "Which is safe to do with AI?", options: ["Paste your bank password", "Ask a general study question", "Share a friend's private photos", "Upload your Aadhaar number"], answerIndex: 1 },
      { id: "q10", prompt: "The best mindset toward AI is to treat it as…", options: ["An always-correct oracle", "A helpful assistant you still check", "A replacement for thinking", "A toy with no real use"], answerIndex: 1 },
    ],
    task: "List 5 AI tools you already use without realising, and what each one does for you. Upload a screenshot or doc.",
    badge: "AI Basics Beginner",
    reflection: "Are you using AI only to get answers, or to actually understand and grow?",
  },
  {
    title: "Prompt Writing",
    subtitle: "Write clear prompts that get useful, reliable results from AI tools.",
    videoUrl: "https://www.youtube.com/embed/HRtG2l7tYi0",
    videoLengthLabel: "5:03",
    lessons: [
      { id: "l1", title: "Why prompts matter", body: "The quality of an AI's answer depends almost entirely on how you ask. Vague in, vague out.", examples: ["Vague: 'write something'", "Clear: 'write a 100-word intro for…'"] },
      { id: "l2", title: "The R-T-F formula", body: "Give a Role, a Task, and a Format. 'Act as a career coach (role). Review my resume bullet (task). Reply as 3 bullet points (format).'" },
      { id: "l3", title: "Add context & constraints", body: "Tell the AI who it's for, the tone, and the length. More relevant context = a sharper answer.", examples: ["'for a Class 12 student'", "'in simple English'", "'under 80 words'"] },
      { id: "l4", title: "Iterate, don't restart", body: "Refine with follow-ups: 'make it shorter', 'more formal', 'add an example' — instead of starting over." },
    ],
    flashcards: [
      { front: "What does the R-T-F formula stand for?", back: "Role, Task, Format." },
      { front: "Why add constraints like length or tone?", back: "They make the answer relevant and usable instead of generic." },
      { front: "Best way to improve a so-so answer?", back: "Iterate with follow-up instructions instead of re-typing the whole prompt." },
    ],
    promptLab: ['"Act as a mentor. Rewrite this sentence to sound confident: <paste>. Reply in one line."', '"Summarise this chapter into 5 exam-ready bullet points for a Class 10 student."'],
    quiz: [
      { id: "q1", prompt: "A good prompt is usually…", options: ["As short as possible", "Clear, with role/task/format", "Always one word", "Written in code"], answerIndex: 1 },
      { id: "q2", prompt: "Which adds useful context?", options: ["'write something nice'", "'for a Class 12 student, under 80 words'", "'do it now'", "'be good'"], answerIndex: 1 },
      { id: "q3", prompt: "If the first answer isn't great, you should…", options: ["Give up", "Refine with a follow-up instruction", "Copy it anyway", "Switch off AI"], answerIndex: 1 },
      { id: "q4", prompt: "What does the R-T-F formula stand for?", options: ["Read-Type-Finish", "Role-Task-Format", "Run-Test-Fix", "Repeat-Try-Fail"], answerIndex: 1 },
      { id: "q5", prompt: "'Act as a career coach' gives the AI a…", options: ["Format", "Role", "Length limit", "Mistake"], answerIndex: 1 },
      { id: "q6", prompt: "Adding 'reply in 5 bullet points' sets the…", options: ["Role", "Output format", "Audience", "Tone"], answerIndex: 1 },
      { id: "q7", prompt: "Which prompt will likely give the most useful answer?", options: ["'tell me about dogs'", "'Write 3 short tips to care for a puppy, for a first-time owner'", "'dogs?'", "'info'"], answerIndex: 1 },
      { id: "q8", prompt: "To change a formal answer into a friendly one, you should…", options: ["Start a brand-new chat", "Ask AI to rewrite it in a friendly tone", "Give up", "Use bigger words"], answerIndex: 1 },
      { id: "q9", prompt: "Why give the AI an audience like 'for a beginner'?", options: ["It wastes time", "It makes the answer fit the reader", "It is required by law", "It hides your identity"], answerIndex: 1 },
      { id: "q10", prompt: "When using an AI answer for schoolwork, you should…", options: ["Submit it as your own secretly", "Understand it and follow your school's rules", "Never read it", "Add fake sources"], answerIndex: 1 },
    ],
    task: "Take one weak prompt and rewrite it using Role-Task-Format. Share both versions and the AI's two answers.",
    badge: "Prompt Pro",
    reflection: "Did your clearer prompt actually change the quality of the answer? How?",
  },
  {
    title: "AI for Learning & Study Support",
    subtitle: "Use AI to study smarter — plans, summaries, and practice.",
    videoUrl: "https://www.youtube.com/embed/4PnIOpGvx9w",
    videoLengthLabel: "4:40",
    lessons: [
      { id: "l1", title: "Make a study plan", body: "Ask AI to turn a syllabus and a deadline into a realistic day-by-day plan you can actually follow." },
      { id: "l2", title: "Summarise & simplify", body: "Paste notes and ask for a 5-point summary, or 'explain like I'm 12' for tough topics.", examples: ["'Summarise in 5 bullets'", "'Explain simply with an analogy'"] },
      { id: "l3", title: "Practice & self-test", body: "Ask AI to generate quiz questions from your notes and to mark your answers with feedback." },
      { id: "l4", title: "Don't outsource thinking", body: "Use AI to check and coach — then write and solve in your own words so you actually learn." },
    ],
    flashcards: [
      { front: "One way AI helps before an exam?", back: "Generate practice questions from your own notes and quiz you." },
      { front: "How to handle a hard topic?", back: "Ask AI to explain it simply, with an everyday analogy." },
      { front: "The risk of copying AI answers?", back: "You don't learn — and it may be wrong. Rewrite in your own words." },
    ],
    promptLab: ['"Create a 7-day revision plan for my biology exam covering these chapters: <list>."', '"Make 5 practice questions from these notes and quiz me one at a time."'],
    quiz: [
      { id: "q1", prompt: "A good study use of AI is…", options: ["Letting it write your exam", "Generating practice questions from your notes", "Copying essays word for word", "Skipping revision"], answerIndex: 1 },
      { id: "q2", prompt: "To understand a hard topic, ask AI to…", options: ["Make it more complex", "Explain it simply with an analogy", "Use only jargon", "Ignore it"], answerIndex: 1 },
      { id: "q3", prompt: "Why rewrite AI answers in your own words?", options: ["It looks nicer", "So you actually learn and catch errors", "It's required by law", "To make it longer"], answerIndex: 1 },
      { id: "q4", prompt: "AI can help you plan study by turning a syllabus and deadline into a…", options: ["Random list", "Day-by-day study plan", "Single answer", "Game"], answerIndex: 1 },
      { id: "q5", prompt: "A safe way to self-test with AI is to ask it to…", options: ["Give you the exam paper", "Quiz you on your notes and check your answers", "Do your homework", "Delete your notes"], answerIndex: 1 },
      { id: "q6", prompt: "If AI explains something and you still don't get it, you should…", options: ["Give up", "Ask it to explain differently or more simply", "Copy it anyway", "Ignore the topic"], answerIndex: 1 },
      { id: "q7", prompt: "Letting AI do all your thinking can cause you to…", options: ["Learn faster always", "Not actually learn the skill", "Become an expert instantly", "Save the topic forever"], answerIndex: 1 },
      { id: "q8", prompt: "Which is the best study prompt?", options: ["'study'", "'Make 5 practice questions from these notes and quiz me one at a time'", "'help'", "'notes'"], answerIndex: 1 },
      { id: "q9", prompt: "Using AI to make practice questions that you then answer yourself is…", options: ["Cheating", "A fair way to learn", "Illegal", "Useless"], answerIndex: 1 },
      { id: "q10", prompt: "After AI summarises a chapter, a smart next step is to…", options: ["Never read the chapter", "Check the summary against your notes for mistakes", "Trust it blindly", "Delete the chapter"], answerIndex: 1 },
    ],
    task: "Generate a 7-day study plan with AI for a real upcoming test, then tweak it to fit your routine. Upload it.",
    badge: "Smart Learner",
    reflection: "Did AI help you understand, or just help you avoid the work?",
  },
  {
    title: "AI for Content Creation",
    subtitle: "Draft, edit, and improve content with AI assistance.",
    videoUrl: "https://www.youtube.com/embed/Y3KyUYO88SU",
    videoLengthLabel: "5:20",
    lessons: [
      { id: "l1", title: "Draft faster", body: "Use AI for the blank-page problem: get a rough first draft, then make it yours.", examples: ["Captions", "Emails", "Bios", "Blog intros"] },
      { id: "l2", title: "Edit & improve", body: "Ask AI to fix grammar, change tone, shorten, or make a paragraph punchier." },
      { id: "l3", title: "Match audience & tone", body: "Tell AI who will read it — a recruiter, a teacher, Instagram — so the voice fits.", examples: ["'professional for a recruiter'", "'friendly for Instagram'"] },
      { id: "l4", title: "Keep it honest", body: "Fact-check claims and add your real experience. AI assists; your authenticity sells." },
    ],
    flashcards: [
      { front: "Best first use of AI in writing?", back: "Beating the blank page with a rough first draft you then edit." },
      { front: "How to fix the tone of a draft?", back: "Tell AI the audience and ask it to rewrite in that tone." },
      { front: "What must you still do after AI drafts?", back: "Fact-check and add your own real voice/experience." },
    ],
    promptLab: ['"Write 3 LinkedIn post drafts about finishing an AI course, friendly and under 60 words each."', '"Rewrite this paragraph to sound more professional for a recruiter: <paste>."'],
    quiz: [
      { id: "q1", prompt: "AI is most helpful for content when you…", options: ["Publish its draft untouched", "Use it to draft, then edit and personalise", "Never edit", "Only use it for spelling"], answerIndex: 1 },
      { id: "q2", prompt: "To match the right voice, tell AI…", options: ["Nothing", "Who the audience is and the tone", "To be random", "To use big words"], answerIndex: 1 },
      { id: "q3", prompt: "Before publishing AI content you should…", options: ["Fact-check and add your voice", "Post immediately", "Hide that you wrote it", "Add errors"], answerIndex: 0 },
      { id: "q4", prompt: "The biggest first benefit of AI in writing is…", options: ["Beating the blank page with a first draft", "Printing faster", "Avoiding all editing", "Making it longer"], answerIndex: 0 },
      { id: "q5", prompt: "To fix grammar in a paragraph, you can ask AI to…", options: ["Delete it", "Proofread and correct the grammar", "Translate it to code", "Ignore it"], answerIndex: 1 },
      { id: "q6", prompt: "'For Instagram, friendly tone, under 50 words' mainly sets the…", options: ["Audience and tone", "File size", "Colour", "Price"], answerIndex: 0 },
      { id: "q7", prompt: "After AI drafts a caption, you should still…", options: ["Post it unchanged", "Edit it into your own voice and check facts", "Add mistakes", "Hide it"], answerIndex: 1 },
      { id: "q8", prompt: "Which is a good content prompt?", options: ["'write'", "'Write 3 friendly LinkedIn post drafts under 60 words about finishing a course'", "'post now'", "'content'"], answerIndex: 1 },
      { id: "q9", prompt: "If AI states a fact in your article, you should…", options: ["Assume it's true", "Verify it before publishing", "Delete your article", "Add more unverified facts"], answerIndex: 1 },
      { id: "q10", prompt: "Honest AI-assisted content means…", options: ["Pretending you did no editing", "Adding your real experience and checking claims", "Copying others' work", "Faking reviews"], answerIndex: 1 },
    ],
    task: "Draft a short bio or 3 social captions with AI, then edit them in your own voice. Share draft + final.",
    badge: "Content Creator",
    reflection: "Does the final piece still sound like you, or like a generic AI?",
  },
  {
    title: "AI for Design & Digital Creativity",
    subtitle: "Create visuals and ideas with AI design tools.",
    videoUrl: "https://www.youtube.com/embed/9Uop-T8-hSg",
    videoLengthLabel: "4:55",
    lessons: [
      { id: "l1", title: "AI in design tools", body: "Tools like Canva have built-in AI for backgrounds, text-to-image, and layout suggestions." },
      { id: "l2", title: "Describe what you want", body: "Image prompts work best with subject + style + mood + colours.", examples: ["'minimal poster, blue tones, flat illustration'"] },
      { id: "l3", title: "Iterate on visuals", body: "Generate options, pick the closest, then refine: 'same but brighter', 'add more space for text'." },
      { id: "l4", title: "Respect rights & credit", body: "Check tool licences before commercial use, and don't pass off others' work as yours." },
    ],
    flashcards: [
      { front: "What makes a good image prompt?", back: "Subject + style + mood + colours, described clearly." },
      { front: "How to improve a generated image?", back: "Iterate: keep what works and tweak one thing at a time." },
      { front: "One thing to check before commercial use?", back: "The tool's licence / usage rights." },
    ],
    promptLab: ['"Suggest 5 colour palettes for a student tech-club poster, with hex codes."', '"Describe an image prompt for a clean, minimal Instagram post about study tips."'],
    quiz: [
      { id: "q1", prompt: "A strong image prompt includes…", options: ["Only one word", "Subject, style, mood and colours", "Random emojis", "Your name"], answerIndex: 1 },
      { id: "q2", prompt: "If a generated image is close but not right, you…", options: ["Start from zero", "Iterate by tweaking one thing", "Give up", "Use it anyway"], answerIndex: 1 },
      { id: "q3", prompt: "Before using AI art commercially, check…", options: ["The licence/usage rights", "Nothing", "The file size only", "The weather"], answerIndex: 0 },
      { id: "q4", prompt: "Design tools like Canva can use AI to help with…", options: ["Backgrounds and text-to-image", "Cooking", "Phone calls", "Printing money"], answerIndex: 0 },
      { id: "q5", prompt: "The best way to improve a design after the first try is to…", options: ["Restart completely every time", "Refine one element at a time", "Never change it", "Delete it"], answerIndex: 1 },
      { id: "q6", prompt: "'Minimal poster, blue tones, flat illustration' describes the…", options: ["Price", "Visual style you want", "Deadline", "Your name"], answerIndex: 1 },
      { id: "q7", prompt: "A good practical use of AI in design is to…", options: ["Generate layout ideas you then refine", "Do nothing", "Copy a paid logo", "Break the tool"], answerIndex: 0 },
      { id: "q8", prompt: "Passing off someone else's design as your own is…", options: ["Fine", "Not okay — respect others' work", "Required", "Smart"], answerIndex: 1 },
      { id: "q9", prompt: "Which is a good design prompt?", options: ["'make it nice'", "'Suggest 5 colour palettes with hex codes for a student tech-club poster'", "'colours'", "'poster?'"], answerIndex: 1 },
      { id: "q10", prompt: "Before using a free tool's asset for a client, you should…", options: ["Ignore the rules", "Check its licence and watermark rules", "Buy everything", "Assume it's free forever"], answerIndex: 1 },
    ],
    task: "Design one poster or 3 social graphics using an AI-powered design tool. Share the link.",
    badge: "Creative Designer",
    reflection: "Did AI speed up your creativity, or replace your own ideas?",
  },
  {
    title: "AI Tools Lab",
    subtitle: "Explore a toolkit of trusted AI tools and what each is good for.",
    videoUrl: "https://www.youtube.com/embed/Dt28L6x5iJw",
    videoLengthLabel: "6:10",
    lessons: [
      { id: "l1", title: "Chat assistants", body: "General helpers for writing, explaining, and brainstorming.", examples: ["ChatGPT", "Gemini", "Claude"] },
      { id: "l2", title: "Design & media tools", body: "For visuals, slides, and video.", examples: ["Canva", "Gamma", "CapCut"] },
      { id: "l3", title: "Productivity tools", body: "For notes, research, and organising.", examples: ["Notion AI", "Perplexity"] },
      { id: "l4", title: "Pick the right tool", body: "Match the tool to the job — a chat assistant for text, a design tool for visuals — instead of forcing one tool for everything." },
    ],
    flashcards: [
      { front: "Which tool type is best for visuals?", back: "A design/media tool like Canva — not a text chat assistant." },
      { front: "What's a chat assistant best at?", back: "Writing, explaining, and brainstorming with text." },
      { front: "How do you choose a tool?", back: "Match the tool to the specific job you need done." },
    ],
    promptLab: ['"Recommend the best free AI tool for making a class presentation, and why."', '"Compare two AI note-taking tools for a student in 3 bullets each."'],
    quiz: [
      { id: "q1", prompt: "For making a slide deck quickly, the best fit is…", options: ["A spam filter", "A design tool like Gamma/Canva", "A calculator", "A music app"], answerIndex: 1 },
      { id: "q2", prompt: "A chat assistant is best for…", options: ["Editing raw video", "Writing and explaining text", "Printing", "Charging your phone"], answerIndex: 1 },
      { id: "q3", prompt: "The smart way to use AI tools is to…", options: ["Force one tool for everything", "Match the tool to the task", "Never switch tools", "Avoid all tools"], answerIndex: 1 },
      { id: "q4", prompt: "Which tool type is best for making visuals?", options: ["A chat assistant", "A design/media tool like Canva", "A calculator", "A spam filter"], answerIndex: 1 },
      { id: "q5", prompt: "A productivity tool like Notion AI or Perplexity is most useful for…", options: ["Notes and research", "Editing video", "Making pizza", "Charging devices"], answerIndex: 0 },
      { id: "q6", prompt: "If you need to write and explain text, the best choice is a…", options: ["Design tool", "Chat assistant", "Spreadsheet only", "Printer"], answerIndex: 1 },
      { id: "q7", prompt: "Choosing an AI tool should start with…", options: ["The tool you always use", "The job you need done", "The most expensive one", "A random pick"], answerIndex: 1 },
      { id: "q8", prompt: "A sensible free-first approach is to…", options: ["Buy every tool immediately", "Try free tools that fit the task first", "Avoid all tools", "Pay before testing"], answerIndex: 1 },
      { id: "q9", prompt: "Which is a good tool-comparison prompt?", options: ["'tools'", "'Compare two AI note-taking tools for a student in 3 bullets each'", "'help'", "'best?'"], answerIndex: 1 },
      { id: "q10", prompt: "Before trusting an AI tool with your work, you should…", options: ["Share all your passwords", "Check what data it collects and keep private info out", "Upload your bank details", "Skip reading anything"], answerIndex: 1 },
    ],
    task: "Pick a real task you have this week and choose the best AI tool for it. Note your choice and why.",
    badge: "Tool Explorer",
    reflection: "Are you reaching for the right tool, or just the one you know?",
  },
  {
    title: "One Topic, Many Outputs",
    subtitle: "Turn one idea into many learning outputs with AI.",
    videoUrl: "https://www.youtube.com/embed/RBBU4COIoXw",
    videoLengthLabel: "4:30",
    lessons: [
      { id: "l1", title: "The repurposing mindset", body: "One piece of work can become a summary, a quiz, a post, and a poster — multiplying its value." },
      { id: "l2", title: "From notes to many forms", body: "Turn a chapter into a summary, flashcards, a mind-map outline, and 3 social captions." },
      { id: "l3", title: "Build a mini portfolio piece", body: "Repurpose one project into proof: a write-up, a visual, and a short reflection." },
      { id: "l4", title: "Stay consistent", body: "Keep the core message the same across formats so your work feels coherent." },
    ],
    flashcards: [
      { front: "What is repurposing?", back: "Turning one piece of work into multiple formats (summary, quiz, post, poster)." },
      { front: "Why repurpose for a portfolio?", back: "It multiplies proof of work from a single effort." },
      { front: "What should stay constant across formats?", back: "The core message, so the work feels coherent." },
    ],
    promptLab: ['"Turn these notes into: a 5-point summary, 5 flashcards, and 2 social captions."', '"From this project, draft a short portfolio write-up and a one-line reflection."'],
    quiz: [
      { id: "q1", prompt: "Repurposing means…", options: ["Deleting your work", "Turning one idea into several formats", "Copying others", "Doing nothing"], answerIndex: 1 },
      { id: "q2", prompt: "From one chapter you could make…", options: ["Only a summary", "A summary, flashcards, and captions", "Nothing", "Just a title"], answerIndex: 1 },
      { id: "q3", prompt: "Across all formats you should keep…", options: ["A different message each time", "The core message consistent", "No message", "Random facts"], answerIndex: 1 },
      { id: "q4", prompt: "The main benefit of repurposing is…", options: ["More work for no reason", "Multiplying value from one effort", "Losing your work", "Confusing readers"], answerIndex: 1 },
      { id: "q5", prompt: "One project can become portfolio proof as a…", options: ["Write-up, visual and reflection", "Single blank page", "Deleted file", "Secret"], answerIndex: 0 },
      { id: "q6", prompt: "Which is a good repurposing prompt?", options: ["'repurpose'", "'Turn these notes into a 5-point summary, 5 flashcards and 2 captions'", "'notes'", "'do it'"], answerIndex: 1 },
      { id: "q7", prompt: "When you turn a report into a social post, you should…", options: ["Change all the facts", "Keep the core message but shorten it", "Remove the topic", "Make it much longer"], answerIndex: 1 },
      { id: "q8", prompt: "Repurposing helps a portfolio because it…", options: ["Creates many proofs from one piece of work", "Hides your work", "Wastes time", "Needs no effort"], answerIndex: 0 },
      { id: "q9", prompt: "Which set shows good repurposing of one topic?", options: ["Three unrelated topics", "Summary + flashcards + a post from the same topic", "One word", "Nothing"], answerIndex: 1 },
      { id: "q10", prompt: "When repurposing content that used AI, you should…", options: ["Hide it always", "Disclose AI use where required and keep facts accurate", "Invent sources", "Copy others"], answerIndex: 1 },
    ],
    task: "Take one topic and create 3 outputs from it (e.g. summary + flashcards + a post). Share all three.",
    badge: "Multiplier",
    reflection: "How much more value did you get from one idea by repurposing it?",
  },
  {
    title: "Safe & Responsible AI Use",
    subtitle: "Use AI safely, ethically, and responsibly.",
    videoUrl: "https://www.youtube.com/embed/WYfE_qAOccE",
    videoLengthLabel: "5:45",
    lessons: [
      { id: "l1", title: "Protect your privacy", body: "Never paste passwords, IDs, or others' personal data into AI tools.", examples: ["No Aadhaar/ID numbers", "No bank details", "No private chats"] },
      { id: "l2", title: "Spot hallucinations", body: "AI can invent facts, sources, and quotes. Verify anything that matters before you rely on it." },
      { id: "l3", title: "Honesty & academic integrity", body: "Use AI to learn and assist — not to cheat. Follow your school's rules and disclose when required." },
      { id: "l4", title: "Bias & fairness", body: "AI can reflect biases in its data. Question stereotypes and don't treat its output as neutral truth." },
    ],
    flashcards: [
      { front: "What should you never share with AI?", back: "Passwords, ID numbers, bank details, or others' personal data." },
      { front: "What is an AI 'hallucination'?", back: "A confident but false fact, source, or quote the AI made up." },
      { front: "Is using AI to write your whole exam okay?", back: "No — that's cheating. Use AI to learn, not to cheat." },
    ],
    promptLab: ['"List 5 things a student should never paste into an AI chat, and why."', '"Give me a checklist to fact-check an AI answer before trusting it."'],
    quiz: [
      { id: "q1", prompt: "Which is safe to paste into an AI tool?", options: ["Your bank password", "A general study question", "Your Aadhaar number", "A friend's private chat"], answerIndex: 1 },
      { id: "q2", prompt: "An AI 'hallucination' is…", options: ["A cool feature", "A made-up fact that sounds true", "A type of virus", "A login error"], answerIndex: 1 },
      { id: "q3", prompt: "Responsible AI use means…", options: ["Cheating quietly", "Verifying facts and following integrity rules", "Sharing others' data", "Trusting everything"], answerIndex: 1 },
      { id: "q4", prompt: "You should never share with AI your…", options: ["Favourite colour", "Passwords and ID numbers", "A study question", "A book title"], answerIndex: 1 },
      { id: "q5", prompt: "AI can reflect ____ from its training data, so question its output.", options: ["Bias", "Electricity", "Colours", "Fonts"], answerIndex: 0 },
      { id: "q6", prompt: "If AI gives a source or quote for something important, you should…", options: ["Trust it blindly", "Verify the source is real", "Delete it", "Share it fast"], answerIndex: 1 },
      { id: "q7", prompt: "Using AI to do your entire graded exam is…", options: ["Allowed", "Cheating against integrity rules", "Recommended", "Required"], answerIndex: 1 },
      { id: "q8", prompt: "A safe habit before trusting an AI answer is to…", options: ["Fact-check it from a reliable source", "Believe it instantly", "Post it everywhere", "Ignore it"], answerIndex: 0 },
      { id: "q9", prompt: "Protecting privacy with AI means not pasting…", options: ["Public facts", "Other people's personal data", "A maths question", "A recipe"], answerIndex: 1 },
      { id: "q10", prompt: "If an AI answer seems biased or unfair, you should…", options: ["Accept it as truth", "Question it and check other sources", "Share it as fact", "Add more bias"], answerIndex: 1 },
    ],
    task: "Write your own 5-rule 'Safe AI' checklist and share it. Bonus: fact-check one AI answer and note what you found.",
    badge: "Responsible User",
    reflection: "Where might you have over-trusted AI before — and what will you do differently?",
  },
];

/**
 * Per-module PDF worksheet links (Google Drive, "Anyone with the link – Viewer").
 * Keyed by module number (order). IDs harvested directly from the Growvia Drive
 * (akshitsingh2180@gmail.com). Module 3 is not yet in Drive → kept from the
 * manually-supplied link (unverified); falls back to "#" when absent.
 */
const MODULE_PDFS: Record<number, string> = {
  1: "https://drive.google.com/file/d/1NZ8ioZ1lPSAz1NvEL6fbLvXPEmCLgaw1/view?usp=sharing",
  2: "https://drive.google.com/file/d/1Rg7odl1BSrzmcA88Hh_bT4DQLmBvL7dC/view?usp=sharing",
  3: "https://drive.google.com/file/d/1l1oHzCMXyr004Jt57UT0ZKz7vqWuSrZM/view?usp=sharing", // unverified — M3 not in Drive
  4: "https://drive.google.com/file/d/1mpjJlfq4M6t9alfriAmqFLtAdNNFwQxp/view?usp=sharing",
  5: "https://drive.google.com/file/d/1Gkgyu3PvrlqzpuBxs0oYujR9FtP2AZZZ/view?usp=sharing",
  6: "https://drive.google.com/file/d/1yyP3E40ybEWXBr7admEIiODGFVCoMoNk/view?usp=sharing",
  7: "https://drive.google.com/file/d/1IZNG5ZgRp_cQLRlqb0_3jl0_oWc08D5M/view?usp=sharing",
  8: "https://drive.google.com/file/d/1RfSVq66cSVJjxJNSZ35HZFT9x2xMHxZ-/view?usp=sharing",
};

/**
 * Per-module flashcards-document links (Google Drive PDF, "Anyone with the link – Viewer").
 * Keyed by module number (order). Harvested from Drive; M3 not yet uploaded.
 */
const MODULE_FLASHCARDS: Record<number, string> = {
  1: "https://drive.google.com/file/d/1S35jq-AAZrsXD_W8ssTNaNhTcJQf36JX/view?usp=sharing",
  2: "https://drive.google.com/file/d/11Fh3qgcLjCqU360PTwIF7gj8mLWcme4P/view?usp=sharing",
  4: "https://drive.google.com/file/d/1YLV5o1dC3QxtGrYeuVwxCG77eT1gmm7I/view?usp=sharing",
  5: "https://drive.google.com/file/d/1w_rRka9te8dfuI-1qmMgXwaigXew9XVR/view?usp=sharing",
  6: "https://drive.google.com/file/d/1Fmeqc3ULabprq97AY02f7DStzuS0x5hL/view?usp=sharing",
  7: "https://drive.google.com/file/d/1DqRJ5aSWU5WYEkaJOmLCwqkHngP2p5a2/view?usp=sharing",
  8: "https://drive.google.com/file/d/1ckYfWP0zquJak-TzW_RxJk814bGHfhtI/view?usp=sharing",
  // 3 pending — not yet in Drive.
};

/**
 * Per-module PPT (in PDF form) links (Google Drive, "Anyone with the link – Viewer").
 * Keyed by module number (order). Harvested from Drive; M1 PPT lives in the other
 * account (akshitwalia209) so kept from the supplied link; M3 not yet uploaded.
 */
const MODULE_PPTS: Record<number, string> = {
  1: "https://drive.google.com/file/d/1CDi1lG4YDf3Z6OJF5KlnSZW-YEnCyGK-/view?usp=sharing",
  2: "https://drive.google.com/file/d/1w2EMTtr_XyKUfiaRGxQ4b3aP-MXYwerQ/view?usp=sharing",
  4: "https://drive.google.com/file/d/1TbvlsW_oBtzzKbdjuFBZsC5IxMJ6YjZS/view?usp=sharing",
  5: "https://drive.google.com/file/d/1Fy7eEpN4DOWwAqjtbsxbBC0SGWcyF02K/view?usp=sharing",
  6: "https://drive.google.com/file/d/1hdYoQp7nUsxbnoc12ZiGVF4GJsHY9pVQ/view?usp=sharing",
  7: "https://drive.google.com/file/d/10qfVLTwOj4_C3RuoR4eNDy2hsjiBf1H5/view?usp=sharing",
  8: "https://drive.google.com/file/d/1mElwRqeIVrg2uKfdE70zmaTANJDyICnk/view?usp=sharing",
  // 3 pending — not yet in Drive.
};

export const modules: Module[] = PHASE1.map((c, i) => ({
  id: `m${i + 1}`,
  order: i + 1,
  title: c.title,
  subtitle: c.subtitle,
  level: "Beginner",
  estMinutes: 25,
  lessons: c.lessons,
  videoUrl: c.videoUrl,
  videoLengthLabel: c.videoLengthLabel,
  flashcards: c.flashcards,
  promptLab: c.promptLab,
  pptUrl: MODULE_PPTS[i + 1],
  pdfUrl: MODULE_PDFS[i + 1],
  flashcardsDocUrl: MODULE_FLASHCARDS[i + 1],
  quiz: c.quiz,
  passScore: 70,
  task: c.task,
  badge: c.badge,
  reflection: c.reflection,
  progress: 0,
  locked: i > 1,
}));

export const projects: Project[] = [
  { id: "p1", title: "Personal Resume Site", brief: "Build a one-page resume website.", checklist: ["Clear headline", "Contact links", "Mobile friendly", "Proofread"], trackId: "t1" },
  { id: "p2", title: "3-Post Social Campaign", brief: "Design a mini social campaign.", checklist: ["Consistent brand", "Clear CTA", "3 posts", "Captions"], trackId: "t2" },
];

export const applications: Application[] = [
  { id: "a1", studentId: "stu1", portalName: "Internshala", role: "Content Writing Intern", status: "In Review", appliedAgo: "2 days ago" },
  { id: "a2", studentId: "stu1", portalName: "Naukri", role: "Data Entry Executive", status: "Applied", appliedAgo: "5 days ago" },
  { id: "a3", studentId: "stu1", portalName: "LinkedIn", role: "Social Media Assistant", status: "Shortlisted", appliedAgo: "1 week ago" },
];

export const portfolio: PortfolioItem[] = [
  { id: "pf1", type: "Resume", title: "My Resume.pdf", detail: "Updated this week", verified: true },
  { id: "pf2", type: "Certificate", title: "AI Basics Beginner", detail: "GrowHub", verified: true },
  { id: "pf3", type: "AI Output", title: "7-day study plan", detail: "Module 1 task" },
  { id: "pf4", type: "Link", title: "Canva portfolio", link: "#" },
];

export const readiness: Readiness = {
  score: 45,
  breakdown: { phase1: 20, phase2: 10, assignments: 10, portfolio: 5, application: 0 },
};

export const badges: Badge[] = [
  { id: "b1", title: "AI Basics Beginner", earned: false },
  { id: "b2", title: "Prompt Pro", earned: false },
  { id: "b3", title: "Smart Learner", earned: false },
  { id: "b4", title: "Content Creator", earned: false },
  { id: "b5", title: "Creative Designer", earned: false },
  { id: "b6", title: "Tool Explorer", earned: false },
  { id: "b7", title: "Multiplier", earned: false },
  { id: "b8", title: "Responsible User", earned: false },
];

export const certificates: Certificate[] = [
  { id: "c1", title: "AI Basics Beginner", issuedBy: "GrowHub", issuedAt: "Jun 2026" },
];

export const notifications: NotificationItem[] = [
  { id: "n1", title: "Module unlocked", body: "Module 2: Prompt Writing is now available.", ago: "1h", read: false },
  { id: "n2", title: "Assignment reviewed", body: "Your Module 1 task was approved.", ago: "1d", read: true },
];

export const submissions: Submission[] = [
  { id: "s1", studentId: "stu1", studentName: "Ananya", refType: "module", refTitle: "Module 1 task", status: "Approved", submittedAgo: "2d" },
  { id: "s2", studentId: "stu2", studentName: "Rahul", refType: "track", refTitle: "Digital Foundation resume", status: "Pending", submittedAgo: "4h" },
  { id: "s3", studentId: "stu3", studentName: "Priya", refType: "project", refTitle: "Social campaign", status: "Needs work", submittedAgo: "1d", feedback: "Add captions." },
];

export const cohorts: Cohort[] = [
  { id: "co1", name: "Batch A — Delhi", ngo: "Sahyog NGO", students: 28, avgProgress: 54, inviteCode: "PROV-AAA1" },
  { id: "co2", name: "Batch B — Pune", ngo: "Sahyog NGO", students: 22, avgProgress: 38, inviteCode: "PROV-BBB2" },
];

export const ngos: Ngo[] = [
  { id: "ng1", name: "Sahyog NGO", contact: "contact@sahyog.org", mentors: 4, students: 50 },
];

export const students: StudentSummary[] = [
  { id: "stu1", name: "Ananya", cohort: "Batch A — Delhi", readiness: 45, phase1: 60, pendingReviews: 0 },
  { id: "stu2", name: "Rahul", cohort: "Batch A — Delhi", readiness: 30, phase1: 40, pendingReviews: 1 },
  { id: "stu3", name: "Priya", cohort: "Batch B — Pune", readiness: 62, phase1: 100, pendingReviews: 1 },
];

export const phases = [
  { id: 1, name: "Learn Foundations", tag: "Phase 1", desc: "Build the base. Understand essential AI and digital concepts step by step.", href: "/app/learn", progress: 60, locked: false },
  { id: 2, name: "Build & Create", tag: "Phase 2", desc: "Choose a track, learn deeply, complete projects and build your portfolio.", href: "/app/build", progress: 20, locked: false },
  { id: 3, name: "Apply & Grow", tag: "Phase 3", desc: "Find real opportunities, apply confidently and track your career growth.", href: "/app/apply", progress: 0, locked: true },
] as const;
