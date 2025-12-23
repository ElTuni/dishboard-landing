"use client"

import { useEffect, useState, useRef } from "react"

interface AnimatedCounterProps {
  end: number
  duration?: number
  className?: string
}

export function AnimatedCounter({ end, duration = 600, className }: AnimatedCounterProps) {
  const [count, setCount] = useState(1)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [showPulse, setShowPulse] = useState(false)
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

              const easeOutBack = 1 + 2.70158 * Math.pow(progress - 1, 3) + 1.70158 * Math.pow(progress - 1, 2)
              const currentValue = Math.floor(startValue + (end - startValue) * Math.min(easeOutBack, 1))

              setCount(Math.min(currentValue, end))

              if (progress < 1) {
                requestAnimationFrame(animate)
              } else {
                setShowPulse(true)
                setTimeout(() => setShowPulse(false), 600)
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
      className={`inline-block tabular-nums relative ${className || ""}`}
      style={{
        minWidth: "1.5ch",
      }}
    >
      <span
        className={`inline-block transition-transform ${showPulse ? "animate-bounce" : ""}`}
        style={{
          transform: showPulse ? "scale(1.3)" : "scale(1)",
          transition: "transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {count}
      </span>
      {showPulse && (
        <span
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            animation: "ping 0.6s cubic-bezier(0, 0, 0.2, 1)",
          }}
        >
          <span className="w-8 h-8 rounded-full bg-[#8EE0B2] opacity-40" />
        </span>
      )}
    </span>
  )
}

