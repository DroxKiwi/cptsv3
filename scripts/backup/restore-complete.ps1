# Script complet de restauration Directus
# Usage: .\restore-complete.ps1 -BackupPath "backup_folder" -Environment "dev" ou "prod"

param(
    [Parameter(Mandatory=$true)]
    [string]$BackupPath,
    
    [Parameter(Mandatory=$true)]
    [ValidateSet("dev", "prod")]
    [string]$Environment
)

if (-not (Test-Path $BackupPath)) {
    Write-Host "Dossier de sauvegarde introuvable: $BackupPath" -ForegroundColor Red
    exit 1
}

Write-Host "Restauration complète Directus..." -ForegroundColor Green
Write-Host "Depuis: $BackupPath" -ForegroundColor Yellow
Write-Host "Environnement: $Environment" -ForegroundColor Yellow

# Configuration des noms selon l'environnement
$composeFile = if ($Environment -eq "dev") { "..\..\docker-compose.dev.yml" } else { "..\..\docker-compose.yml" }
$directusContainer = "cpts_directus_dev"
$postgresContainer = "cpts_postgres_directus_dev"
$uploadsVolume = "cptsv3_cptsv3_directus_uploads_dev"

# Confirmation avant suppression
Write-Host "`n⚠️  ATTENTION: Ce script va supprimer TOUS les containers et volumes Directus!" -ForegroundColor Red
Write-Host "Environnement: $Environment" -ForegroundColor Yellow
Write-Host "Fichier compose: $composeFile" -ForegroundColor Yellow
$confirmation = Read-Host "Continuer? (oui/non)"
if ($confirmation -ne "oui") {
    Write-Host "Opération annulée." -ForegroundColor Yellow
    exit 0
}

