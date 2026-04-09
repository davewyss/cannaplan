import { MapPin, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AdSidebar } from "../components/AdSidebar";
import { MapPlaceCard } from "../components/MapPlaceCard";
import { MapTopBar } from "../components/MapTopBar";
import { matchesPlaceSearch } from "../lib/search";
import type { Ad, Place } from "../types";

declare const L: any;

const TYPE_COLORS: Record<string, string> = {
  "Asociación": "#1d8867",
  "Dispensario": "#2e7d32",
  "Médico": "#1565c0",
  "Farmacia": "#6a1b9a",
  "Abogado": "#e65100",
  "Educación": "#0277bd",
  "Recurso": "#558b2f",
  "Lugar": "#546e7a",
};

function typeColor(type: string): string {
  return TYPE_COLORS[type] ?? "#282d48";
}

function makeSvgIcon(color: string, active = false): string {
  const size = active ? 38 : 30;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 30 32"><path d="M15 1C9.48 1 5 5.48 5 11c0 8.25 10 20 10 20s10-11.75 10-20c0-5.52-4.48-10-10-10z" fill="${color}" stroke="white" stroke-width="2"/><circle cx="15" cy="11" r="4" fill="white" fill-opacity="0.9"/></svg>`;
}

function leafletIcon(color: string, active = false) {
  const size = active ? 38 : 30;
  return L.divIcon({
    className: "",
    html: makeSvgIcon(color, active),
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -(size + 4)],
  });
}

const DEFAULT_CENTER: [number, number] = [40.416, -3.703];
const DEFAULT_ZOOM = 6;
const AD_INTERVAL = 8;

