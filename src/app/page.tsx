import { Hero } from "@/components/sections/Hero";
import { ValueSection, WhySection, ServicesPreview, ConsultCTA } from "@/components/sections/HomeSections";
import { GrowthSection } from "@/components/sections/GrowthSection";
import { Faq } from "@/components/sections/Faq";
import { EnquirySection } from "@/components/sections/Enquiry";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueSection />
      <WhySection />
      <GrowthSection />
      <ServicesPreview />
      <ConsultCTA />
      <Faq />
      <EnquirySection />
    </>
  );
}
