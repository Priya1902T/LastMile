"use client";

// Landing page (ported from scoped-react, then animated so each block tells its part of the story).
// Every call to action goes to the real intake at /start.
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock,
  EyeOff,
  FileText,
  Layers,
  Lock,
  Menu,
  PenLine,
  Play,
  ShieldCheck,
  Sparkles,
  Target,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import Story from "@/components/landing/Story";
import { useCountUp, useCycle, useInView, useTypewriter } from "@/components/landing/motion";
import "@/app/landing.css";
import "@/app/landing-motion.css";

const features = [
  {
    icon: Target,
    title: "Scope Map",
    text: "Must know, likely probed and safe to skip (with fallbacks).",
    example: "“React hooks: must know. The JD asks for it twice.”",
  },
  {
    icon: CalendarDays,
    title: "Time-Boxed Plan",
    text: "A focused study plan based on the hours you have left.",
    example: "“2 h hooks out loud, then 1.5 h on error states.”",
  },
  {
    icon: FileText,
    title: "Resume Probe Questions",
    text: "Likely questions about your resume, with answer outlines.",
    example: "“Walk me through the dashboard you built.”",
  },
  {
    icon: Zap,
    title: "Honest-Gap Scripts",
    text: "Truthful answers for missing skills + a quick way to learn the basics.",
    example: "“I haven’t used it in production, but here’s how I’d start.”",
  },
  {
    icon: ShieldCheck,
    title: "Fear Tip",
    text: "Reassurance and one concrete drill for your specific worry.",
    example: "“If you blank: pause three seconds, restate, answer in two parts.”",
  },
  {
    icon: Play,
    title: "Mock Interview (Soon)",
    text: "A text mock interview with personalized feedback.",
    example: "“Good structure. Add a number to show impact.”",
  },
];

const steps = [
  {
    icon: PenLine,
    n: "01",
    title: "Share Your Details",
    desc: "Role, company, round, time and your biggest worry.",
    story: "Frontend dev · tomorrow · 8 h · “freezing”",
  },
  {
    icon: Sparkles,
    n: "02",
    title: "AI Triage",
    desc: "We analyze your resume, JD and context with NVIDIA NIM.",
    story: "12 topics found → sorted into 3 buckets",
  },
  {
    icon: Layers,
    n: "03",
    title: "Get Your Plan",
    desc: "A personalized scope map, study plan, questions and real scripts.",
    story: "5 time blocks · 4 probe Qs · 1 gap script",
  },
];

const planRows = [
  ["2.0 h", "Core Topics (Must Know)"],
  ["1.5 h", "Practice – Likely Probed"],
  ["1.0 h", "Resume & Project Qs"],
  ["0.5 h", "Gap Skills (Basics)"],
  ["1.0 h", "Quick Revision"],
];

const privacy = [
  { icon: Lock, cls: "lock", title: "Encrypted", text: "Resumes are stored encrypted, in a private bucket." },
  { icon: EyeOff, cls: "blink", title: "Redacted", text: "Emails and phone numbers are removed before anything reaches the AI." },
  { icon: Trash2, cls: "lid", title: "Yours to delete", text: "One tap deletes your resume and your plan." },
];

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".landing .reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- Hero ---------- */

function ScopeCard({ active }) {
  const caption = useTypewriter(["Reading your JD…", "Sorting 12 topics…", "Your Scope Map"], active);
  const rows = [
    { cls: "green", icon: <Check size={19} />, label: "Must Know", n: 5 },
    { cls: "peach", icon: <Activity size={19} />, label: "Likely Probed", n: 4 },
    { cls: "grey", icon: <X size={19} />, label: "Safe to Skip", n: 3 },
  ];
  return (
    <div className={`scope-card ${active ? "play" : ""}`}>
      <h3>
        <Target size={26} className="spin-target" />
        <span className="typed">
          {caption}
          <span className="caret" />
        </span>
      </h3>
      {rows.map((r, i) => (
        <ScopeRow key={r.label} {...r} delay={2600 + i * 450} active={active} />
      ))}
    </div>
  );
}

