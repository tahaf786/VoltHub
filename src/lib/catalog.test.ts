import { describe, expect, it } from "vitest";
import {
  CATEGORIES,
  PRODUCTS,
  PHONE_MODELS,
  stockLevel,
  stockLabel,
  isReservable,
  categoryLabel,
  type Category,
} from "./catalog";

describe("stockLevel", () => {
  it("classifies out / low / in by honest thresholds", () => {
    expect(stockLevel(0)).toBe("out");
    expect(stockLevel(-2)).toBe("out");
    expect(stockLevel(1)).toBe("low");
    expect(stockLevel(3)).toBe("low"); // boundary: still "low"
    expect(stockLevel(4)).toBe("in"); // boundary: now "in"
    expect(stockLevel(50)).toBe("in");
  });

  it("treats fractional counts by their floor", () => {
    expect(stockLevel(3.9)).toBe("low");
    expect(stockLevel(0.5)).toBe("out");
  });
});

describe("stockLabel", () => {
  it("is honest and human", () => {
    expect(stockLabel(0)).toBe("Out of stock");
    expect(stockLabel(-1)).toBe("Out of stock");
    expect(stockLabel(2)).toBe("Only 2 left in store");
    expect(stockLabel(3)).toBe("Only 3 left in store");
    expect(stockLabel(7)).toBe("7 in store");
  });
});

describe("isReservable", () => {
  it("is true only when stock remains", () => {
    expect(isReservable({ stock: 1 })).toBe(true);
    expect(isReservable({ stock: 0 })).toBe(false);
    expect(isReservable({ stock: -3 })).toBe(false);
  });
});

describe("categoryLabel", () => {
  it("maps a category id to its human label", () => {
    expect(categoryLabel("cases")).toBe(
      CATEGORIES.find((c) => c.id === "cases")!.label,
    );
  });
});

describe("PRODUCTS data integrity", () => {
  it("has a healthy demo catalog", () => {
    expect(PRODUCTS.length).toBeGreaterThanOrEqual(12);
  });

  it("has unique ids", () => {
    const ids = PRODUCTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("uses only declared categories", () => {
    const valid = new Set<Category>(CATEGORIES.map((c) => c.id));
    for (const p of PRODUCTS) expect(valid.has(p.category)).toBe(true);
  });

  it("has positive integer prices and non-negative integer stock", () => {
    for (const p of PRODUCTS) {
      expect(Number.isInteger(p.price)).toBe(true);
      expect(p.price).toBeGreaterThan(0);
      expect(Number.isInteger(p.stock)).toBe(true);
      expect(p.stock).toBeGreaterThanOrEqual(0);
    }
  });

  it("lists at least one compatible model per product", () => {
    for (const p of PRODUCTS) expect(p.models.length).toBeGreaterThan(0);
  });

  it("includes at least one out-of-stock and one low-stock item (to exercise UI states)", () => {
    expect(PRODUCTS.some((p) => p.stock === 0)).toBe(true);
    expect(PRODUCTS.some((p) => p.stock > 0 && p.stock <= 3)).toBe(true);
  });

  it("every product model is a known phone model or Universal", () => {
    const known = new Set([...PHONE_MODELS, "Universal"]);
    for (const p of PRODUCTS)
      for (const m of p.models) expect(known.has(m)).toBe(true);
  });
});
