"use client"

import { useAccueil, useProjets, useBoutons, usePartenaires, useLogo } from "@/hooks/useDirectus"
import { getButtonStyles, getButtonHoverHandlers } from "@/lib/button-utils"
import { themeClasses } from "@/lib/theme"
import { ChiffresCles } from "@/components/custom-ui/chiffres-cles"
import { RichContent } from "@/components/custom-ui/rich-content"
import { ArrowRight, Calendar, Clock, ExternalLink } from "lucide-react"
import { 
  AnimatedButton,
  AnimatedCard,
  AnimatedCardContent,
  AnimatedCardDescription,
  AnimatedCardHeader,
  AnimatedCardTitle,
  AnimatedBadge,
  AnimatedImage,
  AnimatedText,
  VisibleSection
} from "@/components/ui/override-animated"

export default function Home() {
  const { accueil, loading: accueilLoading } = useAccueil()
  const { projets, loading: projetsLoading } = useProjets()
  const { boutons, loading: boutonsLoading } = useBoutons()
  const { partenaires, loading: partenairesLoading } = usePartenaires()
  const { logo, loading: logoLoading } = useLogo()


  if (accueilLoading || projetsLoading || boutonsLoading || partenairesLoading) {
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
          <p className="text-muted-foreground">Impossible de charger les données de la page d&apos;accueil.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden" style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <VisibleSection animationType="fade" delay={0} className={`py-12 px-4 sm:py-16 md:py-20 lg:py-24 ${themeClasses.sectionPrimaire}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo au-dessus du titre */}
            {logoLoading ? (
              <div className="h-48 w-48 sm:h-64 sm:w-64 md:h-80 md:w-80 rounded-full bg-gray-200 animate-pulse mx-auto mb-12"></div>
            ) : logo?.logo ? (
              <div className="relative h-48 w-48 sm:h-64 sm:w-64 md:h-80 md:w-80 mx-auto mb-12">
                <AnimatedImage
                  src={logo.logo}
                  alt="Logo CPTS"
                  fill
                  sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 320px"
                  className="object-contain"
                  onError={() => console.log('Erreur de chargement du logo principal')}
                  delay={0.1}
                />
              </div>
            ) : (
              <div className="h-48 w-48 sm:h-64 sm:w-64 md:h-80 md:w-80 rounded-full bg-primary flex items-center justify-center mx-auto mb-12">
                <span className="text-primary-foreground font-bold text-4xl sm:text-6xl md:text-8xl">CPTS</span>
              </div>
            )}
            
            <AnimatedText 
              as="h1" 
              className={`${themeClasses.titre} mb-4 sm:mb-6`}
              delay={0.1}
            >
              {accueil.titre_principal || "Bienvenue sur notre site"}
            </AnimatedText>
            <div className={`${themeClasses.sousTitre} mb-6 sm:mb-8`}>
              <RichContent 
                content={accueil.contenu_principal || "Découvrez nos services et actualités"}
                className={themeClasses.sousTitre}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton 
                size="lg" 
                className="w-full sm:w-auto text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8"
                variant="secondary"
                style={getButtonStyles(boutons?.[0])}
                {...getButtonHoverHandlers(boutons?.[0])}
                delay={0.2}
              >
                Découvrir nos services
                <ArrowRight className="ml-2 h-4 w-4" />
              </AnimatedButton>
            </div>
          </div>
          
          {/* Chiffres clés intégrés dans la section hero */}
          <ChiffresCles />
        </div>
      </VisibleSection>

      {/* Projets Section */}
      <VisibleSection animationType="slideUp" delay={0.1} className={`py-12 px-4 sm:py-16 md:py-20 ${themeClasses.sectionSecondaire}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <AnimatedText 
              as="h2" 
              className={`${themeClasses.titre} mb-4`}
              delay={0.1}
            >
              {accueil.titre_projets || "Nos Projets"}
            </AnimatedText>
            <div className={`${themeClasses.sousTitre} max-w-3xl mx-auto`}>
              <RichContent 
                content={accueil.contenu_projets || "Découvrez nos projets et initiatives"}
                className={themeClasses.sousTitre}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projets?.map((projet, index) => (
              <AnimatedCard 
                key={projet.id} 
                className={`hover:shadow-lg transition-shadow h-full ${themeClasses.cardBordered}`}
                style={{ 
                  backgroundColor: projet.couleur || 'white',
                  color: projet.couleur_texte || 'inherit'
                }}
                delay={0.1 * index}
              >
                <AnimatedCardHeader className="text-center">
                  {projet.icone && (
                    <div className="w-16 h-16 mx-auto mb-4 relative">
                      <AnimatedImage
                        src={projet.icone.startsWith('http') ? projet.icone : `${process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'}/assets/${projet.icone}`}
                        alt={projet.titre || 'Icône du projet'}
                        fill
                        className="object-contain"
                        onError={() => console.log('Erreur de chargement de l\'icône')}
                        delay={0.2}
                      />
                    </div>
                  )}
                  <AnimatedCardTitle className={themeClasses.corps}>{projet.titre}</AnimatedCardTitle>
                </AnimatedCardHeader>
                <AnimatedCardContent className="text-center">
                  <div className={themeClasses.corps}>
                    <RichContent 
                      content={projet.description}
                      className={themeClasses.corps}
                    />
                  </div>
                </AnimatedCardContent>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </VisibleSection>

      {/* Articles Section */}
      <VisibleSection animationType="slideLeft" delay={0.2} className={`py-12 px-4 sm:py-16 md:py-20 ${themeClasses.sectionPrimaire}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <AnimatedText 
              as="h2" 
              className={`${themeClasses.titre} mb-4`}
              delay={0.1}
            >
              {accueil.titre_actualites || "Actualités"}
            </AnimatedText>
            <div className={`${themeClasses.sousTitre} max-w-3xl mx-auto`}>
              <RichContent 
                content={accueil.contenu_actualites || "Restez informé de nos dernières actualités"}
                className={themeClasses.sousTitre}
              />
            </div>
        </div>

          {/* Scroll horizontal natif pour mobile, grid pour desktop */}
          <div className={`block sm:hidden ${themeClasses.articlesContainer}`}>
            <div className={`pb-4 ${(accueil.articles_a_la_une?.length || 0) > 1 ? 'mobile-scroll-container' : ''}`}>
              <div className="mobile-scroll-content">
                {accueil.articles_a_la_une?.map((article, index) => (
                  <div key={article.id} className="flex-shrink-0 w-72 sm:w-80">
                    <AnimatedCard 
                      className={`hover:shadow-lg transition-shadow h-full ${themeClasses.cardBordered}`}
                      style={{ 
                        backgroundColor: article.couleur_de_fond || 'white',
                        color: article.couleur_texte || 'inherit'
                      }}
                      delay={0.1 * index}
                    >
                      {article.image && (
                        <div className="relative w-full h-48">
                          <AnimatedImage
                            src={article.image.startsWith('http') ? article.image : `${process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'}/assets/${article.image}`}
                            alt={article.titre || 'Image de l\'article'}
                            fill
                            className="object-cover rounded-t-lg"
                            onError={() => console.log('Erreur de chargement de l\'image')}
                            delay={0.2}
                          />
                        </div>
                      )}
            <AnimatedCardHeader>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {article.etiquettes?.map((etiquette) => (
                            <AnimatedBadge 
                              key={etiquette.id} 
                              variant="secondary" 
                              className="text-xs"
                              style={{ 
                                backgroundColor: etiquette.couleur || '#FF0000',
                                color: '#FFFFFF',
                                borderColor: etiquette.couleur || '#FF0000'
                              }}
                              title={`Couleur: ${etiquette.couleur || 'non définie'}`}
                              delay={0.2 + (index * 0.05)}
                            >
                              {etiquette.nom}
                            </AnimatedBadge>
                          ))}
                        </div>
                        <AnimatedCardTitle className={`${themeClasses.corps} line-clamp-2`}>
                          {article.titre}
                        </AnimatedCardTitle>
            </AnimatedCardHeader>
            <AnimatedCardContent>
                        <AnimatedCardDescription className={`${themeClasses.corps} line-clamp-3`}>
                          {article.resume || (article.contenu ? article.contenu.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : '')}
              </AnimatedCardDescription>
                        <div className={`mt-4 ${themeClasses.indication} text-muted-foreground`}>
                          {new Date(article.date_created).toLocaleDateString('fr-FR')}
                        </div>
            </AnimatedCardContent>
          </AnimatedCard>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Grid pour tablette et desktop */}
          <div className={`hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6 ${themeClasses.articlesContainer}`}>
            {accueil.articles_a_la_une?.map((article, index) => (
              <AnimatedCard 
                key={article.id} 
                className={`hover:shadow-lg transition-shadow h-full ${themeClasses.cardBordered}`}
                style={{ 
                  backgroundColor: article.couleur_de_fond || 'white',
                  color: article.couleur_texte || 'inherit'
                }}
                delay={0.1 * index}
              >
                {article.image && (
                  <div className="relative w-full h-48">
                    <AnimatedImage
                      src={article.image.startsWith('http') ? article.image : `${process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'}/assets/${article.image}`}
                      alt={article.titre || 'Image de l\'article'}
                      fill
                      className="object-cover rounded-t-lg"
                      onError={() => console.log('Erreur de chargement de l\'image')}
                      delay={0.2}
                    />
                  </div>
                )}
            <AnimatedCardHeader>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {article.etiquettes?.map((etiquette) => (
                      <AnimatedBadge 
                        key={etiquette.id} 
                        variant="secondary" 
                        className="text-xs"
                        style={{ 
                          backgroundColor: etiquette.couleur || '#FF0000',
                          color: '#FFFFFF',
                          borderColor: etiquette.couleur || '#FF0000'
                        }}
                        title={`Couleur: ${etiquette.couleur || 'non définie'}`}
                        delay={0.2 + (index * 0.05)}
                      >
                        {etiquette.nom}
                      </AnimatedBadge>
                    ))}
                  </div>
                  <AnimatedCardTitle className={`${themeClasses.corps} line-clamp-2`}>
                    {article.titre}
                  </AnimatedCardTitle>
            </AnimatedCardHeader>
            <AnimatedCardContent>
                  <AnimatedCardDescription className={`${themeClasses.corps} line-clamp-3`}>
                    {article.resume || (article.contenu ? article.contenu.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : '')}
              </AnimatedCardDescription>
                  <div className={`mt-4 ${themeClasses.indication} text-muted-foreground`}>
                    {new Date(article.date_created).toLocaleDateString('fr-FR')}
                  </div>
            </AnimatedCardContent>
          </AnimatedCard>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <AnimatedButton 
              size="lg" 
              className="text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8"
              style={getButtonStyles(boutons?.[0])}
              {...getButtonHoverHandlers(boutons?.[0])}
              delay={0.3}
            >
              Voir toutes les actualités
              <ArrowRight className="ml-2 h-4 w-4" />
            </AnimatedButton>
          </div>
        </div>
      </VisibleSection>

      {/* Événements Section */}
      <VisibleSection animationType="slideRight" delay={0.3} className={`py-12 px-4 sm:py-16 md:py-20 ${themeClasses.sectionSecondaire}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <AnimatedText 
              as="h2" 
              className={`${themeClasses.titre} mb-4`}
              delay={0.1}
            >
              {accueil.titre_evenements || "Prochains Événements"}
            </AnimatedText>
            <div className={`${themeClasses.sousTitre} max-w-3xl mx-auto`}>
              <RichContent 
                content={accueil.contenu_evenements || "Découvrez nos prochains événements et formations"}
                className={themeClasses.sousTitre}
              />
            </div>
          </div>
          
          {/* Scroll horizontal natif pour mobile, grid pour desktop */}
          <div className={`block sm:hidden ${themeClasses.evenementsContainer}`}>
            <div className={`pb-4 ${(accueil.evenements_a_la_une?.length || 0) > 1 ? 'mobile-scroll-container' : ''}`}>
              <div className="mobile-scroll-content">
                {accueil.evenements_a_la_une?.map((evenement, index) => (
                  <div key={evenement.id} className="flex-shrink-0 w-72 sm:w-80">
                    <AnimatedCard 
                      className={`hover:shadow-lg transition-shadow h-full ${themeClasses.cardBordered}`}
                      style={{
                        backgroundColor: evenement.couleur_de_fond || 'white',
                        color: evenement.couleur_texte || 'inherit'
                      }}
                      delay={0.1 * index}
                    >
                      {evenement.image && (
                        <div className="relative w-full h-48">
                          <AnimatedImage
                            src={evenement.image}
                            alt={evenement.titre || 'Image de l\'événement'}
                            fill
                            className="object-cover rounded-t-lg"
                            onError={() => console.log('Erreur de chargement de l\'image')}
                            delay={0.2}
                          />
                        </div>
                      )}
            <AnimatedCardHeader>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {evenement.etiquettes?.map((etiquette) => (
                            <AnimatedBadge 
                              key={etiquette.id} 
                              variant="secondary" 
                              className="text-xs"
                              style={{ 
                                backgroundColor: etiquette.couleur || '#FF0000',
                                color: '#FFFFFF',
                                borderColor: etiquette.couleur || '#FF0000'
                              }}
                              title={`Couleur: ${etiquette.couleur || 'non définie'}`}
                              delay={0.2 + (index * 0.05)}
                            >
                              {etiquette.nom}
                            </AnimatedBadge>
                          ))}
                        </div>
                        <AnimatedCardTitle className={`${themeClasses.corps} line-clamp-2`}>
                          {evenement.titre}
                        </AnimatedCardTitle>
            </AnimatedCardHeader>
            <AnimatedCardContent>
                        <AnimatedCardDescription className={`${themeClasses.corps} line-clamp-3 mb-4`}>
                          {evenement.resume}
              </AnimatedCardDescription>
                        
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
                        
                        <AnimatedButton 
                          className="w-full mt-4 text-sm py-2"
                          variant="outline"
                          style={getButtonStyles(boutons?.[0])}
                          {...getButtonHoverHandlers(boutons?.[0])}
                          delay={0.4}
                        >
                          Voir les détails
                        </AnimatedButton>
            </AnimatedCardContent>
          </AnimatedCard>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Grid pour tablette et desktop */}
          <div className={`hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6 ${themeClasses.evenementsContainer}`}>
            {accueil.evenements_a_la_une?.map((evenement, index) => (
              <AnimatedCard 
                key={evenement.id} 
                className={`hover:shadow-lg transition-shadow h-full ${themeClasses.cardBordered}`}
                style={{ 
                  backgroundColor: evenement.couleur_de_fond || 'white',
                  color: evenement.couleur_texte || 'inherit'
                }}
                delay={0.1 * index}
              >
                {evenement.image && (
                  <div className="relative w-full h-48">
                    <AnimatedImage
                      src={evenement.image}
                      alt={evenement.titre || 'Image de l\'événement'}
                      fill
                      className="object-cover rounded-t-lg"
                      onError={() => console.log('Erreur de chargement de l\'image')}
                      delay={0.2}
                    />
                  </div>
                )}
            <AnimatedCardHeader>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {evenement.etiquettes?.map((etiquette) => (
                      <AnimatedBadge 
                        key={etiquette.id} 
                        variant="secondary" 
                        className="text-xs"
                        style={{ 
                          backgroundColor: etiquette.couleur || '#FF0000',
                          color: '#FFFFFF',
                          borderColor: etiquette.couleur || '#FF0000'
                        }}
                        title={`Couleur: ${etiquette.couleur || 'non définie'}`}
                        delay={0.2 + (index * 0.05)}
                      >
                        {etiquette.nom}
                      </AnimatedBadge>
                    ))}
                  </div>
                  <AnimatedCardTitle className={`${themeClasses.corps} line-clamp-2`}>
                    {evenement.titre}
                  </AnimatedCardTitle>
            </AnimatedCardHeader>
            <AnimatedCardContent>
                  <AnimatedCardDescription className={`${themeClasses.corps} line-clamp-3 mb-4`}>
                    {evenement.resume}
              </AnimatedCardDescription>
                  
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
                  
                  <AnimatedButton 
                    className="w-full mt-4 text-sm py-2"
                    variant="outline"
                    style={getButtonStyles(boutons?.[0])}
                    {...getButtonHoverHandlers(boutons?.[0])}
                    delay={0.4}
                  >
                    Voir les détails
                  </AnimatedButton>
            </AnimatedCardContent>
          </AnimatedCard>
            ))}
        </div>

          <div className="text-center mt-8">
            <AnimatedButton 
              size="lg" 
              className="text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8"
              variant="outline"
              style={getButtonStyles(boutons?.[0])}
              {...getButtonHoverHandlers(boutons?.[0])}
              delay={0.5}
            >
              Voir tous les événements
              <ArrowRight className="ml-2 h-4 w-4" />
            </AnimatedButton>
          </div>
        </div>
      </VisibleSection>

      {/* CTA Section */}
      <VisibleSection animationType="scale" delay={0.4} className={`py-12 px-4 sm:py-16 md:py-20 ${themeClasses.sectionPrimaire}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <AnimatedText 
              as="h2" 
              className={`${themeClasses.titre} mb-4`}
              delay={0.1}
            >
              {accueil.titre_informations || "Besoin d'aide ou d'informations ?"}
            </AnimatedText>
            <div className={`${themeClasses.sousTitre} mb-6 sm:mb-8`}>
              <RichContent 
                content={accueil.contenu_informations || "Notre équipe est là pour vous accompagner"}
                className={themeClasses.sousTitre}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton 
                size="lg" 
                className="w-full sm:w-auto text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8"
                variant="secondary"
                style={getButtonStyles(boutons?.[0])}
                {...getButtonHoverHandlers(boutons?.[0])}
                delay={0.5}
              >
                Nous contacter
                <ArrowRight className="ml-2 h-4 w-4" />
              </AnimatedButton>
              <AnimatedButton 
                size="lg" 
                className="w-full sm:w-auto text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8"
                variant="outline"
                style={getButtonStyles(boutons?.[0])}
                {...getButtonHoverHandlers(boutons?.[0])}
                delay={0.6}
              >
                En savoir plus
                <ArrowRight className="ml-2 h-4 w-4" />
              </AnimatedButton>
            </div>
          </div>
        </div>
      </VisibleSection>

      {/* Partenaires Section */}
      {partenaires && (
        <section className={`py-12 px-4 sm:py-16 md:py-20 lg:py-24 ${themeClasses.sectionSecondaire} partenaires-section`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <AnimatedText 
                as="h2" 
                className={`${themeClasses.titre} mb-4`}
                delay={0.1}
              >
                {accueil.titre_partenaires || "Nos Partenaires"}
              </AnimatedText>
              <div className={`${themeClasses.sousTitre} max-w-2xl mx-auto`}>
                <RichContent 
                  content={accueil.contenu_partenaires || "Découvrez nos partenaires qui nous accompagnent dans notre mission"}
                  className={themeClasses.sousTitre}
                />
              </div>
            </div>
            
            {/* Scroll horizontal natif pour mobile, grid pour desktop */}
            <div className={`block sm:hidden ${themeClasses.partenairesContainer}`}>
              <div className="mobile-scroll-container pb-4">
                <div className="mobile-scroll-content">
                  {partenaires.map((partenaire, index) => (
                    <div key={partenaire.id} className="flex-shrink-0 w-72 sm:w-80">
                      <AnimatedCard 
                        className={`group hover:shadow-lg transition-all duration-300 cursor-pointer h-full ${themeClasses.cardBordered}`}
                        onClick={() => {
                          if (partenaire.redirection) {
                            window.open(partenaire.redirection, '_blank', 'noopener,noreferrer')
                          }
                        }}
                        delay={0.1 * index}
                      >
                        <AnimatedCardHeader className="text-center pb-2">
                          {partenaire.logo ? (
                            <div className="relative w-full h-20 mb-3 mx-auto">
                              <AnimatedImage
                                src={partenaire.logo}
                                alt={partenaire.nom}
                                fill
                                className="object-contain"
                                onError={() => console.log('Erreur de chargement du logo:', partenaire.nom)}
                                delay={0.2}
                              />
                            </div>
                          ) : (
                            <div className="w-full h-20 mb-3 mx-auto flex items-center justify-center bg-gray-100 rounded">
                              <span className="text-sm text-gray-500">Pas de logo</span>
                            </div>
                          )}
                          <AnimatedCardTitle className={`${themeClasses.corps} line-clamp-2`}>
                            {partenaire.nom}
                          </AnimatedCardTitle>
                        </AnimatedCardHeader>
                        <AnimatedCardContent className="text-center">
                          {partenaire.description && (
                            <AnimatedCardDescription className={`${themeClasses.corps} line-clamp-3 mb-4`}>
                              {partenaire.description}
                            </AnimatedCardDescription>
                          )}
                          {partenaire.redirection && (
                            <div className="inline-flex items-center gap-1 text-xs text-primary">
                              Visiter
                              <ExternalLink className="h-3 w-3" />
                            </div>
                          )}
                        </AnimatedCardContent>
                      </AnimatedCard>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid pour desktop */}
            <div className={`hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${themeClasses.partenairesContainer}`}>
              {partenaires.map((partenaire, index) => (
                <AnimatedCard 
                  key={partenaire.id} 
                  className={`group hover:shadow-lg transition-all duration-300 cursor-pointer h-full ${themeClasses.cardBordered}`}
                  onClick={() => {
                    if (partenaire.redirection) {
                      window.open(partenaire.redirection, '_blank', 'noopener,noreferrer')
                    }
                  }}
                  delay={0.1 * index}
                >
                  <AnimatedCardHeader className="text-center pb-2">
                    {partenaire.logo ? (
                      <div className="relative w-full h-24 mb-3 mx-auto">
                        <AnimatedImage
                          src={partenaire.logo}
                          alt={partenaire.nom}
                          fill
                          className="object-contain"
                          onError={() => console.log('Erreur de chargement du logo:', partenaire.nom)}
                          delay={0.2}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-24 mb-3 mx-auto flex items-center justify-center bg-gray-100 rounded">
                        <span className="text-sm text-gray-500">Pas de logo</span>
                      </div>
                    )}
                    <AnimatedCardTitle className={`${themeClasses.corps} line-clamp-2`}>
                      {partenaire.nom}
                    </AnimatedCardTitle>
                  </AnimatedCardHeader>
                  <AnimatedCardContent className="text-center">
                    {partenaire.description && (
                      <AnimatedCardDescription className={`${themeClasses.corps} line-clamp-3 mb-4`}>
                        {partenaire.description}
                      </AnimatedCardDescription>
                    )}
                    {partenaire.redirection && (
                      <div className="inline-flex items-center gap-1 text-xs text-primary">
                        Visiter
                        <ExternalLink className="h-3 w-3" />
                      </div>
                    )}
                  </AnimatedCardContent>
                </AnimatedCard>
              ))}
            </div>

          </div>
        </section>
      )}
    </div>
  )
}