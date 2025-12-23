"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
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
        <div className="space-y-6 order-2 lg:order-1">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#8EE0B2] rounded-xl text-[#2A3C3F]">{features[currentIndex].icon}</div>
            <h3 className="text-2xl font-bold text-[#2A3C3F]">{features[currentIndex].title}</h3>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">{features[currentIndex].description}</p>

          {/* Navigation dots */}
          <div className="flex items-center gap-4 pt-4">
            <Button variant="outline" size="icon" onClick={prev} className="rounded-full h-10 w-10 bg-transparent">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all",
                    index === currentIndex ? "bg-[#8EE0B2] w-8" : "bg-gray-300 hover:bg-gray-400",
                  )}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={next} className="rounded-full h-10 w-10 bg-transparent">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Right: Feature image placeholder */}
        <div className="order-1 lg:order-2">
          <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="p-4 bg-white/80 rounded-xl shadow-sm inline-block mb-4">
                  {features[currentIndex].icon}
                </div>
                <p className="text-sm text-gray-500">{features[currentIndex].image}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Features are now exported from @/lib/features

