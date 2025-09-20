# API CPTS des Mauges

## Description

Cette API FastAPI constitue la brique backend d'un site web pour la Communauté Professionnelle Territoriale de Santé (CPTS) des Mauges. Elle fournit tous les endpoints nécessaires pour la gestion du contenu, des utilisateurs, et des données de l'organisation.

## Architecture

### Structure du projet

```
api_CPTS_des_mauges/
├── main.py                 # Point d'entrée principal de l'API
├── auth.py                 # Module d'authentification et sécurité
├── admin/                  # Gestion des administrateurs
├── articles/               # Gestion des articles
├── events/                 # Gestion des événements
├── tags/                   # Gestion des tags/catégories
├── prods/                  # Gestion des dossiers et documents professionnels
├── patds/                  # Gestion des dossiers et documents patients
├── globaldatas/            # Données globales de l'organisation
├── orgas/                  # Gestion des organisations
├── livret_pages/           # Gestion des pages du livret
├── coassos/                # Gestion des coassociations
├── pages/                  # Gestion des pages du site
├── requirements.txt        # Dépendances Python
├── docker-compose.yml      # Configuration Docker Compose
├── Dockerfile             # Configuration Docker
└── CPTSdal-1.0.1-py3-none-any.whl  # Bibliothèque DAL personnalisée
```

## Technologies utilisées

- **FastAPI** 0.104.0 - Framework web moderne et rapide
- **Python** 3.9 - Langage de programmation
- **PyMySQL** 1.1.0 - Connecteur MySQL
- **Pydantic** 2.6.1 - Validation des données
- **JWT** (python-jose) - Authentification par tokens
- **bcrypt** - Hachage des mots de passe
- **Docker** - Containerisation
- **Uvicorn** - Serveur ASGI

## Configuration et déploiement

### Variables d'environnement

L'API utilise une base de données MySQL externe via le réseau `cptsnet`. La configuration de connexion est gérée par la bibliothèque DAL personnalisée `CPTSdal`.

### Docker

```bash
# Construction et démarrage
docker-compose up --build

# Démarrage en arrière-plan
docker-compose up -d
```

L'API est accessible sur le port **8001**.

### CORS

L'API est configurée pour accepter les requêtes depuis :
- `http://localhost:3000` et `http://localhost:3001` (développement)
- `https://www.cptsdesmauges.fr` et `http://www.cptsdesmauges.fr`
- `https://cptsdesmauges.fr` et `http://cptsdesmauges.fr`

## Authentification

### Système de tokens

L'API utilise un système d'authentification à double niveau :

1. **Access Token** : Token unique généré lors de la connexion
2. **Bearer Token** : Token JWT pour les requêtes authentifiées

### Endpoints d'authentification

#### POST `/user/authent`
Authentification utilisateur avec nom d'utilisateur et mot de passe.

**Paramètres :**
- `username` (Form) : Nom d'utilisateur
- `password` (Form) : Mot de passe

**Réponse :**
```json
[{"accesstoken": "uuid-token"}]
```

#### POST `/user/token`
Vérification et récupération des informations utilisateur via access token.

**Paramètres :**
- `accesstoken` (Form) : Token d'accès

**Réponse :**
```json
[{
  "user_id": 1,
  "username": "admin",
  "adminofurl": "url",
  "accesstoken": "uuid-token",
  "bearertoken": {...},
  "actif": true
}]
```

#### POST `/token`
Génération d'un bearer token JWT via OAuth2.

#### POST `/refresh/token`
Rafraîchissement d'un bearer token.

## Modules et Endpoints

### 1. Administration (`/admin`)

Gestion des utilisateurs administrateurs.

#### GET `/admin/getadmin`
Récupère la liste de tous les administrateurs.

**Authentification :** Requise

#### POST `/admin/new`
Crée un nouvel utilisateur administrateur.

**Paramètres :**
- `username` (Form) : Nom d'utilisateur
- `password` (Form) : Mot de passe
- `idrole` (Form) : ID du rôle

**Authentification :** Requise

### 2. Articles (`/articles`)

Gestion des articles du site.

#### GET `/articles/all`
Récupère tous les articles.

