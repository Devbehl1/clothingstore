"use client";

import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  label?: string;
}

export function QuantityStepper({ value, onChange, min = 1, max = 10, size = "md", label = "Quantity" }: QuantityStepperProps) {
  const h = size === "sm" ? "h-9" : "h-14";
  const w = size === "sm" ? "w-9" : "w-12";
  return (
    <div role="group" aria-label={label} className={`inline-flex items-center border border-ink/20 ${h}`}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={`grid h-full ${w} place-items-center transition-colors hover:bg-ink hover:text-paper disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink`}
      >
        <Minus size={14} />
      </button>
      <span aria-live="polite" className={`label grid h-full min-w-8 place-items-center !text-[0.8rem] ${size === "md" ? "min-w-10" : ""}`}>
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={`grid h-full ${w} place-items-center transition-colors hover:bg-ink hover:text-paper disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink`}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
