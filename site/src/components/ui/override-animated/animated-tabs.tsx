'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs'
import { motion } from 'framer-motion'
import { useDirectusAnimations } from '@/lib/animations/directus-integration'
import { ReactNode } from 'react'

// Variants d'animation pour les tabs
const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const defaultTransition = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1] as const
}

interface AnimatedTabsProps {
  delay?: number
  animationType?: 'fade' | 'slideUp'
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  children: ReactNode
  className?: string
}

export function AnimatedTabs({ 
  delay = 0, 
  animationType = 'slideUp',
  children,
  ...props
}: AnimatedTabsProps) {
  const { animationsEnabled } = useDirectusAnimations()

  // Si les animations sont désactivées, retourner les tabs normaux
  if (!animationsEnabled) {
    return <Tabs {...props}>{children}</Tabs>
  }

  const variants = animationType === 'slideUp' ? slideUpVariants : fadeVariants

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ ...defaultTransition, delay }}
    >
      <Tabs {...props}>{children}</Tabs>
    </motion.div>
  )
}

// Composants de tabs animés
export function AnimatedTabsList({ children, className }: { children: ReactNode, className?: string }) {
  return <TabsList className={className}>{children}</TabsList>
}

export function AnimatedTabsTrigger({ value, children, className }: { value: string, children: ReactNode, className?: string }) {
  return <TabsTrigger value={value} className={className}>{children}</TabsTrigger>
}

export function AnimatedTabsContent({ value, children, className }: { value: string, children: ReactNode, className?: string }) {
  return <TabsContent value={value} className={className}>{children}</TabsContent>
}
