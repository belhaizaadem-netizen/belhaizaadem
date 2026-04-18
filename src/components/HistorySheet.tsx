import { Trash2, History } from "lucide-react";
import type { HistoryEntry, MaintenanceItem } from "@/lib/maintenance-data";

interface Props {
  open: boolean;
  onClose: () => void;
  history: HistoryEntry[];
  items: MaintenanceItem[];
  onRemove: (id: string) => void;
}

function formatKm(n: number) {
  return new Intl.NumberFormat("fr-FR").format(n) + " km";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function HistorySheet({ open, onClose, history, items, onRemove }: Props) {
  if (!open) return null;
  const itemMap = new Map(items.map((i) => [i.id, i]));

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative max-h-[85vh] w-full max-w-md overflow-hidden rounded-t-3xl border border-border bg-card shadow-2xl sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Historique</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            Fermer
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-4">
          {history.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              Aucun entretien enregistré pour le moment.
            </div>
          ) : (
            <ul className="space-y-2">
              {history.map((h) => {
                const item = itemMap.get(h.itemId);
                return (
                  <li
                    key={h.id}
                    className="flex items-start justify-between gap-3 rounded-xl border border-border bg-secondary/40 p-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">
                        {item?.name ?? h.itemId}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(h.date)} · {formatKm(h.km)}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemove(h.id)}
                      className="shrink-0 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
