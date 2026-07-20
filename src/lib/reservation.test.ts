import { describe, expect, it } from "vitest";
import {
  cartTotal,
  cartCount,
  generatePickupCode,
  isValidName,
  isValidPhone,
  PICKUP_ALPHABET,
} from "./reservation";

describe("cartTotal", () => {
  it("is 0 for an empty cart", () => {
    expect(cartTotal([])).toBe(0);
  });
  it("sums price × qty", () => {
    expect(cartTotal([{ price: 100, qty: 2 }, { price: 50, qty: 3 }])).toBe(350);
  });
  it("ignores non-positive quantities", () => {
    expect(cartTotal([{ price: 100, qty: -2 }, { price: 50, qty: 0 }])).toBe(0);
  });
});

describe("cartCount", () => {
  it("sums quantities", () => {
    expect(cartCount([{ qty: 2 }, { qty: 3 }])).toBe(5);
  });
  it("clamps negatives to 0", () => {
    expect(cartCount([{ qty: -1 }, { qty: 4 }])).toBe(4);
  });
});

describe("generatePickupCode", () => {
  it("has the VH- prefix and 5 code characters", () => {
    expect(generatePickupCode(() => 0)).toMatch(/^VH-[A-Z0-9]{5}$/);
  });
  it("is deterministic given a fixed RNG", () => {
    expect(generatePickupCode(() => 0)).toBe(`VH-${PICKUP_ALPHABET[0].repeat(5)}`);
    const last = PICKUP_ALPHABET[PICKUP_ALPHABET.length - 1];
    expect(generatePickupCode(() => 0.9999)).toBe(`VH-${last.repeat(5)}`);
  });
  it("never uses ambiguous characters (no O, 0, I, 1, L)", () => {
    for (const ch of PICKUP_ALPHABET) expect("O0I1L").not.toContain(ch);
  });
});

describe("isValidName", () => {
  it("requires at least two non-space characters", () => {
    expect(isValidName("")).toBe(false);
    expect(isValidName("  ")).toBe(false);
    expect(isValidName("A")).toBe(false);
    expect(isValidName("Al")).toBe(true);
    expect(isValidName("  Priya  ")).toBe(true);
  });
});

describe("isValidPhone", () => {
  it("accepts a 10-digit Indian number", () => {
    expect(isValidPhone("9876543210")).toBe(true);
    expect(isValidPhone("98765 43210")).toBe(true);
  });
  it("accepts a +91 / 91 prefixed number", () => {
    expect(isValidPhone("+91 98765 43210")).toBe(true);
    expect(isValidPhone("919876543210")).toBe(true);
  });
  it("rejects the wrong length or non-digits", () => {
    expect(isValidPhone("98765")).toBe(false);
    expect(isValidPhone("12345678901")).toBe(false); // 11 digits
    expect(isValidPhone("phone-number")).toBe(false);
    expect(isValidPhone("")).toBe(false);
  });
});
