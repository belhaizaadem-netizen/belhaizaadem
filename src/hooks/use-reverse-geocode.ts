import { useEffect, useRef, useState } from "react";

interface ReverseGeocodeResult {
  city: string | null;
  country: string | null;
  countryCode: string | null;
  loading: boolean;
  error: string | null;
}

interface CacheEntry {
  city: string | null;
  country: string | null;
  countryCode: string | null;
  ts: number;
}

const CACHE_KEY = "vag-revgeo-cache-v1";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24h
const MIN_REQUEST_INTERVAL_MS = 30_000; // au max une requête / 30s
const MIN_MOVE_KM = 0.5; // ne re-géocode que si déplacement > 500m

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function roundKey(lat: number, lon: number) {
  // ~1 km de précision pour le cache
  return `${lat.toFixed(2)},${lon.toFixed(2)}`;
}

function loadCache(): Record<string, CacheEntry> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveCache(cache: Record<string, CacheEntry>) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    /* ignore */
  }
}

export function useReverseGeocode(
  latitude: number | null,
  longitude: number | null,
  enabled: boolean,
): ReverseGeocodeResult {
  const [result, setResult] = useState<ReverseGeocodeResult>({
    city: null,
    country: null,
    countryCode: null,
    loading: false,
    error: null,
  });

  const lastFetchRef = useRef<{ lat: number; lon: number; t: number } | null>(null);

  useEffect(() => {
    if (!enabled || latitude == null || longitude == null) return;

    // 1) Cache local
    const cache = loadCache();
    const key = roundKey(latitude, longitude);
    const cached = cache[key];
    if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
      setResult({
        city: cached.city,
        country: cached.country,
        countryCode: cached.countryCode,
        loading: false,
        error: null,
      });
      lastFetchRef.current = { lat: latitude, lon: longitude, t: Date.now() };
      return;
    }

    // 2) Throttle : pas trop souvent + bouger suffisamment
    const last = lastFetchRef.current;
    if (last) {
      const elapsed = Date.now() - last.t;
      const moved = haversineKm(last.lat, last.lon, latitude, longitude);
      if (elapsed < MIN_REQUEST_INTERVAL_MS && moved < MIN_MOVE_KM) return;
    }

    const controller = new AbortController();
    const fetchLocation = async () => {
      setResult((s) => ({ ...s, loading: true, error: null }));
      try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=10&accept-language=fr`;
        const res = await fetch(url, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const addr = data.address ?? {};
        const city =
          addr.city ||
          addr.town ||
          addr.village ||
          addr.municipality ||
          addr.county ||
          addr.state ||
          null;
        const country = addr.country ?? null;
        const countryCode = (addr.country_code ?? null)?.toUpperCase?.() ?? null;

        // Sauve dans le cache
        const newCache = loadCache();
        newCache[key] = { city, country, countryCode, ts: Date.now() };
        saveCache(newCache);

        lastFetchRef.current = { lat: latitude, lon: longitude, t: Date.now() };
        setResult({ city, country, countryCode, loading: false, error: null });
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
        setResult((s) => ({ ...s, loading: false, error: (e as Error).message }));
      }
    };

    fetchLocation();
    return () => controller.abort();
  }, [latitude, longitude, enabled]);

  return result;
}
