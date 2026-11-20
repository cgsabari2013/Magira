"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createContext, useContext, useEffect, useState } from "react";

/* ───────── Intro state shared with the hero so it animates on reveal ───────── */
const IntroContext = createContext<{ done: boolean }>({ done: false });
export const useIntro = () => useContext(IntroContext);

const EXIT_AT_MS = 2750;

type Note = {
  id: number;
  left: number; // vw
  width: number; // px
  delay: number;
  duration: number;
  r0: number;
  r1: number;
  sway: number;
  depth: number; // 0 far … 1 near
  flip: number;
};

function makeNotes(count: number): Note[] {
  const rand = (a: number, b: number) => a + Math.random() * (b - a);
  return Array.from({ length: count }, (_, i) => {
    const depth = Math.random();
    const r0 = rand(-50, 50);
    return {
      id: i,
      // spread evenly across the width with jitter so the rain feels full
      left: ((i + rand(0.1, 0.9)) / count) * 108 - 12,
      width: 100 + depth * 130,
      delay: rand(0, 0.9),
      duration: rand(2.2, 2.75) - depth * 0.55,
      r0,
      r1: r0 + rand(70, 200) * (Math.random() > 0.5 ? 1 : -1),
      sway: rand(30, 90) * (Math.random() > 0.5 ? 1 : -1),
      depth,
      flip: rand(35, 75),
    };
  });
}

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(true);
  const [done, setDone] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShow(false);
      setDone(true);
      return;
    }
    const html = document.documentElement;
    html.style.overflow = "hidden";
    setNotes(makeNotes(window.innerWidth < 640 ? 12 : 22));
    const t = window.setTimeout(() => {
      setShow(false);
      setDone(true);
    }, EXIT_AT_MS);
    return () => {
      window.clearTimeout(t);
      html.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.documentElement.style.overflow = "";
  }, [done]);

  const skip = () => {
    setShow(false);
    setDone(true);
  };

  return (
    <IntroContext.Provider value={{ done }}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            key="intro"
            data-intro=""
            aria-hidden="true"
            className="fixed inset-0 z-[200] overflow-hidden bg-ink"
            style={{ animation: "intro-failsafe 0.6s ease 7s forwards", perspective: 900 }}
            exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }}
          >
            <NoteSymbol />
            {/* ambient light */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-[110px]" />
              <div className="absolute left-1/2 top-[58%] h-[30vmin] w-[50vmin] -translate-x-1/2 rounded-full bg-gold/15 blur-[90px]" />
            </div>

            {/* falling ₹500 notes */}
            {notes.map((n) => (
              <FallingNote key={n.id} n={n} />
            ))}

            {/* brand mark */}
            <motion.div
              className="absolute inset-0 z-[5] flex flex-col items-center justify-center px-6"
              initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.06, filter: "blur(6px)", transition: { duration: 0.7 } }}
              transition={{ delay: 0.35, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                <div className="absolute inset-[-30%] rounded-full bg-lime/10 blur-3xl" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand/logo-icon.webp"
                  alt=""
                  width={220}
                  height={116}
                  className="relative w-[150px] drop-shadow-[0_12px_40px_rgba(12,155,101,0.45)] sm:w-[200px]"
                />
              </div>
              <motion.div
                className="mt-6 text-[clamp(28px,6vw,46px)] font-semibold tracking-[0.32em] text-white"
                initial={{ opacity: 0, letterSpacing: "0.6em" }}
                animate={{ opacity: 1, letterSpacing: "0.32em" }}
                transition={{ delay: 0.75, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                MAGIRA
              </motion.div>
              <motion.p
                className="mt-3 text-center text-sm text-muted sm:text-base"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.15, duration: 0.8 }}
              >
                Your Financial Growth, <span className="text-gold">Our Commitment.</span>
              </motion.p>
              <motion.div
                className="mt-8 h-px w-40 overflow-hidden rounded-full bg-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-brand via-lime to-gold"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.6, duration: (EXIT_AT_MS - 800) / 1000, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>

            <button
              type="button"
              onClick={skip}
              className="absolute bottom-[max(20px,env(safe-area-inset-bottom))] right-5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-muted backdrop-blur transition hover:text-white"
            >
              Skip intro
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </IntroContext.Provider>
  );
}

