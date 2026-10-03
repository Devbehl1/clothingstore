"use client";

import { useState } from "react";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { buttonClasses } from "@/components/ui/Button";
import { buildCustomOrderMessage, whatsappUrl } from "@/lib/whatsapp";

const TYPES = ["Regular Tee", "Oversized Tee", "Hoodie"];

export function CustomOrderForm() {
  const [product, setProduct] = useState(TYPES[1]);
  const [quantity, setQuantity] = useState("1");
  const [idea, setIdea] = useState("");
  const [error, setError] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim().length < 5) {
      setError(true);
      return;
    }
    window.open(
      whatsappUrl(buildCustomOrderMessage({ product, quantity, idea: idea.trim() })),
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <fieldset>
        <legend className="label">WHAT ARE WE PRINTING ON?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <label key={t} className="cursor-pointer">
              <input
                type="radio"
                name="product"
                value={t}
                checked={product === t}
                onChange={() => setProduct(t)}
                className="peer sr-only"
              />
              <span className="label flex h-11 items-center rounded-full border border-ink/20 px-5 font-medium transition-colors hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-accent">
                {t}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="custom-qty" className="label">
          HOW MANY?
        </label>
        <input
          id="custom-qty"
          type="number"
          min={1}
          inputMode="numeric"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="mt-1 w-full border-0 border-b border-ink/25 bg-transparent py-3 text-base outline-none focus:border-ink"
        />
      </div>
      <div>
        <label htmlFor="custom-idea" className="label">
          DESCRIBE YOUR IDEA
        </label>
        <textarea
          id="custom-idea"
          rows={3}
          value={idea}
          onChange={(e) => {
            setIdea(e.target.value);
            setError(false);
          }}
          aria-invalid={error}
          aria-describedby={error ? "custom-idea-error" : undefined}
          placeholder="e.g. My cat’s face on the back, 'CHAOS CLUB' on the front, black oversized"
          className="mt-1 w-full resize-none border-0 border-b border-ink/25 bg-transparent py-3 text-base outline-none placeholder:text-ink/30 focus:border-ink aria-[invalid=true]:border-accent"
        />
        {error && (
          <p id="custom-idea-error" role="alert" className="mt-2 text-sm text-alert">
            Give us a little more to go on.
          </p>
        )}
      </div>
      <button type="submit" className={buttonClasses("accent", "w-full sm:w-auto")}>
        <WhatsAppIcon size={18} /> SEND ON WHATSAPP
      </button>
    </form>
  );
}
