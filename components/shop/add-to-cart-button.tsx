"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useCart } from "./cart-provider";
import { getProduct, isShopifyConfigured, type Product } from "@/lib/shopify";

interface AddToCartButtonProps {
  handle: string;
  variant?: "default" | "outline";
  className?: string;
}

const DEFAULT_COUNTRY = "SE";

export function AddToCartButton({
  handle,
  variant = "outline",
  className,
}: AddToCartButtonProps) {
  const t = useTranslations("shop");
  const { addItem, setIsOpen } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (!isShopifyConfigured()) {
      setIsLoading(false);
      return;
    }

    getProduct(handle, DEFAULT_COUNTRY)
      .then(setProduct)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [handle]);

  const handleClick = async () => {
    if (!product) return;

    setIsAdding(true);

    await new Promise((r) => setTimeout(r, 200));

    addItem({
      id: product.id,
      variantId: product.variantId,
      title: product.title,
      price: product.price,
      currencyCode: product.currencyCode,
      countryCode: DEFAULT_COUNTRY,
      image: product.image,
    });

    toast.success(t("itemAdded"), {
      action: {
        label: t("viewCart"),
        onClick: () => setIsOpen(true),
      },
    });

    setIsAdding(false);
  };

  if (!isShopifyConfigured() || (!isLoading && !product)) {
    return (
      <Button variant={variant} className={className} asChild>
        <a
          href="https://store.sourceful.energy/products/sourceful-energy-zap"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("addToCart")}
        </a>
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      className={className}
      onClick={handleClick}
      disabled={isLoading || isAdding || !product?.availableForSale}
    >
      {isLoading || isAdding ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <ShoppingCart className="mr-2 h-4 w-4" />
      )}
      {!product?.availableForSale && !isLoading ? t("soldOut") : t("addToCart")}
    </Button>
  );
}
