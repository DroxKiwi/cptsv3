# Script de démarrage pour le développement
Write-Host "🚀 Démarrage de l'environnement de développement CPTS" -ForegroundColor Green

# Démarrer les bases de données
Write-Host "📊 Démarrage des bases de données..." -ForegroundColor Yellow
docker-compose -f docker-compose.dev.yml up -d

# Attendre que les bases soient prêtes
Write-Host "⏳ Attente que les bases de données soient prêtes..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Vérifier le statut
Write-Host "✅ Bases de données démarrées !" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Informations de connexion :" -ForegroundColor Cyan
Write-Host "  • Site Next.js (port 5432): postgresql://admin:admin@localhost:5432/dbcpts" -ForegroundColor White
Write-Host "  • Directus (port 5433): postgresql://admin:admin@localhost:5433/directus" -ForegroundColor White
Write-Host "  • PgAdmin: http://localhost:5050" -ForegroundColor White
Write-Host ""
Write-Host "🎯 Prochaines étapes :" -ForegroundColor Cyan
Write-Host "  1. Lancer Next.js: cd site && npm run dev" -ForegroundColor White
Write-Host "  2. Lancer Directus: cd directus && npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "🛑 Pour arrêter: docker-compose -f docker-compose.dev.yml down" -ForegroundColor Red
