'use client'

import { Input, InputProps } from '../input'
import { motion } from 'framer-motion'
import { useDirectusAnimations } from '@/lib/animations/directus-integration'

// Variants d'animation pour les inputs
const fadeVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
}

const defaultTransition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1] as const
}

interface AnimatedInputProps extends InputProps {
  delay?: number
  animationType?: 'fade' | 'slideUp'
}

export function AnimatedInput({ 
  delay = 0, 
  animationType = 'fade',
  ...props 
}: AnimatedInputProps) {
  const { animationsEnabled } = useDirectusAnimations()

  // Si les animations sont désactivées, retourner l'input normal
  if (!animationsEnabled) {
    return <Input {...props} />
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
      <Input {...props} />
    </motion.div>
  )
}
