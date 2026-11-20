import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { calculatorLinks, nav, serviceLinks, site, whatsappLink, mapsLink, disclaimers } from "@/config/site";
import { WhatsAppIcon } from "./WhatsApp";

export function Footer() {
  const c = site.compliance;
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#060908] pb-24 pt-20 sm:pb-12">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-emerald/20 blur-[120px]" />
      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_repeat(3,minmax(0,1fr))_1.3fr]">
          <div className="max-w-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-dark.webp" alt="MAGIRA — Mutual Funds, Insurance, Loans" width={220} height={125} loading="lazy" className="h-auto w-[200px]" />
            <p className="mt-6 text-[15px] leading-relaxed text-muted">{site.description}</p>
          </div>

          <FooterCol title="Quick links" links={nav.map((n) => ({ label: n.label, href: n.href }))} />
          <FooterCol title="Services" links={[...serviceLinks]} />
          <FooterCol title="Calculators" links={[...calculatorLinks, { label: "Book a 1-to-1 Session", href: "/book/" }]} />

          <div>
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <ul className="mt-5 space-y-4 text-[15px] text-muted">
              <li>
                <a href={`tel:${site.phoneE164}`} className="flex items-center gap-3 transition-colors hover:text-white">
                  <Phone className="h-4 w-4 flex-none text-lime" /> {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-white">
                  <WhatsAppIcon className="h-4 w-4 flex-none text-lime" /> WhatsApp {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="flex gap-3 transition-colors hover:text-white">
                  <MapPin className="mt-1 h-4 w-4 flex-none text-lime" />
                  <span>
                    {site.address.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 space-y-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 text-[13px] leading-relaxed text-[#8b958f]">
          {c.amfiArn && (
            <p>
              AMFI-registered Mutual Fund Distributor · ARN-{c.amfiArn}
              {c.euin ? ` · EUIN ${c.euin}` : ""}
            </p>
          )}
          {c.insuranceRegistration && <p>Insurance Agent Code: {c.insuranceRegistration}</p>}
          <p>{disclaimers.mutualFunds}</p>
          <p>{disclaimers.insurance}</p>
          <p>{disclaimers.loans}</p>
        </div>

        <div className="mt-8 flex flex-col-reverse items-start justify-between gap-4 border-t border-white/[0.06] pt-6 text-sm text-[#7d8781] sm:flex-row sm:items-center">
          <p>© 2026 MAGIRA. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms/" className="hover:text-white">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy/" className="hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-[15px] text-muted transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
