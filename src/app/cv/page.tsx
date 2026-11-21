import type { Metadata } from "next";
import { cv, site } from "@/lib/content";
import { href } from "@/lib/assets";
import { Rich } from "@/lib/markup";
import { PageBody, PageHero, SectionTitle } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRight, FileText } from "@/components/icons";

export const metadata: Metadata = { title: "CV" };

export default function CvPage() {
  return (
    <>
      <PageHero title="Curriculum Vitae" photo={site.backgrounds.cv}>
        <a
          href={href(cv.pdf.href)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary animate-rise mt-8"
          style={{ "--delay": "220ms" } as React.CSSProperties}
        >
          <FileText className="h-4 w-4" /> Download full CV (PDF)
        </a>
      </PageHero>
      <PageBody>
        <Reveal as="section" className="mb-20">
          <SectionTitle title="Personal information" />
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-prussian-500/25 bg-prussian-500/25 sm:grid-cols-2">
            {cv.personal.map((row) => (
              <div key={row.label} className="bg-prussian-850 px-6 py-5">
                <dt className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-prussian-300">{row.label}</dt>
                <dd className="mt-1.5 text-prussian-50">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {cv.sections.map((section) => (
          <Reveal as="section" key={section.title} className="mb-20">
            <SectionTitle title={section.title} />
            <ol className="space-y-4">
              {section.entries.map((e, i) => (
                <li key={i} className="grid gap-2 border-t border-prussian-500/20 pt-6 md:grid-cols-[9rem_1fr] md:gap-8">
                  <p className="font-mono text-xs leading-7 text-glacier">{e.when || "Now"}</p>
                  <div>
                    <h3 className="prose-site text-lg leading-snug text-prussian-50">
                      <Rich text={e.title} />
                    </h3>
                    {e.description && (
                      <p className="prose-site justified mt-2 text-prussian-200">
                        <Rich text={e.description} />
                      </p>
                    )}
                    {e.details && (
                      <dl className="prose-site mt-4 grid gap-x-6 gap-y-2 text-[0.95rem] sm:grid-cols-[auto_1fr]">
                        {e.details.map((d) => (
                          <div key={d.label} className="contents">
                            <dt className="font-mono text-[0.72rem] uppercase leading-7 tracking-[0.06em] text-prussian-300">{d.label}</dt>
                            <dd className="text-prussian-100">
                              <Rich text={d.value} />
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        ))}

        <Reveal>
          <a
            href={href(cv.pdf.href)}
            target="_blank"
            rel="noopener noreferrer"
            className="surface surface-hover group flex items-center gap-5 p-6 sm:p-8"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-prussian-700 text-glacier">
              <FileText />
            </span>
            <span className="flex-1">
              <span className="block text-prussian-50">{cv.pdf.text}</span>
              <span className="mt-1 block font-mono text-xs text-prussian-300">garatti_CV.pdf</span>
            </span>
            <ArrowUpRight className="h-5 w-5 text-prussian-300 transition group-hover:text-glacier" />
          </a>
        </Reveal>
      </PageBody>
    </>
  );
}
