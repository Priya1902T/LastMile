ALTER TABLE "prep_sessions" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "prep_sessions" ADD COLUMN "company" text;--> statement-breakpoint
ALTER TABLE "prep_sessions" ADD COLUMN "when" text;--> statement-breakpoint
ALTER TABLE "scope_maps" ADD COLUMN "probe_questions" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "scope_maps" ADD COLUMN "gap_scripts" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "scope_maps" ADD COLUMN "fear_tip" jsonb;