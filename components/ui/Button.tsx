import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "solid" | "outline" | "accent" | "light";

const base =
  "group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden px-7 h-14 label !text-[0.75rem] font-medium transition-[transform,background-color,color,border-color] duration-300 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-paper hover:bg-accent hover:text-ink",
  accent: "bg-accent text-ink hover:bg-ink hover:text-paper",
  outline: "border border-current text-current hover:bg-ink hover:text-paper hover:border-ink",
  light: "bg-paper text-ink hover:bg-accent",
};

export function buttonClasses(variant: Variant = "solid", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

export function ButtonLink({
  variant = "solid",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClasses(variant, className)} {...props} />;
}

export function Button({ variant = "solid", className, ...props }: ComponentProps<"button"> & { variant?: Variant }) {
  return <button type="button" className={buttonClasses(variant, className)} {...props} />;
}

export function ButtonAnchor({ variant = "solid", className, ...props }: ComponentProps<"a"> & { variant?: Variant }) {
  return <a className={buttonClasses(variant, className)} {...props} />;
}
