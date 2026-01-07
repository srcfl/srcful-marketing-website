"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle } from "lucide-react";

const MAILCHIMP_URL =
  "https://energy.us14.list-manage.com/subscribe/post?u=62589c643a6b3d8c1160756b9&id=d4341d7a0f&f_id=006686e0f0";

export function NewsletterSignup() {
  const t = useTranslations("common.footer");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    // Mailchimp requires form submission via their endpoint
    // We'll use a hidden iframe to avoid CORS issues and page navigation
    try {
      const form = document.createElement("form");
      form.action = MAILCHIMP_URL;
      form.method = "POST";
      form.target = "mailchimp-iframe";

      const emailInput = document.createElement("input");
      emailInput.type = "hidden";
      emailInput.name = "EMAIL";
      emailInput.value = email;
      form.appendChild(emailInput);

      // Create hidden iframe if it doesn't exist
      let iframe = document.getElementById("mailchimp-iframe") as HTMLIFrameElement;
      if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.id = "mailchimp-iframe";
        iframe.name = "mailchimp-iframe";
        iframe.style.display = "none";
        document.body.appendChild(iframe);
      }

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

      // Assume success after submission (Mailchimp doesn't provide easy feedback)
      setTimeout(() => {
        setStatus("success");
        setEmail("");
      }, 1000);
    } catch {
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
