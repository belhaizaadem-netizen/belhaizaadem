import type { Engine, FuelType } from "./vehicles/types";

export type Category =
  | "Moteur"
  | "Transmission"
  | "Freinage"
  | "Suspension & Direction"
  | "Refroidissement"
  | "Carburant & Admission"
  | "Électrique"
  | "Pneus";

export type Brand = "Volkswagen" | "Audi" | "SEAT" | "Škoda" | "Cupra" | "Porsche";

export const BRANDS: Brand[] = ["Volkswagen", "Audi", "SEAT", "Škoda", "Cupra", "Porsche"];

export interface MaintenanceItem {
  id: string;
  name: string;
  category: Category;
  intervalKm: number;                    // intervalle de référence
  // Conditions d'applicabilité au véhicule sélectionné
  fuels?: FuelType[];                    // si défini, item visible uniquement pour ces carburants
  requiresHaldex?: boolean;              // visible uniquement si moteur AWD avec Haldex
  requiresDPF?: boolean;                 // FAP -> diesel uniquement
  requiresHPFP?: boolean;                // pompe injection HP
  requiresDSG?: boolean;                 // boîte DSG/S-tronic
  requiresManual?: boolean;              // boîte manuelle
  // Modificateurs d'intervalle par carburant (multiplicateur)
  intervalByFuel?: Partial<Record<FuelType, number>>;
}

export const MAINTENANCE_ITEMS: MaintenanceItem[] = [
  // MOTEUR
  {
    id: "huile-moteur", name: "Huile moteur + filtre", category: "Moteur", intervalKm: 15000,
    fuels: ["essence", "diesel", "hybride", "phev", "gnv"],
    intervalByFuel: { diesel: 20000, essence: 15000, hybride: 15000, phev: 15000 },
  },
  { id: "filtre-air", name: "Filtre à air", category: "Moteur", intervalKm: 30000,
    fuels: ["essence", "diesel", "hybride", "phev", "gnv"] },
  { id: "bougies", name: "Bougies d'allumage", category: "Moteur", intervalKm: 60000,
    fuels: ["essence", "hybride", "phev", "gnv"] },
  { id: "courroie-dist", name: "Courroie distribution + pompe à eau", category: "Moteur", intervalKm: 90000,
    fuels: ["essence", "diesel", "hybride", "phev", "gnv"] },
  { id: "soupape-pcv", name: "Soupape PCV", category: "Moteur", intervalKm: 60000,
    fuels: ["essence", "hybride", "phev"] },
  { id: "nettoyage-soupapes", name: "Nettoyage soupapes admission", category: "Moteur", intervalKm: 80000,
    requiresHPFP: true, fuels: ["essence", "hybride", "phev"] },
  { id: "inspection-turbo", name: "Inspection turbo", category: "Moteur", intervalKm: 80000,
    fuels: ["essence", "diesel", "hybride", "phev"] },
  { id: "supports-moteur", name: "Supports moteur + boîte", category: "Moteur", intervalKm: 120000 },

  // TRANSMISSION
  { id: "huile-dsg", name: "Huile DSG / S-tronic + filtre", category: "Transmission", intervalKm: 60000,
    requiresDSG: true },
  { id: "huile-bv-manuelle", name: "Huile boîte manuelle", category: "Transmission", intervalKm: 80000,
    requiresManual: true },
  { id: "embrayage", name: "Embrayage", category: "Transmission", intervalKm: 140000,
    requiresManual: true },
  { id: "soufflets-cardan", name: "Soufflets cardan", category: "Transmission", intervalKm: 100000 },
  { id: "haldex", name: "Huile Haldex / différentiel AWD", category: "Transmission", intervalKm: 60000,
    requiresHaldex: true },

  // FREINAGE
  { id: "liquide-frein", name: "Liquide de frein", category: "Freinage", intervalKm: 40000 },
  { id: "plaquettes-av", name: "Plaquettes avant", category: "Freinage", intervalKm: 50000 },
  { id: "plaquettes-ar", name: "Plaquettes arrière", category: "Freinage", intervalKm: 70000 },
  { id: "disques", name: "Disques de frein", category: "Freinage", intervalKm: 100000 },
  { id: "durites-frein", name: "Durites de frein", category: "Freinage", intervalKm: 120000 },
  { id: "capteurs-abs", name: "Capteurs ABS", category: "Freinage", intervalKm: 120000 },

  // SUSPENSION & DIRECTION
  { id: "amortisseurs", name: "Amortisseurs", category: "Suspension & Direction", intervalKm: 120000 },
  { id: "bras-suspension", name: "Bras de suspension", category: "Suspension & Direction", intervalKm: 150000 },
  { id: "rotules", name: "Rotules", category: "Suspension & Direction", intervalKm: 150000 },
  { id: "biellettes-dir", name: "Biellettes de direction", category: "Suspension & Direction", intervalKm: 140000 },
  { id: "geometrie", name: "Géométrie", category: "Suspension & Direction", intervalKm: 80000 },
  { id: "roulements", name: "Roulements de roue", category: "Suspension & Direction", intervalKm: 150000 },
  { id: "cremaillere", name: "Crémaillère de direction", category: "Suspension & Direction", intervalKm: 180000 },
  { id: "biellettes-stab", name: "Biellettes barre stabilisatrice", category: "Suspension & Direction", intervalKm: 120000 },

  // REFROIDISSEMENT
  { id: "liquide-refroid", name: "Liquide de refroidissement", category: "Refroidissement", intervalKm: 60000 },
  { id: "thermostat", name: "Thermostat", category: "Refroidissement", intervalKm: 120000,
    fuels: ["essence", "diesel", "hybride", "phev", "gnv"] },
  { id: "durites-radiateur", name: "Durites radiateur", category: "Refroidissement", intervalKm: 120000 },
  { id: "vase-expansion", name: "Vase d'expansion", category: "Refroidissement", intervalKm: 120000 },

  // CARBURANT & ADMISSION
  { id: "filtre-carburant", name: "Filtre carburant", category: "Carburant & Admission", intervalKm: 60000,
    fuels: ["essence", "diesel", "hybride", "phev", "gnv"] },
  { id: "vanne-egr", name: "Nettoyage vanne EGR", category: "Carburant & Admission", intervalKm: 80000,
    fuels: ["diesel"] },
  { id: "fap", name: "Entretien FAP", category: "Carburant & Admission", intervalKm: 150000,
    requiresDPF: true },
  { id: "hpfp", name: "Inspection pompe HPFP", category: "Carburant & Admission", intervalKm: 80000,
    requiresHPFP: true },

  // ÉLECTRIQUE
  { id: "batterie", name: "Batterie 12V", category: "Électrique", intervalKm: 60000 },
  { id: "filtre-habitacle", name: "Filtre habitacle", category: "Électrique", intervalKm: 20000 },
  

  // PNEUS
  { id: "inspection-pneus", name: "Inspection pneus", category: "Pneus", intervalKm: 100000 },
];

