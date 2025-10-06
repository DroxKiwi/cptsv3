'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../dialog'
import { motion } from 'framer-motion'
import { useDirectusAnimations } from '@/lib/animations/directus-integration'
import { ReactNode } from 'react'

// Variants d'animation pour les dialogs
const scaleVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
}

const defaultTransition = {
  duration: 0.2,
  ease: [0.4, 0, 0.2, 1] as const
}

interface AnimatedDialogProps {
  children: ReactNode
}

export function AnimatedDialog({ children }: AnimatedDialogProps) {
  const { animationsEnabled } = useDirectusAnimations()

  // Si les animations sont désactivées, retourner le dialog normal
  if (!animationsEnabled) {
    return <Dialog>{children}</Dialog>
  }

  return (
    <Dialog>
      {children}
    </Dialog>
  )
}

// Composants de dialog animés
export function AnimatedDialogTrigger({ children, asChild }: { children: ReactNode, asChild?: boolean }) {
  return <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
}

export function AnimatedDialogContent({ children, className }: { children: ReactNode, className?: string }) {
  const { animationsEnabled } = useDirectusAnimations()

  if (!animationsEnabled) {
    return <DialogContent className={className}>{children}</DialogContent>
  }

  return (
    <DialogContent className={className}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={scaleVariants}
        transition={defaultTransition}
      >
        {children}
      </motion.div>
    </DialogContent>
  )
}

export function AnimatedDialogHeader({ children, className }: { children: ReactNode, className?: string }) {
  return <DialogHeader className={className}>{children}</DialogHeader>
}

export function AnimatedDialogTitle({ children, className }: { children: ReactNode, className?: string }) {
  return <DialogTitle className={className}>{children}</DialogTitle>
}

export function AnimatedDialogDescription({ children, className }: { children: ReactNode, className?: string }) {
  return <DialogDescription className={className}>{children}</DialogDescription>
}
