/** Financial formulas and Indian number formatting. Pure functions — easy to unit test. */

export function sipFutureValue(monthly: number, annualRatePct: number, years: number) {
  const n = Math.round(years * 12);
  const r = annualRatePct / 12 / 100;
  const invested = monthly * n;
  const fv = r === 0 ? invested : monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  return { invested, returns: fv - invested, futureValue: fv };
}

export function lumpsumFutureValue(principal: number, annualRatePct: number, years: number) {
  const fv = principal * Math.pow(1 + annualRatePct / 100, years);
  return { invested: principal, returns: fv - principal, futureValue: fv };
}

export function emi(principal: number, annualRatePct: number, months: number) {
  const n = Math.max(1, Math.round(months));
  const r = annualRatePct / 12 / 100;
  const value = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const total = value * n;
  return { emi: value, totalInterest: total - principal, totalPayment: total };
}

const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** ₹12,34,567 */
export function formatINR(value: number) {
  return `₹${inr.format(Math.round(value))}`;
}

/** ₹12.35 Lakh / ₹1.20 Crore / ₹85,000 */
export function formatINRWords(value: number) {
  const v = Math.round(value);
  if (v >= 1e7) return `₹${(v / 1e7).toFixed(2)} Crore`;
  if (v >= 1e5) return `₹${(v / 1e5).toFixed(2)} Lakh`;
  return formatINR(v);
}

/** Compact for chart axes: ₹1.2Cr, ₹45L, ₹80K */
export function formatINRCompact(value: number) {
  const v = Math.round(value);
  if (v >= 1e7) return `₹${+(v / 1e7).toFixed(1)}Cr`;
  if (v >= 1e5) return `₹${+(v / 1e5).toFixed(1)}L`;
  if (v >= 1e3) return `₹${+(v / 1e3).toFixed(0)}K`;
  return `₹${v}`;
}
