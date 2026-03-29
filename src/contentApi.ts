<<<<<<< HEAD
import type { Ad, Article, SheetArticleRecord } from "./types";

const baseUrl = (import.meta.env.VITE_PUBLIC_SHEETS_URL as string | undefined) ?? "https://script.google.com/macros/s/AKfycbyeHVnioLdNVwu8CYk3hO1zjlLRmP6jKYWxLLlhZTVyoDREtIfj_CM-_EEcUQtdj8Rs/exec";
=======
export type SheetArticleRecord = {
  ID?: number | string;
  Slug?: string;
  Titulo?: string;
  Extracto?: string;
  Texto?: string;
  Fecha?: string;
  Autor?: string;
  Categoria?: string;
  Destacado?: boolean | string;
  Visibilidad?: boolean | string;
  Minutos?: number | string;
  // Image fields — actual sheet column names
  "Enlace de Imagen Drive"?: string;
  "URL de Imagen (auto-gen)"?: string;
  "Drive ID (auto-gen)"?: string;
  "Imagen Drive"?: string;
  "Image URL"?: string;
  Imagen?: string;
  imageUrl?: string;
  // Credit fields — actual sheet column names
  "Credito de Imagen"?: string;
  "Credito Enlace"?: string;
  // Fallback credit names
  "Credito"?: string;
  "Crédito"?: string;
  "Photo Credit"?: string;
  "Credito Foto"?: string;
  [key: string]: unknown;
};

export type Article = {
  id: number;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
  body: string;
  featured: boolean;
  imageUrl?: string;
  imageCredit?: string;
  imageCreditUrl?: string;
};

const baseUrl = import.meta.env.VITE_PUBLIC_SHEETS_URL as string | undefined;
>>>>>>> d61e1152bc372a0ca83b51e7b7eafab73c5db367

const fallbackArticles: Article[] = [
  {
    id: 1,
    slug: "guia-clara-cannabis-espana",
    category: "Noticias",
<<<<<<< HEAD
    tags: [],
=======
>>>>>>> d61e1152bc372a0ca83b51e7b7eafab73c5db367
    title: "Una guía más clara para entender el cannabis en España",
    excerpt: "Información útil, directa y serena para personas que buscan orientación sin ruido ni estigma.",
    readTime: "5 min",
    date: "24 marzo 2026",
    author: "Equipo Cannaplan",
    body: "Contenido provisional mientras se conecta la hoja ARTICULOS.",
    featured: true,
<<<<<<< HEAD
=======
    imageUrl: undefined,
>>>>>>> d61e1152bc372a0ca83b51e7b7eafab73c5db367
  },
  {
    id: 2,
    slug: "apoyo-contexto-respuestas-fiables",
    category: "Recursos",
<<<<<<< HEAD
    tags: [],
=======
>>>>>>> d61e1152bc372a0ca83b51e7b7eafab73c5db367
    title: "Cómo encontrar apoyo, contexto y respuestas fiables",
    excerpt: "Un enfoque accesible para navegar un tema complejo con criterio, calma y confianza.",
    readTime: "4 min",
    date: "22 marzo 2026",
    author: "Equipo Cannaplan",
    body: "El listado real llegará desde Google Sheets usando el endpoint público del proyecto.",
    featured: false,
<<<<<<< HEAD
=======
    imageUrl: undefined,
>>>>>>> d61e1152bc372a0ca83b51e7b7eafab73c5db367
  },
];

function truthy(value: unknown): boolean {
  if (value === true) return true;
  if (typeof value === "string") {
<<<<<<< HEAD
    const normalized = value.trim().toLowerCase();
    return normalized === "true" || normalized === "1" || normalized === "sí" || normalized === "si";
=======
    const v = value.trim().toLowerCase();
    return v === "true" || v === "1" || v === "sí" || v === "si";
>>>>>>> d61e1152bc372a0ca83b51e7b7eafab73c5db367
  }
  return false;
}

function formatSpanishDate(raw?: string): string {
  if (!raw) return "";
<<<<<<< HEAD
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return String(raw);
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
=======
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return String(raw);
  return new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" }).format(d);
>>>>>>> d61e1152bc372a0ca83b51e7b7eafab73c5db367
}

function estimateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
<<<<<<< HEAD
  const minutes = Math.max(3, Math.round(words / 180) || 3);
  return `${minutes} min`;
}

function extractDriveFileId(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const lh3Match = trimmed.match(/lh3\.googleusercontent\.com\/(?:u\/\d+\/)?d\/([a-zA-Z0-9_-]+)/);
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
=======
  const mins = Math.max(3, Math.round(words / 180) || 3);
  return `${mins} min`;
}

function extractDriveFileId(raw: string): string | null {
  // lh3 CDN URL already — pull the ID out
  const lh3 = raw.match(/lh3\.googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/);
  if (lh3) return lh3[1];

  // Standard Drive share / file / export URLs
  const shareMatch =
    raw.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    raw.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
    raw.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (shareMatch?.[1]) return shareMatch[1];

  // Bare file ID (20+ alphanumeric chars, nothing else)
  if (/^[a-zA-Z0-9_-]{25,}$/.test(raw)) return raw;

  return null;
}

function toDriveDirectUrl(value: string): string {
  const raw = value.trim();
  if (!raw) return "";

  const fileId = extractDriveFileId(raw);
  // lh3.googleusercontent.com/d/<id> is the most reliable public CDN
  // endpoint for embedded images — no CORS, no rate-limit redirects
  if (fileId) return `https://lh3.googleusercontent.com/d/${fileId}`;

  // Not a Drive URL — return as-is (might be a direct https:// image)
  return raw;
}

function normalizeImageUrl(value: unknown): string | undefined {
  if (!value) return undefined;

  if (typeof value === "string") {
    const normalized = toDriveDirectUrl(value);
    return normalized || undefined;
  }

  if (typeof value === "object" && value !== null) {
    const obj = value as Record<string, unknown>;
    const nested =
      obj.url ||
      obj.href ||
      obj.src ||
      obj.downloadUrl ||
      obj.viewUrl ||
      obj.value;
    if (typeof nested === "string") {
      const normalized = toDriveDirectUrl(nested);
      return normalized || undefined;
    }
  }

  return undefined;
}

function getRecordImageUrl(record: SheetArticleRecord): string | undefined {
  // Collect all possible image sources, in priority order
>>>>>>> d61e1152bc372a0ca83b51e7b7eafab73c5db367
  const candidates: unknown[] = [
    record["URL de Imagen (auto-gen)"],
    record["Drive ID (auto-gen)"],
    record["Enlace de Imagen Drive"],
    record["Imagen Drive"],
    record["Image URL"],
    record["Imagen"],
<<<<<<< HEAD
    record.imageUrl,
  ];

  for (const candidate of candidates) {
    const normalized = getImageUrlCandidates(candidate)[0];
=======
    record["imageUrl"],
  ];

  for (const candidate of candidates) {
    const normalized = normalizeImageUrl(candidate);
>>>>>>> d61e1152bc372a0ca83b51e7b7eafab73c5db367
    if (normalized) return normalized;
  }

  return undefined;
}

