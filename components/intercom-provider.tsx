"use client";

import { useState, useCallback, createContext, useContext } from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const INTERCOM_APP_ID = "uqngf2sv";

// Use type assertion for window.Intercom since the SDK provides its own types
const getIntercom = () => (window as { Intercom?: (command: string, ...args: unknown[]) => void }).Intercom;

interface IntercomContextType {
  isLoaded: boolean;
  isOpen: boolean;
  openChat: () => void;
}

const IntercomContext = createContext<IntercomContextType>({
  isLoaded: false,
  isOpen: false,
  openChat: () => {},
});

export function useIntercom() {
  return useContext(IntercomContext);
}

export function IntercomProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const loadAndOpenIntercom = useCallback(async () => {
    if (isLoading) return;

    if (isLoaded) {
      // Intercom already loaded, just toggle
      const intercom = getIntercom();
      if (intercom) {
        if (isOpen) {
          intercom("hide");
          setIsOpen(false);
        } else {
          intercom("show");
          setIsOpen(true);
        }
      }
      return;
    }

    setIsLoading(true);

    try {
      // Dynamically import the Intercom SDK
      const { default: Intercom } = await import("@intercom/messenger-js-sdk");

      // Initialize Intercom
      Intercom({
        app_id: INTERCOM_APP_ID,
      });

      setIsLoaded(true);
      setIsOpen(true);

      // Listen for Intercom hide events
      const intercom = getIntercom();
      if (intercom) {
        intercom("onHide", () => {
          setIsOpen(false);
        });
        intercom("onShow", () => {
          setIsOpen(true);
        });
      }
    } catch (error) {
      console.error("Failed to load Intercom:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoaded, isLoading, isOpen]);

  return (
    <IntercomContext.Provider value={{ isLoaded, isOpen, openChat: loadAndOpenIntercom }}>
      {children}

      {/* Floating chat button - only show when Intercom widget is not visible */}
      {!isOpen && (
        <button
          onClick={loadAndOpenIntercom}
          disabled={isLoading}
          className={cn(
            "fixed bottom-6 right-6 z-50",
            "flex items-center justify-center",
            "w-14 h-14 rounded-full",
            "bg-primary text-primary-foreground",
            "shadow-lg hover:shadow-xl",
            "transition-all duration-200",
            "hover:scale-105 active:scale-95",
            "disabled:opacity-70 disabled:cursor-wait"
          )}
          aria-label="Open chat"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>
      )}
    </IntercomContext.Provider>
  );
}
