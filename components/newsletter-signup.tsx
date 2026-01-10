"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle } from "lucide-react";

export function NewsletterSignup() {
  const t = useTranslations("common.footer");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok || data.alreadySubscribed) {
        setStatus("success");
        setEmail("");
      } else {
        console.error("Newsletter error:", data.error);
        setStatus("error");
      }
    } catch (error) {
      console.error("Newsletter error:", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
        <CheckCircle className="h-4 w-4" />
        <span>{t("newsletterSuccess")}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder={t("newsletterPlaceholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-9 text-sm"
          disabled={status === "loading"}
        />
        <Button
          type="submit"
          size="sm"
          disabled={status === "loading" || !email}
          className="shrink-0"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            t("newsletterButton")
          )}
        </Button>
      </div>
      {status === "error" && (
        <p className="text-xs text-red-600 dark:text-red-400">
          {t("newsletterError")}
        </p>
      )}
    </form>
  );
}
