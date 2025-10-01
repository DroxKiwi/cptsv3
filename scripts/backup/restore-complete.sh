#!/bin/bash
# Script de restauration complète et robuste pour Directus avec Docker
# Usage: ./restore-complete.sh <backup_folder> [dev|prod]

set -e  # Arrêter en cas d'erreur

if [ -z "$1" ]; then
    echo "❌ Usage: $0 <backup_folder> [dev|prod]"
    echo "💡 Exemple: $0 ./backups/directus_backup_20241201_143000 dev"
    exit 1
fi

BACKUP_PATH="$1"
ENVIRONMENT="${2:-dev}"

if [ ! -d "$BACKUP_PATH" ]; then
    echo "❌ Dossier de sauvegarde introuvable: $BACKUP_PATH"
    exit 1
fi

echo "🔄 Restauration depuis: $BACKUP_PATH (Environment: $ENVIRONMENT)"

# Configuration selon l'environnement
if [ "$ENVIRONMENT" = "prod" ]; then
    COMPOSE_FILE="docker-compose.yml"
    POSTGRES_CONTAINER="cpts_postgres_directus_dev"
    DIRECTUS_CONTAINER="cpts_directus_dev"
    UPLOADS_VOLUME="cptsv3_directus_uploads_dev"
else
    COMPOSE_FILE="docker-compose.dev.yml"
    POSTGRES_CONTAINER="cpts_postgres_directus_dev"
    DIRECTUS_CONTAINER="cpts_directus_dev"
    UPLOADS_VOLUME="cptsv3_directus_uploads_dev"
fi

# Confirmation avant suppression des volumes
echo "⚠️  ATTENTION: Cette opération va supprimer les volumes existants!"
echo "📦 Volumes qui seront supprimés:"
echo "   - cptsv3_postgres_directus_data_dev"
echo "   - $UPLOADS_VOLUME"
echo ""
read -p "Êtes-vous sûr de vouloir continuer? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Opération annulée"
    exit 0
fi

