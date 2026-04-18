import { useEffect, useState, useCallback } from "react";
import { loadState, saveState, type AppState, type VehicleConfig } from "@/lib/storage";
import type { Brand, HistoryEntry } from "@/lib/maintenance-data";

export function useAppState() {
  const [state, setState] = useState<AppState>(() => loadState());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveState(state);
  }, [state, hydrated]);

  // theme
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (state.theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
  }, [state.theme]);

  const setCurrentKm = useCallback((km: number) => {
    setState((s) => ({ ...s, currentKm: Math.max(0, km) }));
  }, []);

  const setBrand = useCallback((brand: Brand) => {
    setState((s) => ({
      ...s,
      brand,
      // reset vehicle cascade when brand changes
      vehicle: { modelId: null, generationId: null, engineId: null, transmission: null, drivetrain: null },
    }));
  }, []);

  const setVehicle = useCallback((vehicle: Partial<VehicleConfig>) => {
    setState((s) => ({ ...s, vehicle: { ...s.vehicle, ...vehicle } }));
  }, []);

  const setVehicleName = useCallback((vehicleName: string) => {
    setState((s) => ({ ...s, vehicleName }));
  }, []);

  const toggleTheme = useCallback(() => {
    setState((s) => ({ ...s, theme: s.theme === "dark" ? "light" : "dark" }));
  }, []);

  const markDone = useCallback((itemId: string, km: number, note?: string) => {
    setState((s) => {
      const entry: HistoryEntry = {
        id: `${itemId}-${Date.now()}`,
        itemId,
        km,
        date: new Date().toISOString(),
        note,
      };
      return {
        ...s,
        lastDone: { ...s.lastDone, [itemId]: km },
        history: [entry, ...s.history],
      };
    });
  }, []);

  const removeHistory = useCallback((id: string) => {
    setState((s) => ({ ...s, history: s.history.filter((h) => h.id !== id) }));
  }, []);

  const resetAll = useCallback(() => {
    setState((s) => ({ ...s, lastDone: {}, history: [] }));
  }, []);

  const resetItems = useCallback((itemIds: string[]) => {
    if (itemIds.length === 0) return;
    const ids = new Set(itemIds);
    setState((s) => {
      const lastDone = { ...s.lastDone };
      ids.forEach((id) => {
        delete lastDone[id];
      });
      return {
        ...s,
        lastDone,
        history: s.history.filter((h) => !ids.has(h.itemId)),
      };
    });
  }, []);

  return {
    state,
    hydrated,
    setCurrentKm,
    setBrand,
    setVehicle,
    setVehicleName,
    toggleTheme,
    markDone,
    removeHistory,
    resetAll,
    resetItems,
  };
}
