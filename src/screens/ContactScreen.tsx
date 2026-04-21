import { useState } from "react";
import { renderMd } from "../lib/renderMarkdown";

const INTRO = `
# Contacto

¿Tienes alguna duda, sugerencia o quieres colaborar con Cannaplan? Escríbenos — estamos encantados de escucharte.

**Correo:** [info@cannaplan.org](mailto:info@cannaplan.org)
**Web:** [app.cannaplan.org](https://app.cannaplan.org)
`;

export default function ContactScreen({ onBack }: { onBack: () => void }) {
  const [sent, setSent] = useState(false);

  return (
    <div className="screen-grid">
      <div className="static-page-wrap">
        <div className="cp-card">
          <div className="cp-card-inner">
            <div
              className="article-content legal-page"
              dangerouslySetInnerHTML={{ __html: renderMd(INTRO) }}
            />

            {sent ? (
              <div className="contact-success">
                <span className="contact-success-icon">✓</span>
                <p>Mensaje enviado. Te responderemos en breve.</p>
              </div>
            ) : (
              <form
                className="contact-form"
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              >
                <div className="contact-form-row">
                  <label className="contact-label" htmlFor="cf-name">Nombre</label>
                  <input id="cf-name" className="contact-input" type="text" placeholder="Tu nombre" required />
                </div>

                <div className="contact-form-row">
                  <label className="contact-label" htmlFor="cf-email">Correo electrónico</label>
                  <input id="cf-email" className="contact-input" type="email" placeholder="tu@correo.com" required />
                </div>

                <div className="contact-form-row">
                  <label className="contact-label" htmlFor="cf-subject">Asunto</label>
                  <input id="cf-subject" className="contact-input" type="text" placeholder="¿Sobre qué nos escribes?" required />
                </div>

                <div className="contact-form-row">
                  <label className="contact-label" htmlFor="cf-msg">Mensaje</label>
                  <textarea id="cf-msg" className="contact-input contact-textarea" placeholder="Cuéntanos…" rows={5} required />
                </div>

                <button type="submit" className="contact-submit">Enviar mensaje</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
