'use client'

import { useState } from 'react'
import { PageTransition } from '@/components/layout/page-transition'
import { useDirectusAnimations } from '@/lib/animations/directus-integration'
import { Button } from '@/components/ui/button'

export function TransitionTester() {
  const [currentPage, setCurrentPage] = useState(1)
  const { globalPageTransition, animationsEnabled } = useDirectusAnimations()
  
  const pages = [
    { id: 1, title: 'Page 1', content: 'Contenu de la première page', color: 'bg-blue-100' },
    { id: 2, title: 'Page 2', content: 'Contenu de la deuxième page', color: 'bg-green-100' },
    { id: 3, title: 'Page 3', content: 'Contenu de la troisième page', color: 'bg-purple-100' },
    { id: 4, title: 'Page 4', content: 'Contenu de la quatrième page', color: 'bg-orange-100' }
  ]
  
  const currentPageData = pages.find(p => p.id === currentPage) || pages[0]
  
  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Testeur de Transitions de Page</h2>
        <p className="text-muted-foreground">
          Transition actuelle : <strong>{globalPageTransition}</strong>
        </p>
        <p className="text-sm text-muted-foreground">
          Animations activées : {animationsEnabled ? 'Oui' : 'Non'}
        </p>
      </div>
      
      {/* Boutons de navigation */}
      <div className="flex justify-center gap-4">
        {pages.map((page) => (
          <Button
            key={page.id}
            variant={currentPage === page.id ? 'default' : 'outline'}
            onClick={() => setCurrentPage(page.id)}
            className="min-w-[100px]"
          >
            {page.title}
          </Button>
        ))}
      </div>
      
      {/* Zone de transition */}
      <div className="relative h-96 border-2 border-dashed border-muted-foreground/25 rounded-lg overflow-hidden">
        <PageTransition>
          <div
            key={currentPage}
            className={`absolute inset-0 ${currentPageData.color} flex flex-col items-center justify-center p-8`}
          >
            <h3 className="text-3xl font-bold mb-4">{currentPageData.title}</h3>
            <p className="text-lg text-center max-w-md">{currentPageData.content}</p>
            <div className="mt-6 text-sm text-muted-foreground">
              ID de la page : {currentPage}
            </div>
          </div>
        </PageTransition>
      </div>
      
      {/* Instructions */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Cliquez sur les boutons ci-dessus pour tester la transition de page</p>
        <p>La transition utilisée est : <strong>{globalPageTransition}</strong></p>
      </div>
    </div>
  )
}
