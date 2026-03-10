<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->index(['author_type', 'created_at'], 'posts_author_type_created_idx');
            $table->index('author_name', 'posts_author_name_idx');
        });

        Schema::table('demo_posts', function (Blueprint $table) {
            $table->index(['author_type', 'created_at'], 'demo_posts_author_type_created_idx');
            $table->index('author_name', 'demo_posts_author_name_idx');
        });

        Schema::table('case_studies', function (Blueprint $table) {
            $table->index(['project_type', 'project_date', 'created_at'], 'case_studies_type_date_created_idx');
            $table->index('client_name', 'case_studies_client_name_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropIndex('posts_author_type_created_idx');
            $table->dropIndex('posts_author_name_idx');
        });

        Schema::table('demo_posts', function (Blueprint $table) {
            $table->dropIndex('demo_posts_author_type_created_idx');
            $table->dropIndex('demo_posts_author_name_idx');
        });

        Schema::table('case_studies', function (Blueprint $table) {
            $table->dropIndex('case_studies_type_date_created_idx');
            $table->dropIndex('case_studies_client_name_idx');
        });
    }
};
