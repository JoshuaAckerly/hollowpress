<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Response;

class RssController extends Controller
{
    public function feed(): Response
    {
        $configUrl = config('app.url');
        $baseUrl = rtrim(is_string($configUrl) ? $configUrl : 'https://hollowpress.graveyardjokes.com', '/');

        $posts = Post::latest()->take(20)->get();

        return response()
            ->view('rss.feed', compact('posts', 'baseUrl'))
            ->header('Content-Type', 'application/rss+xml; charset=UTF-8');
    }
}
