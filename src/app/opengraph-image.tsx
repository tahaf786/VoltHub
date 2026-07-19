import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} — Mobile Accessories`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded Open Graph card. Uses system sans (no external font fetch) to stay
// self-contained. Rendered at build/request time — no hydration concerns.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(1200px 600px at 85% -10%, rgba(45,212,217,0.22), transparent), radial-gradient(900px 500px at -5% 20%, rgba(167,139,250,0.20), transparent), #0a0b10",
          color: "#e8eaf0",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 999,
              background: "#2dd4d9",
              color: "#04131a",
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            ⚡
          </div>
          <div style={{ fontSize: 40, fontWeight: 700 }}>{siteConfig.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            Gear up your phone. Reserve it in seconds.
          </div>
          <div style={{ fontSize: 30, color: "#9aa0b2", maxWidth: 820 }}>
            {`Cases, skins, glass & gear · ${siteConfig.store.area} · in-store pickup, no delivery`}
          </div>
        </div>

        <div style={{ fontSize: 26, color: "#2dd4d9" }}>
          Browse · Reserve · Design your own skin
        </div>
      </div>
    ),
    size,
  );
}
