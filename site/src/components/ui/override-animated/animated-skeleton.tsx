'use client'

import { Skeleton } from '../skeleton'
import { motion } from 'framer-motion'
import { useDirectusAnimations } from '@/lib/animations/directus-integration'

// Variants d'animation pour les skeletons
const pulseVariants = {
  hidden: { opacity: 0.3 },
  visible: { opacity: 0.7 }
}

const defaultTransition = {
  duration: 1.5,
  repeat: Infinity,
  repeatType: "reverse" as const,
  ease: "easeInOut"
}

interface AnimatedSkeletonProps {
  className?: string
  delay?: number
}

export function AnimatedSkeleton({ 
  className,
  delay = 0
}: AnimatedSkeletonProps) {
  const { animationsEnabled } = useDirectusAnimations()

  // Si les animations sont désactivées, retourner le skeleton normal
  if (!animationsEnabled) {
    return <Skeleton className={className} />
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pulseVariants}
      transition={{ ...defaultTransition, delay }}
    >
      <Skeleton className={className} />
    </motion.div>
  )
}
