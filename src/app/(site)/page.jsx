import Hero from "@/components/site/Hero";
import Strip from "@/components/site/Strip";
import Problem from "@/components/site/Problem";
import Story from "@/components/story/Story";
import Flow from "@/components/site/Flow";
import Features from "@/components/site/Features";
import DeepDives from "@/components/site/DeepDives";
import Preview from "@/components/site/Preview";
import { Stats, Testimonials } from "@/components/site/Proof";
import Pricing from "@/components/site/Pricing";
import Faq from "@/components/site/Faq";
import FinalCta from "@/components/site/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Strip />
      <Problem />
      <Story />
      <Flow />
      <Features />
      <DeepDives />
      <Preview />
      <Stats />
      <Testimonials />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  );
}
