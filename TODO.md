# TODO

## Features
- [ ] File upload functionality (media attachments for posts)
- [ ] Analytics integration
- [ ] Email notifications
- [ ] Related posts feature
- [ ] Content categorization improvements
- [ ] Projects archive (separate from blog posts)
- [ ] RSS feed for blog
- [ ] Pagination components (if needed beyond current implementation)

## Development
- [ ] Set up CI/CD pipeline
  - CI workflow fixed (env order, sequenced jobs)
  - CD workflow created (`.github/workflows/cd.yml`)
  - **TODO: Add GitHub secrets to repo** — `PROD_SSH_HOST`, `PROD_SSH_USER`, `PROD_SSH_KEY`
- [ ] Implement caching strategy
- [ ] Add logging configuration

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