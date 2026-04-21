import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "vag-gps-tracker-v1";
const AUTO_START_KMH = 10; // démarre l'enregistrement au-delà de 10 km/h
const AUTO_STOP_KMH = 3; // pause sous 3 km/h
const AUTO_STOP_DELAY_MS = 60_000; // 1 min sans mouvement → pause
const MIN_ACCURACY_M = 50; // ignore les points GPS imprécis
const MAX_REASONABLE_SPEED_KMH = 250; // garde-fou anti-glitch GPS

export type GpsMode = "off" | "armed" | "tracking";

export interface GpsState {
  mode: GpsMode;
  permission: PermissionState | "unknown";
  speedKmh: number; // vitesse instantanée
  sessionKm: number; // km parcourus depuis le démarrage
  totalKm: number; // total cumulé persistant
  accuracy: number | null;
  latitude: number | null;
  longitude: number | null;
  heading: number | null;
  error: string | null;
}

interface PersistedState {
  totalKm: number;
}

function loadPersisted(): PersistedState {
  if (typeof window === "undefined") return { totalKm: 0 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { totalKm: 0 };
    return JSON.parse(raw) as PersistedState;
  } catch {
    return { totalKm: 0 };
  }
}

// Formule de Haversine — distance entre 2 points GPS en km
function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // rayon Terre km
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

interface UseGpsTrackerOptions {
  enabled: boolean; // true quand l'utilisateur active le GPS
  onDistanceDelta?: (km: number) => void; // appelé pour ajouter au compteur véhicule
}

