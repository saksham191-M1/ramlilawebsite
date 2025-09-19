"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary">
              श्री रामलीला समिति कल्याणपुर
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                className="mr-4"
              >
                <Globe className="h-4 w-4 mr-2" />
                {language === "en" ? "हिंदी" : "English"}
              </Button>

              <Link
                href="/"
                className="text-card-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {t("nav.home")}
              </Link>
              <Link
                href="/quiz"
                className="text-card-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {t("nav.quiz")}
              </Link>
              <Link
                href="/donate"
                className="text-card-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                दान करें
              </Link>
              
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="w-full justify-start mb-2"
            >
              <Globe className="h-4 w-4 mr-2" />
              {language === "en" ? "हिंदी" : "English"}
            </Button>

            <Link
              href="/"
              className="text-card-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              {t("nav.home")}
            </Link>
            
            <Link
              href="/quiz"
              className="text-card-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              {t("nav.quiz")}
            </Link>
            <Link
              href="/donate"
              className="text-card-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              दान करें
            </Link>
            
          </div>
        </div>
      )}
    </nav>
  )
}
