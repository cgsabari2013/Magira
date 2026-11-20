"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useIntro } from "./Intro";

const ease = [0.22, 1, 0.36, 1] as const;

/** Inner-page hero. Waits for the intro curtain on first load. */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs = [],
  children,
  visual,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
  visual?: React.ReactNode;
}) {
  const { done } = useIntro();
  const rise = (d: number) => ({
    initial: { opacity: 0, y: 24, filter: "blur(8px)" },
    animate: done ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined,
    transition: { delay: d, duration: 0.9, ease },
  });
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="grid-bg absolute inset-0" />
        <div className="animate-drift absolute -top-56 left-1/2 h-[36rem] w-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(12,155,101,0.32),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink" />
      </div>
      <div className={`container-x relative grid items-center gap-14 ${visual ? "lg:grid-cols-[1.05fr_1fr]" : ""}`}>
        <div className={visual ? "" : "mx-auto max-w-3xl text-center"}>
          {crumbs.length > 0 && (
            <motion.nav {...rise(0)} aria-label="Breadcrumb" className={`mb-6 flex flex-wrap items-center gap-1 text-sm text-muted ${visual ? "" : "justify-center"}`}>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              {crumbs.map((c) => (
                <span key={c.label} className="flex items-center gap-1">
                  <ChevronRight className="h-3.5 w-3.5 opacity-50" />
                  {c.href ? (
                    <Link href={c.href} className="hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white/80" aria-current="page">
                      {c.label}
                    </span>
                  )}
                </span>
              ))}
            </motion.nav>
          )}
          {eyebrow && (
            <motion.span {...rise(0.05)} className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_10px_#83db45]" />
              {eyebrow}
            </motion.span>
          )}
          <motion.h1
            {...rise(0.12)}
            className="mt-6 text-balance text-[clamp(36px,5.4vw,64px)] font-semibold leading-[1.04] tracking-[-0.04em]"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p {...rise(0.22)} className={`mt-6 text-pretty text-[17px] leading-relaxed text-muted sm:text-lg ${visual ? "max-w-xl" : "mx-auto max-w-2xl"}`}>
              {description}
            </motion.p>
          )}
          {children && (
            <motion.div {...rise(0.32)} className={`mt-9 flex flex-col gap-3 sm:flex-row ${visual ? "" : "justify-center"}`}>
              {children}
            </motion.div>
          )}
        </div>
        {visual && <motion.div {...rise(0.3)}>{visual}</motion.div>}
      </div>
    </section>
  );
}
