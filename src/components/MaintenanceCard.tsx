import { useEffect, useRef, useState } from "react";
import { Check, AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react";
import type { MaintenanceStatus } from "@/lib/maintenance-data";
import { cn } from "@/lib/utils";

function ScrollingLabel({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    const check = () => {
      const c = containerRef.current;
      const m = measureRef.current;
      if (!c || !m) return;
      setOverflow(m.scrollWidth > c.clientWidth + 1);
    };
    check();
    const ro = new ResizeObserver(check);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [text]);

  return (
    <div ref={containerRef} className={cn("marquee-mask relative w-full", className)}>
      {/* Hidden measurer to detect overflow */}
      <span
        ref={measureRef}
        aria-hidden="true"
        className="invisible pointer-events-none absolute left-0 top-0 whitespace-nowrap"
      >
        {text}
      </span>
      {overflow ? (
        <div className="marquee-track">
          <span>{text}</span>
          <span aria-hidden="true">{text}</span>
        </div>
      ) : (
        <span className="block truncate whitespace-nowrap">{text}</span>
      )}
    </div>
  );
}

interface Props {
  status: MaintenanceStatus;
  onMarkDone: () => void;
}

const STATUS_META = {
  overdue: {
    label: "En retard",
    badge: "gradient-danger text-white",
    bar: "bg-destructive",
    icon: AlertCircle,
    iconColor: "text-destructive",
  },
  due: {
    label: "À faire",
    badge: "gradient-danger text-white",
    bar: "bg-destructive",
    icon: AlertCircle,
    iconColor: "text-destructive",
  },
  soon: {
    label: "Bientôt",
    badge: "gradient-warning text-warning-foreground",
    bar: "bg-warning",
    icon: AlertTriangle,
    iconColor: "text-warning",
  },
  ok: {
    label: "OK",
    badge: "gradient-success text-success-foreground",
    bar: "bg-success",
    icon: CheckCircle2,
    iconColor: "text-success",
  },
} as const;

function formatKm(n: number) {
  return new Intl.NumberFormat("fr-FR").format(n) + " km";
}

export function MaintenanceCard({ status, onMarkDone }: Props) {
  const meta = STATUS_META[status.status];
  const Icon = meta.icon;
  const remaining = status.kmRemaining;

  return (
    <div className="gradient-card shadow-card overflow-hidden rounded-2xl border border-border">
      <div className="flex items-start gap-3 p-4">
        <div className={cn("shrink-0 rounded-xl bg-secondary p-2.5", meta.iconColor)}>
          <Icon className="h-5 w-5" strokeWidth={2.2} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <ScrollingLabel
                text={status.item.name}
                className="font-semibold text-foreground"
              />
              <p className="text-xs text-muted-foreground">{status.item.category}</p>
            </div>
            <span
              className={cn(
                "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                meta.badge,
              )}
            >
              {meta.label}
            </span>
          </div>

          <div className="mt-3 space-y-1.5">
            <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
              <div
                className={cn("h-full rounded-full transition-all", meta.bar)}
                style={{ width: `${Math.round(status.progress * 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Tous les {formatKm(status.effectiveIntervalKm)}</span>
              <span className={cn("font-medium", meta.iconColor)}>
                {remaining < 0
                  ? `${formatKm(Math.abs(remaining))} de retard`
                  : `Dans ${formatKm(remaining)}`}
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-end">
            <button
              onClick={onMarkDone}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-95"
            >
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
              Fait
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
