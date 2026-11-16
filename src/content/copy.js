// Real copy used across the marketing site.

export const NAV_LINKS = [
  { href: "/product", label: "Product" },
  { href: "/how-it-works", label: "How it Works" },
  { href: "/resources", label: "Resources" },
  { href: "/pricing", label: "Pricing" },
];

// The 40-ish topics that float in "The 48-hour panic".
export const PANIC_TOPICS = [
  "System Design", "Behavioral", "SQL", "Leadership", "React", "Culture Fit", "DSA", "Case Study",
  "Big-O", "REST APIs", "Kubernetes", "STAR Method", "TypeScript", "Salary Talk", "Docker", "Testing",
  "GraphQL", "Conflict Stories", "Caching", "Accessibility", "OOP", "Linked Lists", "Microservices",
  "Why this company?", "Git", "CI/CD", "Product Sense", "Estimation", "Recursion", "Security",
  "Cloud Basics", "Weaknesses", "Agile", "Hash Maps", "Load Balancers", "CSS Layout", "Networking",
  "Statistics", "Stakeholders", "Trade-offs",
];

// Story chips: 5 must know, 4 likely probed, 3 safe to skip (matches the Scope Map card).
export const STORY_CHIPS = [
  { t: "React hooks", b: 0 },
  { t: "REST APIs", b: 0 },
  { t: "State mgmt", b: 0 },
  { t: "JS basics", b: 0 },
  { t: "Your projects", b: 0 },
  { t: "TypeScript", b: 1 },
  { t: "Testing", b: 1 },
  { t: "Accessibility", b: 1 },
  { t: "Performance", b: 1 },
  { t: "GraphQL", b: 2 },
  { t: "Micro-frontends", b: 2 },
  { t: "WebGL", b: 2 },
];

export const STORY_SCENES = [
  { id: "pile", label: "The pile", caption: "It starts with too much.", sub: "Forty topics, one evening, and a clock that will not slow down." },
  { id: "details", label: "The details", caption: "Tell Scoped four things.", sub: "Your role, the round, the hours you really have, and what worries you. Add your resume and the job post." },
  { id: "triage", label: "The triage", caption: "AI Triage reads everything.", sub: "Your resume and the job description are matched line by line. Emails and phone numbers are stripped first." },
  { id: "sort", label: "The sort", caption: "Must know. Likely probed. Safe to skip.", sub: "Every topic lands in one pile, with a reason. Skipped ones get a one-line fallback." },
  { id: "plan", label: "The plan", caption: "Your hours, spent right.", sub: "A time-boxed plan built backwards from the interview, plus the questions they will ask about your own work." },
  { id: "walkin", label: "The walk-in", caption: "Walk in ready.", sub: "Not ready for everything. Ready for what matters." },
];

export const FLOW_STEPS = [
  { n: "01", icon: "pen", title: "Share Your Details", desc: "Role, company, round, time and your biggest worry." },
  { n: "02", icon: "sparkle", title: "AI Triage", desc: "We analyze your resume, JD and context with NVIDIA NIM." },
  { n: "03", icon: "layers", title: "Get Your Plan", desc: "A personalized scope map, study plan, questions and real scripts." },
];

export const FEATURES = [
  { icon: "target", title: "Scope Map", text: "Must know, likely probed and safe to skip (with fallbacks)." },
  { icon: "calendar", title: "Time-Boxed Plan", text: "A focused study plan based on the hours you have left." },
  { icon: "file", title: "Resume Probe Questions", text: "Likely questions about your resume, with answer outlines." },
  { icon: "zap", title: "Honest-Gap Scripts", text: "Truthful answers for missing skills + a quick way to learn the basics." },
  { icon: "shield", title: "Fear Tip", text: "Reassurance and one concrete drill for your specific worry." },
  { icon: "play", title: "Mock Interview", soon: true, text: "A text mock interview with personalized feedback." },
];

export const PLAN_ROWS = [
  { h: 2.0, label: "Core Topics (Must Know)" },
  { h: 1.5, label: "Practice – Likely Probed" },
  { h: 1.0, label: "Resume & Project Qs" },
  { h: 0.5, label: "Gap Skills (Basics)" },
  { h: 1.0, label: "Quick Revision + Mock" },
];

