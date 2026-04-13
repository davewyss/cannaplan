import { ArrowLeft, Check, Menu as MenuIcon, Share2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "../router";
import type { Article } from "../types";

interface ArticleBottomBarProps {
  article?: Article | null;
}

export function ArticleBottomBar({ article }: ArticleBottomBarProps) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareTitle = article?.title ?? "Cannaplan";
    const shareText = article?.excerpt ?? "Lee este artículo en Cannaplan";

    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: shareText, url: shareUrl });
      } catch {
        // user dismissed — do nothing
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // clipboard blocked — do nothing
      }
    }
  };

  return (
    <div className="bottom-nav-wrap">
      <div className="bottom-nav">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          <span>Volver</span>
        </button>
        <div className="bottom-nav-spacer" />
        <button onClick={handleShare}>
          {copied ? <Check size={18} /> : <Share2 size={18} />}
          <span>{copied ? "¡Copiado!" : "Compartir"}</span>
        </button>
        <button onClick={() => navigate("/menu")}>
          <MenuIcon size={18} />
          <span>Menú</span>
        </button>
      </div>
    </div>
  );
}
