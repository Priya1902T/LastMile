import { pgTable, uuid, text, integer, jsonb, timestamp } from "drizzle-orm/pg-core";

export type ScopeItem = { topic: string; why: string; howToPrep: string };
export type PlanBlock = { minutes: number; task: string };
export type ProbeQuestion = { question: string; outline: string[] };
export type GapScript = { skill: string; learnFast: string; script: string };
export type FearTip = { title: string; drill: string };

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// One prep session = one upcoming interview the candidate is triaging.
// userId is optional until sign-in exists; anonymous sessions are reached by their id.
export const prepSessions = pgTable("prep_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  company: text("company"),
  round: text("round").notNull(),
  when: text("when"),
  hoursLeft: integer("hours_left").notNull(),
  biggestFear: text("biggest_fear"),
  resumeKey: text("resume_key"), // S3 object key, never the file itself
  jobDescription: text("job_description"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Scope map: must know / likely probed / safe to skip.
export const scopeMaps = pgTable("scope_maps", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: uuid("session_id").notNull().references(() => prepSessions.id, { onDelete: "cascade" }),
  mustKnow: jsonb("must_know").$type<ScopeItem[]>().notNull(),
  likelyProbed: jsonb("likely_probed").$type<ScopeItem[]>().notNull(),
  safeToSkip: jsonb("safe_to_skip").$type<ScopeItem[]>().notNull(),
  probeQuestions: jsonb("probe_questions").$type<ProbeQuestion[]>().notNull().default([]),
  gapScripts: jsonb("gap_scripts").$type<GapScript[]>().notNull().default([]),
  fearTip: jsonb("fear_tip").$type<FearTip>(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Time-boxed plan built backwards from hours left.
export const plans = pgTable("plans", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: uuid("session_id").notNull().references(() => prepSessions.id, { onDelete: "cascade" }),
  blocks: jsonb("blocks").$type<PlanBlock[]>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
