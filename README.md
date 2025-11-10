# HollowPress

A modern Laravel + React starter kit built with Inertia.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Backend**: Laravel 12.x (PHP 8.2+)
- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4.x
- **UI Components**: Radix UI + Headless UI
- **Build Tool**: Vite
- **SSR**: Inertia.js Server-Side Rendering

## Quick Start

### Prerequisites
- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- SQLite (default) or MySQL/PostgreSQL

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url> hollowpress
   cd hollowpress
   composer install
   npm install
   ```

2. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Database setup**
   ```bash
   php artisan migrate
   ```

4. **Start development**
   ```bash
   composer run dev
   ```

This runs Laravel server, queue worker, and Vite dev server concurrently.

5. **Seed the database**
   ```bash
   php artisan db:seed
   ```

## Development Commands

- `composer run dev` - Start all development servers
- `composer run dev:ssr` - Start with SSR enabled
- `npm run build` - Build for production
- `npm run build:ssr` - Build with SSR
- `composer run test` - Run PHP tests
- `npm run lint` - Lint JavaScript/TypeScript
- `npm run format` - Format code with Prettier

## Project Structure

```
├── app/                 # Laravel application code
├── resources/
│   ├── js/             # React components and TypeScript
│   ├── css/            # Tailwind CSS styles
│   └── views/          # Blade templates
├── routes/             # Laravel routes
├── database/           # Migrations, seeders, factories
└── public/             # Public assets
```

## Features

- ⚡ Hot module replacement with Vite
- 🎨 Tailwind CSS with dark theme design
- 🔧 TypeScript support
- 📱 Responsive design with modern UI
- 🚀 Server-side rendering ready
- 🧪 Comprehensive testing suite
- 📝 Code formatting with Prettier
- 🔍 ESLint configuration
- 📚 Complete blog system with CRUD operations
- 🎭 Artist profiles with albums and events
- 🌙 Dark theme implementation
- 🚀 Laravel Forge deployment ready

## Deployment

The application is ready for deployment on Laravel Forge. See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

### Quick Deploy to Forge:
1. Create site with repository: `https://github.com/JoshuaAckerly/hollowpress.git`
2. Set environment variables from `.env.example`
3. Deploy and run: `php artisan db:seed --class=ProductionSeeder`

## Current Status

✅ **Completed Features:**
- Blog system with create, read, update, delete
- Artist profiles with albums and events
- Dark theme UI design
- Comprehensive test suite
- Production deployment configuration
- Database seeders with sample content

## License

MIT License