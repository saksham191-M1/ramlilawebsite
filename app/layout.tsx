import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/contexts/language-context"
import { ThemeProvider } from "next-themes"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "श्री रामलीला समिति कल्याणपुर | Shri Ramlila Samiti Kalyanpur",
  description: "श्री रामलीला समिति कल्याणपुर की आधिकारिक वेबसाइट। पारंपरिक रामलीला, कार्यक्रम और प्रश्नोत्तरी के लिए हमसे जुड़ें।",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      <body>
        <Suspense fallback={null}>
          <LanguageProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
              {children}
            </ThemeProvider>
          </LanguageProvider>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
