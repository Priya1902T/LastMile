import { pgTable, uuid, text, integer, jsonb, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// One prep session = one upcoming interview the candidate is triaging.
export const prepSessions = pgTable("prep_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  round: text("round").notNull(),
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
  mustKnow: jsonb("must_know").$type<string[]>().notNull(),
  likelyProbed: jsonb("likely_probed").$type<string[]>().notNull(),
  safeToSkip: jsonb("safe_to_skip").$type<string[]>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Time-boxed plan built backwards from hours left.
export const plans = pgTable("plans", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: uuid("session_id").notNull().references(() => prepSessions.id, { onDelete: "cascade" }),
  blocks: jsonb("blocks").$type<{ minutes: number; task: string }[]>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
