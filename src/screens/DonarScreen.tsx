import { useEffect, useState } from "react";
import { getDocPageHtml } from "../contentApi";
import { Spinner } from "../components/Spinner";

const DONAR_DOC_ID = (import.meta.env.VITE_DONAR_DOC_ID as string | undefined) ?? "1JpKzsgjkZn7SHdegchs89gcN9E0nEjcML3h8DWbMcAQ";

export default function DonarScreen({ onBack }: { onBack: () => void }) {
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        setError("");
        const nextHtml = await getDocPageHtml(DONAR_DOC_ID ?? "");
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
    return () => {
      active = false;
    };
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
