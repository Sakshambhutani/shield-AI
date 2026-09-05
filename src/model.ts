export const modelDefaults = {
  tactical: 19000,
  male: 25000,
  space: 26968,
  tacticalShare: 20,
  maleShare: 7.5,
  spaceShare: 2,
  overlap: 0,
};
export type ModelInputs = typeof modelDefaults;
export const quantifiedProgrammeIds = ["tactical-uas", "male", "sbs-programme"];
export function calculateScenarios(v: ModelInputs) {
  const total = (a: number, b: number, c: number) =>
    (v.tactical * a) / 100 +
    ((v.male * b) / 100) * (1 - v.overlap / 100) +
    (v.space * c) / 100;
  return {
    conservative: total(5, 2, 0.5),
    base: total(v.tacticalShare, v.maleShare, v.spaceShare),
    upside: total(35, 15, 5),
  };
}
export const formatCr = (v: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(v);
