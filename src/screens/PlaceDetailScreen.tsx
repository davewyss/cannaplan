import { Clock, ExternalLink, Globe, Mail, MapPin, Navigation, Phone } from "lucide-react";
import type { Place } from "../types";
import { useSocialMeta } from "../hooks/useSocialMeta";
import { FALLBACK_BANNER, FALLBACK_LOGO } from "../lib/images";

export default function PlaceDetailScreen({
  place,
  onBack: _onBack,
}: {
  place: Place;
  onBack: () => void;
}) {
  useSocialMeta(
    place.name,
    place.bio || place.description,
    place.bannerUrl,
    `/mapa/${place.slug}`
  );

  const hasContact = Boolean(place.phone || place.email || place.address || place.hours);
  const hasLinks   = Boolean(place.websiteUrl || place.link1Url || place.link2Url);
  const displayArea = [place.city || place.area, place.country].filter(Boolean).join(", ");

  // Helper to build Google Maps directions URL
  const getMapsDirectionsUrl = (): string => {
    const addrParts = [place.address1 || place.address, place.city, place.province]
      .filter(Boolean);
    const query = encodeURIComponent(addrParts.join(", "));
    return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
  };

  return (
    <div className="place-profile cp-card">

      {/* ── Banner + logo (logo is inside banner div, absolutely positioned) ── */}
      <div className="place-profile-banner-outer">
        <img
          src={place.bannerUrl || FALLBACK_BANNER}
          alt={place.bannerAlt ?? place.name}
          className="place-profile-banner"
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_BANNER; }}
        />

        {/* Logo sits half-inside / half-below the banner */}
        <img
          src={place.imageUrl || FALLBACK_LOGO}
          alt={place.logoAlt ?? place.name}
          className="place-profile-logo"
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_LOGO; }}
        />
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
            {place.phone && (
              <div className="place-profile-contact-row">
                <Phone size={15} color="var(--cp-brand)" />
                <span>{place.phone}</span>
              </div>
            )}
            {place.email && (
              <div className="place-profile-contact-row">
                <Mail size={15} color="var(--cp-brand)" />
                <span>{place.email}</span>
              </div>
            )}
            {place.address && (
              <div className="place-profile-contact-row place-profile-contact-address">
                <MapPin size={15} color="var(--cp-brand)" />
                <span className="place-profile-address-text">{place.address1 || place.address}</span>
                <a
                  href={getMapsDirectionsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="place-profile-directions-btn"
                  title="Cómo llegar"
                >
                  <Navigation size={13} />
                </a>
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
            {place.websiteUrl && (
              <a
                href={place.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="place-profile-link-btn place-profile-link-btn--website"
              >
                <Globe size={14} />
                Sitio Web
              </a>
            )}
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
