import { ChevronRight } from "lucide-react";
import type { Article } from "../types";
import { ResponsiveImage } from "./ResponsiveImage";
import { TagPills } from "./TagPills";

export function FeaturedStory({ article, onOpen }: { article: Article; onOpen: (article: Article) => void }) {
  return (
    <div
      className="cp-card featured-card"
      onClick={() => onOpen(article)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onOpen(article);
      }}
    >
      <ResponsiveImage
        src={article.imageUrl}
        alt={article.title}
        className="featured-image"
        width={1200}
        height={640}
        eager
      />
      <div className="featured-body">
        <div className="eyebrow">Artículo destacado</div>
        <h1>{article.title}</h1>
        <p>{article.excerpt}</p>
        <div className="featured-meta">
          <div className="featured-meta-left">
            <TagPills tags={article.tags} />
            <span className="meta">
              {article.date} · {article.readTime}
            </span>
          </div>
          <span className="featured-read-link">
            Leer artículo <ChevronRight size={15} />
          </span>
        </div>
      </div>
    </div>
  );
}
