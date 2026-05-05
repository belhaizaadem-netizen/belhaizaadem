import type { Model } from "./types";
import { buildEngine as e } from "./engines";

export const VOLKSWAGEN_MODELS: Model[] = [
  // ============== GOLF (Mk5 → Mk8) ==============
  {
    id: "golf", name: "Golf", brand: "Volkswagen",
    generations: [
      { id: "mk5", name: "Golf V (2003-2008)", yearStart: 2003, yearEnd: 2008, engines: [
        e("1.4-16v-80", ["manuelle"], ["FWD"]),
        e("1.4-tsi-122", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-200", ["manuelle", "DSG"], ["FWD"]),
        e("1.6-tdi-105", ["manuelle"], ["FWD"]),
        e("2.0-tdi-140", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tdi-170", ["manuelle", "DSG"], ["FWD"]),
      ]},
      { id: "mk6", name: "Golf VI (2008-2012)", yearStart: 2008, yearEnd: 2012, engines: [
        e("1.4-16v-80", ["manuelle"], ["FWD"]),
        e("1.2-tsi-105", ["manuelle", "DSG"], ["FWD"]),
        e("1.4-tsi-122", ["manuelle", "DSG"], ["FWD"]),
        e("1.4-tsi-150", ["DSG"], ["FWD"]),
        e("2.0-tsi-200", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-265", ["manuelle", "DSG"], ["FWD"]),
        e("1.6-tdi-105", ["manuelle"], ["FWD"]),
        e("2.0-tdi-140", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tdi-170", ["manuelle", "DSG"], ["FWD"]),
      ]},
      { id: "mk7", name: "Golf VII (2012-2020)", yearStart: 2012, yearEnd: 2020, engines: [
        e("1.0-tsi-115", ["manuelle", "DSG"], ["FWD"]),
        e("1.2-tsi-105", ["manuelle", "DSG"], ["FWD"]),
        e("1.4-tsi-125", ["manuelle", "DSG"], ["FWD"]),
        e("1.4-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-tsi-130", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("1.8-tsi-180", ["manuelle", "DSG"], ["FWD", "AWD"]),
        e("2.0-tsi-220", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-230", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-245", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-300", ["DSG"], ["AWD"]),
        e("2.0-tsi-310", ["DSG"], ["AWD"]),
        e("1.4-tsi-phev-204", ["DSG"], ["FWD"]),
        e("1.4-tsi-phev-245", ["DSG"], ["FWD"]),
        e("1.6-tdi-110", ["manuelle", "DSG"], ["FWD"]),
        e("1.6-tdi-115", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tdi-150", ["manuelle", "DSG"], ["FWD", "AWD"]),
        e("2.0-tdi-184", ["manuelle", "DSG"], ["FWD", "AWD"]),
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
        e("2.0-tsi-300", ["DSG"], ["AWD"]),
        e("2.0-tsi-320", ["DSG"], ["AWD"]),
        e("2.0-tsi-333", ["DSG"], ["AWD"]),
        e("1.5-tsi-phev-204", ["DSG"], ["FWD"]),
        e("1.5-tsi-phev-272", ["DSG"], ["FWD"]),
        e("2.0-tdi-115", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tdi-150", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tdi-200", ["DSG"], ["FWD"]),
      ]},
    ],
  },

  // ============== POLO (2010 → 2026) ==============
  {
    id: "polo", name: "Polo", brand: "Volkswagen",
    generations: [
      { id: "mk5", name: "Polo V — 6R/6C (2009-2017)", yearStart: 2009, yearEnd: 2017, engines: [
        e("1.0-mpi-65", ["manuelle"], ["FWD"]),
        e("1.0-mpi-75", ["manuelle"], ["FWD"]),
        e("1.4-16v-86", ["manuelle"], ["FWD"]),
        e("1.2-tsi-86", ["manuelle", "DSG"], ["FWD"]),
        e("1.2-tsi-105", ["manuelle", "DSG"], ["FWD"]),
        e("1.4-tsi-150", ["DSG"], ["FWD"]),
        e("1.8-tsi-180", ["manuelle", "DSG"], ["FWD"]),
        e("1.6-tdi-90", ["manuelle"], ["FWD"]),
        e("1.6-tdi-105", ["manuelle"], ["FWD"]),
      ]},
      { id: "mk6", name: "Polo VI — AW (2017-)", yearStart: 2017, engines: [
        e("1.0-mpi-65", ["manuelle"], ["FWD"]),
        e("1.0-mpi-75", ["manuelle"], ["FWD"]),
        e("1.0-tsi-95", ["manuelle", "DSG"], ["FWD"]),
        e("1.0-tsi-110", ["manuelle", "DSG"], ["FWD"]),
        e("1.0-tsi-115", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-tsi-150", ["DSG"], ["FWD"]),
        e("2.0-tsi-200", ["DSG"], ["FWD"]),
        e("1.6-tdi-95", ["manuelle"], ["FWD"]),
      ]},
    ],
  },

  // ============== TIGUAN ==============
  {
    id: "tiguan", name: "Tiguan", brand: "Volkswagen",
    generations: [
      { id: "mk1", name: "Tiguan I (2007-2016)", yearStart: 2007, yearEnd: 2016, engines: [
        e("1.4-tsi-122", ["manuelle", "DSG"], ["FWD"]),
        e("1.4-tsi-150", ["manuelle", "DSG"], ["FWD", "AWD"]),
        e("2.0-tsi-180", ["manuelle", "DSG"], ["AWD"]),
        e("2.0-tsi-200", ["DSG"], ["AWD"]),
        e("2.0-tdi-110", ["manuelle"], ["FWD"]),
        e("2.0-tdi-140", ["manuelle", "DSG"], ["AWD"]),
        e("2.0-tdi-170", ["DSG"], ["AWD"]),
        e("2.0-tdi-184", ["DSG"], ["AWD"]),
      ]},
      { id: "mk2", name: "Tiguan II (2016-2023)", yearStart: 2016, yearEnd: 2023, engines: [
        e("1.4-tsi-125", ["manuelle", "DSG"], ["FWD"]),
        e("1.4-tsi-150", ["manuelle", "DSG"], ["FWD", "AWD"]),
        e("1.5-tsi-130", ["manuelle"], ["FWD"]),
        e("1.5-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-180", ["DSG"], ["AWD"]),
        e("2.0-tsi-190", ["DSG"], ["AWD"]),
        e("2.0-tsi-220", ["DSG"], ["AWD"]),
        e("2.0-tsi-245", ["DSG"], ["AWD"]),
        e("2.0-tsi-320", ["DSG"], ["AWD"]),
        e("2.0-tdi-115", ["manuelle"], ["FWD"]),
        e("2.0-tdi-150", ["manuelle", "DSG"], ["FWD", "AWD"]),
        e("2.0-tdi-200", ["DSG"], ["AWD"]),
      ]},
      { id: "mk3", name: "Tiguan III (2024-)", yearStart: 2024, engines: [
        e("1.5-etsi-130", ["DSG"], ["FWD"]),
        e("1.5-etsi-150", ["DSG"], ["FWD"]),
        e("1.5-tsi-phev-204", ["DSG"], ["FWD"]),
        e("1.5-tsi-phev-272", ["DSG"], ["FWD"]),
        e("2.0-tsi-200", ["DSG"], ["AWD"]),
        e("2.0-tsi-265", ["DSG"], ["AWD"]),
        e("2.0-tdi-150", ["DSG"], ["FWD", "AWD"]),
        e("2.0-tdi-200", ["DSG"], ["AWD"]),
      ]},
    ],
  },

  // ============== CADDY (2007 → 2026) ==============
  {
    id: "caddy", name: "Caddy", brand: "Volkswagen",
    generations: [
      { id: "mk3", name: "Caddy III — 2K (2003-2015)", yearStart: 2003, yearEnd: 2015, engines: [
        e("1.2-tsi-86", ["manuelle"], ["FWD"]),
        e("1.2-tsi-105", ["manuelle", "DSG"], ["FWD"]),
        e("1.4-tsi-125", ["manuelle", "DSG"], ["FWD"]),
        e("1.6-tdi-75", ["manuelle"], ["FWD"]),
        e("1.6-tdi-90", ["manuelle"], ["FWD"]),
        e("1.6-tdi-105", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tdi-110", ["manuelle"], ["FWD"]),
        e("2.0-tdi-140", ["manuelle", "DSG"], ["FWD", "AWD"]),
        e("2.0-tdi-170", ["DSG"], ["AWD"]),
      ]},
      { id: "mk4", name: "Caddy IV — 2K facelift (2015-2020)", yearStart: 2015, yearEnd: 2020, engines: [
        e("1.0-tsi-95", ["manuelle"], ["FWD"]),
        e("1.4-tsi-125", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tdi-75", ["manuelle"], ["FWD"]),
        e("2.0-tdi-102", ["manuelle"], ["FWD"]),
        e("2.0-tdi-110", ["manuelle"], ["FWD"]),
        e("2.0-tdi-150", ["manuelle", "DSG"], ["FWD", "AWD"]),
      ]},
      { id: "mk5", name: "Caddy V — SB (2020-)", yearStart: 2020, engines: [
        e("1.5-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tdi-75", ["manuelle"], ["FWD"]),
        e("2.0-tdi-102", ["manuelle"], ["FWD"]),
        e("2.0-tdi-122", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tdi-150", ["manuelle", "DSG"], ["FWD", "AWD"]),
      ]},
    ],
  },

  // ============== T-ROC ==============
  {
    id: "t-roc", name: "T-Roc", brand: "Volkswagen",
    generations: [
      { id: "g1", name: "T-Roc (2017-2023)", yearStart: 2017, yearEnd: 2023, engines: [
        e("1.0-tsi-110", ["manuelle"], ["FWD"]),
        e("1.5-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-190", ["DSG"], ["AWD"]),
        e("2.0-tsi-300", ["DSG"], ["AWD"]),
        e("1.6-tdi-115", ["manuelle"], ["FWD"]),
        e("2.0-tdi-150", ["manuelle", "DSG"], ["FWD", "AWD"]),
      ]},
      { id: "g1fl", name: "T-Roc facelift (2022-)", yearStart: 2022, engines: [
        e("1.0-tsi-110", ["manuelle"], ["FWD"]),
        e("1.5-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-190", ["DSG"], ["AWD"]),
        e("2.0-tsi-300", ["DSG"], ["AWD"]),
        e("2.0-tdi-115", ["manuelle"], ["FWD"]),
        e("2.0-tdi-150", ["DSG"], ["FWD", "AWD"]),
      ]},
    ],
  },

  // ============== T-CROSS ==============
  {
    id: "t-cross", name: "T-Cross", brand: "Volkswagen",
    generations: [
      { id: "g1", name: "T-Cross (2018-)", yearStart: 2018, engines: [
        e("1.0-tsi-95", ["manuelle"], ["FWD"]),
        e("1.0-tsi-110", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-tsi-150", ["DSG"], ["FWD"]),
        e("1.6-tdi-95", ["manuelle"], ["FWD"]),
      ]},
    ],
  },

  // ============== PASSAT (2008 → 2026) ==============
  {
    id: "passat", name: "Passat", brand: "Volkswagen",
    generations: [
      { id: "b6", name: "Passat B6 (2005-2010)", yearStart: 2005, yearEnd: 2010, engines: [
        e("1.4-tsi-122", ["manuelle", "DSG"], ["FWD"]),
        e("1.8-tsi-160", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-200", ["manuelle", "DSG"], ["FWD"]),
        e("1.6-tdi-105", ["manuelle"], ["FWD"]),
        e("2.0-tdi-140", ["manuelle", "DSG"], ["FWD", "AWD"]),
        e("2.0-tdi-170", ["manuelle", "DSG"], ["FWD", "AWD"]),
      ]},
      { id: "b7", name: "Passat B7 (2010-2014)", yearStart: 2010, yearEnd: 2014, engines: [
        e("1.4-tsi-122", ["manuelle", "DSG"], ["FWD"]),
        e("1.8-tsi-160", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-200", ["DSG"], ["FWD"]),
        e("1.6-tdi-105", ["manuelle"], ["FWD"]),
        e("2.0-tdi-140", ["manuelle", "DSG"], ["FWD", "AWD"]),
        e("2.0-tdi-170", ["manuelle", "DSG"], ["FWD", "AWD"]),
      ]},
      { id: "b8", name: "Passat B8 (2014-2023)", yearStart: 2014, yearEnd: 2023, engines: [
        e("1.4-tsi-125", ["manuelle", "DSG"], ["FWD"]),
        e("1.4-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("1.8-tsi-180", ["DSG"], ["FWD"]),
        e("2.0-tsi-220", ["DSG"], ["FWD"]),
        e("2.0-tsi-280", ["DSG"], ["AWD"]),
        e("1.4-tsi-phev-218", ["DSG"], ["FWD"]),
        e("2.0-tdi-150", ["manuelle", "DSG"], ["FWD", "AWD"]),
        e("2.0-tdi-190", ["DSG"], ["FWD", "AWD"]),
        e("2.0-tdi-240", ["DSG"], ["AWD"]),
      ]},
      { id: "b9", name: "Passat B9 (2023-)", yearStart: 2023, engines: [
        e("1.5-etsi-150", ["DSG"], ["FWD"]),
        e("1.5-tsi-phev-204", ["DSG"], ["FWD"]),
        e("1.5-tsi-phev-272", ["DSG"], ["FWD"]),
        e("2.0-tdi-150", ["DSG"], ["FWD", "AWD"]),
        e("2.0-tdi-200", ["DSG"], ["AWD"]),
      ]},
    ],
  },

  // ============== JETTA (très répandue en Tunisie) ==============
  {
    id: "jetta", name: "Jetta", brand: "Volkswagen",
    generations: [
      { id: "mk5", name: "Jetta V — 1K (2005-2010)", yearStart: 2005, yearEnd: 2010, engines: [
        e("1.4-tsi-122", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-200", ["manuelle", "DSG"], ["FWD"]),
        e("1.6-tdi-105", ["manuelle"], ["FWD"]),
        e("2.0-tdi-140", ["manuelle", "DSG"], ["FWD"]),
      ]},
      { id: "mk6", name: "Jetta VI — A6 (2010-2018)", yearStart: 2010, yearEnd: 2018, engines: [
        e("1.2-tsi-105", ["manuelle", "DSG"], ["FWD"]),
        e("1.4-tsi-122", ["manuelle", "DSG"], ["FWD"]),
        e("1.4-tsi-150", ["DSG"], ["FWD"]),
        e("2.0-tsi-200", ["manuelle", "DSG"], ["FWD"]),
        e("1.6-tdi-105", ["manuelle"], ["FWD"]),
        e("2.0-tdi-140", ["manuelle", "DSG"], ["FWD"]),
      ]},
      { id: "mk7", name: "Jetta VII — A7 (2018-)", yearStart: 2018, engines: [
        e("1.4-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-200", ["DSG"], ["FWD"]),
      ]},
    ],
  },

  // ============== TOURAN ==============
  {
    id: "touran", name: "Touran", brand: "Volkswagen",
    generations: [
      { id: "mk1", name: "Touran I — 1T (2003-2015)", yearStart: 2003, yearEnd: 2015, engines: [
        e("1.4-tsi-122", ["manuelle", "DSG"], ["FWD"]),
        e("1.4-tsi-150", ["DSG"], ["FWD"]),
        e("1.6-tdi-105", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tdi-140", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tdi-170", ["DSG"], ["FWD"]),
      ]},
      { id: "mk2", name: "Touran II — 5T (2015-)", yearStart: 2015, engines: [
        e("1.2-tsi-105", ["manuelle", "DSG"], ["FWD"]),
        e("1.4-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tdi-115", ["manuelle"], ["FWD"]),
        e("2.0-tdi-150", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tdi-190", ["DSG"], ["FWD"]),
      ]},
    ],
  },

  // ============== SHARAN ==============
  {
    id: "sharan", name: "Sharan", brand: "Volkswagen",
    generations: [
      { id: "mk2", name: "Sharan II — 7N (2010-2022)", yearStart: 2010, yearEnd: 2022, engines: [
        e("1.4-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tsi-200", ["DSG"], ["FWD"]),
        e("2.0-tdi-140", ["manuelle", "DSG"], ["FWD", "AWD"]),
        e("2.0-tdi-150", ["manuelle", "DSG"], ["FWD", "AWD"]),
        e("2.0-tdi-184", ["DSG"], ["FWD", "AWD"]),
      ]},
    ],
  },

  // ============== AMAROK (pick-up) ==============
  {
    id: "amarok", name: "Amarok", brand: "Volkswagen",
    generations: [
      { id: "mk1", name: "Amarok I — 2H (2010-2020)", yearStart: 2010, yearEnd: 2020, engines: [
        e("2.0-tdi-140", ["manuelle"], ["AWD"]),
        e("2.0-tdi-170", ["manuelle", "Tiptronic"], ["AWD"]),
        e("3.0-tdi-204", ["Tiptronic"], ["AWD"]),
        e("3.0-tdi-231", ["Tiptronic"], ["AWD"]),
      ]},
      { id: "mk2", name: "Amarok II (2022-)", yearStart: 2022, engines: [
        e("2.0-tdi-150", ["manuelle", "Tiptronic"], ["AWD"]),
        e("2.0-tdi-200", ["Tiptronic"], ["AWD"]),
        e("3.0-tdi-231", ["Tiptronic"], ["AWD"]),
      ]},
    ],
  },

  // ============== TOUAREG  ==============
  {
    id: "touareg", name: "Touareg", brand: "Volkswagen",
    generations: [
      { id: "g1", name: "Touareg I — 7L (2002-2010)", yearStart: 2002, yearEnd: 2010, engines: [
        e("3.0-tdi-204", ["Tiptronic"], ["AWD"]),
        e("3.0-tfsi-272", ["Tiptronic"], ["AWD"]),
        e("4.0-tfsi-450", ["Tiptronic"], ["AWD"]),
      ]},
      { id: "g2", name: "Touareg II — 7P (2010-2018)", yearStart: 2010, yearEnd: 2018, engines: [
        e("3.0-tdi-204", ["Tiptronic"], ["AWD"]),
        e("3.0-tdi-231", ["Tiptronic"], ["AWD"]),
        e("3.0-tdi-272", ["Tiptronic"], ["AWD"]),
        e("3.0-tfsi-333", ["Tiptronic"], ["AWD"]),
      ]},
      { id: "g3", name: "Touareg III — CR (2018-)", yearStart: 2018, engines: [
        e("3.0-tdi-231", ["Tiptronic"], ["AWD"]),
        e("3.0-tdi-286", ["Tiptronic"], ["AWD"]),
        e("3.0-tfsi-340", ["Tiptronic"], ["AWD"]),
        e("3.0-tfsi-450", ["Tiptronic"], ["AWD"]),
      ]},
    ],
  },
  // ============== UP! ==============
  {
    id: "up", name: "Up!", brand: "Volkswagen",
    generations: [
      { id: "g1", name: "Up! (2011-2022)", yearStart: 2011, yearEnd: 2022, engines: [
        e("1.0-mpi-60", ["manuelle"], ["FWD"]),
        e("1.0-mpi-75", ["manuelle"], ["FWD"]),
        e("1.0-tsi-90", ["manuelle"], ["FWD"]),
      ]},
    ],
  },
  // ============== LUPO ==============
  {
    id: "lupo", name: "Lupo", brand: "Volkswagen",
    generations: [
      { id: "g1", name: "Lupo (1998-2005)", yearStart: 1998, yearEnd: 2005, engines: [
        e("1.0-mpi-60", ["manuelle"], ["FWD"]),
        e("1.4-mpi-75", ["manuelle"], ["FWD"]),
      ]},
    ],
  },
  // ============== BORA ==============
  {
    id: "bora", name: "Bora", brand: "Volkswagen",
    generations: [
      { id: "g1", name: "Bora (1999-2005)", yearStart: 1999, yearEnd: 2005, engines: [
        e("1.4-mpi-75", ["manuelle"], ["FWD"]),
        e("1.6-tdi-105", ["manuelle"], ["FWD"]),
      ]},
    ],
  },
  // ============== ARTEON ==============
  {
    id: "arteon", name: "Arteon", brand: "Volkswagen",
    generations: [
      { id: "g1", name: "Arteon (2017-)", yearStart: 2017, engines: [
        e("1.4-tsi-150", ["DSG"], ["FWD"]),
        e("1.5-tsi-150", ["DSG"], ["FWD"]),
        e("2.0-tsi-190", ["DSG"], ["FWD"]),
        e("2.0-tsi-200", ["DSG"], ["FWD"]),
        e("2.0-tsi-280", ["DSG"], ["AWD"]),
        e("2.0-tsi-320", ["DSG"], ["AWD"]),
        e("2.0-tdi-150", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tdi-190", ["DSG"], ["AWD"]),
        e("2.0-tdi-200", ["DSG"], ["AWD"]),
        e("1.4-tsi-phev-218", ["DSG"], ["FWD"]),
      ]},
    ],
  },
  // ============== TAIGO ==============
  {
    id: "taigo", name: "Taigo", brand: "Volkswagen",
    generations: [
      { id: "g1", name: "Taigo (2021-)", yearStart: 2021, engines: [
        e("1.0-tsi-95", ["manuelle"], ["FWD"]),
        e("1.0-tsi-110", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-tsi-150", ["DSG"], ["FWD"]),
      ]},
    ],
  },
  // ============== TRANSPORTER ==============
  {
    id: "transporter", name: "Transporter", brand: "Volkswagen",
    generations: [
      { id: "t6", name: "Transporter T6 (2015-2024)", yearStart: 2015, yearEnd: 2024, engines: [
        e("2.0-tdi-102", ["manuelle"], ["FWD"]),
        e("2.0-tdi-110", ["manuelle"], ["FWD"]),
        e("2.0-tdi-150", ["manuelle", "DSG"], ["FWD", "AWD"]),
        e("2.0-tdi-200", ["DSG"], ["FWD", "AWD"]),
      ]},
      { id: "t7", name: "Transporter T7 (2024-)", yearStart: 2024, engines: [
        e("2.0-tdi-110", ["manuelle"], ["FWD"]),
        e("2.0-tdi-150", ["manuelle", "DSG"], ["FWD"]),
        e("2.0-tdi-170", ["DSG"], ["FWD", "AWD"]),
      ]},
    ],
  },
  // ============== ID.3 / ID.4 / ID.5 / ID.7 / ID.Buzz ==============
  {
    id: "id3", name: "ID.3", brand: "Volkswagen",
    generations: [
      { id: "g1", name: "ID.3 (2020-)", yearStart: 2020, engines: [
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
        e("ev-id7-286", ["auto"], ["RWD"]),
        e("ev-id7-340", ["auto"], ["AWD"]),
      ]},
    ],
  },
  {
    id: "id-buzz", name: "ID. Buzz", brand: "Volkswagen",
    generations: [
      { id: "g1", name: "ID. Buzz (2022-)", yearStart: 2022, engines: [
        e("ev-id-buzz-204", ["auto"], ["RWD"]),
        e("ev-id-buzz-286", ["auto"], ["AWD"]),
      ]},
    ],
  },
];
