import {
  ArrowRight,
  BookOpen,
  Sparkles,
  Repeat,
  Coins,
  Target,
  Sprout,
  Gauge,
  HeartPulse,
  Users,
  ShieldCheck,
  ClipboardCheck,
  FileText,
  Wallet,
  Home,
  Briefcase,
  Scale,
  Calculator,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/config/services";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Disclaimer, IconBadge, SectionHeading } from "@/components/ui/Bits";
import { GlowCard, Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { PortfolioVisual, ShieldVisual, LoanVisual } from "@/components/visuals/ServiceVisuals";
import { ConsultCTA } from "./HomeSections";

const icons: Record<Service["key"], LucideIcon[]> = {
  "mutual-funds": [BookOpen, Sparkles, Repeat, Coins, Target, Sprout, Gauge],
  insurance: [ShieldCheck, HeartPulse, Users, Wallet, ClipboardCheck, FileText],
  loans: [Wallet, Home, Briefcase, Scale, Calculator, FileText],
};

const visuals = { "mutual-funds": PortfolioVisual, insurance: ShieldVisual, loans: LoanVisual } as const;

const process = [
  { t: "Understand", d: "We listen to your goals, timelines, commitments and concerns." },
  { t: "Explore", d: "We explain suitable options in plain language — including costs and risks." },
  { t: "Decide", d: "You choose what feels right. No pressure, no jargon." },
  { t: "Review", d: "We stay in touch and revisit your plan as life changes." },
];

export function ServiceDetail({ service }: { service: Service }) {
  const Visual = visuals[service.key];
  const ic = icons[service.key];
  return (
    <>
      <PageHero
        eyebrow={`${service.name} · ${service.category}`}
        title={service.headline}
        description={service.description}
        crumbs={[{ label: "Services", href: "/services/" }, { label: service.name }]}
        visual={<Visual />}
      >
        <Button href="/book/" size="lg">
          {service.cta} <ArrowRight className="h-4 w-4" />
        </Button>
        <Button href={service.key === "loans" ? "/calculators/#emi" : "/calculators/#sip"} variant="glass" size="lg">
          {service.key === "loans" ? "EMI Calculator" : service.key === "insurance" ? "Plan with Calculators" : "SIP Calculator"}
        </Button>
      </PageHero>

      <section className="section pt-8">
        <div className="container-x">
          <SectionHeading
            eyebrow="What you'll learn with us"
            title={
              service.key === "mutual-funds"
                ? "Understand Before You Invest."
                : service.key === "insurance"
                  ? "Cover That Fits Your Life."
                  : "Borrow With Clarity."
            }
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.topics.map((t, i) => {
              const Icon = ic[i % ic.length];
              return (
                <StaggerItem key={t.title} className={service.topics.length === 7 && i === 6 ? "sm:col-span-2 lg:col-span-3" : ""}>
                  <GlowCard className="group h-full p-7">
                    <IconBadge tone={i % 3 === 2 ? "gold" : "green"}>
                      <Icon className="h-5 w-5" />
                    </IconBadge>
                    <h3 className="mt-7 text-xl font-semibold tracking-tight">{t.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">{t.body}</p>
                  </GlowCard>
                </StaggerItem>
              );
            })}
          </Stagger>

          {service.key === "mutual-funds" && <SipVsLumpsum />}

          <Reveal className="mt-12">
            <Disclaimer>{service.disclaimer}</Disclaimer>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <SectionHeading eyebrow="How we work" title="A Simple, Transparent Process." />
          <Stagger className="relative mt-14 grid gap-5 md:grid-cols-4">
            <div aria-hidden className="absolute left-0 right-0 top-[30px] hidden h-px bg-gradient-to-r from-transparent via-lime/30 to-transparent md:block" />
            {process.map((p, i) => (
              <StaggerItem key={p.t} className="relative">
                <div className="relative z-10 flex h-[60px] w-[60px] items-center justify-center rounded-2xl border border-lime/25 bg-[#0d1512] text-lg font-semibold text-lime shadow-[0_0_30px_-8px_rgba(12,155,101,0.7)]">
                  {i + 1}
                </div>
                <h3 className="mt-5 text-lg font-semibold">{p.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <ConsultCTA />
    </>
  );
}

function SipVsLumpsum() {
  const rows = [
    ["How you invest", "Fixed amount at regular intervals", "One-time investment"],
    ["Suits", "Monthly income, building a habit", "Surplus funds such as a bonus"],
    ["Market timing", "Spread across market cycles", "Depends more on entry point"],
    ["Flexibility", "Pause, increase or stop as needed", "Can add more any time"],
  ];
  return (
    <Reveal className="mt-14">
      <div className="panel overflow-hidden rounded-[24px]">
        <div className="border-b border-white/[0.06] px-6 py-5">
          <h3 className="text-lg font-semibold">SIP vs lump sum at a glance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-[15px]">
            <thead>
              <tr className="text-sm text-muted">
                <th className="px-6 py-4 font-medium" scope="col">
                  Aspect
                </th>
                <th className="px-6 py-4 font-medium text-lime" scope="col">
                  SIP
                </th>
                <th className="px-6 py-4 font-medium text-gold" scope="col">
                  Lump sum
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]} className="border-t border-white/[0.05]">
                  <th scope="row" className="px-6 py-4 font-medium text-white/90">
                    {r[0]}
                  </th>
                  <td className="px-6 py-4 text-muted">{r[1]}</td>
                  <td className="px-6 py-4 text-muted">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Reveal>
  );
}
