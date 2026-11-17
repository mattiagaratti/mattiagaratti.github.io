import type { Metadata } from "next";
import { highlightAuthor, publicationsByYear, site } from "@/lib/content";
import { PageBody, PageHero } from "@/components/PageHero";
import { PublicationList } from "@/components/PublicationList";

export const metadata: Metadata = { title: "Publications" };

export default function PublicationsPage() {
  return (
    <>
      <PageHero
        title="Publications"
        subtitle="Papers and preprints. Click on a title for the abstract, links and BibTeX."
        photo={site.backgrounds.publications}
      />
      <PageBody wide>
        <PublicationList groups={publicationsByYear()} highlight={highlightAuthor} />
      </PageBody>
    </>
  );
}
