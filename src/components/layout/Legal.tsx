import { AlertTriangle } from "lucide-react";
import { PageHero } from "./PageHero";

export type LegalSection = { id: string; title: string; body: React.ReactNode };

export function LegalPage({
  title,
  intro,
  updated,
  sections,
  crumb,
}: {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
  crumb: string;
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} description={intro} crumbs={[{ label: crumb }]} />
      <section className="pb-24 sm:pb-32">
        <div className="container-x grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <nav aria-label="On this page" className="sticky top-28 max-h-[calc(100vh-140px)] overflow-y-auto pr-2">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">On this page</p>
              <ol className="space-y-1 text-sm">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="block rounded-lg px-3 py-1.5 text-muted transition hover:bg-white/[0.04] hover:text-white">
                      {i + 1}. {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
          <article className="min-w-0">
            <div role="note" className="flex gap-3 rounded-2xl border border-gold/25 bg-gold/[0.06] p-4 text-sm leading-relaxed text-[#e3d6b6]">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-none text-gold" aria-hidden />
              <p>
                <strong className="text-champagne">Draft for review.</strong> This document is a draft template and must be reviewed by
                a qualified legal professional, and updated with MAGIRA&apos;s actual registrations and practices, before publication.
              </p>
            </div>
            <p className="mt-6 text-sm text-muted">Last updated: {updated}</p>
            <div className="prose-legal mt-2 max-w-3xl">
              {sections.map((s, i) => (
                <section key={s.id} aria-labelledby={s.id}>
                  <h2 id={s.id}>
                    {i + 1}. {s.title}
                  </h2>
                  {s.body}
                </section>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
