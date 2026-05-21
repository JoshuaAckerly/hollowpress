<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DemoPost extends Model
{
    /** @phpstan-ignore missingType.generics */
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
    /**
     * @param  Builder<static>  $query
     * @return Builder<static>
     */
    public function scopeExpired(Builder $query): Builder
    {
        // @phpstan-ignore-next-line return.type
        return $query->where('created_at', '<', now()->subHours(48));
    }
}
