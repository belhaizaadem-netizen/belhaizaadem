import type { Model } from "./types";
import { buildEngine as e } from "./engines";

export const AUDI_MODELS: Model[] = [
  {
    id: "a1", name: "A1", brand: "Audi",
    generations: [
      { id: "8x", name: "A1 8X (2010-2018)", yearStart: 2010, yearEnd: 2018, engines: [
        e("1.0-tsi-95", ["manuelle", "S-tronic"], ["FWD"]),
        e("1.2-tsi-86", ["manuelle", "S-tronic"], ["FWD"]),
        e("1.4-tsi-122", ["manuelle", "S-tronic"], ["FWD"]),
        e("1.4-tsi-150", ["S-tronic"], ["FWD"]),
        e("1.6-tdi-90", ["manuelle"], ["FWD"]),
        e("1.6-tdi-105", ["manuelle"], ["FWD"]),
      ]},
      { id: "gb", name: "A1 GB (2018-)", yearStart: 2018, engines: [
        e("1.0-tsi-95", ["manuelle"], ["FWD"]),
        e("1.0-tsi-110", ["manuelle", "S-tronic"], ["FWD"]),
        e("1.5-tsi-150", ["S-tronic"], ["FWD"]),
        e("2.0-tsi-200", ["S-tronic"], ["FWD"]),
      ]},
    ],
  },
  {
    id: "a3", name: "A3", brand: "Audi",
    generations: [
      { id: "8p", name: "A3 8P (2003-2012)", yearStart: 2003, yearEnd: 2012, engines: [
        e("1.4-tsi-122", ["manuelle", "S-tronic"], ["FWD"]),
        e("2.0-tsi-200", ["manuelle", "S-tronic"], ["FWD", "AWD"]),
        e("1.6-tdi-105", ["manuelle"], ["FWD"]),
        e("2.0-tdi-140", ["manuelle", "S-tronic"], ["FWD", "AWD"]),
        e("2.0-tdi-170", ["manuelle", "S-tronic"], ["FWD", "AWD"]),
      ]},
      { id: "8v", name: "A3 8V (2012-2020)", yearStart: 2012, yearEnd: 2020, engines: [
        e("1.0-tsi-115", ["manuelle", "S-tronic"], ["FWD"]),
        e("1.2-tsi-105", ["manuelle", "S-tronic"], ["FWD"]),
        e("1.4-tsi-125", ["manuelle", "S-tronic"], ["FWD"]),
        e("1.4-tsi-150", ["manuelle", "S-tronic"], ["FWD"]),
        e("1.5-tsi-150", ["manuelle", "S-tronic"], ["FWD"]),
        e("1.8-tsi-180", ["manuelle", "S-tronic"], ["FWD", "AWD"]),
        e("2.0-tsi-190", ["manuelle", "S-tronic"], ["FWD", "AWD"]),
        e("2.0-tsi-220", ["S-tronic"], ["AWD"]),
        e("2.0-tsi-300", ["S-tronic"], ["AWD"]),
        e("2.0-tsi-310", ["S-tronic"], ["AWD"]),
        e("2.5-tfsi-340", ["S-tronic"], ["AWD"]),
        e("2.5-tfsi-367", ["S-tronic"], ["AWD"]),
        e("1.4-tsi-phev-204", ["S-tronic"], ["FWD"]),
        e("1.6-tdi-110", ["manuelle", "S-tronic"], ["FWD"]),
        e("1.6-tdi-115", ["manuelle", "S-tronic"], ["FWD"]),
        e("2.0-tdi-150", ["manuelle", "S-tronic"], ["FWD", "AWD"]),
        e("2.0-tdi-184", ["manuelle", "S-tronic"], ["FWD", "AWD"]),
      ]},
      { id: "8y", name: "A3 8Y (2020-)", yearStart: 2020, engines: [
        e("1.0-tsi-110", ["manuelle", "S-tronic"], ["FWD"]),
        e("1.5-tsi-150", ["manuelle", "S-tronic"], ["FWD"]),
        e("1.5-etsi-150", ["S-tronic"], ["FWD"]),
        e("2.0-tsi-245", ["S-tronic"], ["FWD"]),
        e("2.0-tsi-310", ["S-tronic"], ["AWD"]),
        e("2.0-tsi-333", ["S-tronic"], ["AWD"]),
        e("2.5-tfsi-400", ["S-tronic"], ["AWD"]),
        e("1.5-tsi-phev-204", ["S-tronic"], ["FWD"]),
        e("1.5-tsi-phev-272", ["S-tronic"], ["FWD"]),
        e("2.0-tdi-115", ["manuelle", "S-tronic"], ["FWD"]),
        e("2.0-tdi-150", ["manuelle", "S-tronic"], ["FWD"]),
      ]},
    ],
  },
  {
    id: "a4", name: "A4", brand: "Audi",
    generations: [
      { id: "b8", name: "A4 B8 (2007-2015)", yearStart: 2007, yearEnd: 2015, engines: [
        e("1.8-tsi-160", ["manuelle", "S-tronic"], ["FWD", "AWD"]),
        e("2.0-tsi-200", ["manuelle", "S-tronic"], ["FWD", "AWD"]),
        e("3.0-tfsi-272", ["S-tronic", "Tiptronic"], ["AWD"]),
        e("2.0-tdi-140", ["manuelle"], ["FWD"]),
        e("2.0-tdi-170", ["manuelle", "S-tronic"], ["FWD", "AWD"]),
        e("3.0-tdi-204", ["S-tronic"], ["AWD"]),
        e("3.0-tdi-272", ["Tiptronic"], ["AWD"]),
      ]},
      { id: "b9", name: "A4 B9 (2015-2023)", yearStart: 2015, yearEnd: 2023, engines: [
        e("1.4-tsi-150", ["manuelle", "S-tronic"], ["FWD"]),
        e("2.0-tsi-190", ["manuelle", "S-tronic"], ["FWD", "AWD"]),
        e("2.0-tsi-245", ["S-tronic"], ["AWD"]),
        e("3.0-tfsi-354", ["Tiptronic"], ["AWD"]),
        e("3.0-tfsi-450", ["Tiptronic"], ["AWD"]),
        e("2.0-tdi-150", ["manuelle", "S-tronic"], ["FWD"]),
        e("2.0-tdi-190", ["S-tronic"], ["FWD", "AWD"]),
        e("3.0-tdi-218", ["Tiptronic"], ["AWD"]),
        e("3.0-tdi-272", ["Tiptronic"], ["AWD"]),
        e("3.0-tdi-347", ["Tiptronic"], ["AWD"]),
      ]},
    ],
  },
  {
    id: "a5", name: "A5", brand: "Audi",
    generations: [
      { id: "f5", name: "A5 F5 (2016-2024)", yearStart: 2016, yearEnd: 2024, engines: [
        e("2.0-tsi-190", ["manuelle", "S-tronic"], ["FWD", "AWD"]),
        e("2.0-tsi-245", ["S-tronic"], ["AWD"]),
        e("3.0-tfsi-354", ["Tiptronic"], ["AWD"]),
        e("3.0-tfsi-450", ["Tiptronic"], ["AWD"]),
        e("2.0-tdi-190", ["S-tronic"], ["FWD", "AWD"]),
        e("3.0-tdi-218", ["Tiptronic"], ["AWD"]),
        e("3.0-tdi-272", ["Tiptronic"], ["AWD"]),
      ]},
    ],
  },
  {
    id: "a6", name: "A6", brand: "Audi",
    generations: [
      { id: "c7", name: "A6 C7 (2011-2018)", yearStart: 2011, yearEnd: 2018, engines: [
        e("2.0-tsi-200", ["S-tronic"], ["FWD"]),
        e("3.0-tfsi-272", ["S-tronic"], ["AWD"]),
        e("3.0-tfsi-333", ["S-tronic"], ["AWD"]),
        e("4.0-tfsi-450", ["Tiptronic"], ["AWD"]),
        e("4.0-tfsi-560", ["Tiptronic"], ["AWD"]),
        e("2.0-tdi-170", ["manuelle", "S-tronic"], ["FWD"]),
        e("3.0-tdi-204", ["S-tronic"], ["FWD"]),
        e("3.0-tdi-272", ["Tiptronic"], ["AWD"]),
      ]},
      { id: "c8", name: "A6 C8 (2018-)", yearStart: 2018, engines: [
        e("2.0-tsi-245", ["S-tronic"], ["FWD", "AWD"]),
        e("3.0-tfsi-340", ["Tiptronic"], ["AWD"]),
        e("3.0-tfsi-450", ["Tiptronic"], ["AWD"]),
        e("4.0-tfsi-600", ["Tiptronic"], ["AWD"]),
        e("2.0-tdi-200", ["S-tronic"], ["FWD"]),
        e("3.0-tdi-231", ["Tiptronic"], ["AWD"]),
        e("3.0-tdi-286", ["Tiptronic"], ["AWD"]),
        e("3.0-tdi-347", ["Tiptronic"], ["AWD"]),
      ]},
    ],
  },
  {
    id: "a7", name: "A7", brand: "Audi",
    generations: [
      { id: "c8", name: "A7 C8 (2018-)", yearStart: 2018, engines: [
        e("3.0-tfsi-340", ["Tiptronic"], ["AWD"]),
        e("3.0-tfsi-450", ["Tiptronic"], ["AWD"]),
        e("4.0-tfsi-600", ["Tiptronic"], ["AWD"]),
        e("3.0-tdi-231", ["Tiptronic"], ["AWD"]),
        e("3.0-tdi-286", ["Tiptronic"], ["AWD"]),
      ]},
    ],
  },
  {
    id: "a8", name: "A8", brand: "Audi",
    generations: [
      { id: "d5", name: "A8 D5 (2017-)", yearStart: 2017, engines: [
        e("3.0-tfsi-340", ["Tiptronic"], ["AWD"]),
        e("4.0-tfsi-450", ["Tiptronic"], ["AWD"]),
        e("4.0-tfsi-560", ["Tiptronic"], ["AWD"]),
        e("3.0-tdi-286", ["Tiptronic"], ["AWD"]),
      ]},
    ],
  },
  {
    id: "q2", name: "Q2", brand: "Audi",
    generations: [
      { id: "g1", name: "Q2 (2016-)", yearStart: 2016, engines: [
        e("1.0-tsi-115", ["manuelle", "S-tronic"], ["FWD"]),
        e("1.5-tsi-150", ["manuelle", "S-tronic"], ["FWD"]),
        e("2.0-tsi-190", ["S-tronic"], ["AWD"]),
        e("2.0-tsi-300", ["S-tronic"], ["AWD"]),
        e("1.6-tdi-115", ["manuelle"], ["FWD"]),
        e("2.0-tdi-150", ["manuelle", "S-tronic"], ["FWD", "AWD"]),
      ]},
    ],
  },
  {
    id: "q3", name: "Q3", brand: "Audi",
    generations: [
      { id: "8u", name: "Q3 8U (2011-2018)", yearStart: 2011, yearEnd: 2018, engines: [
        e("1.4-tsi-150", ["manuelle", "S-tronic"], ["FWD"]),
        e("2.0-tsi-180", ["S-tronic"], ["AWD"]) as never,
        e("2.0-tdi-140", ["manuelle"], ["FWD"]),
        e("2.0-tdi-184", ["S-tronic"], ["AWD"]),
      ].filter((x) => x !== undefined) as never },
      { id: "f3", name: "Q3 F3 (2018-)", yearStart: 2018, engines: [
        e("1.5-tsi-150", ["manuelle", "S-tronic"], ["FWD"]),
        e("2.0-tsi-190", ["S-tronic"], ["AWD"]),
        e("2.0-tsi-245", ["S-tronic"], ["AWD"]),
        e("2.0-tsi-300", ["S-tronic"], ["AWD"]),
        e("2.0-tdi-150", ["manuelle", "S-tronic"], ["FWD", "AWD"]),
        e("2.0-tdi-200", ["S-tronic"], ["AWD"]),
      ]},
    ],
  },
  {
    id: "q5", name: "Q5", brand: "Audi",
    generations: [
      { id: "8r", name: "Q5 8R (2008-2017)", yearStart: 2008, yearEnd: 2017, engines: [
        e("2.0-tsi-200", ["S-tronic", "Tiptronic"], ["AWD"]),
        e("3.0-tfsi-272", ["Tiptronic"], ["AWD"]),
        e("2.0-tdi-170", ["S-tronic"], ["AWD"]),
        e("3.0-tdi-204", ["S-tronic"], ["AWD"]),
        e("3.0-tdi-272", ["Tiptronic"], ["AWD"]),
      ]},
      { id: "fy", name: "Q5 FY (2017-)", yearStart: 2017, engines: [
        e("2.0-tsi-245", ["S-tronic"], ["AWD"]),
        e("3.0-tfsi-354", ["Tiptronic"], ["AWD"]),
        e("3.0-tfsi-450", ["Tiptronic"], ["AWD"]),
        e("2.0-tdi-190", ["S-tronic"], ["AWD"]),
        e("3.0-tdi-286", ["Tiptronic"], ["AWD"]),
        e("3.0-tdi-347", ["Tiptronic"], ["AWD"]),
      ]},
    ],
  },
  {
    id: "q7", name: "Q7", brand: "Audi",
    generations: [
      { id: "4m", name: "Q7 4M (2015-)", yearStart: 2015, engines: [
        e("3.0-tfsi-340", ["Tiptronic"], ["AWD"]),
        e("3.0-tdi-231", ["Tiptronic"], ["AWD"]),
        e("3.0-tdi-272", ["Tiptronic"], ["AWD"]),
        e("3.0-tdi-286", ["Tiptronic"], ["AWD"]),
      ]},
    ],
  },
  {
    id: "q8", name: "Q8", brand: "Audi",
    generations: [
      { id: "g1", name: "Q8 (2018-)", yearStart: 2018, engines: [
        e("3.0-tfsi-340", ["Tiptronic"], ["AWD"]),
        e("3.0-tfsi-450", ["Tiptronic"], ["AWD"]),
        e("4.0-tfsi-600", ["Tiptronic"], ["AWD"]),
        e("3.0-tdi-286", ["Tiptronic"], ["AWD"]),
        e("3.0-tdi-347", ["Tiptronic"], ["AWD"]),
      ]},
    ],
  },
  {
    id: "tt", name: "TT", brand: "Audi",
    generations: [
      { id: "8s", name: "TT 8S (2014-2023)", yearStart: 2014, yearEnd: 2023, engines: [
        e("1.8-tsi-180", ["manuelle", "S-tronic"], ["FWD"]),
        e("2.0-tsi-230", ["manuelle", "S-tronic"], ["FWD", "AWD"]),
        e("2.0-tsi-310", ["S-tronic"], ["AWD"]),
        e("2.5-tfsi-400", ["S-tronic"], ["AWD"]),
        e("2.0-tdi-184", ["manuelle", "S-tronic"], ["FWD"]),
      ]},
    ],
  },
  {
    id: "e-tron-gt", name: "e-tron GT", brand: "Audi",
    generations: [
      { id: "g1", name: "e-tron GT (2021-)", yearStart: 2021, engines: [
        e("ev-id4-286", ["auto"], ["AWD"]),
        e("ev-id4-gtx", ["auto"], ["AWD"]),
      ]},
    ],
  },
  {
    id: "q4-etron", name: "Q4 e-tron", brand: "Audi",
    generations: [
      { id: "g1", name: "Q4 e-tron (2021-)", yearStart: 2021, engines: [
        e("ev-id4-174", ["auto"], ["RWD"]),
        e("ev-id4-204", ["auto"], ["RWD"]),
        e("ev-id4-286", ["auto"], ["RWD"]),
        e("ev-id4-gtx", ["auto"], ["AWD"]),
      ]},
    ],
  },
  {
    id: "a2", name: "A2", brand: "Audi",
    generations: [
      { id: "g1", name: "A2 (1999-2005)", yearStart: 1999, yearEnd: 2005, engines: [
        e("1.4-mpi-75", ["manuelle"], ["FWD"]),
        e("1.6-tdi-90", ["manuelle"], ["FWD"]),
      ]},
    ],
  },
  {
    id: "tt-8j", name: "TT 8J", brand: "Audi",
    generations: [
      { id: "g1", name: "TT 8J (2006-2014)", yearStart: 2006, yearEnd: 2014, engines: [
        e("1.8-tsi-160", ["manuelle", "S-tronic"], ["FWD"]),
        e("2.0-tsi-200", ["manuelle", "S-tronic"], ["FWD", "AWD"]),
        e("2.0-tsi-265", ["S-tronic"], ["AWD"]),
      ]},
    ],
  },
  {
    id: "r8", name: "R8", brand: "Audi",
    generations: [
      { id: "42", name: "R8 42 (2007-2015)", yearStart: 2007, yearEnd: 2015, engines: [
        e("4.2-fsi-r8-420", ["manuelle", "S-tronic"], ["AWD"]),
        e("5.2-fsi-r8-525", ["manuelle", "S-tronic"], ["AWD"]),
      ]},
      { id: "4s", name: "R8 4S (2015-2024)", yearStart: 2015, yearEnd: 2024, engines: [
        e("5.2-fsi-r8-540", ["S-tronic"], ["AWD"]),
        e("5.2-fsi-r8-610", ["S-tronic"], ["AWD"]),
      ]},
    ],
  },
  {
    id: "q8-etron", name: "Q8 e-tron", brand: "Audi",
    generations: [
      { id: "g1", name: "Q8 e-tron (2023-)", yearStart: 2023, engines: [
        e("ev-id4-286", ["auto"], ["AWD"]),
        e("ev-id4-gtx", ["auto"], ["AWD"]),
      ]},
    ],
  },
  {
    id: "rs-etron-gt", name: "RS e-tron GT", brand: "Audi",
    generations: [
      { id: "g1", name: "RS e-tron GT (2021-)", yearStart: 2021, engines: [
        e("ev-id4-gtx", ["auto"], ["AWD"]),
      ]},
    ],
  },
];
