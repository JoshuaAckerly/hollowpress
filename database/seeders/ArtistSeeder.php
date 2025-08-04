<?php

namespace Database\Seeders;

use App\Models\Artist;
use App\Models\Album;
use App\Models\Event;
use Illuminate\Database\Seeder;

class ArtistSeeder extends Seeder
{
    public function run(): void
    {
        $artist1 = Artist::create([
            'name' => 'Lorem Ipsum',
            'bio' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
            'genre' => 'Electronic',
            'website' => 'https://loremipsum.com',
        ]);

        $artist2 = Artist::create([
            'name' => 'Dolor Sit Amet',
            'bio' => 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
            'genre' => 'Ambient',
            'website' => 'https://dolorsitamet.com',
        ]);

        $artist3 = Artist::create([
            'name' => 'Consectetur Adipiscing',
            'bio' => 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.',
            'genre' => 'Experimental',
            'website' => 'https://consectetur.com',
        ]);

        $artist4 = Artist::create([
            'name' => 'Sed Ut Perspiciatis',
            'bio' => 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa.',
            'genre' => 'Synthwave',
            'website' => 'https://sedutperspiciatis.com',
        ]);

        $artist5 = Artist::create([
            'name' => 'Nemo Enim Ipsam',
            'bio' => 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos.',
            'genre' => 'Dark Ambient',
            'website' => 'https://nemoenim.com',
        ]);

        $artist6 = Artist::create([
            'name' => 'Quis Autem Vel',
            'bio' => 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum.',
            'genre' => 'Industrial',
            'website' => 'https://quisautem.com',
        ]);

        // Albums for Artist 1
        Album::create([
            'artist_id' => $artist1->id,
            'title' => 'Magna Aliqua',
            'description' => 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.',
            'release_date' => '2023-06-15',
        ]);

        Album::create([
            'artist_id' => $artist1->id,
            'title' => 'Tempor Incididunt',
            'description' => 'Ut labore et dolore magna aliqua enim ad minim veniam quis nostrud.',
            'release_date' => '2024-03-20',
        ]);

        // Albums for Artist 2
        Album::create([
            'artist_id' => $artist2->id,
            'title' => 'Voluptate Velit',
            'description' => 'Esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat.',
            'release_date' => '2023-09-10',
        ]);

        // Events for Artist 1
        Event::create([
            'artist_id' => $artist1->id,
            'title' => 'Lorem Live Concert',
            'description' => 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.',
            'event_date' => '2024-12-15 20:00:00',
            'venue' => 'Lorem Concert Hall',
            'location' => 'Lorem City',
            'price' => 45.00,
        ]);

        Event::create([
            'artist_id' => $artist1->id,
            'title' => 'Ipsum Festival',
            'description' => 'Doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore.',
            'event_date' => '2025-01-20 19:30:00',
            'venue' => 'Ipsum Arena',
            'location' => 'Dolor City',
            'price' => 65.00,
        ]);

        // Events for Artist 2
        Event::create([
            'artist_id' => $artist2->id,
            'title' => 'Ambient Night',
            'description' => 'Veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
            'event_date' => '2024-11-30 21:00:00',
            'venue' => 'Sit Amet Club',
            'location' => 'Consectetur Town',
            'price' => 35.00,
        ]);

        // Events for Artist 3
        Event::create([
            'artist_id' => $artist3->id,
            'title' => 'Experimental Showcase',
            'description' => 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
            'event_date' => '2025-02-14 18:00:00',
            'venue' => 'Adipiscing Gallery',
            'location' => 'Elit District',
            'price' => 25.00,
        ]);

        // Albums for new artists
        Album::create([
            'artist_id' => $artist4->id,
            'title' => 'Unde Omnis Iste',
            'description' => 'Natus error sit voluptatem accusantium doloremque laudantium totam rem.',
            'release_date' => '2024-01-15',
        ]);

        Album::create([
            'artist_id' => $artist5->id,
            'title' => 'Magni Dolores Eos',
            'description' => 'Qui ratione voluptatem sequi nesciunt neque porro quisquam est.',
            'release_date' => '2023-11-20',
        ]);

        // Events for new artists
        Event::create([
            'artist_id' => $artist4->id,
            'title' => 'Synthwave Night',
            'description' => 'Aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto.',
            'event_date' => '2024-12-20 20:30:00',
            'venue' => 'Perspiciatis Club',
            'location' => 'Unde City',
            'price' => 40.00,
        ]);

        Event::create([
            'artist_id' => $artist6->id,
            'title' => 'Industrial Underground',
            'description' => 'Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.',
            'event_date' => '2025-01-10 22:00:00',
            'venue' => 'Autem Warehouse',
            'location' => 'Vel District',
            'price' => 30.00,
        ]);
    }
}