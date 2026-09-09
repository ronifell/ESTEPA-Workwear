"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

const STORAGE_KEY = "estepa.favorites.v1";

type FavoritesAction =
  | { type: "hydrate"; ids: string[] }
  | { type: "toggle"; id: string }
  | { type: "remove"; id: string }
  | { type: "clear" };

interface FavoritesState {
  readonly ids: readonly string[];
  readonly hydrated: boolean;
}

const initialState: FavoritesState = { ids: [], hydrated: false };

function reducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case "hydrate":
      return { ids: action.ids, hydrated: true };
    case "toggle":
      return {
        hydrated: state.hydrated,
        ids: state.ids.includes(action.id)
          ? state.ids.filter((id) => id !== action.id)
          : [action.id, ...state.ids],
      };
    case "remove":
      return { hydrated: state.hydrated, ids: state.ids.filter((id) => id !== action.id) };
    case "clear":
      return { hydrated: state.hydrated, ids: [] };
  }
}

function parseStoredIds(raw: string): string[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const seen = new Set<string>();
    const ids: string[] = [];
    for (const entry of parsed) {
      if (typeof entry !== "string" || entry.length === 0 || seen.has(entry)) continue;
      seen.add(entry);
      ids.push(entry);
    }
    return ids;
  } catch {
    return [];
  }
}

interface FavoritesValue {
  readonly ids: readonly string[];
  readonly count: number;
  readonly isHydrated: boolean;
  readonly isFavorite: (productId: string) => boolean;
  readonly toggle: (productId: string) => void;
  readonly remove: (productId: string) => void;
  readonly clear: () => void;
}

const FavoritesContext = createContext<FavoritesValue | null>(null);

export function FavoritesProvider({ children }: { readonly children: ReactNode }) {
  const [{ ids, hydrated }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    dispatch({ type: "hydrate", ids: raw ? parseStoredIds(raw) : [] });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids, hydrated]);

  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key !== STORAGE_KEY) return;
      dispatch({ type: "hydrate", ids: event.newValue ? parseStoredIds(event.newValue) : [] });
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const isFavorite = useCallback((productId: string) => ids.includes(productId), [ids]);

  const toggle = useCallback((productId: string) => {
    dispatch({ type: "toggle", id: productId });
  }, []);

  const remove = useCallback((productId: string) => {
    dispatch({ type: "remove", id: productId });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: "clear" });
  }, []);

  const value = useMemo<FavoritesValue>(
    () => ({
      ids,
      count: ids.length,
      isHydrated: hydrated,
      isFavorite,
      toggle,
      remove,
      clear,
    }),
    [ids, hydrated, isFavorite, toggle, remove, clear],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesValue {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used inside a FavoritesProvider");
  }
  return context;
}
