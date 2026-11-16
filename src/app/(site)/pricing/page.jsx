import PageHead from "@/components/site/PageHead";
import Pricing from "@/components/site/Pricing";
import Faq from "@/components/site/Faq";
import FinalCta from "@/components/site/FinalCta";

export const metadata = { title: "Pricing · Scoped", description: "Scoped is free during early access." };

export default function PricingPage() {
  return (
    <>
      <PageHead
        eyebrow="Pricing"
        title={
          <>
            Simple, <span className="marker italic">honest</span> pricing.
          </>
        }
      />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  );
}
