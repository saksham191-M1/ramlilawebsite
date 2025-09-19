import { About } from "@/components/about"
import { Events } from "@/components/events"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { SocialMediaSection } from "@/components/social-media-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <SocialMediaSection />
        <About />
        <Events />
      </main>
      <Footer />
    </div>
  )
}
