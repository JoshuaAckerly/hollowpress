<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class ResetDatabase extends Command
{
    protected $signature = 'db:reset {--seed : Seed the database after reset} {--no-interaction : Skip confirmation}';
    protected $description = 'Reset the database by emptying all tables';

    public function handle()
    {
        if ($this->option('no-interaction') || $this->confirm('This will empty all database tables. Are you sure?')) {
            $this->info('Resetting database...');
            
            Artisan::call('db:seed', ['--class' => 'DatabaseResetSeeder']);
            
            $this->info('Database reset completed.');
            
            if ($this->option('seed')) {
                $this->info('Seeding database...');
                Artisan::call('db:seed');
                $this->info('Database seeded.');
            }
        }
    }
}