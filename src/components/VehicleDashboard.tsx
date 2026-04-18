import {
  Battery,
  Car,
  CircleDot,
  Disc3,
  Droplet,
  Fuel,
  Settings2,
  Thermometer,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  applicableItems,
  computeStatus,
  type Brand,
  type MaintenanceStatus,
  type Status,
} from "@/lib/maintenance-data";
import { findEngine, findGeneration, findModel } from "@/lib/vehicles";
import type { VehicleConfig } from "@/lib/storage";
import { cn } from "@/lib/utils";

interface Props {
  brand: Brand;
  vehicle: VehicleConfig;
  km: number;
  lastDone: Record<string, number>;
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

// status priority: pick the worst status across a set of items
const STATUS_RANK: Record<Status, number> = { overdue: 3, due: 2, soon: 1, ok: 0 };

function worstStatus(statuses: MaintenanceStatus[]): Status {
  let worst: Status = "ok";
  for (const s of statuses) {
    if (STATUS_RANK[s.status] > STATUS_RANK[worst]) worst = s.status;
  }
  return worst;
}

export function VehicleDashboard({
  brand,
  vehicle,
  km,
  lastDone,
  onKmChange,
}: Props) {
  const [local, setLocal] = useState(String(km));

  useEffect(() => {
    setLocal(String(km));
  }, [km]);

  const model = vehicle.modelId ? findModel(brand, vehicle.modelId) : undefined;
  const generation =
    vehicle.modelId && vehicle.generationId
      ? findGeneration(brand, vehicle.modelId, vehicle.generationId)
      : undefined;
  const engine =
    vehicle.modelId && vehicle.generationId && vehicle.engineId
      ? findEngine(brand, vehicle.modelId, vehicle.generationId, vehicle.engineId)
      : undefined;

  // Compute warning lights from real maintenance data
  const lights = useMemo(() => {
    const items = applicableItems(engine ?? null, vehicle.transmission);
    const statuses = items.map((it) =>
      computeStatus(it, km, lastDone[it.id] ?? 0, engine ?? null),
    );

    const pickByIds = (ids: string[]) =>
      statuses.filter((s) => ids.includes(s.item.id));
    const pickByCat = (cat: string) =>
      statuses.filter((s) => s.item.category === cat);

    return {
      oil: worstStatus(pickByIds(["huile-moteur", "filtre-air"])),
      brakes: worstStatus(pickByCat("Freinage")),
      abs: worstStatus(pickByIds(["capteurs-abs"])),
      tires: worstStatus(pickByIds(["inspection-pneus"])),
      coolant: worstStatus(pickByCat("Refroidissement")),
      battery: worstStatus(pickByIds(["batterie", "diag-ecu"])),
    };
  }, [engine, vehicle.transmission, km, lastDone]);

  const commit = (v: string) => {
    const n = parseInt(v.replace(/\D/g, ""), 10);
    onKmChange(isNaN(n) ? 0 : n);
  };

  const formattedKm = (parseInt(local, 10) || 0).toLocaleString("fr-FR");

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card to-secondary/40 shadow-card">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute -top-16 left-1/2 h-32 w-64 -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--gradient-primary)" }}
        aria-hidden
      />

      {/* Header — vehicle identity */}
      <div className="relative flex items-center justify-between gap-2 border-b border-border/50 px-4 py-2.5">
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
          <span className="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
            {engine.power} ch
          </span>
        )}
      </div>

      {/* Modern odometer */}
      <div className="relative px-5 pt-5 pb-4">
        <label className="mb-1 block text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Kilométrage
        </label>

        <div className="relative">
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
            className="sr-only"
            id="km-input"
          />
          <label
            htmlFor="km-input"
            className="block cursor-text select-none text-center"
          >
            <span
              className="bg-clip-text text-5xl font-extrabold leading-none tracking-tight tabular-nums text-transparent"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              {formattedKm}
            </span>
            <span className="ml-1.5 text-base font-bold text-muted-foreground">
              km
            </span>
          </label>
          <p className="mt-1 text-center text-[10px] text-muted-foreground/70">
            Touchez pour modifier
          </p>
        </div>
      </div>

      {/* Warning lights row */}
      <div className="grid grid-cols-6 gap-1.5 border-t border-border/50 bg-background/40 px-3 py-3">
        <Light icon={Droplet} label="Huile" status={lights.oil} />
        <Light icon={Disc3} label="Freins" status={lights.brakes} />
        <Light icon={CircleDot} label="ABS" status={lights.abs} />
        <Light icon={CircleDot} label="Pneus" status={lights.tires} />
        <Light icon={Thermometer} label="Temp." status={lights.coolant} />
        <Light icon={Battery} label="Bat." status={lights.battery} />
      </div>

      {/* Spec strip */}
      {engine ? (
        <div className="grid grid-cols-3 gap-1.5 border-t border-border/50 bg-secondary/30 px-3 py-2.5">
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
        <div className="border-t border-border/50 bg-secondary/30 px-4 py-2.5 text-center text-[11px] text-muted-foreground">
          Choisissez modèle + motorisation
        </div>
      )}
    </div>
  );
}

function Light({
  icon: Icon,
  label,
  status,
}: {
  icon: typeof Car;
  label: string;
  status: Status;
}) {
  const styles: Record<
    Status,
    { wrap: string; icon: string; ring: string; pulse: boolean }
  > = {
    overdue: {
      wrap: "bg-destructive/15 border-destructive/40",
      icon: "text-destructive",
      ring: "shadow-[0_0_14px_-2px_var(--destructive)]",
      pulse: true,
    },
    due: {
      wrap: "bg-destructive/10 border-destructive/30",
      icon: "text-destructive",
      ring: "shadow-[0_0_10px_-2px_var(--destructive)]",
      pulse: false,
    },
    soon: {
      wrap: "bg-warning/15 border-warning/40",
      icon: "text-warning",
      ring: "shadow-[0_0_10px_-2px_var(--warning)]",
      pulse: false,
    },
    ok: {
      wrap: "bg-success/10 border-success/25",
      icon: "text-success/80",
      ring: "",
      pulse: false,
    },
  };
  const s = styles[status];
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-xl border transition-all",
          s.wrap,
          s.ring,
          s.pulse && "animate-pulse",
        )}
        title={`${label} — ${status}`}
        aria-label={`${label}: ${status}`}
      >
        <Icon className={cn("h-4 w-4", s.icon)} strokeWidth={2.4} />
      </div>
      <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
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
    <div className="flex min-w-0 flex-col items-center text-center">
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
