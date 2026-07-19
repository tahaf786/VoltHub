import { describe, expect, it } from "vitest";
import {
  siteConfig,
  mailtoHref,
  whatsappHref,
  mapsHref,
} from "./site-config";

describe("siteConfig", () => {
  it("uses the intended public contact email", () => {
    expect(siteConfig.contact.email).toBe("algorithms4dev@gmail.com");
  });

  it("is priced in Indian Rupees", () => {
    expect(siteConfig.currency.code).toBe("INR");
    expect(siteConfig.currency.symbol).toBe("₹");
  });

  it("has an absolute https canonical URL with no trailing slash", () => {
    expect(siteConfig.url).toMatch(/^https:\/\//);
    expect(siteConfig.url).not.toMatch(/\/$/);
  });

  it("keeps WhatsApp a placeholder (no real phone number committed)", () => {
    // Public repo: no real phone numbers. Empty = not-yet-configured.
    expect(siteConfig.contact.whatsapp).toBe("");
  });

  it("contains no personal/identifying info (no founder names / team size / real phone)", () => {
    const blob = JSON.stringify(siteConfig).toLowerCase();
    for (const banned of ["founder", "co-founder", "two-person", "just us", "team of", "owner:"]) {
      expect(blob).not.toContain(banned);
    }
    // No 10+ digit run anywhere (would look like a real phone number).
    expect(JSON.stringify(siteConfig)).not.toMatch(/\d{10,}/);
  });

  it("nav is in-page anchors, all unique", () => {
    const hrefs = siteConfig.nav.map((n) => n.href);
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) expect(href).toMatch(/^#[a-z-]+$/);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});

describe("mailtoHref", () => {
  it("builds a bare mailto with no query when given nothing", () => {
    expect(mailtoHref()).toBe("mailto:algorithms4dev@gmail.com");
  });

  it("encodes subject and body", () => {
    const href = mailtoHref("Order #12 & more", "Line 1\nLine 2");
    expect(href).toContain("mailto:algorithms4dev@gmail.com?");
    expect(href).toContain("subject=Order%20%2312%20%26%20more");
    expect(href).toContain("body=Line%201%0ALine%202");
  });
});

describe("whatsappHref", () => {
  it("returns null while WhatsApp is unconfigured", () => {
    expect(whatsappHref("hi")).toBeNull();
  });
});

describe("mapsHref", () => {
  it("builds an encoded Google Maps search URL for the store address", () => {
    const href = mapsHref();
    expect(href).toMatch(/^https:\/\/www\.google\.com\/maps\/search\/\?api=1&query=/);
    expect(href).toContain(encodeURIComponent(siteConfig.store.address));
  });
});
