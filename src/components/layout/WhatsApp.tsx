"use client";

import { motion } from "framer-motion";
import { useIntro } from "./Intro";
import { whatsappLink } from "@/config/site";

export function WhatsAppIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.3.6 4.53 1.74 6.5L3 29l6.68-1.74A12.98 12.98 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3Zm0 23.62c-2.02 0-3.99-.54-5.71-1.57l-.41-.24-3.96 1.04 1.06-3.86-.27-.4A10.6 10.6 0 0 1 5.4 16c0-5.86 4.77-10.62 10.64-10.62 5.86 0 10.6 4.76 10.6 10.62 0 5.86-4.75 10.62-10.6 10.62Zm5.83-7.95c-.32-.16-1.9-.94-2.19-1.04-.3-.11-.51-.16-.73.16-.21.32-.83 1.04-1.02 1.26-.19.21-.38.24-.7.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.15-.14.32-.38.48-.56.16-.19.21-.32.32-.54.1-.21.05-.4-.03-.56-.08-.16-.72-1.74-.99-2.38-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.86.4-.29.32-1.12 1.1-1.12 2.68 0 1.58 1.15 3.1 1.31 3.32.16.21 2.26 3.45 5.47 4.84.77.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

/** Compact floating WhatsApp button, visible site-wide. */
export function WhatsAppFab() {
  const { done } = useIntro();
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with MAGIRA on WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={done ? { opacity: 1, scale: 1, y: 0 } : undefined}
      transition={{ delay: 0.9, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="group fixed z-40"
      style={{
        right: "max(16px, calc(env(safe-area-inset-right) + 12px))",
        bottom: "max(18px, calc(env(safe-area-inset-bottom) + 14px))",
      }}
    >
      <span className="animate-float relative flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(140deg,#83db45,#0c9b65_55%,#006b50)] text-white shadow-[0_12px_30px_-8px_rgba(12,155,101,0.8),inset_0_1px_0_rgba(255,255,255,0.4)] transition-shadow duration-300 group-hover:shadow-[0_0_0_6px_rgba(131,219,69,0.15),0_16px_44px_-6px_rgba(12,155,101,1)]">
        <span className="absolute inset-0 rounded-full bg-lime/40 [animation:pulse-ring_2.6s_ease-out_infinite]" aria-hidden />
        <WhatsAppIcon className="relative h-7 w-7" />
      </span>
      <span className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 hidden -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-full border border-white/10 bg-[#0d1210]/90 px-3.5 py-2 text-sm font-medium text-white opacity-0 shadow-xl backdrop-blur transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}
