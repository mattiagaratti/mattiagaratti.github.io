import type { ReactNode } from "react";
import { image } from "@/lib/assets";

/**
 * Header of inner pages: big serif title on the left, the page photo
 * (the same backgrounds as the old site) melting into the Prussian blue on the right.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  photo,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  photo?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-prussian-500/20">
      {photo && (
        <div aria-hidden className="absolute inset-y-0 right-0 w-full md:w-[62%]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-55 md:opacity-80"
            style={{
              backgroundImage: `url("${image(photo).src}")`,
              maskImage: "linear-gradient(to right, transparent, #000 55%), linear-gradient(to top, transparent, #000 40%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          />
          <div className="absolute inset-0 bg-prussian-700/35 mix-blend-color" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-prussian-900 via-prussian-900/85 to-transparent md:via-prussian-900/60" />
      <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-36 sm:px-8 sm:pb-20 sm:pt-44">
        {eyebrow && <p className="eyebrow animate-rise">{eyebrow}</p>}
        <h1
          className="title-serif animate-rise mt-4 max-w-3xl text-5xl leading-[1.02] sm:text-6xl md:text-7xl"
          style={{ "--delay": "80ms" } as React.CSSProperties}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-prussian-200"
            style={{ "--delay": "160ms" } as React.CSSProperties}
          >
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

/** Content container for inner pages. */
export function PageBody({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return <div className={`mx-auto px-5 py-16 sm:px-8 sm:py-24 ${wide ? "max-w-6xl" : "max-w-4xl"}`}>{children}</div>;
}

/** Section title: mono eyebrow + serif heading. */
export function SectionTitle({ eyebrow, title, className = "" }: { eyebrow?: string; title: string; className?: string }) {
  return (
    <div className={`mb-8 ${className}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="title-serif text-3xl leading-tight sm:text-4xl">{title}</h2>
    </div>
  );
}
