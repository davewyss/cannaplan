import { ArrowLeft, Bookmark, Menu as MenuIcon, Share2 } from "lucide-react";

export function ArticleBottomBar({ onBack, onMenu }: { onBack: () => void; onMenu: () => void }) {
  return (
    <div className="bottom-nav-wrap">
      <div className="bottom-nav">
        <button onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Volver</span>
        </button>
        <button>
          <Bookmark size={18} />
          <span>Guardar</span>
        </button>
        <button>
          <Share2 size={18} />
          <span>Compartir</span>
        </button>
        <button onClick={onMenu}>
          <MenuIcon size={18} />
          <span>Menú</span>
        </button>
      </div>
    </div>
  );
}
