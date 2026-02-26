<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SearchTestPostsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $posts = [
            [
                'title' => 'Laravel Best Practices',
                'content' => 'Learn the best practices for Laravel development including routing, controllers, and database optimization.',
                'author_name' => 'John Developer',
                'author_type' => 'user',
            ],
            [
                'title' => 'React Component Patterns',
                'content' => 'Explore different patterns for building reusable React components including hooks and context.',
                'author_name' => 'Jane Designer',
                'author_type' => 'user',
            ],
            [
                'title' => 'Database Optimization Techniques',
                'content' => 'Advanced database optimization techniques for Laravel applications including indexing and query optimization.',
                'author_name' => 'Mike DBA',
                'author_type' => 'user',
            ],
            [
                'title' => 'RESTful API Design Principles',
                'content' => 'Learn how to design RESTful APIs following industry best practices and standards.',
                'author_name' => 'Sarah API',
                'author_type' => 'user',
            ],
            [
                'title' => 'TypeScript Integration Guide',
                'content' => 'Complete guide to integrating TypeScript with Laravel applications for better type safety.',
                'author_name' => 'Tom TypeScript',
                'author_type' => 'user',
            ],
            [
                'title' => 'Testing Strategies in Laravel',
                'content' => 'Comprehensive testing strategies including unit tests, feature tests, and integration testing.',
                'author_name' => 'Lisa Tester',
                'author_type' => 'user',
            ],
            [
                'title' => 'Performance Optimization',
                'content' => 'Optimize your Laravel application performance with caching, database tuning, and code optimization.',
                'author_name' => 'Performance Expert',
                'author_type' => 'user',
            ],
        ];

        foreach ($posts as $postData) {
            Post::create($postData);
        }
    }
}
