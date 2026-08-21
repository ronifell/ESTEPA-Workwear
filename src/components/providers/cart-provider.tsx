"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";

import { siteConfig } from "@/config/site";
import { clamp } from "@/lib/utils";
import type { CartLine, CartLineSnapshot, Product } from "@/types";

const STORAGE_KEY = "estepa.cart.v1";

function lineId(productId: string, size?: string): string {
  return size ? `${productId}::${size}` : productId;
}

function toSnapshot(product: Product): CartLineSnapshot {
  const snapshot: CartLineSnapshot = {
    name: product.name,
    slug: product.slug,
    category: product.category,
  };

  const image = product.images[0]?.src;

  return {
    ...snapshot,
    ...(product.price !== undefined ? { price: product.price } : {}),
    ...(product.currency !== undefined ? { currency: product.currency } : {}),
    ...(image !== undefined ? { image } : {}),
  };
}

type CartAction =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; product: Product; size?: string | undefined; quantity: number }
  | { type: "setQuantity"; id: string; quantity: number }
  | { type: "remove"; id: string }
  | { type: "clear" };

/**
 * `hydrated` lives in the reducer so restoring the persisted cart is a single
 * state transition instead of a cascade of effects.
 */
interface CartState {
  readonly lines: CartLine[];
  readonly hydrated: boolean;
}

const initialState: CartState = { lines: [], hydrated: false };

function reducer(state: CartState, action: CartAction): CartState {
  const max = siteConfig.commerce.maxQuantityPerItem;
  const withLines = (lines: CartLine[]): CartState => ({ lines, hydrated: state.hydrated });

  switch (action.type) {
    case "hydrate":
      return { lines: action.lines, hydrated: true };

    case "add": {
      const id = lineId(action.product.id, action.size);
      const existing = state.lines.find((line) => line.id === id);

      if (existing) {
        return withLines(
          state.lines.map((line) =>
            line.id === id
              ? { ...line, quantity: clamp(line.quantity + action.quantity, 1, max) }
              : line,
          ),
        );
      }

      return withLines([
        ...state.lines,
        {
          id,
          productId: action.product.id,
          ...(action.size ? { size: action.size } : {}),
          quantity: clamp(action.quantity, 1, max),
          snapshot: toSnapshot(action.product),
        },
      ]);
    }

    case "setQuantity":
      return withLines(
        action.quantity <= 0
          ? state.lines.filter((line) => line.id !== action.id)
          : state.lines.map((line) =>
              line.id === action.id
                ? { ...line, quantity: clamp(action.quantity, 1, max) }
                : line,
            ),
      );

    case "remove":
      return withLines(state.lines.filter((line) => line.id !== action.id));

    case "clear":
      return withLines([]);
  }
}

function parseStoredLines(raw: string): CartLine[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((entry): entry is CartLine => {
      if (typeof entry !== "object" || entry === null) return false;
      const line = entry as Partial<CartLine>;
      return (
        typeof line.id === "string" &&
        typeof line.productId === "string" &&
        typeof line.quantity === "number" &&
        typeof line.snapshot === "object" &&
        line.snapshot !== null
      );
    });
  } catch {
    return [];
  }
}

interface CartValue {
  readonly lines: readonly CartLine[];
  readonly itemCount: number;
  /** Null while at least one line has no confirmed price. */
  readonly subtotal: number | null;
  readonly hasUnpricedLines: boolean;
  readonly isHydrated: boolean;
  readonly isMiniCartOpen: boolean;
  readonly openMiniCart: () => void;
  readonly closeMiniCart: () => void;
  readonly addProduct: (product: Product, options?: { size?: string; quantity?: number }) => void;
  readonly setQuantity: (id: string, quantity: number) => void;
  readonly removeLine: (id: string) => void;
  readonly clear: () => void;
}

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [{ lines, hydrated }, dispatch] = useReducer(reducer, initialState);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    dispatch({ type: "hydrate", lines: raw ? parseStoredLines(raw) : [] });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  // Keep tabs in sync.
  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key !== STORAGE_KEY) return;
      dispatch({ type: "hydrate", lines: event.newValue ? parseStoredLines(event.newValue) : [] });
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addProduct = useCallback(
    (product: Product, options?: { size?: string; quantity?: number }) => {
      dispatch({
        type: "add",
        product,
        size: options?.size,
        quantity: options?.quantity ?? 1,
      });
      setIsMiniCartOpen(true);
    },
    [],
  );

  const setQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: "setQuantity", id, quantity });
  }, []);

  const removeLine = useCallback((id: string) => {
    dispatch({ type: "remove", id });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: "clear" });
  }, []);

  // Stable identities: consumers use these in effect dependency lists.
  const openMiniCart = useCallback(() => setIsMiniCartOpen(true), []);
  const closeMiniCart = useCallback(() => setIsMiniCartOpen(false), []);

  const value = useMemo<CartValue>(() => {
    const itemCount = lines.reduce((total, line) => total + line.quantity, 0);
    const hasUnpricedLines = lines.some((line) => line.snapshot.price === undefined);
    const subtotal = hasUnpricedLines
      ? null
      : lines.reduce((total, line) => total + (line.snapshot.price ?? 0) * line.quantity, 0);

    return {
      lines,
      itemCount,
      subtotal,
      hasUnpricedLines,
      isHydrated: hydrated,
      isMiniCartOpen,
      openMiniCart,
      closeMiniCart,
      addProduct,
      setQuantity,
      removeLine,
      clear,
    };
  }, [
    lines,
    hydrated,
    isMiniCartOpen,
    openMiniCart,
    closeMiniCart,
    addProduct,
    setQuantity,
    removeLine,
    clear,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return context;
}
