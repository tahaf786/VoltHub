"use client";

import { Search, X } from "lucide-react";
import { CATEGORIES, PHONE_MODELS } from "@/lib/catalog";
import type { FilterState } from "@/lib/filter";
import { formatINR } from "@/lib/money";
import { cn } from "@/lib/utils";

export function CatalogFilters({
  filter,
  onChange,
  bounds,
  resultCount,
  total,
  isFiltered,
  onClear,
}: {
  filter: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
  bounds: { min: number; max: number };
  resultCount: number;
  total: number;
  isFiltered: boolean;
  onClear: () => void;
}) {
  const maxPrice = filter.maxPrice ?? bounds.max;

  return (
    <div className="rounded-2xl border border-line bg-surface/40 p-4 sm:p-5">
      {/* Search */}
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
        <input
          type="search"
          value={filter.query}
          onChange={(e) => onChange({ query: e.target.value })}
          placeholder="Search cases, chargers, brands…"
          aria-label="Search products"
          className="h-11 w-full rounded-xl border border-line bg-background/60 pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted focus-visible:border-accent"
        />
      </div>

      {/* Category chips */}
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Category">
        <Chip
          active={filter.category === "all"}
          onClick={() => onChange({ category: "all" })}
        >
          All
        </Chip>
        {CATEGORIES.map((c) => (
          <Chip
            key={c.id}
            active={filter.category === c.id}
            onClick={() => onChange({ category: c.id })}
          >
            {c.label}
          </Chip>
        ))}
      </div>

      {/* Model + price */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-xs text-muted">
          Phone model
          <select
            value={filter.model}
            onChange={(e) => onChange({ model: e.target.value })}
            className="h-11 rounded-xl border border-line bg-background/60 px-3 text-sm text-foreground outline-none focus-visible:border-accent"
          >
            <option value="all">All models</option>
            {PHONE_MODELS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-xs text-muted">
          <span className="flex items-center justify-between">
            <span>Max price</span>
            <span className="font-medium text-foreground">
              {maxPrice >= bounds.max ? "Any" : `Up to ${formatINR(maxPrice)}`}
            </span>
          </span>
          <input
            type="range"
            min={bounds.min}
            max={bounds.max}
            step={50}
            value={maxPrice}
            onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
            aria-label="Maximum price"
            className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-line accent-accent"
          />
        </label>
      </div>

      {/* Result count + clear */}
      <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
        <p className="text-sm text-muted" aria-live="polite">
          Showing <span className="font-medium text-foreground">{resultCount}</span> of{" "}
          {total}
        </p>
        {isFiltered ? (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
          >
            <X className="size-4" aria-hidden="true" />
            Clear filters
          </button>
        ) : null}
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full px-3 py-1.5 text-sm transition-colors",
        active
          ? "bg-accent text-accent-foreground"
          : "border border-line text-muted hover:border-line-strong hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
