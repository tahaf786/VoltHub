import { describe, expect, it } from "vitest";
import { PRODUCTS } from "./catalog";
import {
  filterProducts,
  priceBounds,
  DEFAULT_FILTER,
  type FilterState,
} from "./filter";

const f = (over: Partial<FilterState> = {}): FilterState => ({
  ...DEFAULT_FILTER,
  ...over,
});

describe("filterProducts", () => {
  it("returns all products for the default filter", () => {
    expect(filterProducts(PRODUCTS, DEFAULT_FILTER)).toHaveLength(
      PRODUCTS.length,
    );
  });

  it("filters by category", () => {
    const cases = filterProducts(PRODUCTS, f({ category: "cases" }));
    expect(cases.length).toBeGreaterThan(0);
    expect(cases.every((p) => p.category === "cases")).toBe(true);
  });

  it("search is case-insensitive and trims whitespace", () => {
    const a = filterProducts(PRODUCTS, f({ query: "  CASE  " }));
    const b = filterProducts(PRODUCTS, f({ query: "case" }));
    expect(a).toEqual(b);
    expect(a.length).toBeGreaterThan(0);
  });

  it("empty or whitespace query matches everything", () => {
    expect(filterProducts(PRODUCTS, f({ query: "   " }))).toHaveLength(
      PRODUCTS.length,
    );
  });

  it("search matches brand", () => {
    const byBrand = filterProducts(PRODUCTS, f({ query: "GlassGuard" }));
    expect(byBrand.length).toBeGreaterThan(0);
    expect(byBrand.every((p) => p.brand === "GlassGuard")).toBe(true);
  });

  it("filters by phone model, with Universal accessories always matching", () => {
    const model = "iPhone 15 Pro Max";
    const res = filterProducts(PRODUCTS, f({ model }));
    expect(res.length).toBeGreaterThan(0);
    expect(
      res.every(
        (p) => p.models.includes(model) || p.models.includes("Universal"),
      ),
    ).toBe(true);
    expect(res.some((p) => p.models.includes("Universal"))).toBe(true);
    expect(res.some((p) => p.models.includes(model))).toBe(true);
  });

  it("filters by max price, boundary inclusive", () => {
    const res = filterProducts(PRODUCTS, f({ maxPrice: 499 }));
    expect(res.length).toBeGreaterThan(0);
    expect(res.every((p) => p.price <= 499)).toBe(true);
    expect(res.some((p) => p.price === 499)).toBe(true);
  });

  it("combines filters with AND", () => {
    const res = filterProducts(PRODUCTS, f({ category: "glass", maxPrice: 400 }));
    expect(res.length).toBeGreaterThan(0);
    expect(res.every((p) => p.category === "glass" && p.price <= 400)).toBe(true);
  });

  it("returns an empty array when nothing matches", () => {
    expect(filterProducts(PRODUCTS, f({ query: "zzzznotarealthing" }))).toEqual(
      [],
    );
  });

  it("does not mutate the input array", () => {
    const copy = [...PRODUCTS];
    filterProducts(PRODUCTS, f({ category: "cables" }));
    expect(PRODUCTS).toEqual(copy);
  });
});

describe("priceBounds", () => {
  it("returns min and max price across products", () => {
    const prices = PRODUCTS.map((p) => p.price);
    expect(priceBounds(PRODUCTS)).toEqual({
      min: Math.min(...prices),
      max: Math.max(...prices),
    });
  });

  it("handles an empty list", () => {
    expect(priceBounds([])).toEqual({ min: 0, max: 0 });
  });
});
