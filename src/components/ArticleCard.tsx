import { memo } from "react";
import type { Article } from "../types";
import { ResponsiveImage } from "./ResponsiveImage";
import { TagPills } from "./TagPills";

function ArticleCardComponent({ article, onOpen }: { article: Article; onOpen: (article: Article) => void }) {
  return (
    <button className="article-card-row" onClick={() => onOpen(article)}>
      <ResponsiveImage
        src={article.imageUrl}
        alt={article.title}
        className="article-card-thumb"
        width={260}
        height={260}
      />
      <div className="article-card-content">
        <div className="article-card-meta">
          <TagPills tags={article.tags} />
          <span className="meta">{article.readTime}</span>
        </div>
        <h3 className="article-card-title">{article.title}</h3>
        <p className="article-card-excerpt">{article.excerpt}</p>
      </div>
    </button>
  );
}

export const ArticleCard = memo(ArticleCardComponent);
