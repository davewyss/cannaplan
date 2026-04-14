import { Clock, ExternalLink, MapPin } from "lucide-react";
import type { Place } from "../types";

export default function PlaceDetailScreen({
  place,
  onBack: _onBack,
}: {
  place: Place;
  onBack: () => void;
}) {
  const hasContact = Boolean(place.address || place.hours);
  const hasLinks   = Boolean(place.link1Url || place.link2Url);
  const displayArea = [place.city || place.area, place.country].filter(Boolean).join(", ");

  return (
    <div className="place-profile">

      {/* ── Banner + logo (logo is inside banner div, absolutely positioned) ── */}
      <div className="place-profile-banner-outer">
        {place.bannerUrl ? (
          <img
            src={place.bannerUrl}
            alt={place.bannerAlt ?? place.name}
            className="place-profile-banner"
          />
        ) : (
          <div className="place-profile-banner place-profile-banner--empty" />
        )}

        {/* Logo sits half-inside / half-below the banner */}
        {place.imageUrl ? (
          <img
            src={place.imageUrl}
            alt={place.logoAlt ?? place.name}
            className="place-profile-logo"
          />
        ) : (
          <div className="place-profile-logo place-profile-logo--empty">
            {place.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* ── Body: everything below the banner ────────────────────────────── */}
      <div className="place-profile-body">

        {/* Name + meta */}
        <div className="place-profile-heading">
          <h1 className="place-profile-name">{place.name}</h1>
          <div className="place-profile-meta-row">
            {place.type && <span className="place-type-pill">{place.type}</span>}
            {displayArea && <span className="place-profile-area">{displayArea}</span>}
          </div>
        </div>

        {/* Bio — prefer Texto Largo, fall back to Texto Corto */}
        {(place.bio || place.description) && (
          <p className="place-profile-bio">
            {place.bio || place.description}
          </p>
        )}

        {/* Contact */}
        {hasContact && (
          <div className="place-profile-contact">
            {place.address && (
              <div className="place-profile-contact-row">
                <MapPin size={15} color="var(--cp-brand)" />
                <span>{place.address}</span>
              </div>
            )}
            {place.hours && (
              <div className="place-profile-contact-row">
                <Clock size={15} color="var(--cp-brand)" />
                <span>{place.hours}</span>
              </div>
            )}
          </div>
        )}

        {/* Links */}
        {hasLinks && (
          <div className="place-profile-links">
            {place.link1Url && (
              <a
                href={place.link1Url}
                target="_blank"
                rel="noopener noreferrer"
                className="place-profile-link-btn"
              >
                <ExternalLink size={14} />
                {place.link1Label || "Sitio web"}
              </a>
            )}
            {place.link2Url && (
              <a
                href={place.link2Url}
                target="_blank"
                rel="noopener noreferrer"
                className="place-profile-link-btn"
              >
                <ExternalLink size={14} />
                {place.link2Label || "Enlace"}
              </a>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
