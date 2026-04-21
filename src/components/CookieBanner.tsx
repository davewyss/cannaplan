import { Shield } from "lucide-react";
import { useState } from "react";
import { acceptAll, getStoredPrefs, hasDecided, rejectAll, savePrefs } from "../lib/consent";
import type { ConsentPrefs } from "../lib/consent";

interface Props {
  onNavigateCookies: () => void;
  onNavigatePrivacy: () => void;
  forceShow?: boolean;
  onClose?: () => void;
}

export function CookieBanner({ onNavigateCookies, onNavigatePrivacy, forceShow, onClose }: Props) {
  const [visible, setVisible] = useState(() => !hasDecided());
  const [configOpen, setConfigOpen] = useState(false);
  const [prefs, setPrefs] = useState<ConsentPrefs>(() => ({
    analytics: getStoredPrefs()?.analytics ?? false,
    location:  getStoredPrefs()?.location  ?? false,
  }));

  const isVisible = visible || forceShow;
  if (!isVisible) return null;

  function close() {
    setVisible(false);
    onClose?.();
  }

  function handleAcceptAll() {
    acceptAll();
    close();
  }

  function handleRejectAll() {
    rejectAll();
    close();
  }

  function handleSavePrefs() {
    savePrefs(prefs);
    close();
  }

  return (
    <div className="cookie-popup-overlay">
      <div className="cookie-popup-card" role="dialog" aria-modal="true" aria-label="Configuración de cookies">

        {/* Icon */}
        <div className="cookie-popup-icon">
          <Shield size={26} strokeWidth={1.8} />
        </div>

        {/* Title */}
        <h2 className="cookie-popup-title">Cannaplan y las cookies</h2>

        {/* Body */}
        <p className="cookie-popup-body">
          Usamos cookies necesarias para que la app funcione. Con tu permiso, también usamos
          analítica para mejorarla y tu ubicación para mostrarte recursos cercanos en el mapa.
        </p>

        {/* Policy links */}
        <p className="cookie-popup-links">
          <button className="cookie-popup-link" onClick={onNavigateCookies}>Política de cookies</button>
          <span className="cookie-popup-link-sep">·</span>
          <button className="cookie-popup-link" onClick={onNavigatePrivacy}>Privacidad</button>
        </p>

        {/* Configurar panel */}
        {configOpen && (
          <div className="cookie-config-panel">

            {/* Necesarias — always on */}
            <div className="cookie-config-row">
              <div className="cookie-config-row-info">
                <span className="cookie-config-label">Necesarias</span>
                <span className="cookie-config-desc">
                  Imprescindibles para el funcionamiento básico. No se pueden desactivar.
                </span>
              </div>
              <div className="cookie-toggle cookie-toggle--locked" aria-label="Siempre activo">
                <span className="cookie-toggle-knob" />
              </div>
            </div>

            {/* Analytics */}
            <div className="cookie-config-row">
              <div className="cookie-config-row-info">
                <span className="cookie-config-label">Analítica</span>
                <span className="cookie-config-desc">
                  Google Analytics (GA4). Nos ayuda a entender cómo se usa la app. No identifica personas.
                </span>
              </div>
              <button
                className={"cookie-toggle" + (prefs.analytics ? " cookie-toggle--on" : "")}
                role="switch"
                aria-checked={prefs.analytics}
                aria-label="Activar analítica"
                onClick={() => setPrefs((p) => ({ ...p, analytics: !p.analytics }))}
              >
                <span className="cookie-toggle-knob" />
              </button>
            </div>

            {/* Location */}
            <div className="cookie-config-row">
              <div className="cookie-config-row-info">
                <span className="cookie-config-label">Ubicación</span>
                <span className="cookie-config-desc">
                  Para ordenar recursos por distancia en el mapa. Nunca se almacena ni comparte.
                </span>
              </div>
              <button
                className={"cookie-toggle" + (prefs.location ? " cookie-toggle--on" : "")}
                role="switch"
                aria-checked={prefs.location}
                aria-label="Activar ubicación"
                onClick={() => setPrefs((p) => ({ ...p, location: !p.location }))}
              >
                <span className="cookie-toggle-knob" />
              </button>
            </div>

          </div>
        )}

        {/* Actions */}
        <div className="cookie-popup-actions">
          {configOpen ? (
            <button className="geo-preprompt-allow" onClick={handleSavePrefs}>
              Guardar preferencias
            </button>
          ) : (
            <>
              <button className="geo-preprompt-allow" onClick={handleAcceptAll}>
                Aceptar todo
              </button>
              <button className="cookie-popup-secondary" onClick={() => setConfigOpen(true)}>
                Configurar
              </button>
              <button className="geo-preprompt-deny" onClick={handleRejectAll}>
                Rechazar
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
