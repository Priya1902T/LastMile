# Scoped

*Know what to prepare. Skip the rest.*

Scoped is an interview prep agent: a triage coach for candidates with little time. It asks about your situation first (role, round, hours left, biggest fear), then tells you exactly what to prepare, what to skip, and how to answer honestly where you have gaps.

## Status

Working MVP: intake → AI triage → plan page, plus a scrollytelling marketing site. Validation with real candidates is still to come.

## What it does (MVP)

- Resume (PDF or pasted text) and job description
- Short intake (when, role, round, hours, biggest worry)
- Scope map: must know, likely probed, safe to skip
- Time-boxed plan built backwards from hours left
- Resume probe questions with answer outlines
- Honest-gap scripts for skills the candidate has not used
- Fear tip with one concrete drill
- "Delete my data" (S3 file + database rows)

Later: text mock interview, accounts, voice mocks, company-specific prep.

## Stack

| Layer | Choice |
|---|---|
| Frontend and API | Next.js 15 (App Router, JavaScript/JSX) |
| Styling | Tailwind CSS 4 |
| Motion | GSAP 3 (ScrollTrigger, DrawSVG, MorphSVG, MotionPath, SplitText) + Lenis smooth scroll |
| Database | Neon Postgres with Drizzle ORM |
| AI | NVIDIA NIM (OpenAI-compatible), behind a swappable `src/lib/ai.js` |
| Validation | Zod |
| File storage | AWS S3 (private, encrypted) |
| Hosting | Vercel |

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

Checks: `npm run db:check`, `npm run s3:check`, `npm run ai:check`, `npm run triage:check`. Database changes: `npm run db:generate` then `npm run db:migrate`.

## Repo layout

```
src/app/(site)/        Marketing site: / (full story), /product, /how-it-works, /resources, /pricing, /login
src/app/start          Intake flow
src/app/plan/[id]      Plan page
src/app/api/sessions   Create / delete a triage session
src/components/site    Site sections (Hero, Strip, Problem, Flow, Features, DeepDives, Preview, Proof, Pricing, Faq, FinalCta, Nav, Footer)
src/components/story   Pinned 6-scene story: StoryStage (one SVG), scenes/Scene1-6 (each owns its layer + timeline), Story (pin, captions, rail)
src/components/ui      Logo, Wave, Sparkles, Motion helpers (RevealText, FadeIn, parallax, Magnetic, CountUp)
src/content            copy.js (real copy), placeholders.js (fake data), flags.js (switches)
src/lib                ai, triage, resume, s3, gsap
prototype/             Original single-file HTML prototype
docs/                  Stack decisions, validation plan
```

## Placeholder content (switched off)

Stats (5× / 90% / 1:1), testimonials, "interviews at" company logos, pricing tiers and social links are built but **off** in `src/content/flags.js`. Their fake data lives in `src/content/placeholders.js`. Replace it with real, verifiable data before turning any flag on. While off, the site shows honest facts instead (e.g. "~30s to a plan", "free during early access").

## Assets to supply

- **Hero portrait**: `public/hero-person.png` is a crop of the design screenshot (it even contains part of a gauge card). Replace it with a licensed, clean, transparent black-and-white cutout.
- **Real proof**: testimonials, stats and company logos (with permission) before enabling their flags.
- **Pricing**: real prices before enabling `SHOW_PRICING_TIERS`.
- **Contact email**: the footer "Contact" link uses `hello@example.com`.
- **Social accounts**: links for the footer icons before enabling `SHOW_SOCIALS`.

## Principles

- Never invent experience in model answers.
- Resumes are personal data: encryption, redaction before AI, and a delete option.
- The anxiety layer stays on interview fear only. No therapy language.
- No fake social proof on the live site.
- The free NVIDIA tier is for development, not production.
