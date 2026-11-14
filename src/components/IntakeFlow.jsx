"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const WHENS = ["Today", "Tomorrow", "This week", "Later"];

const QUESTIONS = [
  { key: "round", q: "Which round is it?", o: ["Screening", "Technical", "Managerial", "HR"] },
  {
    key: "hours",
    q: "How many hours can you really spend?",
    o: ["Under 3 hours", "3 to 12 hours", "1 to 3 days", "4 to 14 days"],
  },
  {
    key: "fear",
    q: "What worries you most?",
    o: ["Freezing", "Rambling", "Not knowing a stack", "Salary or gap questions"],
  },
];

const BUILD_MSGS = [
  "Reading your resume",
  "Checking the job description",
  "Ranking what matters",
  "Building your time plan",
  "Writing your gap scripts",
  "Almost there",
];

export function Chip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-10 rounded-full px-4 text-[13px] font-medium transition active:scale-[.97] ${selected ? "border border-ink bg-ink text-white" : "border border-line bg-white hover:border-ink"}`}
    >
      {label}
    </button>
  );
}

export function PrimaryButton(props) {
  return (
    <button
      {...props}
      className={`h-[52px] w-full rounded-full bg-vio font-medium text-white shadow-[0_10px_30px_rgba(20,20,20,.2)] transition hover:bg-vio2 active:scale-[.98] disabled:opacity-50 ${props.className ?? ""}`}
    />
  );
}

export default function IntakeFlow() {
  const router = useRouter();
  const [step, setStep] = useState("home");
  const [when, setWhen] = useState("Tomorrow");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [jd, setJd] = useState("");
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [pasteMode, setPasteMode] = useState(false);
  const [answers, setAnswers] = useState({});
  const [qi, setQi] = useState(0);
  const [msg, setMsg] = useState(0);
  const [error, setError] = useState(null);
  const fileRef = useRef(null);
  useEffect(() => {
    if (step !== "build") return;
    const id = setInterval(() => setMsg((m) => Math.min(m + 1, BUILD_MSGS.length - 1)), 5000);
    return () => clearInterval(id);
  }, [step]);
  async function submit(final) {
    setStep("build");
    setMsg(0);
    setError(null);
    const fd = new FormData();
    fd.set("role", role);
    fd.set("company", company);
    fd.set("when", when);
    fd.set("round", final.round);
    fd.set("hours", final.hours);
    fd.set("fear", final.fear);
    fd.set("jobDescription", jd);
    if (file) fd.set("resume", file);
    else if (resumeText.trim()) fd.set("resumeText", resumeText);
    try {
      const res = await fetch("/api/sessions", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong. Please try again.");
      router.push(`/plan/${data.id}`);
    } catch (e) {
      setError(e.message);
      setStep("details");
    }
  }
  function answer(key, value) {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    setTimeout(() => {
      if (qi < QUESTIONS.length - 1) setQi(qi + 1);
      else submit(next);
    }, 180);
  }
  if (step === "home")
    return (
      <section className="fade-in">
        <div className="glass rounded-3xl p-6">
          <p className="text-[11px] uppercase tracking-[.12em] text-mute">Turn your last hours into a plan</p>
          <h1 className="mt-5 font-display text-[40px] font-extrabold leading-[1.05] tracking-[-0.02em]">
            When is your <span className="highlight italic">interview?</span>
          </h1>
          <p className="mt-3 text-[15px] text-sub">
            Answer a few quick questions and get exactly what to prepare, and what to skip.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {WHENS.map((w) => (
              <Chip
                key={w}
                label={w}
                onClick={() => {
                  setWhen(w);
                  setStep("details");
                }}
              />
            ))}
          </div>
        </div>
        <ul className="mt-6 space-y-2 px-1 text-[13px] text-sub">
          <li>✓ What you must know, what will be probed, what to skip</li>
          <li>✓ A time-boxed plan for the hours you have</li>
          <li>✓ Questions they will ask about your resume, and honest answers for gaps</li>
        </ul>
      </section>
    );
  if (step === "details")
    return (
      <section className="fade-in">
        <button type="button" onClick={() => setStep("home")} className="text-[13px] font-medium">
          ← Back
        </button>
        <h2 className="mt-4 font-display text-[32px] font-extrabold leading-[1.1] tracking-[-0.02em]">
          Share what you have
        </h2>
        <p className="mt-2 text-[15px] text-sub">
          Only the role is required. The more you add, the more specific your plan.
        </p>

        {error && (
          <p role="alert" className="mt-4 rounded-2xl bg-red-50 p-3 text-[14px] text-red-700">
            {error}
          </p>
        )}

        <div className="glass mt-5 rounded-3xl p-5">
          <label htmlFor="role" className="text-[15px] font-medium">
            Role
          </label>
          <input
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Backend developer"
            className="mt-2 h-11 w-full rounded-2xl border border-line bg-cream px-3 text-[14px] placeholder:text-mute"
          />
          <label htmlFor="company" className="mt-4 block text-[15px] font-medium">
            Company <span className="text-mute font-normal">(optional)</span>
          </label>
          <input
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Acme"
            className="mt-2 h-11 w-full rounded-2xl border border-line bg-cream px-3 text-[14px] placeholder:text-mute"
          />
        </div>

        <div className="glass mt-3 rounded-3xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-medium">Resume</span>
            <button
              type="button"
              className="text-[13px] text-vio"
              onClick={() => {
                setPasteMode(!pasteMode);
                setFile(null);
              }}
            >
              {pasteMode ? "Upload a PDF instead" : "Paste text instead"}
            </button>
          </div>
          {pasteMode ? (
            <textarea
              rows={5}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text"
              className="mt-2 w-full rounded-2xl border border-line bg-cream p-3 text-[14px] placeholder:text-mute"
            />
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="mt-2 block w-full rounded-2xl border border-dashed border-ink/25 bg-cream p-4 text-left text-[13px] text-sub"
            >
              {file ? file.name : "Tap to choose a PDF (max 5 MB)"}
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.txt"
            className="sr-only"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </div>

        <div className="glass mt-3 rounded-3xl p-5">
          <label htmlFor="jd" className="text-[15px] font-medium">
            Job description <span className="text-mute font-normal">(optional)</span>
          </label>
          <textarea
            id="jd"
            rows={5}
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the role requirements here"
            className="mt-2 w-full rounded-2xl border border-line bg-cream p-3 text-[14px] placeholder:text-mute"
          />
        </div>

        <p className="mt-3 text-[12px] text-mute">
          Your resume is stored encrypted and used only to build your plan. Emails and phone numbers are removed before
          it reaches the AI. You can delete it any time.
        </p>
        <PrimaryButton
          className="mt-5"
          disabled={role.trim().length < 2}
          onClick={() => {
            setQi(0);
            setAnswers({});
            setStep("intake");
          }}
        >
          Continue
        </PrimaryButton>
      </section>
    );
  if (step === "intake") {
    const q = QUESTIONS[qi];
    return (
      <section className="fade-in" key={qi}>
        <button
          type="button"
          onClick={() => (qi === 0 ? setStep("details") : setQi(qi - 1))}
          className="text-[13px] text-vio"
        >
          ← Back
        </button>
        <div className="mt-4 flex gap-2">
          {QUESTIONS.map((_, k) => (
            <span key={k} className={`h-1.5 flex-1 rounded-full ${k <= qi ? "bg-lime" : "bg-line"}`} />
          ))}
        </div>
        <div className="glass mt-5 rounded-3xl p-6">
          <p className="text-[11px] uppercase tracking-[.12em] text-mute">
            Question {qi + 1} of {QUESTIONS.length}
          </p>
          <h2 className="mt-3 font-display text-[30px] font-extrabold leading-[1.12] tracking-[-0.02em]">{q.q}</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {q.o.map((o) => (
              <Chip key={o} label={o} selected={answers[q.key] === o} onClick={() => answer(q.key, o)} />
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="fade-in text-center">
      <div className="mt-16 flex flex-col items-center">
        <div className="orb" role="img" aria-label="Building your plan" />
        <p className="mt-10 font-display text-[26px] font-bold leading-tight" aria-live="polite">
          {BUILD_MSGS[msg]}
        </p>
        <p className="mt-3 text-[13px] text-mute">This takes about 30 seconds</p>
      </div>
    </section>
  );
}
