import {
  AlertTriangle,
  Battery,
  Car,
  CircleDot,
  Disc3,
  Droplet,
  Fuel,
  Gauge,
  Settings2,
  Thermometer,
  Wind,
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
  const { lights, nextServiceKm, healthPct } = useMemo(() => {
    const items = applicableItems(engine ?? null, vehicle.transmission);
    const statuses = items.map((it) =>
      computeStatus(it, km, lastDone[it.id] ?? 0, engine ?? null),
    );

    const pickByIds = (ids: string[]) =>
      statuses.filter((s) => ids.includes(s.item.id));
    const pickByCat = (cat: string) =>
      statuses.filter((s) => s.item.category === cat);

    const lights = {
      moteur: worstStatus(pickByIds(["diag-ecu", "bougies", "filtre-air"])),
      huile: worstStatus(pickByIds(["huile-moteur"])),
      freins: worstStatus(pickByCat("Freinage")),
      abs: worstStatus(pickByIds(["capteurs-abs"])),
      pneus: worstStatus(pickByIds(["inspection-pneus"])),
      temp: worstStatus(pickByCat("Refroidissement")),
      batterie: worstStatus(pickByIds(["batterie"])),
      filtres: worstStatus(pickByIds(["filtre-habitacle", "filtre-air", "filtre-carburant"])),
    };

    // next service: smallest positive kmRemaining
    const upcoming = statuses
      .filter((s) => s.kmRemaining > 0)
      .sort((a, b) => a.kmRemaining - b.kmRemaining)[0];

    // health: % of items in OK
    const okCount = statuses.filter((s) => s.status === "ok").length;
    const healthPct = statuses.length
      ? Math.round((okCount / statuses.length) * 100)
      : 100;

    return {
      lights,
      nextServiceKm: upcoming?.kmRemaining ?? null,
      healthPct,
    };
  }, [engine, vehicle.transmission, km, lastDone]);

  const commit = (v: string) => {
    const n = parseInt(v.replace(/\D/g, ""), 10);
    onKmChange(isNaN(n) ? 0 : n);
  };

  const formattedKm = (parseInt(local, 10) || 0).toLocaleString("fr-FR");

  // Gauge math (semi-circle, 180deg arc)
  const RADIUS = 52;
  const CIRC = Math.PI * RADIUS; // half-circumference
  const healthDash = (healthPct / 100) * CIRC;

  // Service gauge: 0 km left = full red, 30k+ = green
  const serviceMax = 30000;
  const servicePct = nextServiceKm == null
    ? 100
    : Math.max(0, Math.min(100, (nextServiceKm / serviceMax) * 100));
  const serviceDash = (servicePct / 100) * CIRC;
  const serviceColor =
    servicePct < 15 ? "var(--destructive)" : servicePct < 40 ? "var(--warning)" : "var(--success)";
  const healthColor =
    healthPct < 50 ? "var(--destructive)" : healthPct < 80 ? "var(--warning)" : "var(--success)";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-[#0a0e14] via-[#0d1118] to-[#080b10] shadow-card">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--gradient-primary)" }}
        aria-hidden
      />

      {/* Header — vehicle identity */}
      <div className="relative flex items-center justify-between gap-2 border-b border-white/5 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <div className="gradient-primary shadow-glow rounded-lg p-1.5">
            <Car className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={2.4} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-bold leading-tight text-white">
              {brand}
              {model ? ` ${model.name}` : ""}
            </p>
            <p className="truncate text-[10px] leading-tight text-white/50">
              {generation ? generation.name : "Sélectionnez un véhicule"}
            </p>
          </div>
        </div>
        {engine && (
          <span className="shrink-0 rounded-full border border-primary/40 bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
            {engine.power} ch
          </span>
        )}
      </div>

      {/* Top warning lights strip — always visible like a real cluster */}
      <TopWarningStrip lights={lights} />

      {/* Twin gauges cluster */}
      <div className="relative grid grid-cols-[1fr_1.4fr_1fr] items-center gap-1 px-2 pb-3 pt-2">
        {/* LEFT gauge — Vehicle health */}
        <Gauge180
          value={healthPct}
          max={100}
          dash={healthDash}
          circ={CIRC}
          radius={RADIUS}
          color={healthColor}
          label="Santé"
          unit="%"
          icon={Gauge}
        />

        {/* CENTER — Odometer */}
        <div className="relative flex flex-col items-center justify-center px-1">
          <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/50">
            Kilométrage
          </span>
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
          <label htmlFor="km-input" className="block cursor-text select-none text-center">
            <span
              className="block bg-clip-text text-4xl font-extrabold leading-none tracking-tight tabular-nums text-transparent"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              {formattedKm}
            </span>
            <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-widest text-white/60">
              km total
            </span>
          </label>
          {nextServiceKm != null && (
            <div className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
              <Wind className="h-2.5 w-2.5 text-primary" strokeWidth={2.5} />
              <span className="text-[9px] font-semibold tabular-nums text-white/70">
                {nextServiceKm.toLocaleString("fr-FR")} km
              </span>
            </div>
          )}
        </div>

        {/* RIGHT gauge — Next service */}
        <Gauge180
          value={nextServiceKm ?? serviceMax}
          max={serviceMax}
          dash={serviceDash}
          circ={CIRC}
          radius={RADIUS}
          color={serviceColor}
          label="Service"
          unit="km"
          icon={Settings2}
          showRaw
        />
      </div>

      {/* Bottom warning lights — secondary row */}
      <BottomWarningStrip lights={lights} />

      {/* Spec strip */}
      {engine ? (
        <div className="grid grid-cols-3 gap-1.5 border-t border-white/5 bg-white/[0.02] px-3 py-2">
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
        <div className="border-t border-white/5 bg-white/[0.02] px-4 py-2.5 text-center text-[11px] text-white/50">
          Choisissez modèle + motorisation
        </div>
      )}
    </div>
  );
}

