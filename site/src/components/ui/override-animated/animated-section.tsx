'use client'

import { motion } from 'framer-motion'
import { useDirectusAnimations } from '@/lib/animations/directus-integration'
import { ReactNode } from 'react'

// Variants d'animation pour les sections
const slideUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
}

const defaultTransition = {
  duration: 0.6,
  ease: [0.4, 0, 0.2, 1] as const
}

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
  animationType?: 'slideUp' | 'fade' | 'scale'
  className?: string
}

export function AnimatedSection({ 
  children, 
  delay = 0, 
  animationType = 'slideUp',
  className 
}: AnimatedSectionProps) {
  const { animationsEnabled } = useDirectusAnimations()

  // Si les animations sont désactivées, retourner la section normale
  if (!animationsEnabled) {
    return <section className={className}>{children}</section>
  }

  const variants = animationType === 'slideUp' ? slideUpVariants :
                   animationType === 'scale' ? scaleVariants : fadeVariants

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ ...defaultTransition, delay }}
      className={className}
    >
      {children}
    </motion.section>
  )
}
