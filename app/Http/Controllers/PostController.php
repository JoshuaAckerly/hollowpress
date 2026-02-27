<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $search = trim((string) $request->query('q', ''));
        $author = trim((string) $request->query('author', ''));
        $category = trim((string) $request->query('category', ''));
        $dateFrom = $request->query('date_from');
        $dateTo = $request->query('date_to');
        $perPage = 9;

        $postsQuery = DB::table('posts')
            ->select('id', 'title', 'content', 'author_name', 'author_type', 'created_at')
            ->selectRaw('0 as is_demo');

        $demoPostsQuery = DB::table('demo_posts')
            ->select('id', 'title', 'content', 'author_name', 'author_type', 'created_at')
            ->selectRaw('1 as is_demo');

        $this->applyFacetFilters($postsQuery, $author, $category, $dateFrom, $dateTo);
        $this->applyFacetFilters($demoPostsQuery, $author, $category, $dateFrom, $dateTo);

        if ($search !== '') {
            $columns = ['title', 'content', 'author_name'];
            $this->applyAdvancedSearch($postsQuery, $search, $columns);
            $this->applyAdvancedSearch($demoPostsQuery, $search, $columns);

            [$scoreSql, $scoreBindings] = $this->buildSearchScore($search, $columns);
            $postsQuery->selectRaw("({$scoreSql}) as search_score", $scoreBindings);
            $demoPostsQuery->selectRaw("({$scoreSql}) as search_score", $scoreBindings);
        } else {
            $postsQuery->selectRaw('0 as search_score');
            $demoPostsQuery->selectRaw('0 as search_score');
        }

        $combinedQuery = $postsQuery->unionAll($demoPostsQuery);

        $paginatedPosts = DB::query()
            ->fromSub($combinedQuery, 'post_items')
            ->when($search !== '', fn ($query) => $query->orderByDesc('search_score'))
            ->orderByDesc('created_at')
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('Posts/Index', [
            'posts' => $paginatedPosts,
            'filters' => [
                'q' => $search,
                'author' => $author,
                'category' => $category,
                'date_from' => $dateFrom,
                'date_to' => $dateTo,
            ],
            'filterOptions' => [
                'categories' => ['artist', 'user'],
                'authors' => $this->getAuthorFilterOptions(),
            ],
        ]);
    }

    private function applyFacetFilters($query, string $author, string $category, ?string $dateFrom, ?string $dateTo): void
    {
        if ($author !== '') {
            $query->whereRaw('LOWER(author_name) like ?', ['%'.mb_strtolower($author).'%']);
        }

        if (in_array($category, ['artist', 'user'], true)) {
            $query->where('author_type', $category);
        }

        if ($dateFrom) {
            $query->whereDate('created_at', '>=', $dateFrom);
        }

        if ($dateTo) {
            $query->whereDate('created_at', '<=', $dateTo);
        }
    }

    private function applyAdvancedSearch($query, string $search, array $columns): void
    {
        $normalized = mb_strtolower(trim($search));

        if (str_contains($normalized, ' or ')) {
            $orParts = preg_split('/\s+or\s+/i', $normalized) ?: [];
            $query->where(function ($orQuery) use ($orParts, $columns) {
                foreach ($orParts as $part) {
                    $terms = $this->extractSearchTerms($part);

                    if ($terms === []) {
                        continue;
                    }

                    $orQuery->orWhere(function ($andQuery) use ($terms, $columns) {
                        foreach ($terms as $term) {
                            $this->applyTermMatch($andQuery, $term, $columns, 'and');
                        }
                    });
                }
            });

            return;
        }

        $terms = $this->extractSearchTerms($normalized);

        $query->where(function ($andQuery) use ($terms, $columns) {
            foreach ($terms as $term) {
                $this->applyTermMatch($andQuery, $term, $columns, 'and');
            }
        });
    }

    private function applyTermMatch($query, string $term, array $columns, string $boolean = 'and'): void
    {
        $method = $boolean === 'or' ? 'orWhere' : 'where';
        $query->{$method}(function ($termQuery) use ($term, $columns) {
            $first = true;
            foreach ($columns as $column) {
                $like = "%{$term}%";

                if ($first) {
                    $termQuery->whereRaw("LOWER({$column}) like ?", [$like]);
                    $first = false;
                } else {
                    $termQuery->orWhereRaw("LOWER({$column}) like ?", [$like]);
                }
            }
        });
    }

    private function extractSearchTerms(string $search): array
    {
        preg_match_all('/"([^"]+)"|(\S+)/', $search, $matches, PREG_SET_ORDER);

        $terms = [];
        foreach ($matches as $match) {
            $term = trim($match[1] !== '' ? $match[1] : $match[2]);

            if ($term === '' || in_array($term, ['and', 'or'], true)) {
                continue;
            }

            $terms[] = mb_strtolower($term);
        }

        return array_values(array_unique($terms));
    }

    private function buildSearchScore(string $search, array $columns): array
    {
        $terms = $this->extractSearchTerms($search);
        $scoreParts = [];
        $bindings = [];

        foreach ($terms as $term) {
            $exact = $term;
            $prefix = "{$term}%";
            $like = "%{$term}%";

            if (in_array('title', $columns, true)) {
                $scoreParts[] = 'CASE WHEN LOWER(title) = ? THEN 300 ELSE 0 END';
                $bindings[] = $exact;
                $scoreParts[] = 'CASE WHEN LOWER(title) LIKE ? THEN 180 ELSE 0 END';
                $bindings[] = $prefix;
                $scoreParts[] = 'CASE WHEN LOWER(title) LIKE ? THEN 120 ELSE 0 END';
                $bindings[] = $like;
            }

            if (in_array('author_name', $columns, true)) {
                $scoreParts[] = 'CASE WHEN LOWER(author_name) = ? THEN 90 ELSE 0 END';
                $bindings[] = $exact;
                $scoreParts[] = 'CASE WHEN LOWER(author_name) LIKE ? THEN 60 ELSE 0 END';
                $bindings[] = $like;
            }

            if (in_array('content', $columns, true)) {
                $scoreParts[] = 'CASE WHEN LOWER(content) LIKE ? THEN 40 ELSE 0 END';
                $bindings[] = $like;
            }
        }

        if ($scoreParts === []) {
            return ['0', []];
        }

        return [implode(' + ', $scoreParts), $bindings];
    }

    private function getAuthorFilterOptions(): array
    {
        $postAuthors = DB::table('posts')
            ->select('author_name')
            ->whereNotNull('author_name')
            ->pluck('author_name')
            ->toArray();

        $demoAuthors = DB::table('demo_posts')
            ->select('author_name')
            ->whereNotNull('author_name')
            ->pluck('author_name')
            ->toArray();

        $authors = array_values(array_unique(array_filter(array_merge($postAuthors, $demoAuthors))));
        sort($authors);

        return $authors;
    }

    public function create()
    {
        return Inertia::render('Posts/Create');
    }

    public function store(\App\Http\Requests\StorePostRequest $request)
    {
        try {
            Post::create($request->validated());
            return redirect()->route('posts.index')->with('success', 'Post created successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'Failed to create post. Please try again.');
        }
    }

    public function show(Post $post)
    {
        return Inertia::render('Posts/Show', [
            'post' => $post
        ]);
    }

    public function edit(Post $post)
    {
        return Inertia::render('Posts/Edit', [
            'post' => $post
        ]);
    }

    public function update(\App\Http\Requests\StorePostRequest $request, Post $post)
    {
        try {
            $post->update($request->validated());
            return redirect()->route('posts.index')->with('success', 'Post updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'Failed to update post. Please try again.');
        }
    }

    public function destroy(Post $post)
    {
        try {
            $post->delete();
            return redirect()->route('posts.index')->with('success', 'Post deleted successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete post. Please try again.');
        }
    }

}
