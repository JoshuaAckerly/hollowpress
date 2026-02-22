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
        ]);

        $response = $this->get('/posts?q=Signal');

        $response->assertOk();
        $response->assertSee('q=Signal&amp;page=2', false);
    }

    public function test_case_studies_search_pagination_keeps_query_string(): void
    {
        CaseStudy::factory()->count(10)->create([
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
