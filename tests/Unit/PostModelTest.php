<?php

namespace Tests\Unit;

use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase;

class PostModelTest extends TestCase
{
    use RefreshDatabase;

    public function test_post_has_fillable_attributes()
    {
        $post = new Post();
        $fillable = ['title', 'content', 'author_name', 'author_type'];
        
        $this->assertEquals($fillable, $post->getFillable());
    }

    public function test_post_can_be_created_with_valid_data()
    {
        $postData = [
            'title' => 'Test Title',
            'content' => 'Test content for the post.',
            'author_name' => 'Test Author',
            'author_type' => 'artist',
        ];

        $post = Post::create($postData);

        $this->assertInstanceOf(Post::class, $post);
        $this->assertEquals('Test Title', $post->title);
        $this->assertEquals('artist', $post->author_type);
    }

    public function test_post_has_timestamps()
    {
        $post = Post::factory()->create();
        
        $this->assertNotNull($post->created_at);
        $this->assertNotNull($post->updated_at);
    }

    public function test_post_attributes_are_accessible()
    {
        $post = Post::factory()->create([
            'title' => 'Specific Title',
            'author_type' => 'user'
        ]);

        $this->assertEquals('Specific Title', $post->title);
        $this->assertEquals('user', $post->author_type);
    }
}