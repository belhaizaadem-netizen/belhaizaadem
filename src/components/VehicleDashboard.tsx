import {
  Car,
  Fuel,
  Settings2,
  Wind,
  Zap,
} from "lucide-react";
import {
  AbsIcon,
  BatteryIcon,
  BrakeIcon,
  CoolantIcon,
  EngineIcon,
  FilterIcon,
  OilIcon,
  TirePressureIcon,
} from "@/components/dashboard/TellTaleIcons";
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
  const { lights, nextServiceKm } = useMemo(() => {
    const items = applicableItems(engine ?? null, vehicle.transmission);
    const statuses = items.map((it) =>
      computeStatus(it, km, lastDone[it.id] ?? 0, engine ?? null),
    );

    const pickByIds = (ids: string[]) =>
      statuses.filter((s) => ids.includes(s.item.id));
    const pickByCat = (cat: string) =>
      statuses.filter((s) => s.item.category === cat);

    const lights = {
      moteur: worstStatus(pickByIds(["bougies", "filtre-air"])),
      huile: worstStatus(pickByIds(["huile-moteur"])),
      freins: worstStatus(pickByCat("Freinage")),
      abs: worstStatus(pickByIds(["capteurs-abs"])),
      pneus: worstStatus(pickByIds(["inspection-pneus"])),
      temp: worstStatus(pickByCat("Refroidissement")),
      batterie: worstStatus(pickByIds(["batterie"])),
      filtres: worstStatus(pickByIds(["filtre-habitacle", "filtre-air", "filtre-carburant"])),
    };

    const upcoming = statuses
      .filter((s) => s.kmRemaining > 0)
      .sort((a, b) => a.kmRemaining - b.kmRemaining)[0];

    return {
      lights,
      nextServiceKm: upcoming?.kmRemaining ?? null,
    };
  }, [engine, vehicle.transmission, km, lastDone]);

  const commit = (v: string) => {
    const n = parseInt(v.replace(/\D/g, ""), 10);
    onKmChange(isNaN(n) ? 0 : n);
  };

  const formattedKm = (parseInt(local, 10) || 0).toLocaleString("fr-FR");

  // Digital meters
  const rpmMax = 8000;
  const rpmValue = 0; // engine off in app context
  // Visual fill for the km meter — looks alive as user updates km, capped at 300k
  const kmMax = 300000;
  const kmFillPct = Math.min(100, (km / kmMax) * 100);
  const rpmFillPct = (rpmValue / rpmMax) * 100;

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

      {/* Twin digital meters */}
      <div className="relative grid grid-cols-2 gap-2 px-3 pb-3 pt-3">
        {/* LEFT — RPM digital meter */}
        <DigitalMeter
          label="Régime moteur"
          unit="tr/min"
          value={rpmValue}
          max={rpmMax}
          fillPct={rpmFillPct}
          accent="hsl(15 90% 55%)"
          formatValue={(v) => v.toLocaleString("fr-FR")}
          segments={20}
          redlineSegment={15}
          status="OFF"
        />

        {/* RIGHT — Kilométrage digital meter (editable) */}
        <DigitalMeter
          label="Kilométrage"
          unit="km"
          value={km}
          max={kmMax}
          fillPct={kmFillPct}
          accent="var(--primary)"
          formatValue={(v) => v.toLocaleString("fr-FR")}
          segments={20}
          editable
          editableProps={{
            inputId: "km-input",
            inputValue: local,
            onInputChange: (v) => setLocal(v.replace(/\D/g, "")),
            onBlur: () => commit(local),
            displayValue: formattedKm,
          }}
          footer={
            nextServiceKm != null ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-semibold text-white/70">
                <Wind className="h-2.5 w-2.5 text-primary" strokeWidth={2.5} />
                Service dans {nextServiceKm.toLocaleString("fr-FR")} km
              </span>
            ) : null
          }
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
    <div className="grid grid-cols-5 items-start gap-1 border-b border-white/5 bg-black/40 px-2 py-2">
      <Tell Icon={EngineIcon} status={lights.moteur} label="Moteur" variant="amber" />
      <Tell Icon={BatteryIcon} status={lights.batterie} label="Batterie" variant="red" />
      <Tell Icon={BrakeIcon} status={lights.freins} label="Freins" variant="red" />
      <Tell Icon={OilIcon} status={lights.huile} label="Huile" variant="red" />
      <Tell Icon={CoolantIcon} status={lights.temp} label="Temp." variant="red" />
    </div>
  );
}

function BottomWarningStrip({ lights }: { lights: Record<string, Status> }) {
  return (
    <div className="grid grid-cols-3 items-start gap-1 border-t border-white/5 bg-black/40 px-2 py-2">
      <Tell Icon={AbsIcon} status={lights.abs} label="ABS" variant="amber" />
      <Tell Icon={TirePressureIcon} status={lights.pneus} label="Pneus" variant="amber" />
      <Tell Icon={FilterIcon} status={lights.filtres} label="Filtres" variant="amber" />
    </div>
  );
}

