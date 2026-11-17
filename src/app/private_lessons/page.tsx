import type { Metadata } from "next";
import { privateLessons, site } from "@/lib/content";
import { Rich } from "@/lib/markup";
import { PageBody, PageHero, SectionTitle } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Mail } from "@/components/icons";

export const metadata: Metadata = { title: "Private lessons" };

export default function PrivateLessonsPage() {
  return (
    <>
      <PageHero title="Private lessons" subtitle={privateLessons.tagline} photo={site.backgrounds.privateLessons}>
        <a
          href={`mailto:${site.contact.email}`}
          className="btn btn-primary animate-rise mt-8"
          style={{ "--delay": "220ms" } as React.CSSProperties}
        >
          <Mail className="h-4 w-4" /> Contact me
        </a>
      </PageHero>
      <PageBody>
        {privateLessons.sections.map((s) => (
          <Reveal as="section" key={s.title} className="prose-site mb-20 text-[1.05rem]">
            <SectionTitle title={s.title} />
            {s.paragraphs?.map((p, i) => (
              <p key={i}>
                <Rich text={p} />
              </p>
            ))}
            {s.list && (
              <ul className="!my-7 grid gap-3 sm:grid-cols-2">
                {s.list.map((li) => (
                  <li key={li.label} className="surface !mt-0 !p-6 before:!hidden">
                    <strong className="title-serif block text-xl !font-normal">{li.label}</strong>
                    <span className="mt-2 block text-[0.95rem] text-prussian-200">
                      <Rich text={li.text} />
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {s.after?.map((p, i) => (
              <p key={i}>
                <Rich text={p} />
              </p>
            ))}
          </Reveal>
        ))}
      </PageBody>
    </>
  );
}
