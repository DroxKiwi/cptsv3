'use client'

import { motion } from 'framer-motion'
import { useVisibility } from '@/hooks/useVisibility'
import { ReactNode } from 'react'

interface VisibleSectionProps {
  children: ReactNode
  threshold?: number
  className?: string
  animationType?: 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'none'
  delay?: number
}

const animationVariants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  slideLeft: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  slideRight: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  none: {
    hidden: { opacity: 1 },
    visible: { opacity: 1 }
  }
}

const defaultTransition = {
  duration: 0.6,
  ease: [0.25, 0.46, 0.45, 0.94]
}

export function VisibleSection({ 
  children, 
  threshold = 0.1, 
  className = '',
  animationType = 'fade',
  delay = 0
}: VisibleSectionProps) {
  const { ref, isVisible } = useVisibility(threshold)
  
  const variants = animationVariants[animationType]
  const transition = {
    ...defaultTransition,
    delay
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  )
}
