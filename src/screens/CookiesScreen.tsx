import { renderMd } from "../lib/renderMarkdown";
import { LegalFooterPills } from "../components/LegalFooterPills";

// ── Content ───────────────────────────────────────────────────────────────────
// To connect a markdown editor or CMS in the future, replace these strings
// with fetched content — no structural changes to this component needed.
// The component renders CONTENT_TOP, then the manage-consent button, then CONTENT_BOTTOM.

const CONTENT_TOP = `
# Política de Cookies

*Última actualización: abril de 2026*

## ¿Qué son las cookies?

Las cookies son pequeños archivos de texto que los sitios web y aplicaciones guardan en tu dispositivo. Permiten que la app recuerde tus preferencias y analice cómo se usa el servicio.

## Cookies esenciales

Son imprescindibles para el funcionamiento básico de la app. No requieren tu consentimiento y no pueden desactivarse.

| Cookie | Proveedor | Finalidad | Duración |
|---|---|---|---|
| \`cp_install_dismissed\` | Cannaplan | Recuerda que cerraste el aviso de instalación | 24 horas |
| \`cp_install_done\` | Cannaplan | Registra que instalaste la app en tu pantalla de inicio | Indefinido |

## Cookies de analítica

Nos permiten entender cómo se utiliza la app de forma agregada y anónima. Solo se activan si das tu consentimiento.

| Cookie | Proveedor | Finalidad | Duración |
|---|---|---|---|
| \`_ga\` | Google Analytics (GA4) | Distingue usuarios únicos para análisis de uso | 2 años |
| \`_ga_*\` | Google Analytics (GA4) | Mantiene el estado de la sesión de análisis | 2 años |

**Sobre Google Analytics:** Google LLC es un proveedor externo que puede procesar datos fuera del Espacio Económico Europeo (EEE), incluidos Estados Unidos, bajo las Cláusulas Contractuales Tipo aprobadas por la Comisión Europea. Las cookies de analítica no se activan hasta que aceptas su uso. Consulta la política de privacidad de Google en [policies.google.com/privacy](https://policies.google.com/privacy).

## Cookies de preferencias

Guardan tus elecciones dentro de la app para que no tengas que repetirlas en cada visita.

| Cookie | Proveedor | Finalidad | Duración |
|---|---|---|---|
| \`cp_cookie_consent\` | Cannaplan | Guarda tu elección de consentimiento de cookies | 12 meses |

## Transferencias internacionales

Google Analytics puede implicar la transferencia de datos a servidores de Google LLC ubicados fuera del EEE. Estas transferencias se realizan bajo mecanismos de protección adecuados reconocidos por la normativa europea (Cláusulas Contractuales Tipo). Cannaplan no vende ni cede datos personales a terceros.

## Tipos de cookies según su duración

Las cookies pueden ser de sesión (se eliminan al cerrar el navegador o la app) o persistentes (permanecen en tu dispositivo durante el periodo indicado en las tablas anteriores, entre 24 horas y 2 años según el caso).

## Gestión del consentimiento

Puedes aceptar, rechazar o configurar el uso de cookies en cualquier momento. Tu elección se aplicará de forma inmediata y se guardará en tu dispositivo durante 12 meses.
`;

const CONTENT_BOTTOM = `
## Eliminar cookies desde el navegador

También puedes eliminar o bloquear las cookies directamente desde la configuración de tu navegador:

- [Google Chrome](https://support.google.com/chrome/answer/95647)
- [Mozilla Firefox](https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias)
- [Safari](https://support.apple.com/es-es/guide/safari/sfri11471/mac)
- [Microsoft Edge](https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d)

Ten en cuenta que desactivar ciertas cookies puede afectar al funcionamiento de la app.

## Contacto

Para cualquier consulta sobre el uso de cookies, escríbenos a [info@cannaplan.org](mailto:info@cannaplan.org).
`;

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  onBack: () => void;
  onManageConsent?: () => void;
  onNavigate?: (key: string) => void;
}

export default function CookiesScreen({ onBack, onManageConsent, onNavigate }: Props) {
  return (
    <div className="screen-grid">
      <div className="static-page-wrap">
        <div className="cp-card">
          <div className="cp-card-inner">
            <div className="article-content legal-page">
              <div dangerouslySetInnerHTML={{ __html: renderMd(CONTENT_TOP) }} />

              {onManageConsent && (
                <button className="cookie-manage-btn" onClick={onManageConsent}>
                  Gestionar mis preferencias
                </button>
              )}

              <div dangerouslySetInnerHTML={{ __html: renderMd(CONTENT_BOTTOM) }} />
            </div>
            {onNavigate && (
              <LegalFooterPills onNavigate={onNavigate} current="cookies" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
