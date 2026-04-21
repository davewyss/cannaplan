// ── Fallback images for incomplete place profiles ─────────────────────────────
// Google Drive files converted to direct-link format.
// To update, replace the file ID portion after /d/

const driveId = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;

/** Default logo / thumbnail used when a place has no imageUrl */
export const FALLBACK_LOGO   = driveId("1I0Td_ywWQoaj7sZ-IOhdZ17c5r-aRI1A");

/** Default banner used when a place has no bannerUrl */
export const FALLBACK_BANNER = driveId("1iK55qZ4aDNvZpNgKBf4NPTCaDNY9IoJl");
