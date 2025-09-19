"use client"

import dynamic from "next/dynamic"

const Hero3D = dynamic(() => import("@/components/hero-3d").then((mod) => ({ default: mod.Hero3D })), {
  ssr: false,
  loading: () => (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-amber-400 via-orange-500 to-red-600">
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 text-balance">Loading...</h1>
          </div>
        </div>
      </div>
    </section>
  ),
})

export function Hero3DClient() {
  return <Hero3D />
}
