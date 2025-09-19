"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "hi"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.history": "History",
    "nav.events": "Events",
    "nav.quiz": "Quiz",
    "nav.reserve": "Reserve Seat",

    // Hero Section
    "hero.title": "श्री रामलीला समिति कल्याणपुर",
    "hero.subtitle": "Experience the Sacred Tale of Ramayana",
    "hero.description":
      "Witness the traditional Ramlila organized in Kalyanpur. A grand presentation of Lord Rama's life story.",
    "hero.cta": "Book Your Seat",

    // About Section
    "about.title": "रामलीला के बारे में",
    "about.content":
      "Ramlila is one of India's oldest and most sacred theatrical traditions. It is based on the Ramayana composed by Maharishi Valmiki and Tulsidas Ji's Ramcharitmanas.",

    // Events Section
    "events.title": "Events",
    "events.dates": "September 27 to October 2, 2024",
    "events.location": "Ramlila Park, Shivani Vihar",
    "events.free": "Free Entry",

    // Quiz Section
    "quiz.title": "Play Quiz",
    "quiz.description": "Test your knowledge about Ramayana and Ramlila",
    "quiz.cta": "Start Quiz",

    // Social Media Section
    "social.title": "Our Social Platforms",
    "social.subtitle": "Join us in faith and devotion — Watch Ramlila Committee live on YouTube and Facebook",
    "social.youtube": "YouTube Channel",
    "social.facebook": "Facebook Page",
    "social.videos": "Our Videos",
    "social.filterByYear": "Filter by Year",
    "social.allYears": "All Years",
    "social.views": "views",
    "social.loading": "Loading videos...",

    // Footer
    "footer.contact": "Contact Us",
    "footer.address": "Ramlila Park, Shivani Vihar, Delhi",
    "footer.phone": "Phone: +91-XXXXXXXXXX",
    "footer.email": "Email: info@ramlilakalyanpur.org",
  },
  hi: {
    // Navigation
    "nav.home": "मुख्य पृष्ठ",
    "nav.history": "इतिहास",
    "nav.events": "कार्यक्रम",
    "nav.quiz": "प्रश्नोत्तरी",
    "nav.reserve": "सीट आरक्षण",

    // Hero Section
    "hero.title": "श्री रामलीला समिति कल्याणपुर",
    "hero.subtitle": "रामायण की पावन गाथा का मंचन",
    "hero.description":
      "कल्याणपुर में आयोजित होने वाली पारंपरिक रामलीला का साक्षी बनें। भगवान राम की जीवन गाथा का भव्य प्रस्तुतीकरण।",
    "hero.cta": "अपनी सीट बुक करें",

    // About Section
    "about.title": "रामलीला के बारे में",
    "about.content":
      "रामलीला भारत की सबसे पुरानी और पवित्र नाट्य परंपराओं में से एक है। यह महर्षि वाल्मीकि द्वारा रचित रामायण और तुलसीदास जी के रामचरितमानस पर आधारित है।",

    // Events Section
    "events.title": "कार्यक्रम",
    "events.dates": "27 सितंबर से 2 अक्टूबर 2024",
    "events.location": "रामलीला पार्क, शिवानी विहार",
    "events.free": "निःशुल्क प्रवेश",

    // Quiz Section
    "quiz.title": "प्रश्नोत्तरी खेलें",
    "quiz.description": "रामायण और रामलीला के बारे में अपने ज्ञान की परीक्षा करें",
    "quiz.cta": "प्रश्नोत्तरी शुरू करें",

    // Social Media Section
    "social.title": "हमारे सामाजिक मंच",
    "social.subtitle": "धर्म और भक्ति से जुड़ें — रामलीला समिति के लाइव यूट्यूब और फेसबुक पर देखें",
    "social.youtube": "यूट्यूब चैनल",
    "social.facebook": "फेसबुक पेज",
    "social.videos": "हमारे वीडियो",
    "social.filterByYear": "वर्ष के अनुसार फिल्टर करें",
    "social.allYears": "सभी वर्ष",
    "social.views": "बार देखा गया",
    "social.loading": "वीडियो लोड हो रहे हैं...",

    // Footer
    "footer.contact": "संपर्क करें",
    "footer.address": "रामलीला पार्क, शिवानी विहार, दिल्ली",
    "footer.phone": "फोन: +91-XXXXXXXXXX",
    "footer.email": "ईमेल: info@ramlilakalyanpur.org",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("hi")

  const t = (key: string): string => {
    const translation = translations[language]?.[key as keyof (typeof translations)[typeof language]]
    return translation || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
