<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DemoPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'author_name',
        'author_type',
        'ip_address',
    ];

    /**
     * Scope to get posts that should be cleaned up (older than 48 hours)
     */
    public function scopeExpired($query)
    {
        return $query->where('created_at', '<', now()->subHours(48));
    }
}
