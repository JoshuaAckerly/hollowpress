#!/bin/bash

cd /home/forge/hollowpress.graveyardjokes.com

# Pull latest changes
git pull https://github.com/JoshuaAckerly/hollowpress.git main

# Install/update composer dependencies
composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev

# Install/update npm dependencies
npm ci

# Build frontend assets and SSR bundle
npm run build
npm run build:ssr

# Stop existing SSR process
echo "🛑 Stopping existing SSR process..."
lsof -ti:13720 | xargs kill -TERM 2>/dev/null || true
sleep 2
lsof -ti:13720 | xargs kill -9 2>/dev/null || true

# Update environment configuration for SSR
if ! grep -q "INERTIA_SSR_PORT=13720" .env; then
    echo "⚙️ Adding SSR port to .env..."
    echo "INERTIA_SSR_PORT=13720" >> .env
fi

if ! grep -q "INERTIA_SSR_ENABLED=true" .env; then
    echo "⚙️ Enabling SSR in .env..."
    echo "INERTIA_SSR_ENABLED=true" >> .env
fi

# Wipe and rebuild database with seeding
echo "🗄️ Wiping and rebuilding database..."
php artisan migrate:fresh --force --seed

# Clear and cache config
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Clear all caches first
php artisan cache:clear
php artisan view:clear
php artisan config:clear
php artisan route:clear

# Restart queue workers
php artisan queue:restart

# Create SSR log directory
mkdir -p storage/logs

# Start SSR process
echo "🚀 Starting SSR process on port 13720..."
nohup node bootstrap/ssr/ssr.js > storage/logs/ssr.log 2>&1 &
SSR_PID=$!

# Wait and verify SSR is running
sleep 5
if kill -0 $SSR_PID 2>/dev/null; then
    echo "✅ SSR started successfully (PID: $SSR_PID)"
    if curl -s "http://127.0.0.1:13720" > /dev/null; then
        echo "✅ SSR endpoint responding"
    else
        echo "⚠️ SSR endpoint not responding, check logs"
        tail -10 storage/logs/ssr.log
    fi
else
    echo "❌ Failed to start SSR process"
    tail -10 storage/logs/ssr.log
    exit 1
fi

# Reload PHP-FPM
sudo service php8.2-fpm reload