import { useEffect, useState } from "react";
import type { MaintenanceItem } from "@/lib/maintenance-data";

interface Props {
  item: MaintenanceItem | null;
  defaultKm: number;
  onClose: () => void;
  onConfirm: (km: number) => void;
}

export function MarkDoneDialog({ item, defaultKm, onClose, onConfirm }: Props) {
  const [km, setKm] = useState(String(defaultKm));

  useEffect(() => {
    setKm(String(defaultKm));
  }, [defaultKm, item?.id]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="relative w-full max-w-sm rounded-t-3xl border border-border bg-card p-5 shadow-2xl sm:rounded-3xl">
        <h3 className="text-lg font-semibold text-foreground">Marquer comme fait</h3>
        <p className="mt-1 text-sm text-muted-foreground">{item.name}</p>

        <label className="mt-4 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Kilométrage de l'entretien
        </label>
        <div className="mt-1 flex items-baseline gap-1.5 rounded-xl border border-border bg-secondary/40 px-3 py-2.5">
          <input
            type="text"
            inputMode="numeric"
            value={km}
            onChange={(e) => setKm(e.target.value.replace(/\D/g, ""))}
            className="w-full bg-transparent text-xl font-bold text-foreground outline-none"
            autoFocus
          />
          <span className="text-sm font-semibold text-muted-foreground">km</span>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              const n = parseInt(km, 10);
              onConfirm(isNaN(n) ? defaultKm : n);
            }}
            className="gradient-primary shadow-glow flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all active:scale-95"
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}
