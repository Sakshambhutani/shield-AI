import { opportunities, nodeById, childrenOf } from "./data/opportunities";
import type { Product, Service, Horizon } from "./data/opportunities";
export const pathTo = (id: string): string[] => {
  const n = nodeById[id];
  return n ? [...(n.parentIds[0] ? pathTo(n.parentIds[0]) : []), id] : [];
};
export interface Filters {
  product: Product | "";
  service: Service | "";
  horizon: Horizon | "";
}
export function eligibleNodes(f: Filters): Set<string> {
  if (!f.product && !f.service && !f.horizon)
    return new Set(opportunities.map((n) => n.id));
  const allowed = new Set<string>();
  for (const n of opportunities) {
    if (n.level < 3 || n.kind === "proof") continue;
    if (f.product && !n.products?.includes(f.product)) continue;
    if (f.service && n.service !== f.service) continue;
    if (f.horizon && n.horizon !== f.horizon) continue;
    pathTo(n.id).forEach((id) => allowed.add(id));
    if (n.kind === "product")
      childrenOf(n.id).forEach((c) => allowed.add(c.id));
  }
  return allowed;
}
export function visibleNodes(expanded: Set<string>, eligible: Set<string>) {
  return opportunities.filter(
    (n) =>
      eligible.has(n.id) &&
      pathTo(n.id)
        .slice(0, -1)
        .every((id) => expanded.has(id)),
  );
}
