import { useEffect, useState } from "react";
import {
  EngineIcon,
  BatteryIcon,
  BrakeIcon,
  OilIcon,
  CoolantIcon,
  AbsIcon,
  TirePressureIcon,
  FilterIcon,
} from "./dashboard/TellTaleIcons";

const DURATION = 3200; // ms total
const MAX_KMH = 260;

export function DashboardStartup({ onDone }: { onDone: () => void }) {
  const [t, setT] = useState(0); // 0..1
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      setT(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setFadeOut(true);
        setTimeout(onDone, 500);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  // Needle phases: 0-15% hold at 0, 15-55% sweep up to max, 55-90% sweep back to 0, 90-100% hold
  let sweep = 0;
  if (t < 0.15) sweep = 0;
  else if (t < 0.55) sweep = (t - 0.15) / 0.4; // 0 -> 1
  else if (t < 0.9) sweep = 1 - (t - 0.55) / 0.35; // 1 -> 0
  else sweep = 0;
  const angle = -120 + sweep * 240;
  const displayKmh = Math.round(sweep * MAX_KMH);

  // Warning lights: ALL on from start, fade out at the very end
  const lightsOn = t < 0.92;
  const lightsOpacity = t < 0.85 ? 1 : Math.max(0, 1 - (t - 0.85) / 0.15);

  // Tick marks: 14 ticks for 0..260 (every 20)
  const tickCount = 14;
  const ticks = Array.from({ length: tickCount }, (_, i) => i);


  const lights = [
    { Icon: EngineIcon, color: "#fbbf24" },
    { Icon: BatteryIcon, color: "#ef4444" },
    { Icon: OilIcon, color: "#ef4444" },
    { Icon: CoolantIcon, color: "#ef4444" },
    { Icon: BrakeIcon, color: "#ef4444" },
    { Icon: AbsIcon, color: "#fbbf24" },
    { Icon: TirePressureIcon, color: "#fbbf24" },
    { Icon: FilterIcon, color: "#fbbf24" },
  ];

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-opacity duration-300 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Warning lights row */}
      <div
        className="mb-8 grid grid-cols-4 gap-4"
        style={{ opacity: lightsOpacity }}
      >
        {lights.map(({ Icon, color }, i) => (
          <div
            key={i}
            className="flex h-12 w-12 items-center justify-center rounded-lg"
            style={{
              color: lightsOn ? color : "#1f2937",
              filter: lightsOn ? `drop-shadow(0 0 8px ${color})` : "none",
              transition: "color 0.2s",
            }}
          >
            <Icon className="h-8 w-8" />
          </div>
        ))}
      </div>

      {/* Speedometer */}
      <div className="relative h-64 w-64">
        <svg viewBox="-110 -110 220 220" className="h-full w-full">
          {/* Outer ring */}
          <circle cx="0" cy="0" r="100" fill="none" stroke="#1f2937" strokeWidth="2" />
          <circle cx="0" cy="0" r="92" fill="#0a0a0a" stroke="#374151" strokeWidth="1" />

          {/* Arc background */}
          <path
            d="M -78 45 A 90 90 0 1 1 78 45"
            fill="none"
            stroke="#1f2937"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Red zone (last quarter) */}
          <path
            d="M 45 78 A 90 90 0 0 1 78 45"
            fill="none"
            stroke="#dc2626"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Tick marks */}
          {ticks.map((i) => {
            const a = (-120 + (i * 240) / 12) * (Math.PI / 180);
            const isRed = i >= 10;
            const r1 = 72;
            const r2 = i % 2 === 0 ? 84 : 80;
            return (
              <line
                key={i}
                x1={Math.sin(a) * r1}
                y1={-Math.cos(a) * r1}
                x2={Math.sin(a) * r2}
                y2={-Math.cos(a) * r2}
                stroke={isRed ? "#ef4444" : "#9ca3af"}
                strokeWidth={i % 2 === 0 ? 2.5 : 1.5}
              />
            );
          })}

          {/* Numbers */}
          {ticks
            .filter((i) => i % 2 === 0)
            .map((i) => {
              const a = (-120 + (i * 240) / 12) * (Math.PI / 180);
              const r = 60;
              return (
                <text
                  key={i}
                  x={Math.sin(a) * r}
                  y={-Math.cos(a) * r + 4}
                  textAnchor="middle"
                  fontSize="10"
                  fill={i >= 10 ? "#ef4444" : "#d1d5db"}
                  fontFamily="system-ui, sans-serif"
                  fontWeight="600"
                >
                  {i * 20}
                </text>
              );
            })}

          {/* Needle */}
          <g transform={`rotate(${angle})`} style={{ transition: "none" }}>
            <line
              x1="0"
              y1="8"
              x2="0"
              y2="-82"
              stroke="#ef4444"
              strokeWidth="3"
              strokeLinecap="round"
              filter="drop-shadow(0 0 4px rgba(239,68,68,0.8))"
            />
            <circle cx="0" cy="0" r="8" fill="#ef4444" />
            <circle cx="0" cy="0" r="3" fill="#0a0a0a" />
          </g>

          {/* km/h label */}
          <text
            x="0"
            y="40"
            textAnchor="middle"
            fontSize="9"
            fill="#6b7280"
            fontFamily="system-ui, sans-serif"
            letterSpacing="2"
          >
            km/h
          </text>
        </svg>
      </div>

      <div className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        VAG Maintenance
      </div>
    </div>
  );
}
