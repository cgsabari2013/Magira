# MAGIRA — Website

This is a premium dark fintech website for MAGIRA (Mutual Funds · Insurance · Loans) in Pollachi, Coimbatore.

**Stack:** Next.js 16 (App Router, static export) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide · Recharts · Manrope (self-hosted)

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in /out
```

## Deploy

The site builds to plain static files in `/out`, so it runs on any host.

- **Vercel / Netlify / Cloudflare Pages:** import the repo. The build command is `npm run build` and the output folder is `out`.
- **Hostinger / cPanel / any web host:** run `npm run build`, then upload the contents of `out/` to `public_html`.

Before deploying, set this environment variable:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your live domain, e.g. `https://www.yourdomain.in`. It's used for canonical URLs, the sitemap, Open Graph tags and structured data. |
| `NEXT_PUBLIC_BOOKING_ENDPOINT` | Optional. A URL that accepts JSON POSTs, such as Formspree or a Google Apps Script. If you set it, booking requests are sent there. If you don't, the form opens a pre-filled WhatsApp message. |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Optional. The same as above, for the contact form. |

## Where to edit things

| What | File |
|---|---|
| Phone, WhatsApp, address, WhatsApp messages, disclaimers | `src/config/site.ts` |
| **AMFI ARN / EUIN / insurance registration** (shown in the footer once filled) | `src/config/site.ts` → `compliance` |
| Service content (mutual funds, insurance, loans) | `src/config/services.ts` |
| Colours, fonts, glass/glow styles | `src/app/globals.css` (`@theme`) |
| ₹500 intro animation (timing, note count, note design) | `src/components/layout/Intro.tsx` |
| Calculator formulas and ₹ lakh/crore formatting | `src/lib/finance.ts` |
| Form validation and the backend/WhatsApp adapter | `src/lib/forms.ts` |
| FAQ | `src/components/sections/Faq.tsx` |
| Terms / Privacy (drafts, need legal review) | `src/app/terms/page.tsx`, `src/app/privacy/page.tsx` |
| Logos | `public/brand/` |

## Structure

```
src/
  app/                 pages (home, services/*, about, book, calculators, contact, terms, privacy), sitemap, robots
  components/
    layout/            Intro (₹500 notes), Navbar, Footer, WhatsApp FAB, PageHero, Legal
    sections/          Hero, home sections, growth section, FAQ, service detail
    visuals/           hero dashboard, charts, service visuals
    calculators/       SIP / Lump sum / EMI
    forms/             booking + contact forms
    ui/                Button (magnetic iOS pill), motion helpers, shared bits
  config/              site + services content
  lib/                 finance formulas, form logic, SEO helper
```

## Notes

- **Intro:** stylised ₹500 notes fall and fade out, then the site is revealed. The notes are drawn in SVG and deliberately don't reproduce the real banknote: there's no portrait, emblem or serial number. The intro plays once per full page load, includes a "Skip intro" button, and is turned off completely for visitors who have "reduce motion" switched on. If JavaScript fails, it removes itself after 7 seconds.
- **No invented data:** every chart is labelled as sample or illustrative data. The site has no ratings, reviews, business hours or registrations.
- **Accessibility:** the site has semantic landmarks, a skip link, visible focus styles, labelled form fields with error messages, keyboard-accessible tabs and accordion, and 44px+ touch targets.
