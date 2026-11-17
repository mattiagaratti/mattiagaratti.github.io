import type { Metadata } from "next";
import { materials, site } from "@/lib/content";
import { Rich } from "@/lib/markup";
import { PageBody, PageHero, SectionTitle } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Img } from "@/components/Img";
import { CardLink } from "@/components/CardLink";
import { ArrowRight, ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = { title: "Miscellanea" };

export default function MaterialsPage() {
  return (
    <>
      <PageHero
        title="Miscellanea"
        subtitle="My theses, lecture notes from my studies and other mathematical bits."
        photo={site.backgrounds.materials}
      />
      <PageBody wide>
        {materials.sections.map((section) => (
          <Reveal as="section" key={section.title} className="mb-20">
            <SectionTitle title={section.title} />
            <div className={`grid gap-4 ${section.items.some((i) => i.image) ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
              {section.items.map((item) => (
                <CardLink
                  key={item.title}
                  to={item.href}
                  className={`surface surface-hover group flex overflow-hidden ${item.image ? "flex-col sm:flex-row" : "flex-col"}`}
                >
                  {item.image && (
                    <div className="flex shrink-0 items-center justify-center bg-prussian-800 p-6 sm:w-48">
                      <Img
                        src={item.image}
                        alt={item.title}
                        sizes="200px"
                        className="h-52 w-auto rounded shadow-[0_20px_40px_-15px_#000] transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:-rotate-1 sm:h-auto sm:w-full"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="title-serif text-2xl leading-tight">{item.title}</h3>
                    {item.subtitle && (
                      <p className="prose-site mt-3 text-prussian-200">
                        <Rich text={item.subtitle} />
                      </p>
                    )}
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm text-glacier">
                      {item.cta}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </CardLink>
              ))}
            </div>
          </Reveal>
        ))}
        {materials.browseAll && (
          <div className="flex justify-center">
            <a href={materials.browseAll.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              {materials.browseAll.label} <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        )}
      </PageBody>
    </>
  );
}
