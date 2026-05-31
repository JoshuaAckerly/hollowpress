<?php

namespace Tests\Feature;

use App\Http\Middleware\EnsureDashboardAdminToken;
use App\Models\Post;
use Illuminate\Foundation\Testing\TestCase;
use Illuminate\Support\Facades\DB;

class PostTagTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutMiddleware(EnsureDashboardAdminToken::class);
    }

    protected function tearDown(): void
    {
        DB::table('posts')->delete();

        parent::tearDown();
    }

    public function test_post_can_be_created_with_tags(): void
    {
        $response = $this->post('/posts', [
            'title' => 'Tagged Post',
            'content' => 'Some content here for testing purposes',
            'author_name' => 'Author',
            'author_type' => 'user',
            'tags' => ['music', 'art', 'culture'],
        ]);

        $response->assertRedirect('/posts');

        $post = Post::where('title', 'Tagged Post')->first();
        $this->assertNotNull($post);
        $this->assertEquals(['music', 'art', 'culture'], $post->tags);
    }

    public function test_post_can_be_created_without_tags(): void
    {
        $response = $this->post('/posts', [
            'title' => 'Untagged Post',
            'content' => 'Some content here for testing purposes',
            'author_name' => 'Author',
            'author_type' => 'user',
        ]);

        $response->assertRedirect('/posts');

        $post = Post::where('title', 'Untagged Post')->first();
        $this->assertNotNull($post);
        $this->assertNull($post->tags);
    }

    public function test_tag_filter_returns_matching_posts(): void
    {
        Post::create([
            'title' => 'Music Post',
            'content' => 'Content about music',
            'author_name' => 'Author',
            'author_type' => 'user',
            'tags' => ['music', 'performance'],
        ]);

        Post::create([
            'title' => 'Art Post',
            'content' => 'Content about art',
            'author_name' => 'Author',
            'author_type' => 'user',
            'tags' => ['art', 'painting'],
        ]);

        $response = $this->get('/posts?tag=music');

        $response->assertStatus(200);

        $posts = $response->original->getData()['page']['props']['posts']['data'];
        $titles = array_column($posts, 'title');

        $this->assertContains('Music Post', $titles);
        $this->assertNotContains('Art Post', $titles);
    }

    public function test_no_tag_filter_returns_all_posts(): void
    {
        Post::create([
            'title' => 'Music Post',
            'content' => 'Content about music',
            'author_name' => 'Author',
            'author_type' => 'user',
            'tags' => ['music'],
        ]);

        Post::create([
            'title' => 'Untagged Post',
            'content' => 'Content about something',
            'author_name' => 'Author',
            'author_type' => 'user',
        ]);

        $response = $this->get('/posts');

        $response->assertStatus(200);

        $posts = $response->original->getData()['page']['props']['posts']['data'];
        $titles = array_column($posts, 'title');

        $this->assertContains('Music Post', $titles);
        $this->assertContains('Untagged Post', $titles);
    }

    public function test_tag_max_length_is_validated(): void
    {
        $response = $this->post('/posts', [
            'title' => 'Validation Test',
            'content' => 'Some content here for testing purposes',
            'author_name' => 'Author',
            'author_type' => 'user',
            'tags' => [str_repeat('a', 51)],
        ]);

        $response->assertSessionHasErrors('tags.0');
    }
}
