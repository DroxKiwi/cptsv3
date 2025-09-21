"use client"

import { useAccueil, useProjets, useEvenements, useBoutons, usePartenaires, useLogo } from "@/hooks/useDirectus"
import { Button } from "@/components/ui/button"
import { getButtonStyles, getButtonHoverHandlers } from "@/lib/button-utils"
import { themeClasses } from "@/lib/theme"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock, ExternalLink } from "lucide-react"
import Image from "next/image"

export default function Home() {
  const { accueil, loading: accueilLoading } = useAccueil()
  const { projets, loading: projetsLoading } = useProjets()
  const { evenements, loading: evenementsLoading } = useEvenements()
  const { boutons, loading: boutonsLoading } = useBoutons()
  const { partenaires, loading: partenairesLoading } = usePartenaires()
  const { logo, loading: logoLoading } = useLogo()


  if (accueilLoading || projetsLoading || evenementsLoading || boutonsLoading || partenairesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!accueil) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Erreur de chargement</h1>
          <p className="text-muted-foreground">Impossible de charger les données de la page d'accueil.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="py-12 px-4 sm:py-16 md:py-20 lg:py-24"
        style={{ 
          backgroundColor: accueil.couleur_fond_section_principale || 'var(--primary)',
          color: accueil.couleur_texte_section_principale || 'white'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo au-dessus du titre */}
            {logoLoading ? (
              <div className="h-48 w-48 sm:h-64 sm:w-64 md:h-80 md:w-80 rounded-full bg-gray-200 animate-pulse mx-auto mb-12"></div>
            ) : logo?.logo ? (
              <div className="relative h-48 w-48 sm:h-64 sm:w-64 md:h-80 md:w-80 mx-auto mb-12">
                <Image
                  src={logo.logo}
                  alt="Logo CPTS"
                  fill
                  sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 320px"
                  className="object-contain"
                  onError={() => console.log('Erreur de chargement du logo principal')}
                />
              </div>
            ) : (
              <div className="h-48 w-48 sm:h-64 sm:w-64 md:h-80 md:w-80 rounded-full bg-primary flex items-center justify-center mx-auto mb-12">
                <span className="text-primary-foreground font-bold text-4xl sm:text-6xl md:text-8xl">CPTS</span>
              </div>
            )}
            
            <h1 
              className={`${themeClasses.titre} mb-4 sm:mb-6`}
              style={{ color: accueil.titre_principal_couleur || 'inherit' }}
            >
              {accueil.titre_principal || "Bienvenue sur notre site"}
            </h1>
            <p 
              className={`${themeClasses.sousTitre} mb-6 sm:mb-8`}
              style={{ color: accueil.couleur_texte_section_principale || 'inherit' }}
            >
              {accueil.sous_titre_principal || "Découvrez nos services et actualités"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8"
                variant="secondary"
                style={{
                  ...getButtonStyles(boutons?.[0]),
                  ...(accueil.couleur_texte_section_principale && !boutons?.[0] && {
                    borderColor: accueil.couleur_texte_section_principale,
                    color: accueil.couleur_texte_section_principale
                  })
                }}
                {...getButtonHoverHandlers(boutons?.[0])}
              >
                Découvrir nos services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8"
                variant="outline"
                style={{ 
                  ...getButtonStyles(boutons?.[0]),
                  borderColor: boutons?.[0]?.couleur_bordure || accueil.couleur_texte_section_principale || 'white',
                  color: boutons?.[0]?.couleur_texte || accueil.couleur_texte_section_principale || 'white'
                }}
                {...getButtonHoverHandlers(boutons?.[0])}
              >
                Nous contacter
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Projets Section */}
      <section 
        className="py-12 px-4 sm:py-16 md:py-20"
        style={{ 
          backgroundColor: accueil.couleur_fond_section_projets || 'var(--secondary)',
          color: accueil.couleur_texte_section_projets || 'inherit'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 
              className={`${themeClasses.titre} mb-4`}
              style={{ color: accueil.titre_projets_couleur || 'inherit' }}
            >
              {accueil.titre_projets || "Nos Projets"}
            </h2>
            <p 
              className={`${themeClasses.sousTitre} max-w-3xl mx-auto`}
              style={{ color: accueil.couleur_texte_section_projets || 'inherit' }}
            >
              {accueil.sous_titre_projets || "Découvrez nos projets et initiatives"}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projets?.map((projet) => (
              <Card 
                key={projet.id} 
                className="hover:shadow-lg transition-shadow h-full"
                style={{ 
                  backgroundColor: projet.couleur || 'white',
                  color: projet.couleur_texte || 'inherit'
                }}
              >
                <CardHeader className="text-center">
                  {projet.icone && (
                    <div className="w-16 h-16 mx-auto mb-4 relative">
                      <Image
                        src={projet.icone.startsWith('http') ? projet.icone : `${process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'}/assets/${projet.icone}`}
                        alt={projet.titre || 'Icône du projet'}
                        fill
                        className="object-contain"
                        onError={() => console.log('Erreur de chargement de l\'icône')}
                      />
                    </div>
                  )}
                  <CardTitle className={themeClasses.corps}>{projet.titre}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className={themeClasses.corps}>
                    {projet.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section 
        className="py-12 px-4 sm:py-16 md:py-20"
        style={{ 
          backgroundColor: accueil.couleur_fond_section_actualites || 'white',
          color: accueil.couleur_texte_section_actualites || 'inherit'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 
              className={`${themeClasses.titre} mb-4`}
              style={{ color: accueil.titre_actualites_couleur || 'inherit' }}
            >
              {accueil.titre_actualites || "Actualités"}
            </h2>
            <p 
              className={`${themeClasses.sousTitre} max-w-3xl mx-auto`}
              style={{ color: accueil.couleur_texte_section_actualites || 'inherit' }}
            >
              {accueil.sous_titre_actualites || "Restez informé de nos dernières actualités"}
            </p>
          </div>
          
          {/* Scroll horizontal natif pour mobile, grid pour desktop */}
          <div className="block sm:hidden">
            <div className="overflow-x-auto scrollbar-hide pb-4">
              <div className="flex gap-4 w-max">
                {accueil.articles_a_la_une?.slice(0, 3).map((article) => (
                  <div key={article.id} className="flex-shrink-0 w-80">
                    <Card 
                      className="hover:shadow-lg transition-shadow h-full"
                      style={{ 
                        backgroundColor: article.couleur_de_fond || 'white',
                        color: article.couleur_texte || 'inherit'
                      }}
                    >
                      {article.image && (
                        <div className="relative w-full h-48">
                          <Image
                            src={article.image.startsWith('http') ? article.image : `${process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'}/assets/${article.image}`}
                            alt={article.titre || 'Image de l\'article'}
                            fill
                            className="object-cover rounded-t-lg"
                            onError={() => console.log('Erreur de chargement de l\'image')}
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {article.etiquettes?.map((etiquette) => (
                            <Badge key={etiquette.id} variant="secondary" className="text-xs">
                              {etiquette.nom}
                            </Badge>
                          ))}
                        </div>
                        <CardTitle className={`${themeClasses.corps} line-clamp-2`}>
                          {article.titre}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className={`${themeClasses.corps} line-clamp-3`}>
                          {article.resume || (article.contenu ? article.contenu.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : '')}
                        </CardDescription>
                        <div className={`mt-4 ${themeClasses.indication} text-muted-foreground`}>
                          {new Date(article.date_created).toLocaleDateString('fr-FR')}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Grid pour tablette et desktop */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6">
            {accueil.articles_a_la_une?.slice(0, 3).map((article) => (
              <Card 
                key={article.id} 
                className="hover:shadow-lg transition-shadow h-full"
                style={{ 
                  backgroundColor: article.couleur_de_fond || 'white',
                  color: article.couleur_texte || 'inherit'
                }}
              >
                {article.image && (
                  <div className="relative w-full h-48">
                    <Image
                      src={article.image.startsWith('http') ? article.image : `${process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'}/assets/${article.image}`}
                      alt={article.titre || 'Image de l\'article'}
                      fill
                      className="object-cover rounded-t-lg"
                      onError={() => console.log('Erreur de chargement de l\'image')}
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {article.etiquettes?.map((etiquette) => (
                      <Badge key={etiquette.id} variant="secondary" className="text-xs">
                        {etiquette.nom}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className={`${themeClasses.corps} line-clamp-2`}>
                    {article.titre}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className={`${themeClasses.corps} line-clamp-3`}>
                    {article.resume || (article.contenu ? article.contenu.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : '')}
                  </CardDescription>
                  <div className={`mt-4 ${themeClasses.indication} text-muted-foreground`}>
                    {new Date(article.date_created).toLocaleDateString('fr-FR')}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              size="lg" 
              className="text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8"
              style={getButtonStyles(boutons?.[0])}
              {...getButtonHoverHandlers(boutons?.[0])}
            >
              Voir toutes les actualités
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Événements Section */}
      <section 
        className="py-12 px-4 sm:py-16 md:py-20"
        style={{ 
          backgroundColor: accueil.couleur_fond_section_evenements || 'var(--tertiary)',
          color: accueil.couleur_texte_section_evenements || 'white'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 
              className={`${themeClasses.titre} mb-4`}
              style={{ color: accueil.titre_evenements_couleur || 'inherit' }}
            >
              {accueil.titre_evenements || "Prochains Événements"}
            </h2>
            <p 
              className={`${themeClasses.sousTitre} max-w-3xl mx-auto`}
              style={{ color: accueil.couleur_texte_section_evenements || 'inherit' }}
            >
              {accueil.sous_titre_evenements || "Découvrez nos prochains événements et formations"}
            </p>
          </div>
          
          {/* Scroll horizontal natif pour mobile, grid pour desktop */}
          <div className="block sm:hidden">
            <div className="overflow-x-auto scrollbar-hide pb-4">
              <div className="flex gap-4 w-max">
                {evenements?.slice(0, 3).map((evenement) => (
                  <div key={evenement.id} className="flex-shrink-0 w-80">
                    <Card 
                      className="hover:shadow-lg transition-shadow h-full"
                      style={{ 
                        backgroundColor: evenement.couleur_de_fond || 'white',
                        color: evenement.couleur_texte || 'inherit'
                      }}
                    >
                      {evenement.image && (
                        <div className="relative w-full h-48">
                          <Image
                            src={evenement.image}
                            alt={evenement.titre || 'Image de l\'événement'}
                            fill
                            className="object-cover rounded-t-lg"
                            onError={() => console.log('Erreur de chargement de l\'image')}
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {evenement.etiquettes?.map((etiquette) => (
                            <Badge key={etiquette.id} variant="secondary" className="text-xs">
                              {etiquette.nom}
                            </Badge>
                          ))}
                        </div>
                        <CardTitle className={`${themeClasses.corps} line-clamp-2`}>
                          {evenement.titre}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className={`${themeClasses.corps} line-clamp-3 mb-4`}>
                          {evenement.resume}
                        </CardDescription>
                        
                        <div className={`space-y-2 ${themeClasses.indication}`}>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(evenement.date_debut).toLocaleDateString('fr-FR')}
                              {evenement.date_fin && evenement.date_fin !== evenement.date_debut && 
                                ` - ${new Date(evenement.date_fin).toLocaleDateString('fr-FR')}`
                              }
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>
                              {new Date(evenement.date_debut).toLocaleTimeString('fr-FR', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full mt-4 text-sm py-2"
                          variant="outline"
                          style={getButtonStyles(boutons?.[0])}
                          {...getButtonHoverHandlers(boutons?.[0])}
                        >
                          Voir les détails
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Grid pour tablette et desktop */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6">
            {evenements?.slice(0, 3).map((evenement) => (
              <Card 
                key={evenement.id} 
                className="hover:shadow-lg transition-shadow h-full"
                style={{ 
                  backgroundColor: evenement.couleur_de_fond || 'white',
                  color: evenement.couleur_texte || 'inherit'
                }}
              >
                {evenement.image && (
                  <div className="relative w-full h-48">
                    <Image
                      src={evenement.image}
                      alt={evenement.titre || 'Image de l\'événement'}
                      fill
                      className="object-cover rounded-t-lg"
                      onError={() => console.log('Erreur de chargement de l\'image')}
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {evenement.etiquettes?.map((etiquette) => (
                      <Badge key={etiquette.id} variant="secondary" className="text-xs">
                        {etiquette.nom}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className={`${themeClasses.corps} line-clamp-2`}>
                    {evenement.titre}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className={`${themeClasses.corps} line-clamp-3 mb-4`}>
                    {evenement.resume}
                  </CardDescription>
                  
                  <div className={`space-y-2 ${themeClasses.indication}`}>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(evenement.date_debut).toLocaleDateString('fr-FR')}
                        {evenement.date_fin && evenement.date_fin !== evenement.date_debut && 
                          ` - ${new Date(evenement.date_fin).toLocaleDateString('fr-FR')}`
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>
                        {new Date(evenement.date_debut).toLocaleTimeString('fr-FR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-4 text-sm py-2"
                    variant="outline"
                    style={getButtonStyles(boutons?.[0])}
                    {...getButtonHoverHandlers(boutons?.[0])}
                  >
                    Voir les détails
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              size="lg" 
              className="text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8"
              variant="outline"
              style={{ 
                ...getButtonStyles(boutons?.[0]),
                borderColor: boutons?.[0]?.couleur_bordure || accueil.couleur_texte_section_evenements || 'white',
                color: boutons?.[0]?.couleur_texte || accueil.couleur_texte_section_evenements || 'white'
              }}
              {...getButtonHoverHandlers(boutons?.[0])}
            >
              Voir tous les événements
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-12 px-4 sm:py-16 md:py-20"
        style={{ 
          backgroundColor: accueil.couleur_fond_section_information || 'var(--primary)',
          color: accueil.couleur_texte_section_information || 'white'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h2 
              className={`${themeClasses.titre} mb-4`}
              style={{ color: accueil.titre_informations_couleur || 'inherit' }}
            >
              {accueil.titre_informations || "Besoin d'aide ou d'informations ?"}
            </h2>
            <p 
              className={`${themeClasses.sousTitre} mb-6 sm:mb-8`}
              style={{ color: accueil.couleur_texte_section_information || 'inherit' }}
            >
              {accueil.sous_titre_informations || "Notre équipe est là pour vous accompagner"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8"
                variant="secondary"
                style={{
                  ...getButtonStyles(boutons?.[0]),
                  ...(accueil.couleur_texte_section_information && !boutons?.[0] && {
                    borderColor: accueil.couleur_texte_section_information,
                    color: accueil.couleur_texte_section_information
                  })
                }}
                {...getButtonHoverHandlers(boutons?.[0])}
              >
                Nous contacter
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8"
                variant="outline"
                style={{ 
                  ...getButtonStyles(boutons?.[0]),
                  borderColor: boutons?.[0]?.couleur_bordure || accueil.couleur_texte_section_information || 'white',
                  color: boutons?.[0]?.couleur_texte || accueil.couleur_texte_section_information || 'white'
                }}
                {...getButtonHoverHandlers(boutons?.[0])}
              >
                En savoir plus
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Partenaires Section */}
      {partenaires && (
        <section 
          className="py-12 px-4 sm:py-16 md:py-20 lg:py-24"
          style={{
            backgroundColor: accueil.couleur_fond_section_partenaires || 'var(--secondary)',
            color: accueil.couleur_texte_section_partenaires || 'var(--primary)'
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 
                className={`${themeClasses.titre} mb-4`}
                style={{ color: accueil.titre_partenaires_couleur || 'inherit' }}
              >
                {accueil.titre_partenaires || "Nos Partenaires"}
              </h2>
              <p 
                className={`${themeClasses.sousTitre} max-w-2xl mx-auto`}
                style={{ color: accueil.couleur_texte_section_partenaires || 'inherit' }}
              >
                {accueil.sous_titre_partenaires || "Découvrez nos partenaires qui nous accompagnent dans notre mission"}
              </p>
            </div>
            
            {/* Scroll horizontal natif pour mobile, grid pour desktop */}
            <div className="block sm:hidden">
              <div className="overflow-x-auto scrollbar-hide pb-4">
                <div className="flex space-x-4" style={{ width: 'max-content' }}>
                  {partenaires.map((partenaire) => (
                    <div key={partenaire.id} className="flex-shrink-0" style={{ width: '280px' }}>
                      <Card 
                        className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 cursor-pointer h-full"
                        onClick={() => {
                          if (partenaire.redirection) {
                            window.open(partenaire.redirection, '_blank', 'noopener,noreferrer')
                          }
                        }}
                      >
                        <CardHeader className="text-center pb-2">
                          {partenaire.logo ? (
                            <div className="relative w-full h-20 mb-3 mx-auto">
                              <Image
                                src={partenaire.logo}
                                alt={partenaire.nom}
                                fill
                                className="object-contain"
                                onError={() => console.log('Erreur de chargement du logo:', partenaire.nom)}
                              />
                            </div>
                          ) : (
                            <div className="w-full h-20 mb-3 mx-auto flex items-center justify-center bg-gray-100 rounded">
                              <span className="text-sm text-gray-500">Pas de logo</span>
                            </div>
                          )}
                          <CardTitle className={`${themeClasses.corps} line-clamp-2`}>
                            {partenaire.nom}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          {partenaire.description && (
                            <CardDescription className={`${themeClasses.corps} line-clamp-3 mb-4`}>
                              {partenaire.description}
                            </CardDescription>
                          )}
                          {partenaire.redirection && (
                            <div className="inline-flex items-center gap-1 text-xs text-primary">
                              Visiter
                              <ExternalLink className="h-3 w-3" />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid pour desktop */}
            <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partenaires.map((partenaire) => (
                <Card 
                  key={partenaire.id} 
                  className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 cursor-pointer h-full"
                  onClick={() => {
                    if (partenaire.redirection) {
                      window.open(partenaire.redirection, '_blank', 'noopener,noreferrer')
                    }
                  }}
                >
                  <CardHeader className="text-center pb-2">
                    {partenaire.logo ? (
                      <div className="relative w-full h-24 mb-3 mx-auto">
                        <Image
                          src={partenaire.logo}
                          alt={partenaire.nom}
                          fill
                          className="object-contain"
                          onError={() => console.log('Erreur de chargement du logo:', partenaire.nom)}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-24 mb-3 mx-auto flex items-center justify-center bg-gray-100 rounded">
                        <span className="text-sm text-gray-500">Pas de logo</span>
                      </div>
                    )}
                    <CardTitle className={`${themeClasses.corps} line-clamp-2`}>
                      {partenaire.nom}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    {partenaire.description && (
                      <CardDescription className={`${themeClasses.corps} line-clamp-3 mb-4`}>
                        {partenaire.description}
                      </CardDescription>
                    )}
                    {partenaire.redirection && (
                      <div className="inline-flex items-center gap-1 text-xs text-primary">
                        Visiter
                        <ExternalLink className="h-3 w-3" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}