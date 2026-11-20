"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, ShieldCheck, Landmark } from "lucide-react";
import { useIntro } from "@/components/layout/Intro";
import { Button } from "@/components/ui/Button";
import { HeroDashboard } from "@/components/visuals/HeroDashboard";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { done } = useIntro();
  const rise = (d: number) => ({
    initial: { opacity: 0, y: 26, filter: "blur(8px)" },
    animate: done ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined,
    transition: { delay: d, duration: 0.9, ease },
  });
  const line1 = "Your Financial Future,".split(" ");
  const line2 = "Designed to Grow.".split(" ");

  return (
    <section className="relative overflow-hidden pb-24 pt-32 sm:pt-36 lg:pb-32 lg:pt-44">
      {/* background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="grid-bg absolute inset-0" />
        <div className="animate-drift absolute -top-48 left-1/2 h-[42rem] w-[62rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(12,155,101,0.35),transparent)]" />
        {/* horizon arc inspired by the reference */}
        <div className="absolute left-1/2 top-[62%] h-[60rem] w-[120rem] -translate-x-1/2 rounded-[50%] border-t border-lime/25 shadow-[0_-30px_80px_-20px_rgba(12,155,101,0.45)] lg:top-[70%]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1.02fr_1fr] lg:gap-10">
        <div className="max-w-xl">
          <motion.span {...rise(0.05)} className="eyebrow">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-lime/70" />
              <span className="relative h-2 w-2 rounded-full bg-lime" />
            </span>
            Your Financial Growth Partner
          </motion.span>

          <h1 className="mt-7 text-[clamp(40px,5.1vw,68px)] font-semibold leading-[1.02] tracking-[-0.045em]">
            <span className="block">
              {line1.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.16em] -mb-[0.1em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={done ? { y: "0%" } : undefined}
                    transition={{ delay: 0.15 + i * 0.08, duration: 1, ease }}
                  >
                    {w}&nbsp;
                  </motion.span>
                </span>
              ))}
            </span>
            <span className="block">
              {line2.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.16em] -mb-[0.1em] align-bottom">
                  <motion.span
                    className={`inline-block ${i === line2.length - 1 ? "text-green" : "text-fade"}`}
                    initial={{ y: "110%" }}
                    animate={done ? { y: "0%" } : undefined}
                    transition={{ delay: 0.4 + i * 0.08, duration: 1, ease }}
                  >
                    {w}
                    {i < line2.length - 1 ? " " : ""}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <motion.p {...rise(0.65)} className="mt-6 max-w-[34rem] text-pretty text-[17px] leading-relaxed text-muted sm:text-lg">
            From building wealth to protecting your family and achieving your dreams, MAGIRA brings your financial needs
            together under one roof.
          </motion.p>

          <motion.div {...rise(0.8)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/book/" size="lg" className="w-full sm:w-auto">
              Book Your Free Consultation <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/services/" variant="glass" size="lg" className="w-full sm:w-auto">
              Explore Our Services
            </Button>
          </motion.div>

          <motion.ul {...rise(0.95)} className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
            {[
              { icon: TrendingUp, t: "Mutual Funds" },
              { icon: ShieldCheck, t: "Insurance" },
              { icon: Landmark, t: "Loans" },
            ].map((x) => (
              <li key={x.t} className="flex items-center gap-2">
                <x.icon className="h-4 w-4 text-lime" /> {x.t}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="relative sm:mb-32 lg:mb-24 lg:pl-6">
          <HeroDashboard />
        </div>
      </div>
    </section>
  );
}
