"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { PixelGrid } from "@/components/ui/pixel-grid";
import { FeedbackButton } from "@/components/feedback-button";
import Image from "next/image";

export function MarketingFooter() {
  const t = useTranslations("common.footer");
  const tNav = useTranslations("common.nav");

  return (
    <footer className="relative overflow-hidden">
      {/* Newsletter Section - Full width hero style */}
      <div className="relative border-t border-b bg-gradient-to-b from-background to-muted/30">
        <div className="absolute inset-0 bg-dot-pattern opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="max-w-xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <PixelGrid
                pattern="plus-hollow"
                color="green"
                size="md"
                speed="slow"
              />
              <h3 className="text-2xl md:text-3xl font-bold">
                {t("newsletter")}
              </h3>
            </div>
            <p className="text-muted-foreground mb-8">
              {t("newsletterDescription")}
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        {/* Brand Section - Above links */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-12 border-b border-border/50">
          <div className="max-w-md">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/assets/sourceful-logo-dark-mode.svg"
                alt="Sourceful"
                width={160}
                height={36}
                className="hidden dark:block"
              />
              <Image
                src="/assets/sourceful-logo-light-mode.svg"
                alt="Sourceful"
                width={160}
                height={36}
                className="dark:hidden"
              />
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Local energy coordination infrastructure for a distributed future. We build the physical rails that make distributed energy work.
            </p>
          </div>
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="https://github.com/srcfl" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://twitter.com/srcful" className="text-muted-foreground hover:text-primary transition-colors" aria-label="X (Twitter)">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://linkedin.com/company/sourceful-energy" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://discord.gg/srcful" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Discord">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Links Grid - Asymmetric layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-10 mb-16">
          {/* Product - Takes more space */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-primary">{t("product")}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/platform" className="hover:text-foreground transition-colors">{t("platform")}</Link></li>
              <li><Link href="/zap" className="hover:text-foreground transition-colors">{t("zap")}</Link></li>
              <li><Link href="/app" className="hover:text-foreground transition-colors">{t("app")}</Link></li>
              <li><Link href="/integrations" className="hover:text-foreground transition-colors">{t("integrations")}</Link></li>
              <li><Link href="/v2x" className="hover:text-foreground transition-colors">{t("v2x")}</Link></li>
              <li><Link href="/get-started" className="hover:text-foreground transition-colors">{tNav("getStarted")}</Link></li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-primary">{t("tools")}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/tools/savings-calculator" className="hover:text-foreground transition-colors">{t("savingsCalculator")}</Link></li>
              <li><Link href="/tools/negative-prices" className="hover:text-foreground transition-colors">{t("negativePrices")}</Link></li>
              <li><Link href="/tools/solar-roi" className="hover:text-foreground transition-colors">{t("solarRoi")}</Link></li>
              <li><Link href="/tools/battery-sizing" className="hover:text-foreground transition-colors">{t("batterySizing")}</Link></li>
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-primary">{tNav("developers")}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="https://developer.sourceful.energy" className="hover:text-foreground transition-colors">{tNav("devPortal")}</a></li>
              <li><a href="https://developer.sourceful.energy" className="hover:text-foreground transition-colors">{t("docs")}</a></li>
              <li><a href="https://design.sourceful.energy" className="hover:text-foreground transition-colors">{t("designSystem")}</a></li>
              <li><a href="https://discord.gg/srcful" className="hover:text-foreground transition-colors">{t("discord")}</a></li>
            </ul>
          </div>

          {/* Use Cases */}
          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-primary">{tNav("useCases")}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/use-cases/homeowners" className="hover:text-foreground transition-colors">{tNav("homeowners")}</Link></li>
              <li><Link href="/use-cases/utilities" className="hover:text-foreground transition-colors">{tNav("utilities")}</Link></li>
              <li><Link href="/use-cases/oems" className="hover:text-foreground transition-colors">{tNav("oems")}</Link></li>
              <li><Link href="/use-cases/installers" className="hover:text-foreground transition-colors">{tNav("installers")}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-primary">{t("company")}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors">{t("about")}</Link></li>
              <li><Link href="/company" className="hover:text-foreground transition-colors">{t("companyPage")}</Link></li>
              <li><Link href="/blog" className="hover:text-foreground transition-colors">{t("blog")}</Link></li>
              <li><Link href="/community" className="hover:text-foreground transition-colors">{t("community")}</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">{t("contact")}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {t("copyright")}
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">{t("privacy")}</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">{t("terms")}</Link>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <PixelGrid pattern="solo-center" color="green" size="sm" speed="slow" />
            <span className="text-xs text-muted-foreground">Built for the energy transition</span>
            <span className="text-muted-foreground/50">|</span>
            <FeedbackButton variant="ghost" />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-6 border-t">
          <p className="text-xs text-muted-foreground/60 text-center max-w-4xl mx-auto">
            {t("disclaimer")}
          </p>
        </div>
      </div>
    </footer>
  );
}
