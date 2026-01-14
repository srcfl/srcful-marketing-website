"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Minus, Plus, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "./cart-provider";
import { createCheckout } from "@/lib/shopify";

const MAX_QUANTITY = 10;

function formatPrice(amount: number, currencyCode: string) {
  const localeMap: Record<string, string> = {
    EUR: "de-DE",
    SEK: "sv-SE",
    GBP: "en-GB",
    DKK: "da-DK",
    NOK: "nb-NO",
    PLN: "pl-PL",
  };
  return new Intl.NumberFormat(localeMap[currencyCode] || "en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
}

export function CartDrawer() {
  const t = useTranslations("shop");
  const {
    items,
    itemCount,
    subtotal,
    currencyCode,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeItem,
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsCheckingOut(true);
    try {
      const lineItems = items.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
      }));

      const countryCode = items[0]?.countryCode || "DE";
      const checkoutUrl = await createCheckout(lineItems, countryCode);

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="right"
        className="flex flex-col w-full sm:max-w-md"
        onWheel={(e) => e.stopPropagation()}
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            {t("cart")} {itemCount > 0 && `(${itemCount})`}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">{t("empty")}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setIsOpen(false)}
            >
              {t("continueShopping")}
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 -mx-6 px-6">
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.variantId}
                    className="flex gap-4 py-4 border-b last:border-0"
                  >
                    {item.image && (
                      <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                        <Image
                          src={item.image.src}
                          alt={item.image.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm leading-tight truncate">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatPrice(item.price, item.currencyCode)}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.variantId, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.variantId, item.quantity + 1)
                            }
                            disabled={item.quantity >= MAX_QUANTITY}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.variantId)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">{t("remove")}</span>
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm font-medium">
                      {formatPrice(item.price * item.quantity, item.currencyCode)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">{t("subtotal")}</span>
                <span className="font-semibold text-lg">
                  {formatPrice(subtotal, currencyCode)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{t("taxIncluded")}</p>

              <Button
                className="w-full"
                size="lg"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("processing")}
                  </>
                ) : (
                  t("checkout")
                )}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
