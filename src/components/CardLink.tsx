import Link from "next/link";
import type { ReactNode } from "react";
import { href, isExternal } from "@/lib/assets";

/** Whole-card link: internal pages use client navigation, files/sites open in a new tab. */
export function CardLink({ to, className = "", children }: { to: string; className?: string; children: ReactNode }) {
  if (to.startsWith("/") && !isExternal(to)) {
    return (
      <Link href={to} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href(to)} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
