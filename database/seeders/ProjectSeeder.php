<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        Project::create([
            'title' => 'Hollow Press Platform',
            'slug' => 'hollow-press-platform',
            'summary' => 'The core publishing and artist management platform powering Hollow Press — built with Laravel, React, and Inertia.js.',
            'description' => "A full-stack content platform built for the underground music and arts press. Features include a blog with rich tag filtering, artist profiles with albums and tour dates, case study portfolios, newsletter subscriptions, and a moderated comment system.\n\nThe platform was designed with performance and dark aesthetics in mind — server-side caching for artist lists and tag filter options, structured logging, and a clean admin workflow backed by a token-based dashboard.",
            'status' => 'active',
            'year' => 2025,
            'tags' => ['Laravel', 'React', 'Inertia.js', 'TypeScript', 'Tailwind CSS', 'MySQL'],
            'cover_image' => null,
            'project_url' => null,
            'is_featured' => true,
        ]);

        Project::create([
            'title' => 'Dark Echoes Music Platform',
            'slug' => 'dark-echoes-music-platform',
            'summary' => 'A streaming platform for underground and alternative artists featuring adaptive audio delivery and AI-powered discovery.',
            'description' => "Built a full-stack music streaming platform tailored to underground and experimental artists. The platform handles high-quality FLAC and WAV streaming via adaptive bitrate, an AI recommendation engine based on listening patterns, and a social layer with follows and direct messaging.\n\nReal-time features were implemented with WebSockets, media assets distributed via CloudFront, and the dark-themed UI was crafted with React and Tailwind CSS.",
            'status' => 'completed',
            'year' => 2024,
            'tags' => ['Laravel', 'React', 'TypeScript', 'Redis', 'AWS S3', 'WebSockets', 'PostgreSQL'],
            'cover_image' => null,
            'project_url' => null,
            'is_featured' => true,
        ]);

        Project::create([
            'title' => 'Shadowcraft E-commerce',
            'slug' => 'shadowcraft-ecommerce',
            'summary' => 'Custom e-commerce platform for a gothic and alternative fashion brand, built for both aesthetics and conversion.',
            'description' => "Developed a bespoke e-commerce experience for a handmade gothic fashion label. The product configurator handles complex variations including custom sizing, material choices, and engraving options.\n\nIntegrated Stripe and PayPal for international checkouts, automated abandoned-cart recovery emails, and an admin dashboard with real-time inventory and order tracking. The mobile-first design saw a 60% lift in mobile conversion rate post-launch.",
            'status' => 'completed',
            'year' => 2024,
            'tags' => ['Laravel', 'Vue.js', 'Tailwind CSS', 'Stripe', 'MySQL', 'Redis', 'Docker'],
            'cover_image' => null,
            'project_url' => null,
            'is_featured' => false,
        ]);

        Project::create([
            'title' => 'Nocturnal Events System',
            'slug' => 'nocturnal-events-system',
            'summary' => 'End-to-end event management for underground music and art events — ticketing, artist scheduling, and QR-based entry.',
            'description' => "A comprehensive event operations platform covering dynamic ticket tiers, early-bird pricing, artist lineup scheduling with conflict detection, and QR code generation and real-time validation at the door.\n\nBuilt a companion React Native app for on-site scanning that reduced average check-in time by 70%. The platform managed 100+ events and 50,000+ ticket sales in its first year with 99.9% uptime.",
            'status' => 'completed',
            'year' => 2024,
            'tags' => ['Laravel', 'React Native', 'PostgreSQL', 'Stripe', 'Redis', 'Docker'],
            'cover_image' => null,
            'project_url' => null,
            'is_featured' => false,
        ]);

        Project::create([
            'title' => 'Midnight Gallery Virtual Exhibition',
            'slug' => 'midnight-gallery-virtual-exhibition',
            'summary' => 'Immersive 3D virtual art gallery with VR headset support and artist-managed exhibition spaces.',
            'description' => "A browser-based 3D art gallery platform powered by Three.js and WebXR. Artists curate their own exhibition spaces through a custom CMS, choosing from multiple gallery templates. High-resolution artwork is loaded progressively to maintain performance.\n\n15% of users accessed exhibitions via VR headsets. The platform hosted 50+ exhibitions and drew 25,000+ unique visitors in its first year, with an average visit duration of 18 minutes.",
            'status' => 'completed',
            'year' => 2024,
            'tags' => ['React', 'Three.js', 'WebXR', 'Node.js', 'MongoDB', 'AWS'],
            'cover_image' => null,
            'project_url' => null,
            'is_featured' => false,
        ]);

        Project::create([
            'title' => 'Artist Analytics Dashboard',
            'slug' => 'artist-analytics-dashboard',
            'summary' => 'Internal analytics dashboard giving artists real-time insight into streams, fan demographics, and tour revenue.',
            'description' => "Designed and built an internal reporting tool for artists on the Hollow Press roster. Aggregates streaming counts, listener geography, newsletter engagement, and event ticket revenue into a unified dark-themed dashboard.\n\nData pipelines run nightly via Laravel queued jobs, with key metrics cached in Redis for fast dashboard loads. Charts are rendered client-side with Recharts.",
            'status' => 'active',
            'year' => 2025,
            'tags' => ['Laravel', 'React', 'Recharts', 'Redis', 'MySQL'],
            'cover_image' => null,
            'project_url' => null,
            'is_featured' => false,
        ]);
    }
}