#### GET `/articles/byid/{article_id}`
Récupère un article par son ID.

#### POST `/articles/new`
Crée un nouvel article.

**Authentification :** Requise

#### POST `/articles/remove`
Supprime un article.

**Paramètres :**
- `article_id` (Form) : ID de l'article

**Authentification :** Requise

#### POST `/articles/update`
Met à jour un article.

**Paramètres :**
- `article_id` (Form) : ID de l'article
- `name` (Form) : Nom de l'article
- `subtitle` (Form) : Sous-titre
- `description` (Form) : Description
- `img` (Form) : Image (base64)
- `tagid` (Form) : ID du tag
- `actif` (Form) : Statut actif

**Authentification :** Requise

### 3. Événements (`/events`)

Gestion des événements.

#### GET `/events/all`
Récupère tous les événements.

#### GET `/events/byid/{event_id}`
Récupère un événement par son ID.

#### POST `/events/new`
Crée un nouvel événement.

**Authentification :** Requise

#### POST `/events/remove`
Supprime un événement.

**Paramètres :**
- `event_id` (Form) : ID de l'événement

**Authentification :** Requise

#### POST `/events/update`
Met à jour un événement.

**Paramètres :**
- `event_id` (Form) : ID de l'événement
- `name` (Form) : Nom de l'événement
- `subtitle` (Form) : Sous-titre
- `description` (Form) : Description
- `img` (Form) : Image (base64)
- `tagid` (Form) : ID du tag
- `startdate` (Form) : Date de début
- `enddate` (Form) : Date de fin
- `actif` (Form) : Statut actif

**Authentification :** Requise

### 4. Tags (`/tags`)

Gestion des tags/catégories.

#### GET `/tags/all`
Récupère tous les tags.

#### GET `/tags/byid/{tag_id}`
Récupère un tag par son ID.

#### POST `/tags/new`
Crée un nouveau tag.

**Paramètres :**
- `name` (Form) : Nom du tag
- `color` (Form) : Couleur du tag
- `actif` (Form) : Statut actif

**Authentification :** Requise

#### POST `/tags/update`
Met à jour un tag.

**Paramètres :**
- `tag_id` (Form) : ID du tag
- `name` (Form) : Nom du tag
- `color` (Form) : Couleur du tag
- `actif` (Form) : Statut actif

**Authentification :** Requise

### 5. Dossiers Professionnels (`/prods`)

Gestion des dossiers et documents professionnels.

#### Dossiers

#### GET `/prods/all`
Récupère tous les dossiers professionnels.

#### GET `/prods/byid/{prod_id}`
Récupère un dossier par son ID.

#### POST `/prods/new`
Crée un nouveau dossier.

**Authentification :** Requise

#### POST `/prods/remove`
Supprime un dossier.

**Paramètres :**
- `prod_id` (Form) : ID du dossier

**Authentification :** Requise

#### POST `/prods/update`
Met à jour un dossier.

**Paramètres :**
- `prod_id` (Form) : ID du dossier
- `prof_ids` (Form) : IDs des documents associés
- `name` (Form) : Nom du dossier
- `img` (Form) : Image (base64)
- `actif` (Form) : Statut actif

**Authentification :** Requise

#### Documents Professionnels

#### GET `/prods/prof/all`
Récupère tous les documents professionnels.

#### GET `/prods/prof/byid/{prof_id}`
Récupère un document par son ID.

#### POST `/prods/prof/new`
Crée un nouveau document professionnel.

**Authentification :** Requise

#### POST `/prods/prof/remove`
Supprime un document professionnel.

**Paramètres :**
- `prof_id` (Form) : ID du document

**Authentification :** Requise

#### POST `/prods/prof/update`
Met à jour un document professionnel.

**Paramètres :**
- `prof_id` (Form) : ID du document
- `name` (Form) : Nom du document
- `subtitle` (Form) : Sous-titre
- `description` (Form) : Description
- `img` (Form) : Image (base64)
- `actif` (Form) : Statut actif

**Authentification :** Requise

### 6. Dossiers Patients (`/patds`)

Gestion des dossiers et documents patients.

