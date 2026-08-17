# ==============================================================================
# Script de Deploy e Configuração Nginx Sites-Available - FTTRESP
# Servidor: Ubuntu 22.04 LTS (IP: 187.45.255.59)
# URL HTTPS: https://pessistemas.vps-kinghost.net/fttresp
# ==============================================================================

param (
    [string]$NomeAlteracao = "deploy_nginx_sites_available_clean"
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
Write-Host "   Domínio HTTPS: https://pessistemas.vps-kinghost.net/fttresp " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Commit Message: $commitMsg" -ForegroundColor Yellow
Write-Host "VPS IP Target: $vpsIP ($vpsUser)" -ForegroundColor Yellow

# 1. Commit e Push Local para GitHub (Branch master)
Write-Host "`n--- Step 1: Sincronizando repositório local com o GitHub ---" -ForegroundColor Cyan
git add .
git commit -m "$commitMsg"
git push origin master

# 2. Comando Remoto para o VPS (Instalação PostgreSQL, Node, PM2 e Nginx Sites-Available Clean)
$remotePath = "/var/www/fttresp"

$vpsCommand = @"
sudo apt-get update -y && \
sudo apt-get install -y postgresql postgresql-contrib curl git nginx && \
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && \
sudo apt-get install -y nodejs && \
sudo npm install -g pm2 && \
cat << 'EOF' > /tmp/setup.sql
CREATE USER fttresp_user WITH PASSWORD 'fttresp_pass_2026';
ALTER USER fttresp_user WITH PASSWORD 'fttresp_pass_2026';
CREATE DATABASE fttresp_db OWNER fttresp_user;
GRANT ALL PRIVILEGES ON DATABASE fttresp_db TO fttresp_user;
EOF
sudo -u postgres psql -f /tmp/setup.sql || true && \
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
sed -i '/location \/fttresp/,/}/d' /etc/nginx/nginx.conf 2>/dev/null || true && \
find /etc/nginx/conf.d/ -type f -exec sed -i '/location \/fttresp/,/}/d' {} + 2>/dev/null || true && \
cat << 'EOF' > /etc/nginx/sites-available/fttresp
server {
    listen 80;
    server_name pessistemas.vps-kinghost.net 187.45.255.59;

    location /fttresp/ {
        alias /var/www/fttresp/client/dist/;
        index index.html;
        try_files `$uri `$uri/ /fttresp/index.html;
        add_header Content-Security-Policy "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob: http:;" always;
    }

    location = /fttresp {
        return 301 /fttresp/;
    }

    location /fttresp/api/ {
        proxy_pass http://127.0.0.1:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade `$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host `$host;
        proxy_cache_bypass `$http_upgrade;
        add_header Content-Security-Policy "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob: http:;" always;
    }

    location /fttresp/uploads/ {
        alias /var/www/fttresp/client/public/uploads/;
        add_header Content-Security-Policy "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob: http:;" always;
    }
}
EOF
ln -sf /etc/nginx/sites-available/fttresp /etc/nginx/sites-enabled/fttresp && \
for file in /etc/nginx/sites-available/*; do
  if [ -f "`$file" ] && [ "`$file" != "/etc/nginx/sites-available/fttresp" ]; then
    sed -i '/location \/fttresp/,/}/d' "`$file" 2>/dev/null || true
    if grep -q "server {" "`$file"; then
      sed -i '\$ i\    location /fttresp/ {\n        alias /var/www/fttresp/client/dist/;\n        index index.html;\n        try_files \$uri \$uri/ /fttresp/index.html;\n        add_header Content-Security-Policy "default-src '\''self'\'' '\''unsafe-inline'\'' '\''unsafe-eval'\'' https: data: blob: http:;" always;\n    }\n    location = /fttresp {\n        return 301 /fttresp/;\n    }\n    location /fttresp/api/ {\n        proxy_pass http://127.0.0.1:5000/api/;\n        proxy_http_version 1.1;\n        proxy_set_header Upgrade \$http_upgrade;\n        proxy_set_header Connection "upgrade";\n        proxy_set_header Host \$host;\n        proxy_cache_bypass \$http_upgrade;\n        add_header Content-Security-Policy "default-src '\''self'\'' '\''unsafe-inline'\'' '\''unsafe-eval'\'' https: data: blob: http:;" always;\n    }\n    location /fttresp/uploads/ {\n        alias /var/www/fttresp/client/public/uploads/;\n        add_header Content-Security-Policy "default-src '\''self'\'' '\''unsafe-inline'\'' '\''unsafe-eval'\'' https: data: blob: http:;" always;\n    }' "`$file" 2>/dev/null || true
    fi
  fi
done && \
sudo nginx -t && sudo systemctl reload nginx && \
cd .. && \
(pm2 restart fttresp-app || pm2 start server/src/server.js --name fttresp-app) && \
pm2 save
"@

# 3. Execução Remota via Plink
Write-Host "`n--- Step 2: Conectando ao VPS e aplicando Nginx sites-available clean ---" -ForegroundColor Cyan

if (Test-Path $plinkPath) {
    & $plinkPath -pw $vpsPass "$vpsUser@$vpsIP" $vpsCommand
    Write-Host "`n==================================================" -ForegroundColor Green
    Write-Host "   DEPLOY E CONFIGURAÇÃO NGINX SITES CONCLUÍDOS!  " -ForegroundColor Green
    Write-Host "   Acesse em: https://pessistemas.vps-kinghost.net/fttresp " -ForegroundColor Green
    Write-Host "==================================================" -ForegroundColor Green
} else {
    Write-Host "Plink não localizado em $plinkPath." -ForegroundColor Yellow
}
