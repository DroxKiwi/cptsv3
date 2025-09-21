'use client'

import { useEvenements } from '@/hooks/useDirectus'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function EvenementsPage() {
  const { evenements, loading, error } = useEvenements()

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Chargement des événements...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  if (!evenements || evenements.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Événements</h1>
          <p className="text-gray-600">Aucun événement disponible pour le moment.</p>
        </div>
      </div>
    )
  }

  // Fonction pour formater les dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Événements</h1>
        <p className="text-xl text-gray-600">Découvrez nos prochains événements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {evenements.map((evenement) => (
          <Card 
            key={evenement.id} 
            className="hover:shadow-lg transition-shadow h-full flex flex-col"
            style={{ 
              backgroundColor: evenement.couleur_de_fond || undefined,
              color: evenement.couleur_texte || undefined
            }}
          >
            {evenement.image && (
              <div className="relative w-full h-48">
                <Image
                  src={evenement.image}
                  alt={evenement.titre}
                  fill
                  className="object-cover rounded-t-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            
            <CardHeader className="flex-shrink-0">
              <div className="flex items-center gap-2 mb-2">
                {evenement.etiquettes && evenement.etiquettes.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {evenement.etiquettes.map((tag) => (
                      <Badge 
                        key={tag.id}
                        variant="secondary"
                        style={{
                          backgroundColor: tag.couleur || '#6b7280',
                          color: tag.couleur ? '#ffffff' : undefined
                        }}
                      >
                        {tag.nom}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <CardTitle className="text-xl line-clamp-2">
                {evenement.titre}
              </CardTitle>
              
              {evenement.resume && (
                <CardDescription className="line-clamp-3">
                  {evenement.resume}
                </CardDescription>
              )}
            </CardHeader>

            <CardContent className="flex-1 flex flex-col">
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm" style={{ color: evenement.couleur_texte ? 'inherit' : '#6b7280' }}>
                  <Calendar className="h-4 w-4" />
                  <span>
                    {formatDate(evenement.date_debut)}
                    {evenement.date_fin && evenement.date_fin !== evenement.date_debut && 
                      ` - ${formatDate(evenement.date_fin)}`
                    }
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm" style={{ color: evenement.couleur_texte ? 'inherit' : '#6b7280' }}>
                  <Clock className="h-4 w-4" />
                  <span>
                    {formatTime(evenement.date_debut)}
                    {evenement.date_fin && evenement.date_fin !== evenement.date_debut && 
                      ` - ${formatTime(evenement.date_fin)}`
                    }
                  </span>
                </div>
              </div>


              <div className="mt-auto">
                <Button asChild className="w-full">
                  <Link href={`/evenements/${evenement.id}`}>
                    Voir les détails
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
