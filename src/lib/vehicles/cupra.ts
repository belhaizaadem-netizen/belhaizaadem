import type { Model } from "./types";
import { buildEngine as e } from "./engines";

export const CUPRA_MODELS: Model[] = [
  {
    id: "leon", name: "Leon", brand: "Cupra",
    generations: [
      { id: "kl", name: "Leon KL (2020-)", yearStart: 2020, engines: [
        e("1.5-tsi-150", ["DSG"], ["FWD"]),
        e("2.0-tsi-245", ["DSG"], ["FWD"]),
        e("2.0-tsi-300", ["DSG"], ["AWD"]),
        e("2.0-tsi-310", ["DSG"], ["AWD"]),
        e("2.0-tsi-333", ["DSG"], ["AWD"]),
        e("1.5-tsi-phev-204", ["DSG"], ["FWD"]),
        e("1.5-tsi-phev-272", ["DSG"], ["FWD"]),
      ]},
    ],
  },
  {
    id: "formentor", name: "Formentor", brand: "Cupra",
    generations: [
      { id: "g1", name: "Formentor (2020-)", yearStart: 2020, engines: [
        e("1.5-tsi-150", ["manuelle", "DSG"], ["FWD"]),
        e("1.5-etsi-150", ["DSG"], ["FWD"]),
        e("2.0-tsi-190", ["DSG"], ["FWD"]),
        e("2.0-tsi-245", ["DSG"], ["FWD"]),
        e("2.0-tsi-300", ["DSG"], ["AWD"]),
        e("2.0-tsi-310", ["DSG"], ["AWD"]),
        e("2.0-tsi-333", ["DSG"], ["AWD"]),
        e("1.5-tsi-phev-204", ["DSG"], ["FWD"]),
        e("1.5-tsi-phev-272", ["DSG"], ["FWD"]),
        e("2.0-tdi-150", ["DSG"], ["FWD"]),
      ]},
    ],
  },
  {
    id: "ateca", name: "Ateca", brand: "Cupra",
    generations: [
      { id: "g1", name: "Ateca (2018-)", yearStart: 2018, engines: [
        e("2.0-tsi-300", ["DSG"], ["AWD"]),
        e("2.0-tsi-310", ["DSG"], ["AWD"]),
      ]},
    ],
  },
  {
    id: "born", name: "Born", brand: "Cupra",
    generations: [
      { id: "g1", name: "Born (2021-)", yearStart: 2021, engines: [
        e("ev-id3-150", ["auto"], ["RWD"]),
        e("ev-id3-204", ["auto"], ["RWD"]),
        e("ev-id3-231", ["auto"], ["RWD"]),
      ]},
    ],
  },
  {
    id: "tavascan", name: "Tavascan", brand: "Cupra",
    generations: [
      { id: "g1", name: "Tavascan (2024-)", yearStart: 2024, engines: [
        e("ev-id4-286", ["auto"], ["RWD"]),
        e("ev-id4-gtx", ["auto"], ["AWD"]),
      ]},
    ],
  },
  {
    id: "terramar", name: "Terramar", brand: "Cupra",
    generations: [
      { id: "g1", name: "Terramar (2024-)", yearStart: 2024, engines: [
        e("1.5-etsi-150", ["DSG"], ["FWD"]),
        e("2.0-tsi-265", ["DSG"], ["AWD"]),
        e("1.5-tsi-phev-204", ["DSG"], ["FWD"]),
        e("1.5-tsi-phev-272", ["DSG"], ["FWD"]),
      ]},
    ],
  },
  {
    id: "raval", name: "Raval", brand: "Cupra",
    generations: [
      { id: "g1", name: "Raval (2025-)", yearStart: 2025, engines: [
        e("ev-id3-150", ["auto"], ["FWD"]),
        e("ev-id3-204", ["auto"], ["FWD"]),
      ]},
    ],
  },
];
