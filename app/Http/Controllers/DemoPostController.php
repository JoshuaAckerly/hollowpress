<?php

namespace App\Http\Controllers;

use App\Models\DemoPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Inertia\Inertia;

class DemoPostController extends Controller
{
    public function create()
    {
        return Inertia::render('Posts/DemoCreate');
    }

    public function store(\App\Http\Requests\StorePostRequest $request)
    {
        // Rate limiting: 5 demo posts per IP per hour
        $key = 'demo-post:' . $request->ip();
        
        if (RateLimiter::tooManyAttempts($key, 5)) {
            $seconds = RateLimiter::availableIn($key);
            return redirect()->back()
                ->withInput()
                ->with('error', "Too many demo posts created. Please try again in " . ceil($seconds / 60) . " minutes.");
        }

        try {
            DemoPost::create([
                'title' => $request->validated()['title'],
                'content' => $request->validated()['content'],
                'author_name' => $request->validated()['author_name'],
                'author_type' => $request->validated()['author_type'],
                'ip_address' => $request->ip(),
            ]);

            RateLimiter::hit($key, 3600); // 1 hour

            return redirect()->route('posts.index')->with('success', 'Demo post created! It will be removed in 48 hours.');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'Failed to create demo post. Please try again.');
        }
    }

    public function destroy(DemoPost $demoPost)
    {
        try {
            $demoPost->delete();
            return redirect()->route('posts.index')->with('success', 'Demo post deleted successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete demo post. Please try again.');
        }
    }
}
