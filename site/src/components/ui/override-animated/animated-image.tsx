'use client'

import { motion } from 'framer-motion'
import { useDirectusAnimations } from '@/lib/animations/directus-integration'
import Image, { ImageProps } from 'next/image'

// Variants d'animation pour les images
const scaleVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
}

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

const defaultTransition = {
  duration: 0.6,
  ease: [0.4, 0, 0.2, 1] as const
}

interface AnimatedImageProps extends Omit<ImageProps, 'onLoad'> {
  delay?: number
  animationType?: 'scale' | 'fade'
  className?: string
}

export function AnimatedImage({ 
  delay = 0, 
  animationType = 'scale',
  className,
  ...props 
}: AnimatedImageProps) {
  const { animationsEnabled } = useDirectusAnimations()

  // Si les animations sont désactivées, retourner l'image normale
  if (!animationsEnabled) {
    return <Image className={className} {...props} />
  }

  const variants = animationType === 'scale' ? scaleVariants : fadeVariants

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ ...defaultTransition, delay }}
      className={className}
    >
      <Image {...props} />
    </motion.div>
  )
}
