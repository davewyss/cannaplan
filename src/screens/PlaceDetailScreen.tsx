import { Clock, ExternalLink, MapPin } from "lucide-react";
import type { Place } from "../types";

export default function PlaceDetailScreen({ place, onBack: _onBack }: { place: Place; onBack: () => void }) {
  return (
    <div className="screen-grid">
      <div className="cp-card place-detail-card">
        {place.imageUrl && (
          <img src={place.imageUrl} alt={place.name} className="place-detail-image-real" />
        )}
        <div className="place-detail-body">
          <div className="row wrap gap-sm" style={{ marginBottom: 4 }}>
            <span className="place-type-pill">{place.type}</span>
            {place.area && <span className="meta">{place.area}</span>}
          </div>
          <h1 className="place-detail-title">{place.name}</h1>
          {place.description && <p className="place-detail-copy">{place.description}</p>}

          <div className="place-detail-list">
            {place.address && (
              <div className="place-detail-item">
                <MapPin size={15} color="var(--cp-brand)" />
                <span>{place.address}</span>
              </div>
            )}
            {place.hours && (
              <div className="place-detail-item">
                <Clock size={15} color="var(--cp-brand)" />
                <span>{place.hours}</span>
              </div>
            )}
            {place.linkUrl && (
              <a
                href={place.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="place-detail-item place-detail-link"
              >
                <ExternalLink size={15} color="var(--cp-brand)" />
                <span>Sitio web</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
