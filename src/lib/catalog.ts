/**
 * Catalog data model + PURE stock logic (unit-tested in catalog.test.ts).
 *
 * Demo data only — a client edits this file to reflect real inventory. Stock
 * counts are HONEST: the UI shows exactly what's here, and 0 means an item
 * cannot be reserved (CLAUDE.md §5.2).
 */

export type Category =
  | "cases"
  | "skins"
  | "glass"
  | "chargers"
  | "cables"
  | "earbuds"
  | "power-banks"
  | "holders";

export interface CategoryMeta {
  id: Category;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  /** Whole rupees (see money.ts). */
  price: number;
  /** Honest units on the shelf. 0 = out of stock. */
  stock: number;
  /** Compatible phone models, or ["Universal"]. */
  models: string[];
  blurb: string;
  featured?: boolean;
}

export const CATEGORIES: CategoryMeta[] = [
  { id: "cases", label: "Cases" },
  { id: "skins", label: "Skins" },
  { id: "glass", label: "Tempered Glass" },
  { id: "chargers", label: "Chargers" },
  { id: "cables", label: "Cables" },
  { id: "earbuds", label: "Earbuds" },
  { id: "power-banks", label: "Power Banks" },
  { id: "holders", label: "Holders" },
];

export const PHONE_MODELS: string[] = [
  "iPhone 15 Pro Max",
  "iPhone 15",
  "iPhone 14",
  "Samsung Galaxy S24 Ultra",
  "Samsung Galaxy S23",
  "OnePlus 12",
  "Google Pixel 8",
  "Nothing Phone 2",
  "Redmi Note 13",
  "iQOO Neo 9",
];

