import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import type { Node, NodeProps, Edge } from "@xyflow/react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ReferenceLine,
} from "recharts";
import {
  ArrowRight,
  ArrowUpRight,
  Network,
  Radar,
  Table2,
  Building2,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  MapPin,
  BookOpen,
} from "lucide-react";
import {
  cells as rawCells,
  filterCells,
  products,
  productColors,
  precedentType,
} from "./cells";
import type { Filters } from "./cells";
import { accounts, accountById } from "./accounts";
import type { OpportunityCell, Account, Scores, ClaimRef } from "./types";
import { registryById } from "./sources";
import { money, calculate } from "./model";
import {
  Source,
  SourceList,
  Badge,
  Modal,
  ScenarioPanel,
  CellMath,
  Methodology,
  useStrategy,
  useRatedCells,
  scoreLabels,
} from "./shared";
const tabs = [
  ["graph", "Account map", Network],
  ["radar", "Account radar", Radar],
  ["power", "Decision power", Building2],
  ["table", "Opportunity cells", Table2],
  ["accounts", "Prime / OEM directory", Building2],
] as const;
export function PowerBars({ account }: { account: Account }) {
  const [power, setPower] = useState(account.power);
  useEffect(() => setPower(account.power), [account]);
  return (
    <div className="s-power-bars">
      <small>ANALYST JUDGEMENT · EDITABLE 0–5 INFLUENCE</small>
      {[
        "Mission influence",
        "Technical gatekeeping",
        "Budget / approval authority",
        "Integration / vendor selection",
      ].map((label, i) => (
        <label key={label}>
          <span>{label}</span>
          <input
            aria-label={`${account.name} ${label}`}
            type="range"
            min={0}
            max={5}
            step={0.5}
            value={power[i]}
            onChange={(e) => {
              const next = [...power] as Account["power"];
              next[i] = Number(e.target.value);
              setPower(next);
            }}
          />
          <strong>{power[i]}/5</strong>
        </label>
      ))}
    </div>
  );
}
export function DecisionChain({
  account,
  compact = false,
}: {
  account: Account;
  compact?: boolean;
}) {
  return (
    <>
      <div className={`s-decision ${compact ? "compact" : ""}`}>
        {account.chain?.map((r, i) => (
          <article key={r.title}>
            <span className="s-kicker">
              0{i + 1} /{" "}
              {
                [
                  "USER NEED",
                  "TECHNICAL GATE",
                  "ACQUISITION",
                  "INDUSTRIAL / DESIGN",
                ][i]
              }
            </span>
            <h3>{r.title}</h3>
            <p>{r.controls}</p>
            <div>
              <small>WHAT SHIELD NEEDS</small>
              <p>{r.ask}</p>
            </div>
            <footer>
              {r.stage}
              <strong>Power {r.power[i]}/5 · model</strong>
            </footer>
          </article>
        ))}
      </div>
      {account.id === "army" && (
        <div className="s-callout">
          <Badge kind="model" label="ANALYST JUDGEMENT · DISTINCT ARMY ROLES" />
          <p>
            Mission / technical / budget / integration influence:{" "}
            <strong>DCOAS (CD&S) 4 / 4 / 4 / 3</strong>;{" "}
            <strong>ADB 3 / 4 / 1 / 4</strong>;{" "}
            <strong>Field command 5 / 3 / 2.5 / 2</strong>. ADB facilitates
            industry and user access; its budget authority is not the DCOAS
            capability-planning remit.
          </p>
          <Source id="adb" />
          <Source id="army-roles" />
        </div>
      )}
    </>
  );
}
function Policy() {
  return (
    <details className="s-details">
      <summary>
        Acquisition policy · AoN is one gate in a longer process
      </summary>
      <div className="s-policy">
        <div>
          <Badge kind="official" />
          <h3>DAP-2020 capital framework</h3>
          <p>
            SPB / CISC: up to ₹300 Cr. DPB / Defence Secretary: above ₹300 Cr to
            ₹500 Cr. DAC / Raksha Mantri: above ₹500 Cr. Tendering and
            contracting then follow Service HQ / MoD delegated financial powers.
          </p>
          <Source id="dap" />
        </div>
        <div>
          <h3>Draft policy ≠ operative rule</h3>
          <p>
            DAP-2026 remains described as a draft in the official sources
            checked. The app uses DAP-2020 as its capital-process baseline as of
            5 September 2026. DPM-2025 covers revenue procurement / sustainment.
          </p>
          <Source id="dap-draft" />
          <Source id="policy-register" />
        </div>
        <div>
          <h3>Field-level powers have expanded</h3>
          <p>
            June 2026 delegation increased field-command and R&D /
            indigenisation powers. This map does not invent new sub-thresholds
            or confuse revenue delegation with capital AoN authority.
          </p>
          <Source id="delegation" />
        </div>
      </div>
    </details>
  );
}
function OpportunityDrawer({
  cell,
  onClose,
}: {
  cell: OpportunityCell;
  onClose: () => void;
}) {
  const a = accountById[cell.accountId],
    gov = accountById[cell.governmentId];
  const { setRating } = useStrategy();
  const badge =
    cell.evidenceLevel === "company-confirmed"
      ? registryById[cell.sources[0].id].group === "Shield AI official"
        ? "shield"
        : "oem"
      : cell.evidenceLevel;
  return (
    <Modal title={cell.platformOrProgram} onClose={onClose} wide side>
      <div className="s-drawer-tags">
        <Badge kind={badge} />
        <span className="s-status">{cell.status}</span>
        <span className="s-status">{cell.horizon}</span>
      </div>
      <p className="s-lead">{cell.mission}</p>
      <div className="s-account-meta">
        <span>
          <MapPin size={14} />
          {cell.primaryLocation}
        </span>
        <span>{cell.route}</span>
        <strong>Priority {cell.priorityScore}/100 · MODEL</strong>
      </div>
      <div className="s-drawer-columns">
        <section>
          <h3>Who owns the opening?</h3>
          <p>
            <strong>{a.name}</strong> → {gov.name}
          </p>
          <p>{[cell.shieldProduct, ...cell.additionalProducts].join(" + ")}</p>
          <SourceList refs={cell.sources} />
          <PowerBars account={a} />
          <h3>Recommended first move</h3>
          <div className="s-next-move">
            <ArrowUpRight size={20} />
            <p>{cell.nextMove}</p>
          </div>
          <small>MODEL · proposed action, not an agreed engagement</small>
          <h3>Target roles</h3>
          <p>{a.roles.join(" · ")}</p>
        </section>
        <section>
          <h3>Programme economics</h3>
          <dl className="s-facts">
            <div>
              <dt>Public programme value</dt>
              <dd>
                {cell.publicProgramValueCr
                  ? money(cell.publicProgramValueCr)
                  : "Not publicly separated"}
              </dd>
            </div>
            <div>
              <dt>Public quantity</dt>
              <dd>{cell.publicQuantity || "Not disclosed for this cell"}</dd>
            </div>
            <div>
              <dt>Shield AI net revenue</dt>
              <dd>Unknown</dd>
            </div>
          </dl>
          <CellMath cell={cell} />
          <h3>Constraints to qualify</h3>
          <ul>
            {cell.caveats.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
      </div>
      <h3>Four centres of decision power</h3>
      <p className="s-muted">
        Role mapping is analyst judgement; confirm programme-specific
        delegations and responsibility. A prime can control integration without
        owning the military budget.
      </p>
      <DecisionChain account={gov} compact />
      <SourceList refs={gov.sources} />
      <Policy />
      <h3>Has Shield done a version of this before?</h3>
      <div className="s-precedents">
        {cell.precedentIds.map((id) => (
          <article key={id}>
            <span
              className={`s-proof ${precedentType(id).startsWith("Capability") ? "capability" : ""}`}
            >
              {precedentType(id)}
            </span>
            <h4>{registryById[id]?.title}</h4>
            <p>{registryById[id]?.claim}</p>
            <Source id={id} />
          </article>
        ))}
      </div>
      <details className="s-details">
        <summary>
          Edit this opportunity’s priority ratings · {cell.priorityScore}/100
        </summary>
        <div className="s-ratings">
          {Object.entries(scoreLabels).map(([key, label]) => (
            <label key={key}>
              {label}
              <input
                type="range"
                min={1}
                max={5}
                step={1}
                value={cell[key as keyof Scores]}
                aria-label={label}
                onChange={(e) =>
                  setRating(cell.id, {
                    missionFit: cell.missionFit,
                    timing: cell.timing,
                    indigenisationFit: cell.indigenisationFit,
                    access: cell.access,
                    competitiveOpenness: cell.competitiveOpenness,
                    authorityClarity: cell.authorityClarity,
                    [key]: Number(e.target.value),
                  })
                }
              />
              <strong>{cell[key as keyof Scores]}/5</strong>
            </label>
          ))}
        </div>
        <Methodology />
      </details>
    </Modal>
  );
}
type PathData = {
  label: string;
  sub: string;
  stage: number;
  source: ClaimRef;
  cellId: string;
  color: string;
  onSelect: () => void;
};
type PathNode = Node<PathData, "path">;
function PathCard({ data: d }: NodeProps<PathNode>) {
  return (
    <div
      className={`s-path-card stage-${d.stage}`}
      style={{ borderTopColor: d.color }}
    >
      {d.stage > 0 && <Handle type="target" position={Position.Left} />}
      <button className="nodrag s-path-main" onClick={d.onSelect}>
        <small>
          {
            [
              "SHIELD PRODUCT",
              "PRIME / PLATFORM",
              "MILITARY BUYER",
              "TECHNICAL AUTHORITY",
              "ACQUISITION AUTHORITY",
            ][d.stage]
          }
        </small>
        <strong>{d.label}</strong>
        <span>{d.sub}</span>
      </button>
      <Source id={d.source.id} claim={d.source.claim} />
      {d.stage < 4 && <Handle type="source" position={Position.Right} />}
    </div>
  );
}
const pathTypes = { path: PathCard };
function GraphInner({
  data,
  selected,
  onSelect,
}: {
  data: OpportunityCell[];
  selected: string;
  onSelect: (id: string, open?: boolean) => void;
}) {
  const [page, setPage] = useState(0);
  const flow = useReactFlow();
  const pages = Math.max(1, Math.ceil(data.length / 4));
  const safePage = Math.min(page, pages - 1);
  const subset = data.slice(safePage * 4, safePage * 4 + 4);
  useEffect(() => {
    setPage(0);
  }, [data.map((c) => c.id).join(",")]);
  const nodes: PathNode[] = subset.flatMap((c, row) => {
    const a = accountById[c.accountId],
      g = accountById[c.governmentId];
    const labels = [
      c.shieldProduct,
      c.platformOrProgram,
      c.b2gBuyer,
      c.technicalAuthority,
      c.acquisitionAuthority,
    ];
    const subs = [
      c.additionalProducts.length
        ? `+ ${c.additionalProducts.join(" / ")}`
        : "Mission autonomy / platform wedge",
      a.name,
      c.mission,
      "Requirements · interfaces · trials",
      c.governmentId === "dsa"
        ? "Specific programme chain to confirm"
        : "AoN → Service HQ / MoD contracting",
    ];
    return labels.map((label, stage) => ({
      id: `${c.id}-${stage}`,
      type: "path",
      position: { x: stage * 246, y: row * 200 },
      data: {
        label,
        sub: subs[stage],
        stage,
        source:
          stage === 4
            ? {
                id: c.governmentId === "dsa" ? "sbs" : "dap",
                claim:
                  c.governmentId === "dsa"
                    ? "Reported SBS-III programme. Exact approval / contracting route not established."
                    : "General capital AoN thresholds; actual project value and delegation must be confirmed.",
              }
            : stage === 0
              ? {
                  id:
                    c.shieldProduct === "V-BAT"
                      ? "vbat"
                      : c.shieldProduct.startsWith("Hivemind")
                        ? "hivemind"
                        : c.shieldProduct === "Aechelon"
                          ? "aechelon"
                          : c.shieldProduct === "Benchmark"
                            ? "benchmark"
                            : c.shieldProduct === "X-BAT"
                              ? "xbat"
                              : "vision",
                  claim:
                    "Shield product capability. India platform fit and proposed integration remain analyst judgement.",
                }
              : stage === 3
                ? {
                    id: g.sources[0].id,
                    claim:
                      g.sources[0].claim +
                      "; the specific technical-role mapping is analyst judgement and requires programme-level confirmation.",
                  }
                : c.sources[0],
        cellId: c.id,
        color: stage < 2 ? productColors[c.shieldProduct] : "#76aeb7",
        onSelect: () => onSelect(c.id, stage === 1),
      },
      style: { opacity: !selected || selected === c.id ? 1 : 0.24 },
      draggable: false,
    }));
  });
  const edges: Edge[] = subset.flatMap((c) =>
    [0, 1, 2, 3].map((i) => ({
      id: `${c.id}-e${i}`,
      source: `${c.id}-${i}`,
      target: `${c.id}-${i + 1}`,
      type: "smoothstep",
      style: {
        stroke: !selected || selected === c.id ? "#bc706c" : "#36434b",
        strokeWidth: 1.3,
        opacity: !selected || selected === c.id ? 1 : 0.24,
      },
    })),
  );
  useEffect(() => {
    const t = setTimeout(() => {
      if (window.innerWidth < 640)
        void flow.setViewport({ x: 18, y: 18, zoom: 1 });
      else void flow.fitView({ padding: 0.08, maxZoom: 1, duration: 250 });
    }, 60);
    return () => clearTimeout(t);
  }, [safePage, data.length]);
  return (
    <>
      <div className="s-graph-top">
        <span>PRODUCT → PLATFORM → USER → TECHNICAL GATE → BUDGET</span>
        <div>
          <button
            className="s-icon"
            disabled={safePage === 0}
            onClick={() => setPage(safePage - 1)}
            aria-label="Previous account paths"
          >
            <ChevronLeft size={16} />
          </button>
          <small>
            {safePage * 4 + 1}–{Math.min(safePage * 4 + 4, data.length)} /{" "}
            {data.length} paths
          </small>
          <button
            className="s-icon"
            disabled={safePage === pages - 1}
            onClick={() => setPage(safePage + 1)}
            aria-label="Next account paths"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div className="s-flow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={pathTypes}
          fitView
          fitViewOptions={{ padding: 0.08, maxZoom: 1 }}
          minZoom={0.2}
          maxZoom={1.5}
          nodesDraggable={false}
          nodesConnectable={false}
          zoomOnScroll={false}
          panOnScroll={false}
          colorMode="dark"
          onPaneClick={() => onSelect("")}
        >
          <Background gap={24} size={1} color="#2b3338" />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
      <div className="s-graph-foot">
        <span>
          Click a node to isolate its path · click a platform for the account
          brief
        </span>
        <button
          onClick={() => void flow.fitView({ padding: 0.08, duration: 300 })}
        >
          Fit paths ↗
        </button>
      </div>
    </>
  );
}
function AccountRadar({
  data,
  onSelect,
}: {
  data: OpportunityCell[];
  onSelect: (id: string) => void;
}) {
  const { assumptions } = useStrategy();
  const layers = calculate(assumptions);
  const points = data.map((c) => ({
    id: c.id,
    x: c.competitiveOpenness,
    y: c.missionFit * 0.6 + c.indigenisationFit * 0.4,
    z: c.layerId ? layers.find((l) => l.id === c.layerId)!.gross : 45,
    name: c.platformOrProgram,
    score: c.priorityScore,
    product: c.shieldProduct,
    priced: !!c.layerId,
  }));
  return (
    <div className="s-radar">
      <div className="s-radar-intro">
        <h3>Budget attractiveness ≠ integration openness.</h3>
        <p>
          Circle area represents modelled gross layer. A small outlined marker
          means unpriced. Overlapping markers share the same ratings; use the
          accessible list below to inspect each cell.
        </p>
        <Badge kind="model" />
      </div>
      <div style={{ height: 440, width: "100%" }}>
        <ResponsiveContainer>
          <ScatterChart margin={{ top: 35, right: 35, bottom: 40, left: 20 }}>
            <CartesianGrid stroke="#2a333b" strokeDasharray="3 6" />
            <XAxis
              type="number"
              dataKey="x"
              domain={[0, 5.5]}
              ticks={[1, 2, 3, 4, 5]}
              tick={{ fill: "#a6b0b9", fontSize: 12 }}
              label={{
                value: "Competitive openness →  (analyst 1–5)",
                position: "bottom",
                fill: "#b7c0c9",
                fontSize: 13,
              }}
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[0, 5.5]}
              ticks={[1, 2, 3, 4, 5]}
              tick={{ fill: "#a6b0b9", fontSize: 12 }}
              label={{
                value: "Strategic / platform leverage →",
                angle: -90,
                position: "insideLeft",
                fill: "#b7c0c9",
                fontSize: 13,
              }}
            />
            <ZAxis
              type="number"
              dataKey="z"
              range={[45, 1100]}
              domain={[0, Math.max(1500, ...points.map((p) => p.z))]}
            />
            <ReferenceLine x={3} stroke="#7d7360" strokeDasharray="4 6" />
            <ReferenceLine y={3} stroke="#7d7360" strokeDasharray="4 6" />
            <Tooltip
              content={({ payload }) =>
                payload?.[0] ? (
                  <div className="s-radar-tip">
                    <strong>{payload[0].payload.name}</strong>
                    <p>
                      Openness {payload[0].payload.x}/5 · leverage{" "}
                      {payload[0].payload.y}/5
                    </p>
                    <p>
                      {payload[0].payload.priced
                        ? money(payload[0].payload.z) + " gross · MODEL"
                        : "Unpriced strategic opportunity"}
                    </p>
                  </div>
                ) : null
              }
            />
            <Scatter data={points} onClick={(p) => onSelect(p.payload.id)}>
              {points.map((p) => (
                <Cell
                  key={p.id}
                  fill={p.priced ? productColors[p.product] : "#111920"}
                  fillOpacity={0.7}
                  stroke={productColors[p.product]}
                  strokeWidth={2}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="s-radar-key">
        {[...new Set(data.map((c) => c.shieldProduct))].map((p) => (
          <span key={p}>
            <i style={{ background: productColors[p] }} />
            {p}
          </span>
        ))}
      </div>
      <p className="s-muted">
        Leverage = 60% mission fit + 40% indigenisation fit. Bubble sizes use
        the current scenario, across all cell horizons; this chart does not
        depict win probability or a revenue forecast.
      </p>
      <div className="s-radar-list">
        {points.map((p) => (
          <button key={p.id} onClick={() => onSelect(p.id)}>
            <span style={{ color: productColors[p.product] }}>●</span>
            {p.name}
            <small>
              Openness {p.x}/5 · leverage {p.y}/5
            </small>
            <ArrowUpRight size={14} />
          </button>
        ))}
      </div>
    </div>
  );
}
function OpportunityTable({
  data,
  onSelect,
}: {
  data: OpportunityCell[];
  onSelect: (id: string) => void;
}) {
  const [sort, setSort] = useState("priorityScore");
  const [desc, setDesc] = useState(true);
  const { assumptions } = useStrategy();
  const layers = calculate(assumptions);
  const value = (c: OpportunityCell, k: string): string | number => {
    const l = layers.find((l) => l.id === c.layerId);
    return k === "gross"
      ? (l?.gross ?? -1)
      : k === "win"
        ? (l?.win ?? -1)
        : k === "weighted"
          ? (l?.weighted ?? -1)
          : k === "public"
            ? (c.publicProgramValueCr ?? -1)
            : k === "priorityScore"
              ? c.priorityScore
              : k === "tier"
                ? accountById[c.accountId].tier
                : String(c[k as keyof OpportunityCell] || "");
  };
  const sorted = [...data].sort((a, b) => {
    const x = value(a, sort),
      y = value(b, sort);
    return (
      (typeof x === "number" && typeof y === "number"
        ? x - y
        : String(x).localeCompare(String(y))) * (desc ? -1 : 1)
    );
  });
  const columns = [
    ["priorityScore", "Priority"],
    ["shieldProduct", "Product"],
    ["platformOrProgram", "Account / platform"],
    ["b2gBuyer", "Buyer"],
    ["route", "Route"],
    ["horizon", "Horizon"],
    ["public", "Public value"],
    ["gross", "Gross layer"],
    ["win", "Win"],
    ["weighted", "Weighted"],
    ["evidenceLevel", "Evidence"],
  ];
  return (
    <div className="s-table-wrap">
      <table className="s-table" aria-label="Filtered opportunity cells">
        <thead>
          <tr>
            {columns.map(([k, label]) => (
              <th
                key={k}
                aria-sort={
                  sort === k ? (desc ? "descending" : "ascending") : "none"
                }
              >
                <button
                  onClick={() => {
                    if (sort === k) setDesc(!desc);
                    else {
                      setSort(k);
                      setDesc(
                        [
                          "priorityScore",
                          "gross",
                          "win",
                          "weighted",
                          "public",
                        ].includes(k),
                      );
                    }
                  }}
                >
                  {label} {sort === k ? (desc ? "↓" : "↑") : "↕"}
                </button>
              </th>
            ))}
            <th>Next move</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((c) => {
            const l = layers.find((l) => l.id === c.layerId);
            return (
              <tr key={c.id}>
                <td>
                  <small>
                    Rank{" "}
                    {data.filter(
                      (other) => other.priorityScore > c.priorityScore,
                    ).length + 1}
                  </small>
                  <strong className="s-score">
                    {c.priorityScore}
                    <small>/100</small>
                  </strong>
                  <small>MODEL</small>
                </td>
                <td>
                  <span
                    className="s-product-dot"
                    style={{ background: productColors[c.shieldProduct] }}
                  />
                  {c.shieldProduct}
                </td>
                <td>
                  <button
                    className="s-table-link"
                    onClick={() => onSelect(c.id)}
                  >
                    {c.platformOrProgram}
                    <ArrowUpRight size={13} />
                  </button>
                  <small>
                    {accountById[c.accountId].name} · Tier{" "}
                    {accountById[c.accountId].tier}
                  </small>
                  <Source id={c.sources[0].id} claim={c.sources[0].claim} />
                </td>
                <td>{c.b2gBuyer}</td>
                <td>{c.route}</td>
                <td>{c.horizon}</td>
                <td>
                  {c.publicProgramValueCr
                    ? money(c.publicProgramValueCr)
                    : "Not separated"}
                  <small>
                    {c.publicProgramValueCr
                      ? "REPORTED · shared programme"
                      : "No disclosed cell value"}
                  </small>
                </td>
                <td>
                  {l ? money(l.gross) : "Unpriced"}
                  <small>
                    {l
                      ? "MODEL"
                      : c.coveredByPool
                        ? "Shared pool · no allocation"
                        : "Strategic opportunity"}
                  </small>
                </td>
                <td>
                  {l ? `${l.win}%` : "—"}
                  <small>{l ? "MODEL" : ""}</small>
                </td>
                <td>
                  {l ? money(l.weighted) : "—"}
                  <small>{l ? "MODEL · not revenue" : ""}</small>
                </td>
                <td>
                  <Badge
                    kind={
                      c.evidenceLevel === "company-confirmed"
                        ? registryById[c.sources[0].id].group ===
                          "Shield AI official"
                          ? "shield"
                          : "oem"
                        : c.evidenceLevel
                    }
                  />
                  <small>{c.status}</small>
                </td>
                <td>
                  <button
                    className="s-table-link"
                    onClick={() => onSelect(c.id)}
                  >
                    Open pursuit brief <ArrowRight size={14} />
                  </button>
                  <small>{c.nextMove}</small>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
function AccountDirectory({
  data,
  onOpen,
}: {
  data: OpportunityCell[];
  onOpen: (a: Account) => void;
}) {
  const ids = new Set(data.map((c) => c.accountId));
  return (
    <div className="s-directory">
      {accounts
        .filter(
          (a) =>
            a.kind === "B2B" &&
            (ids.has(a.id) ||
              (["kalyani", "sagar"].includes(a.id) &&
                data.length === rawCells.length)),
        )
        .map((a) => (
          <article key={a.id}>
            <div className="s-section-head">
              <span className={`s-tier tier-${a.tier}`}>
                TIER {a.tier}
                {a.tier === 0 ? " · EXISTING ROUTE" : ""}
              </span>
              <button
                className="s-icon"
                aria-label={`Open ${a.name} account`}
                onClick={() => onOpen(a)}
              >
                <ArrowUpRight size={19} />
              </button>
            </div>
            <h3>{a.name}</h3>
            <p>{a.platforms}</p>
            <div className="s-account-products">
              {a.products.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
            <small>
              <MapPin size={12} />
              {a.location}
            </small>
            <h4>Integration entry</h4>
            <p>{a.nextMove}</p>
            <h4>Constraint</h4>
            <p>{a.constraint}</p>
            <h4>Target functions</h4>
            <p>{a.roles.join(" · ")}</p>
            {a.sources.length ? (
              <SourceList refs={a.sources} />
            ) : (
              <Badge kind="model" label="MODEL · DILIGENCE LEAD ONLY" />
            )}
          </article>
        ))}
    </div>
  );
}
const cities = [
  [
    "New Delhi",
    "Government capture",
    "MoD · Service HQs · Acquisition Wing · IDS",
    "Government engagement, programme capture and policy.",
    ["india-office", "dap"],
  ],
  [
    "Bengaluru",
    "Autonomy engineering",
    "HAL · BEL · ADE / CABS · ASTE · Training Command",
    "Customer integration, simulation / T&E and engineering.",
    ["hal", "bel", "drdo-aero"],
  ],
  [
    "Hyderabad",
    "Industrial execution",
    "JSW · TASL · BDL · Adani ecosystem",
    "V-BAT manufacturing, training, MRO and supply chain.",
    ["india-contract", "tasl", "bdl"],
  ],
  [
    "Mumbai / Kattupalli",
    "Naval prime access",
    "L&T · MDL · western maritime ecosystem",
    "Ship and unmanned-system design authority engagement.",
    ["lt", "mdl"],
  ],
  [
    "Visakhapatnam",
    "Maritime trials",
    "Eastern Naval Command · NSTL · BDL underwater",
    "Underwater autonomy, user validation and sea trials.",
    ["nstl", "bdl"],
  ],
  [
    "Kolkata",
    "Maritime integration",
    "GRSE",
    "USV / AUV programme and engineering engagement.",
    ["grse"],
  ],
  [
    "Kochi",
    "Naval training",
    "Southern Naval Command / training ecosystem",
    "Mission rehearsal and naval aviation readiness pilots.",
    ["niio"],
  ],
  [
    "Pune / Talegaon",
    "Innovation ecosystem",
    "Army innovation · L&T / Kalyani ecosystem",
    "Programme-specific engagement; qualify access first.",
    ["adb", "lt"],
  ],
] as const;
function Geography() {
  return (
    <section className="s-presence">
      <div className="s-section-head">
        <div>
          <span className="s-kicker">06 / INDIA PRESENCE IMPLICATION</span>
          <h2>Be where the decisions become engineering.</h2>
        </div>
        <Badge kind="model" label="MODEL · PRESENCE STRATEGY" />
      </div>
      <p className="s-muted">
        City clusters are an engagement plan, not TAM or a claim that Shield has
        offices at each location. Ecosystem locations and specific role access
        need programme-level confirmation.
      </p>
      <div className="s-city-grid">
        {cities.map(([city, tag, nodes, action, ids], i) => (
          <article key={city}>
            <span className="s-city-num">0{i + 1}</span>
            <small>{tag}</small>
            <h3>{city}</h3>
            <p>{nodes}</p>
            <p className="s-muted">{action}</p>
            <div>
              {ids.map((id) => (
                <Source key={id} id={id} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export default function BottomUp() {
  const [params, writeParams] = useSearchParams();
  // React Router's search-param callbacks are not queued like React state.
  // Keep the latest requested query so rapid filter changes compose correctly.
  const queryRef = useRef(params);
  useEffect(() => {
    queryRef.current = params;
  }, [params]);
  const setParams = (
    mutate: (current: URLSearchParams) => URLSearchParams,
    options?: { replace?: boolean },
  ) => {
    const next = mutate(new URLSearchParams(queryRef.current));
    queryRef.current = next;
    writeParams(next, options);
  };
  const rated = useRatedCells(rawCells);
  const [method, setMethod] = useState(false);
  const [account, setAccount] = useState<Account | null>(null);
  const keys = [
    "product",
    "domain",
    "buyer",
    "route",
    "horizon",
    "evidence",
    "tier",
    "search",
  ] as const;
  const f = Object.fromEntries(
    keys.map((k) => [k, params.get(k) || ""]),
  ) as unknown as Filters;
  const filtered = useMemo(
    () =>
      filterCells(rated, f).sort((a, b) => b.priorityScore - a.priorityScore),
    [rated, params.toString()],
  );
  const tab = params.get("view") || "graph",
    selected = params.get("cell") || "",
    opened = params.get("open") === "1";
  const selectedCell = rated.find((c) => c.id === selected);
  const visibleSelection =
    selectedCell && filtered.some((c) => c.id === selectedCell.id)
      ? selectedCell
      : undefined;
  const update = (key: string, value: string) =>
    setParams(
      (old) => {
        const next = new URLSearchParams(old);
        value ? next.set(key, value) : next.delete(key);
        if (keys.includes(key as (typeof keys)[number])) {
          next.delete("cell");
          next.delete("open");
        }
        return next;
      },
      { replace: true },
    );
  const select = (id: string, open = false) =>
    setParams(
      (old) => {
        const next = new URLSearchParams(old);
        id ? next.set("cell", id) : next.delete("cell");
        open ? next.set("open", "1") : next.delete("open");
        return next;
      },
      { replace: true },
    );
  const choices: [keyof Filters, string, string[]][] = [
    ["product", "Product", products],
    [
      "domain",
      "Domain",
      ["air", "maritime", "weapons", "space", "training", "cross-domain"],
    ],
    ["buyer", "Buyer", ["Army", "Navy", "Air Force", "ICG", "DRDO", "DSA"]],
    [
      "route",
      "Route",
      [
        "B2G direct",
        "B2B OEM attach",
        "consortium",
        "pilot-to-program",
        "existing JSW route",
      ],
    ],
    ["horizon", "Horizon", ["0-18m", "18-36m", "3-5y", "strategic"]],
    [
      "evidence",
      "Evidence",
      ["official", "company-confirmed", "reported", "model"],
    ],
    ["tier", "Priority tier", ["0", "1", "2", "3"]],
  ];
  const govId = params.get("government") || "army";
  const government =
    accounts.find((a) => a.id === govId && a.kind === "B2G") ||
    accountById.army;
  return (
    <div className="s-page s-bottom-page">
      <header className="s-hero compact">
        <div className="s-hero-top">
          <span className="s-kicker">
            <i />
            INDIA STRATEGY / 02 — BOTTOM-UP
          </span>
          <span className="s-asof">AS OF 05 SEP 2026</span>
        </div>
        <h1>
          Who actually buys, <span>builds and decides?</span>
        </h1>
        <div className="s-hero-bottom">
          <p>
            From Shield product → Indian platform → prime → user → acquisition
            authority.
          </p>
          <button className="s-button" onClick={() => setMethod(true)}>
            <BookOpen size={15} />
            Methodology
          </button>
        </div>
      </header>
      <div className="s-insight-strip">
        <div>
          <span>01 / BEACHHEAD</span>
          <strong>Execute through JSW.</strong>
          <p>Army V-BAT + SDK selection opens the door.</p>
          <Source id="india-contract" />
        </div>
        <div>
          <span>02 / MULTIPLIER</span>
          <strong>Enable sovereign ownership.</strong>
          <p>Indian primes own platforms. Hivemind can power missions.</p>
          <Source id="hivemind" />
        </div>
        <div>
          <span>03 / PURSUIT DISCIPLINE</span>
          <strong>Prioritise the open architecture.</strong>
          <p>HAL, BEL, NewSpace and GRSE merit qualification.</p>
          <Badge kind="model" label="MODEL · ANALYST PRIORITY" />
        </div>
      </div>
      <section className="s-panel s-explorer" id="accounts">
        <div className="s-section-head">
          <div>
            <span className="s-kicker">ACCOUNT INTELLIGENCE</span>
            <h2>Follow the route to a real programme.</h2>
          </div>
          <span className="s-result-count" aria-live="polite">
            {filtered.length} / {rawCells.length} opportunity cells
          </span>
        </div>
        <div className="s-filter-bar">
          <label className="s-search">
            <Search size={15} />
            <input
              aria-label="Search opportunity cells"
              placeholder="Find a platform, prime or mission…"
              value={f.search}
              onChange={(e) => update("search", e.target.value)}
            />
          </label>
          {choices.map(([key, label, options]) => (
            <label className="s-filter" key={key}>
              <span>{label}</span>
              <select
                aria-label={`Filter ${label}`}
                value={f[key]}
                onChange={(e) => update(key, e.target.value)}
              >
                <option value="">
                  All {label.toLowerCase()}
                  {key === "tier" ? "s" : ""}
                </option>
                {options.map((o) => (
                  <option key={o} value={o}>
                    {key === "tier" ? `Tier ${o}` : o}
                  </option>
                ))}
              </select>
            </label>
          ))}
          {keys.some((k) => f[k]) && (
            <button
              className="s-button"
              onClick={() =>
                setParams(
                  (old) => {
                    const n = new URLSearchParams(old);
                    keys.forEach((k) => n.delete(k));
                    n.delete("cell");
                    n.delete("open");
                    return n;
                  },
                  { replace: true },
                )
              }
            >
              Clear filters
            </button>
          )}
        </div>
        <div
          className="s-tabs"
          role="tablist"
          aria-label="Account intelligence views"
        >
          {tabs.map(([id, label, Icon]) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              className={tab === id ? "active" : ""}
              onClick={() => update("view", id)}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <div className="s-empty">
            <SlidersHorizontal size={30} />
            <h3>No matching opportunities</h3>
            <p>Adjust the filters to explore another route.</p>
          </div>
        ) : tab === "graph" ? (
          <div className="s-map-layout">
            <div className="s-graph-container">
              <ReactFlowProvider>
                <GraphInner
                  data={filtered}
                  selected={visibleSelection?.id || ""}
                  onSelect={select}
                />
              </ReactFlowProvider>
            </div>
            <aside className="s-map-brief">
              <span className="s-kicker">
                {visibleSelection ? "SELECTED PURSUIT" : "THE PURSUIT THESIS"}
              </span>
              <div className="s-orbit">
                <Network size={42} />
                <i />
                <b />
              </div>
              <h3>
                {visibleSelection
                  ? visibleSelection.platformOrProgram
                  : "The best target is the one you can integrate with."}
              </h3>
              <p>
                {visibleSelection
                  ? visibleSelection.nextMove
                  : "Large budgets are only a starting point. Prioritise mission fit, Indian design ownership and an accessible integration authority."}
              </p>
              {visibleSelection ? (
                <>
                  <strong className="s-brief-score">
                    {visibleSelection.priorityScore}
                    <small>/100 · analyst priority</small>
                  </strong>
                  <button
                    className="s-button primary"
                    onClick={() => select(visibleSelection.id, true)}
                  >
                    Open account brief <ArrowUpRight size={15} />
                  </button>
                </>
              ) : (
                <>
                  <div className="s-brief-list">
                    <span>01</span>
                    <p>V-BAT delivers operational credibility.</p>
                    <span>02</span>
                    <p>Hivemind scales through Indian-owned platforms.</p>
                    <span>03</span>
                    <p>Simulation opens doors before production contracts.</p>
                  </div>
                  <Badge
                    kind="model"
                    label="MODEL · STRATEGIC INTERPRETATION"
                  />
                </>
              )}
              <div className="s-map-note">
                A platform signal is not a live sales opportunity. Click through
                to the evidence and constraints.
              </div>
            </aside>
          </div>
        ) : tab === "radar" ? (
          <AccountRadar data={filtered} onSelect={(id) => select(id, true)} />
        ) : tab === "table" ? (
          <OpportunityTable
            data={filtered}
            onSelect={(id) => select(id, true)}
          />
        ) : tab === "power" ? (
          <div className="s-power-view">
            <div className="s-section-head">
              <div>
                <h3>There is no single decision maker.</h3>
                <p>
                  Requirement, technical acceptance, spending authority and
                  vendor selection sit in different places.
                </p>
              </div>
              <select
                aria-label="Decision power account"
                value={government.id}
                onChange={(e) => update("government", e.target.value)}
              >
                {accounts
                  .filter((a) => a.kind === "B2G")
                  .map((a) => (
                    <option value={a.id} key={a.id}>
                      {a.name}
                    </option>
                  ))}
              </select>
            </div>
            <DecisionChain account={government} />
            <div className="s-drawer-columns">
              <PowerBars account={government} />
              <div>
                <h3>Entry route</h3>
                <p>{government.nextMove}</p>
                <SourceList refs={government.sources} />
              </div>
            </div>
            <Policy />
            <p className="s-muted">
              Account-level decision chains are contextual; {filtered.length}{" "}
              filtered opportunity cells remain in the other views. Role and
              power mappings are analyst judgement.
            </p>
          </div>
        ) : (
          <AccountDirectory data={filtered} onOpen={setAccount} />
        )}
        <div className="s-evidence-legend">
          <small>EVIDENCE KEY</small>
          <Badge kind="official" />
          <Badge kind="shield" />
          <Badge kind="oem" />
          <Badge kind="reported" />
          <Badge kind="model" />
        </div>
      </section>
      <div className="s-scenario-context">
        <span>PORTFOLIO SCENARIO</span>
        <p>
          Totals below cover the whole portfolio, independent of account
          filters. Change the horizon to narrow the quantified planning window.
        </p>
      </div>
      <ScenarioPanel />
      <Geography />
      {method && (
        <Modal
          title="Methodology & assumptions"
          onClose={() => setMethod(false)}
        >
          <Methodology />
        </Modal>
      )}
      {visibleSelection && opened && (
        <OpportunityDrawer
          cell={visibleSelection}
          onClose={() => update("open", "")}
        />
      )}
      {account && (
        <Modal title={account.name} onClose={() => setAccount(null)} wide side>
          <Badge
            kind="model"
            label={`MODEL · TIER ${account.tier} PRIORITISATION`}
          />
          <p className="s-lead">{account.platforms}</p>
          <p>{account.location}</p>
          <PowerBars account={account} />
          <h3>Next move</h3>
          <p>{account.nextMove}</p>
          <h3>Competitive constraint</h3>
          <p>{account.constraint}</p>
          <h3>Target roles</h3>
          <p>{account.roles.join(" · ")}</p>
          <SourceList refs={account.sources} />
        </Modal>
      )}
    </div>
  );
}
