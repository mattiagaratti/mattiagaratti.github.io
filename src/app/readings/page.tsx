import type { Metadata } from "next";
import { readings, site } from "@/lib/content";
import { PageBody, PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Img } from "@/components/Img";
import { ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = { title: "Suggested Readings" };

export default function ReadingsPage() {
  return (
    <>
      <PageHero title="Suggested Readings" subtitle={readings.intro} photo={site.backgrounds.readings} />
      <PageBody wide>
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {readings.books.map((b, i) => (
            <Reveal key={b.title} delay={i * 80} className="group flex flex-col">
              <a
                href={b.link.href}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-prussian-750 to-prussian-850 ring-1 ring-prussian-500/25"
              >
                <div aria-hidden className="lattice absolute inset-0 opacity-60" />
                <Img
                  src={b.cover}
                  alt={`Cover of ${b.title}`}
                  sizes="240px"
                  className="relative h-[72%] w-auto rounded-sm shadow-[0_30px_50px_-20px_#000] transition-transform duration-700 ease-out-expo group-hover:-translate-y-2 group-hover:scale-[1.03]"
                />
              </a>
              <p className="eyebrow mt-6">{b.isbn && `ISBN ${b.isbn}`}</p>
              <h2 className="title-serif mt-2 text-2xl">{b.title}</h2>
              <p className="mt-3 text-prussian-200">{b.description}</p>
              <a href={b.link.href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm text-glacier">
                {b.link.label} <ArrowUpRight className="h-4 w-4" />
              </a>
            </Reveal>
          ))}
        </div>
      </PageBody>
    </>
  );
}
