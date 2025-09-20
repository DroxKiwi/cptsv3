# Base de Données CPTS des Mauges

## Vue d'ensemble

Ce projet constitue la brique de base de données (BDD) pour le site web de l'association CPTS des Mauges. Il s'agit d'une infrastructure PostgreSQL containerisée avec Docker, conçue pour gérer les données de l'association incluant les utilisateurs, articles, événements, profils professionnels, et autres contenus du site.

## Architecture du Projet

### Structure des Fichiers
```
bdd_CPTS_des_mauges/
├── docker-compose.yml          # Configuration Docker Compose
├── Dockerfile                  # Image Docker personnalisée
├── pg_hba.conf                # Configuration d'authentification PostgreSQL
├── destroy_docker.sh          # Script de nettoyage Docker
├── installdocker.sh           # Script d'installation Docker
├── installportainer.sh        # Script d'installation Portainer
└── scripts/
    ├── initDB.sh              # Script d'initialisation de la base
    ├── initdb.sql             # Schéma de base de données
    └── backupcommand.sh       # Script de sauvegarde (legacy)
```

## Configuration Docker

### Services Définis

#### Service `dbcpts` (Base de Données)
- **Image**: PostgreSQL 9.6
- **Port**: 5437 (mappé sur 5432 interne)
- **Réseau**: `cptsnet` (bridge, subnet: 10.5.0.0/16)
- **Mémoire partagée**: 128MB
- **Utilisateur**: postgres
- **Mot de passe**: toor
- **Nom du conteneur**: dbcpts

### Réseau Docker
- **Nom**: cptsnet
- **Type**: bridge
- **Subnet**: 10.5.0.0/16
- **Gateway**: 10.5.0.1

## Schéma de Base de Données

### Tables Principales

#### 1. Table `users`
Gestion des utilisateurs et authentification
```sql
- user_id (serial, PRIMARY KEY)
- username (varchar(255), UNIQUE, NOT NULL)
- accessToken (varchar(255))
- bearerToken (varchar(255))
- password (varchar(80))
- adminofurl (varchar(255))
- actif (boolean, DEFAULT TRUE)
```

#### 2. Table `articles`
Gestion des articles de contenu
```sql
- article_id (serial, PRIMARY KEY)
- name (varchar(255))
- subtitle (varchar(255))
- description (varchar)
- img (varchar)
- tagId (varchar(255))
- tecTimeInsert (timestamp)
- actif (boolean, DEFAULT TRUE)
```

#### 3. Table `events`
Gestion des événements
```sql
- event_id (serial, PRIMARY KEY)
- name (varchar(255))
- subtitle (varchar(255))
- description (varchar)
- img (varchar)
- tagId (varchar(255))
- startDate (timestamp)
- endDate (timestamp)
- tecTimeInsert (timestamp)
- actif (boolean, DEFAULT TRUE)
```

#### 4. Table `tags`
Système de tags pour catégorisation
```sql
- tag_id (serial, PRIMARY KEY)
- name (varchar(255), UNIQUE, NOT NULL)
- color (varchar(255))
- actif (boolean, DEFAULT TRUE)
```

#### 5. Table `prod` (Professionnels)
Gestion des professionnels de santé
```sql
- prod_id (serial, PRIMARY KEY)
- prof_ids (varchar, NOT NULL)
- name (varchar(255), UNIQUE, NOT NULL)
- img (varchar)
- actif (boolean, DEFAULT TRUE)
```

#### 6. Table `prof` (Profils)
Profils détaillés des professionnels
```sql
- prof_id (serial, PRIMARY KEY)
- name (varchar(255))
- subtitle (varchar(255))
- description (varchar)
- img (varchar)
- tecTimeInsert (timestamp)
- actif (boolean, DEFAULT TRUE)
```

#### 7. Table `patd` (Patients - Dossiers)
Dossiers patients
```sql
- patd_id (serial, PRIMARY KEY)
- patf_ids (varchar, NOT NULL)
- name (varchar(255), UNIQUE, NOT NULL)
- img (varchar)
- actif (boolean, DEFAULT TRUE)
```

#### 8. Table `patf` (Patients - Fichiers)
Fichiers patients
```sql
- patf_id (serial, PRIMARY KEY)
- name (varchar(255))
- subtitle (varchar(255))
- description (varchar)
- img (varchar)
- tecTimeInsert (timestamp)
- actif (boolean, DEFAULT TRUE)
```

#### 9. Table `pages`
Gestion des pages du site
```sql
- pages_id (serial, PRIMARY KEY)
- name (varchar(255), UNIQUE, NOT NULL)
- url (varchar(255), UNIQUE, NOT NULL)
```

#### 10. Table `globaldata`
Données globales de l'association
```sql
- globalData_id (serial, PRIMARY KEY)
- tel (varchar(14))
- adr (varchar(255))
- postalcode (varchar(5))
- facebook (varchar(255))
- linkedin (varchar(255))
- chiffrepsl (varchar(6))
- chiffrecom (varchar(6))
- chiffrehab (varchar(6))
- hommepageprjstext (varchar)
- quisommesnousmaintext (varchar)
- mail (varchar(255))
- adhererurl (varchar(255))
```

