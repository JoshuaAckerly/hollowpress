<?php

namespace Tests\Feature;

use App\Models\CaseStudy;
use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SearchRelevanceTest extends TestCase
{
    use RefreshDatabase;

    public function test_posts_search_prioritizes_exact_title_match(): void
    {
        Post::factory()->create([
            'title' => 'Lunar Echoes',
            'content' => 'General article body',
            'author_name' => 'Writer One',
        ]);

        Post::factory()->create([
            'title' => 'Weekly Dispatch',
            'content' => 'This article references lunar echoes in passing.',
            'author_name' => 'Writer Two',
        ]);

        $response = $this->get('/posts?q=Lunar Echoes');

        $response->assertOk();
        $response->assertSeeInOrder(['Lunar Echoes', 'Weekly Dispatch']);
    }

    public function test_case_studies_search_is_case_insensitive(): void
    {
        CaseStudy::factory()->create([
            'title' => 'Neon Dusk Campaign',
            'slug' => 'neon-dusk-campaign',
            'description' => 'Launch plan for neon campaign',
            'client_name' => 'Nightwire',
            'project_type' => 'Branding',
        ]);

        $response = $this->get('/case-studies?q=NEON');

        $response->assertOk();
        $response->assertSee('Neon Dusk Campaign');
    }

    public function test_posts_search_pagination_keeps_query_string(): void
    {
        Post::factory()->count(12)->create([
            'title' => 'Signal Story',
            'content' => 'Signal content block',
            'author_name' => 'Signal Team',
            'author_type' => 'artist',
        ]);

        Post::factory()->count(6)->create([
            'title' => 'Signal Story',
            'content' => 'Signal content block',
            'author_name' => 'Signal Team',
            'author_type' => 'artist',
        ]);

        $response = $this->get('/posts?q=Signal&category=artist');

        $response->assertOk();
        $response->assertSee('q=Signal&amp;category=artist&amp;page=2', false);
    }

    public function test_posts_search_supports_or_syntax(): void
    {
        Post::factory()->create([
            'title' => 'Neon Cathedral',
            'content' => 'Darkwave production notes',
            'author_name' => 'Author A',
        ]);

        Post::factory()->create([
            'title' => 'Vinyl Rituals',
            'content' => 'Analog mastering notes',
            'author_name' => 'Author B',
        ]);

        $response = $this->get('/posts?q=Neon OR Vinyl');

        $response->assertOk();
        $response->assertSee('Neon Cathedral');
        $response->assertSee('Vinyl Rituals');
    }

    public function test_posts_search_supports_author_category_and_date_filters(): void
    {
        Post::factory()->create([
            'title' => 'Target Post',
            'content' => 'Facet filter match',
            'author_name' => 'Filter Author',
            'author_type' => 'artist',
            'created_at' => now()->subDays(3),
        ]);

        Post::factory()->create([
            'title' => 'Wrong Category',
            'content' => 'Should be filtered out',
            'author_name' => 'Filter Author',
            'author_type' => 'user',
            'created_at' => now()->subDays(3),
        ]);

        Post::factory()->create([
            'title' => 'Out of Date Range',
            'content' => 'Should be filtered out',
            'author_name' => 'Filter Author',
            'author_type' => 'artist',
            'created_at' => now()->subDays(60),
        ]);

        $dateFrom = now()->subDays(10)->toDateString();
        $dateTo = now()->toDateString();

        $response = $this->get("/posts?author=Filter%20Author&category=artist&date_from={$dateFrom}&date_to={$dateTo}");

        $response->assertOk();
        $response->assertSee('Target Post');
        $response->assertDontSee('Wrong Category');
        $response->assertDontSee('Out of Date Range');
    }

    public function test_case_studies_search_pagination_keeps_query_string(): void
    {
        CaseStudy::factory()->count(15)->create([
            'title' => 'Atlas Build',
            'description' => 'Atlas project delivery summary',
            'client_name' => 'Atlas Client',
            'project_type' => 'Web Development',
        ]);

        $response = $this->get('/case-studies?q=Atlas');

        $response->assertOk();
        $response->assertSee('q=Atlas&amp;page=2', false);
    }
}
