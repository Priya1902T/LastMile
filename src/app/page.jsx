import Link from "next/link";
import { Logo } from "@/components/Logo";

function ArrowUpRight({ className = "" }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function ArrowRight({ className = "" }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const ICONS = {
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
      <path d="m15 9 5-5M17 4h3v3" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  doc: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </>
  ),
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  shield: (
    <>
      <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m10 8 6 4-6 4z" />
    </>
  ),
  edit: (
    <>
      <path d="M4 20h4L19 9l-4-4L4 16z" />
      <path d="m13.5 6.5 4 4" />
    </>
  ),
  spark: <path d="M12 3c.5 4.5 2.5 6.5 7 7-4.5.5-6.5 2.5-7 7-.5-4.5-2.5-6.5-7-7 4.5-.5 6.5-2.5 7-7z" />,
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
};

function Icon({ name, className = "" }) {
  return (
    <svg
      className={className}
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {ICONS[name]}
    </svg>
  );
}

const STEPS = [
  {
    n: "01",
    icon: "edit",
    title: "Share your details",
    body: "Role, company, round, time left and your biggest worry.",
  },
  {
    n: "02",
    icon: "spark",
    title: "AI triage",
    body: "We read your resume, the job description and your context with NVIDIA NIM.",
  },
  {
    n: "03",
    icon: "layers",
    title: "Get your plan",
    body: "A personal scope map, study plan, likely questions and honest scripts.",
  },
];

const FEATURES = [
  { icon: "target", title: "Scope Map", body: "Must know, likely probed and safe to skip, with fallbacks." },
  { icon: "calendar", title: "Time-Boxed Plan", body: "A study plan built backwards from the hours you have left." },
  {
    icon: "doc",
    title: "Resume Probe Questions",
    body: "Questions they will likely ask about your resume, with answer outlines.",
  },
  {
    icon: "bolt",
    title: "Honest-Gap Scripts",
    body: "Truthful answers for missing skills, plus the fastest way to learn the basics.",
  },
  { icon: "shield", title: "Fear Tip", body: "Reassurance and one concrete drill for your specific worry." },
  { icon: "play", title: "Mock Interview", soon: true, body: "A text mock interview with personalized feedback." },
];

function ScopeRow({ tone, label, count, icon }) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${tone}`}>
      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/80">{icon}</span>
      <span className="flex-1">
        <span className="block font-display text-[15px] font-bold leading-tight">{label}</span>
        <span className="block text-[12px] text-sub">{count} topics</span>
      </span>
      <ArrowRight />
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto h-[440px] w-full max-w-[560px] sm:h-[500px]" aria-hidden>
      {/* shapes */}
      <div className="absolute right-[4%] top-[2%] h-[78%] w-[62%] rounded-[44%_56%_40%_60%] bg-lime" />
      <div className="absolute bottom-[16%] left-[2%] h-[150px] w-[150px] rounded-full bg-orange sm:h-[180px] sm:w-[180px]" />
      <div className="grain absolute bottom-0 right-0 h-[45%] w-[55%] rounded-[50%_50%_0_50%] bg-cream2" />
      <svg
        className="absolute left-[30%] top-[2%]"
        width="60"
        height="50"
        viewBox="0 0 60 50"
        fill="none"
        stroke="#141414"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M5 30 25 40M20 6l10 22M48 4 40 26" />
      </svg>

      {/* scope map card */}
      <div className="float absolute right-[2%] top-[14%] w-[min(290px,78%)] rotate-[3deg] rounded-[28px] bg-white p-5 shadow-[0_30px_60px_rgba(20,20,20,.15)]">
        <span className="absolute -top-4 right-4 rotate-[-6deg] rounded-xl bg-lime px-3 py-1.5 font-display text-[13px] font-bold">
          AI Triage
        </span>
        <p className="mb-3 flex items-center gap-2 font-display text-[18px] font-extrabold">
          <Icon name="target" className="h-6 w-6" /> Your Scope Map
        </p>
        <div className="space-y-2">
          <ScopeRow tone="bg-lime-soft" label="Must Know" count={5} icon={<span className="text-lime-deep">✓</span>} />
          <ScopeRow
            tone="bg-orange-soft"
            label="Likely Probed"
            count={4}
            icon={<span className="text-orange">∿</span>}
          />
          <ScopeRow tone="bg-cream2" label="Safe to Skip" count={3} icon={<span>✕</span>} />
        </div>
      </div>

      {/* readiness gauge */}
      <div className="absolute bottom-[10%] left-[18%] w-[220px] rotate-[-4deg] rounded-3xl border border-white/10 bg-ink/85 p-5 text-center text-white shadow-[0_30px_60px_rgba(20,20,20,.25)] backdrop-blur">
        <svg viewBox="0 0 200 110" className="mx-auto w-[170px]">
          <path d="M20 100a80 80 0 0 1 160 0" fill="none" stroke="#3a3a3a" strokeWidth="14" strokeLinecap="round" />
          <path d="M20 100a80 80 0 0 1 150-38" fill="none" stroke="#D4F53C" strokeWidth="14" strokeLinecap="round" />
        </svg>
        <p className="-mt-9 text-[12px] text-white/70">Plan progress</p>
        <p className="font-display text-[34px] font-extrabold leading-none">92%</p>
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="overflow-x-hidden">
      {/* NAV */}
      <header className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" aria-label="Scoped home">
          <Logo />
        </Link>
        <nav className="hidden gap-10 text-[14px] font-medium md:flex">
          <a href="#how">How it works</a>
          <a href="#features">Product</a>
          <a href="#privacy">Privacy</a>
        </nav>
        <Link
          href="/start"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-[14px] font-semibold text-white transition hover:bg-black"
        >
          Get started <ArrowUpRight />
        </Link>
      </header>

      {/* HERO */}
      <section className="mx-auto grid max-w-[1200px] items-center gap-6 px-5 pb-16 pt-6 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:pb-24">
        <div className="fade-in">
          <p className="text-[12px] font-semibold uppercase tracking-[.25em]">
            The last-mile
            <br />
            interview coach
          </p>
          <h1 className="mt-6 font-display text-[48px] font-extrabold leading-[0.98] tracking-[-0.03em] sm:text-[68px] lg:text-[78px]">
            Know what
            <br />
            to prepare.
            <br />
            <span className="highlight italic">Skip the rest.</span>
          </h1>
          <p className="mt-6 max-w-[440px] text-[16px] leading-relaxed text-sub">
            Scoped is an AI triage coach for job candidates who are short on prep time. Get a focused, personal plan
            that tells you what to study, what&rsquo;s likely to be asked and what you can safely skip.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href="/start"
              className="inline-flex h-14 items-center gap-3 rounded-full bg-ink px-7 text-[16px] font-semibold text-white shadow-[0_10px_30px_rgba(20,20,20,.25)] transition hover:bg-black active:scale-[.98]"
            >
              Start your prep <ArrowUpRight />
            </Link>
            <a href="#how" className="inline-flex items-center gap-3 text-[15px] font-medium">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-white">
                <Icon name="play" className="h-5 w-5" />
              </span>
              See how it works
            </a>
          </div>
        </div>
        <HeroVisual />
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="scroll-mt-6 bg-ink text-white">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_2fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[.25em] text-white/60">
              From input to interview-ready
            </p>
            <h2 className="mt-4 font-display text-[32px] font-bold leading-[1.1] tracking-tight sm:text-[38px]">
              A focused prep flow that{" "}
              <span className="font-serif text-[1.15em] font-normal italic text-lime">works backwards</span> from your
              interview.
            </h2>
          </div>
          <ol className="grid gap-4 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <li
                key={s.n}
                className={`card-dark relative rounded-3xl p-5 ${i === 0 ? "border-lime! shadow-[0_0_0_1px_#D4F53C]" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-xl ${i === 0 ? "bg-lime/15 text-lime" : "bg-white/10"}`}
                  >
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-[15px] text-white/70">{s.n}</span>
                </div>
                <p className="mt-4 font-display text-[17px] font-bold">{s.title}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-white/60">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.15fr]"
      >
        <div className="relative mx-auto h-[380px] w-full max-w-[480px]" aria-hidden>
          <div className="absolute left-[8%] top-[4%] h-[60%] w-[80%] rotate-[-18deg] rounded-[50%] bg-lime" />
          <div className="absolute bottom-[8%] left-0 h-[140px] w-[110px] rotate-[-12deg] rounded-3xl bg-orange" />
          <div className="absolute bottom-[12%] left-[4%] w-[190px] rotate-[-10deg] rounded-3xl bg-white p-4 shadow-[0_20px_40px_rgba(20,20,20,.12)]">
            <p className="font-display text-[15px] font-extrabold">Resume Probe</p>
            {[0, 1, 2].map((k) => (
              <div key={k} className="mt-3 flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-lime text-[12px]">✓</span>
                <span className="h-2 flex-1 rounded bg-cream2" />
              </div>
            ))}
          </div>
          <div className="absolute right-0 top-[10%] w-[300px] rotate-[-6deg] rounded-[28px] bg-white p-6 shadow-[0_30px_60px_rgba(20,20,20,.15)]">
            <p className="flex items-center gap-2 font-display text-[19px] font-extrabold">
              <Icon name="calendar" className="h-6 w-6" /> Your Prep Plan
            </p>
            <ul className="mt-4 space-y-3 border-l-2 border-lime pl-4">
              {[
                ["2.0 h", "Core topics (must know)"],
                ["1.5 h", "Practice: likely probed"],
                ["1.0 h", "Resume & project Qs"],
                ["0.5 h", "Gap skills (basics)"],
                ["1.0 h", "Quick revision"],
              ].map(([h, t]) => (
                <li key={t} className="flex items-center gap-3 text-[13px]">
                  <span className="rounded-lg bg-cream2 px-2 py-1 font-semibold">{h}</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[.25em]">What you get</p>
          <h2 className="mt-4 font-display text-[38px] font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-[48px]">
            More than prep.
            <br />A <span className="font-serif text-[1.12em] font-normal italic">targeted</span> game plan.
          </h2>
          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <li key={f.title} className="flex gap-4">
                <Icon name={f.icon} className="mt-0.5 h-7 w-7 shrink-0" />
                <div>
                  <p className="font-display text-[16px] font-bold">
                    {f.title}{" "}
                    {"soon" in f && <span className="font-serif text-[15px] font-normal italic text-sub">(Soon)</span>}
                  </p>
                  <p className="mt-1 text-[14px] leading-snug text-sub">{f.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PRIVACY */}
      <section id="privacy" className="mx-auto max-w-[1200px] px-5 pb-16 sm:px-8">
        <div className="grid gap-6 rounded-[32px] border border-line bg-white p-8 sm:grid-cols-3">
          {[
            ["Encrypted", "Resumes are stored encrypted, in a private bucket."],
            ["Redacted", "Emails and phone numbers are removed before anything reaches the AI."],
            ["Yours to delete", "One tap deletes your resume and your plan."],
          ].map(([t, b]) => (
            <div key={t}>
              <p className="font-display text-[18px] font-bold">{t}</p>
              <p className="mt-1 text-[14px] text-sub">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <section className="px-3 pb-6 sm:px-5">
        <div className="relative mx-auto max-w-[1220px] overflow-hidden rounded-[32px] bg-ink px-6 py-10 text-white sm:px-12">
          <div className="absolute -bottom-24 left-1/3 h-56 w-[60%] rounded-[50%] bg-lime/20 blur-2xl" aria-hidden />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_2fr_auto]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[.25em] text-white/60">
                Built for real candidates
              </p>
              <p className="mt-2 font-serif text-[38px] italic leading-[1.05]">
                Short on time?
                <br />
                <span className="text-lime">Get Scoped.</span>
              </p>
            </div>
            <dl className="grid grid-cols-3 gap-4 sm:divide-x sm:divide-white/15">
              {[
                ["~30s", "From details to plan"],
                ["3", "Clear buckets: know, probed, skip"],
                ["0", "Invented experience, ever"],
              ].map(([v, l]) => (
                <div key={l} className="sm:px-6">
                  <dt className="font-display text-[30px] font-bold">{v}</dt>
                  <dd className="text-[13px] text-white/70">{l}</dd>
                </div>
              ))}
            </dl>
            <Link
              href="/start"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-lime px-7 text-[16px] font-bold text-ink transition hover:brightness-95"
            >
              Start for free <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-5 py-8 text-[13px] text-sub sm:px-8">
        <Logo />
        <p>Know what to prepare. Skip the rest.</p>
      </footer>
    </div>
  );
}
