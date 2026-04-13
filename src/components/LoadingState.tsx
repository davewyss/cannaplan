import { Spinner } from "./Spinner";

export function LoadingState() {
  return (
    <div className="splash-screen">
      <div className="splash-inner">
        <img src="/logo_reverse_512.png" alt="Cannaplan" className="splash-logo" />
        <Spinner />
      </div>
    </div>
  );
}
