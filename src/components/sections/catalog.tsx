"use client";

import * as React from "react";
import { PRODUCTS, type Product } from "@/lib/catalog";
import {
  DEFAULT_FILTER,
  filterProducts,
  priceBounds,
  type FilterState,
} from "@/lib/filter";
import { Section, SectionHeading } from "@/components/shared/section";
import { ProductCard } from "@/components/catalog/product-card";
import { ProductDialog } from "@/components/catalog/product-dialog";
import { CatalogFilters } from "@/components/catalog/catalog-filters";
import { Button } from "@/components/ui/button";

const BOUNDS = priceBounds(PRODUCTS);
const INITIAL: FilterState = { ...DEFAULT_FILTER, maxPrice: BOUNDS.max };

export function CatalogSection() {
  const [openProduct, setOpenProduct] = React.useState<Product | null>(null);
  const [filter, setFilter] = React.useState<FilterState>(INITIAL);

  const filtered = React.useMemo(
    () => filterProducts(PRODUCTS, filter),
    [filter],
  );

  const isFiltered =
    filter.query.trim() !== "" ||
    filter.category !== "all" ||
    filter.model !== "all" ||
    (filter.maxPrice ?? BOUNDS.max) < BOUNDS.max;

  const change = React.useCallback(
    (patch: Partial<FilterState>) => setFilter((f) => ({ ...f, ...patch })),
    [],
  );
  const clear = React.useCallback(() => setFilter(INITIAL), []);

  // Reserving is wired to the cart in feat/reservation. For now, close any
  // dialog and take the shopper to the reservation section.
  const reserve = React.useCallback(() => {
    setOpenProduct(null);
    document
      .getElementById("reservation")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <Section id="catalog">
      <SectionHeading
        eyebrow="Browse"
        title="The catalog"
        description="Cases, skins, tempered glass, chargers, cables, earbuds and power banks — with honest live stock. Reserve what's in store and pick it up at the counter."
      />

      <div className="mt-8">
        <CatalogFilters
          filter={filter}
          onChange={change}
          bounds={BOUNDS}
          resultCount={filtered.length}
          total={PRODUCTS.length}
          isFiltered={isFiltered}
          onClear={clear}
        />
      </div>

      {filtered.length > 0 ? (
        <div
          className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          role="list"
          aria-label="Products"
        >
          {filtered.map((product, i) => (
            <div role="listitem" key={product.id}>
              <ProductCard
                product={product}
                onDetails={setOpenProduct}
                onReserve={reserve}
                priority={i < 4}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-line-strong bg-surface/40 p-10 text-center">
          <p className="text-foreground">No products match those filters.</p>
          <p className="mt-1 text-sm text-muted">
            Try a broader search or a higher price.
          </p>
          <Button variant="outline" size="sm" className="mt-4" onClick={clear}>
            Clear filters
          </Button>
        </div>
      )}

      <ProductDialog
        product={openProduct}
        onClose={() => setOpenProduct(null)}
        onReserve={reserve}
      />
    </Section>
  );
}
