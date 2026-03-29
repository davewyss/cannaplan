import { useEffect, useMemo, useState } from "react";
import { getAds, getArticles, getFeaturedArticle } from "../contentApi";
import type { Ad, Article } from "../types";

type UseContentState = {
  articles: Article[];
  ads: Ad[];
  featured: Article | null;
  loading: boolean;
  error: string | null;
};

export function useContent(): UseContentState {
  const [articles, setArticles] = useState<Article[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const [articleData, adData] = await Promise.all([getArticles(), getAds()]);
        if (!active) return;
        setArticles(articleData);
        setAds(adData);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "No se pudo cargar el contenido.");
      } finally {
        if (active) setLoading(false);
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, []);

  const featured = useMemo(() => {
    if (!articles.length) return null;
    return getFeaturedArticle(articles);
  }, [articles]);

  return { articles, ads, featured, loading, error };
}
