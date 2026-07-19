import { MapPin, ScanLine, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { buttonClasses } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-safe py-16 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        {/* Copy */}
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
            <MapPin className="size-3.5 text-accent" aria-hidden="true" />
            {siteConfig.store.area} · in-store pickup, no delivery
          </p>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Gear up your phone.{" "}
            <span className="bg-gradient-to-r from-accent to-violet bg-clip-text text-transparent">
              Reserve it in seconds.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {siteConfig.description} Browse honest live stock, hold what you want,
            and grab a pickup code — pay when you collect at the counter.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#catalog" className={buttonClasses({ size: "lg" })}>
              <ScanLine className="size-5" aria-hidden="true" />
              Browse the catalog
            </a>
            <a
              href="#skin-designer"
              className={buttonClasses({ variant: "outline", size: "lg" })}
            >
              <Sparkles className="size-5" aria-hidden="true" />
              Design a skin
            </a>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
            {[
              { value: "200+", label: "accessories in store" },
              { value: "Live", label: "stock counts" },
              { value: "₹0", label: "to reserve" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-2xl font-semibold text-foreground">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Decorative neon device — static SVG (no random/trig → no hydration
            mismatch, guard #3). Hidden from assistive tech. */}
        <div className="relative mx-auto hidden w-full max-w-sm lg:block" aria-hidden="true">
          <div className="absolute inset-0 -z-10 rounded-[3rem] bg-accent/10 blur-3xl" />
          <div className="mx-auto aspect-[9/19] w-64 rounded-[2.5rem] border border-line-strong bg-surface p-3 shadow-2xl">
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-gradient-to-b from-surface-2 to-background">
              <div className="absolute left-1/2 top-3 h-5 w-20 -translate-x-1/2 rounded-full bg-background/80" />
              <div className="absolute inset-x-6 top-16 space-y-3">
                <div className="h-24 rounded-2xl bg-gradient-to-br from-accent/30 to-violet/25" />
                <div className="h-3 w-2/3 rounded-full bg-line-strong" />
                <div className="h-3 w-1/2 rounded-full bg-line" />
                <div className="mt-4 h-9 w-28 rounded-full bg-accent/80" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
