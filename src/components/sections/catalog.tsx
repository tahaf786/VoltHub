"use client";

import * as React from "react";
import { PRODUCTS, type Product } from "@/lib/catalog";
import { Section, SectionHeading } from "@/components/shared/section";
import { ProductCard } from "@/components/catalog/product-card";
import { ProductDialog } from "@/components/catalog/product-dialog";

export function CatalogSection() {
  const [openProduct, setOpenProduct] = React.useState<Product | null>(null);

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

      <div
        className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        role="list"
        aria-label="Products"
      >
        {PRODUCTS.map((product) => (
          <div role="listitem" key={product.id}>
            <ProductCard
              product={product}
              onDetails={setOpenProduct}
              onReserve={reserve}
            />
          </div>
        ))}
      </div>

      <ProductDialog
        product={openProduct}
        onClose={() => setOpenProduct(null)}
        onReserve={reserve}
      />
    </Section>
  );
}
