// Typed access to the JSON files in /content.
import siteJson from "@content/site.json";
import homeJson from "@content/home.json";
import newsJson from "@content/news.json";
import publicationsJson from "@content/publications.json";
import cvJson from "@content/cv.json";
import teachingJson from "@content/teaching.json";
import materialsJson from "@content/materials.json";
import readingsJson from "@content/readings.json";
import privateLessonsJson from "@content/private-lessons.json";

export type Link = { label: string; href: string };
export type LabelValue = { label: string; value: string };

export type NewsItem = { date: string; end?: string; image?: string; alt?: string; text: string };

export type Publication = {
  id: string;
  year: number;
  title: string;
  authors: string[];
  journal: string;
  abstract?: string;
  bibtex?: string;
  links?: Partial<Record<"pdf" | "doi" | "arxiv" | "hal", string>>;
};

export type CvEntry = {
  when?: string;
  title: string;
  description?: string;
  details?: LabelValue[];
};

export type Course = {
  title: string;
  subtitle?: string;
  hidden?: boolean;
  info?: LabelValue[];
  timetable?: { title: string; slots: { day: string; time: string; room?: string }[] };
  syllabus?: string[];
  diary?: {
    title: string;
    entries: {
      date: string;
      topics?: string;
      exercises?: string | string[];
      homework?: string;
      note?: string;
      canceled?: boolean;
      hidden?: boolean;
    }[];
  };
  chapters?: { intro?: string; items: { title: string; links: Link[]; hidden?: boolean }[] };
  materials?: Link[];
  materialsNote?: string;
};

export type MaterialItem = {
  title: string;
  subtitle?: string;
  image?: string;
  href: string;
  cta: string;
};

export type Book = {
  title: string;
  cover: string;
  description: string;
  isbn?: string;
  link: Link;
};

export const site = siteJson;
export const home = homeJson;
export const cv = cvJson as { personal: LabelValue[]; sections: { title: string; entries: CvEntry[] }[]; pdf: { text: string; label: string; href: string } };
export const teaching = teachingJson as {
  academicYear: string;
  consultation: { title: string; text: string; modes: LabelValue[] };
  groups: { title: string; courses: Course[] }[];
  privateLessonsBanner: string;
};
export const materials = materialsJson as {
  sections: { title: string; items: MaterialItem[] }[];
  browseAll?: Link;
};
export const readings = readingsJson as { intro: string; books: Book[] };
export const privateLessons = privateLessonsJson as {
  tagline: string;
  sections: { title: string; paragraphs?: string[]; list?: { label: string; text: string }[]; after?: string[] }[];
};

/** News sorted from the most recent. */
export const news: NewsItem[] = [...(newsJson.items as NewsItem[])].sort(
  (a, b) => b.date.localeCompare(a.date) || (b.end ?? b.date).localeCompare(a.end ?? a.date),
);

export const publications = publicationsJson.items as Publication[];
export const highlightAuthor = publicationsJson.highlightAuthor;

/** Publications grouped by year, most recent first. */
export function publicationsByYear() {
  const years = [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a);
  return years.map((year) => ({ year, items: publications.filter((p) => p.year === year) }));
}

const fmt = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
export function formatDate(iso: string) {
  return fmt.format(new Date(`${iso}T00:00:00Z`));
}
const dayFmt = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" });
/** "2026-09-07" -> "Monday 07/09/2026" (used by the teaching diary). */
export function formatLessonDate(iso: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  return dayFmt.format(new Date(`${iso}T00:00:00Z`)).replace(",", "");
}

export function formatRange(start: string, end?: string) {
  return end && end !== start ? [formatDate(start), formatDate(end)] : [formatDate(start)];
}
