"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { sitePages, getPagesByCategory, type SitePage } from "@/lib/site-pages";
import { Search, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("searchCommand");

  // Detect current locale from pathname
  const locale = React.useMemo(() => {
    const match = pathname?.match(/^\/(en|sv)(\/|$)/);
    return match ? match[1] : null;
  }, [pathname]);

  // Helper to build locale-aware paths
  const buildPath = React.useCallback(
    (href: string) => {
      if (locale && !href.startsWith(`/${locale}`)) {
        return `/${locale}${href}`;
      }
      return href;
    },
    [locale]
  );

  const runCommand = React.useCallback(
    (command: () => void) => {
      onOpenChange(false);
      command();
    },
    [onOpenChange]
  );

  // Group pages by category
  const groupedPages = React.useMemo(() => getPagesByCategory(), []);

  // Category order for display
  const categoryOrder = [
    "Main",
    "Products",
    "Tools",
    "Use Cases",
    "Developers",
    "Resources",
    "Getting Started",
  ];

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder={t("placeholder")} />
      <CommandList>
        <CommandEmpty>
          <div className="flex flex-col items-center gap-2 py-4">
            <Search className="h-8 w-8 text-muted-foreground/50" />
            <p className="text-muted-foreground">{t("noResults")}</p>
          </div>
        </CommandEmpty>

        {/* Quick Links */}
        <CommandGroup heading={t("quickLinks")}>
          <CommandItem onSelect={() => runCommand(() => router.push(buildPath("/")))}>
            <Search className="mr-2 h-4 w-4 text-primary" />
            <span>{t("home")}</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push(buildPath("/pricing")))}>
            <Search className="mr-2 h-4 w-4 text-primary" />
            <span>{t("getTheZap")}</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => window.open("https://developer.sourceful.energy", "_blank"))
            }
          >
            <ExternalLink className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{t("devPortal")}</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Pages by Category */}
        {categoryOrder.map((category, index) => {
          const pages = groupedPages[category];
          if (!pages || pages.length === 0) return null;

          return (
            <React.Fragment key={category}>
              {index > 0 && <CommandSeparator />}
              <CommandGroup heading={category}>
                {pages.map((page: SitePage) => {
                  const Icon = page.icon;
                  return (
                    <CommandItem
                      key={page.href}
                      onSelect={() => runCommand(() => router.push(buildPath(page.href)))}
                    >
                      <Icon
                        className={cn(
                          "mr-2 h-4 w-4",
                          category === "Products" || category === "Getting Started"
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                      />
                      <div className="flex flex-col">
                        <span>{page.name}</span>
                        {page.description && (
                          <span className="text-xs text-muted-foreground">
                            {page.description}
                          </span>
                        )}
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </React.Fragment>
          );
        })}
      </CommandList>
    </CommandDialog>
  );
}

export function SearchTrigger({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-muted-foreground transition-colors hover:border-primary/50 hover:bg-accent hover:text-accent-foreground",
        className
      )}
      aria-label="Search"
    >
      <Search className="h-4 w-4" />
    </button>
  );
}
