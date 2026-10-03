"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, X } from "lucide-react";
import { useCart } from "./CartProvider";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { buttonClasses } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import { buildOrderMessage, cartTotal, whatsappUrl } from "@/lib/whatsapp";
import { normalizeIndianPhone, validateCustomer, type CheckoutErrors } from "@/lib/validation";
import type { CustomerDetails } from "@/lib/types";
import { useOverlay } from "@/lib/use-lock-body";
import { STORE_CONFIG } from "@/lib/config";

const DETAILS_KEY = "threadr-customer-v1";
const EMPTY: CustomerDetails = { name: "", phone: "", address: "", note: "" };

function loadSavedDetails(): CustomerDetails {
  try {
    const raw = window.localStorage.getItem(DETAILS_KEY);
    return raw ? { ...EMPTY, ...(JSON.parse(raw) as CustomerDetails), note: "" } : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function CheckoutModal() {
  const { checkoutItems, closeCheckout, closeCart, clearCart, items: cartItems } = useCart();
  const open = checkoutItems !== null;
  useOverlay(open, closeCheckout);

  return open ? (
    <CheckoutDialog
      items={checkoutItems}
      fromCart={checkoutItems === cartItems}
      onClose={closeCheckout}
      onDone={(clear) => {
        if (clear) clearCart();
        closeCheckout();
        closeCart();
      }}
    />
  ) : null;
}

function CheckoutDialog({
  items,
  fromCart,
  onClose,
  onDone,
}: {
  items: NonNullable<ReturnType<typeof useCart>["checkoutItems"]>;
  fromCart: boolean;
  onClose: () => void;
  onDone: (clearCart: boolean) => void;
}) {
  const [details, setDetails] = useState<CustomerDetails>(loadSavedDetails);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const total = cartTotal(items);

  useEffect(() => {
    firstFieldRef.current?.focus({ preventScroll: true });
  }, []);

  const update = (key: keyof CustomerDetails) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDetails((d) => ({ ...d, [key]: e.target.value }));
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateCustomer(details);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = Object.keys(nextErrors)[0];
      document.getElementById(`checkout-${firstInvalid}`)?.focus();
      return;
    }
    const clean: CustomerDetails = {
      name: details.name.trim(),
      phone: `+91 ${normalizeIndianPhone(details.phone)}`,
      address: details.address.trim(),
      note: details.note?.trim() || undefined,
    };
    try {
      window.localStorage.setItem(DETAILS_KEY, JSON.stringify({ ...clean, note: "" }));
    } catch {
      /* ignore */
    }
    const url = whatsappUrl(buildOrderMessage(items, clean));
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
  };

  const field =
    "w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-ink/30 focus:border-ink aria-[invalid=true]:border-accent";

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
      <div onClick={onClose} className="absolute inset-0 animate-[fade_0.3s_ease_both] bg-ink/60" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        className={`relative grid max-h-[94dvh] w-full ${sentUrl ? "max-w-2xl" : "max-w-4xl"} animate-[fade_0.5s_var(--ease-out-expo)_both] overflow-y-auto bg-paper lg:grid-cols-[1.1fr_0.9fr] lg:overflow-hidden`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close checkout"
          className="absolute right-3 top-3 z-10 grid size-10 place-items-center transition-transform duration-300 hover:rotate-90"
        >
          <X size={22} strokeWidth={1.75} />
        </button>

        {sentUrl ? (
          <div className="col-span-full flex flex-col items-start px-6 py-14 sm:px-12 sm:py-20">
            <span className="grid size-14 place-items-center rounded-full bg-accent">
              <Check size={26} />
            </span>
            <h2 id="checkout-title" className="display mt-8 text-6xl sm:text-8xl">
              ALMOST
              <br />
              YOURS.
            </h2>
            <p className="mt-5 max-w-md text-smoke">
              We&apos;ve opened WhatsApp with your order. Hit send and we&apos;ll confirm availability, shipping and payment
              within a few hours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={sentUrl} target="_blank" rel="noreferrer" className={buttonClasses("outline")}>
                WHATSAPP DIDN&apos;T OPEN? <ArrowUpRight size={16} />
              </a>
              <button type="button" onClick={() => onDone(fromCart)} className={buttonClasses("solid")}>
                {fromCart ? "DONE — CLEAR MY BAG" : "KEEP SHOPPING"}
              </button>
            </div>
          </div>
        ) : (
          <>
            <form onSubmit={onSubmit} noValidate className="px-6 pb-8 pt-10 sm:px-10 lg:max-h-[94dvh] lg:overflow-y-auto">
              <p className="label text-smoke">STEP 1 OF 1 · NO ACCOUNT NEEDED</p>
              <h2 id="checkout-title" className="display mt-3 text-5xl sm:text-6xl">
                WHERE ARE WE
                <br />
                SENDING IT?
              </h2>

              <div className="mt-8 space-y-6">
                <div>
                  <label htmlFor="checkout-name" className="label">
                    FULL NAME
                  </label>
                  <input
                    ref={firstFieldRef}
                    id="checkout-name"
                    autoComplete="name"
                    value={details.name}
                    onChange={update("name")}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "checkout-name-error" : undefined}
                    placeholder="Aarav Sharma"
                    className={field}
                  />
                  {errors.name && <FieldError id="checkout-name-error">{errors.name}</FieldError>}
                </div>
                <div>
                  <label htmlFor="checkout-phone" className="label">
                    PHONE NUMBER
                  </label>
                  <div className="flex items-center gap-3">
                    <span className="border-b border-ink/25 py-3 text-base text-smoke">+91</span>
                    <input
                      id="checkout-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      value={details.phone}
                      onChange={update("phone")}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "checkout-phone-error" : undefined}
                      placeholder="98765 43210"
                      className={field}
                    />
                  </div>
                  {errors.phone && <FieldError id="checkout-phone-error">{errors.phone}</FieldError>}
                </div>
                <div>
                  <label htmlFor="checkout-address" className="label">
                    ADDRESS
                  </label>
                  <textarea
                    id="checkout-address"
                    autoComplete="street-address"
                    rows={3}
                    value={details.address}
                    onChange={update("address")}
                    aria-invalid={!!errors.address}
                    aria-describedby={errors.address ? "checkout-address-error" : undefined}
                    placeholder="Flat / House no., Street, Area, City, Pincode"
                    className={`${field} resize-none`}
                  />
                  {errors.address && <FieldError id="checkout-address-error">{errors.address}</FieldError>}
                </div>
                <div>
                  <label htmlFor="checkout-note" className="label">
                    NOTE <span className="text-smoke">(OPTIONAL)</span>
                  </label>
                  <input
                    id="checkout-note"
                    value={details.note}
                    onChange={update("note")}
                    placeholder="Gift wrap, delivery timing, anything else…"
                    className={field}
                  />
                </div>
              </div>

              <button type="submit" className={buttonClasses("accent", "mt-10 w-full")}>
                <WhatsAppIcon size={18} /> CONTINUE TO WHATSAPP
              </button>
              <p className="mt-3 text-center text-xs text-smoke">
                Your details go straight into the WhatsApp message. We don&apos;t store anything.
              </p>
            </form>

            <aside className="flex flex-col border-t border-ink/10 bg-bone/60 px-6 py-8 sm:px-10 lg:max-h-[94dvh] lg:border-l lg:border-t-0 lg:pt-10">
              <h3 className="label">ORDER SUMMARY</h3>
              <ul className="mt-5 flex-1 space-y-4 lg:overflow-y-auto">
                {items.map((item) => (
                  <li key={item.lineId} className="flex gap-3">
                    <div className="relative aspect-[4/5] w-14 shrink-0 overflow-hidden bg-bone">
                      <Image src={item.image} alt="" fill sizes="56px" className="object-cover" />
                      <span className="absolute right-0 top-0 grid size-5 place-items-center bg-ink text-[0.65rem] text-paper">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold leading-tight">{item.name}</p>
                      <p className="label mt-1 text-smoke">
                        {item.size} · QTY {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
                  </li>
                ))}
              </ul>
              <dl className="mt-6 space-y-2 border-t border-ink/15 pt-5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-smoke">Subtotal</dt>
                  <dd>{formatPrice(total)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-smoke">Shipping</dt>
                  <dd>{total >= STORE_CONFIG.freeShippingThreshold ? "FREE" : "Confirmed on WhatsApp"}</dd>
                </div>
                <div className="flex items-baseline justify-between pt-2">
                  <dt className="label">TOTAL</dt>
                  <dd className="display text-4xl">{formatPrice(total)}</dd>
                </div>
              </dl>
            </aside>
          </>
        )}
      </div>
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-alert">
      {children}
    </p>
  );
}
