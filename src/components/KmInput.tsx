import { Gauge } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  value: number;
  onChange: (km: number) => void;
}

export function KmInput({ value, onChange }: Props) {
  const [local, setLocal] = useState(String(value));

  useEffect(() => {
    setLocal(String(value));
  }, [value]);

  const commit = (v: string) => {
    const n = parseInt(v.replace(/\D/g, ""), 10);
    onChange(isNaN(n) ? 0 : n);
  };

  return (
    <div className="gradient-card shadow-card relative overflow-hidden rounded-2xl border border-border p-4">
      <div className="flex items-center gap-3">
        <div className="gradient-primary shadow-glow rounded-xl p-2.5">
          <Gauge className="h-5 w-5 text-primary-foreground" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <label className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Kilométrage actuel
          </label>
          <div className="flex items-baseline gap-1.5">
            <input
              type="text"
              inputMode="numeric"
              value={local}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/\D/g, "");
                setLocal(cleaned);
              }}
              onBlur={() => commit(local)}
              onKeyDown={(e) => {
                if (e.key === "Enter") (e.target as HTMLInputElement).blur();
              }}
              placeholder="0"
              className="w-full bg-transparent text-2xl font-bold tracking-tight text-foreground outline-none placeholder:text-muted-foreground"
            />
            <span className="text-sm font-semibold text-muted-foreground">km</span>
          </div>
        </div>
      </div>
    </div>
  );
}
