import { ArrowLeft, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArticleCard } from "../components/ArticleCard";
import { matchesArticleSearch } from "../lib/search";
import type { Article } from "../types";

export default function SearchScreen({
  articles,
  onOpenArticle,
  onBack,
}: {
  articles: Article[];
  onOpenArticle: (article: Article) => void;
  onBack: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => articles.filter((article) => matchesArticleSearch(article, query)), [articles, query]);

  return (
    <div className="screen-grid">
      <div className="search-screen-bar">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={18} />
        </button>
        <div className="search-screen-input-wrap">
          <Search size={16} color="var(--cp-brand)" />
          <input
            ref={inputRef}
            className="search-screen-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar artículos…"
          />
          {query ? (
            <button
              className="search-clear-btn"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
            >
              ✕
            </button>
          ) : null}
        </div>
      </div>

      {!query ? (
        <div className="search-hint">Escribe para buscar entre todos los artículos.</div>
      ) : results.length === 0 ? (
        <div className="empty-search-state">No hay resultados para “{query}”.</div>
      ) : (
        <div className="screen-grid-sm">
          <div className="eyebrow">
            {results.length} resultado{results.length !== 1 ? "s" : ""}
          </div>
          {results.map((article) => (
            <ArticleCard key={article.id} article={article} onOpen={onOpenArticle} />
          ))}
        </div>
      )}
    </div>
  );
}
