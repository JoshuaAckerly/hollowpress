<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase;

class ValidationTest extends TestCase
{
    use RefreshDatabase;

    public function test_post_title_is_required()
    {
        $response = $this->post('/demo/posts', [
            'content' => 'Test content',
            'author_name' => 'Test Author',
            'author_type' => 'artist',
        ]);

        $response->assertSessionHasErrors('title');
    }

    public function test_post_title_cannot_exceed_255_characters()
    {
        $longTitle = str_repeat('a', 256);
        
        $response = $this->post('/demo/posts', [
            'title' => $longTitle,
            'content' => 'Test content',
            'author_name' => 'Test Author',
            'author_type' => 'artist',
        ]);

        $response->assertSessionHasErrors('title');
    }

    public function test_post_content_is_required()
    {
        $response = $this->post('/demo/posts', [
            'title' => 'Test Title',
            'author_name' => 'Test Author',
            'author_type' => 'artist',
        ]);

        $response->assertSessionHasErrors('content');
    }

    public function test_post_content_must_be_at_least_10_characters()
    {
        $response = $this->post('/demo/posts', [
            'title' => 'Test Title',
            'content' => 'Short',
            'author_name' => 'Test Author',
            'author_type' => 'artist',
        ]);

        $response->assertSessionHasErrors('content');
    }

    public function test_author_name_is_required()
    {
        $response = $this->post('/demo/posts', [
            'title' => 'Test Title',
            'content' => 'Test content for the post',
            'author_type' => 'artist',
        ]);

        $response->assertSessionHasErrors('author_name');
    }

    public function test_author_type_must_be_valid_option()
    {
        $response = $this->post('/demo/posts', [
            'title' => 'Test Title',
            'content' => 'Test content for the post',
            'author_name' => 'Test Author',
            'author_type' => 'invalid',
        ]);

        $response->assertSessionHasErrors('author_type');
    }

    public function test_valid_post_data_passes_validation()
    {
        $response = $this->post('/demo/posts', [
            'title' => 'Valid Test Title',
            'content' => 'This is valid test content for the post.',
            'author_name' => 'Valid Author',
            'author_type' => 'artist',
        ]);

        $response->assertRedirect('/posts');
        $response->assertSessionHasNoErrors();
    }
}