function ScopeRow({ cls, icon, label, n, delay, active }) {
  const [go, setGo] = useState(false);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setGo(true), delay);
    return () => clearTimeout(t);
  }, [active, delay]);
  const count = useCountUp(n, go, 700);
  return (
    <div className={`scope-row ${cls} ${go ? "in" : ""}`}>
      <span className="round">{icon}</span>
      <div>
        <b>{label}</b>
        <small>{count} topics</small>
      </div>
      <ArrowRight />
    </div>
  );
}

function Readiness({ active }) {
  const pct = useCountUp(92, active, 2200);
  // Semicircle arc length for r=60 is ~188.5
  const len = 188.5;
  return (
    <div className="readiness">
      <svg className="gauge-svg" viewBox="0 0 150 80" aria-hidden>
        <path d="M15 75a60 60 0 0 1 120 0" fill="none" stroke="#505154" strokeWidth="11" strokeLinecap="round" />
        <path
          d="M15 75a60 60 0 0 1 120 0"
          fill="none"
          stroke="#d5ff23"
          strokeWidth="11"
          strokeLinecap="round"
          strokeDasharray={len}
          strokeDashoffset={len - (len * pct) / 100}
        />
      </svg>
      <span>Interview Readiness</span>
      <strong>{pct}%</strong>
    </div>
  );
}

/* ---------- Flow band ---------- */

