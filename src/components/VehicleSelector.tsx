import { useMemo, useState } from "react";
import { Car, ChevronRight, Check, Search, X } from "lucide-react";
import type { Brand } from "@/lib/maintenance-data";
import {
  modelsByBrand,
  findModel,
  findGeneration,
  findEngine,
  type Engine,
  type Generation,
  type Model,
} from "@/lib/vehicles";
import type { VehicleConfig } from "@/lib/storage";
import { cn } from "@/lib/utils";

interface Props {
  brand: Brand;
  vehicle: VehicleConfig;
  onChange: (v: Partial<VehicleConfig>) => void;
}

type Step = "model" | "generation" | "engine" | "transmission" | "drivetrain";

const FUEL_LABELS: Record<string, string> = {
  essence: "Essence",
  diesel: "Diesel",
  hybride: "Hybride",
  phev: "Hybride rechargeable",
  electrique: "Électrique",
  gnv: "GNV",
};

const FUEL_BADGE: Record<string, string> = {
  essence: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  diesel: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  hybride: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  phev: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  electrique: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  gnv: "bg-violet-500/15 text-violet-400 border-violet-500/30",
};

const DRIVETRAIN_LABELS: Record<string, string> = {
  FWD: "Traction (FWD)",
  RWD: "Propulsion (RWD)",
  AWD: "Intégrale (4Motion / quattro)",
};

