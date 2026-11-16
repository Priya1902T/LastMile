// S3. Slim dark marquee under the hero. Shows placeholder company wordmarks only when the flag is on;
// otherwise it shows true product facts.
import Wave from "@/components/ui/Wave";
import { FLAGS } from "@/content/flags";
import { TRUST_LOGOS } from "@/content/placeholders";

const FACTS = ["Triage, not cramming", "Built on NVIDIA NIM", "Resumes encrypted", "Emails & phones redacted", "One-tap delete", "Honest gap scripts", "Plans in ~30 seconds", "Never invents experience"];

function Slash() {
  return (
    <svg width="20" height="14" viewBox="0 0 30 22" className="mx-7 shrink-0" aria-hidden>
      <path d="M9.5 1 L1.5 21" stroke="#D7FF1E" strokeWidth="6" strokeLinecap="round" />
      <path d="M21.5 1 L13.5 21" stroke="#D7FF1E" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

export default function Strip() {
  const logos = FLAGS.SHOW_TRUST_LOGOS;
  const items = logos ? TRUST_LOGOS : FACTS;
  const row = (hidden) => (
    <div className="flex items-center" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <span key={t + hidden} className="flex items-center">
          <span className={logos ? "display whitespace-nowrap text-[22px] text-white/45" : "whitespace-nowrap text-[15px] font-semibold text-white/80"}>{t}</span>
          <Slash />
        </span>
      ))}
    </div>
  );
  return (
    <section aria-label={logos ? "Companies" : "What Scoped does"} className="on-dark relative">
      <Wave fill="#181A19" />
      <div className="grain bg-night pb-7 pt-3 text-white">
        <div className="relative z-[2] mx-auto flex max-w-[1200px] flex-col gap-4 px-5 sm:px-8 md:flex-row md:items-center md:gap-8">
          {logos && <p className="eyebrow shrink-0 text-white/55">Prepping candidates for interviews at</p>}
          <div className="marquee relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <div className="marquee-track">
              {row(false)}
              {row(true)}
            </div>
          </div>
        </div>
      </div>
      <Wave fill="#181A19" flip variant={1} />
    </section>
  );
}