/* -------------------- Sub-components -------------------- */

function TopWarningStrip({ lights }: { lights: Record<string, Status> }) {
  return (
    <div className="flex items-center justify-center gap-2 border-b border-white/5 bg-black/40 px-3 py-2">
      <Tell icon={AlertTriangle} status={lights.moteur} title="Moteur" variant="amber" />
      <Tell icon={Battery} status={lights.batterie} title="Batterie" variant="red" />
      <Tell icon={Disc3} status={lights.freins} title="Freins" variant="red" />
      <Tell icon={Droplet} status={lights.huile} title="Huile moteur" variant="red" />
      <Tell icon={Thermometer} status={lights.temp} title="Température" variant="red" />
    </div>
  );
}

function BottomWarningStrip({ lights }: { lights: Record<string, Status> }) {
  return (
    <div className="flex items-center justify-center gap-2 border-t border-white/5 bg-black/40 px-3 py-2">
      <Tell icon={CircleDot} status={lights.abs} title="ABS" variant="amber" label="ABS" />
      <Tell icon={CircleDot} status={lights.pneus} title="Pression pneus" variant="amber" />
      <Tell icon={Wind} status={lights.filtres} title="Filtres" variant="amber" />
    </div>
  );
}

function Tell({
  icon: Icon,
  status,
  title,
  variant,
  label,
}: {
  icon: typeof Car;
  status: Status;
  title: string;
  variant: "red" | "amber";
  label?: string;
}) {
  const isOn = status !== "ok";
  // overdue/due => primary alert color (red for critical, amber for warnings)
  // soon => amber regardless
  const lit =
    status === "overdue" || status === "due"
      ? variant === "red"
        ? { color: "text-destructive", glow: "drop-shadow-[0_0_6px_var(--destructive)]" }
        : { color: "text-warning", glow: "drop-shadow-[0_0_6px_var(--warning)]" }
      : status === "soon"
        ? { color: "text-warning", glow: "drop-shadow-[0_0_5px_var(--warning)]" }
        : { color: "text-white/15", glow: "" };

  const pulse = status === "overdue";

  return (
    <div
      className={cn("relative flex h-6 w-6 items-center justify-center", pulse && "animate-pulse")}
      title={`${title} — ${status}`}
      aria-label={`${title}: ${status}`}
    >
      <Icon
        className={cn("h-5 w-5 transition-all", lit.color, isOn && lit.glow)}
        strokeWidth={2.4}
      />
      {label && (
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center text-[7px] font-black",
            lit.color,
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}

function Gauge180({
  value,
  max,
  dash,
  circ,
  radius,
  color,
  label,
  unit,
  icon: Icon,
  showRaw = false,
}: {
  value: number;
  max: number;
  dash: number;
  circ: number;
  radius: number;
  color: string;
  label: string;
  unit: string;
  icon: typeof Car;
  showRaw?: boolean;
}) {
  const size = radius * 2 + 16;
  const cx = size / 2;
  const cy = radius + 8;
  const display = showRaw
    ? value >= 1000
      ? `${(value / 1000).toFixed(1)}k`
      : Math.round(value).toString()
    : Math.round((value / max) * 100).toString();

  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={cy + 4} viewBox={`0 0 ${size} ${cy + 4}`} className="overflow-visible">
        {/* track */}
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={6}
          strokeLinecap="round"
        />
        {/* tick marks */}
        {Array.from({ length: 11 }).map((_, i) => {
          const angle = Math.PI - (i / 10) * Math.PI;
          const x1 = cx + Math.cos(angle) * (radius + 4);
          const y1 = cy - Math.sin(angle) * (radius + 4);
          const x2 = cx + Math.cos(angle) * (radius - 1);
          const y2 = cy - Math.sin(angle) * (radius - 1);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(255,255,255,0.18)"
              strokeWidth={i % 5 === 0 ? 1.5 : 0.8}
            />
          );
        })}
        {/* progress */}
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          style={{
            filter: `drop-shadow(0 0 4px ${color})`,
            transition: "stroke-dasharray 0.6s ease, stroke 0.4s ease",
          }}
        />
      </svg>
      <div className="-mt-7 flex flex-col items-center">
        <Icon className="h-3 w-3" style={{ color }} strokeWidth={2.5} />
        <span className="mt-0.5 text-base font-extrabold leading-none tabular-nums text-white">
          {display}
          <span className="ml-0.5 text-[8px] font-semibold text-white/50">{unit}</span>
        </span>
        <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-widest text-white/50">
          {label}
        </span>
      </div>
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
      <div className="flex items-center gap-1 text-white/50">
        <Icon className="h-2.5 w-2.5" strokeWidth={2.4} />
        <span className="text-[9px] font-medium uppercase tracking-wider">{label}</span>
      </div>
      <span className="mt-0.5 truncate text-[11px] font-semibold text-white/90">{value}</span>
    </div>
  );
}
