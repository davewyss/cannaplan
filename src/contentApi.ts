import type { Ad, Article, Place, Recurso, SheetArticleRecord } from "./types";

const baseUrl =
  (import.meta.env.VITE_PUBLIC_SHEETS_URL as string | undefined) ??
  "https://script.google.com/macros/s/AKfycbxGIAcSERkt9wIyPEJWUn7Zeo4UyaKNV0aW6-xK2ctm7SZmHfuihhaxm0ZBUsMAtEX3/exec";

const fallbackArticles: Article[] = [
  {
    id: 1,
    slug: "guia-clara-cannabis-espana",
    category: "Noticias",
    title: "Una guía más clara para entender el cannabis en España",
    excerpt:
      "Información útil, directa y serena para personas que buscan orientación sin ruido ni estigma.",
    readTime: "5 min",
    date: "24 marzo 2026",
    isoDate: "2026-03-24",
    author: "Equipo Cannaplan",
    body: "Contenido provisional mientras se conecta la hoja ARTICULOS.",
    featured: true,
    imageUrl: undefined,
    imageCredit: undefined,
    imageCreditUrl: undefined,
    tags: ["guía", "cannabis", "españa"],
  },
  {
    id: 2,
    slug: "apoyo-contexto-respuestas-fiables",
    category: "Recursos",
    title: "Cómo encontrar apoyo, contexto y respuestas fiables",
    excerpt:
      "Un enfoque accesible para navegar un tema complejo con criterio, calma y confianza.",
    readTime: "4 min",
    date: "22 marzo 2026",
    isoDate: "2026-03-22",
    author: "Equipo Cannaplan",
    body:
      "El listado real llegará desde Google Sheets usando el endpoint público del proyecto.",
    featured: false,
    imageUrl: undefined,
    imageCredit: undefined,
    imageCreditUrl: undefined,
    tags: ["recursos", "apoyo", "información"],
  },
];

function truthy(value: unknown): boolean {
  if (value === true) return true;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return (
      normalized === "true" ||
      normalized === "1" ||
      normalized === "sí" ||
      normalized === "si"
    );
  }
  return false;
}

function formatSpanishDate(raw?: string): string {
  if (!raw) return "";
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return String(raw);
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function estimateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(3, Math.round(words / 180) || 3);
  return `${minutes} min`;
}

function extractDriveFileId(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const lh3Match = trimmed.match(
    /lh3\.googleusercontent\.com\/(?:u\/\d+\/)?d\/([a-zA-Z0-9_-]+)/,
  );
  if (lh3Match?.[1]) return lh3Match[1];

  const shareMatch =
    trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/\/thumbnail\?id=([a-zA-Z0-9_-]+)/);
  if (shareMatch?.[1]) return shareMatch[1];

  if (/^[a-zA-Z0-9_-]{25,}$/.test(trimmed)) return trimmed;
  return null;
}

function getImageUrlCandidates(value: unknown): string[] {
  if (!value) return [];

  let raw = "";
  if (typeof value === "string") {
    raw = value.trim();
  } else if (typeof value === "object" && value !== null) {
    const objectValue = value as Record<string, unknown>;
    const nested =
      objectValue.url ||
      objectValue.href ||
      objectValue.src ||
      objectValue.downloadUrl ||
      objectValue.viewUrl ||
      objectValue.value;

    if (typeof nested === "string") raw = nested.trim();
  }

  if (!raw) return [];

  const fileId = extractDriveFileId(raw);
  if (!fileId) return [raw];

  return Array.from(
    new Set([
      `https://lh3.googleusercontent.com/d/${fileId}`,
      `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`,
      `https://drive.google.com/uc?export=view&id=${fileId}`,
      raw,
    ]),
  );
}

function normalizeImageUrl(value: unknown): string | undefined {
  return getImageUrlCandidates(value)[0];
}

function getRecordImageUrl(record: SheetArticleRecord): string | undefined {
  const candidates: unknown[] = [
    record["URL de Imagen (auto-gen)"],
    record["Drive ID (auto-gen)"],
    record["Enlace de Imagen Drive"],
    record["Imagen Drive"],
    record["Image URL"],
    record["Imagen"],
    record.imageUrl,
  ];

  for (const candidate of candidates) {
    const normalized = normalizeImageUrl(candidate);
    if (normalized) return normalized;
  }

  return undefined;
}

