import type { LayerId } from "./types";
export type ScenarioName = "Conservative" | "Base" | "Upside";
export type ViewHorizon = "18" | "36" | "60";
export interface Assumptions {
  asp: number;
  armyQty: number;
  navyQty: number;
  icgQty: number;
  armyWin: number;
  navyWin: number;
  icgWin: number;
  tacticalValue: number;
  nonVbat: number;
  tacticalAttach: number;
  tacticalWin: number;
  maleValue: number;
  maleAttach: number;
  maleWin: number;
  visionAttach: number;
  visionWin: number;
  spaceValue: number;
  spaceAttach: number;
  spaceWin: number;
  maleOverlap: number;
}
const common = {
  tacticalValue: 20000,
  maleValue: 20000,
  spaceValue: 26968,
  maleOverlap: 0,
};
export const presets: Record<ScenarioName, Assumptions> = {
  Conservative: {
    ...common,
    asp: 20,
    armyQty: 16,
    navyQty: 6,
    icgQty: 4,
    armyWin: 45,
    navyWin: 20,
    icgWin: 20,
    nonVbat: 90,
    tacticalAttach: 2,
    tacticalWin: 10,
    maleAttach: 3,
    maleWin: 5,
    visionAttach: 2,
    visionWin: 5,
    spaceAttach: 0.5,
    spaceWin: 5,
  },
  Base: {
    ...common,
    asp: 30,
    armyQty: 24,
    navyQty: 12,
    icgQty: 8,
    armyWin: 60,
    navyWin: 35,
    icgWin: 30,
    nonVbat: 80,
    tacticalAttach: 4,
    tacticalWin: 20,
    maleAttach: 5,
    maleWin: 10,
    visionAttach: 3,
    visionWin: 10,
    spaceAttach: 1.5,
    spaceWin: 10,
  },
  Upside: {
    ...common,
    asp: 40,
    armyQty: 40,
    navyQty: 20,
    icgQty: 12,
    armyWin: 75,
    navyWin: 40,
    icgWin: 40,
    nonVbat: 70,
    tacticalAttach: 6,
    tacticalWin: 30,
    maleAttach: 8,
    maleWin: 20,
    visionAttach: 5,
    visionWin: 15,
    spaceAttach: 3,
    spaceWin: 15,
  },
};
export interface ModelLayer {
  id: LayerId;
  label: string;
  gross: number;
  win: number;
  weighted: number;
  horizon: 18 | 36 | 60;
  formula: string;
  sourceIds: string[];
}
export const money = (v: number, decimals = 0) =>
  `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: decimals }).format(v)} Cr`;
