'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../card'
import { motion } from 'framer-motion'
import { useDirectusAnimations } from '@/lib/animations/directus-integration'
import { ReactNode } from 'react'

// Variants d'animation pour les cartes
const scaleVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
}

const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const defaultTransition = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1] as const
}

interface AnimatedCardProps {
  children: ReactNode
  delay?: number
  animationType?: 'scale' | 'slideUp' | 'fade'
  className?: string
}

export function AnimatedCard({ 
  children, 
  delay = 0, 
  animationType = 'scale',
  className 
}: AnimatedCardProps) {
  const { animationsEnabled } = useDirectusAnimations()

  // Si les animations sont désactivées, retourner la carte normale
  if (!animationsEnabled) {
    return <Card className={className}>{children}</Card>
  }

  const variants = animationType === 'scale' ? scaleVariants : 
                   animationType === 'slideUp' ? slideUpVariants : {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ ...defaultTransition, delay }}
    >
      <Card className={className}>{children}</Card>
    </motion.div>
  )
}

// Composants de carte animés avec les mêmes props
export function AnimatedCardHeader({ children, className }: { children: ReactNode, className?: string }) {
  return <CardHeader className={className}>{children}</CardHeader>
}

export function AnimatedCardTitle({ children, className }: { children: ReactNode, className?: string }) {
  return <CardTitle className={className}>{children}</CardTitle>
}

export function AnimatedCardDescription({ children, className }: { children: ReactNode, className?: string }) {
  return <CardDescription className={className}>{children}</CardDescription>
}

export function AnimatedCardContent({ children, className }: { children: ReactNode, className?: string }) {
  return <CardContent className={className}>{children}</CardContent>
}

export function AnimatedCardFooter({ children, className }: { children: ReactNode, className?: string }) {
  return <CardFooter className={className}>{children}</CardFooter>
}
