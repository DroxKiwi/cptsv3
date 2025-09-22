# Tables Directus - Guide de création (par ordre de dépendance)

## ÉTAPE 1 - Tables autonomes (sans relations)

### 1. Étiquettes
- `id` (Integer, PK)
- `nom` (String)
- `couleur` (Color)
- `description` (Text)

### 2. Logo
- `id` (Integer, PK)
- `logo` (File)
- `status` (Dropdown: published/draft/archived)
- `date_created` (DateTime)
- `date_updated` (DateTime)

### 3. Entête
- `id` (Integer, PK)
- `titre` (String)
- `sous_titre` (String)
- `titre_page_1` (String)
- `titre_page_2` (String)
- `titre_page_3` (String)
- `titre_page_4` (String)
- `titre_page_5` (String)
- `titre_page_6` (String)
- `titre_page_7` (String)
- `titre_page_8` (String)
- `titre_page_9` (String)
- `couleur_de_fond` (Color)
- `couleur_titre` (Color)
- `couleur_sous_titre` (Color)
- `couleur_titres_pages` (Color)
- `opacite` (Decimal)
- `status` (Dropdown: published/draft/archived)
- `date_created` (DateTime)
- `date_updated` (DateTime)

### 4. Boutons
- `id` (Integer, PK)
- `status` (Dropdown: published/draft/archived)
- `user_created` (User)
- `date_created` (DateTime)
- `user_updated` (User)
- `date_updated` (DateTime)
- `couleur_texte` (Color)
- `couleur_fond` (Color)
- `couleur_bordure` (Color)
- `epaisseur_bordures` (String)
- `survol_type` (Dropdown: agrandissement/changement_de_couleur_de_fond/ombre_portee/changement_opacite/deplacement_vers_le_haut/rotation_legere)

### 5. Partenaires
- `id` (Integer, PK)
- `status` (Dropdown: published/draft/archived)
- `sort` (Sort)
- `user_created` (User)
- `date_created` (DateTime)
- `user_updated` (User)
- `date_updated` (DateTime)
- `nom` (String)
- `logo` (File)
- `description` (Text)
- `redirection` (String)

### 6. Pied de page
- `id` (Integer, PK)
- `status` (Dropdown: published/draft/archived)
- `user_created` (User)
- `date_created` (DateTime)
- `user_updated` (User)
- `date_updated` (DateTime)
- `couleur_de_fond` (Color)
- `couleur_texte` (Color)
- `numero_telephone` (String)
- `adresse` (Text)
- `mail` (String)

### 7. Réseaux sociaux
- `id` (Integer, PK)
- `status` (Dropdown: published/draft/archived)
- `sort` (Sort)
- `user_created` (User)
- `date_created` (DateTime)
- `user_updated` (User)
- `date_updated` (DateTime)
- `nom` (String)
- `visible` (Boolean)
- `redirection` (String)
- `logo` (File)

### 8. Chiffres clés
- `id` (Integer, PK)
- `status` (Dropdown: published/draft/archived)
- `user_created` (User)
- `date_created` (DateTime)
- `user_updated` (User)
- `date_updated` (DateTime)
- `professionnels` (String)
- `communes` (String)
- `habitants` (String)

### 9. Présentation
- `id` (Integer, PK)
- `status` (Dropdown: published/draft/archived)
- `user_created` (User)
- `date_created` (DateTime)
- `user_updated` (User)
- `date_updated` (DateTime)
- `titre_principal` (String)
- `image_principale` (File)
- `test_editeur_avance` (WYSIWYG)

### 10. Réglages généraux
- `id` (Integer, PK)
- `status` (Dropdown: published/draft/archived)
- `user_created` (User)
- `date_created` (DateTime)
- `user_updated` (User)
- `date_updated` (DateTime)
- `polices_ecriture_titre` (String)
- `polices_ecriture_sous_titre` (String)
- `polices_ecriture_corps` (String)
- `polices_ecriture_indication` (String)
- `taille_polices_titre` (String)
- `taille_polices_sous_titre` (String)
- `taille_polices_corps` (String)
- `taille_polices_indication` (String)
- `epaisseur_titre` (String)
- `epaisseur_sous_titre` (String)
- `epaisseur_corps` (String)
- `epaisseur_indication` (String)
- `couleur_titre` (Color)
- `couleur_sous_titre` (Color)
- `couleur_corps` (Color)
- `couleur_indication` (Color)
- `couleur_primaire` (Color)
- `couleur_secondaire` (Color)
- `couleur_tertiaire` (Color)
- `epaisseur_bordures` (String)
- `couleur_ombrage` (Color)
- `epaisseur_ombrage` (String)
- `ombrage` (Boolean)

