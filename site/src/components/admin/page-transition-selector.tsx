'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PageTransitionSelectorProps {
  currentTransition: string
  onTransitionChange: (transition: string) => void
}

const availableTransitions = [
  { id: 'fade', name: 'Fondu', description: 'Transition en fondu simple' },
  { id: 'slideLeft', name: 'Glissement Gauche', description: 'La page glisse depuis la droite' },
  { id: 'slideRight', name: 'Glissement Droite', description: 'La page glisse depuis la gauche' },
  { id: 'slideUp', name: 'Glissement Haut', description: 'La page glisse depuis le bas' },
  { id: 'slideDown', name: 'Glissement Bas', description: 'La page glisse depuis le haut' },
  { id: 'scale', name: 'Échelle', description: 'La page s\'agrandit/rétrécit' },
  { id: 'flip', name: 'Retournement', description: 'La page se retourne sur l\'axe Y' },
  { id: 'zoom', name: 'Zoom', description: 'La page zoome depuis le centre' }
]

export function PageTransitionSelector({ 
  currentTransition, 
  onTransitionChange 
}: PageTransitionSelectorProps) {
  const [previewTransition, setPreviewTransition] = useState<string | null>(null)
  
  const pageVariants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    slideLeft: {
      initial: { x: '100%' },
      animate: { x: 0 },
      exit: { x: '-100%' }
    },
    slideRight: {
      initial: { x: '-100%' },
      animate: { x: 0 },
      exit: { x: '100%' }
    },
    slideUp: {
      initial: { y: '100%' },
      animate: { y: 0 },
      exit: { y: '-100%' }
    },
    slideDown: {
      initial: { y: '-100%' },
      animate: { y: 0 },
      exit: { y: '100%' }
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.2 }
    },
    flip: {
      initial: { opacity: 0, rotateY: -90 },
      animate: { opacity: 1, rotateY: 0 },
      exit: { opacity: 0, rotateY: 90 }
    },
    zoom: {
      initial: { opacity: 0, scale: 0.5 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.5 }
    }
  }
  
  const handlePreview = (transitionId: string) => {
    setPreviewTransition(transitionId)
    setTimeout(() => setPreviewTransition(null), 1000)
  }
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Sélectionner la transition de page</h3>
      <p className="text-sm text-muted-foreground">
        Choisissez l'animation utilisée lors des changements de page
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {availableTransitions.map((transition) => (
          <div
            key={transition.id}
            className={`
              relative p-4 border rounded-lg cursor-pointer transition-colors
              ${currentTransition === transition.id 
                ? 'border-primary bg-primary/10' 
                : 'border-border hover:border-primary/50'
              }
            `}
            onClick={() => onTransitionChange(transition.id)}
          >
            <div className="text-center">
              <h4 className="font-medium text-sm">{transition.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">
                {transition.description}
              </p>
            </div>
            
            {/* Bouton de prévisualisation */}
            <button
              className="absolute top-2 right-2 w-6 h-6 bg-primary/20 hover:bg-primary/30 rounded-full flex items-center justify-center text-xs"
              onClick={(e) => {
                e.stopPropagation()
                handlePreview(transition.id)
              }}
              title="Prévisualiser"
            >
              ▶
            </button>
          </div>
        ))}
      </div>
      
      {/* Zone de prévisualisation */}
      <div className="mt-6">
        <h4 className="text-sm font-medium mb-2">Prévisualisation</h4>
        <div className="relative h-32 bg-muted rounded-lg overflow-hidden">
          <AnimatePresence mode="wait">
            {previewTransition && (
              <motion.div
                key={previewTransition}
                variants={pageVariants[previewTransition as keyof typeof pageVariants]}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-primary/20 flex items-center justify-center"
              >
                <span className="text-sm font-medium">
                  {availableTransitions.find(t => t.id === previewTransition)?.name}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          
          {!previewTransition && (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <span className="text-sm">Cliquez sur ▶ pour prévisualiser</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Transition actuelle */}
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <p className="text-sm">
          <strong>Transition actuelle :</strong>{' '}
          {availableTransitions.find(t => t.id === currentTransition)?.name || 'Aucune'}
        </p>
      </div>
    </div>
  )
}
