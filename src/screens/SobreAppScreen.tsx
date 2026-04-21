import { LegalFooterPills } from "../components/LegalFooterPills";

// ── Component ─────────────────────────────────────────────────────────────────

export default function SobreAppScreen({
  onBack,
  onNavigate,
}: {
  onBack: () => void;
  onNavigate?: (key: string) => void;
}) {
  return (
    <div className="screen-grid">
      <div className="static-page-wrap">
        <div className="cp-card">
          <div className="cp-card-inner">
            <div className="article-content legal-page">
              <h1>Sobre la app</h1>
              <p>
                Cannaplan es una aplicación informativa sobre cannabis en España: artículos de
                divulgación, un directorio de recursos y servicios, y orientación legal básica, todo
                en un solo lugar accesible desde cualquier dispositivo. No es una tienda, no vende
                productos y no promueve el consumo.
              </p>
              <p className="legal-meta">v0.1.0 · <a href="mailto:info@cannaplan.org">info@cannaplan.org</a></p>
            </div>
            {onNavigate && (
              <LegalFooterPills onNavigate={onNavigate} current="sobre-app" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
