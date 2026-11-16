import PageHead from "@/components/site/PageHead";
import Faq from "@/components/site/Faq";
import FinalCta from "@/components/site/FinalCta";
import { FadeIn } from "@/components/ui/Motion";
import { GUIDES } from "@/content/copy";

export const metadata = { title: "Resources · Scoped", description: "Short, practical guides for last-minute interview prep." };

const TINTS = ["tint-green", "tint-peach", "tint-grey", "tint-white"];

export default function ResourcesPage() {
  return (
    <>
      <PageHead
        eyebrow="Resources"
        title={
          <>
            Short guides for <span className="serif-i">short</span> timelines.
          </>
        }
      >
        Each one takes about a minute to read and works whether or not you use Scoped.
      </PageHead>

      <FadeIn className="mx-auto grid max-w-[1200px] gap-5 px-5 pb-10 sm:px-8 md:grid-cols-2">
        {GUIDES.map((g, i) => (
          <article key={g.title} data-fade className={`lift rounded-[32px] p-8 ${TINTS[i % 4]} ${i % 2 ? "md:rotate-[1.2deg]" : "md:rotate-[-1.2deg]"}`}>
            <p className="eyebrow text-muted">{g.tag}</p>
            <h2 className="display mt-3 text-[28px] leading-tight">{g.title}</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-muted">{g.body}</p>
          </article>
        ))}
      </FadeIn>

      <section id="about" className="mx-auto max-w-[1200px] scroll-mt-24 px-5 py-16 sm:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="eyebrow text-muted">About</p>
            <p className="mt-3 text-[15px] leading-relaxed">
              Scoped is a triage coach for candidates with little time. It helps you choose what to prepare; it never promises a job or invents
              experience.
            </p>
          </div>
          <div id="privacy" className="scroll-mt-24">
            <p className="eyebrow text-muted">Privacy</p>
            <p className="mt-3 text-[15px] leading-relaxed">
              Resumes are stored encrypted in a private bucket. Emails and phone numbers are removed before text reaches the AI. One tap deletes
              your resume and plan.
            </p>
          </div>
          <div id="terms" className="scroll-mt-24">
            <p className="eyebrow text-muted">Terms</p>
            <p className="mt-3 text-[15px] leading-relaxed">
              Scoped is in early access and offered as-is. Plans are guidance to help you prepare, not professional or career advice.
            </p>
          </div>
        </div>
      </section>

      <Faq />
      <FinalCta />
    </>
  );
}
