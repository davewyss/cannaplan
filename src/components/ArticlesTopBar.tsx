import { Search } from "lucide-react";

export function ArticlesTopBar({ onSearchClick }: { onSearchClick: () => void }) {
  return (
    <header className="inicio-topbar">
      <div className="inicio-topbar-left">
        <img src="/cannaplan-logo.png" alt="Cannaplan logo" className="inicio-topbar-logo" width="28" height="28" />
        <div className="inicio-topbar-title">Artículos</div>
      </div>
      <button type="button" className="inicio-topbar-search" aria-label="Buscar" onClick={onSearchClick}>
        <Search size={20} />
      </button>
    </header>
  );
}
