'use client'

import { useState } from 'react'
import { AnimationSelector } from './animation-selector'
import { PageTransitionSelector } from './page-transition-selector'

interface AnimationManagerProps {
  currentSettings: {
    animation_entree: string
    animation_transition: string
    animation_delay: string
    animation_hover: string
    animation_stagger: string
    animation_page: string
    animations_activees: boolean
  }
  onSettingsChange: (settings: any) => void
}

export function AnimationManager({ currentSettings, onSettingsChange }: AnimationManagerProps) {
  const [settings, setSettings] = useState(currentSettings)
  
  const handleSettingChange = (key: string, value: string | boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onSettingsChange(newSettings)
  }
  
  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold">Gestionnaire d'Animations</h2>
        <p className="text-muted-foreground">
          Configurez les animations du site via cette interface
        </p>
      </div>
      
      {/* Switch global */}
      <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.animations_activees}
            onChange={(e) => handleSettingChange('animations_activees', e.target.checked)}
            className="w-4 h-4"
          />
          <span className="font-medium">Activer les animations</span>
        </label>
        <p className="text-sm text-muted-foreground">
          Désactivez cette option pour désactiver toutes les animations du site
        </p>
      </div>
      
      {/* Sélecteurs d'animation */}
      <div className="grid gap-8">
        <AnimationSelector
          currentAnimation={settings.animation_entree}
          onAnimationChange={(value) => handleSettingChange('animation_entree', value)}
          type="entree"
          title="Animation d'entrée"
          description="Animation utilisée quand les éléments apparaissent à l'écran"
        />
        
        <AnimationSelector
          currentAnimation={settings.animation_transition}
          onAnimationChange={(value) => handleSettingChange('animation_transition', value)}
          type="transition"
          title="Type de transition"
          description="Vitesse et style de l'animation"
        />
        
        <AnimationSelector
          currentAnimation={settings.animation_hover}
          onAnimationChange={(value) => handleSettingChange('animation_hover', value)}
          type="hover"
          title="Animation de survol"
          description="Animation quand on survole les éléments"
        />
        
        <AnimationSelector
          currentAnimation={settings.animation_stagger}
          onAnimationChange={(value) => handleSettingChange('animation_stagger', value)}
          type="stagger"
          title="Animation de liste"
          description="Délai entre les animations des éléments de liste"
        />
        
        <PageTransitionSelector
          currentTransition={settings.animation_page}
          onTransitionChange={(value) => handleSettingChange('animation_page', value)}
        />
      </div>
      
      {/* Délai personnalisé */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Délai d'animation</h3>
          <p className="text-sm text-muted-foreground">
            Délai en secondes avant le début de l'animation
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={parseFloat(settings.animation_delay) || 0}
            onChange={(e) => handleSettingChange('animation_delay', e.target.value)}
            className="flex-1"
          />
          <span className="text-sm font-medium w-16">
            {settings.animation_delay}s
          </span>
        </div>
      </div>
      
      {/* Résumé des paramètres */}
      <div className="p-4 bg-muted rounded-lg">
        <h3 className="font-semibold mb-2">Résumé des paramètres</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <strong>Animation d'entrée :</strong> {settings.animation_entree}
          </div>
          <div>
            <strong>Transition :</strong> {settings.animation_transition}
          </div>
          <div>
            <strong>Hover :</strong> {settings.animation_hover}
          </div>
          <div>
            <strong>Stagger :</strong> {settings.animation_stagger}
          </div>
          <div>
            <strong>Page :</strong> {settings.animation_page}
          </div>
          <div>
            <strong>Délai :</strong> {settings.animation_delay}s
          </div>
        </div>
      </div>
    </div>
  )
}
