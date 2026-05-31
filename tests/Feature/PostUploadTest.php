<?php

namespace Tests\Feature;

use App\Http\Middleware\EnsureDashboardAdminToken;
use App\Models\Post;
use Illuminate\Foundation\Testing\TestCase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PostUploadTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutMiddleware(EnsureDashboardAdminToken::class);
    }

    protected function tearDown(): void
    {
        DB::table('posts')->delete();
        Storage::disk('public')->deleteDirectory('posts');

        parent::tearDown();
    }

    public function test_post_can_be_created_with_featured_image(): void
    {
        Storage::fake('public');

        $file = UploadedFile::fake()->create('cover.jpg', 10, 'image/jpeg');

        $response = $this->post('/posts', [
            'title' => 'Test with Image',
            'content' => 'Some content here for testing purposes',
            'author_name' => 'Test Author',
            'author_type' => 'user',
            'featured_image' => $file,
        ]);

        $response->assertRedirect('/posts');

        $post = Post::where('title', 'Test with Image')->first();
        $this->assertNotNull($post);
        $this->assertNotNull($post->featured_image);
        $this->assertIsString($post->featured_image);
        Storage::disk('public')->assertExists($post->featured_image);
    }

    public function test_post_can_be_created_without_featured_image(): void
    {
        $response = $this->post('/posts', [
            'title' => 'Test Without Image',
            'content' => 'Some content here for testing purposes',
            'author_name' => 'Test Author',
            'author_type' => 'user',
        ]);

        $response->assertRedirect('/posts');

        $post = Post::where('title', 'Test Without Image')->first();
        $this->assertNotNull($post);
        $this->assertNull($post->featured_image);
    }

    public function test_featured_image_is_replaced_on_update(): void
    {
        Storage::fake('public');

        $oldFile = UploadedFile::fake()->create('old.jpg', 10, 'image/jpeg');
        $newFile = UploadedFile::fake()->create('new.jpg', 10, 'image/jpeg');

        $post = Post::create([
            'title' => 'Update Test',
            'content' => 'Some content here for testing purposes',
            'author_name' => 'Author',
            'author_type' => 'user',
            'featured_image' => $oldFile->store('posts', 'public'),
        ]);

        $oldPath = $post->featured_image;
        $this->assertIsString($oldPath);
        Storage::disk('public')->assertExists($oldPath);

        $this->put("/posts/{$post->id}", [
            'title' => 'Update Test',
            'content' => 'Some content here for testing purposes',
            'author_name' => 'Author',
            'author_type' => 'user',
            'featured_image' => $newFile,
        ]);

        Storage::disk('public')->assertMissing($oldPath);

        $post->refresh();
        $this->assertNotNull($post->featured_image);
        $this->assertIsString($post->featured_image);
        $this->assertNotSame($oldPath, $post->featured_image);
        Storage::disk('public')->assertExists($post->featured_image);
    }

    public function test_featured_image_is_deleted_when_post_is_destroyed(): void
    {
        Storage::fake('public');

        $file = UploadedFile::fake()->create('delete-me.jpg', 10, 'image/jpeg');

        $post = Post::create([
            'title' => 'Delete Test',
            'content' => 'Some content here for testing purposes',
            'author_name' => 'Author',
            'author_type' => 'user',
            'featured_image' => $file->store('posts', 'public'),
        ]);

        $imagePath = $post->featured_image;
        $this->assertIsString($imagePath);
        Storage::disk('public')->assertExists($imagePath);

        $this->delete("/posts/{$post->id}");

        Storage::disk('public')->assertMissing($imagePath);
    }

    public function test_invalid_file_type_is_rejected(): void
    {
        $file = UploadedFile::fake()->create('document.pdf', 100, 'application/pdf');

        $response = $this->post('/posts', [
            'title' => 'Bad File Test',
            'content' => 'Some content here for testing purposes',
            'author_name' => 'Author',
            'author_type' => 'user',
            'featured_image' => $file,
        ]);

        $response->assertSessionHasErrors('featured_image');
    }
}
