import { z } from "zod";
import { chatJson, SYSTEM_PROMPT } from "./ai";

export const ROUNDS = ["Screening", "Technical", "Managerial", "HR"];

export const HOURS = {
  "Under 3 hours": 2,
  "3 to 12 hours": 8,
  "1 to 3 days": 16,
  "4 to 14 days": 30,
};

export const FEARS = ["Freezing", "Rambling", "Not knowing a stack", "Salary or gap questions"];

export const WHENS = ["Today", "Tomorrow", "This week", "Later"];

export const intakeSchema = z.object({
  role: z.string().trim().min(2).max(120),
  company: z.string().trim().max(120).optional().default(""),
  when: z.enum(WHENS),
  round: z.enum(ROUNDS),
  hours: z.enum(Object.keys(HOURS)),
  fear: z.enum(FEARS),
  jobDescription: z.string().trim().max(15_000).optional().default(""),
  resumeText: z.string().trim().max(30_000).optional().default(""),
});

const scopeItem = z.object({ topic: z.string(), why: z.string(), howToPrep: z.string() });

export const triageSchema = z.object({
  mustKnow: z.array(scopeItem).min(1).max(6),
  likelyProbed: z.array(scopeItem).max(6),
  safeToSkip: z.array(scopeItem).max(6),
  plan: z
    .array(z.object({ minutes: z.coerce.number().int().positive(), task: z.string() }))
    .min(1)
    .max(12),
  probeQuestions: z.array(z.object({ question: z.string(), outline: z.array(z.string()).min(1).max(5) })).max(6),
  gapScripts: z.array(z.object({ skill: z.string(), learnFast: z.string(), script: z.string() })).max(4),
  fearTip: z.object({ title: z.string(), drill: z.string() }),
});

/** Remove emails and phone numbers before resume text leaves our servers. */
export function redactPII(text) {
  return text.replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, "[email]").replace(/(\+?\d[\d\s().-]{7,}\d)/g, "[phone]");
}

export async function generateTriage(i) {
  const studyMinutes = HOURS[i.hours] * 60;
  const prompt = `Build an interview triage for this candidate.

Role: ${i.role}${i.company ? ` at ${i.company}` : ""}
Round: ${i.round}
Interview: ${i.when}
Prep time available: ${i.hours} (plan for about ${studyMinutes} minutes total)
Biggest worry: ${i.fear}

Job description:
${i.jobDescription || "(not provided; infer typical expectations for the role)"}

Resume:
${i.resumeText ? redactPII(i.resumeText) : "(not provided; keep advice general for the role)"}

Return JSON with exactly this shape:
{
  "mustKnow":     [{"topic": str, "why": str, "howToPrep": str}],   // 2-5 items, what will definitely come up
  "likelyProbed": [{"topic": str, "why": str, "howToPrep": str}],   // 2-4 items
  "safeToSkip":   [{"topic": str, "why": str, "howToPrep": str}],   // 1-3 items, with a one-line fallback answer in howToPrep
  "plan":         [{"minutes": int, "task": str}],                  // 3-8 blocks in order, minutes sum to about ${studyMinutes}
  "probeQuestions": [{"question": str, "outline": [str]}],          // 3-5 questions an interviewer would ask about THIS resume, 2-4 outline bullets each
  "gapScripts":   [{"skill": str, "learnFast": str, "script": str}],// 0-3 skills the JD wants that the resume lacks; script is an honest first-person answer
  "fearTip":      {"title": str, "drill": str}                      // short reassurance + one concrete drill for "${i.fear}"
}

Rules: be specific to this role and resume. "why" is one sentence. Never claim experience the resume does not show. Keep every string short.`;
  return chatJson(
    triageSchema,
    [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: prompt },
    ],
    { maxTokens: 3500, temperature: 0.3, timeoutMs: 22_000, fallbackTimeoutMs: 34_000 },
  );
}
