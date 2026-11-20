import { LegalPage, type LegalSection } from "@/components/layout/Legal";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Privacy Policy",
  "How MAGIRA collects, uses and protects personal information shared through its website, consultation requests and WhatsApp.",
  "/privacy/",
);

const contact = `${site.phoneDisplay} (phone / WhatsApp), or by post to MAGIRA, ${site.address.lines.join(" ")}`;

const sections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    body: (
      <>
        <p>
          MAGIRA respects your privacy. This Privacy Policy explains what personal information we collect through this website
          and related communication channels, why we collect it, how we use and protect it, and the choices and rights you have.
        </p>
        <p>
          We aim to handle personal data in line with applicable Indian law, including the Information Technology Act, 2000 and
          the rules made under it, and the Digital Personal Data Protection Act, 2023 (&ldquo;DPDP Act&rdquo;) together with the
          rules made under it, to the extent they are in force.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    body: (
      <p>
        We collect information you choose to give us — for example when you fill in a form, book a consultation, or message
        us — and limited technical information needed to run the website.
      </p>
    ),
  },
  {
    id: "personal-information",
    title: "Personal Information",
    body: (
      <>
        <p>Personal information may include:</p>
        <ul>
          <li>Name</li>
          <li>Mobile number</li>
          <li>Email address</li>
          <li>Consultation preferences (preferred date, time and service)</li>
          <li>Information you voluntarily provide in messages or forms</li>
        </ul>
        <p>
          Please do not share bank account numbers, card details, passwords or government ID numbers through website forms.
          If such documents are needed later for a specific service (for example KYC), we will explain the appropriate process.
        </p>
      </>
    ),
  },
  {
    id: "consultation-information",
    title: "Contact and Consultation Information",
    body: (
      <p>
        When you request a consultation or send an enquiry, we receive the details you enter. If no online booking system is
        connected, the form prepares a WhatsApp message that you review and send yourself; in that case your details reach us
        only when you send that message.
      </p>
    ),
  },
  {
    id: "purpose",
    title: "Purpose of Data Collection",
    body: (
      <p>
        We collect personal information only for specified, lawful purposes connected with responding to you and providing
        the services you request, and we collect no more than is reasonably necessary for those purposes.
      </p>
    ),
  },
  {
    id: "how-we-use",
    title: "How We Use Information",
    body: (
      <ul>
        <li>To respond to enquiries.</li>
        <li>To schedule consultations.</li>
        <li>To provide requested services.</li>
        <li>To improve website functionality.</li>
        <li>To communicate relevant service information, with your consent where required.</li>
        <li>To meet legal, regulatory and record-keeping obligations.</li>
      </ul>
    ),
  },
  {
    id: "whatsapp",
    title: "WhatsApp Communication",
    body: (
      <p>
        If you contact us on WhatsApp, your messages are processed by WhatsApp (Meta) under its own terms and privacy policy
        in addition to this policy. We use WhatsApp to reply to you, coordinate consultations and share information you have
        asked for. You can ask us to stop messaging you on WhatsApp at any time.
      </p>
    ),
  },
  {
    id: "sharing",
    title: "Data Sharing and Third Parties",
    body: (
      <>
        <p>We do not sell your personal information. We may share it only where necessary:</p>
        <ul>
          <li>
            With product providers such as asset management companies, insurers or lenders, and their registrars or
            processors, when you ask us to proceed with a product;
          </li>
          <li>With service providers who help us operate the website or communications, under appropriate obligations;</li>
          <li>Where required by law, regulation, court order or a lawful request from authorities.</li>
        </ul>
      </>
    ),
  },
  {
    id: "security",
    title: "Data Security",
    body: (
      <p>
        We take reasonable organisational and technical steps to protect personal information against unauthorised access,
        loss or misuse, appropriate to the nature of the data and our size. No method of transmission or storage is completely
        secure, and we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: "retention",
    title: "Data Retention",
    body: (
      <p>
        We keep personal information only as long as needed for the purposes described here, or as required by law or
        regulation. When it is no longer needed, we delete it or make it anonymous.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and Analytics",
    body: (
      <p>
        The website is designed to work without advertising cookies. If we add analytics or similar tools in future, we will
        update this policy to describe them and, where required, ask for your consent. Third-party embeds such as Google Maps
        may set their own cookies under their own policies.
      </p>
    ),
  },
  {
    id: "rights",
    title: "User Rights",
    body: (
      <>
        <p>Subject to applicable law, you may:</p>
        <ul>
          <li>Ask for a summary of the personal data we hold about you and how it is used;</li>
          <li>Ask us to correct, complete or update inaccurate information;</li>
          <li>Ask us to erase personal data that is no longer needed, subject to legal retention requirements;</li>
          <li>Nominate another person to exercise your rights in the event of death or incapacity;</li>
          <li>Raise a grievance with us, and, if unresolved, approach the Data Protection Board of India.</li>
        </ul>
      </>
    ),
  },
  {
    id: "consent",
    title: "Consent and Withdrawal",
    body: (
      <p>
        Where we rely on your consent, you can withdraw it at any time by contacting us. Withdrawal does not affect processing
        already carried out, and some services may no longer be possible without the relevant information.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children's Privacy",
    body: (
      <p>
        This website is intended for adults. We do not knowingly collect personal data from children (persons under 18) without
        verifiable consent from a parent or lawful guardian. If you believe a child has shared data with us, please contact us
        so we can delete it.
      </p>
    ),
  },
  {
    id: "updates",
    title: "Policy Updates",
    body: (
      <p>
        We may revise this Privacy Policy from time to time. The latest version will always be available on this page with
        its &ldquo;Last updated&rdquo; date.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact Information",
    body: (
      <p>
        For privacy questions, requests or grievances, contact MAGIRA at {contact}. Please mention &ldquo;Privacy
        request&rdquo; in your message.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="How MAGIRA collects, uses and protects your personal information."
      updated="20 November 2026"
      sections={sections}
      crumb="Privacy Policy"
    />
  );
}
