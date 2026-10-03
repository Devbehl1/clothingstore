import type { CustomerDetails } from "./types";

export type CheckoutErrors = Partial<Record<keyof CustomerDetails, string>>;

/** Accepts 10-digit Indian mobiles with optional +91 / 91 / 0 prefix, spaces or dashes. */
export function normalizeIndianPhone(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  const local = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits.length === 11 && digits.startsWith("0") ? digits.slice(1) : digits;
  return /^[6-9]\d{9}$/.test(local) ? local : null;
}

export function validateCustomer(details: CustomerDetails): CheckoutErrors {
  const errors: CheckoutErrors = {};
  if (details.name.trim().length < 2) errors.name = "Tell us your name.";
  if (!normalizeIndianPhone(details.phone)) errors.phone = "Enter a valid 10-digit mobile number.";
  if (details.address.trim().length < 15) errors.address = "Add your full address with pincode.";
  else if (!/\b\d{6}\b/.test(details.address)) errors.address = "Don’t forget the 6-digit pincode.";
  return errors;
}