export function useGpsTracker({ enabled, onDistanceDelta }: UseGpsTrackerOptions) {
  const [state, setState] = useState<GpsState>(() => ({
    mode: "off",
    permission: "unknown",
    speedKmh: 0,
    sessionKm: 0,
    totalKm: loadPersisted().totalKm,
    accuracy: null,
    latitude: null,
    longitude: null,
    heading: null,
    error: null,
  }));

  const watchIdRef = useRef<number | null>(null);
  const lastPointRef = useRef<{ lat: number; lon: number; t: number } | null>(null);
  const lowSpeedSinceRef = useRef<number | null>(null);
  const modeRef = useRef<GpsMode>("off");
  const totalKmRef = useRef<number>(state.totalKm);
  const onDeltaRef = useRef(onDistanceDelta);

  useEffect(() => {
    onDeltaRef.current = onDistanceDelta;
  }, [onDistanceDelta]);

  const persistTotal = useCallback((km: number) => {
    totalKmRef.current = km;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ totalKm: km }));
    } catch {
      /* ignore */
    }
  }, []);

  const stop = useCallback(() => {
    if (watchIdRef.current != null && typeof navigator !== "undefined") {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }
    watchIdRef.current = null;
    lastPointRef.current = null;
    lowSpeedSinceRef.current = null;
    modeRef.current = "off";
    setState((s) => ({ ...s, mode: "off", speedKmh: 0, accuracy: null }));
  }, []);

  const handlePosition = useCallback(
    (pos: GeolocationPosition) => {
      const { latitude, longitude, accuracy, speed, heading } = pos.coords;
      const now = pos.timestamp;

      if (accuracy > MIN_ACCURACY_M) {
        setState((s) => ({ ...s, accuracy, latitude, longitude, heading: heading ?? s.heading }));
        return;
      }

      // Vitesse en km/h — préfère speed natif, sinon calcule via delta
      let speedKmh = 0;
      if (speed != null && !isNaN(speed) && speed >= 0) {
        speedKmh = speed * 3.6;
      } else if (lastPointRef.current) {
        const prev = lastPointRef.current;
        const dKm = haversineKm(prev.lat, prev.lon, latitude, longitude);
        const dH = (now - prev.t) / 3_600_000;
        if (dH > 0) speedKmh = dKm / dH;
      }
      if (speedKmh > MAX_REASONABLE_SPEED_KMH) speedKmh = 0;

      // Auto-armement : commence à enregistrer au-delà du seuil
      if (modeRef.current === "armed" && speedKmh >= AUTO_START_KMH) {
        modeRef.current = "tracking";
        lastPointRef.current = { lat: latitude, lon: longitude, t: now };
        lowSpeedSinceRef.current = null;
        setState((s) => ({ ...s, mode: "tracking", sessionKm: 0, latitude, longitude, heading: heading ?? s.heading, accuracy }));
        return;
      }

      // Mode tracking : accumule la distance
      if (modeRef.current === "tracking" && lastPointRef.current) {
        const prev = lastPointRef.current;
        const deltaKm = haversineKm(prev.lat, prev.lon, latitude, longitude);

        // Filtre micro-mouvements (jitter GPS au repos)
        if (deltaKm > 0.005) {
          const newTotal = totalKmRef.current + deltaKm;
          persistTotal(newTotal);
          onDeltaRef.current?.(deltaKm);
          setState((s) => ({
            ...s,
            sessionKm: s.sessionKm + deltaKm,
            totalKm: newTotal,
            speedKmh,
            accuracy,
            latitude,
            longitude,
            heading: heading ?? s.heading,
          }));
        } else {
          setState((s) => ({ ...s, speedKmh, accuracy, latitude, longitude, heading: heading ?? s.heading }));
        }

        // Auto-pause si arrêt prolongé
        if (speedKmh < AUTO_STOP_KMH) {
          if (lowSpeedSinceRef.current == null) {
            lowSpeedSinceRef.current = now;
          } else if (now - lowSpeedSinceRef.current > AUTO_STOP_DELAY_MS) {
            modeRef.current = "armed";
            setState((s) => ({ ...s, mode: "armed" }));
            lowSpeedSinceRef.current = null;
          }
        } else {
          lowSpeedSinceRef.current = null;
        }
      } else {
        setState((s) => ({ ...s, speedKmh, accuracy, latitude, longitude, heading: heading ?? s.heading }));
      }

      lastPointRef.current = { lat: latitude, lon: longitude, t: now };
    },
    [persistTotal],
  );

  const handleError = useCallback((err: GeolocationPositionError) => {
    const messages: Record<number, string> = {
      1: "Permission GPS refusée",
      2: "Position GPS indisponible",
      3: "Délai d'attente GPS dépassé",
    };
    setState((s) => ({
      ...s,
      error: messages[err.code] ?? err.message,
      mode: "off",
    }));
    modeRef.current = "off";
  }, []);

  const start = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setState((s) => ({ ...s, error: "GPS non disponible sur cet appareil" }));
      return;
    }
    if (watchIdRef.current != null) return;

    setState((s) => ({ ...s, mode: "armed", error: null, sessionKm: 0 }));
    modeRef.current = "armed";

    watchIdRef.current = navigator.geolocation.watchPosition(
      handlePosition,
      handleError,
      {
        enableHighAccuracy: true,
        maximumAge: 1_000,
        timeout: 15_000,
      },
    );
  }, [handlePosition, handleError]);

  // Démarre/arrête selon enabled
  useEffect(() => {
    if (enabled) start();
    else stop();
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  // Vérifie la permission
  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.permissions) return;
    navigator.permissions
      .query({ name: "geolocation" as PermissionName })
      .then((res) => {
        setState((s) => ({ ...s, permission: res.state }));
        res.onchange = () =>
          setState((s) => ({ ...s, permission: res.state }));
      })
      .catch(() => undefined);
  }, []);

  const resetSession = useCallback(() => {
    setState((s) => ({ ...s, sessionKm: 0 }));
  }, []);

  const resetTotal = useCallback(() => {
    persistTotal(0);
    setState((s) => ({ ...s, totalKm: 0 }));
  }, [persistTotal]);

  return { ...state, start, stop, resetSession, resetTotal };
}
