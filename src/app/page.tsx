import Link from "next/link";
import { home, news, site, formatDate } from "@/lib/content";
import { image } from "@/lib/assets";
import { Rich } from "@/lib/markup";
import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";
import { NewsList } from "@/components/NewsList";
import { MGlyph } from "@/components/Logo";
import { SectionTitle } from "@/components/PageHero";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from "@/components/icons";

const d = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

export default function HomePage() {
  const newsItems = news.map((n) => (
    <article className="group grid gap-3 border-t border-prussian-500/20 py-7 md:grid-cols-[10rem_1fr] md:gap-8">
      <p className="font-mono text-xs leading-6 text-prussian-300">
        <time dateTime={n.date}>{formatDate(n.date)}</time>
        {n.end && n.end !== n.date && (
          <>
            <span className="text-prussian-400"> → </span>
            <br className="hidden md:block" />
            <time dateTime={n.end}>{formatDate(n.end)}</time>
          </>
        )}
      </p>
      <div className="flex flex-col-reverse gap-5 sm:flex-row sm:items-start">
        <p className="prose-site flex-1 text-[1.02rem] leading-relaxed text-prussian-100">
          <Rich text={n.text} />
        </p>
        {n.image && (
          <div className="aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl bg-prussian-800 ring-1 ring-prussian-500/25 sm:w-44">
            <Img
              src={n.image}
              alt={n.alt ?? ""}
              sizes="(min-width: 640px) 176px, 100vw"
              className={`h-full w-full transition-transform duration-700 ease-out-expo group-hover:scale-105 ${
                n.image.endsWith(".svg") ? "object-contain p-7" : "object-cover"
              }`}
            />
          </div>
        )}
      </div>
    </article>
  ));

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25"
            style={{
              backgroundImage: `url("${image(site.backgrounds.home).src}")`,
              maskImage: "linear-gradient(to bottom, #000 20%, transparent 95%)",
            }}
          />
          <div className="absolute inset-0 bg-prussian-700/40 mix-blend-color" />
          <div className="lattice absolute inset-0" />
          <div className="absolute -left-40 top-1/3 h-[34rem] w-[34rem] rounded-full bg-prussian-600/40 blur-[120px]" />
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-prussian-900 to-transparent" />
        </div>

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col px-5 pb-8 pt-32 sm:px-8 md:pt-28">
          <div className="grid flex-1 items-center gap-14 md:grid-cols-[1.5fr_1fr] md:gap-16">
            <div>
              <h1 className="title-serif animate-rise text-[clamp(3.4rem,10vw,7rem)] leading-[0.92]" style={d(80)}>
                Mattia
                <br />
                <span className="italic text-glacier">Garatti</span>
              </h1>
              <p className="animate-rise mt-8 max-w-lg text-xl leading-relaxed text-prussian-100" style={d(160)}>
                {home.heroIntro}
              </p>
              <p className="prose-site animate-rise mt-4 max-w-lg text-[0.95rem] text-prussian-300" style={d(220)}>
                {site.role} · <Rich text={site.affiliation} />
              </p>
              <div className="animate-rise mt-9 flex flex-wrap gap-3" style={d(280)}>
                <Link href="/cv" className="btn btn-primary">
                  Curriculum Vitae <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/publications" className="btn btn-ghost">
                  Publications
                </Link>
                <a href="#contact" className="btn btn-ghost">
                  Get in touch
                </a>
              </div>
            </div>

            <div className="animate-rise relative mx-auto w-full max-w-[17rem] md:mr-0 md:max-w-[19rem]" style={d(200)}>
              {/* the M of the logo, engraved large behind the portrait (fully visible, not cropped) */}
              <MGlyph className="pointer-events-none absolute left-1/2 top-1/2 hidden w-[165%] -translate-x-[60%] -translate-y-1/2 text-prussian-500/45 lg:block" />
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-prussian-500/30 via-transparent to-glacier/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-prussian-400/30">
                <Img
                  src={home.photo}
                  alt={site.name}
                  priority
                  sizes="(min-width: 768px) 304px, 272px"
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-prussian-900/70 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          {/* latest news teaser */}
          {news[0] && (
            <a
              href="#news"
              className="animate-rise group mt-16 flex items-center gap-4 border-t border-prussian-500/25 pt-5 text-sm"
              style={d(420)}
            >
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-glacier">Latest</span>
              <span className="hidden font-mono text-xs text-prussian-300 sm:inline">{formatDate(news[0].date)}</span>
              <span className="min-w-0 flex-1 truncate text-prussian-100">
                <Rich text={news[0].text} plain />
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 rotate-90 text-prussian-300 transition-transform group-hover:translate-y-0.5 group-hover:text-glacier" />
            </a>
          )}
        </div>
      </section>

      {/* ---------- About ---------- */}
      <section id="about" className="relative">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-[1fr_1.7fr] md:gap-16 md:py-28">
          <Reveal className="md:sticky md:top-28 md:self-start">
            <SectionTitle title={home.aboutTitle} />
          </Reveal>
          <div>
            <Reveal className="prose-site text-[1.075rem] leading-[1.8] text-prussian-200">
              {home.about.map((p, i) => (
                <p key={i}>
                  <Rich text={p} />
                </p>
              ))}
            </Reveal>
            <Reveal className="mt-12 grid gap-3 sm:grid-cols-2">
              {home.affiliations.map((a) => (
                <a
                  key={a.name}
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface surface-hover group flex items-start justify-between gap-4 p-5"
                >
                  <span>
                    <span className="block font-medium leading-snug text-prussian-50">{a.name}</span>
                    <span className="mt-1 block text-sm text-prussian-300">{a.detail}</span>
                  </span>
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-prussian-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-glacier" />
                </a>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- News ---------- */}
      <section id="news" className="relative border-t border-prussian-500/20 bg-prussian-850/50">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
          <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <SectionTitle title={home.newsTitleExpanded} className="!mb-0" />
          </Reveal>
          <Reveal>
            <NewsList items={newsItems} initial={home.newsInitiallyVisible} />
          </Reveal>
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section id="contact" className="relative overflow-hidden border-t border-prussian-500/20">
        <div aria-hidden className="lattice absolute inset-0 opacity-70" />
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
          <Reveal className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-end">
            <div>
              <h2 className="title-serif text-5xl leading-none sm:text-6xl">
                Get in <span className="italic text-glacier">touch</span>
              </h2>
              <p className="mt-6 max-w-sm text-prussian-200">
                Questions about research, teaching or collaborations: write me an email or drop by my office.
              </p>
            </div>
            <ul className="divide-y divide-prussian-500/20 border-y border-prussian-500/20">
              <li>
                <a href={`mailto:${site.contact.email}`} className="group flex items-center gap-4 py-5">
                  <Mail className="h-5 w-5 shrink-0 text-glacier" />
                  <span className="flex-1 break-all text-prussian-50">{site.contact.email}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-prussian-300 transition group-hover:text-glacier" />
                </a>
              </li>
              <li>
                <a href={site.contact.phone.href} className="group flex items-center gap-4 py-5">
                  <Phone className="h-5 w-5 shrink-0 text-glacier" />
                  <span className="flex-1 text-prussian-50">{site.contact.phone.label}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-prussian-300 transition group-hover:text-glacier" />
                </a>
              </li>
              <li>
                <a
                  href={site.contact.office.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 py-5"
                >
                  <MapPin className="h-5 w-5 shrink-0 text-glacier" />
                  <span className="flex-1 text-prussian-50">
                    {site.contact.office.lines[0]}
                    <span className="block text-sm text-prussian-300">{site.contact.office.lines.slice(1).join(" · ")}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-prussian-300 transition group-hover:text-glacier" />
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
