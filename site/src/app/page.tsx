'use client'

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ArrowRight, Users, Heart, Shield, Clock } from "lucide-react"
import Image from "next/image"
import { ThemeProvider } from "@/components/theme-provider"
import { themeClasses } from "@/lib/theme"
import { useAccueil, useProjets, useArticlesALaUne } from "@/hooks/useDirectus"
import Link from "next/link"

export default function Home() {
  // Récupération des données d'accueil
  const { accueil, loading: accueilLoading } = useAccueil()
  const { projets, loading: projetsLoading } = useProjets()

  // Debug logs - Articles uniquement
  console.log('📰 Accueil loading:', accueilLoading)
  console.log('📰 Articles à la une:', accueil?.articles_a_la_une)
  console.log('📰 Nombre d\'articles:', accueil?.articles_a_la_une?.length || 0)


  // Fonction pour obtenir l'icône Lucide par nom
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Users,
      Heart,
      Shield,
      Clock,
      // Ajoute d'autres icônes selon tes besoins
    }
    return icons[iconName] || Users
  }

  // Fallback si pas de missions
  const defaultFeatures = [
    {
      id: "1",
      icon: Users,
      title: "Professionnels de santé",
      description: "Une équipe de professionnels qualifiés et engagés pour votre bien-être.",
      couleur: "bg-blue-500"
    },
    {
      id: "2",
      icon: Heart,
      title: "Soins de proximité",
      description: "Des soins accessibles et de qualité dans votre territoire.",
      couleur: "bg-red-500"
    },
    {
      id: "3",
      icon: Shield,
      title: "Sécurité des soins",
      description: "Un environnement sécurisé et conforme aux normes de santé.",
      couleur: "bg-green-500"
    },
    {
      id: "4",
      icon: Clock,
      title: "Disponibilité",
      description: "Des professionnels disponibles pour répondre à vos besoins.",
      couleur: "bg-purple-500"
    }
  ]

  const features = projetsLoading ? [] : (projets.length > 0 ? projets : defaultFeatures)
  

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
            {/* Hero Section */}
            <section 
              className="py-12 px-4 sm:py-16 md:py-20" 
              style={{ 
                backgroundColor: accueil?.couleur_fond_section_principale || 'var(--primary)' 
              }}
            >
          <div className="container mx-auto">
            <div className="text-center max-w-4xl mx-auto">
                      {accueilLoading ? (
                        <div className="animate-pulse">
                          <div className="h-16 bg-gray-200 rounded mb-4"></div>
                          <div className="h-6 bg-gray-200 rounded mb-8"></div>
                        </div>
                      ) : accueil?.titre_principal ? (
                        <h1 
                          className={`${themeClasses.titre} text-2xl sm:text-3xl md:text-4xl lg:text-6xl mb-4 sm:mb-6`}
                          style={{ color: accueil.titre_principal_couleur || '#1f2937' }}
                        >
                          {accueil.titre_principal}
                        </h1>
                      ) : (
                        <h1 className={`${themeClasses.titre} text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-gray-900 mb-4 sm:mb-6`}>
                          Bienvenue sur le site de la{" "}
                          <span className="text-primary">CPTS des Mauges</span>
              </h1>
                      )}
              
                  {accueilLoading ? (
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded mb-6"></div>
                    </div>
                  ) : accueil?.sous_titre_principal ? (
                    <p 
                      className={`${themeClasses.sous_titre} mb-6 sm:mb-8 max-w-2xl mx-auto px-4`}
                      style={{ color: accueil.couleur_texte_section_principale || '#6b7280' }}
                    >
                      {accueil.sous_titre_principal}
                    </p>
                  ) : (
                    <p 
                      className={`${themeClasses.sous_titre} mb-6 sm:mb-8 max-w-2xl mx-auto px-4`}
                      style={{ color: accueil?.couleur_texte_section_principale || '#6b7280' }}
                    >
                      Votre Communauté Professionnelle Territoriale de Santé vous accompagne 
                      pour des soins de qualité et de proximité dans la région des Mauges.
                    </p>
                  )}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                    <Button size="lg" className="w-full sm:w-auto" style={{ backgroundColor: 'var(--quaternary)', color: 'white' }} asChild>
                      <Link href="/contact">
                        Prendre rendez-vous
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="w-full sm:w-auto" style={{ borderColor: 'var(--quinary)', color: 'var(--quinary)' }} asChild>
                      <Link href="/about">En savoir plus</Link>
                    </Button>
                  </div>
            </div>
          </div>
        </section>

            {/* Features Section */}
            <section 
              className="py-12 px-4 sm:py-16 md:py-20" 
              style={{ 
                backgroundColor: accueil?.couleur_fond_section_projets || 'var(--secondary)' 
              }}
            >
          <div className="container mx-auto">
            <div className="text-center mb-12 sm:mb-16">
                  {accueilLoading ? (
                    <div className="animate-pulse">
                      <div className="h-12 bg-gray-200 rounded mb-4 mx-auto w-96"></div>
                      <div className="h-4 bg-gray-200 rounded mb-8 mx-auto w-80"></div>
                    </div>
                  ) : accueil?.titre_projets ? (
                    <>
                      <h2 
                        className={`${themeClasses.titre} text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4`}
                        style={{ color: accueil.titre_projets_couleur || '#1f2937' }}
                      >
                        {accueil.titre_projets}
                      </h2>
                      <p 
                        className={`${themeClasses.corps} max-w-2xl mx-auto px-4`}
                        style={{ color: accueil.couleur_texte_section_projets || '#374151' }}
                      >
                        {accueil.sous_titre_projets}
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className={`${themeClasses.titre} text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 px-4`}>
                        Nos projets
                      </h2>
                      <p 
                        className={`${themeClasses.corps} max-w-2xl mx-auto px-4`}
                        style={{ color: accueil?.couleur_texte_section_projets || '#374151' }}
                      >
                        Découvrez nos projets et missions pour améliorer la santé dans la région des Mauges.
                      </p>
                    </>
                  )}
        </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {projetsLoading ? (
                // Loading skeleton
                Array.from({ length: 4 }).map((_, index) => (
                  <Card key={index} className="text-center">
                    <CardHeader>
                      <div className="mx-auto w-12 h-12 bg-gray-200 rounded-full animate-pulse mb-4"></div>
                      <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                features.map((projet, index) => {
                  // Utilise directement les données du projet
                  const isDirectusProjet = projet.id && (typeof projet.id === 'number' || (typeof projet.id === 'string' && projet.id.length > 10))
                  
                  
                  let IconComponent = Users
                  let title = projet.title || projet.titre
                  let subtitle = projet.sous_titre || ''
                  let backgroundColor = 'bg-primary/10'
                  let textColor = 'text-white'
                  
                  if (isDirectusProjet) {
                    // Si c'est un projet Directus, utilise ses données
                    if (projet.icone) {
                      // Si l'icône est une URL d'image, on l'affichera avec Image
                      // Sinon, on utilise le nom de l'icône Lucide
                      IconComponent = getIcon(projet.icone) || Users
                    }
                    
                    title = projet.titre
                    subtitle = projet.sous_titre || ''
                    backgroundColor = projet.couleur || 'bg-primary/10'
                    textColor = projet.couleur_texte || 'text-white'
                    
                  } else {
                    // Fallback pour les projets par défaut
                    IconComponent = getIcon(projet.icone || 'Users')
                    backgroundColor = projet.couleur || 'bg-primary/10'
                    textColor = 'text-white'
                  }
                  
                  return (
                    <Card 
                      key={projet.id || index} 
                      className="text-center hover:shadow-lg transition-shadow"
                      style={{
                        backgroundColor: isDirectusProjet ? projet.couleur : undefined,
                        color: isDirectusProjet ? projet.couleur_texte : undefined
                      }}
                    >
                      <CardHeader>
                        <div 
                          className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4"
                          style={{
                            backgroundColor: isDirectusProjet ? 'rgba(255, 255, 255, 0.2)' : undefined,
                            color: isDirectusProjet ? projet.couleur_texte : undefined
                          }}
                        >
                          {isDirectusProjet && projet.icone && projet.icone.startsWith('http') ? (
                            // Si l'icône est une URL d'image
                            <Image
                              src={projet.icone}
                              alt={title}
                              width={24}
                              height={24}
                              className="object-contain"
                            />
                          ) : (
                            // Sinon, utilise l'icône Lucide
                            <IconComponent className="h-6 w-6" />
                          )}
                        </div>
                        <CardTitle className={`${themeClasses.sous_titre} text-lg`}>{title}</CardTitle>
                        {subtitle && (
                          <p className={`${themeClasses.corps} text-sm opacity-80 mt-1`}>
                            {subtitle}
                          </p>
                        )}
                      </CardHeader>
                      <CardContent>
                            {projet.description && (
                              <CardDescription className={`${themeClasses.corps} text-sm opacity-90`}>
                                {projet.description}
                              </CardDescription>
                            )}
                      </CardContent>
                    </Card>
                  )
                })
              )}
            </div>
          </div>
        </section>

            {/* CTA Section */}
            <section 
              className="py-12 px-4 sm:py-16 md:py-20" 
              style={{ 
                backgroundColor: accueil?.couleur_fond_section_information || 'var(--primary)' 
              }}
            >
              <div className="container mx-auto">
                <div className="text-center text-white">
                  {accueilLoading ? (
                    <div className="animate-pulse">
                      <div className="h-12 bg-gray-200 rounded mb-4 mx-auto w-96"></div>
                      <div className="h-4 bg-gray-200 rounded mb-8 mx-auto w-80"></div>
                    </div>
                  ) : accueil?.titre_informations ? (
                    <>
                      <h2 
                        className={`${themeClasses.titre} text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4`}
                        style={{ color: accueil.titre_informations_couleur || 'white' }}
                      >
                        {accueil.titre_informations}
                      </h2>
                      <p 
                        className={`${themeClasses.corps} mb-6 sm:mb-8 opacity-90 px-4`}
                        style={{ color: accueil.couleur_texte_section_informations || 'white' }}
                      >
                        {accueil.sous_titre_informations}
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className={`${themeClasses.titre} text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4`}>
                        Besoin d'aide ou d'informations ?
          </h2>
                      <p 
                        className={`${themeClasses.corps} mb-6 sm:mb-8 opacity-90 px-4`}
                        style={{ color: accueil?.couleur_texte_section_informations || 'white' }}
                      >
                        Notre équipe est là pour vous accompagner et répondre à vos questions.
                      </p>
                    </>
                  )}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto" style={{ backgroundColor: 'var(--quaternary)', color: 'white' }} asChild>
                      <Link href="/contact">Nous contacter</Link>
            </Button>
                    <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild>
                      <Link href="/faq">FAQ</Link>
            </Button>
          </div>
        </div>
          </div>
        </section>

            {/* News Section */}
            <section 
              className="py-12 px-4 sm:py-16 md:py-20" 
              style={{ 
                backgroundColor: accueil?.couleur_fond_section_actualites || 'var(--secondary)' 
              }}
            >
              <div className="container mx-auto">
                <div className="text-center mb-10 sm:mb-12">
                  {accueilLoading ? (
                    <div className="animate-pulse">
                      <div className="h-12 bg-gray-200 rounded mb-4 mx-auto w-96"></div>
                      <div className="h-4 bg-gray-200 rounded mb-8 mx-auto w-80"></div>
                    </div>
                  ) : accueil?.titre_actualites ? (
                    <>
                      <h2 
                        className={`${themeClasses.titre} text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4`}
                        style={{ color: accueil.titre_actualites_couleur || '#1f2937' }}
                      >
                        {accueil.titre_actualites}
                      </h2>
                      <p 
                        className={`${themeClasses.corps} px-4`}
                        style={{ color: accueil.couleur_texte_section_actualites || '#374151' }}
                      >
                        {accueil.sous_titre_actualites}
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className={`${themeClasses.titre} text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 px-4`}>
                        Actualités
                      </h2>
                      <p 
                        className={`${themeClasses.corps} px-4`}
                        style={{ color: accueil?.couleur_texte_section_actualites || '#374151' }}
                      >
                        Restez informé des dernières nouvelles de la CPTS des Mauges.
                      </p>
                    </>
                  )}
                </div>
            
                {accueilLoading ? (
                  // Loading skeleton
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        </CardHeader>
                        <CardContent>
                          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : accueil?.articles_a_la_une && accueil.articles_a_la_une.length > 0 ? (
                  <Carousel 
                    opts={{
                      align: "center",
                      slidesToScroll: 1,
                      containScroll: "trimSnaps",
                    }}
                    className="w-full"
                  >
                    <CarouselContent className="-ml-2 md:-ml-4">
                      {accueil.articles_a_la_une.map((article, index) => {
                        console.log(`📰 Article ${index + 1} (${article.titre}):`, article)
                        console.log(`📰 Etiquettes de l'article ${index + 1}:`, article.etiquettes)
                        console.log(`📰 Nombre d'étiquettes:`, article.etiquettes?.length || 0)
                        return (
                          <CarouselItem 
                            key={article.id} 
                            className="pl-2 md:pl-4 flex justify-center"
                            style={{
                              flexBasis: `calc(100% / ${Math.min(accueil.nombre_article_caroussel || 3, accueil.articles_a_la_une.length)})`
                            }}
                          >
                            <Card className="hover:shadow-lg transition-shadow h-full flex flex-col max-h-[500px] w-full max-w-sm" style={{ aspectRatio: '4/5' }}>
                              {article.image ? (
                                <div className="relative w-full" style={{ aspectRatio: '3/2' }}>
                                  <Image
                                    src={article.image.startsWith('http') ? article.image : `${process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'}/assets/${article.image}`}
                                    alt={article.titre || 'Image de l\'article'}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover rounded-t-lg"
                                    onError={(e) => {
                                      console.log('Erreur de chargement de l\'image:', article.image)
                                      e.currentTarget.style.display = 'none'
                                    }}
                                  />
                                </div>
                              ) : (
                                <div className="relative w-full bg-gray-200 flex items-center justify-center" style={{ aspectRatio: '3/2' }}>
                                  <span className="text-gray-500 text-sm">Pas d'image</span>
                                </div>
                              )}
                              <CardHeader className="flex-shrink-0">
                                <div className="flex items-center gap-2 mb-2">
                                  {article.etiquettes && article.etiquettes.length > 0 && (
                                    <Badge 
                                      variant="secondary"
                                      style={{
                                        backgroundColor: article.etiquettes[0].couleur || '#6b7280',
                                        color: article.etiquettes[0].couleur ? '#ffffff' : undefined
                                      }}
                                    >
                                      {article.etiquettes[0].nom}
                                    </Badge>
                                  )}
                                  <span className="text-sm text-muted-foreground">
                                    {new Date(article.date_created).toLocaleDateString('fr-FR')}
                                  </span>
                                </div>
                                <CardTitle className={`${themeClasses.sousTitre} text-lg line-clamp-2`}>
                                  {article.titre || 'Titre non disponible'}
                                </CardTitle>
                                {article.resume && (
                                  <div className="mt-2">
                                    <p className={`${themeClasses.corps} text-sm text-muted-foreground line-clamp-3`}>
                                      {article.resume}
                                    </p>
                                  </div>
                                )}
                              </CardHeader>
                              <CardContent className="flex-1 flex flex-col">
                                <CardDescription className={`${themeClasses.corps} flex-1 line-clamp-5`}>
                                  {article.excerpt || (article.contenu ? 
                                    (() => {
                                      const cleanContent = article.contenu.replace(/<[^>]*>/g, '')
                                      return cleanContent.length > 150 
                                        ? cleanContent.substring(0, 150) + '...'
                                        : cleanContent
                                    })()
                                    : 'Contenu non disponible')}
                                </CardDescription>
                                
                                {article.etiquettes && article.etiquettes.length > 1 && (
                                  <div className="flex flex-wrap gap-1 mt-2 flex-shrink-0">
                                    {article.etiquettes.slice(1).map((tag) => (
                                      <Badge 
                                        key={tag.id} 
                                        variant="outline" 
                                        className="text-xs"
                                        style={{
                                          borderColor: tag.couleur || '#d1d5db',
                                          color: tag.couleur || undefined,
                                          backgroundColor: tag.couleur ? `${tag.couleur}20` : undefined
                                        }}
                                      >
                                        {tag.nom}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </CarouselItem>
                        )
                      })}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                ) : (
                  // Fallback si pas d'articles
                  <div className="text-center py-8">
                    <p className={themeClasses.corps}>Aucun article à la une pour le moment.</p>
                  </div>
                )}

                <div className="text-center mt-10 sm:mt-12">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto" style={{ borderColor: 'var(--quinary)', color: 'var(--quinary)' }} asChild>
                    <Link href="/news">Voir toutes les actualités</Link>
            </Button>
          </div>
        </div>
        </section>
      </main>

        <Footer />
          </div>
    </ThemeProvider>
  )
}