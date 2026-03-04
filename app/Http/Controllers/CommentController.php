<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Support\Facades\RateLimiter;

class CommentController extends Controller
{
    public function store(StoreCommentRequest $request, Post $post)
    {
        $key = 'post-comment:'.$post->id.':'.$request->ip();

        if (RateLimiter::tooManyAttempts($key, 10)) {
            $seconds = RateLimiter::availableIn($key);

            return redirect()
                ->route('posts.show', ['post' => $post->id])
                ->with('error', 'Too many comments submitted. Please try again in '.ceil($seconds / 60).' minutes.');
        }

        try {
            $post->comments()->create([
                'author_name' => $request->validated()['author_name'],
                'content' => $request->validated()['content'],
                'is_approved' => false,
            ]);

            RateLimiter::hit($key, 3600); // 1 hour

            return redirect()
                ->route('posts.show', ['post' => $post->id])
                ->with('success', 'Comment submitted and awaiting approval.');
        } catch (\Exception $e) {
            return redirect()
                ->route('posts.show', ['post' => $post->id])
                ->with('error', 'Failed to submit comment. Please try again.');
        }
    }

    public function approve(Comment $comment)
    {
        try {
            $comment->update(['is_approved' => true]);

            return redirect()
                ->route('dashboard')
                ->with('success', 'Comment approved successfully.');
        } catch (\Exception $e) {
            return redirect()
                ->route('dashboard')
                ->with('error', 'Failed to approve comment. Please try again.');
        }
    }

    public function unapprove(Comment $comment)
    {
        try {
            $comment->update(['is_approved' => false]);

            return redirect()
                ->route('dashboard')
                ->with('success', 'Comment unapproved successfully.');
        } catch (\Exception $e) {
            return redirect()
                ->route('dashboard')
                ->with('error', 'Failed to unapprove comment. Please try again.');
        }
    }
}
