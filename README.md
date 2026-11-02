# Scoped

*Know what to prepare. Skip the rest.*

Scoped is an interview prep agent: a triage coach for candidates with little time. It asks about your situation first (role, round, hours left, biggest fear), then tells you exactly what to prepare, what to skip, and how to answer honestly where you have gaps.

## Status

Early stage. The UI prototype exists. The app is not built yet. Validation with 5 real candidates comes before the build.

## What it does (MVP)

- Resume and job description upload
- Short intake chat (about 3 to 4 questions)
- Scope map: must know, likely probed, safe to skip
- Time-boxed plan built backwards from hours left
- Resume probe questions with answer outlines
- Honest-gap scripts for stacks the candidate has not used
- One text mock interview with feedback

Later: voice mocks, company-specific prep, reminders, college and recruiter dashboards.

## Planned stack

| Layer | Choice |
|---|---|
| Frontend and API | Next.js (App Router, TypeScript) |
| Styling | Tailwind CSS, shadcn/ui |
| Database | Neon Postgres (free tier) with Drizzle ORM |
| AI | NVIDIA NIM free API (OpenAI-compatible), behind a swappable `lib/ai.ts` |
| Validation | Zod |
| File storage | AWS S3 (private, encrypted) |
| Hosting | Own AWS server |

## Repo layout

```
prototype/   Single-file HTML + Tailwind CDN UI prototype (open index.html)
docs/        Stack decisions, validation plan, UI notes
app/         (coming) Next.js app
```

## Try the prototype

Open `prototype/index.html` in a browser. It needs internet for fonts, Tailwind and Three.js. All content is sample data.

## Principles

- Never invent experience in model answers.
- Resumes are personal data: encryption, retention limits, and a delete option are required.
- The anxiety layer stays on interview fear only. No therapy language.
- The free NVIDIA tier is for development, not production.

## Roadmap

1. Validate by hand with 5 candidates (no app)
2. Drizzle schema, Zod triage schema, `lib/ai.ts`
3. Next.js MVP
4. Pricing test, then production AI provider
