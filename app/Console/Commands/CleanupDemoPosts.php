<?php

namespace App\Console\Commands;

use App\Models\DemoPost;
use Illuminate\Console\Command;

class CleanupDemoPosts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'demo:cleanup-posts';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete demo posts older than 48 hours';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $count = DemoPost::expired()->count();
        
        if ($count === 0) {
            $this->info('No expired demo posts to clean up.');
            return 0;
        }

        DemoPost::expired()->delete();
        
        $this->info("Successfully deleted {$count} expired demo post(s).");
        return 0;
    }
}
