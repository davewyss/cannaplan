import { MapPin } from "lucide-react";
import { useMemo } from "react";
import { mapPlaces } from "../data/places";
import type { Ad, Article, Place, TabKey } from "../types";
import { AdSidebar } from "../components/AdSidebar";
import { ArticleCard } from "../components/ArticleCard";
import { Button } from "../components/Button";
import { FeaturedStory } from "../components/FeaturedStory";
import { InicioTopBar } from "../components/InicioTopBar";
import { PlaceCard } from "../components/PlaceCard";
import { SectionTitle } from "../components/SectionTitle";

export function HomeScreen({
  featured,
  articles,
  ads,
  onOpenArticle,
  onOpenPlace,
  onGoToTab,
  onSearchClick,
}: {
  featured: Article;
  articles: Article[];
  ads: Ad[];
  onOpenArticle: (article: Article) => void;
  onOpenPlace: (place: Place) => void;
  onGoToTab: (tab: TabKey) => void;
  onSearchClick: () => void;
}) {
  const secondaryArticles = useMemo(
    () =>
      articles
        .filter((article) => article.id !== featured.id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 6),
    [articles, featured.id],
  );

  return (
    <div className="grid-home">
      <InicioTopBar onSearchClick={onSearchClick} />
      <FeaturedStory article={featured} onOpen={onOpenArticle} />

      <section className="grid-2-main">
        <div className="cp-card">
          <div className="cp-card-inner">
            <SectionTitle eyebrow="Últimas noticias" title="" />
            <div className="card-list-grid">
              {secondaryArticles.map((article) => (
                <ArticleCard key={article.id} article={article} onOpen={onOpenArticle} />
              ))}
            </div>
          </div>
        </div>

        <div className="side-stack">
          <div className="cp-card">
            <div className="cp-card-inner">
              <SectionTitle eyebrow="Nuestros aliados" title="Guía Cannábica" body="Consulta fichas y explora por zona." />
              <div className="surface-box">
                <div className="surface-box-inner">
                  <MapPin size={34} color="var(--cp-brand)" />
                  <p>Un directorio limpio y orientado a consulta rápida.</p>
                </div>
              </div>
              <Button onClick={() => onGoToTab("map")}>Ir a la guía</Button>
            </div>
          </div>
          <AdSidebar ads={ads} ubicacion="inicio" />
        </div>
      </section>

      <section className="section-stack">
        <SectionTitle eyebrow="Para ti" title="Recursos y asociaciones" />
        <div className="grid-places-3">
          {mapPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} onOpen={onOpenPlace} />
          ))}
        </div>
      </section>
    </div>
  );
}
