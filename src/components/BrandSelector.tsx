import { BRANDS, type Brand } from "@/lib/maintenance-data";
import { cn } from "@/lib/utils";

interface Props {
  value: Brand;
  onChange: (b: Brand) => void;
}

export function BrandSelector({ value, onChange }: Props) {
  return (
    <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
      {BRANDS.map((b) => {
        const active = b === value;
        return (
          <button
            key={b}
            onClick={() => onChange(b)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all",
              active
                ? "gradient-primary border-transparent text-primary-foreground shadow-glow"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {b}
          </button>
        );
      })}
    </div>
  );
}
