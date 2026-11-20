import { PageHero } from "@/components/layout/PageHero";
import { Calculators } from "@/components/calculators/Calculators";
import { Disclaimer } from "@/components/ui/Bits";
import { disclaimers } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "SIP, Lump Sum & Loan EMI Calculators",
  "Free SIP, lump sum and loan EMI calculators with Indian number formatting. Illustrative estimates to help you plan — from MAGIRA, Pollachi.",
  "/calculators/",
);

export default function CalculatorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Financial calculators"
        title="Plan With Numbers, Decide With Confidence."
        description="Move the sliders or type a value to see live, illustrative estimates for SIPs, lump sum investments and loan EMIs."
        crumbs={[{ label: "Calculators" }]}
      />
      <section className="pb-24 sm:pb-32">
        <div className="container-x">
          <Calculators />
          <Disclaimer className="mt-10">{disclaimers.calculators}</Disclaimer>
        </div>
      </section>
    </>
  );
}
