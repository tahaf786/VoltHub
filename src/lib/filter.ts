/**
 * PURE search/filter logic for the catalog (unit-tested in filter.test.ts).
 * Kept out of the component so every edge case is covered without a browser.
 */

import {
  categoryLabel,
  type Category,
  type Product,
} from "./catalog";

export interface FilterState {
  /** Free-text search over name, brand and category label. */
  query: string;
  /** A category id, or "all". */
  category: Category | "all";
  /** A phone model, or "all". */
  model: string | "all";
  /** Price ceiling in rupees, or null for no ceiling. */
  maxPrice: number | null;
}

export const DEFAULT_FILTER: FilterState = {
  query: "",
  category: "all",
  model: "all",
  maxPrice: null,
};

function matchesQuery(product: Product, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (q === "") return true;
  const haystack =
    `${product.name} ${product.brand} ${categoryLabel(product.category)}`.toLowerCase();
  return haystack.includes(q);
}

/**
 * A product matches a model filter if it explicitly lists that model OR it's a
 * "Universal" accessory (a universal charger fits every phone) — the honest,
 * useful behaviour.
 */
function matchesModel(product: Product, model: string | "all"): boolean {
  if (model === "all") return true;
  return product.models.includes(model) || product.models.includes("Universal");
}

/** Filter a product list. All active constraints are ANDed together. Pure. */
export function filterProducts(
  products: Product[],
  filter: FilterState,
): Product[] {
  return products.filter(
    (p) =>
      (filter.category === "all" || p.category === filter.category) &&
      matchesModel(p, filter.model) &&
      (filter.maxPrice === null || p.price <= filter.maxPrice) &&
      matchesQuery(p, filter.query),
  );
}

/** Min/max price across a product list (both 0 for an empty list). */
export function priceBounds(products: Product[]): { min: number; max: number } {
  if (products.length === 0) return { min: 0, max: 0 };
  const prices = products.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
