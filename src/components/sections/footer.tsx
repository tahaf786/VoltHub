import { Clock, Mail, MapPin, Zap } from "lucide-react";
import { siteConfig, mailtoHref, mapsHref } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer id="store" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-safe py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 font-display text-lg font-semibold">
            <span className="grid size-8 place-items-center rounded-full bg-accent text-accent-foreground">
              <Zap className="size-4" aria-hidden="true" />
            </span>
            {siteConfig.name}
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            {siteConfig.tagline}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
            Visit
          </h3>
          <a
            href={mapsHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-start gap-2 text-sm text-foreground hover:text-accent"
          >
            <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
            {siteConfig.store.address}
          </a>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
            Hours
          </h3>
          <ul className="mt-3 space-y-1.5 text-sm text-foreground">
            {siteConfig.store.hours.map((h) => (
              <li key={h.days} className="flex items-center gap-2">
                <Clock className="size-4 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  {h.days}: {h.time}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
            Contact
          </h3>
          <a
            href={mailtoHref("Question for VoltHub")}
            className="mt-3 flex items-center gap-2 text-sm text-foreground hover:text-accent"
          >
            <Mail className="size-4 shrink-0 text-accent" aria-hidden="true" />
            {siteConfig.contact.email}
          </a>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-safe py-6 pb-safe text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {siteConfig.name} · {siteConfig.store.area}. Demo site — prices and
            stock are illustrative.
          </p>
          <p>No online payment. Reserve and pay in store.</p>
        </div>
      </div>
    </footer>
  );
}
