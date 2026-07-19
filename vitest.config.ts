import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Unit tests cover PURE logic only (Node env, no DOM): money math, filtering,
// reservation/pickup-code logic, skin price calculation. Component/behaviour
// coverage lives in Playwright (see playwright.config.ts).
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    exclude: ["e2e/**", "node_modules/**"],
  },
});
