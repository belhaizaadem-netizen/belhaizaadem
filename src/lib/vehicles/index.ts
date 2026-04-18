import type { Brand } from "../maintenance-data";
import type { Model, Engine, Generation } from "./types";
import { VOLKSWAGEN_MODELS } from "./volkswagen";
import { AUDI_MODELS } from "./audi";
import { SEAT_MODELS } from "./seat";
import { SKODA_MODELS } from "./skoda";
import { CUPRA_MODELS } from "./cupra";
import { PORSCHE_MODELS } from "./porsche";

export * from "./types";

export const ALL_MODELS: Model[] = [
  ...VOLKSWAGEN_MODELS,
  ...AUDI_MODELS,
  ...SEAT_MODELS,
  ...SKODA_MODELS,
  ...CUPRA_MODELS,
  ...PORSCHE_MODELS,
];

export function modelsByBrand(brand: Brand): Model[] {
  return ALL_MODELS.filter((m) => m.brand === brand);
}

export function findModel(brand: Brand, modelId: string): Model | undefined {
  return modelsByBrand(brand).find((m) => m.id === modelId);
}

export function findGeneration(brand: Brand, modelId: string, genId: string): Generation | undefined {
  return findModel(brand, modelId)?.generations.find((g) => g.id === genId);
}

export function findEngine(
  brand: Brand,
  modelId: string,
  genId: string,
  engineId: string,
): Engine | undefined {
  return findGeneration(brand, modelId, genId)?.engines.find((e) => e.id === engineId);
}

export interface VehicleSelection {
  brand: Brand;
  modelId: string;
  generationId: string;
  engineId: string;
  transmission: string; // one of engine.transmissions
  drivetrain: string;   // one of engine.drivetrains
}

export function describeSelection(sel: VehicleSelection): string {
  const m = findModel(sel.brand, sel.modelId);
  const g = findGeneration(sel.brand, sel.modelId, sel.generationId);
  const e = findEngine(sel.brand, sel.modelId, sel.generationId, sel.engineId);
  if (!m || !g || !e) return sel.brand;
  return `${sel.brand} ${m.name} — ${e.name} ${sel.transmission} ${sel.drivetrain}`;
}
