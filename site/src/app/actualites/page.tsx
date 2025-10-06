'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useArticles, useTags } from '@/hooks/useDirectus'
import { useEntete, useReglagesGeneraux, useBoutons } from '@/hooks/useDirectus'
import Image from 'next/image'
import { Calendar, Search, Filter } from 'lucide-react'

export default function ActualitesPage() {
  const router = useRouter()
  const { articles, loading: articlesLoading, error: articlesError } = useArticles()
  const { tags, loading: tagsLoading } = useTags()
  const { entete } = useEntete()
  const { reglages } = useReglagesGeneraux()
  const { boutons } = useBoutons()
  
  const [searchValue, setSearchValue] = useState('')
  const [selectedTag, setSelectedTag] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'date_desc' | 'date_asc' | 'title'>('date_desc')

  // Filtrer et trier les articles
  const filteredArticles = articles
    .filter(article => {
      // Filtre par recherche textuelle
      const matchesSearch = !searchValue || 
        article.titre.toLowerCase().includes(searchValue.toLowerCase()) ||
        article.resume?.toLowerCase().includes(searchValue.toLowerCase()) ||
        article.contenu.toLowerCase().includes(searchValue.toLowerCase())
      
      // Filtre par tag
      const matchesTag = selectedTag === 'all' || 
        article.etiquettes?.some(tag => tag.id.toString() === selectedTag)
      
      return matchesSearch && matchesTag && article.status === 'published'
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date_desc':
          return new Date(b.date_created).getTime() - new Date(a.date_created).getTime()
        case 'date_asc':
          return new Date(a.date_created).getTime() - new Date(b.date_created).getTime()
        case 'title':
          return a.titre.localeCompare(b.titre)
        default:
          return 0
      }
    })

  const handleArticleClick = (article: any) => {
    router.push(`/actualites/${article.id}`)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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

  if (articlesLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Chargement des actualités...</p>
          </div>
        </div>
      </div>
    )
  }

  if (articlesError) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-destructive">Erreur lors du chargement des actualités</p>
            <p className="text-muted-foreground">{articlesError}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative py-16"
        style={{
          background: reglages?.couleur_tertiaire ? 
            `linear-gradient(135deg, ${reglages.couleur_tertiaire}20, ${reglages.couleur_secondaire}20)` :
            'linear-gradient(135deg, hsl(var(--primary)/10), hsl(var(--secondary)/10))'
        }}
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{
              fontFamily: reglages?.polices_ecriture_titre || 'inherit',
              fontSize: reglages?.taille_polices_titre ? `${reglages.taille_polices_titre}px` : undefined,
              fontWeight: reglages?.epaisseur_titre || 'bold',
              color: reglages?.couleur_titre || 'inherit'
            }}
          >
            {entete?.titre_page_4 || "Nos actualités"}
          </h1>
          <p 
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{
              fontFamily: reglages?.polices_ecriture_sous_titre || 'inherit',
              fontSize: reglages?.taille_polices_sous_titre ? `${reglages.taille_polices_sous_titre}px` : undefined,
              fontWeight: reglages?.epaisseur_sous_titre || 'normal',
              color: reglages?.couleur_sous_titre || 'hsl(var(--muted-foreground))'
            }}
          >
            Découvrez les dernières nouvelles et informations de la CPTS des Mauges
          </p>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-card rounded-lg border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher par mots-clés..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filtre par tag */}
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {tags.map((tag) => (
                  <SelectItem key={tag.id} value={tag.id.toString()}>
                    {tag.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Tri */}
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date_desc">Plus récent</SelectItem>
                <SelectItem value="date_asc">Plus ancien</SelectItem>
                <SelectItem value="title">Titre A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grille des articles */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Aucun article trouvé avec ces critères de recherche.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Card 
                key={article.id} 
                className="cursor-pointer transition-all duration-300"
                style={{
                  borderWidth: reglages?.epaisseur_bordures ? `${reglages.epaisseur_bordures}px` : undefined,
                  borderColor: reglages?.couleur_primaire || undefined,
                  boxShadow: reglages?.ombrage && reglages?.couleur_ombrage && reglages?.epaisseur_ombrage ? 
                    `0 ${reglages.epaisseur_ombrage}px ${reglages.epaisseur_ombrage * 2}px ${reglages.couleur_ombrage}40` : 
                    undefined
                }}
                onClick={() => handleArticleClick(article)}
                onMouseEnter={(e) => {
                  if (reglages?.ombrage && reglages?.couleur_ombrage && reglages?.epaisseur_ombrage) {
                    e.currentTarget.style.boxShadow = `0 ${reglages.epaisseur_ombrage * 2}px ${reglages.epaisseur_ombrage * 3}px ${reglages.couleur_ombrage}60`
                  }
                }}
                onMouseLeave={(e) => {
                  if (reglages?.ombrage && reglages?.couleur_ombrage && reglages?.epaisseur_ombrage) {
                    e.currentTarget.style.boxShadow = `0 ${reglages.epaisseur_ombrage}px ${reglages.epaisseur_ombrage * 2}px ${reglages.couleur_ombrage}40`
                  }
                }}
              >
                <CardHeader className="p-0">
                  {isValidImageUrl(article.featured_image) || isValidImageUrl(article.image) ? (
                    <div className="relative h-48 w-full">
                      <Image
                        src={getImageUrl(article.featured_image || article.image)}
                        alt={article.titre}
                        fill
                        className="object-cover rounded-t-lg"
                        onError={(e) => {
                          // En cas d'erreur d'image, masquer l'image et afficher le fallback
                          e.currentTarget.style.display = 'none'
                          const parent = e.currentTarget.parentElement
                          if (parent) {
                            parent.innerHTML = '<div class="h-48 w-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-t-lg flex items-center justify-center"><svg class="h-12 w-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>'
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div className="h-48 w-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-t-lg flex items-center justify-center">
                      <Calendar className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                     {article.etiquettes?.map((tag) => (
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
                  <CardTitle 
                    className="text-lg mb-2 line-clamp-2"
                    style={{
                      fontFamily: reglages?.polices_ecriture_titre || 'inherit',
                      fontSize: reglages?.taille_polices_titre ? `${parseInt(reglages.taille_polices_titre) * 0.6}px` : undefined,
                      fontWeight: reglages?.epaisseur_titre || 'bold',
                      color: reglages?.couleur_titre || 'inherit'
                    }}
                  >
                    {article.titre}
                  </CardTitle>
                  {article.resume && (
                    <p 
                      className="text-sm line-clamp-3 mb-4"
                      style={{
                        fontFamily: reglages?.polices_ecriture_corps || 'inherit',
                        fontSize: reglages?.taille_polices_corps ? `${reglages.taille_polices_corps}px` : undefined,
                        fontWeight: reglages?.epaisseur_corps || 'normal',
                        color: reglages?.couleur_corps || 'hsl(var(--muted-foreground))'
                      }}
                    >
                      {article.resume}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-xs">
                    <span 
                      style={{
                        fontFamily: reglages?.polices_ecriture_indication || 'inherit',
                        fontSize: reglages?.taille_polices_indication ? `${reglages.taille_polices_indication}px` : undefined,
                        fontWeight: reglages?.epaisseur_indication || 'normal',
                        color: reglages?.couleur_indication || 'hsl(var(--muted-foreground))'
                      }}
                    >
                      {formatDate(article.date_created)}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-auto"
                      style={{
                        ...getBoutonStyles().base,
                        fontFamily: reglages?.polices_ecriture_corps || 'inherit',
                        fontWeight: reglages?.epaisseur_corps || 'normal',
                        padding: '8px 16px', // Padding plus petit pour ce bouton
                        fontSize: reglages?.taille_polices_corps ? `${parseInt(reglages.taille_polices_corps) + 2}px` : '14px',
                        minHeight: '36px',
                      }}
                      onMouseEnter={(e) => {
                        Object.assign(e.currentTarget.style, getBoutonStyles().hover)
                      }}
                      onMouseLeave={(e) => {
                        Object.assign(e.currentTarget.style, getBoutonStyles().base)
                      }}
                    >
                      Lire la suite →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