export function VehicleSelector({ brand, vehicle, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("model");
  const [search, setSearch] = useState("");

  const models = useMemo(() => modelsByBrand(brand), [brand]);
  const model = vehicle.modelId ? findModel(brand, vehicle.modelId) : null;
  const generation =
    model && vehicle.generationId ? findGeneration(brand, model.id, vehicle.generationId) : null;
  const engine =
    generation && vehicle.engineId
      ? findEngine(brand, model!.id, generation.id, vehicle.engineId)
      : null;

  const summary = engine
    ? `${model?.name} · ${engine.name}`
    : model
      ? `${model.name} — sélection incomplète`
      : "Choisir un véhicule";

  function openAt(s: Step) {
    setStep(s);
    setSearch("");
    setOpen(true);
  }

  function selectModel(m: Model) {
    onChange({
      modelId: m.id,
      generationId: null,
      engineId: null,
      transmission: null,
      drivetrain: null,
    });
    setSearch("");
    setStep("generation");
  }

  function selectGeneration(g: Generation) {
    onChange({ generationId: g.id, engineId: null, transmission: null, drivetrain: null });
    setStep("engine");
  }

  function selectEngine(e: Engine) {
    const t = e.transmissions[0];
    const d = e.drivetrains[0];
    onChange({
      engineId: e.id,
      transmission: t,
      drivetrain: d,
    });
    if (e.transmissions.length > 1) setStep("transmission");
    else if (e.drivetrains.length > 1) setStep("drivetrain");
    else setOpen(false);
  }

  function selectTransmission(t: string) {
    onChange({ transmission: t });
    if (engine && engine.drivetrains.length > 1) setStep("drivetrain");
    else setOpen(false);
  }

  function selectDrivetrain(d: string) {
    onChange({ drivetrain: d });
    setOpen(false);
  }

  // Filtered lists for current step
  const filteredModels = useMemo(() => {
    if (!search) return models;
    const q = search.toLowerCase();
    return models.filter((m) => m.name.toLowerCase().includes(q));
  }, [models, search]);

  const filteredEngines = useMemo(() => {
    if (!generation) return [];
    if (!search) return generation.engines;
    const q = search.toLowerCase();
    return generation.engines.filter(
      (e) => e.name.toLowerCase().includes(q) || (e.code ?? "").toLowerCase().includes(q),
    );
  }, [generation, search]);

  return (
    <>
      {/* Trigger card */}
      <button
        onClick={() => openAt(model ? (engine ? "model" : "generation") : "model")}
        className="gradient-card shadow-card group flex w-full items-center gap-3 rounded-2xl border border-border p-3.5 text-left transition-all hover:border-primary/40"
      >
        <div className="gradient-primary rounded-xl p-2.5">
          <Car className="h-5 w-5 text-primary-foreground" strokeWidth={2.4} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Véhicule
          </p>
          <p className="truncate text-sm font-semibold text-foreground">{summary}</p>
          {engine && (
            <div className="mt-1 flex flex-wrap items-center gap-1">
              <span className={cn("rounded-full border px-1.5 py-0.5 text-[9px] font-bold uppercase", FUEL_BADGE[engine.fuel])}>
                {FUEL_LABELS[engine.fuel]}
              </span>
              <span className="rounded-full border border-border bg-secondary/60 px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">
                {vehicle.transmission}
              </span>
              <span className="rounded-full border border-border bg-secondary/60 px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">
                {vehicle.drivetrain}
              </span>
            </div>
          )}
        </div>
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="relative flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl border border-border bg-card shadow-2xl sm:rounded-3xl">
            {/* Header */}
            <div className="border-b border-border p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-foreground">
                  {step === "model" && `Choisir un modèle ${brand}`}
                  {step === "generation" && `${model?.name} — Génération`}
                  {step === "engine" && `${model?.name} ${generation?.name.split(" ")[0]} — Motorisation`}
                  {step === "transmission" && "Boîte de vitesses"}
                  {step === "drivetrain" && "Transmission"}
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Breadcrumbs */}
              <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                <Crumb active={step === "model"} done={!!model} label={model?.name ?? "Modèle"}
                  onClick={() => setStep("model")} />
                {model && (
                  <Crumb active={step === "generation"} done={!!generation}
                    label={generation?.name.split("(")[0].trim() ?? "Génération"}
                    onClick={() => setStep("generation")} />
                )}
                {generation && (
                  <Crumb active={step === "engine"} done={!!engine}
                    label={engine?.name ?? "Moteur"}
                    onClick={() => setStep("engine")} />
                )}
                {engine && engine.transmissions.length > 1 && (
                  <Crumb active={step === "transmission"} done={!!vehicle.transmission}
                    label={vehicle.transmission ?? "Boîte"}
                    onClick={() => setStep("transmission")} />
                )}
                {engine && engine.drivetrains.length > 1 && (
                  <Crumb active={step === "drivetrain"} done={!!vehicle.drivetrain}
                    label={vehicle.drivetrain ?? "Transmission"}
                    onClick={() => setStep("drivetrain")} />
                )}
              </div>

              {(step === "model" || step === "engine") && (
                <div className="relative mt-3">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher…"
                    className="w-full rounded-xl border border-border bg-secondary/50 py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-3">
              {step === "model" && (
                <ul className="space-y-1.5">
                  {filteredModels.map((m) => (
                    <Row key={m.id} active={vehicle.modelId === m.id} onClick={() => selectModel(m)}>
                      <span className="font-medium text-foreground">{m.name}</span>
                      <span className="text-[11px] text-muted-foreground">
                        {m.generations.length} génération{m.generations.length > 1 ? "s" : ""}
                      </span>
                    </Row>
                  ))}
                  {filteredModels.length === 0 && (
                    <EmptyState>Aucun modèle trouvé.</EmptyState>
                  )}
                </ul>
              )}

              {step === "generation" && model && (
                <ul className="space-y-1.5">
                  {model.generations.map((g) => (
                    <Row key={g.id} active={vehicle.generationId === g.id}
                      onClick={() => selectGeneration(g)}>
                      <span className="font-medium text-foreground">{g.name}</span>
                      <span className="text-[11px] text-muted-foreground">
                        {g.engines.length} motorisation{g.engines.length > 1 ? "s" : ""}
                      </span>
                    </Row>
                  ))}
                </ul>
              )}

              {step === "engine" && generation && (
                <ul className="space-y-1.5">
                  {filteredEngines.map((e) => (
                    <Row key={e.id} active={vehicle.engineId === e.id}
                      onClick={() => selectEngine(e)}>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{e.name}</span>
                        <span className={cn("rounded-full border px-1.5 py-0.5 text-[9px] font-bold uppercase",
                          FUEL_BADGE[e.fuel])}>
                          {FUEL_LABELS[e.fuel]}
                        </span>
                      </div>
                      <span className="text-[11px] text-muted-foreground">
                        {e.code ?? ""} · {e.transmissions.join("/")}
                      </span>
                    </Row>
                  ))}
                  {filteredEngines.length === 0 && (
                    <EmptyState>Aucune motorisation trouvée.</EmptyState>
                  )}
                </ul>
              )}

              {step === "transmission" && engine && (
                <ul className="space-y-1.5">
                  {engine.transmissions.map((t) => (
                    <Row key={t} active={vehicle.transmission === t}
                      onClick={() => selectTransmission(t)}>
                      <span className="font-medium text-foreground">{t}</span>
                    </Row>
                  ))}
                </ul>
              )}

              {step === "drivetrain" && engine && (
                <ul className="space-y-1.5">
                  {engine.drivetrains.map((d) => (
                    <Row key={d} active={vehicle.drivetrain === d}
                      onClick={() => selectDrivetrain(d)}>
                      <span className="font-medium text-foreground">{DRIVETRAIN_LABELS[d] ?? d}</span>
                    </Row>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Crumb({ active, done, label, onClick }: { active: boolean; done: boolean; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-2 py-0.5 transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : done
            ? "border-border bg-secondary text-foreground hover:bg-secondary/80"
            : "border-border/50 bg-transparent text-muted-foreground",
      )}
    >
      {label}
    </button>
  );
}

function Row({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-xl border p-3 text-left transition-all",
          active
            ? "border-primary bg-primary/10"
            : "border-border bg-secondary/40 hover:border-primary/40 hover:bg-secondary/70",
        )}
      >
        <div className="flex min-w-0 flex-col gap-0.5">{children}</div>
        {active ? (
          <Check className="h-4 w-4 shrink-0 text-primary" />
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
        )}
      </button>
    </li>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
      {children}
    </div>
  );
}
