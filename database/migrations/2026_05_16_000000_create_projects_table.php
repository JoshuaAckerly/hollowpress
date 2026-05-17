<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('summary', 500);
            $table->text('description')->nullable();
            $table->enum('status', ['active', 'completed', 'archived'])->default('active');
            $table->unsignedSmallInteger('year')->nullable();
            $table->json('tags')->nullable();
            $table->string('cover_image')->nullable();
            $table->string('project_url')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->timestamps();

            $table->index(['status', 'is_featured', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
