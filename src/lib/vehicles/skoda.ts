import type { Model } from "./types";
import { buildEngine as e } from "./engines";

export const SKODA_MODELS: Model[] = [
  {
    id: "fabia", name: "Fabia", brand: "Škoda",
    generations: [
      { id: "mk3", name: "Fabia III NJ (2014-2021)", yearStart: 2014, yearEnd: 2021, engines: [
        e("1.0-mpi-75", ["manuelle"], ["FWD"]),
        e("1.0-tsi-95", ["manuelle"], ["FWD"]),
        e("1.0-tsi-110", ["manuelle", "DSG"], ["FWD"]),
        e("1.4-tsi-125", ["manuelle"], ["FWD"]),
        e("1.6-tdi-90", ["manuelle"], ["FWD"]),
        e("1.6-tdi-105", ["manuelle"], ["FWD"]),
      ]},
      { id: "mk4", name: "Fabia IV NW (2021-)", yearStart: 2021, engines: [
        e("1.0-mpi-65", ["manuelle"], ["FWD"]),
        e("1.0-mpi-75", ["manuelle"], ["FWD"]),
        e("1.0-tsi-95", ["manuelle"], ["FWD"]),
        e("1.0-tsi-110", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-tsi-150", ["DSG"], ["FWD"]),
      ]},
    ],
  },
  {
    id: "scala", name: "Scala", brand: "Škoda",
    generations: [
      { id: "g1", name: "Scala (2019-)", yearStart: 2019, engines: [
        e("1.0-tsi-95", ["manuelle"], ["FWD"]),
        e("1.0-tsi-115", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-tsi-150", ["manuelle", "DSG"], ["FWD"]),
      ]},
    ],
  },
  {
    id: "octavia", name: "Octavia", brand: "Škoda",
    generations: [
      { id: "mk2", name: "Octavia II 1Z (2004-2013)", yearStart: 2004, yearEnd: 2013, engines: [
        e("1.4-tsi-122", ["manuelle"], ["FWD"]),
        e("1.8-tsi-160", ["manuelle", "DSG"], ["FWD", "AWD"]),
        e("2.0-tsi-200", ["manuelle", "DSG"], ["FWD"]),
        e("1.6-tdi-105", ["manuelle"], ["FWD"]),
        e("2.0-tdi-140", ["manuelle"], ["FWD", "AWD"]),
        e("2.0-tdi-170", ["manuelle"], ["FWD"]),
      ]},
      { id: "mk3", name: "Octavia III 5E (2013-2020)", yearStart: 2013, yearEnd: 2020, engines: [
        e("1.0-tsi-115", ["manuelle", "DSG"], ["FWD"]),
        e("1.2-tsi-105", ["manuelle", "DSG"], ["FWD"]),
        e("1.4-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("1.8-tsi-180", ["manuelle", "DSG"], ["FWD", "AWD"]),
        e("2.0-tsi-220", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-245", ["manuelle", "DSG"], ["FWD"]),
        e("1.6-tdi-110", ["manuelle", "DSG"], ["FWD"]),
        e("1.6-tdi-115", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tdi-150", ["manuelle", "DSG"], ["FWD", "AWD"]),
        e("2.0-tdi-184", ["manuelle", "DSG"], ["FWD", "AWD"]),
      ]},
      { id: "mk4", name: "Octavia IV NX (2020-)", yearStart: 2020, engines: [
        e("1.0-tsi-110", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-etsi-150", ["DSG"], ["FWD"]),
        e("2.0-tsi-245", ["DSG"], ["FWD"]),
        e("1.5-tsi-phev-204", ["DSG"], ["FWD"]),
        e("1.5-tsi-phev-272", ["DSG"], ["FWD"]),
        e("2.0-tdi-115", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tdi-150", ["manuelle", "DSG"], ["FWD", "AWD"]),
        e("2.0-tdi-200", ["DSG"], ["FWD"]),
      ]},
    ],
  },
  {
    id: "superb", name: "Superb", brand: "Škoda",
    generations: [
      { id: "mk3", name: "Superb III 3V (2015-2023)", yearStart: 2015, yearEnd: 2023, engines: [
        e("1.4-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("1.8-tsi-180", ["DSG"], ["FWD"]),
        e("2.0-tsi-190", ["DSG"], ["FWD", "AWD"]),
        e("2.0-tsi-280", ["DSG"], ["AWD"]),
        e("1.4-tsi-phev-218", ["DSG"], ["FWD"]) as never,
        e("1.6-tdi-120", ["manuelle"], ["FWD"]) as never,
        e("2.0-tdi-150", ["manuelle", "DSG"], ["FWD", "AWD"]),
        e("2.0-tdi-190", ["DSG"], ["FWD", "AWD"]),
      ].filter((x) => x !== undefined) as never },
      { id: "mk4", name: "Superb IV NP (2023-)", yearStart: 2023, engines: [
        e("1.5-etsi-150", ["DSG"], ["FWD"]),
        e("1.5-tsi-phev-204", ["DSG"], ["FWD"]),
        e("2.0-tdi-150", ["DSG"], ["FWD", "AWD"]),
        e("2.0-tdi-200", ["DSG"], ["AWD"]),
      ]},
    ],
  },
  {
    id: "kamiq", name: "Kamiq", brand: "Škoda",
    generations: [
      { id: "g1", name: "Kamiq (2019-)", yearStart: 2019, engines: [
        e("1.0-tsi-95", ["manuelle"], ["FWD"]),
        e("1.0-tsi-110", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-tsi-150", ["manuelle", "DSG"], ["FWD"]),
      ]},
    ],
  },
  {
    id: "karoq", name: "Karoq", brand: "Škoda",
    generations: [
      { id: "g1", name: "Karoq (2017-)", yearStart: 2017, engines: [
        e("1.0-tsi-115", ["manuelle"], ["FWD"]),
        e("1.5-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-190", ["DSG"], ["AWD"]),
        e("1.6-tdi-115", ["manuelle"], ["FWD"]),
        e("2.0-tdi-150", ["manuelle", "DSG"], ["FWD", "AWD"]),
      ]},
    ],
  },
  {
    id: "kodiaq", name: "Kodiaq", brand: "Škoda",
    generations: [
      { id: "mk1", name: "Kodiaq I NS (2016-2024)", yearStart: 2016, yearEnd: 2024, engines: [
        e("1.4-tsi-150", ["manuelle", "DSG"], ["FWD", "AWD"]),
        e("1.5-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-190", ["DSG"], ["AWD"]),
        e("2.0-tsi-245", ["DSG"], ["AWD"]),
        e("2.0-tdi-150", ["manuelle", "DSG"], ["FWD", "AWD"]),
        e("2.0-tdi-200", ["DSG"], ["AWD"]),
      ]},
      { id: "mk2", name: "Kodiaq II (2024-)", yearStart: 2024, engines: [
        e("1.5-etsi-150", ["DSG"], ["FWD"]),
        e("1.5-tsi-phev-204", ["DSG"], ["FWD"]),
        e("2.0-tsi-200", ["DSG"], ["AWD"]),
        e("2.0-tdi-150", ["DSG"], ["FWD", "AWD"]),
        e("2.0-tdi-200", ["DSG"], ["AWD"]),
      ]},
    ],
  },
  {
    id: "enyaq", name: "Enyaq iV", brand: "Škoda",
    generations: [
      { id: "g1", name: "Enyaq (2020-)", yearStart: 2020, engines: [
        e("ev-id4-174", ["auto"], ["RWD"]),
        e("ev-id4-204", ["auto"], ["RWD"]),
        e("ev-id4-286", ["auto"], ["RWD"]),
        e("ev-id4-gtx", ["auto"], ["AWD"]),
      ]},
    ],
  },
];
