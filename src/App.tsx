import BudgetLens from "./BudgetLens";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  useReactFlow,
} from "@xyflow/react";
import type { Node, NodeProps, Edge } from "@xyflow/react";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronRight,
  RotateCcw,
  Play,
  Pause,
  Shield,
  Network,
  Building2,
  Anchor,
  Plane,
  Satellite,
  Crosshair,
  ExternalLink,
  X,
  SlidersHorizontal,
  BookOpen,
  Layers,
  Check,
  Info,
  Radar,
  Expand,
} from "lucide-react";
import {
  opportunities,
  nodeById,
  childrenOf,
  productList,
  serviceList,
  evidenceLabels,
  horizonLabels,
  routeLabels,
} from "./data/opportunities";
import type {
  OpportunityNode,
  EvidenceType,
  Product,
  Service,
  Horizon,
} from "./data/opportunities";
import { sources, sourceById } from "./data/sources";
import { pathTo, eligibleNodes, visibleNodes } from "./graph";
import { ScenarioPanel } from "./strategy/shared";

const colors: Record<EvidenceType, string> = {
  "official-budget": "#75baff",
  "official-programme": "#e9bf6a",
  "reported-programme": "#ed975b",
  "shield-proof": "#79d9ac",
  "model-assumption": "#ba9bf4",
  ecosystem: "#8996a5",
};
const stageNames = [
  "Strategic opportunity",
  "Customer ecosystem",
  "Mission domain",
  "Programme signal",
  "Product / wedge",
  "International proof",
];
function SourceLink({
  id,
  compact = false,
}: {
  id: string;
  compact?: boolean;
}) {
  const s = sourceById[id];
  if (!s) return null;
  return (
    <a
      className={`source-link ${compact ? "compact" : ""}`}
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      title={s.title}
    >
      <ExternalLink size={compact ? 10 : 13} />
      <span>
        {s.organisation}
        {s.date ? ` · ${s.date}` : ""}
        {!compact && (
          <small>
            {s.title}
            {s.note && <em>{s.note}</em>}
          </small>
        )}
      </span>
    </a>
  );
}
function NodeIcon({ n }: { n: OpportunityNode }) {
  const Icon =
    n.kind === "channel"
      ? Network
      : n.kind === "proof"
        ? Check
        : n.kind === "product"
          ? Layers
          : n.service === "Navy" || n.service === "Coast Guard"
            ? Anchor
            : n.service === "Air Force"
              ? Plane
              : n.service === "Military Space" || n.id === "space"
                ? Satellite
                : n.service === "Army"
                  ? Crosshair
                  : n.id === "mod"
                    ? Building2
                    : n.id === "mha"
                      ? Radar
                      : Shield;
  return <Icon size={17} />;
}
type CardData = {
  item: OpportunityNode;
  active: boolean;
  expanded: boolean;
  count: number;
  onSelect: (id: string) => void;
};
type CardNode = Node<CardData, "opportunity">;
function OpportunityCard({ data }: NodeProps<CardNode>) {
  const { item: n, active, expanded, count, onSelect } = data;
  return (
    <article
      className={`map-card ${n.kind} ${active ? "active" : ""} ${n.priority === "context" ? "muted" : ""}`}
      style={{ "--node-color": colors[n.evidenceType] } as CSSProperties}
    >
      {n.level > 0 && <Handle type="target" position={Position.Left} />}
      <button
        className="card-main nodrag"
        onClick={(event) => {
          event.stopPropagation();
          if (event.detail < 2) onSelect(n.id);
        }}
        aria-expanded={count ? expanded : undefined}
        aria-label={`${n.label}${count ? `, ${expanded ? "collapse" : "expand"} ${count} children` : n.kind === "proof" ? ", open source" : ""}`}
      >
        <div className="card-eyebrow">
          <NodeIcon n={n} />
          <span>
            {n.kind === "channel"
              ? "GO-TO-MARKET ROUTE"
              : n.id === "mod"
                ? "CORE · FY2026–27"
                : n.id === "space"
                  ? "CORE-STRATEGIC"
                  : n.id === "mha"
                    ? "SECONDARY ADJACENCY"
                    : n.kind === "root"
                      ? "DEFENCE ONLY"
                      : n.kind === "product"
                        ? "SHIELD AI PRODUCT"
                        : n.kind === "proof"
                          ? "INTERNATIONAL / CAPABILITY PROOF"
                          : stageNames[n.level]}
          </span>
          {n.kind === "proof" ? (
            <ArrowUpRight size={14} />
          ) : count ? (
            <span className="child-count">
              {count}
              <ChevronRight size={12} className={expanded ? "rotated" : ""} />
            </span>
          ) : null}
        </div>
        <h3>{n.label}</h3>
        {n.valueLabel && <div className="node-value">{n.valueLabel}</div>}
        <p>{n.description}</p>
      </button>
      <div className="card-bottom">
        <span className="evidence-mini">
          <i />
          {n.kind === "context"
            ? "Official context · excluded"
            : evidenceLabels[n.evidenceType]}
        </span>
        {n.confidence && <span className="confidence">{n.confidence}</span>}
      </div>
      {n.sourceIds[0] && (
        <div className="node-source nodrag">
          <SourceLink id={n.sourceIds[0]} compact />
        </div>
      )}
      {count > 0 && <Handle type="source" position={Position.Right} />}
    </article>
  );
}
const nodeTypes = { opportunity: OpportunityCard };
function EvidenceDrawer({
  node,
  onClose,
}: {
  node: OpportunityNode;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, [node.id]);
  return (
    <aside className="evidence-drawer" aria-label="Evidence drawer">
      <div className="drawer-top">
        <span className="micro">
          EVIDENCE FILE / {node.kind?.toUpperCase()}
        </span>
        <button
          ref={closeRef}
          className="icon-button"
          onClick={onClose}
          aria-label="Close evidence drawer"
        >
          <X size={17} />
        </button>
      </div>
      <div className="drawer-title">
        <span style={{ color: colors[node.evidenceType] }}>
          <NodeIcon n={node} />
        </span>
        <h2>{node.label}</h2>
      </div>
      {node.valueLabel && (
        <div
          className="drawer-value"
          style={{ color: colors[node.evidenceType] }}
        >
          {node.valueLabel}
        </div>
      )}
      <div className="status-tag" style={{ color: colors[node.evidenceType] }}>
        <span className="dot" />
        {evidenceLabels[node.evidenceType]}
      </div>
      {node.horizon && (
        <div className="executive-tags">
          <span>
            <small>TIME HORIZON</small>
            {horizonLabels[node.horizon]}
          </span>
          <span>
            <small>CONFIDENCE IN FIT</small>
            {node.confidence}
          </span>
          <span>
            <small>ROUTE TO MARKET</small>
            {node.routeToMarket?.map((r) => routeLabels[r]).join(" / ")}
          </span>
        </div>
      )}
      <section>
        <h4>What this represents</h4>
        <p>{node.description}</p>
      </section>
      {node.facts && (
        <dl className="facts">
          {node.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
              <SourceLink id={f.sourceIds[0]} compact />
            </div>
          ))}
        </dl>
      )}
      {node.whyShield && (
        <section>
          <h4>Why it fits Shield AI</h4>
          <p>{node.whyShield}</p>
        </section>
      )}
      <section className="not-infer">
        <h4>What it does NOT mean</h4>
        <p>
          {node.notToInfer ??
            "An ecosystem or mission node does not represent a separately additive budget, contract award or revenue forecast."}
        </p>
      </section>
      <section>
        <h4>Sources & evidence</h4>
        {node.sourceIds.length ? (
          node.sourceIds.map((id) => <SourceLink id={id} key={id} />)
        ) : (
          <p>
            Analyst organisation of the opportunity map. Explore programme
            children for primary evidence.
          </p>
        )}
      </section>
      <div className="drawer-foot">
        Priority, horizon and product fit are analyst judgements. Last
        researched: 5 September 2026.
      </div>
    </aside>
  );
}
function Briefing({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <aside className="briefing">
      <div className="micro">THE INDIA PLAYBOOK</div>
      <h2>
        Start with the beachhead.
        <br />
        <span>Scale the software.</span>
      </h2>
      <p className="briefing-intro">
        Follow the mission from public demand to a credible commercial wedge.
      </p>
      {[
        [
          "01",
          "Execute & expand",
          "Army V-BAT. Navy and Coast Guard ISR.",
          "army-vbat",
        ],
        [
          "02",
          "Enable sovereign autonomy",
          "Hivemind through Indian defence primes.",
          "sdk-india",
        ],
        [
          "03",
          "Build the next layer",
          "Perception, simulation and readiness.",
          "simulators",
        ],
        [
          "04",
          "Create strategic options",
          "Maritime autonomy. Military space.",
          "sbs-programme",
        ],
      ].map(([num, title, body, id]) => (
        <button
          key={num}
          className="playbook-item"
          onClick={() => onSelect(id)}
        >
          <span>{num}</span>
          <div>
            <strong>{title}</strong>
            <p>{body}</p>
          </div>
          <ArrowUpRight size={15} />
        </button>
      ))}
      <div className="briefing-note">
        <Shield size={18} />
        <p>
          <strong>Defence is the boundary.</strong> Civil space and broad
          home-affairs spending are context, not addressable markets.
        </p>
      </div>
    </aside>
  );
}
function Taxonomy() {
  return (
    <details className="disclosure">
      <summary>
        <span className="section-icon">
          <Plane size={19} />
        </span>
        <span>
          <strong>India vs U.S. UAS taxonomy</strong>
          <small>Where V-BAT sits — an approximate crosswalk</small>
        </span>
        <ChevronRight className="disclosure-chevron" size={18} />
      </summary>
      <div className="disclosure-content">
        <div className="taxonomy-highlight">
          <strong>V-BAT · ~75 kg</strong>
          <span>
            India: <b>Medium UAS</b>
          </span>
          <span>
            U.S.: <b>Group 3</b>
          </span>
          <SourceLink id="vbat" />
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>India · IMTAR-21 Ver 2.0</th>
                <th>Weight class</th>
                <th>Approximate U.S. crosswalk</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Small UAS</td>
                <td>&lt;25 kg</td>
                <td>Group 1 + Group 2</td>
              </tr>
              <tr>
                <td>Medium UAS</td>
                <td>25–150 kg</td>
                <td>Lower / mid Group 3</td>
              </tr>
              <tr>
                <td>Large UAS</td>
                <td>&gt;150 kg</td>
                <td>Upper Group 3 / Group 4 / Group 5</td>
              </tr>
              <tr>
                <td>Weaponised UAS</td>
                <td>Any weight</td>
                <td>Additional weapon-integration certification</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Explanatory crosswalk only: Indian categories do not equal U.S. DoD
          Groups 1–5, which also depend on altitude and speed. It is not a
          certification determination.
        </p>
        <SourceLink id="taxonomy-current" />
        <SourceLink id="taxonomy-page" />
        <SourceLink id="india-contract" />
      </div>
    </details>
  );
}
function Methodology() {
  return (
    <details className="disclosure">
      <summary>
        <span className="section-icon">
          <BookOpen size={19} />
        </span>
        <span>
          <strong>Methodology & source register</strong>
          <small>Last researched: 5 September 2026</small>
        </span>
        <span className="summary-label">{sources.length} REFERENCES</span>
        <ChevronRight className="disclosure-chevron" size={18} />
      </summary>
      <div className="disclosure-content">
        <ul className="method-list">
          {[
            "Official Government of India / Parliament sources first.",
            "Shield AI’s own site supports product capabilities and international precedents.",
            "Reuters / high-quality media only where an individual programme value is not officially disclosed.",
            "Never assign full DAC bundle values to individual systems.",
            "Never count civil Department of Space expenditure as defence TAM.",
            "Never add annual budgets to multi-year programmes.",
            "International precedent shows capability / GTM pattern, not guaranteed India demand.",
            "Every Shield-fit percentage is an editable assumption. Priorities and time horizons are analyst judgements, not official schedules.",
          ].map((rule) => (
            <li key={rule}>
              <Check size={14} />
              {rule}
            </li>
          ))}
        </ul>
        <div className="source-register">
          {sources.map((s) => (
            <SourceLink id={s.id} key={s.id} />
          ))}
        </div>
      </div>
    </details>
  );
}
export default function App() {
  const [expanded, setExpanded] = useState(new Set(["india"]));
  const [selected, setSelected] = useState("india");
  const [drawer, setDrawer] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | "">("");
  const [service, setService] = useState<Service | "">("");
  const [horizon, setHorizon] = useState<Horizon | "">("");
  const [walking, setWalking] = useState(false);
  const [walkIndex, setWalkIndex] = useState(0);
  const [viewTick, setViewTick] = useState(0);
  const flow = useReactFlow<CardNode>();
  const allowed = useMemo(
    () => eligibleNodes({ product, service, horizon }),
    [product, service, horizon],
  );
  const visible = useMemo(
    () => visibleNodes(expanded, allowed),
    [expanded, allowed],
  );
  const activePath = pathTo(selected);
  const selectedNode = nodeById[selected];
  const select = (id: string) => {
    const n = nodeById[id];
    if (n.kind === "proof") {
      window.open(
        sourceById[n.sourceIds[0]].url,
        "_blank",
        "noopener,noreferrer",
      );
      setSelected(id);
      setDrawer(id);
      return;
    }
    setWalking(false);
    setSelected(id);
    setDrawer(id === "india" ? null : id);
    setExpanded((old) => {
      const next = new Set(old);
      const path = pathTo(id);
      path.slice(0, -1).forEach((p) => next.add(p));
      if (next.has(id)) {
        next.delete(id);
        for (const p of opportunities)
          if (pathTo(p.id).includes(id) && p.id !== id) next.delete(p.id);
      } else next.add(id);
      return next;
    });
    setViewTick((t) => t + 1);
  };
  const jump = (id: string) => {
    setProduct("");
    setService("");
    setHorizon("");
    setWalking(false);
    setSelected(id);
    setDrawer(id);
    setExpanded(new Set(pathTo(id)));
    setViewTick((t) => t + 1);
  };
  const reset = () => {
    setProduct("");
    setService("");
    setHorizon("");
    setExpanded(new Set(["india"]));
    setSelected("india");
    setDrawer(null);
    setWalking(false);
    setViewTick((t) => t + 1);
  };
  useEffect(() => {
    if (!product && !service && !horizon) return;
    setExpanded(
      new Set(
        opportunities
          .filter((n) => allowed.has(n.id) && n.level < 3)
          .map((n) => n.id),
      ),
    );
    setSelected("india");
    setDrawer(null);
    setWalking(false);
    setViewTick((t) => t + 1);
  }, [product, service, horizon, allowed]);
  const nodes: CardNode[] = useMemo(() => {
    const groups = Array.from({ length: 6 }, (_, i) =>
      visible.filter((n) => n.level === i),
    );
    return visible.map((n) => {
      const group = groups[n.level];
      const index = group.findIndex((x) => x.id === n.id);
      const related =
        selected === "india" ||
        activePath.includes(n.id) ||
        pathTo(n.id).includes(selected);
      const context = n.priority === "context";
      const opacity = related
        ? context
          ? 0.48
          : n.priority === "adjacency" && selected === "india"
            ? 0.58
            : 1
        : 0.24;
      return {
        id: n.id,
        type: "opportunity",
        position: {
          x: n.level * 390,
          y: (index - (group.length - 1) / 2) * 224,
        },
        data: {
          item: n,
          active: n.id === selected,
          expanded: expanded.has(n.id),
          count: childrenOf(n.id).filter((x) => allowed.has(x.id)).length,
          onSelect: select,
        },
        style: { opacity, transition: "opacity 240ms ease" },
        draggable: false,
        selectable: false,
      };
    });
  }, [visible, selected, expanded, allowed]);
  const edges: Edge[] = visible.flatMap((n) =>
    n.parentIds
      .filter((p) => visible.some((x) => x.id === p))
      .map((p) => ({
        id: `${p}->${n.id}`,
        source: p,
        target: n.id,
        type: "smoothstep",
        style: {
          stroke: activePath.includes(n.id) ? "#72c8b3" : "#364553",
          strokeWidth: activePath.includes(n.id) ? 2 : 1,
          opacity:
            selected === "india" || activePath.includes(n.id) || p === selected
              ? 0.8
              : 0.22,
        },
        animated: walking && activePath.includes(n.id),
      })),
  );
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const focus = nodes.filter(
        (n) =>
          selected === "india" ||
          n.id === selected ||
          n.data.item.parentIds.includes(selected) ||
          n.id === selectedNode.parentIds[0],
      );
      void flow.fitView({
        nodes: focus.length ? focus : nodes,
        padding: 0.14,
        duration: 500,
        minZoom: 0.25,
        maxZoom: 1,
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [viewTick, nodes.length, drawer]);
  const walk = [
    "india",
    "mod",
    "navy",
    "nsuas",
    "nsuas::V-BAT",
    "nsuas::V-BAT::nl",
  ];
  useEffect(() => {
    if (!walking) return;
    const id = walk[walkIndex];
    setSelected(id);
    setExpanded(new Set(pathTo(id)));
    setDrawer(walkIndex > 1 ? id : null);
    setViewTick((t) => t + 1);
    const t = window.setTimeout(() => {
      if (walkIndex === walk.length - 1) setWalking(false);
      else setWalkIndex((i) => i + 1);
    }, 2400);
    return () => clearTimeout(t);
  }, [walking, walkIndex]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawer(null);
        setWalking(false);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  return (
    <>
      <header className="site-header">
        <a
          href="#"
          className="wordmark"
          onClick={(e) => {
            e.preventDefault();
            reset();
          }}
        >
          <span className="brand-icon">
            <Network size={21} />
          </span>
          <strong>
            SHIELD AI <span>/ INDIA</span>
          </strong>
        </a>
        <div className="header-meta">
          <span className="live-dot" />
          STRATEGIC OPPORTUNITY MAP
          <span className="header-divider" />
          05 SEP 2026
        </div>
        <span className="private-label">PUBLIC-SOURCE ANALYSIS</span>
      </header>
      <main>
        <section className="intro">
          <div className="eyebrow">
            DEFENCE & AUTONOMY <span>/</span> INDIA OPPORTUNITY MAP
          </div>
          <h1>
            V-BAT is the beachhead. <span>Hivemind is the multiplier.</span>
          </h1>
          <p className="thesis">
            Air, sea, space, weapons, perception and simulation — but only where
            the mission is defence.
          </p>
          <p className="qualification">
            <Info size={13} />
            Budgets are not TAM. The tree separates official annual spend,
            programme signals, reported programme values and modelled
            Shield-fit.
          </p>
        </section>
        <section className="explorer" aria-label="Interactive opportunity map">
          <div className="explorer-toolbar">
            <div className="view-heading">
              <Network size={18} />
              <h2>Explore the opportunity</h2>
              <span>CLICK TO FOLLOW A PATH</span>
            </div>
            <div className="toolbar-actions">
              <button
                className={`button ${walking ? "active-button" : ""}`}
                onClick={() => {
                  if (walking) {
                    setWalking(false);
                    return;
                  }
                  setProduct("");
                  setService("");
                  setHorizon("");
                  setWalkIndex(0);
                  setWalking(true);
                }}
              >
                {walking ? <Pause size={14} /> : <Play size={14} />}{" "}
                {walking ? "Pause walkthrough" : "Walk the core path"}
              </button>
              <button className="button quiet" onClick={reset}>
                <RotateCcw size={14} />
                Reset
              </button>
            </div>
          </div>
          <div className="filters">
            <div className="filter-row">
              <span className="filter-label">PRODUCT</span>
              <button
                className={!product ? "chip selected" : "chip"}
                onClick={() => {
                  setProduct("");
                  setViewTick((t) => t + 1);
                }}
                aria-pressed={!product}
              >
                All products
              </button>
              {productList.map((p) => (
                <button
                  className={`chip ${product === p ? "selected" : ""} ${p === "Hivemind" ? "hivemind-chip" : ""}`}
                  onClick={() => setProduct(product === p ? "" : p)}
                  aria-pressed={product === p}
                  key={p}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="filter-row secondary-filters">
              <span className="filter-label">SERVICE</span>
              <select
                aria-label="Filter by service"
                value={service}
                onChange={(e) => setService(e.target.value as Service | "")}
              >
                <option value="">All services & ecosystems</option>
                {serviceList.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <span className="filter-label horizon-label">HORIZON</span>
              <div className="horizon-chips">
                {(["", "0-18m", "18-36m", "3y+"] as const).map((h) => (
                  <button
                    key={h}
                    aria-pressed={horizon === h}
                    className={`chip ${horizon === h ? "selected" : ""}`}
                    onClick={() => setHorizon(h)}
                  >
                    {h === ""
                      ? "All horizons"
                      : h === "0-18m"
                        ? "0–18m"
                        : h === "18-36m"
                          ? "18–36m"
                          : "3+y"}
                  </button>
                ))}
              </div>
              {(product || service || horizon) && (
                <button className="text-button" onClick={reset}>
                  Clear filters <X size={12} />
                </button>
              )}
            </div>
          </div>
          <div className="breadcrumb" aria-label="Active path">
            <span className="micro">PATH</span>
            {activePath.map((id, i) => (
              <span key={id}>
                {i > 0 && <ChevronRight size={12} />}
                <button onClick={() => select(id)}>
                  {id === "india" ? "India opportunity" : nodeById[id].label}
                </button>
              </span>
            ))}
          </div>
          {(selected === "india" || activePath.includes("mod")) && (
            <BudgetLens onMission={jump} />
          )}
          <div className="map-workspace">
            <div className="graph-area">
              <div className="graph-caption">
                <span className="dot" />{" "}
                {selected === "india"
                  ? "START WITH A CUSTOMER ECOSYSTEM"
                  : `${stageNames[selectedNode.level].toUpperCase()} → ${stageNames[Math.min(selectedNode.level + 1, 5)].toUpperCase()}`}
              </div>
              {visible.length > 0 ? (
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  nodeTypes={nodeTypes}
                  minZoom={0.15}
                  maxZoom={1.6}
                  fitView
                  fitViewOptions={{ padding: 0.14, maxZoom: 1 }}
                  onNodeClick={(event, node) => {
                    if (event.detail < 2) select(node.id);
                  }}
                  zoomOnDoubleClick={false}
                  nodesDraggable={false}
                  nodesConnectable={false}
                  elementsSelectable={false}
                  colorMode="dark"
                  onPaneClick={() => setDrawer(null)}
                >
                  <Background color="#26303c" gap={24} size={1} />
                  <Controls showInteractive={false} />
                </ReactFlow>
              ) : (
                <div className="empty-state">
                  <SlidersHorizontal size={28} />
                  <h3>No opportunities match these filters.</h3>
                  <p>Try another product, service or horizon.</p>
                  <button className="button" onClick={reset}>
                    Clear filters
                  </button>
                </div>
              )}
              <button
                className="fit-button"
                onClick={() =>
                  void flow.fitView({ padding: 0.12, duration: 500 })
                }
              >
                <Expand size={13} />
                Fit all visible
              </button>
              <div className="graph-hint">
                Drag to pan · Scroll to zoom · Click cards to explore
              </div>
            </div>
            {drawer ? (
              <EvidenceDrawer
                node={nodeById[drawer]}
                onClose={() => setDrawer(null)}
              />
            ) : (
              <Briefing onSelect={jump} />
            )}
          </div>
          <div className="legend" aria-label="Evidence legend">
            <span className="micro">EVIDENCE KEY</span>
            {(
              [
                "official-budget",
                "official-programme",
                "reported-programme",
                "model-assumption",
                "shield-proof",
                "ecosystem",
              ] as EvidenceType[]
            ).map((e) => (
              <span key={e}>
                <i style={{ background: colors[e] }} />
                {e === "official-budget"
                  ? "Official annual budget / figure"
                  : e === "official-programme"
                    ? "AoN · individual value undisclosed"
                    : e === "reported-programme"
                      ? "Reported programme value"
                      : e === "shield-proof"
                        ? "Shield AI precedent / product proof"
                        : e === "ecosystem"
                          ? "Out of scope / context"
                          : "Shield-fit modelling assumption"}
              </span>
            ))}
          </div>
        </section>
        <section className="priority-strip" aria-label="Executive priorities">
          {[
            [
              "01",
              "Core · 0–18 months",
              "Army V-BAT · shipborne ISR · sovereign SDK",
              "army-vbat",
            ],
            [
              "02",
              "Build · 18–36 months",
              "Maritime autonomy · MALE attach · simulation",
              "male",
            ],
            [
              "03",
              "Strategic · 3+ years",
              "Military space · X-BAT · networked autonomy",
              "collaborative",
            ],
          ].map(([num, title, body, id]) => (
            <button
              key={num}
              onClick={() => {
                jump(id);
                document
                  .querySelector(".explorer")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <span className="priority-number">{num}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
              <ArrowRight size={18} />
            </button>
          ))}
        </section>
        <div className="bottom-panels">
          <ScenarioPanel />
          <Taxonomy />
          <Methodology />
        </div>
      </main>
      <footer>
        <span>
          Public-source strategic market map. Programme values may be
          estimates/reported figures and should not be interpreted as awarded
          Shield AI revenue.
        </span>
        <span>INDEPENDENT ANALYSIS · NOT AFFILIATED WITH SHIELD AI</span>
      </footer>
    </>
  );
}