function Tell({
  Icon,
  status,
  label,
  variant,
}: {
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  status: Status;
  label: string;
  variant: "red" | "amber";
}) {
  const isOn = status !== "ok";
  const lit =
    status === "overdue" || status === "due"
      ? variant === "red"
        ? { color: "text-destructive", glow: "drop-shadow-[0_0_6px_var(--destructive)]" }
        : { color: "text-warning", glow: "drop-shadow-[0_0_6px_var(--warning)]" }
      : status === "soon"
        ? { color: "text-warning", glow: "drop-shadow-[0_0_5px_var(--warning)]" }
        : { color: "text-white/20", glow: "" };

  const pulse = status === "overdue";

  return (
    <div
      className="flex flex-col items-center gap-0.5"
      title={`${label} — ${status}`}
      aria-label={`${label}: ${status}`}
    >
      <Icon
        className={cn(
          "h-5 w-5 transition-all",
          lit.color,
          isOn && lit.glow,
          pulse && "animate-pulse",
        )}
      />
      <span
        className={cn(
          "text-[8px] font-bold uppercase tracking-wider leading-none transition-colors",
          isOn ? "text-white/80" : "text-white/40",
        )}
      >
        {label}
      </span>
    </div>
  );
}


interface EditableProps {
  inputId: string;
  inputValue: string;
  onInputChange: (v: string) => void;
  onBlur: () => void;
  displayValue: string;
}

function DigitalMeter({
  label,
  unit,
  value,
  max,
  fillPct,
  accent,
  formatValue,
  segments,
  redlineSegment,
  status,
  editable = false,
  editableProps,
  footer,
}: {
  label: string;
  unit: string;
  value: number;
  max: number;
  fillPct: number;
  accent: string;
  formatValue: (v: number) => string;
  segments: number;
  redlineSegment?: number;
  status?: string;
  editable?: boolean;
  editableProps?: EditableProps;
  footer?: React.ReactNode;
}) {
  const display = editable && editableProps ? editableProps.displayValue : formatValue(value);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-black/40 px-3 py-3 shadow-inner">
      {/* glow */}
      <div
        className="pointer-events-none absolute -top-8 left-1/2 h-16 w-32 -translate-x-1/2 rounded-full opacity-30 blur-2xl"
        style={{ background: accent }}
        aria-hidden
      />

      {/* Header row */}
      <div className="relative flex items-center justify-between gap-1">
        <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/50">
          {label}
        </span>
        {status ? (
          <span
            className="rounded-sm border border-white/15 bg-black/40 px-1 py-0.5 text-[7px] font-black tracking-widest text-white/40"
          >
            {status}
          </span>
        ) : null}
      </div>

      {/* Big digital value */}
      <div className="relative mt-1 text-center">
        {editable && editableProps ? (
          <>
            <input
              type="text"
              inputMode="numeric"
              value={editableProps.inputValue}
              onChange={(e) => editableProps.onInputChange(e.target.value)}
              onBlur={editableProps.onBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") (e.target as HTMLInputElement).blur();
              }}
              placeholder="0"
              aria-label={`Saisir ${label}`}
              className="sr-only"
              id={editableProps.inputId}
            />
            <label
              htmlFor={editableProps.inputId}
              className="block cursor-text select-none"
              title="Touchez pour modifier"
            >
              <span
                className="block bg-clip-text text-3xl font-black leading-none tracking-tight tabular-nums text-transparent"
                style={{
                  backgroundImage: `linear-gradient(180deg, ${accent}, color-mix(in oklab, ${accent} 60%, white 40%))`,
                  fontFamily: "'Courier New', ui-monospace, monospace",
                  textShadow: `0 0 14px ${accent}`,
                }}
              >
                {display}
              </span>
            </label>
          </>
        ) : (
          <span
            className="block bg-clip-text text-3xl font-black leading-none tracking-tight tabular-nums text-transparent"
            style={{
              backgroundImage: `linear-gradient(180deg, ${accent}, color-mix(in oklab, ${accent} 60%, white 40%))`,
              fontFamily: "'Courier New', ui-monospace, monospace",
              textShadow: `0 0 14px ${accent}`,
            }}
          >
            {display}
          </span>
        )}
        <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-widest text-white/50">
          {unit}
          {editable ? " · touchez pour modifier" : ""}
        </span>
      </div>

      {/* Segmented bar */}
      <div className="relative mt-2 flex h-2 gap-[2px]">
        {Array.from({ length: segments }).map((_, i) => {
          const segPct = ((i + 1) / segments) * 100;
          const lit = segPct <= fillPct;
          const isRedline = redlineSegment != null && i >= redlineSegment;
          const segColor = isRedline ? "var(--destructive)" : accent;
          return (
            <div
              key={i}
              className="flex-1 rounded-[1px] transition-all"
              style={{
                background: lit ? segColor : "rgba(255,255,255,0.08)",
                boxShadow: lit ? `0 0 4px ${segColor}` : "none",
                opacity: lit ? 1 : 0.5,
              }}
            />
          );
        })}
      </div>

      {/* Scale labels */}
      <div className="mt-1 flex justify-between text-[7px] font-bold tabular-nums text-white/40">
        <span>0</span>
        <span>{formatValue(Math.round(max / 2))}</span>
        <span>{formatValue(max)}</span>
      </div>

      {footer ? <div className="relative mt-2 flex justify-center">{footer}</div> : null}
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
