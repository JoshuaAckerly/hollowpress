<?php

namespace Tests\Feature;

use App\Models\Artist;
use App\Models\Album;
use App\Models\Event;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase;

class ArtistTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_view_artists_index()
    {
        $response = $this->get('/artists');
        $response->assertStatus(200);
    }

    public function test_can_view_single_artist()
    {
        $artist = Artist::factory()->create();
        $response = $this->get("/artists/{$artist->id}");
        $response->assertStatus(200);
    }

    public function test_artist_has_albums_relationship()
    {
        $artist = Artist::factory()->create();
        $album = Album::factory()->create(['artist_id' => $artist->id]);
        
        $this->assertTrue($artist->albums->contains($album));
    }

    public function test_artist_has_events_relationship()
    {
        $artist = Artist::factory()->create();
        $event = Event::factory()->create(['artist_id' => $artist->id]);
        
        $this->assertTrue($artist->events->contains($event));
    }

    public function test_sponsored_artist_page_loads()
    {
        Artist::factory()->create();
        $response = $this->get('/sponsored');
        $response->assertStatus(200);
    }

    public function test_artists_index_shows_artists_with_relationships()
    {
        $artist = Artist::factory()->create();
        Album::factory()->create(['artist_id' => $artist->id]);
        Event::factory()->create(['artist_id' => $artist->id]);

        $response = $this->get('/artists');
        $response->assertStatus(200);
    }
}