<?php

namespace Tests\Feature;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Foundation\Testing\TestCase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class PostTest extends TestCase
{
    protected string $dashboardToken = 'test-dashboard-token';

    protected function setUp(): void
    {
        parent::setUp();

        config(['services.dashboard.admin_token' => $this->dashboardToken]);
    }

    protected function tearDown(): void
    {
        DB::table('comments')->delete();
        DB::table('posts')->delete();
        DB::table('demo_posts')->delete();

        parent::tearDown();
    }

    public function test_can_view_posts_index()
    {
        $response = $this->get('/posts');
        $response->assertStatus(200);
    }

    public function test_can_create_post()
    {
        $postData = [
            'title' => 'Test Post',
            'content' => 'This is test content for the post.',
            'author_name' => 'Test Author',
            'author_type' => 'artist',
        ];

        $response = $this->post('/demo/posts', $postData);
        $response->assertRedirect('/posts');
        $this->assertDatabaseHas('demo_posts', $postData);
    }

    public function test_post_creation_requires_title()
    {
        $postData = [
            'content' => 'This is test content.',
            'author_name' => 'Test Author',
            'author_type' => 'artist',
        ];

        $response = $this->post('/demo/posts', $postData);
        $response->assertSessionHasErrors('title');
    }

    public function test_post_creation_requires_content()
    {
        $postData = [
            'title' => 'Test Post',
            'author_name' => 'Test Author',
            'author_type' => 'artist',
        ];

        $response = $this->post('/demo/posts', $postData);
        $response->assertSessionHasErrors('content');
    }

    public function test_can_view_single_post()
    {
        $post = Post::factory()->create();
        $response = $this->get("/posts/{$post->id}");
        $response->assertStatus(200);
    }

    public function test_author_type_must_be_valid()
    {
        $postData = [
            'title' => 'Test Post',
            'content' => 'This is test content.',
            'author_name' => 'Test Author',
            'author_type' => 'invalid_type',
        ];

        $response = $this->post('/demo/posts', $postData);
        $response->assertSessionHasErrors('author_type');
    }

    public function test_can_submit_comment_for_post()
    {
        Http::fake([
            'https://hcaptcha.com/siteverify' => Http::response(['success' => true], 200),
        ]);

        $post = Post::factory()->create();

        $commentData = [
            'author_name' => 'Commenter Name',
            'content' => 'This is a thoughtful test comment.',
            'hcaptcha_token' => 'test-hcaptcha-token',
        ];

        $response = $this->post("/posts/{$post->id}/comments", $commentData);

        $response->assertRedirect("/posts/{$post->id}");

        $this->assertDatabaseHas('comments', [
            'post_id' => $post->id,
            'author_name' => 'Commenter Name',
            'content' => 'This is a thoughtful test comment.',
            'is_approved' => false,
        ]);
    }

    public function test_comment_submission_requires_content()
    {
        $post = Post::factory()->create();

        $response = $this->post("/posts/{$post->id}/comments", [
            'author_name' => 'Commenter Name',
        ]);

        $response->assertSessionHasErrors('content');
    }

    public function test_only_approved_comments_are_visible_on_post_page()
    {
        $post = Post::factory()->create();

        Comment::create([
            'post_id' => $post->id,
            'author_name' => 'Approved User',
            'content' => 'This comment is approved and should be visible.',
            'is_approved' => true,
        ]);

        Comment::create([
            'post_id' => $post->id,
            'author_name' => 'Pending User',
            'content' => 'This comment is pending and should be hidden.',
            'is_approved' => false,
        ]);

        $response = $this->get("/posts/{$post->id}");

        $response->assertSee('This comment is approved and should be visible.');
        $response->assertDontSee('This comment is pending and should be hidden.');
    }

    public function test_captcha_verification_must_succeed()
    {
        Http::fake([
            'https://hcaptcha.com/siteverify' => Http::response(['success' => false], 200),
        ]);

        $post = Post::factory()->create();

        $response = $this->post("/posts/{$post->id}/comments", [
            'author_name' => 'Commenter Name',
            'content' => 'This comment has a bad captcha.',
            'hcaptcha_token' => 'invalid-token',
        ]);

        $response->assertSessionHasErrors('hcaptcha_token');
        $this->assertDatabaseMissing('comments', [
            'post_id' => $post->id,
            'content' => 'This comment has a bad captcha.',
        ]);
    }

    public function test_comment_submission_is_rate_limited()
    {
        Http::fake([
            'https://hcaptcha.com/siteverify' => Http::response(['success' => true], 200),
        ]);

        $post = Post::factory()->create();

        for ($index = 0; $index < 10; $index++) {
            $this->post("/posts/{$post->id}/comments", [
                'author_name' => 'Rate Limit User',
                'content' => "Rate limit comment number {$index}.",
                'hcaptcha_token' => 'test-hcaptcha-token',
            ])->assertRedirect("/posts/{$post->id}");
        }

        $response = $this->post("/posts/{$post->id}/comments", [
            'author_name' => 'Rate Limit User',
            'content' => 'This attempt should be rate limited.',
            'hcaptcha_token' => 'test-hcaptcha-token',
        ]);

        $response->assertRedirect("/posts/{$post->id}");
        $response->assertSessionHas('error');
    }

    public function test_can_approve_comment_from_dashboard()
    {
        $post = Post::factory()->create();

        $comment = Comment::create([
            'post_id' => $post->id,
            'author_name' => 'Pending User',
            'content' => 'Please approve this comment.',
            'is_approved' => false,
        ]);

        $response = $this->patch("/dashboard/comments/{$comment->id}/approve", [
            'dashboard_token' => $this->dashboardToken,
        ]);

        $response->assertRedirect('/dashboard');

        $this->assertDatabaseHas('comments', [
            'id' => $comment->id,
            'is_approved' => true,
        ]);
    }

    public function test_can_unapprove_comment_from_dashboard()
    {
        $post = Post::factory()->create();

        $comment = Comment::create([
            'post_id' => $post->id,
            'author_name' => 'Approved User',
            'content' => 'This should be unapproved.',
            'is_approved' => true,
        ]);

        $response = $this->patch("/dashboard/comments/{$comment->id}/unapprove", [
            'dashboard_token' => $this->dashboardToken,
        ]);

        $response->assertRedirect('/dashboard');

        $this->assertDatabaseHas('comments', [
            'id' => $comment->id,
            'is_approved' => false,
        ]);
    }

    public function test_dashboard_comment_moderation_requires_valid_token()
    {
        $post = Post::factory()->create();

        $comment = Comment::create([
            'post_id' => $post->id,
            'author_name' => 'Pending User',
            'content' => 'Token should be required.',
            'is_approved' => false,
        ]);

        $response = $this->patch("/dashboard/comments/{$comment->id}/approve");

        $response->assertStatus(403);

        $this->assertDatabaseHas('comments', [
            'id' => $comment->id,
            'is_approved' => false,
        ]);
    }
}
