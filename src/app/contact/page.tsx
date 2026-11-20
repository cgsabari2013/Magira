import { MapPin, Phone, Navigation } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/forms/Forms";
import { GlowCard, Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { IconBadge } from "@/components/ui/Bits";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/layout/WhatsApp";
import { mapsEmbed, mapsLink, site, whatsappLink } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Contact MAGIRA — Pollachi, Coimbatore",
  "Call or WhatsApp MAGIRA on +91 97406 68686, or visit 2/160 Raju Nagar, Chinnampalayam, Pollachi, Coimbatore – 642003.",
  "/contact/",
);

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Connect."
        description="Questions about investments, insurance or loans? Call, message on WhatsApp, or visit us in Pollachi."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="pb-16">
        <div className="container-x">
          <Stagger className="grid gap-5 md:grid-cols-3">
            <StaggerItem>
              <GlowCard className="group flex h-full flex-col p-7">
                <IconBadge>
                  <Phone className="h-5 w-5" />
                </IconBadge>
                <p className="mt-7 text-sm text-muted">Phone</p>
                <p className="mt-1 text-xl font-semibold">{site.phoneDisplay}</p>
                <div className="mt-auto pt-6">
                  <Button href={`tel:${site.phoneE164}`} size="sm">
                    Call now
                  </Button>
                </div>
              </GlowCard>
            </StaggerItem>
            <StaggerItem>
              <GlowCard className="group flex h-full flex-col p-7">
                <IconBadge>
                  <WhatsAppIcon className="h-5 w-5" />
                </IconBadge>
                <p className="mt-7 text-sm text-muted">WhatsApp</p>
                <p className="mt-1 text-xl font-semibold">{site.phoneDisplay}</p>
                <div className="mt-auto pt-6">
                  <Button href={whatsappLink()} external size="sm">
                    Chat on WhatsApp
                  </Button>
                </div>
              </GlowCard>
            </StaggerItem>
            <StaggerItem>
              <GlowCard className="group flex h-full flex-col p-7">
                <IconBadge tone="gold">
                  <MapPin className="h-5 w-5" />
                </IconBadge>
                <p className="mt-7 text-sm text-muted">Address</p>
                <address className="mt-1 not-italic leading-relaxed text-white/90">
                  <strong className="font-semibold">MAGIRA</strong>
                  {site.address.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
                <div className="mt-auto pt-6">
                  <Button href={mapsLink} external size="sm" variant="glass">
                    <Navigation className="h-4 w-4" /> Get directions
                  </Button>
                </div>
              </GlowCard>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container-x grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <div className="panel flex h-full flex-col overflow-hidden rounded-[28px]">
              <div className="flex items-center justify-between gap-3 px-6 py-5">
                <div>
                  <h2 className="text-lg font-semibold">Business location</h2>
                  <p className="text-sm text-muted">Chinnampalayam, Pollachi, Coimbatore</p>
                </div>
                <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="text-sm text-lime underline-offset-4 hover:underline">
                  Open in Google Maps
                </a>
              </div>
              <div className="relative min-h-[360px] flex-1 bg-card-2">
                <iframe
                  title="MAGIRA location on Google Maps"
                  src={mapsEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0 [filter:invert(0.92)_hue-rotate(180deg)_saturate(0.6)_brightness(0.9)]"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass rounded-[28px] p-6 sm:p-8">
              <h2 className="text-2xl font-semibold tracking-tight">Send us a message</h2>
              <p className="mt-1.5 text-[15px] text-muted">We&apos;ll get back to you on your mobile number.</p>
              <div className="mt-7">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
