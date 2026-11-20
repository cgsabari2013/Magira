import { ArrowRight, Check } from "lucide-react";
import { services } from "@/config/services";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Disclaimer } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Motion";
import { PortfolioVisual, ShieldVisual, LoanVisual } from "@/components/visuals/ServiceVisuals";
import { ConsultCTA } from "@/components/sections/HomeSections";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Financial Services in Pollachi — Mutual Funds, Insurance & Loans",
  "Mutual fund guidance, life and health insurance solutions, and loan assistance in Pollachi, Coimbatore — all under one roof with MAGIRA.",
  "/services/",
);

const visuals = { "mutual-funds": PortfolioVisual, insurance: ShieldVisual, loans: LoanVisual } as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Plan, Protect and Grow — Under One Roof."
        description="Three areas of financial life, one trusted partner. Explore how MAGIRA can help with investments, protection and borrowing."
        crumbs={[{ label: "Services" }]}
      >
        <Button href="/book/" size="lg">
          Book a Consultation <ArrowRight className="h-4 w-4" />
        </Button>
      </PageHero>

      <section className="section pt-4">
        <div className="container-x space-y-28 lg:space-y-36">
          {services.map((s, i) => {
            const Visual = visuals[s.key];
            const flip = i % 2 === 1;
            return (
              <article key={s.key} id={s.key} className="grid scroll-mt-28 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <Reveal className={flip ? "lg:order-2" : ""}>
                  <span className="text-sm font-medium text-gold">
                    {s.name} · {s.category}
                  </span>
                  <h2 className="mt-3 text-balance text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.08] tracking-[-0.03em]">
                    {s.headline}
                  </h2>
                  <p className="mt-5 text-[17px] leading-relaxed text-muted">{s.description}</p>
                  <ul className="mt-7 flex flex-wrap gap-2">
                    {s.topics.map((t) => (
                      <li
                        key={t.title}
                        className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-sm text-white/85"
                      >
                        <Check className="h-3.5 w-3.5 text-lime" />
                        {t.title.replace(/\?$/, "")}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <Button href={s.href} variant={i === 1 ? "gold" : "primary"}>
                      Explore {s.name} <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button href="/book/" variant="glass">
                      {s.cta}
                    </Button>
                  </div>
                  <Disclaimer className="mt-8">{s.disclaimer}</Disclaimer>
                </Reveal>
                <Reveal delay={0.15} className={flip ? "lg:order-1" : ""}>
                  <Visual />
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>

      <ConsultCTA />
    </>
  );
}
