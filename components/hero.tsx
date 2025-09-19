"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export function Hero() {
  const { t } = useLanguage()

  const heroTitle = t("hero.title") || "श्री रामलीला समिति कल्याणपुर"
  const heroSubtitle = t("hero.subtitle") || "पारंपरिक रामलीला का आयोजन"
  const heroDescription = t("hero.description") || "हमारे साथ जुड़ें और रामायण की अमर कहानी का आनंद लें"
  const eventsTitle = t("events.title") || "कार्यक्रम"
  const quizTitle = t("quiz.title") || (t("nav.quiz") || "Quiz")

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-card to-background">
      <div className="absolute inset-0 bg-[url('/traditional-ramlila-performance-stage-with-colorfu.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">{heroTitle}</h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty">{heroSubtitle}</p>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty">{heroDescription}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="text-lg px-8 py-3">
            <Link href="/events">{eventsTitle}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-6 py-3 bg-transparent">
            <Link href="/quiz">{quizTitle}</Link>
          </Button>
          <Button asChild size="lg" className="text-lg px-6 py-3 bg-red-600 hover:bg-red-700 text-white">
            <Link href="/donate">दान करें</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
