'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useArticle } from '@/hooks/useDirectus'
import { useEntete, useReglagesGeneraux, useBoutons } from '@/hooks/useDirectus'
import Image from 'next/image'
import { Calendar, ArrowLeft, Share2, Clock } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const articleId = parseInt(params.id as string)
  
  const { article, loading, error } = useArticle(articleId)
  const { entete } = useEntete()
  const { reglages } = useReglagesGeneraux()
  const { boutons } = useBoutons()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const isValidImageUrl = (image: any): boolean => {
    if (!image || typeof image !== 'object' || !image.id) {
      return false
    }
    return true
  }

  const getImageUrl = (image: any): string => {
    if (!image || typeof image !== 'object' || !image.id) {
      return ''
    }
    // Construire l'URL de l'image Directus
    return `${process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'}/assets/${image.id}`
  }

  const getBoutonStyles = (boutonId?: number) => {
    const bouton = boutons.find(b => b.id === boutonId) || boutons[0] // Utiliser le premier bouton par défaut
    if (!bouton) return {}

    const baseStyles = {
      backgroundColor: bouton.couleur_de_fond,
      color: bouton.couleur_texte,
      borderColor: bouton.couleur_bordure || bouton.couleur_de_fond,
      borderWidth: bouton.epaisseur_bordures ? `${bouton.epaisseur_bordures}px` : '1px',
      borderStyle: 'solid',
      transition: 'all 0.3s ease',
      padding: '12px 24px', // Augmenter le padding
      fontSize: reglages?.taille_polices_corps ? `${parseInt(reglages.taille_polices_corps) + 4}px` : '16px', // Taille plus grande
      minHeight: '48px', // Hauteur minimale
      borderRadius: '8px', // Coins arrondis
    }

    return {
      base: baseStyles,
      hover: getHoverStyles(bouton, baseStyles)
    }
  }

  const getHoverStyles = (bouton: any, baseStyles: any) => {
    switch (bouton.survol_type) {
      case 'agrandissement':
        return { ...baseStyles, transform: 'scale(1.05)' }
      case 'changement_de_couleur_de_fond':
        return { ...baseStyles, backgroundColor: bouton.couleur_texte, color: bouton.couleur_de_fond }
      case 'ombre_portee':
        return { ...baseStyles, boxShadow: `0 4px 8px ${bouton.couleur_de_fond}40` }
      case 'changement_opacite':
        return { ...baseStyles, opacity: 0.8 }
      case 'deplacement_vers_le_haut':
        return { ...baseStyles, transform: 'translateY(-2px)' }
      case 'rotation_legere':
        return { ...baseStyles, transform: 'rotate(1deg)' }
      default:
        return baseStyles
    }
  }

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.titre,
          text: article.resume || article.excerpt || '',
          url: window.location.href,
        })
      } catch (err) {
        console.log('Erreur lors du partage:', err)
      }
    } else {
      // Fallback: copier l'URL dans le presse-papiers
      try {
        await navigator.clipboard.writeText(window.location.href)
        // Ici on pourrait ajouter un toast de confirmation
        alert('Lien copié dans le presse-papiers !')
      } catch (err) {
        console.log('Erreur lors de la copie:', err)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header skeleton */}
          <div className="mb-8">
            <Skeleton className="h-10 w-32 mb-4" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2" />
          </div>
          
          {/* Image skeleton */}
          <Skeleton className="h-64 w-full mb-8 rounded-lg" />
          
          {/* Content skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive mb-4">
              Article non trouvé
            </h1>
            <p className="text-muted-foreground mb-6">
              {error || "L'article que vous recherchez n'existe pas ou a été supprimé."}
            </p>
            <Button onClick={() => router.push('/actualites')} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux actualités
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header avec navigation */}
      <div className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => router.push('/actualites')}
              className="flex items-center gap-2"
              style={{
                ...getBoutonStyles().base,
                fontFamily: reglages?.polices_ecriture_corps || 'inherit',
                fontWeight: reglages?.epaisseur_corps || 'normal',
              }}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, getBoutonStyles().hover)
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, getBoutonStyles().base)
              }}
            >
              <ArrowLeft className="h-4 w-4" />
              Retour aux actualités
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleShare}
              className="flex items-center gap-2"
              style={{
                ...getBoutonStyles().base,
                fontFamily: reglages?.polices_ecriture_corps || 'inherit',
                fontWeight: reglages?.epaisseur_corps || 'normal',
              }}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, getBoutonStyles().hover)
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, getBoutonStyles().base)
              }}
            >
              <Share2 className="h-4 w-4" />
              Partager
            </Button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* En-tête de l'article */}
        <header className="mb-8">
          <h1 
            className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
            style={{
              fontFamily: reglages?.polices_ecriture_titre || 'inherit',
              fontSize: reglages?.taille_polices_titre ? `${reglages.taille_polices_titre}px` : undefined,
              fontWeight: reglages?.epaisseur_titre || 'bold',
              color: reglages?.couleur_titre || 'inherit'
            }}
          >
            {article.titre}
          </h1>
          
          {/* Tags */}
          {article.etiquettes && article.etiquettes.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
               {article.etiquettes.map((tag) => (
                   <Badge 
                     key={tag.id} 
                     variant="secondary"
                     style={{ 
                       backgroundColor: tag.couleur || '#FF0000',
                       color: '#FFFFFF',
                       borderColor: tag.couleur || '#FF0000'
                     }}
                     title={`Couleur: ${tag.couleur || 'non définie'}`}
                   >
                     {tag.nom}
                   </Badge>
               ))}
            </div>
          )}

          {/* Métadonnées */}
          <div 
            className="flex flex-wrap items-center gap-4 text-sm"
            style={{
              fontFamily: reglages?.polices_ecriture_indication || 'inherit',
              fontSize: reglages?.taille_polices_indication ? `${reglages.taille_polices_indication}px` : undefined,
              fontWeight: reglages?.epaisseur_indication || 'normal',
              color: reglages?.couleur_indication || 'hsl(var(--muted-foreground))'
            }}
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Publié le {formatDate(article.date_created)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>à {formatTime(article.date_created)}</span>
            </div>
            {article.date_updated !== article.date_created && (
              <div className="flex items-center gap-2">
                <span>Mis à jour le {formatDate(article.date_updated)}</span>
              </div>
            )}
          </div>
        </header>

        {/* Image de l'article */}
        {(isValidImageUrl(article.featured_image) || isValidImageUrl(article.image)) && (
          <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={getImageUrl(article.featured_image || article.image)}
              alt={article.titre}
              fill
              className="object-cover"
              priority
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        )}

        {/* Résumé */}
        {article.resume && (
          <Card 
            className="mb-8"
            style={{
              borderWidth: reglages?.epaisseur_bordures ? `${reglages.epaisseur_bordures}px` : undefined,
              borderColor: reglages?.couleur_primaire || undefined,
              boxShadow: reglages?.ombrage && reglages?.couleur_ombrage && reglages?.epaisseur_ombrage ? 
                `0 ${reglages.epaisseur_ombrage}px ${reglages.epaisseur_ombrage * 2}px ${reglages.couleur_ombrage}40` : 
                undefined
            }}
          >
            <CardContent className="p-6">
              <p 
                className="text-lg leading-relaxed"
                style={{
                  fontFamily: reglages?.polices_ecriture_sous_titre || 'inherit',
                  fontSize: reglages?.taille_polices_sous_titre ? `${reglages.taille_polices_sous_titre}px` : undefined,
                  fontWeight: reglages?.epaisseur_sous_titre || 'normal',
                  color: reglages?.couleur_sous_titre || 'hsl(var(--muted-foreground))'
                }}
              >
                {article.resume}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Contenu principal */}
        <div 
          className="prose prose-lg max-w-none"
          style={{
            fontFamily: reglages?.polices_ecriture_corps || 'inherit',
            fontSize: reglages?.taille_polices_corps ? `${reglages.taille_polices_corps}px` : undefined,
            fontWeight: reglages?.epaisseur_corps || 'normal',
            color: reglages?.couleur_corps || 'inherit'
          }}
          dangerouslySetInnerHTML={{ __html: article.contenu }}
        />

        {/* Actions en bas de page */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <Button 
              variant="outline" 
              onClick={() => router.push('/actualites')}
              className="flex items-center gap-2"
              style={{
                ...getBoutonStyles().base,
                fontFamily: reglages?.polices_ecriture_corps || 'inherit',
                fontWeight: reglages?.epaisseur_corps || 'normal',
              }}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, getBoutonStyles().hover)
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, getBoutonStyles().base)
              }}
            >
              <ArrowLeft className="h-4 w-4" />
              Retour aux actualités
            </Button>
            
            <Button 
              onClick={handleShare}
              className="flex items-center gap-2"
              style={{
                ...getBoutonStyles().base,
                fontFamily: reglages?.polices_ecriture_corps || 'inherit',
                fontWeight: reglages?.epaisseur_corps || 'normal',
              }}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, getBoutonStyles().hover)
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, getBoutonStyles().base)
              }}
            >
              <Share2 className="h-4 w-4" />
              Partager cet article
            </Button>
          </div>
        </div>
      </article>
    </div>
  )
}
