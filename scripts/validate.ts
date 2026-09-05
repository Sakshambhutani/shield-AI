import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  opportunities,
  nodeById,
  productList,
  childrenOf,
} from "../src/data/opportunities";
import { sources, sourceById } from "../src/data/sources";
import {
  modelDefaults,
  calculateScenarios,
  quantifiedProgrammeIds,
} from "../src/model";
import { eligibleNodes, visibleNodes, pathTo } from "../src/graph";
assert.equal(
  new Set(opportunities.map((n) => n.id)).size,
  opportunities.length,
  "Unique node IDs",
);
assert.equal(
  new Set(sources.map((s) => s.id)).size,
  sources.length,
  "Unique source IDs",
);
for (const s of sources) assert.equal(new URL(s.url).protocol, "https:");
for (const n of opportunities) {
  for (const id of n.sourceIds)
    assert.ok(sourceById[id], `${n.id} references ${id}`);
  for (const f of n.facts ?? [])
    assert.ok(
      f.sourceIds.length && f.sourceIds.every((id) => sourceById[id]),
      `Fact sources: ${n.id}`,
    );
  for (const id of n.parentIds) {
    assert.ok(nodeById[id]);
    assert.equal(
      nodeById[id].level + 1,
      n.level,
      "Every edge advances one hierarchy level",
    );
  }
  if (
    n.valueLabel ||
    /₹|\$|\d+\s*(kg|days|hours|satellites|vessels|systems)/i.test(n.description)
  )
    assert.ok(n.sourceIds.length, `Numeric node needs sources: ${n.id}`);
  if (n.kind === "product") {
    assert.ok(n.whyShield);
    assert.ok(childrenOf(n.id).some((c) => c.kind === "proof"));
  }
  if (n.kind === "programme" || n.kind === "product")
    assert.ok(
      n.horizon && n.confidence && n.routeToMarket?.length,
      `Executive tags: ${n.id}`,
    );
  if (n.products?.includes("X-BAT") && n.kind === "product")
    assert.equal(n.horizon, "3y+");
}
assert.equal(nodeById.india.valueLabel, undefined);
assert.deepEqual(nodeById.coastguard.parentIds, ["mod"]);
assert.equal(nodeById.mha.priority, "adjacency");
assert.equal(nodeById["civil-space"].priority, "context");
assert.equal(nodeById.oem.kind, "channel");
const noFilters = eligibleNodes({ product: "", service: "", horizon: "" });
assert.deepEqual(
  visibleNodes(new Set(["india"]), noFilters).map((n) => n.id),
  ["india", "mod", "space", "mha", "oem"],
);
assert.ok(
  visibleNodes(new Set(["india", "mod"]), noFilters).some(
    (n) => n.id === "navy",
  ),
);
assert.ok(
  !visibleNodes(new Set(["india"]), noFilters).some((n) => n.id === "navy"),
);
for (const p of productList) {
  const allowed = eligibleNodes({ product: p, service: "", horizon: "" });
  assert.ok(allowed.size > 1, `${p} discoverable`);
}
assert.equal(
  eligibleNodes({ product: "X-BAT", service: "", horizon: "0-18m" }).size,
  0,
);
const naval = eligibleNodes({
  product: "V-BAT",
  service: "Navy",
  horizon: "0-18m",
});
assert.ok(naval.has("nsuas::V-BAT"));
assert.ok(!naval.has("army"));
assert.deepEqual(pathTo("nsuas::V-BAT::nl"), [
  "india",
  "mod",
  "navy",
  "nsuas",
  "nsuas::V-BAT",
  "nsuas::V-BAT::nl",
]);
assert.deepEqual(quantifiedProgrammeIds, [
  "tactical-uas",
  "male",
  "sbs-programme",
]);
for (const id of quantifiedProgrammeIds)
  assert.equal(nodeById[id].evidenceType, "reported-programme");
const result = calculateScenarios(modelDefaults);
assert.ok(Math.abs(result.base - 6214.36) < 0.001);
assert.ok(Math.abs(result.conservative - 1584.84) < 0.001);
assert.ok(Math.abs(result.upside - 11748.4) < 0.001);
assert.equal(
  calculateScenarios({ ...modelDefaults, tactical: 0, male: 0, space: 0 }).base,
  0,
);
assert.ok(
  Math.abs(
    calculateScenarios({ ...modelDefaults, overlap: 100 }).base - 4339.36,
  ) < 0.001,
);
const app = readFileSync("src/App.tsx", "utf8");
assert.ok(app.includes('rel="noopener noreferrer"'));
for (const file of [
  "src/App.tsx",
  "src/main.tsx",
  "src/model.ts",
  "src/graph.ts",
])
  assert.ok(
    !/\bfetch\s*\(|XMLHttpRequest|new WebSocket|sendBeacon/.test(
      readFileSync(file, "utf8"),
    ),
    `${file} contains no runtime network calls`,
  );
console.log(
  `Passed: ${opportunities.length} nodes, ${sources.length} source references, all product proof paths, filter visibility, accounting exclusions, scenario arithmetic and no application runtime fetches.`,
);
