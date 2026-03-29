import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { SectionTitle } from "../components/SectionTitle";

export default function SimpleInfoPage({
  eyebrow,
  title,
  body,
  icon,
  onBack,
}: {
  eyebrow: string;
  title: string;
  body: string;
  icon: ReactNode;
  onBack: () => void;
}) {
  return (
    <div className="screen-grid">
      <div className="back-row">
        <button onClick={onBack} className="back-button">
          <ArrowLeft size={18} />
        </button>
      </div>
      <div className="cp-card simple-info-card">
        <div className="simple-info-inner">
          <div className="simple-info-icon">{icon}</div>
          <SectionTitle eyebrow={eyebrow} title={title} body={body} />
        </div>
      </div>
    </div>
  );
}
