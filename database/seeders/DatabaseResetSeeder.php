<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseResetSeeder extends Seeder
{
    public function run(): void
    {
        // Disable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Truncate all tables
        DB::table('posts')->truncate();
        DB::table('events')->truncate();
        DB::table('albums')->truncate();
        DB::table('artists')->truncate();

        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $this->command->info('All tables have been emptied.');
    }
}