'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDirectusAnimations } from '@/lib/animations/directus-integration'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TestTransitionsPage() {
  const router = useRouter()
  const { globalPageTransition, animationsEnabled } = useDirectusAnimations()
  
  const testPages = [
    { path: '/', name: 'Accueil', description: 'Page d\'accueil du site' },
    { path: '/actualites', name: 'Actualités', description: 'Liste des actualités' },
    { path: '/actualites/1', name: 'Article 1', description: 'Page d\'un article' },
  ]
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* En-tête */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Test des Transitions de Page</h1>
            <p className="text-lg text-muted-foreground mb-4">
              Testez les transitions entre les pages du site
            </p>
            
            {/* Statut des animations */}
            <div className="inline-flex items-center gap-4 p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${animationsEnabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium">
                  Animations : {animationsEnabled ? 'Activées' : 'Désactivées'}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Transition actuelle : <strong>{globalPageTransition}</strong>
              </div>
            </div>
          </div>
          
          {/* Description de la transition */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Transition Actuelle : {globalPageTransition}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {globalPageTransition === 'fade' && 'Transition en fondu simple - la nouvelle page apparaît progressivement.'}
                {globalPageTransition === 'slideLeft' && 'Glissement vers la gauche - la nouvelle page glisse depuis la droite.'}
                {globalPageTransition === 'slideRight' && 'Glissement vers la droite - la nouvelle page glisse depuis la gauche.'}
                {globalPageTransition === 'slideUp' && 'Glissement vers le haut - la nouvelle page glisse depuis le bas.'}
                {globalPageTransition === 'slideDown' && 'Glissement vers le bas - la nouvelle page glisse depuis le haut.'}
                {globalPageTransition === 'scale' && 'Transition d\'échelle - la nouvelle page s\'agrandit/rétrécit.'}
                {globalPageTransition === 'flip' && 'Retournement - la nouvelle page se retourne sur l\'axe Y.'}
                {globalPageTransition === 'zoom' && 'Zoom - la nouvelle page zoome depuis le centre.'}
              </p>
            </CardContent>
          </Card>
          
          {/* Boutons de test */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testPages.map((page) => (
              <Card key={page.path} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{page.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{page.description}</p>
                  <Button 
                    onClick={() => router.push(page.path)}
                    className="w-full"
                  >
                    Aller à {page.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Instructions */}
          <div className="mt-8 p-6 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Instructions</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Cliquez sur les boutons ci-dessus pour naviguer vers différentes pages</li>
              <li>• Observez la transition de page configurée : <strong>{globalPageTransition}</strong></li>
              <li>• Utilisez le bouton "Retour" de votre navigateur pour tester la transition inverse</li>
              <li>• Pour changer la transition, modifiez le champ "animations_transitions_pages" dans Directus</li>
            </ul>
          </div>
          
          {/* Bouton retour */}
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              onClick={() => router.back()}
            >
              ← Retour
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
