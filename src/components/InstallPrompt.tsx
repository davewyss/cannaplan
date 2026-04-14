import { useEffect, useState } from "react";
import { X } from "lucide-react";

const DISMISSED_KEY = "cp_install_dismissed";
const INSTALLED_KEY  = "cp_install_done";
const COOLDOWN_MS    = 24 * 60 * 60 * 1000; // 24 hours

function shouldShow(): boolean {
  if (localStorage.getItem(INSTALLED_KEY)) return false;
  const last = localStorage.getItem(DISMISSED_KEY);
  if (!last) return true;
  return Date.now() - Number(last) > COOLDOWN_MS;
}

function recordDismiss()   { localStorage.setItem(DISMISSED_KEY, String(Date.now())); }
function recordInstalled() { localStorage.setItem(INSTALLED_KEY, "1"); }

function isIos(): boolean {
  return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
}

/** Safari on iOS — has the share sheet with "Add to Home Screen". */
function isIosSafari(): boolean {
  const ua = window.navigator.userAgent.toLowerCase();
  const isIos = /iphone|ipad|ipod/.test(ua);
  const isSafari = !ua.includes("crios") && !ua.includes("fxios");
  return isIos && isSafari;
}

function isInStandaloneMode(): boolean {
  return (
    (window.navigator as unknown as Record<string, unknown>).standalone === true ||
    window.matchMedia("(display-mode: standalone)").matches
  );
}

function ShareIcon() {
  return (
    <span className="install-share-inline" aria-label="botón compartir">
      <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 1v11M4 4l4-3 4 3M1 13v3.5a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5V13"
          stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  );
}

export function InstallPrompt() {
  const [showIos, setShowIos]         = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<Event & {
    prompt: () => void;
    userChoice: Promise<{ outcome: string }>;
  } | null>(null);
  const [showAndroid, setShowAndroid] = useState(false);

  useEffect(() => {
    if (isInStandaloneMode()) return;
    if (!shouldShow()) return;

    let captured: typeof deferredPrompt = null;

    function handleBeforeInstall(e: Event) {
      e.preventDefault();
      captured = e as typeof deferredPrompt;
      setDeferredPrompt(captured);
    }
    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    function handleTrigger() {
      if (isIos()) {  // Safari, Chrome, or Firefox on iOS
        setShowIos(true);
      } else if (captured) {
        setShowAndroid(true);
      }
    }
    window.addEventListener("cp:install-trigger", handleTrigger);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("cp:install-trigger", handleTrigger);
    };
  }, []);

  function dismiss() {
    recordDismiss();
    setShowIos(false);
    setShowAndroid(false);
  }

  async function handleAddIos() {
    // Opens the native share sheet on all iOS browsers (Safari, Chrome, Firefox)
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Cannaplan",
          url: window.location.href,
        });
      } catch {
        // User cancelled share sheet — keep modal open
        return;
      }
    }
    dismiss();
  }

  async function handleInstallAndroid() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") recordInstalled();
    setDeferredPrompt(null);
    setShowAndroid(false);
  }

  // ── iOS modal ─────────────────────────────────────────────────────────────
  if (showIos) {
    const isSafari = isIosSafari();

    return (
      <div className="install-modal-overlay" onClick={dismiss}>
        <div className="install-modal-card" onClick={(e) => e.stopPropagation()}>
          <div className="install-modal-emoji">✨📱</div>

          <h2 className="install-modal-title">Consigue la mejor experiencia</h2>

          <p className="install-modal-body">
            {isSafari ? (
              <>
                Pulsa <ShareIcon /> y selecciona{" "}
                <strong>«Añadir a Pantalla de Inicio»</strong>.
              </>
            ) : (
              <>
                Abre el menú de opciones y selecciona{" "}
                <strong>«Añadir a Pantalla de Inicio»</strong>.
              </>
            )}
          </p>

          {isSafari ? (
            <div className="install-modal-actions">
              <button className="install-modal-cta" onClick={handleAddIos}>
                Añadir
              </button>
              <button className="install-modal-secondary" onClick={dismiss}>
                Cerrar
              </button>
            </div>
          ) : (
            <button className="install-modal-cta" onClick={dismiss}>
              Entendido
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── Android / Chrome banner ───────────────────────────────────────────────
  if (showAndroid) {
    return (
      <div className="install-android-banner">
        <img src="/logo_reverse_512.png" alt="Cannaplan" className="install-app-icon" />
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
