import { MapPin } from "lucide-react";

interface Props {
  onAllow: () => void;
  onDeny: () => void;
}

export function GeoPrePrompt({ onAllow, onDeny }: Props) {
  return (
    <div className="geo-preprompt-overlay" onClick={onDeny}>
      <div className="geo-preprompt-card" onClick={(e) => e.stopPropagation()}>
        <div className="geo-preprompt-icon">
          <MapPin size={28} strokeWidth={1.8} />
        </div>

        <h2 className="geo-preprompt-title">
          Cannaplan quiere usar tu ubicación
        </h2>

        <p className="geo-preprompt-body">
          Usamos tu ubicación para mostrar recursos y servicios cercanos en el mapa.
        </p>

        <div className="geo-preprompt-actions">
          <button className="geo-preprompt-allow" onClick={onAllow}>
            Permitir
          </button>
          <button className="geo-preprompt-deny" onClick={onDeny}>
            No gracias
          </button>
        </div>
      </div>
    </div>
  );
}
