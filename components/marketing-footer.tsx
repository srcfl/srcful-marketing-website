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
              <li><Link href="/v2x" className="hover:text-foreground">{t("v2x")}</Link></li>
              <li><Link href="/get-started" className="hover:text-foreground">{tNav("getStarted")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("tools")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/tools/savings-calculator" className="hover:text-foreground">{t("savingsCalculator")}</Link></li>
              <li><Link href="/tools/negative-prices" className="hover:text-foreground">{t("negativePrices")}</Link></li>
              <li><Link href="/tools/solar-roi" className="hover:text-foreground">{t("solarRoi")}</Link></li>
              <li><Link href="/tools/battery-sizing" className="hover:text-foreground">{t("batterySizing")}</Link></li>
              <li><Link href="/tools/ev-charging" className="hover:text-foreground">{t("evCharging")}</Link></li>
              <li><Link href="/tools/v2x-savings" className="hover:text-foreground">{t("v2xSavings")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{tNav("developers")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="https://developer.sourceful.energy" className="hover:text-foreground">{t("docs")}</a></li>
              <li><a href="https://design.sourceful.energy" className="hover:text-foreground">{t("designSystem")}</a></li>
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
              <li><Link href="/company" className="hover:text-foreground">{t("companyPage")}</Link></li>
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
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {t("copyright")}
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground">{t("privacy")}</Link>
              <Link href="/terms" className="hover:text-foreground">{t("terms")}</Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://github.com/srcfl" className="text-muted-foreground/60 hover:text-muted-foreground" aria-label="GitHub">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://twitter.com/srcful" className="text-muted-foreground/60 hover:text-muted-foreground" aria-label="X (Twitter)">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://linkedin.com/company/sourceful-energy" className="text-muted-foreground/60 hover:text-muted-foreground" aria-label="LinkedIn">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://facebook.com/sourcefulenergy" className="text-muted-foreground/60 hover:text-muted-foreground" aria-label="Facebook">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://discord.gg/srcful" className="text-muted-foreground/60 hover:text-muted-foreground" aria-label="Discord">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
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
