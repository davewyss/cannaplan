import { MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "../components/Badge";
import { PlaceCard } from "../components/PlaceCard";
import { SectionTitle } from "../components/SectionTitle";
import { categories, mapPlaces } from "../data/places";
import { matchesPlaceSearch } from "../lib/search";
import type { Place } from "../types";

export default function MapScreen({ onOpenPlace }: { onOpenPlace: (place: Place) => void }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPlaces = useMemo(() => {
    return mapPlaces.filter((place) => {
      const categoryMatch = activeCategory ? place.type === activeCategory || place.area === activeCategory : true;
      return categoryMatch && matchesPlaceSearch(place, query);
    });
  }, [activeCategory, query]);

  return (
    <div className="screen-grid">
      <SectionTitle
        eyebrow="Nuestros aliados"
        title="Guía Cannábica"
        body="Explora recursos, asociaciones y puntos de referencia de forma simple."
      />

      <div className="cp-card guide-search-card">
        <div className="guide-search-row">
          <Search size={18} color="var(--cp-brand)" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="guide-search-input"
            placeholder="Buscar por zona, nombre o tipo"
          />
        </div>
      </div>

      <div className="cp-card guide-hero-card">
        <div className="guide-hero-inner">
          <MapPin size={40} color="var(--cp-brand)" />
          <p>
            Una vista pensada para consulta rápida: primero exploras, luego abres la ficha.
          </p>
        </div>
      </div>

      <div className="row wrap gap-sm">
        <button className={`filter-chip ${activeCategory === null ? "active" : ""}`} onClick={() => setActiveCategory(null)}>
          Todo
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-chip ${activeCategory === category ? "active" : ""}`}
            onClick={() => setActiveCategory(category === activeCategory ? null : category)}
          >
            <Badge>{category}</Badge>
          </button>
        ))}
      </div>

      <div className="grid-places-2">
        {filteredPlaces.map((place) => (
          <PlaceCard key={place.id} place={place} onOpen={onOpenPlace} />
        ))}
      </div>
    </div>
  );
}
