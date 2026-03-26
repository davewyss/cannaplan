
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Newspaper,
  ChevronRight,
  ArrowLeft,
  Heart,
  Filter,
  ExternalLink,
  Send,
  Scale,
  Info,
  Gift,
  Menu as MenuIcon,
} from "lucide-react";
import "./styles.css";
import { Article, getArticles, getFeaturedArticle } from "./contentApi";

type TabKey = "home" | "articles" | "map" | "menu";
type ScreenKey = "home" | "articles" | "map" | "menu" | "article-detail" | "place-detail" | "contact" | "about" | "donate" | "legal-help" | "news";

type Place = {
  id: number;
  name: string;
  type: string;
  area: string;
  description: string;
  address: string;
  hours: string;
};

const categories = ["Educación", "Noticias", "Recursos", "Asociaciones", "Salud"];

const mapPlaces: Place[] = [
  { id: 1, name: "Asociación Centro", type: "Asociación", area: "Madrid Centro", description: "Espacio informativo y comunitario con enfoque responsable.", address: "Centro, Madrid", hours: "L–V · 10:00–19:00" },
  { id: 2, name: "Recurso Retiro", type: "Recurso", area: "Retiro", description: "Punto de referencia con información práctica y actualizada.", address: "Retiro, Madrid", hours: "L–S · 11:00–20:00" },
  { id: 3, name: "Guía Chamberí", type: "Educación", area: "Chamberí", description: "Contenido útil y orientación pensada para el día a día.", address: "Chamberí, Madrid", hours: "Cita previa" },
];

function Badge({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <span className={`cp-badge ${dark ? "dark" : ""}`}>{children}</span>;
}

function Button({ children, onClick, primary = false }: { children: React.ReactNode; onClick?: () => void; primary?: boolean }) {
  return <button onClick={onClick} className={`cp-button ${primary ? "primary" : ""}`}>{children}</button>;
}

function SectionTitle({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return <div className="section-title"><div className="eyebrow">{eyebrow}</div><h2>{title}</h2>{body ? <p>{body}</p> : null}</div>;
}

function InicioTopBar({
  searchValue = "",
  onSearchChange,
  onSearchToggle,
  searchOpen = false,
}: {
  searchValue?: string;
  onSearchChange?: (v: string) => void;
  onSearchToggle?: () => void;
  searchOpen?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [searchOpen]);

  return (
    <header className="inicio-topbar">
      <div className="inicio-topbar-left">
        <img src="/cannaplan-logo.png" alt="Cannaplan logo" className="inicio-topbar-logo" />
        <div>
          <div className="inicio-topbar-title">Cannaplan</div>
          <div className="inicio-topbar-tagline">Información y defensa del cannabis en España.</div>
        </div>
      </div>
      <div className="inicio-topbar-right">
        <div className={`inicio-topbar-search-input-wrap${searchOpen ? " open" : ""}`}>
          <Search size={14} color="var(--cp-text)" />
          <input
            ref={inputRef}
            className="inicio-topbar-search-input"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Buscar…"
          />
        </div>
        <button type="button" className="inicio-topbar-search" aria-label="Buscar" onClick={onSearchToggle}>
          <Search size={20} />
        </button>
      </div>
    </header>
  );
}



function matchesArticleSearch(article: Article, query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  return [
    article.title,
    article.excerpt,
    article.body,
    article.category,
    article.author,
    article.date,
  ]
    .join(" ")
    .toLowerCase()
    .includes(normalized);
}

function ArticleCard({ article, onOpen, compact = false }: { article: Article; onOpen: (article: Article) => void; compact?: boolean }) {
  return (
    <div className="cp-card article-card-shell">
      {article.imageUrl ? (
        <img src={article.imageUrl} alt={article.title} className={`article-card-image ${compact ? "compact" : ""}`} />
      ) : (
        <div className={`article-card-image article-card-image-fallback ${compact ? "compact" : ""}`} />
      )}
      <div className={`cp-card-inner ${compact ? "compact" : ""}`}>
        <div className="row between top-gap"><Badge>{article.category}</Badge><span className="meta">{article.readTime}</span></div>
        <div className="stack-sm">
          <h3 style={{ margin: 0, color: "var(--cp-navy)", fontWeight: 700, fontSize: compact ? 24 : 30, lineHeight: 1.12 }}>{article.title}</h3>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.8 }}>{article.excerpt}</p>
        </div>
        <button className="text-button" onClick={() => onOpen(article)}>Leer artículo <ChevronRight size={16} /></button>
      </div>
    </div>
  );
}

