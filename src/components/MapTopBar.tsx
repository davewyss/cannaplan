import { Filter, Search } from "lucide-react";

export function MapTopBar({
  showSearch,
  onToggleSearch,
  showFilters,
  onToggleFilters,
}: {
  showSearch: boolean;
  onToggleSearch: () => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}) {
  return (
    <header className="inicio-topbar">
      <div className="inicio-topbar-left">
        <img src="/apple-touch-icon.png" alt="Cannaplan" className="inicio-topbar-logo" width="28" height="28" />
        <div className="inicio-topbar-title">Guía Cannábica</div>
      </div>
      <div style={{ display: "flex", gap: "4px" }}>
        <button
          type="button"
          className={"inicio-topbar-search" + (showSearch ? " active" : "")}
          aria-label="Buscar"
          onClick={onToggleSearch}
        >
          <Search size={20} />
        </button>
        <button
          type="button"
          className={"inicio-topbar-search" + (showFilters ? " active" : "")}
          aria-label="Filtros"
          onClick={onToggleFilters}
        >
          <Filter size={20} />
        </button>
      </div>
    </header>
  );
}
