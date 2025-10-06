'use client'

import { motion } from 'framer-motion'
import { useDirectusAnimations } from '@/lib/animations/directus-integration'
import { ReactNode } from 'react'

// Variants d'animation pour le texte
const fadeVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
}

const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const defaultTransition = {
  duration: 0.5,
  ease: [0.4, 0, 0.2, 1] as const
}

interface AnimatedTextProps {
  children: ReactNode
  delay?: number
  animationType?: 'fade' | 'slideUp'
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
}

export function AnimatedText({ 
  children, 
  delay = 0, 
  animationType = 'fade',
  className,
  as: Component = 'div'
}: AnimatedTextProps) {
  const { animationsEnabled } = useDirectusAnimations()

  // Si les animations sont désactivées, retourner le texte normal
  if (!animationsEnabled) {
    return <Component className={className}>{children}</Component>
  }

  const variants = animationType === 'slideUp' ? slideUpVariants : fadeVariants

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ ...defaultTransition, delay }}
    >
      <Component className={className}>{children}</Component>
    </motion.div>
  )
}
