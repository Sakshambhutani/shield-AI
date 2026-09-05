import { sources as existing } from "../data/sources";
import type { SourceGroup } from "./types";
export interface StrategySource {
  id: string;
  title: string;
  organisation: string;
  url: string;
  date?: string;
  note?: string;
  group: SourceGroup;
  claim: string;
  verification: "checked" | "prior audit" | "pending";
}
const extra: StrategySource[] = [
  [
    "dap",
    "Capital procurement and AoN thresholds",
    "PIB / MoD",
    "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1848674&lang=2&reg=48",
    "SPB/CISC up to ₹300 Cr; DPB/Defence Secretary above ₹300 Cr to ₹500 Cr; DAC/Raksha Mantri above ₹500 Cr. Post-AoN contracting follows delegated powers.",
    "2022-08-05",
  ],
  [
    "dap-draft",
    "Draft DAP-2026 consultation",
    "PIB / MoD",
    "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2226097&lang=1&reg=3",
    "Release describes DAP-2026 as draft, DAP-2020 in force, and DPM-2025 as revenue sustainment framework.",
    "2026-02-10",
  ],
  [
    "policy-register",
    "Defence acts and policies",
    "DDP / MoD",
    "https://www.ddpmod.gov.in/en/documents/acts-and-policies?page=0",
    "Policy register still lists DAP-2020; read with draft consultation. No later enactment established in this audit.",
    "",
  ],
  [
    "delegation",
    "Revised financial delegation",
    "PIB / MoD",
    "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2268807&lang=1&reg=48",
    "June 2026 increases field-command and R&D/indigenisation financial powers. Exact sub-thresholds not inferred.",
    "2026-06-04",
  ],
  [
    "army-roles",
    "Army indigenisation partnership",
    "PIB / MoD",
    "https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1690860&lang=2&reg=48",
    "DCOAS Capability Development & Sustenance role aligns capability development; industry partnership context.",
    "2021-01-21",
  ],
  [
    "adb",
    "Army / Drone Federation partnership",
    "PIB / MoD",
    "https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1849959&lang=2&reg=48",
    "Army Design Bureau facilitates industry and user interaction for indigenous drone development.",
    "2022-08-08",
  ],
  [
    "niio",
    "Naval innovation and industry engagement",
    "PIB / MoD",
    "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2064075&lang=1&reg=1",
    "NIIO/TDAC and Swavlamban provide naval innovation and industry engagement context.",
    "2024-10-11",
  ],
  [
    "hal",
    "HAL CATS and unmanned portfolio · p.8",
    "HAL",
    "https://hal-india.co.in/backend/wp-content/uploads/2022/12/LCA.pdf",
    "Brochure includes CATS Warrior, Alfa, Hunter, Infinity solar HAPS and a five-tonne HALE UAV.",
    "",
  ],
  [
    "bel",
    "Unmanned Systems business vertical",
    "BEL",
    "https://test.bel-india.in/unmanned-systems/",
    "BEL-hosted page confirms a Bengaluru unmanned-systems vertical, UAV/UGV/UUV/USV partner ecosystem, payloads, datalinks, GCS and drone guard. Main-domain page failed retrieval; this is its accessible BEL-hosted mirror.",
    "",
  ],
  [
    "newspace",
    "Military platform portfolio",
    "NewSpace Research & Technologies",
    "https://newspace.co.in/",
    "Official homepage supports the military unmanned-platform context; brief-supplied Beluga / Nimbus / Mackerel names and dynamic-retasking details require current confirmation. See the official company posting for heterogeneous swarm proof.",
    "",
  ],
  [
    "tasl",
    "UAV and loitering portfolio",
    "Tata Advanced Systems",
    "https://www.tataadvancedsystems.com/uav",
    "Sky-I, Rakshak VTOL and indigenous loitering systems; own autopilot, mission-control software and Hyderabad / Delhi addresses.",
    "",
  ],
  [
    "grse",
    "Annual report 2024–25 · autonomous R&D",
    "GRSE",
    "https://www.grse.in/annual-reports/Annual%20Report%202024-25.pdf",
    "Autonomous surface and underwater R&D portfolio. A separate GRSE-hosted annual-report filing corroborates the 5m Swadheen USV.",
    "2025",
  ],
  [
    "grse-filing",
    "Annual report filing · Swadheen USV",
    "GRSE",
    "https://grse.in/corporate-announcement/files/Submission%20of%20Annual%20Report%202024-25.pdf",
    "GRSE official indexed filing describes the 5m Swadheen USV developed with a startup for Indian Navy needs. Direct download timed out during this audit.",
    "2025",
  ],
  [
    "lt-exail",
    "L&T / Exail unmanned MCM partnership",
    "L&T",
    "https://www.larsentoubro.com/pressreleases/2026/2026-05-14-lt-partners-france-based-exail-for-indian-navys-unmanned-mine-counter-measure-suite",
    "L&T and Exail partnership for the Indian Navy unmanned mine-countermeasure suite.",
    "2026-05-14",
  ],
  [
    "bdl",
    "CMD statement · AI and Jishnu",
    "BDL",
    "https://bdl-india.in/message-cmd",
    "Jishnu drone-delivered missile and AI-enabled product development with startups.",
    "",
  ],
  [
    "lt",
    "L&T / GA-ASI MALE partnership",
    "L&T",
    "https://www.larsentoubro.com/pressreleases/2025-10-31-lt-and-ga-asi-announce-strategic-partnership-for-male-rpas-manufacture-in-india",
    "L&T proposes to bid as prime for the 87-MALE requirement with GA-ASI technology partnership.",
    "2025-10-31",
  ],
  [
    "adani",
    "Defence & Aerospace annual report",
    "Adani Enterprises",
    "https://connect.adani.com/annual_report/2025/ael/defence-aerospace.html",
    "Drishti MALE and existing technology ecosystem. Shield integration openness is analyst judgement.",
    "2025",
  ],
  [
    "mdl",
    "Autonomous underwater R&D disclosure",
    "Mazagon Dock",
    "https://mazagondock.in/images/pdf/Intimation_under_Regulation_30_SEBI_LODR_25042023.pdf",
    "Supplied R&D disclosure for underwater and autonomous platforms; programme availability requires diligence.",
    "2023-04-25",
  ],
  [
    "drdo-aero",
    "Aeronautical Systems cluster",
    "DRDO",
    "https://drdo.gov.in/drdo/en/organisation/technology-cluster/aeronautical-systems",
    "ADE / CABS aeronautical systems R&D context; Shield attachment is a hypothesis.",
    "",
  ],
  [
    "nstl",
    "Underwater defence technology foresight",
    "DRDO",
    "https://drdo.gov.in/drdo/en/offerings/technology-foresight/underwater-defence-technologies",
    "Underwater autonomy, cooperative control and AI/ML technology context.",
    "",
  ],
  [
    "newspace-swarm",
    "Heterogeneous fixed-wing swarm demonstration",
    "NewSpace Research & Technologies",
    "https://www.linkedin.com/posts/newspacert_cuttingedge-swarming-mosaic-activity-7187300623866818561-wxH4",
    "Official company posting states heterogeneous fixed-wing swarm competence; no Shield involvement.",
    "2024",
  ],
  [
    "adani-elbit",
    "Adani / Elbit UAV manufacturing",
    "Adani Enterprises",
    "https://www.adani.com/newsroom/media-releases/adani-defence-and-aerospace-and-elbit-systems-inaugurate-india-first-private-uav-manufacturing",
    "Adani / Elbit Hyderabad manufacturing facility for Hermes 900; existing foreign technology partnership.",
    "2018-12-14",
  ],
  [
    "talon",
    "Northrop Talon IQ flies Hivemind",
    "Shield AI",
    "https://shield.ai/northrop-grummans-talon-iq-flies-shield-ais-hivemind-software/",
    "Third-party prime flight-test integration; capability proof, not Indian programme selection.",
    "2026",
  ],
  [
    "catalyst",
    "Hivemind Catalyst trial",
    "Shield AI",
    "https://shield.ai/announcing-the-hivemind-catalyst-trial-program-a-faster-path-to-first-flight/",
    "Time-bounded integration trial offering; an Indian 60–90-day pilot is a proposed planning target.",
    "",
  ],
].map(([id, title, organisation, url, claim, date]) => ({
  id,
  title,
  organisation,
  url,
  claim,
  date: date || undefined,
  group:
    organisation === "Shield AI"
      ? "Shield AI official"
      : [
            "HAL",
            "BEL",
            "NewSpace Research & Technologies",
            "Tata Advanced Systems",
            "GRSE",
            "BDL",
            "L&T",
            "Adani Enterprises",
            "Mazagon Dock",
          ].includes(organisation)
        ? "Indian OEM official"
        : "Government of India official",
  verification: "checked",
}));
const claims: Record<string, string> = {
  "india-contract":
    "Indian Army selection includes V-BAT and Hivemind SDK licenses; JSW Hyderabad manufacturing partnership. No Indian package price or Shield net revenue disclosed.",
  "dac-july":
    "July 2026 AoN includes NSUAS, fixed-wing HAPS and jet-based kamikaze drones. Individual programme values are not separated.",
  netherlands:
    "Netherlands Navy acquiring 12 V-BAT aircraft and planning eight vessel installations. This does not establish Indian quantities.",
  tactical:
    "Reuters attributes the upcoming drone-buy pipeline to an industry body. The ₹20,000 Cr model convention is approximate, not an official line item.",
  "tactical-republication":
    "Reuters republication supports a >$2 billion industry pipeline with 18–24-month deliveries; not an MoD award.",
  "male-it":
    "Early reporting of 87 tri-service MALE aircraft at approximately ₹20,000 Cr. Later estimates differ.",
  sbs: "Reported 52-satellite SBS-III plan at ₹26,968 Cr, split 21 ISRO and 31 private. Not an official line item or Shield contract.",
  novi: "On-orbit satellite autonomy demonstration; six physical/virtual spacecraft. Capability proof only.",
  mhi: "MHI integration reached autonomous flight tests in under 60 days; proof of integration, not an Indian programme.",
  singapore:
    "RSAF / DSTA partnership for sovereign mission-autonomy development with Hivemind Enterprise.",
  taiwan:
    "Thunder Tiger multi-asset maritime teaming demonstration; capability proof only.",
  "cca-proof":
    "USAF production contract for mission autonomy; no Indian CCA procurement implied.",
  aechelon:
    "Synthetic reality and sensor / mission simulation across over 1,200 allied training systems.",
  benchmark: "Post-flight evaluation, debrief and readiness analytics product.",
  vision: "ViDAR, Tracker and Tracker C-UAS perception product family.",
  rtx: "RTX and Shield AI partnership includes MTS / ViDAR integration.",
  lucas: "Shield AI selection for LUCAS swarming autonomy.",
  hivemind:
    "Enterprise supports customer-owned autonomy development; Solutions provides integrated mission autonomy.",
  xbat: "Future autonomous combat aircraft. Development roadmap is not an Indian order.",
};
function groupFor(org: string): SourceGroup {
  return org === "Shield AI"
    ? "Shield AI official"
    : /Reuters|Times|Today|PRS/.test(org)
      ? "reputable reported / media"
      : "Government of India official";
}
export const registry: StrategySource[] = [
  ...existing.map((s) => ({
    ...s,
    group: groupFor(s.organisation),
    claim: claims[s.id] || s.note || s.title,
    verification: "prior audit" as const,
  })),
  ...extra,
];
export const registryById = Object.fromEntries(registry.map((s) => [s.id, s]));
export const groups: SourceGroup[] = [
  "Government of India official",
  "Shield AI official",
  "Indian OEM official",
  "reputable reported / media",
  "model assumption",
];
