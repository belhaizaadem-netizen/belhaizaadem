import { Car, Fuel, Gauge, Settings2, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import type { Brand } from "@/lib/maintenance-data";
import { findEngine, findGeneration, findModel } from "@/lib/vehicles";
import type { VehicleConfig } from "@/lib/storage";
import { cn } from "@/lib/utils";

interface Props {
  brand: Brand;
  vehicle: VehicleConfig;
  km: number;
  onKmChange: (km: number) => void;
}

const fuelLabel: Record<string, string> = {
  essence: "Essence",
  diesel: "Diesel",
  hybride: "Hybride",
  phev: "PHEV",
  electrique: "Électrique",
  gnv: "GNV",
};

export function VehicleDashboard({ brand, vehicle, km, onKmChange }: Props) {
  const [local, setLocal] = useState(String(km));

  useEffect(() => {
    setLocal(String(km));
  }, [km]);

  const model =
    vehicle.modelId ? findModel(brand, vehicle.modelId) : undefined;
  const generation =
    vehicle.modelId && vehicle.generationId
      ? findGeneration(brand, vehicle.modelId, vehicle.generationId)
      : undefined;
  const engine =
    vehicle.modelId && vehicle.generationId && vehicle.engineId
      ? findEngine(brand, vehicle.modelId, vehicle.generationId, vehicle.engineId)
      : undefined;

  const commit = (v: string) => {
    const n = parseInt(v.replace(/\D/g, ""), 10);
    onKmChange(isNaN(n) ? 0 : n);
  };

  const formattedKm = (parseInt(local, 10) || 0).toLocaleString("fr-FR");

  // visual gauge fill (purely cosmetic, caps at 300 000 km)
  const gaugePct = Math.min(100, ((parseInt(local, 10) || 0) / 300000) * 100);

  return (
    <div className="gradient-card shadow-card relative overflow-hidden rounded-2xl border border-border">
      {/* Header bar — vehicle identity */}
      <div className="flex items-center justify-between gap-2 border-b border-border/60 bg-secondary/40 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <div className="gradient-primary shadow-glow rounded-lg p-1.5">
            <Car className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={2.4} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-bold leading-tight text-foreground">
              {brand}
              {model ? ` ${model.name}` : ""}
            </p>
            <p className="truncate text-[10px] leading-tight text-muted-foreground">
              {generation ? generation.name : "Sélectionnez un véhicule"}
            </p>
          </div>
        </div>
        {engine && (
          <span className="shrink-0 rounded-full border border-border bg-card px-2 py-0.5 text-[10px] font-semibold text-foreground">
            {engine.power} ch
          </span>
        )}
      </div>

      {/* Odometer */}
      <div className="px-4 pt-4">
        <div className="flex items-center gap-3">
          <div className="gradient-primary shadow-glow rounded-xl p-2.5">
            <Gauge className="h-5 w-5 text-primary-foreground" strokeWidth={2.2} />
          </div>
          <div className="min-w-0 flex-1">
            <label className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Kilométrage actuel
            </label>
            <div className="flex items-baseline gap-1.5">
              <input
                type="text"
                inputMode="numeric"
                value={local}
                onChange={(e) => setLocal(e.target.value.replace(/\D/g, ""))}
                onBlur={() => commit(local)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                }}
                placeholder="0"
                aria-label="Kilométrage actuel"
                className="w-full bg-transparent text-2xl font-bold tracking-tight text-foreground outline-none placeholder:text-muted-foreground"
              />
              <span className="text-sm font-semibold text-muted-foreground">km</span>
            </div>
          </div>
        </div>

        {/* digital odometer display */}
        <div className="mt-3 rounded-xl border border-border bg-background/60 px-3 py-2 font-mono text-center text-lg font-bold tracking-[0.2em] text-primary tabular-nums">
          {formattedKm.padStart(7, "0")}
        </div>

        {/* cosmetic gauge */}
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="gradient-primary h-full rounded-full transition-all duration-500"
            style={{ width: `${gaugePct}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between text-[9px] font-medium text-muted-foreground">
          <span>0</span>
          <span>150 000</span>
          <span>300 000+</span>
        </div>
      </div>

      {/* Spec strip */}
      {engine ? (
        <div className="mt-3 grid grid-cols-3 gap-1.5 border-t border-border/60 bg-secondary/30 px-3 py-2.5">
          <SpecChip icon={Settings2} label="Moteur" value={engine.name} />
          <SpecChip
            icon={Fuel}
            label="Carburant"
            value={fuelLabel[engine.fuel] ?? engine.fuel}
          />
          <SpecChip
            icon={Zap}
            label="Trans."
            value={vehicle.transmission ?? engine.transmissions[0] ?? "—"}
          />
        </div>
      ) : (
        <div className="mt-3 border-t border-border/60 bg-secondary/30 px-4 py-2.5 text-center text-[11px] text-muted-foreground">
          Choisissez modèle + motorisation pour voir les caractéristiques
        </div>
      )}
    </div>
  );
}

function SpecChip({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Car;
  label: string;
  value: string;
}) {
  return (
    <div className={cn("flex min-w-0 flex-col items-center text-center")}>
      <div className="flex items-center gap-1 text-muted-foreground">
        <Icon className="h-2.5 w-2.5" strokeWidth={2.4} />
        <span className="text-[9px] font-medium uppercase tracking-wider">
          {label}
        </span>
      </div>
      <span className="mt-0.5 truncate text-[11px] font-semibold text-foreground">
        {value}
      </span>
    </div>
  );
}
