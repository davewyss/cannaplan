import { useEffect, useState } from "react";
import { X } from "lucide-react";

const DISMISSED_KEY = "cp_install_dismissed";

function isIosSafari(): boolean {
  const ua = window.navigator.userAgent.toLowerCase();
  const isIos = /iphone|ipad|ipod/.test(ua);
  // Exclude Chrome on iOS (which can't install PWAs via this method)
  const isSafari = !ua.includes("crios") && !ua.includes("fxios");
  return isIos && isSafari;
}

function isInStandaloneMode(): boolean {
  return (
    (window.navigator as unknown as Record<string, unknown>).standalone === true ||
    window.matchMedia("(display-mode: standalone)").matches
  );
}

export function InstallPrompt() {
  const [showIos, setShowIos] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<Event & { prompt: () => void; userChoice: Promise<{ outcome: string }> } | null>(null);
  const [showAndroid, setShowAndroid] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DISMISSED_KEY)) return;
    if (isInStandaloneMode()) return;

    // iOS: show after a short delay so the app feels settled
    if (isIosSafari()) {
      const t = setTimeout(() => setShowIos(true), 3000);
      return () => clearTimeout(t);
    }

    // Chrome / Android / Chromium: listen for browser install event
    function handleBeforeInstall(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as typeof deferredPrompt);
      setShowAndroid(true);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  function dismiss() {
    localStorage.setItem(DISMISSED_KEY, "1");
    setShowIos(false);
    setShowAndroid(false);
  }

  async function handleInstallAndroid() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      localStorage.setItem(DISMISSED_KEY, "1");
    }
    setDeferredPrompt(null);
    setShowAndroid(false);
  }

  // ── iOS bottom sheet ──────────────────────────────────────
  if (showIos) {
    return (
      <div className="install-ios-sheet">
        <button className="install-dismiss" onClick={dismiss} aria-label="Cerrar">
          <X size={16} />
        </button>
        <div className="install-ios-inner">
          <img src="/apple-touch-icon.png" alt="Cannaplan" className="install-app-icon" />
          <div className="install-ios-text">
            <div className="install-ios-title">Añadir a inicio</div>
            <div className="install-ios-desc">
              Toca el botón{" "}
              <span className="install-share-icon" aria-label="Compartir">
                {/* iOS share icon inline SVG */}
                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 1v9M3.5 4L7 1l3.5 3M1 11v3.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>{" "}
              y luego <strong>«Añadir a pantalla de inicio»</strong>
            </div>
          </div>
        </div>
        <div className="install-ios-arrow" />
      </div>
    );
  }

  // ── Android / Chrome install banner ──────────────────────
  if (showAndroid) {
    return (
      <div className="install-android-banner">
        <img src="/apple-touch-icon.png" alt="Cannaplan" className="install-app-icon" />
        <div className="install-android-text">
          <div className="install-android-title">Instalar Cannaplan</div>
          <div className="install-android-desc">Acceso rápido desde tu pantalla de inicio</div>
        </div>
        <button className="install-android-btn" onClick={handleInstallAndroid}>
          Instalar
        </button>
        <button className="install-dismiss" onClick={dismiss} aria-label="Cerrar">
          <X size={16} />
        </button>
      </div>
    );
  }

  return null;
}
