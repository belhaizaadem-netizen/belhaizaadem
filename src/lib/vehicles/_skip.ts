import type { Model } from "./types";
import { buildEngine as e } from "./engines";

export const VOLKSWAGEN_MODELS: Model[] = [
  {
    id: "up", name: "up!", brand: "Volkswagen",
    generations: [
      { id: "g1", name: "up! (2011-2023)", yearStart: 2011, yearEnd: 2023, engines: [
        e("1.0-mpi-65", ["manuelle"], ["FWD"]),
        e("1.0-mpi-75", ["manuelle"], ["FWD"]),
        e("1.0-tsi-90", ["manuelle"], ["FWD"]),
        e("1.0-tsi-115", ["manuelle"], ["FWD"]), // GTI
      ]},
    ],
  },
  {
    id: "polo", name: "Polo", brand: "Volkswagen",
    generations: [
      { id: "mk5", name: "Polo 5 / 6R-6C (2009-2017)", yearStart: 2009, yearEnd: 2017, engines: [
        e("1.0-mpi-75", ["manuelle"], ["FWD"]),
        e("1.2-tsi-86", ["manuelle", "DSG"], ["FWD"]),
        e("1.2-tsi-105", ["manuelle", "DSG"], ["FWD"]),
        e("1.4-tsi-150", ["DSG"], ["FWD"]), // GTI
        e("1.6-tdi-90", ["manuelle"], ["FWD"]),
        e("1.6-tdi-105", ["manuelle"], ["FWD"]),
      ]},
      { id: "mk6", name: "Polo 6 / AW (2017-)", yearStart: 2017, engines: [
        e("1.0-tsi-95", ["manuelle", "DSG"], ["FWD"]),
        e("1.0-tsi-115", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-200", ["DSG"], ["FWD"]), // GTI
        e("2.0-tsi-207", "DSG" as never, ["FWD"]) as any, // skip if undefined
        e("1.6-tdi-95", "manuelle" as never, ["FWD"]) as any,
      ].filter((x) => x && x.id),
    ].filter(Boolean) as any },
    ],
  },
];
