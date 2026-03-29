import { ChevronRight, Heart } from "lucide-react";
import type { Place } from "../types";
import { Badge } from "./Badge";

export function PlaceCard({ place, onOpen }: { place: Place; onOpen: (place: Place) => void }) {
  return (
    <div className="cp-card">
      <div className="cp-card-inner place-row">
        <div className="stack-sm flex-1">
          <div className="row wrap gap-sm">
            <Badge dark>{place.type}</Badge>
            <span className="meta">{place.area}</span>
          </div>
          <h3 className="place-card-title">{place.name}</h3>
          <p className="place-card-text">{place.description}</p>
          <button className="text-button" onClick={() => onOpen(place)}>
            Ver recurso <ChevronRight size={16} />
          </button>
        </div>
        <button className="icon-ghost" aria-label={`Guardar ${place.name}`}>
          <Heart size={18} />
        </button>
      </div>
    </div>
  );
}
