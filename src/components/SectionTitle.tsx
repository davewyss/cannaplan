export function SectionTitle({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="section-title">
      <div className="eyebrow">{eyebrow}</div>
      {title ? <h2>{title}</h2> : null}
      {body ? <p>{body}</p> : null}
    </div>
  );
}
