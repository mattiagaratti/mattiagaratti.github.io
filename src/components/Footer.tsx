import Link from "next/link";
import { site } from "@/lib/content";
import { href } from "@/lib/assets";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-prussian-500/20 bg-prussian-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <Logo className="h-10 w-10" />
            <span className="font-serif text-xl text-prussian-50">{site.name}</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-prussian-300">
            {site.role} at the Laboratoire de mathématiques d&apos;Orsay, Université Paris-Saclay.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-4">Pages</p>
          <ul className="space-y-2 text-sm">
            {site.nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-prussian-200 transition-colors hover:text-prussian-50">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Contact</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`mailto:${site.contact.email}`} className="break-all text-prussian-200 transition-colors hover:text-prussian-50">
                {site.contact.email}
              </a>
            </li>
            <li>
              <a href={site.contact.phone.href} className="text-prussian-200 transition-colors hover:text-prussian-50">
                {site.contact.phone.label}
              </a>
            </li>
            {site.socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-prussian-200 transition-colors hover:text-prussian-50"
                >
                  <img src={href(s.icon)} alt="" className="h-4 w-4 rounded-full" />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-prussian-500/15">
        <p className="mx-auto max-w-6xl px-5 py-6 font-mono text-xs text-prussian-300 sm:px-8">
          © {site.name} · All rights reserved
        </p>
      </div>
    </footer>
  );
}
