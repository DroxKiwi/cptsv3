'use client'

import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

/**
 * Hook personnalisé pour gérer la visibilité des sections
 * Une fois qu'une section devient visible, elle le reste
 */
export function useVisibility(threshold: number = 0.1) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    threshold,
    once: false // On veut détecter quand ça sort aussi
  })
  const [hasBeenVisible, setHasBeenVisible] = useState(false)

  useEffect(() => {
    if (isInView && !hasBeenVisible) {
      setHasBeenVisible(true)
    }
  }, [isInView, hasBeenVisible])

  return {
    ref,
    isVisible: hasBeenVisible || isInView,
    hasBeenVisible
  }
}
