"use client";

import * as React from "react";
import { Menu, ShoppingBag, X, Zap } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { useCart } from "@/hooks/use-cart";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const { count } = useCart();

  // Lock body scroll while the mobile menu is open.
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 pt-safe backdrop-blur-md">
      <div className="border-b border-line bg-background/70">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-safe">
          <a
            href="#top"
            className="flex items-center gap-2 rounded-full font-display text-lg font-semibold tracking-tight"
          >
            <span className="grid size-8 place-items-center rounded-full bg-accent text-accent-foreground">
              <Zap className="size-4" aria-hidden="true" />
            </span>
            <span>{siteConfig.name}</span>
          </a>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-7 md:flex"
          >
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            {/* Reservation cart */}
            <a
              href="#reservation"
              aria-label={
                count > 0
                  ? `Reservation, ${count} item${count === 1 ? "" : "s"}`
                  : "Reservation"
              }
              className="relative grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-surface-2"
            >
              <ShoppingBag className="size-5" aria-hidden="true" />
              {count > 0 ? (
                <span className="absolute right-0.5 top-0.5 grid h-[1.1rem] min-w-[1.1rem] place-items-center rounded-full bg-accent px-1 text-[11px] font-semibold leading-none text-accent-foreground">
                  {count}
                </span>
              ) : null}
            </a>

            <div className="hidden md:block">
              <a href="#reservation" className={buttonClasses({ size: "sm" })}>
                Reserve pickup
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full text-foreground md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <X className="size-6" aria-hidden="true" />
              ) : (
                <Menu className="size-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        hidden={!open}
        className={cn(
          "md:hidden",
          "border-b border-line bg-background/95 backdrop-blur-md",
        )}
      >
        <nav
          aria-label="Mobile"
          className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-safe py-4"
        >
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base text-foreground transition-colors hover:bg-surface-2"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#reservation"
            onClick={() => setOpen(false)}
            className={buttonClasses({ className: "mt-3 w-full" })}
          >
            Reserve pickup
          </a>
        </nav>
      </div>
    </header>
  );
}
