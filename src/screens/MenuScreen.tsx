import { ChevronRight, House, Info, MapPin, Newspaper, Scale, Send } from "lucide-react";

type Target = "home" | "map" | "news" | "legal-help" | "contact" | "about" | "privacy" | "cookies" | "terms" | "data-access" | "sobre-app";

const items = [
  { key: "home" as const, label: "Inicio", icon: House },
  { key: "map" as const, label: "Mapa", icon: MapPin },
  { key: "news" as const, label: "Artículos", icon: Newspaper },
  { key: "legal-help" as const, label: "Ayuda legal", icon: Scale },
  { key: "contact" as const, label: "Contacto", icon: Send },
  { key: "about" as const, label: "Sobre nosotros", icon: Info },
];

const footerItems = [
  { key: "sobre-app" as const, label: "Sobre la app" },
  { key: "privacy" as const, label: "Privacidad" },
  { key: "cookies" as const, label: "Cookies" },
  { key: "terms" as const, label: "Aviso legal" },
  { key: "data-access" as const, label: "Datos" },
];

const year = new Date().getFullYear();

export default function MenuScreen({ onOpen }: { onOpen: (target: Target) => void }) {
  return (
    <div className="screen-grid">
      <div className="menu-grid">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.key} onClick={() => onOpen(item.key)} className="menu-item-card">
              <div className="menu-item-main">
                <div className="menu-item-icon">
                  <Icon size={18} color="var(--cp-brand)" />
                </div>
                <div className="menu-item-label">{item.label}</div>
              </div>
              <ChevronRight size={18} color="var(--cp-navy)" />
            </button>
          );
        })}
      </div>
      <div className="menu-footer">
        <div className="menu-footer-pills">
          {footerItems.map((item) => (
            <button key={item.key} onClick={() => onOpen(item.key)} className="menu-footer-pill">
              {item.label}
            </button>
          ))}
        </div>
        <div className="menu-copyright">© {year} Cannaplan</div>
      </div>
    </div>
  );
}
