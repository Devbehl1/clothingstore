import type { CartItem } from "./types";

/**
 * Tiny framework-free cart store persisted to localStorage.
 * Consumed through `useSyncExternalStore` in CartProvider so server and
 * client renders stay in sync without hydration mismatches.
 */

const STORAGE_KEY = "threadr-cart-v1";
const EMPTY: CartItem[] = [];

let items: CartItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    items = Array.isArray(parsed) ? (parsed as CartItem[]) : EMPTY;
  } catch {
    items = EMPTY;
  }
}

function commit(next: CartItem[]) {
  items = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage full or blocked — cart still works in memory */
  }
  listeners.forEach((l) => l());
}

export const cartStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      loaded = false;
      load();
      listener();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  },
  getSnapshot(): CartItem[] {
    load();
    return items;
  },
  getServerSnapshot(): CartItem[] {
    return EMPTY;
  },
  add(item: CartItem) {
    load();
    const existing = items.find((i) => i.lineId === item.lineId);
    commit(
      existing
        ? items.map((i) =>
            i.lineId === item.lineId ? { ...i, quantity: Math.min(10, i.quantity + item.quantity) } : i,
          )
        : [...items, item],
    );
  },
  setQuantity(lineId: string, quantity: number) {
    load();
    if (quantity <= 0) {
      commit(items.filter((i) => i.lineId !== lineId));
      return;
    }
    commit(items.map((i) => (i.lineId === lineId ? { ...i, quantity: Math.min(10, quantity) } : i)));
  },
  remove(lineId: string) {
    load();
    commit(items.filter((i) => i.lineId !== lineId));
  },
  clear() {
    commit(EMPTY);
  },
};

export function makeLineId(productId: string, size: string, color: string) {
  return `${productId}__${size}__${color}`.toLowerCase().replace(/\s+/g, "-");
}
