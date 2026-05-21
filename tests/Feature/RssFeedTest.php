<?php

namespace Tests\Feature;

use App\Models\Post;
use Illuminate\Foundation\Testing\TestCase;
use Illuminate\Support\Facades\DB;

class RssFeedTest extends TestCase
{
    protected function tearDown(): void
    {
        DB::table('posts')->delete();

        parent::tearDown();
    }

    public function test_rss_feed_returns_200(): void
    {
        $response = $this->get('/feed.rss');

        $response->assertStatus(200);
    }

    public function test_rss_feed_returns_rss_content_type(): void
    {
        $response = $this->get('/feed.rss');

        $this->assertStringContainsString(
            'application/rss+xml',
            $response->headers->get('Content-Type', '')
        );
    }

    public function test_rss_feed_contains_channel_and_items_when_posts_exist(): void
    {
        Post::factory()->create([
            'title' => 'Test RSS Post',
            'content' => 'Test content for the RSS feed.',
            'author_name' => 'Test Author',
            'author_type' => 'artist',
        ]);

        $response = $this->get('/feed.rss');

        $response->assertSee('<channel>', false);
        $response->assertSee('<item>', false);
    }
}
