<?php

use App\Http\Controllers\ArtistController;
use App\Http\Controllers\CaseStudyController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DemoPostController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RssController;
use App\Http\Controllers\SitemapController;
use App\Http\Middleware\EnsureDashboardAdminToken;
use App\Models\Artist;
use App\Models\CaseStudy;
use App\Models\Comment;
use App\Models\DemoPost;
use App\Models\Post;
use App\Models\Project;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $posts = Post::latest()->take(3)->get();
    $artists = Artist::with(['albums', 'events'])->take(3)->get();

    return Inertia::render('welcome', [
        'posts' => $posts,
        'artists' => $artists,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    $publishedPostsCount = Post::count();
    $draftPostsCount = DemoPost::count();
    $artistsCount = Artist::count();
    $caseStudiesCount = CaseStudy::count();
    $projectsCount = Project::count();

    $recentProjects = Project::latest()->take(5)->get(['id', 'title', 'slug', 'status', 'created_at']);

    $recentPosts = Post::latest()->take(5)->get(['id', 'title', 'author_name', 'created_at']);
    $recentCaseStudies = CaseStudy::latest()->take(5)->get(['id', 'title', 'slug', 'created_at']);
    $recentComments = Comment::with('post:id,title')
        ->latest()
        ->take(8)
        ->get(['id', 'post_id', 'author_name', 'content', 'is_approved', 'created_at']);

    return Inertia::render('Dashboard', [
        'stats' => [
            'publishedPostsCount' => $publishedPostsCount,
            'draftPostsCount' => $draftPostsCount,
            'artistsCount' => $artistsCount,
            'caseStudiesCount' => $caseStudiesCount,
            'projectsCount' => $projectsCount,
        ],
        'recentPosts' => $recentPosts,
        'recentCaseStudies' => $recentCaseStudies,
        'recentProjects' => $recentProjects,
        'recentComments' => $recentComments,
    ]);
})->name('dashboard');

// Posts routes (view only - no auth required)
Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
Route::get('/posts/{post}', [PostController::class, 'show'])->name('posts.show');
Route::post('/posts/{post}/comments', [CommentController::class, 'store'])->name('posts.comments.store');

// Posts CRUD (admin only)
Route::middleware(EnsureDashboardAdminToken::class)->group(function () {
    Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
    Route::get('/posts/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
    Route::put('/posts/{post}', [PostController::class, 'update'])->name('posts.update');
    Route::delete('/posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');

    Route::patch('/dashboard/comments/{comment}/approve', [CommentController::class, 'approve'])->name('dashboard.comments.approve');
    Route::patch('/dashboard/comments/{comment}/unapprove', [CommentController::class, 'unapprove'])->name('dashboard.comments.unapprove');
});

// Demo posts routes (create/edit/delete without auth)
Route::get('/demo/posts/create', [DemoPostController::class, 'create'])->name('demo.posts.create');
Route::post('/demo/posts', [DemoPostController::class, 'store'])->name('demo.posts.store');
Route::delete('/demo/posts/{demoPost}', [DemoPostController::class, 'destroy'])->name('demo.posts.destroy');

Route::resource('artists', ArtistController::class)->only(['index', 'show']);

Route::get('/sponsored', function () {
    $sponsoredArtist = Artist::with(['albums', 'events'])->first();

    return Inertia::render('Sponsored', [
        'artist' => $sponsoredArtist,
    ]);
})->name('sponsored');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe'])->name('newsletter.subscribe');
Route::get('/newsletter/unsubscribe/{token}', [NewsletterController::class, 'unsubscribe'])->name('newsletter.unsubscribe');

Route::get('/case-studies', [CaseStudyController::class, 'index'])->name('case-studies.index');
Route::get('/case-studies/{slug}', [CaseStudyController::class, 'show'])->name('case-studies.show');

Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
Route::get('/projects/{slug}', [ProjectController::class, 'show'])->name('projects.show');

// Dynamic XML Sitemap
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');

// RSS Feed
Route::get('/feed.rss', [RssController::class, 'feed'])->name('rss.feed');

Route::redirect('/login', '/', 301);
Route::redirect('/register', '/', 301);
Route::redirect('/forgot-password', '/', 301);
Route::redirect('/reset-password', '/', 301);
Route::redirect('/reset-password/*', '/', 301);
Route::redirect('/email-verification', '/', 301);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
