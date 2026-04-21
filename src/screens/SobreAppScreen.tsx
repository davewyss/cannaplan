import { renderMd } from "../lib/renderMarkdown";

// ── Content ───────────────────────────────────────────────────────────────────
// To connect a markdown editor or CMS in the future, replace this string
// with fetched content — no structural changes to this component needed.

const CONTENT = `
# Sobre Cannaplan

Cannaplan es una aplicación informativa sobre cannabis en España. Reúne artículos de divulgación, un directorio de recursos y servicios, y orientación legal básica en un solo lugar accesible desde cualquier dispositivo.

## Para qué sirve

La app está pensada para personas que buscan información fiable y actualizada sobre el cannabis en el contexto español: normativa vigente, asociaciones, recursos de salud, farmacias y otros servicios relacionados.

No es una tienda, no vende productos y no promueve el consumo. Es una herramienta de información y orientación.

## Qué encontrarás

**Artículos** — contenido editorial sobre regulación, salud, novedades y contexto del cannabis en España.

**Mapa de recursos** — directorio interactivo con asociaciones, dispensarios, médicos, abogados, farmacias y otros servicios localizados en el territorio nacional.

**Ayuda legal** — orientación básica sobre el marco legal del cannabis en España, incluyendo derechos y situaciones frecuentes.

## Cómo funciona

Cannaplan funciona como una aplicación web progresiva (PWA). Puedes usarla directamente desde el navegador o instalarla en tu pantalla de inicio para acceso rápido sin necesidad de descargarla desde una tienda de apps.

## Contacto

Para cualquier consulta sobre la app, escríbenos a [info@cannaplan.org](mailto:info@cannaplan.org) o visítanos en [app.cannaplan.org](https://app.cannaplan.org).
`;

// ── Component ─────────────────────────────────────────────────────────────────

export default function SobreAppScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="screen-grid">
      <div className="static-page-wrap">
        <div className="cp-card">
          <div className="cp-card-inner">
            <div
              className="article-content legal-page"
              dangerouslySetInnerHTML={{ __html: renderMd(CONTENT) }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