# Fonction principale
main() {
    # 1. Arrêt et suppression des containers/volumes
    echo "⏹️ Arrêt des containers..."
    docker-compose -f "$COMPOSE_FILE" down
    
    echo "🗑️ Suppression des volumes..."
    docker volume rm cptsv3_postgres_directus_data_dev -f 2>/dev/null || true
    docker volume rm "$UPLOADS_VOLUME" -f 2>/dev/null || true
    
    # 2. Relance du docker-compose
    echo "🚀 Relance du docker-compose ($ENVIRONMENT)..."
    docker-compose -f "$COMPOSE_FILE" up -d
    
    # 3. Attente que Directus soit prêt
    echo "⏳ Attente que Directus soit prêt..."
    sleep 15
    
    # Vérification que le container est en cours d'exécution
    if docker ps --filter "name=$DIRECTUS_CONTAINER" --format "{{.Status}}" | grep -q "Up"; then
        echo "✅ Directus est en cours d'exécution!"
    else
        echo "❌ Directus n'est pas en cours d'exécution!"
        echo "🔍 Vérifiez les logs: docker logs $DIRECTUS_CONTAINER"
        exit 1
    fi
    
    # 4. Vider complètement la base de données
    echo "🗑️ Vidage complet de la base de données..."
    docker exec "$POSTGRES_CONTAINER" psql -U admin -d directus -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
    echo "✅ Base de données vidée!"
    
    # 5. Injection du dump complet
    echo "💾 Injection du dump PostgreSQL..."
    if [ -f "$BACKUP_PATH/postgres_dump.sql" ]; then
        docker exec -i "$POSTGRES_CONTAINER" psql -U admin -d directus --set=client_encoding=UTF8 < "$BACKUP_PATH/postgres_dump.sql"
        echo "✅ Dump PostgreSQL injecté!"
    else
        echo "❌ postgres_dump.sql non trouvé!"
        exit 1
    fi
    
    # 6. Correction des permissions Directus
    echo "🔧 Correction des permissions Directus..."
    
    # 6.1. Corriger les politiques pour permettre l'accès admin et app
    echo "   - Correction des politiques..."
    docker exec "$POSTGRES_CONTAINER" psql -U admin -d directus -c "
        UPDATE directus_policies 
        SET admin_access = true, app_access = true 
        WHERE admin_access = false OR app_access = false;
    "
    
    # 6.2. S'assurer que le rôle Administrator a accès à la politique public
    echo "   - Correction des accès..."
    docker exec "$POSTGRES_CONTAINER" psql -U admin -d directus -c "
        INSERT INTO directus_access (role, collection, action, permissions, validation, presets, fields)
        SELECT '39e9ca7c-2435-43bd-afc6-d0c74407cbb0', 'public', 'read', '{}', '{}', '{}', '*'
        WHERE NOT EXISTS (
            SELECT 1 FROM directus_access 
            WHERE role = '39e9ca7c-2435-43bd-afc6-d0c74407cbb0' 
            AND collection = 'public' 
            AND action = 'read'
        );
    "
    
    # 6.3. Ajouter les permissions manquantes pour toutes les collections
    echo "   - Ajout des permissions manquantes..."
    docker exec "$POSTGRES_CONTAINER" psql -U admin -d directus -c "
        INSERT INTO directus_permissions (role, collection, action, permissions, validation, presets, fields)
        SELECT '39e9ca7c-2435-43bd-afc6-d0c74407cbb0', collection, 'create', '{}', '{}', '{}', '*'
        FROM directus_collections 
        WHERE collection NOT LIKE 'directus_%'
        AND NOT EXISTS (
            SELECT 1 FROM directus_permissions 
            WHERE role = '39e9ca7c-2435-43bd-afc6-d0c74407cbb0' 
            AND directus_permissions.collection = directus_collections.collection 
            AND action = 'create'
        );
        
        INSERT INTO directus_permissions (role, collection, action, permissions, validation, presets, fields)
        SELECT '39e9ca7c-2435-43bd-afc6-d0c74407cbb0', collection, 'update', '{}', '{}', '{}', '*'
        FROM directus_collections 
        WHERE collection NOT LIKE 'directus_%'
        AND NOT EXISTS (
            SELECT 1 FROM directus_permissions 
            WHERE role = '39e9ca7c-2435-43bd-afc6-d0c74407cbb0' 
            AND directus_permissions.collection = directus_collections.collection 
            AND action = 'update'
        );
        
        INSERT INTO directus_permissions (role, collection, action, permissions, validation, presets, fields)
        SELECT '39e9ca7c-2435-43bd-afc6-d0c74407cbb0', collection, 'delete', '{}', '{}', '{}', '*'
        FROM directus_collections 
        WHERE collection NOT LIKE 'directus_%'
        AND NOT EXISTS (
            SELECT 1 FROM directus_permissions 
            WHERE role = '39e9ca7c-2435-43bd-afc6-d0c74407cbb0' 
            AND directus_permissions.collection = directus_collections.collection 
            AND action = 'delete'
        );
        
        INSERT INTO directus_permissions (role, collection, action, permissions, validation, presets, fields)
        VALUES ('39e9ca7c-2435-43bd-afc6-d0c74407cbb0', 'directus_files', 'create', '{}', '{}', '{}', '*'),
               ('39e9ca7c-2435-43bd-afc6-d0c74407cbb0', 'directus_files', 'update', '{}', '{}', '{}', '*'),
               ('39e9ca7c-2435-43bd-afc6-d0c74407cbb0', 'directus_files', 'delete', '{}', '{}', '{}', '*')
        ON CONFLICT DO NOTHING;
    "
    
    # 7. Restaurer les uploads
    echo "📁 Restauration des uploads..."
    if [ -f "$BACKUP_PATH/uploads.tar.gz" ]; then
        docker run --rm -v "$UPLOADS_VOLUME":/data -v "$(pwd)/$BACKUP_PATH":/backup alpine tar xzf /backup/uploads.tar.gz -C /data
        echo "✅ Uploads restaurés!"
        
        # Correction des permissions des fichiers
        echo "🔧 Correction des permissions des fichiers..."
        docker run --rm -v "$UPLOADS_VOLUME":/data alpine sh -c "chown -R 1000:1000 /data/ && chmod -R 644 /data/*"
        echo "✅ Permissions corrigées!"
    else
        echo "⚠️ Fichier uploads.tar.gz non trouvé"
    fi
    
    # 8. Redémarrage de Directus pour appliquer les changements
    echo "🔄 Redémarrage de Directus..."
    docker restart "$DIRECTUS_CONTAINER"
    
    echo "✅ Restauration terminée!"
    echo "🌐 Directus disponible sur: http://localhost:8055"
    echo "📊 Dashboard: http://localhost:8055/admin"
    
}

# Appel de la fonction principale
main