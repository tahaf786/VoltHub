/**
 * PURE reservation logic (unit-tested in reservation.test.ts): cart math,
 * pickup-code generation, and form validation. No React, no storage — those
 * live in the useCart hook and the UI.
 */

export interface PricedItem {
  price: number;
  qty: number;
}

/** Total price of a cart (₹). Non-positive quantities are ignored. */
export function cartTotal(items: PricedItem[]): number {
  return items.reduce((sum, i) => sum + i.price * Math.max(0, i.qty), 0);
}

/** Total number of units in a cart. Non-positive quantities clamp to 0. */
export function cartCount(items: { qty: number }[]): number {
  return items.reduce((sum, i) => sum + Math.max(0, i.qty), 0);
}

/** Unambiguous code alphabet — no O/0, I/1/L to avoid readback confusion. */
export const PICKUP_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

/**
 * Generate an in-store pickup code like `VH-7K3QP`. `rand` is injectable so the
 * output is deterministic under test; at runtime it uses Math.random (only ever
 * called from a user event handler, never during SSR — guard #3).
 */
export function generatePickupCode(rand: () => number = Math.random): string {
  let code = "";
  for (let i = 0; i < 5; i++) {
    const idx = Math.min(
      PICKUP_ALPHABET.length - 1,
      Math.floor(rand() * PICKUP_ALPHABET.length),
    );
    code += PICKUP_ALPHABET[idx];
  }
  return `VH-${code}`;
}

/** A usable name: at least two non-space characters. */
export function isValidName(name: string): boolean {
  return name.trim().length >= 2;
}

/**
 * A plausible Indian mobile number: 10 digits, or 12 digits with a 91 country
 * prefix. Formatting (spaces, +, dashes) is ignored.
 */
export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return true;
  return digits.length === 12 && digits.startsWith("91");
}
