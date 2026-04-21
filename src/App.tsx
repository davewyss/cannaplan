import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate, useParams } from "./router";
import { resetSocialMeta } from "./lib/socialMeta";
import { clearConsent, restoreConsent } from "./lib/consent";
import { isPwa } from "./lib/pwa";
import { ArticleBottomBar } from "./components/ArticleBottomBar";
import { BottomNav } from "./components/BottomNav";
import { DesktopNav } from "./components/DesktopNav";
import { DesktopFooter } from "./components/DesktopFooter";
import { CookieBanner } from "./components/CookieBanner";
import { InstallPrompt } from "./components/InstallPrompt";
import { StaticBottomBar } from "./components/StaticBottomBar";
import { ErrorState } from "./components/ErrorState";
import { LoadingState } from "./components/LoadingState";
import { Spinner } from "./components/Spinner";
import { useContent } from "./hooks/useContent";
import { HomeScreen } from "./screens/HomeScreen";
import type { Ad, Article, Place, TabKey } from "./types";

// ── Lazy screens ──────────────────────────────────────────────────────────────

const ArticlesScreen  = lazy(() => import("./screens/ArticlesScreen"));
const MapScreen       = lazy(() => import("./screens/MapScreen"));
const MenuScreen      = lazy(() => import("./screens/MenuScreen"));
const SearchScreen    = lazy(() => import("./screens/SearchScreen"));
const ArticleDetailScreen = lazy(() => import("./screens/ArticleDetailScreen"));
const PlaceDetailScreen   = lazy(() => import("./screens/PlaceDetailScreen"));
const ContactScreen       = lazy(() => import("./screens/ContactScreen"));
const SobreNosotrosScreen = lazy(() => import("./screens/SobreNosotrosScreen"));
const DonarScreen         = lazy(() => import("./screens/DonarScreen"));
const AyudaLegalScreen    = lazy(() => import("./screens/AyudaLegalScreen"));
const PrivacyScreen       = lazy(() => import("./screens/PrivacyScreen"));
const CookiesScreen       = lazy(() => import("./screens/CookiesScreen"));
const TermsScreen         = lazy(() => import("./screens/TermsScreen"));
const DataAccessScreen    = lazy(() => import("./screens/DataAccessScreen"));
const SobreAppScreen      = lazy(() => import("./screens/SobreAppScreen"));

// ── Route helpers ─────────────────────────────────────────────────────────────

const TAB_ROUTES: Record<TabKey, string> = {
  home:     "/",
  articles: "/articulos",
  map:      "/mapa",
  menu:     "/menu",
};

// MenuScreen target → URL
const MENU_ROUTES: Record<string, string> = {
  home:          "/",
  map:           "/mapa",
  news:          "/articulos",
  "legal-help":  "/menu/ayuda-legal",
  contact:       "/menu/contacto",
  about:         "/menu/sobre-nosotros",
  privacy:       "/legal/privacidad",
  cookies:       "/legal/cookies",
  terms:         "/legal/terminos",
  "data-access": "/legal/acceso-datos",
  "sobre-app":   "/sobre-app",
};

// ── Detail route wrappers ─────────────────────────────────────────────────────

function ArticleDetailRoute({ articles, ads }: { articles: Article[]; ads: Ad[] }) {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug) ?? null;

  if (!article) {
    return <ErrorState message="Artículo no encontrado." />;
  }

  return (
    <>
      <ArticleDetailScreen article={article} ads={ads} />
      <ArticleBottomBar article={article} />
    </>
  );
}

function PlaceDetailRoute({ places }: { places: Place[] }) {
  const { slug } = useParams<{ slug: string }>();
  const place = places.find((p) => p.slug === slug) ?? null;

  if (!place) {
    return <ErrorState message="Lugar no encontrado." />;
  }

  return (
    <>
      <PlaceDetailScreen place={place} onBack={() => {}} />
      <ArticleBottomBar article={null} />
    </>
  );
}

// ── Bottom bar switch ─────────────────────────────────────────────────────────

function BottomBarSwitch() {
  const { pathname } = useLocation();

  // Detail routes render their own ArticleBottomBar — don't double-render
  if (/^\/articulos\/.+/.test(pathname) || /^\/mapa\/.+/.test(pathname)) {
    return null;
  }

  const isStatic =
    pathname.startsWith("/menu/") ||
    pathname.startsWith("/legal/") ||
    pathname === "/sobre-app";

  if (isStatic) return <StaticBottomBar />;

  return <BottomNav />;
}

// ── Root component ────────────────────────────────────────────────────────────

function ScreenLoader() {
  return <Spinner />;
}

