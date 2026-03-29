import type { Ad, Article } from "../types";
import { AdSidebar } from "../components/AdSidebar";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { TagPills } from "../components/TagPills";

export default function ArticleDetailScreen({ article, ads }: { article: Article; ads: Ad[] }) {
  return (
    <div className="article-detail-stack">
      <article className="cp-card article-detail-card">
        <ResponsiveImage
          src={article.imageUrl}
          alt={article.title}
          className="article-detail-image"
          width={1200}
          height={640}
          eager
        />
        {article.imageCredit ? (
          <div className="image-credit-row">
            {article.imageCreditUrl ? (
              <a href={article.imageCreditUrl} target="_blank" rel="noopener noreferrer" className="image-credit">
                {article.imageCredit}
              </a>
            ) : (
              <span className="image-credit">{article.imageCredit}</span>
            )}
          </div>
        ) : null}
        <div className="article-detail-body">
          <div className="row wrap gap-sm article-meta-row">
            <TagPills tags={article.tags} />
            <span className="meta">{article.date}</span>
            <span className="meta">{article.readTime}</span>
          </div>
          <h1 className="article-detail-title">{article.title}</h1>
          <p className="article-detail-text">{article.body}</p>
        </div>
      </article>
      <AdSidebar
        ads={ads}
        ubicacion="articulo"
        limit={1}
        className="article-detail-ad-section"
        cardClassName="article-detail-ad-card"
        imageClassName="article-detail-ad-image"
      />
    </div>
  );
}
