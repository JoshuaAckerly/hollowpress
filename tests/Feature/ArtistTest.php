<?php

namespace Tests\Feature;

use App\Models\Album;
use App\Models\Artist;
use App\Models\Event;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase;

class ArtistTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_view_artists_index(): void
    {
        $response = $this->get('/artists');
        $response->assertStatus(200);
    }

    public function test_can_view_single_artist(): void
    {
        $artist = Artist::factory()->create();
        $response = $this->get("/artists/{$artist->id}");
        $response->assertStatus(200);
    }

    public function test_artist_has_albums_relationship(): void
    {
        $artist = Artist::factory()->create();
        $album = Album::factory()->create(['artist_id' => $artist->id]);

        /** @var \Illuminate\Database\Eloquent\Collection<int, \App\Models\Album> $albums */
        $albums = $artist->albums;
        $this->assertTrue($albums->contains($album));
    }

    public function test_artist_has_events_relationship(): void
    {
        $artist = Artist::factory()->create();
        $event = Event::factory()->create(['artist_id' => $artist->id]);

        /** @var \Illuminate\Database\Eloquent\Collection<int, \App\Models\Event> $events */
        $events = $artist->events;
        $this->assertTrue($events->contains($event));
    }

    public function test_sponsored_artist_page_loads(): void
    {
        Artist::factory()->create();
        $response = $this->get('/sponsored');
        $response->assertStatus(200);
    }

    public function test_artists_index_shows_artists_with_relationships(): void
    {
        $artist = Artist::factory()->create();
        Album::factory()->create(['artist_id' => $artist->id]);
        Event::factory()->create(['artist_id' => $artist->id]);

        $response = $this->get('/artists');
        $response->assertStatus(200);
    }
}