export default function MapScreen({
  places,
  ads,
  onOpenPlace,
}: {
  places: Place[];
  ads: Ad[];
  onOpenPlace: (place: Place) => void;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<globalThis.Map<number, any>>(new globalThis.Map());

  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const types = useMemo(() => {
    const set = new Set(places.map((p) => p.type).filter(Boolean));
    return Array.from(set).sort();
  }, [places]);

  const filtered = useMemo(() => {
    return places.filter((p) => {
      const typeMatch = activeType ? p.type === activeType : true;
      return typeMatch && matchesPlaceSearch(p, query);
    });
  }, [places, query, activeType]);

  const mappable = useMemo(() => filtered.filter((p) => p.lat && p.lng), [filtered]);

  const mapaAds = useMemo(
    () => ads.filter((ad) => {
      const locs = [...(ad.ubicaciones ?? []), ...(ad.ubicacion ? [ad.ubicacion] : [])];
      return locs.some((l) =>
        l.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-") === "mapa"
      );
    }),
    [ads]
  );

  // Init Leaflet once
  useEffect(() => {
    if (!mapRef.current || typeof L === "undefined") return;
    if (leafletMapRef.current) return;

    const map = L.map(mapRef.current, {
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    leafletMapRef.current = map;
    setMapReady(true);

    return () => {
      map.remove();
      leafletMapRef.current = null;
    };
  }, []);

  // Sync markers
  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map || !mapReady) return;

    const filteredIds = new Set(mappable.map((p) => p.id));
    markersRef.current.forEach((marker, id) => {
      if (!filteredIds.has(id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    });

    mappable.forEach((place) => {
      const color = typeColor(place.type);
      const isActive = selectedPlace?.id === place.id;

      if (markersRef.current.has(place.id)) {
        markersRef.current.get(place.id)!.setIcon(leafletIcon(color, isActive));
      } else {
        const marker = L.marker([place.lat!, place.lng!], { icon: leafletIcon(color, isActive) });
        marker.on("click", () => {
          setSelectedPlace(place);
          map.panTo([place.lat!, place.lng!], { animate: true });
        });
        marker.addTo(map);
        markersRef.current.set(place.id, marker);
      }
    });
  }, [mappable, mapReady, selectedPlace]);

  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const place = places.find((p) => p.id === id);
      if (!place) return;
      marker.setIcon(leafletIcon(typeColor(place.type), selectedPlace?.id === id));
    });
  }, [selectedPlace, places]);

  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map || !mapReady || mappable.length === 0) return;
    if (mappable.length === 1) {
      map.setView([mappable[0].lat!, mappable[0].lng!], 14, { animate: true });
      return;
    }
    const bounds = L.latLngBounds(mappable.map((p) => [p.lat!, p.lng!]));
    map.fitBounds(bounds, { padding: [40, 40], animate: true, maxZoom: 14 });
  }, [mappable, mapReady]);

  function handleCardOpen(place: Place) {
    if (place.lat && place.lng && leafletMapRef.current) {
      leafletMapRef.current.panTo([place.lat, place.lng], { animate: true });
    }
    setSelectedPlace(place);
    onOpenPlace(place);
  }

  // Build card list with inline ads (mobile only — desktop uses sidebar)
  function buildCardRows() {
    const rows: React.ReactNode[] = [];
    let adIndex = 0;

    filtered.forEach((place, i) => {
      rows.push(<MapPlaceCard key={place.id} place={place} onOpen={handleCardOpen} />);

      const isAdSlot = (i + 1) % AD_INTERVAL === 0;
      if (isAdSlot && mapaAds.length > 0) {
        const ad = mapaAds[adIndex % mapaAds.length];
        adIndex++;
        rows.push(
          <div key={`ad-${i}`} className="articles-inline-ad-wrap map-inline-ad">
            <AdSidebar ads={[ad]} limit={1} cardClassName="articles-inline-ad" />
          </div>
        );
      }
    });

    if (mapaAds.length > 0) {
      const ad = mapaAds[adIndex % mapaAds.length];
      rows.push(
        <div key="ad-end" className="articles-inline-ad-wrap map-inline-ad">
          <AdSidebar ads={[ad]} limit={1} cardClassName="articles-inline-ad" />
        </div>
      );
    }

    return rows;
  }

  const hasActiveFilters = activeType !== null;

  return (
    <div className="map-screen-scroll">
      {/* Topbar */}
      <MapTopBar
        showSearch={showSearch}
        onToggleSearch={() => setShowSearch((v) => !v)}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters((v) => !v)}
      />

      {/* Expandable search row */}
      {showSearch && (
        <div className="map-search-expand">
          <Search size={15} color="var(--cp-brand)" />
          <input
            className="map-search-expand-input"
            placeholder="Buscar por nombre, zona o tipo..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button className="map-clear-btn" onClick={() => setQuery("")}>
              <X size={13} />
            </button>
          )}
        </div>
      )}

      {/* Grouped filter panel */}
      {showFilters && (
        <div className="map-filter-panel">
          {types.length > 0 && (
            <div className="map-filter-group">
              <div className="map-filter-group-label">Categoría</div>
              <div className="map-filter-chips">
                <button
                  className={"map-pill" + (activeType === null ? " active" : "")}
                  onClick={() => setActiveType(null)}
                >
                  Todo
                </button>
                {types.map((t) => (
                  <button
                    key={t}
                    className={"map-pill" + (activeType === t ? " active" : "")}
                    onClick={() => setActiveType(t === activeType ? null : t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {hasActiveFilters && (
            <button
              className="map-filter-clear"
              onClick={() => setActiveType(null)}
            >
              Limpiar filtros
            </button>
          )}
        </div>
      )}

      {/* Map — always full width */}
      <div className="map-container-wrap">
        <div ref={mapRef} className="map-leaflet" />

        {selectedPlace && (
          <div className="map-place-card">
            {selectedPlace.imageUrl && (
              <img src={selectedPlace.imageUrl} alt={selectedPlace.name} className="map-place-card-img" />
            )}
            <div className="map-place-card-body">
              <div className="map-place-card-top">
                <span className="map-place-type-pill" style={{ background: typeColor(selectedPlace.type) }}>
                  {selectedPlace.type}
                </span>
                <button className="map-place-card-close" onClick={() => setSelectedPlace(null)}>
                  <X size={14} />
                </button>
              </div>
              <div className="map-place-card-name">{selectedPlace.name}</div>
              {selectedPlace.area && <div className="map-place-card-area">{selectedPlace.area}</div>}
              {selectedPlace.address && (
                <div className="map-place-card-meta">
                  <MapPin size={12} />
                  {selectedPlace.address}
                </div>
              )}
              <button className="map-place-card-cta" onClick={() => onOpenPlace(selectedPlace)}>
                Ver ficha completa
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cards + sidebar layout */}
      {filtered.length > 0 && (
        <section className="map-body-layout">
          <div className="map-cards-section">
            <div className="map-cards-section-title">
              {filtered.length} lugar{filtered.length !== 1 ? "es" : ""}
              {activeType ? ` · ${activeType}` : ""}
            </div>
            {buildCardRows()}
          </div>
          <aside className="map-sidebar">
            <AdSidebar ads={ads} ubicacion="mapa" className="articles-sidebar-ads" />
          </aside>
        </section>
      )}

      {filtered.length === 0 && (
        <div className="map-empty">No hay resultados para tu búsqueda.</div>
      )}
    </div>
  );
}
