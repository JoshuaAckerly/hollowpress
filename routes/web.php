<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $posts = \App\Models\Post::latest()->take(3)->get();
    $artists = \App\Models\Artist::with(['albums', 'events'])->take(3)->get();
    return Inertia::render('welcome', [
        'posts' => $posts,
        'artists' => $artists
    ]);
})->name('home');

Route::resource('posts', \App\Http\Controllers\PostController::class);
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

Route::redirect('/login', '/', 301);
Route::redirect('/register', '/', 301);
Route::redirect('/forgot-password', '/', 301);
Route::redirect('/reset-password', '/', 301);
Route::redirect('/reset-password/*', '/', 301);
Route::redirect('/email-verification', '/', 301);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
