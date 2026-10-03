import { STORE_CONFIG } from "./config";
import { formatPrice } from "./format";
import type { CartItem, CustomerDetails } from "./types";

export function whatsappUrl(message: string): string {
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function buildOrderMessage(items: CartItem[], customer?: CustomerDetails): string {
  const lines = items.map((item, i) =>
    [
      `${i + 1}. ${item.name}`,
      `Size: ${item.size}`,
      `Colour: ${item.color}`,
      `Qty: ${item.quantity}`,
      `Price: ${formatPrice(item.price * item.quantity)}`,
    ].join("\n"),
  );

  const details = [
    `Name: ${customer?.name ?? ""}`,
    `Phone: ${customer?.phone ?? ""}`,
    `Address: ${customer?.address ?? ""}`,
  ];
  if (customer?.note) details.push(`Note: ${customer.note}`);

  return [
    `Hey ${STORE_CONFIG.brandName} 👋`,
    "",
    "I'd like to place an order:",
    "",
    lines.join("\n\n"),
    "",
    `Total: ${formatPrice(cartTotal(items))}`,
    "",
    details.join("\n"),
    "",
    "Please confirm my order.",
  ].join("\n");
}

export function buildCustomOrderMessage(details?: {
  product?: string;
  quantity?: string;
  idea?: string;
}): string {
  return [
    `Hey ${STORE_CONFIG.brandName} 👋`,
    "",
    "I'd like to start a custom print order.",
    "",
    `Product: ${details?.product ?? "Tee / Oversized Tee / Hoodie"}`,
    `Quantity: ${details?.quantity ?? ""}`,
    `My idea: ${details?.idea ?? ""}`,
    "",
    "I'll share my design/reference here. 🎨",
  ].join("\n");
}
