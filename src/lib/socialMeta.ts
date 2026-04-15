/**
 * Update Open Graph and social media meta tags dynamically
 */

export interface SocialMetaData {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const SITE_URL = typeof window !== 'undefined' ? window.location.origin : 'https://cannaplan.es';
const DEFAULT_SOCIAL_IMAGE = '/cp_socialshare.png';
const DEFAULT_DESCRIPTION = 'Cannaplan — información y recursos sobre cannabis en España.';

function getOrCreateMetaTag(property: string, isName: boolean = false): HTMLMetaElement {
  const attr = isName ? 'name' : 'property';
  let meta = document.querySelector<HTMLMetaElement>(`meta[${attr}="${property}"]`);

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attr, property);
    document.head.appendChild(meta);
  }

  return meta;
}

export function updateSocialMeta(data: SocialMetaData): void {
  const title = data.title || 'Cannaplan';
  const description = data.description || DEFAULT_DESCRIPTION;
  const image = data.image ?
    (data.image.startsWith('http') ? data.image : `${SITE_URL}${data.image}`) :
    `${SITE_URL}${DEFAULT_SOCIAL_IMAGE}`;
  const url = data.url || SITE_URL;

  // og:title
  getOrCreateMetaTag('og:title').setAttribute('content', title);

  // og:description
  getOrCreateMetaTag('og:description').setAttribute('content', description);

  // og:image
  getOrCreateMetaTag('og:image').setAttribute('content', image);

  // og:url
  getOrCreateMetaTag('og:url').setAttribute('content', url);

  // og:type
  getOrCreateMetaTag('og:type').setAttribute('content', 'website');

  // twitter:card
  getOrCreateMetaTag('twitter:card', true).setAttribute('content', 'summary_large_image');

  // twitter:title
  getOrCreateMetaTag('twitter:title', true).setAttribute('content', title);

  // twitter:description
  getOrCreateMetaTag('twitter:description', true).setAttribute('content', description);

  // twitter:image
  getOrCreateMetaTag('twitter:image', true).setAttribute('content', image);

  // Also update document title
  document.title = title + ' · Cannaplan';
}

export function resetSocialMeta(): void {
  updateSocialMeta({
    title: 'Cannaplan',
    description: DEFAULT_DESCRIPTION,
    image: DEFAULT_SOCIAL_IMAGE,
  });
}