export const SCOPE_BUCKETS = [
  {
    key: "must",
    name: "Must Know",
    tint: "green",
    topics: [
      { t: "React hooks", why: "The job post names it twice and your dashboard project uses it.", fallback: "Explain useEffect cleanup with your own project." },
      { t: "REST APIs", why: "Listed as a core duty in the JD.", fallback: "Walk through one request: method, status, error state." },
      { t: "State management", why: "Every frontend panel asks how data flows.", fallback: "Props → context → when you would reach for a store." },
      { t: "JS fundamentals", why: "Screens open with closures and async.", fallback: "Closures in one sentence, then a tiny example." },
      { t: "Your projects", why: "They will ask about what you actually built.", fallback: "One project, one decision, one number." },
    ],
  },
  {
    key: "probed",
    name: "Likely Probed",
    tint: "peach",
    topics: [
      { t: "TypeScript", why: "In the JD, not on your resume.", fallback: "Use the honest-gap script, then name one type you know." },
      { t: "Testing", why: "Mentioned as a nice-to-have.", fallback: "Arrange, act, assert, with one component test." },
      { t: "Accessibility", why: "Common follow-up for UI roles.", fallback: "Labels, focus order, contrast. Three words, three examples." },
      { t: "Performance", why: "Often a stretch question.", fallback: "Measure first, then memo, split, lazy-load." },
    ],
  },
  {
    key: "skip",
    name: "Safe to Skip",
    tint: "grey",
    topics: [
      { t: "GraphQL", why: "Not in the JD, not on your resume.", fallback: "“I haven’t used it, but I know it lets clients ask for exactly the fields they need.”" },
      { t: "Micro-frontends", why: "Rare for this level.", fallback: "“Splitting one app into independently deployed pieces.”" },
      { t: "WebGL", why: "Unrelated to this role.", fallback: "Skip it. Spend the time on hooks." },
    ],
  },
];

export const FAQ = [
  {
    q: "How does Scoped decide what to skip?",
    a: "It compares three things: what the job description asks for, what your resume shows, and what is typical for that round. Topics that are in neither the job post nor your background, and are rare at your level, go to Safe to Skip. Each one gets a one-line fallback answer so you are never caught completely blank.",
  },
  {
    q: "What if I have only a few hours?",
    a: "That is exactly who Scoped is for. Pick “Under 3 hours” and the plan shrinks to the must-know topics, your own project questions and one drill for your biggest worry. Everything else is either skipped or reduced to a single sentence.",
  },
  {
    q: "Is my resume stored?",
    a: "Your resume is stored encrypted in a private bucket and used only to build your plan. Emails and phone numbers are removed before any text reaches the AI. One tap on “Delete my data” removes the file and the plan.",
  },
  {
    q: "Does it work for non-tech roles?",
    a: "Yes. The triage works on any role and job description: product, design, data, sales, operations. The examples on this page are frontend because that is a common case, not a limit.",
  },
  {
    q: "What is NVIDIA NIM?",
    a: "NIM is NVIDIA’s service for running AI models. Scoped sends it your role, the job description and your redacted resume, and gets back a structured triage that we check before showing it to you.",
  },
  {
    q: "Can I do a mock interview?",
    a: "Not yet. A text mock interview with feedback on structure and specifics is the next feature on the roadmap.",
  },
  {
    q: "Will Scoped write answers for me?",
    a: "It writes outlines and honest scripts, never invented experience. If you have not used something, the script says so and shows how to answer well anyway.",
  },
  {
    q: "Does Scoped guarantee I get the job?",
    a: "No, and nothing honest can. It is a triage tool: it helps you spend limited time on what matters most, so you walk in calmer and better prepared.",
  },
];

export const GUIDES = [
  {
    tag: "Planning",
    title: "The 4-hour plan",
    body: "Spend 90 minutes on the two topics the job post repeats. Spend an hour saying your project story out loud. Use 30 minutes on likely follow-ups, 30 on one honest-gap answer, and keep the last 30 for sleep-friendly revision.",
  },
  {
    tag: "Answers",
    title: "How to answer a gap question",
    body: "Say what you have not done, plainly. Say what you know that is close. Say how you would get up to speed in the first week. Three sentences, no apology, no bluffing.",
  },
  {
    tag: "Nerves",
    title: "If you freeze mid-answer",
    body: "Pause for three seconds. Restate the question in your own words. Answer in two parts: what you would do first, and why. Interviewers read a calm pause as thinking, not failing.",
  },
  {
    tag: "Stories",
    title: "One project, one decision, one number",
    body: "Pick the project you know best. Name one decision you made and the trade-off behind it. End with a number: time saved, users reached, errors cut. That is a complete story.",
  },
];
