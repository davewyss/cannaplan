import { House, MapPin, Menu as MenuIcon, Newspaper } from "lucide-react";
import { memo } from "react";
import type { TabKey } from "../types";

const items = [
  { key: "home" as const, label: "Inicio", icon: House },
  { key: "articles" as const, label: "Artículos", icon: Newspaper },
  { key: "map" as const, label: "Mapa", icon: MapPin },
  { key: "menu" as const, label: "Menú", icon: MenuIcon },
];

function BottomNavComponent({ activeTab, onChange }: { activeTab: TabKey; onChange: (tab: TabKey) => void }) {
  return (
    <div className="bottom-nav-wrap">
      <nav className="bottom-nav" aria-label="Navegación principal">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.key} onClick={() => onChange(item.key)} className={activeTab === item.key ? "active" : ""}>
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export const BottomNav = memo(BottomNavComponent);
