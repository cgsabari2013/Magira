import { disclaimers } from "./site";

export type ServiceKey = "mutual-funds" | "insurance" | "loans";

export type Topic = { title: string; body: string };

export type Service = {
  key: ServiceKey;
  name: string;
  category: string;
  short: string;
  headline: string;
  description: string;
  cta: string;
  href: string;
  benefits: string[];
  topics: Topic[];
  disclaimer: string;
  seoTitle: string;
  seoDescription: string;
};

export const services: Service[] = [
  {
    key: "mutual-funds",
    name: "Mutual Funds",
    category: "Wealth Creation",
    short: "Mutual fund guidance aligned with your goals, time horizon and comfort with risk.",
    headline: "Make Your Money Work Towards Your Dreams.",
    description:
      "Explore mutual fund investment opportunities with guidance aligned to your financial goals, investment horizon, and risk appetite.",
    cta: "Discuss Your Investment Goals",
    href: "/services/mutual-funds/",
    benefits: [
      "Goal-based investment planning",
      "SIP and lump sum options explained clearly",
      "Risk profiling before any recommendation",
      "Periodic portfolio reviews",
    ],
    topics: [
      {
        title: "What are mutual funds?",
        body: "A mutual fund pools money from many investors and invests it in a portfolio of equities, bonds or other securities, managed by a professional fund manager. Each investor owns units in proportion to the amount invested.",
      },
      {
        title: "Benefits of mutual fund investing",
        body: "Mutual funds offer diversification across many securities, professional management, the flexibility to start with small amounts, and a wide choice of categories to match different goals and timeframes.",
      },
      {
        title: "SIP investment",
        body: "A Systematic Investment Plan lets you invest a fixed amount at regular intervals. It builds a disciplined savings habit and spreads your purchases across market ups and downs.",
      },
      {
        title: "Lump sum investment",
        body: "Investing a larger amount at once can suit surplus funds such as a bonus or maturity proceeds. We help you weigh timing, category choice and alternatives such as a systematic transfer plan.",
      },
      {
        title: "Goal-based investing",
        body: "Start from the goal — a child's education, a home, retirement — then work backwards to the time available, the amount needed and the type of funds that fit that horizon.",
      },
      {
        title: "Long-term wealth creation",
        body: "Staying invested over long periods allows compounding to work. Patience, regular reviews and avoiding emotional decisions matter as much as fund selection.",
      },
      {
        title: "Risk profiling and investment guidance",
        body: "Before suggesting any scheme we understand your income, commitments, time horizon and comfort with volatility, so the categories you consider match your risk profile.",
      },
    ],
    disclaimer: disclaimers.mutualFunds,
    seoTitle: "Mutual Funds & SIP Guidance in Pollachi",
    seoDescription:
      "Goal-based mutual fund and SIP guidance in Pollachi, Coimbatore. Understand SIP, lump sum and risk profiling with MAGIRA. Mutual funds are subject to market risks.",
  },
  {
    key: "insurance",
    name: "Insurance",
    category: "Family Protection",
    short: "Life and health insurance solutions to help protect you and the people who depend on you.",
    headline: "Protect What Matters Most.",
    description:
      "Financial protection is an important part of a secure future. Explore insurance solutions designed to help protect you and your family.",
    cta: "Explore Insurance Solutions",
    href: "/services/insurance/",
    benefits: [
      "Needs-based cover assessment",
      "Life and health insurance options",
      "Help understanding policy terms and exclusions",
      "Support with documentation",
    ],
    topics: [
      {
        title: "Life insurance",
        body: "Life cover provides financial support to your dependants if something happens to you. Term plans focus purely on protection; other plans combine protection with savings features.",
      },
      {
        title: "Health insurance",
        body: "Health plans help manage the cost of hospitalisation and treatment. Coverage, room limits, waiting periods and exclusions vary by insurer and policy, so we help you compare them carefully.",
      },
      {
        title: "Family protection",
        body: "Family floater and individual plans can be combined to cover spouses, children and parents. The right structure depends on ages, existing cover and budget.",
      },
      {
        title: "Financial security",
        body: "Adequate cover helps keep your long-term goals — and your investments — on track if an unexpected event occurs, instead of forcing early withdrawals.",
      },
      {
        title: "Insurance planning",
        body: "We look at your income, liabilities, dependants and existing policies to estimate how much cover may be appropriate and where the gaps are.",
      },
      {
        title: "Coverage guidance",
        body: "We walk you through proposal forms, disclosures, the policy wording and the claim process so you know what is covered — and what is not — before you buy.",
      },
    ],
    disclaimer: disclaimers.insurance,
    seoTitle: "Life & Health Insurance Services in Pollachi",
    seoDescription:
      "Life and health insurance guidance in Pollachi, Coimbatore. Needs-based cover assessment and help understanding policy terms with MAGIRA.",
  },
  {
    key: "loans",
    name: "Loans",
    category: "Financial Assistance",
    short: "Guidance to explore personal, home and business loan options that fit your requirements.",
    headline: "Move Closer to Your Financial Goals.",
    description: "Get guidance to explore loan solutions that align with your financial requirements.",
    cta: "Discuss Your Loan Requirements",
    href: "/services/loans/",
    benefits: [
      "Understand eligibility before you apply",
      "EMI planning that fits your budget",
      "Documentation checklist and support",
      "Options across loan types",
    ],
    topics: [
      {
        title: "Personal loans",
        body: "Unsecured loans for needs such as medical expenses, education or a family event. We help you understand the total cost, tenure options and the impact on your monthly budget.",
      },
      {
        title: "Home loans",
        body: "Financing to buy, build or renovate a home. Down payment, tenure, interest type and eligibility all shape the right structure for you.",
      },
      {
        title: "Business loans",
        body: "Working capital or expansion funding for self-employed professionals and small businesses, subject to the lender's assessment of the business and its records.",
      },
      {
        title: "Loan eligibility guidance",
        body: "Lenders consider income, existing obligations, credit history and age. Knowing where you stand before applying helps you choose sensibly and avoid unnecessary rejections.",
      },
      {
        title: "EMI planning",
        body: "We help you test different amounts and tenures so the EMI stays comfortable alongside your savings, insurance premiums and household expenses.",
      },
      {
        title: "Loan documentation guidance",
        body: "Lenders commonly ask for identity and address proof, income proof and bank statements, plus property or business documents where relevant. Exact requirements vary by lender.",
      },
    ],
    disclaimer: disclaimers.loans,
    seoTitle: "Loan Assistance in Pollachi — Personal, Home & Business",
    seoDescription:
      "Loan assistance in Pollachi, Coimbatore. Explore personal, home and business loan options, eligibility and EMI planning with MAGIRA. Approval is subject to lender terms.",
  },
];

export const getService = (key: ServiceKey) => services.find((s) => s.key === key)!;
