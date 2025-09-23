"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Brain, Trophy, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function QuizSection() {
  const { language } = useLanguage()

  const content = {
    hi: {
      title: "Test Your Knowledge",
      subtitle: "रामलीला के इतिहास और परंपराओं के बारे में हमारी इंटरैक्टिव क्विज़ के साथ खुद को चुनौती दें",
      startQuiz: "अभी क्विज़ शुरू करें",
      features: [
        {
          title: "Learn & Discover",
          description: "रामलीला के इतिहास, पात्रों और सांस्कृतिक महत्व के बारे में दिलचस्प तथ्यों का अन्वेषण करें",
        },
        {
          title: "Earn Points & Compete",
          description: "सही उत्तरों के लिए अंक अर्जित करें और अन्य खिलाड़ियों के साथ हमारे लीडरबोर्ड पर प्रतिस्पर्धा करें",
        },
        {
          title: "Fresh Questions",
          description: "हर क्विज़ में हमारे व्यापक ज्ञान आधार से अलग-अलग प्रश्न होते हैं",
        },
      ],
    },
    en: {
      title: "Test Your Knowledge",
      subtitle: "Challenge yourself with our interactive quiz about Ramlila history and traditions",
      startQuiz: "Start Quiz Now",
      features: [
        {
          title: "Learn & Discover",
          description: "Explore fascinating facts about Ramlila history, characters, and cultural significance",
        },
        {
          title: "Earn Points & Compete",
          description: "Score points for correct answers and compete on our leaderboard with other players",
        },
        {
          title: "Fresh Questions",
          description: "Every quiz features different questions from our extensive knowledge base",
        },
      ],
    },
  }

  const currentContent = content[language] || content.hi

  return (
    <section className="py-20 bg-ramlila-stage">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">{currentContent.title}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">{currentContent.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>{currentContent.features[0]?.title || "Learn & Discover"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-pretty">{currentContent.features[0]?.description || ""}</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>{currentContent.features[1]?.title || "Earn Points & Compete"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-pretty">{currentContent.features[1]?.description || ""}</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>{currentContent.features[2]?.title || "Fresh Questions"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-pretty">{currentContent.features[2]?.description || ""}</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="text-lg px-8 py-3">
            <Link href="/quiz">{currentContent.startQuiz}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
