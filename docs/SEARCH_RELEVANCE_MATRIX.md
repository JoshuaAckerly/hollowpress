# Search Relevance Test Matrix

## Overview

This document contains test queries and expected results for monitoring HollowPress search relevance. The matrix helps validate that search results are ranked appropriately based on the scoring algorithm.

## Test Data Setup

Before running tests, ensure the database has sample content:

```sql
-- Sample posts for testing
INSERT INTO posts (title, content, author_name, created_at) VALUES
('Laravel Best Practices', 'Learn about Laravel framework best practices for modern PHP development...', 'John Developer', NOW()),
('React Component Patterns', 'Advanced React patterns including hooks and context...', 'Jane React', NOW()),
('TypeScript Migration Guide', 'Complete guide to migrating JavaScript projects to TypeScript...', 'Type Master', NOW()),
('Database Optimization', 'Tips for optimizing MySQL queries and indexes...', 'DB Expert', NOW()),
('API Design Principles', 'RESTful API design patterns and best practices...', 'API Guru', NOW());

-- Sample demo posts
INSERT INTO demo_posts (title, content, author_name, created_at) VALUES
('Demo: Laravel Tutorial', 'Step-by-step Laravel tutorial for beginners...', 'Demo Author', NOW()),
('Demo: React Hooks', 'Understanding React hooks with practical examples...', 'Demo React', NOW());
```

## Search Scoring Algorithm

Current scoring weights:
- Exact title match: 400 points
- Title prefix match: 250 points
- Title contains: 180 points
- Exact author match: 140 points
- Author contains: 90 points
- Content contains: 60 points

## Test Query Matrix

### Exact Title Matches (High Priority)
| Query | Expected Top Result | Expected Score | Notes |
|-------|-------------------|----------------|--------|
| "Laravel Best Practices" | Laravel Best Practices | 400 | Exact title match |
| "React Component Patterns" | React Component Patterns | 400 | Exact title match |
| "TypeScript Migration Guide" | TypeScript Migration Guide | 400 | Exact title match |

### Title Prefix Matches (Medium Priority)
| Query | Expected Top Result | Expected Score | Notes |
|-------|-------------------|----------------|--------|
| "Laravel" | Laravel Best Practices | 250 | Title starts with query |
| "React" | React Component Patterns | 250 | Title starts with query |
| "TypeScript" | TypeScript Migration Guide | 250 | Title starts with query |

### Title Contains Matches (Medium Priority)
| Query | Expected Top Result | Expected Score | Notes |
|-------|-------------------|----------------|--------|
| "Best Practices" | Laravel Best Practices | 180 | Title contains query |
| "Component" | React Component Patterns | 180 | Title contains query |
| "Migration" | TypeScript Migration Guide | 180 | Title contains query |

### Author Matches (Lower Priority)
| Query | Expected Top Result | Expected Score | Notes |
|-------|-------------------|----------------|--------|
| "John Developer" | Laravel Best Practices | 140 | Exact author match |
| "Jane React" | React Component Patterns | 140 | Exact author match |
| "John" | Laravel Best Practices | 90 | Author contains query |

### Content Matches (Lowest Priority)
| Query | Expected Top Result | Expected Score | Notes |
|-------|-------------------|----------------|--------|
| "framework" | Laravel Best Practices | 60 | Content contains query |
| "hooks" | React Component Patterns | 60 | Content contains query |
| "PHP" | Laravel Best Practices | 60 | Content contains query |

### Multi-Word Queries
| Query | Expected Top Result | Expected Score | Notes |
|-------|-------------------|----------------|--------|
| "Laravel framework" | Laravel Best Practices | 460 | Title exact (400) + content (60) |
| "React patterns" | React Component Patterns | 240 | Title prefix (250) - patterns not in title |
| "API design" | API Design Principles | 240 | Title prefix (250) - design not in title |

### Edge Cases
| Query | Expected Behavior | Notes |
|-------|------------------|--------|
| "" (empty) | Show all posts, ordered by date | No search filtering |
| "nonexistent" | No results | Query not found anywhere |
| "demo" | Show demo posts first | Demo posts should appear in results |
| "DEMO" | Case insensitive search | Uppercase should work |

## Performance Benchmarks

### Response Time Targets
- Simple queries (< 3 terms): < 100ms
- Complex queries (3+ terms): < 200ms
- No results: < 50ms

### Result Quality Metrics
- Precision@5: 80% of top 5 results should be relevant
- Recall@10: 90% of relevant results in top 10
- Zero false positives for exact matches

## Monitoring Queries

```sql
-- Search performance monitoring
SELECT
    COUNT(*) as total_searches,
    AVG(response_time) as avg_response_time,
    MAX(response_time) as max_response_time
FROM search_logs
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR);

-- Popular search terms
SELECT
    query,
    COUNT(*) as frequency,
    AVG(result_count) as avg_results
FROM search_logs
WHERE LENGTH(query) > 2
GROUP BY query
ORDER BY frequency DESC
LIMIT 20;

-- No-result queries (potential improvements)
SELECT query, COUNT(*) as count
FROM search_logs
WHERE result_count = 0
GROUP BY query
ORDER BY count DESC
LIMIT 10;
```

## Tuning Recommendations

### If exact matches are not ranking first:
- Increase exact title match score from 400 to 500
- Add exact content match scoring

### If prefix matches are too prominent:
- Reduce prefix match score from 250 to 200
- Increase content match score

### If author matches are irrelevant:
- Reduce author match scores
- Add author relevance weighting based on post count

### Performance Issues:
- Add database indexes on LOWER(title), LOWER(content), LOWER(author_name)
- Consider full-text search for larger datasets
- Implement search result caching

## Automated Testing

Create a test script to validate search relevance:

```bash
# Run search relevance tests
php artisan test:search-relevance

# Generate search performance report
php artisan search:performance-report
```

## Manual Validation Checklist

- [ ] All exact title matches return correct result first
- [ ] Title prefix matches appear before content matches
- [ ] Author matches have appropriate ranking
- [ ] Multi-word queries combine scores correctly
- [ ] Case insensitive search works
- [ ] Empty queries show all results
- [ ] No-results queries handled gracefully
- [ ] Search performance meets targets
- [ ] Pagination works with search filters

## Next Steps

1. Implement automated test suite
2. Add search analytics tracking
3. A/B test scoring algorithm changes
4. Monitor user search behavior
5. Optimize for common query patterns

---

*Generated: February 22, 2026*
*Next Review: March 1, 2026*</content>
<parameter name="filePath">/home/joshua/Documents/hollowpress/docs/SEARCH_RELEVANCE_MATRIX.md