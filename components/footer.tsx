import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-ramlila-crowd text-secondary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-xl font-bold mb-4 text-white">श्री रामलीला समिति कल्याणपुर</h3>
            <p className="text-white/90 mb-4 text-pretty">
              Dedicated to preserving and promoting the sacred tradition of Ramlila in our community for over decades.
            </p>
            <p className="text-white/90 text-pretty">
              Join us in celebrating the eternal values of dharma, devotion, and cultural heritage.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-white/80 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="text-white/80 hover:text-white transition-colors">
                  Quiz
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-white/80 hover:text-white transition-colors">
                  दान करें
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Contact</h4>
            <div className="space-y-2 text-white/80">
              <p>Ramlila Park, Shivani Vihar, Kalyanpur, Lucknow, UP</p>
              <p>Kalyanpur, India</p>
              <p>Phone: +91 XXXXX XXXXX</p>
              <p>Email: kalyanpurramleela20@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/80">© 2024 Shri Ramlila Samiti Kalyanpur. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
