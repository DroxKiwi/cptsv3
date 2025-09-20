import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Facebook, Linkedin } from "lucide-react"
import { useLogo, useEntete } from "@/hooks/useDirectus"
import Image from "next/image"

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

export function Header() {
  const { logo, loading: logoLoading } = useLogo()
  const { entete, loading: enteteLoading } = useEntete()
  
  const navigation = [
    { name: entete?.titre_page_1 || "Qui sommes nous ?", href: "/qui-sommes-nous" },
    { name: entete?.titre_page_2 || "Bureau / CA", href: "/bureau-ca" },
    { name: entete?.titre_page_3 || "Nos projets / missions", href: "/projets-missions" },
    { name: entete?.titre_page_4 || "Nos actualités", href: "/actualites" },
    { name: entete?.titre_page_5 || "Agenda", href: "/agenda" },
    { name: entete?.titre_page_6 || "Je suis patient", href: "/patient" },
    { name: entete?.titre_page_7 || "Je suis professionnel", href: "/professionnel" },
    { name: entete?.titre_page_8 || "Comment adhérer ?", href: "/adherer" },
    { name: entete?.titre_page_9 || "Contacts", href: "/contact" },
  ]

  return (
        <header 
          className="sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60" 
          style={{ 
            backgroundColor: entete?.couleur_de_fond ? 
              `rgba(${hexToRgb(entete.couleur_de_fond)}, ${entete.opacite ? entete.opacite / 100 : 1})` : 
              'var(--tertiary)'
          }}
        >
      <div className="w-full px-4 flex h-14 sm:h-16 items-center">
        {/* Logo et titre - à gauche */}
        <div className="flex items-center space-x-2 flex-shrink-0">
              {logoLoading ? (
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gray-200 animate-pulse"></div>
              ) : logo?.logo ? (
                <div className="h-7 w-7 sm:h-8 sm:w-8 relative">
                      <Image
                        src={logo.logo}
                        alt="Logo CPTS"
                        fill
                        sizes="(max-width: 640px) 28px, 32px"
                        className="object-contain"
                        onError={(e) => {
                          // Fallback vers le texte si l'image ne charge pas
                          e.currentTarget.style.display = 'none'
                          e.currentTarget.parentElement!.innerHTML = '<div class="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-primary flex items-center justify-center"><span class="text-primary-foreground font-bold text-xs sm:text-sm">CPTS</span></div>'
                        }}
                      />
                </div>
              ) : (
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xs sm:text-sm">CPTS</span>
                </div>
              )}
          <div className="hidden sm:block">
            {enteteLoading ? (
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-48"></div>
              </div>
                ) : entete ? (
                  <>
                    <h1 
                      className="text-lg sm:text-xl font-bold"
                      style={{ color: entete.couleur_titre }}
                    >
                      {entete.titre}
                    </h1>
                    <p 
                      className="text-xs"
                      style={{ color: entete.couleur_sous_titre }}
                    >
                      {entete.sous_titre}
                    </p>
                  </>
                ) : (
              <>
                <h1 className="text-lg sm:text-xl font-bold">CPTS des Mauges</h1>
                <p className="text-xs text-muted-foreground">Communauté Professionnelle Territoriale de Santé</p>
              </>
            )}
          </div>
        </div>

            {/* Navigation desktop - centrée */}
            <nav className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary whitespace-nowrap"
                  style={{ color: entete?.couleur_titres_pages }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

        {/* Réseaux sociaux - à droite */}
        <div className="hidden md:flex items-center space-x-2 flex-shrink-0">
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
        </div>

        {/* Menu mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Ouvrir le menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col space-y-4 mt-8">
              <div className="flex items-center space-x-2 mb-6">
                {logoLoading ? (
                  <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
                ) : logo?.logo ? (
                  <div className="h-8 w-8 relative">
                        <Image
                          src={logo.logo}
                          alt="Logo CPTS"
                          fill
                          sizes="32px"
                          className="object-contain"
                        />
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">CPTS</span>
                  </div>
                )}
                    <div>
                      {enteteLoading ? (
                        <div className="animate-pulse">
                          <div className="h-6 bg-gray-200 rounded mb-1"></div>
                          <div className="h-3 bg-gray-200 rounded w-48"></div>
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
                            className="text-xs"
                            style={{ color: entete.couleur_sous_titre }}
                          >
                            {entete.sous_titre}
                          </p>
                        </>
                      ) : (
                        <>
                          <h2 className="text-lg font-bold">CPTS des Mauges</h2>
                          <p className="text-xs text-muted-foreground">Communauté Professionnelle Territoriale de Santé</p>
                        </>
                      )}
                    </div>
              </div>
              
                  <nav className="flex flex-col space-y-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-sm font-medium py-2 px-3 rounded-md hover:bg-accent transition-colors"
                        style={{ color: entete?.couleur_titres_pages }}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
              
                  <div className="flex justify-center space-x-2 pt-4 border-t">
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
                  </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
