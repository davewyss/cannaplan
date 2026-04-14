export type TabKey = "home" | "articles" | "map" | "menu";

export type ScreenKey =
  | "home"
  | "articles"
  | "map"
  | "menu"
  | "article-detail"
  | "place-detail"
  | "contact"
  | "about"
  | "donate"
  | "legal-help"
  | "news"
  | "search"
  | "about-doc"
  | "privacy"
  | "cookies"
  | "terms"
  | "data-access"
  | "sobre-app";

export type Place = {
  id: number;
  slug: string;
  name: string;
  type: string;
  area: string;       // Ciudad or Provincia — used in list cards
  country: string;
  description: string; // Texto Corto — used in list cards
  bio: string;         // Texto Largo — shown on detail profile
  address: string;     // Direcion Completa or constructed
  address1: string;
  address2: string;
  city: string;
  province: string;
  postalCode: string;
  hours: string;
  lat?: number;
  lng?: number;
  imageUrl?: string;   // Logo (1:1)
  logoAlt?: string;
  bannerUrl?: string;  // Banner (4:1)
  bannerAlt?: string;
  link1Url?: string;
  link1Label?: string;
  link2Url?: string;
  link2Label?: string;
  linkUrl?: string;    // kept for backward compat (= link1Url)
};

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
  Tags?: string;
  "Enlace de Imagen Drive"?: string;
  "URL de Imagen (auto-gen)"?: string;
  "Drive ID (auto-gen)"?: string;
  "Imagen Drive"?: string;
  "Image URL"?: string;
  Imagen?: string;
  imageUrl?: string;
  "Credito de Imagen"?: string;
  "Credito Enlace"?: string;
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
  tags: string[];
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  isoDate: string;
  author: string;
  body: string;
  featured: boolean;
  imageUrl?: string;
  imageCredit?: string;
  imageCreditUrl?: string;
};

export type Recurso = {
  id: number;
  name: string;
  type: string;
  area: string;
  description: string;
  imageUrl?: string;
  linkUrl?: string;
  address?: string;
  hours?: string;
};

export type Ad = {
  id: number;
  title?: string;
  imageUrl?: string;
  linkUrl?: string;
  ubicaciones?: string[];
  ubicacion?: string;
  alt?: string;
  backupImageUrls?: string[];
  rawRecord?: Record<string, unknown>;
};
