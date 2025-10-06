'use client'

import { Separator } from '../separator'
import { motion } from 'framer-motion'
import { useDirectusAnimations } from '@/lib/animations/directus-integration'

// Variants d'animation pour les separators
const scaleXVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1 }
}

const defaultTransition = {
  duration: 0.6,
  ease: [0.4, 0, 0.2, 1] as const
}

interface AnimatedSeparatorProps {
  className?: string
  delay?: number
  orientation?: "horizontal" | "vertical"
}

export function AnimatedSeparator({ 
  className,
  delay = 0,
  orientation = "horizontal"
}: AnimatedSeparatorProps) {
  const { animationsEnabled } = useDirectusAnimations()

  // Si les animations sont désactivées, retourner le separator normal
  if (!animationsEnabled) {
    return <Separator className={className} orientation={orientation} />
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={scaleXVariants}
      transition={{ ...defaultTransition, delay }}
      style={{ originX: 0 }}
    >
      <Separator className={className} orientation={orientation} />
    </motion.div>
  )
}