#### 11. Table `livret_pages`
Pages du livret d'information
```sql
- livret_pages_id (serial, PRIMARY KEY)
- numero_page (int)
- img (varchar)
```

#### 12. Table `coassos`
Coassociations partenaires
```sql
- coassos_id (serial, PRIMARY KEY)
- img (varchar)
- redirect_url (varchar(255))
```

#### 13. Table `orga`
Organisation et équipe
```sql
- orga_id (serial, PRIMARY KEY)
- name (varchar(255))
- img (varchar)
- role (varchar(255))
- description (varchar(255))
```

## Données d'Initialisation

### Utilisateurs Administrateurs
4 comptes administrateurs sont créés par défaut :
- **admin1** : Accès à cptsdesmauges.fr
- **admin2** : Accès à cptsdesmauges.fr
- **admin3** : Accès à cptsdesmauges.fr
- **admin4** : Accès à cptsdesmauges.fr

*Note* : Les mots de passe sont hashés avec bcrypt.

### Données Globales
Un enregistrement par défaut est créé avec :
- Email : cptsdesmauges@gmail.com
- Adresse : "adresse"
- Code postal : 49000
- Téléphone : "06"

## Scripts et Outils

### Scripts d'Installation
- **`installdocker.sh`** : Installation de Docker sur Debian/Ubuntu
- **`installportainer.sh`** : Installation de Portainer pour la gestion Docker

### Scripts de Gestion
- **`destroy_docker.sh`** : Nettoyage complet des conteneurs et images Docker
- **`scripts/initDB.sh`** : Initialisation de la base de données
- **`scripts/backupcommand.sh`** : Script de sauvegarde (version legacy)

## Installation et Démarrage

### Prérequis
- Docker et Docker Compose installés
- Accès en ligne de commande

### Démarrage Rapide
```bash
# Cloner le projet
git clone <repository-url>
cd bdd_CPTS_des_mauges

# Démarrer les services
docker-compose up -d

# Vérifier le statut
docker-compose ps
```

### Connexion à la Base de Données
```bash
# Connexion via psql
psql -h localhost -p 5437 -U postgres -d cpts

# Ou via Docker
docker exec -it dbcpts psql -U postgres -d cpts
```

## Configuration de Sécurité

### pg_hba.conf
Configuration d'authentification PostgreSQL :
```
host all all all
```
*Note* : Configuration permissive pour le développement. À restreindre en production.

### Variables d'Environnement
- `POSTGRES_USER=postgres`
- `POSTGRES_PASSWORD=toor`

*Attention* : Changer le mot de passe par défaut en production.

## Gestion des Données

### Sauvegarde
```bash
# Sauvegarde manuelle
docker exec dbcpts pg_dump -U postgres cpts > backup.sql

# Restauration
docker exec -i dbcpts psql -U postgres cpts < backup.sql
```

### Maintenance
```bash
# Nettoyage des logs
docker-compose logs --tail=100

# Redémarrage des services
docker-compose restart

# Arrêt complet
docker-compose down
```

## Intégration avec le Site Web

Cette base de données est conçue pour être utilisée par :
- **Frontend** : Interface utilisateur du site web
- **Backend** : API REST ou GraphQL
- **Système d'authentification** : Gestion des sessions utilisateurs
- **Gestion de contenu** : Articles, événements, pages
- **Gestion des professionnels** : Annuaire des professionnels de santé
- **Gestion des patients** : Dossiers patients (si applicable)

## Points d'Attention pour l'Évolution

### Sécurité
1. **Changer les mots de passe par défaut**
2. **Restreindre l'accès réseau** (pg_hba.conf)
3. **Implémenter SSL/TLS** pour les connexions
4. **Auditer les permissions** des utilisateurs

### Performance
1. **Indexer les colonnes** fréquemment utilisées
2. **Optimiser les requêtes** complexes
3. **Implémenter la pagination** pour les grandes tables
4. **Configurer le monitoring** des performances

### Évolutivité
1. **Planifier la migration** vers PostgreSQL plus récent
2. **Implémenter la réplication** pour la haute disponibilité
3. **Séparer les environnements** (dev/staging/prod)
4. **Documenter les migrations** de schéma

## Support et Maintenance

### Logs
```bash
# Logs du conteneur
docker logs dbcpts

# Logs avec suivi
docker logs -f dbcpts
```

### Monitoring
- Utiliser Portainer pour la gestion Docker
- Implémenter un monitoring de base de données (ex: pgAdmin)
- Surveiller l'utilisation des ressources

## Contact et Support

Pour toute question concernant cette infrastructure :
- **Email** : cptsdesmauges@gmail.com
- **Repository** : [Lien vers le repository Git]

---

*Documentation générée automatiquement - Dernière mise à jour : $(date)*
