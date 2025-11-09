<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArtistController extends Controller
{
    public function index()
    {
        try {
            $artists = Artist::with(['albums', 'events'])->get();
            return Inertia::render('Artists/Index', [
                'artists' => $artists
            ]);
        } catch (\Exception $e) {
            return redirect()->route('home')->with('error', 'Unable to load artists. Please try again.');
        }
    }

    public function show(Artist $artist)
    {
        try {
            return Inertia::render('Artists/Show', [
                'artist' => $artist->load(['albums', 'events'])
            ]);
        } catch (\Exception $e) {
            return redirect()->route('artists.index')->with('error', 'Artist not found.');
        }
    }
}
