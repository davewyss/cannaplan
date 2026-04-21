// marked is loaded via CDN in index.html
declare const marked: { parse: (md: string) => string };

/**
 * Renders a markdown string to HTML using the globally loaded marked library.
 * When connecting a CMS/editor in the future, replace the static md string
 * passed to this function with fetched content — no structural changes needed.
 */
export function renderMd(md: string): string {
  if (typeof marked !== "undefined" && typeof marked.parse === "function") {
    return marked.parse(md);
  }
  // Fallback: wrap in a paragraph if marked hasn't loaded
  return `<p>${md.replace(/\n/g, "<br>")}</p>`;
}
