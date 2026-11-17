import { Fragment, type ReactNode } from "react";
import NextLink from "next/link";
import katex from "katex";
import { href, isExternal } from "./assets";

// Tiny, safe inline markup for JSON text fields:
//   [text](url)   **bold**   *italic*   $inline math$   $$display math$$
// Links to other sites / PDFs automatically open in a new tab.
// Math is rendered to HTML with KaTeX at build time (no script in the browser).
const TOKEN = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$|\[([^\]]+)\]\(([^)\s]+)\)|\*\*(.+?)\*\*|\*(.+?)\*/g;

function math(tex: string, display: boolean, key: string) {
  const html = katex.renderToString(tex.trim(), { displayMode: display, throwOnError: false, output: "html" });
  return display ? (
    <span key={key} className="math-display" dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <span key={key} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

function parse(text: string, keyPrefix = "", plain = false): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(TOKEN)) {
    if (m.index! > last) out.push(text.slice(last, m.index));
    const key = `${keyPrefix}${i++}`;
    if (m[1] !== undefined) {
      out.push(math(m[1], true, key));
    } else if (m[2] !== undefined) {
      out.push(math(m[2], false, key));
    } else if (m[3] !== undefined) {
      const url = m[4];
      const children = parse(m[3], key + "-", plain);
      out.push(
        plain ? (
          <Fragment key={key}>{children}</Fragment>
        ) : isExternal(url) || !url.startsWith("/") ? (
          <a key={key} href={href(url)} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ) : (
          <NextLink key={key} href={url}>
            {children}
          </NextLink>
        ),
      );
    } else if (m[5] !== undefined) {
      out.push(<strong key={key}>{parse(m[5], key + "-", plain)}</strong>);
    } else if (m[6] !== undefined) {
      out.push(<em key={key}>{parse(m[6], key + "-", plain)}</em>);
    }
    last = m.index! + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/**
 * Renders a JSON text field. Lists are joined with line breaks.
 * Use `plain` inside elements that are already links (links become plain text).
 */
export function Rich({ text, plain = false }: { text: string | string[] | undefined | null; plain?: boolean }) {
  if (text == null) return null;
  if (Array.isArray(text))
    return (
      <Fragment>
        {text.map((t, i) => (
          <span key={i} className="block">
            {parse(String(t), `${i}-`, plain)}
          </span>
        ))}
      </Fragment>
    );
  return <Fragment>{parse(String(text), "", plain)}</Fragment>;
}
