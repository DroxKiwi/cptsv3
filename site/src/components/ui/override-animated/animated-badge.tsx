'use client'

import { Badge, BadgeProps } from '../badge'
import { motion } from 'framer-motion'
import { useDirectusAnimations } from '@/lib/animations/directus-integration'

// Variants d'animation pour les badges
const bounceVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 }
}

const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20
}

interface AnimatedBadgeProps extends BadgeProps {
  delay?: number
  animationType?: 'bounce' | 'fade' | 'scale'
}

export function AnimatedBadge({ 
  children, 
  delay = 0, 
  animationType = 'bounce',
  ...props 
}: AnimatedBadgeProps) {
  const { animationsEnabled } = useDirectusAnimations()

  // Si les animations sont désactivées, retourner le badge normal
  if (!animationsEnabled) {
    return <Badge {...props}>{children}</Badge>
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
      <Badge {...props}>{children}</Badge>
    </motion.div>
  )
}
