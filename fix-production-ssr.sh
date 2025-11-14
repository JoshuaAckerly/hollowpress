#!/bin/bash
# Quick fix for production SSR port issue
# Run this on the production server to fix the port conflict

set -e

SSR_PORT=13720
SITE_PATH="/home/forge/hollowpress.graveyardjokes.com"

echo "🔧 Fixing SSR port configuration for hollowpress.graveyardjokes.com"

cd $SITE_PATH

# Stop any existing SSR processes on both ports
echo "🛑 Stopping existing SSR processes..."
lsof -ti:13714 | xargs kill -TERM 2>/dev/null || true
lsof -ti:$SSR_PORT | xargs kill -TERM 2>/dev/null || true
sleep 2
lsof -ti:13714 | xargs kill -9 2>/dev/null || true
lsof -ti:$SSR_PORT | xargs kill -9 2>/dev/null || true

# Update environment configuration
echo "⚙️ Updating .env configuration..."

# Remove old SSR port if it exists
sed -i '/^INERTIA_SSR_PORT=/d' .env 2>/dev/null || true

# Add correct SSR port
echo "INERTIA_SSR_PORT=$SSR_PORT" >> .env

# Ensure SSR is enabled
if ! grep -q "INERTIA_SSR_ENABLED=true" .env; then
    echo "INERTIA_SSR_ENABLED=true" >> .env
fi

# Clear Laravel config cache to pick up new environment variables
echo "🗄️ Clearing Laravel caches..."
php artisan config:clear
php artisan config:cache

# Rebuild SSR bundle with correct configuration
echo "🔨 Rebuilding SSR bundle..."
npm run build:ssr

# Start SSR process with correct port
echo "🚀 Starting SSR process on port $SSR_PORT..."
mkdir -p storage/logs
nohup node bootstrap/ssr/ssr.js > storage/logs/ssr.log 2>&1 &
SSR_PID=$!

# Wait and verify SSR is running
sleep 3
if kill -0 $SSR_PID 2>/dev/null; then
    echo "✅ SSR started successfully (PID: $SSR_PID)"
    if curl -s "http://127.0.0.1:$SSR_PORT" > /dev/null; then
        echo "✅ SSR endpoint responding on port $SSR_PORT"
    else
        echo "⚠️ SSR endpoint not responding, check logs:"
        tail -10 storage/logs/ssr.log
    fi
else
    echo "❌ Failed to start SSR process, check logs:"
    tail -10 storage/logs/ssr.log
    exit 1
fi

echo "🎉 SSR port fix completed successfully!"
echo "📋 Summary:"
echo "   - Stopped old SSR processes"
echo "   - Updated .env with INERTIA_SSR_PORT=$SSR_PORT" 
echo "   - Rebuilt SSR bundle"
echo "   - Started new SSR process on port $SSR_PORT"