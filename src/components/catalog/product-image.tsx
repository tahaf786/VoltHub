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
import type { Category } from "@/lib/catalog";
import { cn } from "@/lib/utils";

/**
 * Brand-styled product thumbnail — a category icon over a neon gradient.
 * Deterministic (no random/trig → no hydration mismatch, guard #3). This is a
 * placeholder; swap in a real self-hosted photo via next/image when available
 * (design system calls for real product photos).
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
  category,
  className,
}: {
  category: Category;
  className?: string;
}) {
  const { Icon, from, to } = META[category];
  return (
    <div
      className={cn(
        "relative grid aspect-[4/3] place-items-center overflow-hidden bg-surface",
        className,
      )}
      style={{ backgroundImage: `linear-gradient(135deg, ${from}30, ${to}1f)` }}
    >
      <Icon
        className="size-14 text-white/85"
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </div>
  );
}
