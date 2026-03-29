import { AdImage } from "./AdImage";
import type { Ad } from "../types";

type AdSidebarProps = {
  ads: Ad[];
  ubicacion?: string;
  limit?: number;
  className?: string;
  cardClassName?: string;
  imageClassName?: string;
};

function normalizePlacement(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

function matchesPlacement(ad: Ad, placement?: string): boolean {
  if (!placement) return true;

  const target = normalizePlacement(placement);
  const values = [
    ...(ad.ubicaciones ?? []),
    ...(ad.ubicacion ? [ad.ubicacion] : []),
  ]
    .map((value) => normalizePlacement(value))
    .filter(Boolean);

  if (!values.length) return false;

  return values.some((value) =>
    value === target ||
    value === "all" ||
    value === "todos" ||
    value === "cualquiera" ||
    value === "global",
  );
}

export function AdSidebar({
  ads,
  ubicacion,
  limit,
  className,
  cardClassName,
  imageClassName,
}: AdSidebarProps) {
  const matched = (ubicacion ? ads.filter((ad) => matchesPlacement(ad, ubicacion)) : ads).filter(
    (ad) => ad.imageUrl,
  );
  const visibleAds = typeof limit === "number" ? matched.slice(0, limit) : matched;

  if (!visibleAds.length) return null;

  return (
    <section className={["ad-sidebar", className].filter(Boolean).join(" ")}>
      {visibleAds.map((ad) => {
        const content = (
          <>
            <div className="ad-label">ANUNCIO</div>
            <div className="ad-image-wrap">
              <AdImage
                src={ad.imageUrl}
                backupSrcs={ad.backupImageUrls}
                alt={ad.alt ?? ad.title ?? "Anuncio"}
                className={["ad-image", imageClassName].filter(Boolean).join(" ")}
              />
            </div>
          </>
        );

        return ad.linkUrl ? (
          <a
            key={ad.id}
            href={ad.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={["ad-card", cardClassName].filter(Boolean).join(" ")}
            aria-label={ad.title ?? "Anuncio"}
          >
            {content}
          </a>
        ) : (
          <div
            key={ad.id}
            className={["ad-card", cardClassName].filter(Boolean).join(" ")}
            role="img"
            aria-label={ad.title ?? "Anuncio"}
          >
            {content}
          </div>
        );
      })}
    </section>
  );
}
