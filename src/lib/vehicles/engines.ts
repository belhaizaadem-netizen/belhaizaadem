import type { Engine, Transmission, Drivetrain, FuelType } from "./types";

// Reusable engine blueprints used across many VAG models.
// Source: tech specs publiques constructeurs.

type Blueprint = Omit<Engine, "transmissions" | "drivetrains" | "hasHaldex"> & {
  defaultTransmissions?: Transmission[];
};

const E = (
  id: string,
  name: string,
  displacement: number,
  power: number,
  fuel: FuelType,
  extras: Partial<Blueprint> = {},
): Blueprint => {
  const code = extras.code ?? "";
  // EA888 (toutes générations) = chaîne de distribution
  const isEA888 = code.includes("EA888");
  return {
    id,
    name,
    displacement,
    power,
    fuel,
    turbo: fuel !== "electrique",
    hasDPF: fuel === "diesel",
    hasGPF: fuel === "essence" && (code.includes("evo") || isEA888),
    hasHPFP: fuel === "essence" || fuel === "diesel",
    hasTimingChain: isEA888,
    ...extras,
  };
};

export const ENGINE_BLUEPRINTS: Record<string, Blueprint> = {
  // --- ESSENCE 3-cyl EA211 ---
  "1.0-mpi-65":   E("1.0-mpi-65",   "1.0 MPI 65",   1.0, 65,  "essence", { turbo: false, hasHPFP: false, code: "EA211" }),
  "1.0-mpi-75":   E("1.0-mpi-75",   "1.0 MPI 75",   1.0, 75,  "essence", { turbo: false, hasHPFP: false, code: "EA211" }),
  "1.0-tsi-90":   E("1.0-tsi-90",   "1.0 TSI 90",   1.0, 90,  "essence", { code: "EA211 evo" }),
  "1.0-tsi-95":   E("1.0-tsi-95",   "1.0 TSI 95",   1.0, 95,  "essence", { code: "EA211 evo" }),
  "1.0-tsi-110":  E("1.0-tsi-110",  "1.0 TSI 110",  1.0, 110, "essence", { code: "EA211 evo" }),
  "1.0-tsi-115":  E("1.0-tsi-115",  "1.0 TSI 115",  1.0, 115, "essence", { code: "EA211 evo" }),

  // --- ESSENCE 4-cyl EA211 / EA111 ---
  "1.2-tsi-86":   E("1.2-tsi-86",   "1.2 TSI 86",   1.2, 86,  "essence", { code: "EA211" }),
  "1.2-tsi-105":  E("1.2-tsi-105",  "1.2 TSI 105",  1.2, 105, "essence", { code: "EA211" }),
  "1.4-tsi-122":  E("1.4-tsi-122",  "1.4 TSI 122",  1.4, 122, "essence", { code: "EA211" }),
  "1.4-tsi-125":  E("1.4-tsi-125",  "1.4 TSI 125",  1.4, 125, "essence", { code: "EA211" }),
  "1.4-tsi-140":  E("1.4-tsi-140",  "1.4 TSI 140 ACT", 1.4, 140, "essence", { code: "EA211" }),
  "1.4-tsi-150":  E("1.4-tsi-150",  "1.4 TSI 150 ACT", 1.4, 150, "essence", { code: "EA211" }),
  "1.5-tsi-130":  E("1.5-tsi-130",  "1.5 TSI 130",  1.5, 130, "essence", { code: "EA211 evo" }),
  "1.5-tsi-150":  E("1.5-tsi-150",  "1.5 TSI 150",  1.5, 150, "essence", { code: "EA211 evo" }),
  "1.5-etsi-130": E("1.5-etsi-130", "1.5 eTSI 130 mHEV", 1.5, 130, "essence", { code: "EA211 evo2" }),
  "1.5-etsi-150": E("1.5-etsi-150", "1.5 eTSI 150 mHEV", 1.5, 150, "essence", { code: "EA211 evo2" }),

  // --- ESSENCE EA888 ---
  "1.8-tsi-160":  E("1.8-tsi-160",  "1.8 TSI 160",  1.8, 160, "essence", { code: "EA888 gen2" }),
  "1.8-tsi-180":  E("1.8-tsi-180",  "1.8 TSI 180",  1.8, 180, "essence", { code: "EA888 gen3" }),
  "2.0-tsi-180":  E("2.0-tsi-180",  "2.0 TSI 180",  2.0, 180, "essence", { code: "EA888 gen3" }),
  "2.0-tsi-190":  E("2.0-tsi-190",  "2.0 TSI 190",  2.0, 190, "essence", { code: "EA888 gen3" }),
  "2.0-tsi-200":  E("2.0-tsi-200",  "2.0 TSI 200",  2.0, 200, "essence", { code: "EA888 gen3" }),
  "2.0-tsi-220":  E("2.0-tsi-220",  "2.0 TSI 220 GTI",  2.0, 220, "essence", { code: "EA888 gen3" }),
  "2.0-tsi-230":  E("2.0-tsi-230",  "2.0 TSI 230 GTI",  2.0, 230, "essence", { code: "EA888 gen3" }),
  "2.0-tsi-245":  E("2.0-tsi-245",  "2.0 TSI 245 GTI Performance", 2.0, 245, "essence", { code: "EA888 gen3b" }),
  "2.0-tsi-265":  E("2.0-tsi-265",  "2.0 TSI 265 GTI",  2.0, 265, "essence", { code: "EA888 evo4" }),
  "2.0-tsi-280":  E("2.0-tsi-280",  "2.0 TSI 280",  2.0, 280, "essence", { code: "EA888 evo4" }),
  "2.0-tsi-300":  E("2.0-tsi-300",  "2.0 TSI 300 R",  2.0, 300, "essence", { code: "EA888 evo4" }),
  "2.0-tsi-310":  E("2.0-tsi-310",  "2.0 TSI 310 R",  2.0, 310, "essence", { code: "EA888 evo4" }),
  "2.0-tsi-320":  E("2.0-tsi-320",  "2.0 TSI 320 R",  2.0, 320, "essence", { code: "EA888 evo4" }),
  "2.0-tsi-333":  E("2.0-tsi-333",  "2.0 TSI 333 R",  2.0, 333, "essence", { code: "EA888 evo4" }),

  // --- ESSENCE 5-cyl Audi ---
  "2.5-tfsi-340": E("2.5-tfsi-340", "2.5 TFSI 340 (RS)", 2.5, 340, "essence", { code: "EA855 evo" }),
  "2.5-tfsi-367": E("2.5-tfsi-367", "2.5 TFSI 367 (RS)", 2.5, 367, "essence", { code: "EA855 evo" }),
  "2.5-tfsi-400": E("2.5-tfsi-400", "2.5 TFSI 400 (RS)", 2.5, 400, "essence", { code: "EA855 evo" }),

  // --- ESSENCE V6 ---
  "3.0-tfsi-272": E("3.0-tfsi-272", "3.0 TFSI 272 (compresseur)", 3.0, 272, "essence", { code: "EA837" }),
  "3.0-tfsi-333": E("3.0-tfsi-333", "3.0 TFSI 333 (compresseur)", 3.0, 333, "essence", { code: "EA837" }),
  "3.0-tfsi-340": E("3.0-tfsi-340", "3.0 TFSI 340", 3.0, 340, "essence", { code: "EA839" }),
  "3.0-tfsi-354": E("3.0-tfsi-354", "3.0 TFSI 354", 3.0, 354, "essence", { code: "EA839" }),
  "3.0-tfsi-450": E("3.0-tfsi-450", "3.0 TFSI 450 (S)", 3.0, 450, "essence", { code: "EA839" }),

  // --- ESSENCE V8 ---
  "4.0-tfsi-450": E("4.0-tfsi-450", "4.0 TFSI 450 (S)", 4.0, 450, "essence", { code: "EA824" }),
  "4.0-tfsi-560": E("4.0-tfsi-560", "4.0 TFSI 560 (RS)", 4.0, 560, "essence", { code: "EA824" }),
  "4.0-tfsi-600": E("4.0-tfsi-600", "4.0 TFSI 600 (RS)", 4.0, 600, "essence", { code: "EA824" }),

  // --- DIESEL EA189 / EA288 / EA288 evo ---
  "1.6-tdi-90":   E("1.6-tdi-90",   "1.6 TDI 90",   1.6, 90,  "diesel", { code: "EA189" }),
  "1.6-tdi-95":   E("1.6-tdi-95",   "1.6 TDI 95",   1.6, 95,  "diesel", { code: "EA288" }),
  "1.6-tdi-105":  E("1.6-tdi-105",  "1.6 TDI 105",  1.6, 105, "diesel", { code: "EA189" }),
  "1.6-tdi-110":  E("1.6-tdi-110",  "1.6 TDI 110",  1.6, 110, "diesel", { code: "EA288" }),
  "1.6-tdi-115":  E("1.6-tdi-115",  "1.6 TDI 115",  1.6, 115, "diesel", { code: "EA288" }),
  "1.6-tdi-120":  E("1.6-tdi-120",  "1.6 TDI 120",  1.6, 120, "diesel", { code: "EA288" }),
  "2.0-tdi-110":  E("2.0-tdi-110",  "2.0 TDI 110",  2.0, 110, "diesel", { code: "EA288" }),
  "2.0-tdi-115":  E("2.0-tdi-115",  "2.0 TDI 115",  2.0, 115, "diesel", { code: "EA288 evo" }),
  "2.0-tdi-140":  E("2.0-tdi-140",  "2.0 TDI 140",  2.0, 140, "diesel", { code: "EA189" }),
  "2.0-tdi-150":  E("2.0-tdi-150",  "2.0 TDI 150",  2.0, 150, "diesel", { code: "EA288" }),
  "2.0-tdi-170":  E("2.0-tdi-170",  "2.0 TDI 170",  2.0, 170, "diesel", { code: "EA189" }),
  "2.0-tdi-184":  E("2.0-tdi-184",  "2.0 TDI 184",  2.0, 184, "diesel", { code: "EA288" }),
  "2.0-tdi-190":  E("2.0-tdi-190",  "2.0 TDI 190",  2.0, 190, "diesel", { code: "EA288 evo" }),
  "2.0-tdi-200":  E("2.0-tdi-200",  "2.0 TDI 200",  2.0, 200, "diesel", { code: "EA288 evo" }),

  // --- DIESEL V6 ---
  "3.0-tdi-204":  E("3.0-tdi-204",  "3.0 TDI 204",  3.0, 204, "diesel", { code: "EA897" }),
  "3.0-tdi-218":  E("3.0-tdi-218",  "3.0 TDI 218",  3.0, 218, "diesel", { code: "EA897" }),
  "3.0-tdi-231":  E("3.0-tdi-231",  "3.0 TDI 231",  3.0, 231, "diesel", { code: "EA897 evo" }),
  "3.0-tdi-272":  E("3.0-tdi-272",  "3.0 TDI 272",  3.0, 272, "diesel", { code: "EA897 evo" }),
  "3.0-tdi-286":  E("3.0-tdi-286",  "3.0 TDI 286",  3.0, 286, "diesel", { code: "EA897 evo" }),
  "3.0-tdi-347":  E("3.0-tdi-347",  "3.0 TDI 347 (S)", 3.0, 347, "diesel", { code: "EA897 evo" }),

  // --- HYBRIDES PHEV ---
  "1.4-tsi-phev-204": E("1.4-tsi-phev-204", "1.4 eHybrid 204 (PHEV)", 1.4, 204, "phev", { code: "EA211" }),
  "1.4-tsi-phev-218": E("1.4-tsi-phev-218", "1.4 eHybrid 218 (PHEV)", 1.4, 218, "phev", { code: "EA211" }),
  "1.4-tsi-phev-245": E("1.4-tsi-phev-245", "1.4 GTE 245 (PHEV)",     1.4, 245, "phev", { code: "EA211" }),
  "1.5-tsi-phev-204": E("1.5-tsi-phev-204", "1.5 eHybrid 204 (PHEV)", 1.5, 204, "phev", { code: "EA211 evo2" }),
  "1.5-tsi-phev-272": E("1.5-tsi-phev-272", "1.5 GTE 272 (PHEV)",     1.5, 272, "phev", { code: "EA211 evo2" }),

  // --- ÉLECTRIQUES (MEB / J1) ---
  "ev-id3-150":   E("ev-id3-150",   "Pure 150 (45 kWh)",  0, 150, "electrique", { turbo: false, hasHPFP: false }),
  "ev-id3-204":   E("ev-id3-204",   "Pro 204 (58 kWh)",   0, 204, "electrique", { turbo: false, hasHPFP: false }),
  "ev-id3-231":   E("ev-id3-231",   "Pro S 231 (77 kWh)", 0, 231, "electrique", { turbo: false, hasHPFP: false }),
  "ev-id4-174":   E("ev-id4-174",   "Pure 174",           0, 174, "electrique", { turbo: false, hasHPFP: false }),
  "ev-id4-204":   E("ev-id4-204",   "Pro 204",            0, 204, "electrique", { turbo: false, hasHPFP: false }),
  "ev-id4-286":   E("ev-id4-286",   "Pro 286",            0, 286, "electrique", { turbo: false, hasHPFP: false }),
  "ev-id4-gtx":   E("ev-id4-gtx",   "GTX 299 AWD",        0, 299, "electrique", { turbo: false, hasHPFP: false }),

  // --- PORSCHE ESSENCE ---
  "p-2.0-tfsi-252": E("p-2.0-tfsi-252", "2.0 Turbo 252 (Macan/Cayenne)", 2.0, 252, "essence", { code: "EA888" }),
  "p-2.9-tt-440":   E("p-2.9-tt-440",   "2.9 V6 BiTurbo 440 (S)",          2.9, 440, "essence", { code: "EA839" }),
  "p-3.0-t-340":    E("p-3.0-t-340",    "3.0 V6 Turbo 340",                3.0, 340, "essence", { code: "EA839" }),
  "p-3.0-t-440":    E("p-3.0-t-440",    "3.0 V6 BiTurbo 440 (S)",          3.0, 440, "essence", { code: "EA839" }),
  "p-4.0-tt-550":   E("p-4.0-tt-550",   "4.0 V8 BiTurbo 550 (GTS/Turbo)",  4.0, 550, "essence", { code: "EA825" }),
  "p-4.0-tt-680":   E("p-4.0-tt-680",   "4.0 V8 BiTurbo 680 (Turbo S)",    4.0, 680, "essence", { code: "EA825" }),
  "p-3.0-t-385":    E("p-3.0-t-385",    "3.0 6cyl Turbo 385 (Carrera)",    3.0, 385, "essence", { code: "9A2" }),
  "p-3.0-t-450":    E("p-3.0-t-450",    "3.0 6cyl Turbo 450 (Carrera S)",  3.0, 450, "essence", { code: "9A2" }),
  "p-3.8-tt-580":   E("p-3.8-tt-580",   "3.8 6cyl BiTurbo 580 (Turbo)",    3.8, 580, "essence", { code: "9A2" }),
  "p-4.0-fa-500":   E("p-4.0-fa-500",   "4.0 6cyl atmo 500 (GT3)",         4.0, 500, "essence", { code: "9A1 evo", turbo: false }),
};

export function buildEngine(
  blueprintId: string,
  transmissions: Transmission[],
  drivetrains: Drivetrain[],
  opts: { hasHaldex?: boolean } = {},
): Engine {
  const bp = ENGINE_BLUEPRINTS[blueprintId];
  if (!bp) throw new Error(`Unknown engine blueprint: ${blueprintId}`);
  return {
    ...bp,
    transmissions,
    drivetrains,
    hasHaldex: opts.hasHaldex ?? drivetrains.includes("AWD"),
  };
}
