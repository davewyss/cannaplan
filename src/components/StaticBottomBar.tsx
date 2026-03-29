import { ArrowLeft, House, Menu as MenuIcon, Newspaper } from "lucide-react";

export function StaticBottomBar({
  onBack,
  onHome,
  onArticles,
  onMenu,
}: {
  onBack: () => void;
  onHome: () => void;
  onArticles: () => void;
  onMenu: () => void;
}) {
  return (
    <div className="bottom-nav-wrap">
      <div className="bottom-nav">
        <button onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Volver</span>
        </button>
        <button onClick={onHome}>
          <House size={18} />
          <span>Inicio</span>
        </button>
        <button onClick={onArticles}>
          <Newspaper size={18} />
          <span>Artículos</span>
        </button>
        <button onClick={onMenu}>
          <MenuIcon size={18} />
          <span>Menú</span>
        </button>
      </div>
    </div>
  );
}
