"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, LoaderCircle, AlertCircle, ArrowRight } from "lucide-react";
import {
  type BookingData,
  type ContactData,
  type FieldErrors,
  type SubmitResult,
  submitBooking,
  submitContact,
  todayISO,
  validateBooking,
  validateContact,
} from "@/lib/forms";
import { WhatsAppIcon } from "@/components/layout/WhatsApp";
import { Button } from "@/components/ui/Button";

function Field({
  id,
  label,
  error,
  required,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-white/85">
        {label}
        {required && (
          <span className="text-lime" aria-hidden>
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-[#7d8781]">{hint}</p>}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 flex items-center gap-1.5 text-[13px] text-[#f4978e]"
          >
            <AlertCircle className="h-3.5 w-3.5 flex-none" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const a11y = (id: string, err?: string) => ({
  id,
  name: id,
  "aria-invalid": err ? true : undefined,
  "aria-describedby": err ? `${id}-error` : undefined,
});

function Consent({ checked, onChange, error, id = "consent" }: { checked: boolean; onChange: (v: boolean) => void; error?: string; id?: string }) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 h-5 w-5 flex-none cursor-pointer appearance-none rounded-md border border-white/20 bg-white/[0.04] transition checked:border-brand checked:bg-brand checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2016%2016%22%20fill=%22none%22%20stroke=%22white%22%20stroke-width=%222.5%22%3E%3Cpath%20d=%22m4%208%203%203%205-6%22/%3E%3C/svg%3E')] bg-center"
        />
        <span>
          I agree that MAGIRA may contact me by phone, WhatsApp or email about this request, and I have read the{" "}
          <Link href="/privacy/" className="text-lime underline underline-offset-2">
            Privacy Policy
          </Link>
          . <span className="text-lime">*</span>
        </span>
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 pl-8 text-[13px] text-[#f4978e]">
          <AlertCircle className="h-3.5 w-3.5" /> {error}
        </p>
      )}
    </div>
  );
}

function Success({ result, onReset, backendText }: { result: SubmitResult; onReset: () => void; backendText: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);
  return (
    <motion.div
      ref={ref}
      tabIndex={-1}
      role="status"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center py-10 text-center outline-none"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/20 text-lime shadow-[0_0_40px_-6px_rgba(12,155,101,0.8)]"
      >
        {result.mode === "whatsapp" ? <WhatsAppIcon className="h-8 w-8" /> : <CheckCircle2 className="h-8 w-8" />}
      </motion.span>
      {result.mode === "whatsapp" ? (
        <>
          <h3 className="mt-6 text-2xl font-semibold">Almost done — send it on WhatsApp</h3>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
            We&apos;ve prepared a WhatsApp message with your details. Tap <strong className="text-white">Send</strong> in WhatsApp
            to share it with MAGIRA, and we&apos;ll reply to confirm a suitable time. Your request is not sent until you do.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href={result.url} external>
              <WhatsAppIcon className="h-5 w-5" /> Open WhatsApp
            </Button>
            <Button variant="glass" onClick={onReset}>
              Edit details
            </Button>
          </div>
        </>
      ) : (
        <>
          <h3 className="mt-6 text-2xl font-semibold">Thank you — request received</h3>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{backendText}</p>
          <div className="mt-7">
            <Button variant="glass" onClick={onReset}>
              Send another request
            </Button>
          </div>
        </>
      )}
    </motion.div>
  );
}

function focusFirstError(errors: FieldErrors, order: string[]) {
  const first = order.find((k) => errors[k]);
  if (first) document.getElementById(first)?.focus();
}

/* ───────── Booking ───────── */
const emptyBooking: BookingData = { name: "", mobile: "", email: "", date: "", time: "", service: "", message: "", consent: false };
const bookingOrder = ["name", "mobile", "email", "date", "time", "service", "message", "consent"];

export function BookingForm() {
  const [d, setD] = useState<BookingData>(emptyBooking);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [today, setToday] = useState("");
  const busy = useRef(false);

  useEffect(() => setToday(todayISO()), []);

  const set = <K extends keyof BookingData>(k: K, v: BookingData[K]) => {
    setD((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy.current) return; // prevent duplicate submissions
    const errs = validateBooking(d, today || todayISO());
    const clean = Object.fromEntries(Object.entries(errs).filter(([, v]) => v));
    setErrors(clean);
    if (Object.keys(clean).length) {
      focusFirstError(clean, bookingOrder);
      return;
    }
    busy.current = true;
    setStatus("submitting");
    try {
      const res = await submitBooking(d);
      if (res.mode === "whatsapp") window.open(res.url, "_blank", "noopener,noreferrer");
      setResult(res);
      setStatus("idle");
    } catch {
      setStatus("error");
      busy.current = false;
    }
  };

  const reset = () => {
    if (result?.mode === "backend") setD(emptyBooking);
    setResult(null);
    busy.current = false;
  };

  if (result)
    return (
      <Success
        result={result}
        onReset={reset}
        backendText="MAGIRA will contact you on your mobile number to confirm your consultation slot."
      />
    );

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Field id="name" label="Full name" required error={errors.name}>
          <input {...a11y("name", errors.name)} autoComplete="name" className="field" value={d.name} onChange={(e) => set("name", e.target.value)} placeholder="Your full name" />
        </Field>
      </div>
      <Field id="mobile" label="Mobile number" required error={errors.mobile} hint="10-digit Indian mobile number">
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[16px] text-muted">+91</span>
          <input
            {...a11y("mobile", errors.mobile)}
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            className="field pl-14"
            value={d.mobile}
            onChange={(e) => set("mobile", e.target.value)}
            placeholder="98765 43210"
            maxLength={16}
          />
        </div>
      </Field>
      <Field id="email" label="Email address" required error={errors.email}>
        <input {...a11y("email", errors.email)} type="email" autoComplete="email" className="field" value={d.email} onChange={(e) => set("email", e.target.value)} placeholder="name@example.com" />
      </Field>
      <Field id="date" label="Preferred consultation date" required error={errors.date}>
        <input {...a11y("date", errors.date)} type="date" min={today} className="field" value={d.date} onChange={(e) => set("date", e.target.value)} />
      </Field>
      <Field id="time" label="Preferred time" required error={errors.time}>
        <select {...a11y("time", errors.time)} className="field" value={d.time} onChange={(e) => set("time", e.target.value)}>
          <option value="">Select a time</option>
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Evening</option>
          <option>Any time</option>
        </select>
      </Field>
      <fieldset className="sm:col-span-2">
        <legend className="mb-2 block text-sm font-medium text-white/85">
          Service interested in <span className="text-lime">*</span>
        </legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="radiogroup" aria-describedby={errors.service ? "service-error" : undefined}>
          {["Mutual Funds", "Insurance", "Loans", "Multiple Services"].map((s, i) => (
            <label
              key={s}
              className={`flex min-h-[48px] cursor-pointer items-center justify-center rounded-xl border px-3 text-center text-sm font-medium transition ${
                d.service === s ? "border-brand bg-brand/15 text-white shadow-[0_0_0_4px_rgba(12,155,101,0.12)]" : "border-white/10 bg-white/[0.03] text-muted hover:border-white/20 hover:text-white"
              }`}
            >
              <input type="radio" name="service" id={i === 0 ? "service" : undefined} value={s} checked={d.service === s} onChange={() => set("service", s)} className="sr-only" />
              {s}
            </label>
          ))}
        </div>
        {errors.service && (
          <p id="service-error" className="mt-1.5 flex items-center gap-1.5 text-[13px] text-[#f4978e]">
            <AlertCircle className="h-3.5 w-3.5" /> {errors.service}
          </p>
        )}
      </fieldset>
      <div className="sm:col-span-2">
        <Field id="message" label="Message / financial requirements" error={errors.message} hint="Optional — avoid sharing account numbers or ID numbers here.">
          <textarea {...a11y("message", errors.message)} rows={4} className="field resize-y" value={d.message} onChange={(e) => set("message", e.target.value)} placeholder="Tell us briefly what you'd like to discuss" maxLength={1000} />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Consent checked={d.consent} onChange={(v) => set("consent", v)} error={errors.consent} />
      </div>
      {status === "error" && (
        <p role="alert" className="rounded-xl border border-[#f07167]/30 bg-[#f07167]/10 p-3 text-sm text-[#f4b4ad] sm:col-span-2">
          Something went wrong while sending your request. Please try again, or message us directly on WhatsApp.
        </p>
      )}
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full" magnetic={false}>
          {status === "submitting" ? (
            <>
              <LoaderCircle className="h-5 w-5 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Request My Consultation <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
        {!process.env.NEXT_PUBLIC_BOOKING_ENDPOINT && (
          <p className="mt-3 text-center text-xs text-[#7d8781]">Your request will open in WhatsApp, pre-filled, for you to send.</p>
        )}
      </div>
    </form>
  );
}

/* ───────── Contact ───────── */
const emptyContact: ContactData = { name: "", mobile: "", message: "", consent: false };

/** Contact / enquiry form. `withService` adds a "what is it about" choice (used by the home enquiry section). */
export function ContactForm({ withService = false, idPrefix = "c" }: { withService?: boolean; idPrefix?: string }) {
  const initial: ContactData = withService ? { ...emptyContact, service: "" } : emptyContact;
  const [d, setD] = useState<ContactData>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [result, setResult] = useState<SubmitResult | null>(null);
  const busy = useRef(false);

  const set = <K extends keyof ContactData>(k: K, v: ContactData[K]) => {
    setD((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy.current) return;
    const errs = validateContact(d);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const map: Record<string, string> = { name: `${idPrefix}-name`, mobile: `${idPrefix}-mobile`, service: `${idPrefix}-service`, message: `${idPrefix}-message`, consent: `${idPrefix}-consent` };
      const first = ["name", "mobile", "service", "message", "consent"].find((k) => errs[k]);
      if (first) document.getElementById(map[first])?.focus();
      return;
    }
    busy.current = true;
    setStatus("submitting");
    try {
      const res = await submitContact(d);
      if (res.mode === "whatsapp") window.open(res.url, "_blank", "noopener,noreferrer");
      setResult(res);
      setStatus("idle");
    } catch {
      setStatus("error");
      busy.current = false;
    }
  };

  if (result)
    return (
      <Success
        result={result}
        onReset={() => {
          if (result.mode === "backend") setD(initial);
          setResult(null);
          busy.current = false;
        }}
        backendText="Thanks for reaching out. MAGIRA will get back to you on your mobile number."
      />
    );

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <Field id={`${idPrefix}-name`} label="Name" required error={errors.name}>
        <input {...a11y(`${idPrefix}-name`, errors.name)} autoComplete="name" className="field" value={d.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" />
      </Field>
      <Field id={`${idPrefix}-mobile`} label="Mobile number" required error={errors.mobile}>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[16px] text-muted">+91</span>
          <input {...a11y(`${idPrefix}-mobile`, errors.mobile)} type="tel" inputMode="numeric" autoComplete="tel-national" className="field pl-14" value={d.mobile} onChange={(e) => set("mobile", e.target.value)} placeholder="98765 43210" maxLength={16} />
        </div>
      </Field>
      {withService && (
        <fieldset>
          <legend className="mb-2 block text-sm font-medium text-white/85">
            Enquiry about <span className="text-lime">*</span>
          </legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" aria-describedby={errors.service ? `${idPrefix}-service-error` : undefined}>
            {["Mutual Funds", "Insurance", "Loans", "Other"].map((s, i) => (
              <label
                key={s}
                className={`flex min-h-[48px] cursor-pointer items-center justify-center rounded-xl border px-3 text-center text-sm font-medium transition ${
                  d.service === s ? "border-brand bg-brand/15 text-white shadow-[0_0_0_4px_rgba(12,155,101,0.12)]" : "border-white/10 bg-white/[0.03] text-muted hover:border-white/20 hover:text-white"
                }`}
              >
                <input type="radio" name={`${idPrefix}-service`} id={i === 0 ? `${idPrefix}-service` : undefined} value={s} checked={d.service === s} onChange={() => set("service", s)} className="sr-only" />
                {s}
              </label>
            ))}
          </div>
          {errors.service && (
            <p id={`${idPrefix}-service-error`} className="mt-1.5 flex items-center gap-1.5 text-[13px] text-[#f4978e]">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.service}
            </p>
          )}
        </fieldset>
      )}
      <Field id={`${idPrefix}-message`} label="Message" required error={errors.message}>
        <textarea {...a11y(`${idPrefix}-message`, errors.message)} rows={4} className="field resize-y" value={d.message} onChange={(e) => set("message", e.target.value)} placeholder="How can we help?" maxLength={1000} />
      </Field>
      <Consent id={`${idPrefix}-consent`} checked={d.consent} onChange={(v) => set("consent", v)} error={errors.consent} />
      {status === "error" && (
        <p role="alert" className="rounded-xl border border-[#f07167]/30 bg-[#f07167]/10 p-3 text-sm text-[#f4b4ad]">
          Something went wrong. Please try again, or message us on WhatsApp.
        </p>
      )}
      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full" magnetic={false}>
        {status === "submitting" ? (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin" /> Sending…
          </>
        ) : (
          <>
            {withService ? "Send Enquiry" : "Send Message"} <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
