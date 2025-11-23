<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class CaseStudy extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'challenge',
        'solution',
        'results',
        'client_name',
        'project_type',
        'project_date',
        'technologies',
        'featured_image',
        'gallery_images',
        'project_url',
        'is_featured',
    ];

    protected $casts = [
        'technologies' => 'array',
        'gallery_images' => 'array',
        'project_date' => 'date',
        'is_featured' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($caseStudy) {
            if (empty($caseStudy->slug)) {
                $caseStudy->slug = Str::slug($caseStudy->title);
            }
        });
    }
}
