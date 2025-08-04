<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        Post::create([
            'title' => 'Lorem Ipsum Dolor Sit Amet',
            'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            'author_name' => 'John Doe',
            'author_type' => 'artist',
        ]);

        Post::create([
            'title' => 'Consectetur Adipiscing Elit',
            'content' => 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            'author_name' => 'Jane Smith',
            'author_type' => 'user',
        ]);

        Post::create([
            'title' => 'Sed Do Eiusmod Tempor',
            'content' => 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.',
            'author_name' => 'Mike Johnson',
            'author_type' => 'artist',
        ]);

        Post::create([
            'title' => 'Incididunt Ut Labore',
            'content' => 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.',
            'author_name' => 'Sarah Wilson',
            'author_type' => 'user',
        ]);

        Post::create([
            'title' => 'Nemo Enim Ipsam Voluptatem',
            'content' => 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
            'author_name' => 'Alex Rivera',
            'author_type' => 'artist',
        ]);

        Post::create([
            'title' => 'Ut Enim Ad Minima Veniam',
            'content' => 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. Sed ut perspiciatis unde omnis.',
            'author_name' => 'Emma Thompson',
            'author_type' => 'user',
        ]);

        Post::create([
            'title' => 'Quis Nostrud Exercitation',
            'content' => 'Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
            'author_name' => 'David Chen',
            'author_type' => 'artist',
        ]);

        Post::create([
            'title' => 'Excepteur Sint Occaecat',
            'content' => 'Sunt in culpa qui officia deserunt mollit anim id est laborum. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit.',
            'author_name' => 'Lisa Martinez',
            'author_type' => 'user',
        ]);

        Post::create([
            'title' => 'Temporibus Autem Quibusdam',
            'content' => 'Et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.',
            'author_name' => 'Robert Kim',
            'author_type' => 'artist',
        ]);

        Post::create([
            'title' => 'Similique Sunt In Culpa',
            'content' => 'Qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio.',
            'author_name' => 'Maria Garcia',
            'author_type' => 'user',
        ]);

        Post::create([
            'title' => 'Cumque Nihil Impedit Quo',
            'content' => 'Minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.',
            'author_name' => 'James Anderson',
            'author_type' => 'artist',
        ]);

        Post::create([
            'title' => 'Omnis Voluptas Assumenda',
            'content' => 'Est omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.',
            'author_name' => 'Sophie Brown',
            'author_type' => 'user',
        ]);
    }
}
