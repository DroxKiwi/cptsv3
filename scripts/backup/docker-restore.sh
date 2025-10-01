#!/bin/bash
# Script de restauration robuste pour Directus avec Docker
# Usage: ./docker-restore.sh <backup_folder>

set -e  # Arrêter en cas d'erreur

if [ -z "$1" ]; then
    echo "❌ Usage: $0 <backup_folder>"
    echo "💡 Exemple: $0 ./backups/directus_backup_20241201_143000"
    exit 1
fi

BACKUP_PATH="$1"

if [ ! -d "$BACKUP_PATH" ]; then
    echo "❌ Dossier de sauvegarde introuvable: $BACKUP_PATH"
    exit 1
fi

echo "🔄 Restauration depuis: $BACKUP_PATH"

# 1. Arrêter les containers
echo "⏹️ Arrêt des containers..."
docker-compose -f docker-compose.dev.yml down

# 2. Redémarrer les containers
echo "🚀 Démarrage des containers..."
docker-compose -f docker-compose.dev.yml up -d

# Attendre que les services soient prêts
echo "⏳ Attente du démarrage des services..."
sleep 30

# 3. Restaurer le schéma Directus
if [ -f "$BACKUP_PATH/schema.yaml" ]; then
    echo "📋 Restauration du schéma..."
    docker cp "$BACKUP_PATH/schema.yaml" cpts_directus_dev:/directus/schema.yaml
    docker exec cpts_directus_dev npx directus schema apply /directus/schema.yaml
else
    echo "⚠️ Fichier schema.yaml non trouvé, utilisation du dump PostgreSQL"
fi

# 4. Restaurer les données PostgreSQL
if [ -f "$BACKUP_PATH/postgres_dump.sql" ]; then
    echo "💾 Restauration des données PostgreSQL..."
    docker exec -i cpts_postgres_dev psql -U postgres -d directus --set=client_encoding=UTF8 < "$BACKUP_PATH/postgres_dump.sql"
else
    echo "❌ Fichier postgres_dump.sql non trouvé"
    exit 1
fi

# 5. Restaurer les uploads
if [ -f "$BACKUP_PATH/uploads.tar.gz" ]; then
    echo "📁 Restauration des uploads..."
    docker run --rm -v cpts_directus_uploads:/data -v "$(pwd)/$BACKUP_PATH:/backup" alpine tar xzf /backup/uploads.tar.gz -C /data
else
    echo "⚠️ Fichier uploads.tar.gz non trouvé"
fi

# 6. Redémarrer Directus
echo "🔄 Redémarrage de Directus..."
docker-compose -f docker-compose.dev.yml restart directus

echo "✅ Restauration terminée!"
echo "🌐 Directus disponible sur: http://localhost:3001"
