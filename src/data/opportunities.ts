export type EvidenceType =
  | "official-budget"
  | "official-programme"
  | "reported-programme"
  | "shield-proof"
  | "model-assumption"
  | "ecosystem";
export type Horizon = "0-18m" | "18-36m" | "3y+";
export type Confidence = "high" | "medium" | "low";
export type RouteToMarket = "B2G" | "B2B2G" | "partner-led" | "product-sale";
export type Product =
  | "V-BAT"
  | "Hivemind"
  | "Vision"
  | "Aechelon"
  | "Benchmark"
  | "X-BAT";
export type Service =
  | "Army"
  | "Navy"
  | "Air Force"
  | "Coast Guard"
  | "Military Space"
  | "MHA adjacency";
export interface SourceRef {
  id: string;
  title: string;
  organisation: string;
  date?: string;
  url: string;
  note?: string;
}
export interface OpportunityNode {
  id: string;
  parentIds: string[];
  label: string;
  valueLabel?: string;
  evidenceType: EvidenceType;
  description: string;
  whyShield?: string;
  notToInfer?: string;
  products?: Product[];
  horizon?: Horizon;
  confidence?: Confidence;
  routeToMarket?: RouteToMarket[];
  sourceIds: string[];
  priority?: "tier1" | "tier2" | "tier3" | "adjacency" | "context";
  level: number;
  service?: Service;
  kind?:
    | "root"
    | "owner"
    | "domain"
    | "programme"
    | "product"
    | "proof"
    | "channel"
    | "context";
  facts?: { label: string; value: string; sourceIds: string[] }[];
}
export const evidenceLabels: Record<EvidenceType, string> = {
  "official-budget": "Official annual budget",
  "official-programme": "Official programme / AoN",
  "reported-programme": "Reported programme value",
  "shield-proof": "Shield AI product / proof",
  "model-assumption": "Shield-fit assumption",
  ecosystem: "Ecosystem / context",
};
export const productList: Product[] = [
  "V-BAT",
  "Hivemind",
  "Vision",
  "Aechelon",
  "Benchmark",
  "X-BAT",
];
export const serviceList: Service[] = [
  "Army",
  "Navy",
  "Air Force",
  "Coast Guard",
  "Military Space",
  "MHA adjacency",
];
export const horizonLabels: Record<Horizon, string> = {
  "0-18m": "0–18 months",
  "18-36m": "18–36 months",
  "3y+": "3+ years",
};
export const routeLabels: Record<RouteToMarket, string> = {
  B2G: "Direct B2G",
  B2B2G: "Indian OEM B2B2G",
  "partner-led": "Partner-led",
  "product-sale": "Product sale",
};
export const opportunities: OpportunityNode[] = [
  {
    id: "india",
    parentIds: [],
    level: 0,
    kind: "root",
    label: "INDIA DEFENCE & NATIONAL-SECURITY AUTONOMY OPPORTUNITY",
    evidenceType: "ecosystem",
    description:
      "Where Shield AI’s defence aircraft, mission autonomy, perception and simulation products can realistically participate.",
    notToInfer:
      "These pools are not additive. There is deliberately no grand rupee number.",
    sourceIds: [],
  },
  {
    id: "mod",
    parentIds: ["india"],
    level: 1,
    kind: "owner",
    label: "Ministry of Defence",
    valueLabel: "₹7.85 lakh Cr",
    evidenceType: "official-budget",
    description:
      "FY2026–27 annual allocation. Shield AI does not address the whole MoD budget. Capital acquisition, defence R&D, operational sustainment and training are the relevant pools.",
    whyShield:
      "Army V-BAT is the beachhead; service-specific platforms create routes for sovereign autonomy, perception and simulation.",
    notToInfer:
      "Capital acquisition and the domestic earmark are nested within the budget, not additional markets. Pensions and salaries are not autonomy demand.",
    sourceIds: ["mod-budget"],
    priority: "tier1",
    facts: [
      {
        label: "Capital head",
        value: "₹2.19 lakh Cr",
        sourceIds: ["mod-budget"],
      },
      {
        label: "Capital acquisition",
        value: "~₹1.85 lakh Cr",
        sourceIds: ["mod-budget"],
      },
      {
        label: "Domestic industry earmark (nested)",
        value: "₹1.39 lakh Cr",
        sourceIds: ["mod-budget"],
      },
      {
        label: "DRDO allocation",
        value: "₹29,100.25 Cr",
        sourceIds: ["mod-budget"],
      },
    ],
  },
  {
    id: "space",
    parentIds: ["india"],
    level: 1,
    kind: "owner",
    label: "Military Space / DSA / NSCS",
    valueLabel: "SBS-III · ₹26,968 Cr reported",
    evidenceType: "reported-programme",
    description:
      "Core-strategic national-security programme. SBS-III reportedly comprises 52 surveillance satellites, handled by NSCS with the Defence Space Agency under Integrated Defence Headquarters / MoD.",
    whyShield:
      "A longer-term autonomy and simulation option for sovereign surveillance constellations.",
    notToInfer:
      "Reported multi-year programme value, not an official budget line or Shield contract. No evidence of Shield AI participation in SBS-III today. Do not add to the MoD annual budget.",
    sourceIds: ["sbs", "sbs-clipping"],
    priority: "tier3",
    service: "Military Space",
    facts: [
      {
        label: "Surveillance satellites (reported)",
        value: "52",
        sourceIds: ["sbs"],
      },
      {
        label: "Reported execution split",
        value: "21 ISRO / 31 private",
        sourceIds: ["sbs", "sbs-clipping"],
      },
    ],
  },
  {
    id: "mha",
    parentIds: ["india"],
    level: 1,
    kind: "owner",
    label: "MHA / CAPF border security",
    valueLabel: "₹2,55,234 Cr · context only",
    evidenceType: "official-budget",
    description:
      "Secondary national-security adjacency. FY2026–27 MHA spending provides context for border ISR, surveillance and counter-UAS; the overwhelming majority of CAPF spending is revenue.",
    whyShield:
      "Selective border surveillance and force-protection use cases, pursued through partners.",
    notToInfer:
      "Neither the entire ministry nor CAPF allocation is Shield TAM. Ordinary state policing and civilian public-safety technology are excluded.",
    sourceIds: ["mha-budget", "capf", "ssb"],
    priority: "adjacency",
    service: "MHA adjacency",
    facts: [
      {
        label: "Police capital",
        value: "₹21,272 Cr",
        sourceIds: ["mha-budget"],
      },
      {
        label: "CAPF total · mostly revenue",
        value: "₹1,16,789 Cr",
        sourceIds: ["mha-budget"],
      },
      {
        label: "Border infrastructure",
        value: "₹5,577 Cr",
        sourceIds: ["mha-budget"],
      },
      {
        label: "Modernisation of Police",
        value: "₹4,061 Cr",
        sourceIds: ["mha-budget"],
      },
    ],
  },
  {
    id: "oem",
    parentIds: ["india"],
    level: 1,
    kind: "channel",
    label: "Indian defence OEM / primes",
    valueLabel: "A route to market. Not a budget.",
    evidenceType: "ecosystem",
    description:
      "Government requirement → Indian prime / OEM → Shield AI autonomy, perception and simulation software.",
    whyShield:
      "Hivemind Enterprise enables sovereign engineers to develop with the SDK. Hivemind Solutions integrates autonomy on customer platforms. Shield need not be the airframe, vessel or satellite prime.",
    notToInfer:
      "This channel draws on underlying government requirements; it is never added as a separate budget pool.",
    sourceIds: ["india-contract", "india-office", "hivemind"],
    priority: "tier1",
  },
];
function add(n: OpportunityNode) {
  opportunities.push(n);
}
const domains: [string, string, string, Service, string][] = [
  [
    "army",
    "mod",
    "Indian Army",
    "Army",
    "Tactical ISR, runway independence and contested operations.",
  ],
  [
    "navy",
    "mod",
    "Indian Navy",
    "Navy",
    "Shipborne surveillance and autonomous surface / subsea systems.",
  ],
  [
    "airforce",
    "mod",
    "Indian Air Force",
    "Air Force",
    "Persistent ISR, sovereign mission autonomy and simulation.",
  ],
  [
    "coastguard",
    "mod",
    "Indian Coast Guard",
    "Coast Guard",
    "Maritime surveillance and force protection. Part of MoD.",
  ],
  [
    "space-missions",
    "space",
    "Space-based ISR / surveillance",
    "Military Space",
    "Space-based ISR, tasking / retasking, constellation coordination, resilient autonomy under intermittent connectivity, and resource-aware satellite health / mission planning.",
  ],
  [
    "space-tasking",
    "space",
    "On-orbit tasking & retasking",
    "Military Space",
    "Defence mission tasking and dynamic retasking of surveillance assets.",
  ],
  [
    "space-coordination",
    "space",
    "Constellation coordination",
    "Military Space",
    "Coordinated collection across a sovereign military constellation.",
  ],
  [
    "space-resilience",
    "space",
    "Resilient mission autonomy",
    "Military Space",
    "Mission continuity under intermittent communications and contested-space conditions.",
  ],
  [
    "space-health",
    "space",
    "Resource-aware mission planning",
    "Military Space",
    "Balancing satellite health, power and surveillance task priorities.",
  ],
  [
    "border",
    "mha",
    "CAPF border missions",
    "MHA adjacency",
    "Border ISR, surveillance, C2 and counter-UAS. Selective national-security missions only.",
  ],
];
for (const [id, parent, label, service, description] of domains)
  add({
    id,
    parentIds: [parent],
    label,
    level: 2,
    kind: "domain",
    service,
    evidenceType: "ecosystem",
    description,
    sourceIds:
      service === "MHA adjacency"
        ? ["capf", "ssb"]
        : service === "Military Space"
          ? ["sbs", "novi"]
          : [],
    priority:
      service === "MHA adjacency"
        ? "adjacency"
        : service === "Military Space"
          ? "tier3"
          : "tier1",
  });
