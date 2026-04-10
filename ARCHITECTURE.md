# HollowPress Architecture Documentation

This document provides an overview of the HollowPress application architecture, design patterns, and technical decisions.

## 📋 Table of Contents

- [System Overview](#system-overview)
- [Architecture Patterns](#architecture-patterns)
- [Technology Stack](#technology-stack)
- [Application Layers](#application-layers)
- [Design Decisions](#design-decisions)
- [Performance Considerations](#performance-considerations)

## 🎯 System Overview

HollowPress is a modern **Laravel + React** starter kit and template application designed to serve as a boilerplate for building full-stack web applications with server-side rendering (SSR).

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Client (Browser)                    │
│  ┌──────────────────────────────────────────────────┐  │
│  │          React 19 + TypeScript Frontend          │  │
│  │  (Inertia.js Client / Vite HMR / Tailwind CSS)  │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/HTTPS
                     │
┌────────────────────▼────────────────────────────────────┐
│                 Web Server (Nginx/Apache)                │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│               PHP-FPM / Laravel 12 Backend               │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Controllers → Services → Models → Database      │  │
│  │  Middleware, Validation, Cache, Queue            │  │
│  └──────────────────────────────────────────────────┘  │
└─────┬───────────────┬──────────────────────────────────┘
      │               │
┌─────▼────┐     ┌───▼──────┐
│   MySQL  │     │  File    │
│          │     │  Storage │
└──────────┘     └──────────┘
```

### Core Principles

1. **Template-First Design**: Reusable boilerplate for quick project bootstrapping
2. **Clean Architecture**: Separation of concerns across layers
3. **Type Safety**: Full TypeScript support and Laravel type checking
4. **Component Reusability**: Pre-built UI components and layouts
5. **Zero Configuration**: Works out of the box with sensible defaults

## 🏗️ Architecture Patterns

### 1. Model-View-Controller (MVC)

- **Models** (`app/Models/`): Data structures and database interactions
- **Views** (`resources/js/Pages/`): React components via Inertia.js
- **Controllers** (`app/Http/Controllers/`): Request handling and response formatting

### 2. Service Layer Pattern

Business logic is encapsulated in service classes:

```
Controller → Service → Model → Database
```

### 3. Repository Pattern

Data access is abstracted through repositories for testability and flexibility.

### 4. Component-Driven Frontend

React components are organized by function:

```
resources/js/
├── Components/       # Reusable UI components
│   ├── ui/          # Base UI primitives
│   └── modules/     # Feature components
├── Layouts/         # Page layouts
├── Pages/           # Full pages (Inertia endpoints)
└── types/           # TypeScript definitions
```

## 🛠️ Technology Stack

### Backend Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Framework** | Laravel 12 | Core application framework |
| **Language** | PHP 8.2+ | Server-side programming |
| **Database** | MySQL 8.0+ | Primary data storage |
| **Cache** | File/Redis | Session and cache storage |
| **Static Analysis** | PHPStan | Code quality & type checking |

### Frontend Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Framework** | React 19 | UI library |
| **Language** | TypeScript 5.7 | Type-safe JavaScript |
| **Build Tool** | Vite 7 | Fast development & bundling |
| **Routing** | Inertia.js 2 | SPA without traditional API |
| **Styling** | Tailwind CSS 4 | Utility-first CSS |
| **UI Components** | Radix UI, Headless UI | Accessible primitives |

### Infrastructure

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Web Server** | Nginx | HTTP server & reverse proxy |
| **SSL** | Let's Encrypt | HTTPS support |
| **Deployment** | Custom Scripts | Server management |

## 📚 Application Layers

### 1. Presentation Layer

**Responsibilities**: User interface and request handling

**Components**:
- Inertia Pages (`resources/js/Pages/`)
- React Components (`resources/js/Components/`)
- Controllers (`app/Http/Controllers/`)

### 2. Application Layer

**Responsibilities**: Business logic and use cases

**Components**:
- Services (`app/Services/`)
- Form Requests (`app/Http/Requests/`)
- Middleware (`app/Http/Middleware/`)

### 3. Domain Layer

**Responsibilities**: Core business entities

**Components**:
- Models (`app/Models/`)
- Contracts (`app/Contracts/`)

### 4. Infrastructure Layer

**Responsibilities**: Data persistence and external services

**Components**:
- Database Migrations (`database/migrations/`)
- Seeders (`database/seeders/`)
- Configuration (`config/`)

## 🔄 Data Flow

### Page Load Flow

```
1. Browser requests /
2. Nginx → PHP-FPM → Laravel Router
3. Controller method processes request
4. Controller returns Inertia::render('Home')
5. Laravel renders page with React component
6. Browser loads React app
7. User interacts with page
```

### API-First Approach

HollowPress can also serve as an API backend:

```
Frontend Request → API Route → Controller → Service → Model → Response
```

## 🎨 Design Decisions

### Why Inertia.js?

- Eliminates need for separate API development
- Type-safe between backend and frontend
- SEO-friendly with server-side rendering
- Simpler than traditional SPA architectures

### Why Service Layer?

- Encapsulates business logic
- Improves testability
- Enables code reuse across controllers
- Facilitates future API endpoints

### Database Choice

- **MySQL**: Recommended for production
- **SQLite**: Supported for development/testing
- Both are compatible with Eloquent ORM

## 📊 Scalability Considerations

1. **Database Optimization**: Use proper indexing and query optimization
2. **Caching**: Implement caching for frequently accessed data
3. **Queue Jobs**: Use Laravel Queue for long-running tasks
4. **Asset Bundling**: Vite handles efficient asset splitting
5. **CDN Ready**: Serve assets from CDN for better performance

## 🔒 Security Architecture

### Built-in Protections

- **CSRF Protection**: Laravel middleware included
- **SQL Injection Protection**: Eloquent ORM parameterized queries
- **XSS Protection**: React auto-escapes by default
- **Authentication**: Laravel Sanctum or custom middleware
- **Input Validation**: Form Request validation classes

## 📝 Directory Structure

```
hollowpress/
├── app/
│   ├── Models/           # Eloquent models
│   ├── Http/
│   │   ├── Controllers/  # Request handlers
│   │   └── Requests/     # Validation rules
│   ├── Services/         # Business logic
│   └── Providers/        # Service providers
├── routes/
│   ├── web.php           # Web routes
│   └── api.php           # API routes
├── resources/
│   └── js/
│       ├── Components/   # Reusable components
│       ├── Layouts/      # Page layouts
│       ├── Pages/        # Full-page components
│       └── types/        # TypeScript definitions
├── database/
│   ├── migrations/       # Database migrations
│   └── seeders/          # Data seeders
├── config/               # Configuration files
├── public/               # Web root
└── storage/              # User uploads & cache
```
