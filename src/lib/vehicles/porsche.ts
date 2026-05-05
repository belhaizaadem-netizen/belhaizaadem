import type { Model } from "./types";
import { buildEngine as e } from "./engines";

export const PORSCHE_MODELS: Model[] = [
  {
    id: "macan", name: "Macan", brand: "Porsche",
    generations: [
      { id: "95b", name: "Macan 95B (2014-2024)", yearStart: 2014, yearEnd: 2024, engines: [
        e("p-2.0-tfsi-252", ["PDK"], ["AWD"]),
        e("p-3.0-t-340", ["PDK"], ["AWD"]),
        e("p-2.9-tt-440", ["PDK"], ["AWD"]),
      ]},
      { id: "ev", name: "Macan Electric (2024-)", yearStart: 2024, engines: [
        e("ev-id4-286", ["auto"], ["AWD"]),
        e("ev-id4-gtx", ["auto"], ["AWD"]),
      ]},
    ],
  },
  {
    id: "cayenne", name: "Cayenne", brand: "Porsche",
    generations: [
      { id: "92a", name: "Cayenne II 92A (2010-2017)", yearStart: 2010, yearEnd: 2017, engines: [
        e("p-3.6-v6-300", ["Tiptronic"], ["AWD"]),
        e("p-3.6-v6-440", ["Tiptronic"], ["AWD"]),
        e("p-4.0-tt-550", ["Tiptronic"], ["AWD"]),
        e("3.0-tdi-272", ["Tiptronic"], ["AWD"]),
      ]},
      { id: "9ya", name: "Cayenne III 9YA (2017-)", yearStart: 2017, engines: [
        e("p-3.0-t-340", ["Tiptronic"], ["AWD"]),
        e("p-2.9-tt-440", ["Tiptronic"], ["AWD"]),
        e("p-4.0-tt-550", ["Tiptronic"], ["AWD"]),
        e("p-4.0-tt-680", ["Tiptronic"], ["AWD"]),
      ]},
    ],
  },
  {
    id: "panamera", name: "Panamera", brand: "Porsche",
    generations: [
      { id: "g1", name: "Panamera 970 (2009-2016)", yearStart: 2009, yearEnd: 2016, engines: [
        e("p-3.6-v6-300", ["PDK"], ["RWD", "AWD"]),
        e("p-4.8-v8-400", ["PDK"], ["RWD", "AWD"]),
        e("p-4.8-v8-500", ["PDK"], ["AWD"]),
      ]},
      { id: "g2", name: "Panamera 971 (2016-)", yearStart: 2016, engines: [
        e("p-3.0-t-340", ["PDK"], ["RWD", "AWD"]),
        e("p-2.9-tt-440", ["PDK"], ["AWD"]),
        e("p-4.0-tt-550", ["PDK"], ["AWD"]),
        e("p-4.0-tt-680", ["PDK"], ["AWD"]),
        e("3.0-tdi-286", ["PDK"], ["AWD"]),
      ]},
    ],
  },
  {
    id: "718", name: "718 Cayman / Boxster", brand: "Porsche",
    generations: [
      { id: "982", name: "718 982 (2016-)", yearStart: 2016, engines: [
        e("p-2.0-f4-300", ["manuelle", "PDK"], ["RWD"]),
        e("p-2.5-f4-350", ["manuelle", "PDK"], ["RWD"]),
        e("p-2.5-f4-365", ["manuelle", "PDK"], ["RWD"]),
        e("p-4.0-f6-400", ["manuelle", "PDK"], ["RWD"]),
        e("p-4.0-f6-420", ["manuelle", "PDK"], ["RWD"]),
      ]},
    ],
  },
  {
    id: "911", name: "911", brand: "Porsche",
    generations: [
      { id: "991", name: "911 991 (2011-2019)", yearStart: 2011, yearEnd: 2019, engines: [
        e("p-3.4-f6-350", ["manuelle", "PDK"], ["RWD", "AWD"]),
        e("p-3.8-f6-400", ["manuelle", "PDK"], ["RWD", "AWD"]),
        e("p-3.0-t-385", ["manuelle", "PDK"], ["RWD", "AWD"]),
        e("p-3.0-t-450", ["manuelle", "PDK"], ["RWD", "AWD"]),
        e("p-3.8-f6-475", ["PDK"], ["RWD"]),
        e("p-4.0-f6-500", ["PDK"], ["RWD"]),
        e("p-4.0-f6-520", ["PDK"], ["RWD"]),
        e("p-3.8-tt-580-991", ["PDK"], ["AWD"]),
      ]},
      { id: "992", name: "911 992 (2019-)", yearStart: 2019, engines: [
        e("p-3.0-t-385", ["manuelle", "PDK"], ["RWD", "AWD"]),
        e("p-3.0-t-450", ["manuelle", "PDK"], ["RWD", "AWD"]),
        e("p-3.8-tt-580", ["PDK"], ["AWD"]),
        e("p-4.0-fa-500", ["manuelle", "PDK"], ["RWD"]),
      ]},
    ],
  },
  {
    id: "taycan", name: "Taycan", brand: "Porsche",
    generations: [
      { id: "g1", name: "Taycan (2019-)", yearStart: 2019, engines: [
        e("ev-id4-286", ["auto"], ["RWD", "AWD"]),
        e("ev-id4-gtx", ["auto"], ["AWD"]),
      ]},
    ],
  },
];
