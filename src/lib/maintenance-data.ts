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
  requiresTurbo?: boolean;               // visible uniquement si moteur turbo
  requiresTimingBelt?: boolean;          // visible uniquement si distribution par courroie (pas chaîne)
  requiresTimingChain?: boolean;         // visible uniquement si distribution par chaîne
  // Modificateurs d'intervalle par carburant (multiplicateur)
  intervalByFuel?: Partial<Record<FuelType, number>>;
}

export const MAINTENANCE_ITEMS: MaintenanceItem[] = [
  // MOTEUR
  {
    id: "huile-moteur", name: "Huile moteur + filtre", category: "Moteur", intervalKm: 15000,
    fuels: ["essence", "diesel", "hybride", "phev", "gnv"],
  },
  { id: "filtre-air", name: "Filtre à air moteur", category: "Moteur", intervalKm: 30000,
    fuels: ["essence", "diesel", "hybride", "phev", "gnv"] },
  { id: "bougies", name: "Bougies d'allumage", category: "Moteur", intervalKm: 30000,
    fuels: ["essence", "hybride", "phev", "gnv"] },
  { id: "courroie-accessoires", name: "Courroie accessoires poly-V + galets", category: "Moteur", intervalKm: 60000,
    fuels: ["essence", "diesel", "hybride", "phev", "gnv"] },
  { id: "courroie-dist", name: "Courroie distribution + pompe à eau", category: "Moteur", intervalKm: 120000,
    fuels: ["essence", "diesel", "hybride", "phev", "gnv"], requiresTimingBelt: true },
  { id: "chaine-dist", name: "Contrôle chaîne de distribution", category: "Moteur", intervalKm: 90000,
    fuels: ["essence", "diesel", "hybride", "phev", "gnv"], requiresTimingChain: true },
  { id: "durites-turbo", name: "Contrôle durites turbo + colliers", category: "Moteur", intervalKm: 30000,
    fuels: ["essence", "diesel", "hybride", "phev"], requiresTurbo: true },
  { id: "capteur-map", name: "Contrôle capteur pression turbo (MAP)", category: "Moteur", intervalKm: 30000,
    fuels: ["essence", "diesel", "hybride", "phev"], requiresTurbo: true },
  { id: "egr-vnt", name: "Nettoyage EGR + contrôle actionneur VNT", category: "Moteur", intervalKm: 60000,
    fuels: ["diesel"], requiresTurbo: true },
  { id: "wastegate", name: "Contrôle soupape de décharge (wastegate)", category: "Moteur", intervalKm: 60000,
    fuels: ["essence", "hybride", "phev"], requiresTurbo: true },
  { id: "inspection-turbo", name: "Inspection jeu axial/radial axe turbo", category: "Moteur", intervalKm: 90000,
    fuels: ["essence", "diesel", "hybride", "phev"], requiresTurbo: true },

  // TRANSMISSION
  { id: "huile-bv-manuelle", name: "Huile boîte manuelle", category: "Transmission", intervalKm: 60000,
    requiresManual: true },
  { id: "huile-dsg", name: "Huile DSG (DQ200 / DQ250 / DQ500) + filtre", category: "Transmission", intervalKm: 60000,
    requiresDSG: true },
  { id: "embrayages-dsg", name: "Contrôle embrayages DSG", category: "Transmission", intervalKm: 60000,
    requiresDSG: true },
  { id: "haldex", name: "Huile transmission 4Motion / Haldex", category: "Transmission", intervalKm: 60000,
    requiresHaldex: true },

  // FREINAGE
  { id: "plaquettes-av", name: "Contrôle plaquettes avant + disques", category: "Freinage", intervalKm: 30000 },
  { id: "plaquettes-ar", name: "Contrôle plaquettes arrière", category: "Freinage", intervalKm: 30000 },
  { id: "remplacement-freins", name: "Remplacement plaquettes + disques", category: "Freinage", intervalKm: 60000 },
  { id: "liquide-frein", name: "Liquide de frein DOT4 LV", category: "Freinage", intervalKm: 60000 },

  // SUSPENSION & DIRECTION
  { id: "controle-amortisseurs", name: "Contrôle visuel amortisseurs", category: "Suspension & Direction", intervalKm: 30000 },
  { id: "amortisseurs", name: "Remplacement amortisseurs (si HS)", category: "Suspension & Direction", intervalKm: 60000 },
  { id: "silentblocs-rotules", name: "Contrôle silentblocs, rotules, biellettes", category: "Suspension & Direction", intervalKm: 60000 },
  { id: "geometrie", name: "Géométrie / parallélisme", category: "Suspension & Direction", intervalKm: 60000 },

  // REFROIDISSEMENT
  { id: "liquide-refroid", name: "Liquide de refroidissement", category: "Refroidissement", intervalKm: 120000 },

  // CARBURANT & ADMISSION
  { id: "filtre-carburant", name: "Filtre à carburant", category: "Carburant & Admission", intervalKm: 60000,
    fuels: ["essence", "diesel", "hybride", "phev", "gnv"] },
  { id: "fap", name: "Inspection filtre FAP", category: "Carburant & Admission", intervalKm: 60000,
    requiresDPF: true },

  // ÉLECTRIQUE
  
  { id: "alternateur", name: "Contrôle alternateur + tension de charge", category: "Électrique", intervalKm: 30000 },
  { id: "maj-calculateurs", name: "Mise à jour logiciel calculateurs (ODIS)", category: "Électrique", intervalKm: 60000 },
  { id: "filtre-habitacle", name: "Filtre habitacle / pollens", category: "Électrique", intervalKm: 30000 },

  // PNEUS
  { id: "pression-pneus", name: "Contrôle pression + usure pneus", category: "Pneus", intervalKm: 15000 },
  { id: "permutation-pneus", name: "Permutation pneus (AV ↔ AR)", category: "Pneus", intervalKm: 30000 },
  { id: "inspection-pneus", name: "Inspection pneus (profondeur < 3mm)", category: "Pneus", intervalKm: 60000 },
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
    if (item.requiresTurbo && !engine.turbo) return false;
    if (item.requiresTimingBelt && engine.hasTimingChain) return false;
    if (item.requiresTimingChain && !engine.hasTimingChain) return false;
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
