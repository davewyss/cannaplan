import { memo } from "react";

function TagPillsComponent({ tags }: { tags: string[] }) {
  if (!tags.length) return null;

  return (
    <div className="tag-pills">
      {tags.map((tag) => (
        <span key={tag} className="tag-pill">
          {tag}
        </span>
      ))}
    </div>
  );
}

export const TagPills = memo(TagPillsComponent);
