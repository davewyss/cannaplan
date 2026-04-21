interface Props {
  onBack: () => void;
  onManageConsent?: () => void;
}

export default function CookiesScreen({ onBack, onManageConsent }: Props) {
  const updated = "Abril 2026";

  return (
    <div className="screen-grid">
      <div className="static-page-wrap">
        <div className="cp-card">
          <div className="cp-card-inner">
            <div className="article-content legal-page">

              <h1>Política de Cookies</h1>
              <p className="legal-updated">Última actualización: {updated}</p>

              {/* What are cookies */}
              <h2>¿Qué son las cookies?</h2>
              <p>
                Las cookies son pequeños archivos de texto que los sitios web y aplicaciones
                guardan en tu dispositivo. Permiten que la app recuerde tus preferencias y
                analice cómo se usa el servicio.
              </p>

              {/* Categories */}
              <h2>Categorías de cookies que utilizamos</h2>

              <h3>🔒 Cookies esenciales</h3>
              <p>
                Son imprescindibles para el funcionamiento básico de la app. No requieren tu
                consentimiento y no pueden desactivarse.
              </p>
              <div className="cookie-table-wrap">
                <table className="cookie-table">
                  <thead>
                    <tr>
                      <th>Cookie</th>
                      <th>Proveedor</th>
                      <th>Finalidad</th>
                      <th>Duración</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>cp_install_dismissed</code></td>
                      <td>Cannaplan</td>
                      <td>Recuerda que cerraste el aviso de instalación de la app</td>
                      <td>24 horas</td>
                    </tr>
                    <tr>
                      <td><code>cp_install_done</code></td>
                      <td>Cannaplan</td>
                      <td>Registra que instalaste la app en tu pantalla de inicio</td>
                      <td>Indefinido</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>📊 Cookies de analítica</h3>
              <p>
                Nos permiten entender cómo se utiliza la app de forma agregada y anónima.
                Solo se activan si das tu consentimiento explícito.
              </p>
              <div className="cookie-table-wrap">
                <table className="cookie-table">
                  <thead>
                    <tr>
                      <th>Cookie</th>
                      <th>Proveedor</th>
                      <th>Finalidad</th>
                      <th>Duración</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>_ga</code></td>
                      <td>Google Analytics (GA4)</td>
                      <td>Distingue usuarios únicos para análisis de uso</td>
                      <td>2 años</td>
                    </tr>
                    <tr>
                      <td><code>_ga_*</code></td>
                      <td>Google Analytics (GA4)</td>
                      <td>Mantiene el estado de la sesión de análisis</td>
                      <td>2 años</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                <strong>Nota sobre Google Analytics:</strong> Google LLC es un tercero que puede
                procesar datos fuera del Espacio Económico Europeo (EEE), incluidos Estados Unidos,
                bajo las Cláusulas Contractuales Tipo aprobadas por la Comisión Europea. Las cookies
                de analítica no se activan hasta que aceptas su uso. Puedes consultar la política
                de privacidad de Google en{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                  policies.google.com/privacy
                </a>.
              </p>

              <h3>⚙️ Cookies de preferencias</h3>
              <p>
                Guardan tus elecciones dentro de la app para que no tengas que repetirlas
                en cada visita.
              </p>
              <div className="cookie-table-wrap">
                <table className="cookie-table">
                  <thead>
                    <tr>
                      <th>Cookie</th>
                      <th>Proveedor</th>
                      <th>Finalidad</th>
                      <th>Duración</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>cp_cookie_consent</code></td>
                      <td>Cannaplan</td>
                      <td>Guarda tu elección de consentimiento de cookies</td>
                      <td>12 meses</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Transfers */}
              <h2>Transferencias internacionales</h2>
              <p>
                Google Analytics puede implicar la transferencia de datos a servidores de
                Google LLC ubicados fuera del EEE. Estas transferencias se realizan bajo
                mecanismos de protección adecuados reconocidos por la normativa europea
                (Cláusulas Contractuales Tipo).
              </p>
              <p>
                Cannaplan no vende ni cede datos personales a terceros para fines publicitarios.
              </p>

              {/* Cookie duration types */}
              <h2>Tipos de cookies según su duración</h2>
              <ul>
                <li>
                  <strong>De sesión:</strong> se eliminan automáticamente al cerrar el navegador
                  o la app.
                </li>
                <li>
                  <strong>Persistentes:</strong> permanecen en tu dispositivo durante el periodo
                  indicado en la tabla (entre 24 horas y 2 años según el caso).
                </li>
              </ul>

              {/* Consent management */}
              <h2>Gestión del consentimiento</h2>
              <p>
                Puedes aceptar, rechazar o configurar el uso de cookies en cualquier momento.
                Tu elección se aplicará de forma inmediata y se guardará en tu dispositivo.
              </p>
              <p>
                Para cambiar tus preferencias ahora, pulsa el botón de abajo:
              </p>

              {onManageConsent && (
                <button className="cookie-manage-btn" onClick={onManageConsent}>
                  Gestionar mis preferencias
                </button>
              )}

              <h2>Eliminar cookies desde el navegador</h2>
              <p>
                También puedes eliminar o bloquear las cookies directamente desde la
                configuración de tu navegador:
              </p>
              <ul>
                <li>
                  <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer">
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">
                    Safari
                  </a>
                </li>
                <li>
                  <a href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer">
                    Microsoft Edge
                  </a>
                </li>
              </ul>
              <p>
                Ten en cuenta que desactivar ciertas cookies puede afectar al funcionamiento
                de la app.
              </p>

              {/* Contact */}
              <h2>Contacto</h2>
              <p>
                Si tienes alguna pregunta sobre el uso de cookies, escríbenos a{" "}
                <a href="mailto:drcwyss@gmail.com">drcwyss@gmail.com</a>.
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
