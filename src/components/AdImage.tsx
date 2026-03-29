import { useEffect, useMemo, useState } from "react";

type AdImageProps = {
  src?: string;
  backupSrcs?: string[];
  alt: string;
  className?: string;
};

export function AdImage({ src, backupSrcs = [], alt, className = "" }: AdImageProps) {
  const candidates = useMemo(
    () => [src, ...backupSrcs].filter((value): value is string => Boolean(value)),
    [src, backupSrcs],
  );
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setIndex(0);
    setFailed(false);
  }, [src, backupSrcs]);

  const activeSrc = candidates[index];

  if (!activeSrc || failed) {
    return <div className={`${className} image-fallback`} aria-hidden="true" />;
  }

  return (
    <img
      src={activeSrc}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => {
        if (index < candidates.length - 1) {
          setIndex((current) => current + 1);
          return;
        }

        setFailed(true);
      }}
    />
  );
}
