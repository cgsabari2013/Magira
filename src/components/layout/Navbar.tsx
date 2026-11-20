"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { nav, serviceLinks, site } from "@/config/site";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, "")));

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={`mx-auto flex h-16 max-w-[1240px] items-center justify-between rounded-full pl-4 pr-2 transition-all duration-500 sm:pl-5 ${
          scrolled || open
            ? "border border-white/10 bg-[#0b100e]/70 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
            : "border border-transparent bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center" aria-label="MAGIRA home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-horizontal-dark.webp" alt="MAGIRA" width={168} height={30} className="h-[30px] w-auto sm:h-[34px]" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.03] p-1">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative z-10 block rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${
                      active ? "text-white" : "text-muted hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.08]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button href="/book/" size="sm" className="h-11 px-5">
              Book a Consultation
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 max-h-[calc(100dvh-96px)] max-w-[1240px] overflow-y-auto rounded-[28px] border border-white/10 bg-[#0b100e]/95 p-3 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i + 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`flex min-h-[52px] items-center justify-between rounded-2xl px-4 text-lg font-medium ${
                        isActive(item.href) ? "bg-white/[0.06] text-white" : "text-white/80"
                      }`}
                    >
                      {item.label}
                      <ArrowUpRight className="h-4 w-4 text-muted" />
                    </Link>
                    {item.label === "Services" && (
                      <div className="mb-1 flex flex-wrap gap-2 px-4 pb-2">
                        {serviceLinks.map((s) => (
                          <Link key={s.href} href={s.href} className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-muted">
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mt-3 grid gap-2 border-t border-white/[0.06] pt-3">
              <Button href="/book/" className="w-full" size="lg">
                Book a Consultation
              </Button>
              <a href={`tel:${site.phoneE164}`} className="flex min-h-[48px] items-center justify-center gap-2 text-sm text-muted">
                <Phone className="h-4 w-4" /> {site.phoneDisplay}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
