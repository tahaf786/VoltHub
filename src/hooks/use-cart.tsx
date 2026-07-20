"use client";

import * as React from "react";
import { PRODUCTS, type Product } from "@/lib/catalog";
import { cartCount, cartTotal } from "@/lib/reservation";

/**
 * Client-side reservation cart, persisted to localStorage. No backend — the
 * reservation lives in the browser until the shopper collects in store
 * (CLAUDE.md §5.1). Quantities are always clamped to honest stock.
 *
 * Implemented as a tiny module-level store read through `useSyncExternalStore`,
 * which gives SSR-safe hydration (server snapshot = empty, no mismatch) without
 * setState-in-effect, and is shared across components with no provider.
 */

const STORAGE_KEY = "volthub.cart.v1";
const BY_ID = new Map(PRODUCTS.map((p) => [p.id, p] as const));

type CartItem = { id: string; qty: number };
export type CartLine = { product: Product; qty: number };

const EMPTY: CartItem[] = [];
let items: CartItem[] = EMPTY;
let initialized = false;
const listeners = new Set<() => void>();

function clampToStock(id: string, qty: number): number {
  const stock = BY_ID.get(id)?.stock ?? 0;
  return Math.min(stock, Math.max(0, Math.floor(qty)));
}

function readStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return EMPTY;
    const next = parsed
      .filter(
        (i): i is CartItem =>
          !!i &&
          typeof i.id === "string" &&
          Number.isFinite(i.qty) &&
          BY_ID.has(i.id),
      )
      .map((i) => ({ id: i.id, qty: clampToStock(i.id, i.qty) }))
      .filter((i) => i.qty > 0);
    return next.length > 0 ? next : EMPTY;
  } catch {
    return EMPTY;
  }
}

function ensureInitialized(): void {
  if (initialized) return;
  initialized = true;
  const loaded = readStorage();
  if (loaded !== EMPTY) items = loaded;
}

function commit(next: CartItem[]): void {
  items = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore storage failures (private mode / quota).
  }
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): CartItem[] {
  ensureInitialized();
  return items;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY;
}

// --- mutations (stable module functions) ---

function add(product: Product, qty = 1): void {
  if (product.stock <= 0) return; // out of stock — cannot reserve
  const existing = items.find((i) => i.id === product.id);
  const nextQty = Math.min(product.stock, (existing?.qty ?? 0) + qty);
  commit(
    existing
      ? items.map((i) => (i.id === product.id ? { ...i, qty: nextQty } : i))
      : [...items, { id: product.id, qty: nextQty }],
  );
}

function setQty(id: string, qty: number): void {
  const clamped = clampToStock(id, qty);
  commit(
    clamped <= 0
      ? items.filter((i) => i.id !== id)
      : items.map((i) => (i.id === id ? { ...i, qty: clamped } : i)),
  );
}

function remove(id: string): void {
  commit(items.filter((i) => i.id !== id));
}

function clear(): void {
  commit(EMPTY);
}

export interface CartApi {
  lines: CartLine[];
  count: number;
  total: number;
  add: (product: Product, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export function useCart(): CartApi {
  const snapshot = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  return React.useMemo<CartApi>(() => {
    const lines: CartLine[] = snapshot
      .map((i) => {
        const product = BY_ID.get(i.id);
        return product ? { product, qty: i.qty } : null;
      })
      .filter((l): l is CartLine => l !== null);
    return {
      lines,
      count: cartCount(snapshot),
      total: cartTotal(lines.map((l) => ({ price: l.product.price, qty: l.qty }))),
      add,
      setQty,
      remove,
      clear,
    };
  }, [snapshot]);
}