function mapRecord(record: SheetArticleRecord, index: number): Article | null {
  const visible = record.Visibilidad === undefined ? true : truthy(record.Visibilidad);
  if (!visible) return null;

  const body = String(record.Texto ?? "").trim();
  const title = String(record.Titulo ?? "").trim();
  if (!title) return null;

<<<<<<< HEAD
  const slug = String(record.Slug ?? title)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
=======
  const slugSource = String(record.Slug ?? title)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
>>>>>>> d61e1152bc372a0ca83b51e7b7eafab73c5db367
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const imageCredit =
    String(
      record["Credito de Imagen"] ??
<<<<<<< HEAD
        record["Credito"] ??
        record["Crédito"] ??
        record["Photo Credit"] ??
        record["Credito Foto"] ??
        "",
    ).trim() || undefined;

  const imageCreditUrl = String(record["Credito Enlace"] ?? "").trim() || undefined;

  let readTime = estimateReadTime(body || String(record.Extracto ?? ""));
  if (record.Minutos !== undefined && record.Minutos !== null && record.Minutos !== "") {
    const minutes = Number(record.Minutos);
    if (!Number.isNaN(minutes) && minutes > 0) {
      readTime = `${minutes} min`;
    }
  }

  const tags = String(record.Tags ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return {
    id: Number(record.ID ?? index + 1),
    slug: slug || `articulo-${index + 1}`,
    category: String(record.Categoria ?? "Noticias"),
    tags,
    title,
    excerpt: String(record.Extracto ?? body.slice(0, 160) ?? "").trim(),
    readTime,
    date: formatSpanishDate(String(record.Fecha ?? "")),
=======
      record["Credito"] ??
      record["Crédito"] ??
      record["Photo Credit"] ??
      record["Credito Foto"] ??
      ""
    ).trim() || undefined;

  const imageCreditUrl =
    String(record["Credito Enlace"] ?? "").trim() || undefined;

  // Use spreadsheet "Minutos" column if present, otherwise estimate from text
  let readTime: string;
  const minutosValue = record.Minutos;
  if (minutosValue !== undefined && minutosValue !== null && minutosValue !== "") {
    const mins = Number(minutosValue);
    readTime = !Number.isNaN(mins) && mins > 0 ? `${mins} min` : estimateReadTime(body || String(record.Extracto ?? ""));
  } else {
    readTime = estimateReadTime(body || String(record.Extracto ?? ""));
  }

  return {
    id: Number(record.ID ?? index + 1),
    slug: slugSource || `articulo-${index + 1}`,
    category: String(record.Categoria ?? "Noticias"),
    title,
    excerpt: String(record.Extracto ?? body.slice(0, 160) ?? "").trim(),
    readTime,
    date: formatSpanishDate(String(record.Fecha ?? "")) || "",
>>>>>>> d61e1152bc372a0ca83b51e7b7eafab73c5db367
    author: String(record.Autor ?? "Equipo Cannaplan"),
    body: body || String(record.Extracto ?? "").trim(),
    featured: truthy(record.Destacado),
    imageUrl: getRecordImageUrl(record),
    imageCredit,
    imageCreditUrl,
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
<<<<<<< HEAD

function normalizeLinkUrl(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;
  const raw = String(value).trim();
  if (!raw || raw === "#") return undefined;
  if (/^https?:\/\//i.test(raw) || /^mailto:/i.test(raw) || /^tel:/i.test(raw)) return raw;
  if (/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/i.test(raw)) return `mailto:${raw}`;
  if (/^(www\.)?[a-z0-9.-]+\.[a-z]{2,}(?:[/?#].*)?$/i.test(raw)) return `https://${raw.replace(/^https?:\/\//i, "")}`;
  return raw;
}

function getFirstString(record: Record<string, unknown>, keys: string[]): string | undefined {
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
        .replace(/[̀-ͯ]/g, "")
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
    if (["activo", "active", "publicado", "visible", "mostrar", "on"].includes(normalized)) return true;
    if (["inactivo", "inactive", "oculto", "hidden", "off"].includes(normalized)) return false;
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
        const title = getFirstString(record, ["Titulo", "Título", "Nombre", "Anunciante"]);

        return {
          id: Number(record.ID ?? index + 1),
          title,
          alt: getFirstString(record, ["Alt Text", "Alt", "Texto Alternativo"]) ?? title,
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


export async function getDocPageHtml(docId: string): Promise<string> {
  if (!baseUrl) throw new Error("Falta la URL pública de Apps Script.");
  if (!docId || docId === "PASTE_YOUR_GOOGLE_DOC_ID_HERE") {
    throw new Error("Falta configurar el Google Doc ID para Sobre Nosotros.");
  }

  const url = new URL(baseUrl);
  url.searchParams.set("sheet", "DOC");
  url.searchParams.set("id", docId);

  const response = await fetch(url.toString(), { method: "GET" });
  if (!response.ok) throw new Error(`Doc request failed: ${response.status}`);

  const data = await response.json();
  return typeof data?.html === "string" ? data.html : "";
}
=======
>>>>>>> d61e1152bc372a0ca83b51e7b7eafab73c5db367
