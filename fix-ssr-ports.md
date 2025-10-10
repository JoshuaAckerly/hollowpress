# Fix SSR Port Conflicts

## For each of your projects, update the .env file:

### Project 1 (hollowpress):
```env
INERTIA_SSR_PORT=13714
```

### Project 2:
```env
INERTIA_SSR_PORT=13715
```

### Project 3:
```env
INERTIA_SSR_PORT=13716
```

### Project 4:
```env
INERTIA_SSR_PORT=13717
```

### Project 5:
```env
INERTIA_SSR_PORT=13718
```

## Commands to run in each project:

1. **Stop all SSR processes:**
```bash
# Kill processes using port 13714
lsof -ti:13714 | xargs kill -9
# Or on Windows:
netstat -ano | findstr :13714
taskkill /PID <PID_NUMBER> /F
```

2. **Install dependencies (if missing):**
```bash
npm install
```

3. **Rebuild SSR bundle:**
```bash
npm run build:ssr
```

4. **Start with proper port:**
```bash
# Make sure .env has unique INERTIA_SSR_PORT
php artisan serve
```