#### Dossiers Patients

#### GET `/patds/all`
Récupère tous les dossiers patients.

#### GET `/patds/byid/{patd_id}`
Récupère un dossier par son ID.

#### POST `/patds/new`
Crée un nouveau dossier patient.

**Authentification :** Requise

#### POST `/patds/remove`
Supprime un dossier patient.

**Paramètres :**
- `patd_id` (Form) : ID du dossier

**Authentification :** Requise

#### POST `/patds/update`
Met à jour un dossier patient.

**Paramètres :**
- `patd_id` (Form) : ID du dossier
- `patf_ids` (Form) : IDs des fichiers associés
- `name` (Form) : Nom du dossier
- `img` (Form) : Image (base64)
- `actif` (Form) : Statut actif

**Authentification :** Requise

#### Fichiers Patients

#### GET `/patds/patf/all`
Récupère tous les fichiers patients.

#### GET `/patds/patf/byid/{patf_id}`
Récupère un fichier par son ID.

#### POST `/patds/patf/new`
Crée un nouveau fichier patient.

**Authentification :** Requise

#### POST `/patds/patf/remove`
Supprime un fichier patient.

**Paramètres :**
- `patf_id` (Form) : ID du fichier

**Authentification :** Requise

#### POST `/patds/patf/update`
Met à jour un fichier patient.

**Paramètres :**
- `patf_id` (Form) : ID du fichier
- `name` (Form) : Nom du fichier
- `subtitle` (Form) : Sous-titre
- `description` (Form) : Description
- `img` (Form) : Image (base64)
- `actif` (Form) : Statut actif

**Authentification :** Requise

### 7. Données Globales (`/globaldatas`)

Gestion des informations globales de l'organisation.

#### GET `/globaldatas/all`
Récupère toutes les données globales.

#### POST `/globaldatas/update`
Met à jour les données globales.

**Paramètres :**
- `globaldata_id` (Form) : ID des données
- `tel` (Form) : Téléphone
- `adr` (Form) : Adresse
- `postalcode` (Form) : Code postal
- `facebook` (Form) : URL Facebook
- `linkedin` (Form) : URL LinkedIn
- `chiffrepsl` (Form) : Chiffre PSL
- `chiffrecom` (Form) : Chiffre COM
- `chiffrehab` (Form) : Chiffre HAB
- `hommepageprjstext` (Form) : Texte page d'accueil projets
- `quisommesnousmaintext` (Form) : Texte principal "Qui sommes-nous"
- `mail` (Form) : Email
- `adhererurl` (Form) : URL d'adhésion

**Authentification :** Requise

### 8. Pages du Livret (`/livretpages`)

Gestion des pages du livret numérique.

#### GET `/livretpages/all`
Récupère toutes les pages du livret (triées par numéro de page).

#### GET `/livretpages/byid/{livret_pages_id}`
Récupère une page par son ID.

#### POST `/livretpages/new`
Crée une nouvelle page de livret.

**Authentification :** Requise

#### POST `/livretpages/remove`
Supprime une page de livret.

**Paramètres :**
- `livret_pages_id` (Form) : ID de la page

**Authentification :** Requise

#### POST `/livretpages/update`
Met à jour une page de livret.

**Paramètres :**
- `livret_pages_id` (Form) : ID de la page
- `numero_page` (Form) : Numéro de la page
- `img` (Form) : Image de la page (base64)

**Authentification :** Requise

### 9. Coassociations (`/coassos`)

Gestion des partenaires/coassociations.

#### GET `/coassos/all`
Récupère toutes les coassociations.

#### POST `/coassos/new`
Crée une nouvelle coassociation.

**Authentification :** Requise

#### POST `/coassos/remove`
Supprime une coassociation.

**Paramètres :**
- `coassos_id` (Form) : ID de la coassociation

**Authentification :** Requise

#### POST `/coassos/update`
Met à jour une coassociation.

**Paramètres :**
- `coassos_id` (Form) : ID de la coassociation
- `img` (Form) : Logo (base64)
- `redirect_url` (Form) : URL de redirection

**Authentification :** Requise

### 10. Pages (`/pages`)

