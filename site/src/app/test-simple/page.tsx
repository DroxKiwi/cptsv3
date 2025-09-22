'use client'

import { useBoutons } from '@/hooks/useDirectus'
import { Button } from '@/components/ui/button'
import { getButtonStyles, getButtonHoverHandlers } from '@/lib/button-utils'

export default function TestSimplePage() {
  const { boutons, loading, error } = useBoutons()

  if (loading) {
    return <div className="p-8">Chargement des boutons...</div>
  }

  if (error) {
    return <div className="p-8 text-red-500">Erreur: {error}</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test des boutons Directus</h1>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Données reçues:</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(boutons, null, 2)}
            </pre>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Boutons de test:</h2>
            <div className="flex flex-wrap gap-4">
              {boutons && boutons.length > 0 ? (
                boutons.map((bouton, index) => (
                  <div key={bouton.id} className="space-y-2">
                    <p className="text-sm font-medium">Bouton #{bouton.id}</p>
                    <Button 
                      style={getButtonStyles(bouton)}
                      {...getButtonHoverHandlers(bouton)}
                    >
                      Test #{index + 1}
                    </Button>
                    <div className="text-xs text-gray-600">
                      <div>Fond: {bouton.couleur_de_fond}</div>
                      <div>Texte: {bouton.couleur_texte}</div>
                      <div>Bordure: {bouton.couleur_bordure || 'Aucune'}</div>
                      <div>Survol: {bouton.survol_type}</div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Aucun bouton trouvé</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
