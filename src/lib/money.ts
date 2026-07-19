/**
 * Currency: Indian Rupee (₹). All catalog/skin prices are whole-rupee integers
 * (mobile accessories are not priced in paise here). This module is PURE and
 * unit-tested — it is the single source of truth for money formatting so the UI
 * never hand-rolls a `₹` string.
 */

export const CURRENCY_CODE = "INR" as const;
export const CURRENCY_SYMBOL = "₹" as const;

/**
 * Format a whole-rupee amount using Indian digit grouping (₹1,299 · ₹1,23,456).
 *
 * Non-finite input (NaN, Infinity) is treated as 0 so a bad computed price can
 * never render "₹NaN". Fractional input is rounded to the nearest rupee.
 */
export function formatINR(rupees: number): string {
  const safe = Number.isFinite(rupees) ? Math.round(rupees) : 0;
  return `${CURRENCY_SYMBOL}${new Intl.NumberFormat("en-IN").format(safe)}`;
}
