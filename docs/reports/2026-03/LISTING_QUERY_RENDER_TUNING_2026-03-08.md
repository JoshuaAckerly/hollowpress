# Hollowpress Listing Query/Render Tuning — 2026-03-08

## Scope

- Endpoints: `/posts` and `/case-studies`
- Goal: improve listing query/render stability while preserving pagination/query behavior
- Sprint card: **Listing performance pass (query + render stability)**

## Before

- `/case-studies` relevance ordering depended on `search_score`, but quoted and `OR` search branches did not always select `search_score`.
- `/posts` listing payload returned a larger excerpt (`LEFT(content, 1200)`) than UI snippet rendering needed.
- `/case-studies` frontend split featured/regular cards with two full-array filters and used loose filter typing.
- Active-filter detection in case-studies UI treated default `sort=relevance` as an active filter, leaving clear-state UI noisy.

## After

- `CaseStudyController` now always selects `search_score` for non-empty searches via a shared scoring builder.
- Case-study search parsing keeps support for exact phrases and `OR`, with deterministic relevance ordering.
- `/case-studies` listing payload now truncates description for index rendering (`LEFT(description, 1200)`).
- `/posts` listing payload excerpt reduced to `LEFT(content, 800)` for lighter index responses.
- Case-studies index page now:
  - computes featured/regular groups in one pass,
  - uses explicit filter interfaces (removed loose `any`),
  - detects active filters correctly (ignores default `sort=relevance`).
- Search relevance/pagination coverage expanded in `tests/Feature/SearchRelevanceTest.php`:
  - posts full-filter pagination query-string persistence,
  - case-studies `OR` syntax behavior,
  - case-studies full-filter pagination query-string persistence.

## Validation Commands

```bash
./vendor/bin/phpunit --filter=SearchRelevanceTest
npm run build
```

## Outcome

- Query ordering and payload paths are more stable for listing/search traffic.
- Pagination/query persistence remains covered by regression tests for `/posts` and `/case-studies`.