add({
  id: "civil-space",
  parentIds: ["space"],
  level: 2,
  kind: "context",
  label: "Department of Space / ISRO",
  valueLabel: "Execution ecosystem · not defence TAM",
  evidenceType: "ecosystem",
  description:
    "FY2026–27 civil budget: ₹13,705.63 crore; Space Technology: ₹10,397.06 crore. Official context only, deliberately excluded from the opportunity model.",
  notToInfer:
    "ISRO execution of defence satellites does not turn the entire civil Department of Space budget into Shield AI opportunity.",
  sourceIds: ["civil-space", "isro-budget"],
  priority: "context",
});
add({
  id: "sovereign",
  parentIds: ["oem"],
  level: 2,
  kind: "domain",
  label: "Sovereign platform integration",
  evidenceType: "ecosystem",
  description:
    "Local engineering and partner enablement: a B2B2G route across Indian military platforms.",
  sourceIds: ["india-contract", "india-office"],
  priority: "tier1",
});
type ProgrammeInput = [
  string,
  string,
  string,
  string,
  string,
  Product[],
  Horizon,
  Confidence,
  string[],
];
const programmes: ProgrammeInput[] = [
  [
    "army-vbat",
    "army",
    "Execute + scale Army V-BAT",
    "Existing India selection",
    "Indian Army selected V-BAT and the Hivemind SDK in January 2026; the SDK is available to select Indian partners for sovereign development.",
    ["V-BAT", "Hivemind", "Vision", "Aechelon"],
    "0-18m",
    "high",
    ["india-contract"],
  ],
  [
    "tactical-uas",
    "army",
    "Tactical military UAS procurement",
    ">$2B · reported pipeline",
    "Reuters reported India preparing its largest domestic military-drone buy, spanning reconnaissance, logistics and strike, with deliveries expected in roughly 18–24 months. Programme-wide value; not all Group 3 or V-BAT.",
    ["V-BAT", "Hivemind", "Vision", "Aechelon"],
    "0-18m",
    "medium",
    ["tactical", "tactical-republication"],
  ],
  [
    "runway",
    "army",
    "Runway Independent Aerial Surveillance",
    "Individual value not disclosed",
    "March 2026 DAC AoN. ₹2.38 lakh crore is the full DAC bundle, not the value of this surveillance system.",
    ["V-BAT", "Hivemind", "Vision", "Aechelon"],
    "0-18m",
    "high",
    ["dac-march"],
  ],
  [
    "jet-ew",
    "army",
    "Jet kamikaze drones + Anti-UAV EW",
    "Individual values not disclosed",
    "July 2026 DAC AoN for jet-based kamikaze drones and anti-UAV electronic warfare. ₹52,000 Cr is the full DAC bundle.",
    ["Hivemind", "Vision", "Aechelon"],
    "3y+",
    "medium",
    ["dac-july"],
  ],
  [
    "loitering",
    "army",
    "Loitering munitions / drone detection",
    "Unpriced demand signal",
    "Official DAC procurement signal. Use as evidence of mission demand, not a separately quantified market.",
    ["Hivemind", "Vision", "Aechelon"],
    "3y+",
    "medium",
    ["dac-dec"],
  ],
  [
    "cuas",
    "army",
    "Tracker / counter-UAS integration",
    "Unpriced integration opportunity",
    "Anti-UAV demand suggests a perception and tracking attach route through Indian force-protection integrators. The proposed Shield route is analyst inference.",
    ["Vision", "Hivemind"],
    "18-36m",
    "medium",
    ["dac-july", "vampire"],
  ],
  [
    "nsuas",
    "navy",
    "Naval Shipborne UAS",
    "Individual value not disclosed",
    "Official DAC AoN, July 2026. Individual programme value not disclosed; ₹52,000 Cr is the full DAC bundle.",
    ["V-BAT", "Hivemind", "Vision", "Aechelon"],
    "0-18m",
    "high",
    ["dac-july"],
  ],
  [
    "surface",
    "navy",
    "Compact Autonomous Surface Craft",
    "Individual value not disclosed",
    "August 2025 DAC AoN: detection, classification and neutralisation of anti-submarine threats. ₹67,000 Cr is the full DAC bundle.",
    ["Hivemind", "Vision", "Aechelon"],
    "18-36m",
    "medium",
    ["dac-aug25"],
  ],
  [
    "subsea",
    "navy",
    "Submersible Autonomous Vessels",
    "Individual value not disclosed",
    "July 2025 DAC AoN. ₹1.05 lakh crore is the full acquisition bundle, not the submersible programme value.",
    ["Hivemind", "Aechelon"],
    "18-36m",
    "medium",
    ["dac-july25"],
  ],
  [
    "drdo-auv",
    "navy",
    "DRDO autonomous underwater vehicles",
    "Indigenous technology direction",
    "Autonomous underwater development is a technology signal; no separate procurement value is inferred.",
    ["Hivemind", "Aechelon"],
    "18-36m",
    "medium",
    ["auv"],
  ],
  [
    "icg-allocation",
    "coastguard",
    "Coast Guard budget context",
    "₹8,392.85 Cr · FY2026–27",
    "Detailed table, report printed p.44 (PDF p.50): Revenue ₹4,392.85 Cr; Capital ₹4,000 Cr. The summary on printed p.103 reverses the labels and rounds the revenue figure. We follow the detailed table.",
    ["V-BAT", "Vision", "Hivemind", "Aechelon", "Benchmark"],
    "0-18m",
    "high",
    ["icg-budget"],
  ],
  [
    "icg-eoir",
    "coastguard",
    "Dornier EO/IR acquisition",
    "Individual value not disclosed",
    "February 2026 DAC acquisition signal for electro-optical / infrared sensors for Coast Guard Dornier aircraft. Shows maritime ISR need, not a Shield award.",
    ["Vision", "V-BAT", "Hivemind", "Aechelon", "Benchmark"],
    "0-18m",
    "high",
    ["dac-feb", "icg-budget"],
  ],
  [
    "fw-haps",
    "airforce",
    "Fixed-Wing HAPS",
    "Individual value not disclosed",
    "July 2026 DAC AoN for persistent military ISR, telecommunications and remote sensing. ₹52,000 Cr is the full bundle.",
    ["Hivemind", "Vision", "Aechelon"],
    "18-36m",
    "medium",
    ["dac-july"],
  ],
  [
    "as-haps",
    "airforce",
    "Air-Ship Based HAPS",
    "Individual value not disclosed",
    "February 2026 DAC AoN: persistent ISR, ELINT, telecommunications and remote sensing. ₹3.60 lakh crore is the full DAC bundle.",
    ["Hivemind", "Vision", "Aechelon"],
    "18-36m",
    "medium",
    ["dac-feb"],
  ],
  [
    "male",
    "airforce",
    "Indigenous MALE UAS · tri-service",
    "₹20,000–30,000 Cr · reported",
    "Reported programme for 87 MALE drones. July 2025 reporting cited about ₹20,000 Cr; later reporting cited a cleared deal around ₹30,000 Cr. Displayed once here, not once per service.",
    ["Hivemind", "Vision", "Aechelon"],
    "18-36m",
    "medium",
    ["male-it", "male-et"],
  ],
  [
    "collaborative",
    "airforce",
    "Collaborative / autonomous air combat",
    "Unpriced strategic option",
    "Official demand signals include collaborative long-range target saturation / destruction. Shield mapping is an inference; X-BAT is a longer-term option.",
    ["Hivemind", "X-BAT", "Aechelon", "Benchmark", "Vision"],
    "3y+",
    "low",
    ["mod-review"],
  ],
  [
    "simulators",
    "airforce",
    "Full Mission Simulators / autonomy test",
    "Individual value not disclosed",
    "Official Full Mission Simulator acquisition signals support a separate simulation and training layer, plus test and evaluation for indigenous autonomy.",
    ["Aechelon", "Benchmark", "Hivemind"],
    "18-36m",
    "medium",
    ["mod-review"],
  ],
  [
    "sbs-programme",
    "space-missions",
    "SBS-III military surveillance",
    "₹26,968 Cr · reported",
    "Reported multi-year national-security constellation of 52 satellites. Autonomy, mission planning and simulation are proposed software attach opportunities.",
    ["Hivemind", "Aechelon"],
    "3y+",
    "low",
    ["sbs", "sbs-clipping", "novi"],
  ],
  [
    "space-tasking-fit",
    "space-tasking",
    "Defence satellite tasking software",
    "Unpriced · analyst mission hypothesis",
    "Hivemind satellite tasking proof suggests a future defence integration route; no separately disclosed Indian procurement or Shield award.",
    ["Hivemind", "Aechelon"],
    "3y+",
    "low",
    ["novi", "sbs"],
  ],
  [
    "space-coordination-fit",
    "space-coordination",
    "Sovereign constellation integration",
    "Unpriced · analyst mission hypothesis",
    "Coordination is a proposed software wedge, informed by the NOVI / virtual-constellation demonstration. Not a disclosed DSA software contract.",
    ["Hivemind", "Aechelon"],
    "3y+",
    "low",
    ["novi", "sbs"],
  ],
  [
    "space-resilience-fit",
    "space-resilience",
    "Autonomy under intermittent connectivity",
    "Unpriced · analyst mission hypothesis",
    "Future mission-continuity and simulation route for military satellites. Contested-space deployment is not established by the NOVI demonstration.",
    ["Hivemind", "Aechelon"],
    "3y+",
    "low",
    ["novi", "hivemind"],
  ],
  [
    "space-health-fit",
    "space-health",
    "Health / power-aware planning",
    "Unpriced · analyst mission hypothesis",
    "Satellite tasking can balance imaging goals, battery state and spacecraft health. Demonstrated capability suggests a future defence use case.",
    ["Hivemind", "Aechelon"],
    "3y+",
    "low",
    ["novi"],
  ],
  [
    "capf-programme",
    "border",
    "Border surveillance + counter-UAS",
    "Unpriced · selective adjacency",
    "CAPF modernisation references UAVs / drones, surveillance, C2 and advanced technology; SSB evidence supports the border-security mission.",
    ["V-BAT", "Vision", "Hivemind"],
    "18-36m",
    "medium",
    ["capf", "ssb"],
  ],
  [
    "sdk-india",
    "sovereign",
    "Indian partners / sovereign SDK",
    "India contract provides route proof",
    "The Army agreement licences Hivemind SDK for sovereign development and availability to select Indian partners. Local engineering positioning supports integration and enablement.",
    ["Hivemind", "Vision", "Aechelon", "Benchmark"],
    "0-18m",
    "high",
    ["india-contract", "india-office"],
  ],
];
for (const [
  id,
  parent,
  label,
  valueLabel,
  description,
  products,
  horizon,
  confidence,
  sourceIds,
] of programmes) {
  const domain = opportunities.find((n) => n.id === parent)!;
  const evidenceType: EvidenceType = id.startsWith("space-")
    ? "model-assumption"
    : ["tactical-uas", "male", "sbs-programme"].includes(id)
      ? "reported-programme"
      : id === "icg-allocation"
        ? "official-budget"
        : ["army-vbat", "sdk-india"].includes(id)
          ? "shield-proof"
          : "official-programme";
  add({
    id,
    parentIds: [parent],
    label,
    valueLabel,
    description,
    products,
    horizon,
    confidence,
    sourceIds,
    evidenceType,
    level: 3,
    kind: "programme",
    service: domain.service,
    priority:
      domain.service === "MHA adjacency"
        ? "adjacency"
        : horizon === "0-18m"
          ? "tier1"
          : horizon === "18-36m"
            ? "tier2"
            : "tier3",
    routeToMarket:
      id === "army-vbat" || id === "nsuas"
        ? ["B2G", "product-sale"]
        : ["B2B2G", "partner-led"],
    whyShield:
      id === "sbs-programme" || id.startsWith("space-")
        ? "Speculative Hivemind / simulation attach. NOVI / Sedaro is capability proof only; no evidence Shield participates in SBS-III."
        : id === "male"
          ? "Autonomy, passive sensing and simulation through Indian OEMs. Shield is unlikely to be the Indian MALE airframe prime."
          : `${products.join(", ")} can support ${domain.label.toLowerCase()} missions through platform integration, product supply or training infrastructure. This fit assessment is analyst judgement, not an official selection.`,
    notToInfer:
      id === "icg-allocation"
        ? "Annual service context, nested within MoD and excluded from the model; most expenditure is not available to Shield."
        : id === "tactical-uas"
          ? "Do not assign the entire buy to V-BAT or Group 3. Model currency conversion is an editable assumption, not a quoted exchange rate."
          : id === "sbs-programme"
            ? "This is the same programme shown in the parent branch, counted only once in the scenario. It is not a Shield award."
            : "AoN, reported demand or precedent does not establish a Shield contract. No whole DAC bundle is attributed to this programme; no annual allocation is added to multi-year values.",
  });
}
interface ProductInfo {
  label: string;
  description: string;
  why: string;
  sources: string[];
  proofs: {
    id: string;
    label: string;
    description: string;
    sources: string[];
  }[];
}
export const productInfo: Record<Product, ProductInfo> = {
  "V-BAT": {
    label: "V-BAT",
    description:
      "Runway-independent tactical ISR aircraft. About 75 kg max gross takeoff weight: India Medium UAS; U.S. Group 3. Selected with Hivemind SDK by the Indian Army in January 2026.",
    why: "A fielded India beachhead; shipborne operations and compact launch / recovery suit tactical and maritime ISR.",
    sources: ["vbat", "india-contract", "taxonomy-current"],
    proofs: [
      {
        id: "nl",
        label: "Royal Netherlands Navy",
        description:
          "Operational V-BAT: 12 being acquired; 8 vessels to be equipped.",
        sources: ["netherlands"],
      },
      {
        id: "pl",
        label: "Polish Navy",
        description: "Contract for shipborne V-BAT maritime ISR.",
        sources: ["poland"],
      },
      {
        id: "fr",
        label: "Frontex / Italian Coast Guard",
        description:
          "Border / coast-security pilot: 150 flight hours across 19 days. Security precedent only.",
        sources: ["frontex"],
      },
    ],
  },
  Hivemind: {
    label: "Hivemind Enterprise / Solutions",
    description:
      "Solutions: Shield engineers integrate mission autonomy on customer platforms. Enterprise: sovereign engineers develop, test and own mission-autonomy applications with the SDK and toolchain.",
    why: "The strategic software multiplier: Indian OEMs can remain platform primes, with sovereign autonomy development across defence aircraft, maritime systems and future space missions.",
    sources: ["hivemind", "india-contract", "india-office"],
    proofs: [
      {
        id: "sg",
        label: "Singapore · DSTA + RSAF",
        description:
          "Sovereign mission-autonomy development and progressive fielding partnership.",
        sources: ["singapore", "singapore-case"],
      },
      {
        id: "st",
        label: "Singapore · ST Engineering",
        description:
          "Platform integration partnership and sovereign SDK evaluation.",
        sources: ["st-engineering"],
      },
      {
        id: "jp",
        label: "Japan · Mitsubishi Heavy Industries",
        description: "Autonomy integrated and flight-tested in under 60 days.",
        sources: ["mhi", "mhi-case"],
      },
      {
        id: "kr",
        label: "South Korea · KAI",
        description:
          "Hivemind Enterprise partnership for manned / unmanned teaming.",
        sources: ["kai"],
      },
      {
        id: "us",
        label: "USAF · CCA production contract",
        description:
          "Mission autonomy production contract; proof of a defence software procurement route.",
        sources: ["cca-proof"],
      },
      {
        id: "tw",
        label: "Taiwan · Thunder Tiger",
        description:
          "Multi-asset autonomous maritime teaming demonstration; capability demonstration, not fleet-wide deployment.",
        sources: ["taiwan"],
      },
      {
        id: "hii",
        label: "HII · ROMULUS",
        description: "USV integration and autonomous maritime operations.",
        sources: ["hii"],
      },
      {
        id: "rtx",
        label: "RTX · strike autonomy partnership",
        description: "Partnership to develop defence capabilities.",
        sources: ["rtx"],
      },
      {
        id: "lucas",
        label: "LUCAS · swarming selection",
        description:
          "Selected to provide autonomy for low-cost one-way attack swarming.",
        sources: ["lucas"],
      },
      {
        id: "destinus",
        label: "Destinus · European / Ukraine platforms",
        description:
          "Cross-platform autonomy integration partnership supporting defence requirements.",
        sources: ["destinus"],
      },
      {
        id: "ew",
        label: "L3Harris · DiSCO",
        description: "Autonomous electronic warfare flight-test demonstration.",
        sources: ["disco"],
      },
      {
        id: "space",
        label: "NOVI / Sedaro · capability demonstration",
        description:
          "Satellite autonomy proof. Not an international military customer precedent and not evidence of participation in SBS-III.",
        sources: ["novi"],
      },
    ],
  },
  Vision: {
    label: "Vision Systems / ViDAR / Tracker",
    description:
      "Passive EO/IR detection and tracking: ViDAR wide-area search and Tracker C-UAS perception.",
    why: "Maritime domain awareness, littoral and border surveillance, counter-UAS and force protection create payload and software attach routes.",
    sources: ["vision"],
    proofs: [
      {
        id: "navair",
        label: "USMC / NAVAIR · ViDAR",
        description:
          "ViDAR payload deliveries to PMA-263 for Marine Corps operations.",
        sources: ["navair"],
      },
      {
        id: "vampire",
        label: "L3Harris · VAMPIRE",
        description:
          "Tracker C-UAS licensing / integration demonstrates an OEM perception route.",
        sources: ["vampire"],
      },
      {
        id: "au",
        label: "Australia · Sentient Vision",
        description:
          "Allied sovereign-market presence through ISR / perception technology acquisition, not a civil-market thesis.",
        sources: ["sentient"],
      },
    ],
  },
  Aechelon: {
    label: "Aechelon · simulation & test",
    description:
      "Separate simulation business layer: flight training, mission rehearsal, synthetic AI / ML data, test and evaluation, sensor / environment simulation and GPS-denied navigation environments.",
    why: "Indian Full Mission Simulator demand and indigenous autonomy development require repeatable training, synthetic environments and evaluation infrastructure.",
    sources: ["aechelon", "aechelon-acquisition", "simulation"],
    proofs: [
      {
        id: "training",
        label: "U.S. / NATO / allied training footprint",
        description:
          "More than 1,200 U.S. military operational flight-training systems, with simulation programmes across U.S., NATO and allied nations.",
        sources: ["aechelon", "simulation", "aechelon-acquisition"],
      },
      {
        id: "space-sim",
        label: "NOVI / Sedaro · simulation-enabled test",
        description:
          "Shield satellite demonstration is adjacent autonomy test evidence; not evidence Aechelon was the simulator in that demonstration.",
        sources: ["novi"],
      },
    ],
  },
  Benchmark: {
    label: "Benchmark · recurring readiness",
    description:
      "AI-assisted post-flight debrief, scoring, readiness and safety analytics. A smaller recurring software / training layer.",
    why: "Military flying training and readiness analytics provide a recurring software attach opportunity alongside platform and simulator investments.",
    sources: ["benchmark", "hivemind"],
    proofs: [
      {
        id: "usaf-training",
        label: "USAF platform training heritage",
        description:
          "Originally built for platforms including T-6, T-38, F-15E and F-16. This is product heritage, not an India contract.",
        sources: ["benchmark", "hivemind"],
      },
    ],
  },
  "X-BAT": {
    label: "X-BAT · longer-term airpower",
    description:
      "Distributed autonomous airpower option. Shield roadmap targets first VTOL flight in 2026, mission capability by 2028 and production in 2029; targets are not achieved milestones.",
    why: "A longer-term option for distributed airpower and CCA-like concepts, contingent on development and Indian requirements.",
    sources: ["xbat"],
    proofs: [
      {
        id: "roadmap",
        label: "X-BAT · published development roadmap",
        description:
          "Product / development proof only, not an operational military customer precedent. Excluded from all quantified scenarios and 18-month revenue.",
        sources: ["xbat"],
      },
    ],
  },
};
for (const p of opportunities.filter((n) => n.kind === "programme"))
  for (const product of p.products ?? []) {
    const info = productInfo[product];
    const id = `${p.id}::${product}`;
    const horizon: Horizon =
      product === "X-BAT"
        ? "3y+"
        : product === "Aechelon" || product === "Benchmark"
          ? p.horizon === "3y+"
            ? "3y+"
            : "18-36m"
          : p.horizon!;
    add({
      id,
      parentIds: [p.id],
      level: 4,
      kind: "product",
      label: info.label,
      evidenceType: "shield-proof",
      description: info.description,
      whyShield: info.why,
      notToInfer:
        "Capability and international evidence do not guarantee Indian demand or awarded revenue. Product fit is an analyst assessment.",
      sourceIds: info.sources,
      products: [product],
      service: p.service,
      horizon,
      confidence: product === "X-BAT" ? "low" : p.confidence,
      routeToMarket:
        product === "V-BAT"
          ? ["product-sale", "B2G"]
          : ["B2B2G", "partner-led"],
      priority:
        horizon === "3y+"
          ? "tier3"
          : horizon === "18-36m"
            ? "tier2"
            : p.priority,
    });
    let proofs = info.proofs;
    if (p.service === "Military Space")
      proofs =
        product === "Hivemind"
          ? info.proofs.filter((x) => x.id === "space")
          : info.proofs;
    else if (product === "Hivemind" && p.service === "Navy")
      proofs = info.proofs.filter((x) => ["tw", "hii", "jp"].includes(x.id));
    else if (
      product === "Hivemind" &&
      ["jet-ew", "loitering", "collaborative"].includes(p.id)
    )
      proofs = info.proofs.filter((x) =>
        ["us", "rtx", "lucas", "destinus", "ew", "kr"].includes(x.id),
      );
    else if (product === "Hivemind")
      proofs = info.proofs.filter((x) =>
        ["sg", "st", "jp", "kr", "us"].includes(x.id),
      );
    for (const proof of proofs)
      add({
        id: `${id}::${proof.id}`,
        parentIds: [id],
        level: 5,
        kind: "proof",
        label: proof.label,
        evidenceType: "shield-proof",
        description: proof.description,
        sourceIds: proof.sources,
        products: [product],
        service: p.service,
        horizon,
        confidence: p.confidence,
        routeToMarket: ["partner-led"],
        notToInfer:
          "International precedent demonstrates capability or a go-to-market pattern, not guaranteed India demand.",
      });
  }
export const nodeById = Object.fromEntries(opportunities.map((n) => [n.id, n]));
export const childrenOf = (id: string) =>
  opportunities.filter((n) => n.parentIds.includes(id));
