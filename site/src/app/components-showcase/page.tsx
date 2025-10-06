'use client'

import { useDirectusAnimations } from '@/lib/animations/directus-integration'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { VisibleSection } from '@/components/ui/override-animated'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { 
  Heart, 
  Star, 
  Settings, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Download,
  Upload,
  Search,
  Filter,
  MoreHorizontal,
  ChevronDown,
  Check,
  X,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle
} from 'lucide-react'

export default function ComponentsShowcasePage() {
  const { animationsEnabled } = useDirectusAnimations()


  return (
    <div className="container mx-auto p-8 space-y-12">
      {/* Header */}
      <VisibleSection animationType="fade" delay={0} className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Composants UI Showcase
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Présentation complète des composants shadcn/ui disponibles pour votre projet
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <div className={`w-2 h-2 rounded-full ${animationsEnabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
          Animations {animationsEnabled ? 'activées' : 'désactivées'}
        </div>
      </VisibleSection>

      {/* Boutons */}
      <VisibleSection animationType="slideUp" delay={0.1} className="space-y-6">
        <h2 className="text-2xl font-semibold">Boutons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Bouton Principal</Button>
          <Button variant="secondary">Secondaire</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Lien</Button>
          <Button variant="destructive">Destructif</Button>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button size="sm">Petit</Button>
          <Button size="default">Normal</Button>
          <Button size="lg">Grand</Button>
          <Button size="icon"><Heart className="h-4 w-4" /></Button>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button disabled>Désactivé</Button>
          <Button><Download className="mr-2 h-4 w-4" />Avec icône</Button>
          <Button variant="outline"><Upload className="mr-2 h-4 w-4" />Upload</Button>
        </div>
      </VisibleSection>

      {/* Cartes */}
      <VisibleSection animationType="scale" delay={0.2} className="space-y-6">
        <h2 className="text-2xl font-semibold">Cartes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Carte Simple</CardTitle>
              <CardDescription>Description de la carte</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Contenu de la carte avec du texte d'exemple.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">Action</Button>
            </CardFooter>
          </Card>

          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Carte avec icône
              </CardTitle>
              <CardDescription>Carte avec une icône dans le titre</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Cette carte montre comment intégrer des icônes.</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
            <CardHeader>
              <CardTitle>Carte avec dégradé</CardTitle>
              <CardDescription>Fond avec dégradé subtil</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Une carte avec un fond dégradé pour plus d'impact visuel.</p>
            </CardContent>
          </Card>
        </div>
      </VisibleSection>

      {/* Badges */}
      <VisibleSection animationType="scale" delay={0.3} className="space-y-6">
        <h2 className="text-2xl font-semibold">Badges</h2>
        <div className="flex flex-wrap gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge className="bg-green-500 hover:bg-green-600">Custom</Badge>
          <Badge className="bg-purple-500 hover:bg-purple-600">Purple</Badge>
        </div>
      </VisibleSection>

      {/* Formulaires */}
      <VisibleSection animationType="slideLeft" delay={0.4} className="space-y-6">
        <h2 className="text-2xl font-semibold">Formulaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Champs de saisie</CardTitle>
              <CardDescription>Différents types de champs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" type="email" placeholder="votre@email.com" />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Mot de passe</label>
                <Input id="password" type="password" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea id="message" placeholder="Votre message..." />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sélecteur</CardTitle>
              <CardDescription>Menu déroulant de sélection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Pays</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un pays" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="be">Belgique</SelectItem>
                    <SelectItem value="ch">Suisse</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Ville</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une ville" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paris">Paris</SelectItem>
                    <SelectItem value="lyon">Lyon</SelectItem>
                    <SelectItem value="marseille">Marseille</SelectItem>
                    <SelectItem value="toulouse">Toulouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </VisibleSection>

      {/* Onglets */}
      <VisibleSection animationType="slideRight" delay={0.5} className="space-y-6">
        <h2 className="text-2xl font-semibold">Onglets</h2>
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">Compte</TabsTrigger>
            <TabsTrigger value="password">Mot de passe</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Compte</CardTitle>
                <CardDescription>
                  Gérez vos informations de compte et vos préférences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Nom</label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium">Nom d'utilisateur</label>
                  <Input id="username" defaultValue="@johndoe" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Mot de passe</CardTitle>
                <CardDescription>
                  Changez votre mot de passe ici.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="current" className="text-sm font-medium">Mot de passe actuel</label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="new" className="text-sm font-medium">Nouveau mot de passe</label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres</CardTitle>
                <CardDescription>
                  Configurez vos préférences d'application.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Mode sombre</label>
                    <p className="text-sm text-muted-foreground">
                      Activez le mode sombre pour l'interface
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Activer</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Notifications</label>
                    <p className="text-sm text-muted-foreground">
                      Recevez des notifications par email
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Configurer</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </VisibleSection>

      {/* Dialogues et Modales */}
      <VisibleSection animationType="scale" delay={0.6} className="space-y-6">
        <h2 className="text-2xl font-semibold">Dialogues et Modales</h2>
        <div className="flex flex-wrap gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Ouvrir Dialog</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="space-y-3">
                <DialogTitle>Confirmation</DialogTitle>
                <DialogDescription>
                  Êtes-vous sûr de vouloir effectuer cette action ? Cette action ne peut pas être annulée.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">Annuler</Button>
                <Button>Confirmer</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Ouvrir Sheet</Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
              <SheetHeader className="space-y-3 pb-6">
                <SheetTitle>Menu latéral</SheetTitle>
                <SheetDescription>
                  Ceci est un exemple de menu latéral avec navigation.
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-2 px-2">
                <Button variant="ghost" className="w-full justify-start h-12 px-4">
                  <User className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Profil</div>
                    <div className="text-sm text-muted-foreground">Gérer votre profil</div>
                  </div>
                </Button>
                <Button variant="ghost" className="w-full justify-start h-12 px-4">
                  <Settings className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Paramètres</div>
                    <div className="text-sm text-muted-foreground">Configuration</div>
                  </div>
                </Button>
                <Button variant="ghost" className="w-full justify-start h-12 px-4">
                  <Mail className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Messages</div>
                    <div className="text-sm text-muted-foreground">3 nouveaux messages</div>
                  </div>
                </Button>
                <Separator className="my-6" />
                <Button variant="ghost" className="w-full justify-start h-12 px-4">
                  <Calendar className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Calendrier</div>
                    <div className="text-sm text-muted-foreground">Voir les événements</div>
                  </div>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </VisibleSection>

      {/* Tableaux et Tooltips */}
      <VisibleSection animationType="fade" delay={0.7} className="space-y-6">
        <h2 className="text-2xl font-semibold">Tableaux et Tooltips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Tableau de données</CardTitle>
              <CardDescription>Exemple de tableau avec des données</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>John Doe</TableCell>
                    <TableCell>john@example.com</TableCell>
                    <TableCell><Badge variant="default">Actif</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Jane Smith</TableCell>
                    <TableCell>jane@example.com</TableCell>
                    <TableCell><Badge variant="secondary">Inactif</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bob Johnson</TableCell>
                    <TableCell>bob@example.com</TableCell>
                    <TableCell><Badge variant="outline">En attente</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tooltips</CardTitle>
              <CardDescription>Informations au survol</CardDescription>
            </CardHeader>
            <CardContent>
              <TooltipProvider>
                <div className="flex flex-wrap gap-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Survoler moi</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ceci est un tooltip d'information</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">
                        <Info className="mr-2 h-4 w-4" />
                        Aide
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Cliquez pour obtenir de l'aide</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">
                        <Settings className="mr-2 h-4 w-4" />
                        Paramètres
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Accéder aux paramètres</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </CardContent>
          </Card>
        </div>
      </VisibleSection>

      {/* Skeleton */}
      <VisibleSection animationType="slideUp" delay={0.8} className="space-y-6">
        <h2 className="text-2xl font-semibold">Skeleton (Chargement)</h2>
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
          </CardContent>
        </Card>
      </VisibleSection>

      {/* Footer */}
      <VisibleSection animationType="fade" delay={0.9} className="text-center py-8 border-t">
        <p className="text-gray-600">
          Tous ces composants sont disponibles et personnalisables pour votre projet.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Basé sur shadcn/ui avec des animations Framer Motion
        </p>
      </VisibleSection>
    </div>
  )
}
