<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        Post::create([
            'title' => 'The Rise of Underground Electronic Music',
            'content' => 'The underground electronic music scene has undergone a seismic shift over the past decade. What was once confined to dimly lit basements and clandestine warehouse parties has found its way into the mainstream consciousness — yet somehow managed to retain its subversive edge. Labels operating outside the major-label machine have become the tastemakers, and artists who once pressed 300 vinyl copies are now charting on streaming platforms without compromising their sound. This is the story of how the underground stayed underground even as the world started listening.',
            'author_name' => 'Mara Voss',
            'author_type' => 'user',
            'tags' => ['electronic', 'underground', 'music-industry'],
        ]);

        Post::create([
            'title' => 'Interview: Echoes in the Static',
            'content' => 'We sat down with experimental noise duo Echoes in the Static ahead of their sold-out European tour. Between swigs of black coffee and cigarette smoke, they talked about recording in an abandoned textile mill, their refusal to master their latest LP, and why they think accessibility is overrated. "The discomfort is the point," says vocalist Renn. "If you need it to be comfortable, it was never meant for you."',
            'author_name' => 'Leon Harte',
            'author_type' => 'user',
            'tags' => ['interview', 'experimental', 'noise'],
        ]);

        Post::create([
            'title' => 'Album Review: Veil Synthesis – Monolith',
            'content' => 'Veil Synthesis returns with their fourth full-length, and Monolith lives up to its name. Across eleven tracks and 67 uninterrupted minutes, the duo constructs a slow-burning edifice of layered drones, fractured rhythms, and vocals buried so deep in the mix they function more as texture than melody. It is patient, demanding, and completely uncompromising. The opening track alone requires three listens before it reveals its architecture. Recommended without reservation for anyone willing to meet it on its own terms. 9/10',
            'author_name' => 'Sasha Odin',
            'author_type' => 'artist',
            'tags' => ['review', 'album', 'drone', 'dark-ambient'],
        ]);

        Post::create([
            'title' => 'On the Death of the Venue',
            'content' => 'Another week, another beloved venue closing its doors. The economics are brutal: rising rents, noise complaints from newly arrived residents, insurance costs that make smaller promoters flinch. The spaces where entire scenes were born — where you could see three bands for £5 and leave with your hearing changed and your mind expanded — are being replaced by luxury apartments and co-working spaces. What does a music community do when it loses its physical home? We spoke to promoters, artists, and venue owners about what comes next.',
            'author_name' => 'Priya Malik',
            'author_type' => 'user',
            'tags' => ['venues', 'music-community', 'culture'],
        ]);

        Post::create([
            'title' => 'The Aesthetics of Darkness in Visual Art',
            'content' => 'Darkness in visual art is not simply the absence of light. It is a compositional force, a mood, a philosophical stance. From the chiaroscuro of Caravaggio to the pitch-black canvases of Ad Reinhardt, artists have long used darkness to push against the assumption that visibility is inherently desirable. In the contemporary underground, illustrators and designers working for record labels, zines, and independent publishers are continuing this tradition — crafting imagery that demands the viewer lean in, sit with discomfort, and resist the urge to immediately understand.',
            'author_name' => 'Jules Karev',
            'author_type' => 'artist',
            'tags' => ['visual-art', 'aesthetics', 'design'],
        ]);

        Post::create([
            'title' => 'Synthwave and the Nostalgia Trap',
            'content' => 'Synthwave was supposed to be a love letter to a past that never quite existed. The neon-drenched highways, the analog warmth, the retrofuturism of 1980s cinema — all filtered through a contemporary lens that knew it was performing nostalgia. At its best it produced genuinely moving music. But a decade in, the genre risks calcifying into self-parody. The challenge for artists working in this space is the same it has always been: how do you honour an influence without becoming a tribute act?',
            'author_name' => 'Dmitri Crane',
            'author_type' => 'user',
            'tags' => ['synthwave', 'electronic', 'genre'],
        ]);

        Post::create([
            'title' => 'Building a Show from Scratch: A Promoter\'s Guide',
            'content' => 'You have a venue, a handful of artists you believe in, and approximately no budget. Welcome to independent music promotion. This guide is not about scaling to festival size — it is about making something real happen in a 200-cap room with £300 and a lot of goodwill. We cover venue negotiation, artist fees, door deals, flyering strategy, day-of logistics, sound check etiquette, and the post-show accounting that nobody ever talks about. No hype, no buzzwords — just the practical realities.',
            'author_name' => 'Cora Nguyen',
            'author_type' => 'user',
            'tags' => ['promotion', 'events', 'guide'],
        ]);

        Post::create([
            'title' => 'Cassette Culture in the Age of Streaming',
            'content' => 'The cassette tape never fully died — it just went underground. While the CD had its moment of ridicule before its rehabilitation as a collectors\' format, the cassette quietly kept moving. Small labels never stopped pressing them. Artists who wanted a tactile, affordable format kept choosing them. Now, with cassette sales showing consistent year-on-year growth and dedicated labels moving hundreds of units per release, it is worth asking: what does the cassette offer that a stream never can? Warmth, limitation, intentionality — and the deliberate friction of side A and side B.',
            'author_name' => 'Mara Voss',
            'author_type' => 'user',
            'tags' => ['cassette', 'physical-media', 'underground'],
        ]);

        Post::create([
            'title' => 'Label Spotlight: Peripheral Frequencies',
            'content' => 'Peripheral Frequencies has released 34 records in four years without a single social media account, a website, or a publicist. Distribution is entirely through a mailing list and a small network of trusted record shops. Every release is limited to 200 copies and sells out within days. The label\'s founder, who goes only by the initials T.K., agreed to answer ten questions by post. The responses arrived six weeks later, handwritten on graph paper. This is that interview.',
            'author_name' => 'Leon Harte',
            'author_type' => 'user',
            'tags' => ['label', 'interview', 'independent'],
        ]);

        Post::create([
            'title' => 'Live Review: Obsidian Rite at The Cellar',
            'content' => 'Friday night at The Cellar, and the room was at capacity fifteen minutes before doors were scheduled to open. Obsidian Rite took the stage with no introduction, no backing tracks, and no lighting beyond a single red bulb stage right. What followed was 55 minutes of ritualistic industrial noise that felt less like a concert and more like a sustained, collective act of submission. By the third piece the crowd had stopped moving entirely — not from boredom, but from the weight of the sound. An experience, not just a show.',
            'author_name' => 'Sasha Odin',
            'author_type' => 'artist',
            'tags' => ['live-review', 'industrial', 'events'],
        ]);

        Post::create([
            'title' => 'The Politics of Genre Names',
            'content' => 'Every genre name is an argument. Darkwave, post-punk, coldwave, minimal synth — these are not neutral descriptors but contested territories, each carrying assumptions about lineage, geography, and cultural ownership. When a Berlin producer calls something "EBM" and a Chicago producer calls the same record "industrial," they are not simply disagreeing about labels. They are asserting different histories. Understanding genre nomenclature as a political act, rather than a taxonomic one, changes how we hear the music.',
            'author_name' => 'Priya Malik',
            'author_type' => 'user',
            'tags' => ['genre', 'culture', 'theory'],
        ]);

        Post::create([
            'title' => 'How to Press Vinyl on a Budget',
            'content' => 'Vinyl pressing is not cheap — but it is more accessible than it was five years ago. New pressing plants have opened across Europe and North America, lead times have shortened, and small-batch options have multiplied. This practical breakdown covers everything from preparing your audio files (always 24-bit, always leave headroom) to choosing a plant, understanding lacquer versus DMM cutting, selecting weight and colour options, and the arithmetic of how many copies you need to press to break even. Not glamorous, but essential reading before you commit to 300 records sitting in your bedroom.',
            'author_name' => 'Cora Nguyen',
            'author_type' => 'user',
            'tags' => ['vinyl', 'guide', 'physical-media'],
        ]);
    }
}
