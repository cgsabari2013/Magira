import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/layout/Legal";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Terms & Conditions",
  "Terms and conditions for using the MAGIRA website and its financial guidance and facilitation services.",
  "/terms/",
);

const sections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    body: (
      <p>
        These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your access to and use of the MAGIRA website and the information,
        tools and services made available through it. In these Terms, &ldquo;MAGIRA&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; and
        &ldquo;our&rdquo; refer to the MAGIRA business located at {site.address.lines.join(" ")} &ldquo;You&rdquo; refers to any
        person who visits the website or uses our services.
      </p>
    ),
  },
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    body: (
      <p>
        By accessing or using this website you agree to be bound by these Terms and our{" "}
        <Link href="/privacy/">Privacy Policy</Link>. If you do not agree, please do not use the website.
      </p>
    ),
  },
  {
    id: "scope",
    title: "Scope of Services",
    body: (
      <>
        <p>
          MAGIRA provides guidance and facilitation in relation to mutual funds, insurance and loans, in accordance with the
          business authorisations applicable to it. Depending on the product, our role may be that of a distributor, intermediary
          or facilitator; we are not the issuer of any mutual fund scheme, insurance policy or loan.
        </p>
        <p>
          Content on this website is for general information and education. It is not an offer, solicitation or recommendation
          to buy or sell any financial product, and it does not take into account your individual circumstances. Any product
          decision should be made only after a discussion of your specific needs and a careful reading of the relevant documents.
        </p>
      </>
    ),
  },
  {
    id: "mutual-funds",
    title: "Mutual Fund Investment Disclaimer",
    body: (
      <>
        <p>
          Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before
          investing. Past performance is not indicative of future returns, and the value of investments and any income from
          them can go down as well as up.
        </p>
        <p>Returns are not guaranteed. MAGIRA does not assure any level of return or protection of capital on any scheme.</p>
      </>
    ),
  },
  {
    id: "insurance",
    title: "Insurance Service Disclaimer",
    body: (
      <p>
        Insurance is the subject matter of solicitation. The scope of cover, exclusions, waiting periods, premiums and claim
        settlement are governed solely by the respective insurer&apos;s policy wording and terms. Claim decisions are made by the
        insurer. Please read the policy document, including the sales brochure and policy terms, carefully before concluding a
        sale.
      </p>
    ),
  },
  {
    id: "loans",
    title: "Loan Facilitation Disclaimer",
    body: (
      <p>
        Where MAGIRA assists with loans, approval, sanction amount, interest rate, fees and disbursement timelines are decided
        solely by the lending institution, subject to its eligibility criteria, documentation and underwriting. MAGIRA does not
        lend money and does not guarantee loan sanction, any particular rate or any timeline.
      </p>
    ),
  },
  {
    id: "no-guarantee",
    title: "No Guarantee of Financial Outcomes",
    body: (
      <>
        <p>MAGIRA does not guarantee investment profits, insurance claim approval or loan sanction.</p>
        <p>
          Calculators, charts and examples on this website are illustrative only. They rely on assumptions you enter or that
          we state, and actual outcomes may differ materially.
        </p>
      </>
    ),
  },
  {
    id: "user-responsibilities",
    title: "User Responsibilities",
    body: (
      <ul>
        <li>Provide accurate, complete and current information when you contact us or request a consultation.</li>
        <li>Independently review relevant scheme information documents, policy wordings and loan agreements before deciding.</li>
        <li>Do not misuse the website, attempt unauthorised access, or interfere with its operation.</li>
        <li>Do not submit sensitive identifiers such as account numbers or passwords through website forms.</li>
      </ul>
    ),
  },
  {
    id: "accuracy",
    title: "Accuracy of Information",
    body: (
      <p>
        We try to keep information on this website accurate and up to date, but we make no warranty that it is complete,
        current or free from error. Regulations, product features, taxes and interest rates change; please confirm details
        with us and with the product provider before acting.
      </p>
    ),
  },
  {
    id: "third-party-products",
    title: "Third-Party Products and Services",
    body: (
      <p>
        Mutual fund schemes, insurance policies and loans are products of third-party institutions. Their terms, charges,
        service standards and performance are the responsibility of those institutions. MAGIRA&apos;s role is limited to the
        guidance and facilitation described above.
      </p>
    ),
  },
  {
    id: "third-party-links",
    title: "Third-Party Website Links",
    body: (
      <p>
        This website may link to third-party websites such as WhatsApp or Google Maps. We do not control and are not
        responsible for their content, availability or privacy practices. Your use of those websites is governed by their own
        terms.
      </p>
    ),
  },
  {
    id: "ip",
    title: "Intellectual Property",
    body: (
      <p>
        The MAGIRA name, logo, website design, text and graphics are the property of MAGIRA or its licensors. You may not copy,
        reproduce or use them for commercial purposes without prior written permission.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    body: (
      <p>
        To the fullest extent permitted by law, MAGIRA shall not be liable for any indirect, incidental or consequential loss
        arising from your use of this website or reliance on its content, including investment losses, rejected claims or
        declined loan applications. Nothing in these Terms limits any liability that cannot be limited under applicable law.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to Terms",
    body: (
      <p>
        We may update these Terms from time to time. The updated version will be posted on this page with a revised
        &ldquo;Last updated&rdquo; date. Continued use of the website after changes means you accept the revised Terms.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing Law and Jurisdiction",
    body: (
      <p>
        These Terms are governed by the laws of India. Subject to applicable law, the courts at Coimbatore, Tamil Nadu shall
        have jurisdiction over any dispute arising from them. <em>(To be confirmed during legal review.)</em>
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact Information",
    body: (
      <p>
        For questions about these Terms, contact MAGIRA at {site.phoneDisplay} (phone / WhatsApp) or write to us at{" "}
        {site.address.lines.join(" ")}
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      intro="Please read these terms carefully before using the MAGIRA website or our services."
      updated="20 November 2026"
      sections={sections}
      crumb="Terms & Conditions"
    />
  );
}
