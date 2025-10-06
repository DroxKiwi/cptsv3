'use client'

import { Textarea, TextareaProps } from '../textarea'
import { motion } from 'framer-motion'
import { useDirectusAnimations } from '@/lib/animations/directus-integration'

// Variants d'animation pour les textareas
const fadeVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
}

const defaultTransition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1] as const
}

interface AnimatedTextareaProps extends TextareaProps {
  delay?: number
  animationType?: 'fade' | 'slideUp'
}

export function AnimatedTextarea({ 
  delay = 0, 
  animationType = 'fade',
  ...props 
}: AnimatedTextareaProps) {
  const { animationsEnabled } = useDirectusAnimations()

  // Si les animations sont désactivées, retourner le textarea normal
  if (!animationsEnabled) {
    return <Textarea {...props} />
  }

  const variants = animationType === 'slideUp' ? {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  } : fadeVariants

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ ...defaultTransition, delay }}
    >
      <Textarea {...props} />
    </motion.div>
  )
}
