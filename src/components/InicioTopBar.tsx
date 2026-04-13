import { Search } from "lucide-react";

export function InicioTopBar({ onSearchClick }: { onSearchClick: () => void }) {
  return (
    <header className="inicio-topbar">
      <div className="inicio-topbar-left">
        <img src="/logo_reverse_512.png" alt="Cannaplan logo" className="inicio-topbar-logo" width="28" height="28" />
        <div>
          <div className="inicio-topbar-title">Cannaplan</div>
          <div className="inicio-topbar-tagline">Información y defensa del cannabis en España</div>
        </div>
      </div>
      <button type="button" className="inicio-topbar-search" aria-label="Buscar" onClick={onSearchClick}>
        <Search size={20} />
      </button>
    </header>
  );
}
