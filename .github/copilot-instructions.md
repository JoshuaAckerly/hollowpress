# hollowpress

## Purpose
Laravel + React CMS/blog boilerplate with artist profile management. Functions as a reusable starter template for content-heavy sites. Includes pre-built blog, artist/album/event management, comment moderation, and case studies.

## Tech Stack
- **Backend**: Laravel 12, PHP 8.2+, Sanctum (session), Spatie Sitemap
- **Frontend**: React 19, TypeScript, Inertia.js 2, Tailwind CSS 4, Radix UI, Headless UI, Vite
- **Auth**: Laravel Breeze + hCaptcha on registration, custom `EnsureDashboardAdminToken` middleware for dashboard write actions
- **Testing**: PHPUnit 11 (`php artisan test`)
- **Storage**: MySQL (primary), file cache, database queue

## Architecture

### Controllers (`app/Http/Controllers/`)
- `PostController` — public post listing and single-post view (`/posts`, `/posts/{post}`)
- `CommentController` — public comment creation; admin approve/unapprove via `EnsureDashboardAdminToken` middleware
- `ArtistController` — artist CRUD
- `CaseStudyController` — case study CRUD
- `DemoPostController` — draft/demo posts
- `SitemapController` — generates sitemap XML
- `ContactController` — contact form
- `Auth/` — Breeze-based auth
- `Api/` — API endpoints

### Models (`app/Models/`)
- `Post`, `Comment` — blog content with comment moderation
- `Artist`, `Album`, `Event` — artist profile system (Artist `hasMany` Albums and Events)
- `CaseStudy` — case study pages with slug
- `DemoPost` — draft posts not yet published
- `User`

### Routes (`routes/web.php`)
- `/` — welcome page with recent posts + artists (eager-loads albums/events)
- `/dashboard` — aggregated stats, recent posts/studies/comments
- `/posts`, `/posts/{post}` — public reading (no auth)
- `/posts/{post}/comments` — public comment submission
- `/dashboard/comments/{comment}/approve|unapprove` — requires `EnsureDashboardAdminToken`
- Artists, case studies, and other resource routes in additional route files

### Frontend (`resources/js/`)
- Pages: `pages/` (Dashboard uses `PascalCase`)
- Components: `components/` (Radix UI-based primitives)
- SSR entry: `ssr.tsx`
- Hooks: `hooks/`

## Key Patterns
- **Admin actions** (approve/unapprove comments, dashboard mutations) use `EnsureDashboardAdminToken` middleware — not standard Sanctum session auth.
- Posts are public — no auth to read. Auth only required for dashboard/admin routes.
- Spatie Sitemap used via `SitemapController`.
- This is a **boilerplate** — when adding new features, follow the existing pattern rather than introducing new abstractions.

## Build & Test
```bash
php artisan test
npm run build:ssr
npm run lint
./vendor/bin/pint
```

## Notable Files
- `search-monitor*.sh` — search analytics monitoring scripts
- `cron-search-monitoring.conf` — cron job config for search monitoring
- `components.json` — shadcn/Radix UI component config
- `manage-ssr.sh` — SSR process management
- `deploy-production.sh`, `deploy-test.sh` — deployment scripts
