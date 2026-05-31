<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Models\Post;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(Request $request): Response
    {
        $search = trim((string) $request->query('q', ''));
        $author = trim((string) $request->query('author', ''));
        $category = trim((string) $request->query('category', ''));
        $tag = trim((string) $request->query('tag', ''));
        $dateFrom = $request->query('date_from');
        $dateTo = $request->query('date_to');
        $perPage = 9;

        $postsQuery = DB::table('posts')
            ->select('id', 'title', 'author_name', 'author_type', 'created_at', 'featured_image', 'tags')
            ->selectRaw('LEFT(content, 800) as content')
            ->selectRaw('0 as is_demo');

        $demoPostsQuery = DB::table('demo_posts')
            ->select('id', 'title', 'author_name', 'author_type', 'created_at')
            ->selectRaw('NULL as featured_image')
            ->selectRaw('NULL as tags')
            ->selectRaw('LEFT(content, 800) as content')
            ->selectRaw('1 as is_demo');

        $this->applyFacetFilters($postsQuery, $author, $category, $dateFrom, $dateTo);
        $this->applyFacetFilters($demoPostsQuery, $author, $category, $dateFrom, $dateTo);

        if ($tag !== '') {
            $postsQuery->whereRaw('JSON_CONTAINS(tags, ?)', [json_encode($tag)]);
            // demo_posts have no tags; exclude them when filtering by tag
            $demoPostsQuery->whereRaw('1 = 0');
        }

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
                'tag' => $tag,
                'date_from' => $dateFrom,
                'date_to' => $dateTo,
            ],
            'filterOptions' => [
                'categories' => ['artist', 'user'],
                'authors' => $this->getAuthorFilterOptions(),
                'tags' => $this->getTagFilterOptions(),
            ],
        ]);
    }

    private function applyFacetFilters(Builder $query, string $author, string $category, ?string $dateFrom, ?string $dateTo): void
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

    /** @param array<int, string> $columns */
    private function applyAdvancedSearch(Builder $query, string $search, array $columns): void
    {
        $normalized = mb_strtolower(trim($search));

        if (str_contains($normalized, ' or ')) {
            $orParts = preg_split('/\s+or\s+/i', $normalized) ?: [];
            $query->where(function (Builder $orQuery) use ($orParts, $columns) {
                foreach ($orParts as $part) {
                    $terms = $this->extractSearchTerms($part);

                    if ($terms === []) {
                        continue;
                    }

                    $orQuery->orWhere(function (Builder $andQuery) use ($terms, $columns) {
                        foreach ($terms as $term) {
                            $this->applyTermMatch($andQuery, $term, $columns, 'and');
                        }
                    });
                }
            });

            return;
        }

        $terms = $this->extractSearchTerms($normalized);

        $query->where(function (Builder $andQuery) use ($terms, $columns) {
            foreach ($terms as $term) {
                $this->applyTermMatch($andQuery, $term, $columns, 'and');
            }
        });
    }

    /** @param array<int, string> $columns */
    private function applyTermMatch(Builder $query, string $term, array $columns, string $boolean = 'and'): void
    {
        $method = $boolean === 'or' ? 'orWhere' : 'where';
        $query->{$method}(function (Builder $termQuery) use ($term, $columns) {
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

    /** @return array<int, string> */
    private function extractSearchTerms(string $search): array
    {
        preg_match_all('/"([^"]+)"|(\S+)/', $search, $matches, PREG_SET_ORDER);

        $terms = [];
        foreach ($matches as $match) {
            $term = trim(isset($match[1]) ? $match[1] : ($match[2] ?? ''));

            if ($term === '' || in_array($term, ['and', 'or'], true)) {
                continue;
            }

            $terms[] = mb_strtolower($term);
        }

        return array_values(array_unique($terms));
    }

    /**
     * @param  array<int, string>  $columns
     * @return array{0: string, 1: array<int, mixed>}
     */
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

    /**
     * @return array<int, string>
     */
    private function getAuthorFilterOptions(): array
    {
        /** @var array<int, string> $result */
        $result = Cache::remember('posts.author_filter_options', now()->addMinutes(10), function () {
            return DB::query()
                ->fromSub(function (Builder $query) {
                    $query->from('posts')
                        ->select('author_name')
                        ->whereNotNull('author_name')
                        ->union(
                            DB::table('demo_posts')
                                ->select('author_name')
                                ->whereNotNull('author_name')
                        );
                }, 'author_pool')
                ->select('author_name')
                ->distinct()
                ->orderBy('author_name')
                ->pluck('author_name')
                ->filter()
                ->values()
                ->all();
        });

        return $result;
    }

    /**
     * @return array<int, string>
     */
    private function getTagFilterOptions(): array
    {
        /** @var array<int, string> $result */
        $result = Cache::remember('posts.tag_filter_options', now()->addMinutes(10), function () {
            $rows = DB::table('posts')
                ->whereNotNull('tags')
                ->pluck('tags');

            return collect($rows)
                ->flatMap(function (string $json): array {
                    $decoded = json_decode($json, true);

                    return is_array($decoded) ? $decoded : [];
                })
                ->filter(fn ($tag) => is_string($tag) && $tag !== '')
                ->unique()
                ->sort()
                ->values()
                ->all();
        });

        return $result;
    }

    public function create(): Response
    {
        return Inertia::render('Posts/Create');
    }

    public function store(StorePostRequest $request): RedirectResponse
    {
        try {
            $validated = $request->validated();

            if ($request->hasFile('featured_image')) {
                /** @var \Illuminate\Http\UploadedFile $file */
                $file = $request->file('featured_image');
                $validated['featured_image'] = $file->store('posts', 'public');
            }

            Post::create($validated);
            Cache::forget('posts.tag_filter_options');

            return redirect()->route('posts.index')->with('success', 'Post created successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'Failed to create post. Please try again.');
        }
    }

    public function show(Post $post): Response
    {
        // @phpstan-ignore-next-line call.notFound
        $comments = $post->comments()
            ->approved()
            ->latest()
            ->get(['id', 'post_id', 'author_name', 'content', 'created_at']);

        return Inertia::render('Posts/Show', [
            'post' => $post,
            'comments' => $comments,
            'relatedPosts' => $post->related(3),
        ]);
    }

    public function edit(Post $post): Response
    {
        return Inertia::render('Posts/Edit', [
            'post' => $post,
        ]);
    }

    public function update(StorePostRequest $request, Post $post): RedirectResponse
    {
        try {
            $validated = $request->validated();

            if ($request->hasFile('featured_image')) {
                if ($post->featured_image) {
                    Storage::disk('public')->delete($post->featured_image);
                }
                /** @var \Illuminate\Http\UploadedFile $file */
                $file = $request->file('featured_image');
                $validated['featured_image'] = $file->store('posts', 'public');
            } else {
                unset($validated['featured_image']);
            }

            $post->update($validated);
            Cache::forget('posts.tag_filter_options');

            return redirect()->route('posts.index')->with('success', 'Post updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'Failed to update post. Please try again.');
        }
    }

    public function destroy(Post $post): RedirectResponse
    {
        try {
            if ($post->featured_image) {
                Storage::disk('public')->delete($post->featured_image);
            }

            $post->delete();
            Cache::forget('posts.tag_filter_options');

            return redirect()->route('posts.index')->with('success', 'Post deleted successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete post. Please try again.');
        }
    }
}
