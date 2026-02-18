<?php

use App\Models\Artist;
use App\Models\CaseStudy;
use App\Models\DemoPost;
use App\Models\Post;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $posts = Post::latest()->take(3)->get();
    $artists = Artist::with(['albums', 'events'])->take(3)->get();
    return Inertia::render('welcome', [
        'posts' => $posts,
        'artists' => $artists
    ]);
})->name('home');

Route::get('/dashboard', function () {
    $publishedPostsCount = Post::count();
    $draftPostsCount = DemoPost::count();
    $artistsCount = Artist::count();
    $caseStudiesCount = CaseStudy::count();

    $recentPosts = Post::latest()->take(5)->get(['id', 'title', 'author_name', 'created_at']);
    $recentCaseStudies = CaseStudy::latest()->take(5)->get(['id', 'title', 'slug', 'created_at']);

    return Inertia::render('Dashboard', [
        'stats' => [
            'publishedPostsCount' => $publishedPostsCount,
            'draftPostsCount' => $draftPostsCount,
            'artistsCount' => $artistsCount,
            'caseStudiesCount' => $caseStudiesCount,
        ],
        'recentPosts' => $recentPosts,
        'recentCaseStudies' => $recentCaseStudies,
    ]);
})->name('dashboard');

// Posts routes (view only - no auth required)
Route::get('/posts', [\App\Http\Controllers\PostController::class, 'index'])->name('posts.index');
Route::get('/posts/{post}', [\App\Http\Controllers\PostController::class, 'show'])->name('posts.show');
Route::get('/posts/{post}/edit', function ($post) {
    return redirect()->route('posts.show', ['post' => $post], 301);
});

// Demo posts routes (create/edit/delete without auth)
Route::get('/demo/posts/create', [\App\Http\Controllers\DemoPostController::class, 'create'])->name('demo.posts.create');
Route::post('/demo/posts', [\App\Http\Controllers\DemoPostController::class, 'store'])->name('demo.posts.store');
Route::delete('/demo/posts/{demoPost}', [\App\Http\Controllers\DemoPostController::class, 'destroy'])->name('demo.posts.destroy');

Route::resource('artists', \App\Http\Controllers\ArtistController::class)->only(['index', 'show']);

Route::get('/sponsored', function () {
    $sponsoredArtist = \App\Models\Artist::with(['albums', 'events'])->first();
    return Inertia::render('Sponsored', [
        'artist' => $sponsoredArtist
    ]);
})->name('sponsored');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/contact', [\App\Http\Controllers\ContactController::class, 'index'])->name('contact');
Route::post('/contact', [\App\Http\Controllers\ContactController::class, 'store'])->name('contact.store');

Route::get('/case-studies', [\App\Http\Controllers\CaseStudyController::class, 'index'])->name('case-studies.index');
Route::get('/case-studies/{slug}', [\App\Http\Controllers\CaseStudyController::class, 'show'])->name('case-studies.show');

// Dynamic XML Sitemap
Route::get('/sitemap.xml', [\App\Http\Controllers\SitemapController::class, 'index'])->name('sitemap');

Route::redirect('/login', '/', 301);
Route::redirect('/register', '/', 301);
Route::redirect('/forgot-password', '/', 301);
Route::redirect('/reset-password', '/', 301);
Route::redirect('/reset-password/*', '/', 301);
Route::redirect('/email-verification', '/', 301);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
