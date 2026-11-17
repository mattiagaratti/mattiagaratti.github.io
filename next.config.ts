import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export: the whole site becomes plain files in `out/`,
  // deployable for free on GitHub Pages, Vercel, Netlify, Cloudflare Pages…
  output: "export",
  // /cv -> out/cv.html, so old links like /cv.html keep working on GitHub Pages
  trailingSlash: false,
  images: { unoptimized: true },
};

export default nextConfig;
