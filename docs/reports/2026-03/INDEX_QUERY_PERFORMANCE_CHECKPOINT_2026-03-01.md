# Hollowpress Index Query Performance Checkpoint — 2026-03-01

## Scope

- Endpoints measured: `/posts` and `/case-studies`
- Focus: listing-query timing checkpoint with practical search query (`q=darkwave`)
- Goal: capture before/after evidence and define next index candidates without changing listing behavior

## Method

- Runtime: local Laravel HTTP kernel benchmark via `php artisan tinker`
- Samples: 5 requests per endpoint per phase
- Phases:
  - **Before**: cache flushed prior to first benchmark pass
  - **After**: immediate second pass (warm cache / warmed query path)

Command used:

```bash
php artisan tinker --execute='... benchmark script ...'
```

## Timing Evidence

### `/posts?q=darkwave`

- **Before**
  - avg: **165.08ms**
  - median: **15.13ms**
  - p95: **17.41ms**
  - samples: `13.27, 14.57, 15.13, 17.41, 765.03`
- **After**
  - avg: **13.47ms**
  - median: **13.54ms**
  - p95: **14.09ms**
  - samples: `12.37, 12.91, 13.54, 14.09, 14.41`

### `/case-studies?q=darkwave`

- **Before**
  - avg: **27.14ms**
  - median: **15.04ms**
  - p95: **27.59ms**
  - samples: `12.07, 13.84, 15.04, 27.59, 67.14`
- **After**
  - avg: **13.02ms**
  - median: **12.90ms**
  - p95: **13.65ms**
  - samples: `12.29, 12.32, 12.90, 13.65, 13.94`

## Interpretation

- Both endpoints show stable warm-path median timing around **13–14ms** in this environment.
- Outliers dominate the first-pass averages (`/posts` had one high cold-path sample at `765.03ms`).
- Current behavior indicates acceptable warm-path responsiveness for checkpoint completion.

## Next Index Candidates (No schema changes applied in this checkpoint)

1. `posts(author_type, created_at)`
   - Rationale: aligns with category + date-filter listing pattern and default recency ordering.
2. `posts(author_name)`
   - Rationale: improves author facet filtering (`LOWER(author_name) LIKE ...` paths still benefit from narrower scans in many engines).
3. `case_studies(project_type, project_date, created_at)`
   - Rationale: supports project-type/date filters and common recency fallback ordering.
4. `case_studies(client_name)`
   - Rationale: supports client filter and search fallback pathways.

## Regression Guardrail

- Listing/search/pagination behavior should remain unchanged; this checkpoint intentionally records metrics and index candidates only.
- Validation commands:
  - `./vendor/bin/phpunit tests/Feature/SearchRelevanceTest.php`
  - `npm run -s build`

## Outcome

- Checkpoint evidence captured for `/posts` and `/case-studies`.
- Next index candidates documented with rationale.
- Ready for a follow-up migration card if sustained higher-volume datasets justify index rollout.