export const PRODUCTS: Product[] = [
  // Cases
  {
    id: "case-aramid",
    name: "Aramid Fiber Case",
    brand: "AeroShell",
    category: "cases",
    price: 1499,
    stock: 6,
    models: ["iPhone 15 Pro Max"],
    blurb: "Feather-light real aramid weave. Slim, grippy, MagSafe-friendly.",
    featured: true,
  },
  {
    id: "case-clear-magsafe",
    name: "Clear MagSafe Case",
    brand: "AeroShell",
    category: "cases",
    price: 899,
    stock: 2,
    models: ["iPhone 15"],
    blurb: "Anti-yellow clear back with a strong magnetic ring.",
  },
  {
    id: "case-silicone-grip",
    name: "Silicone Grip Case",
    brand: "AeroShell",
    category: "cases",
    price: 699,
    stock: 12,
    models: ["Samsung Galaxy S24 Ultra"],
    blurb: "Soft-touch silicone with a microfibre lining.",
  },
  {
    id: "case-rugged-armor",
    name: "Rugged Armor Case",
    brand: "AeroShell",
    category: "cases",
    price: 1099,
    stock: 0,
    models: ["OnePlus 12"],
    blurb: "Dual-layer drop protection with raised camera lip.",
  },
  // Skins
  {
    id: "skin-carbon",
    name: "Carbon Weave Skin",
    brand: "SkinLab",
    category: "skins",
    price: 599,
    stock: 20,
    models: ["iPhone 15 Pro Max"],
    blurb: "Precision-cut 3M vinyl. Adds grip without bulk.",
    featured: true,
  },
  {
    id: "skin-matte-black",
    name: "Matte Black Skin",
    brand: "SkinLab",
    category: "skins",
    price: 499,
    stock: 8,
    models: ["Google Pixel 8"],
    blurb: "Stealthy matte finish, fingerprint-resistant.",
  },
  {
    id: "skin-holographic",
    name: "Holographic Skin",
    brand: "SkinLab",
    category: "skins",
    price: 649,
    stock: 3,
    models: ["Nothing Phone 2"],
    blurb: "Shifts colour in the light. Bubble-free application.",
  },
  // Tempered glass
  {
    id: "glass-9h",
    name: "9H Tempered Glass",
    brand: "GlassGuard",
    category: "glass",
    price: 399,
    stock: 40,
    models: ["iPhone 15"],
    blurb: "Case-friendly edges, oleophobic coating, easy align frame.",
  },
  {
    id: "glass-privacy",
    name: "Privacy Tempered Glass",
    brand: "GlassGuard",
    category: "glass",
    price: 599,
    stock: 15,
    models: ["Samsung Galaxy S23"],
    blurb: "28° privacy filter — dark from the sides, clear head-on.",
  },
  {
    id: "glass-lens",
    name: "Camera Lens Protector",
    brand: "GlassGuard",
    category: "glass",
    price: 299,
    stock: 25,
    models: ["iPhone 15 Pro Max"],
    blurb: "Tempered glass rings that keep your lenses scratch-free.",
  },
  // Chargers
  {
    id: "charger-65w-gan",
    name: "65W GaN Charger",
    brand: "PowerLine",
    category: "chargers",
    price: 1899,
    stock: 5,
    models: ["Universal"],
    blurb: "Compact GaN brick — charges phone, tablet and laptop.",
    featured: true,
  },
  {
    id: "charger-20w",
    name: "20W USB-C Charger",
    brand: "PowerLine",
    category: "chargers",
    price: 999,
    stock: 1,
    models: ["Universal"],
    blurb: "Fast, pocketable PD wall charger.",
  },
  // Cables
  {
    id: "cable-usbc-braided",
    name: "Braided USB-C to C Cable",
    brand: "PowerLine",
    category: "cables",
    price: 499,
    stock: 30,
    models: ["Universal"],
    blurb: "100W-rated, 1.5m nylon braid that won't fray.",
  },
  {
    id: "cable-usbc-lightning",
    name: "USB-C to Lightning Cable",
    brand: "PowerLine",
    category: "cables",
    price: 799,
    stock: 9,
    models: ["iPhone 14"],
    blurb: "MFi-certified fast-charge cable, 1m.",
  },
  // Earbuds
  {
    id: "buds-tws-pro",
    name: "TWS Earbuds Pro",
    brand: "SonicWave",
    category: "earbuds",
    price: 2499,
    stock: 4,
    models: ["Universal"],
    blurb: "ANC, 30h total battery, low-latency game mode.",
    featured: true,
  },
  {
    id: "buds-sport",
    name: "Sport Earbuds",
    brand: "SonicWave",
    category: "earbuds",
    price: 1799,
    stock: 2,
    models: ["Universal"],
    blurb: "Secure ear-hooks, IPX5 sweat resistance.",
  },
  // Power banks
  {
    id: "pb-10000",
    name: "10000mAh Power Bank",
    brand: "PowerLine",
    category: "power-banks",
    price: 1499,
    stock: 7,
    models: ["Universal"],
    blurb: "Slim 22.5W bank with dual USB-C in/out.",
  },
  {
    id: "pb-20000-pd",
    name: "20000mAh PD Power Bank",
    brand: "PowerLine",
    category: "power-banks",
    price: 2299,
    stock: 0,
    models: ["Universal"],
    blurb: "65W PD — tops up a laptop in a pinch.",
  },
  // Holders
  {
    id: "holder-car-mount",
    name: "Magnetic Car Mount",
    brand: "GripTech",
    category: "holders",
    price: 899,
    stock: 11,
    models: ["Universal"],
    blurb: "Strong N52 magnets, vent clip, one-hand docking.",
  },
  {
    id: "holder-desk-stand",
    name: "Adjustable Desk Stand",
    brand: "GripTech",
    category: "holders",
    price: 649,
    stock: 6,
    models: ["Universal"],
    blurb: "Aluminium fold-flat stand, any angle.",
  },
];

export type StockLevel = "out" | "low" | "in";

/** Low threshold: 3 or fewer (but > 0) reads as "only a few left". */
export function stockLevel(stock: number): StockLevel {
  const n = Math.floor(stock);
  if (n <= 0) return "out";
  if (n <= 3) return "low";
  return "in";
}

/** Honest, human stock string shown on cards and detail. */
export function stockLabel(stock: number): string {
  const n = Math.floor(stock);
  if (n <= 0) return "Out of stock";
  if (n <= 3) return `Only ${n} left in store`;
  return `${n} in store`;
}

/** An item can be reserved only while stock remains. */
export function isReservable(product: { stock: number }): boolean {
  return Math.floor(product.stock) > 0;
}

/** Human label for a category id. */
export function categoryLabel(id: Category): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
