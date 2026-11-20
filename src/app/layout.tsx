import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";
import { site } from "@/config/site";
import { IntroProvider } from "@/components/layout/Intro";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsApp";
import { MotionRoot } from "@/components/layout/MotionRoot";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "MAGIRA | Mutual Funds, Insurance & Loan Guidance in Pollachi",
    template: "%s | MAGIRA",
  },
  description:
    "Explore mutual funds, insurance solutions, and loan guidance with MAGIRA. Your financial services partner in Pollachi, Coimbatore.",
  keywords: [
    "Mutual Fund Distributor in Pollachi",
    "Mutual Funds in Pollachi",
    "Insurance Advisor in Pollachi",
    "Insurance Services in Pollachi",
    "Loan Assistance in Pollachi",
    "Financial Services in Pollachi",
    "Financial Services in Coimbatore",
    "SIP Investment Guidance",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "MAGIRA",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "MAGIRA — Mutual Funds, Insurance, Loans" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#080B0A",
  colorScheme: "dark",
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: site.name,
  description: site.description,
  url: site.url,
  logo: `${site.url}/brand/logo.png`,
  image: `${site.url}/og.jpg`,
  telephone: site.phoneE164,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  areaServed: ["Pollachi", "Coimbatore", "Tamil Nadu"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Financial services",
    itemListElement: ["Mutual fund distribution and guidance", "Insurance solutions", "Loan guidance"].map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s },
    })),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body className="min-h-dvh">
        <noscript>
          <style>{`[data-intro]{display:none!important}`}</style>
        </noscript>
        <a href="#main" className="sr-only z-[300] rounded-full bg-white px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <MotionRoot>
          <IntroProvider>
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
            <WhatsAppFab />
          </IntroProvider>
        </MotionRoot>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
