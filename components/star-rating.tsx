"use client"

import { Star } from "lucide-react"
import { useState } from "react"

interface StarRatingProps {
  filled: number
  total?: number
  size?: "sm" | "md" | "lg"
  hoverable?: boolean
}

export function StarRating({ filled, total = 5, size = "md", hoverable = false }: StarRatingProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-10 w-10",
  }

  const isStarFilled = (index: number) => {
    if (hoverable && hoverIndex !== null) {
      return index <= hoverIndex
    }
    return index < filled
  }

  return (
    <div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} ${
            isStarFilled(i) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
          } ${hoverable ? "transition-colors duration-150 cursor-default" : ""}`}
          onMouseEnter={hoverable ? () => setHoverIndex(i) : undefined}
          onMouseLeave={hoverable ? () => setHoverIndex(null) : undefined}
        />
      ))}
    </div>
  )
}

