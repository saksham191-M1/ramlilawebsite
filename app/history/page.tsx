import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const historyTimeline = [
  {
    year: "Ancient Times",
    title: "Origins of Ramayana",
    description:
      "The epic Ramayana was composed by sage Valmiki, telling the story of Lord Rama's life and adventures.",
    image: "/ancient-sage-writing-ramayana-manuscript.jpg",
  },
  {
    year: "Medieval Period",
    title: "Ramlila Tradition Begins",
    description:
      "The theatrical tradition of Ramlila started in various parts of India, bringing the Ramayana to life through performances.",
    image: "/medieval-ramlila-performance-with-traditional-cost.jpg",
  },
  {
    year: "1950s",
    title: "Kalyanpur Ramlila Founded",
    description:
      "Our community established the Shri Ramlila Samiti Kalyanpur to preserve and promote this sacred tradition.",
    image: "/vintage-photo-of-ramlila-committee-founding-member.jpg",
  },
  {
    year: "1980s-2000s",
    title: "Growth and Recognition",
    description:
      "Our Ramlila performances gained recognition across the region, attracting thousands of devotees annually.",
    image: "/large-crowd-watching-ramlila-performance-at-night.jpg",
  },
  {
    year: "Present Day",
    title: "Modern Traditions",
    description:
      "Today, we continue the tradition with enhanced production values while maintaining the authentic spiritual essence.",
    image: "/modern-ramlila-stage-with-lighting-and-sound-syste.jpg",
  },
]

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">History of Ramlila</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Discover the rich heritage and evolution of Ramlila from ancient times to our modern celebrations
            </p>
          </div>

          <div className="space-y-12">
            {historyTimeline.map((period, index) => (
              <Card key={index} className="overflow-hidden">
                <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 1 ? "md:grid-flow-col-dense" : ""}`}>
                  <div className={`aspect-video md:aspect-auto ${index % 2 === 1 ? "md:col-start-2" : ""}`}>
                    <img
                      src={period.image || "/placeholder.svg"}
                      alt={period.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="text-primary font-semibold text-lg mb-2">{period.year}</div>
                    <h3 className="text-2xl font-bold text-foreground mb-4 text-balance">{period.title}</h3>
                    <p className="text-muted-foreground text-lg text-pretty">{period.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          
        </div>
      </main>
      <Footer />
    </div>
  )
}
