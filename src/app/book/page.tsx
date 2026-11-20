import { CalendarCheck, MessagesSquare, Phone, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { BookingForm } from "@/components/forms/Forms";
import { Reveal } from "@/components/ui/Motion";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/layout/WhatsApp";
import { messages, site, whatsappLink } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Book a 1-to-1 Financial Consultation in Pollachi",
  "Schedule a one-to-one consultation with MAGIRA to discuss mutual funds, insurance or loans. Pollachi, Coimbatore.",
  "/book/",
);

const steps = [
  { icon: CalendarCheck, t: "Share your preferences", d: "Tell us your preferred date, time and the service you'd like to discuss." },
  { icon: MessagesSquare, t: "We confirm a slot", d: "MAGIRA gets in touch to confirm a time that works for you." },
  { icon: ShieldCheck, t: "Talk it through", d: "A focused conversation about your goals — no obligation to buy anything." },
];

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a 1-to-1 session"
        title="Your Goals. Your Questions. Let's Talk."
        description="Schedule a one-to-one consultation to discuss your financial requirements and explore suitable solutions."
        crumbs={[{ label: "Book a Session" }]}
      />
      <section className="pb-24 sm:pb-32">
        <div className="container-x grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal className="space-y-5 lg:sticky lg:top-28">
            <ol className="space-y-4">
              {steps.map((s, i) => (
                <li key={s.t} className="panel flex gap-4 rounded-3xl p-5">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-brand/15 text-lime">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-medium text-gold">Step {i + 1}</p>
                    <p className="mt-0.5 font-semibold">{s.t}</p>
                    <p className="mt-1 text-[15px] text-muted">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="glass rounded-3xl p-6">
              <p className="font-semibold">Prefer to message directly?</p>
              <p className="mt-1 text-[15px] text-muted">Book instantly on WhatsApp or give us a call.</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Button href={whatsappLink(messages.booking)} external>
                  <WhatsAppIcon className="h-5 w-5" /> Book on WhatsApp
                </Button>
                <Button href={`tel:${site.phoneE164}`} variant="glass" external={false}>
                  <Phone className="h-4 w-4" /> {site.phoneDisplay}
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass relative overflow-hidden rounded-[28px] p-6 sm:p-9">
              <div aria-hidden className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand/25 blur-[90px]" />
              <div className="relative">
                <h2 className="text-2xl font-semibold tracking-tight">Request a consultation</h2>
                <p className="mt-1.5 text-[15px] text-muted">Fields marked * are required.</p>
                <div className="mt-8">
                  <BookingForm />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
