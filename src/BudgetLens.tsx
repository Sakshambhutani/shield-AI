import { useState } from "react";
import { ArrowRight, ChevronRight, ExternalLink } from "lucide-react";
import { sourceById } from "./data/sources";
const shares = [
  {
    name: "Capital expenditure",
    share: 27.95,
    color: "#75baff",
    detail:
      "₹2.19 lakh Cr · aircraft, ships, systems and other capital investment",
    relevant: true,
  },
  {
    name: "Sustenance & readiness",
    share: 20.17,
    color: "#76bba9",
    detail:
      "Operational spending is relevant selectively; no separately disclosed Shield-fit amount.",
    relevant: true,
  },
  {
    name: "Pay & allowances",
    share: 26.4,
    color: "#697785",
    detail: "Personnel expenditure. Excluded from the opportunity model.",
    relevant: false,
  },
  {
    name: "Defence pensions",
    share: 21.84,
    color: "#4d5965",
    detail: "Pensions. Excluded from the opportunity model.",
    relevant: false,
  },
  {
    name: "Civil organisations",
    share: 3.64,
    color: "#89909b",
    detail:
      "Civil organisations within MoD. Context only; no whole-pool Shield addressability.",
    relevant: false,
  },
];
const steps = [
  {
    title: "MoD annual budget",
    value: "₹7.85 lakh Cr",
    width: 100,
    note: "The whole FY2026–27 allocation. Includes salaries, pensions and non-addressable expenditure.",
  },
  {
    title: "Capital expenditure",
    value: "₹2.19 lakh Cr",
    width: 27.95,
    note: "27.95% of the MoD budget. A capital spending pool, not an autonomy market.",
  },
  {
    title: "Capital acquisition",
    value: "~₹1.85 lakh Cr",
    width: 23.57,
    note: "About 84% of the capital head. This also includes many unrelated platforms and systems.",
  },
  {
    title: "Domestic industry earmark",
    value: "₹1.39 lakh Cr",
    width: 17.71,
    note: "75% of capital acquisition, rounded. A nested procurement earmark; relevant to the Indian OEM route, not an extra budget.",
  },
];
export default function BudgetLens({
  onMission,
}: {
  onMission: (id: string) => void;
}) {
  const [step, setStep] = useState(0);
  const [area, setArea] = useState(0);
  const [show, setShow] = useState(true);
  const s = sourceById["mod-budget"];
  return (
    <section className="budget-lens" aria-label="MoD budget narrowing">
      <button
        className="budget-lens-heading"
        aria-expanded={show}
        onClick={() => setShow(!show)}
      >
        <span>
          <strong>Where the ₹7.85 lakh crore goes</strong>
          <small>
            Official FY2026–27 allocation → relevant spending pools →
            mission-specific fit
          </small>
        </span>
        <ChevronRight
          size={18}
          style={{ transform: show ? "rotate(90deg)" : undefined }}
        />
      </button>
      {show && (
        <div className="budget-lens-content">
          <div className="budget-shares" aria-label="MoD budget distribution">
            {shares.map((item, i) => (
              <button
                key={item.name}
                title={`${item.name}: ${item.share}%`}
                aria-label={`${item.name}: ${item.share}%`}
                aria-pressed={area === i}
                style={{ flex: item.share, background: item.color }}
                onClick={() => {
                  setArea(i);
                  setStep(i === 0 ? 1 : 0);
                }}
              />
            ))}
          </div>
          <div className="budget-share-labels">
            {shares.map((item, i) => (
              <button
                key={item.name}
                className={area === i ? "chosen" : ""}
                onClick={() => {
                  setArea(i);
                  setStep(i === 0 ? 1 : 0);
                }}
              >
                <i style={{ background: item.color }} />
                {item.name} <b>{item.share}%</b>
              </button>
            ))}
          </div>
          <p className="budget-area-note" aria-live="polite">
            {shares[area].detail}{" "}
            {!shares[area].relevant &&
              "Return to capital expenditure to follow the acquisition path."}
          </p>
          <div className="budget-steps">
            {steps.map((item, i) => (
              <button
                key={item.title}
                onClick={() => {
                  setStep(i);
                  setArea(0);
                }}
                aria-pressed={step === i}
                className={step === i ? "chosen" : ""}
              >
                <small>
                  0{i + 1} / {item.title}
                </small>
                <strong>{item.value}</strong>
                {i < 3 && <ArrowRight size={15} />}
              </button>
            ))}
          </div>
          <div
            className="budget-track"
            aria-label={`${steps[step].title}: approximately ${steps[step].width}% of MoD budget`}
          >
            <div style={{ width: `${steps[step].width}%` }} />
          </div>
          <p className="budget-step-note" aria-live="polite">
            {steps[step].note}
          </p>
          <div className="budget-next">
            <div>
              <strong>Next: which military mission can Shield serve?</strong>
              <p>
                Service and programme values are not publicly separable here.
                Explore demand signals; only the three separately reported
                programmes enter the scenario model below.
              </p>
            </div>
            <button onClick={() => onMission("army")}>
              Army <ArrowRight size={13} />
            </button>
            <button onClick={() => onMission("navy")}>
              Navy <ArrowRight size={13} />
            </button>
            <button onClick={() => onMission("airforce")}>
              Air Force <ArrowRight size={13} />
            </button>
            <button onClick={() => onMission("coastguard")}>
              Coast Guard <ArrowRight size={13} />
            </button>
          </div>
          <a
            className="budget-source"
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={11} /> {s.organisation} · {s.date} · Official
            annual budget. Percentages are the release’s composition; all four
            amounts are nested, never added.
          </a>
        </div>
      )}
    </section>
  );
}
