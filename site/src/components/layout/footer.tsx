import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Facebook, Linkedin } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    "Navigation": [
      { name: "Accueil", href: "/" },
      { name: "À propos", href: "/about" },
      { name: "Services", href: "/services" },
      { name: "Actualités", href: "/news" },
      { name: "Contact", href: "/contact" },
    ],
    "Services": [
      { name: "Médecine générale", href: "/services/medecine-generale" },
      { name: "Spécialistes", href: "/services/specialistes" },
      { name: "Soins infirmiers", href: "/services/soins-infirmiers" },
      { name: "Pharmacie", href: "/services/pharmacie" },
      { name: "Urgences", href: "/services/urgences" },
    ],
    "Ressources": [
      { name: "Documentation", href: "/resources/documentation" },
      { name: "Formulaires", href: "/resources/formulaires" },
      { name: "FAQ", href: "/faq" },
      { name: "Mentions légales", href: "/legal" },
      { name: "Politique de confidentialité", href: "/privacy" },
    ]
  }

  return (
    <footer className="border-t" style={{ backgroundColor: 'var(--tertiary)' }}>
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Informations de contact */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">CPTS</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">CPTS des Mauges</h3>
                <p className="text-sm text-muted-foreground">Communauté Professionnelle Territoriale de Santé</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Région des Mauges, Maine-et-Loire</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>02 41 XX XX XX</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>contact@cptsdesmauges.fr</span>
              </div>
            </div>
          </div>

          {/* Liens de navigation */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="font-semibold text-sm">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-center sm:text-left">
          <div className="text-sm text-muted-foreground">
            © {currentYear} CPTS des Mauges. Tous droits réservés.
          </div>
          
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/facebook">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/linkedin">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
