import type { Brand, HistoryEntry } from "./maintenance-data";

const KEY = "vw-maintenance-state-v2";
const LEGACY_KEY = "vw-maintenance-state-v1";

export interface VehicleConfig {
  modelId: string | null;
  generationId: string | null;
  engineId: string | null;
  transmission: string | null;
  drivetrain: string | null;
}

export interface AppState {
  brand: Brand;
  vehicleName: string;
  vehicle: VehicleConfig;
  currentKm: number;
  // map of itemId -> last done km
  lastDone: Record<string, number>;
  history: HistoryEntry[];
  theme: "dark" | "light";
}

const DEFAULT_STATE: AppState = {
  brand: "Volkswagen",
  vehicleName: "Mon véhicule",
  vehicle: {
    modelId: null,
    generationId: null,
    engineId: null,
    transmission: null,
    drivetrain: null,
  },
  currentKm: 0,
  lastDone: {},
  history: [],
  theme: "dark",
};

export function loadState(): AppState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(KEY) ?? localStorage.getItem(LEGACY_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<AppState>;
    return {
      ...DEFAULT_STATE,
      ...parsed,
      vehicle: { ...DEFAULT_STATE.vehicle, ...(parsed.vehicle ?? {}) },
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveState(state: AppState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}
