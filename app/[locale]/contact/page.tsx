"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { ContactForm } from "@/components/contact-form";
import { FadeIn } from "@/components/animations";
import { Mail, MessageSquare, MapPin, Building2 } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");

  const contacts = [
    {
      key: "partnerships",
      icon: Building2,
      title: t("contacts.partnerships.title"),
      description: t("contacts.partnerships.description"),
      email: "partners@sourceful.energy",
    },
    {
      key: "investors",
      icon: Mail,
      title: t("contacts.investors.title"),
      description: t("contacts.investors.description"),
      email: "invest@sourceful.energy",
    },
    {
      key: "support",
      icon: MessageSquare,
      title: t("contacts.support.title"),
      description: t("contacts.support.description"),
      email: "support@sourceful.energy",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-dot-pattern" />
          <div className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 md:px-8">
            <FadeIn className="max-w-3xl">
              <Badge variant="secondary" className="mb-6">
                <Mail className="h-3 w-3 mr-1" />
                {tCommon("nav.contact")}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-left">
                {t("title")}
              </h1>
              <p className="text-xl text-muted-foreground text-left">
                {t("description")}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Contact Options */}
        <section className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <ContactForm
                title={t("form.title")}
                description={t("form.description")}
                subject={tCommon("contactForm.subject")}
              />
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">{t("directContacts")}</h2>
                <div className="space-y-4">
                  {contacts.map((contact) => {
                    const Icon = contact.icon;
                    return (
                      <Card key={contact.key}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{contact.title}</CardTitle>
                              <CardDescription>{contact.description}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <a
                            href={`mailto:${contact.email}`}
                            className="text-primary hover:underline font-medium"
                          >
                            {contact.email}
                          </a>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Location */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{t("location.title")}</CardTitle>
                      <CardDescription>{t("location.description")}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{t("location.city")}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t("location.regNumber")}
                  </p>
                </CardContent>
              </Card>

              {/* Community */}
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-lg">{t("community.title")}</CardTitle>
                  <CardDescription>
                    {t("community.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex gap-4">
                  <a
                    href="https://discord.gg/srcful"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    {t("community.discord")}
                  </a>
                  <a
                    href="https://github.com/srcfl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    {t("community.github")}
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
