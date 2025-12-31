"use client"

import { useEffect, useState, useRef } from "react"

interface AnimatedCounterProps {
  end: number
  duration?: number
  className?: string
}

export function AnimatedCounter({ end, duration = 800, className }: AnimatedCounterProps) {
  const [count, setCount] = useState(1)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)

            const startTime = performance.now()
            const startValue = 1

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime
              const progress = Math.min(elapsed / duration, 1)

              // easeOutCubic - animación suave y fluida
              const easeProgress = 1 - Math.pow(1 - progress, 3)
              const currentValue = Math.floor(startValue + (end - startValue) * easeProgress)

              setCount(currentValue)

              if (progress < 1) {
                requestAnimationFrame(animate)
              } else {
                setCount(end) // Aseguramos que termine en el valor exacto
              }
            }

            requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.5 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <span
      ref={ref}
      className={`tabular-nums ${className || ""}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "1.2em",
        padding: 0,
        margin: 0,
        letterSpacing: "-0.02em",
        transform: "translateX(-0.04em)",
      }}
    >
      {count}
    </span>
  )
}

