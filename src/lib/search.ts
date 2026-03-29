import type { Article, Place } from "../types";

export function matchesArticleSearch(article: Article, query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  return [
    article.title,
    article.excerpt,
    article.body,
    article.category,
    article.author,
    article.date,
    article.tags.join(" "),
  ]
    .join(" ")
    .toLowerCase()
    .includes(normalized);
}

export function matchesPlaceSearch(place: Place, query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  return [place.name, place.type, place.area, place.description, place.address, place.hours]
    .join(" ")
    .toLowerCase()
    .includes(normalized);
}
