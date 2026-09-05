export type Product =
  | "V-BAT"
  | "Hivemind Enterprise"
  | "Hivemind Solutions"
  | "Vision / ViDAR"
  | "Tracker C-UAS"
  | "Aechelon"
  | "Benchmark"
  | "X-BAT";
export type Domain =
  | "air"
  | "maritime"
  | "space"
  | "weapons"
  | "training"
  | "cross-domain";
export type Horizon = "0-18m" | "18-36m" | "3-5y" | "strategic";
export type Evidence = "official" | "company-confirmed" | "reported" | "model";
export type Route =
  | "B2G direct"
  | "B2B OEM attach"
  | "consortium"
  | "pilot-to-program"
  | "existing JSW route";
export type SourceGroup =
  | "Government of India official"
  | "Shield AI official"
  | "Indian OEM official"
  | "reputable reported / media"
  | "model assumption";
export interface ClaimRef {
  id: string;
  claim: string;
}
export interface Scores {
  missionFit: number;
  timing: number;
  indigenisationFit: number;
  access: number;
  competitiveOpenness: number;
  authorityClarity: number;
}
export interface PowerRole {
  title: string;
  controls: string;
  ask: string;
  stage: string;
  power: [number, number, number, number];
}
export interface Account {
  id: string;
  name: string;
  kind: "B2G" | "B2B";
  tier: 0 | 1 | 2 | 3;
  location: string;
  platforms: string;
  products: Product[];
  roles: string[];
  constraint: string;
  nextMove: string;
  power: [number, number, number, number];
  sources: ClaimRef[];
  chain?: PowerRole[];
}
export type LayerId =
  | "army-vbat"
  | "navy-vbat"
  | "icg-vbat"
  | "tactical"
  | "male-hivemind"
  | "male-vision"
  | "space";
export interface OpportunityCell extends Scores {
  id: string;
  shieldProduct: Product;
  additionalProducts: Product[];
  domain: Domain;
  mission: string;
  platformOrProgram: string;
  b2gBuyer: string;
  buyers: string[];
  operationalSponsor: string;
  technicalAuthority: string;
  acquisitionAuthority: string;
  b2bPrime?: string;
  primePlatform?: string;
  accountId: string;
  governmentId: string;
  primaryLocation: string;
  route: Route;
  horizon: Horizon;
  status:
    | "Existing"
    | "Approved / AoN"
    | "Reported programme"
    | "R&D / platform"
    | "Strategic hypothesis";
  publicProgramValueCr?: number;
  publicQuantity?: number;
  valuationMethod: "unit-model" | "attach-rate" | "unpriced";
  analystAssumptions?: Record<string, number | string>;
  grossAddressableCr?: number;
  probabilityToWin?: number;
  captureWeightedCr?: number;
  priorityScore: number;
  evidenceLevel: Evidence;
  caveats: string[];
  sources: ClaimRef[];
  precedentIds: string[];
  nextMove: string;
  layerId?: LayerId;
  coveredByPool?: LayerId;
}
export const scoreWeights: Record<keyof Scores, number> = {
  missionFit: 0.25,
  timing: 0.2,
  indigenisationFit: 0.2,
  access: 0.15,
  competitiveOpenness: 0.1,
  authorityClarity: 0.1,
};
export const priority = (s: Scores) =>
  Math.round(
    Object.entries(scoreWeights).reduce(
      (a, [k, w]) => a + s[k as keyof Scores] * w,
      0,
    ) * 20,
  );
