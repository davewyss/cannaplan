import { useEffect, useState } from "react";

export type GeoState =
  | { status: "loading" }
  | { status: "active"; lat: number; lng: number }
  | { status: "denied"; reason: string };

export function useGeolocation(): GeoState {
  const [state, setState] = useState<GeoState>({ status: "loading" });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({ status: "denied", reason: "Tu navegador no soporta geolocalización." });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({
          status: "active",
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        const reason =
          err.code === 1
            ? "Has denegado el acceso a tu ubicación."
            : err.code === 2
            ? "No se pudo obtener tu ubicación. Inténtalo de nuevo."
            : "Se agotó el tiempo para obtener tu ubicación.";
        setState({ status: "denied", reason });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  return state;
}

/** Haversine distance in km between two lat/lng points */
export function distanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
