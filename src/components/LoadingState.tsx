import { Spinner } from "./Spinner";

export function LoadingState() {
  return (
    <div className="splash-screen">
      <div className="splash-inner">
        <img src="/cannaplan-ear.svg" alt="Cannaplan" className="splash-logo" />
        <Spinner />
      </div>
    </div>
  );
}
