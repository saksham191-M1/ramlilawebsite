"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text3D, Float, Environment } from "@react-three/drei"
import { Suspense, useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

function FloatingText({ position, text, size = 0.5, color = "#f59e0b" }: any) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Text3D
        position={position}
        font="/fonts/Geist_Bold.json"
        size={size}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        {text}
        <meshStandardMaterial color={color} />
      </Text3D>
    </Float>
  )
}

function RamCharacter({ position }: any) {
  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh position={position}>
        <cylinderGeometry args={[0.3, 0.5, 1.5, 8]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
      {/* Crown */}
      <mesh position={[position[0], position[1] + 1, position[2]]}>
        <coneGeometry args={[0.4, 0.3, 8]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>
    </Float>
  )
}

function Scene3D() {
  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Floating Hindi words */}
      <FloatingText position={[-3, 3, -2]} text="राम" size={0.4} />
      <FloatingText position={[3, 3.5, -1]} text="सीता" size={0.3} />
      <FloatingText position={[-2, -1, -3]} text="हनुमान" size={0.35} />
      <FloatingText position={[2.5, -0.5, -2]} text="लक्ष्मण" size={0.3} />
      <FloatingText position={[-4, 0.5, -1]} text="रावण" size={0.3} />
      <FloatingText position={[4, 1.5, -3]} text="धर्म" size={0.25} />

      {/* 3D Character representations */}
      <RamCharacter position={[-2, 0, -4]} />
      <RamCharacter position={[2, 0, -4]} />
      <RamCharacter position={[0, -1, -5]} />

      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
    </>
  )
}

export function Hero3D() {
  const { language } = useLanguage()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const content = {
    hindi: {
      welcome: "स्वागत है",
      description: "हमारे पारंपरिक रामलीला प्रदर्शन में भाग लें और भगवान राम की महान गाथा का अनुभव करें।",
      cta: "अभी बुक करें",
    },
    english: {
      welcome: "Welcome to",
      description: "Join our traditional Ramlila performance and experience the epic tale of Lord Rama.",
      cta: "Book Now",
    },
  }

  const currentContent = content[language] || content.hindi

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-amber-50 to-orange-100">
      {/* 3D Canvas Background */}
      {isMounted && (
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
            <Suspense fallback={null}>
              <Scene3D />
            </Suspense>
          </Canvas>
        </div>
      )}

      {!isMounted && <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-500 to-red-600" />}

      {/* Overlay Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 text-balance">{currentContent.welcome}</h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 text-pretty max-w-2xl mx-auto">
              {currentContent.description}
            </p>
            <Link href="/reserve">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full">
                {currentContent.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
