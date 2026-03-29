import { ArrowLeft, ExternalLink, MapPin } from "lucide-react";
import type { Place } from "../types";
import { Badge } from "../components/Badge";

export default function PlaceDetailScreen({ place, onBack }: { place: Place; onBack: () => void }) {
  return (
    <div className="screen-grid">
      <div className="back-row">
        <button onClick={onBack} className="back-button">
          <ArrowLeft size={18} />
        </button>
      </div>

      <div className="info-grid">
        <div className="cp-card place-detail-card">
          <div className="place-detail-image" />
          <div className="place-detail-body">
            <div className="row wrap gap-sm">
              <Badge dark>{place.type}</Badge>
              <span className="meta">{place.area}</span>
            </div>
            <h1 className="place-detail-title">{place.name}</h1>
            <p className="place-detail-copy">{place.description}</p>
            <div className="place-detail-list">
              <div className="place-detail-item">
                <MapPin size={16} />
                <span>{place.address}</span>
              </div>
              <div className="place-detail-item">
                <ExternalLink size={16} />
                <span>{place.hours}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="cp-card">
          <div className="cp-card-inner compact">
            <div className="eyebrow">Ficha rápida</div>
            <p className="place-card-text">Información clara, pensada para consulta rápida y sin ruido.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
