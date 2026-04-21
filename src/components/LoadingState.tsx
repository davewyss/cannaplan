export function LoadingState() {
  return (
    <div className="splash-screen">
      <div className="splash-inner">
        <img src="/logo_reverse_512.png" alt="Cannaplan" className="splash-logo" />
        <p className="splash-tagline">Recursos y servicios de confianza<br />sobre cannabis</p>
        <div className="splash-dots">
          <div className="splash-dot" />
          <div className="splash-dot" />
          <div className="splash-dot" />
        </div>
      </div>
    </div>
  );
}
