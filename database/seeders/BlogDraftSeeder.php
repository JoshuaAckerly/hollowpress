<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;

class BlogDraftSeeder extends Seeder
{
    public function run(): void
    {
        $content = file_get_contents(base_path('../BLOG_DRAFT_2026-03-25.md'));

        Post::create([
            'title' => "What I've Been Building Lately — March 2026",
            'content' => $content,
            'author_name' => 'Joshua',
            'author_type' => 'user',
        ]);
    }
}
