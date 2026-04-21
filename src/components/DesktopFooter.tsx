import { Instagram, ShieldCheck } from "lucide-react";
import { useNavigate } from "../router";

const NAV_LINKS = [
  { label: "Inicio",      path: "/"                    },
  { label: "Artículos",   path: "/articulos"            },
  { label: "Mapa",        path: "/mapa"                 },
  { label: "Soporte Legal", path: "/menu/ayuda-legal"   },
  { label: "Contacto",    path: "/menu/contacto"        },
  { label: "Nosotros",    path: "/menu/sobre-nosotros"  },
] as const;

const LEGAL_LINKS = [
  { label: "Sobre la app", path: "/sobre-app"          },
  { label: "Privacidad",   path: "/legal/privacidad"   },
  { label: "Cookies",      path: "/legal/cookies"      },
  { label: "Aviso legal",  path: "/legal/terminos"     },
  { label: "Datos",        path: "/legal/acceso-datos" },
] as const;

const year = new Date().getFullYear();

export function DesktopFooter({ onManageConsent }: { onManageConsent?: () => void }) {
  const navigate = useNavigate();

  return (
    <footer className="desktop-footer">
      <div className="desktop-footer-inner">

        {/* Top row: brand + nav links */}
        <div className="desktop-footer-top">
          <div className="desktop-footer-brand">
            <img
              src="/logo_reverse_512.png"
              alt="Cannaplan"
              className="desktop-footer-logo"
              width="44"
              height="44"
            />
            <div>
              <div className="desktop-footer-title">Cannaplan</div>
              <div className="desktop-footer-tagline">
                Recursos y servicios de confianza sobre cannabis
              </div>
            </div>
          </div>

          <nav className="desktop-footer-nav">
            {NAV_LINKS.map(({ label, path }) => (
              <button key={path} className="desktop-footer-nav-link" onClick={() => navigate(path)}>
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="desktop-footer-divider" />

        {/* Bottom row: pills + social + copyright */}
        <div className="desktop-footer-bottom">
          <div className="desktop-footer-pills">
            {LEGAL_LINKS.map(({ label, path }) => (
              <button key={path} className="desktop-footer-pill" onClick={() => navigate(path)}>
                {label}
              </button>
            ))}
            {onManageConsent && (
              <button
                className="desktop-footer-pill desktop-footer-pill--privacy"
                onClick={onManageConsent}
              >
                <ShieldCheck size={11} />
                Gestionar cookies
              </button>
            )}
          </div>

          <div className="desktop-footer-right">
            <a
              href="https://www.instagram.com/cannaplan_app/"
              target="_blank"
              rel="noopener noreferrer"
              className="desktop-footer-social"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <span className="desktop-footer-copy">© {year} Cannaplan</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
