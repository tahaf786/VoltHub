/**
 * Central, editable source of truth for the shop's identity, contact, store
 * details, and navigation. A client can change everything here in one place.
 *
 * PUBLIC-REPO RULES (see CLAUDE.md §5.6): no personal/founder names, no team
 * size, no real phone numbers. `whatsapp` stays "" until a real number is wired
 * up at launch. Enforced by site-config.test.ts.
 */

export const siteConfig = {
  name: "VoltHub",
  legalName: "VoltHub — Mobile Accessories",
  tagline: "Cases, skins, glass & gear — reserved for pickup.",
  description:
    "Browse cases, skins, tempered glass, chargers, cables, earbuds and power banks. Reserve in-store for pickup, or design your own modular phone skin.",
  // Canonical URL — placeholder until a real domain is set (drives OG + sitemap).
  url: "https://volthub.example.com",

  currency: {
    code: "INR",
    symbol: "₹",
  },

  contact: {
    email: "algorithms4dev@gmail.com",
    // Placeholder — set a real E.164 number (digits only) at launch, e.g. "919876543210".
    whatsapp: "",
  },

  store: {
    name: "VoltHub — Mobile Accessories",
    address: "42 MG Road, Bengaluru 560001",
    area: "Bengaluru",
    hours: [
      { days: "Mon–Sat", time: "10:30 – 20:30" },
      { days: "Sun", time: "Closed" },
    ],
  },

  // In-page navigation anchors (single long-scroll page).
  nav: [
    { label: "Catalog", href: "#catalog" },
    { label: "Skin Designer", href: "#skin-designer" },
    { label: "Reserve", href: "#reservation" },
    { label: "Visit", href: "#store" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

/** `mailto:` link with optional URL-encoded subject/body (spaces as %20). */
export function mailtoHref(subject?: string, body?: string): string {
  const base = `mailto:${siteConfig.contact.email}`;
  const parts: string[] = [];
  if (subject) parts.push(`subject=${encodeURIComponent(subject)}`);
  if (body) parts.push(`body=${encodeURIComponent(body)}`);
  return parts.length > 0 ? `${base}?${parts.join("&")}` : base;
}

/**
 * `wa.me` deep link, or `null` while WhatsApp is unconfigured — callers should
 * hide the WhatsApp control when this returns null rather than render a dead link.
 */
export function whatsappHref(message?: string): string | null {
  const digits = siteConfig.contact.whatsapp.replace(/\D/g, "");
  if (!digits) return null;
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Google Maps search link for the store address. */
export function mapsHref(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    siteConfig.store.address,
  )}`;
}
