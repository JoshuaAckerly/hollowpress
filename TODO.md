# TODO

## Features
- [x] File upload functionality (featured image for posts)
- [x] Analytics integration (Google Analytics GA4, `GOOGLE_ANALYTICS_TRACKING_ID` on production)
- [x] Email notifications (contact form + newsletter welcome)
- [x] Related posts feature
- [ ] Content categorization improvements
- [x] Projects archive (separate from blog posts)
- [x] RSS feed for blog
- [x] Pagination components (if needed beyond current implementation)

## Development
- [x] Set up CI/CD pipeline
  - CI workflow: PHP checks, frontend checks, auto-format (Pint/Prettier)
  - CD workflow: deploys on CI success via SSH (`appleboy/ssh-action`)
  - GitHub secrets set: `PROD_SSH_HOST`, `PROD_SSH_USER`, `PROD_SSH_KEY`
  - deploy-production.sh: uses `git fetch + reset --hard` to avoid divergent branch errors
  - ci.yml: opted into `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24` ahead of June 16 deadline
- [x] Implement caching strategy (artist list + post filter options)
- [x] Add logging configuration (hollowpress channel, daily 30-day retention)
- [x] npm vulnerability patching (0 vulnerabilities as of May 2026)

## UI/UX
- [x] Add loading states (spinner on Edit submit button)
- [x] Implement toast notifications (sonner + centralised `useFlash` hook)
- [x] Mobile responsiveness (responsive hero headings, Dashboard grid, search form layouts)
- [x] Accessibility improvements (WCAG)
  - Skip-to-content link + `id="main-content"`
  - MobileMenu: Escape key, `role="dialog"`, `aria-modal`, `aria-controls`, 44px touch targets
  - All form fields: `htmlFor`/`id` pairs
  - All filter selects/date inputs: `aria-label`
  - Filters toggle: `aria-expanded` + `aria-controls`
  - Edit/delete icon buttons: `aria-label` with post title
  - Decorative emojis: `aria-hidden="true"` (About, welcome)
  - Dashboard stats: `<dl>/<dt>/<dd>` semantic markup
  - welcome.tsx: correct heading hierarchy (h1 → h2 → h3)
- [x] Performance optimization
  - Images: `loading="lazy"` + explicit `width`/`height`
  - `Suspense` wrapper around root render in app.tsx
  - `URL.createObjectURL` revoke on image change + unmount cleanup

## Security
- [x] Security headers (AddSecurityHeaders middleware)
  - CSP tightened for production (no `http:`, HSTS with `preload`)
  - XCPDP, COOP, CORP headers added
  - X-Powered-By removed
- [x] Vulnerability scanning (composer audit + npm audit in CI)
- [x] npm audit fix (patched axios CVE-2025-62718 and 4 others)

## Documentation
- [ ] Component documentation

## Automation
- [x] Add Dependabot (`.github/dependabot.yml`) for npm + composer automated dependency PRs

## Completed
- [x] Search functionality (advanced scoring in PostController)
- [x] Breadcrumbs navigation (Breadcrumb.tsx)
- [x] Comments system (with hCaptcha validation)
- [x] Newsletter subscription (subscribe/unsubscribe routes)
- [x] Dark mode toggle (use-appearance.tsx)
- [x] Filtering/Sorting options (posts, case studies, projects)
- [x] Update documentation to reflect Linux backend setup
- [x] Related posts (Post::related() method + RelatedPosts.tsx component)
- [x] Post tags (JSON array, tag filter on posts index)
- [x] Featured image uploads on posts (public disk storage)
- [x] Case studies (full CRUD, search, filters)
- [x] Projects archive (full CRUD, search, filters, featured projects)
- [x] Artists (profiles, albums, tracks, show pages)
