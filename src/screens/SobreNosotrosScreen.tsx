import { renderMd } from "../lib/renderMarkdown";

const CONTENT = `
# Sobre Cannaplan

Cannaplan nació con una misión clara: crear la guía de referencia sobre cannabis en España. Una plataforma accesible, rigurosa y sin ánimo comercial que reúna información, recursos y orientación legal en un solo lugar.

## Qué hacemos

Publicamos contenido editorial sobre regulación, salud y novedades del sector cannábico. Mantenemos un directorio actualizado de asociaciones, dispensarios, médicos, abogados, farmacias y otros servicios en todo el territorio español. Ofrecemos orientación básica sobre el marco legal vigente y los derechos del usuario.

## Cómo lo hacemos

Trabajamos con fuentes verificadas, colaboramos con expertos del sector y mantenemos una política editorial independiente. No recibimos comisiones por incluir a ningún proveedor en nuestro directorio — si está aquí, es porque cumple criterios de utilidad para la comunidad.

## Quiénes somos

Somos un equipo pequeño con experiencia en tecnología, comunicación y el sector cannábico en España. Creemos en un enfoque informado, responsable y sin estigmas. El cannabis tiene un lugar en la conversación pública — y Cannaplan quiere ser esa conversación.

## Transparencia

Cannaplan es un proyecto independiente. Nos financiamos a través de espacios publicitarios y acuerdos de colaboración claramente identificados. Nunca confundiremos contenido editorial con publicidad.

## Únete

Si quieres colaborar, proponer un recurso para el directorio o escribir para Cannaplan, escríbenos a [info@cannaplan.org](mailto:info@cannaplan.org). También puedes seguirnos en Instagram [@cannaplan_app](https://www.instagram.com/cannaplan_app/).
`;

export default function SobreNosotrosScreen({ onBack }: { onBack: () => void }) {
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
