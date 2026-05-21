<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    /** @phpstan-ignore missingType.generics */
    use HasFactory;

    protected $fillable = [
        'post_id',
        'author_name',
        'content',
        'is_approved',
    ];

    protected $casts = [
        'is_approved' => 'boolean',
    ];

    /**
     * @param  Builder<static>  $query
     * @return Builder<static>
     */
    public function scopeApproved(Builder $query): Builder
    {
        // @phpstan-ignore-next-line return.type
        return $query->where('is_approved', true);
    }

    /** @return BelongsTo<Post, $this> */
    public function post(): BelongsTo
    {
        // @phpstan-ignore-next-line return.type
        return $this->belongsTo(Post::class);
    }
}
