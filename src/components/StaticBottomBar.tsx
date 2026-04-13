import { ArrowLeft, House, Menu as MenuIcon, Newspaper } from "lucide-react";
import { useNavigate } from "../router";

export function StaticBottomBar() {
  const navigate = useNavigate();

  return (
    <div className="bottom-nav-wrap">
      <div className="bottom-nav">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          <span>Volver</span>
        </button>
        <button onClick={() => navigate("/")}>
          <House size={18} />
          <span>Inicio</span>
        </button>
        <button onClick={() => navigate("/articulos")}>
          <Newspaper size={18} />
          <span>Artículos</span>
        </button>
        <button onClick={() => navigate("/menu")}>
          <MenuIcon size={18} />
          <span>Menú</span>
        </button>
      </div>
    </div>
  );
}
