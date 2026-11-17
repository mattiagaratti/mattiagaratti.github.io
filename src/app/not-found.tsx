import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80svh] place-items-center overflow-hidden px-6 text-center">
      <div aria-hidden className="lattice absolute inset-0" />
      <div className="relative">
        <p className="eyebrow">Error 404</p>
        <p className="title-serif mt-4 text-8xl sm:text-9xl">∄</p>
        <p className="mt-6 text-prussian-200">This page does not exist (yet). Maybe it is an open problem.</p>
        <Link href="/" className="btn btn-primary mt-8">
          Back home
        </Link>
      </div>
    </section>
  );
}
