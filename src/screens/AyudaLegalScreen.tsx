import { renderMd } from "../lib/renderMarkdown";
import { LegalFooterPills } from "../components/LegalFooterPills";

const CONTENT = `
# Soporte Legal

Cannaplan no ofrece asesoramiento jurídico personalizado. Esta sección resume el marco legal del cannabis en España como orientación general. Para consultas específicas, contacta con un abogado especializado.

## Marco legal en España

El cannabis en España se encuentra en una situación jurídica particular: su consumo y tenencia privados no son delito, pero su venta, tráfico y cultivo con fines comerciales están penados.

**Artículo 25.1 LOPSC (Ley de Seguridad Ciudadana):** la tenencia de drogas en la vía pública o en lugares visibles constituye infracción administrativa, no penal, y puede conllevar multa de entre 601 € y 30.000 €.

**Artículo 368 del Código Penal:** el tráfico, cultivo y elaboración de sustancias con fines de distribución a terceros es delito, con penas de prisión de 1 a 3 años y multa.

## Consumo personal y autoconsumo

El Tribunal Supremo ha establecido que el consumo privado en lugar cerrado no es delito. Para que exista presunción de autoconsumo, la cantidad debe ser reducida y no deben existir indicios de distribución.

No existe una cantidad legalmente establecida que marque el límite entre consumo personal y tráfico — la valoración es caso por caso.

## Clubs cannábicos

Los clubs cannábicos operan en una zona gris legal: no están regulados a nivel nacional, aunque algunas comunidades autónomas han impulsado normativas propias. Su actividad se fundamenta en:

- Consumo compartido entre adultos miembros
- Cultivo colectivo sin ánimo de lucro
- Distribución interna sin venta a terceros

Su funcionamiento puede ser cuestionado por las autoridades. Consulta la normativa de tu comunidad autónoma antes de afiliarte o fundar uno.

## Si la policía te para

- Tienes derecho a guardar silencio y a no declarar sin abogado.
- Puedes solicitar un abogado de oficio si no puedes permitirte uno privado.
- No estás obligado a permitir cacheos sin causa justificada, tu consentimiento o intervención judicial.
- Si te intervienen sustancias, exige el acta de intervención y conserva una copia.
- Nunca firmes documentos que no entiendas.

## Recursos y organizaciones

Para consultas legales concretas o apoyo, puedes contactar con:

- **ARSEC** — Asociación Ramón Santos de Estudios sobre el Cannabis
- **FAC** — Federación de Asociaciones Cannábicas
- **Energy Control** — reducción de riesgos y orientación
- Un abogado penalista especializado en drogas

## Aviso

La información de esta sección es de carácter divulgativo y puede no estar actualizada. Las leyes y su interpretación pueden cambiar. Cannaplan no asume responsabilidad por decisiones tomadas en base a este contenido.
`;

export default function AyudaLegalScreen({
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
              <LegalFooterPills onNavigate={onNavigate} current="legal-help" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
