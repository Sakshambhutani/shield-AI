import { useState, useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Network,
  Layers,
  Play,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
  Calendar,
  Building2,
  BarChart3,
  Repeat,
  Flag,
  BookOpen,
  Home,
  Check,
} from "lucide-react";
import {
  StrategyProvider,
  Source,
  Badge,
  Methodology,
  useStrategy,
} from "./shared";
import { cells } from "./cells";
import { accounts } from "./accounts";
import { registry, groups } from "./sources";
import { totals, money } from "./model";
const BottomUp = lazy(() => import("./BottomUp"));
const TopDown = lazy(() => import("./TopDown"));
const nav = [
  ["/", "Executive thesis", Home],
  ["/top-down", "Top-down", Layers],
  ["/bottom-up", "Bottom-up", Network],
  ["/roadmap", "18-month roadmap", Calendar],
  ["/operating-model", "Operating model", Building2],
  ["/md-dashboard", "MD dashboard", BarChart3],
  ["/cadence", "Operating cadence", Repeat],
  ["/goals", "Goals & KPIs", Flag],
  ["/sources", "Sources & assumptions", BookOpen],
] as const;
const stories = [
  [
    "/top-down",
    "India is spending at scale.",
    "Start with the official budget hierarchy; acquisition is only one part of defence spending.",
  ],
  [
    "/top-down",
    "But budget is not TAM.",
    "Narrow the tree to military missions and individually identifiable programmes.",
  ],
  [
    "/bottom-up?view=graph",
    "Who can Shield actually sell to?",
    "Follow product, Indian platform, user, technical authority and acquisition chain.",
  ],
  [
    "/bottom-up?view=radar",
    "Why these accounts?",
    "Openness and platform leverage matter alongside programme size. Open a cell to inspect its decision chain.",
  ],
  [
    "/bottom-up#scenario",
    "What is realistically quantifiable?",
    "Separate public programme values from software attach, win assumptions and Shield net revenue.",
  ],
  [
    "/roadmap",
    "What should India do in 18 months?",
    "Execute the beachhead, demonstrate integrations, and earn the right to scale.",
  ],
  [
    "/operating-model",
    "How should the organisation run it?",
    "Connect government capture, customer engineering and industrial delivery through a clear operating cadence.",
  ],
  [
    "/md-dashboard",
    "How does the MD know it is working?",
    "Review evidence of execution and programme movement; keep bookings distinct from modelled pipeline.",
  ],
  [
    "/goals",
    "What decisions are needed now?",
    "Choose the first integration partners, define pilot gates and approve the capacity needed to execute.",
  ],
];
function Thesis() {
  const { assumptions, horizon } = useStrategy();
  const t = totals(assumptions, horizon);
  return (
    <div className="s-page">
      <section className="s-hero s-home-hero">
        <div className="s-hero-top">
          <span className="s-kicker">
            <i />
            INDIA / STRATEGY & EXECUTION
          </span>
          <span className="s-asof">PUBLIC-SOURCE ANALYSIS · 05 SEP 2026</span>
        </div>
        <div className="s-home-layout">
          <div>
            <h1>
              Earn the beachhead.
              <br />
              <span>Scale the autonomy.</span>
            </h1>
            <p className="s-home-thesis">
              V-BAT is the beachhead; Hivemind is the multiplier; Indian primes
              are the scaling route.
            </p>
            <p className="s-home-sub">
              An evidence-led view of who buys, builds and decides in India’s
              military autonomy ecosystem.
            </p>
            <Link to="/bottom-up" className="s-button primary">
              Explore the bottom-up thesis <ArrowRight size={17} />
            </Link>
          </div>
          <div
            className="s-strategy-art"
            aria-label="Strategy sequence: operational proof, sovereign integration, programme scale"
          >
            <div className="s-art-rings" />
            <div className="s-art-cross" />
            <span className="s-art-label">INDIA / MISSION AUTONOMY</span>
            <div className="s-art-node one">
              <span>01</span>
              <strong>V-BAT</strong>
              <small>OPERATIONAL PROOF</small>
            </div>
            <div className="s-art-node two">
              <span>02</span>
              <strong>HIVEMIND</strong>
              <small>SOVEREIGN INTEGRATION</small>
            </div>
            <div className="s-art-node three">
              <span>03</span>
              <strong>INDIAN PRIMES</strong>
              <small>PROGRAMME SCALE</small>
            </div>
            <span className="s-art-coordinate">
              CAPABILITY → CREDIBILITY → CAPTURE
            </span>
          </div>
        </div>
      </section>
      <div className="s-headline-grid">
        <article>
          <small>THE EXISTING FOOTHOLD</small>
          <strong>Army selected</strong>
          <p>V-BAT + Hivemind SDK</p>
          <Source id="india-contract" />
        </article>
        <article>
          <small>BOTTOM-UP COVERAGE</small>
          <strong>{cells.length} cells</strong>
          <p>Programme / platform pursuit hypotheses</p>
          <Badge kind="model" />
        </article>
        <article>
          <small>INDUSTRIAL ROUTE</small>
          <strong>JSW / India</strong>
          <p>Hyderabad V-BAT manufacturing partnership</p>
          <Source id="india-contract" />
        </article>
        <article>
          <small>QUANTIFIED GROSS LAYER</small>
          <strong>{money(t.gross)}</strong>
          <p>Current scenario · {horizon}-month coverage</p>
          <Badge kind="model" />
        </article>
        <article>
          <small>CAPTURE-WEIGHTED VALUE</small>
          <strong>{money(t.weighted)}</strong>
          <p>Planning value · not Shield revenue</p>
          <Badge kind="model" />
        </article>
      </div>
      <div className="s-entry-grid">
        <Link to="/top-down">
          <div>
            <Layers size={24} />
            <span>01 / THE BUDGET LENS</span>
          </div>
          <h2>Where is India spending?</h2>
          <p>
            Defence budget → acquisition heads → programme pools → Shield
            product wedges.
          </p>
          <footer>
            Explore the top-down opportunity <ArrowUpRight size={22} />
          </footer>
        </Link>
        <Link to="/bottom-up" className="featured">
          <div>
            <Network size={24} />
            <span>02 / THE ACCOUNT LENS</span>
          </div>
          <h2>Where can Shield win?</h2>
          <p>
            Find the platform owner, understand decision power, qualify the
            architecture and size the addressable layer.
          </p>
          <footer>
            Explore the bottom-up opportunity <ArrowUpRight size={22} />
          </footer>
        </Link>
      </div>
      <div className="s-home-insights">
        <span className="s-kicker">THE EXECUTIVE ARGUMENT</span>
        <h2>
          Operational credibility opens the door.
          <br />
          <span>Indian ownership makes it scalable.</span>
        </h2>
        <div>
          {[
            [
              "Sovereign tooling",
              "Enterprise enables Indian engineers to build and own mission autonomy; Singapore is the government-development precedent.",
              "singapore",
            ],
            [
              "A real maritime second domain",
              "NSUAS, autonomous surface craft and submersible vessels create military demand signals; integration access still needs proof.",
              "dac-july",
            ],
            [
              "An earlier simulation wedge",
              "Synthetic T&E and debrief pilots can create a technical relationship before platform-scale autonomy procurement.",
              "aechelon",
            ],
          ].map(([title, body, id]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
              <Source id={id} />
              <Badge kind="model" label="MODEL · INDIA IMPLICATION" />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
const scaffolds: Record<
  string,
  {
    eyebrow: string;
    title: string;
    body: string;
    cards: [string, string, string][];
  }
> = {
  "/roadmap": {
    eyebrow: "03 / EXECUTION",
    title: "Earn the next programme gate.",
    body: "18-month planning scaffold. Proposed sequencing and gates; no agreed customer milestones or sales commitments.",
    cards: [
      [
        "V-BAT / JSW",
        "Execute → demonstrate → scale",
        "0–6m: delivery readiness and Army user feedback. 6–12m: shipboard demo. 12–18m: qualify follow-on demand. Depends on JSW readiness and service trial access.",
      ],
      [
        "Hivemind",
        "Workshop → integration → field trial",
        "0–6m: HAL / NewSpace architecture workshops. 6–12m: scoped integration. 12–18m: service evaluation and funded programme route. Depends on test vehicle, IP terms and engineering owner.",
      ],
      [
        "Vision Systems",
        "Interface → detect → validate",
        "Qualify perception interfaces with BEL and maritime partners; compare field detection performance against agreed baselines.",
      ],
      [
        "Aechelon / Benchmark",
        "Baseline → pilot → evaluation",
        "Define ASTE / Training Command test and debrief workflows; agree success criteria before a paid pilot proposal.",
      ],
      [
        "X-BAT",
        "Listen → shape concepts",
        "Strategic dialogue only. No 18-month revenue milestone.",
      ],
      [
        "Acquisition gates",
        "AoN / RFP → contract → delivery",
        "Advance only when service need, technical acceptance and actual funding authority are established. AoN does not guarantee award.",
      ],
    ],
  },
  "/operating-model": {
    eyebrow: "04 / ORGANISATION",
    title: "One India team. Three execution centres.",
    body: "Operating-model scaffold. Proposed responsibilities and decision rights; not a description of approved headcount or established offices.",
    cards: [
      [
        "New Delhi",
        "Government engagement / capture",
        "India MD owns account priorities, policy engagement and programme capture. Chief of Staff runs the decision log and escalations.",
      ],
      [
        "Bengaluru",
        "Autonomy engineering / customer success",
        "Engineering lead owns integration scope, verification and customer acceptance evidence; product HQ approves architecture commitments.",
      ],
      [
        "Hyderabad / JSW",
        "Manufacturing / training / MRO",
        "Joint programme lead tracks local supply chain, production readiness, training and sustainment dependencies.",
      ],
      [
        "HQ interface",
        "Product, commercial and investment decisions",
        "India recommends pursuits and partner scopes. HQ owns product roadmap, commercial commitments, IP terms and investment approval; formal delegation to be agreed.",
      ],
    ],
  },
  "/md-dashboard": {
    eyebrow: "05 / PERFORMANCE",
    title: "Measure programme progress, not optimism.",
    body: "Monthly dashboard scaffold. No live operating data is connected. Financial and delivery metrics remain “Not supplied” until authoritative internal data is available.",
    cards: [
      [
        "Bookings / weighted pipeline",
        "Not supplied",
        "Use signed bookings and qualified CRM pipeline. Keep this app’s capture-weighted planning model separate.",
      ],
      [
        "Trials / programme movement",
        "Not supplied",
        "Track demo and integration milestones, user acceptance evidence, stage changes and funding-path clarity.",
      ],
      [
        "Partner / product penetration",
        "Not supplied",
        "Active Hivemind integrations and licenses, OEM engineering owners, service relationships and trial commitments.",
      ],
      [
        "V-BAT delivery readiness",
        "Not supplied",
        "JSW production, delivery, training and sustainment readiness against an agreed baseline.",
      ],
      [
        "People / commitments",
        "Not supplied",
        "Critical roles, hiring, cash and major commitments when available.",
      ],
      [
        "Risks / decisions required",
        "Proposed review structure",
        "Name an owner, decision, deadline and consequence for each blocked gate.",
      ],
    ],
  },
  "/cadence": {
    eyebrow: "06 / RHYTHM OF BUSINESS",
    title: "A cadence that clears the next gate.",
    body: "Proposed rhythm of business. Each forum should produce a decision, an owner and evidence of progress.",
    cards: [
      [
        "Weekly",
        "Programme review",
        "India programme leads: execution, trials, blocked dependencies and next-gate decisions.",
      ],
      [
        "Fortnightly",
        "Product / customer integration",
        "Engineering, OEM and product HQ: interfaces, verification results and integration scope.",
      ],
      [
        "Monthly",
        "India operating review",
        "India MD / Chief of Staff: pipeline quality, programme movement, hiring, delivery readiness and commitments.",
      ],
      [
        "Quarterly",
        "HQ / India strategic review",
        "Reprioritise accounts and investments using validated access, mission fit and execution evidence.",
      ],
      [
        "At major gates",
        "Red-team / risk review",
        "Challenge programme openness, funding assumptions, IP rights and scope before commitment.",
      ],
    ],
  },
  "/goals": {
    eyebrow: "07 / GOALS & DECISIONS",
    title: "Turn the thesis into accountable choices.",
    body: "18-month OKR scaffold. Targets require an internal baseline and leadership agreement; proposed outcomes below are not promises.",
    cards: [
      [
        "Objective 1",
        "Make the Army beachhead referenceable",
        "Measure delivery acceptance, user feedback closure, training readiness and a validated expansion requirement. Owner: India programme lead.",
      ],
      [
        "Objective 2",
        "Prove sovereign mission-autonomy integration",
        "Measure partner architecture approvals, test-vehicle access, integration cycle time and accepted trial evidence. Owner: India engineering lead.",
      ],
      [
        "Objective 3",
        "Establish a maritime second domain",
        "Measure shipboard demonstration acceptance and a named USV/UUV technical sponsor. Owner: maritime capture lead.",
      ],
      [
        "Decision now",
        "Choose the first OEM integration candidates",
        "Qualify HAL, NewSpace, BEL and GRSE. Select by open interfaces, test readiness, engineering sponsorship and IP fit.",
      ],
      [
        "Decision now",
        "Resource the execution spine",
        "Agree Delhi capture capacity, Bengaluru integration capacity and a joint JSW delivery review.",
      ],
      [
        "Decision now",
        "Define pilot exit criteria",
        "Require mission-specific performance evidence and a credible acquisition path before scaling commitments.",
      ],
    ],
  },
};
function Scaffold() {
  const { pathname } = useLocation();
  const d = scaffolds[pathname];
  return (
    <div className="s-page">
      <header className="s-hero compact">
        <span className="s-kicker">{d.eyebrow}</span>
        <h1>{d.title}</h1>
        <p>{d.body}</p>
        <Badge kind="model" label="PLANNING SCAFFOLD · FUTURE MODULE" />
      </header>
      <div className="s-scaffold-grid">
        {d.cards.map(([title, sub, body], i) => (
          <article key={title}>
            <span className="s-kicker">
              0{i + 1} / {title}
            </span>
            <h2>{sub}</h2>
            <p>{body}</p>
            <span className="s-status">
              {pathname === "/md-dashboard"
                ? "Internal data required"
                : "Proposed · owner / target to confirm"}
            </span>
          </article>
        ))}
      </div>
      <div className="s-next-route">
        <Link to="/bottom-up" className="s-button">
          Return to account evidence <ArrowRight size={15} />
        </Link>
        {pathname === "/operating-model" && (
          <Link to="/cadence" className="s-button primary">
            Explore operating cadence <ArrowRight size={15} />
          </Link>
        )}
      </div>
    </div>
  );
}
function SourcesPage() {
  const [query, setQuery] = useState("");
  return (
    <div className="s-page">
      <header className="s-hero compact">
        <span className="s-kicker">08 / EVIDENCE & ASSUMPTIONS</span>
        <h1>Every claim has a provenance.</h1>
        <p>
          One registry across the budget and account lenses. Primary evidence
          supports the stated claim; product fit and India capture remain
          analyst judgement.
        </p>
      </header>
      <input
        className="s-source-search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search sources, publishers and claims…"
        aria-label="Search source registry"
      />
      {groups.map((group) => (
        <section className="s-source-group" key={group}>
          <h2>{group}</h2>
          {group === "model assumption" ? (
            <>
              <Methodology />
              <p>
                {cells.length} opportunity cells, {accounts.length} account
                entries and their proposed role mappings, locations to validate,
                priority tiers, horizons, product fits and next actions are
                model structure.
              </p>
              <p>
                All numeric defaults and scenario reconciliation are listed in
                ASSUMPTIONS.md in the project. Edit financial assumptions in the
                scenario panel; edit priority and power ratings in account
                briefs.
              </p>
              <Link className="s-button" to="/bottom-up#scenario">
                Open editable scenario model <ArrowRight size={15} />
              </Link>
            </>
          ) : (
            <div className="s-source-grid">
              {registry
                .filter(
                  (s) =>
                    s.group === group &&
                    `${s.title} ${s.organisation} ${s.claim}`
                      .toLowerCase()
                      .includes(query.toLowerCase()),
                )
                .map((s) => (
                  <article key={s.id}>
                    <Source id={s.id} full />
                    <p>{s.claim}</p>
                    {s.note && <small className="s-warning">{s.note}</small>}
                    <span className="s-verification">
                      {s.verification === "pending"
                        ? "CONTENT FOLLOW-UP REQUIRED"
                        : s.verification === "prior audit"
                          ? "PRIOR PHASE-1 AUDIT"
                          : "CONTENT CHECKED"}{" "}
                      · {s.date || "Date not specified"}
                    </span>
                  </article>
                ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
function Layout() {
  const [story, setStory] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setMobile(false);
    if (location.hash) {
      const timer = setTimeout(
        () =>
          document
            .getElementById(location.hash.slice(1))
            ?.scrollIntoView({ behavior: "smooth" }),
        450,
      );
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0 });
  }, [location.pathname, location.hash]);
  const step = (i: number) => {
    setStory(i);
    navigate(stories[i][0]);
  };
  return (
    <div className="strategy-shell">
      <a className="s-skip" href="#main-content">
        Skip to main content
      </a>
      <header className="s-topbar">
        <Link className="s-brand" to="/">
          <span className="s-brand-symbol">
            <Network size={22} />
          </span>
          <strong>
            SHIELD AI<span>/ INDIA</span>
          </strong>
        </Link>
        <span className="s-topbar-label">
          STRATEGY & EXECUTION <i />
          PUBLIC-SOURCE ANALYSIS
        </span>
        <button
          className="s-story-button"
          onClick={() => (story === null ? step(0) : setStory(null))}
        >
          <Play size={13} />
          {story === null ? "Story mode" : "Exit story"}
        </button>
        <button
          className="s-menu s-icon"
          onClick={() => setMobile(!mobile)}
          aria-label="Toggle navigation"
          aria-expanded={mobile}
        >
          <Menu size={21} />
        </button>
      </header>
      <div className="s-shell-body">
        <aside className={`s-sidebar ${mobile ? "open" : ""}`}>
          <span className="s-sidebar-label">THE INDIA ARGUMENT</span>
          <nav aria-label="Main navigation">
            {nav.map(([path, label, Icon], i) => (
              <NavLink end={path === "/"} key={path} to={path}>
                <Icon size={17} />
                <span>{label}</span>
                <small>{String(i).padStart(2, "0")}</small>
              </NavLink>
            ))}
          </nav>
          <div className="s-sidebar-bottom">
            <span className="s-kicker">STRATEGIC LENS</span>
            <p>
              Military missions.
              <br />
              Sovereign ownership.
              <br />
              Execution credibility.
            </p>
            <span>AS OF 5 SEPTEMBER 2026</span>
          </div>
        </aside>
        <main id="main-content" className="s-main">
          <Suspense
            fallback={<div className="s-empty">Loading strategy module…</div>}
          >
            <Routes>
              <Route path="/" element={<Thesis />} />
              <Route path="/bottom-up" element={<BottomUp />} />
              <Route
                path="/top-down"
                element={
                  <div className="s-top-down">
                    <div className="s-legacy-note">
                      <Check size={15} />
                      Phase 1 · official budget / programme hierarchy. Shared
                      scenario assumptions appear below.
                    </div>
                    <TopDown />
                  </div>
                }
              />
              {Object.keys(scaffolds).map((path) => (
                <Route key={path} path={path} element={<Scaffold />} />
              ))}
              <Route path="/sources" element={<SourcesPage />} />
              <Route
                path="*"
                element={
                  <div className="s-empty">
                    <h1>Route not found</h1>
                    <Link to="/" className="s-button">
                      Return to executive thesis
                    </Link>
                  </div>
                }
              />
            </Routes>
          </Suspense>
          <footer className="s-footer">
            <span>
              Independent strategic analysis · not affiliated with Shield AI
            </span>
            <span>Public evidence + visible assumptions. No live data.</span>
          </footer>
        </main>
      </div>
      {story !== null && (
        <div
          className="s-story"
          role="region"
          aria-label="Story mode walkthrough"
        >
          <div className="s-story-progress">
            {stories.map((_, i) => (
              <button
                key={i}
                onClick={() => step(i)}
                className={i <= story ? "complete" : ""}
                aria-label={`Story step ${i + 1}`}
                aria-current={story === i ? "step" : undefined}
              />
            ))}
          </div>
          <div className="s-story-content">
            <span>
              {String(story + 1).padStart(2, "0")}
              <small>/ 09</small>
            </span>
            <div>
              <strong>{stories[story][1]}</strong>
              <p>{stories[story][2]}</p>
            </div>
            <button
              className="s-icon"
              disabled={story === 0}
              onClick={() => step(story - 1)}
              aria-label="Previous story step"
            >
              <ChevronLeft size={21} />
            </button>
            <button
              className="s-button primary"
              onClick={() => (story === 8 ? setStory(null) : step(story + 1))}
            >
              {story === 8 ? "Finish" : "Next"}
              <ChevronRight size={16} />
            </button>
            <button
              className="s-icon"
              onClick={() => setStory(null)}
              aria-label="Close story mode"
            >
              <X size={19} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default function Shell() {
  return (
    <BrowserRouter>
      <StrategyProvider>
        <Layout />
      </StrategyProvider>
    </BrowserRouter>
  );
}
