import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: number;
  icon: LucideIcon;
  variant: "danger" | "warning" | "success" | "primary";
  active?: boolean;
  onClick?: () => void;
}

const variantClasses: Record<Props["variant"], string> = {
  danger: "gradient-danger",
  warning: "gradient-warning",
  success: "gradient-success",
  primary: "gradient-primary",
};

export function StatCard({ label, value, icon: Icon, variant, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shadow-card relative flex min-w-0 flex-col items-start gap-1 overflow-hidden rounded-2xl border p-3 text-left transition-all",
        active ? "border-primary ring-2 ring-primary/40" : "border-border",
        "gradient-card",
      )}
    >
      <div className={cn("absolute right-2 top-2 rounded-lg p-1.5", variantClasses[variant])}>
        <Icon className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
      </div>
      <span className="text-2xl font-bold tracking-tight text-foreground">{value}</span>
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </button>
  );
}
