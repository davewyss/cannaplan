import { Search } from "lucide-react";

export function ArticlesTopBar({ onSearchClick }: { onSearchClick: () => void }) {
  return (
    <header className="inicio-topbar inicio-topbar--articles">
      <div className="inicio-topbar-left">
        <img src="/logo_reverse_512.png" alt="Cannaplan logo" className="inicio-topbar-logo" width="28" height="28" />
        <div className="inicio-topbar-title">Artículos</div>
      </div>
      <button type="button" className="inicio-topbar-search" aria-label="Buscar" onClick={onSearchClick}>
        <Search size={20} />
      </button>
    </header>
  );
}
