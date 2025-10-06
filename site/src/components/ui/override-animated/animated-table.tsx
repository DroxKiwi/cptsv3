'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table'
import { motion } from 'framer-motion'
import { useDirectusAnimations } from '@/lib/animations/directus-integration'
import { ReactNode } from 'react'

// Variants d'animation pour les tables
const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const defaultTransition = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1] as const
}

interface AnimatedTableProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function AnimatedTable({ 
  children, 
  delay = 0,
  className 
}: AnimatedTableProps) {
  const { animationsEnabled } = useDirectusAnimations()

  // Si les animations sont désactivées, retourner la table normale
  if (!animationsEnabled) {
    return <Table className={className}>{children}</Table>
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeVariants}
      transition={{ ...defaultTransition, delay }}
    >
      <Table className={className}>{children}</Table>
    </motion.div>
  )
}

// Composants de table animés
export function AnimatedTableHeader({ children, className }: { children: ReactNode, className?: string }) {
  return <TableHeader className={className}>{children}</TableHeader>
}

export function AnimatedTableBody({ children, className }: { children: ReactNode, className?: string }) {
  return <TableBody className={className}>{children}</TableBody>
}

export function AnimatedTableRow({ children, className }: { children: ReactNode, className?: string }) {
  return <TableRow className={className}>{children}</TableRow>
}

export function AnimatedTableHead({ children, className }: { children: ReactNode, className?: string }) {
  return <TableHead className={className}>{children}</TableHead>
}

export function AnimatedTableCell({ children, className }: { children: ReactNode, className?: string }) {
  return <TableCell className={className}>{children}</TableCell>
}
