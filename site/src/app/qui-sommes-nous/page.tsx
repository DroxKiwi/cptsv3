'use client'

import { usePresentation } from '@/hooks/usePresentation'
import { useReglagesGeneraux } from '@/hooks/useReglagesGeneraux'
import { themeClasses } from '@/lib/theme'
import { RichContent } from '@/components/custom-ui/rich-content'
import Image from 'next/image'

export default function QuiSommesNous() {
  const { presentation, loading: presentationLoading, error: presentationError } = usePresentation()
  const { reglages, loading: reglagesLoading } = useReglagesGeneraux()

  if (presentationLoading || reglagesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement de la page...</p>
        </div>
      </div>
    )
  }

  if (presentationError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Erreur de chargement</h1>
          <p className="text-muted-foreground">Impossible de charger les données de la page.</p>
        </div>
      </div>
    )
  }

  if (!presentation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Page non trouvée</h1>
          <p className="text-muted-foreground">Aucune donnée de présentation disponible.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className={`py-12 px-4 sm:py-16 md:py-20 lg:py-24 ${themeClasses.sectionPrimaire}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={`${themeClasses.titre} mb-6 sm:mb-8`}>
            {presentation.titre_principal || "Qui sommes-nous ?"}
          </h1>
          
          {presentation.image_principale && (
            <div className="relative w-full h-64 sm:h-80 md:h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={presentation.image_principale}
                alt={presentation.titre_principal || "Image de présentation"}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1024px"
              />
            </div>
          )}
        </div>
      </section>

      {/* Contenu principal */}
      <section className={`py-12 px-4 sm:py-16 md:py-20 ${themeClasses.sectionSecondaire}`}>
        <div className="max-w-4xl mx-auto">
          {presentation.test_editeur_avance && (
            <RichContent
              content={presentation.test_editeur_avance}
              className={themeClasses.corps}
              style={{
                color: reglages?.couleur_corps || 'inherit'
              }}
            />
          )}
        </div>
      </section>
    </div>
  )
}