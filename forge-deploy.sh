#!/bin/bash
# Laravel Forge Deployment Script for hollowpress.graveyardjokes.com
# Copy this entire content to your Forge site's deployment script

set -e

# Configuration
SSR_PORT=13720
PROJECT_NAME="hollowpress"
SITE_PATH="/home/forge/hollowpress.graveyardjokes.com"

echo "🚀 Starting deployment for $PROJECT_NAME with SSR on port $SSR_PORT"

cd $SITE_PATH

# Stop existing SSR process first
echo "🛑 Stopping existing SSR processes..."
lsof -ti:13714 | xargs kill -TERM 2>/dev/null || true
lsof -ti:$SSR_PORT | xargs kill -TERM 2>/dev/null || true
sleep 2
lsof -ti:13714 | xargs kill -9 2>/dev/null || true
lsof -ti:$SSR_PORT | xargs kill -9 2>/dev/null || true

# Update Git repository
echo "📦 Pulling latest code..."
git pull origin $FORGE_SITE_BRANCH

# Update PHP dependencies
echo "🐘 Installing PHP dependencies..."
$FORGE_COMPOSER install --no-interaction --prefer-dist --optimize-autoloader --no-dev

# Update Node dependencies
echo "📦 Installing Node dependencies..."
npm ci

# Build frontend assets
echo "🎨 Building frontend assets..."
npm run build

# Build SSR bundle
echo "🔨 Building SSR bundle..."
npm run build:ssr

# Verify SSR bundle exists
if [ ! -f "bootstrap/ssr/ssr.js" ]; then
    echo "❌ SSR bundle not found after build!"
    exit 1
fi

# Update environment configuration
echo "⚙️ Configuring environment..."
# Remove old SSR port entries
sed -i '/^INERTIA_SSR_PORT=/d' .env 2>/dev/null || true
# Add correct SSR port
echo "INERTIA_SSR_PORT=$SSR_PORT" >> .env

# Ensure SSR is enabled
if ! grep -q "INERTIA_SSR_ENABLED=true" .env; then
    echo "INERTIA_SSR_ENABLED=true" >> .env
fi

# Database operations
echo "🗄️ Running database migrations..."
if [ -f artisan ]; then
    php artisan migrate:fresh --force --seed
fi

# Clear caches before caching new ones
echo "🧹 Clearing caches..."
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear

# Cache optimizations
echo "🔧 Optimizing Laravel..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Create SSR log directory
mkdir -p storage/logs

# Start SSR process
echo "🚀 Starting SSR process on port $SSR_PORT..."
nohup node bootstrap/ssr/ssr.js > storage/logs/ssr.log 2>&1 &
SSR_PID=$!

# Wait for SSR to start
echo "⏳ Waiting for SSR to start..."
sleep 5

# Verify SSR is running
if kill -0 $SSR_PID 2>/dev/null; then
    echo "✅ SSR process started (PID: $SSR_PID)"
    
    # Test SSR endpoint
    for i in {1..10}; do
        if curl -s "http://127.0.0.1:$SSR_PORT" > /dev/null; then
            echo "✅ SSR endpoint responding on port $SSR_PORT"
            break
        fi
        if [ $i -eq 10 ]; then
            echo "⚠️ SSR endpoint not responding after 10 attempts"
            echo "📋 SSR log output:"
            tail -20 storage/logs/ssr.log
            # Don't exit - let the deployment continue
        fi
        sleep 1
    done
else
    echo "❌ SSR process failed to start"
    echo "📋 SSR log output:"
    tail -20 storage/logs/ssr.log
    # Don't exit - deployment should continue without SSR
fi

# Restart queue workers
echo "🔄 Restarting queue workers..."
php artisan queue:restart

# Reload PHP-FPM
echo "🔄 Reloading PHP-FPM..."
if [[ -f /home/forge/.forge/forge-php-version ]]; then
    PHP_VERSION=$(cat /home/forge/.forge/forge-php-version)
    sudo -S service php${PHP_VERSION}-fpm reload
else
    sudo -S service php8.2-fpm reload
fi

echo "🎉 Deployment completed!"
echo "📊 Deployment summary:"
echo "   - Site path: $SITE_PATH"
echo "   - SSR port: $SSR_PORT"
echo "   - SSR status: $(if kill -0 $SSR_PID 2>/dev/null; then echo 'Running'; else echo 'Not running'; fi)"

# Final verification
if [ -f bootstrap/ssr/ssr.js ]; then
    echo "   - SSR bundle: ✅ Present"
else
    echo "   - SSR bundle: ❌ Missing"
fi