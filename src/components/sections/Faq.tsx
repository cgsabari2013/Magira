"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";
import { site } from "@/config/site";
import { SectionHeading } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Motion";

export const faqs: { q: string; a: React.ReactNode; plain: string }[] = [
  {
    q: "What services does MAGIRA offer?",
    plain: "MAGIRA offers mutual fund guidance, insurance solutions (life and health), and loan guidance for personal, home and business needs.",
    a: (
      <>
        MAGIRA brings three areas together: mutual fund guidance for wealth creation, insurance solutions for family
        protection, and loan guidance for personal, home and business requirements. See all{" "}
        <Link href="/services/" className="text-lime underline-offset-4 hover:underline">
          services
        </Link>
        .
      </>
    ),
  },
  {
    q: "How can I start investing in mutual funds?",
    plain: "Complete your KYC, define your goals, understand your risk profile, and choose suitable schemes via SIP or lump sum.",
    a: "You will need to complete KYC with your PAN, address proof and bank details. We then discuss your goals, time horizon and risk profile, and walk you through suitable fund categories and whether a SIP or a lump sum suits you. Mutual fund investments are subject to market risks.",
  },
  {
    q: "Why is insurance important?",
    plain: "Insurance helps protect your family's finances against unexpected events such as illness or loss of income.",
    a: "Insurance helps protect your family's finances from unexpected events such as a medical emergency or the loss of an earning member. Adequate cover also keeps your long-term savings and investments from being used up in a crisis. Coverage is always governed by the insurer's policy terms.",
  },
  {
    q: "Can MAGIRA help me find suitable loan options?",
    plain: "Yes. MAGIRA helps you understand eligibility, compare loan options and plan EMIs. Approval is decided by the lender.",
    a: "Yes. We help you understand your eligibility, compare loan types, plan a comfortable EMI and prepare the documents lenders usually ask for. Final approval, interest rates and timelines are decided by the lender.",
  },
  {
    q: "How can I book a consultation?",
    plain: "Use the Book a 1-to-1 Session page, message on WhatsApp, or call +91 97406 68686.",
    a: (
      <>
        Use the{" "}
        <Link href="/book/" className="text-lime underline-offset-4 hover:underline">
          Book a 1-to-1 Session
        </Link>{" "}
        page, message us on WhatsApp, or call {site.phoneDisplay}. Share your preferred date and time and we will get back
        to you to confirm.
      </>
    ),
  },
  {
    q: "Is an initial consultation available?",
    plain: "Yes, you can book an initial one-to-one consultation to discuss your requirements.",
    a: "Yes. You can book an initial one-to-one consultation to discuss your goals and questions before deciding anything. There is no obligation to invest or buy a product.",
  },
  {
    q: "How can I contact MAGIRA?",
    plain: "Call or WhatsApp +91 97406 68686, or visit 2/160 Raju Nagar, Chinnampalayam, Pollachi, Coimbatore – 642003.",
    a: (
      <>
        Call or WhatsApp {site.phoneDisplay}, or visit us at 2/160 Raju Nagar, Chinnampalayam, Pollachi, Coimbatore –
        642003. All details are on the{" "}
        <Link href="/contact/" className="text-lime underline-offset-4 hover:underline">
          contact page
        </Link>
        .
      </>
    ),
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.plain } })),
  };
  return (
    <section className="section" id="faq">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          align="left"
          eyebrow="FAQ"
          title="Questions, Answered Simply."
          intro="Can't find what you're looking for? Reach out on WhatsApp or book a session."
        />
        <Reveal>
          <ul className="space-y-3">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              const id = `${base}-${i}`;
              return (
                <li
                  key={f.q}
                  className={`rounded-2xl border transition-colors duration-300 ${
                    isOpen ? "border-lime/20 bg-[linear-gradient(180deg,rgba(12,155,101,0.10),rgba(255,255,255,0.02))]" : "border-white/[0.07] bg-white/[0.02]"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      className="flex min-h-[64px] w-full items-center justify-between gap-4 px-5 py-4 text-left text-[16px] font-medium sm:px-6"
                      aria-expanded={isOpen}
                      aria-controls={id}
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      <span>
                        <span className="mr-3 text-muted">{i + 1}.</span>
                        {f.q}
                      </span>
                      <span
                        className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border border-white/10 transition-transform duration-300 ${
                          isOpen ? "rotate-45 bg-lime/15 text-lime" : "text-muted"
                        }`}
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={id}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-[15px] leading-relaxed text-muted sm:px-6 sm:pl-[3.1rem]">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}
