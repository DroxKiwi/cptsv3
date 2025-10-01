"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu, X, Facebook, Linkedin } from "lucide-react"
import { useLogo, useEntete, useReseauxSociaux } from "@/hooks/useDirectus"
import Image from "next/image"
import { useState } from "react"

// Fonction pour convertir hex en RGB
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (result) {
    const r = parseInt(result[1], 16)
    const g = parseInt(result[2], 16)
    const b = parseInt(result[3], 16)
    return `${r}, ${g}, ${b}`
  }
  return "0, 0, 0"
}

export function Header() {
  const { logo, loading: logoLoading } = useLogo()
  const { entete, loading: enteteLoading } = useEntete()
  const { reseauxSociaux, loading: reseauxLoading } = useReseauxSociaux()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Navigation basée sur les données Directus
  const navigation = [
    { name: entete?.titre_page_0 || "Accueil", href: "/" },
    { name: entete?.titre_page_1 || "Qui sommes nous ?", href: "/qui-sommes-nous" },
    { name: entete?.titre_page_2 || "Bureau / CA", href: "/bureau-ca" },
    { name: entete?.titre_page_3 || "Nos projets / missions", href: "/projets-missions" },
    { name: entete?.titre_page_4 || "Nos actualités", href: "/actualites" },
    { name: entete?.titre_page_5 || "Agenda", href: "/evenements" },
    { name: "Partenaires", href: "/partenaires" },
    { name: entete?.titre_page_6 || "Je suis patient", href: "/patient" },
    { name: entete?.titre_page_7 || "Je suis professionnel", href: "/professionnel" },
    { name: entete?.titre_page_8 || "Comment adhérer ?", href: "/adherer" },
    { name: entete?.titre_page_9 || "Contactez-nous", href: "/contact" },
  ]

  return (
    <header 
      className="sticky top-0 z-[9999] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      style={{ 
        backgroundColor: entete?.couleur_de_fond ? 
          `rgba(${hexToRgb(entete.couleur_de_fond)}, ${entete.opacite ? entete.opacite / 100 : 0.95})` : 
          undefined
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo et titre */}
          <div className="flex items-center space-x-3">
            {/* Logo */}
            {logoLoading ? (
              <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
            ) : logo?.logo ? (
              <div className="h-10 w-10 relative">
                <Image
                  src={logo.logo}
                  alt="Logo CPTS"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">CPTS</span>
              </div>
            )}
            
            {/* Titre */}
            <div className="min-w-0">
              {enteteLoading ? (
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-1 w-32" />
                  <div className="h-3 bg-gray-200 rounded w-24" />
                </div>
              ) : entete ? (
                <>
                  <h1 
                    className="text-sm font-bold truncate"
                    style={{ color: entete.couleur_titre }}
                  >
                    {entete.titre}
                  </h1>
                  <p 
                    className="text-xs truncate"
                    style={{ color: entete.couleur_sous_titre }}
                  >
                    {entete.sous_titre}
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-sm font-bold truncate">CPTS des Mauges</h1>
                  <p className="text-xs text-muted-foreground truncate">Communauté Professionnelle Territoriale de Santé</p>
                </>
              )}
            </div>
          </div>

          {/* Menu mobile */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden burger-button-no-shadow"
                style={{ color: entete?.couleur_titres_pages }}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-full sm:w-80"
              style={{
                backgroundColor: entete?.couleur_de_fond ? 
                  `rgba(${hexToRgb(entete.couleur_de_fond)}, ${entete.opacite ? entete.opacite / 100 : 1})` : 
                  'white'
              }}
            >
              <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
              <div className="flex flex-col space-y-6 mt-6">
                
                {/* Navigation */}
                <nav className="flex flex-col space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-sm font-medium py-3 px-4 rounded-md hover:bg-accent transition-colors"
                      style={{ color: entete?.couleur_titres_pages }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                
                {/* Réseaux sociaux */}
                {reseauxSociaux && reseauxSociaux.length > 0 && (
                  <div className="flex justify-center space-x-4 pt-4 border-t">
                    {reseauxSociaux.map((reseau) => {
                      const iconSize = reseau.taille ? `${reseau.taille}px` : '24px'
                      return (
                        <Button key={reseau.id} variant="ghost" size="sm" asChild>
                          <Link 
                            href={reseau.redirection} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: entete?.couleur_titres_pages }}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {reseau.logo ? (
                              <img
                                src={reseau.logo}
                                alt={reseau.nom}
                                className="object-contain social-icon"
                                style={{ 
                                  '--icon-size': iconSize,
                                  width: iconSize, 
                                  height: iconSize,
                                  minWidth: iconSize,
                                  minHeight: iconSize,
                                  maxWidth: iconSize,
                                  maxHeight: iconSize
                                } as React.CSSProperties}
                              />
                            ) : (
                              <div 
                                className="bg-gray-300 rounded"
                                style={{ 
                                  width: iconSize, 
                                  height: iconSize,
                                  minWidth: iconSize,
                                  minHeight: iconSize
                                }}
                              />
                            )}
                            {reseau.visible && (
                              <span className="text-sm ml-2">{reseau.nom}</span>
                            )}
                          </Link>
                        </Button>
                      )
                    })}
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Navigation desktop - cachée sur mobile */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.slice(0, 6).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium hover:text-primary transition-colors"
                style={{ color: entete?.couleur_titres_pages }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Réseaux sociaux desktop - cachés sur mobile */}
          <div className="hidden md:flex items-center space-x-2">
            {reseauxSociaux && reseauxSociaux.length > 0 ? (
              reseauxSociaux.map((reseau) => {
                const iconSize = reseau.taille ? `${reseau.taille}px` : '32px'
                return (
                  <Button key={reseau.id} variant="ghost" size="sm" asChild className="p-2">
                    <Link 
                      href={reseau.redirection} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: entete?.couleur_titres_pages }}
                    >
                      {reseau.logo ? (
                        <img
                          src={reseau.logo}
                          alt={reseau.nom}
                          className="object-contain social-icon"
                          style={{ 
                            '--icon-size': iconSize,
                            width: iconSize, 
                            height: iconSize,
                            minWidth: iconSize,
                            minHeight: iconSize,
                            maxWidth: iconSize,
                            maxHeight: iconSize
                          } as React.CSSProperties}
                        />
                      ) : (
                        <div 
                          className="bg-gray-300 rounded"
                          style={{ 
                            width: iconSize, 
                            height: iconSize,
                            minWidth: iconSize,
                            minHeight: iconSize
                          }}
                        />
                      )}
                    </Link>
                  </Button>
                )
              })
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild className="p-2">
                  <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-8 w-8 social-icon-large" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild className="p-2">
                  <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-8 w-8 social-icon-large" />
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}