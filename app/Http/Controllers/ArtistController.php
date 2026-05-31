<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class ArtistController extends Controller
{
    public function index(): Response|RedirectResponse
    {
        try {
            /** @var \Illuminate\Database\Eloquent\Collection<int, Artist> $artists */
            $artists = Cache::remember('artists.all', now()->addMinutes(15), fn () => Artist::with(['albums', 'events'])->get());

            return Inertia::render('Artists/Index', [
                'artists' => $artists,
            ]);
        } catch (\Exception $e) {
            return redirect()->route('home')->with('error', 'Unable to load artists. Please try again.');
        }
    }

    public function show(Artist $artist): Response|RedirectResponse
    {
        try {
            return Inertia::render('Artists/Show', [
                'artist' => $artist->load(['albums', 'events']),
            ]);
        } catch (\Exception $e) {
            return redirect()->route('artists.index')->with('error', 'Artist not found.');
        }
    }
}
