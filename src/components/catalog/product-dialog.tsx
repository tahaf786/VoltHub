"use client";

import * as React from "react";
import { X } from "lucide-react";
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

/**
 * Product detail using the native <dialog> element — Esc-to-close, focus
 * management and a backdrop for free, no extra dependency. Backdrop clicks are
 * handled manually (a click landing on the dialog element itself = the backdrop).
 */
export function ProductDialog({
  product,
  onClose,
  onReserve,
}: {
  product: Product | null;
  onClose: () => void;
  onReserve: (p: Product) => void;
}) {
  const ref = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (product && !dlg.open) dlg.showModal();
    if (!product && dlg.open) dlg.close();
  }, [product]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      aria-labelledby="product-dialog-title"
      className="m-auto w-[min(92vw,32rem)] rounded-3xl border border-line-strong bg-surface p-0 text-foreground backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      {product ? (
        <div>
          <div className="relative">
            <ProductImage
              category={product.category}
              className="aspect-[16/10] rounded-t-3xl"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-background/70 text-foreground backdrop-blur transition-colors hover:bg-background"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div className="p-6">
            <p className="text-xs text-muted">
              {product.brand} · {categoryLabel(product.category)}
            </p>
            <h2
              id="product-dialog-title"
              className="mt-1 font-display text-2xl font-semibold"
            >
              {product.name}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {product.blurb}
            </p>

            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-muted">Price</dt>
                <dd className="font-display text-lg font-semibold">
                  {formatINR(product.price)}
                </dd>
              </div>
              <div>
                <dt className="text-muted">Availability</dt>
                <dd
                  className={cn(
                    "font-medium",
                    STOCK_STYLE[stockLevel(product.stock)],
                  )}
                >
                  {stockLabel(product.stock)}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-muted">Fits</dt>
                <dd className="text-foreground">{product.models.join(", ")}</dd>
              </div>
            </dl>

            <button
              type="button"
              disabled={!isReservable(product)}
              onClick={() => onReserve(product)}
              className={buttonClasses({ size: "lg", className: "mt-6 w-full" })}
            >
              {isReservable(product) ? "Reserve for pickup" : "Out of stock"}
            </button>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
