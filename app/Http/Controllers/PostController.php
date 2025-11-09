<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        return Inertia::render('Posts/Index', [
            'posts' => Post::latest()->get()
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