## ÉTAPE 2 - Tables avec relations simples

### 11. Projets
- `id` (UUID, PK)
- `titre` (String)
- `sous_titre` (String)
- `description` (Text)
- `icone` (File)
- `couleur` (Color)
- `couleur_texte` (Color)
- `status` (Dropdown: published/draft/archived)
- `sort` (Sort)
- `user_created` (User)
- `date_created` (DateTime)
- `user_updated` (User)
- `date_updated` (DateTime)

### 12. Missions
- `id` (UUID, PK)
- `titre` (String)
- `sous_titre` (String)
- `description` (Text)
- `projet_id` (Many-to-Any → Projets)
- `status` (Dropdown: published/draft/archived)
- `sort` (Sort)
- `user_created` (User)
- `date_created` (DateTime)
- `user_updated` (User)
- `date_updated` (DateTime)

## ÉTAPE 3 - Tables avec relations M2M

### 13. Articles
- `id` (Integer, PK)
- `titre` (String)
- `resume` (Text)
- `contenu` (WYSIWYG)
- `excerpt` (Text)
- `featured_image` (File)
- `image` (File)
- `couleur_de_fond` (Color)
- `couleur_texte` (Color)
- `status` (Dropdown: published/draft/archived)
- `date_created` (DateTime)
- `date_updated` (DateTime)
- `etiquettes` (Many-to-Many → Étiquettes)

### 14. Événements
- `id` (Integer, PK)
- `titre` (String)
- `resume` (Text)
- `contenu` (WYSIWYG)
- `image` (File)
- `couleur_de_fond` (Color)
- `couleur_texte` (Color)
- `etiquettes` (Many-to-Many → Étiquettes)
- `accueil_id` (Many-to-Any → Accueil)
- `date_debut` (DateTime)
- `date_fin` (DateTime)
- `status` (Dropdown: published/draft/archived)
- `sort` (Sort)
- `user_created` (User)
- `date_created` (DateTime)
- `user_updated` (User)
- `date_updated` (DateTime)

## ÉTAPE 4 - Table finale avec relations complexes

### 15. Accueil
- `id` (Integer, PK)
- `status` (Dropdown: published/draft/archived)
- `user_created` (User)
- `date_created` (DateTime)
- `user_updated` (User)
- `date_updated` (DateTime)
- `articles_a_la_une` (Many-to-Many → Articles)
- `evenements_a_la_une` (Many-to-Many → Événements)
- `titre_principal` (String)
- `contenu_principal` (WYSIWYG)
- `titre_projets` (String)
- `contenu_projets` (WYSIWYG)
- `titre_actualites` (String)
- `contenu_actualites` (WYSIWYG)
- `titre_evenements` (String)
- `contenu_evenements` (WYSIWYG)
- `titre_informations` (String)
- `contenu_informations` (WYSIWYG)
- `titre_partenaires` (String)
- `contenu_partenaires` (WYSIWYG)

---

## 🔗 Relations à créer APRÈS les tables

### 1. Articles ↔ Étiquettes (Many-to-Many)
- Créer la relation après avoir créé les 2 tables
- Table de liaison automatique : `articles_etiquettes`

### 2. Événements ↔ Étiquettes (Many-to-Many)
- Créer la relation après avoir créé les 2 tables
- Table de liaison automatique : `evenements_etiquettes`

### 3. Projets → Missions (One-to-Many via Many-to-Any)
- Créer la relation après avoir créé les 2 tables
- Champ `projet_id` dans Missions pointe vers Projets

### 4. Accueil → Articles (Many-to-Many)
- Créer la relation après avoir créé les 2 tables
- Table de liaison automatique : `accueil_articles_a_la_une`

### 5. Accueil → Événements (Many-to-Many)
- Créer la relation après avoir créé les 2 tables
- Table de liaison automatique : `accueil_evenements_a_la_une`

### 6. Événements → Accueil (Many-to-Any)
- Créer la relation après avoir créé les 2 tables
- Champ `accueil_id` dans Événements pointe vers Accueil

---

## 📝 Instructions de création

1. **Créer les tables dans l'ordre** (ÉTAPE 1 → 2 → 3 → 4)
2. **Créer les relations** après avoir créé toutes les tables
3. **Tester les relations** en ajoutant quelques données de test
4. **Vérifier les permissions** pour chaque collection
