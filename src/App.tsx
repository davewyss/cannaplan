import { Gift, Info, Newspaper, Scale, Send } from "lucide-react";
import { Suspense, lazy, useMemo, useState } from "react";
import { ArticleBottomBar } from "./components/ArticleBottomBar";
import { BottomNav } from "./components/BottomNav";
import { StaticBottomBar } from "./components/StaticBottomBar";
import { ErrorState } from "./components/ErrorState";
import { LoadingState } from "./components/LoadingState";
import { Spinner } from "./components/Spinner";
import { useContent } from "./hooks/useContent";
import { HomeScreen } from "./screens/HomeScreen";
import type { Article, Place, ScreenKey, TabKey } from "./types";

const ArticlesScreen = lazy(() => import("./screens/ArticlesScreen"));
const MapScreen = lazy(() => import("./screens/MapScreen"));
const MenuScreen = lazy(() => import("./screens/MenuScreen"));
const SearchScreen = lazy(() => import("./screens/SearchScreen"));
const ArticleDetailScreen = lazy(() => import("./screens/ArticleDetailScreen"));
const PlaceDetailScreen = lazy(() => import("./screens/PlaceDetailScreen"));
const ContactScreen = lazy(() => import("./screens/ContactScreen"));
const SimpleInfoPage = lazy(() => import("./screens/SimpleInfoPage"));
const AyudaLegalScreen = lazy(() => import("./screens/AyudaLegalScreen"));
const SobreNosotrosScreen = lazy(() => import("./screens/SobreNosotrosScreen"));
const DonarScreen = lazy(() => import("./screens/DonarScreen"));
const PrivacyScreen = lazy(() => import("./screens/PrivacyScreen"));
const CookiesScreen = lazy(() => import("./screens/CookiesScreen"));
const TermsScreen = lazy(() => import("./screens/TermsScreen"));
const DataAccessScreen = lazy(() => import("./screens/DataAccessScreen"));
const SobreAppScreen = lazy(() => import("./screens/SobreAppScreen"));

function ScreenLoader() {
  return <Spinner />;
}

export default function App() {
  const { articles, ads, recursos, places, featured, loading, error } = useContent();
  const [screen, setScreen] = useState<ScreenKey>("home");
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const hasContent = Boolean(featured && articles.length);

  const openArticle = (article: Article) => {
    setSelectedArticle(article);
    setScreen("article-detail");
  };

  const openPlace = (place: Place) => {
    setSelectedPlace(place);
    setScreen("place-detail");
  };

  const goToTab = (tab: TabKey) => {
    setActiveTab(tab);
    setScreen(tab);
  };

  const goBackToMain = () => {
    setScreen(activeTab);
  };

  const menuInfo = useMemo(
    () => ({
      news: {
        eyebrow: "Artículos",
        title: "Biblioteca editorial",
        body: "Accede a lectura clara, útil y pensada para consulta rápida.",
        icon: <Newspaper size={22} color="var(--cp-brand)" />,
      },
      "legal-help": {
        eyebrow: "Ayuda legal",
        title: "Orientación básica",
        body: "Un punto de entrada para entender dudas frecuentes y próximos pasos.",
        icon: <Scale size={22} color="var(--cp-brand)" />,
      },
      contact: {
        eyebrow: "Contacto",
        title: "Escríbenos",
        body: "Comparte correcciones, sugerencias o ideas nuevas para el proyecto.",
        icon: <Send size={22} color="var(--cp-brand)" />,
      },
      about: {
        eyebrow: "Sobre nosotros",
        title: "Una guía más clara",
        body: "Cannaplan busca ordenar información útil con una voz calmada, moderna y responsable.",
        icon: <Info size={22} color="var(--cp-brand)" />,
      },
      donate: {
        eyebrow: "Donar",
        title: "Apoya el proyecto",
        body: "Una vía simple para sostener mejoras futuras y crecimiento editorial.",
        icon: <Gift size={22} color="var(--cp-brand)" />,
      },
    }),
    [],
  );

  let content = null;

  if (loading) {
    content = <LoadingState />;
  } else if (error) {
    content = <ErrorState message={error} />;
  } else if ((!hasContent || !featured) && screen !== "map" && screen !== "place-detail") {
    content = <ErrorState message="No hay contenido disponible todavía." />;
  } else {
    switch (screen) {
      case "home":
        content = (
          <HomeScreen
            featured={featured!}
            articles={articles}
            ads={ads}
            recursos={recursos}
            onOpenArticle={openArticle}
            onOpenPlace={openPlace}
            onGoToTab={goToTab}
            onSearchClick={() => setScreen("search")}
          />
        );
        break;
      case "articles":
        content = <ArticlesScreen articles={articles} ads={ads} onOpenArticle={openArticle} onSearchClick={() => setScreen("search")} />;
        break;
      case "map":
        content = <MapScreen places={places} ads={ads} onOpenPlace={openPlace} />;
        break;
      case "menu":
        content = (
          <MenuScreen
            onOpen={(target) => {
              if (target === "news") {
                setActiveTab("articles");
                setScreen("articles");
                return;
              }
              setScreen(target);
            }}
          />
        );
        break;
      case "search":
        content = <SearchScreen articles={articles} onOpenArticle={openArticle} onBack={() => setScreen("home")} />;
        break;
      case "article-detail":
        content = selectedArticle ? <ArticleDetailScreen article={selectedArticle} ads={ads} /> : null;
        break;
      case "place-detail":
        content = selectedPlace ? <PlaceDetailScreen place={selectedPlace} onBack={goBackToMain} /> : null;
        break;
      case "contact":
        content = <ContactScreen onBack={() => setScreen("menu")} />;
        break;
      case "about":
        content = <SobreNosotrosScreen onBack={() => setScreen("menu")} />;
        break;
      case "about-doc":
        content = <SobreNosotrosScreen onBack={() => setScreen("menu")} />;
        break;
      case "donate":
        content = <DonarScreen onBack={() => setScreen("menu")} />;
        break;
      case "legal-help":
        content = <AyudaLegalScreen onBack={() => setScreen("menu")} />;
        break;
      case "news": {
        const info = menuInfo["news"];
        content = <SimpleInfoPage {...info} onBack={() => setScreen("menu")} />;
        break;
      }
      case "privacy":
        content = <PrivacyScreen onBack={() => setScreen("menu")} />;
        break;
      case "cookies":
        content = <CookiesScreen onBack={() => setScreen("menu")} />;
        break;
      case "terms":
        content = <TermsScreen onBack={() => setScreen("menu")} />;
        break;
      case "data-access":
        content = <DataAccessScreen onBack={() => setScreen("menu")} />;
        break;
      case "sobre-app":
        content = <SobreAppScreen onBack={() => setScreen("menu")} />;
        break;
      default:
        content = null;
    }
  }

  const staticScreens: ScreenKey[] = ["about", "about-doc", "donate", "contact", "legal-help", "privacy", "cookies", "terms", "data-access", "sobre-app"];
  const isStatic = staticScreens.includes(screen);

  return (
    <>
      <main className="shell">
        <Suspense fallback={<ScreenLoader />}>{content}</Suspense>
      </main>
      {screen === "article-detail" ? (
        <ArticleBottomBar onBack={goBackToMain} onMenu={() => setScreen("menu")} article={selectedArticle} />
      ) : isStatic ? (
        <StaticBottomBar
          onBack={goBackToMain}
          onHome={() => goToTab("home")}
          onArticles={() => goToTab("articles")}
          onMenu={() => goToTab("menu")}
        />
      ) : (
        <BottomNav activeTab={activeTab} onChange={goToTab} />
      )}
    </>
  );
}
