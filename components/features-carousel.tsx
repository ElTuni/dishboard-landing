"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Lightbulb,
  Users,
  Clock,
  Target,
  Star,
  QrCode,
  Reply,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  image: string
}

interface FeaturesCarouselProps {
  features: Feature[]
}

// Map image text to actual image paths
const getImagePath = (imageText: string): string | null => {
  const imageMap: Record<string, string> = {
    "Gráfico de evolución de rating": "/example-graph-calification.png",
    "Rating evolution chart": "/example-graph-calification.png",
    "Panel de hallazgos destacados": "/example-hallazgos-destacados.png",
    "Key findings panel": "/example-hallazgos-destacados.png",
    "Ranking de empleados mencionados": "/example-ranking-empleados.png",
    "Employee mentions ranking": "/example-ranking-empleados.png",
    "Mapa de calor de ocupación": "/expample-graph-ocupacion.png",
    "Occupancy heatmap": "/expample-graph-ocupacion.png",
  }
  return imageMap[imageText] || null
}

export function FeaturesCarousel({ features }: FeaturesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const next = useCallback(() => {
    setCurrentIndex((current) => (current + 1) % features.length)
  }, [features.length])

  const prev = useCallback(() => {
    setCurrentIndex((current) => (current - 1 + features.length) % features.length)
  }, [features.length])

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(next, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, next])

  return (
    <div className="relative" onMouseEnter={() => setIsAutoPlaying(false)} onMouseLeave={() => setIsAutoPlaying(true)}>
      {/* Main carousel content */}
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Left: Feature info */}
        <div className="flex flex-col min-h-[280px] order-2 lg:order-1">
          <div className="flex-1 flex flex-col justify-start space-y-6">
            {/* Title with icon - fixed min height */}
            <div className="flex items-center gap-3 min-h-[60px]">
              <div className="p-3 bg-[#8EE0B2] rounded-xl text-[#2A3C3F] flex-shrink-0">{features[currentIndex].icon}</div>
              <h3 className="text-2xl font-bold text-[#2A3C3F] leading-tight">{features[currentIndex].title}</h3>
            </div>
            {/* Description - fixed min height */}
            <p className="text-gray-600 text-lg leading-relaxed min-h-[72px]">{features[currentIndex].description}</p>
          </div>

          {/* Navigation dots - always at the bottom */}
          <div className="flex items-center justify-between gap-4 pt-4 mt-auto w-full max-w-full lg:w-5">
            <Button variant="outline" size="icon" onClick={prev} className="rounded-full h-12 w-12 md:h-10 md:w-10 bg-transparent flex-shrink-0">
              <ChevronLeft className="h-6 w-6 md:h-5 md:w-5" />
            </Button>
            <div className="flex gap-2 flex-1 justify-center">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-3 h-3 md:w-2.5 md:h-2.5 rounded-full transition-all",
                    index === currentIndex ? "bg-[#8EE0B2] w-10 md:w-8" : "bg-gray-300 hover:bg-gray-400",
                  )}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={next} className="rounded-full h-12 w-12 md:h-10 md:w-10 bg-transparent flex-shrink-0">
              <ChevronRight className="h-6 w-6 md:h-5 md:w-5" />
            </Button>
          </div>
        </div>

        {/* Right: Feature image */}
        <div className="order-1 lg:order-2">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-gray-200" style={{ background: 'linear-gradient(to bottom right, #EAF8F0, #E8EBEB)' }}>
            {getImagePath(features[currentIndex].image) ? (
              <Image
                src={getImagePath(features[currentIndex].image)!}
                alt={features[currentIndex].title}
                fill
                className="object-contain p-4"
                priority={currentIndex === 0}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="p-4 bg-white/80 rounded-xl shadow-sm inline-block mb-4">
                    {features[currentIndex].icon}
                  </div>
                  <p className="text-sm text-gray-500">{features[currentIndex].image}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Features are now exported from @/lib/features

