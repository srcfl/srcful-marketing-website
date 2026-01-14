"use client";

import { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "./cart-provider";

export function CartIcon() {
  const { itemCount, setIsOpen } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setIsOpen(true)}
      className="relative"
      aria-label={`Shopping cart${mounted && itemCount > 0 ? `, ${itemCount} items` : ""}`}
    >
      <ShoppingBag className="h-4 w-4" />
      {mounted && itemCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </Button>
  );
}
