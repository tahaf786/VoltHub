import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap " +
  "transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent " +
  "focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent-strong shadow-[0_0_24px_-6px_var(--color-accent)]",
  outline:
    "border border-line-strong text-foreground hover:border-accent hover:text-accent bg-transparent",
  ghost: "text-muted hover:text-foreground hover:bg-surface-2",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

/** Shared class string so links (`<a>`) can look like buttons without nesting. */
export function buttonClasses(opts?: {
  variant?: Variant;
  size?: Size;
  className?: string;
}): string {
  const { variant = "primary", size = "md", className } = opts ?? {};
  return cn(base, variants[variant], sizes[size], className);
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, variant, size, type = "button", ...props }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses({ variant, size, className })}
        {...props}
      />
    );
  },
);
