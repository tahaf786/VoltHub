import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("lets a later Tailwind class override an earlier conflicting one", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-zinc-400", "text-white")).toBe("text-white");
  });

  it("drops falsy values", () => {
    expect(cn("a", false, null, undefined, "", "b")).toBe("a b");
  });

  it("supports conditional object + array syntax", () => {
    expect(cn("a", { b: true, c: false }, ["d"])).toBe("a b d");
  });

  it("returns an empty string for no meaningful input", () => {
    expect(cn()).toBe("");
    expect(cn(false, null, undefined)).toBe("");
  });
});
