'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Facebook, Linkedin } from "lucide-react"
import { usePiedDePage, useLogo, useEntete, useReseauxSociaux } from "@/hooks/useDirectus"
import Image from "next/image"

export function Footer() {
  const { piedDePage } = usePiedDePage()
  const { logo, loading: logoLoading } = useLogo()
  const { entete } = useEntete()
  const { reseauxSociaux } = useReseauxSociaux()
  const currentYear = new Date().getFullYear()

  // Navigation dynamique basée sur la table entete
  const navigation = [
    { name: entete?.titre_page_1 || "Qui sommes nous ?", href: "/qui-sommes-nous" },
    { name: entete?.titre_page_2 || "Bureau / CA", href: "/bureau-ca" },
    { name: entete?.titre_page_3 || "Nos projets / missions", href: "/projets-missions" },
    { name: entete?.titre_page_4 || "Nos actualités", href: "/actualites" },
    { name: entete?.titre_page_5 || "Agenda", href: "/evenements" },
    { name: "Partenaires", href: "/partenaires" },
    { name: entete?.titre_page_6 || "Je suis patient", href: "/patient" },
    { name: entete?.titre_page_7 || "Je suis professionnel", href: "/professionnel" },
    { name: entete?.titre_page_8 || "Comment adhérer ?", href: "/adherer" },
    { name: entete?.titre_page_9 || "Contacts", href: "/contact" },
  ]

  const footerLinks = {
    "Navigation": navigation.slice(0, 5), // Première moitié
    "Services": navigation.slice(5, 10), // Deuxième moitié
  }

  return (
    <footer 
      className="border-t" 
      style={{ 
        backgroundColor: piedDePage?.couleur_de_fond || 'var(--tertiary)',
        color: piedDePage?.couleur_texte || 'inherit'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* Mobile First: Stack vertical */}
        <div className="space-y-8 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 lg:gap-8">
          {/* Informations de contact - Toujours en premier */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3">
              {logoLoading ? (
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-200 animate-pulse flex-shrink-0"></div>
              ) : logo?.logo ? (
                <div className="relative h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                  <Image
                    src={logo.logo}
                    alt="Logo CPTS"
                    fill
                    sizes="(max-width: 640px) 32px, 40px"
                    className="object-contain"
                    onError={(e) => {
                      // Fallback vers le texte si l'image ne charge pas
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.parentElement!.innerHTML = '<div class="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0"><span class="text-primary-foreground font-bold text-sm sm:text-base">CPTS</span></div>'
                    }}
                  />
                </div>
              ) : (
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-bold text-sm sm:text-base">CPTS</span>
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: piedDePage?.couleur_texte || 'inherit' }} />
                <span style={{ color: piedDePage?.couleur_texte || 'inherit' }}>{piedDePage?.adresse || 'Région des Mauges, Maine-et-Loire'}</span>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: piedDePage?.couleur_texte || 'inherit' }} />
                <span style={{ color: piedDePage?.couleur_texte || 'inherit' }}>{piedDePage?.numero_telephone || '02 41 XX XX XX'}</span>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: piedDePage?.couleur_texte || 'inherit' }} />
                <span className="break-all" style={{ color: piedDePage?.couleur_texte || 'inherit' }}>{piedDePage?.mail || 'contact@cptsdesmauges.fr'}</span>
              </div>
            </div>
          </div>

          {/* Liens de navigation - Grid responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:col-span-2 lg:col-span-3">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="space-y-4">
                <h4 className="font-semibold text-sm sm:text-base" style={{ color: piedDePage?.couleur_texte || 'inherit' }}>{title}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-xs sm:text-sm hover:text-primary transition-colors block py-1"
                        style={{ color: piedDePage?.couleur_texte || 'inherit' }}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator 
          className="my-6 sm:my-8" 
          style={{ backgroundColor: piedDePage?.couleur_texte || 'inherit' }}
        />

        {/* Footer bottom - Mobile First */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
          <div className="text-xs sm:text-sm text-center sm:text-left" style={{ color: piedDePage?.couleur_texte || 'inherit' }}>
            © {currentYear} CPTS des Mauges. Tous droits réservés.
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            {reseauxSociaux && reseauxSociaux.length > 0 ? (
              reseauxSociaux.map((reseau) => (
                <Button key={reseau.id} variant="ghost" size="sm" asChild>
                  <Link 
                    href={reseau.redirection} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2" 
                    style={{ color: piedDePage?.couleur_texte || 'inherit' }}
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
                      <div 
                        className="h-4 w-4 rounded" 
                        style={{ backgroundColor: piedDePage?.couleur_texte || '#9CA3AF' }}
                      ></div>
                    )}
                    {reseau.nom_visible && (
                      <span className="text-xs sm:text-sm">{reseau.nom}</span>
                    )}
                  </Link>
                </Button>
              ))
            ) : (
              // Fallback si pas de réseaux sociaux
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/facebook" className="flex items-center space-x-2" style={{ color: piedDePage?.couleur_texte || 'inherit' }}>
                    <Facebook className="h-4 w-4" style={{ color: piedDePage?.couleur_texte || 'inherit' }} />
                    <span className="text-xs sm:text-sm">Facebook</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/linkedin" className="flex items-center space-x-2" style={{ color: piedDePage?.couleur_texte || 'inherit' }}>
                    <Linkedin className="h-4 w-4" style={{ color: piedDePage?.couleur_texte || 'inherit' }} />
                    <span className="text-xs sm:text-sm">LinkedIn</span>
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}