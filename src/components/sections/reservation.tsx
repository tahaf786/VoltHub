"use client";

import * as React from "react";
import { Check, MapPin, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { formatINR } from "@/lib/money";
import {
  generatePickupCode,
  isValidName,
  isValidPhone,
} from "@/lib/reservation";
import { siteConfig } from "@/lib/site-config";
import { Section, SectionHeading } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/catalog/product-image";

type Confirmation = {
  code: string;
  name: string;
  phone: string;
  lines: { name: string; qty: number; price: number }[];
  total: number;
};

export function ReservationSection() {
  const cart = useCart();
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [attempted, setAttempted] = React.useState(false);
  const [confirmation, setConfirmation] = React.useState<Confirmation | null>(
    null,
  );

  const nameOk = isValidName(name);
  const phoneOk = isValidPhone(phone);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAttempted(true);
    if (!nameOk || !phoneOk || cart.lines.length === 0) return;
    setConfirmation({
      code: generatePickupCode(),
      name: name.trim(),
      phone: phone.trim(),
      lines: cart.lines.map((l) => ({
        name: l.product.name,
        qty: l.qty,
        price: l.product.price,
      })),
      total: cart.total,
    });
    cart.clear();
    setName("");
    setPhone("");
    setAttempted(false);
  }

  return (
    <Section id="reservation">
      <SectionHeading
        eyebrow="Hold it"
        title="Reserve for in-store pickup"
        description="Add items to your reservation, drop your name and phone, and get a pickup code. No payment online — you pay when you collect at the counter."
      />

      <div className="mt-8">
        {confirmation ? (
          <Confirmed
            confirmation={confirmation}
            onReset={() => setConfirmation(null)}
          />
        ) : cart.lines.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            {/* Cart list */}
            <ul className="flex flex-col gap-3" aria-label="Reservation items">
              {cart.lines.map((line) => (
                <li
                  key={line.product.id}
                  className="flex items-center gap-3 rounded-2xl border border-line bg-surface/50 p-3"
                >
                  <ProductImage
                    product={line.product}
                    sizes="80px"
                    className="aspect-square w-20 shrink-0 rounded-xl"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{line.product.name}</p>
                    <p className="text-sm text-muted">
                      {formatINR(line.product.price)} each
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Stepper
                        qty={line.qty}
                        max={line.product.stock}
                        onDec={() =>
                          cart.setQty(line.product.id, line.qty - 1)
                        }
                        onInc={() =>
                          cart.setQty(line.product.id, line.qty + 1)
                        }
                      />
                      <button
                        type="button"
                        onClick={() => cart.remove(line.product.id)}
                        aria-label={`Remove ${line.product.name}`}
                        className="ml-1 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-muted hover:text-danger"
                      >
                        <Trash2 className="size-4" aria-hidden="true" />
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="shrink-0 font-display font-semibold">
                    {formatINR(line.product.price * line.qty)}
                  </p>
                </li>
              ))}
            </ul>

            {/* Details form */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="h-fit rounded-2xl border border-line bg-surface/50 p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-muted">
                  {cart.count} item{cart.count === 1 ? "" : "s"}
                </span>
                <span className="font-display text-xl font-semibold">
                  {formatINR(cart.total)}
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                <Field
                  label="Your name"
                  id="res-name"
                  value={name}
                  onChange={setName}
                  invalid={attempted && !nameOk}
                  error="Please enter your name."
                  autoComplete="name"
                />
                <Field
                  label="Phone number"
                  id="res-phone"
                  value={phone}
                  onChange={setPhone}
                  invalid={attempted && !phoneOk}
                  error="Enter a 10-digit mobile number."
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="9876543210"
                />
              </div>

              <Button type="submit" size="lg" className="mt-5 w-full">
                Get pickup code
              </Button>
              <p className="mt-3 text-center text-xs text-muted">
                We hold your items in store. No payment now — pay on pickup.
              </p>
            </form>
          </div>
        )}
      </div>
    </Section>
  );
}

function Stepper({
  qty,
  max,
  onDec,
  onInc,
}: {
  qty: number;
  max: number;
  onDec: () => void;
  onInc: () => void;
}) {
  return (
    <div className="inline-flex items-center rounded-lg border border-line">
      <button
        type="button"
        onClick={onDec}
        aria-label="Decrease quantity"
        className="grid size-8 place-items-center text-muted hover:text-foreground"
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <span className="min-w-8 text-center text-sm tabular-nums" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        onClick={onInc}
        disabled={qty >= max}
        aria-label="Increase quantity"
        className="grid size-8 place-items-center text-muted hover:text-foreground disabled:opacity-40"
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  invalid,
  error,
  ...input
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  invalid: boolean;
  error: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "id">) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs text-muted">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={invalid}
        aria-describedby={invalid ? `${id}-error` : undefined}
        className="h-11 rounded-xl border border-line bg-background/60 px-3 text-sm text-foreground outline-none focus-visible:border-accent aria-[invalid=true]:border-danger"
        {...input}
      />
      {invalid ? (
        <p id={`${id}-error`} className="text-xs text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-line-strong bg-surface/40 p-10 text-center">
      <p className="text-foreground">Your reservation is empty.</p>
      <p className="mt-1 text-sm text-muted">
        Browse the catalog and reserve what&apos;s in store.
      </p>
      <a href="#catalog" className="mt-4 inline-block">
        <Button variant="outline" size="sm">
          Browse the catalog
        </Button>
      </a>
    </div>
  );
}

function Confirmed({
  confirmation,
  onReset,
}: {
  confirmation: Confirmation;
  onReset: () => void;
}) {
  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-accent/40 bg-surface/60 p-6 text-center sm:p-8">
      <div className="mx-auto grid size-12 place-items-center rounded-full bg-accent text-accent-foreground">
        <Check className="size-6" aria-hidden="true" />
      </div>
      <h3 className="mt-4 font-display text-2xl font-semibold">
        Reserved for pickup
      </h3>
      <p className="mt-1 text-sm text-muted">
        Show this code at the counter, {confirmation.name.split(" ")[0]}.
      </p>

      <p className="mt-5 text-xs uppercase tracking-widest text-muted">
        Pickup code
      </p>
      <p
        className="mt-1 font-display text-4xl font-bold tracking-[0.15em] text-accent"
        data-testid="pickup-code"
      >
        {confirmation.code}
      </p>

      <ul className="mt-6 divide-y divide-line rounded-2xl border border-line text-left text-sm">
        {confirmation.lines.map((l, i) => (
          <li key={i} className="flex items-center justify-between px-4 py-2.5">
            <span className="text-muted">
              {l.qty} × {l.name}
            </span>
            <span>{formatINR(l.price * l.qty)}</span>
          </li>
        ))}
        <li className="flex items-center justify-between px-4 py-3 font-semibold">
          <span>Total (pay on pickup)</span>
          <span className="font-display">{formatINR(confirmation.total)}</span>
        </li>
      </ul>

      <div className="mt-5 flex items-start justify-center gap-2 text-sm text-muted">
        <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
        <span>
          {siteConfig.store.address} · held under {confirmation.phone}
        </span>
      </div>

      <Button variant="outline" className="mt-6" onClick={onReset}>
        Start a new reservation
      </Button>
    </div>
  );
}