export default function App() {
  const { articles, ads, recursos, places, featured, loading, error } =
    useContent();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [cookieBannerForced, setCookieBannerForced] = useState(false);

  // Splash: PWA only. Must hold for at least 2 s AND wait for content to finish loading.
  const [timerDone, setTimerDone] = useState(() => !isPwa());
  useEffect(() => {
    if (timerDone) return;
    const t = setTimeout(() => setTimerDone(true), 2000);
    return () => clearTimeout(t);
  }, [timerDone]);
  const splashDone = timerDone && !loading;

  // Restore prior cookie consent on first load
  useEffect(() => { restoreConsent(); }, []);

  function handleManageConsent() {
    clearConsent();
    setCookieBannerForced(true);
  }

  // Reset social meta for non-detail pages (detail pages set their own meta via useSocialMeta)
  useEffect(() => {
    const isDetailPage = /^\/articulos\/.+/.test(pathname) || /^\/mapa\/.+/.test(pathname);
    if (!isDetailPage) {
      resetSocialMeta();
    }
  }, [pathname]);

  const openArticle = (article: Article) =>
    navigate(`/articulos/${article.slug}`);
  const openPlace = (place: Place) => navigate(`/mapa/${place.slug}`);
  const goToTab   = (tab: TabKey) => navigate(TAB_ROUTES[tab]);

  // ── Splash (PWA only, time-capped) ───────────────────────────────────────

  if (!splashDone) return <LoadingState />;

  // ── Error full-screen ─────────────────────────────────────────────────────

  if (error) {
    return (
      <>
        <main className="shell">
          <ErrorState message={error} />
        </main>
        <BottomNav />
      </>
    );
  }

  // ── Routes ────────────────────────────────────────────────────────────────

  return (
    <>
      <DesktopNav articles={articles} />
      <main className="shell">
        <Suspense fallback={<ScreenLoader />}>
          <Routes>

            {/* ── Main tabs ────────────────────────────────────────────── */}
            <Route
              path="/"
              element={
                featured ? (
                  <HomeScreen
                    featured={featured}
                    articles={articles}
                    ads={ads}
                    recursos={recursos}
                    onOpenArticle={openArticle}
                    onOpenPlace={openPlace}
                    onGoToTab={goToTab}
                    onSearchClick={() => navigate("/buscar")}
                  />
                ) : loading ? (
                  <Spinner />
                ) : (
                  <ErrorState message="No hay contenido disponible todavía." />
                )
              }
            />

            <Route
              path="/articulos"
              element={
                <ArticlesScreen
                  articles={articles}
                  ads={ads}
                  onOpenArticle={openArticle}
                  onSearchClick={() => navigate("/buscar")}
                />
              }
            />

            <Route
              path="/articulos/:slug"
              element={<ArticleDetailRoute articles={articles} ads={ads} />}
            />

            <Route
              path="/mapa"
              element={
                <MapScreen places={places} ads={ads} onOpenPlace={openPlace} />
              }
            />

            <Route
              path="/mapa/:slug"
              element={<PlaceDetailRoute places={places} />}
            />

            <Route
              path="/buscar"
              element={
                <SearchScreen
                  articles={articles}
                  onOpenArticle={openArticle}
                  onBack={() => navigate(-1)}
                />
              }
            />

            {/* ── Menu + sub-pages ─────────────────────────────────────── */}
            <Route
              path="/menu"
              element={
                <MenuScreen
                  onOpen={(target) => navigate(MENU_ROUTES[target] ?? "/")}
                  onManageConsent={handleManageConsent}
                />
              }
            />

            <Route
              path="/menu/contacto"
              element={<ContactScreen onBack={() => navigate(-1)} />}
            />
            <Route
              path="/menu/sobre-nosotros"
              element={<SobreNosotrosScreen onBack={() => navigate(-1)} />}
            />
            <Route
              path="/menu/donar"
              element={<DonarScreen onBack={() => navigate(-1)} />}
            />
            <Route
              path="/menu/ayuda-legal"
              element={<AyudaLegalScreen onBack={() => navigate(-1)} onNavigate={(k) => navigate(MENU_ROUTES[k] ?? "/")} />}
            />

            {/* ── Legal pages ───────────────────────────────────────────── */}
            <Route
              path="/legal/privacidad"
              element={<PrivacyScreen onBack={() => navigate(-1)} onNavigate={(k) => navigate(MENU_ROUTES[k] ?? "/")} />}
            />
            <Route
              path="/legal/cookies"
              element={<CookiesScreen onBack={() => navigate(-1)} onManageConsent={handleManageConsent} onNavigate={(k) => navigate(MENU_ROUTES[k] ?? "/")} />}
            />
            <Route
              path="/legal/terminos"
              element={<TermsScreen onBack={() => navigate(-1)} onNavigate={(k) => navigate(MENU_ROUTES[k] ?? "/")} />}
            />
            <Route
              path="/legal/acceso-datos"
              element={<DataAccessScreen onBack={() => navigate(-1)} onNavigate={(k) => navigate(MENU_ROUTES[k] ?? "/")} />}
            />

            {/* ── Misc ─────────────────────────────────────────────────── */}
            <Route
              path="/sobre-app"
              element={<SobreAppScreen onBack={() => navigate(-1)} onNavigate={(k) => navigate(MENU_ROUTES[k] ?? "/")} />}
            />

          </Routes>
        </Suspense>
      </main>
      {!loading && (
        <CookieBanner
          onNavigateCookies={() => navigate(MENU_ROUTES["cookies"])}
          onNavigatePrivacy={() => navigate(MENU_ROUTES["privacy"])}
          forceShow={cookieBannerForced}
          onClose={() => setCookieBannerForced(false)}
        />
      )}
      <InstallPrompt />
      <BottomBarSwitch />
      <DesktopFooter onManageConsent={handleManageConsent} />
    </>
  );
}
