import { useEffect, useRef } from "react";

declare const L: any;

export function SpainMapPreview({ onClick }: { onClick?: () => void }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || typeof L === "undefined") return;
    if (instanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [40.2, -3.5],
      zoom: 5,
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      keyboard: false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Pin at Madrid
    const icon = L.divIcon({
      className: "",
      html: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 30 32"><path d="M15 1C9.48 1 5 5.48 5 11c0 8.25 10 20 10 20s10-11.75 10-20c0-5.52-4.48-10-10-10z" fill="#1d8867" stroke="white" stroke-width="2"/><circle cx="15" cy="11" r="4" fill="white" fill-opacity="0.9"/></svg>`,
      iconSize: [28, 28],
      iconAnchor: [14, 28],
    });

    L.marker([40.416, -3.703], { icon }).addTo(map);

    instanceRef.current = map;

    return () => {
      map.remove();
      instanceRef.current = null;
    };
  }, []);

  return (
    <div
      className="spain-map-preview-wrap"
      onClick={onClick}
      role={onClick ? "button" : undefined}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div ref={mapRef} className="spain-map-preview" />
    </div>
  );
}
