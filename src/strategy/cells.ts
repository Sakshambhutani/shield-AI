import { accountById } from "./accounts";
import { priority } from "./types";
import type {
  OpportunityCell,
  Product,
  Domain,
  Horizon,
  Evidence,
  Scores,
  LayerId,
} from "./types";
type Seed = {
  id: string;
  product: Product;
  also?: Product[];
  domain: Domain;
  name: string;
  account: string;
  gov: string;
  buyers?: string[];
  horizon: Horizon;
  status: OpportunityCell["status"];
  evidence: Evidence;
  source: string;
  claim: string;
  mission: string;
  precedents: string[];
  scores: [number, number, number, number, number, number];
  layer?: LayerId;
  pool?: LayerId;
  value?: number;
  quantity?: number;
  caveat?: string;
};
const seeds: Seed[] = [
  {
    id: "01",
    product: "V-BAT",
    domain: "air",
    name: "Army V-BAT expansion",
    account: "jsw",
    gov: "army",
    horizon: "0-18m",
    status: "Existing",
    evidence: "company-confirmed",
    source: "india-contract",
    claim:
      "Army selected V-BAT and Hivemind SDK; expansion quantities are modelled.",
    mission: "Formation-level tactical ISR",
    precedents: ["netherlands"],
    scores: [5, 5, 5, 5, 4, 4],
    layer: "army-vbat",
  },
  {
    id: "02",
    product: "V-BAT",
    also: ["Vision / ViDAR"],
    domain: "maritime",
    name: "Naval Shipborne UAS",
    account: "jsw",
    gov: "navy",
    horizon: "18-36m",
    status: "Approved / AoN",
    evidence: "official",
    source: "dac-july",
    claim: "NSUAS received AoN in July 2026; no individual value separated.",
    mission: "Shipborne ISR / maritime domain awareness",
    precedents: ["netherlands"],
    scores: [5, 4, 5, 4, 4, 4],
    layer: "navy-vbat",
    caveat:
      "Demonstrations fit 0–18 months; the full package model is assigned to a three-year planning window. NSUAS scale is not added a second time.",
  },
  {
    id: "03",
    product: "V-BAT",
    also: ["Vision / ViDAR"],
    domain: "maritime",
    name: "Coast Guard OPV maritime ISR",
    account: "jsw",
    gov: "icg",
    horizon: "18-36m",
    status: "Strategic hypothesis",
    evidence: "model",
    source: "vbat",
    claim:
      "Ship-capable VTOL product supports an analyst-proposed patrol-vessel ISR concept.",
    mission: "Maritime-security ISR on patrol vessels",
    precedents: ["netherlands"],
    scores: [4, 3, 4, 3, 3, 2],
    layer: "icg-vbat",
  },
  {
    id: "04",
    product: "Hivemind Enterprise",
    domain: "cross-domain",
    name: "Army sovereign autonomy lab",
    account: "army",
    gov: "army",
    horizon: "0-18m",
    status: "Existing",
    evidence: "company-confirmed",
    source: "india-contract",
    claim:
      "SDK licenses for Army and select Indian partners support sovereign development; a dedicated lab is a proposal.",
    mission: "Sovereign mission-autonomy development",
    precedents: ["singapore"],
    scores: [5, 5, 5, 5, 4, 4],
    pool: "tactical",
  },
  {
    id: "05",
    product: "Hivemind Enterprise",
    also: ["Hivemind Solutions", "Aechelon"],
    domain: "air",
    name: "HAL CATS Warrior",
    account: "hal",
    gov: "iaf",
    horizon: "18-36m",
    status: "R&D / platform",
    evidence: "company-confirmed",
    source: "hal",
    claim: "HAL brochure lists CATS Warrior autonomous unmanned wingman.",
    mission: "Collaborative autonomous airpower",
    precedents: ["mhi", "cca-proof"],
    scores: [5, 4, 5, 3, 4, 3],
  },
  {
    id: "06",
    product: "Hivemind Enterprise",
    also: ["Aechelon"],
    domain: "air",
    name: "HAL CATS Infinity / HAPS",
    account: "hal",
    gov: "iaf",
    horizon: "18-36m",
    status: "R&D / platform",
    evidence: "company-confirmed",
    source: "hal",
    claim:
      "CATS Infinity solar HAPS appears in HAL portfolio. The IAF HAPS AoN does not establish HAL selection.",
    mission: "Persistent military ISR and autonomy verification",
    precedents: ["mhi", "singapore"],
    scores: [5, 4, 5, 3, 4, 3],
  },
  {
    id: "07",
    product: "Hivemind Solutions",
    also: ["Hivemind Enterprise"],
    domain: "air",
    name: "NewSpace heterogeneous UAV / swarms",
    account: "newspace",
    gov: "army",
    buyers: ["Army", "Air Force"],
    horizon: "0-18m",
    status: "R&D / platform",
    evidence: "company-confirmed",
    source: "newspace",
    claim:
      "OEM unmanned systems portfolio; Shield integration is a proposed trial, not a disclosed partnership.",
    mission: "Heterogeneous teaming and dynamic retasking",
    precedents: ["mhi", "catalyst"],
    scores: [5, 5, 5, 3, 4, 3],
    pool: "tactical",
  },
  {
    id: "08",
    product: "Hivemind Enterprise",
    also: ["Hivemind Solutions", "Vision / ViDAR"],
    domain: "air",
    name: "TASL Rakshak / Sky-I",
    account: "tasl",
    gov: "army",
    buyers: ["Army", "Air Force", "Navy"],
    horizon: "18-36m",
    status: "R&D / platform",
    evidence: "company-confirmed",
    source: "tasl",
    claim:
      "TASL markets Rakshak and Sky-I with indigenous autopilot and mission control.",
    mission: "Mission autonomy above autopilot and route following",
    precedents: ["mhi"],
    scores: [4, 4, 5, 2, 3, 3],
    pool: "tactical",
  },
  {
    id: "09",
    product: "Hivemind Solutions",
    domain: "weapons",
    name: "TASL Advanced Loitering Systems",
    account: "tasl",
    gov: "army",
    buyers: ["Army", "Air Force"],
    horizon: "18-36m",
    status: "R&D / platform",
    evidence: "company-confirmed",
    source: "tasl",
    claim:
      "TASL has an indigenous loitering systems portfolio; third-party mission autonomy is unselected.",
    mission: "Collaborative mission behaviours on military platforms",
    precedents: ["lucas"],
    scores: [4, 3, 5, 2, 3, 3],
    pool: "tactical",
  },
  {
    id: "10",
    product: "Hivemind Enterprise",
    also: ["Vision / ViDAR"],
    domain: "cross-domain",
    name: "BEL unmanned system family",
    account: "bel",
    gov: "drdo",
    buyers: ["Army", "Navy", "Air Force", "DRDO"],
    horizon: "18-36m",
    status: "R&D / platform",
    evidence: "company-confirmed",
    source: "bel",
    claim:
      "BEL-hosted page confirms an unmanned-systems vertical and partner ecosystem. Shield integration is a proposal.",
    mission: "Third-party autonomy and perception modules",
    precedents: ["singapore", "st-engineering", "talon"],
    scores: [5, 4, 5, 3, 3, 3],
    pool: "tactical",
  },
  {
    id: "11",
    product: "Tracker C-UAS",
    domain: "weapons",
    name: "BEL / Army counter-UAS",
    account: "bel",
    gov: "army",
    buyers: ["Army", "Air Force"],
    horizon: "18-36m",
    status: "R&D / platform",
    evidence: "model",
    source: "dac-july",
    claim:
      "Anti-UAV demand signal exists; it does not establish a BEL / Tracker procurement.",
    mission: "Perception integration for counter-UAS systems",
    precedents: ["vampire", "rtx"],
    scores: [4, 4, 4, 2, 3, 3],
  },
  {
    id: "12",
    product: "Hivemind Solutions",
    also: ["Aechelon"],
    domain: "maritime",
    name: "GRSE Swadheen / ASV MCM",
    account: "grse",
    gov: "navy",
    horizon: "18-36m",
    status: "R&D / platform",
    evidence: "company-confirmed",
    source: "grse",
    claim:
      "GRSE autonomous surface R&D; platform opening and exact customer procurement require qualification.",
    mission: "Autonomous maritime ISR / MCM support",
    precedents: ["taiwan"],
    scores: [5, 4, 5, 3, 4, 3],
  },
  {
    id: "13",
    product: "Hivemind Solutions",
    also: ["Aechelon"],
    domain: "maritime",
    name: "GRSE / partner AUV",
    account: "grse",
    gov: "navy",
    horizon: "18-36m",
    status: "R&D / platform",
    evidence: "company-confirmed",
    source: "grse",
    claim:
      "Underwater autonomous R&D context; no disclosed Hivemind integration.",
    mission: "Underwater mission autonomy and validation",
    precedents: ["taiwan"],
    scores: [5, 3, 5, 2, 4, 3],
    caveat:
      "Surface-vessel teaming is an adjacent capability analogue, not proof of underwater deployment.",
  },
  {
    id: "14",
    product: "Hivemind Solutions",
    also: ["Aechelon"],
    domain: "maritime",
    name: "MDL swarm AUV / autonomous tug",
    account: "mdl",
    gov: "navy",
    horizon: "18-36m",
    status: "R&D / platform",
    evidence: "company-confirmed",
    source: "mdl",
    claim:
      "Official R&D disclosure includes autonomous underwater programmes; current procurement and architecture opening still require qualification.",
    mission: "Underwater autonomy / mission simulation",
    precedents: ["taiwan"],
    scores: [4, 3, 5, 2, 3, 2],
    caveat: "Maritime surface proof does not establish underwater capability.",
  },
  {
    id: "15",
    product: "Hivemind Solutions",
    also: ["Vision / ViDAR"],
    domain: "weapons",
    name: "BDL / DRDO collaborative weapon autonomy",
    account: "bdl",
    gov: "drdo",
    buyers: ["Army", "Air Force", "Navy", "DRDO"],
    horizon: "18-36m",
    status: "R&D / platform",
    evidence: "company-confirmed",
    source: "bdl",
    claim:
      "BDL discloses Jishnu and AI product development with startups; no Shield involvement.",
    mission: "Collaborative mission behaviours under Indian design authority",
    precedents: ["lucas"],
    scores: [4, 3, 5, 2, 3, 3],
  },
  {
    id: "16",
    product: "Hivemind Solutions",
    domain: "weapons",
    name: "Jet-based kamikaze drone autonomy",
    account: "army",
    gov: "army",
    horizon: "18-36m",
    status: "Approved / AoN",
    evidence: "official",
    source: "dac-july",
    claim:
      "Jet-based kamikaze drone system received July 2026 AoN; individual value and OEM not disclosed.",
    mission: "Mission-autonomy software on an Indian-owned platform",
    precedents: ["lucas"],
    scores: [4, 4, 4, 2, 2, 3],
    pool: "tactical",
    caveat:
      "Prime / design authority TBD. No terminal guidance design or autonomy architecture assumed.",
  },
  {
    id: "17",
    product: "Hivemind Solutions",
    also: ["Hivemind Enterprise"],
    domain: "air",
    name: "87-MALE mission-autonomy layer",
    account: "lt",
    gov: "iaf",
    buyers: ["Army", "Navy", "Air Force"],
    horizon: "18-36m",
    status: "Reported programme",
    evidence: "reported",
    source: "male-it",
    claim:
      "Reported 87-aircraft tri-service requirement at approximately ₹20,000 Cr; IAF lead.",
    mission: "Standalone mission software in a potentially closed architecture",
    precedents: ["cca-proof", "mhi"],
    scores: [4, 3, 4, 1, 1, 3],
    layer: "male-hivemind",
    value: 20000,
    quantity: 87,
    caveat:
      "L&T / GA-ASI and Adani / Elbit incumbent architectures lower openness. ₹20,000 Cr is the early report; later estimates differ.",
  },
  {
    id: "18",
    product: "Vision / ViDAR",
    domain: "air",
    name: "87-MALE perception layer",
    account: "adani",
    gov: "iaf",
    buyers: ["Army", "Navy", "Air Force"],
    horizon: "18-36m",
    status: "Reported programme",
    evidence: "reported",
    source: "male-it",
    claim:
      "Same reported MALE programme, with a separate hypothetical perception attachment. Bidder route illustrative, not exclusive.",
    mission: "Wide-area autonomous maritime / ISR detection",
    precedents: ["rtx"],
    scores: [4, 3, 4, 1, 2, 3],
    layer: "male-vision",
    value: 20000,
    quantity: 87,
  },
  {
    id: "19",
    product: "Hivemind Enterprise",
    also: ["Hivemind Solutions", "Aechelon"],
    domain: "space",
    name: "SBS-III constellation autonomy",
    account: "dsa",
    gov: "dsa",
    horizon: "3-5y",
    status: "Strategic hypothesis",
    evidence: "reported",
    source: "sbs",
    claim:
      "Reported 52 surveillance satellites / ₹26,968 Cr. Autonomy attachment and software access are hypotheses.",
    mission:
      "Military constellation tasking and spacecraft resource management",
    precedents: ["novi"],
    scores: [4, 1, 4, 1, 2, 2],
    layer: "space",
    value: 26968,
    quantity: 52,
  },
  {
    id: "20",
    product: "Aechelon",
    also: ["Hivemind Enterprise"],
    domain: "training",
    name: "IAF autonomy / simulator / T&E environment",
    account: "hal",
    gov: "iaf",
    buyers: ["Air Force", "DRDO"],
    horizon: "0-18m",
    status: "Strategic hypothesis",
    evidence: "model",
    source: "aechelon",
    claim:
      "Simulation product and allied deployments support an India T&E pilot thesis; no India selection.",
    mission: "Synthetic testing before platform-scale autonomy procurement",
    precedents: ["aechelon"],
    scores: [5, 4, 4, 2, 4, 2],
  },
  {
    id: "21",
    product: "Benchmark",
    domain: "training",
    name: "IAF pilot / simulator debrief",
    account: "iaf",
    gov: "iaf",
    horizon: "0-18m",
    status: "Strategic hypothesis",
    evidence: "model",
    source: "benchmark",
    claim:
      "Debrief and readiness product supports a proposed Training Command pilot.",
    mission: "Post-flight evaluation and pilot readiness analytics",
    precedents: ["benchmark"],
    scores: [4, 4, 4, 2, 4, 2],
  },
  {
    id: "22",
    product: "X-BAT",
    also: ["Hivemind Solutions"],
    domain: "air",
    name: "Future Indian autonomous combat airpower",
    account: "hal",
    gov: "iaf",
    buyers: ["Air Force", "Navy"],
    horizon: "strategic",
    status: "Strategic hypothesis",
    evidence: "model",
    source: "xbat",
    claim:
      "Future Shield aircraft concept; no Indian procurement or budget value established.",
    mission: "Long-term autonomous combat airpower concepts",
    precedents: ["cca-proof"],
    scores: [4, 1, 3, 1, 2, 1],
    caveat:
      "Relationship / concept shaping only. Excluded from all priced totals and 18-month planning values.",
  },
  {
    id: "23",
    product: "Aechelon",
    also: ["Benchmark"],
    domain: "training",
    name: "Naval aviation mission rehearsal",
    account: "navy",
    gov: "navy",
    horizon: "0-18m",
    status: "Strategic hypothesis",
    evidence: "model",
    source: "aechelon",
    claim:
      "Allied military simulation precedent supports a proposed naval aviation training pilot.",
    mission: "Mission rehearsal, sensor simulation and debrief",
    precedents: ["aechelon", "benchmark"],
    scores: [4, 4, 4, 2, 4, 2],
  },
  {
    id: "24",
    product: "Hivemind Enterprise",
    also: ["Aechelon"],
    domain: "maritime",
    name: "NSTL underwater autonomy validation",
    account: "drdo",
    gov: "drdo",
    buyers: ["Navy", "DRDO"],
    horizon: "18-36m",
    status: "R&D / platform",
    evidence: "official",
    source: "nstl",
    claim:
      "Underwater technology foresight is a development context, not an open software tender.",
    mission: "Cooperative AUV control development and synthetic verification",
    precedents: ["taiwan", "aechelon"],
    scores: [4, 3, 5, 2, 3, 2],
    caveat:
      "Surface-vessel autonomy demonstration is not underwater capability proof.",
  },
];
const buyerNames: Record<string, string> = {
  army: "Army",
  navy: "Navy",
  iaf: "Air Force",
  icg: "ICG",
  drdo: "DRDO",
  dsa: "DSA",
};
export const cells: OpportunityCell[] = seeds.map((s) => {
  const account = accountById[s.account],
    gov = accountById[s.gov];
  const [
    missionFit,
    timing,
    indigenisationFit,
    access,
    competitiveOpenness,
    authorityClarity,
  ] = s.scores;
  const scores: Scores = {
    missionFit,
    timing,
    indigenisationFit,
    access,
    competitiveOpenness,
    authorityClarity,
  };
  return {
    id: s.id,
    shieldProduct: s.product,
    additionalProducts: s.also || [],
    domain: s.domain,
    mission: s.mission,
    platformOrProgram: s.name,
    b2gBuyer: gov.name,
    buyers: s.buyers || [buyerNames[s.gov]],
    operationalSponsor: gov.chain![0].title,
    technicalAuthority: gov.chain![1].title,
    acquisitionAuthority: gov.chain![2].title,
    b2bPrime: account.kind === "B2B" ? account.name : undefined,
    primePlatform: s.name,
    accountId: s.account,
    governmentId: s.gov,
    primaryLocation: account.location,
    route:
      s.account === "jsw"
        ? "existing JSW route"
        : s.id === "19"
          ? "consortium"
          : account.kind === "B2B"
            ? "B2B OEM attach"
            : s.status === "Existing"
              ? "B2G direct"
              : "pilot-to-program",
    horizon: s.horizon,
    status: s.status,
    publicProgramValueCr: s.value,
    publicQuantity: s.quantity,
    valuationMethod: s.layer
      ? s.product === "V-BAT"
        ? "unit-model"
        : "attach-rate"
      : "unpriced",
    ...scores,
    priorityScore: priority(scores),
    evidenceLevel: s.evidence,
    caveats: [
      account.constraint,
      ...(s.caveat ? [s.caveat] : []),
      "Product fit, access, priority and next move are analyst judgement; evidence of a platform is not evidence of an open Shield sales opportunity.",
    ],
    sources: [
      { id: s.source, claim: s.claim },
      ...(s.id === "06"
        ? [
            {
              id: "dac-july",
              claim: "IAF fixed-wing HAPS AoN; no HAL selection implied.",
            },
          ]
        : []),
    ],
    precedentIds: s.precedents,
    nextMove: account.kind === "B2B" ? account.nextMove : gov.nextMove,
    layerId: s.layer,
    coveredByPool: s.pool,
  };
});
export const cellById = Object.fromEntries(cells.map((c) => [c.id, c]));
export const productColors: Record<Product, string> = {
  "V-BAT": "#ec7367",
  "Hivemind Enterprise": "#a4a2ee",
  "Hivemind Solutions": "#a4a2ee",
  "Vision / ViDAR": "#78bccc",
  "Tracker C-UAS": "#d8b67a",
  Aechelon: "#85b59e",
  Benchmark: "#b2c286",
  "X-BAT": "#d8d9df",
};
export const products = Object.keys(productColors) as Product[];
export const evidenceLabels: Record<Evidence, string> = {
  official: "OFFICIAL — GOI",
  "company-confirmed": "COMPANY-CONFIRMED",
  reported: "REPORTED",
  model: "MODEL",
};
export const precedentType = (id: string) =>
  [
    "novi",
    "taiwan",
    "mhi",
    "catalyst",
    "rtx",
    "st-engineering",
    "talon",
  ].includes(id)
    ? "Capability proof only"
    : "Commercial / programme precedent";
export interface Filters {
  product: string;
  domain: string;
  buyer: string;
  route: string;
  horizon: string;
  evidence: string;
  tier: string;
  search: string;
}
export function filterCells(
  data: OpportunityCell[],
  f: Filters,
): OpportunityCell[] {
  return data.filter(
    (c) =>
      (!f.product ||
        [c.shieldProduct, ...c.additionalProducts].includes(
          f.product as Product,
        )) &&
      (!f.domain || c.domain === f.domain) &&
      (!f.buyer || c.buyers.includes(f.buyer)) &&
      (!f.route || c.route === f.route) &&
      (!f.horizon || c.horizon === f.horizon) &&
      (!f.evidence || c.evidenceLevel === f.evidence) &&
      (!f.tier || String(accountById[c.accountId].tier) === f.tier) &&
      (!f.search ||
        `${c.platformOrProgram} ${c.mission} ${c.b2gBuyer} ${c.b2bPrime || ""}`
          .toLowerCase()
          .includes(f.search.toLowerCase())),
  );
}
