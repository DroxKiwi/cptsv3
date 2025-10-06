'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface AnimationSelectorProps {
  currentAnimation: string
  onAnimationChange: (animation: string) => void
  type: 'entree' | 'transition' | 'hover' | 'stagger'
  title: string
  description: string
}

const animationOptions = {
  entree: [
    { id: 'fadeIn', name: 'Fondu', description: 'Apparition en fondu' },
    { id: 'fadeInUp', name: 'Fondu Haut', description: 'Apparition depuis le bas' },
    { id: 'fadeInDown', name: 'Fondu Bas', description: 'Apparition depuis le haut' },
    { id: 'fadeInLeft', name: 'Fondu Gauche', description: 'Apparition depuis la gauche' },
    { id: 'fadeInRight', name: 'Fondu Droite', description: 'Apparition depuis la droite' },
    { id: 'scaleIn', name: 'Échelle', description: 'Apparition avec agrandissement' },
    { id: 'scaleInBounce', name: 'Échelle Rebond', description: 'Apparition avec rebond' },
    { id: 'rotateIn', name: 'Rotation', description: 'Apparition avec rotation' },
    { id: 'slideInUp', name: 'Glissement Haut', description: 'Glissement depuis le bas' },
    { id: 'slideInDown', name: 'Glissement Bas', description: 'Glissement depuis le haut' },
    { id: 'flipInX', name: 'Retournement X', description: 'Retournement sur l\'axe X' },
    { id: 'flipInY', name: 'Retournement Y', description: 'Retournement sur l\'axe Y' },
    { id: 'zoomIn', name: 'Zoom', description: 'Zoom d\'entrée' },
    { id: 'bounceIn', name: 'Rebond', description: 'Entrée avec rebond' }
  ],
  transition: [
    { id: 'fast', name: 'Rapide', description: '0.2 secondes' },
    { id: 'normal', name: 'Normale', description: '0.3 secondes' },
    { id: 'slow', name: 'Lente', description: '0.6 secondes' },
    { id: 'spring', name: 'Spring', description: 'Physique de ressort' },
    { id: 'springBounce', name: 'Spring Rebond', description: 'Spring avec rebond' },
    { id: 'springSmooth', name: 'Spring Doux', description: 'Spring fluide' },
    { id: 'easeIn', name: 'Ease In', description: 'Accélération progressive' },
    { id: 'easeOut', name: 'Ease Out', description: 'Décélération progressive' },
    { id: 'easeInOut', name: 'Ease In-Out', description: 'Accélération puis décélération' }
  ],
  hover: [
    { id: 'lift', name: 'Élévation', description: 'L\'élément se soulève' },
    { id: 'scale', name: 'Agrandissement', description: 'L\'élément s\'agrandit' },
    { id: 'rotate', name: 'Rotation', description: 'L\'élément tourne légèrement' },
    { id: 'glow', name: 'Lueur', description: 'Effet de lueur' },
    { id: 'tilt', name: 'Inclinaison', description: 'Inclinaison 3D' }
  ],
  stagger: [
    { id: 'normal', name: 'Normal', description: 'Délai de 0.1s entre éléments' },
    { id: 'fast', name: 'Rapide', description: 'Délai de 0.05s entre éléments' },
    { id: 'slow', name: 'Lent', description: 'Délai de 0.2s entre éléments' }
  ]
}

export function AnimationSelector({ 
  currentAnimation, 
  onAnimationChange, 
  type, 
  title, 
  description 
}: AnimationSelectorProps) {
  const [previewAnimation, setPreviewAnimation] = useState<string | null>(null)
  
  const options = animationOptions[type]
  
  const handlePreview = (animationId: string) => {
    setPreviewAnimation(animationId)
    setTimeout(() => setPreviewAnimation(null), 2000)
  }
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {options.map((option) => (
          <div
            key={option.id}
            className={`
              relative p-3 border rounded-lg cursor-pointer transition-colors
              ${currentAnimation === option.id 
                ? 'border-primary bg-primary/10' 
                : 'border-border hover:border-primary/50'
              }
            `}
            onClick={() => onAnimationChange(option.id)}
          >
            <div className="text-center">
              <h4 className="font-medium text-sm">{option.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">
                {option.description}
              </p>
            </div>
            
            {/* Bouton de prévisualisation */}
            <button
              className="absolute top-1 right-1 w-5 h-5 bg-primary/20 hover:bg-primary/30 rounded-full flex items-center justify-center text-xs"
              onClick={(e) => {
                e.stopPropagation()
                handlePreview(option.id)
              }}
              title="Prévisualiser"
            >
              ▶
            </button>
          </div>
        ))}
      </div>
      
      {/* Zone de prévisualisation */}
      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">Prévisualisation</h4>
        <div className="relative h-24 bg-muted rounded-lg overflow-hidden">
          <motion.div
            key={previewAnimation || 'default'}
            initial={previewAnimation ? 'initial' : false}
            animate={previewAnimation ? 'animate' : false}
            variants={{
              initial: { opacity: 0, y: 20, scale: 0.8 },
              animate: { opacity: 1, y: 0, scale: 1 }
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-primary/20 flex items-center justify-center"
          >
            <span className="text-sm font-medium">
              {previewAnimation 
                ? options.find(o => o.id === previewAnimation)?.name
                : 'Cliquez sur ▶ pour prévisualiser'
              }
            </span>
          </motion.div>
        </div>
      </div>
      
      {/* Animation actuelle */}
      <div className="p-3 bg-muted rounded-lg">
        <p className="text-sm">
          <strong>Animation actuelle :</strong>{' '}
          {options.find(o => o.id === currentAnimation)?.name || 'Aucune'}
        </p>
      </div>
    </div>
  )
}
