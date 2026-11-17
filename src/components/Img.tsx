import { image } from "@/lib/assets";
import type { ImgHTMLAttributes } from "react";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> & {
  src: string;
  alt: string;
  priority?: boolean;
};

/** <img> that serves the optimized WebP variants and reserves space to avoid layout shift. */
export function Img({ src, alt, priority, sizes = "(min-width: 1024px) 33vw, 100vw", ...rest }: Props) {
  const img = image(src);
  return (
    <img
      src={img.src}
      srcSet={img.srcSet}
      sizes={img.srcSet ? sizes : undefined}
      width={img.width}
      height={img.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      {...rest}
    />
  );
}
