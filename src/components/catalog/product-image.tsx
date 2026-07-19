import Image from "next/image";
import {
  BatteryCharging,
  Cable,
  Headphones,
  MonitorSmartphone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { Category, Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";

/**
 * Product thumbnail: a real self-hosted photo (`/public/products/{id}.jpg`) via
 * next/image, layered over a brand neon gradient + category icon that shows
 * through as a graceful fallback if a photo is ever missing. The gradient is
 * deterministic (no random/trig → no hydration mismatch, guard #3).
 */
const META: Record<Category, { Icon: LucideIcon; from: string; to: string }> = {
  cases: { Icon: Smartphone, from: "#2dd4d9", to: "#5b8cff" },
  skins: { Icon: Sparkles, from: "#a78bfa", to: "#2dd4d9" },
  glass: { Icon: ShieldCheck, from: "#38bdf8", to: "#22d3ee" },
  chargers: { Icon: Zap, from: "#2dd4d9", to: "#34d399" },
  cables: { Icon: Cable, from: "#818cf8", to: "#2dd4d9" },
  earbuds: { Icon: Headphones, from: "#a78bfa", to: "#f472b6" },
  "power-banks": { Icon: BatteryCharging, from: "#22d3ee", to: "#34d399" },
  holders: { Icon: MonitorSmartphone, from: "#60a5fa", to: "#a78bfa" },
};

export function ProductImage({
  product,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
  priority = false,
  className,
}: {
  product: Pick<Product, "id" | "category" | "name">;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const { Icon, from, to } = META[product.category];
  return (
    <div
      className={cn(
        "relative grid aspect-[4/3] place-items-center overflow-hidden bg-surface",
        className,
      )}
      style={{ backgroundImage: `linear-gradient(135deg, ${from}30, ${to}1f)` }}
    >
      {/* Fallback backdrop (shows only if the photo fails to load) */}
      <Icon
        className="size-14 text-white/40"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <Image
        src={`/products/${product.id}.jpg`}
        alt={product.name}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
