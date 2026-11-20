/**
 * Form validation + a modular submission adapter.
 *
 * No backend is bundled. If NEXT_PUBLIC_BOOKING_ENDPOINT / NEXT_PUBLIC_CONTACT_ENDPOINT
 * are set (e.g. a Formspree, Google Apps Script, or your own API URL that accepts JSON),
 * submissions are POSTed there. Otherwise the form falls back to WhatsApp: it opens a
 * pre-filled message to MAGIRA that the visitor sends themselves.
 */
import { messages, whatsappLink } from "@/config/site";

export type FieldErrors = Record<string, string>;

export function normalizeIndianMobile(raw: string) {
  let d = raw.replace(/[\s\-()]/g, "");
  if (d.startsWith("+91")) d = d.slice(3);
  else if (d.startsWith("0091")) d = d.slice(4);
  else if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  else if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return d;
}

export const isIndianMobile = (raw: string) => /^[6-9]\d{9}$/.test(normalizeIndianMobile(raw));
export const isEmail = (raw: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw.trim());

export type BookingData = {
  name: string;
  mobile: string;
  email: string;
  date: string;
  time: string;
  service: string;
  message: string;
  consent: boolean;
};

export function validateBooking(d: BookingData, today: string): FieldErrors {
  const e: FieldErrors = {};
  if (d.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!d.mobile.trim()) e.mobile = "Please enter your mobile number.";
  else if (!isIndianMobile(d.mobile)) e.mobile = "Enter a valid 10-digit Indian mobile number (starting 6–9).";
  if (!d.email.trim()) e.email = "Please enter your email address.";
  else if (!isEmail(d.email)) e.email = "Enter a valid email address, e.g. name@example.com.";
  if (!d.date) e.date = "Please choose a preferred date.";
  else if (d.date < today) e.date = "Please choose today or a future date.";
  if (!d.time) e.time = "Please choose a preferred time.";
  if (!d.service) e.service = "Please choose the service you're interested in.";
  if (!d.consent) e.consent = "Please agree so we can contact you about your request.";
  return e;
}

export type SubmitResult = { mode: "backend" } | { mode: "whatsapp"; url: string };

async function postJSON(endpoint: string, payload: unknown) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
}

export async function submitBooking(d: BookingData): Promise<SubmitResult> {
  const endpoint = process.env.NEXT_PUBLIC_BOOKING_ENDPOINT;
  const payload = { ...d, mobile: normalizeIndianMobile(d.mobile), type: "consultation", submittedAt: new Date().toISOString() };
  if (endpoint) {
    await postJSON(endpoint, payload);
    return { mode: "backend" };
  }
  const text = [
    messages.booking,
    "",
    `Name: ${d.name.trim()}`,
    `Mobile: +91 ${payload.mobile}`,
    `Email: ${d.email.trim()}`,
    `Preferred date: ${formatDate(d.date)}`,
    `Preferred time: ${d.time}`,
    `Service: ${d.service}`,
    d.message.trim() ? `Requirements: ${d.message.trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  return { mode: "whatsapp", url: whatsappLink(text) };
}

export type ContactData = { name: string; mobile: string; message: string; consent: boolean; service?: string };

export function validateContact(d: ContactData): FieldErrors {
  const e: FieldErrors = {};
  if (d.name.trim().length < 2) e.name = "Please enter your name.";
  if (!d.mobile.trim()) e.mobile = "Please enter your mobile number.";
  else if (!isIndianMobile(d.mobile)) e.mobile = "Enter a valid 10-digit Indian mobile number.";
  if (d.service === "") e.service = "Please choose what your enquiry is about.";
  if (d.message.trim().length < 5) e.message = "Please tell us a little about your enquiry.";
  if (!d.consent) e.consent = "Please agree so we can respond to you.";
  return e;
}

export async function submitContact(d: ContactData): Promise<SubmitResult> {
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
  const mobile = normalizeIndianMobile(d.mobile);
  if (endpoint) {
    await postJSON(endpoint, { ...d, mobile, type: "contact", submittedAt: new Date().toISOString() });
    return { mode: "backend" };
  }
  const text = [
    "Hello MAGIRA, I have an enquiry.",
    `Name: ${d.name.trim()}`,
    `Mobile: +91 ${mobile}`,
    d.service ? `Enquiry about: ${d.service}` : "",
    `Message: ${d.message.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");
  return { mode: "whatsapp", url: whatsappLink(text) };
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y) return iso;
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

export function todayISO() {
  const t = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${t.getFullYear()}-${p(t.getMonth() + 1)}-${p(t.getDate())}`;
}
