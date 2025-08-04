# HollowPress API Documentation

## Overview

HollowPress is a content management platform for music artists, posts, albums, and events. This documentation covers all available API endpoints and their usage.

**Base URL:** `https://hollowpress.com`  
**Version:** 1.0  
**Last Updated:** November 22, 2025

## Table of Contents

- [Authentication](#authentication)
- [Posts API](#posts-api)
- [Demo Posts](#demo-posts)
- [Artists API](#artists-api)
- [Settings API](#settings-api)
- [Data Models](#data-models)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)

---

## Authentication

HollowPress uses Laravel Sanctum for API authentication and session-based authentication for web routes.

### Available Auth Endpoints

#### Register User
```http
POST /register
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "password": "string",
  "password_confirmation": "string"
}
```

**Response:** `201 Created`
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2025-11-22T10:00:00.000000Z"
  },
  "token": "1|AbCdEfGhIjKlMnOpQrStUvWxYz"
}
```

#### Login
```http
POST /login
Content-Type: application/json

{
  "email": "string",
  "password": "string",
  "remember": "boolean"
}
```

**Response:** `200 OK`
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "1|AbCdEfGhIjKlMnOpQrStUvWxYz"
}
```

#### Logout
```http
POST /logout
Authorization: Bearer {token}
```

**Response:** `204 No Content`

#### Forgot Password
```http
POST /forgot-password
Content-Type: application/json

{
  "email": "string"
}
```

**Response:** `200 OK`
```json
{
  "message": "Password reset link sent to your email."
}
```

#### Reset Password
```http
POST /reset-password
Content-Type: application/json

{
  "token": "string",
  "email": "string",
  "password": "string",
  "password_confirmation": "string"
}
```

**Response:** `200 OK`
```json
{
  "message": "Password has been reset successfully."
}
```

---

## Posts API

Manage blog posts and articles.

### List All Posts

```http
GET /posts
```

**Response:** `200 OK`
```json
{
  "posts": [
    {
      "id": 1,
      "title": "Getting Started with HollowPress",
      "slug": "getting-started-with-hollowpress",
      "content": "Full post content...",
      "excerpt": "Brief summary...",
      "featured_image": "https://example.com/image.jpg",
      "published_at": "2025-11-22T10:00:00.000000Z",
      "created_at": "2025-11-22T10:00:00.000000Z",
      "updated_at": "2025-11-22T10:00:00.000000Z"
    }
  ]
}
```

### Get Single Post

```http
GET /posts/{id}
```

**Parameters:**
- `id` (integer, required) - Post ID

**Response:** `200 OK`
```json
{
  "post": {
    "id": 1,
    "title": "Getting Started with HollowPress",
    "slug": "getting-started-with-hollowpress",
    "content": "Full post content...",
    "excerpt": "Brief summary...",
    "featured_image": "https://example.com/image.jpg",
    "published_at": "2025-11-22T10:00:00.000000Z",
    "created_at": "2025-11-22T10:00:00.000000Z",
    "updated_at": "2025-11-22T10:00:00.000000Z"
  }
}
```

### Create Post

```http
POST /posts
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "string (required, max:255)",
  "content": "string (required)",
  "excerpt": "string (optional, max:500)",
  "featured_image": "string (optional, url)",
  "published_at": "datetime (optional)"
}
```

**Response:** `201 Created`
```json
{
  "post": {
    "id": 2,
    "title": "New Post Title",
    "slug": "new-post-title",
    "content": "Post content...",
    "created_at": "2025-11-22T10:00:00.000000Z"
  },
  "message": "Post created successfully!"
}
```

### Update Post

```http
PUT /posts/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "string (optional, max:255)",
  "content": "string (optional)",
  "excerpt": "string (optional, max:500)",
  "featured_image": "string (optional, url)",
  "published_at": "datetime (optional)"
}
```

**Response:** `200 OK`
```json
{
  "post": {
    "id": 1,
    "title": "Updated Post Title",
    "content": "Updated content...",
    "updated_at": "2025-11-22T11:00:00.000000Z"
  },
  "message": "Post updated successfully!"
}
```

### Delete Post

```http
DELETE /posts/{id}
Authorization: Bearer {token}
```

**Response:** `200 OK`
```json
{
  "message": "Post deleted successfully!"
}
```

### Create Post Form

```http
GET /posts/create
Authorization: Bearer {token}
```

**Response:** `200 OK` - Returns Inertia page for post creation form

### Edit Post Form

```http
GET /posts/{id}/edit
Authorization: Bearer {token}
```

**Response:** `200 OK` - Returns Inertia page for post editing form

---

## Demo Posts

Demo posts allow visitors to test post creation without authentication. Perfect for showcasing the platform's features to potential clients.

### Features

- **No Authentication Required** - Create posts without logging in
- **Rate Limited** - 5 demo posts per IP address per hour
- **Auto-Cleanup** - Demo posts automatically deleted after 48 hours
- **Visual Indicator** - Demo posts display with a "DEMO" badge
- **Sandbox Environment** - Keeps demo data separate from production posts

### Create Demo Post

```http
POST /demo/posts
Content-Type: application/json

{
  "title": "string (required, max:255)",
  "content": "string (required, min:10)",
  "author_name": "string (required, max:255)",
  "author_type": "string (required, enum: 'artist' | 'user')"
}
```

**Response:** `302 Redirect` to `/posts` with success message
```json
{
  "message": "Demo post created! It will be removed in 48 hours."
}
```

**Rate Limit Error:** `302 Redirect` with error message
```json
{
  "error": "Too many demo posts created. Please try again in X minutes."
}
```

### Create Demo Post Form

```http
GET /demo/posts/create
```

**Response:** `200 OK` - Returns Inertia page for demo post creation form with information banner

### Delete Demo Post

```http
DELETE /demo/posts/{id}
```

**Response:** `302 Redirect` to `/posts` with success message
```json
{
  "message": "Demo post deleted successfully!"
}
```

### Cleanup Command

Demo posts older than 48 hours are automatically cleaned up via scheduled task:

```bash
php artisan demo:cleanup-posts
```

This command runs daily via Laravel's task scheduler.

### Implementation Details

- Demo posts stored in separate `demo_posts` table
- IP address tracked for rate limiting
- Posts merged with regular posts in frontend display
- `is_demo` flag added to identify demo posts in UI
- Separate controller handles demo post logic

---

## Artists API

Manage music artists, their albums, and events.

### List All Artists

```http
GET /artists
```

**Response:** `200 OK`
```json
{
  "artists": [
    {
      "id": 1,
      "name": "The Midnight Collective",
      "slug": "the-midnight-collective",
      "bio": "Artist biography...",
      "image": "https://example.com/artist.jpg",
      "website": "https://artistwebsite.com",
      "spotify_url": "https://spotify.com/artist/...",
      "instagram_url": "https://instagram.com/artist",
      "created_at": "2025-11-22T10:00:00.000000Z",
      "albums": [
        {
          "id": 1,
          "artist_id": 1,
          "title": "Album Title",
          "release_date": "2025-01-01",
          "cover_image": "https://example.com/album.jpg"
        }
      ],
      "events": [
        {
          "id": 1,
          "artist_id": 1,
          "title": "Live Performance",
          "venue": "The Underground Club",
          "date": "2025-12-31T20:00:00.000000Z",
          "ticket_url": "https://tickets.com"
        }
      ]
    }
  ]
}
```

### Get Single Artist

```http
GET /artists/{id}
```

**Parameters:**
- `id` (integer, required) - Artist ID

**Response:** `200 OK`
```json
{
  "artist": {
    "id": 1,
    "name": "The Midnight Collective",
    "slug": "the-midnight-collective",
    "bio": "Artist biography...",
    "image": "https://example.com/artist.jpg",
    "website": "https://artistwebsite.com",
    "spotify_url": "https://spotify.com/artist/...",
    "instagram_url": "https://instagram.com/artist",
    "albums": [...],
    "events": [...],
    "created_at": "2025-11-22T10:00:00.000000Z"
  }
}
```

---

## Settings API

User profile and account settings management (requires authentication).

### Get Profile Settings

```http
GET /settings/profile
Authorization: Bearer {token}
```

**Response:** `200 OK` - Returns Inertia page with user profile data

### Update Profile

```http
PATCH /settings/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "string (required, max:255)",
  "email": "string (required, email)"
}
```

**Response:** `200 OK`
```json
{
  "user": {
    "id": 1,
    "name": "Updated Name",
    "email": "updated@example.com",
    "updated_at": "2025-11-22T11:00:00.000000Z"
  },
  "message": "Profile updated successfully!"
}
```

### Delete Account

```http
DELETE /settings/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "password": "string (required)"
}
```

**Response:** `204 No Content`

### Get Password Settings

```http
GET /settings/password
Authorization: Bearer {token}
```

**Response:** `200 OK` - Returns Inertia page for password change

### Update Password

```http
PUT /settings/password
Authorization: Bearer {token}
Content-Type: application/json

{
  "current_password": "string (required)",
  "password": "string (required, min:8)",
  "password_confirmation": "string (required)"
}
```

**Rate Limit:** 6 requests per minute

**Response:** `200 OK`
```json
{
  "message": "Password updated successfully!"
}
```

### Get Appearance Settings

```http
GET /settings/appearance
Authorization: Bearer {token}
```

**Response:** `200 OK` - Returns Inertia page for appearance settings

---

## Data Models

### Post Model

```typescript
interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}
```

### Artist Model

```typescript
interface Artist {
  id: number;
  name: string;
  slug: string;
  bio?: string;
  image?: string;
  website?: string;
  spotify_url?: string;
  instagram_url?: string;
  created_at: string;
  updated_at: string;
  albums?: Album[];
  events?: Event[];
}
```

### Album Model

```typescript
interface Album {
  id: number;
  artist_id: number;
  title: string;
  release_date?: string;
  cover_image?: string;
  spotify_url?: string;
  created_at: string;
  updated_at: string;
}
```

### Event Model

```typescript
interface Event {
  id: number;
  artist_id: number;
  title: string;
  venue?: string;
  location?: string;
  date: string;
  ticket_url?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}
```

### User Model

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}
```

---

## Error Handling

HollowPress uses standard HTTP status codes and returns error responses in JSON format.

### Error Response Format

```json
{
  "message": "Error message describing what went wrong",
  "errors": {
    "field_name": [
      "Specific validation error for this field"
    ]
  }
}
```

### Common Status Codes

| Status Code | Meaning |
|------------|---------|
| `200 OK` | Request succeeded |
| `201 Created` | Resource created successfully |
| `204 No Content` | Request succeeded with no content to return |
| `400 Bad Request` | Invalid request data |
| `401 Unauthorized` | Authentication required or failed |
| `403 Forbidden` | Authenticated but not authorized |
| `404 Not Found` | Resource not found |
| `422 Unprocessable Entity` | Validation errors |
| `429 Too Many Requests` | Rate limit exceeded |
| `500 Internal Server Error` | Server error |

### Example Error Responses

#### Validation Error (422)
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "email": [
      "The email field is required."
    ],
    "password": [
      "The password must be at least 8 characters."
    ]
  }
}
```

#### Authentication Error (401)
```json
{
  "message": "Unauthenticated."
}
```

#### Not Found Error (404)
```json
{
  "message": "Post not found."
}
```

#### Rate Limit Error (429)
```json
{
  "message": "Too many requests. Please try again later.",
  "retry_after": 60
}
```

---

## Rate Limiting

### Default Limits

- **Authentication endpoints:** 60 requests per minute per IP
- **Password update:** 6 requests per minute per user
- **General API endpoints:** Unlimited (subject to server capacity)

### Rate Limit Headers

Responses include rate limit information in headers:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1700000000
```

### Handling Rate Limits

When rate limited, wait for the duration specified in the `retry_after` field or `X-RateLimit-Reset` header before making additional requests.

---

## Pagination

List endpoints support pagination parameters:

```http
GET /posts?page=1&per_page=15
```

**Parameters:**
- `page` (integer, optional) - Page number (default: 1)
- `per_page` (integer, optional) - Items per page (default: 15, max: 100)

**Paginated Response:**
```json
{
  "data": [...],
  "current_page": 1,
  "last_page": 5,
  "per_page": 15,
  "total": 75,
  "next_page_url": "https://hollowpress.com/posts?page=2",
  "prev_page_url": null
}
```

---

## Best Practices

### Request Headers

Always include appropriate headers:

```http
Content-Type: application/json
Accept: application/json
Authorization: Bearer {token}
```

### Error Handling

Always check response status codes and handle errors appropriately:

```javascript
try {
  const response = await fetch('/api/posts', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    const error = await response.json();
    console.error('API Error:', error.message);
  }
  
  const data = await response.json();
  // Handle success
} catch (error) {
  console.error('Network Error:', error);
}
```

### CORS

For cross-origin requests, ensure your application domain is whitelisted. Contact support for CORS configuration.

---

## Support

For API support or to report issues:

- **Email:** support@hollowpress.com
- **Documentation:** https://hollowpress.com/docs
- **GitHub:** https://github.com/JoshuaAckerly/hollowpress

---

## Changelog

### Version 1.0 (November 22, 2025)
- Initial API documentation
- Posts CRUD endpoints
- Artists read-only endpoints
- User settings and profile management
- Authentication with Laravel Sanctum

---

*This documentation is maintained by the HollowPress development team and updated regularly.*
