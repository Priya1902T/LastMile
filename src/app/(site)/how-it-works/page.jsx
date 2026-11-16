import PageHead from "@/components/site/PageHead";
import Story from "@/components/story/Story";
import Flow from "@/components/site/Flow";
import Faq from "@/components/site/Faq";
import FinalCta from "@/components/site/FinalCta";

export const metadata = {
  title: "How it works · Scoped",
  description: "From too many topics to a time-boxed plan, in six scenes.",
};

export default function HowPage() {
  return (
    <>
      <PageHead
        eyebrow="How it works"
        title={
          <>
            From <span className="serif-i">too much</span> to a plan, in six scenes.
          </>
        }
      >
        Scroll through one candidate’s evening: the pile, the details, the triage, the sort, the plan and the walk-in.
      </PageHead>
      <Story />
      <Flow />
      <Faq />
      <FinalCta />
    </>
  );
}
