import Link from "next/link";
import {
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  HandCoins,
  Layers,
  UserCheck,
  Heart,
  Compass,
  Check,
  ArrowRight,
} from "lucide-react";
import { GlowCard, Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { IconBadge, SectionHeading } from "@/components/ui/Bits";
import { Button } from "@/components/ui/Button";
import { services } from "@/config/services";
import { whatsappLink, messages } from "@/config/site";
import { PortfolioVisual, ShieldVisual, LoanVisual } from "@/components/visuals/ServiceVisuals";
import { WhatsAppIcon } from "@/components/layout/WhatsApp";

const serviceIcons = { "mutual-funds": TrendingUp, insurance: ShieldCheck, loans: HandCoins } as const;

/* ───────── C. One destination ───────── */
export function ValueSection() {
  return (
    <section className="section relative" id="solutions">
      <div className="container-x">
        <SectionHeading
          eyebrow="Plan · Protect · Grow"
          title="One Destination. Multiple Financial Solutions."
          intro="Everything you need to plan, protect and grow your financial future."
        />
        <Stagger className="mt-16 grid gap-5 md:grid-cols-3">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.key];
            return (
              <StaggerItem key={s.key}>
                <Link href={s.href} className="group block h-full">
                  <GlowCard className="flex h-full flex-col p-7">
                    <div className="flex items-start justify-between">
                      <IconBadge tone={i === 1 ? "gold" : "green"}>
                        <Icon className="h-5 w-5" />
                      </IconBadge>
                      <ArrowUpRight className="h-5 w-5 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime" />
                    </div>
                    <p className="mt-10 text-sm font-medium text-lime/90">{s.category}</p>
                    <h3 className="mt-1.5 text-2xl font-semibold tracking-tight">
                      {s.key === "mutual-funds" ? "Mutual Fund Guidance" : s.key === "insurance" ? "Insurance Solutions" : "Loan Guidance"}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.short}</p>
                    <div className="mt-auto pt-8">
                      <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
                      <p className="mt-4 text-sm font-medium text-white/80 transition-colors group-hover:text-white">Learn more</p>
                    </div>
                  </GlowCard>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

/* ───────── D. Why choose MAGIRA ───────── */
const features = [
  {
    icon: Layers,
    title: "Multiple Financial Solutions",
    body: "Investments, insurance and loans discussed together, so each decision fits your bigger picture.",
  },
  {
    icon: UserCheck,
    title: "Personalized Financial Guidance",
    body: "Suggestions start from your goals, income, commitments and comfort with risk — not from a product list.",
  },
  {
    icon: Heart,
    title: "Customer-First Approach",
    body: "Clear explanations, honest answers on costs and risks, and time for your questions before you decide.",
  },
  {
    icon: Compass,
    title: "Long-Term Financial Planning",
    body: "Regular reviews as life changes — a new job, a child, a home — to keep your plan on course.",
  },
];

export function WhySection() {
  return (
    <section className="section relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute right-[-10%] top-1/3 h-[30rem] w-[30rem] rounded-full bg-emerald/20 blur-[120px]" />
      <div className="container-x relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-32">
          <SectionHeading
            align="left"
            eyebrow="Why choose MAGIRA"
            title="Your Financial Journey Deserves the Right Guidance."
            intro="We keep financial decisions simple and transparent, with guidance that fits your stage of life."
          />
          <Reveal delay={0.2} className="mt-8">
            <Button href="/about/" variant="glass">
              About MAGIRA <ArrowRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>
        <Stagger className="grid gap-5 sm:grid-cols-2">
          {features.map((f, i) => (
            <StaggerItem key={f.title} className={i % 2 === 1 ? "sm:translate-y-10" : ""}>
              <GlowCard className="group h-full p-7">
                <IconBadge tone={i === 3 ? "gold" : "green"}>
                  <f.icon className="h-5 w-5" />
                </IconBadge>
                <h3 className="mt-8 text-xl font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{f.body}</p>
              </GlowCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ───────── F. Services preview (alternating) ───────── */
const visuals = { "mutual-funds": PortfolioVisual, insurance: ShieldVisual, loans: LoanVisual } as const;

export function ServicesPreview() {
  return (
    <section className="section relative" id="services">
      <div className="container-x">
        <SectionHeading eyebrow="Our services" title="Guidance Across Every Stage of Your Financial Life." />
        <div className="mt-20 space-y-28 lg:space-y-36">
          {services.map((s, i) => {
            const Visual = visuals[s.key];
            const flip = i % 2 === 1;
            return (
              <div key={s.key} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <Reveal className={flip ? "lg:order-2" : ""}>
                  <span className="text-sm font-medium text-gold">
                    0{i + 1} · {s.category}
                  </span>
                  <h3 className="mt-3 text-balance text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.08] tracking-[-0.03em]">
                    {s.headline}
                  </h3>
                  <p className="mt-5 text-[17px] leading-relaxed text-muted">{s.description}</p>
                  <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                    {s.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-[15px] text-white/85">
                        <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand/20 text-lime">
                          <Check className="h-3 w-3" />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-9">
                    <Button href={s.href} variant={i === 1 ? "gold" : "primary"}>
                      Explore More <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </Reveal>
                <Reveal delay={0.15} className={flip ? "lg:order-1" : ""}>
                  <Visual />
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────── G. Consultation CTA ───────── */
export function ConsultCTA() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(160deg,#0f1d18,#0a0f0d_60%)] px-6 py-16 text-center sm:px-12 sm:py-24">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -bottom-[70%] left-1/2 h-[46rem] w-[70rem] -translate-x-1/2 rounded-[50%] border-t border-lime/40 shadow-[0_-40px_120px_-10px_rgba(12,155,101,0.55)]" />
              <div className="animate-drift absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-gold/10 blur-[80px]" />
              <div className="grid-bg absolute inset-0 opacity-60" />
            </div>
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-balance text-[clamp(30px,4.6vw,56px)] font-semibold leading-[1.05] tracking-[-0.035em]">
                Let&apos;s Build Your Financial Future <span className="text-gold">Together.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
                Have questions about investments, insurance, or loans? Let&apos;s discuss your financial goals and find the right
                direction.
              </p>
              <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <Button href="/book/" size="lg">
                  Book Your 1-to-1 Session <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href={whatsappLink(messages.booking)} external variant="glass" size="lg">
                  <WhatsAppIcon className="h-5 w-5 text-lime" /> Chat on WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
