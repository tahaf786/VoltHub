"use client";

import { formatINR } from "@/lib/money";
import {
  categoryLabel,
  isReservable,
  stockLabel,
  stockLevel,
  type Product,
  type StockLevel,
} from "@/lib/catalog";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProductImage } from "./product-image";

const STOCK_STYLE: Record<StockLevel, string> = {
  in: "text-success",
  low: "text-warning",
  out: "text-danger",
};

export function ProductCard({
  product,
  onDetails,
  onReserve,
}: {
  product: Product;
  onDetails: (p: Product) => void;
  onReserve: (p: Product) => void;
}) {
  const level = stockLevel(product.stock);
  const reservable = isReservable(product);

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface/50 transition-colors hover:border-line-strong">
      <div className="relative">
        <ProductImage category={product.category} />
        <span className="absolute left-3 top-3 rounded-full bg-background/70 px-2.5 py-1 text-xs text-muted backdrop-blur">
          {categoryLabel(product.category)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-muted">{product.brand}</p>
        <h3 className="mt-0.5 font-display text-base font-semibold leading-tight">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{product.blurb}</p>

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="font-display text-lg font-semibold">
            {formatINR(product.price)}
          </span>
          <span className={cn("text-xs font-medium", STOCK_STYLE[level])}>
            {stockLabel(product.stock)}
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => onDetails(product)}
            className={buttonClasses({
              variant: "outline",
              size: "sm",
              className: "flex-1",
            })}
          >
            Details
          </button>
          <button
            type="button"
            onClick={() => onReserve(product)}
            disabled={!reservable}
            className={buttonClasses({ size: "sm", className: "flex-1" })}
          >
            {reservable ? "Reserve" : "Sold out"}
          </button>
        </div>
      </div>
    </article>
  );
}
