# Hollowpress Search Relevance Matrix (Sprint 2026-03-02)

Scope: `/posts` and `/case-studies`
Goal: Verify top queries, ranking behavior, pagination persistence, and no list-page regressions.

## Query Set (Top 10)

### `/posts`
1. `lunar` — broad keyword; expect title matches before body-only matches.
2. `artist` — author/title/content mixed results; expect relevance then recency.
3. `demo` — includes demo and published posts where matched.
4. `signal` — pagination check query for multi-page results.
5. `night` — validates case-insensitive matching.

### `/case-studies`
6. `branding` — project-type weighted relevance.
7. `client` — client-name and description relevance.
8. `atlas` — pagination check query for multi-page results.
9. `neon` — case-insensitive search validation (`NEON` should match `Neon`).
10. `launch` — description-driven relevance check.

## Expected Behavior

- Query string key: `q`
- Empty query returns default recency order.
- Non-empty query returns relevance-first ordering, then recency tie-break.
- Pagination links preserve active query string (e.g. `q=atlas&page=2`).
- No zero-result errors; empty-state UI should render.

## Verification Commands

Run in project root:

```bash
./vendor/bin/phpunit --filter SearchRelevanceTest
npm run build
```

## Manual Spot-Check URLs

- `/posts?q=lunar`
- `/posts?q=signal`
- `/case-studies?q=branding`
- `/case-studies?q=NEON`
- `/case-studies?q=atlas`

## Tuning Applied This Sprint

- `CaseStudyController` search filter aligned with scoring logic using `LOWER(...)` + normalized query.
- Result: consistent case-insensitive filtering across database collations and parity with existing score computation.
