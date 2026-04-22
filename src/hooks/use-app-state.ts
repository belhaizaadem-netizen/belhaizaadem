import { useEffect, useState, useCallback, useRef } from "react";
import { loadState, saveState, type AppState, type VehicleConfig } from "@/lib/storage";
import type { Brand, HistoryEntry } from "@/lib/maintenance-data";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

const REMOTE_MIGRATED_KEY = "vw-maintenance-remote-migrated";

interface RemoteRow {
  brand: string;
  vehicle_name: string;
  vehicle: VehicleConfig;
  current_km: number;
  last_done: Record<string, number>;
  history: HistoryEntry[];
}

function rowToState(row: RemoteRow, theme: AppState["theme"]): AppState {
  return {
    brand: row.brand as Brand,
    vehicleName: row.vehicle_name,
    vehicle: row.vehicle,
    currentKm: row.current_km,
    lastDone: row.last_done ?? {},
    history: row.history ?? [],
    theme,
  };
}

export function useAppState() {
  const { user, loading: authLoading } = useAuth();
  const [state, setState] = useState<AppState>(() => loadState());
  const [hydrated, setHydrated] = useState(false);
  const lastSavedRef = useRef<string>("");
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userIdRef = useRef<string | null>(null);

  // Load state from cloud (or local if not logged in)
  useEffect(() => {
    if (authLoading) return;

    let cancelled = false;

    async function load() {
      const local = loadState();

      if (!user) {
        if (cancelled) return;
        setState(local);
        setHydrated(true);
        userIdRef.current = null;
        return;
      }

      userIdRef.current = user.id;
      const { data, error } = await supabase
        .from("user_vehicle_state")
        .select("brand, vehicle_name, vehicle, current_km, last_done, history")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("Failed to load remote state", error);
        setState(local);
        setHydrated(true);
        return;
      }

      if (!data) {
        // First time login: migrate local data to cloud
        const migrated = local;
        const { error: insertErr } = await supabase.from("user_vehicle_state").insert({
          user_id: user.id,
          brand: migrated.brand,
          vehicle_name: migrated.vehicleName,
          vehicle: migrated.vehicle,
          current_km: migrated.currentKm,
          last_done: migrated.lastDone,
          history: migrated.history,
        });
        if (insertErr) console.error("Failed to migrate local state", insertErr);
        if (typeof window !== "undefined") {
          localStorage.setItem(REMOTE_MIGRATED_KEY, "1");
        }
        if (cancelled) return;
        setState(migrated);
        lastSavedRef.current = serializeForRemote(migrated);
      } else {
        const next = rowToState(data as RemoteRow, local.theme);
        setState(next);
        lastSavedRef.current = serializeForRemote(next);
      }
      setHydrated(true);
    }

    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, authLoading]);

  // Persist to local storage always (offline cache)
  useEffect(() => {
    if (hydrated) saveState(state);
  }, [state, hydrated]);

  // Persist to cloud (debounced) when logged in
  useEffect(() => {
    if (!hydrated || !user) return;
    const payload = serializeForRemote(state);
    if (payload === lastSavedRef.current) return;

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(async () => {
      const uid = userIdRef.current;
      if (!uid) return;
      const { error } = await supabase
        .from("user_vehicle_state")
        .update({
          brand: state.brand,
          vehicle_name: state.vehicleName,
          vehicle: state.vehicle,
          current_km: state.currentKm,
          last_done: state.lastDone,
          history: state.history,
        })
        .eq("user_id", uid);
      if (error) console.error("Failed to sync state", error);
      else lastSavedRef.current = payload;
    }, 600);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [state, hydrated, user]);

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

  const addKm = useCallback((delta: number) => {
    if (!delta || delta <= 0) return;
    setState((s) => ({ ...s, currentKm: Math.max(0, s.currentKm + delta) }));
  }, []);

  const setBrand = useCallback((brand: Brand) => {
    setState((s) => ({
      ...s,
      brand,
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
    addKm,
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

function serializeForRemote(s: AppState): string {
  return JSON.stringify({
    brand: s.brand,
    vehicleName: s.vehicleName,
    vehicle: s.vehicle,
    currentKm: s.currentKm,
    lastDone: s.lastDone,
    history: s.history,
  });
}
