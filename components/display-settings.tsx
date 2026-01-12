"use client";

import * as React from "react";
import { Moon, Sun, Monitor, SlidersHorizontal, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/src/i18n/routing";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  useAccessibility,
  type ColorMode,
} from "@/components/design-system-provider";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "sv", label: "Svenska", flag: "🇸🇪" },
] as const;

const colorModeOptions: { value: ColorMode; label: string }[] = [
  { value: "default", label: "Default colors" },
  { value: "deuteranopia", label: "Deuteranopia (Green-blind)" },
  { value: "protanopia", label: "Protanopia (Red-blind)" },
  { value: "tritanopia", label: "Tritanopia (Blue-blind)" },
  { value: "achromatopsia", label: "Achromatopsia (Monochrome)" },
];

interface DisplaySettingsProps {
  variant?: "icon" | "outline" | "mobile";
  label?: string;
}

export function DisplaySettings({ variant = "icon", label = "Display Settings" }: DisplaySettingsProps) {
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const {
    fontMode,
    setFontMode,
    colorMode,
    setColorMode,
    spacingMode,
    setSpacingMode,
    focusMode,
    setFocusMode,
  } = useAccessibility();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const hasActiveAccessibility =
    fontMode !== "default" ||
    colorMode !== "default" ||
    spacingMode !== "default" ||
    focusMode !== "default";

  return (
    <Sheet>
      <SheetTrigger asChild>
        {variant === "mobile" ? (
          <button className="flex items-center justify-between w-full text-xl font-semibold text-primary py-5 border-b border-border/30">
            <span>{label}</span>
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        ) : variant === "outline" ? (
          <Button variant="outline" className="relative h-9 w-9 bg-muted/50">
            <SlidersHorizontal className="h-4 w-4" />
            {hasActiveAccessibility && (
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary" />
            )}
          </Button>
        ) : (
          <Button variant="ghost" size="icon" className="relative">
            <SlidersHorizontal className="h-4 w-4" />
            {hasActiveAccessibility && (
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary" />
            )}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="right" className="w-[340px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Display Settings</SheetTitle>
          <p className="text-sm text-muted-foreground">
            Customize the visual style and accessibility options.
          </p>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Appearance Section */}
          <div>
            <h3 className="text-sm font-medium mb-3">Appearance</h3>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setTheme("light")}
                className={`flex flex-col items-center gap-2 rounded-lg border p-3 transition-colors ${
                  theme === "light"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Sun className="h-5 w-5" />
                <span className="text-xs font-medium">Light</span>
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`flex flex-col items-center gap-2 rounded-lg border p-3 transition-colors ${
                  theme === "dark"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Moon className="h-5 w-5" />
                <span className="text-xs font-medium">Dark</span>
              </button>
              <button
                onClick={() => setTheme("system")}
                className={`flex flex-col items-center gap-2 rounded-lg border p-3 transition-colors ${
                  theme === "system"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Monitor className="h-5 w-5" />
                <span className="text-xs font-medium">System</span>
              </button>
            </div>
          </div>

          <Separator />

          {/* Language Section */}
          <div>
            <h3 className="text-sm font-medium mb-3">Language</h3>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`flex items-center justify-between gap-2 rounded-lg border p-3 transition-colors ${
                    locale === lang.code
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{lang.flag}</span>
                    <span className="text-sm font-medium">{lang.label}</span>
                  </div>
                  {locale === lang.code && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Accessibility Section */}
          <div>
            <h3 className="text-sm font-medium mb-1">Accessibility</h3>
            <p className="text-xs text-muted-foreground mb-4">
              These settings are saved to your browser.
            </p>

            {/* Reading */}
            <div className="space-y-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Reading
              </p>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dyslexic-font" className="text-sm font-medium">
                    Dyslexia-friendly font
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Uses Lexend font for improved readability
                  </p>
                </div>
                <Switch
                  id="dyslexic-font"
                  checked={fontMode === "dyslexic"}
                  onCheckedChange={(checked) =>
                    setFontMode(checked ? "dyslexic" : "default")
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="text-spacing" className="text-sm font-medium">
                    Increased text spacing
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    More space between letters and lines
                  </p>
                </div>
                <Switch
                  id="text-spacing"
                  checked={spacingMode === "comfortable"}
                  onCheckedChange={(checked) =>
                    setSpacingMode(checked ? "comfortable" : "default")
                  }
                />
              </div>
            </div>

            {/* Vision */}
            <div className="mt-6 space-y-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Vision
              </p>

              <div className="space-y-1.5">
                <Label htmlFor="color-adjustment" className="text-sm font-medium">
                  Color adjustment
                </Label>
                <Select
                  value={colorMode}
                  onValueChange={(value) => setColorMode(value as ColorMode)}
                >
                  <SelectTrigger id="color-adjustment">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {colorModeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Keyboard Navigation */}
            <div className="mt-6 space-y-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Keyboard Navigation
              </p>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="focus-mode" className="text-sm font-medium">
                    Enhanced focus indicators
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Larger, more visible focus rings
                  </p>
                </div>
                <Switch
                  id="focus-mode"
                  checked={focusMode === "enhanced"}
                  onCheckedChange={(checked) =>
                    setFocusMode(checked ? "enhanced" : "default")
                  }
                />
              </div>
            </div>
          </div>

          {/* Reset Button */}
          {hasActiveAccessibility && (
            <>
              <Separator />
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setFontMode("default");
                  setColorMode("default");
                  setSpacingMode("default");
                  setFocusMode("default");
                }}
              >
                Reset accessibility settings
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
