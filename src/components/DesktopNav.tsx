import { ChevronDown, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { matchesArticleSearch } from "../lib/search";
import { useLocation, useNavigate } from "../router";
import type { Article } from "../types";

const NAV_ITEMS = [
  { label: "Inicio",    path: "/"          },
  { label: "Artículos", path: "/articulos" },
  { label: "Mapa",      path: "/mapa"      },
] as const;

const SUBMENU_ITEMS = [
  { label: "Soporte Legal", path: "/menu/ayuda-legal"  },
  { label: "Contacto",    path: "/menu/contacto"       },
  { label: "Nosotros",    path: "/menu/sobre-nosotros" },
] as const;

export function DesktopNav({ articles }: { articles: Article[] }) {
  const navigate     = useNavigate();
  const { pathname } = useLocation();

  const [searchOpen,  setSearchOpen]  = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [query,       setQuery]       = useState("");

  const inputRef    = useRef<HTMLInputElement>(null);
  const wrapRef     = useRef<HTMLDivElement>(null);
  const submenuRef  = useRef<HTMLDivElement>(null);

  // Focus search input when it opens
  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  // Close search on outside click
  useEffect(() => {
    if (!searchOpen) return;
    function onDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) closeSearch();
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [searchOpen]);

  // Close search on Escape
  useEffect(() => {
    if (!searchOpen) return;
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") closeSearch(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  function closeSearch() { setSearchOpen(false); setQuery(""); }

  const results = query.trim()
    ? articles.filter((a) => matchesArticleSearch(a, query)).slice(0, 6)
    : [];

  function isActive(path: string) {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  }

  const submenuActive = SUBMENU_ITEMS.some((s) => pathname.startsWith(s.path));

  return (
    <div ref={wrapRef}>
      <header className="desktop-nav" aria-label="Navegación principal">
        <div className="desktop-nav-inner">

          {/* Brand */}
          <button className="desktop-nav-brand" onClick={() => navigate("/")}>
            <img src="/logo_reverse_512.png" alt="Cannaplan" className="desktop-nav-logo" width="60" height="60" />
            <div className="desktop-nav-brand-text">
              <span className="desktop-nav-title">Cannaplan</span>
              <span className="desktop-nav-tagline">Recursos y servicios de confianza sobre cannabis</span>
            </div>
          </button>

          {/* Nav links */}
          <nav className="desktop-nav-links">
            {NAV_ITEMS.map(({ label, path }) => (
              <button
                key={path}
                className={"desktop-nav-link" + (isActive(path) ? " active" : "")}
                onClick={() => navigate(path)}
              >
                {label}
              </button>
            ))}

            {/* Contacto submenu */}
            <div
              ref={submenuRef}
              className="desktop-nav-submenu-wrap"
              onMouseEnter={() => setSubmenuOpen(true)}
              onMouseLeave={() => setSubmenuOpen(false)}
            >
              <button
                className={"desktop-nav-link desktop-nav-link--sub" + (submenuActive ? " active" : "")}
                onClick={() => setSubmenuOpen((v) => !v)}
              >
                Contacto <ChevronDown size={13} className={"desktop-nav-chevron" + (submenuOpen ? " open" : "")} />
              </button>

              {submenuOpen && (
                <div className="desktop-submenu">
                  {SUBMENU_ITEMS.map(({ label, path }) => (
                    <button
                      key={path}
                      className={"desktop-submenu-item" + (pathname.startsWith(path) ? " active" : "")}
                      onClick={() => { navigate(path); setSubmenuOpen(false); }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Search toggle */}
          <button
            className={"desktop-nav-search-btn" + (searchOpen ? " active" : "")}
            aria-label="Buscar"
            onClick={() => setSearchOpen((v) => !v)}
          >
            {searchOpen ? <X size={18} /> : <Search size={18} />}
          </button>

        </div>
      </header>

      {/* Search dropdown */}
      {searchOpen && (
        <div className="desktop-search-drop">
          <div className="desktop-search-drop-inner">
            <div className="desktop-search-input-wrap">
              <Search size={18} className="desktop-search-icon" />
              <input
                ref={inputRef}
                className="desktop-search-input"
                placeholder="Buscar artículos…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button className="desktop-search-clear" onClick={() => setQuery("")}>
                  <X size={15} />
                </button>
              )}
            </div>

            {results.length > 0 && (
              <ul className="desktop-search-results">
                {results.map((a) => (
                  <li key={a.id}>
                    <button
                      className="desktop-search-result"
                      onClick={() => { navigate(`/articulos/${a.slug}`); closeSearch(); }}
                    >
                      <span className="desktop-search-result-cat">{a.category}</span>
                      <span className="desktop-search-result-title">{a.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {query.trim() && results.length === 0 && (
              <p className="desktop-search-empty">Sin resultados para «{query}»</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
