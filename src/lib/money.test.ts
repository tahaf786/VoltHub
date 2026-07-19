import { describe, expect, it } from "vitest";
import { CURRENCY_CODE, CURRENCY_SYMBOL, formatINR } from "./money";

describe("formatINR", () => {
  it("formats zero", () => {
    expect(formatINR(0)).toBe("₹0");
  });

  it("groups thousands the Indian way", () => {
    expect(formatINR(1299)).toBe("₹1,299");
    expect(formatINR(123456)).toBe("₹1,23,456");
    expect(formatINR(10000000)).toBe("₹1,00,00,000");
  });

  it("rounds fractional rupees to the nearest whole rupee", () => {
    expect(formatINR(1298.6)).toBe("₹1,299");
    expect(formatINR(1299.4)).toBe("₹1,299");
  });

  it("never renders NaN or Infinity — falls back to ₹0", () => {
    expect(formatINR(Number.NaN)).toBe("₹0");
    expect(formatINR(Number.POSITIVE_INFINITY)).toBe("₹0");
  });

  it("handles negative amounts (defensive; prices should be non-negative)", () => {
    expect(formatINR(-500)).toBe("₹-500");
  });

  it("exposes currency constants", () => {
    expect(CURRENCY_CODE).toBe("INR");
    expect(CURRENCY_SYMBOL).toBe("₹");
  });
});
