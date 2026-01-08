"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { Github, Linkedin } from "lucide-react";

export function MarketingFooter() {
  const t = useTranslations("common.footer");
  const tNav = useTranslations("common.nav");

  return (
    <footer className="border-t py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
          <div>
            <h4 className="font-semibold mb-4">{t("product")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/platform" className="hover:text-foreground">{t("platform")}</Link></li>
              <li><Link href="/zap" className="hover:text-foreground">{t("zap")}</Link></li>
              <li><Link href="/app" className="hover:text-foreground">{t("app")}</Link></li>
              <li><Link href="/integrations" className="hover:text-foreground">{t("integrations")}</Link></li>
              <li><Link href="/v2x" className="hover:text-foreground">V2X</Link></li>
              <li><Link href="/get-started" className="hover:text-foreground">{tNav("getStarted")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("tools")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/tools" className="hover:text-foreground">{t("allTools")}</Link></li>
              <li><Link href="/tools/savings-calculator" className="hover:text-foreground">{t("savingsCalculator")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{tNav("developers")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="https://developer.sourceful.energy" className="hover:text-foreground">{t("docs")}</a></li>
              <li><a href="https://design.sourceful.energy" className="hover:text-foreground">Design System</a></li>
              <li><a href="https://discord.gg/srcful" className="hover:text-foreground">{t("discord")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{tNav("useCases")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/use-cases/homeowners" className="hover:text-foreground">{tNav("homeowners")}</Link></li>
              <li><Link href="/use-cases/utilities" className="hover:text-foreground">{tNav("utilities")}</Link></li>
              <li><Link href="/use-cases/oems" className="hover:text-foreground">{tNav("oems")}</Link></li>
              <li><Link href="/use-cases/installers" className="hover:text-foreground">{tNav("installers")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("company")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground">{t("about")}</Link></li>
              <li><Link href="/company" className="hover:text-foreground">Company</Link></li>
              <li><Link href="/blog" className="hover:text-foreground">{t("blog")}</Link></li>
              <li><Link href="/community" className="hover:text-foreground">{t("community")}</Link></li>
              <li><Link href="/contact" className="hover:text-foreground">{t("contact")}</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t pt-8 mb-8">
          <div className="max-w-md">
            <h4 className="font-semibold mb-2">{t("newsletter")}</h4>
            <p className="text-sm text-muted-foreground mb-4">{t("newsletterDescription")}</p>
            <NewsletterSignup />
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {t("copyright")}
          </p>
          <div className="flex gap-4">
            <a href="https://github.com/srcfl" className="text-muted-foreground hover:text-foreground" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://twitter.com/srcful" className="text-muted-foreground hover:text-foreground" aria-label="X (Twitter)">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://linkedin.com/company/sourceful-energy" className="text-muted-foreground hover:text-foreground" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://facebook.com/sourcefulenergy" className="text-muted-foreground hover:text-foreground" aria-label="Facebook">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t mt-8 pt-6">
          <p className="text-xs text-muted-foreground/70 text-center max-w-4xl mx-auto">
            {t("disclaimer")}
          </p>
        </div>
      </div>
    </footer>
  );
}
