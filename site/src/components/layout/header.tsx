"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"
import { Menu, Facebook, Linkedin, XIcon } from "lucide-react"
import { useLogo, useEntete, useReseauxSociaux } from "@/hooks/useDirectus"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

// Fonction pour convertir hex en RGB
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (result) {
    const r = parseInt(result[1], 16)
    const g = parseInt(result[2], 16)
    const b = parseInt(result[3], 16)
    return `${r}, ${g}, ${b}`
  }
  return "0, 0, 0" // Fallback noir
}

// Composant SheetContent personnalisé avec croix stylée
function CustomSheetContent({ 
  className, 
  children, 
  side = "right", 
  entete,
  ...props 
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
  entete?: any
}) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50" />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close 
          className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none"
          style={{ color: entete?.couleur_titres_pages }}
        >
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  )
}

export function Header() {
  const { logo, loading: logoLoading } = useLogo()
  const { entete, loading: enteteLoading } = useEntete()
  const { reseauxSociaux, loading: reseauxLoading } = useReseauxSociaux()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  // Forcer le sticky avec useEffect - APPROCHE ULTIME
  useEffect(() => {
    const forceSticky = () => {
      if (headerRef.current) {
        // Forcer le sticky avec setProperty
        headerRef.current.style.setProperty('position', 'sticky', 'important')
        headerRef.current.style.setProperty('top', '0', 'important')
        headerRef.current.style.setProperty('z-index', '9999', 'important')
        headerRef.current.style.setProperty('width', '100%', 'important')
        headerRef.current.style.setProperty('max-width', '100vw', 'important')
        
        // Ajouter une classe CSS pour forcer le sticky
        headerRef.current.classList.add('force-sticky')
        headerRef.current.classList.add('header-sticky')
        
        // Forcer aussi sur le parent pour s'assurer qu'il n'y a pas de contexte de stacking
        const parent = headerRef.current.parentElement
        if (parent) {
          parent.style.setProperty('position', 'relative', 'important')
        }
        
        // Forcer sur le body
        document.body.style.setProperty('position', 'relative', 'important')
        
        // Forcer sur tous les parents
        let current = headerRef.current.parentElement
        while (current && current !== document.body) {
          current.style.setProperty('position', 'relative', 'important')
          current = current.parentElement
        }
        
        // Forcer aussi avec une approche différente
        headerRef.current.setAttribute('style', 
          headerRef.current.getAttribute('style') + 
          '; position: sticky !important; top: 0 !important; z-index: 9999 !important;'
        )
      }
    }
    
    forceSticky()
    
    // Reforcer après un délai pour contrer les CSS dynamiques
    setTimeout(forceSticky, 100)
    setTimeout(forceSticky, 500)
    setTimeout(forceSticky, 1000)
    setTimeout(forceSticky, 2000)
    
    // Observer les changements de style pour reforcer
    const observer = new MutationObserver(() => {
      setTimeout(forceSticky, 50)
    })
    
    if (headerRef.current) {
      observer.observe(headerRef.current, { 
        attributes: true, 
        attributeFilter: ['style', 'class'] 
      })
    }
    
    // Observer aussi le body
    const bodyObserver = new MutationObserver(() => {
      setTimeout(forceSticky, 50)
    })
    
    bodyObserver.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['style', 'class'] 
    })
    
    return () => {
      observer.disconnect()
      bodyObserver.disconnect()
    }
  }, [])
  
  const navigation = [
    { name: entete?.titre_page_1 || "Accueil", href: "/" },
    { name: entete?.titre_page_2 || "Qui sommes nous ?", href: "/qui-sommes-nous" },
    { name: entete?.titre_page_3 || "Bureau / CA", href: "/bureau-ca" },
    { name: entete?.titre_page_4 || "Nos projets / missions", href: "/projets-missions" },
    { name: entete?.titre_page_5 || "Nos actualités", href: "/actualites" },
    { name: entete?.titre_page_6 || "Agenda", href: "/evenements" },
    { name: "Partenaires", href: "/partenaires" },
    { name: entete?.titre_page_7 || "Je suis patient", href: "/patient" },
    { name: entete?.titre_page_8 || "Je suis professionnel", href: "/professionnel" },
    { name: entete?.titre_page_9 || "Comment adhérer ?", href: "/adherer" },
    { name: "Contacts", href: "/contact" },
  ]

  return (
    <header 
      ref={headerRef}
      className="w-full border-b header-sticky"
      style={{ 
        backgroundColor: entete?.couleur_de_fond ? 
          `rgba(${hexToRgb(entete.couleur_de_fond)}, ${entete.opacite ? entete.opacite / 100 : 1})` : 
          'var(--tertiary)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo et titre - Mobile First */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {logoLoading ? (
              <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-gray-200 animate-pulse"></div>
            ) : logo?.logo ? (
              <div className="h-12 w-12 sm:h-16 sm:w-16 relative">
                <Image
                  src={logo.logo}
                  alt="Logo CPTS"
                  fill
                  sizes="(max-width: 640px) 48px, 64px"
                  className="object-contain"
                  onError={(e) => {
                    // Fallback vers le texte si l'image ne charge pas
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.parentElement!.innerHTML = '<div class="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-primary flex items-center justify-center"><span class="text-primary-foreground font-bold text-sm sm:text-lg">CPTS</span></div>'
                  }}
                />
              </div>
            ) : (
              <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm sm:text-lg">CPTS</span>
              </div>
            )}
            
            {/* Titre - visible sur mobile et desktop */}
            <div className="min-w-0 flex-1">
              {enteteLoading ? (
                <div className="animate-pulse">
                  <div className="h-4 sm:h-5 bg-gray-200 rounded mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-32 sm:w-48"></div>
                </div>
              ) : entete ? (
                <>
                  <h1 
                    className="text-sm sm:text-lg font-bold truncate"
                    style={{ color: entete.couleur_titre }}
                  >
                    {entete.titre}
                  </h1>
                  <p 
                    className="text-xs sm:text-sm truncate"
                    style={{ color: entete.couleur_sous_titre }}
                  >
                    {entete.sous_titre}
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-sm sm:text-lg font-bold truncate">CPTS des Mauges</h1>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">Communauté Professionnelle Territoriale de Santé</p>
                </>
              )}
            </div>
          </div>

          {/* Navigation desktop - Seulement sur très grands écrans */}
          <nav className="hidden 2xl:flex items-center justify-center flex-wrap gap-1 lg:gap-2 flex-1 max-w-4xl mx-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs lg:text-sm font-medium hover:text-primary transition-colors px-1 lg:px-2 py-1 rounded whitespace-nowrap flex-shrink-0"
                style={{ color: entete?.couleur_titres_pages || 'inherit' }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Réseaux sociaux - Très grands écrans seulement */}
          <div className="hidden 2xl:flex items-center space-x-2 flex-shrink-0">
            {reseauxSociaux && reseauxSociaux.length > 0 ? (
              reseauxSociaux.map((reseau) => (
                <Button key={reseau.id} variant="ghost" size="sm" asChild>
                  <Link 
                    href={reseau.redirection} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: entete?.couleur_titres_pages }}
                  >
                    {reseau.logo ? (
                      <div className="relative h-4 w-4">
                        <Image
                          src={reseau.logo}
                          alt={reseau.nom}
                          fill
                          className="object-contain"
                          onError={() => console.log('Erreur de chargement du logo:', reseau.nom)}
                        />
                      </div>
                    ) : (
                      <div className="h-4 w-4 bg-gray-300 rounded"></div>
                    )}
                    {reseau.visible && (
                      <span className="text-sm ml-2">{reseau.nom}</span>
                    )}
                  </Link>
                </Button>
              ))
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Menu mobile - Mobile, tablette et desktop */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="2xl:hidden"
                style={{ 
                  color: entete?.couleur_titres_pages || 'inherit',
                  boxShadow: 'none',
                  filter: 'none',
                  textShadow: 'none',
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  background: 'none'
                }}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>
            <CustomSheetContent 
              side="right" 
              className="w-full sm:w-80"
              entete={entete}
              style={{
                backgroundColor: entete?.couleur_de_fond ? 
                  `rgba(${hexToRgb(entete.couleur_de_fond)}, ${entete.opacite ? entete.opacite / 100 : 1})` : 
                  'white'
              }}
            >
              <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
              <div 
                className="flex flex-col space-y-6 mt-6"
                style={{ color: entete?.couleur_titre || 'inherit' }}
              >
                {/* Logo et titre dans le menu */}
                <div className="flex items-center space-x-4 pb-4 border-b ml-4">
                  {logoLoading ? (
                    <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse"></div>
                  ) : logo?.logo ? (
                    <div className="h-12 w-12 relative">
                      <Image
                        src={logo.logo}
                        alt="Logo CPTS"
                        fill
                        sizes="48px"
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-lg">CPTS</span>
                    </div>
                  )}
                  <div>
                    {enteteLoading ? (
                      <div className="animate-pulse">
                        <div className="h-5 bg-gray-200 rounded mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                      </div>
                    ) : entete ? (
                      <>
                        <h2 
                          className="text-lg font-bold"
                          style={{ color: entete.couleur_titre }}
                        >
                          {entete.titre}
                        </h2>
                        <p 
                          className="text-sm"
                          style={{ color: entete.couleur_sous_titre }}
                        >
                          {entete.sous_titre}
                        </p>
                      </>
                    ) : (
                      <>
                        <h2 className="text-lg font-bold">CPTS des Mauges</h2>
                        <p className="text-sm text-muted-foreground">Communauté Professionnelle Territoriale de Santé</p>
                      </>
                    )}
                  </div>
                </div>
                
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
                
                {/* Réseaux sociaux dans le menu */}
                {reseauxSociaux && reseauxSociaux.length > 0 && (
                  <div className="flex justify-center space-x-4 pt-4 border-t">
                    {reseauxSociaux.map((reseau) => (
                      <Button key={reseau.id} variant="ghost" size="sm" asChild>
                        <Link 
                          href={reseau.redirection} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ color: entete?.couleur_titres_pages }}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {reseau.logo ? (
                            <div className="relative h-4 w-4">
                              <Image
                                src={reseau.logo}
                                alt={reseau.nom}
                                fill
                                className="object-contain"
                                onError={() => console.log('Erreur de chargement du logo:', reseau.nom)}
                              />
                            </div>
                          ) : (
                            <div className="h-4 w-4 bg-gray-300 rounded"></div>
                          )}
                          {reseau.visible && (
                            <span className="text-sm ml-2">{reseau.nom}</span>
                          )}
                        </Link>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </CustomSheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  )
}