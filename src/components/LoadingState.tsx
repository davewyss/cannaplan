import { Spinner } from "./Spinner";

export function LoadingState() {
  return (
    <div className="splash-screen">
      <div className="splash-inner">
        <img src="/cp_logo_512.png" alt="Cannaplan" className="splash-logo" />
        <Spinner />
      </div>
    </div>
  );
}
