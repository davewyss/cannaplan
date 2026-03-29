import { ArrowLeft, Send } from "lucide-react";
import { Button } from "../components/Button";
import { SectionTitle } from "../components/SectionTitle";

export default function ContactScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="screen-grid">
      <div className="back-row">
        <button onClick={onBack} className="back-button">
          <ArrowLeft size={18} />
        </button>
      </div>

      <SectionTitle
        eyebrow="Contacto"
        title="Escríbenos"
        body="Una entrada clara para correcciones, sugerencias o nuevas ideas editoriales."
      />

      <div className="grid-2-main">
        <div className="cp-card">
          <div className="cp-card-inner">
            <h3 className="subsection-title">Qué puedes enviar</h3>
            <p className="body-copy">Nuevos recursos, cambios en una ficha, ideas editoriales o comentarios generales.</p>
            {["Sugerir un recurso", "Corregir una ficha", "Proponer un artículo", "Enviar comentarios"].map((item) => (
              <div key={item} className="pill-row">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="cp-card">
          <div className="cp-card-inner">
            {["Nombre", "Email", "Asunto"].map((placeholder) => (
              <input key={placeholder} placeholder={placeholder} className="field-input" />
            ))}
            <textarea placeholder="Cuéntanos un poco más..." className="field-textarea" />
            <Button primary>
              <Send size={14} />
              <span>Enviar</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
