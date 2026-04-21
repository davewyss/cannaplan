export default function PrivacyScreen({ onBack }: { onBack: () => void }) {
  const updated = "Abril 2026";

  return (
    <div className="screen-grid">
      <div className="static-page-wrap">
        <div className="cp-card">
          <div className="cp-card-inner">
            <div className="article-content legal-page">

              <h1>Política de Privacidad</h1>
              <p className="legal-updated">Última actualización: {updated}</p>

              {/* 1 */}
              <h2>1. Responsable del tratamiento</h2>
              <p>
                El responsable del tratamiento de los datos personales recogidos a través de
                Cannaplan es <strong>Dave Wyss</strong> (en adelante, «Cannaplan»), contactable
                en <a href="mailto:drcwyss@gmail.com">drcwyss@gmail.com</a>.
              </p>

              {/* 2 */}
              <h2>2. Qué datos recogemos y por qué</h2>
              <p>Cannaplan puede tratar las siguientes categorías de datos:</p>

              <h3>Datos de uso y analítica</h3>
              <p>
                Con tu consentimiento, utilizamos <strong>Google Analytics 4 (GA4)</strong> para
                recopilar información sobre cómo se navega por la app: páginas visitadas,
                duración de la sesión, tipo de dispositivo y datos agregados de interacción.
                Esta información nos ayuda a mejorar la experiencia de usuario.
                <br />
                <strong>Base legal:</strong> Consentimiento (Art. 6.1.a RGPD).
              </p>

              <h3>Datos de ubicación</h3>
              <p>
                Si lo autorizas expresamente, accedemos a tu ubicación geográfica para ordenar
                los recursos del mapa por distancia. Tu ubicación <strong>no se almacena en
                nuestros servidores</strong> ni se comparte con terceros. Solo se procesa
                localmente en tu dispositivo durante la sesión.
                <br />
                <strong>Base legal:</strong> Consentimiento (Art. 6.1.a RGPD).
              </p>

              <h3>Datos de contacto</h3>
              <p>
                Si nos escribes a través del formulario de contacto, tratamos tu nombre y
                dirección de correo electrónico para responder a tu consulta.
                <br />
                <strong>Base legal:</strong> Interés legítimo / ejecución de contrato
                (Art. 6.1.b y 6.1.f RGPD).
              </p>

              {/* 3 */}
              <h2>3. Destinatarios y transferencias internacionales</h2>
              <p>
                Cannaplan utiliza los siguientes proveedores externos que pueden acceder a
                datos de uso:
              </p>
              <ul>
                <li>
                  <strong>Google LLC</strong> — proveedor de Google Analytics 4. Google puede
                  procesar datos en servidores ubicados fuera del Espacio Económico Europeo
                  (EEE), incluidos Estados Unidos. Esta transferencia se realiza bajo las
                  Cláusulas Contractuales Tipo (CCT) aprobadas por la Comisión Europea.
                  Puedes consultar la política de privacidad de Google en{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                    policies.google.com/privacy
                  </a>.
                </li>
              </ul>
              <p>No vendemos, cedemos ni comercializamos tus datos personales a terceros.</p>

              {/* 4 */}
              <h2>4. Conservación de los datos</h2>
              <ul>
                <li>
                  <strong>Datos analíticos (GA4):</strong> Google Analytics conserva los datos
                  de usuario e interacción durante <strong>13 meses</strong> por defecto. Puedes
                  consultar la política de retención de GA4 en la documentación de Google.
                </li>
                <li>
                  <strong>Datos de contacto:</strong> Conservamos tu correo y el contenido de tu
                  consulta hasta que esta quede resuelta, y durante un máximo de{" "}
                  <strong>12 meses</strong> adicionales por si fuera necesario retomarla.
                </li>
                <li>
                  <strong>Preferencias de cookies:</strong> Tu elección se almacena en tu
                  dispositivo durante <strong>12 meses</strong>, tras los cuales te pediremos
                  que confirmes de nuevo tus preferencias.
                </li>
                <li>
                  <strong>Datos de ubicación:</strong> No se almacenan. Se procesan únicamente
                  en tiempo real durante tu sesión.
                </li>
              </ul>

              {/* 5 */}
              <h2>5. Tus derechos</h2>
              <p>
                De acuerdo con el RGPD y la legislación española vigente, tienes derecho a:
              </p>
              <ul>
                <li><strong>Acceso:</strong> saber qué datos tuyos tratamos.</li>
                <li><strong>Rectificación:</strong> corregir datos inexactos.</li>
                <li><strong>Supresión:</strong> solicitar que eliminemos tus datos («derecho al olvido»).</li>
                <li><strong>Limitación:</strong> restringir el tratamiento en determinadas circunstancias.</li>
                <li><strong>Portabilidad:</strong> recibir tus datos en un formato estructurado.</li>
                <li><strong>Oposición:</strong> oponerte al tratamiento basado en interés legítimo.</li>
                <li>
                  <strong>Retirada del consentimiento:</strong> puedes retirar tu consentimiento
                  en cualquier momento sin que ello afecte a la licitud del tratamiento previo.
                  Puedes hacerlo desde la sección de{" "}
                  <a href="/legal/cookies">Política de cookies</a> de la app.
                </li>
              </ul>
              <p>
                Para ejercer cualquiera de estos derechos, escríbenos a{" "}
                <a href="mailto:drcwyss@gmail.com">drcwyss@gmail.com</a>. Responderemos en un
                plazo máximo de <strong>30 días</strong>.
              </p>
              <p>
                Si consideras que el tratamiento de tus datos no es conforme a la normativa,
                tienes derecho a presentar una reclamación ante la{" "}
                <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
                  Agencia Española de Protección de Datos (AEPD)
                </a>.
              </p>

              {/* 6 */}
              <h2>6. Cookies</h2>
              <p>
                Utilizamos cookies propias y de terceros. Puedes consultar los detalles
                completos, incluyendo las categorías, duraciones y cómo gestionar tu
                consentimiento, en nuestra{" "}
                <a href="/legal/cookies">Política de cookies</a>.
              </p>

              {/* 7 */}
              <h2>7. Seguridad</h2>
              <p>
                Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos
                frente a accesos no autorizados, pérdida o alteración. Sin embargo, ninguna
                transmisión por internet es completamente segura.
              </p>

              {/* 8 */}
              <h2>8. Cambios en esta política</h2>
              <p>
                Podemos actualizar esta política ocasionalmente. Si los cambios son
                significativos, lo comunicaremos de forma visible en la app. La fecha de la
                última actualización aparece al inicio de este documento.
              </p>

              {/* 9 */}
              <h2>9. Contacto</h2>
              <p>
                Para cualquier consulta sobre privacidad, escríbenos a{" "}
                <a href="mailto:drcwyss@gmail.com">drcwyss@gmail.com</a>.
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
