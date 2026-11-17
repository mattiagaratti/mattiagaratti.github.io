"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

type NavItem = { label: string; href: string };

export function Header({ name, nav }: { name: string; nav: NavItem[] }) {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const links = nav.filter((n) => n.href !== "/");

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-full border pl-2 pr-2 transition-all duration-500 ease-out-expo sm:pl-3 ${
          scrolled || open
            ? "border-prussian-500/30 bg-prussian-900/75 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <Link href="/" className="flex shrink-0 items-center gap-2.5 rounded-full py-1 pr-3" aria-label={`${name} — home`}>
          <Logo className="h-9 w-9" />
          <span className="font-serif text-[1.05rem] tracking-tight text-prussian-50">{name}</span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active(item.href) ? "page" : undefined}
                  className={`block rounded-full px-3.5 py-2 text-[0.8125rem] transition-colors ${
                    active(item.href)
                      ? "bg-prussian-700 text-prussian-50"
                      : "text-prussian-200 hover:bg-prussian-800 hover:text-prussian-50"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative grid h-10 w-10 place-items-center rounded-full text-prussian-50 transition hover:bg-prussian-800 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className={`absolute h-px w-5 bg-current transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1"}`} />
          <span className={`absolute h-px w-5 bg-current transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1"}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-prussian-500/30 bg-prussian-900/95 backdrop-blur-xl transition-all duration-500 ease-out-expo lg:hidden ${
          open ? "max-h-[80vh] opacity-100" : "pointer-events-none max-h-0 border-transparent opacity-0"
        }`}
        aria-hidden={!open}
      >
        <ul className="p-2">
          {nav.map((item, i) => (
            <li
              key={item.href}
              className={`transition-all duration-500 ease-out-expo ${open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
              style={{ transitionDelay: open ? `${60 + i * 35}ms` : "0ms" }}
            >
              <Link
                href={item.href}
                tabIndex={open ? 0 : -1}
                aria-current={active(item.href) ? "page" : undefined}
                className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-serif text-xl transition-colors ${
                  active(item.href) ? "bg-prussian-700 text-prussian-50" : "text-prussian-100 hover:bg-prussian-800"
                }`}
              >
                {item.label}
                <span className="font-mono text-xs text-prussian-300">0{i + 1}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
