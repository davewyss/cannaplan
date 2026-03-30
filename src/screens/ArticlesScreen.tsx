import { AdImage } from "../components/AdImage";
import { AdSidebar } from "../components/AdSidebar";
import { ArticleCard } from "../components/ArticleCard";
import { ArticlesTopBar } from "../components/ArticlesTopBar";
import type { Ad, Article } from "../types";

const CHUNK_SIZE = 8;

function normalizePlacement(v: string) {
  return v.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
}

function getInlineAds(ads: Ad[], placement: string): Ad[] {
  const target = normalizePlacement(placement);
  return ads.filter((ad) => {
    if (!ad.imageUrl) return false;
    const vals = [
      ...(ad.ubicaciones ?? []),
      ...(ad.ubicacion ? [ad.ubicacion] : []),
    ].map(normalizePlacement);
    return vals.some((v) => v === target || v === "all" || v === "todos" || v === "global");
  });
}

export default function ArticlesScreen({
  articles,
  ads,
  onOpenArticle,
  onSearchClick,
}: {
  articles: Article[];
  ads: Ad[];
  onOpenArticle: (article: Article) => void;
  onSearchClick: () => void;
}) {
  const inlineAds = getInlineAds(ads, "articulos");

  // Sort articles by date, most recent first
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  type Item =
    | { type: "article"; article: Article }
    | { type: "ad"; ad: Ad; key: string };

  const items: Item[] = [];
  sortedArticles.forEach((article, i) => {
    items.push({ type: "article", article });
    if ((i + 1) % CHUNK_SIZE === 0 && inlineAds.length > 0) {
      const ad = inlineAds[Math.floor((i + 1) / CHUNK_SIZE - 1) % inlineAds.length];
      items.push({ type: "ad", ad, key: `inline-ad-${i}` });
    }
  });

  // Always end with an ad, even if fewer than CHUNK_SIZE articles
  if (inlineAds.length > 0 && items.length > 0 && items[items.length - 1].type !== "ad") {
    const adIndex = Math.floor(sortedArticles.length / CHUNK_SIZE) % inlineAds.length;
    items.push({ type: "ad", ad: inlineAds[adIndex], key: "inline-ad-end" });
  }

  return (
    <div className="screen-grid">
      <ArticlesTopBar onSearchClick={onSearchClick} />

      <section className="articles-layout">
        <div className="card-list-grid">
          {items.map((item) => {
            if (item.type === "article") {
              return (
                <ArticleCard
                  key={item.article.id}
                  article={item.article}
                  onOpen={onOpenArticle}
                />
              );
            }

            const { ad } = item;
            const inner = (
              <div className="articles-inline-ad">
                <div className="ad-label">ANUNCIO</div>
                <div className="ad-image-wrap">
                  <AdImage
                    src={ad.imageUrl}
                    backupSrcs={ad.backupImageUrls}
                    alt={ad.alt ?? ad.title ?? "Anuncio"}
                    className="ad-image articles-inline-ad-image"
                  />
                </div>
              </div>
            );

            return ad.linkUrl ? (
              <a
                key={item.key}
                href={ad.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="articles-inline-ad-wrap"
                aria-label={ad.title ?? "Anuncio"}
              >
                {inner}
              </a>
            ) : (
              <div key={item.key} className="articles-inline-ad-wrap">
                {inner}
              </div>
            );
          })}
        </div>

        <aside className="articles-sidebar">
          <AdSidebar ads={ads} ubicacion="articulos" className="articles-sidebar-ads" />
        </aside>
      </section>
    </div>
  );
}
