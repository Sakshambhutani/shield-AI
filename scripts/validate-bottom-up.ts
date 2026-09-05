import assert from "node:assert/strict";
import { cells, filterCells } from "../src/strategy/cells";
import { accounts, accountById } from "../src/strategy/accounts";
import { registryById, registry } from "../src/strategy/sources";
import { calculate, totals, presets } from "../src/strategy/model";
import { priority } from "../src/strategy/types";
import type { Filters } from "../src/strategy/cells";
assert.equal(new Set(cells.map((c) => c.id)).size, 24);
assert.equal(new Set(accounts.map((a) => a.id)).size, accounts.length);
assert.equal(new Set(registry.map((s) => s.id)).size, registry.length);
for (const cell of cells) {
  assert.ok(accountById[cell.accountId]);
  assert.ok(accountById[cell.governmentId]?.chain?.length === 4);
  assert.equal(cell.priorityScore, priority(cell));
  assert.ok(cell.priorityScore >= 20 && cell.priorityScore <= 100);
  for (const ref of cell.sources) {
    assert.ok(registryById[ref.id], `${cell.id}: ${ref.id}`);
    assert.ok(ref.claim.length > 20);
  }
  for (const id of cell.precedentIds) assert.ok(registryById[id]);
  assert.ok(cell.caveats.length);
  assert.ok(cell.nextMove.length > 30);
}
for (const a of accounts)
  for (const s of a.sources) assert.ok(registryById[s.id]);
const expected = {
  Conservative: [2014.84, 276.742],
  Base: [3964.52, 958.452],
  Upside: [7129.04, 2555.356],
};
for (const [name, [gross, weighted]] of Object.entries(expected)) {
  const t = totals(presets[name as keyof typeof presets]);
  assert.ok(Math.abs(t.gross - gross) < 1e-8, `${name} gross`);
  assert.ok(Math.abs(t.weighted - weighted) < 1e-8, `${name} weighted`);
}
assert.deepEqual(
  totals(presets.Base, "18").layers.map((l) => l.id),
  ["army-vbat"],
);
assert.equal(totals(presets.Base, "18").weighted, 432);
assert.equal(totals(presets.Base, "36").weighted, 918);
assert.equal(
  calculate(presets.Base).filter((l) => l.id === "tactical").length,
  1,
);
assert.equal(
  new Set(cells.flatMap((c) => (c.layerId ? [c.layerId] : []))).size,
  6,
  "Six directly allocated cell layers; tactical is a separate unallocated pool",
);
assert.equal(
  cells.find((c) => c.shieldProduct === "X-BAT")?.valuationMethod,
  "unpriced",
);
assert.equal(totals({ ...presets.Base, maleOverlap: 100 }).gross, 2364.52);
assert.equal(totals({ ...presets.Base, maleOverlap: 100 }).weighted, 798.452);
const none: Filters = {
  product: "",
  buyer: "",
  domain: "",
  horizon: "",
  evidence: "",
  route: "",
  tier: "",
  search: "",
};
assert.equal(filterCells(cells, none).length, 24);
assert.equal(
  filterCells(cells, { ...none, product: "X-BAT", horizon: "0-18m" }).length,
  0,
);
assert.ok(
  filterCells(cells, {
    ...none,
    product: "Vision / ViDAR",
    buyer: "Navy",
  }).some((c) => c.id === "02"),
  "Secondary-product filters",
);
assert.ok(filterCells(cells, { ...none, buyer: "DRDO" }).length > 1);
const modified = {
  ...presets.Base,
  asp: 0,
  armyWin: 0,
  navyWin: 0,
  icgWin: 0,
  tacticalValue: 0,
  maleValue: 0,
  spaceValue: 0,
};
assert.equal(totals(modified).weighted, 0);
assert.equal(totals(modified).gross, 0);
console.log(
  `Passed: ${cells.length} cells, ${accounts.length} accounts, ${registry.length} sources; all scenarios, horizon exclusions, overlap and combined filters.`,
);
