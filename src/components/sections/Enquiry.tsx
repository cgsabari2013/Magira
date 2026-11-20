import { Phone, MapPin, Clock3 } from "lucide-react";
import { ContactForm } from "@/components/forms/Forms";
import { SectionHeading } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Motion";
import { WhatsAppIcon } from "@/components/layout/WhatsApp";
import { mapsLink, site, whatsappLink } from "@/config/site";

/** Final home-page section: a quick enquiry form. */
export function EnquirySection() {
  return (
    <section id="enquiry" className="section relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[36rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald/15 blur-[140px]" />
      </div>
      <div className="container-x relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Enquiry"
            title="Have a Question? Send Us an Enquiry."
            intro="Tell us what you'd like to know about mutual funds, insurance or loans. We'll get back to you on your mobile number."
          />
          <Reveal delay={0.2} className="mt-10 space-y-4">
            <a href={`tel:${site.phoneE164}`} className="panel flex items-center gap-4 rounded-2xl p-4 transition hover:border-white/15">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-brand/15 text-lime">
                <Phone className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm text-muted">Call us</span>
                <span className="font-semibold">{site.phoneDisplay}</span>
              </span>
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="panel flex items-center gap-4 rounded-2xl p-4 transition hover:border-white/15">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-brand/15 text-lime">
                <WhatsAppIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm text-muted">WhatsApp</span>
                <span className="font-semibold">Chat with MAGIRA</span>
              </span>
            </a>
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="panel flex items-center gap-4 rounded-2xl p-4 transition hover:border-white/15">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gold/15 text-gold">
                <MapPin className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm text-muted">Visit</span>
                <span className="font-semibold">Chinnampalayam, Pollachi</span>
              </span>
            </a>
            <p className="flex items-center gap-2 pt-2 text-sm text-[#7d8781]">
              <Clock3 className="h-4 w-4" /> No obligation. Your details are used only to respond to your enquiry.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="glass relative overflow-hidden rounded-[28px] p-6 sm:p-9">
            <div aria-hidden className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand/25 blur-[90px]" />
            <div className="relative">
              <h3 className="text-2xl font-semibold tracking-tight">Enquiry form</h3>
              <p className="mt-1.5 text-[15px] text-muted">Fields marked * are required.</p>
              <div className="mt-7">
                <ContactForm withService idPrefix="enq" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
