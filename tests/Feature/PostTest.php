<?php

namespace Tests\Feature;

use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase;

class PostTest extends TestCase
{
    use RefreshDatabase;

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

        $response = $this->post('/posts', $postData);
        $response->assertRedirect('/posts');
        $this->assertDatabaseHas('posts', $postData);
    }

    public function test_post_creation_requires_title()
    {
        $postData = [
            'content' => 'This is test content.',
            'author_name' => 'Test Author',
            'author_type' => 'artist',
        ];

        $response = $this->post('/posts', $postData);
        $response->assertSessionHasErrors('title');
    }

    public function test_post_creation_requires_content()
    {
        $postData = [
            'title' => 'Test Post',
            'author_name' => 'Test Author',
            'author_type' => 'artist',
        ];

        $response = $this->post('/posts', $postData);
        $response->assertSessionHasErrors('content');
    }

    public function test_can_view_single_post()
    {
        $post = Post::factory()->create();
        $response = $this->get("/posts/{$post->id}");
        $response->assertStatus(200);
    }

    public function test_can_update_post()
    {
        $post = Post::factory()->create();
        $updateData = [
            'title' => 'Updated Title',
            'content' => 'Updated content for the post.',
            'author_name' => 'Updated Author',
            'author_type' => 'user',
        ];

        $response = $this->put("/posts/{$post->id}", $updateData);
        $response->assertRedirect('/posts');
        $this->assertDatabaseHas('posts', $updateData);
    }

    public function test_can_delete_post()
    {
        $post = Post::factory()->create();
        $response = $this->delete("/posts/{$post->id}");
        $response->assertRedirect('/posts');
        $this->assertDatabaseMissing('posts', ['id' => $post->id]);
    }

    public function test_author_type_must_be_valid()
    {
        $postData = [
            'title' => 'Test Post',
            'content' => 'This is test content.',
            'author_name' => 'Test Author',
            'author_type' => 'invalid_type',
        ];

        $response = $this->post('/posts', $postData);
        $response->assertSessionHasErrors('author_type');
    }
}