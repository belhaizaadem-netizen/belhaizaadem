import type { Model } from "./types";
import { buildEngine as e } from "./engines";

export const SEAT_MODELS: Model[] = [
  {
    id: "ibiza", name: "Ibiza", brand: "SEAT",
    generations: [
      { id: "6j", name: "Ibiza 6J (2008-2017)", yearStart: 2008, yearEnd: 2017, engines: [
        e("1.0-mpi-75", ["manuelle"], ["FWD"]),
        e("1.2-tsi-86", ["manuelle", "DSG"], ["FWD"]),
        e("1.2-tsi-105", ["manuelle", "DSG"], ["FWD"]),
        e("1.4-tsi-150", ["DSG"], ["FWD"]),
        e("1.6-tdi-90", ["manuelle"], ["FWD"]),
        e("1.6-tdi-105", ["manuelle"], ["FWD"]),
      ]},
      { id: "kj", name: "Ibiza KJ (2017-)", yearStart: 2017, engines: [
        e("1.0-tsi-95", ["manuelle"], ["FWD"]),
        e("1.0-tsi-115", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-tsi-150", ["DSG"], ["FWD"]),
      ]},
    ],
  },
  {
    id: "leon", name: "Leon", brand: "SEAT",
    generations: [
      { id: "1p", name: "Leon 1P (2005-2012)", yearStart: 2005, yearEnd: 2012, engines: [
        e("1.4-tsi-122", ["manuelle"], ["FWD"]),
        e("2.0-tsi-200", ["manuelle", "DSG"], ["FWD"]),
        e("1.6-tdi-105", ["manuelle"], ["FWD"]),
        e("2.0-tdi-140", ["manuelle"], ["FWD"]),
        e("2.0-tdi-170", ["manuelle"], ["FWD"]),
      ]},
      { id: "5f", name: "Leon 5F (2012-2020)", yearStart: 2012, yearEnd: 2020, engines: [
        e("1.0-tsi-115", ["manuelle", "DSG"], ["FWD"]),
        e("1.2-tsi-105", ["manuelle", "DSG"], ["FWD"]),
        e("1.4-tsi-125", ["manuelle", "DSG"], ["FWD"]),
        e("1.4-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-tsi-130", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("1.8-tsi-180", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-220", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-265", ["DSG"], ["FWD"]),
        e("2.0-tsi-300", ["DSG"], ["AWD"]),
        e("1.6-tdi-110", ["manuelle", "DSG"], ["FWD"]),
        e("1.6-tdi-115", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tdi-150", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tdi-184", ["manuelle", "DSG"], ["FWD"]),
      ]},
      { id: "kl", name: "Leon KL (2020-)", yearStart: 2020, engines: [
        e("1.0-tsi-90", ["manuelle"], ["FWD"]),
        e("1.0-tsi-110", ["manuelle"], ["FWD"]),
        e("1.5-tsi-130", ["manuelle"], ["FWD"]),
        e("1.5-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-etsi-150", ["DSG"], ["FWD"]),
        e("1.5-tsi-phev-204", ["DSG"], ["FWD"]),
        e("2.0-tdi-115", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tdi-150", ["manuelle", "DSG"], ["FWD"]),
      ]},
    ],
  },
  {
    id: "ateca", name: "Ateca", brand: "SEAT",
    generations: [
      { id: "g1", name: "Ateca (2016-)", yearStart: 2016, engines: [
        e("1.0-tsi-115", ["manuelle"], ["FWD"]),
        e("1.5-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-190", ["DSG"], ["AWD"]),
        e("2.0-tsi-300", ["DSG"], ["AWD"]),
        e("1.6-tdi-115", ["manuelle"], ["FWD"]),
        e("2.0-tdi-150", ["manuelle", "DSG"], ["FWD", "AWD"]),
        e("2.0-tdi-190", ["DSG"], ["AWD"]),
      ]},
    ],
  },
  {
    id: "arona", name: "Arona", brand: "SEAT",
    generations: [
      { id: "g1", name: "Arona (2017-)", yearStart: 2017, engines: [
        e("1.0-tsi-95", ["manuelle"], ["FWD"]),
        e("1.0-tsi-115", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-tsi-150", ["DSG"], ["FWD"]),
      ]},
    ],
  },
  {
    id: "tarraco", name: "Tarraco", brand: "SEAT",
    generations: [
      { id: "g1", name: "Tarraco (2018-)", yearStart: 2018, engines: [
        e("1.5-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-190", ["DSG"], ["AWD"]),
        e("2.0-tsi-245", ["DSG"], ["AWD"]),
        e("1.4-tsi-phev-245", ["DSG"], ["FWD"]),
        e("2.0-tdi-150", ["manuelle", "DSG"], ["FWD", "AWD"]),
        e("2.0-tdi-200", ["DSG"], ["AWD"]),
      ]},
    ],
  },
  {
    id: "altea", name: "Altea", brand: "SEAT",
    generations: [
      { id: "g1", name: "Altea (2004-2015)", yearStart: 2004, yearEnd: 2015, engines: [
        e("1.4-mpi-85", ["manuelle"], ["FWD"]),
        e("1.4-tsi-125", ["manuelle", "DSG"], ["FWD"]),
        e("1.6-tdi-105", ["manuelle"], ["FWD"]),
        e("2.0-tdi-140", ["manuelle", "DSG"], ["FWD"]),
      ]},
    ],
  },
  {
    id: "cordoba", name: "Cordoba", brand: "SEAT",
    generations: [
      { id: "g1", name: "Cordoba (1993-2009)", yearStart: 1993, yearEnd: 2009, engines: [
        e("1.4-mpi-75", ["manuelle"], ["FWD"]),
        e("1.4-mpi-85", ["manuelle"], ["FWD"]),
      ]},
    ],
  },
  {
    id: "toledo", name: "Toledo", brand: "SEAT",
    generations: [
      { id: "iii", name: "Toledo III (2004-2009)", yearStart: 2004, yearEnd: 2009, engines: [
        e("1.4-mpi-85", ["manuelle"], ["FWD"]),
        e("1.6-tdi-105", ["manuelle"], ["FWD"]),
        e("2.0-tdi-140", ["manuelle", "DSG"], ["FWD"]),
      ]},
    ],
  },
];
