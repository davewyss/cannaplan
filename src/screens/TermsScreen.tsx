import { renderMd } from "../lib/renderMarkdown";
import { LegalFooterPills } from "../components/LegalFooterPills";

// ── Content ───────────────────────────────────────────────────────────────────
// To connect a markdown editor or CMS in the future, replace this string
// with fetched content — no structural changes to this component needed.

const CONTENT = `
# Aviso Legal

*Última actualización: abril de 2026*

## Datos identificativos

En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se facilitan los siguientes datos:

**Denominación social:** Cannaplan
**CIF:** G-24779738
**Domicilio social:** Calle Miguel Hernández, 13, 28840 Mejorada del Campo, Madrid
**Correo electrónico:** [info@cannaplan.org](mailto:info@cannaplan.org)
**Sitio web:** [app.cannaplan.org](https://app.cannaplan.org)

## Objeto

Cannaplan es una aplicación informativa sobre cannabis en España. Los contenidos publicados tienen carácter exclusivamente divulgativo e informativo. Cannaplan no vende productos, no promueve el consumo de sustancias y no presta servicios jurídicos, médicos ni sanitarios.

La orientación legal incluida en la app tiene únicamente carácter informativo general. No sustituye en ningún caso el asesoramiento de un profesional cualificado.

## Condiciones de uso

El acceso y uso de la app implica la aceptación de las presentes condiciones. El usuario se compromete a hacer un uso lícito y adecuado de los contenidos y servicios ofrecidos.

Queda prohibido el uso de la app con fines ilícitos o contrarios a la ley, al orden público o a la moral.

## Propiedad intelectual e industrial

Los contenidos de Cannaplan — textos, imágenes, logotipos, diseño y código — son propiedad de Cannaplan o de sus respectivos autores, y están protegidos por la legislación española e internacional sobre propiedad intelectual e industrial.

Queda prohibida su reproducción, distribución, comunicación pública o transformación sin autorización expresa y por escrito.

## Limitación de responsabilidad

Cannaplan no garantiza la exactitud, exhaustividad o actualidad de los contenidos. La información publicada puede quedar desactualizada como consecuencia de cambios normativos o de otra índole.

Cannaplan no se hace responsable de los daños derivados del uso de la app, de errores u omisiones en los contenidos, ni de los contenidos de sitios externos a los que se pueda acceder mediante enlaces.

## Protección de datos

El tratamiento de los datos personales de los usuarios se detalla en la [Política de privacidad](/legal/privacidad).

## Legislación aplicable y jurisdicción

Las presentes condiciones se rigen por la legislación española. Para la resolución de cualquier controversia, las partes se someten a los juzgados y tribunales de Madrid, salvo que la normativa aplicable establezca otro fuero.
`;

// ── Component ─────────────────────────────────────────────────────────────────

export default function TermsScreen({
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
            <div
              className="article-content legal-page"
              dangerouslySetInnerHTML={{ __html: renderMd(CONTENT) }}
            />
            {onNavigate && (
              <LegalFooterPills onNavigate={onNavigate} current="terms" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
