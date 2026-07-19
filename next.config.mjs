/**
 * Next.js configuration.
 *
 * Security headers are applied to every route. Two directives are
 * PRODUCTION-ONLY, gated on `isDev`, because they break local development:
 *   - `upgrade-insecure-requests` forces assets to HTTPS, which the plain-HTTP
 *     dev server (and phones testing over LAN) cannot serve → unstyled page.
 *   - `Strict-Transport-Security` (HSTS) pins HTTPS and has no place on http://localhost.
 * See CLAUDE.md §7 (regression guards) for the scar tissue behind this.
 */

const isDev = process.env.NODE_ENV !== "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  // Next.js injects small inline bootstrap scripts; 'unsafe-eval' is only needed
  // for React Fast Refresh in dev.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? " ws:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  // Production-only: forces HTTPS. Excluded in dev so LAN/phone testing works.
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  // Production-only: HSTS activates once served over HTTPS (Vercel).
  ...(isDev
    ? []
    : [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }]),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
