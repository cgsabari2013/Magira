/**
 * Centralised brand configuration.
 * Edit business details here — every page, the footer, SEO metadata and
 * structured data read from this file.
 */
export const site = {
  name: "MAGIRA",
  tagline: "Your Financial Growth, Our Commitment.",
  description:
    "MAGIRA brings mutual funds, insurance, and loan guidance together to help individuals and families make informed financial decisions.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://magira.vercel.app",

  phoneDisplay: "+91 97406 68686",
  phoneE164: "+919740668686",
  whatsappNumber: "919740668686",

  address: {
    lines: ["2/160 Raju Nagar,", "Chinnampalayam,", "Pollachi,", "Coimbatore – 642003,", "Tamil Nadu, India."],
    street: "2/160 Raju Nagar, Chinnampalayam",
    locality: "Pollachi",
    district: "Coimbatore",
    region: "Tamil Nadu",
    postalCode: "642003",
    country: "IN",
  },

  /**
   * Regulatory details. Leave empty until verified — nothing is shown
   * on the site while these are blank. Fill them in before going live
   * (e.g. AMFI ARN and EUIN for mutual fund distribution).
   */
  compliance: {
    amfiArn: "368755",
    euin: "E706309",
    insuranceRegistration: "9671182",
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "About Us", href: "/about/" },
  { label: "Calculators", href: "/calculators/" },
  { label: "Contact", href: "/contact/" },
] as const;

export const serviceLinks = [
  { label: "Mutual Funds", href: "/services/mutual-funds/" },
  { label: "Insurance", href: "/services/insurance/" },
  { label: "Loans", href: "/services/loans/" },
] as const;

export const calculatorLinks = [
  { label: "SIP Calculator", href: "/calculators/#sip" },
  { label: "Lump Sum Calculator", href: "/calculators/#lumpsum" },
  { label: "Loan EMI Calculator", href: "/calculators/#emi" },
] as const;

export const messages = {
  general: "Hello MAGIRA, I would like to know more about your financial services.",
  booking:
    "Hello MAGIRA, I would like to book a 1-to-1 financial consultation. Please contact me regarding my requirements.",
};

export function whatsappLink(text: string = messages.general) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const mapsQuery = encodeURIComponent(
  "2/160 Raju Nagar, Chinnampalayam, Pollachi, Coimbatore 642003, Tamil Nadu, India",
);
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
export const mapsEmbed = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

export const disclaimers = {
  mutualFunds:
    "Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully. Returns are not guaranteed.",
  calculators:
    "These calculators provide illustrative estimates only. Actual investment returns, loan interest rates, EMI amounts, and financial outcomes may vary. Mutual fund returns are market-linked and are not guaranteed. Please consult a qualified financial professional before making financial decisions.",
  insurance:
    "Insurance is the subject matter of solicitation. Coverage, exclusions, waiting periods and claim settlement are governed by the respective insurer's policy wording. Please read the policy document carefully.",
  loans:
    "Loan approval, interest rates, processing fees and disbursement timelines are decided solely by the lender, subject to eligibility, documentation and underwriting. MAGIRA does not guarantee loan sanction.",
};
