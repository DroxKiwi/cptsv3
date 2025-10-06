'use client'

import { PageTransition } from '@/components/layout/page-transition'
import { useDirectusAnimations } from '@/lib/animations/directus-integration'

// Exemple d'utilisation des transitions de page
export function PageTransitionExample({ children }: { children: React.ReactNode }) {
  const { animationsEnabled } = useDirectusAnimations()
  
  if (!animationsEnabled) {
    return <>{children}</>
  }
  
  return (
    <PageTransition>
      {children}
    </PageTransition>
  )
}

// Exemple d'intégration dans le layout principal
export function LayoutWithPageTransitions({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* Header fixe */}
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Votre header existant */}
      </header>
      
      {/* Contenu avec transitions */}
      <main className="pt-16"> {/* Ajustez selon la hauteur de votre header */}
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      
      {/* Footer fixe */}
      <footer>
        {/* Votre footer existant */}
      </footer>
    </div>
  )
}
