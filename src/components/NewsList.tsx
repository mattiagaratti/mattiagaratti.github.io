"use client";

import { useRef, useState, type ReactNode } from "react";

/** Timeline of news: first `initial` items visible, the rest behind a toggle. Items are server-rendered. */
export function NewsList({ items, initial }: { items: ReactNode[]; initial: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hidden = items.length - initial;

  return (
    <div ref={ref}>
      <ol className="relative">
        {items.map((item, i) => (
          <li
            key={i}
            className={i < initial ? "" : expanded ? "animate-rise" : "hidden"}
            style={i >= initial ? ({ "--delay": `${(i - initial) * 50}ms` } as React.CSSProperties) : undefined}
          >
            {item}
          </li>
        ))}
      </ol>
      {hidden > 0 && (
        <div className="mt-8 flex justify-center md:justify-start md:pl-[11.5rem]">
          <button
            type="button"
            className="btn btn-ghost"
            aria-expanded={expanded}
            onClick={() => {
              if (expanded) ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              setExpanded((v) => !v);
            }}
          >
            {expanded ? "Show less" : `Show all news (${items.length})`}
          </button>
        </div>
      )}
    </div>
  );
}
