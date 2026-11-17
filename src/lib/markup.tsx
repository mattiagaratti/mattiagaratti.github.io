import { Fragment, type ReactNode } from "react";
import NextLink from "next/link";
import { href, isExternal } from "./assets";

// Tiny, safe inline markup for JSON text fields:
//   [text](url)   **bold**   *italic*
// Links to other sites / PDFs automatically open in a new tab.
const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*(.+?)\*\*|\*(.+?)\*/g;

function parse(text: string, keyPrefix = ""): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(TOKEN)) {
    if (m.index! > last) out.push(text.slice(last, m.index));
    const key = `${keyPrefix}${i++}`;
    if (m[1] !== undefined) {
      const url = m[2];
      const children = parse(m[1], key + "-");
      out.push(
        isExternal(url) || !url.startsWith("/") ? (
          <a key={key} href={href(url)} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ) : (
          <NextLink key={key} href={url}>
            {children}
          </NextLink>
        ),
      );
    } else if (m[3] !== undefined) {
      out.push(<strong key={key}>{parse(m[3], key + "-")}</strong>);
    } else if (m[4] !== undefined) {
      out.push(<em key={key}>{parse(m[4], key + "-")}</em>);
    }
    last = m.index! + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Rich({ text }: { text: string }) {
  return <Fragment>{parse(text)}</Fragment>;
}