export const CATEGORIES: Category[] = [
  "Moteur",
  "Transmission",
  "Freinage",
  "Suspension & Direction",
  "Refroidissement",
  "Carburant & Admission",
  "Électrique",
  "Pneus",
];

export type Status = "overdue" | "due" | "soon" | "ok";

export interface MaintenanceStatus {
  item: MaintenanceItem;
  effectiveIntervalKm: number;
  lastDoneKm: number;
  nextDueKm: number;
  kmRemaining: number;
  status: Status;
  progress: number; // 0..1 within current interval
}

export interface HistoryEntry {
  id: string;
  itemId: string;
  km: number;
  date: string; // ISO
  note?: string;
}

/** Filter items applicable to the selected engine + transmission. */
export function applicableItems(
  engine: Engine | null | undefined,
  transmission: string | null | undefined,
): MaintenanceItem[] {
  if (!engine) return MAINTENANCE_ITEMS;
  return MAINTENANCE_ITEMS.filter((item) => {
    if (item.fuels && !item.fuels.includes(engine.fuel)) return false;
    if (item.requiresHaldex && !engine.hasHaldex) return false;
    if (item.requiresDPF && !engine.hasDPF) return false;
    if (item.requiresHPFP && !engine.hasHPFP) return false;
    if (item.requiresDSG) {
      const t = transmission ?? "";
      if (!["DSG", "S-tronic", "PDK", "Tiptronic"].includes(t)) return false;
    }
    if (item.requiresManual && transmission !== "manuelle") return false;
    return true;
  });
}

/** Compute the actual interval for a given engine (fuel-modulated). */
export function effectiveInterval(item: MaintenanceItem, engine: Engine | null | undefined): number {
  if (!engine || !item.intervalByFuel) return item.intervalKm;
  const mod = item.intervalByFuel[engine.fuel];
  return mod ?? item.intervalKm;
}

export function computeStatus(
  item: MaintenanceItem,
  currentKm: number,
  lastDoneKm: number,
  engine?: Engine | null,
): MaintenanceStatus {
  const effectiveIntervalKm = effectiveInterval(item, engine ?? null);
  const nextDueKm = lastDoneKm + effectiveIntervalKm;
  const kmRemaining = nextDueKm - currentKm;
  const progress = Math.min(1, Math.max(0, (currentKm - lastDoneKm) / effectiveIntervalKm));

  let status: Status;
  if (kmRemaining < 0) status = "overdue";
  else if (kmRemaining <= 1000) status = "due";
  else if (kmRemaining <= effectiveIntervalKm * 0.15) status = "soon";
  else status = "ok";

  return { item, effectiveIntervalKm, lastDoneKm, nextDueKm, kmRemaining, status, progress };
}
