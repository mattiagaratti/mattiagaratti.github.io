import type { Metadata } from "next";
import type { Course } from "@/lib/content";
import { formatLessonDate, site, teaching } from "@/lib/content";
import { href } from "@/lib/assets";
import { Rich } from "@/lib/markup";
import { PageBody, PageHero, SectionTitle } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Clock, FileText, Plus } from "@/components/icons";

export const metadata: Metadata = { title: "Teaching" };

function Label({ children }: { children: React.ReactNode }) {
  return <h4 className="eyebrow mb-4 mt-10 first:mt-0">{children}</h4>;
}

function MaterialButton({ label, link }: { label: string; link: string }) {
  return link ? (
    <a href={href(link)} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-ghost">
      <FileText className="h-3.5 w-3.5" /> {label}
    </a>
  ) : (
    <span className="btn btn-sm btn-ghost" aria-disabled="true" title="Coming soon">
      {label} · soon
    </span>
  );
}

function SubItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="rounded-xl border border-prussian-500/20 bg-prussian-900/60">
      <summary className="flex items-center justify-between gap-3 px-4 py-3 text-prussian-50">
        {title}
        <Plus className="chevron h-4 w-4 shrink-0 text-prussian-300" />
      </summary>
      <div className="px-4 pb-4">{children}</div>
    </details>
  );
}

function CourseCard({ course }: { course: Course }) {
  const diary = (course.diary?.entries.filter((e) => !e.hidden) ?? []).sort((a, b) => a.date.localeCompare(b.date));
  const chapters = course.chapters?.items.filter((c) => !c.hidden) ?? [];
  return (
    <details className="surface group overflow-hidden transition-colors open:border-prussian-400/40">
      <summary className="flex items-center gap-5 p-5 transition-colors hover:bg-prussian-800/60 sm:p-7">
        <span className="flex-1">
          <span translate="no" className="title-serif block text-2xl leading-tight">
            {course.title}
          </span>
          {course.subtitle && <span className="mt-1 block text-sm text-prussian-300">{course.subtitle}</span>}
        </span>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-prussian-500/40 text-prussian-100 transition-colors group-open:border-glacier group-open:text-glacier">
          <Plus className="chevron h-4 w-4" />
        </span>
      </summary>

      <div className="border-t border-prussian-500/20 p-5 sm:p-7">
        {(course.info || course.timetable) && (
          <div className="grid gap-6 sm:grid-cols-2">
            {course.info && (
              <dl className="grid content-start gap-3">
                {course.info.map((i) => (
                  <div key={i.label}>
                    <dt className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-prussian-300">{i.label}</dt>
                    <dd className="text-prussian-50">{i.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {course.timetable && (
              <div className="rounded-xl bg-prussian-900/60 p-4 ring-1 ring-prussian-500/20">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-prussian-300">{course.timetable.title}</p>
                <ul className="mt-3 space-y-3">
                  {course.timetable.slots.map((s, i) => (
                    <li key={i} className="flex gap-3">
                      <Clock className="mt-1 h-4 w-4 shrink-0 text-glacier" />
                      <span>
                        <span className="text-prussian-50">{s.day}</span>{" "}
                        <span className="font-mono text-sm text-prussian-200">{s.time}</span>
                        {s.room && <span className="block text-sm text-prussian-300">{s.room}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {course.syllabus && (
          <>
            <Label>Course syllabus</Label>
            <ol className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {course.syllabus.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-mono text-xs leading-7 text-glacier">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-prussian-100">{s}</span>
                </li>
              ))}
            </ol>
          </>
        )}

        {diary.length > 0 && (
          <>
            <Label>{course.diary!.title}</Label>
            <div className="space-y-2">
              {diary.map((d, i) => (
                <SubItem key={i} title={formatLessonDate(d.date)}>
                  <div className="prose-site text-[0.95rem]">
                    {d.topics && (
                      <p>
                        <strong>Topics covered:</strong> <Rich text={d.topics} />
                      </p>
                    )}
                    {d.exercises && (
                      <p>
                        <strong>Exercises completed:</strong> <Rich text={d.exercises} />
                      </p>
                    )}
                  </div>
                </SubItem>
              ))}
            </div>
          </>
        )}

        {(chapters.length > 0 || course.materials || course.materialsNote) && <Label>Materials</Label>}
        {course.chapters?.intro && <p className="mb-4 text-prussian-200">{course.chapters.intro}</p>}
        {chapters.length > 0 && (
          <div className="space-y-2">
            {chapters.map((c, i) => (
              <SubItem key={i} title={c.title}>
                <div className="flex flex-wrap gap-2">
                  {c.links.map((l) => (
                    <MaterialButton key={l.label} label={l.label} link={l.href} />
                  ))}
                </div>
              </SubItem>
            ))}
          </div>
        )}
        {course.materials && (
          <div className="flex flex-wrap gap-2">
            {course.materials.map((l) => (
              <MaterialButton key={l.label} label={l.label} link={l.href} />
            ))}
          </div>
        )}
        {course.materialsNote && <p className="text-prussian-300">{course.materialsNote}</p>}
      </div>
    </details>
  );
}

export default function TeachingPage() {
  const { consultation } = teaching;
  return (
    <>
      <PageHero title="Teaching" subtitle={teaching.academicYear} photo={site.backgrounds.teaching} />
      <PageBody>
        <Reveal as="section" className="mb-20">
          <SectionTitle title={consultation.title} />
          <p className="text-[1.05rem] text-prussian-200">{consultation.text}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {consultation.modes.map((m) => (
              <div key={m.label} className="surface px-6 py-5">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-glacier">{m.label}</p>
                <p className="mt-1.5 text-prussian-50">{m.value}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {teaching.groups.map((g) => (
          <Reveal as="section" key={g.title} className="mb-20">
            <SectionTitle title={g.title} />
            <div className="space-y-3">
              {g.courses
                .filter((c) => !c.hidden)
                .map((c) => (
                  <CourseCard key={c.title} course={c} />
                ))}
            </div>
          </Reveal>
        ))}

        <Reveal className="prose-site rounded-2xl border border-dashed border-prussian-500/40 px-6 py-5 text-center text-prussian-200">
          <Rich text={teaching.privateLessonsBanner} />
        </Reveal>
      </PageBody>
    </>
  );
}
