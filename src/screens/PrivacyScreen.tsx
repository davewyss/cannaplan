import { renderMd } from "../lib/renderMarkdown";

// ── Content ───────────────────────────────────────────────────────────────────
// To connect a markdown editor or CMS in the future, replace this string
// with fetched content — no structural changes to this component needed.

const CONTENT = `
# Política de Privacidad

*Última actualización: abril de 2026*

## Responsable del tratamiento

**Cannaplan**
CIF: G-24779738
Calle Miguel Hernández, 13
28840 Mejorada del Campo, Madrid
[info@cannaplan.org](mailto:info@cannaplan.org)
[app.cannaplan.org](https://app.cannaplan.org)

## Qué datos tratamos y por qué

### Datos de uso y analítica

Con tu consentimiento, utilizamos **Google Analytics 4 (GA4)** para recopilar información agregada sobre cómo se navega por la app: páginas visitadas, duración de sesión y tipo de dispositivo. Esta información nos ayuda a mejorar la experiencia de usuario.

Base legal: consentimiento del interesado (Art. 6.1.a RGPD).

### Datos de ubicación

Si lo autorizas expresamente, accedemos a tu ubicación geográfica para ordenar los recursos del mapa por distancia. Tu ubicación no se almacena en nuestros servidores ni se comparte con terceros. Solo se procesa localmente en tu dispositivo durante la sesión.

Base legal: consentimiento del interesado (Art. 6.1.a RGPD).

### Comunicaciones por correo electrónico

Si nos escribes a través del formulario de contacto o directamente por email, tratamos tu dirección de correo y el contenido de tu mensaje para responder a tu consulta.

Base legal: interés legítimo / ejecución de un contrato (Art. 6.1.b y 6.1.f RGPD).

## Destinatarios y transferencias internacionales

Cannaplan utiliza los siguientes proveedores que pueden acceder a datos de uso:

**Google LLC** — proveedor de Google Analytics 4. Google puede procesar datos en servidores ubicados fuera del Espacio Económico Europeo (EEE), incluidos Estados Unidos. Esta transferencia se realiza bajo las Cláusulas Contractuales Tipo (CCT) aprobadas por la Comisión Europea. Consulta la política de privacidad de Google en [policies.google.com/privacy](https://policies.google.com/privacy).

No vendemos, cedemos ni comercializamos datos personales a terceros.

## Conservación

- **Datos analíticos (GA4):** Google Analytics conserva los datos durante 13 meses por defecto.
- **Comunicaciones por email:** hasta que la consulta quede resuelta, más un máximo de 12 meses adicionales.
- **Preferencias de cookies:** tu elección se guarda en tu dispositivo durante 12 meses.
- **Datos de ubicación:** no se almacenan. Se procesan únicamente en tiempo real durante tu sesión.

## Tus derechos

De acuerdo con el RGPD y la normativa española vigente, tienes derecho a:

- **Acceso:** saber qué datos tuyos tratamos.
- **Rectificación:** corregir datos inexactos o incompletos.
- **Supresión:** solicitar que eliminemos tus datos («derecho al olvido»).
- **Limitación:** restringir el tratamiento en determinadas circunstancias.
- **Portabilidad:** recibir tus datos en un formato estructurado y de uso común.
- **Oposición:** oponerte al tratamiento basado en interés legítimo.
- **Retirada del consentimiento:** puedes retirar tu consentimiento en cualquier momento, sin que ello afecte a la licitud del tratamiento previo. Puedes hacerlo desde la sección [Cookies](/legal/cookies) de la app.

Para ejercer cualquiera de estos derechos, escríbenos a [info@cannaplan.org](mailto:info@cannaplan.org). Responderemos en un plazo máximo de 30 días.

Si consideras que el tratamiento de tus datos no es conforme a la normativa, puedes presentar una reclamación ante la [Agencia Española de Protección de Datos (AEPD)](https://www.aepd.es).

## Cookies

Utilizamos cookies propias y de terceros. Consulta todos los detalles en nuestra [Política de cookies](/legal/cookies).

## Seguridad

Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos frente a accesos no autorizados, pérdida o alteración.

## Cambios en esta política

Podemos actualizar esta política ocasionalmente. Si los cambios son significativos, lo comunicaremos de forma visible en la app. La fecha de última actualización aparece al inicio de este documento.
`;

// ── Component ─────────────────────────────────────────────────────────────────

export default function PrivacyScreen({ onBack }: { onBack: () => void }) {
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
