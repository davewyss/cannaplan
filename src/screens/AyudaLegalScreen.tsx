import { useEffect, useState } from "react";
import { getDocPageHtml } from "../contentApi";
import { Spinner } from "../components/Spinner";

const LEGAL_HELP_DOC_ID = (import.meta.env.VITE_LEGAL_HELP_DOC_ID as string | undefined) ?? "1y2vRQfoX1Tf6lPrMcxe8ED_MfXXC9Mh2RCH0vch7Smg";

export default function AyudaLegalScreen({ onBack }: { onBack: () => void }) {
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        setError("");
        const nextHtml = await getDocPageHtml(LEGAL_HELP_DOC_ID ?? "");
        if (!active) return;
        setHtml(nextHtml);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "No se pudo cargar la página.");
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => { active = false; };
  }, []);

  return (
    <div className="screen-grid">
      <div className="static-page-wrap">
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="cp-card"><div className="cp-card-inner"><p className="static-page-status">{error}</p></div></div>
        ) : (
          <div className="cp-card">
            <div className="cp-card-inner">
              <div className="article-content" dangerouslySetInnerHTML={{ __html: html }} />
              <div className="static-sub-section contact-form-wrap">
                <iframe
                  title="Formulario de Contacto"
                  src="https://plugins.crisp.chat/urn:crisp.im:contact-form:0/contact/2c23d7c0-c6dd-42f4-b798-6f17a0f41dcc"
                  referrerPolicy="origin"
                  sandbox="allow-forms allow-popups allow-scripts allow-same-origin"
                  width="100%"
                  height="600px"
                  frameBorder="0"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
