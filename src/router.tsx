/**
 * Lightweight client-side router (History API based).
 * API mirrors the subset of react-router-dom used in this project,
 * so it can be swapped for the real thing later with minimal changes.
 */

import {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

export type RouterLocation = { pathname: string; search: string };

type RouterCtx = {
  location: RouterLocation;
  navigate: (to: string | number) => void;
};

// ── Internal contexts ─────────────────────────────────────────────────────────

const RouterContext = createContext<RouterCtx | null>(null);
const ParamsContext = createContext<Record<string, string>>({});

// ── Helpers ───────────────────────────────────────────────────────────────────

function getLocation(): RouterLocation {
  return { pathname: window.location.pathname, search: window.location.search };
}

/** Compiles a route pattern like "/articulos/:slug" into a regex + param keys. */
function compilePath(pattern: string) {
  const keys: string[] = [];
  const source = pattern
    .replace(/:[a-zA-Z_][a-zA-Z0-9_]*/g, (m) => {
      keys.push(m.slice(1));
      return "([^/]+)";
    })
    .replace(/\*/g, ".*");
  return { regex: new RegExp(`^${source}$`), keys };
}

/** Returns extracted params if the pathname matches the pattern, else null. */
function matchRoute(
  pattern: string,
  pathname: string,
): Record<string, string> | null {
  const { regex, keys } = compilePath(pattern);
  const m = pathname.match(regex);
  if (!m) return null;
  return Object.fromEntries(
    keys.map((k, i) => [k, decodeURIComponent(m[i + 1])]),
  );
}

// ── BrowserRouter ─────────────────────────────────────────────────────────────

export function BrowserRouter({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState(getLocation);

  useEffect(() => {
    const onPop = () => setLocation(getLocation());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((to: string | number) => {
    if (typeof to === "number") {
      // navigate(-1) etc — browser handles it, popstate fires and updates state
      window.history.go(to);
    } else {
      window.history.pushState(null, "", to);
      setLocation(getLocation());
    }
  }, []);

  const value = useMemo(() => ({ location, navigate }), [location, navigate]);

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}

// ── Hooks ─────────────────────────────────────────────────────────────────────

export function useNavigate(): (to: string | number) => void {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useNavigate must be used inside <BrowserRouter>");
  return ctx.navigate;
}

export function useLocation(): RouterLocation {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useLocation must be used inside <BrowserRouter>");
  return ctx.location;
}

export function useParams<T extends Record<string, string>>(): T {
  return useContext(ParamsContext) as T;
}

// ── Route / Routes ────────────────────────────────────────────────────────────

export interface RouteProps {
  path: string;
  element: ReactNode;
}

/** Route is a data carrier only — it renders nothing itself. */
export function Route(_props: RouteProps): null {
  return null;
}

/** Matches the current pathname against child <Route> elements and renders the first hit. */
export function Routes({ children }: { children: ReactNode }): ReactElement | null {
  const ctx = useContext(RouterContext);
  if (!ctx) return null;

  const pathname = ctx.location.pathname;

  for (const child of Children.toArray(children)) {
    if (!isValidElement<RouteProps>(child)) continue;
    const { path, element } = child.props;
    const params = matchRoute(path, pathname);
    if (params !== null) {
      return (
        <ParamsContext.Provider value={params}>
          {element as ReactElement}
        </ParamsContext.Provider>
      );
    }
  }

  return null; // no route matched
}