function PlaceCard({ place, onOpen }: { place: Place; onOpen: (place: Place) => void }) {
  return (
    <div className="cp-card">
      <div className="cp-card-inner place-row">
        <div className="stack-sm flex-1">
          <div className="row wrap gap-sm"><Badge dark>{place.type}</Badge><span className="meta">{place.area}</span></div>
          <h3 style={{ margin: 0, color: "var(--cp-navy)", fontWeight: 700, fontSize: 24 }}>{place.name}</h3>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8 }}>{place.description}</p>
          <button className="text-button" onClick={() => onOpen(place)}>Ver recurso <ChevronRight size={16} /></button>
        </div>
        <button className="icon-ghost"><Heart size={18} /></button>
      </div>
    </div>
  );
}

function FeaturedStory({ article, onOpen }: { article: Article; onOpen: (article: Article) => void }) {
  return (
    <div className="cp-card" style={{ overflow: "hidden" }}>
      {article.imageUrl ? (
        <img src={article.imageUrl} alt={article.title} className="featured-image" />
      ) : (
        <div className="featured-image featured-image-fallback" />
      )}
      <div className="featured-body">
        <div className="eyebrow">Artículo destacado</div>
        <h1>{article.title}</h1>
        <p>{article.excerpt}</p>
        <div className="featured-meta">
          <div className="meta">{article.date} · {article.readTime}</div>
          <Button primary onClick={() => onOpen(article)}>Leer artículo</Button>
        </div>
      </div>
    </div>
  );
}

