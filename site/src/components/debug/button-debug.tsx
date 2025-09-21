'use client'

import { useBoutons } from '@/hooks/useDirectus'
import { Button } from '@/components/ui/button'
import { getButtonStyles, getButtonHoverHandlers } from '@/lib/button-utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ButtonDebug() {
  const { boutons, loading, error } = useBoutons()

  if (loading) {
    return <div className="p-4">Chargement des boutons...</div>
  }

  if (error) {
    return <div className="p-4 text-red-500">Erreur: {error}</div>
  }

  if (!boutons || boutons.length === 0) {
    return <div className="p-4 text-yellow-500">Aucun bouton trouvé dans Directus</div>
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Debug des boutons Directus</h2>
      
      <div className="grid gap-4">
        {boutons.map((bouton, index) => (
          <Card key={bouton.id} className="p-4">
            <CardHeader>
              <CardTitle className="text-lg">
                Bouton #{bouton.id} - Index {index}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Affichage des valeurs reçues */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <strong>Couleur fond:</strong> 
                  <div 
                    className="w-8 h-8 rounded border inline-block ml-2"
                    style={{ backgroundColor: bouton.couleur_fond }}
                  ></div>
                  <span className="ml-2">{bouton.couleur_fond}</span>
                </div>
                <div>
                  <strong>Couleur texte:</strong> 
                  <div 
                    className="w-8 h-8 rounded border inline-block ml-2"
                    style={{ backgroundColor: bouton.couleur_texte }}
                  ></div>
                  <span className="ml-2">{bouton.couleur_texte}</span>
                </div>
                <div>
                  <strong>Couleur bordure:</strong> 
                  {bouton.couleur_bordure ? (
                    <>
                      <div 
                        className="w-8 h-8 rounded border-2 inline-block ml-2"
                        style={{ borderColor: bouton.couleur_bordure }}
                      ></div>
                      <span className="ml-2">{bouton.couleur_bordure}</span>
                    </>
                  ) : (
                    <span className="ml-2 text-gray-500">Aucune</span>
                  )}
                </div>
                <div>
                  <strong>Type de survol:</strong> 
                  <span className="ml-2 font-mono bg-gray-100 px-2 py-1 rounded">
                    {bouton.survol_type}
                  </span>
                </div>
              </div>

              {/* Bouton de test */}
              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-2">Aperçu du bouton:</h4>
                <Button 
                  style={getButtonStyles(bouton)}
                  {...getButtonHoverHandlers(bouton)}
                >
                  Bouton de test #{bouton.id}
                </Button>
              </div>

              {/* Données brutes */}
              <details className="pt-2">
                <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                  Voir les données brutes
                </summary>
                <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                  {JSON.stringify(bouton, null, 2)}
                </pre>
              </details>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
