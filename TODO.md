# TODO

## Features
- [x] File upload functionality (featured image for posts)
- [ ] Analytics integration
- [x] Email notifications (contact form + newsletter welcome)
- [ ] Related posts feature
- [ ] Content categorization improvements
- [x] Projects archive (separate from blog posts)
- [x] RSS feed for blog
- [x] Pagination components (if needed beyond current implementation)

## Development
- [x] Set up CI/CD pipeline
  - CI workflow fixed (env order, sequenced jobs)
  - CD workflow created (`.github/workflows/cd.yml`)
  - GitHub secrets set: `PROD_SSH_HOST`, `PROD_SSH_USER`, `PROD_SSH_KEY`
- [x] Implement caching strategy (artist list + post filter options)
- [x] Add logging configuration (hollowpress channel, daily 30-day retention)

## UI/UX
- [ ] Add loading states
- [ ] Implement toast notifications
- [ ] Mobile responsiveness testing
- [ ] Accessibility improvements (WCAG)
- [ ] Performance optimization

## Documentation
- [ ] Component documentation

## Security
- [ ] Security headers review
- [ ] Vulnerability scanning

## Completed
- [x] Search functionality (advanced scoring in PostController)
- [x] Breadcrumbs navigation (Breadcrumb.tsx)
- [x] Comments system (with hCaptcha validation)
- [x] Newsletter subscription (subscribe/unsubscribe routes)
- [x] Dark mode toggle (use-appearance.tsx)
- [x] Filtering/Sorting options
- [x] Update documentation to reflect Linux backend setup
- [x] Related posts (Post::related() method + RelatedPosts.tsx component)
- [x] Post tags (JSON array, tag filter on posts index)
- [x] Featured image uploads on posts (public disk storage)