function FallingNote({ n }: { n: Note }) {
  const near = n.depth > 0.66;
  return (
    <motion.div
      className="absolute top-0 will-change-transform"
      style={{
        left: `${n.left}vw`,
        width: n.width,
        zIndex: near ? 2 : 1,
        transformStyle: "preserve-3d",
      }}
      initial={{ y: "-22vh", opacity: 0, rotate: n.r0 }}
      animate={{
        y: ["-22vh", "115vh"],
        x: [0, n.sway, -n.sway * 0.6, n.sway * 0.35],
        rotate: [n.r0, n.r1],
        rotateX: [0, n.flip, -n.flip * 0.6, n.flip * 0.8],
        rotateY: [0, -n.flip * 0.7, n.flip * 0.5, -n.flip * 0.3],
        opacity: [0, 0.35 + n.depth * 0.65, 0.35 + n.depth * 0.6, 0],
      }}
      transition={{
        delay: n.delay,
        duration: n.duration,
        y: { delay: n.delay, duration: n.duration, ease: [0.32, 0.05, 0.6, 1] },
        x: { delay: n.delay, duration: n.duration, ease: "easeInOut" },
        rotate: { delay: n.delay, duration: n.duration, ease: "easeOut" },
        rotateX: { delay: n.delay, duration: n.duration, ease: "easeInOut" },
        rotateY: { delay: n.delay, duration: n.duration, ease: "easeInOut" },
        opacity: { delay: n.delay, duration: n.duration, times: [0, 0.12, 0.55, 1], ease: "easeOut" },
      }}
    >
      <svg viewBox="0 0 300 132" className="block w-full drop-shadow-[0_18px_24px_rgba(0,0,0,0.55)]">
        <use href="#inr500" />
      </svg>
    </motion.div>
  );
}

/**
 * Stylised ₹500 note, drawn once and reused by every falling note.
 * Intentionally illustrative (no portrait, emblem or serial numbers) —
 * it evokes the stone-grey ₹500 without reproducing the banknote.
 */
function NoteSymbol() {
  const waves = Array.from({ length: 9 }, (_, i) => {
    const y = 18 + i * 12;
    return `M8 ${y} C 60 ${y - 9}, 110 ${y + 9}, 160 ${y} S 260 ${y - 9}, 292 ${y}`;
  });
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <linearGradient id="n-base" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c9c6b3" />
          <stop offset="0.45" stopColor="#b3b29d" />
          <stop offset="1" stopColor="#97987f" />
        </linearGradient>
        <linearGradient id="n-shift" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1f8a62" />
          <stop offset="1" stopColor="#2d5f9a" />
        </linearGradient>
        <linearGradient id="n-thread" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b9a6c" />
          <stop offset="1" stopColor="#3a6ea5" />
        </linearGradient>
        <radialGradient id="n-water" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#e7e4d4" />
          <stop offset="1" stopColor="#e7e4d4" stopOpacity="0" />
        </radialGradient>
        <symbol id="inr500" viewBox="0 0 300 132">
          <rect width="300" height="132" rx="7" fill="url(#n-base)" />
          <g stroke="#6f705d" strokeOpacity="0.22" fill="none" strokeWidth="0.8">
            {waves.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>
          <rect x="6" y="6" width="288" height="120" rx="4" fill="none" stroke="#5d5f4d" strokeOpacity="0.35" />
          <rect x="10" y="10" width="280" height="112" rx="3" fill="none" stroke="#5d5f4d" strokeOpacity="0.18" strokeDasharray="2 2" />
          {/* watermark window */}
          <ellipse cx="58" cy="66" rx="34" ry="42" fill="url(#n-water)" opacity="0.9" />
          {/* rosette */}
          <g transform="translate(122 66)" stroke="#55574a" strokeOpacity="0.55" fill="none" strokeWidth="0.9">
            {Array.from({ length: 12 }, (_, i) => (
              <ellipse key={i} rx="26" ry="9" transform={`rotate(${i * 15})`} />
            ))}
            <circle r="9" fill="#a9a993" stroke="#4d4f42" />
            <text y="3.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#3f4236" stroke="none" fontFamily="Manrope Variable, sans-serif">
              ₹
            </text>
          </g>
          {/* security thread */}
          <rect x="168" y="0" width="4.5" height="132" fill="url(#n-thread)" opacity="0.85" />
          <rect x="168" y="0" width="4.5" height="132" fill="none" stroke="#fff" strokeOpacity="0.25" strokeDasharray="6 5" />
          {/* denomination */}
          <text x="282" y="34" textAnchor="end" fontSize="24" fontWeight="800" fill="#3d4034" fontFamily="Manrope Variable, sans-serif">
            ₹500
          </text>
          <text x="282" y="64" textAnchor="end" fontSize="8.5" fontWeight="600" letterSpacing="1.4" fill="#4b4e40" fontFamily="Manrope Variable, sans-serif">
            FIVE HUNDRED RUPEES
          </text>
          <text x="284" y="114" textAnchor="end" fontSize="38" fontWeight="800" fill="url(#n-shift)" fontFamily="Manrope Variable, sans-serif">
            500
          </text>
          <text x="20" y="120" fontSize="12" fontWeight="700" fill="#4b4e40" fontFamily="Manrope Variable, sans-serif">
            500
          </text>
          <text x="20" y="26" fontSize="7" fontWeight="600" letterSpacing="1.2" fill="#55584a" fontFamily="Manrope Variable, sans-serif">
            ILLUSTRATIVE
          </text>
          {/* sheen */}
          <rect width="300" height="132" rx="7" fill="url(#n-water)" opacity="0.12" />
        </symbol>
      </defs>
    </svg>
  );
}
