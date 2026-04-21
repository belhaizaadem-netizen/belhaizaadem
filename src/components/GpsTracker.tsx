import { Navigation, Pause, Play, Satellite } from "lucide-react";
import { useGpsTracker, type GpsState } from "@/hooks/use-gps-tracker";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const ENABLED_KEY = "vag-gps-enabled-v1";

interface Props {
  onDistanceDelta: (km: number) => void;
  onLiveSpeed?: (kmh: number) => void;
  onLivePosition?: (pos: {
    latitude: number | null;
    longitude: number | null;
    accuracy: number | null;
    heading: number | null;
    enabled: boolean;
  }) => void;
}

export function GpsTracker({ onDistanceDelta, onLiveSpeed, onLivePosition }: Props) {
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(ENABLED_KEY) === "1";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(ENABLED_KEY, enabled ? "1" : "0");
  }, [enabled]);

  const gps = useGpsTracker({ enabled, onDistanceDelta });

  useEffect(() => {
    onLiveSpeed?.(enabled ? gps.speedKmh : 0);
  }, [gps.speedKmh, enabled, onLiveSpeed]);

  useEffect(() => {
    onLivePosition?.({
      latitude: enabled ? gps.latitude : null,
      longitude: enabled ? gps.longitude : null,
      accuracy: enabled ? gps.accuracy : null,
      heading: enabled ? gps.heading : null,
      enabled,
    });
  }, [enabled, gps.latitude, gps.longitude, gps.accuracy, gps.heading, onLivePosition]);

  return (
    <div className="gradient-card shadow-card overflow-hidden rounded-2xl border border-border">
      <div className="flex items-center gap-3 p-3">
        <div
          className={cn(
            "rounded-xl p-2.5 transition-colors",
            enabled
              ? "gradient-primary shadow-glow"
              : "bg-secondary",
          )}
        >
          <Satellite
            className={cn(
              "h-5 w-5 transition-colors",
              enabled ? "text-primary-foreground" : "text-muted-foreground",
            )}
            strokeWidth={2.2}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-foreground">Suivi GPS</p>
            <ModeBadge state={gps} enabled={enabled} />
          </div>
          <p className="text-[11px] text-muted-foreground">
            {enabled
              ? gps.mode === "tracking"
                ? `${gps.speedKmh.toFixed(0)} km/h · session ${gps.sessionKm.toFixed(2)} km`
                : gps.mode === "armed"
                  ? "En attente de mouvement (>10 km/h)…"
                  : "Initialisation…"
              : "Comptage automatique du kilométrage par GPS"}
          </p>
        </div>

        <button
          onClick={() => setEnabled((v) => !v)}
          className={cn(
            "shrink-0 rounded-xl border px-3 py-2 text-xs font-bold transition-colors",
            enabled
              ? "border-destructive/40 bg-destructive/15 text-destructive hover:bg-destructive/25"
              : "border-primary/40 bg-primary/15 text-primary hover:bg-primary/25",
          )}
          aria-label={enabled ? "Arrêter le GPS" : "Démarrer le GPS"}
        >
          {enabled ? (
            <span className="inline-flex items-center gap-1">
              <Pause className="h-3.5 w-3.5" strokeWidth={2.5} />
              Stop
            </span>
          ) : (
            <span className="inline-flex items-center gap-1">
              <Play className="h-3.5 w-3.5" strokeWidth={2.5} />
              Start
            </span>
          )}
        </button>
      </div>

      {enabled && (gps.error || gps.permission === "denied") && (
        <div className="border-t border-border bg-destructive/10 px-3 py-2 text-[11px] font-medium text-destructive">
          {gps.error ?? "Permission GPS refusée. Autorisez la localisation dans les paramètres du navigateur."}
        </div>
      )}

      {enabled && !gps.error && gps.mode === "tracking" && (
        <div className="grid grid-cols-3 gap-1.5 border-t border-border bg-secondary/30 px-3 py-2 text-center">
          <Stat label="Vitesse" value={`${gps.speedKmh.toFixed(0)} km/h`} />
          <Stat label="Session" value={`${gps.sessionKm.toFixed(2)} km`} />
          <Stat
            label="Précision"
            value={gps.accuracy ? `±${gps.accuracy.toFixed(0)} m` : "—"}
          />
        </div>
      )}

      {enabled && (
        <div className="flex items-center justify-between border-t border-border bg-secondary/20 px-3 py-1.5 text-[10px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Navigation className="h-3 w-3" strokeWidth={2.5} />
            Total GPS cumulé : <span className="font-semibold text-foreground">{gps.totalKm.toFixed(1)} km</span>
          </span>
          {gps.totalKm > 0 && (
            <button
              onClick={() => {
                if (confirm("Réinitialiser le total GPS cumulé ?")) gps.resetTotal();
              }}
              className="font-semibold text-primary hover:underline"
            >
              Reset
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function ModeBadge({ state, enabled }: { state: GpsState; enabled: boolean }) {
  if (!enabled) return null;
  const cfg =
    state.mode === "tracking"
      ? { label: "ENREGISTREMENT", className: "border-success/40 bg-success/15 text-success animate-pulse" }
      : state.mode === "armed"
        ? { label: "EN ATTENTE", className: "border-warning/40 bg-warning/15 text-warning" }
        : { label: "OFF", className: "border-border bg-secondary text-muted-foreground" };
  return (
    <span
      className={cn(
        "rounded-full border px-1.5 py-0.5 text-[8px] font-bold tracking-wider",
        cfg.className,
      )}
    >
      {cfg.label}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="text-[12px] font-bold tabular-nums text-foreground">
        {value}
      </span>
    </div>
  );
}
