'use client'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../sheet'
import { motion } from 'framer-motion'
import { useDirectusAnimations } from '@/lib/animations/directus-integration'
import { ReactNode } from 'react'

// Variants d'animation pour les sheets
const slideInVariants = {
  hidden: { opacity: 0, x: 300 },
  visible: { opacity: 1, x: 0 }
}

const defaultTransition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1] as const
}

interface AnimatedSheetProps {
  children: ReactNode
}

export function AnimatedSheet({ children }: AnimatedSheetProps) {
  const { animationsEnabled } = useDirectusAnimations()

  // Si les animations sont désactivées, retourner le sheet normal
  if (!animationsEnabled) {
    return <Sheet>{children}</Sheet>
  }

  return (
    <Sheet>
      {children}
    </Sheet>
  )
}

// Composants de sheet animés
export function AnimatedSheetTrigger({ children, asChild }: { children: ReactNode, asChild?: boolean }) {
  return <SheetTrigger asChild={asChild}>{children}</SheetTrigger>
}

export function AnimatedSheetContent({ 
  children, 
  side = "right", 
  className 
}: { 
  children: ReactNode, 
  side?: "top" | "right" | "bottom" | "left",
  className?: string 
}) {
  const { animationsEnabled } = useDirectusAnimations()

  if (!animationsEnabled) {
    return <SheetContent side={side} className={className}>{children}</SheetContent>
  }

  return (
    <SheetContent side={side} className={className}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideInVariants}
        transition={defaultTransition}
        className="h-full"
      >
        {children}
      </motion.div>
    </SheetContent>
  )
}

export function AnimatedSheetHeader({ children, className }: { children: ReactNode, className?: string }) {
  return <SheetHeader className={className}>{children}</SheetHeader>
}

export function AnimatedSheetTitle({ children, className }: { children: ReactNode, className?: string }) {
  return <SheetTitle className={className}>{children}</SheetTitle>
}

export function AnimatedSheetDescription({ children, className }: { children: ReactNode, className?: string }) {
  return <SheetDescription className={className}>{children}</SheetDescription>
}
