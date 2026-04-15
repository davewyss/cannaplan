import { useEffect, useMemo } from "react";

const INSTALL_TRIGGERED_KEY = "cp_install_triggered_session";

function fireInstallTrigger() {
  window.dispatchEvent(new CustomEvent("cp:install-trigger"));
}

function hasTriggeredInSession(): boolean {
  return sessionStorage.getItem(INSTALL_TRIGGERED_KEY) === "1";
}

function markTriggeredInSession() {
  sessionStorage.setItem(INSTALL_TRIGGERED_KEY, "1");
}
import type { Ad, Article, Place, Recurso, TabKey } from "../types";
import { AdSidebar } from "../components/AdSidebar";
import { ArticleCard } from "../components/ArticleCard";
import { Button } from "../components/Button";
import { FeaturedStory } from "../components/FeaturedStory";
import { InicioTopBar } from "../components/InicioTopBar";
import { PlaceCard } from "../components/PlaceCard";
import { SectionTitle } from "../components/SectionTitle";
import { SpainMapPreview } from "../components/SpainMapPreview";

export function HomeScreen({
  featured,
  articles,
  ads,
  recursos,
  onOpenArticle,
  onOpenPlace,
  onGoToTab,
  onSearchClick,
}: {
  featured: Article;
  articles: Article[];
  ads: Ad[];
  recursos: Recurso[];
  onOpenArticle: (article: Article) => void;
  onOpenPlace: (place: Place) => void;
  onGoToTab: (tab: TabKey) => void;
  onSearchClick: () => void;
}) {
  useEffect(() => {
    function onScroll() {
      if (hasTriggeredInSession()) return;
      const scrolled = window.scrollY;
      const half = (document.documentElement.scrollHeight - window.innerHeight) * 0.5;
      if (scrolled >= half) {
        markTriggeredInSession();
        fireInstallTrigger();
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const secondaryArticles = useMemo(
    () =>
      articles
        .filter((article) => article.id !== featured.id)
        .sort((a, b) => b.isoDate.localeCompare(a.isoDate))
        .slice(0, 6),
    [articles, featured.id],
  );

  const recursoAsPlaces: Place[] = recursos.map((r) => ({
    id: r.id,
    slug: r.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || `recurso-${r.id}`,
    name: r.name,
    type: r.type,
    area: r.area,
    country: "",
    description: r.description,
    bio: "",
    address: r.address ?? "",
    address1: "", address2: "", city: "", province: "", postalCode: "",
    phone: undefined,
    email: undefined,
    hours: r.hours ?? "",
  }));

  return (
    <div className="grid-home">
      <InicioTopBar onSearchClick={onSearchClick} />
      <FeaturedStory article={featured} onOpen={(a) => { fireInstallTrigger(); onOpenArticle(a); }} />

      <section className="grid-2-main">
        <div className="cp-card">
          <div className="cp-card-inner">
            <SectionTitle eyebrow="Últimas noticias" title="" />
            <div className="card-list-grid">
              {secondaryArticles.map((article) => (
                <ArticleCard key={article.id} article={article} onOpen={(a) => { fireInstallTrigger(); onOpenArticle(a); }} />
              ))}
            </div>
          </div>
        </div>

        <div className="side-stack">
          <div className="cp-card">
            <div className="cp-card-inner">
              <SectionTitle eyebrow="Nuestros aliados" title="Guía Cannábica" body="Consulta fichas y explora por zona." />
              <SpainMapPreview onClick={() => onGoToTab("map")} />
              <Button onClick={() => onGoToTab("map")}>Ir a la guía</Button>
            </div>
          </div>
          <AdSidebar ads={ads} ubicacion="inicio" />
        </div>
      </section>

      {recursoAsPlaces.length > 0 && (
        <section className="section-stack">
          <SectionTitle eyebrow="Para ti" title="Recursos y asociaciones" />
          <div className="grid-places-3">
            {recursoAsPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} onOpen={onOpenPlace} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
