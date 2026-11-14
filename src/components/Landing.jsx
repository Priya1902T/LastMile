"use client";

// Landing page UI (ported from scoped-react). Every call to action goes to the real intake at /start.
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
  FileText,
  Layers,
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
import "@/app/landing.css";

const features = [
  { icon: Target, title: "Scope Map", text: "Must know, likely probed and safe to skip (with fallbacks)." },
  { icon: CalendarDays, title: "Time-Boxed Plan", text: "A focused study plan based on the hours you have left." },
  { icon: FileText, title: "Resume Probe Questions", text: "Likely questions about your resume, with answer outlines." },
  { icon: Zap, title: "Honest-Gap Scripts", text: "Truthful answers for missing skills + a quick way to learn the basics." },
  { icon: ShieldCheck, title: "Fear Tip", text: "Reassurance and one concrete drill for your specific worry." },
  { icon: Play, title: "Mock Interview (Soon)", text: "A text mock interview with personalized feedback." },
];

const steps = [
  { icon: PenLine, n: "01", title: "Share Your Details", desc: "Role, company, round, time and your biggest worry." },
  { icon: Sparkles, n: "02", title: "AI Triage", desc: "We analyze your resume, JD and context with NVIDIA NIM." },
  { icon: Layers, n: "03", title: "Get Your Plan", desc: "A personalized scope map, study plan, questions and real scripts." },
];

// Honest product facts rather than unverified outcome claims.
const metrics = [
  { icon: Clock, value: "~30s", label: "From details to plan" },
  { icon: Trash2, value: "1 tap", label: "To delete your data" },
  { icon: ShieldCheck, value: "0", label: "Invented experience" },
];

const planRows = [
  ["2.0 h", "Core Topics (Must Know)"],
  ["1.5 h", "Practice – Likely Probed"],
  ["1.0 h", "Resume & Project Qs"],
  ["0.5 h", "Gap Skills (Basics)"],
  ["1.0 h", "Quick Revision"],
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

export default function Landing() {
  useReveal();
  const [mobile, setMobile] = useState(false);
  const close = () => setMobile(false);

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
        <section className="hero shell">
          <div className="hero-copy reveal">
            <div className="eyebrow">
              THE LAST-MILE
              <br />
              INTERVIEW COACH
            </div>
            <h1>
              Know what
              <br />
              to prepare.
              <br />
              <span className="highlight">Skip the rest.</span>
            </h1>
            <p>
              Scoped is an AI triage coach for job candidates who are short on prep time. Get a focused, personalized
              plan that tells you what to study, what’s likely to be asked and what you can safely skip.
            </p>
            <div className="hero-actions">
              <Link className="btn dark" href="/start">
                Start Your Prep <ArrowUpRight size={19} />
              </Link>
              <a href="#how" className="watch">
                <span>
                  <Play size={16} fill="currentColor" />
                </span>
                See how it works
              </a>
            </div>
          </div>
          <div className="hero-art reveal" aria-hidden>
            <div className="lime-blob" />
            <div className="orange-circle" />
            <Image className="person" src="/hero-person.png" alt="" width={445} height={480} priority />
            <span className="triage-pill">AI Triage</span>
            <div className="scope-card">
              <h3>
                <Target size={26} /> Your Scope Map
              </h3>
              <div className="scope-row green">
                <span className="round"><Check size={19} /></span>
                <div><b>Must Know</b><small>5 topics</small></div>
                <ArrowRight />
              </div>
              <div className="scope-row peach">
                <span className="round"><Activity size={19} /></span>
                <div><b>Likely Probed</b><small>4 topics</small></div>
                <ArrowRight />
              </div>
              <div className="scope-row grey">
                <span className="round"><X size={19} /></span>
                <div><b>Safe to Skip</b><small>3 topics</small></div>
                <ArrowRight />
              </div>
            </div>
            {/* Sits over the card that is baked into the photo crop. */}
            <div className="readiness">
              <div className="gauge">
                <div className="gauge-track" />
                <div className="gauge-active" />
              </div>
              <span>Interview Readiness</span>
              <strong>92%</strong>
            </div>
          </div>
        </section>

        <section className="flow-band" id="how">
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
                  <div className={"step reveal " + (i === 0 ? "active" : "")} style={{ transitionDelay: `${i * 100}ms` }}>
                    <div className="step-icon"><s.icon size={25} /></div>
                    <div>
                      <div className="step-number">{s.n}</div>
                      <h3>{s.title}</h3>
                      <p>{s.desc}</p>
                    </div>
                  </div>
                  {i < 2 && <ArrowRight className="step-arrow" size={22} />}
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        <section className="benefits shell" id="product">
          <div className="plan-visual reveal" aria-hidden>
            <div className="plan-lime" />
            <div className="probe-card">
              <h4>Resume Probe</h4>
              {[1, 2, 3].map((x) => (
                <div className="probe-line" key={x}>
                  <Check size={18} />
                  <span><i /><i /></span>
                </div>
              ))}
            </div>
            <div className="plan-card">
              <h3><CalendarDays size={29} />Your Prep Plan</h3>
              <div className="timeline">
                {planRows.map(([t, label]) => (
                  <div className="time-row" key={t + label}>
                    <span className="dot" />
                    <b>{t}</b>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="benefits-content reveal">
            <div className="eyebrow">WHAT YOU GET</div>
            <h2>
              More than prep.
              <br />A <em>targeted</em> game plan.
            </h2>
            <div className="features">
              {features.map(({ icon: Icon, title, text }) => (
                <div className="feature" key={title}>
                  <Icon size={31} strokeWidth={1.9} />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="privacy shell reveal" id="privacy">
          {[
            ["Encrypted", "Resumes are stored encrypted, in a private bucket."],
            ["Redacted", "Emails and phone numbers are removed before anything reaches the AI."],
            ["Yours to delete", "One tap deletes your resume and your plan."],
          ].map(([t, b]) => (
            <div key={t}>
              <h3>{t}</h3>
              <p>{b}</p>
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
            <div className="metrics">
              {metrics.map(({ icon: Icon, value, label }) => (
                <div key={label}>
                  <Icon size={24} />
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <Link className="btn lime" href="/start">
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
