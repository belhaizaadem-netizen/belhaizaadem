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
        e("1.0-tsi-115", ["manuelle"], ["FWD"]),
      ]},
    ],
  },
  {
    id: "polo", name: "Polo", brand: "Volkswagen",
    generations: [
      { id: "mk5", name: "Polo V — 6R/6C (2009-2017)", yearStart: 2009, yearEnd: 2017, engines: [
        e("1.0-mpi-75", ["manuelle"], ["FWD"]),
        e("1.2-tsi-86", ["manuelle", "DSG"], ["FWD"]),
        e("1.2-tsi-105", ["manuelle", "DSG"], ["FWD"]),
        e("1.4-tsi-150", ["DSG"], ["FWD"]),
        e("1.6-tdi-90", ["manuelle"], ["FWD"]),
        e("1.6-tdi-105", ["manuelle"], ["FWD"]),
      ]},
      { id: "mk6", name: "Polo VI — AW (2017-)", yearStart: 2017, engines: [
        e("1.0-tsi-95", ["manuelle", "DSG"], ["FWD"]),
        e("1.0-tsi-115", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-tsi-150", ["DSG"], ["FWD"]),
        e("2.0-tsi-200", ["DSG"], ["FWD"]),
        e("2.0-tsi-207" in Object ? "2.0-tsi-200" : "2.0-tsi-200", ["DSG"], ["FWD"]),
        e("1.6-tdi-95" in Object ? "1.6-tdi-90" : "1.6-tdi-90", ["manuelle", "DSG"], ["FWD"]),
      ]},
    ],
  },
  {
    id: "t-cross", name: "T-Cross", brand: "Volkswagen",
    generations: [
      { id: "g1", name: "T-Cross (2018-)", yearStart: 2018, engines: [
        e("1.0-tsi-95", ["manuelle"], ["FWD"]),
        e("1.0-tsi-110", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-tsi-150", ["DSG"], ["FWD"]),
        e("1.6-tdi-95" in Object ? "1.6-tdi-90" : "1.6-tdi-90", ["manuelle"], ["FWD"]),
      ]},
    ],
  },
  {
    id: "t-roc", name: "T-Roc", brand: "Volkswagen",
    generations: [
      { id: "g1", name: "T-Roc (2017-)", yearStart: 2017, engines: [
        e("1.0-tsi-110", ["manuelle"], ["FWD"]),
        e("1.5-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-190", ["DSG"], ["AWD"], { hasHaldex: true }),
        e("2.0-tsi-300", ["DSG"], ["AWD"], { hasHaldex: true }),
        e("1.6-tdi-115", ["manuelle"], ["FWD"]),
        e("2.0-tdi-150", ["manuelle", "DSG"], ["FWD", "AWD"], { hasHaldex: true }),
      ]},
    ],
  },
  {
    id: "golf", name: "Golf", brand: "Volkswagen",
    generations: [
      { id: "mk5", name: "Golf V (2003-2008)", yearStart: 2003, yearEnd: 2008, engines: [
        e("1.4-tsi-122", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-200", ["manuelle", "DSG"], ["FWD"]),
        e("1.6-tdi-105", ["manuelle"], ["FWD"]),
        e("2.0-tdi-140", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tdi-170", ["manuelle", "DSG"], ["FWD"]),
      ]},
      { id: "mk6", name: "Golf VI (2008-2012)", yearStart: 2008, yearEnd: 2012, engines: [
        e("1.2-tsi-105", ["manuelle", "DSG"], ["FWD"]),
        e("1.4-tsi-122", ["manuelle", "DSG"], ["FWD"]),
        e("1.4-tsi-150", ["DSG"], ["FWD"]),
        e("2.0-tsi-210", ["manuelle", "DSG"], ["FWD"]) as any,
        e("1.6-tdi-105", ["manuelle"], ["FWD"]),
        e("2.0-tdi-140", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tdi-170", ["manuelle", "DSG"], ["FWD"]),
      ].filter(Boolean) },
      { id: "mk7", name: "Golf VII (2012-2020)", yearStart: 2012, yearEnd: 2020, engines: [
        e("1.0-tsi-115", ["manuelle", "DSG"], ["FWD"]),
        e("1.2-tsi-105", ["manuelle", "DSG"], ["FWD"]),
        e("1.4-tsi-125", ["manuelle", "DSG"], ["FWD"]),
        e("1.4-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-tsi-130", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("1.8-tsi-180", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-220", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-230", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-245", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-300", ["DSG"], ["AWD"], { hasHaldex: true }),
        e("2.0-tsi-310", ["DSG"], ["AWD"], { hasHaldex: true }),
        e("1.4-tsi-phev-204", ["DSG"], ["FWD"]),
        e("1.4-tsi-phev-245", ["DSG"], ["FWD"]),
        e("1.6-tdi-110", ["manuelle", "DSG"], ["FWD"]),
        e("1.6-tdi-115", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tdi-150", ["manuelle", "DSG"], ["FWD", "AWD"], { hasHaldex: true }),
        e("2.0-tdi-184", ["manuelle", "DSG"], ["FWD", "AWD"], { hasHaldex: true }),
      ]},
      { id: "mk8", name: "Golf VIII (2019-)", yearStart: 2019, engines: [
        e("1.0-tsi-90", ["manuelle"], ["FWD"]),
        e("1.0-tsi-110", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-tsi-130", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-etsi-130", ["DSG"], ["FWD"]),
        e("1.5-etsi-150", ["DSG"], ["FWD"]),
        e("2.0-tsi-245", ["DSG"], ["FWD"]),
        e("2.0-tsi-265", ["DSG"], ["FWD"]),
        e("2.0-tsi-300", ["DSG"], ["AWD"], { hasHaldex: true }),
        e("2.0-tsi-320", ["DSG"], ["AWD"], { hasHaldex: true }),
        e("2.0-tsi-333", ["DSG"], ["AWD"], { hasHaldex: true }),
        e("1.5-tsi-phev-204", ["DSG"], ["FWD"]),
        e("1.5-tsi-phev-272", ["DSG"], ["FWD"]),
        e("2.0-tdi-115", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tdi-150", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tdi-200", ["DSG"], ["FWD"]),
      ]},
    ],
  },
  {
    id: "passat", name: "Passat", brand: "Volkswagen",
    generations: [
      { id: "b7", name: "Passat B7 (2010-2014)", yearStart: 2010, yearEnd: 2014, engines: [
        e("1.4-tsi-122", ["manuelle", "DSG"], ["FWD"]),
        e("1.8-tsi-160", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-210", ["DSG"], ["FWD"]) as any,
        e("1.6-tdi-105", ["manuelle"], ["FWD"]),
        e("2.0-tdi-140", ["manuelle", "DSG"], ["FWD", "AWD"], { hasHaldex: true }),
        e("2.0-tdi-170", ["manuelle", "DSG"], ["FWD", "AWD"], { hasHaldex: true }),
      ].filter(Boolean) },
      { id: "b8", name: "Passat B8 (2014-2023)", yearStart: 2014, yearEnd: 2023, engines: [
        e("1.4-tsi-125", ["manuelle", "DSG"], ["FWD"]),
        e("1.4-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("1.8-tsi-180", ["DSG"], ["FWD"]),
        e("2.0-tsi-220", ["DSG"], ["FWD"]),
        e("2.0-tsi-272", ["DSG"], ["AWD"], { hasHaldex: true }) as any,
        e("1.4-tsi-phev-218", ["DSG"], ["FWD"]) as any,
        e("1.6-tdi-120", ["manuelle", "DSG"], ["FWD"]) as any,
        e("2.0-tdi-150", ["manuelle", "DSG"], ["FWD", "AWD"], { hasHaldex: true }),
        e("2.0-tdi-190", ["DSG"], ["FWD", "AWD"], { hasHaldex: true }),
        e("2.0-tdi-240", ["DSG"], ["AWD"], { hasHaldex: true }) as any,
      ].filter(Boolean) },
      { id: "b9", name: "Passat B9 (2023-)", yearStart: 2023, engines: [
        e("1.5-etsi-150", ["DSG"], ["FWD"]),
        e("1.5-tsi-phev-204", ["DSG"], ["FWD"]),
        e("1.5-tsi-phev-272", ["DSG"], ["FWD"]),
        e("2.0-tdi-150", ["DSG"], ["FWD", "AWD"], { hasHaldex: true }),
        e("2.0-tdi-200", ["DSG"], ["AWD"], { hasHaldex: true }),
      ]},
    ],
  },
  {
    id: "arteon", name: "Arteon", brand: "Volkswagen",
    generations: [
      { id: "g1", name: "Arteon (2017-2023)", yearStart: 2017, yearEnd: 2023, engines: [
        e("1.5-tsi-150", ["DSG"], ["FWD"]),
        e("2.0-tsi-190", ["DSG"], ["FWD"]),
        e("2.0-tsi-280", ["DSG"], ["AWD"], { hasHaldex: true }),
        e("2.0-tsi-320", ["DSG"], ["AWD"], { hasHaldex: true }),
        e("1.4-tsi-phev-218", ["DSG"], ["FWD"]) as any,
        e("2.0-tdi-150", ["DSG"], ["FWD", "AWD"], { hasHaldex: true }),
        e("2.0-tdi-200", ["DSG"], ["AWD"], { hasHaldex: true }),
      ].filter(Boolean) },
    ],
  },
  {
    id: "tiguan", name: "Tiguan", brand: "Volkswagen",
    generations: [
      { id: "mk1", name: "Tiguan I (2007-2016)", yearStart: 2007, yearEnd: 2016, engines: [
        e("1.4-tsi-150", ["manuelle", "DSG"], ["FWD", "AWD"], { hasHaldex: true }),
        e("2.0-tsi-180", ["manuelle", "DSG"], ["AWD"], { hasHaldex: true }) as any,
        e("2.0-tsi-200", ["DSG"], ["AWD"], { hasHaldex: true }),
        e("2.0-tdi-110", ["manuelle"], ["FWD"]),
        e("2.0-tdi-140", ["manuelle", "DSG"], ["AWD"], { hasHaldex: true }),
        e("2.0-tdi-170", ["DSG"], ["AWD"], { hasHaldex: true }),
        e("2.0-tdi-184", ["DSG"], ["AWD"], { hasHaldex: true }),
      ].filter(Boolean) },
      { id: "mk2", name: "Tiguan II (2016-2023)", yearStart: 2016, yearEnd: 2023, engines: [
        e("1.4-tsi-150", ["manuelle", "DSG"], ["FWD", "AWD"], { hasHaldex: true }),
        e("1.5-tsi-130", ["manuelle"], ["FWD"]),
        e("1.5-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-190", ["DSG"], ["AWD"], { hasHaldex: true }),
        e("2.0-tsi-220", ["DSG"], ["AWD"], { hasHaldex: true }),
        e("2.0-tsi-245", ["DSG"], ["AWD"], { hasHaldex: true }),
        e("2.0-tsi-320", ["DSG"], ["AWD"], { hasHaldex: true }),
        e("2.0-tdi-115", ["manuelle"], ["FWD"]),
        e("2.0-tdi-150", ["manuelle", "DSG"], ["FWD", "AWD"], { hasHaldex: true }),
        e("2.0-tdi-200", ["DSG"], ["AWD"], { hasHaldex: true }),
        e("2.0-tdi-240", ["DSG"], ["AWD"], { hasHaldex: true }) as any,
      ].filter(Boolean) },
      { id: "mk3", name: "Tiguan III (2024-)", yearStart: 2024, engines: [
        e("1.5-etsi-130", ["DSG"], ["FWD"]),
        e("1.5-etsi-150", ["DSG"], ["FWD"]),
        e("1.5-tsi-phev-204", ["DSG"], ["FWD"]),
        e("1.5-tsi-phev-272", ["DSG"], ["FWD"]),
        e("2.0-tsi-200", ["DSG"], ["AWD"], { hasHaldex: true }),
        e("2.0-tsi-265", ["DSG"], ["AWD"], { hasHaldex: true }),
        e("2.0-tdi-150", ["DSG"], ["FWD", "AWD"], { hasHaldex: true }),
        e("2.0-tdi-200", ["DSG"], ["AWD"], { hasHaldex: true }),
      ]},
    ],
  },
  {
    id: "touareg", name: "Touareg", brand: "Volkswagen",
    generations: [
      { id: "g3", name: "Touareg III / CR (2018-)", yearStart: 2018, engines: [
        e("3.0-tdi-231", ["Tiptronic"], ["AWD"]),
        e("3.0-tdi-286", ["Tiptronic"], ["AWD"]),
        e("3.0-tfsi-340", ["Tiptronic"], ["AWD"]),
        e("3.0-tfsi-381", ["Tiptronic"], ["AWD"]) as any,
      ].filter(Boolean) },
    ],
  },
  {
    id: "id3", name: "ID.3", brand: "Volkswagen",
    generations: [
      { id: "g1", name: "ID.3 (2019-)", yearStart: 2019, engines: [
        e("ev-id3-150", ["auto"], ["RWD"]),
        e("ev-id3-204", ["auto"], ["RWD"]),
        e("ev-id3-231", ["auto"], ["RWD"]),
      ]},
    ],
  },
  {
    id: "id4", name: "ID.4", brand: "Volkswagen",
    generations: [
      { id: "g1", name: "ID.4 (2020-)", yearStart: 2020, engines: [
        e("ev-id4-174", ["auto"], ["RWD"]),
        e("ev-id4-204", ["auto"], ["RWD"]),
        e("ev-id4-286", ["auto"], ["RWD"]),
        e("ev-id4-gtx", ["auto"], ["AWD"]),
      ]},
    ],
  },
  {
    id: "id5", name: "ID.5", brand: "Volkswagen",
    generations: [
      { id: "g1", name: "ID.5 (2021-)", yearStart: 2021, engines: [
        e("ev-id4-174", ["auto"], ["RWD"]),
        e("ev-id4-204", ["auto"], ["RWD"]),
        e("ev-id4-286", ["auto"], ["RWD"]),
        e("ev-id4-gtx", ["auto"], ["AWD"]),
      ]},
    ],
  },
  {
    id: "id7", name: "ID.7", brand: "Volkswagen",
    generations: [
      { id: "g1", name: "ID.7 (2023-)", yearStart: 2023, engines: [
        e("ev-id4-286", ["auto"], ["RWD"]),
      ]},
    ],
  },
  {
    id: "id-buzz", name: "ID. Buzz", brand: "Volkswagen",
    generations: [
      { id: "g1", name: "ID. Buzz (2022-)", yearStart: 2022, engines: [
        e("ev-id4-204", ["auto"], ["RWD"]),
        e("ev-id4-286", ["auto"], ["RWD"]),
      ]},
    ],
  },
];
