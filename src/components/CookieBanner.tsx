import { useState } from "react";
import { acceptConsent, getStoredConsent, rejectConsent } from "../lib/consent";

export function CookieBanner({ onNavigateCookies }: { onNavigateCookies: () => void }) {
  const [visible, setVisible] = useState(() => getStoredConsent() === null);

  if (!visible) return null;

  function handleAccept() {
    acceptConsent();
    setVisible(false);
  }

  function handleReject() {
    rejectConsent();
    setVisible(false);
  }

  return (
    <div className="cookie-banner" role="dialog" aria-label="Configuración de cookies">
      <div className="cookie-banner-inner">
        <p className="cookie-banner-text">
          Usamos cookies necesarias para que Cannaplan funcione. Con tu permiso, nos gustaría usar
          analítica para entender cómo se usa la app y mejorarla.{" "}
          <button className="cookie-banner-link" onClick={onNavigateCookies}>
            Política de cookies
          </button>
        </p>
        <div className="cookie-banner-actions">
          <button className="cookie-banner-reject" onClick={handleReject}>
            Solo necesarias
          </button>
          <button className="cookie-banner-accept" onClick={handleAccept}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