export function calculate(a: Assumptions): ModelLayer[] {
  const layer = (
    id: LayerId,
    label: string,
    gross: number,
    win: number,
    horizon: 18 | 36 | 60,
    formula: string,
    sourceIds: string[],
  ): ModelLayer => ({
    id,
    label,
    gross,
    win,
    weighted: (gross * win) / 100,
    horizon,
    formula,
    sourceIds,
  });
  return [
    layer(
      "army-vbat",
      "Army · additional V-BAT",
      a.asp * a.armyQty,
      a.armyWin,
      18,
      `${a.armyQty} packages × ${money(a.asp)}`,
      ["india-contract"],
    ),
    layer(
      "navy-vbat",
      "Navy · V-BAT / NSUAS wedge",
      a.asp * a.navyQty,
      a.navyWin,
      36,
      `${a.navyQty} packages × ${money(a.asp)}`,
      ["dac-july", "netherlands"],
    ),
    layer(
      "icg-vbat",
      "Coast Guard · V-BAT ISR",
      a.asp * a.icgQty,
      a.icgWin,
      36,
      `${a.icgQty} packages × ${money(a.asp)}`,
      ["vbat", "netherlands"],
    ),
    layer(
      "tactical",
      "Tactical UAS · Hivemind pool",
      (a.tacticalValue * a.nonVbat * a.tacticalAttach) / 10000,
      a.tacticalWin,
      36,
      `${money(a.tacticalValue)} × ${a.nonVbat}% non-VBAT × ${a.tacticalAttach}% attach`,
      ["tactical", "tactical-republication"],
    ),
    layer(
      "male-hivemind",
      "87-MALE · mission autonomy",
      ((a.maleValue * a.maleAttach) / 100) * (1 - a.maleOverlap / 100),
      a.maleWin,
      36,
      `${money(a.maleValue)} × ${a.maleAttach}% × (1 − ${a.maleOverlap}% overlap)`,
      ["male-it", "lt"],
    ),
    layer(
      "male-vision",
      "87-MALE · perception",
      ((a.maleValue * a.visionAttach) / 100) * (1 - a.maleOverlap / 100),
      a.visionWin,
      36,
      `${money(a.maleValue)} × ${a.visionAttach}% × (1 − ${a.maleOverlap}% overlap)`,
      ["male-it", "vision"],
    ),
    layer(
      "space",
      "SBS-III · constellation autonomy",
      (a.spaceValue * a.spaceAttach) / 100,
      a.spaceWin,
      60,
      `${money(a.spaceValue)} × ${a.spaceAttach}% attach`,
      ["sbs", "novi"],
    ),
  ];
}
export function totals(
  a: Assumptions,
  horizon: ViewHorizon = "60",
  ids?: Set<LayerId>,
) {
  const layers = calculate(a).filter(
    (l) => l.horizon <= Number(horizon) && (!ids || ids.has(l.id)),
  );
  return {
    layers,
    gross: layers.reduce((s, l) => s + l.gross, 0),
    weighted: layers.reduce((s, l) => s + l.weighted, 0),
  };
}
export const fields: {
  key: keyof Assumptions;
  label: string;
  group: string;
  max: number;
  unit: string;
}[] = [
  ...(
    [
      "asp",
      "armyQty",
      "navyQty",
      "icgQty",
      "armyWin",
      "navyWin",
      "icgWin",
    ] as const
  ).map((key, i) => ({
    key,
    label: [
      "System-package ASP",
      "Army additional packages",
      "Navy packages",
      "ICG packages",
      "Army win probability",
      "Navy win probability",
      "ICG win probability",
    ][i],
    group: "V-BAT · end-customer programme",
    max: i < 4 ? 1000 : 100,
    unit: i === 0 ? "₹ Cr" : i < 4 ? "packages" : "%",
  })),
  ...(
    ["tacticalValue", "nonVbat", "tacticalAttach", "tacticalWin"] as const
  ).map((key, i) => ({
    key,
    label: [
      "Reported pool convention",
      "Non-VBAT share",
      "Mission-autonomy attach",
      "Win probability",
    ][i],
    group: "Tactical UAS · shared attach pool",
    max: i === 0 ? 1000000 : 100,
    unit: i === 0 ? "₹ Cr" : "%",
  })),
  ...(
    [
      "maleValue",
      "maleAttach",
      "maleWin",
      "visionAttach",
      "visionWin",
      "maleOverlap",
    ] as const
  ).map((key, i) => ({
    key,
    label: [
      "Reported programme value",
      "Hivemind attach",
      "Hivemind win probability",
      "Vision attach",
      "Vision win probability",
      "Potential tactical overlap deduction",
    ][i],
    group: "87-MALE · two distinct layers",
    max: i === 0 ? 1000000 : 100,
    unit: i === 0 ? "₹ Cr" : "%",
  })),
  ...(["spaceValue", "spaceAttach", "spaceWin"] as const).map((key, i) => ({
    key,
    label: ["Reported programme value", "Autonomy attach", "Win probability"][
      i
    ],
    group: "SBS-III · strategic only",
    max: i === 0 ? 1000000 : 100,
    unit: i === 0 ? "₹ Cr" : "%",
  })),
];
