/**
 * Returns true when the app is running as an installed PWA
 * (added to home screen / standalone mode).
 * False when opened in a regular browser tab.
 */
export function isPwa(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}
