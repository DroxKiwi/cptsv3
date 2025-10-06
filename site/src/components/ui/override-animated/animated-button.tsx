'use client'

import { Button, ButtonProps } from '../button'
import { motion } from 'framer-motion'
import { useDirectusAnimations } from '@/lib/animations/directus-integration'

// Variants d'animation pour les boutons
const bounceVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
}

const springTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 20
}

interface AnimatedButtonProps extends ButtonProps {
  delay?: number
  animationType?: 'bounce' | 'fade' | 'scale'
}

export function AnimatedButton({ 
  children, 
  delay = 0, 
  animationType = 'bounce',
  ...props 
}: AnimatedButtonProps) {
  const { animationsEnabled } = useDirectusAnimations()

  // Si les animations sont désactivées, retourner le bouton normal
  if (!animationsEnabled) {
    return <Button {...props}>{children}</Button>
  }

  const variants = animationType === 'bounce' ? bounceVariants : {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const transition = animationType === 'bounce' ? springTransition : {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1] as const
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ ...transition, delay }}
    >
      <Button {...props}>{children}</Button>
    </motion.div>
  )
}
