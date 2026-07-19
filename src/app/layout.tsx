import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "VoltHub — Mobile Accessories in Bengaluru",
    template: "%s · VoltHub",
  },
  description:
    "Browse cases, skins, tempered glass, chargers, cables, earbuds and power banks. Reserve in-store for pickup, or design your own modular phone skin.",
};

export const viewport: Viewport = {
  themeColor: "#0a0b10",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
