'use client'

import { useBoutons } from '@/hooks/useDirectus'
import { Button } from '@/components/ui/button'
import { getButtonStyles, getButtonHoverHandlers } from '@/lib/button-utils'

export function ButtonDebugSimple() {
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

  const boutonPrincipal = boutons[0]

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Style de bouton unifié</h2>
      
      <div className="bg-gray-100 p-4 rounded">
        <h3 className="font-semibold mb-2">Bouton principal utilisé partout :</h3>
        <div className="flex items-center gap-4">
          <Button 
            style={getButtonStyles(boutonPrincipal)}
            {...getButtonHoverHandlers(boutonPrincipal)}
          >
            Exemple de bouton
          </Button>
          <div className="text-sm">
            <div><strong>Fond:</strong> {boutonPrincipal.couleur_fond}</div>
            <div><strong>Texte:</strong> {boutonPrincipal.couleur_texte}</div>
            <div><strong>Bordure:</strong> {boutonPrincipal.couleur_bordure || 'Aucune'}</div>
            <div><strong>Survol:</strong> {boutonPrincipal.survol_type}</div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Tous les boutons de la page utilisent ce style :</h3>
        <div className="flex flex-wrap gap-2">
          <Button style={getButtonStyles(boutonPrincipal)} {...getButtonHoverHandlers(boutonPrincipal)}>
            Découvrir nos services
          </Button>
          <Button style={getButtonStyles(boutonPrincipal)} {...getButtonHoverHandlers(boutonPrincipal)}>
            Nous contacter
          </Button>
          <Button style={getButtonStyles(boutonPrincipal)} {...getButtonHoverHandlers(boutonPrincipal)}>
            Voir toutes les actualités
          </Button>
          <Button style={getButtonStyles(boutonPrincipal)} {...getButtonHoverHandlers(boutonPrincipal)}>
            Voir les détails
          </Button>
          <Button style={getButtonStyles(boutonPrincipal)} {...getButtonHoverHandlers(boutonPrincipal)}>
            Voir tous les événements
          </Button>
        </div>
      </div>

      {boutons.length > 1 && (
        <div className="space-y-2">
          <h3 className="font-semibold">Autres boutons disponibles (non utilisés) :</h3>
          <div className="flex flex-wrap gap-2">
            {boutons.slice(1).map((bouton, index) => (
              <Button 
                key={bouton.id}
                style={getButtonStyles(bouton)}
                {...getButtonHoverHandlers(bouton)}
              >
                Bouton #{bouton.id}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
