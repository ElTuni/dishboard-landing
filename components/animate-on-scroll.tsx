"use client"

import { useRef, type ReactNode } from "react"
import { motion, useInView } from "framer-motion"

interface AnimateOnScrollProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function AnimateOnScroll({ children, delay = 0, className }: AnimateOnScrollProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
