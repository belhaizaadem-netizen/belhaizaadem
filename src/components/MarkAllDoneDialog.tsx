import { useEffect, useMemo, useState } from "react";
import { Check, X } from "lucide-react";
import type { MaintenanceStatus } from "@/lib/maintenance-data";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  statuses: MaintenanceStatus[];
  defaultKm: number;
  onClose: () => void;
  onConfirm: (itemIds: string[], km: number) => void;
}

const STATUS_LABEL: Record<MaintenanceStatus["status"], string> = {
  overdue: "En retard",
  due: "À faire",
  soon: "Bientôt",
  ok: "OK",
};

const STATUS_COLOR: Record<MaintenanceStatus["status"], string> = {
  overdue: "text-destructive",
  due: "text-destructive",
  soon: "text-warning",
  ok: "text-success",
};

export function MarkAllDoneDialog({ open, statuses, defaultKm, onClose, onConfirm }: Props) {
  const [km, setKm] = useState(String(defaultKm));
  // Pre-select items that need attention (overdue/due/soon), exclude OK
  const initialSelected = useMemo(
    () => new Set(statuses.filter((s) => s.status !== "ok").map((s) => s.item.id)),
    [statuses],
  );
  const [selected, setSelected] = useState<Set<string>>(initialSelected);

  useEffect(() => {
    if (open) {
      setKm(String(defaultKm));
      setSelected(new Set(statuses.filter((s) => s.status !== "ok").map((s) => s.item.id)));
    }
  }, [open, defaultKm, statuses]);

  if (!open) return null;

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allIds = statuses.map((s) => s.item.id);
  const allSelected = selected.size === allIds.length;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="relative flex max-h-[90vh] w-full max-w-md flex-col rounded-t-3xl border border-border bg-card shadow-2xl sm:rounded-3xl">
        <div className="flex items-start justify-between gap-3 border-b border-border p-5">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Tout marquer fait</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Décochez les entretiens non réalisés
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-border px-5 py-3">
          <label className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Kilométrage de l'entretien
          </label>
          <div className="mt-1 flex items-baseline gap-1.5 rounded-xl border border-border bg-secondary/40 px-3 py-2.5">
            <input
              type="text"
              inputMode="numeric"
              value={km}
              onChange={(e) => setKm(e.target.value.replace(/\D/g, ""))}
              className="w-full bg-transparent text-xl font-bold text-foreground outline-none"
            />
            <span className="text-sm font-semibold text-muted-foreground">km</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-border px-5 py-2 text-xs">
          <span className="font-semibold text-foreground">
            {selected.size} / {statuses.length} sélectionné(s)
          </span>
          <button
            onClick={() => setSelected(allSelected ? new Set() : new Set(allIds))}
            className="font-semibold text-primary"
          >
            {allSelected ? "Tout décocher" : "Tout cocher"}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2">
          {statuses.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted-foreground">
              Aucun entretien applicable
            </p>
          ) : (
            <ul className="space-y-1">
              {statuses.map((s) => {
                const isOn = selected.has(s.item.id);
                return (
                  <li key={s.item.id}>
                    <button
                      onClick={() => toggle(s.item.id)}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-xl px-2.5 py-2 text-left transition-colors",
                        isOn ? "bg-primary/10" : "hover:bg-secondary/50",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
                          isOn
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-card",
                        )}
                      >
                        {isOn && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-foreground">
                          {s.item.name}
                        </span>
                        <span className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                          <span>{s.item.category}</span>
                          <span>•</span>
                          <span className={cn("font-semibold", STATUS_COLOR[s.status])}>
                            {STATUS_LABEL[s.status]}
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex gap-2 border-t border-border p-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            Annuler
          </button>
          <button
            disabled={selected.size === 0}
            onClick={() => {
              const n = parseInt(km, 10);
              onConfirm(Array.from(selected), isNaN(n) ? defaultKm : n);
            }}
            className="gradient-primary shadow-glow flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all active:scale-95 disabled:opacity-50"
          >
            Valider ({selected.size})
          </button>
        </div>
      </div>
    </div>
  );
}
