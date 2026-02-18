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
        $perPage = 9;
        $normalizedSearch = mb_strtolower($search);
        $likeSearch = "%{$normalizedSearch}%";
        $prefixSearch = "{$normalizedSearch}%";

        $postsQuery = DB::table('posts')
            ->select('id', 'title', 'content', 'author_name', 'author_type', 'created_at')
            ->selectRaw('0 as is_demo');

        $demoPostsQuery = DB::table('demo_posts')
            ->select('id', 'title', 'content', 'author_name', 'author_type', 'created_at')
            ->selectRaw('1 as is_demo');

        if ($search !== '') {
            $searchWhere = function ($query) use ($likeSearch) {
                $query->whereRaw('LOWER(title) like ?', [$likeSearch])
                    ->orWhereRaw('LOWER(content) like ?', [$likeSearch])
                    ->orWhereRaw('LOWER(author_name) like ?', [$likeSearch]);
            };

            $postsQuery->where($searchWhere)
                ->selectRaw(
                    "(\n                        CASE WHEN LOWER(title) = ? THEN 400 ELSE 0 END +\n                        CASE WHEN LOWER(title) LIKE ? THEN 250 ELSE 0 END +\n                        CASE WHEN LOWER(title) LIKE ? THEN 180 ELSE 0 END +\n                        CASE WHEN LOWER(author_name) = ? THEN 140 ELSE 0 END +\n                        CASE WHEN LOWER(author_name) LIKE ? THEN 90 ELSE 0 END +\n                        CASE WHEN LOWER(content) LIKE ? THEN 60 ELSE 0 END\n                    ) as search_score",
                    [
                        $normalizedSearch,
                        $prefixSearch,
                        $likeSearch,
                        $normalizedSearch,
                        $likeSearch,
                        $likeSearch,
                    ]
                );

            $demoPostsQuery->where($searchWhere)
                ->selectRaw(
                    "(\n                        CASE WHEN LOWER(title) = ? THEN 400 ELSE 0 END +\n                        CASE WHEN LOWER(title) LIKE ? THEN 250 ELSE 0 END +\n                        CASE WHEN LOWER(title) LIKE ? THEN 180 ELSE 0 END +\n                        CASE WHEN LOWER(author_name) = ? THEN 140 ELSE 0 END +\n                        CASE WHEN LOWER(author_name) LIKE ? THEN 90 ELSE 0 END +\n                        CASE WHEN LOWER(content) LIKE ? THEN 60 ELSE 0 END\n                    ) as search_score",
                    [
                        $normalizedSearch,
                        $prefixSearch,
                        $likeSearch,
                        $normalizedSearch,
                        $likeSearch,
                        $likeSearch,
                    ]
                );
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
            ],
        ]);
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
