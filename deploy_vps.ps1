# ==============================================================================
# Script de Deploy e Configuração PostgreSQL + Nginx no VPS - FTTRESP
# Servidor: Ubuntu 22.04 LTS (IP: 187.45.255.59)
# Repositório: https://github.com/omardev3101/fttresp.git
# ==============================================================================

param (
    [string]$NomeAlteracao = "deploy_postgresql_nginx_vps"
)

$plinkPath = "C:\Program Files\PuTTY\plink.exe"

# Leitura de Credenciais do arquivo .env
$envFile = ".env"
$vpsIP = "187.45.255.59"
$vpsUser = "root"
$vpsPass = "Omar3101@"

if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^\s*IPVPS\s*=\s*(.*)$') { $vpsIP = $matches[1].Trim() }
        if ($_ -match '^\s*USERVPS\s*=\s*(.*)$') { $vpsUser = $matches[1].Trim() }
        if ($_ -match '^\s*PASSWDVPS\s*=\s*(.*)$') { $vpsPass = $matches[1].Trim() }
    }
}

$dateStr = Get-Date -Format "ddMMyyyy"
$timeStr = Get-Date -Format "HHmmss"
$commitMsg = "${NomeAlteracao}_${dateStr}_${timeStr}_v001"

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "   FTTRESP - Sincronização GitHub e Deploy VPS   " -ForegroundColor Cyan
Write-Host "   Banco de Dados: PostgreSQL (fttresp_db)       " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Commit Message: $commitMsg" -ForegroundColor Yellow
Write-Host "VPS IP Target: $vpsIP ($vpsUser)" -ForegroundColor Yellow

# 1. Commit e Push Local para GitHub (Branch master)
Write-Host "`n--- Step 1: Sincronizando repositório local com o GitHub ---" -ForegroundColor Cyan
git add .
git commit -m "$commitMsg"
git push origin master

# 2. Comando Remoto para o VPS (Instalação PostgreSQL, Node, PM2 e Nginx Reverse Proxy)
$remotePath = "/var/www/fttresp"

$vpsCommand = @"
sudo apt-get update -y && \
sudo apt-get install -y postgresql postgresql-contrib curl git nginx && \
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && \
sudo apt-get install -y nodejs && \
sudo npm install -g pm2 && \
sudo -u postgres psql -c "CREATE USER fttresp_user WITH PASSWORD 'fttresp_pass_2026'" || true && \
sudo -u postgres psql -c "CREATE DATABASE fttresp_db OWNER fttresp_user" || true && \
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE fttresp_db TO fttresp_user" || true && \
if [ ! -d "$remotePath/.git" ]; then
    rm -rf "$remotePath" && git clone https://github.com/omardev3101/fttresp.git "$remotePath"
fi && \
cd "$remotePath" && \
git fetch origin master && git checkout master && git reset --hard origin/master && \
cd server && npm install && \
cat << 'EOF' > .env
PORT=5000
USE_POSTGRES=true
DATABASE_URL=postgres://fttresp_user:fttresp_pass_2026@localhost:5432/fttresp_db
JWT_SECRET=fttresp-super-secret-key-2026
EOF
node src/data/seed_pg.js && \
cd ../client && npm install && npm run build && \
cat << 'EOF' > /etc/nginx/sites-available/default
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    root /var/www/fttresp/client/dist;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    location /uploads/ {
        alias /var/www/fttresp/client/public/uploads/;
    }
}
EOF
sudo nginx -t && sudo systemctl reload nginx && \
cd .. && \
(pm2 restart fttresp-app || pm2 start server/src/server.js --name fttresp-app) && \
pm2 save
"@

# 3. Execução Remota via Plink
Write-Host "`n--- Step 2: Conectando ao VPS e executando configuração do PostgreSQL & Nginx ---" -ForegroundColor Cyan

if (Test-Path $plinkPath) {
    & $plinkPath -pw $vpsPass "$vpsUser@$vpsIP" $vpsCommand
    Write-Host "`n==================================================" -ForegroundColor Green
    Write-Host "   DEPLOY POSTGRESQL E NGINX CONCLUÍDOS NO VPS!   " -ForegroundColor Green
    Write-Host "   Acesse o Portal em: http://$vpsIP               " -ForegroundColor Green
    Write-Host "   Acesse a API em: http://$vpsIP/api             " -ForegroundColor Green
    Write-Host "==================================================" -ForegroundColor Green
} else {
    Write-Host "Plink não localizado em $plinkPath." -ForegroundColor Yellow
}
