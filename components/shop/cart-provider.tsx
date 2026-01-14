"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

const CART_STORAGE_KEY = "srcful-cart";
const MAX_QUANTITY = 10;

export interface CartItem {
  id: string;
  variantId: string;
  title: string;
  price: number;
  currencyCode: string;
  countryCode: string;
  quantity: number;
  image?: {
    src: string;
    alt: string;
  };
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  currencyCode: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error);
      }
    }
  }, [items, mounted]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, quantity: number = 1) => {
      setItems((current) => {
        const existing = current.find((i) => i.variantId === item.variantId);
        if (existing) {
          const newQuantity = Math.min(
            existing.quantity + quantity,
            MAX_QUANTITY
          );
          return current.map((i) =>
            i.variantId === item.variantId ? { ...i, quantity: newQuantity } : i
          );
        }
        return [...current, { ...item, quantity: Math.min(quantity, MAX_QUANTITY) }];
      });
    },
    []
  );

  const removeItem = useCallback((variantId: string) => {
    setItems((current) => current.filter((i) => i.variantId !== variantId));
  }, []);

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((current) => current.filter((i) => i.variantId !== variantId));
      return;
    }
    setItems((current) =>
      current.map((i) =>
        i.variantId === variantId
          ? { ...i, quantity: Math.min(quantity, MAX_QUANTITY) }
          : i
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const currencyCode = items[0]?.currencyCode ?? "EUR";

  const value: CartContextValue = {
    items: mounted ? items : [],
    itemCount: mounted ? itemCount : 0,
    subtotal: mounted ? subtotal : 0,
    currencyCode,
    isOpen,
    setIsOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