function mapRecord(record: SheetArticleRecord, index: number): Article | null {
  const visible =
    record.Visibilidad === undefined ? true : truthy(record.Visibilidad);
  if (!visible) return null;

  const body = String(record.Texto ?? "").trim();
  const title = String(record.Titulo ?? "").trim();
  if (!title) return null;

  const slug = String(record.Slug ?? title)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const imageCredit =
    String(
      record["Credito de Imagen"] ??
        record["Credito"] ??
        record["Crédito"] ??
        record["Photo Credit"] ??
        record["Credito Foto"] ??
        "",
    ).trim() || undefined;

  const imageCreditUrl =
    String(record["Credito Enlace"] ?? "").trim() || undefined;

  let readTime = estimateReadTime(body || String(record.Extracto ?? ""));
  if (
    record.Minutos !== undefined &&
    record.Minutos !== null &&
    record.Minutos !== ""
  ) {
    const minutes = Number(record.Minutos);
    if (!Number.isNaN(minutes) && minutes > 0) {
      readTime = `${minutes} min`;
    }
  }

  const isoDate = String(record.Fecha ?? "");

  return {
    id: Number(record.ID ?? index + 1),
    slug: slug || `articulo-${index + 1}`,
    category: String(record.Categoria ?? "Noticias"),
    title,
    excerpt: String(record.Extracto ?? body.slice(0, 160) ?? "").trim(),
    readTime,
    date: formatSpanishDate(isoDate),
    isoDate,
    author: String(record.Autor ?? "Equipo Cannaplan"),
    body: body || String(record.Extracto ?? "").trim(),
    featured: truthy(record.Destacado),
    imageUrl: getRecordImageUrl(record),
    imageCredit,
    imageCreditUrl,
    tags: String(record.Tags ?? record.Etiquetas ?? "")
      .split(/[,;|]/)
      .map((value) => value.trim())
      .filter(Boolean),
  };
}

export async function getArticles(): Promise<Article[]> {
  if (!baseUrl) return fallbackArticles;

  const url = new URL(baseUrl);
  url.searchParams.set("sheet", "ARTICULOS");

  const response = await fetch(url.toString(), { method: "GET" });
  if (!response.ok) throw new Error(`Sheets request failed: ${response.status}`);

  const data = await response.json();
  const records = Array.isArray(data?.records) ? data.records : [];
  const mapped = records.map(mapRecord).filter(Boolean) as Article[];
  return mapped.length ? mapped : fallbackArticles;
}

export function getFeaturedArticle(articles: Article[]): Article {
  return articles.find((article) => article.featured) ?? articles[0];
}

