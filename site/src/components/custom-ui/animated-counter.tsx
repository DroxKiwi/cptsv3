"use client"

import { useState, useEffect } from 'react'

interface AnimatedCounterProps {
  value: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
}

export function AnimatedCounter({ 
  value, 
  duration = 2000, 
  className = "",
  prefix = "",
  suffix = ""
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Utiliser une fonction d'easing pour un effet plus naturel
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(value * easeOutQuart)
      
      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    // Démarrer l'animation après un petit délai pour un effet plus fluide
    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate)
    }, 100)

    return () => {
      clearTimeout(timeout)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [value, duration])

  return (
    <span className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}
