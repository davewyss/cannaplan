const CONSENT_KEY = "cp_cookie_consent";

export type ConsentChoice = "accepted" | "rejected";

declare function gtag(...args: unknown[]): void;

function gtagSafe(...args: unknown[]) {
  if (typeof gtag === "function") gtag(...args);
}

/** Read stored consent — null means not yet chosen */
export function getStoredConsent(): ConsentChoice | null {
  const v = localStorage.getItem(CONSENT_KEY);
  if (v === "accepted" || v === "rejected") return v;
  return null;
}

/** Update gtag consent state */
function applyToGtag(choice: ConsentChoice) {
  gtagSafe("consent", "update", {
    analytics_storage: choice === "accepted" ? "granted" : "denied",
    ad_storage: "denied", // we never use ads tracking
  });
}

/** Accept analytics — stores choice and grants gtag */
export function acceptConsent() {
  localStorage.setItem(CONSENT_KEY, "accepted");
  applyToGtag("accepted");
}

/** Reject non-essential — stores choice and keeps gtag denied */
export function rejectConsent() {
  localStorage.setItem(CONSENT_KEY, "rejected");
  applyToGtag("rejected");
}

/** Call on app boot to restore a returning user's prior consent */
export function restoreConsent() {
  const stored = getStoredConsent();
  if (stored) applyToGtag(stored);
}
