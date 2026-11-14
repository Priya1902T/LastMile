/**
 * Shapes stored in the jsonb columns below:
 * @typedef {{ topic: string, why: string, howToPrep: string }} ScopeItem
 * @typedef {{ minutes: number, task: string }} PlanBlock
 * @typedef {{ question: string, outline: string[] }} ProbeQuestion
 * @typedef {{ skill: string, learnFast: string, script: string }} GapScript
 * @typedef {{ title: string, drill: string }} FearTip
 */
import { pgTable, uuid, text, integer, jsonb, timestamp } from "drizzle-orm/pg-core";

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
  sessionId: uuid("session_id")
    .notNull()
    .references(() => prepSessions.id, { onDelete: "cascade" }),
  mustKnow: jsonb("must_know").$type().notNull(),
  likelyProbed: jsonb("likely_probed").$type().notNull(),
  safeToSkip: jsonb("safe_to_skip").$type().notNull(),
  probeQuestions: jsonb("probe_questions").$type().notNull().default([]),
  gapScripts: jsonb("gap_scripts").$type().notNull().default([]),
  fearTip: jsonb("fear_tip").$type(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Time-boxed plan built backwards from hours left.
export const plans = pgTable("plans", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: uuid("session_id")
    .notNull()
    .references(() => prepSessions.id, { onDelete: "cascade" }),
  blocks: jsonb("blocks").$type().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