function Flow() {
  const [ref, inView] = useInView(0.4);
  const active = useCycle(steps.length, inView, 2600);
  return (
    <section className="flow-band" id="how" ref={ref}>
      <div className="shell flow-inner">
        <div className="flow-heading reveal">
          <div className="eyebrow">FROM INPUT TO INTERVIEW-READY</div>
          <h2>
            A focused prep flow
            <br />
            that <em>works backwards</em>
            <br />
            from your interview.
          </h2>
        </div>
        <div className="step-list">
          {steps.map((s, i) => (
            <Fragment key={s.n}>
              <div
                className={`step reveal ${inView ? "visible" : ""} ${i === active ? "active" : ""} ${i < active ? "done" : ""}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="step-icon">
                  <s.icon size={25} />
                </div>
                <div>
                  <div className="step-number">{s.n}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <p className="step-story" aria-hidden={i !== active}>
                    {s.story}
                  </p>
                </div>
                {i === active && <span className="step-timer" key={`t${active}`} />}
              </div>
              {i < 2 && <ArrowRight className={`step-arrow ${i === active ? "flow" : ""}`} size={22} />}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Plan visual ---------- */

function PlanVisual() {
  const [ref, inView] = useInView(0.35);
  const done = useCycle(planRows.length + 1, inView, 1300); // ticks rows off one by one, then resets
  return (
    <div className={`plan-visual reveal ${inView ? "visible play" : ""}`} ref={ref} aria-hidden>
      <div className="plan-lime" />
      <div className="probe-card">
        <h4>Resume Probe</h4>
        {[0, 1, 2].map((x) => (
          <div className="probe-line" key={x} style={{ "--d": `${600 + x * 350}ms` }}>
            <Check size={18} />
            <span>
              <i />
              <i />
            </span>
          </div>
        ))}
      </div>
      <div className="plan-card">
        <h3>
          <CalendarDays size={29} />
          Your Prep Plan
        </h3>
        <div className="timeline">
          {planRows.map(([t, label], i) => (
            <div className={`time-row ${i < done ? "ticked" : ""} ${i === done ? "now" : ""}`} key={t + label}>
              <span className="dot" />
              <b>{t}</b>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="plan-bar">
          <span style={{ width: `${(Math.min(done, planRows.length) / planRows.length) * 100}%` }} />
        </div>
      </div>
    </div>
  );
}

/* ---------- CTA ---------- */

function Metrics() {
  const [ref, inView] = useInView(0.5);
  const secs = useCountUp(30, inView, 1500);
  const taps = useCountUp(1, inView, 600);
  return (
    <div className="metrics" ref={ref}>
      <div>
        <Clock size={24} />
        <strong>~{secs}s</strong>
        <span>From details to plan</span>
      </div>
      <div>
        <Trash2 size={24} />
        <strong>{taps} tap</strong>
        <span>To delete your data</span>
      </div>
      <div>
        <ShieldCheck size={24} />
        <strong>0</strong>
        <span>Invented experience</span>
      </div>
    </div>
  );
}

export default function Landing() {
  useReveal();
  const [mobile, setMobile] = useState(false);
  const [heroOn, setHeroOn] = useState(false);
  const close = () => setMobile(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroOn(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="landing">
      <header className="nav shell">
        <a href="#top" className="brand" aria-label="Scoped home">
          <span className="brand-mark">
            <i />
            <i />
          </span>
          Scoped
        </a>
        <nav className={mobile ? "navlinks open" : "navlinks"}>
          <a onClick={close} href="#story">Story</a>
          <a onClick={close} href="#product">Product</a>
          <a onClick={close} href="#how">How it Works</a>
          <a onClick={close} href="#privacy">Privacy</a>
        </nav>
        <div className="nav-actions">
          <Link className="btn dark small" href="/start">
            Get Started <ArrowUpRight size={17} />
          </Link>
        </div>
        <button className="menu" aria-label="Toggle menu" aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
          <Menu />
        </button>
      </header>

      <main id="top">
        <section className={`hero shell ${heroOn ? "hero-on" : ""}`}>
          <div className="hero-copy">
            <div className="eyebrow hero-fade" style={{ "--d": "0ms" }}>
              THE LAST-MILE
              <br />
              INTERVIEW COACH
            </div>
            <h1>
              <span className="line"><span style={{ "--d": "120ms" }}>Know what</span></span>
              <span className="line"><span style={{ "--d": "240ms" }}>to prepare.</span></span>
              <span className="line"><span style={{ "--d": "360ms" }}><span className="highlight">Skip the rest.</span></span></span>
            </h1>
            <p className="hero-fade" style={{ "--d": "900ms" }}>
              Scoped is an AI triage coach for job candidates who are short on prep time. Get a focused, personalized
              plan that tells you what to study, what’s likely to be asked and what you can safely skip.
            </p>
            <div className="hero-actions hero-fade" style={{ "--d": "1050ms" }}>
              <Link className="btn dark shine" href="/start">
                Start Your Prep <ArrowUpRight size={19} />
              </Link>
              <a href="#story" className="watch">
                <span>
                  <Play size={16} fill="currentColor" />
                </span>
                See how it works
              </a>
            </div>
          </div>
          <div className="hero-art" aria-hidden>
            <div className="lime-blob" />
            <div className="orange-circle" />
            <Image className="person" src="/hero-person.png" alt="" width={445} height={480} priority />
            <span className="triage-pill">AI Triage</span>
            <ScopeCard active={heroOn} />
            {/* Sits over the card that is baked into the photo crop. */}
            <Readiness active={heroOn} />
          </div>
        </section>

        <Flow />

        <Story />

        <section className="benefits shell" id="product">
          <PlanVisual />
          <div className="benefits-content reveal">
            <div className="eyebrow">WHAT YOU GET</div>
            <h2>
              More than prep.
              <br />A <em>targeted</em> game plan.
            </h2>
            <div className="features">
              {features.map(({ icon: Icon, title, text, example }, i) => (
                <div className="feature reveal" key={title} style={{ transitionDelay: `${i * 90}ms` }} tabIndex={0}>
                  <Icon size={31} strokeWidth={1.9} />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <p className="example">{example}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="privacy shell" id="privacy">
          {privacy.map(({ icon: Icon, cls, title, text }, i) => (
            <div key={title} className="reveal" style={{ transitionDelay: `${i * 120}ms` }}>
              <span className={`p-icon ${cls}`}>
                <Icon size={22} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </section>

        <section className="cta shell">
          <div className="cta-content reveal">
            <div>
              <div className="eyebrow">BUILT FOR REAL CANDIDATES</div>
              <h2>
                Short on time?
                <br />
                <em>Get Scoped.</em>
              </h2>
            </div>
            <Metrics />
            <Link className="btn lime shine" href="/start">
              Start for Free <ArrowRight size={19} />
            </Link>
          </div>
        </section>

        <footer className="footer shell">
          <span>© {new Date().getFullYear()} Scoped. Prepare what matters.</span>
          <a href="#top">Back to top ↑</a>
        </footer>
      </main>
    </div>
  );
}
