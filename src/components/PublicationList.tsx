"use client";

import { useEffect, useRef, useState } from "react";
import type { Publication } from "@/lib/content";
import { ArrowRight, Check, Close, Copy, External } from "./icons";

const LINK_LABELS: Record<string, string> = { pdf: "PDF", doi: "Publisher Site", arxiv: "arXiv", hal: "HAL" };
const LINK_ORDER = ["pdf", "doi", "arxiv", "hal"] as const;

function Authors({ authors, highlight }: { authors: string[]; highlight: string }) {
  return (
    <>
      {authors.map((a, i) => (
        <span key={a}>
          {i > 0 && ", "}
          {a === highlight ? <strong className="font-medium text-prussian-50">{a}</strong> : a}
        </span>
      ))}
    </>
  );
}

export function PublicationList({
  groups,
  highlight,
}: {
  groups: { year: number; items: Publication[] }[];
  highlight: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState<Publication | null>(null);
  const [copied, setCopied] = useState(false);

  const open = (p: Publication) => {
    setCurrent(p);
    setCopied(false);
    dialogRef.current?.showModal();
    history.replaceState(null, "", `#${p.id}`);
  };
  const close = () => {
    dialogRef.current?.close();
  };

  // open a publication directly from a shared link (#id)
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1));
    const p = groups.flatMap((g) => g.items).find((x) => x.id === id);
    if (p) open(p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copy = async () => {
    if (!current?.bibtex) return;
    await navigator.clipboard.writeText(current.bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const links = current ? LINK_ORDER.filter((k) => current.links?.[k]) : [];

  return (
    <>
      <div className="space-y-14">
        {groups.map(({ year, items }) => (
          <section key={year} className="grid gap-4 md:grid-cols-[7rem_1fr] md:gap-8">
            <h2 className="title-serif text-4xl text-prussian-300 md:sticky md:top-28 md:self-start">{year}</h2>
            <ul className="space-y-3">
              {items.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => open(p)}
                    className="surface surface-hover group flex w-full items-start gap-5 p-6 text-left sm:p-7"
                  >
                    <span className="flex-1">
                      <span className="eyebrow">{p.journal}</span>
                      <span className="title-serif mt-2 block text-2xl leading-snug">{p.title}</span>
                      <span className="mt-3 block text-[0.95rem] text-prussian-300">
                        <Authors authors={p.authors} highlight={highlight} />
                      </span>
                    </span>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-prussian-500/40 text-prussian-200 transition-all duration-300 group-hover:border-glacier group-hover:bg-glacier group-hover:text-prussian-900">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="modal p-0"
        onClose={() => history.replaceState(null, "", location.pathname)}
        onClick={(e) => e.target === dialogRef.current && close()}
        aria-labelledby="pub-title"
      >
        {current && (
          <div className="relative max-h-[inherit] overflow-y-auto p-6 sm:p-9">
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full text-prussian-200 transition hover:bg-prussian-700 hover:text-prussian-50"
            >
              <Close width={22} height={22} />
            </button>
            <p className="eyebrow">
              {current.journal} · {current.year}
            </p>
            <h2 id="pub-title" className="title-serif mt-3 pr-8 text-3xl leading-tight">
              {current.title}
            </h2>
            <p className="mt-4 text-prussian-200">
              <Authors authors={current.authors} highlight={highlight} />
            </p>

            {links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {links.map((k) => (
                  <a
                    key={k}
                    href={current.links![k]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn btn-sm ${k === "pdf" ? "btn-primary" : "btn-ghost"}`}
                  >
                    {LINK_LABELS[k]} <External className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            )}

            {current.abstract && (
              <>
                <h3 className="eyebrow mb-3 mt-9">Abstract</h3>
                <p className="leading-relaxed text-prussian-200">{current.abstract}</p>
              </>
            )}

            <h3 className="eyebrow mb-3 mt-9">Cite (BibTeX)</h3>
            <div className="relative">
              <pre className="overflow-x-auto rounded-xl border border-prussian-500/25 bg-prussian-950 p-4 pr-14 font-mono text-[0.78rem] leading-relaxed text-prussian-100">
                <code>{current.bibtex || "Not available"}</code>
              </pre>
              {current.bibtex && (
                <button
                  type="button"
                  onClick={copy}
                  className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-lg bg-prussian-800 text-prussian-200 transition hover:bg-prussian-700 hover:text-prussian-50"
                  aria-label="Copy BibTeX"
                  title="Copy BibTeX"
                >
                  {copied ? <Check className="text-glacier" /> : <Copy />}
                </button>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
