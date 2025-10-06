'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectProps } from '../select'
import { motion } from 'framer-motion'
import { useDirectusAnimations } from '@/lib/animations/directus-integration'
import { ReactNode } from 'react'

// Variants d'animation pour les selects
const fadeVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
}

const defaultTransition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1] as const
}

interface AnimatedSelectProps {
  delay?: number
  animationType?: 'fade' | 'slideUp'
  children: ReactNode
}

export function AnimatedSelect({ 
  delay = 0, 
  animationType = 'fade',
  children
}: AnimatedSelectProps) {
  const { animationsEnabled } = useDirectusAnimations()

  // Si les animations sont désactivées, retourner le select normal
  if (!animationsEnabled) {
    return <Select>{children}</Select>
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
      <Select>{children}</Select>
    </motion.div>
  )
}

// Composants de select animés
export function AnimatedSelectTrigger({ children, className }: { children: ReactNode, className?: string }) {
  return <SelectTrigger className={className}>{children}</SelectTrigger>
}

export function AnimatedSelectValue({ placeholder }: { placeholder?: string }) {
  return <SelectValue placeholder={placeholder} />
}

export function AnimatedSelectContent({ children }: { children: ReactNode }) {
  return <SelectContent>{children}</SelectContent>
}

export function AnimatedSelectItem({ value, children }: { value: string, children: ReactNode }) {
  return <SelectItem value={value}>{children}</SelectItem>
}
