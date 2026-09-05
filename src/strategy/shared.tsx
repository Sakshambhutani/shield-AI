import { createContext, useContext, useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  ExternalLink,
  Info,
  X,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";
import { registryById } from "./sources";
import { presets, calculate, fields, money, totals } from "./model";
import type { Assumptions, ScenarioName, ViewHorizon } from "./model";
import type { ClaimRef, Evidence, OpportunityCell, Scores } from "./types";
import { scoreWeights, priority } from "./types";
export function Modal({
  title,
  onClose,
  children,
  wide = false,
  side = false,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
  side?: boolean;
}) {
  const box = useRef<HTMLDivElement>(null);
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const scroll = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    box.current?.focus();
    const key = (e: KeyboardEvent) => {
      const dialogs = document.querySelectorAll("[role=dialog]");
      if (dialogs[dialogs.length - 1] !== box.current) return;
      if (e.key === "Escape") close.current();
      if (e.key === "Tab") {
        const focus = box.current?.querySelectorAll<HTMLElement>(
          'a[href],button,input,select,summary,[tabindex="0"]',
        );
        if (!focus?.length) return;
        const first = focus[0],
          last = focus[focus.length - 1];
        if (
          e.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === box.current)
        ) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("keydown", key);
      document.body.style.overflow = scroll;
      previous?.focus();
    };
  }, []);
  return createPortal(
    <div
      className={`s-modal-backdrop ${side ? "s-side-drawer" : ""}`}
      onClick={onClose}
    >
      <div
        className={`s-modal ${wide ? "wide" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        ref={box}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="s-modal-head">
          <h2>{title}</h2>
          <button
            className="s-icon"
            onClick={onClose}
            aria-label={`Close ${title}`}
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
export function Badge({
  kind,
  label,
}: {
  kind: Evidence | "shield" | "oem";
  label?: string;
}) {
  return (
    <span className={`s-badge ${kind}`}>
      {label ||
        {
          official: "OFFICIAL — GOI",
          "company-confirmed": "COMPANY-CONFIRMED",
          reported: "REPORTED",
          model: "MODEL",
          shield: "OFFICIAL — SHIELD AI",
          oem: "OFFICIAL — OEM",
        }[kind]}
    </span>
  );
}
export function Source({
  id,
  claim,
  full = false,
}: {
  id: string;
  claim?: string;
  full?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const s = registryById[id];
  if (!s) return null;
  const kind =
    s.group === "Shield AI official"
      ? "shield"
      : s.group === "Indian OEM official"
        ? "oem"
        : s.group === "Government of India official"
          ? "official"
          : "reported";
  return (
    <>
      <button
        className={`s-source ${full ? "full" : ""} nodrag nopan`}
        aria-label={`Source: ${s.title}`}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        <Info size={13} />
        {full ? (
          <span>
            {s.title}
            <small>
              {s.organisation}
              {s.date ? ` · ${s.date}` : ""}
            </small>
          </span>
        ) : (
          <span>{s.organisation}</span>
        )}
      </button>
      {open && (
        <Modal title="Evidence file" onClose={() => setOpen(false)}>
          <Badge kind={kind} />
          <h3>{s.title}</h3>
          <p className="s-muted">
            {s.organisation} · {s.date || "Publication date not specified"}
          </p>
          <div className="s-callout">
            <small>EXACT CLAIM SUPPORTED</small>
            <p>{claim || s.claim}</p>
          </div>
          {s.note && <p className="s-warning">{s.note}</p>}
          <p className="s-muted">
            Verification:{" "}
            {s.verification === "prior audit"
              ? "Prior Phase-1 source audit"
              : s.verification === "checked"
                ? "Content checked for this build"
                : "Primary content requires follow-up"}{" "}
            · as of 5 September 2026
          </p>
          <a
            className="s-button primary"
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open original source <ExternalLink size={15} />
          </a>
        </Modal>
      )}
    </>
  );
}
export const SourceList = ({ refs }: { refs: ClaimRef[] }) => (
  <div className="s-source-list">
    {refs.map((s, i) => (
      <Source key={`${s.id}-${i}`} id={s.id} claim={s.claim} full />
    ))}
  </div>
);
type State = {
  scenario: ScenarioName;
  assumptions: Assumptions;
  setScenario: (s: ScenarioName) => void;
  setAssumptions: (a: Assumptions) => void;
  horizon: ViewHorizon;
  setHorizon: (h: ViewHorizon) => void;
  ratings: Record<string, Scores>;
  setRating: (id: string, s: Scores) => void;
};
const Context = createContext<State>(null!);
export function StrategyProvider({ children }: { children: ReactNode }) {
  const [scenario, setName] = useState<ScenarioName>("Base");
  const [assumptions, setAssumptions] = useState<Assumptions>(presets.Base);
  const [horizon, setHorizon] = useState<ViewHorizon>("60");
  const [ratings, setRatings] = useState<Record<string, Scores>>({});
  return (
    <Context.Provider
      value={{
        scenario,
        assumptions,
        setAssumptions,
        setScenario: (s) => {
          setName(s);
          setAssumptions({ ...presets[s] });
        },
        horizon,
        setHorizon,
        ratings,
        setRating: (id, s) => setRatings((v) => ({ ...v, [id]: s })),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const useStrategy = () => useContext(Context);
export function useRatedCells(cells: OpportunityCell[]) {
  const { ratings } = useStrategy();
  return cells.map((c) =>
    ratings[c.id]
      ? { ...c, ...ratings[c.id], priorityScore: priority(ratings[c.id]) }
      : c,
  );
}
export const scoreLabels: Record<keyof Scores, string> = {
  missionFit: "Mission fit",
  timing: "Timing",
  indigenisationFit: "Indigenisation fit",
  access: "Access / relationship",
  competitiveOpenness: "Competitive openness",
  authorityClarity: "Authority / budget clarity",
};
export function Methodology() {
  return (
    <div className="s-method">
      <Badge kind="model" />
      <h3>Priority is a pursuit aid.</h3>
      <p>
        Weighted 1–5 ratings are divided by five and multiplied by 100 (a score
        of 1 maps to 20; 5 maps to 100). The result ranks analyst conviction; it
        is not a prediction of procurement success.
      </p>
      {Object.entries(scoreWeights).map(([k, w]) => (
        <div className="s-weight" key={k}>
          <span>{scoreLabels[k as keyof Scores]}</span>
          <meter min={0} max={0.3} value={w} />
          <strong>{w * 100}%</strong>
        </div>
      ))}
      <p>
        Open any opportunity to edit its six ratings. Power bars use separate
        0–5 analyst judgements; they describe influence, not delegated legal
        powers. Scenario win probabilities are independent of the priority
        score.
      </p>
      <h3>Accounting rules</h3>
      <p>
        Only named model layers enter totals. Several OEM cells share a single
        tactical software pool without individual allocations. The two MALE
        layers share a programme reference; public programme values must not be
        summed. Assumed software and perception scopes are distinct; use the
        overlap deduction if tactical procurement includes MALE scope.
      </p>
      <p>
        Broad 0–36-month brief windows map to 18–36 months for programme
        pricing; demonstrations and unpriced pilots can start earlier. No
        revenue timing, ARR or Shield net share is inferred. All model changes
        remain in this browser session.
      </p>
    </div>
  );
}
export function ScenarioPanel() {
  const {
    assumptions: a,
    setAssumptions,
    scenario,
    setScenario,
    horizon,
    setHorizon,
  } = useStrategy();
  const [edit, setEdit] = useState(false);
  const t = totals(a, horizon);
  const custom = JSON.stringify(a) !== JSON.stringify(presets[scenario]);
  return (
    <section className="s-panel s-scenario" id="scenario">
      <div className="s-section-head">
        <div>
          <span className="s-kicker">05 / WHAT IS QUANTIFIABLE?</span>
          <h2>Size the layer. Qualify the capture.</h2>
        </div>
        <button className="s-button" onClick={() => setEdit(true)}>
          <SlidersHorizontal size={15} />
          Edit assumptions
        </button>
      </div>
      <div className="s-scenario-controls">
        <div className="s-segment">
          {Object.keys(presets).map((s) => (
            <button
              key={s}
              aria-pressed={scenario === s}
              className={scenario === s ? "active" : ""}
              onClick={() => setScenario(s as ScenarioName)}
            >
              {s}
              {scenario === s && custom ? " · edited" : ""}
            </button>
          ))}
        </div>
        <div className="s-segment">
          {(["18", "36", "60"] as ViewHorizon[]).map((h, i) => (
            <button
              key={h}
              aria-pressed={horizon === h}
              className={horizon === h ? "active" : ""}
              onClick={() => setHorizon(h)}
            >
              {["18-month view", "3-year view", "5-year strategic view"][i]}
            </button>
          ))}
        </div>
      </div>
      <div className="s-model-totals" aria-live="polite">
        <div>
          <span>Quantified gross addressable layer</span>
          <strong data-testid="gross-total">{money(t.gross)}</strong>
          <small>
            MODEL · public / reported context × editable assumptions
          </small>
        </div>
        <div>
          <span>Capture-weighted planning value</span>
          <strong data-testid="weighted-total">{money(t.weighted)}</strong>
          <small>
            MODEL · gross layer × assumed win probability · not revenue
          </small>
        </div>
        <div>
          <span>Shield AI net revenue</span>
          <strong className="s-unknown">Unknown</strong>
          <small>
            JSW manufacturing, licensing, local content and partner economics
            are not public.
          </small>
        </div>
      </div>
      <div className="s-table-wrap">
        <table className="s-table s-math-table">
          <thead>
            <tr>
              <th>Quantified layer</th>
              <th>Model calculation</th>
              <th>Gross</th>
              <th>Win</th>
              <th>Weighted</th>
            </tr>
          </thead>
          <tbody>
            {t.layers.map((l) => (
              <tr key={l.id}>
                <td>
                  <strong>{l.label}</strong>
                  <small>
                    {l.horizon === 60
                      ? "3–5-year strategic"
                      : l.horizon === 36
                        ? "Within 3-year view"
                        : "0–18-month planning envelope"}{" "}
                    · MODEL
                  </small>
                  {l.sourceIds.map((id) => (
                    <Source key={id} id={id} />
                  ))}
                </td>
                <td>{l.formula}</td>
                <td>{money(l.gross, 1)}</td>
                <td>{l.win}%</td>
                <td>{money(l.weighted, 1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="s-notice">
        <Info size={18} />
        <div>
          <strong>Planning value is not a revenue forecast.</strong>
          <p>
            These totals span different horizons. Some programme values are
            reported, not official line items. Attach rates and win
            probabilities are analyst assumptions. V-BAT is end-customer gross
            value, not Shield revenue. Unpriced opportunities are excluded.
          </p>
          {horizon === "18" && (
            <p>
              <strong>18-month focus:</strong> Army execution, partner SDK
              trials, tactical software pilots, naval demonstrations, Aechelon
              and Benchmark pilots. The full tactical pool, naval/ICG scale,
              MALE, space and X-BAT are excluded from this numerical view.
            </p>
          )}
        </div>
      </div>
      <details className="s-details">
        <summary>Model provenance and sensitivity conventions</summary>
        <p>
          V-BAT package ASP and additional quantities are hypothetical. A
          package is an undefined planning bundle, not an aircraft unit.
          Conservative V-BAT win probabilities are 45% / 20% / 20%; upside uses
          75% / 40% / 40%. The brief omits these six inputs; these analyst
          choices reproduce its approximate totals.
        </p>
        <p>
          ₹20,000 Cr tactical value is a rounded modelling convention from an
          industry signal; no official rupee allocation or live FX conversion is
          claimed. MALE uses the early ₹20,000 Cr report rather than a later
          ₹30,000 Cr estimate. Full five-year defaults:{" "}
          {Object.keys(presets)
            .map(
              (n) =>
                `${n} ${money(totals(presets[n as ScenarioName]).gross, 1)} gross / ${money(totals(presets[n as ScenarioName]).weighted, 1)} weighted`,
            )
            .join("; ")}
          .
        </p>
        <p>
          ViDAR in a V-BAT package is not separately priced. HAL CATS/HAPS,
          USV/UUV, weapons, simulation and X-BAT remain unpriced. Broad tactical
          partner targets are routes into one aggregate pool, not extra additive
          software awards.
        </p>
      </details>
      {edit && (
        <Modal
          title="Editable planning assumptions"
          wide
          onClose={() => setEdit(false)}
        >
          <Badge kind="model" />
          <p>
            Amounts in ₹ crore; percentages from 0 to 100. Changes update every
            route immediately. Public facts remain unchanged; these are scenario
            inputs.
          </p>
          <div className="s-assumption-grid">
            {[...new Set(fields.map((f) => f.group))].map((group) => (
              <fieldset key={group}>
                <legend>{group}</legend>
                {fields
                  .filter((f) => f.group === group)
                  .map((f) => (
                    <label key={f.key}>
                      {f.label}
                      <span>
                        <input
                          type="number"
                          min={0}
                          max={f.max}
                          step={f.key.endsWith("Qty") ? 1 : 0.1}
                          aria-label={f.label + " · " + group}
                          value={a[f.key]}
                          onChange={(e) => {
                            let v = Math.min(
                              f.max,
                              Math.max(0, Number(e.target.value) || 0),
                            );
                            if (f.key.endsWith("Qty")) v = Math.round(v);
                            setAssumptions({ ...a, [f.key]: v });
                          }}
                        />
                        {f.unit}
                      </span>
                    </label>
                  ))}
              </fieldset>
            ))}
          </div>
          <div className="s-section-head">
            <button className="s-button" onClick={() => setScenario(scenario)}>
              <RotateCcw size={14} />
              Reset {scenario.toLowerCase()} defaults
            </button>
            <strong>{money(totals(a, horizon).weighted)} weighted</strong>
          </div>
        </Modal>
      )}
    </section>
  );
}
export function CellMath({ cell }: { cell: OpportunityCell }) {
  const { assumptions } = useStrategy();
  const l = calculate(assumptions).find((l) => l.id === cell.layerId);
  return l ? (
    <div className="s-callout">
      <Badge kind="model" />
      <p>
        {l.formula} = <strong>{money(l.gross, 1)}</strong>
      </p>
      <p>
        × {l.win}% assumed win ={" "}
        <strong>{money(l.weighted, 1)} capture-weighted</strong>
      </p>
      <small>
        Shield net revenue unknown. Horizon: {l.horizon} months. Not a forecast.
      </small>
    </div>
  ) : (
    <div className="s-callout">
      <Badge kind="model" />
      <strong>Unpriced strategic opportunity</strong>
      <p>
        {cell.coveredByPool
          ? "A route into the shared tactical Hivemind pool. No cell-specific allocation; counted once in the scenario model."
          : "No separable public programme value or defensible unit model. Excluded from priced totals."}
      </p>
    </div>
  );
}
