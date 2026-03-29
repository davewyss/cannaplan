import { useState } from "react";

type Props = {
  src?: string;
  alt: string;
  className: string;
  width?: number;
  height?: number;
  eager?: boolean;
};

export function ResponsiveImage({ src, alt, className, width, height, eager = false }: Props) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <div className={`${className} image-fallback`} aria-hidden="true" />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