function HomeScreen({
  featured,
  articles,
  onOpenArticle,
  onOpenPlace,
  onGoToTab,
  searchQuery,
  onSearchChange,
  onSearchToggle,
  searchOpen,
}: {
  featured: Article;
  articles: Article[];
  onOpenArticle: (article: Article) => void;
  onOpenPlace: (place: Place) => void;
  onGoToTab: (tab: TabKey) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchToggle: () => void;
  searchOpen: boolean;
}) {
  const filteredArticles = articles.filter((article) => matchesArticleSearch(article, searchQuery));
  const featuredMatch =
    filteredArticles.find((article) => article.id === featured.id) ??
    filteredArticles.find((article) => article.featured) ??
    filteredArticles[0] ??
    featured;
  const secondaryArticles = filteredArticles.filter((article) => article.id !== featuredMatch.id).slice(0, 6);

  return (
    <div className="grid-home">
      <InicioTopBar
        searchValue={searchQuery}
        onSearchChange={onSearchChange}
        onSearchToggle={onSearchToggle}
        searchOpen={searchOpen}
      />
      <FeaturedStory article={featuredMatch} onOpen={onOpenArticle} />
      <section className="grid-2-main">
        <div className="cp-card"><div className="cp-card-inner">
          <SectionTitle eyebrow="Últimas noticias" title="" />
          {secondaryArticles.length > 0 ? (
            <div style={{ display: "grid", gap: 16 }}>
              {secondaryArticles.map((article, index) => (
                <motion.div key={article.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
                  <ArticleCard article={article} onOpen={onOpenArticle} compact />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="empty-search-state">No encontré artículos para “{searchQuery}”.</div>
          )}
        </div></div>
        <div style={{ display: "grid", gap: 16 }}>
          <div className="cp-card"><div className="cp-card-inner">
            <SectionTitle eyebrow="Nuestros Aliados" title="Guía Cannábica" body="Consulta fichas y explora por zona." />
            <div className="surface-box"><div style={{ textAlign: "center", display: "grid", gap: 10 }}><MapPin size={34} color="var(--cp-brand)" style={{ margin: "0 auto" }} /><p style={{ margin: 0, lineHeight: 1.8 }}>Un directorio limpio y orientado a consulta rápida.</p></div></div>
            <Button onClick={() => onGoToTab("map")}>Ir al mapa</Button>
          </div></div>
        </div>
      </section>
      <section style={{ display: "grid", gap: 16 }}>
        <SectionTitle eyebrow="Destacados" title="Recursos y asociaciones" />
        <div className="grid-places-3">{mapPlaces.map((place) => <PlaceCard key={place.id} place={place} onOpen={onOpenPlace} />)}</div>
      </section>
    </div>
  );
}

function ArticlesScreen({ articles, onOpenArticle }: { articles: Article[]; onOpenArticle: (article: Article) => void }) {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <section className="row between wrap" style={{ alignItems: "end", gap: 16 }}>
        <SectionTitle eyebrow="Artículos" title="Lectura clara, útil y serena" body="Estos contenidos llegan desde ARTICULOS. Más adelante este mismo patrón pasará por Firestore para entrega en app." />
        <div className="row wrap gap-sm"><Button><Filter size={14} style={{ marginRight: 8, verticalAlign: "middle" }} />Filtrar</Button></div>
      </section>
      {articles.length > 0 ? <FeaturedStory article={articles[0]} onOpen={onOpenArticle} /> : null}
      <div style={{ display: "grid", gap: 16 }}>{articles.map((article) => <ArticleCard key={article.id} article={article} onOpen={onOpenArticle} />)}</div>
    </div>
  );
}

function MapScreen({ onOpenPlace }: { onOpenPlace: (place: Place) => void }) {
  return <div style={{ display: "grid", gap: 24 }}><SectionTitle eyebrow="Nuestros Aliados" title="Guía Cannábica" body="Una vista limpia para consultar lugares, asociaciones y recursos con prioridad en la claridad." /><div className="cp-card" style={{ overflow: "hidden" }}><div style={{ minHeight: 420, background: "linear-gradient(180deg, #EAF7F2 0%, #F5FBFB 100%)", display: "grid", placeItems: "center", padding: 24 }}><div style={{ textAlign: "center", display: "grid", gap: 12, maxWidth: 560 }}><MapPin size={40} color="var(--cp-brand)" style={{ margin: "0 auto" }} /><p style={{ margin: 0, fontSize: 16, lineHeight: 1.8 }}>Aquí irá el mapa interactivo con filtros, geolocalización y fichas rápidas conectadas a Firestore.</p></div></div></div><div className="row wrap gap-sm">{categories.map((c) => <Badge key={c}>{c}</Badge>)}</div><div className="grid-places-2">{mapPlaces.map((place) => <PlaceCard key={place.id} place={place} onOpen={onOpenPlace} />)}</div></div>;
}

function MenuScreen({ onOpen }: { onOpen: (target: "news" | "legal-help" | "contact" | "about" | "donate") => void }) {
  const items = [
    { key: "news" as const, label: "Noticias", icon: Newspaper },
    { key: "legal-help" as const, label: "Ayuda Legal", icon: Scale },
    { key: "contact" as const, label: "Contacto", icon: Send },
    { key: "about" as const, label: "Sobre Nosotros", icon: Info },
    { key: "donate" as const, label: "Donar Ahora", icon: Gift },
  ];
  return <div style={{ display: "grid", gap: 24 }}><SectionTitle eyebrow="Menú" title="Más secciones" body="Un acceso simple a las áreas secundarias de la app, sin recargar la navegación principal." /><div style={{ display: "grid", gap: 12 }}>{items.map((item) => { const Icon = item.icon; return <button key={item.key} onClick={() => onOpen(item.key)} className="cp-card" style={{ padding: 22, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, cursor: "pointer", textAlign: "left" }}><div style={{ display: "flex", alignItems: "center", gap: 14 }}><div style={{ height: 42, width: 42, borderRadius: 16, background: "var(--cp-mint)", display: "grid", placeItems: "center" }}><Icon size={18} color="var(--cp-brand)" /></div><div style={{ color: "var(--cp-navy)", fontWeight: 600, fontSize: 18 }}>{item.label}</div></div><ChevronRight size={18} color="var(--cp-navy)" /></button>; })}</div></div>;
}

function SimpleInfoPage({ eyebrow, title, body, icon, onBack }: { eyebrow: string; title: string; body: string; icon: React.ReactNode; onBack: () => void }) {
  return <div style={{ display: "grid", gap: 24 }}><div className="back-row"><button onClick={onBack} className="back-button"><ArrowLeft size={18} /></button></div><div className="cp-card" style={{ maxWidth: 880 }}><div style={{ padding: 32, display: "grid", gap: 18 }}><div style={{ height: 56, width: 56, borderRadius: 18, background: "var(--cp-mint)", display: "grid", placeItems: "center" }}>{icon}</div><SectionTitle eyebrow={eyebrow} title={title} body={body} /></div></div></div>;
}

function ContactScreen({ onBack }: { onBack: () => void }) {
  return <div style={{ display: "grid", gap: 24 }}><div className="back-row"><button onClick={onBack} className="back-button"><ArrowLeft size={18} /></button></div><SectionTitle eyebrow="Contacto" title="Escríbenos" body="Una entrada clara para correcciones, sugerencias o nuevas ideas editoriales." /><div className="grid-2-main"><div className="cp-card"><div className="cp-card-inner"><h3 style={{ margin: 0, color: "var(--cp-navy)", fontWeight: 700, fontSize: 24 }}>Qué puedes enviar</h3><p style={{ margin: 0, fontSize: 16, lineHeight: 1.8 }}>Nuevos recursos, cambios en una ficha, ideas editoriales o comentarios generales.</p>{["Sugerir un recurso", "Corregir una ficha", "Proponer un artículo", "Enviar comentarios"].map((item) => <div key={item} style={{ borderRadius: 18, padding: "14px 16px", background: "var(--cp-surface)", color: "var(--cp-navy)", fontFamily: "Poppins, sans-serif" }}>{item}</div>)}</div></div><div className="cp-card"><div className="cp-card-inner">{["Nombre","Email","Asunto"].map((p) => <input key={p} placeholder={p} style={{ height: 48, borderRadius: 18, border: "none", background: "#F7F8FA", padding: "0 14px", fontFamily: "Poppins, sans-serif" }} />)}<textarea placeholder="Cuéntanos un poco más..." style={{ minHeight: 150, borderRadius: 24, border: "none", background: "#F7F8FA", padding: 16, fontFamily: "Poppins, sans-serif", resize: "vertical" }} /><Button primary><Send size={14} style={{ marginRight: 8, verticalAlign: "middle" }} />Enviar</Button></div></div></div></div>;
}

function ArticleDetailScreen({ article, onBack }: { article: Article; onBack: () => void }) {
  return <div style={{ display: "grid", gap: 24 }}><div className="back-row"><button onClick={onBack} className="back-button"><ArrowLeft size={18} /></button></div><div className="cp-card" style={{ overflow: "hidden" }}>{article.imageUrl ? <img src={article.imageUrl} alt={article.title} className="article-detail-image" /> : <div className="article-detail-image article-detail-image-fallback" />}{article.imageCredit ? <div style={{ padding: "5px 18px 0", textAlign: "right" }}>{article.imageCreditUrl ? <a href={article.imageCreditUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#b0b8c1", letterSpacing: "0.01em", textDecoration: "none" }}>{article.imageCredit}</a> : <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#b0b8c1", letterSpacing: "0.01em" }}>{article.imageCredit}</span>}</div> : null}<div style={{ padding: 40, display: "grid", gap: 20 }}><div className="row wrap gap-sm" style={{ alignItems: "center", gap: 10 }}><Badge>{article.category}</Badge><span className="meta">{article.date}</span><span className="meta">{article.readTime}</span></div><h1 style={{ margin: 0, maxWidth: 860, color: "var(--cp-navy)", fontWeight: 700, fontSize: 44, lineHeight: 1.08 }}>{article.title}</h1><p style={{ margin: 0, maxWidth: 860, fontSize: 17, lineHeight: 1.9 }}>{article.body}</p><div className="row wrap gap-sm"><Button primary><Heart size={14} style={{ marginRight: 8, verticalAlign: "middle" }} />Guardar</Button><Button><ExternalLink size={14} style={{ marginRight: 8, verticalAlign: "middle" }} />Compartir</Button></div></div></div></div>;
}

function PlaceDetailScreen({ place, onBack }: { place: Place; onBack: () => void }) {
  return <div style={{ display: "grid", gap: 24 }}><div className="back-row"><button onClick={onBack} className="back-button"><ArrowLeft size={18} /></button></div><div className="info-grid"><div className="cp-card" style={{ overflow: "hidden" }}><div style={{ height: 280, background: "linear-gradient(180deg, #EAF7F2 0%, #F7FAFB 100%)" }} /><div style={{ padding: 32, display: "grid", gap: 16 }}><div className="row wrap gap-sm"><Badge dark>{place.type}</Badge><Badge>{place.area}</Badge></div><h1 style={{ margin: 0, color: "var(--cp-navy)", fontWeight: 700, fontSize: 40, lineHeight: 1.08 }}>{place.name}</h1><p style={{ margin: 0, fontSize: 17, lineHeight: 1.9 }}>{place.description}</p></div></div><div className="cp-card"><div className="cp-card-inner"><h3 style={{ margin: 0, color: "var(--cp-navy)", fontWeight: 700, fontSize: 24 }}>Información</h3><div style={{ display: "grid", gap: 10, fontSize: 15, lineHeight: 1.8 }}><p style={{ margin: 0 }}><strong>Zona:</strong> {place.area}</p><p style={{ margin: 0 }}><strong>Dirección:</strong> {place.address}</p><p style={{ margin: 0 }}><strong>Horario:</strong> {place.hours}</p></div><Button primary><MapPin size={14} style={{ marginRight: 8, verticalAlign: "middle" }} />Abrir en mapa</Button><Button><Heart size={14} style={{ marginRight: 8, verticalAlign: "middle" }} />Guardar</Button></div></div></div></div>;
}

function BottomNav({ current, onChange }: { current: TabKey; onChange: (v: TabKey) => void }) {
  const items = [
    { key: "home" as TabKey, label: "Inicio", icon: Newspaper },
    { key: "articles" as TabKey, label: "Artículos", icon: Newspaper },
    { key: "map" as TabKey, label: "Mapa", icon: MapPin },
    { key: "menu" as TabKey, label: "Menú", icon: MenuIcon },
  ];
  return <div className="bottom-nav-wrap"><div className="bottom-nav">{items.map((item) => { const Icon = item.icon; return <button key={item.key} onClick={() => onChange(item.key)} className={current === item.key ? "active" : ""}><Icon size={16} /><span>{item.label}</span></button>; })}</div></div>;
}

function App() {
  const [currentTab, setCurrentTab] = useState<TabKey>("home");
  const [screen, setScreen] = useState<ScreenKey>("home");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(mapPlaces[0]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    let active = true;
    getArticles()
      .then((data) => {
        if (!active) return;
        setArticles(data);
        setSelectedArticle(data[0] ?? null);
      })
      .catch((err) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "No se pudieron cargar los artículos.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const featured = useMemo(() => getFeaturedArticle(articles), [articles]);

  const openTab = (tab: TabKey) => {
    setCurrentTab(tab);
    setScreen(tab);
  };
  const openArticle = (article: Article) => { setSelectedArticle(article); setScreen("article-detail"); };
  const openPlace = (place: Place) => { setSelectedPlace(place); setScreen("place-detail"); };
  const goBackToTab = () => setScreen(currentTab === "menu" ? "home" : currentTab);
  const handleSearchToggle = () => {
    setSearchOpen((prev) => {
      if (prev) setSearchQuery("");
      return !prev;
    });
  };
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const content = useMemo(() => {
    if (loading) return <div className="loading-box">Cargando ARTICULOS desde Google Sheets...</div>;
    if (error) return <div style={{ display: "grid", gap: 16 }}><div className="error-box">No pude leer la hoja en vivo. La app sigue funcionando, pero revisa `VITE_PUBLIC_SHEETS_URL` y tu Apps Script.</div><HomeScreen featured={featured} articles={articles} onOpenArticle={openArticle} onOpenPlace={openPlace} onGoToTab={openTab} searchQuery={searchQuery} onSearchChange={handleSearchChange} onSearchToggle={handleSearchToggle} searchOpen={searchOpen} /></div>;

    switch (screen) {
      case "article-detail": return selectedArticle ? <ArticleDetailScreen article={selectedArticle} onBack={goBackToTab} /> : null;
      case "place-detail": return selectedPlace ? <PlaceDetailScreen place={selectedPlace} onBack={goBackToTab} /> : null;
      case "contact": return <ContactScreen onBack={() => setScreen("home")} />;
      case "about": return <SimpleInfoPage onBack={() => setScreen("home")} eyebrow="Sobre Nosotros" title="Cannaplan como guía pública" body="Esta sección puede contar la misión del proyecto, el tono editorial y el compromiso con información clara, útil y responsable." icon={<Info size={26} color="var(--cp-brand)" />} />;
      case "donate": return <SimpleInfoPage onBack={() => setScreen("home")} eyebrow="Donar Ahora" title="Apoya el proyecto" body="Aquí puede vivir una página simple de donación con contexto claro sobre en qué se usa el apoyo y cómo ayuda a sostener la plataforma." icon={<Gift size={26} color="var(--cp-brand)" />} />;
      case "legal-help": return <SimpleInfoPage onBack={() => setScreen("home")} eyebrow="Ayuda Legal" title="Orientación y contexto legal" body="Esta área puede reunir artículos, recursos y enlaces para explicar términos, derechos y pasos básicos sin sonar técnica ni fría." icon={<Scale size={26} color="var(--cp-brand)" />} />;
      case "news":
      case "articles": return <ArticlesScreen articles={articles} onOpenArticle={openArticle} />;
      case "map": return <MapScreen onOpenPlace={openPlace} />;
      case "menu": return <MenuScreen onOpen={(target) => setScreen(target)} />;
      default: return <HomeScreen featured={featured} articles={articles} onOpenArticle={openArticle} onOpenPlace={openPlace} onGoToTab={openTab} searchQuery={searchQuery} onSearchChange={handleSearchChange} onSearchToggle={handleSearchToggle} searchOpen={searchOpen} />;
    }
  }, [loading, error, screen, selectedArticle, selectedPlace, articles, featured]);

  return <div className="shell">{content}{!["article-detail", "place-detail"].includes(screen) ? <BottomNav current={currentTab} onChange={openTab} /> : null}</div>;
}

ReactDOM.createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
