import { useState } from "react";
import { acceptAll, getStoredPrefs, hasDecided, rejectAll, savePrefs } from "../lib/consent";
import type { ConsentPrefs } from "../lib/consent";

interface Props {
  onNavigateCookies: () => void;
  onNavigatePrivacy: () => void;
}

export function CookieBanner({ onNavigateCookies, onNavigatePrivacy }: Props) {
  const [visible, setVisible] = useState(() => !hasDecided());
  const [configOpen, setConfigOpen] = useState(false);
  const [prefs, setPrefs] = useState<ConsentPrefs>(() => ({
    analytics: getStoredPrefs()?.analytics ?? false,
    location:  getStoredPrefs()?.location  ?? false,
  }));

  if (!visible) return null;

  function handleAcceptAll() {
    acceptAll();
    setVisible(false);
  }

  function handleRejectAll() {
    rejectAll();
    setVisible(false);
  }

  function handleSavePrefs() {
    savePrefs(prefs);
    setVisible(false);
  }

  return (
    <div className="cookie-banner" role="dialog" aria-modal="true" aria-label="Configuración de cookies">
      <div className="cookie-banner-inner">

        {/* Text */}
        <div className="cookie-banner-text-wrap">
          <p className="cookie-banner-text">
            Usamos cookies y tecnologías similares para que Cannaplan funcione correctamente,
            analizar cómo se usa la app y mostrar recursos cercanos en el mapa — solo con tu permiso.
          </p>
          <p className="cookie-banner-links">
            <button className="cookie-banner-link" onClick={onNavigateCookies}>Política de cookies</button>
            <span className="cookie-banner-link-sep">·</span>
            <button className="cookie-banner-link" onClick={onNavigatePrivacy}>Privacidad</button>
          </p>
        </div>

        {/* Configurar panel */}
        {configOpen && (
          <div className="cookie-config-panel">

            {/* Necesarias — always on */}
            <div className="cookie-config-row">
              <div className="cookie-config-row-info">
                <span className="cookie-config-label">Necesarias</span>
                <span className="cookie-config-desc">
                  Imprescindibles para el funcionamiento básico de la app. No se pueden desactivar.
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
                  Google Analytics (GA4). Nos ayuda a entender cómo se usa la app para mejorarla.
                  No identifica a personas.
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
                  Usamos tu ubicación para ordenar recursos en el mapa por distancia.
                  Nunca se almacena ni comparte.
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

        {/* Action buttons */}
        <div className={"cookie-banner-actions" + (configOpen ? " cookie-banner-actions--config" : "")}>
          {configOpen ? (
            <button className="cookie-btn cookie-btn--accept" onClick={handleSavePrefs}>
              Guardar preferencias
            </button>
          ) : (
            <>
              <button className="cookie-btn cookie-btn--reject" onClick={handleRejectAll}>
                Rechazar
              </button>
              <button className="cookie-btn cookie-btn--config" onClick={() => setConfigOpen(true)}>
                Configurar
              </button>
              <button className="cookie-btn cookie-btn--accept" onClick={handleAcceptAll}>
                Aceptar todo
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
