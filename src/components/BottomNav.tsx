import { House, MapPin, Menu as MenuIcon, Newspaper } from "lucide-react";
import { memo } from "react";
import { useLocation, useNavigate } from "../router";

const items = [
  { key: "home",     label: "Inicio",    icon: House,     path: "/"         },
  { key: "articles", label: "Artículos", icon: Newspaper, path: "/articulos" },
  { key: "map",      label: "Mapa",      icon: MapPin,    path: "/mapa"      },
  { key: "menu",     label: "Menú",      icon: MenuIcon,  path: "/menu"      },
] as const;

function BottomNavComponent() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="bottom-nav-wrap">
      <nav className="bottom-nav" aria-label="Navegación principal">
        {items.map(({ key, label, icon: Icon, path }) => (
          <button key={key} onClick={() => navigate(path)}>
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

// pathname used only to trigger re-render on route change (no active highlight by design)
export const BottomNav = memo(BottomNavComponent);
