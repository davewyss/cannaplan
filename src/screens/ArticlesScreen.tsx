import { AdSidebar } from "../components/AdSidebar";
import { ArticleCard } from "../components/ArticleCard";
import { ArticlesTopBar } from "../components/ArticlesTopBar";
import { FeaturedStory } from "../components/FeaturedStory";
import type { Ad, Article } from "../types";

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
  const featured = articles[0];

  return (
    <div className="screen-grid">
      <ArticlesTopBar onSearchClick={onSearchClick} />

      {featured ? <FeaturedStory article={featured} onOpen={onOpenArticle} /> : null}

      <section className="articles-layout">
        <div className="card-list-grid">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} onOpen={onOpenArticle} />
          ))}
        </div>
        <aside>
          <AdSidebar ads={ads} ubicacion="articulos" className="articles-sidebar-ads" />
        </aside>
      </section>
    </div>
  );
}