try {
    # 1. Arrêt et suppression des containers/volumes
    Write-Host "`nArrêt des containers..." -ForegroundColor Yellow
    docker-compose -f $composeFile down
    
    Write-Host "Suppression des volumes..." -ForegroundColor Yellow
    docker volume rm cptsv3_postgres_directus_data_dev -f 2>$null
    docker volume rm $uploadsVolume -f 2>$null
    
    # 2. Relance du docker-compose
    Write-Host "Relance du docker-compose ($Environment)..." -ForegroundColor Yellow
    docker-compose -f $composeFile up -d
    
    # 3. Attente que Directus soit prêt
    Write-Host "Attente que Directus soit prêt..." -ForegroundColor Yellow
    Start-Sleep -Seconds 15
    
    # Vérification que le container est en cours d'exécution
    $containerStatus = docker ps --filter "name=$directusContainer" --format "{{.Status}}" 2>$null
    if ($containerStatus -match "Up") {
        Write-Host "Directus est en cours d'exécution!" -ForegroundColor Green
    } else {
        Write-Host "Directus n'est pas en cours d'exécution!" -ForegroundColor Red
        Write-Host "Vérifiez les logs: docker logs $directusContainer" -ForegroundColor Yellow
        exit 1
    }
    
    # 4. Vider complètement la base de données
    Write-Host "`nVidage complet de la base de données..." -ForegroundColor Yellow
    docker exec $postgresContainer psql -U admin -d directus -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
    Write-Host "Base de données vidée!" -ForegroundColor Green
    
    # 5. Injection du dump complet
    Write-Host "`nInjection du dump PostgreSQL..." -ForegroundColor Yellow
    if (Test-Path "$BackupPath\postgres_dump.sql") {
        Get-Content "$BackupPath\postgres_dump.sql" -Encoding UTF8 | docker exec -i $postgresContainer psql -U admin -d directus --set=client_encoding=UTF8
        Write-Host "Dump PostgreSQL injecté!" -ForegroundColor Green
    } else {
        Write-Host "postgres_dump.sql non trouvé!" -ForegroundColor Red
        exit 1
    }
    
    # 6. Correction des permissions Directus
    Write-Host "`nCorrection des permissions Directus..." -ForegroundColor Yellow
    
    # 6.1. Corriger les politiques pour permettre l'accès admin et app
    docker exec $postgresContainer psql -U admin -d directus -c "UPDATE directus_policies SET admin_access = true, app_access = true WHERE admin_access = false OR app_access = false;"
    Write-Host "Politiques corrigées!" -ForegroundColor Green
    
    # 6.2. S'assurer que le rôle Administrator a accès à la politique public
    docker exec $postgresContainer psql -U admin -d directus -c "INSERT INTO directus_access (id, role, policy) SELECT gen_random_uuid(), r.id, p.id FROM directus_roles r, directus_policies p WHERE r.name = 'Administrator' AND p.name = '\$t:public_label' AND NOT EXISTS (SELECT 1 FROM directus_access a WHERE a.role = r.id AND a.policy = p.id);"
    Write-Host "Accès Administrator à la politique public ajouté!" -ForegroundColor Green
    
    # 6.3. Ajouter les permissions manquantes pour directus_files (politique public)
    docker exec $postgresContainer psql -U admin -d directus -c "INSERT INTO directus_permissions (collection, action, policy, fields) SELECT 'directus_files', 'create', policy, fields FROM directus_permissions WHERE collection = 'directus_files' AND action = 'read' AND NOT EXISTS (SELECT 1 FROM directus_permissions dp WHERE dp.collection = 'directus_files' AND dp.action = 'create');"
    docker exec $postgresContainer psql -U admin -d directus -c "INSERT INTO directus_permissions (collection, action, policy, fields) SELECT 'directus_files', 'update', policy, fields FROM directus_permissions WHERE collection = 'directus_files' AND action = 'read' AND NOT EXISTS (SELECT 1 FROM directus_permissions dp WHERE dp.collection = 'directus_files' AND dp.action = 'update');"
    docker exec $postgresContainer psql -U admin -d directus -c "INSERT INTO directus_permissions (collection, action, policy, fields) SELECT 'directus_files', 'delete', policy, fields FROM directus_permissions WHERE collection = 'directus_files' AND action = 'read' AND NOT EXISTS (SELECT 1 FROM directus_permissions dp WHERE dp.collection = 'directus_files' AND dp.action = 'delete');"
    Write-Host "Permissions directus_files (public) ajoutées!" -ForegroundColor Green
    
    # 6.4. Ajouter les permissions pour l'interface admin (politique Administrator)
    docker exec $postgresContainer psql -U admin -d directus -c "INSERT INTO directus_permissions (collection, action, policy, fields) VALUES ('directus_files', 'read', (SELECT id FROM directus_policies WHERE name = 'Administrator'), '*'), ('directus_files', 'create', (SELECT id FROM directus_policies WHERE name = 'Administrator'), '*'), ('directus_files', 'update', (SELECT id FROM directus_policies WHERE name = 'Administrator'), '*'), ('directus_files', 'delete', (SELECT id FROM directus_policies WHERE name = 'Administrator'), '*') ON CONFLICT DO NOTHING;"
    Write-Host "Permissions directus_files (admin) ajoutées!" -ForegroundColor Green
    
    # 7. Restauration du schema Directus
    Write-Host "`nRestauration du schema Directus..." -ForegroundColor Yellow
    if (Test-Path "$BackupPath\schema.yaml") {
        docker cp "$BackupPath\schema.yaml" ${directusContainer}:/directus/schema.yaml
        docker exec $directusContainer npx directus schema apply /directus/schema.yaml --yes
        Write-Host "Schema Directus restauré!" -ForegroundColor Green
    } else {
        Write-Host "schema.yaml non trouvé, le schema n'a pas été restauré." -ForegroundColor Yellow
    }
    
    # 8. Restauration des uploads
    if (Test-Path "$BackupPath\uploads.tar.gz") {
        Write-Host "`nRestauration des uploads..." -ForegroundColor Yellow
        docker run --rm -v ${uploadsVolume}:/data -v "${PWD}\${BackupPath}:/backup" alpine tar xzf /backup/uploads.tar.gz -C /data
        Write-Host "Uploads restaurés!" -ForegroundColor Green
        
        # 8.1. Correction des permissions des fichiers uploadés
        Write-Host "Correction des permissions des fichiers..." -ForegroundColor Yellow
        docker run --rm -v ${uploadsVolume}:/data alpine sh -c "chown -R 1000:1000 /data/ && chmod -R 644 /data/*"
        Write-Host "Permissions corrigées!" -ForegroundColor Green
    } else {
        Write-Host "uploads.tar.gz non trouvé - pas d'uploads à restaurer" -ForegroundColor Yellow
    }
    
    # 9. Redémarrage de Directus pour appliquer les corrections
    Write-Host "`nRedémarrage de Directus..." -ForegroundColor Yellow
    docker restart $directusContainer
    Start-Sleep -Seconds 10
    Write-Host "Directus redémarré!" -ForegroundColor Green
    
    Write-Host "`n✅ Restauration complète terminée!" -ForegroundColor Green
    Write-Host "Directus: http://localhost:8055" -ForegroundColor Cyan
    Write-Host "Admin du dump restauré avec permissions corrigées!" -ForegroundColor Green
    Write-Host "Vos données ET fichiers sont restaurés!" -ForegroundColor Green
    
} catch {
    Write-Host "`n❌ Erreur: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}