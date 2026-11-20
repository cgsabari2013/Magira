import { ArrowRight, Target, Eye, ShieldCheck, Search, UserCheck, Scale, Handshake } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { IconBadge, SectionHeading } from "@/components/ui/Bits";
import { GlowCard, Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { ConsultCTA } from "@/components/sections/HomeSections";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "About MAGIRA — Financial Services in Pollachi",
  "MAGIRA makes financial decisions simpler with guidance across mutual funds, insurance and loans for individuals and families in Pollachi and Coimbatore.",
  "/about/",
);

const values = [
  { icon: ShieldCheck, t: "Trust", d: "We earn trust by being consistent, reliable and honest — every time." },
  { icon: Search, t: "Transparency", d: "Costs, risks and terms explained clearly before you decide." },
  { icon: UserCheck, t: "Customer First", d: "Your goals and circumstances shape every conversation." },
  { icon: Scale, t: "Responsibility", d: "Suggestions that respect your risk profile and your budget." },
  { icon: Handshake, t: "Long-Term Relationships", d: "We are here for the journey, not a single transaction." },
];

const philosophy = [
  { t: "Listen first", d: "Every plan starts with understanding your life, your family and what matters to you." },
  { t: "Keep it simple", d: "Financial language made understandable, so you can decide with confidence." },
  { t: "See the whole picture", d: "Investments, protection and borrowing considered together, not in isolation." },
  { t: "Stay alongside you", d: "Regular reviews as your goals, income and responsibilities change." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About MAGIRA"
        title="Making Financial Decisions Simpler."
        description="At MAGIRA, we believe financial planning should be accessible, understandable, and aligned with your life goals."
        crumbs={[{ label: "About Us" }]}
      />

      <section className="section pt-0">
        <div className="container-x grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <div className="space-y-5 text-[18px] leading-relaxed text-white/85">
              <p>
                Whether you are looking to create wealth through mutual funds, protect your family through insurance, or explore
                financial assistance through loans, we bring multiple financial solutions together in one place.
              </p>
              <p className="text-muted">
                Our focus is to help you make informed financial decisions with personalized guidance and a customer-first
                approach.
              </p>
            </div>
            <div className="mt-9">
              <Button href="/book/">
                Talk to MAGIRA <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(160deg,#0f1d18,#0a0f0d)] p-10">
              <div aria-hidden className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand/30 blur-[90px]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo-dark.webp" alt="MAGIRA logo" width={360} height={204} loading="lazy" className="relative mx-auto w-[min(340px,100%)]" />
              <p className="relative mt-8 text-center text-lg font-medium text-champagne">Your Financial Growth, Our Commitment.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x grid gap-5 md:grid-cols-2">
          {[
            {
              icon: Target,
              k: "Our Mission",
              v: "To simplify financial decision-making by providing accessible guidance across investments, insurance, and loans.",
            },
            {
              icon: Eye,
              k: "Our Vision",
              v: "To become a trusted financial services partner for individuals and families on their journey towards financial well-being.",
            },
          ].map((m, i) => (
            <Reveal key={m.k} delay={i * 0.1}>
              <GlowCard className="group h-full p-8 sm:p-10">
                <IconBadge tone={i ? "gold" : "green"}>
                  <m.icon className="h-5 w-5" />
                </IconBadge>
                <h2 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-muted">{m.k}</h2>
                <p className="mt-3 text-balance text-[clamp(22px,2.4vw,28px)] font-medium leading-snug tracking-tight">{m.v}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <SectionHeading eyebrow="Our values" title="What Guides Every Conversation." />
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v, i) => (
              <StaggerItem key={v.t}>
                <GlowCard className="group h-full p-6">
                  <IconBadge tone={i === 4 ? "gold" : "green"}>
                    <v.icon className="h-5 w-5" />
                  </IconBadge>
                  <h3 className="mt-6 text-lg font-semibold">{v.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{v.d}</p>
                </GlowCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading align="left" eyebrow="Our philosophy" title="How We Think About Your Money." />
          <ol className="relative space-y-10 border-l border-white/10 pl-8">
            {philosophy.map((p, i) => (
              <Reveal as="li" key={p.t} delay={i * 0.08} className="relative">
                <span className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full border border-lime/40 bg-ink">
                  <span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_12px_#83db45]" />
                </span>
                <h3 className="text-xl font-semibold">{p.t}</h3>
                <p className="mt-2 max-w-lg text-[16px] leading-relaxed text-muted">{p.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <ConsultCTA />
    </>
  );
}