Gestion des pages du site.

#### GET `/pages/all`
Récupère toutes les pages.

**Authentification :** Requise

#### POST `/pages/new`
Crée une nouvelle page.

**Paramètres :**
- `name` (Form) : Nom de la page
- `url` (Form) : URL de la page

**Authentification :** Requise

## Modèles de données

### Article
```json
{
  "article_id": 1,
  "name": "Titre de l'article",
  "subtitle": "Sous-titre",
  "description": "Description complète",
  "img": "data:image/png;base64,...",
  "tagid": 1,
  "tectimeinsert": "2024-01-01T00:00:00",
  "actif": true
}
```

### Événement
```json
{
  "event_id": 1,
  "name": "Nom de l'événement",
  "subtitle": "Sous-titre",
  "description": "Description",
  "img": "data:image/png;base64,...",
  "tagid": 1,
  "startdate": "2024-01-01T00:00:00",
  "enddate": "2024-01-02T00:00:00",
  "tectimeinsert": "2024-01-01T00:00:00",
  "actif": true
}
```

### Tag
```json
{
  "tag_id": 1,
  "name": "Nom du tag",
  "color": "#FF0000",
  "actif": true
}
```

### Données Globales
```json
{
  "globaldata_id": 1,
  "tel": "02 41 00 00 00",
  "adr": "Adresse complète",
  "postalcode": "49000",
  "facebook": "https://facebook.com/...",
  "linkedin": "https://linkedin.com/...",
  "chiffrepsl": 100,
  "chiffrecom": 50,
  "chiffrehab": 200,
  "hommepageprjstext": "Texte projets",
  "quisommesnousmaintext": "Texte principal",
  "mail": "contact@cptsdesmauges.fr",
  "adhererurl": "https://adhesion.com"
}
```

## Sécurité

### Authentification
- Système de tokens JWT avec expiration (480 minutes)
- Hachage des mots de passe avec bcrypt
- Validation des tokens sur chaque requête protégée

### CORS
- Configuration restrictive des origines autorisées
- Support des credentials

### Gestion des erreurs
- Codes de statut HTTP appropriés
- Messages d'erreur en français
- Gestion des exceptions avec logging

## Base de données

L'API utilise une base de données MySQL via une bibliothèque DAL personnalisée (`CPTSdal`). Les tables principales incluent :

- `tusers` - Utilisateurs et administrateurs
- `tarticles` - Articles
- `tevents` - Événements
- `ttags` - Tags/catégories
- `tprod` - Dossiers professionnels
- `tprof` - Documents professionnels
- `tpatd` - Dossiers patients
- `tpatf` - Fichiers patients
- `tglobaldata` - Données globales
- `tlivret_pages` - Pages du livret
- `tcoassos` - Coassociations
- `tpages` - Pages du site

## Développement

### Installation locale

```bash
# Cloner le repository
git clone <repository-url>
cd api_CPTS_des_mauges

# Installer les dépendances
pip install -r requirements.txt
pip install CPTSdal-1.0.1-py3-none-any.whl

# Démarrer l'API
uvicorn main:main --host 0.0.0.0 --port 8001 --reload
```

### Tests

L'API expose une documentation interactive via Swagger UI :
- URL : `http://localhost:8001/docs`
- Alternative : `http://localhost:8001/redoc`

### Endpoint de test

#### GET `/test`
Vérifie que l'API est accessible.

**Réponse :**
```
"API joignable"
```

## Maintenance

### Génération de mots de passe

Le fichier `generatepsw.py` contient des utilitaires pour générer des mots de passe hachés pour les administrateurs.

### Logs

L'API utilise le système de logging Python standard. Les erreurs sont affichées dans la console et peuvent être redirigées vers un système de monitoring.

### Monitoring

L'API est configurée pour fonctionner avec Sentry pour le monitoring des erreurs en production.

## Contact

**Développeur :** Corentin Fredj  
**Email :** corentinfredj.dev@gmail.com

---

*Cette API constitue la brique backend du site web de la CPTS des Mauges et fournit toutes les fonctionnalités nécessaires à la gestion du contenu et des utilisateurs.*
