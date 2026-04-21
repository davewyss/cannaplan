import { renderMd } from "../lib/renderMarkdown";

// ── Content ───────────────────────────────────────────────────────────────────
// To connect a markdown editor or CMS in the future, replace this string
// with fetched content — no structural changes to this component needed.

const CONTENT = `
# Tus datos

*Última actualización: abril de 2026*

El Reglamento General de Protección de Datos (RGPD) te otorga una serie de derechos sobre tus datos personales. Aquí te explicamos cómo ejercerlos con Cannaplan.

## Tus derechos

**Derecho de acceso**
Puedes solicitar confirmación de si tratamos datos tuyos y, en su caso, obtener una copia de ellos.

**Derecho de rectificación**
Puedes pedirnos que corrijamos datos inexactos o incompletos que tengamos sobre ti.

**Derecho de supresión**
Puedes solicitar que eliminemos tus datos personales cuando, entre otros casos, ya no sean necesarios para la finalidad para la que fueron recogidos o hayas retirado tu consentimiento.

**Derecho a la limitación del tratamiento**
Puedes pedirnos que limitemos el uso de tus datos en determinadas circunstancias, por ejemplo mientras verificamos la exactitud de los datos.

**Derecho a la portabilidad**
Puedes solicitar recibir los datos que nos hayas proporcionado en un formato estructurado, de uso común y lectura mecánica.

**Derecho de oposición**
Puedes oponerte al tratamiento de tus datos cuando esté basado en nuestro interés legítimo.

**Retirada del consentimiento**
Si el tratamiento de tus datos se basa en tu consentimiento, puedes retirarlo en cualquier momento sin que ello afecte a la licitud del tratamiento previo.

Para retirar tu consentimiento sobre el uso de cookies, puedes hacerlo directamente desde la sección [Cookies](/legal/cookies) de la app.

## Cómo ejercer tus derechos

Escríbenos a [info@cannaplan.org](mailto:info@cannaplan.org) indicando:

- El derecho que deseas ejercer
- Tu nombre y un medio de contacto para responderte
- Cualquier detalle que nos ayude a identificar los datos en cuestión

Responderemos en un plazo máximo de **30 días** desde la recepción de tu solicitud. En casos complejos o ante un elevado número de solicitudes, podemos ampliar este plazo otros 60 días, informándote de ello.

## Reclamación ante la autoridad de control

Si consideras que el tratamiento de tus datos no se ajusta a la normativa vigente, tienes derecho a presentar una reclamación ante la autoridad de control competente en España:

**Agencia Española de Protección de Datos (AEPD)**
[www.aepd.es](https://www.aepd.es)

## Responsable del tratamiento

**Cannaplan**
CIF: G-24779738
Calle Miguel Hernández, 13, 28840 Mejorada del Campo, Madrid
[info@cannaplan.org](mailto:info@cannaplan.org)
`;

// ── Component ─────────────────────────────────────────────────────────────────

export default function DataAccessScreen({ onBack }: { onBack: () => void }) {
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
