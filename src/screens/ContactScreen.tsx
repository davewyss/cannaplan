import { useEffect, useState } from "react";
import { getDocPageHtml } from "../contentApi";
import { Spinner } from "../components/Spinner";

const CONTACT_DOC_ID = (import.meta.env.VITE_CONTACT_DOC_ID as string | undefined) ?? "16Slf98nAp6GefxzUDouQWuThYiJ_IdmQfzydH3OJjtw";

export default function ContactScreen({ onBack }: { onBack: () => void }) {
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        setLoading(true);
        setError("");
        const nextHtml = await getDocPageHtml(CONTACT_DOC_ID ?? "");
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
<<<<<<< HEAD
              <div className="static-sub-section contact-form-wrap">
                <iframe
                  title="Contact Form"
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
=======
            </div>
          </div>
        )}

        <div className="contact-form-wrap">
          <iframe
            title="Contact Form"
            src="https://plugins.crisp.chat/urn:crisp.im:contact-form:0/contact/2c23d7c0-c6dd-42f4-b798-6f17a0f41dcc"
            referrerPolicy="origin"
            sandbox="allow-forms allow-popups allow-scripts allow-same-origin"
            width="100%"
            height="600px"
            frameBorder="0"
          />
        </div>
>>>>>>> 269eebf (map and more)
      </div>
    </div>
  );
}
