"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { Menu, ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { DisplaySettings } from "@/components/display-settings";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MarketingNav() {
  const t = useTranslations("common.nav");
  const tButtons = useTranslations("common.buttons");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const products = [
    {
      name: t("platform"),
      href: "/platform",
      description: t("platformDescription"),
    },
    {
      name: t("zap"),
      href: "/zap",
      description: t("zapDescription"),
    },
  ];

  const useCases = [
    { name: t("homeowners"), href: "/use-cases/homeowners" },
    { name: t("utilities"), href: "/use-cases/utilities" },
    { name: t("oems"), href: "/use-cases/oems" },
    { name: t("installers"), href: "/use-cases/installers" },
  ];

  const developers = [
    { name: t("overview"), href: "/developers", external: false },
    { name: t("devPortal"), href: "https://developer.sourceful.energy", external: true },
    { name: t("apiReference"), href: "https://developer.sourceful.energy/api", external: true },
    { name: t("designSystem"), href: "https://design.sourceful.energy", external: true },
    { name: t("hardwareDocs"), href: "https://developer.sourceful.energy/hardware", external: true },
    { name: t("community"), href: "/community", external: false },
  ];

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
          : "bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/40"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Logo variant="full" size="sm" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {/* {t("products")} Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-1">
                {t("products")}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[240px]">
              {products.map((item) => (
                <Link key={item.name} href={item.href} className="block">
                  <DropdownMenuItem className="flex-col !items-start gap-1 py-2 cursor-pointer">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Developers Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-1">
                {t("developers")}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              {developers.map((item) => (
                <DropdownMenuItem key={item.name} asChild>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between"
                    >
                      {item.name}
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </a>
                  ) : (
                    <Link href={item.href}>{item.name}</Link>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Use Cases Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-1">
                {t("useCases")}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {useCases.map((item) => (
                <DropdownMenuItem key={item.name} asChild>
                  <Link href={item.href}>{item.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* About Link */}
          <Button variant="ghost" asChild>
            <Link href="/about">{t("about")}</Link>
          </Button>

          {/* Company Link */}
          <Button variant="ghost" asChild>
            <Link href="/contact">{t("contact")}</Link>
          </Button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild>
              <a href="https://developer.sourceful.energy" target="_blank" rel="noopener noreferrer">
                {t("devPortal")}
              </a>
            </Button>
            <Button asChild>
              <a href="https://store.sourceful.energy/products/sourceful-energy-zap" target="_blank" rel="noopener noreferrer">
                {tButtons("getTheZap")}
              </a>
            </Button>
          </div>

          {/* Display Settings (theme + accessibility + language) */}
          <div className="hidden md:flex">
            <DisplaySettings />
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>{t("menu")}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col space-y-6">
                {/* Products */}
                <div>
                  <h3 className="font-semibold mb-3">{t("products")}</h3>
                  <div className="space-y-2">
                    {products.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block py-2 text-muted-foreground hover:text-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Developers */}
                <div>
                  <h3 className="font-semibold mb-3">{t("developers")}</h3>
                  <div className="space-y-2">
                    {developers.map((item) => (
                      item.external ? (
                        <a
                          key={item.name}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 py-2 text-muted-foreground hover:text-foreground"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block py-2 text-muted-foreground hover:text-foreground"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )
                    ))}
                  </div>
                </div>

                {/* Use Cases */}
                <div>
                  <h3 className="font-semibold mb-3">{t("useCases")}</h3>
                  <div className="space-y-2">
                    {useCases.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block py-2 text-muted-foreground hover:text-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* About */}
                <Link
                  href="/about"
                  className="font-semibold hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("about")}
                </Link>

                {/* Contact */}
                <Link
                  href="/contact"
                  className="font-semibold hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("contact")}
                </Link>

                {/* CTA Buttons */}
                <div className="pt-4 border-t space-y-3">
                  <Button variant="outline" className="w-full" asChild>
                    <a href="https://developer.sourceful.energy" target="_blank" rel="noopener noreferrer">
                      {t("devPortal")}
                    </a>
                  </Button>
                  <Button className="w-full" asChild>
                    <a href="https://store.sourceful.energy/products/sourceful-energy-zap" target="_blank" rel="noopener noreferrer">
                      {tButtons("getTheZap")}
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
