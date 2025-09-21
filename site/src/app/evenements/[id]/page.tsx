'use client'

import { useEvenement } from '@/hooks/useDirectus'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Clock, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function EvenementDetailPage() {
  const params = useParams()
  const evenementId = parseInt(params.id as string)
  const { evenement, loading, error } = useEvenement(evenementId)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Chargement de l'événement...</p>
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
          <Button asChild className="mt-4">
            <Link href="/evenements">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux événements
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  if (!evenement) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Événement non trouvé</h1>
          <p className="text-gray-600 mb-4">L'événement demandé n'existe pas.</p>
          <Button asChild>
            <Link href="/evenements">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux événements
            </Link>
          </Button>
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
      <div className="mb-8">
        <Button asChild variant="outline" className="mb-4">
          <Link href="/evenements">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux événements
          </Link>
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card style={{ 
          backgroundColor: evenement.couleur_de_fond || undefined,
          color: evenement.couleur_texte || undefined
        }}>
          {evenement.image && (
            <div className="relative w-full h-64 md:h-96">
              <Image
                src={evenement.image}
                alt={evenement.titre}
                fill
                className="object-cover rounded-t-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority
              />
            </div>
          )}
          
          <CardHeader>
            <div className="flex items-center gap-2 mb-4">
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
            
            <CardTitle className="text-3xl mb-4">
              {evenement.titre}
            </CardTitle>
            
            {evenement.resume && (
              <CardDescription className="text-lg">
                {evenement.resume}
              </CardDescription>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-2" style={{ color: evenement.couleur_texte ? 'inherit' : '#6b7280' }}>
                <Calendar className="h-5 w-5" />
                <div>
                  <p className="font-medium">Date</p>
                  <p>
                    {formatDate(evenement.date_debut)}
                    {evenement.date_fin && evenement.date_fin !== evenement.date_debut && 
                      ` - ${formatDate(evenement.date_fin)}`
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2" style={{ color: evenement.couleur_texte ? 'inherit' : '#6b7280' }}>
                <Clock className="h-5 w-5" />
                <div>
                  <p className="font-medium">Heure</p>
                  <p>
                    {formatTime(evenement.date_debut)}
                    {evenement.date_fin && evenement.date_fin !== evenement.date_debut && 
                      ` - ${formatTime(evenement.date_fin)}`
                    }
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>

            {evenement.contenu && (
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-4">Description</h3>
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: evenement.contenu }}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
