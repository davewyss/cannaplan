const CONSENT_KEY = "cp_cookie_consent";

export type ConsentPrefs = {
  analytics: boolean;
  location: boolean;
};

declare function gtag(...args: unknown[]): void;

function gtagSafe(...args: unknown[]) {
  if (typeof gtag === "function") gtag(...args);
}

/** Parse stored consent — handles both new JSON format and old string format */
function parseStored(): ConsentPrefs | null {
  const v = localStorage.getItem(CONSENT_KEY);
  if (!v) return null;

  // New format: JSON object
  try {
    const parsed = JSON.parse(v);
    if (parsed && typeof parsed === "object" && "analytics" in parsed) {
      return parsed as ConsentPrefs;
    }
  } catch {
    // fall through to legacy migration
  }

  // Legacy format migration: old "accepted" / "rejected" strings
  if (v === "accepted") return { analytics: true, location: true };
  if (v === "rejected") return { analytics: false, location: false };

  return null;
}

/** Apply prefs to gtag Consent Mode */
function applyToGtag(prefs: ConsentPrefs) {
  gtagSafe("consent", "update", {
    analytics_storage: prefs.analytics ? "granted" : "denied",
    ad_storage: "denied", // never used
  });
}

// ── Public API ────────────────────────────────────────────────────────────────

/** True if the user has made any consent decision */
export function hasDecided(): boolean {
  return parseStored() !== null;
}

/** True if analytics consent was granted */
export function hasAnalyticsConsent(): boolean {
  return parseStored()?.analytics === true;
}

/** True if location consent was granted */
export function hasLocationConsent(): boolean {
  return parseStored()?.location === true;
}

/** Read the full stored prefs (or null if not yet decided) */
export function getStoredPrefs(): ConsentPrefs | null {
  return parseStored();
}

/** Save a specific set of prefs and apply to gtag */
export function savePrefs(prefs: ConsentPrefs) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(prefs));
  applyToGtag(prefs);
}

/** Accept all categories */
export function acceptAll() {
  savePrefs({ analytics: true, location: true });
}

/** Reject all non-essential categories */
export function rejectAll() {
  savePrefs({ analytics: false, location: false });
}

/** Restore prior consent on app boot (for returning users) */
export function restoreConsent() {
  const prefs = parseStored();
  if (prefs) applyToGtag(prefs);
}

/** Clear stored consent (used when user wants to change preferences) */
export function clearConsent() {
  localStorage.removeItem(CONSENT_KEY);
  // Reset gtag back to denied
  gtagSafe("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
  });
}
