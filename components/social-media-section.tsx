"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Youtube, Facebook } from "lucide-react"

export function SocialMediaSection() {
  const { t } = useLanguage()

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Social Media Links */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("social.title")}</h2>
          <p className="text-lg text-muted-foreground mb-8">{t("social.subtitle")}</p>

          <div className="flex justify-center gap-6">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              <a
                href="https://www.youtube.com/@ShriramLeelasamitikalyanpur_7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Youtube className="w-5 h-5" />
                {t("social.youtube")}
              </a>
            </Button>

            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <a
                href="https://www.facebook.com/share/17BSuyHcga/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Facebook className="w-5 h-5" />
                {t("social.facebook")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
