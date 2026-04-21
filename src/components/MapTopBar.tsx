import { Filter, LocateFixed, Search } from "lucide-react";

export function MapTopBar({
  showSearch,
  onToggleSearch,
  showFilters,
  onToggleFilters,
  geoStatus,
  onLocate,
}: {
  showSearch: boolean;
  onToggleSearch: () => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  geoStatus: "idle" | "loading" | "active" | "denied";
  onLocate: () => void;
}) {
  return (
    <header className="inicio-topbar">
      <div className="inicio-topbar-left">
        <img src="/logo_reverse_512.png" alt="Cannaplan" className="inicio-topbar-logo" width="28" height="28" />
        <div className="inicio-topbar-title">Guía Cannábica</div>
      </div>
      <div style={{ display: "flex", gap: "4px" }}>
        <button
          type="button"
          className={
            "inicio-topbar-search" +
            (geoStatus === "active" ? " active" : "") +
            (geoStatus === "denied" ? " geo-btn-denied" : "")
          }
          aria-label="Mi ubicación"
          onClick={onLocate}
          disabled={geoStatus === "loading"}
        >
          <LocateFixed size={20} />
        </button>
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
