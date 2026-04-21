const ITEMS = [
  { key: "sobre-app", label: "Sobre la app" },
  { key: "privacy",   label: "Privacidad" },
  { key: "cookies",   label: "Cookies" },
  { key: "terms",     label: "Aviso legal" },
  { key: "data-access", label: "Datos" },
];

export function LegalFooterPills({
  onNavigate,
  current,
}: {
  onNavigate: (key: string) => void;
  current?: string;
}) {
  return (
    <div className="legal-footer-pills">
      {ITEMS.filter((item) => item.key !== current).map((item) => (
        <button
          key={item.key}
          className="menu-footer-pill"
          onClick={() => onNavigate(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
