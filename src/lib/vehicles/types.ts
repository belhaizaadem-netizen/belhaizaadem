import type { Brand } from "../maintenance-data";

export type FuelType = "essence" | "diesel" | "hybride" | "phev" | "electrique" | "gnv";
export type Transmission = "manuelle" | "DSG" | "S-tronic" | "Tiptronic" | "PDK" | "auto";
export type Drivetrain = "FWD" | "RWD" | "AWD"; // AWD = 4Motion / quattro / Haldex / Torsen

export interface Engine {
  id: string;            // ex: "1.5-tsi-150"
  name: string;          // ex: "1.5 TSI 150"
  displacement: number;  // L
  power: number;         // ch
  fuel: FuelType;
  code?: string;         // ex: "EA211 evo"
  turbo?: boolean;
  hasDPF?: boolean;      // FAP diesel
  hasGPF?: boolean;      // filtre particules essence
  hasHPFP?: boolean;     // injection directe haute pression
  transmissions: Transmission[];
  drivetrains: Drivetrain[];
  hasHaldex?: boolean;   // si AWD basé Haldex
}

export interface Generation {
  id: string;            // ex: "mk7"
  name: string;          // ex: "Golf 7 (2012-2020)"
  yearStart: number;
  yearEnd?: number;
  engines: Engine[];
}

export interface Model {
  id: string;            // ex: "golf"
  name: string;          // ex: "Golf"
  brand: Brand;
  generations: Generation[];
}
