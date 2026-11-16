import PageHead from "@/components/site/PageHead";
import Features from "@/components/site/Features";
import DeepDives from "@/components/site/DeepDives";
import Preview from "@/components/site/Preview";
import FinalCta from "@/components/site/FinalCta";

export const metadata = {
  title: "Product · Scoped",
  description: "Scope map, time-boxed plan, resume probe questions, honest-gap scripts and a fear drill.",
};

export default function ProductPage() {
  return (
    <>
      <PageHead
        eyebrow="Product"
        title={
          <>
            Everything you need for the <span className="marker italic">last mile.</span>
          </>
        }
      >
        Five tools, one plan, built for the hours you actually have.
      </PageHead>
      <Features />
      <DeepDives />
      <Preview />
      <FinalCta />
    </>
  );
}
