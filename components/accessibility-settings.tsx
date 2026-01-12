"use client";

import * as React from "react";
import { Accessibility, Eye, Type, Space, Focus, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  useAccessibility,
  type ColorMode,
} from "@/components/design-system-provider";

const colorModeLabels: Record<ColorMode, string> = {
  default: "Default",
  deuteranopia: "Deuteranopia (Green-blind)",
  protanopia: "Protanopia (Red-blind)",
  tritanopia: "Tritanopia (Blue-blind)",
  achromatopsia: "Achromatopsia (Monochrome)",
};

export function AccessibilitySettings() {
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

  const hasActiveSettings =
    fontMode !== "default" ||
    colorMode !== "default" ||
    spacingMode !== "default" ||
    focusMode !== "default";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Accessibility settings"
        >
          <Accessibility className="h-5 w-5" />
          {hasActiveSettings && (
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Accessibility className="h-4 w-4" />
          Accessibility
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Font Mode */}
        <DropdownMenuCheckboxItem
          checked={fontMode === "dyslexic"}
          onCheckedChange={(checked) =>
            setFontMode(checked ? "dyslexic" : "default")
          }
        >
          <Type className="mr-2 h-4 w-4" />
          Dyslexia-friendly font
        </DropdownMenuCheckboxItem>

        {/* Spacing Mode */}
        <DropdownMenuCheckboxItem
          checked={spacingMode === "comfortable"}
          onCheckedChange={(checked) =>
            setSpacingMode(checked ? "comfortable" : "default")
          }
        >
          <Space className="mr-2 h-4 w-4" />
          Enhanced text spacing
        </DropdownMenuCheckboxItem>

        {/* Focus Mode */}
        <DropdownMenuCheckboxItem
          checked={focusMode === "enhanced"}
          onCheckedChange={(checked) =>
            setFocusMode(checked ? "enhanced" : "default")
          }
        >
          <Focus className="mr-2 h-4 w-4" />
          Enhanced focus indicators
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator />

        {/* Color Mode */}
        <DropdownMenuLabel className="flex items-center gap-2 text-xs font-normal text-muted-foreground">
          <Eye className="h-3 w-3" />
          Color vision
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={colorMode}
          onValueChange={(value) => setColorMode(value as ColorMode)}
        >
          {(Object.keys(colorModeLabels) as ColorMode[]).map((mode) => (
            <DropdownMenuRadioItem key={mode} value={mode}>
              {colorModeLabels[mode]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>

        {hasActiveSettings && (
          <>
            <DropdownMenuSeparator />
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-muted-foreground"
              onClick={() => {
                setFontMode("default");
                setColorMode("default");
                setSpacingMode("default");
                setFocusMode("default");
              }}
            >
              Reset all settings
            </Button>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