function normalizeLinkUrl(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;
  const raw = String(value).trim();
  if (!raw || raw === "#") return undefined;
  if (
    /^https?:\/\//i.test(raw) ||
    /^mailto:/i.test(raw) ||
    /^tel:/i.test(raw)
  ) {
    return raw;
  }
  if (/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/i.test(raw)) return `mailto:${raw}`;
  if (/^(www\.)?[a-z0-9.-]+\.[a-z]{2,}(?:[/?#].*)?$/i.test(raw)) {
    return `https://${raw.replace(/^https?:\/\//i, "")}`;
  }
  return raw;
}

function getFirstString(
  record: Record<string, unknown>,
  keys: string[],
): string | undefined {
  for (const key of keys) {
    const value = record[key];
    if (value === undefined || value === null) continue;
    const normalized = String(value).trim();
    if (normalized) return normalized;
  }
  return undefined;
}

function getAdLocations(record: Record<string, unknown>): string[] {
  const raw = getFirstString(record, [
    "Ubicacion",
    "Ubicación",
    "Posicion",
    "Posición",
    "Placement",
    "Lugar",
    "Seccion",
    "Sección",
  ]);

  if (!raw) return [];

  return raw
    .split(/[,;|]/)
    .map((value) =>
      value
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-"),
    )
    .filter(Boolean);
}

function isAdActive(record: Record<string, unknown>): boolean {
  const active =
    record.Activo ??
    record.Visible ??
    record.Visibilidad ??
    record.Mostrar ??
    record.Publicado ??
    record.Estado;

  if (active === undefined || active === null || active === "") return true;

  if (typeof active === "string") {
    const normalized = active.trim().toLowerCase();
    if (
      ["activo", "active", "publicado", "visible", "mostrar", "on"].includes(
        normalized,
      )
    ) {
      return true;
    }
    if (["inactivo", "inactive", "oculto", "hidden", "off"].includes(normalized)) {
      return false;
    }
  }

  return truthy(active);
}

function getAdImageCandidates(record: Record<string, unknown>): string[] {
  const candidates = [
    record["URL de Imagen (auto-gen)"],
    record["Enlace de Imagen Drive"],
    record["Imagen"],
    record["Image URL"],
    record["Imagen Drive"],
    record["Drive ID (auto-gen)"],
    record["Banner"],
    record["Foto"],
    record["imageUrl"],
  ];

  const urls = candidates.flatMap((value) => getImageUrlCandidates(value));
  return Array.from(new Set(urls));
}

export async function getAds(): Promise<Ad[]> {
  if (!baseUrl) return [];

  try {
    const url = new URL(baseUrl);
    url.searchParams.set("sheet", "ANUNCIOS");

    const response = await fetch(url.toString(), { method: "GET" });
    if (!response.ok) return [];

    const data = await response.json();
    const records: Record<string, unknown>[] = Array.isArray(data?.records)
      ? data.records
      : Array.isArray(data?.data)
        ? data.data
        : [];

    return records
      .filter(isAdActive)
      .map((record, index) => {
        const imageCandidates = getAdImageCandidates(record);

        const rawLink = getFirstString(record, [
          "Enlance de Anuncio",
          "Enlace de Anuncio",
          "Enlace del Anuncio",
          "URL del Anuncio",
          "URL",
          "Enlace",
          "Link",
          "Website",
          "Web",
        ]);

        const locations = getAdLocations(record);
        const linkUrl = normalizeLinkUrl(rawLink);
        const title = getFirstString(record, [
          "Titulo",
          "Título",
          "Nombre",
          "Anunciante",
        ]);

        return {
          id: Number(record.ID ?? index + 1),
          title,
          alt:
            getFirstString(record, ["Alt Text", "Alt", "Texto Alternativo"]) ??
            title,
          imageUrl: imageCandidates[0],
          backupImageUrls: imageCandidates.slice(1),
          linkUrl,
          ubicaciones: locations,
          ubicacion: locations[0],
          rawRecord: record,
        } satisfies Ad;
      })
      .filter((ad) => Boolean(ad.imageUrl || ad.title || ad.linkUrl));
  } catch {
    return [];
  }
}

const IMAGE_MARKERS = ["img-profile", "img-medium", "img-full"] as const;
const ALIGN_MARKERS = ["align-left", "align-center", "align-right", "align-justify"] as const;

function processDocHtml(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const body = doc.body;
    
    // Work on a snapshot so removals don't affect iteration
    const children = Array.from(body.children);
    
    for (let i = 0; i < children.length; i++) {
        const el = children[i];
        const text = (el.textContent ?? "").trim();
        
        // ── Image size markers: [img-profile], [img-medium], [img-full] ──
        const imageMarker = IMAGE_MARKERS.find((m) => text === `[${m}]`);
        if (imageMarker) {
            // Look forward for the next element that has an <img>
            for (let j = i + 1; j < children.length; j++) {
                const sibling = children[j];
                const img =
                sibling.tagName === "IMG"
                ? (sibling as HTMLImageElement)
                : sibling.querySelector("img");
                
                if (img) {
                    // If img is already inside a .doc-image wrapper, add the marker class to it
                    const container = img.closest(".doc-image");
                    if (container) {
                        container.classList.add(imageMarker);
                    } else {
                        // Wrap the img in a new doc-image div with the marker class
                        const wrapper = doc.createElement("div");
                        wrapper.className = `doc-image ${imageMarker}`;
                        img.replaceWith(wrapper);
                        wrapper.appendChild(img);
                    }
                    break;
                }
            }
            el.remove();
            continue;
        }
        
        // ── Alignment markers: [align-left], [align-center], etc. ──
        const alignMarker = ALIGN_MARKERS.find((m) => text === `[${m}]`);
        if (alignMarker) {
            if (el.nextElementSibling) {
                el.nextElementSibling.classList.add(alignMarker);
            }
            el.remove();
            continue;
        }
        
        // ── Detect alignment from inline styles (e.g., style="text-align: center") ──
        const style = el.getAttribute("style") || "";
        const alignMatch = style.match(/text-align:\s*(left|center|right|justify)/i);
        if (alignMatch) {
            const alignValue = alignMatch[1].toLowerCase();
            el.classList.add(`align-${alignValue}`);
            // Remove the inline text-align style, keep other styles
            const newStyle = style
            .replace(/text-align:\s*(left|center|right|justify);?/i, "")
            .trim();
            if (newStyle) {
                el.setAttribute("style", newStyle);
            } else {
                el.removeAttribute("style");
            }
        }
    }
    
    return body.innerHTML;
}

export async function getRecursos(): Promise<Recurso[]> {
  if (!baseUrl) return [];

  try {
    const url = new URL(baseUrl);
    url.searchParams.set("sheet", "RECURSOS");

    const response = await fetch(url.toString(), { method: "GET" });
    if (!response.ok) return [];

    const data = await response.json();
    const records: Record<string, unknown>[] = Array.isArray(data?.records)
      ? data.records
      : Array.isArray(data?.data)
        ? data.data
        : [];

    return records
      .map((r, i): Recurso | null => {
        const visible =
          r.Visibilidad === undefined ? true : truthy(r.Visibilidad);
        if (!visible) return null;

        const name = getFirstString(r, ["Nombre", "Titulo", "Título", "Name", "Title"]);
        if (!name) return null;

        const imageUrl = normalizeImageUrl(
          r["URL de Imagen (auto-gen)"] ??
          r["Enlace de Imagen Drive"] ??
          r["Imagen"] ??
          r["Image URL"] ??
          r["Foto"]
        );

        const rawLink = getFirstString(r, ["Enlace", "Link", "URL", "Web", "Website"]);

        return {
          id: Number(r.ID ?? i + 1),
          name,
          type: String(r.Tipo ?? r.Categoria ?? r.Category ?? r.Type ?? "Recurso"),
          area: String(r.Area ?? r.Zona ?? r.Region ?? r.Lugar ?? ""),
          description: String(r.Descripcion ?? r.Descripción ?? r.Extracto ?? r.Description ?? "").trim(),
          imageUrl,
          linkUrl: normalizeLinkUrl(rawLink),
          address: String(r.Direccion ?? r.Dirección ?? r.Address ?? "").trim() || undefined,
          hours: String(r.Horario ?? r.Horas ?? r.Hours ?? "").trim() || undefined,
        };
      })
      .filter((r): r is Recurso => r !== null);
  } catch {
    return [];
  }
}

export async function getDocPageHtml(docId: string): Promise<string> {
  if (!baseUrl) throw new Error("Falta la URL pública de Apps Script.");
  if (!docId || docId === "PASTE_YOUR_GOOGLE_DOC_ID_HERE") {
    throw new Error("Falta configurar el Google Doc ID.");
  }

  const url = new URL(baseUrl);
  url.searchParams.set("sheet", "DOC");
  url.searchParams.set("id", docId);

  const response = await fetch(url.toString(), { method: "GET" });
  if (!response.ok) throw new Error(`Doc request failed: ${response.status}`);

  const data = await response.json();
  const raw = typeof data?.html === "string" ? data.html : "";
  return processDocHtml(raw);

  return typeof data?.html === "string" ? data.html : "";
}

export async function getMapPlaces(): Promise<Place[]> {
  if (!baseUrl) return [];

  try {
    const url = new URL(baseUrl);
    url.searchParams.set("sheet", "MAPA");

    const response = await fetch(url.toString(), { method: "GET" });
    if (!response.ok) return [];

    const data = await response.json();
    const records: Record<string, unknown>[] = Array.isArray(data?.records)
      ? data.records
      : Array.isArray(data?.data)
        ? data.data
        : [];

    return records
      .map((r, i): Place | null => {
        const visible =
          r.Visibilidad === undefined ? true : truthy(r.Visibilidad);
        if (!visible) return null;

        const name = getFirstString(r, ["Nombre", "Titulo", "Título", "Name"]);
        if (!name) return null;

        // ── Coordinates ───────────────────────────────────────────────────
        const rawLat = r.Lat ?? r.Latitud ?? r.lat ?? r.latitude;
        const rawLng = r.Lng ?? r.Lon ?? r.Longitud ?? r.lng ?? r.longitude;
        const lat = rawLat !== undefined && rawLat !== "" ? parseFloat(String(rawLat)) : undefined;
        const lng = rawLng !== undefined && rawLng !== "" ? parseFloat(String(rawLng)) : undefined;

        // ── Address components ────────────────────────────────────────────
        const address1   = String(r["Direcion 1"]    ?? r["Dirección 1"]   ?? "").trim();
        const address2   = String(r["Direcion 2"]    ?? r["Dirección 2"]   ?? "").trim();
        const city       = String(r.Ciudad           ?? "").trim();
        const province   = String(r.Provincia        ?? "").trim();
        const postalCode = String(r["Codigo Postal"] ?? r["Código Postal"] ?? "").trim();
        const country    = String(r.Pais ?? r.País   ?? r.Country          ?? "").trim();
        const dirCompleta = getFirstString(r, [
          "Dirrecion Completa",   // actual sheet spelling (double r)
          "Direcion Completa",
          "Dirección Completa",
          "Direccion Completa",
        ]);
        const address = dirCompleta ?? [
          address1,
          address2,
          city,
          [province, postalCode].filter(Boolean).join(" "),
        ].filter(Boolean).join(", ");

        // ── Logo image ────────────────────────────────────────────────────
        const imageUrl = normalizeImageUrl(
          r["Logo Enlace"]              ??  // actual sheet column
          r["URL de Imagen (auto-gen)"] ??  // legacy fallback
          r["Drive ID (auto-gen)"]      ??
          r["Enlace de Logo"]           ??
          r["Imagen"]                   ??
          r["Image URL"]                ??
          r["imageUrl"]                 ??
          ""
        );

        // ── Banner image ──────────────────────────────────────────────────
        const bannerUrl = normalizeImageUrl(
          r["Logo Banner"]                     ??  // actual sheet column
          r["Banner URL de Imagen (auto-gen)"] ??  // legacy fallback
          r["Banner Drive ID (auto-gen)"]      ??
          r["Enlace Banner"]                   ??
          ""
        );

        // ── Contact info ──────────────────────────────────────────────────
        const phone = String(r.Telefono ?? r.Teléfono ?? r.Celular ?? r.Phone ?? "").trim() || undefined;
        const email = String(r.Email ?? r.Correo ?? r["Correo Electrónico"] ?? "").trim() || undefined;

        // ── Links ─────────────────────────────────────────────────────────
        const link1Url   = normalizeLinkUrl(getFirstString(r, ["Enlace 1"]));
        const link1Label = String(r["Etiqueta Enlace 1"] ?? "").trim() || undefined;
        const link2Url   = normalizeLinkUrl(getFirstString(r, ["Enlace 2"]));
        const link2Label = String(r["Etiqueta Enlace 2"] ?? "").trim() || undefined;

        // ── Slug ──────────────────────────────────────────────────────────
        const placeSlug =
          String(r.Slug ?? r.slug ?? name)
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "") || `lugar-${i + 1}`;

        return {
          id: typeof r.ID === "number" ? r.ID : i + 1,
          slug: placeSlug,
          name,
          type:    String(r.Categoria ?? r.Categoría ?? r.Tipo ?? r.Type ?? "Lugar").trim(),
          area:    city || province,
          country,
          description: String(r["Texto Corto"] ?? r.Descripcion ?? r.Descripción ?? r.Extracto ?? "").trim(),
          bio:         String(r["Texto Largo"]  ?? "").trim(),
          address,
          address1,
          address2,
          city,
          province,
          postalCode,
          phone,
          email,
          hours:    String(r.Horario ?? r.Horas ?? r.Hours ?? "").trim(),
          lat:      lat !== undefined && !isNaN(lat) ? lat : undefined,
          lng:      lng !== undefined && !isNaN(lng) ? lng : undefined,
          imageUrl:  imageUrl  || undefined,
          logoAlt:   String(r["Logo Alt"]    ?? "").trim() || undefined,
          bannerUrl: bannerUrl || undefined,
          bannerAlt: String(r["Banner Alt"]  ?? "").trim() || undefined,
          link1Url,
          link1Label,
          link2Url,
          link2Label,
          linkUrl: link1Url, // backward compat for list cards
        };
      })
      .filter((r): r is Place => r !== null);
  } catch {
    return [];
  }
}
