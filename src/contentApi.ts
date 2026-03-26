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

const fallbackArticles: Article[] = [
  {
    id: 1,
    slug: "guia-clara-cannabis-espana",
    category: "Noticias",
    title: "Una guía más clara para entender el cannabis en España",
    excerpt: "Información útil, directa y serena para personas que buscan orientación sin ruido ni estigma.",
    readTime: "5 min",
    date: "24 marzo 2026",
    author: "Equipo Cannaplan",
    body: "Contenido provisional mientras se conecta la hoja ARTICULOS.",
    featured: true,
    imageUrl: undefined,
  },
  {
    id: 2,
    slug: "apoyo-contexto-respuestas-fiables",
    category: "Recursos",
    title: "Cómo encontrar apoyo, contexto y respuestas fiables",
    excerpt: "Un enfoque accesible para navegar un tema complejo con criterio, calma y confianza.",
    readTime: "4 min",
    date: "22 marzo 2026",
    author: "Equipo Cannaplan",
    body: "El listado real llegará desde Google Sheets usando el endpoint público del proyecto.",
    featured: false,
    imageUrl: undefined,
  },
];

function truthy(value: unknown): boolean {
  if (value === true) return true;
  if (typeof value === "string") {
    const v = value.trim().toLowerCase();
    return v === "true" || v === "1" || v === "sí" || v === "si";
  }
  return false;
}

function formatSpanishDate(raw?: string): string {
  if (!raw) return "";
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return String(raw);
  return new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" }).format(d);
}

function estimateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
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
  const candidates: unknown[] = [
    record["URL de Imagen (auto-gen)"],
    record["Drive ID (auto-gen)"],
    record["Enlace de Imagen Drive"],
    record["Imagen Drive"],
    record["Image URL"],
    record["Imagen"],
    record["imageUrl"],
  ];

  for (const candidate of candidates) {
    const normalized = normalizeImageUrl(candidate);
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

  const slugSource = String(record.Slug ?? title)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const imageCredit =
    String(
      record["Credito de Imagen"] ??
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
