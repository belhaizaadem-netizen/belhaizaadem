/**
 * Authentic automotive warning light SVG symbols.
 * All icons use `currentColor` so they inherit the lit/unlit color from parent.
 * Drawn in a 24x24 viewBox to match Lucide sizing.
 */

type IconProps = React.SVGProps<SVGSVGElement>;

export function EngineIcon(props: IconProps) {
  // Authentic check-engine block silhouette (outlined, matches dashboard tell-tale)
  return (
    <svg viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinejoin="round" strokeLinecap="round" {...props}>
      <path d="M6 22 L10 22 L10 16 L18 16 L18 10 L26 10 L26 6 L36 6 L36 10 L44 10 L44 14 L52 14 L52 18 L58 18 L58 34 L52 34 L52 38 L20 38 L16 42 L10 42 L10 30 L6 30 Z" />
    </svg>
  );
}

export function GlowPlugIcon(props: IconProps) {
  // Préchauffage diesel : deux boucles caractéristiques
  return (
    <svg viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 18 C 10 8, 28 8, 30 18 C 30 32, 18 42, 18 28 C 18 22, 24 22, 24 28" />
      <path d="M34 18 C 36 8, 54 8, 56 18 C 56 32, 44 42, 44 28 C 44 22, 50 22, 50 28" />
    </svg>
  );
}

export function BatteryIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinejoin="round" {...props}>
      <rect x="3" y="7" width="18" height="12" rx="1.5" />
      <rect x="6" y="4" width="3.5" height="3" />
      <rect x="14.5" y="4" width="3.5" height="3" />
      <path d="M7 13h3M8.5 11.5v3" strokeLinecap="round" />
      <path d="M14 13h3" strokeLinecap="round" />
    </svg>
  );
}

export function BrakeIcon(props: IconProps) {
  // Circle with parentheses + exclamation mark = brake warning
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...props}>
      <circle cx="12" cy="12" r="6" />
      <path d="M3 8c1.5 1.2 2.5 2.5 2.5 4S4.5 14.8 3 16" />
      <path d="M21 8c-1.5 1.2-2.5 2.5-2.5 4s1 2.8 2.5 4" />
      <path d="M12 9v4" stroke="currentColor" strokeWidth={2.4} />
      <circle cx="12" cy="15.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function OilIcon(props: IconProps) {
  // Genie-lamp shaped oil can with drop
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M3 14c0-2.5 2-4.5 5-5l3-1 9 1v2l-3 1c2 1 3 2.5 3 4v1H3v-3z" />
      <path d="M14 7l-1 2h2l-1-2z" />
      <circle cx="6" cy="19.5" r="1.2" />
    </svg>
  );
}

export function CoolantIcon(props: IconProps) {
  // Thermometer in waves
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 4v9" />
      <circle cx="12" cy="15" r="2.5" fill="currentColor" />
      <path d="M9 7h6M9 10h6" />
      <path d="M3 19c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0" />
    </svg>
  );
}

export function AbsIcon(props: IconProps) {
  // Circle with brake parentheses + "ABS" text
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <circle cx="12" cy="12" r="6.5" />
      <path d="M3 8c1.5 1.2 2.5 2.5 2.5 4S4.5 14.8 3 16" strokeLinecap="round" />
      <path d="M21 8c-1.5 1.2-2.5 2.5-2.5 4s1 2.8 2.5 4" strokeLinecap="round" />
      <text
        x="12"
        y="14"
        textAnchor="middle"
        fontSize="5.5"
        fontWeight="900"
        fill="currentColor"
        stroke="none"
        fontFamily="system-ui, sans-serif"
      >
        ABS
      </text>
    </svg>
  );
}

export function TirePressureIcon(props: IconProps) {
  // Horseshoe tire shape with exclamation + treads — TPMS symbol
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* Tire U-shape */}
      <path d="M3 9c0-1 .8-2 2-2h14c1.2 0 2 1 2 2v8" />
      <path d="M3 9v8" />
      {/* Tread marks on top */}
      <path d="M6 7v-1.5M9 7v-1.5M12 7v-1.5M15 7v-1.5M18 7v-1.5" />
      {/* Bottom road line */}
      <path d="M2 19h20" strokeWidth={1.5} strokeDasharray="2 1.5" />
      {/* Exclamation in the middle */}
      <path d="M12 11v3" strokeWidth={2.4} />
      <circle cx="12" cy="16" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FilterIcon(props: IconProps) {
  // Air filter / cabin filter — pleated rectangle
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" {...props}>
      <rect x="3" y="6" width="18" height="12" rx="1" />
      <path d="M6 6v12M9 6v12M12 6v12M15 6v12M18 6v12" strokeWidth={1.2} />
    </svg>
  );
}
