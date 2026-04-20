import type { Place } from "../types";

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

export function MapPlaceCard({
  place,
  onOpen,
  distance,
}: {
  place: Place;
  onOpen: (place: Place) => void;
  distance?: number;
}) {
  const color = typeColor(place.type);

  return (
    <button className="map-place-row" onClick={() => onOpen(place)}>
      {place.imageUrl ? (
        <img src={place.imageUrl} alt={place.name} className="map-place-row-thumb" />
      ) : (
        <div className="map-place-row-swatch" style={{ background: color + "18" }}>
          <span className="map-place-row-swatch-dot" style={{ background: color }} />
        </div>
      )}

      <div className="map-place-row-body">
        <div className="map-place-row-meta">
          <span className="map-place-row-type-pill" style={{ color, borderColor: color + "40", background: color + "12" }}>
            {place.type}
          </span>
          {place.area && <span className="map-place-row-area">{place.area}</span>}
          {distance !== undefined && (
            <span className="map-place-row-distance">
              {distance < 1
                ? `${Math.round(distance * 1000)} m`
                : `${distance.toFixed(1)} km`}
            </span>
          )}
        </div>

        <h3 className="map-place-row-title">{place.name}</h3>

        {place.description && (
          <p className="map-place-row-excerpt">{place.description}</p>
        )}
      </div>
    </button>
  );
}
